"""
Street-level geocoding pass. The registry fetchers place a business at its
ZIP centroid (fast, always available). This script walks etl/out/pois.*.jsonl
and, for every row still at a centroid, asks Nominatim for the street address
(cached on disk, one request per second per its policy) and rewrites the row
with the real coordinates and a "geocoded" tag. Safe to re-run; it only
touches rows that still lack the tag.
"""
from __future__ import annotations

import glob
import json
import os
import re
import sys
import requests
from common import OUT_DIR, in_bbox, nominatim_geocode

SUITE = re.compile(r"\b(STE|SUITE|UNIT|BLDG|FL|FLOOR|#)\b.*$", re.I)


def main(files):
    s = requests.Session()
    for path in files:
        rows = [json.loads(l) for l in open(path) if l.strip()]
        n_ok = n_try = 0
        for r in rows:
            if "geocoded" in r.get("tags", []) or not r.get("address") or r.get("source") in ("osm", "google_places"):
                continue
            n_try += 1
            addr = SUITE.sub("", r["address"]).strip(" ,")
            ll = nominatim_geocode(s, addr, r["city"], "TX", r["zip"])
            if ll and in_bbox(*ll):
                r["lat"], r["lon"] = round(ll[0], 6), round(ll[1], 6)
                r["tags"] = sorted(set(r.get("tags", [])) | {"geocoded"})
                n_ok += 1
            else:
                r["tags"] = sorted(set(r.get("tags", [])) | {"zip-centroid"})
            if n_try % 100 == 0:
                with open(path, "w") as f:
                    f.writelines(json.dumps(x) + "\n" for x in rows)
                print(f"[geocode] {os.path.basename(path)}: {n_ok}/{n_try}", file=sys.stderr)
        with open(path, "w") as f:
            f.writelines(json.dumps(x) + "\n" for x in rows)
        print(f"[geocode] {os.path.basename(path)}: {n_ok}/{n_try} geocoded", file=sys.stderr)


if __name__ == "__main__":
    main(sys.argv[1:] or sorted(glob.glob(os.path.join(OUT_DIR, "pois.npi.jsonl")) + glob.glob(os.path.join(OUT_DIR, "pois.open_payments.jsonl"))))
