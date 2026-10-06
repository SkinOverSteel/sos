"""
CMS Open Payments -> business-address proxies, nationwide, for two layers:

  glp1     recipients whose associated product names a GLP-1 drug (Ozempic,
           Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza) from Novo
           Nordisk or Eli Lilly -> "GLP-1 prescribing practice"
  implant  recipients whose associated product is an inflatable or malleable
           penile prosthesis (Boston Scientific AMS 700 / Ambicor / Spectra /
           Tactra; Coloplast Titan / Genesis) -> "Penile implant practice".
           A device record at an address means the practice has a relationship
           with the implant maker: a strong proxy for implant surgery being
           offered there, not proof the surgeon at that address does the case.

General Payment Data is public and business-level (covered recipient name +
practice address). We export the PRACTICE ADDRESS as a business location.
The recipient's personal name is NOT exported; join_names.py later names the
address from the NPPES organization registered there. Payment amounts are
not exported (they are not a quality signal). Product matching is
case-insensitive on the CMS side (verified: "OZEMPIC" and "Ozempic" return
the same count).

API: https://openpaymentsdata.cms.gov/api/1/datastore/query/<dataset>/0
"""
from __future__ import annotations

import concurrent.futures as cf
import json
import os
import sys
import time
import requests
from common import OUT_DIR, POI, write_jsonl, zip_centroid
from regions import STATES

META = "https://openpaymentsdata.cms.gov/api/1/metastore/schemas/dataset/items?show-reference-ids=false"
QUERY = "https://openpaymentsdata.cms.gov/api/1/datastore/query/{dist}"

GLP1_DRUGS = ["OZEMPIC", "WEGOVY", "MOUNJARO", "ZEPBOUND", "RYBELSUS", "SAXENDA", "VICTOZA", "SEMAGLUTIDE", "TIRZEPATIDE"]
MAKERS = ["Novo Nordisk", "Eli Lilly", "Lilly USA"]

# One program per layer: how the product is matched, who pays, what the row is
# called until join_names.py finds the organization at that address.
PROGRAMS = {
    "glp1": {
        "makers": ["Novo Nordisk%", "Eli Lilly%", "Lilly USA%"],
        "products": [("in", GLP1_DRUGS)],
        "name": "GLP-1 prescribing practice",
        "confidence": 0.55,
    },
    "implant": {
        # ("like", pattern): product names are free text per maker, e.g.
        # "AMS 700", "AMS 700 CXR RTE Kit", "Titan", "Titan Touch", "Genesis".
        "makers": ["Boston Scientific%"],
        "products": [("like", "AMS 700%"), ("like", "AMS Ambicor%"), ("like", "Spectra%"), ("like", "Tactra%")],
        "name": "Penile implant practice",
        "confidence": 0.6,
    },
    "implant-coloplast": {
        "kind": "implant",
        "makers": ["Coloplast%"],
        "products": [("like", "Titan%"), ("like", "Genesis%")],
        "name": "Penile implant practice",
        "confidence": 0.6,
    },
}
PARTS = os.path.join(OUT_DIR, "open_payments_parts")  # one JSONL per state: resumable


def latest_general_distribution(s: requests.Session) -> str:
    items = s.get(META, timeout=60).json()
    best = None
    for d in items:
        t = d.get("title", "")
        if "General Payment" in t:
            yr = int(t[:4]) if t[:4].isdigit() else 0
            if best is None or yr > best[0]:
                best = (yr, d["distribution"][0]["identifier"])
    if not best:
        raise SystemExit("no General Payment dataset found")
    print(f"[open_payments] using {best[0]} general payments", file=sys.stderr)
    return best[1]


def _product_conditions(op: str, value) -> list[tuple[str, str]]:
    base = "conditions[1]"
    if op == "in":
        return [(f"{base}[property]", "name_of_drug_or_biological_or_device_or_medical_supply_1"),
                (f"{base}[operator]", "in"), *[(f"{base}[value][]", d) for d in value]]
    return [(f"{base}[property]", "name_of_drug_or_biological_or_device_or_medical_supply_1"),
            (f"{base}[operator]", "like"), (f"{base}[value]", value)]


def fetch_state(dist: str, st: str) -> int:
    """All distinct payment addresses in one state, every program -> parts/<ST>.jsonl."""
    out_path = os.path.join(PARTS, f"{st}.jsonl")
    if os.path.exists(out_path):
        return sum(1 for _ in open(out_path))
    s = requests.Session()
    seen: dict[str, POI] = {}
    for prog_key, prog in PROGRAMS.items():
        kind = prog.get("kind", prog_key)
        for maker in prog["makers"]:
            for op, value in prog["products"]:
                offset = 0
                while True:
                    params = [
                        ("conditions[0][property]", "recipient_state"), ("conditions[0][value]", st),
                        *_product_conditions(op, value),
                        ("conditions[2][property]", "applicable_manufacturer_or_applicable_gpo_making_payment_name"),
                        ("conditions[2][value]", maker), ("conditions[2][operator]", "like"),
                        ("count", "false"), ("limit", 500), ("offset", offset),
                        *[("properties[]", f) for f in ("recipient_primary_business_street_address_line1", "recipient_city", "recipient_zip_code")],
                        *[("groupings[]", f) for f in ("recipient_primary_business_street_address_line1", "recipient_city", "recipient_zip_code")],
                    ]
                    rows = None
                    for attempt in range(5):
                        try:
                            r = s.get(QUERY.format(dist=dist), params=params, timeout=300)
                            r.raise_for_status()
                            rows = r.json().get("results", [])
                            break
                        except Exception:
                            time.sleep(3 * 2 ** attempt)
                    if rows is None:
                        print(f"[open_payments] {st} {kind} {maker} offset {offset}: gave up", file=sys.stderr)
                        break
                    if not rows:
                        break
                    for row in rows:
                        zip5 = (row.get("recipient_zip_code") or "")[:5]
                        ll = zip_centroid(zip5)
                        poi = POI(
                            kind=kind, name=prog["name"],
                            address=row.get("recipient_primary_business_street_address_line1", ""),
                            city=row.get("recipient_city", ""), state=st, zip=zip5,
                            lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                            source="open_payments",
                            source_id=f"addr:{zip5}",   # business-address key, never a recipient id
                            tags=[f"maker:{maker.rstrip('%').lower()}"],
                            confidence=prog["confidence"],
                        ).finalize()
                        prev = seen.get(poi.id)
                        if prev:
                            prev.confidence = min(0.9, prev.confidence + 0.1)
                            prev.tags = sorted(set(prev.tags) | set(poi.tags))
                        else:
                            seen[poi.id] = poi
                    if len(rows) < 500:
                        break
                    offset += 500
    os.makedirs(PARTS, exist_ok=True)
    with open(out_path, "w") as f:
        from dataclasses import asdict
        for p in seen.values():
            f.write(json.dumps(asdict(p)) + "\n")
    kinds = {}
    for p in seen.values():
        kinds[p.kind] = kinds.get(p.kind, 0) + 1
    print(f"[open_payments] {st}: {len(seen)} addresses {kinds}", file=sys.stderr)
    return len(seen)


def run():
    s = requests.Session()
    dist = latest_general_distribution(s)
    states = [a for a in sys.argv[1:] if a in STATES] or list(STATES)
    total = 0
    with cf.ThreadPoolExecutor(3) as ex:
        for n in ex.map(lambda st: fetch_state(dist, st), states):
            total += n
    rows = []
    for st in states:
        p = os.path.join(PARTS, f"{st}.jsonl")
        if os.path.exists(p):
            rows.extend(POI(**json.loads(l)) for l in open(p) if l.strip())
    write_jsonl(rows, "open_payments")


if __name__ == "__main__":
    run()
