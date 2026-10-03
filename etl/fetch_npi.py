"""
NPI registry (NPPES) -> TRT / metabolic clinic candidates for DFW.

Public API, no key: https://npiregistry.cms.hhs.gov/api-page
Business-level only: we export the PRACTICE LOCATION of organizations (NPI-2)
and of individuals (NPI-1) whose practice location is a commercial address.
Individual names are never written out; a clinic is identified by its
organization name or, for an NPI-1 at a group practice, the group's name.

Taxonomy codes queried (see docs/near-me/methodology.md):
  207RE0101X Endocrinology, Diabetes & Metabolism
  207RB0002X Obesity Medicine (bariatric, non-surgical)
  2083X0100X Preventive Medicine (incl. anti-aging/regenerative pathway)
  207Q00000X Family Medicine  -> kept only on a keyword hit
  207R00000X Internal Medicine -> kept only on a keyword hit
  208U00000X Urology (androgen deficiency is in-scope for urologists)
Keyword flags on organization names (TRT / hormone / weight loss / testosterone
/ men's health / low T / wellness) raise confidence or rescue a generalist.
"""
from __future__ import annotations

import re
import sys
import time
import requests
from common import POI, DFW_CITIES, in_bbox, write_jsonl, zip_centroid

API = "https://npiregistry.cms.hhs.gov/api/"

# code -> (kind, base confidence, NPPES description used in the query; the API
# matches on description text, not codes, so results are re-checked by code)
TAXONOMIES = {
    "207RE0101X": ("trt", 0.6, "Endocrinology, Diabetes & Metabolism"),
    "207RB0002X": ("glp1", 0.6, "Obesity Medicine"),
    "2083X0100X": ("trt", 0.45, "Preventive Medicine"),
    "208U00000X": ("trt", 0.5, "Urology"),
    "207Q00000X": ("trt", 0.2, "Family Medicine"),
    "207R00000X": ("trt", 0.2, "Internal Medicine"),
}
KW_TRT = re.compile(r"\b(trt|testosterone|hormones?|low ?t|men'?s? health|andropause|regenerative|anti[- ]?aging|longevity|optimi[sz]ation)\b", re.I)
KW_GLP = re.compile(r"\b(weight ?loss|obesity|bariatric|medical weight|metabolic|semaglutide|tirzepatide|glp)\b", re.I)


def _addr(rec: dict) -> dict | None:
    for a in rec.get("addresses", []):
        if a.get("address_purpose") == "LOCATION" and a.get("state") == "TX":
            return a
    return None


def query(session: requests.Session, **params):
    """Paginate one NPPES query (API caps at 200/page, skip<=1000)."""
    skip = 0
    while skip <= 1000:
        p = {"version": "2.1", "limit": 200, "skip": skip, "state": "TX", **params}
        for attempt in range(4):
            try:
                r = session.get(API, params=p, timeout=60)
                r.raise_for_status()
                data = r.json()
                break
            except Exception as e:  # noqa: BLE001
                time.sleep(2 ** attempt)
                data = {"results": []}
                err = e
        results = data.get("results", [])
        yield from results
        if len(results) < 200:
            return
        skip += 200


def run():
    s = requests.Session()
    seen: dict[str, POI] = {}
    for city in DFW_CITIES:
        for code, (kind, base_conf, desc) in TAXONOMIES.items():
            for rec in query(s, city=city.upper(), taxonomy_description=desc):
                a = _addr(rec)
                if not a or not any(t.get("code") == code for t in rec.get("taxonomies", [])):
                    continue
                basic = rec.get("basic", {})
                is_org = rec.get("enumeration_type") == "NPI-2"
                org = basic.get("organization_name") or basic.get("parent_organization_legal_business_name") or ""
                if not is_org and not org:
                    # Individual with no group: a solo office. We keep the location
                    # (a business) labelled by specialty only; no person name.
                    primary = next((t for t in rec.get("taxonomies", []) if t.get("code") == code), {})
                    org = f"{(primary.get('desc') or 'Medical').split(',')[0]} practice"
                name_text = f"{org} {' '.join(str(t.get('desc') or '') for t in rec.get('taxonomies', []))}"
                conf = base_conf
                k = kind
                if KW_GLP.search(name_text):
                    k, conf = "glp1", max(conf, 0.7)
                if KW_TRT.search(name_text):
                    k, conf = ("trt", max(conf, 0.75)) if k != "glp1" else (k, conf)
                if code in ("207Q00000X", "207R00000X") and conf < 0.5:
                    continue  # generalist without a keyword hit: not a signal
                zip5 = (a.get("postal_code") or "")[:5]
                ll = zip_centroid(zip5)
                poi = POI(
                    kind=k, name=org, address=" ".join(filter(None, [a.get("address_1"), a.get("address_2")])),
                    city=a.get("city", ""), state="TX", zip=zip5,
                    lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                    source="npi", source_id=str(rec.get("number")),
                    tags=[code] + (["kw:trt"] if KW_TRT.search(name_text) else []) + (["kw:glp1"] if KW_GLP.search(name_text) else []),
                    confidence=conf,
                ).finalize()
                # Roll up multiple providers at one business address.
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
    run()
