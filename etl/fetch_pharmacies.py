"""
Compounding pharmacies (503A / 503B) in DFW.

Sources, in order of authority:
1. etl/data/tsbp_compounders.csv  — operator export from the Texas State Board of
   Pharmacy license verification (https://www.pharmacy.texas.gov/dbsearch/)
   filtered to Class A/E pharmacies flagged "compounding (sterile / non-sterile)".
   TSBP has no bulk API; export the search to CSV with columns
   name,address,city,zip,license,sterile(Y/N). This is the gate: a pharmacy
   not licensed by TSBP is not a pharmacy for our purposes.
2. etl/data/fda_503b.csv — FDA's registered outsourcing facilities list
   (https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities),
   filtered to TX. Columns: name,address,city,state,zip.
3. OSM/Nominatim name search for "compounding" pharmacies in the DFW bbox, used
   ONLY to geocode or suggest candidates for the operator list (confidence 0.35
   until a license is attached).
"""
from __future__ import annotations

import html
import re
import sys
import time
import requests
from common import DFW_BBOX, DFW_CITIES, POI, in_bbox, nominatim_geocode, read_seed_csv, write_jsonl, zip_centroid

UA = {"User-Agent": "skinoversteel-nearme-etl/0.1 (hello@skinoversteel.com)"}
FDA_503B = "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities"
DFW_CITY_SET = {c.lower() for c in DFW_CITIES} | {"heath", "southlake", "sachse", "forney", "midlothian", "red oak", "royse city", "trophy club", "roanoke"}


def fda_503b_live(s):
    """Scrape the FDA registered-outsourcing-facilities table (name, city, state)
    for Texas rows in DFW cities. The page carries no street address, so the
    row is geocoded by name + city and otherwise placed at the city centroid."""
    try:
        r = s.get(FDA_503B, headers={"User-Agent": "Mozilla/5.0 (compatible; skinoversteel-nearme-etl/0.1)"}, timeout=60)
        r.raise_for_status()
    except Exception as e:  # noqa: BLE001
        print(f"[pharmacy] FDA 503B page unavailable ({e.__class__.__name__})", file=sys.stderr)
        return
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", r.text, re.S):
        cells = [html.unescape(re.sub("<[^>]+>", "", c)).strip() for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        if not cells or not re.search(r",\s*TX\s*$", cells[0]):
            continue
        m = re.match(r"^(.*),\s*([A-Za-z .'-]+),\s*TX$", cells[0])
        if not m:
            continue
        name, city = m.group(1).strip(" ,"), m.group(2).strip()
        if city.lower() not in DFW_CITY_SET:
            continue
        yield name, city


def run():
    s = requests.Session()
    out: dict[str, POI] = {}

    for row in read_seed_csv("tsbp_compounders.csv"):
        zip5 = row.get("zip", "")[:5]
        ll = nominatim_geocode(s, row["address"], row["city"], "TX", zip5) or zip_centroid(zip5)
        p = POI(kind="pharmacy", name=row["name"], address=row["address"], city=row["city"], state="TX", zip=zip5,
                lat=ll[0] if ll else None, lon=ll[1] if ll else None, source="tsbp", source_id=row.get("license", ""),
                tags=["503a", "sterile" if (row.get("sterile", "").upper().startswith("Y")) else "non-sterile"],
                confidence=0.9).finalize()
        out[p.id] = p

    for row in read_seed_csv("fda_503b.csv"):
        if row.get("state", "TX").upper() != "TX":
            continue
        zip5 = row.get("zip", "")[:5]
        ll = nominatim_geocode(s, row["address"], row["city"], "TX", zip5) or zip_centroid(zip5)
        p = POI(kind="pharmacy", name=row["name"], address=row["address"], city=row["city"], state="TX", zip=zip5,
                lat=ll[0] if ll else None, lon=ll[1] if ll else None, source="fda_503b", source_id=row.get("fei", ""),
                tags=["503b"], confidence=0.95).finalize()
        out[p.id] = p

    # FDA 503B outsourcing facilities, scraped live when the seed CSV is absent.
    if not any(p.source == "fda_503b" for p in out.values()):
        for name, city in fda_503b_live(s):
            time.sleep(1.05)
            try:
                r = s.get("https://nominatim.openstreetmap.org/search",
                          params={"q": f"{name.split(',')[0]} {city} TX", "format": "jsonv2", "limit": 1, "addressdetails": 1},
                          headers=UA, timeout=60)
                hit = r.json()[0] if r.ok and r.json() else None
            except Exception:
                hit = None
            if hit and in_bbox(float(hit["lat"]), float(hit["lon"])):
                a = hit.get("address", {})
                addr = " ".join(filter(None, [a.get("house_number"), a.get("road")]))
                zip5, lat, lon = a.get("postcode", "")[:5], float(hit["lat"]), float(hit["lon"])
            else:
                # city centroid: the first zip listed for that city
                cz = next((z for z in read_seed_csv("dfw_zips.csv") if z["city"].lower() == city.lower()), None)
                if not cz:
                    continue
                addr, zip5, lat, lon = "", cz["zip"], float(cz["lat"]), float(cz["lon"])
            p = POI(kind="pharmacy", name=name, address=addr, city=city, state="TX", zip=zip5, lat=lat, lon=lon,
                    source="fda_503b", source_id="fda-503b-registry", tags=["503b", "city-level" if not addr else "geocoded"],
                    confidence=0.95).finalize()
            out[p.id] = p

    # Candidate discovery (not licensed yet -> low confidence, flagged for review).
    # Nominatim caps at 50 results, so the bbox is tiled.
    b = DFW_BBOX
    tiles = []
    n = 3
    for i in range(n):
        for j in range(n):
            w = b["west"] + (b["east"] - b["west"]) * i / n
            e = b["west"] + (b["east"] - b["west"]) * (i + 1) / n
            so = b["south"] + (b["north"] - b["south"]) * j / n
            no = b["south"] + (b["north"] - b["south"]) * (j + 1) / n
            tiles.append((w, no, e, so))
    seen_hits = set()
    for q in ["compounding pharmacy", "compounding", "apothecary"]:
      for (w, no, e, so) in tiles:
        time.sleep(1.1)
        try:
            r = s.get("https://nominatim.openstreetmap.org/search",
                      params={"q": q, "viewbox": f"{w},{no},{e},{so}", "bounded": 1,
                              "format": "jsonv2", "limit": 50, "addressdetails": 1}, headers=UA, timeout=60)
            hits = r.json() if r.ok else []
        except Exception:
            hits = []
        for h in hits:
            if h["osm_id"] in seen_hits:
                continue
            seen_hits.add(h["osm_id"])
            lat, lon = float(h["lat"]), float(h["lon"])
            if not in_bbox(lat, lon):
                continue
            a = h.get("address", {})
            p = POI(kind="pharmacy", name=h.get("name") or h["display_name"].split(",")[0],
                    address=" ".join(filter(None, [a.get("house_number"), a.get("road")])),
                    city=a.get("city") or a.get("town") or a.get("suburb") or "", state="TX", zip=a.get("postcode", "")[:5],
                    lat=lat, lon=lon, source="osm", source_id=f"{h['osm_type']}/{h['osm_id']}",
                    tags=["candidate", "unverified-license"], confidence=0.35).finalize()
            out.setdefault(p.id, p)
    write_jsonl(out.values(), "pharmacy")


if __name__ == "__main__":
    run()
