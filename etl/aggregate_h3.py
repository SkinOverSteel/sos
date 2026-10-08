"""
Merge the per-source POI files, aggregate to H3 hexes, score them with the
Metabolic Infrastructure Index (MII, 0-100), and export what the Next app
reads. Nationwide, three tiers of layer:

  public/data/nearme/us/hex-r{4,5}.json                national overview
  public/data/nearme/states/<st>/hex-r{6,7}.json       one state
  public/data/nearme/metros/<slug>/hex-r{7,8,9}.json   one metro, street scale
  (compact rows [h3, mii, mii_us, trt, glp1, pharmacy, gym, n, coverage];
   the browser derives each hexagon's outline with h3-js, which keeps the
   files ~6x smaller than GeoJSON. aggregate_h3.py --geojson also writes
   GeoJSON next to them for download.)
  public/data/nearme/pois/<ST>.json                    compact POIs per state
  public/data/nearme/zips/<zip3>.json                  zip -> centroid shards
  src/data/nearme/{meta,cities,metros,states}.json     build-time summaries

Scoring (see docs/near-me/methodology.md):
  raw_k   = Σ confidence of POIs of kind k in the hex
          + 0.5 × Σ confidence in the 6 neighbours
  comp_k  = min(1, ln(1 + raw_k) / ln(1 + P95_k))
  MII     = 100 × Σ_k w_k comp_k / Σ_k w_k   over the layers that COVER the hex

Two normalisations are exported on every hex:
  mii     against the distribution of the layer's own region (a metro map is
          readable at street scale; a state map compares its own cities)
  mii_us  against the national distribution (comparable everywhere)

Coverage: the registry layers (TRT, GLP-1, pharmacy) are national. The gym
layer exists only inside metro bboxes, so outside them the weights are
renormalised over the three registry layers and the hex carries
coverage="registry". Inside a metro all four layers apply.

Everything here describes businesses. Nothing about who lives in a hex is
used or inferred.
"""
from __future__ import annotations

import datetime
import glob
import json
import math
import os
import statistics
import sys
from collections import defaultdict

import h3
from common import KINDS, OUT_DIR, in_bbox, read_jsonl, read_seed_csv, zip_city
from regions import METROS, STATES, city_slug, metro_for

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public", "data", "nearme")
SRC = os.path.join(ROOT, "src", "data", "nearme")

WEIGHTS = {"trt": 0.30, "glp1": 0.25, "pharmacy": 0.20, "gym": 0.25}
REGISTRY = ("trt", "glp1", "pharmacy")
MIN_CONFIDENCE = 0.3
NATIONAL_RES = (4, 5)
STATE_RES = (6, 7)
METRO_RES = (7, 8, 9)
# Programmatic pages: a city earns one only with this many NAMED businesses of
# the kind (nameless registry rows don't count; a page of identical labels is
# noise for readers and search engines alike).
PAGE_MIN = {"trt": 5, "glp1": 5}


def load_pois() -> list[dict]:
    rows: dict[str, dict] = {}
    for path in sorted(glob.glob(os.path.join(OUT_DIR, "pois.*.jsonl"))):
        if path.endswith("pois.merged.jsonl"):
            continue
        for r in read_jsonl(path):
            if r["kind"] not in KINDS or r["confidence"] < MIN_CONFIDENCE or not in_bbox(r["lat"], r["lon"]):
                continue
            if r["state"] not in STATES:
                continue
            zc = zip_city(r["zip"])
            if zc:
                r["city"], r["state"] = zc  # canonical spelling via the zip table
            if not r["city"]:
                continue
            prev = rows.get(r["id"])
            if prev is None or prev["confidence"] < r["confidence"]:
                rows[r["id"]] = r
    # Fold generic "<Specialty> practice" rows (solo NPIs with no org name)
    # into a named business of the same kind at the same address + zip.
    named = {(r["kind"], r["address"].lower(), r["zip"]) for r in rows.values() if not r["name"].endswith(" practice")}
    out = []
    folded = 0
    for r in rows.values():
        if r["name"].endswith(" practice") and r["address"] and (r["kind"], r["address"].lower(), r["zip"]) in named:
            folded += 1
            continue
        out.append(r)
    print(f"[h3] folded {folded} generic rows into named businesses", file=sys.stderr)
    return out


def load_prices() -> dict[str, dict]:
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


def p95(values: list[float]) -> float:
    vals = sorted(v for v in values if v > 0)
    return vals[int(0.95 * (len(vals) - 1))] if vals else 1.0


def score(kinds: dict, p95s: dict, full: bool) -> int:
    layers = KINDS if full else REGISTRY
    tot = sum(WEIGHTS[k] for k in layers)
    comps = {k: min(1.0, math.log1p(kinds[k]) / math.log1p(p95s[k])) if p95s[k] > 0 else 0.0 for k in layers}
    return round(100 * sum(WEIGHTS[k] * comps[k] for k in layers) / tot)


def write_geojson(path: str, features: list[dict], extra: dict):
    """Compact hex rows (always) + GeoJSON (with --geojson). `path` names the GeoJSON."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    features.sort(key=lambda f: -f["properties"]["mii"])
    rows = [[p["h3"], p["mii"], p["mii_us"], p["trt"], p["glp1"], p["pharmacy"], p["gym"], p["n"], 1 if p["coverage"] == "full" else 0]
            for p in (f["properties"] for f in features)]
    with open(path[:-len(".geojson")] + ".json", "w") as f:
        json.dump({"cols": ["h3", "mii", "mii_us", "trt", "glp1", "pharmacy", "gym", "n", "full"], "rows": rows, **extra}, f, separators=(",", ":"))
    if "--geojson" in sys.argv:
        with open(path, "w") as f:
            json.dump({"type": "FeatureCollection", "features": features, **extra}, f, separators=(",", ":"))


def build_layer(pois: list[dict], res: int, region_filter, national_p95: dict | None):
    """Return (features, p95 of this region) for POIs passing region_filter."""
    own = defaultdict(lambda: defaultdict(float))
    cells_of: dict[str, str] = {}
    for p in pois:
        if not region_filter(p):
            continue
        cell = h3.cell_to_parent(p["h3_9"], res) if res < 9 else p["h3_9"]
        cells_of[p["id"]] = cell
        own[cell][p["kind"]] += p["confidence"]
    smoothed = defaultdict(lambda: defaultdict(float))
    for cell, kinds in own.items():
        for k, v in kinds.items():
            smoothed[cell][k] += v
            for nb in h3.grid_ring(cell, 1):
                smoothed[nb][k] += 0.5 * v
    local = {k: p95([v[k] for v in smoothed.values()]) for k in KINDS}
    nat = national_p95 or local
    features = []
    counts = defaultdict(int)
    for pid, cell in cells_of.items():
        counts[cell] += 1
    for cell, kinds in smoothed.items():
        lat, lng = h3.cell_to_latlng(cell)
        full = metro_for(lat, lng) is not None
        mii = score(kinds, local, full)
        if mii == 0:
            continue
        boundary = h3.cell_to_boundary(cell)
        ring = [[round(lng_, 5), round(lat_, 5)] for lat_, lng_ in boundary]
        ring.append(ring[0])
        features.append({
            "type": "Feature",
            "properties": {
                "h3": cell, "mii": mii, "mii_us": score(kinds, nat, full),
                **{k: round(own[cell][k], 2) for k in KINDS},
                "n": counts.get(cell, 0), "coverage": "full" if full else "registry",
            },
            "geometry": {"type": "Polygon", "coordinates": [ring]},
        })
    return features, local, smoothed


def main():
    pois = load_pois()
    if not pois:
        sys.exit("no POIs in etl/out; run the fetch_* scripts first")
    prices = load_prices()
    for p in pois:
        p["h3_9"] = h3.latlng_to_cell(p["lat"], p["lon"], 9)
        m = metro_for(p["lat"], p["lon"])
        p["metro"] = m.slug if m else None
    print(f"[h3] {len(pois)} POIs", file=sys.stderr)

    everyone = lambda p: True  # noqa: E731
    # National P95 at each resolution (computed once from the national layer).
    national_p95: dict[int, dict] = {}
    hex_counts: dict[str, int] = {}
    for res in sorted(set(NATIONAL_RES) | set(STATE_RES) | set(METRO_RES)):
        feats, local, _ = build_layer(pois, res, everyone, None)
        national_p95[res] = local
        if res in NATIONAL_RES:
            write_geojson(os.path.join(PUBLIC, "us", f"hex-r{res}.geojson"), feats, {"region": "us", "res": res, "p95": local})
            hex_counts[f"us-r{res}"] = len(feats)
            print(f"[h3] us r{res}: {len(feats)} hexes", file=sys.stderr)

    state_summary = []
    state_mii: dict[str, dict] = {}
    for st in STATES:
        sp = [p for p in pois if p["state"] == st]
        if not sp:
            continue
        r7 = None
        for res in STATE_RES:
            feats, local, _ = build_layer(sp, res, everyone, national_p95[res])
            write_geojson(os.path.join(PUBLIC, "states", st.lower(), f"hex-r{res}.geojson"), feats, {"region": st, "res": res, "p95": local})
            hex_counts[f"{st}-r{res}"] = len(feats)
            if res == 7:
                r7 = feats
                state_mii[st] = {f["properties"]["h3"]: f["properties"]["mii"] for f in feats}
        counts = defaultdict(int)
        for p in sp:
            counts[p["kind"]] += 1
        us_scores = sorted(f["properties"]["mii_us"] for f in (r7 or []))
        state_summary.append({"state": st, "name": STATES[st], "slug": st.lower(), "counts": dict(counts), "total": len(sp),
                              "mii_us": us_scores[int(0.9 * (len(us_scores) - 1))] if us_scores else 0,
                              "metros": [m.slug for m in METROS if st in m.states]})
    print(f"[h3] {len(state_summary)} states", file=sys.stderr)

    metro_summary = []
    for m in METROS:
        mp = [p for p in pois if p["metro"] == m.slug]
        r8 = None
        for res in METRO_RES:
            feats, local, _ = build_layer(mp, res, everyone, national_p95[res])
            write_geojson(os.path.join(PUBLIC, "metros", m.slug, f"hex-r{res}.geojson"), feats,
                          {"region": m.slug, "res": res, "p95": local, "bbox": m.bbox})
            hex_counts[f"{m.slug}-r{res}"] = len(feats)
            if res == 8:
                r8 = feats
        counts = defaultdict(int)
        for p in mp:
            counts[p["kind"]] += 1
        us_scores = sorted(f["properties"]["mii_us"] for f in (r8 or []))
        metro_summary.append({"slug": m.slug, "name": m.name, "states": list(m.states), "bbox": m.bbox,
                              "counts": dict(counts), "total": len(mp),
                              "mii_us": us_scores[int(0.9 * (len(us_scores) - 1))] if us_scores else 0})
        print(f"[h3] {m.slug}: {len(mp)} POIs", file=sys.stderr)

    # Compact POIs sharded per state (client fetch on /near-me; fs read for city pages).
    compact_by_state: dict[str, list] = defaultdict(list)
    for p in sorted(pois, key=lambda p: (p["state"], p["kind"], p["city"], p["name"])):
        compact_by_state[p["state"]].append({
            "id": p["id"], "k": p["kind"], "n": p["name"], "a": p["address"], "c": p["city"], "st": p["state"], "z": p["zip"],
            "lat": round(p["lat"], 5), "lon": round(p["lon"], 5), "s": p["source"], "cf": round(p["confidence"], 2),
            "t": [t for t in p.get("tags", []) if t in ("geocoded", "zip-centroid", "city-level", "503a", "503b", "kw:trt", "kw:glp1", "candidate", "board-matched", "independent", "npi-name", "multi-tenant", "npi-compounding")][:5],
            "h": h3.cell_to_parent(p["h3_9"], 7), "m": p["metro"],
            **({"pr": prices[p["id"]]} if p["id"] in prices else {}),
        })
    os.makedirs(os.path.join(PUBLIC, "pois"), exist_ok=True)
    for st, rows in compact_by_state.items():
        with open(os.path.join(PUBLIC, "pois", f"{st}.json"), "w") as f:
            json.dump(rows, f, separators=(",", ":"), ensure_ascii=False)

    # Per-city rollups: programmatic pages only above PAGE_MIN.
    cities = defaultdict(lambda: {"counts": defaultdict(int), "named": defaultdict(int), "hexes": set()})
    for p in pois:
        c = cities[(p["state"], p["city"])]
        c["counts"][p["kind"]] += 1
        if not p["name"].endswith(" practice"):
            c["named"][p["kind"]] += 1
        c["hexes"].add(h3.cell_to_parent(p["h3_9"], 7))
    city_out = []
    city_centers = {}
    for (st, name), c in cities.items():
        if sum(c["counts"].values()) >= 5:
            pts = [(p["lat"], p["lon"]) for p in pois if p["state"] == st and p["city"] == name]
            city_centers[f"{st}/{name}"] = [round(statistics.median(x[0] for x in pts), 4), round(statistics.median(x[1] for x in pts), 4)]
        if not any(c["named"][k] >= n for k, n in PAGE_MIN.items()):
            continue
        scores = [state_mii[st][h] for h in c["hexes"] if h in state_mii.get(st, {})]
        city_out.append({"city": name, "state": st, "slug": city_slug(name), "counts": dict(c["counts"]),
                         "total": sum(c["counts"].values()), "mii": round(statistics.mean(scores)) if scores else 0,
                         "named": dict(c["named"]),
                         "pages": [k for k, n in PAGE_MIN.items() if c["named"][k] >= n]})
    city_out.sort(key=lambda c: -c["total"])
    os.makedirs(SRC, exist_ok=True)
    with open(os.path.join(SRC, "cities.json"), "w") as f:
        json.dump(city_out, f, separators=(",", ":"))
    with open(os.path.join(SRC, "metros.json"), "w") as f:
        json.dump(metro_summary, f, separators=(",", ":"))
    with open(os.path.join(SRC, "states.json"), "w") as f:
        json.dump(state_summary, f, separators=(",", ":"))
    with open(os.path.join(SRC, "city-centers.json"), "w") as f:
        json.dump(city_centers, f, separators=(",", ":"))

    # State view boxes from the zip table (2nd..98th percentile of centroids, padded).
    by_state = defaultdict(lambda: ([], []))
    for r in read_seed_csv("us_zips.csv"):
        by_state[r["state"]][0].append(float(r["lat"]))
        by_state[r["state"]][1].append(float(r["lon"]))
    boxes = {}
    for st, (lats, lons) in by_state.items():
        lats.sort(); lons.sort()
        lo, hi = int(0.02 * len(lats)), int(0.98 * len(lats)) - 1
        pad = 0.3
        boxes[st] = {"south": round(lats[lo] - pad, 3), "north": round(lats[hi] + pad, 3), "west": round(lons[lo] - pad, 3), "east": round(lons[hi] + pad, 3)}
    with open(os.path.join(SRC, "state-boxes.json"), "w") as f:
        json.dump(boxes, f, separators=(",", ":"))

    # Zip shards for the client lookup.
    shards: dict[str, dict] = defaultdict(dict)
    for r in read_seed_csv("us_zips.csv"):
        shards[r["zip"][:3]][r["zip"]] = [float(r["lat"]), float(r["lon"]), r["city"], r["state"]]
    os.makedirs(os.path.join(PUBLIC, "zips"), exist_ok=True)
    for pre, rows in shards.items():
        with open(os.path.join(PUBLIC, "zips", f"{pre}.json"), "w") as f:
            json.dump(rows, f, separators=(",", ":"))

    meta = {
        "built": datetime.date.today().isoformat(),
        "region": "United States",
        "counts": {k: sum(1 for p in pois if p["kind"] == k) for k in KINDS},
        "geocoded": sum(1 for p in pois if "geocoded" in p.get("tags", [])),
        "sources": sorted({p["source"] for p in pois}),
        "weights": WEIGHTS,
        "states": len(state_summary),
        "metros": len(metro_summary),
        "cities_with_pages": {k: sum(1 for c in city_out if k in c["pages"]) for k in PAGE_MIN},
        "hexes": {k: v for k, v in hex_counts.items() if k.startswith("us-")},
        "priced_pois": len(prices),
    }
    with open(os.path.join(SRC, "meta.json"), "w") as f:
        json.dump(meta, f, indent=2)
    with open(os.path.join(OUT_DIR, "pois.merged.jsonl"), "w") as f:
        for p in pois:
            f.write(json.dumps({k: v for k, v in p.items() if k != "h3_9"}) + "\n")
    print(json.dumps(meta, indent=2), file=sys.stderr)


if __name__ == "__main__":
    main()
