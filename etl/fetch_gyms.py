"""
"Serious" gyms inside each metro bbox (the gym layer is metro-only; see
docs/near-me/methodology.md): CrossFit boxes, powerlifting / strongman / barbell
clubs, boutique strength studios. Big-box chains are filtered out (they are a
different signal and are everywhere).

Sources:
1. OpenStreetMap via Overpass (leisure=fitness_centre / sport=*), when
   reachable. Set OVERPASS_URL to a mirror if the default is blocked.
2. Nominatim keyword search in the DFW bbox (always available, lower recall).
3. Google Places Text Search when GOOGLE_PLACES_KEY is set (best recall;
   results are cached and only name/address/geometry/types are kept, per the
   Places ToS - no reviews or photos are stored).
"""
from __future__ import annotations

import os
import re
import sys
import time
import requests
from common import POI, write_jsonl, zip_city
from regions import METROS, Metro

UA = {"User-Agent": "skinoversteel-nearme-etl/0.1 (hello@skinoversteel.com)"}
SERIOUS = re.compile(r"\b(crossfit|powerlifting|barbell|strength|strongman|weightlifting|iron|lifting|athletic|performance|f45|orangetheory|ot[fF]|kettlebell|hyrox|bodybuilding|metroflex)\b", re.I)
BIG_BOX = re.compile(r"\b(planet fitness|la fitness|24 hour|anytime fitness|lifetime|life time|equinox|gold'?s gym|ymca|snap fitness|crunch|eos|fitness connection|texas family fitness)\b", re.I)
KEYWORDS = ["crossfit", "powerlifting", "barbell club", "strength gym", "strongman", "weightlifting", "kettlebell", "metroflex"]


def classify(name: str, osm_class: str = "") -> list[str] | None:
    """Tags for a gym we keep, or None. Big-box chains are dropped. A name
    keyword (CrossFit, barbell, strength...) marks it "serious"; an
    independent fitness centre with no keyword is kept as "independent" at
    lower confidence so boutique strength studios are not lost."""
    if BIG_BOX.search(name):
        return None
    tags = [m.lower() for m in SERIOUS.findall(name)]
    if tags:
        return tags
    if osm_class == "fitness_centre" and not re.search(r"\b(yoga|pilates|barre|cycle|cycling|spin|dance|zumba|swim|aquatic|martial|karate|taekwondo|jiu|boxing|mma|climb|physical therapy|rehab)\b", name, re.I):
        return ["independent"]
    return None


def overpass(s, m: Metro):
    url = os.environ.get("OVERPASS_URL", "https://overpass-api.de/api/interpreter")
    b = m.bbox
    q = f"""[out:json][timeout:120];
    ( nwr["leisure"="fitness_centre"]({b['south']},{b['west']},{b['north']},{b['east']});
      nwr["sport"~"crossfit|weightlifting|powerlifting|fitness"]({b['south']},{b['west']},{b['north']},{b['east']}); );
    out center tags;"""
    try:
        r = s.post(url, data={"data": q}, headers=UA, timeout=180)
        r.raise_for_status()
        for el in r.json().get("elements", []):
            t = el.get("tags", {})
            name = t.get("name")
            if not name:
                continue
            tags = classify(name + " " + t.get("sport", ""), t.get("leisure", ""))
            if not tags:
                continue
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lon = el.get("lon") or el.get("center", {}).get("lon")
            zip5 = t.get("addr:postcode", "")[:5]
            zc = zip_city(zip5)
            yield POI(kind="gym", name=name,
                      address=" ".join(filter(None, [t.get("addr:housenumber"), t.get("addr:street")])),
                      city=t.get("addr:city") or (zc[0] if zc else ""), state=zc[1] if zc else m.states[0], zip=zip5,
                      lat=lat, lon=lon, source="osm", source_id=f"{el['type']}/{el['id']}", tags=tags + ["geocoded"], confidence=0.7)
        return True
    except Exception as e:  # noqa: BLE001
        print(f"[gyms] {m.slug}: overpass unavailable ({e.__class__.__name__}); falling back to Nominatim", file=sys.stderr)
        return False


def tiles(m: Metro, n=4):
    b = m.bbox
    for i in range(n):
        for j in range(n):
            w = b["west"] + (b["east"] - b["west"]) * i / n
            e = b["west"] + (b["east"] - b["west"]) * (i + 1) / n
            so = b["south"] + (b["north"] - b["south"]) * j / n
            no = b["south"] + (b["north"] - b["south"]) * (j + 1) / n
            yield f"{w},{no},{e},{so}"


def nominatim(s, m: Metro):
    """Nominatim caps at 50 results per query, so the bbox is tiled 4x4 and
    each tile is searched for the fitness-centre class and the keywords."""
    seen = set()
    for kw in ["gym", "fitness", *KEYWORDS]:
      for vb in tiles(m):
        time.sleep(1.1)
        try:
            r = s.get("https://nominatim.openstreetmap.org/search",
                      params={"q": kw, "viewbox": vb, "bounded": 1,
                              "format": "jsonv2", "limit": 50, "addressdetails": 1}, headers=UA, timeout=60)
            hits = r.json() if r.ok else []
        except Exception:
            hits = []
        for h in hits:
            if h["osm_id"] in seen:
                continue
            seen.add(h["osm_id"])
            name = h.get("name") or h["display_name"].split(",")[0]
            tags = classify(name, h.get("type", ""))
            if not tags:
                continue
            a = h.get("address", {})
            lat, lon = float(h["lat"]), float(h["lon"])
            if not m.contains(lat, lon):
                continue
            zip5 = a.get("postcode", "")[:5]
            zc = zip_city(zip5)
            yield POI(kind="gym", name=name,
                      address=" ".join(filter(None, [a.get("house_number"), a.get("road")])),
                      city=a.get("city") or a.get("town") or a.get("suburb") or (zc[0] if zc else ""),
                      state=zc[1] if zc else m.states[0],
                      zip=zip5, lat=lat, lon=lon,
                      source="osm", source_id=f"{h['osm_type']}/{h['osm_id']}", tags=tags + ["geocoded"],
                      confidence=0.45 if tags == ["independent"] else 0.65)


def google_places(s, m: Metro):
    key = os.environ.get("GOOGLE_PLACES_KEY")
    if not key:
        return
    for kw in ["crossfit", "powerlifting gym", "strength training gym", "barbell club"]:
            b = m.bbox
            r = s.post("https://places.googleapis.com/v1/places:searchText",
                       headers={"X-Goog-Api-Key": key, "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.types"},
                       json={"textQuery": f"{kw} {m.name}", "maxResultCount": 20,
                             "locationRestriction": {"rectangle": {"low": {"latitude": b["south"], "longitude": b["west"]}, "high": {"latitude": b["north"], "longitude": b["east"]}}}}, timeout=60)
            for p in r.json().get("places", []) if r.ok else []:
                name = p["displayName"]["text"]
                tags = classify(name)
                if not tags:
                    continue
                parts = [x.strip() for x in p.get("formattedAddress", "").split(",")]
                zm = re.search(r"\b(\d{5})(?:-\d{4})?\b", p.get("formattedAddress", ""))
                zip5 = zm.group(1) if zm else ""
                zc = zip_city(zip5)
                yield POI(kind="gym", name=name, address=parts[0] if parts else "", city=parts[1] if len(parts) > 1 else (zc[0] if zc else ""),
                          state=zc[1] if zc else m.states[0], zip=zip5, lat=p["location"]["latitude"], lon=p["location"]["longitude"],
                          source="google_places", source_id=p["id"], tags=tags + ["geocoded"], confidence=0.8)
            time.sleep(0.3)


def run():
    s = requests.Session()
    out: dict[str, POI] = {}
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    for m in METROS:
        if only and m.slug not in only:
            continue
        before = len(out)
        sources = [overpass(s, m), nominatim(s, m), google_places(s, m)]
        for src in sources:
            if src is True or src is False:
                continue
            for p in src:
                p.finalize()
                if p.id not in out or out[p.id].confidence < p.confidence:
                    out[p.id] = p
        print(f"[gyms] {m.slug}: +{len(out) - before}", file=sys.stderr)
    write_jsonl(out.values(), "gyms")


if __name__ == "__main__":
    run()
