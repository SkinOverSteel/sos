"""
NPI registry (NPPES) -> clinic candidates, nationwide, for every registry layer
that comes from a taxonomy code: TRT / metabolic (the scored layers) and the
care layers (urology, endocrinology, sleep medicine, labs, VED suppliers,
sexual medicine / sex therapy, implant keyword hits).

Two paths:
  bulk (default)  stream the monthly NPPES Data Dissemination zip from
                  etl/cache/nppes.zip (download URL on
                  https://download.cms.gov/nppes/NPI_Files.html). ~8.5M rows,
                  read once, never unpacked to disk.
  --metro <slug>  the public API (https://npiregistry.cms.hhs.gov/api-page),
                  city by city, for a quick refresh of one metro.

Business-level only: we export the PRACTICE LOCATION of organizations (NPI-2)
and of individuals (NPI-1). Individual names are never written; a solo office
is labelled by its specialty ("Urology practice"). Deactivated NPIs are
skipped. Non-US practice addresses are skipped.

Taxonomy codes, verified against the NUCC taxonomy CSV (v26.1); see
docs/near-me/methodology.md:
  scored layers
    207RE0101X Internal Medicine, Endocrinology, Diabetes & Metabolism -> trt
    207RB0002X Internal Medicine, Obesity Medicine                     -> glp1
    2083P0901X Preventive Medicine, Public Health & General Preventive -> trt (anti-aging route)
    208800000X Urology                                                 -> trt
    207Q00000X Family Medicine    -> trt, kept only on a keyword hit
    207R00000X Internal Medicine  -> trt, kept only on a keyword hit
  care layers
    208800000X Urology                                                 -> urology
    207RE0101X Endocrinology, Diabetes & Metabolism                    -> endo
    261QS1200X Clinic/Center, Sleep Disorder Diagnostic                -> sleep
    207RS0012X / 207QS1201X / 2084S0012X / 207YS0012X Sleep Medicine   -> sleep
    173F00000X Sleep Specialist, PhD                                   -> sleep
    291U00000X Clinical Medical Laboratory                             -> lab (brand or draw-site keyword)
    332B00000X Durable Medical Equipment & Medical Supplies            -> ved (keyword only)
    behavioral-health and physician groups with a sexual-medicine or
    sex-therapy keyword in the ORGANIZATION name                       -> sextherapy
  Pediatric codes (2088P0231X, 2080P0205X, 2080S0012X) are not matched and a
  pediatric/children's name drops the row from every care layer.

Earlier versions of this file used 208U00000X for urology and 2083X0100X
for preventive medicine; those codes are Clinical Pharmacology and
Occupational Medicine. Fixed here; the first refresh after this change
re-draws the TRT layer accordingly.
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

# ---- scored layers (trt / glp1) ---------------------------------------------

# code -> (kind, base confidence, NPPES description for the API path)
TAXONOMIES = {
    "207RE0101X": ("trt", 0.6, "Endocrinology, Diabetes & Metabolism"),
    "207RB0002X": ("glp1", 0.6, "Obesity Medicine"),
    "2083P0901X": ("trt", 0.45, "Public Health & General Preventive Medicine"),
    "208800000X": ("trt", 0.5, "Urology"),
    "207Q00000X": ("trt", 0.2, "Family Medicine"),
    "207R00000X": ("trt", 0.2, "Internal Medicine"),
}
GENERALIST = {"207Q00000X", "207R00000X"}
DESC = {"207RE0101X": "Endocrinology", "207RB0002X": "Obesity medicine", "2083P0901X": "Preventive medicine",
        "208800000X": "Urology", "207Q00000X": "Family medicine", "207R00000X": "Internal medicine"}
KW_TRT = re.compile(r"\b(trt|testosterone|hormones?|low ?t|men'?s? health|andropause|regenerative|anti[- ]?aging|longevity|optimi[sz]ation)\b", re.I)
KW_GLP = re.compile(r"\b(weight ?loss|obesity|bariatric|medical weight|metabolic|semaglutide|tirzepatide|glp)\b", re.I)


def classify(codes: list[str], org: str, is_org: bool = True) -> tuple[str, float, list[str]] | None:
    hits = [c for c in codes if c in TAXONOMIES]
    if not hits:
        return None
    # General preventive medicine also covers public-health doctors. A solo
    # individual with only that code and no keyword is not a TRT signal.
    if not is_org and set(hits) <= {"2083P0901X"} | GENERALIST and not (KW_TRT.search(org) or KW_GLP.search(org)):
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


# ---- care layers ---------------------------------------------------------------

# code -> (kind, confidence from the taxonomy alone, API description)
CARE_TAXONOMIES = {
    "208800000X": ("urology", 0.8, "Urology"),
    "207RE0101X": ("endo", 0.8, "Endocrinology, Diabetes & Metabolism"),
    "261QS1200X": ("sleep", 0.8, "Sleep Disorder Diagnostic"),
    "207RS0012X": ("sleep", 0.8, "Sleep Medicine"),
    "207QS1201X": ("sleep", 0.8, "Sleep Medicine"),
    "2084S0012X": ("sleep", 0.8, "Sleep Medicine"),
    "207YS0012X": ("sleep", 0.8, "Sleep Medicine"),
    "173F00000X": ("sleep", 0.6, "Sleep Specialist, PhD"),
    "291U00000X": ("lab", 0.0, "Clinical Medical Laboratory"),              # keyword / brand gated below
    "332B00000X": ("ved", 0.0, "Durable Medical Equipment & Medical Supplies"),  # keyword gated below
}
CARE_DESC = {"urology": "Urology", "endo": "Endocrinology", "sleep": "Sleep medicine"}
# Taxonomy prefixes whose organizations may carry a sexual-medicine keyword:
# behavioral health (10x), physicians (20x), clinics (26x), groups (193x),
# PAs and advanced-practice nurses (36x). Pharmacies, suppliers and labs never.
SEX_PREFIXES = ("10", "20", "26", "193", "36")

PEDS = re.compile(r"\b(pediatric|paediatric|children'?s?|kids?|adolescent)\b", re.I)
KW_IMPLANT = re.compile(r"\b(penile (implants?|prosthe\w*)|prosthetic urolog\w*|implant urolog\w*)\b", re.I)
# ED-specific brands stand alone; generic wave words need a men's-health context
# (ESWT is also plantar fasciitis and tennis elbow).
KW_SHOCK_BRAND = re.compile(r"\b(gainswave|p[- ]?shot|priapus shot|the priapus|phoenix pro)\b", re.I)
KW_SHOCK_GENERIC = re.compile(r"\b(shock ?wave|acoustic wave|li[- ]?eswt|eswt|focused wave|wave therapy|platelet[- ]rich plasma|prp)\b", re.I)
KW_MENS_CONTEXT = re.compile(r"\b(men'?s?|male|erectile|erection|ed|sexual|urolog\w*|intimacy|vitality|testosterone)\b", re.I)
KW_VED_STRONG = re.compile(r"\b(vacuum (erection|therapy|device|pump)s?|erectile|erection|impotence|ed pumps?)\b", re.I)
KW_VED_WEAK = re.compile(r"\b(men'?s? health|urolog\w*)\b", re.I)
KW_SEX_THERAPY = re.compile(r"\b(sex therap\w*|sexolog\w*|sexual health therap\w*)\b", re.I)
KW_SEX_MEDICINE = re.compile(r"\b(sexual medicine|sexual dysfunction|sexual wellness|men'?s? sexual|erectile|intimacy)\b", re.I)
KW_SEX_WEAK = re.compile(r"\b(sexual health)\b", re.I)
NEG_SEX = re.compile(r"\b(assault|abuse|offender|violence|trafficking|forensic|rape|crisis|advocacy|hiv|std|sti|testing|surrogacy|fertility|ivf)\b", re.I)
LAB_BRAND = re.compile(r"\b(quest diagnostics|questhealth|labcorp|laboratory corporation of america|sonora quest|any ?lab ?test ?now|bio[- ]?reference|clinical pathology laborator\w*|arup laborator\w*|mayo clinic laborator\w*)\b", re.I)
LAB_DRAW = re.compile(r"\b(patient service|draw|phlebotomy|blood|diagnostics?|medical lab\w*|lab(oratory)? services?|clinical lab\w*)\b", re.I)
NEG_LAB = re.compile(r"\b(veterinary|animal|dental|forensic|research|genomics?|genetics?|toxicology|cytology|histology|dermatopatholog\w*|cord blood|sperm|cryobank|environmental|water|food)\b", re.I)


def care_classify(codes: list[str], org: str, is_org: bool) -> list[tuple[str, float, list[str]]]:
    """Every care layer this record belongs to -> [(kind, confidence, tags)].

    A record can feed several layers (a urology group is a urologist and, on a
    keyword, an implant practice). Names are the organization's; an
    individual's record contributes only its taxonomy and address.
    """
    out: list[tuple[str, float, list[str]]] = []
    if PEDS.search(org):
        return out
    hits = {c: CARE_TAXONOMIES[c] for c in codes if c in CARE_TAXONOMIES}
    best: dict[str, tuple[float, list[str]]] = {}
    for c, (kind, conf, _) in hits.items():
        if conf <= 0:
            continue
        prev = best.get(kind)
        if prev is None or prev[0] < conf:
            best[kind] = (conf, [c])
        elif prev[0] == conf:
            prev[1].append(c)
    for kind, (conf, tags) in best.items():
        out.append((kind, conf, sorted(tags)))

    if "208800000X" in hits and is_org and KW_IMPLANT.search(org):
        out.append(("implant", 0.7, ["208800000X", "kw:implant"]))

    if is_org and "291U00000X" in hits and not NEG_LAB.search(org):
        if LAB_BRAND.search(org):
            out.append(("lab", 0.85, ["291U00000X", "draw-site"]))
        elif LAB_DRAW.search(org):
            out.append(("lab", 0.55, ["291U00000X", "kw:lab"]))

    if is_org and "332B00000X" in hits:
        if KW_VED_STRONG.search(org):
            out.append(("ved", 0.65, ["332B00000X", "kw:ved"]))
        elif KW_VED_WEAK.search(org):
            out.append(("ved", 0.45, ["332B00000X", "kw:ved"]))

    if is_org and org and not NEG_SEX.search(org):
        if KW_SHOCK_BRAND.search(org):
            out.append(("shockwave", 0.6, ["kw:shockwave"]))
        elif KW_SHOCK_GENERIC.search(org) and KW_MENS_CONTEXT.search(org):
            out.append(("shockwave", 0.5, ["kw:shockwave"]))
        if any(c.startswith(SEX_PREFIXES) for c in codes):
            if KW_SEX_THERAPY.search(org):
                out.append(("sextherapy", 0.6, ["kw:sex-therapy"]))
            elif KW_SEX_MEDICINE.search(org):
                out.append(("sextherapy", 0.55, ["kw:sexual-medicine"]))
            elif KW_SEX_WEAK.search(org):
                out.append(("sextherapy", 0.4, ["kw:sexual-health"]))
    return out


ALL_CODES = set(TAXONOMIES) | set(CARE_TAXONOMIES)
KW_ANY_CARE = re.compile("|".join(r.pattern for r in (KW_SHOCK_BRAND, KW_SHOCK_GENERIC, KW_SEX_THERAPY, KW_SEX_MEDICINE, KW_SEX_WEAK)), re.I)


def _rows_for(codes: list[str], org: str, is_org: bool, address: str, city: str, st: str, zip5: str):
    """All POIs one NPPES record contributes (scored + care layers)."""
    ll = zip_centroid(zip5)
    lat, lon = (ll[0], ll[1]) if ll else (None, None)
    res = classify(codes, org, is_org)
    if res:
        kind, conf, tags = res
        name = org
        if not name:
            primary = next((c for c in codes if c in TAXONOMIES and c not in GENERALIST), None) or codes[0]
            name = f"{DESC.get(primary, 'Medical')} practice"
        yield POI(kind=kind, name=name, address=address, city=city, state=st, zip=zip5, lat=lat, lon=lon,
                  source="npi", source_id="org" if is_org else "ind", tags=tags, confidence=conf)
    for kind, conf, tags in care_classify(codes, org, is_org):
        name = org or f"{CARE_DESC.get(kind, 'Medical')} practice"
        yield POI(kind=kind, name=name, address=address, city=city, state=st, zip=zip5, lat=lat, lon=lon,
                  source="npi", source_id="org" if is_org else "ind", tags=tags, confidence=conf)


def _merge(seen: dict[str, POI], poi: POI) -> None:
    poi.finalize()
    prev = seen.get(poi.id)
    if prev:
        prev.confidence = min(1.0, prev.confidence + 0.05)
        prev.tags = sorted(set(prev.tags) | set(poi.tags))
    else:
        seen[poi.id] = poi


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
                is_org = row[i_type] == "2"
                org = row[i_org] or row[i_other] or (row[i_parent] if i_parent >= 0 else "")
                if not any(c in ALL_CODES for c in codes) and not (is_org and org and KW_ANY_CARE.search(org)):
                    continue
                zip5 = row[i_zip][:5]
                for poi in _rows_for(codes, org, is_org, " ".join(filter(None, [row[i_a1], row[i_a2]])), row[i_city], st, zip5):
                    _merge(seen, poi)
    kinds = {}
    for p in seen.values():
        kinds[p.kind] = kinds.get(p.kind, 0) + 1
    print(f"[npi] done: {n} rows scanned, {len(seen)} business locations {kinds}, {time.time()-t0:.0f}s", file=sys.stderr)
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
    descs = sorted({d for _, _, d in TAXONOMIES.values()} | {d for _, _, d in CARE_TAXONOMIES.values()})
    for city in cities:
        for desc in descs:
            for rec in query(s, city=city.upper(), state=state, taxonomy_description=desc):
                a = _addr(rec)
                codes = [t.get("code") for t in rec.get("taxonomies", []) if t.get("code")]
                if not a or not any(c in ALL_CODES for c in codes):
                    continue
                basic = rec.get("basic", {})
                is_org = rec.get("enumeration_type") == "NPI-2"
                org = basic.get("organization_name") or basic.get("parent_organization_legal_business_name") or ""
                zip5 = (a.get("postal_code") or "")[:5]
                for poi in _rows_for(codes, org, is_org, " ".join(filter(None, [a.get("address_1"), a.get("address_2")])),
                                     a.get("city", ""), a.get("state", state), zip5):
                    _merge(seen, poi)
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
