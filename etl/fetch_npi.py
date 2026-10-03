"""
NPI registry (NPPES) -> TRT / metabolic clinic candidates, nationwide.

Two paths:
  bulk (default)  stream the monthly NPPES Data Dissemination zip from
                  etl/cache/nppes.zip (download URL on
                  https://download.cms.gov/nppes/NPI_Files.html). ~8.5M rows,
                  read once, never unpacked to disk.
  --metro <slug>  the public API (https://npiregistry.cms.hhs.gov/api-page),
                  city by city, for a quick refresh of one metro.

Business-level only: we export the PRACTICE LOCATION of organizations (NPI-2)
and of individuals (NPI-1). Individual names are never written; a solo office
is labelled by its specialty ("Endocrinology practice"). Deactivated NPIs are
skipped. Non-US practice addresses are skipped.

Taxonomy codes (see docs/near-me/methodology.md):
  207RE0101X Endocrinology, Diabetes & Metabolism
  207RB0002X Obesity Medicine
  2083X0100X Preventive Medicine (anti-aging / regenerative route)
  208U00000X Urology
  207Q00000X Family Medicine   -> kept only on a keyword hit
  207R00000X Internal Medicine -> kept only on a keyword hit
"""
from __future__ import annotations

import csv
import io
import os
import re
import sys
import time
import zipfile

import requests
from common import POI, DFW_CITIES, write_jsonl, zip_centroid
from regions import STATES

API = "https://npiregistry.cms.hhs.gov/api/"
BULK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache", "nppes.zip")

# code -> (kind, base confidence, NPPES description for the API path)
TAXONOMIES = {
    "207RE0101X": ("trt", 0.6, "Endocrinology, Diabetes & Metabolism"),
    "207RB0002X": ("glp1", 0.6, "Obesity Medicine"),
    "2083X0100X": ("trt", 0.45, "Preventive Medicine"),
    "208U00000X": ("trt", 0.5, "Urology"),
    "207Q00000X": ("trt", 0.2, "Family Medicine"),
    "207R00000X": ("trt", 0.2, "Internal Medicine"),
}
GENERALIST = {"207Q00000X", "207R00000X"}
DESC = {"207RE0101X": "Endocrinology", "207RB0002X": "Obesity medicine", "2083X0100X": "Preventive medicine",
        "208U00000X": "Urology", "207Q00000X": "Family medicine", "207R00000X": "Internal medicine"}
KW_TRT = re.compile(r"\b(trt|testosterone|hormones?|low ?t|men'?s? health|andropause|regenerative|anti[- ]?aging|longevity|optimi[sz]ation)\b", re.I)
KW_GLP = re.compile(r"\b(weight ?loss|obesity|bariatric|medical weight|metabolic|semaglutide|tirzepatide|glp)\b", re.I)


def classify(codes: list[str], org: str, is_org: bool = True) -> tuple[str, float, list[str]] | None:
    hits = [c for c in codes if c in TAXONOMIES]
    if not hits:
        return None
    # Preventive medicine also covers occupational and public-health doctors.
    # A solo individual with only that code and no keyword is not a TRT signal.
    if not is_org and set(hits) <= {"2083X0100X"} | GENERALIST and not (KW_TRT.search(org) or KW_GLP.search(org)):
        return None
    kind, conf = None, 0.0
    for c in hits:
        k, base, _ = TAXONOMIES[c]
        if base > conf:
            kind, conf = k, base
    tags = sorted(set(hits))
    if KW_GLP.search(org):
        kind, conf = "glp1", max(conf, 0.7)
        tags.append("kw:glp1")
    if KW_TRT.search(org):
        if kind != "glp1":
            kind, conf = "trt", max(conf, 0.75)
        tags.append("kw:trt")
    if set(hits) <= GENERALIST and conf < 0.5:
        return None  # generalist without a keyword hit: not a signal
    # a specialty match plus a keyword is as good as it gets short of a license
    if len([c for c in hits if c not in GENERALIST]) and ("kw:trt" in tags or "kw:glp1" in tags):
        conf = max(conf, 0.85)
    return kind, min(conf, 1.0), tags


def bulk() -> None:
    seen: dict[str, POI] = {}
    t0 = time.time()
    with zipfile.ZipFile(BULK) as zf:
        name = next(n for n in zf.namelist() if n.startswith("npidata_pfile") and not n.endswith("fileheader.csv"))
        with zf.open(name) as raw:
            rd = csv.reader(io.TextIOWrapper(raw, encoding="utf-8", newline=""))
            header = next(rd)
            col = {h: i for i, h in enumerate(header)}
            i_type = col["Entity Type Code"]
            i_org = col["Provider Organization Name (Legal Business Name)"]
            i_other = col["Provider Other Organization Name"]
            i_parent = col.get("Parent Organization LBN", -1)
            i_a1 = col["Provider First Line Business Practice Location Address"]
            i_a2 = col["Provider Second Line Business Practice Location Address"]
            i_city = col["Provider Business Practice Location Address City Name"]
            i_st = col["Provider Business Practice Location Address State Name"]
            i_zip = col["Provider Business Practice Location Address Postal Code"]
            i_cc = col["Provider Business Practice Location Address Country Code (If outside U.S.)"]
            i_deact = col["NPI Deactivation Date"]
            i_react = col["NPI Reactivation Date"]
            i_tax = [col[f"Healthcare Provider Taxonomy Code_{n}"] for n in range(1, 16)]
            n = 0
            for row in rd:
                n += 1
                if n % 1_000_000 == 0:
                    print(f"[npi] {n/1e6:.0f}M rows, {len(seen)} kept, {time.time()-t0:.0f}s", file=sys.stderr)
                if len(row) <= i_tax[-1]:
                    continue
                if row[i_deact] and not row[i_react]:
                    continue
                st = row[i_st]
                if st not in STATES or (row[i_cc] and row[i_cc] != "US"):
                    continue
                codes = [row[i] for i in i_tax if row[i]]
                if not any(c in TAXONOMIES for c in codes):
                    continue
                is_org = row[i_type] == "2"
                org = row[i_org] or row[i_other] or (row[i_parent] if i_parent >= 0 else "")
                res = classify(codes, org, is_org)
                if not res:
                    continue
                kind, conf, tags = res
                if not org:
                    primary = next((c for c in codes if c in TAXONOMIES and c not in GENERALIST), None) or codes[0]
                    org = f"{DESC.get(primary, 'Medical')} practice"
                zip5 = row[i_zip][:5]
                ll = zip_centroid(zip5)
                poi = POI(kind=kind, name=org, address=" ".join(filter(None, [row[i_a1], row[i_a2]])),
                          city=row[i_city], state=st, zip=zip5,
                          lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                          source="npi", source_id="org" if is_org else "ind", tags=tags, confidence=conf).finalize()
                prev = seen.get(poi.id)
                if prev:
                    prev.confidence = min(1.0, prev.confidence + 0.05)
                    prev.tags = sorted(set(prev.tags) | set(poi.tags))
                else:
                    seen[poi.id] = poi
    print(f"[npi] done: {n} rows scanned, {len(seen)} business locations, {time.time()-t0:.0f}s", file=sys.stderr)
    write_jsonl(seen.values(), "npi")


# ---- API path (one metro) --------------------------------------------------

def _addr(rec: dict) -> dict | None:
    for a in rec.get("addresses", []):
        if a.get("address_purpose") == "LOCATION" and a.get("country_code", "US") == "US":
            return a
    return None


def query(session: requests.Session, **params):
    skip = 0
    while skip <= 1000:
        p = {"version": "2.1", "limit": 200, "skip": skip, **params}
        data = {"results": []}
        for attempt in range(4):
            try:
                r = session.get(API, params=p, timeout=60)
                r.raise_for_status()
                data = r.json()
                break
            except Exception:
                time.sleep(2 ** attempt)
        results = data.get("results", [])
        yield from results
        if len(results) < 200:
            return
        skip += 200


def api(cities: list[str], state: str) -> None:
    s = requests.Session()
    seen: dict[str, POI] = {}
    for city in cities:
        for code, (_, _, desc) in TAXONOMIES.items():
            for rec in query(s, city=city.upper(), state=state, taxonomy_description=desc):
                a = _addr(rec)
                codes = [t.get("code") for t in rec.get("taxonomies", [])]
                if not a or code not in codes:
                    continue
                basic = rec.get("basic", {})
                is_org = rec.get("enumeration_type") == "NPI-2"
                org = basic.get("organization_name") or basic.get("parent_organization_legal_business_name") or ""
                res = classify(codes, org, is_org)
                if not res:
                    continue
                kind, conf, tags = res
                if not org:
                    org = f"{DESC.get(code, 'Medical')} practice"
                zip5 = (a.get("postal_code") or "")[:5]
                ll = zip_centroid(zip5)
                poi = POI(kind=kind, name=org, address=" ".join(filter(None, [a.get("address_1"), a.get("address_2")])),
                          city=a.get("city", ""), state=a.get("state", state), zip=zip5,
                          lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                          source="npi", source_id="org" if is_org else "ind", tags=tags, confidence=conf).finalize()
                prev = seen.get(poi.id)
                if prev:
                    prev.confidence = min(1.0, prev.confidence + 0.05)
                    prev.tags = sorted(set(prev.tags) | set(poi.tags))
                else:
                    seen[poi.id] = poi
            time.sleep(0.2)
        print(f"[npi] {city}: {len(seen)} cumulative", file=sys.stderr)
    write_jsonl(seen.values(), "npi")


if __name__ == "__main__":
    if "--metro" in sys.argv:
        slug = sys.argv[sys.argv.index("--metro") + 1]
        if slug != "dfw":
            sys.exit("API path currently carries a city list for dfw only; use the bulk file for everything else")
        api(DFW_CITIES, "TX")
    elif os.path.exists(BULK):
        bulk()
    else:
        sys.exit(f"download the NPPES monthly file to {BULK} (see docstring) or pass --metro dfw")
