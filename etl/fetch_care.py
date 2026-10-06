"""
Care layers that no registry carries, searched inside each metro bbox (the
same metro-only footing as the gym layer; see docs/near-me/methodology.md):

  shockwave   shockwave / PRP ("P-shot") clinics. Evidence grade EMERGING; a
              listing is wayfinding and consumer protection, not a referral.
  ved         vacuum erection device suppliers: medical-supply storefronts
              whose name or tags say urology, men's health, or the device.
  sextherapy  sex therapy and sexual-medicine practices.
  lab         walk-in draw sites of the national laboratory brands (Quest,
              Labcorp, Sonora Quest, Any Lab Test Now, BioReference).

Sources, in the gym layer's order:
1. OpenStreetMap via Overpass (healthcare=laboratory, shop=medical_supply,
   healthcare=* with a matching name) when reachable.
2. Nominatim keyword search tiled over the bbox (1 req/s, identified UA).
3. Google Places Text Search when GOOGLE_PLACES_KEY is set (name, address,
   geometry and types only, per the Places ToS).

Everything here is a business. OSM/Places rows are already at street level
("geocoded"). The NPI-registry half of these layers (urology, endocrinology,
sleep, labs, DME suppliers, keyword hits nationwide) comes from fetch_npi.py.
"""
from __future__ import annotations

import os
import re
import sys
import time
import requests
from common import POI, write_jsonl, zip_city
from fetch_npi import (KW_SEX_MEDICINE, KW_SEX_THERAPY, KW_SHOCK_BRAND, KW_SHOCK_GENERIC, KW_MENS_CONTEXT,
                       KW_VED_STRONG, KW_VED_WEAK, LAB_BRAND, NEG_SEX, PEDS)
from regions import METROS, Metro

UA = {"User-Agent": "skinoversteel-nearme-etl/0.1 (hello@skinoversteel.com)"}

# kind -> keyword queries for Nominatim / Google Places
QUERIES = {
    "shockwave": ["gainswave", "shockwave therapy ED", "P-shot", "acoustic wave therapy men's health"],
    "ved": ["vacuum erection device", "urology medical supply", "men's health medical supply"],
    "sextherapy": ["sex therapist", "sexual medicine clinic", "sexual health therapy"],
    "lab": ["Quest Diagnostics", "Labcorp", "Sonora Quest", "Any Lab Test Now", "BioReference"],
}


def classify(name: str, osm: dict | None = None) -> tuple[str, float, list[str]] | None:
    """(kind, confidence, tags) for a business we keep, else None."""
    t = osm or {}
    if PEDS.search(name):
        return None
    if LAB_BRAND.search(name) or (t.get("healthcare") == "laboratory" and LAB_BRAND.search(t.get("brand", ""))):
        return "lab", 0.85, ["draw-site", "geocoded"]
    if KW_SHOCK_BRAND.search(name):
        return "shockwave", 0.6, ["kw:shockwave", "geocoded"]
    if KW_SHOCK_GENERIC.search(name) and KW_MENS_CONTEXT.search(name):
        return "shockwave", 0.5, ["kw:shockwave", "geocoded"]
    if t.get("shop") == "medical_supply" or t.get("healthcare") in ("medical_supply",) or re.search(r"\b(medical (supply|supplies|equipment)|dme|home health (supply|supplies))\b", name, re.I):
        if KW_VED_STRONG.search(name):
            return "ved", 0.65, ["kw:ved", "geocoded"]
        if KW_VED_WEAK.search(name):
            return "ved", 0.45, ["kw:ved", "geocoded"]
        return None
    if not NEG_SEX.search(name):
        if KW_SEX_THERAPY.search(name):
            return "sextherapy", 0.6, ["kw:sex-therapy", "geocoded"]
        if KW_SEX_MEDICINE.search(name):
            return "sextherapy", 0.55, ["kw:sexual-medicine", "geocoded"]
    return None


def _poi(kind: str, conf: float, tags: list[str], name: str, address: str, city: str, zip5: str, lat: float, lon: float,
         source: str, source_id: str, m: Metro) -> POI:
    zc = zip_city(zip5)
    return POI(kind=kind, name=name, address=address, city=city or (zc[0] if zc else ""), state=zc[1] if zc else m.states[0],
               zip=zip5, lat=lat, lon=lon, source=source, source_id=source_id, tags=tags, confidence=conf)


def overpass(s, m: Metro):
    url = os.environ.get("OVERPASS_URL", "https://overpass-api.de/api/interpreter")
    b = m.bbox
    box = f"({b['south']},{b['west']},{b['north']},{b['east']})"
    q = f"""[out:json][timeout:180];
    ( nwr["healthcare"="laboratory"]{box};
      nwr["shop"="medical_supply"]{box};
      nwr["healthcare"]["name"~"sex therap|sexual|gainswave|shockwave|shock wave|p-shot|men's health|mens health",i]{box};
      nwr["amenity"~"clinic|doctors"]["name"~"sex therap|sexual|gainswave|shockwave|shock wave|p-shot|men's health|mens health",i]{box};
      nwr["office"="therapist"]["name"~"sex|sexual|intimacy",i]{box}; );
    out center tags;"""
    try:
        r = s.post(url, data={"data": q}, headers=UA, timeout=240)
        r.raise_for_status()
        for el in r.json().get("elements", []):
            t = el.get("tags", {})
            name = t.get("name")
            if not name:
                continue
            res = classify(name, t)
            if not res:
                continue
            kind, conf, tags = res
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lon = el.get("lon") or el.get("center", {}).get("lon")
            if lat is None or lon is None:
                continue
            yield _poi(kind, conf, tags, name,
                       " ".join(filter(None, [t.get("addr:housenumber"), t.get("addr:street")])),
                       t.get("addr:city", ""), t.get("addr:postcode", "")[:5], lat, lon,
                       "osm", f"{el['type']}/{el['id']}", m)
        return True
    except Exception as e:  # noqa: BLE001
        print(f"[care] {m.slug}: overpass unavailable ({e.__class__.__name__}); falling back to Nominatim", file=sys.stderr)
        return False


def tiles(m: Metro, n=3):
    b = m.bbox
    for i in range(n):
        for j in range(n):
            w = b["west"] + (b["east"] - b["west"]) * i / n
            e = b["west"] + (b["east"] - b["west"]) * (i + 1) / n
            so = b["south"] + (b["north"] - b["south"]) * j / n
            no = b["south"] + (b["north"] - b["south"]) * (j + 1) / n
            yield f"{w},{no},{e},{so}"


def nominatim(s, m: Metro):
    seen = set()
    for kws in QUERIES.values():
        for kw in kws:
            for vb in tiles(m):
                time.sleep(1.1)
                try:
                    r = s.get("https://nominatim.openstreetmap.org/search",
                              params={"q": kw, "viewbox": vb, "bounded": 1, "format": "jsonv2", "limit": 50, "addressdetails": 1},
                              headers=UA, timeout=60)
                    hits = r.json() if r.ok else []
                except Exception:
                    hits = []
                for h in hits:
                    if h["osm_id"] in seen:
                        continue
                    seen.add(h["osm_id"])
                    name = h.get("name") or h["display_name"].split(",")[0]
                    res = classify(name, {"healthcare": h.get("type", "")} if h.get("category") == "healthcare" else None)
                    if not res:
                        continue
                    kind, conf, tags = res
                    lat, lon = float(h["lat"]), float(h["lon"])
                    if not m.contains(lat, lon):
                        continue
                    a = h.get("address", {})
                    yield _poi(kind, round(conf - 0.05, 2), tags, name,
                               " ".join(filter(None, [a.get("house_number"), a.get("road")])),
                               a.get("city") or a.get("town") or a.get("suburb") or "", a.get("postcode", "")[:5], lat, lon,
                               "osm", f"{h['osm_type']}/{h['osm_id']}", m)


def google_places(s, m: Metro):
    key = os.environ.get("GOOGLE_PLACES_KEY")
    if not key:
        return
    b = m.bbox
    for kws in QUERIES.values():
        for kw in kws:
            r = s.post("https://places.googleapis.com/v1/places:searchText",
                       headers={"X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.types"},
                       json={"textQuery": f"{kw} {m.name}", "maxResultCount": 20,
                             "locationRestriction": {"rectangle": {"low": {"latitude": b["south"], "longitude": b["west"]}, "high": {"latitude": b["north"], "longitude": b["east"]}}}}, timeout=60)
            for p in r.json().get("places", []) if r.ok else []:
                name = p["displayName"]["text"]
                types = set(p.get("types", []))
                res = classify(name, {"shop": "medical_supply"} if "medical_supply_store" in types else None)
                if not res:
                    continue
                kind, conf, tags = res
                parts = [x.strip() for x in p.get("formattedAddress", "").split(",")]
                zm = re.search(r"\b(\d{5})(?:-\d{4})?\b", p.get("formattedAddress", ""))
                yield _poi(kind, min(0.85, conf + 0.1), tags, name, parts[0] if parts else "", parts[1] if len(parts) > 1 else "",
                           zm.group(1) if zm else "", p["location"]["latitude"], p["location"]["longitude"],
                           "google_places", p["id"], m)
            time.sleep(0.3)


def run():
    s = requests.Session()
    out: dict[str, POI] = {}
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    for m in METROS:
        if only and m.slug not in only:
            continue
        before = len(out)
        for src in (overpass(s, m), nominatim(s, m), google_places(s, m)):
            if src is True or src is False or src is None:
                continue
            for p in src:
                p.finalize()
                if p.id not in out or out[p.id].confidence < p.confidence:
                    out[p.id] = p
        print(f"[care] {m.slug}: +{len(out) - before}", file=sys.stderr)
    write_jsonl(out.values(), "care")


if __name__ == "__main__":
    run()
