"""
CMS Open Payments -> GLP-1 prescriber proxy, nationwide.

General Payment Data (public, business-level: covered recipient name + practice
address). We keep ONLY recipients whose "Associated_Drug_or_Biological" names
a GLP-1 product (Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda,
Victoza) from Novo Nordisk or Eli Lilly, and export the PRACTICE ADDRESS as a
business location. The recipient's personal name is NOT exported; the row is
named by the address's business label when available, else "GLP-1 prescribing
practice". Payment amounts are not exported (they are not a quality signal).

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


def fetch_state(dist: str, st: str) -> int:
    """All distinct GLP-1-maker payment addresses in one state -> parts/<ST>.jsonl."""
    out_path = os.path.join(PARTS, f"{st}.jsonl")
    if os.path.exists(out_path):
        return sum(1 for _ in open(out_path))
    s = requests.Session()
    seen: dict[str, POI] = {}
    for maker in ("Novo Nordisk%", "Eli Lilly%", "Lilly USA%"):
        offset = 0
        while True:
            params = [
                ("conditions[0][property]", "recipient_state"), ("conditions[0][value]", st),
                ("conditions[1][property]", "name_of_drug_or_biological_or_device_or_medical_supply_1"),
                ("conditions[1][operator]", "in"),
                *[("conditions[1][value][]", d) for d in GLP1_DRUGS],
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
                print(f"[open_payments] {st} {maker} offset {offset}: gave up", file=sys.stderr)
                break
            if not rows:
                break
            for row in rows:
                zip5 = (row.get("recipient_zip_code") or "")[:5]
                ll = zip_centroid(zip5)
                poi = POI(
                    kind="glp1", name="GLP-1 prescribing practice",
                    address=row.get("recipient_primary_business_street_address_line1", ""),
                    city=row.get("recipient_city", ""), state=st, zip=zip5,
                    lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                    source="open_payments",
                    source_id=f"addr:{zip5}",   # business-address key, never a recipient id
                    tags=[f"maker:{maker.rstrip('%').lower()}"],
                    confidence=0.55,
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
    print(f"[open_payments] {st}: {len(seen)} addresses", file=sys.stderr)
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
