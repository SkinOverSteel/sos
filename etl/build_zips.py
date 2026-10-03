"""
Build etl/data/us_zips.csv (zip, city, state, lat, lon) for every US zip.

Sources (both public, both geography-only):
- GeoNames postal codes, US.zip (CC BY 4.0): zip -> place name, state, lat/lon.
- Census ZCTA Gazetteer: ZCTA -> internal-point centroid. Where a zip has a
  ZCTA, the Census centroid wins; GeoNames fills the rest (PO-box zips etc.).

Run once per year; commit the CSV. The app serves it sharded by 3-digit
prefix from /public/data/nearme/zips/ so /near-me never bundles 41k rows.
"""
from __future__ import annotations

import csv
import io
import re
import os
import sys
import zipfile
import requests
from common import DATA_DIR
from regions import STATES

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
GEONAMES = "https://download.geonames.org/export/zip/US.zip"
GAZ = "https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2023_Gazetteer/2023_Gaz_zcta_national.zip"
FIX = {"Mc Kinney": "McKinney", "De Soto": "DeSoto", "Mc Lean": "McLean", "Mc Allen": "McAllen", "Mc Donough": "McDonough"}


def fetch(url: str, name: str) -> bytes:
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        r = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (skinoversteel-nearme-etl)"}, timeout=300)
        r.raise_for_status()
        with open(path, "wb") as f:
            f.write(r.content)
    return open(path, "rb").read()


def main():
    zf = zipfile.ZipFile(io.BytesIO(fetch(GEONAMES, "US.zip")))
    rows: dict[str, list] = {}
    with zf.open("US.txt") as f:
        for line in io.TextIOWrapper(f, encoding="utf-8"):
            p = line.rstrip("\n").split("\t")
            zip5, city, st = p[1], p[2], p[4]
            if st not in STATES or not zip5.isdigit():
                continue
            city = FIX.get(city, city)
            city = re.sub(r"^Mc([a-z])", lambda m: "Mc" + m.group(1).upper(), city)  # Mckinney -> McKinney
            rows[zip5] = [zip5, city, st, float(p[9]), float(p[10])]
    gz = zipfile.ZipFile(io.BytesIO(fetch(GAZ, "gaz.zip")))
    name = next(n for n in gz.namelist() if n.endswith(".txt"))
    n_census = 0
    with gz.open(name) as f:
        rd = csv.DictReader(io.TextIOWrapper(f, encoding="utf-8"), delimiter="\t")
        for r in rd:
            r = {k.strip(): (v or "").strip() for k, v in r.items()}
            z = r["GEOID"]
            if z in rows:
                rows[z][3], rows[z][4] = float(r["INTPTLAT"]), float(r["INTPTLONG"])
                n_census += 1
    os.makedirs(DATA_DIR, exist_ok=True)
    out = os.path.join(DATA_DIR, "us_zips.csv")
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["zip", "city", "state", "lat", "lon"])
        for z in sorted(rows):
            r = rows[z]
            w.writerow([r[0], r[1], r[2], round(r[3], 5), round(r[4], 5)])
    print(f"wrote {len(rows)} zips ({n_census} with Census centroids) -> {out}", file=sys.stderr)


if __name__ == "__main__":
    main()
