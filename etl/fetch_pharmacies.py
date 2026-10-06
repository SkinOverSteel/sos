"""
Compounding pharmacies (503A / 503B), nationwide.

Sources, in order of authority:
0. NPI registry (NPPES monthly file): organizations whose taxonomy includes
   3336C0004X "Pharmacy, Compounding Pharmacy" (NUCC v26.1; an earlier
   version of this script used 3336C0002X, which is "Clinic Pharmacy", so
   the first refresh after the fix re-draws this layer). Nationwide, business-level,
   self-declared, so it is a registry match (confidence 0.7), not a license.
   A board row (below) matching it by name + zip raises it to 0.9.
1. FDA registered outsourcing facilities (503B), scraped live from
   https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities
   Every state. The page gives name + city + state only; the row is geocoded
   by name + city via Nominatim, else placed at the city's first zip centroid
   and tagged "city-level".
2. etl/data/state_boards/<ST>.csv: operator exports from each state board
   of pharmacy's license verification, filtered to compounding (sterile /
   non-sterile). Columns: name,address,city,zip,license,sterile(Y/N).
   Most boards render through browser-only grids, so this is manual by
   design. A pharmacy here is licensed by definition (confidence 0.9).
3. etl/data/tsbp_compounders.csv: the Texas file from v1 (same columns).
4. OpenStreetMap name search ("compounding pharmacy", "apothecary") tiled
   over each metro bbox: candidates only, confidence 0.35, flagged
   "unverified-license" until a board row matches them by name + zip.
"""
from __future__ import annotations

import csv
import glob
import html
import io
import os
import re
import sys
import time
import zipfile
import requests
from common import DATA_DIR, POI, in_bbox, nominatim_geocode, read_seed_csv, write_jsonl, zip_centroid, zip_city
from fetch_npi import BULK
from regions import METROS, STATES

COMPOUNDING_TAXONOMY = "3336C0004X"


def npi_compounders():
    """Organizations self-declaring the compounding-pharmacy taxonomy, all states."""
    if not os.path.exists(BULK):
        print(f"[pharmacy] no NPPES file at {BULK}; skipping the taxonomy pass", file=sys.stderr)
        return
    t0 = time.time()
    n = 0
    with zipfile.ZipFile(BULK) as zf:
        name = next(x for x in zf.namelist() if x.startswith("npidata_pfile") and not x.endswith("fileheader.csv"))
        with zf.open(name) as raw:
            rd = csv.reader(io.TextIOWrapper(raw, encoding="utf-8", newline=""))
            header = next(rd)
            col = {h: i for i, h in enumerate(header)}
            i_type, i_org = col["Entity Type Code"], col["Provider Organization Name (Legal Business Name)"]
            i_a1, i_a2 = col["Provider First Line Business Practice Location Address"], col["Provider Second Line Business Practice Location Address"]
            i_city, i_st, i_zip = col["Provider Business Practice Location Address City Name"], col["Provider Business Practice Location Address State Name"], col["Provider Business Practice Location Address Postal Code"]
            i_deact, i_react = col["NPI Deactivation Date"], col["NPI Reactivation Date"]
            i_tax = [col[f"Healthcare Provider Taxonomy Code_{k}"] for k in range(1, 16)]
            for row in rd:
                if len(row) <= i_tax[-1] or row[i_type] != "2" or (row[i_deact] and not row[i_react]):
                    continue
                if row[i_st] not in STATES or not any(row[i] == COMPOUNDING_TAXONOMY for i in i_tax):
                    continue
                zip5 = row[i_zip][:5]
                ll = zip_centroid(zip5)
                n += 1
                yield POI(kind="pharmacy", name=row[i_org], address=" ".join(filter(None, [row[i_a1], row[i_a2]])),
                          city=row[i_city], state=row[i_st], zip=zip5, lat=ll[0] if ll else None, lon=ll[1] if ll else None,
                          source="npi", source_id="org", tags=["npi-compounding", "503a"], confidence=0.7)
    print(f"[pharmacy] NPPES taxonomy pass: {n} compounding pharmacies ({time.time()-t0:.0f}s)", file=sys.stderr)

UA = {"User-Agent": "skinoversteel-nearme-etl/0.1 (hello@skinoversteel.com)"}
FDA_503B = "https://www.fda.gov/drugs/human-drug-compounding/registered-outsourcing-facilities"
STATE_RE = "|".join(STATES)


def fda_503b_live(s):
    try:
        r = s.get(FDA_503B, headers={"User-Agent": "Mozilla/5.0 (compatible; skinoversteel-nearme-etl/0.1)"}, timeout=60)
        r.raise_for_status()
    except Exception as e:  # noqa: BLE001
        print(f"[pharmacy] FDA 503B page unavailable ({e.__class__.__name__})", file=sys.stderr)
        return
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", r.text, re.S):
        cells = [html.unescape(re.sub("<[^>]+>", "", c)).strip() for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)]
        if not cells:
            continue
        m = re.match(rf"^(.*),\s*([A-Za-z .'-]+),\s*({STATE_RE})$", cells[0])
        if not m:
            continue
        yield m.group(1).strip(" ,"), m.group(2).strip(), m.group(3)


def board_rows():
    for row in read_seed_csv("tsbp_compounders.csv"):
        yield "TX", "tsbp", row
    for path in sorted(glob.glob(os.path.join(DATA_DIR, "state_boards", "*.csv"))):
        st = os.path.basename(path)[:2].upper()
        if st in STATES:
            import csv
            with open(path, newline="", encoding="utf-8") as f:
                for row in csv.DictReader(f):
                    yield st, f"board:{st.lower()}", row


def tiles(bbox: dict, n: int = 3):
    for i in range(n):
        for j in range(n):
            w = bbox["west"] + (bbox["east"] - bbox["west"]) * i / n
            e = bbox["west"] + (bbox["east"] - bbox["west"]) * (i + 1) / n
            so = bbox["south"] + (bbox["north"] - bbox["south"]) * j / n
            no = bbox["south"] + (bbox["north"] - bbox["south"]) * (j + 1) / n
            yield f"{w},{no},{e},{so}"


def run():
    s = requests.Session()
    out: dict[str, POI] = {}

    for p in npi_compounders():
        p.finalize()
        out[p.id] = p
    n_npi = len(out)

    for st, src, row in board_rows():
        zip5 = row.get("zip", "")[:5]
        ll = zip_centroid(zip5)  # street level comes from geocode.py
        p = POI(kind="pharmacy", name=row["name"], address=row["address"], city=row["city"], state=st, zip=zip5,
                lat=ll[0] if ll else None, lon=ll[1] if ll else None, source=src, source_id=row.get("license", ""),
                tags=["503a", "sterile" if row.get("sterile", "").upper().startswith("Y") else "non-sterile"],
                confidence=0.9).finalize()
        # A board row matching an NPPES self-declaration by name prefix + zip
        # verifies it: keep one row, licensed.
        twin = next((q for q in out.values() if q.source == "npi" and q.zip == zip5 and q.name.lower()[:12] == p.name.lower()[:12]), None)
        if twin:
            del out[twin.id]
            p.tags = sorted(set(p.tags) | {"npi-compounding"})
        out[p.id] = p
    n_board = len(out) - n_npi

    for name, city, st in fda_503b_live(s):
        time.sleep(1.05)
        try:
            r = s.get("https://nominatim.openstreetmap.org/search",
                      params={"q": f"{name.split(',')[0]} {city} {st}", "format": "jsonv2", "limit": 1, "addressdetails": 1},
                      headers=UA, timeout=60)
            hit = r.json()[0] if r.ok and r.json() else None
        except Exception:
            hit = None
        a = hit.get("address", {}) if hit else {}
        if hit and a.get("state") and in_bbox(float(hit["lat"]), float(hit["lon"])):
            addr = " ".join(filter(None, [a.get("house_number"), a.get("road")]))
            zip5, lat, lon = a.get("postcode", "")[:5], float(hit["lat"]), float(hit["lon"])
            tags = ["503b", "geocoded"]
        else:
            cz = next((z for z in read_seed_csv("us_zips.csv") if z["state"] == st and z["city"].lower() == city.lower()), None)
            if not cz:
                print(f"[pharmacy] 503B {name} ({city}, {st}): no zip for city", file=sys.stderr)
                continue
            addr, zip5, lat, lon = "", cz["zip"], float(cz["lat"]), float(cz["lon"])
            tags = ["503b", "city-level"]
        p = POI(kind="pharmacy", name=name, address=addr, city=city, state=st, zip=zip5, lat=lat, lon=lon,
                source="fda_503b", source_id="fda-503b-registry", tags=tags, confidence=0.95).finalize()
        out[p.id] = p
    print(f"[pharmacy] {n_npi} NPPES rows, {n_board} board rows, {len(out) - n_npi - n_board} FDA 503B rows", file=sys.stderr)

    seen_hits = set()
    board_keys = {(p.name.lower()[:12], p.zip) for p in out.values() if p.source != "fda_503b"}
    for m in METROS:
        for q in ["compounding pharmacy", "apothecary"]:
            for vb in tiles(m.bbox):
                time.sleep(1.1)
                try:
                    r = s.get("https://nominatim.openstreetmap.org/search",
                              params={"q": q, "viewbox": vb, "bounded": 1, "format": "jsonv2", "limit": 50, "addressdetails": 1},
                              headers=UA, timeout=60)
                    hits = r.json() if r.ok else []
                except Exception:
                    hits = []
                for h in hits:
                    if h["osm_id"] in seen_hits:
                        continue
                    seen_hits.add(h["osm_id"])
                    lat, lon = float(h["lat"]), float(h["lon"])
                    if not m.contains(lat, lon):
                        continue
                    a = h.get("address", {})
                    name = h.get("name") or h["display_name"].split(",")[0]
                    zip5 = a.get("postcode", "")[:5]
                    zc = zip_city(zip5)
                    verified = (name.lower()[:12], zip5) in board_keys
                    p = POI(kind="pharmacy", name=name,
                            address=" ".join(filter(None, [a.get("house_number"), a.get("road")])),
                            city=a.get("city") or a.get("town") or a.get("suburb") or (zc[0] if zc else ""),
                            state=zc[1] if zc else m.states[0], zip=zip5, lat=lat, lon=lon,
                            source="osm", source_id=f"{h['osm_type']}/{h['osm_id']}",
                            tags=["geocoded"] + (["board-matched"] if verified else ["candidate", "unverified-license"]),
                            confidence=0.9 if verified else 0.35).finalize()
                    out.setdefault(p.id, p)
        print(f"[pharmacy] {m.slug}: {len(out)} cumulative", file=sys.stderr)
    write_jsonl(out.values(), "pharmacy")


if __name__ == "__main__":
    run()
