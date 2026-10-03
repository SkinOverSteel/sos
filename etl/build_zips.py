"""
Build etl/data/dfw_zips.csv (zip, city, lat, lon) for the DFW zip ranges from
the public Zippopotam.us API (centroids only; no person data). Run once, commit
the CSV; the Next app imports the same table for /near-me zip lookup.
"""
import csv, os, sys, concurrent.futures as cf
import requests
from common import DATA_DIR, in_bbox

RANGES = [(75000, 75299), (75400, 75499), (76000, 76299)]

def fetch(z):
    try:
        r = requests.get(f"https://api.zippopotam.us/us/{z:05d}", timeout=20)
        if r.status_code != 200:
            return None
        p = r.json()["places"][0]
        lat, lon = float(p["latitude"]), float(p["longitude"])
        if not in_bbox(lat, lon):
            return None
        return (f"{z:05d}", p["place name"].replace("Mc Kinney", "McKinney").replace("De Soto", "DeSoto"), lat, lon)
    except Exception:
        return None

if __name__ == "__main__":
    zips = [z for a, b in RANGES for z in range(a, b + 1)]
    rows = []
    with cf.ThreadPoolExecutor(6) as ex:
        for res in ex.map(fetch, zips):
            if res:
                rows.append(res)
    rows.sort()
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(os.path.join(DATA_DIR, "dfw_zips.csv"), "w", newline="") as f:
        w = csv.writer(f); w.writerow(["zip", "city", "lat", "lon"]); w.writerows(rows)
    print(f"wrote {len(rows)} zips", file=sys.stderr)
