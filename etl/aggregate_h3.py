"""
Merge the per-source POI files, aggregate to H3 hexes (res 7/8/9), score each
hex with the Metabolic Infrastructure Index (MII, 0-100), and export what the
Next app reads:

  public/data/nearme/hex-r{7,8,9}.geojson   hex polygons + scores (map layers)
  src/data/nearme/pois.json                 compact POI list (near-me ranking)
  src/data/nearme/cities.json               per-city rollups (programmatic pages)
  src/data/nearme/zips.json                 zip -> centroid (zip input)
  src/data/nearme/meta.json                 build date, counts, weights

MII (see docs/near-me/methodology.md):
  For each hex and each kind k in {trt, glp1, pharmacy, gym}
    raw_k   = sum(confidence) of POIs in the hex
            + 0.5 * sum(confidence) of POIs in the 6 neighbours (smoothing)
    comp_k  = min(1, log1p(raw_k) / log1p(P95_k))   P95 over DFW hexes at that res
    MII     = 100 * (0.30 trt + 0.25 glp1 + 0.20 pharmacy + 0.25 gym)
  A hex with no POIs in it or around it is not emitted (score 0 = no data).

Everything here describes businesses. Nothing about who lives in a hex is used
or inferred, and the hex sizes (res 9 ~ 0.1 km2) are coarser than a building.
"""
from __future__ import annotations

import csv
import glob
import json
import math
import os
import statistics
import sys
from collections import defaultdict

import h3
from common import DATA_DIR, KINDS, OUT_DIR, in_bbox, read_jsonl, read_seed_csv

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public", "data", "nearme")
SRC = os.path.join(ROOT, "src", "data", "nearme")

WEIGHTS = {"trt": 0.30, "glp1": 0.25, "pharmacy": 0.20, "gym": 0.25}
RESOLUTIONS = (7, 8, 9)
MIN_CONFIDENCE = 0.3


_ZIP_CITY: dict[str, str] | None = None


def canonical_city(zip5: str, fallback: str) -> str:
    """Registries spell cities freely (Ft Worth, Mckiney, Grand Prarie). The
    zip table's city is the canonical label whenever the zip is known."""
    global _ZIP_CITY
    if _ZIP_CITY is None:
        _ZIP_CITY = {r["zip"]: r["city"] for r in read_seed_csv("dfw_zips.csv")}
    return _ZIP_CITY.get(zip5, fallback)


def load_pois() -> list[dict]:
    rows: dict[str, dict] = {}
    for path in sorted(glob.glob(os.path.join(OUT_DIR, "pois.*.jsonl"))):
        if path.endswith("pois.merged.jsonl"):
            continue
        for r in read_jsonl(path):
            if r["kind"] not in KINDS or r["confidence"] < MIN_CONFIDENCE or not in_bbox(r["lat"], r["lon"]):
                continue
            r["city"] = canonical_city(r["zip"], r["city"])
            prev = rows.get(r["id"])
            if prev is None or prev["confidence"] < r["confidence"]:
                rows[r["id"]] = r
    return list(rows.values())


def load_prices() -> dict[str, dict]:
    """Approved crowdsourced price reports (etl/data/price_reports.csv, exported
    by moderate.py). Aggregated to a range only once a POI has >= 3 reports;
    below that the kind-level published range is shown instead."""
    by_poi: dict[str, list[float]] = defaultdict(list)
    for row in read_seed_csv("price_reports.csv"):
        if row.get("status", "approved") != "approved":
            continue
        try:
            by_poi[row["poi_id"]].append(float(row["monthly_usd"]))
        except (KeyError, ValueError):
            continue
    out = {}
    for pid, vals in by_poi.items():
        if len(vals) < 3:
            continue
        vals.sort()
        q = statistics.quantiles(vals, n=4) if len(vals) >= 4 else [vals[0], statistics.median(vals), vals[-1]]
        out[pid] = {"low": round(q[0]), "high": round(q[2]), "n": len(vals)}
    return out


def main():
    pois = load_pois()
    if not pois:
        sys.exit("no POIs in etl/out; run the fetch_* scripts first")
    prices = load_prices()

    # H3 index each POI at r9 (parents derived from it).
    for p in pois:
        p["h3_9"] = h3.latlng_to_cell(p["lat"], p["lon"], 9)

    layers = {}
    for res in RESOLUTIONS:
        own = defaultdict(lambda: defaultdict(float))
        for p in pois:
            cell = h3.cell_to_parent(p["h3_9"], res) if res < 9 else p["h3_9"]
            own[cell][p["kind"]] += p["confidence"]
        # neighbour smoothing
        smoothed = defaultdict(lambda: defaultdict(float))
        for cell, kinds in own.items():
            for k, v in kinds.items():
                smoothed[cell][k] += v
                for nb in h3.grid_ring(cell, 1):
                    smoothed[nb][k] += 0.5 * v
        p95 = {}
        for k in KINDS:
            vals = sorted(v[k] for v in smoothed.values() if v[k] > 0)
            p95[k] = vals[int(0.95 * (len(vals) - 1))] if vals else 1.0
        features = []
        for cell, kinds in smoothed.items():
            comps = {k: min(1.0, math.log1p(kinds[k]) / math.log1p(p95[k])) if p95[k] > 0 else 0.0 for k in KINDS}
            mii = round(100 * sum(WEIGHTS[k] * comps[k] for k in KINDS))
            if mii == 0:
                continue
            boundary = h3.cell_to_boundary(cell)  # [(lat, lng), ...]
            ring = [[round(lng, 5), round(lat, 5)] for lat, lng in boundary]
            ring.append(ring[0])
            features.append({
                "type": "Feature",
                "properties": {"h3": cell, "mii": mii, **{k: round(own[cell][k], 2) for k in KINDS}, "n": sum(1 for p in pois if (h3.cell_to_parent(p["h3_9"], res) if res < 9 else p["h3_9"]) == cell)},
                "geometry": {"type": "Polygon", "coordinates": [ring]},
            })
        features.sort(key=lambda f: -f["properties"]["mii"])
        layers[res] = {"type": "FeatureCollection", "features": features, "res": res, "p95": p95}
        print(f"[h3] r{res}: {len(features)} hexes", file=sys.stderr)

    os.makedirs(PUBLIC, exist_ok=True)
    os.makedirs(SRC, exist_ok=True)
    for res, fc in layers.items():
        with open(os.path.join(PUBLIC, f"hex-r{res}.geojson"), "w") as f:
            json.dump(fc, f, separators=(",", ":"))

    # Compact POI export. No source ids for Open Payments rows (address-level
    # only), no person names anywhere.
    compact = []
    for p in sorted(pois, key=lambda p: (p["kind"], p["city"], p["name"])):
        compact.append({
            "id": p["id"], "k": p["kind"], "n": p["name"], "a": p["address"], "c": p["city"], "z": p["zip"],
            "lat": round(p["lat"], 5), "lon": round(p["lon"], 5), "s": p["source"], "cf": round(p["confidence"], 2),
            "t": p.get("tags", [])[:4], "h": h3.cell_to_parent(p["h3_9"], 8),
            **({"pr": prices[p["id"]]} if p["id"] in prices else {}),
        })
    with open(os.path.join(SRC, "pois.json"), "w") as f:
        json.dump(compact, f, separators=(",", ":"), ensure_ascii=False)

    # Per-city rollups for /trt/{city} and /glp1/{city}.
    cities = defaultdict(lambda: {"counts": defaultdict(int), "ids": []})
    for p in compact:
        if not p["c"]:
            continue
        cities[p["c"]]["counts"][p["k"]] += 1
        cities[p["c"]]["ids"].append(p["id"])
    city_out = []
    r8 = {f["properties"]["h3"]: f["properties"]["mii"] for f in layers[8]["features"]}
    for name, c in cities.items():
        hexes = {p["h"] for p in compact if p["c"] == name}
        scores = [r8[h] for h in hexes if h in r8]
        city_out.append({
            "city": name, "slug": name.lower().replace(" ", "-").replace(".", ""),
            "counts": dict(c["counts"]), "total": sum(c["counts"].values()),
            "mii": round(statistics.mean(scores)) if scores else 0,
            "mii_max": max(scores) if scores else 0,
        })
    city_out.sort(key=lambda c: -c["total"])
    with open(os.path.join(SRC, "cities.json"), "w") as f:
        json.dump(city_out, f, separators=(",", ":"))

    zips = {r["zip"]: [float(r["lat"]), float(r["lon"]), r["city"]] for r in read_seed_csv("dfw_zips.csv")}
    with open(os.path.join(SRC, "zips.json"), "w") as f:
        json.dump(zips, f, separators=(",", ":"))

    import datetime
    meta = {
        "built": datetime.date.today().isoformat(),
        "region": "Dallas–Fort Worth",
        "counts": {k: sum(1 for p in compact if p["k"] == k) for k in KINDS},
        "sources": sorted({p["s"] for p in compact}),
        "weights": WEIGHTS,
        "hexes": {str(r): len(fc["features"]) for r, fc in layers.items()},
        "priced_pois": len(prices),
    }
    with open(os.path.join(SRC, "meta.json"), "w") as f:
        json.dump(meta, f, indent=2)
    with open(os.path.join(OUT_DIR, "pois.merged.jsonl"), "w") as f:
        for p in pois:
            f.write(json.dumps(p) + "\n")
    print(json.dumps(meta, indent=2), file=sys.stderr)


if __name__ == "__main__":
    main()
