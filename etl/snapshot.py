"""
Quarterly snapshot: freeze the current merged POI set + hex scores under
etl/snapshots/<YYYY-Qn>/ and append one row per (city, kind) to
etl/snapshots/timeseries.csv so openings, closings, and price drift can be
charted later. Run after aggregate_h3.py (cron: 1st of Jan/Apr/Jul/Oct).

Openings/closings are computed by diffing POI ids against the previous
snapshot. Ids are hashes of kind+name+address+zip, so a rename or move counts
as a close + open, which is the honest reading for a storefront business.
"""
from __future__ import annotations

import csv
import datetime as dt
import json
import os
import shutil
import sys
from collections import Counter, defaultdict

from common import OUT_DIR, KINDS, read_jsonl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SNAP = os.path.join(os.path.dirname(os.path.abspath(__file__)), "snapshots")
SRC = os.path.join(ROOT, "src", "data", "nearme")


def quarter(d: dt.date) -> str:
    return f"{d.year}-Q{(d.month - 1) // 3 + 1}"


def main():
    today = dt.date.today()
    q = quarter(today)
    dest = os.path.join(SNAP, q)
    os.makedirs(dest, exist_ok=True)
    merged = os.path.join(OUT_DIR, "pois.merged.jsonl")
    if not os.path.exists(merged):
        sys.exit("run aggregate_h3.py first")
    shutil.copy(merged, os.path.join(dest, "pois.jsonl"))
    for n in ("cities.json", "meta.json", "metros.json", "states.json"):
        shutil.copy(os.path.join(SRC, n), os.path.join(dest, n))

    cur = {r["id"]: r for r in read_jsonl(merged)}
    prev_dirs = sorted(d for d in os.listdir(SNAP) if d != q and os.path.isdir(os.path.join(SNAP, d)))
    prev = {}
    if prev_dirs:
        prev = {r["id"]: r for r in read_jsonl(os.path.join(SNAP, prev_dirs[-1], "pois.jsonl"))}

    opened = Counter(); closed = Counter(); total = Counter()
    for pid, r in cur.items():
        total[(r["state"], r["city"], r["kind"])] += 1
        if pid not in prev:
            opened[(r["state"], r["city"], r["kind"])] += 1
    for pid, r in prev.items():
        if pid not in cur:
            closed[(r["state"], r["city"], r["kind"])] += 1

    prices = defaultdict(list)
    import glob
    for path in glob.glob(os.path.join(ROOT, "public", "data", "nearme", "pois", "*.json")):
        with open(path) as f:
            for p in json.load(f):
                if "pr" in p:
                    prices[(p["st"], p["c"], p["k"])].append((p["pr"]["low"] + p["pr"]["high"]) / 2)

    # Idempotent within a quarter: re-running replaces this quarter's rows.
    ts = os.path.join(SNAP, "timeseries.csv")
    header = ["quarter", "state", "city", "kind", "total", "opened", "closed", "median_monthly_usd", "priced_n"]
    kept = []
    if os.path.exists(ts):
        with open(ts, newline="") as f:
            kept = [r for r in csv.reader(f) if r and r[0] != "quarter" and r[0] != q]
    with open(ts, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(kept)
        for (st, city, kind) in sorted(set(total) | set(closed)):
            pr = sorted(prices.get((st, city, kind), []))
            med = pr[len(pr) // 2] if pr else ""
            w.writerow([q, st, city, kind, total[(st, city, kind)], opened[(st, city, kind)] if prev else "", closed[(st, city, kind)], med, len(pr)])
    print(f"[snapshot] {q}: {len(cur)} POIs ({'first snapshot' if not prev else f'{sum(opened.values())} opened / {sum(closed.values())} closed vs {prev_dirs[-1]}'})", file=sys.stderr)


if __name__ == "__main__":
    main()
