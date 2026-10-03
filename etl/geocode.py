"""
Street-level geocoding pass, nationwide.

The registry fetchers place a business at its ZIP centroid. This pass walks
etl/out/pois.*.jsonl and resolves street addresses with:

1. The Census Bureau batch geocoder (public, no key, 10,000 addresses per
   request): https://geocoding.geo.census.gov/geocoder/locations/addressbatch
2. Nominatim, only for rows the Census could not match AND that sit inside
   a metro bbox (its 1 req/s policy makes it a street-scale tool, not a
   national one).

Results are cached in etl/out/geocode_cache.json keyed by the normalised
address, so re-runs only pay for new rows. Rows that resolve carry the tag
"geocoded"; the rest carry "zip-centroid".
"""
from __future__ import annotations

import csv
import glob
import io
import json
import os
import re
import sys
import time
import requests
from common import OUT_DIR, in_bbox, nominatim_geocode
from regions import metro_for

CENSUS = "https://geocoding.geo.census.gov/geocoder/locations/addressbatch"
SUITE = re.compile(r"\b(STE|SUITE|UNIT|BLDG|FL|FLOOR|#|RM|ROOM|DEPT)\b.*$", re.I)
CACHE = os.path.join(OUT_DIR, "geocode_cache.json")


def key(r: dict) -> str:
    return f"{SUITE.sub('', r['address']).strip(' ,')}|{r['city']}|{r['state']}|{r['zip']}".lower()


def census_batch(session: requests.Session, items: list[tuple[str, dict]]) -> dict[str, tuple[float, float] | None]:
    buf = io.StringIO()
    w = csv.writer(buf)
    for i, (_, r) in enumerate(items):
        w.writerow([i, SUITE.sub("", r["address"]).strip(" ,"), r["city"], r["state"], r["zip"]])
    out: dict[str, tuple[float, float] | None] = {}
    for attempt in range(4):
        try:
            resp = session.post(CENSUS, files={"addressFile": ("addresses.csv", buf.getvalue().encode(), "text/csv")},
                                data={"benchmark": "Public_AR_Current"}, timeout=900)
            resp.raise_for_status()
            break
        except Exception as e:  # noqa: BLE001
            print(f"[geocode] census batch failed ({e.__class__.__name__}), retry {attempt+1}", file=sys.stderr)
            time.sleep(10 * 2 ** attempt)
            resp = None
    if resp is None:
        return out
    for row in csv.reader(io.StringIO(resp.text)):
        if len(row) < 3 or not row[0].isdigit():
            continue
        idx, match = int(row[0]), row[2]
        k = items[idx][0]
        if match == "Match" and len(row) > 5 and row[5]:
            lon, lat = (float(x) for x in row[5].split(","))
            out[k] = (lat, lon)
        else:
            out[k] = None
    return out


def main(files: list[str]):
    cache: dict = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
    session = requests.Session()
    for path in files:
        rows = [json.loads(l) for l in open(path) if l.strip()]
        todo = [(key(r), r) for r in rows
                if "geocoded" not in r.get("tags", []) and r.get("address") and r.get("source") not in ("osm", "google_places")]
        pending = {}
        for k, r in todo:
            if k not in cache:
                pending[k] = r
        items = list(pending.items())
        print(f"[geocode] {os.path.basename(path)}: {len(todo)} candidates, {len(items)} uncached", file=sys.stderr)
        for i in range(0, len(items), 9000):
            res = census_batch(session, items[i:i + 9000])
            cache.update({k: (list(v) if v else None) for k, v in res.items()})
            with open(CACHE, "w") as f:
                json.dump(cache, f)
            print(f"[geocode]   census batch {i // 9000 + 1}: {sum(1 for v in res.values() if v)}/{len(res)} matched", file=sys.stderr)
        # Nominatim fallback inside metros only (skipped with --census-only)
        n_nom = 0
        for k, r in todo:
            if "--census-only" in sys.argv:
                break
            if cache.get(k) is None and k in cache and metro_for(r.get("lat"), r.get("lon")):
                ll = nominatim_geocode(session, SUITE.sub("", r["address"]).strip(" ,"), r["city"], r["state"], r["zip"])
                cache[k] = list(ll) if ll else None
                n_nom += 1
                if n_nom % 100 == 0:
                    with open(CACHE, "w") as f:
                        json.dump(cache, f)
        n_ok = 0
        for r in rows:
            if "geocoded" in r.get("tags", []):
                n_ok += 1
                continue
            v = cache.get(key(r)) if r.get("address") else None
            if v and in_bbox(v[0], v[1]):
                r["lat"], r["lon"] = round(v[0], 6), round(v[1], 6)
                r["tags"] = sorted((set(r.get("tags", [])) | {"geocoded"}) - {"zip-centroid"})
                n_ok += 1
            else:
                r["tags"] = sorted(set(r.get("tags", [])) | {"zip-centroid"})
        with open(path, "w") as f:
            f.writelines(json.dumps(x) + "\n" for x in rows)
        with open(CACHE, "w") as f:
            json.dump(cache, f)
        print(f"[geocode] {os.path.basename(path)}: {n_ok}/{len(rows)} at street level ({n_nom} via Nominatim)", file=sys.stderr)


if __name__ == "__main__":
    main([a for a in sys.argv[1:] if not a.startswith("-")] or sorted(glob.glob(os.path.join(OUT_DIR, "pois.npi.jsonl")) + glob.glob(os.path.join(OUT_DIR, "pois.open_payments.jsonl")) + glob.glob(os.path.join(OUT_DIR, "pois.pharmacy.jsonl"))))
