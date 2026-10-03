"""
CMS Open Payments -> GLP-1 prescriber proxy for DFW.

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

import sys
import time
import requests
from common import POI, write_jsonl, zip_centroid

META = "https://openpaymentsdata.cms.gov/api/1/metastore/schemas/dataset/items?show-reference-ids=false"
QUERY = "https://openpaymentsdata.cms.gov/api/1/datastore/query/{dist}"

GLP1_DRUGS = ["OZEMPIC", "WEGOVY", "MOUNJARO", "ZEPBOUND", "RYBELSUS", "SAXENDA", "VICTOZA", "SEMAGLUTIDE", "TIRZEPATIDE"]
MAKERS = ["Novo Nordisk", "Eli Lilly", "Lilly USA"]
DFW_ZIP_PREFIXES = ("750", "751", "752", "753", "754", "760", "761", "762")


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


def run():
    s = requests.Session()
    dist = latest_general_distribution(s)
    seen: dict[str, POI] = {}
    # Grouped query: one row per distinct (address, city, zip) instead of one
    # per payment, so DFW takes a few dozen requests rather than thousands.
    for maker in ("Novo Nordisk%", "Eli Lilly%", "Lilly USA%"):
      for prefix in DFW_ZIP_PREFIXES:
        offset = 0
        while True:
            params = [
                ("conditions[0][property]", "recipient_state"), ("conditions[0][value]", "TX"),
                ("conditions[1][property]", "name_of_drug_or_biological_or_device_or_medical_supply_1"),
                ("conditions[1][operator]", "in"),
                *[("conditions[1][value][]", d) for d in GLP1_DRUGS],
                ("conditions[2][property]", "recipient_zip_code"), ("conditions[2][value]", f"{prefix}%"),
                ("conditions[2][operator]", "like"),
                ("conditions[3][property]", "applicable_manufacturer_or_applicable_gpo_making_payment_name"),
                ("conditions[3][value]", maker), ("conditions[3][operator]", "like"),
                ("count", "false"), ("limit", 500), ("offset", offset),
                *[("properties[]", f) for f in ("recipient_primary_business_street_address_line1", "recipient_city", "recipient_zip_code")],
                *[("groupings[]", f) for f in ("recipient_primary_business_street_address_line1", "recipient_city", "recipient_zip_code")],
            ]
            rows = None
            for attempt in range(4):
                try:
                    r = s.get(QUERY.format(dist=dist), params=params, timeout=180)
                    r.raise_for_status()
                    rows = r.json().get("results", [])
                    break
                except Exception:
                    time.sleep(2 ** attempt)
            if not rows:
                break
            for row in rows:
                zip5 = (row.get("recipient_zip_code") or "")[:5]
                ll = zip_centroid(zip5)
                poi = POI(
                    kind="glp1", name="GLP-1 prescribing practice",
                    address=row.get("recipient_primary_business_street_address_line1", ""),
                    city=row.get("recipient_city", ""), state="TX", zip=zip5,
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
        print(f"[open_payments] {maker} {prefix}: {len(seen)} cumulative", file=sys.stderr)
    write_jsonl(seen.values(), "open_payments")


if __name__ == "__main__":
    run()
