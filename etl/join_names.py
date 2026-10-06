"""
Attach business names to the Open Payments GLP-1 addresses.

Open Payments gives a practice ADDRESS but no business name (the recipient's
personal name is dropped on purpose). This applies to every Open Payments
layer: the GLP-1 rows ("GLP-1 prescribing practice") and the penile implant
rows ("Penile implant practice"). The NPPES file lists every organization
(NPI-2) with its practice-location address. Joining the two on a normalized
street line + zip turns "GLP-1 prescribing practice · 123 Main St" into the
organization that actually operates there.

Rules, so the join cannot leak or mislead:
- Only organizations (Entity Type 2) are indexed. Individuals (NPI-1) are
  never used for names, even when a solo practice is the only NPI at an
  address: a person's name is not a business name.
- Address lines are normalized (case, punctuation, USPS suffixes, suite
  tokens) and matched with the suite first; without one only if the address
  has a single organization, so a medical tower's dozens of tenants never
  collapse onto one name.
- Several organizations at the same suite: prefer one whose name reads as a
  medical practice; if still ambiguous, keep the row generic and tag it
  "multi-tenant".
- A matched row is tagged "npi-name" and its confidence rises by 0.1 (an
  address with a registered organization is a better signal than a bare one).

Re-run safe: only rows still carrying a generic "<layer> practice" name are touched.
"""
from __future__ import annotations

import csv
import io
import json
import re
import sys
import time
import zipfile
from collections import defaultdict

from common import OUT_DIR, POI
from fetch_npi import BULK
from fetch_open_payments import PROGRAMS

OP = f"{OUT_DIR}/pois.open_payments.jsonl"
GENERIC_NAMES = {p["name"] for p in PROGRAMS.values()}

SUFFIX = {
    "STREET": "ST", "AVENUE": "AVE", "BOULEVARD": "BLVD", "ROAD": "RD", "DRIVE": "DR", "LANE": "LN", "COURT": "CT",
    "PLACE": "PL", "PARKWAY": "PKWY", "HIGHWAY": "HWY", "CIRCLE": "CIR", "TERRACE": "TER", "TRAIL": "TRL", "WAY": "WAY",
    "NORTH": "N", "SOUTH": "S", "EAST": "E", "WEST": "W", "NORTHEAST": "NE", "NORTHWEST": "NW", "SOUTHEAST": "SE", "SOUTHWEST": "SW",
    "SUITE": "STE", "SUIT": "STE", "UNIT": "STE", "BUILDING": "BLDG", "FLOOR": "FL", "ROOM": "RM", "DEPARTMENT": "DEPT",
    "FIRST": "1ST", "SECOND": "2ND", "THIRD": "3RD", "FOURTH": "4TH", "FIFTH": "5TH",
}
UNIT_WORDS = {"STE", "BLDG", "FL", "RM", "DEPT", "APT", "#"}
MEDICAL = re.compile(r"\b(clinic|medical|health|physicians?|practice|associates|group|care|md|do|pllc|pc|pa|family|internal|endocrin|weight|obesity|wellness|primary|urgent|surgery|surgical|center|centre|institute|hospital|specialists?|urolog\w*|men'?s)\b", re.I)


def norm(addr: str) -> tuple[str, str]:
    """-> (street without unit, unit or '')"""
    s = re.sub(r"[^\w\s#]", " ", (addr or "").upper())
    s = s.replace("#", " # ")
    toks = [SUFFIX.get(t, t) for t in s.split()]
    street, unit, i = [], [], 0
    while i < len(toks):
        t = toks[i]
        if t in UNIT_WORDS:
            unit = toks[i + 1:i + 2]
            break
        street.append(t)
        i += 1
    return " ".join(street), " ".join(unit)


def build_index(wanted: set[tuple[str, str]]) -> dict:
    """(street, zip5) -> {unit: {org names}} for streets we need."""
    idx: dict = defaultdict(lambda: defaultdict(set))
    t0 = time.time()
    with zipfile.ZipFile(BULK) as zf:
        name = next(n for n in zf.namelist() if n.startswith("npidata_pfile") and not n.endswith("fileheader.csv"))
        with zf.open(name) as raw:
            rd = csv.reader(io.TextIOWrapper(raw, encoding="utf-8", newline=""))
            header = next(rd)
            col = {h: i for i, h in enumerate(header)}
            i_type, i_org = col["Entity Type Code"], col["Provider Organization Name (Legal Business Name)"]
            i_a1, i_a2 = col["Provider First Line Business Practice Location Address"], col["Provider Second Line Business Practice Location Address"]
            i_zip, i_deact, i_react = col["Provider Business Practice Location Address Postal Code"], col["NPI Deactivation Date"], col["NPI Reactivation Date"]
            n = 0
            for row in rd:
                n += 1
                if n % 2_000_000 == 0:
                    print(f"[join] {n/1e6:.0f}M rows scanned, {time.time()-t0:.0f}s", file=sys.stderr)
                if len(row) <= i_zip or row[i_type] != "2" or (row[i_deact] and not row[i_react]):
                    continue
                zip5 = row[i_zip][:5]
                street, unit = norm(" ".join(filter(None, [row[i_a1], row[i_a2]])))
                if (street, zip5) not in wanted:
                    continue
                org = re.sub(r"\s+", " ", row[i_org]).strip()
                if org:
                    idx[(street, zip5)][unit].add(org)
    return idx


def pick(names: set[str]) -> str | None:
    if len(names) == 1:
        return next(iter(names))
    med = [x for x in names if MEDICAL.search(x)]
    return med[0] if len(med) == 1 else None


def main():
    rows = [json.loads(l) for l in open(OP) if l.strip()]
    todo = [r for r in rows if r["name"] in GENERIC_NAMES]
    keys = {}
    for r in todo:
        keys[r["id"]] = (*norm(r["address"]), r["zip"])
    wanted = {(s, z) for (s, u, z) in keys.values()}
    print(f"[join] {len(todo)} generic rows at {len(wanted)} street+zip keys; indexing NPPES organizations", file=sys.stderr)
    idx = build_index(wanted)
    named = multi = 0
    out = []
    for r in rows:
        if r["id"] not in keys:
            out.append(r)
            continue
        street, unit, zip5 = keys[r["id"]]
        units = idx.get((street, zip5), {})
        cands = None
        if unit and unit in units:
            cands = units[unit]
        elif not unit and len(units) == 1:
            cands = next(iter(units.values()))
        elif not unit and "" in units and len(units[""]) == 1:
            cands = units[""]
        name = pick(cands) if cands else None
        if name:
            r["name"] = name
            r["tags"] = sorted(set(r.get("tags", [])) | {"npi-name"})
            r["confidence"] = round(min(0.9, r["confidence"] + 0.1), 2)
            named += 1
        elif cands:
            r["tags"] = sorted(set(r.get("tags", [])) | {"multi-tenant"})
            multi += 1
        out.append(r)
    # ids hash kind|name|address|zip, so renamed rows get new ids; recompute and dedupe.
    seen: dict[str, dict] = {}
    for r in out:
        p = POI(**{k: v for k, v in r.items() if k in POI.__dataclass_fields__}).finalize()
        r["id"] = p.id
        prev = seen.get(p.id)
        if prev is None or prev["confidence"] < r["confidence"]:
            seen[p.id] = r
    with open(OP, "w") as f:
        for r in seen.values():
            f.write(json.dumps(r) + "\n")
    print(f"[join] named {named}, ambiguous (multi-tenant) {multi}, unmatched {len(todo) - named - multi}; {len(seen)} rows written", file=sys.stderr)


if __name__ == "__main__":
    main()
