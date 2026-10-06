"""
Shared helpers for the Near Me ETL.

Every script in /etl writes rows in ONE normalized shape (see POI below) to
etl/out/pois.<source>.jsonl. aggregate_h3.py merges those files, dedupes,
scores hexes, and exports the GeoJSON + JSON the Next app reads.

Scope and ethics (see docs/near-me/methodology.md):
- Rows describe BUSINESSES and BUILDINGS only. Never a resident, never a
  patient, never a person's home. Individual NPI records (NPI-1) are kept
  only when their practice-location address is a commercial clinic and are
  rolled up to that location; the individual's name is never exported.
- No demographics, no census person data, no voter data, no IP addresses.
"""
from __future__ import annotations

import csv
import hashlib
import json
import os
import re
import sys
import time
from dataclasses import asdict, dataclass, field
from typing import Iterable, Iterator

OUT_DIR = os.path.join(os.path.dirname(__file__), "out")
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

from regions import METRO_BY_SLUG, STATES, US_BBOX  # noqa: E402

# Kept for the per-metro API fallback in fetch_npi.py (--metro dfw).
DFW_BBOX = METRO_BY_SLUG["dfw"].bbox

# Cities used for the NPI API fallback path (per-metro queries).
DFW_CITIES = [
    "Dallas", "Fort Worth", "Arlington", "Plano", "Irving", "Garland", "Frisco",
    "McKinney", "Grand Prairie", "Denton", "Mesquite", "Carrollton", "Richardson",
    "Lewisville", "Allen", "Flower Mound", "Mansfield", "North Richland Hills",
    "Rowlett", "Euless", "Grapevine", "Bedford", "DeSoto", "Cedar Hill",
    "Southlake", "Keller", "Coppell", "Rockwall", "Wylie", "Burleson",
    "Little Elm", "The Colony", "Hurst", "Duncanville", "Prosper", "Addison",
    "Farmers Branch", "Colleyville", "Waxahachie", "Haltom City",
]

# Every layer the dataset carries. The first four are the METABOLIC layers
# that score the index (aggregate_h3.SCORED); the rest are CARE layers:
# listed, counted per hex and per region, never weighted into the MII.
KINDS = (
    "trt", "glp1", "pharmacy", "gym",
    "urology",      # urologists (NPI 208800000X; pediatric urology excluded)
    "endo",         # endocrinologists (NPI 207RE0101X; pediatric excluded)
    "implant",      # penile implant surgeons (Open Payments device records + urology name keywords)
    "shockwave",    # shockwave / PRP ("P-shot") clinics (name keywords only; EMERGING evidence)
    "ved",          # vacuum erection device suppliers (DME suppliers on a name keyword; metro search)
    "sleep",        # sleep medicine physicians and sleep-disorder diagnostic centers
    "lab",          # clinical laboratories, draw sites flagged by national brand
    "sextherapy",   # sexual medicine and sex therapy practices (organization name keywords)
)
SCORED = ("trt", "glp1", "pharmacy", "gym")
CARE = tuple(k for k in KINDS if k not in SCORED)


@dataclass
class POI:
    kind: str                 # one of KINDS
    name: str                 # business / facility name only
    address: str
    city: str
    state: str
    zip: str                  # 5-digit
    lat: float | None
    lon: float | None
    source: str               # npi | open_payments | tsbp | fda_503b | osm | google_places | seed
    source_id: str            # NPI number, OSM id, etc. (business-level ids only)
    tags: list[str] = field(default_factory=list)   # taxonomy codes, keyword hits, osm tags
    confidence: float = 0.5   # 0..1 how sure we are the business offers the thing
    fetched_at: str = ""
    id: str = ""

    def finalize(self) -> "POI":
        self.zip = (self.zip or "")[:5]
        self.name = re.sub(r"\s+", " ", (self.name or "")).strip()
        self.address = re.sub(r"\s+", " ", (self.address or "")).strip()
        self.city = (self.city or "").strip().title()
        self.state = (self.state or "").upper()[:2]
        if not self.fetched_at:
            self.fetched_at = time.strftime("%Y-%m-%d")
        key = f"{self.kind}|{self.name.lower()}|{self.address.lower()}|{self.zip}"
        self.id = hashlib.sha1(key.encode()).hexdigest()[:12]
        return self


def in_bbox(lat: float | None, lon: float | None, bbox: dict | None = None) -> bool:
    """Inside the given box (default: the whole US)."""
    if lat is None or lon is None:
        return False
    b = bbox or US_BBOX
    return b["south"] <= lat <= b["north"] and b["west"] <= lon <= b["east"]


def write_jsonl(rows: Iterable[POI], name: str) -> str:
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"pois.{name}.jsonl")
    n = 0
    with open(path, "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(asdict(r.finalize()), ensure_ascii=False) + "\n")
            n += 1
    print(f"[{name}] wrote {n} rows -> {path}", file=sys.stderr)
    return path


def read_jsonl(path: str) -> Iterator[dict]:
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                yield json.loads(line)


def read_seed_csv(name: str) -> Iterator[dict]:
    """Operator-maintained CSV in etl/data (e.g. TSBP license export)."""
    path = os.path.join(DATA_DIR, name)
    if not os.path.exists(path):
        return iter(())
    with open(path, newline="", encoding="utf-8") as f:
        yield from csv.DictReader(f)


# ---- geocoding -------------------------------------------------------------

_ZIP_CACHE: dict[str, tuple[float, float, str, str]] | None = None


def _zips() -> dict[str, tuple[float, float, str, str]]:
    global _ZIP_CACHE
    if _ZIP_CACHE is None:
        _ZIP_CACHE = {}
        for row in read_seed_csv("us_zips.csv"):
            _ZIP_CACHE[row["zip"]] = (float(row["lat"]), float(row["lon"]), row["city"], row["state"])
    return _ZIP_CACHE


def zip_centroid(zip5: str) -> tuple[float, float] | None:
    """ZIP → (lat, lon) from etl/data/us_zips.csv (Census ZCTA / GeoNames)."""
    hit = _zips().get((zip5 or "")[:5])
    return (hit[0], hit[1]) if hit else None


def zip_city(zip5: str) -> tuple[str, str] | None:
    """ZIP → (canonical city, state)."""
    hit = _zips().get((zip5 or "")[:5])
    return (hit[2], hit[3]) if hit else None


def geocode_cache_path() -> str:
    os.makedirs(OUT_DIR, exist_ok=True)
    return os.path.join(OUT_DIR, "geocode_cache.json")


def nominatim_geocode(session, address: str, city: str, state: str, zip5: str, force: bool = False) -> tuple[float, float] | None:
    """Structured Nominatim lookup with an on-disk cache and the 1 req/s policy.

    Business addresses only. Nominatim's usage policy requires a UA that
    identifies the app; see https://operations.osmfoundation.org/policies/nominatim/

    force=True skips the cache entirely (read and write): geocode.py uses it
    to retry addresses the Census geocoder cached as misses, and manages the
    cache itself.
    """
    path = geocode_cache_path()
    cache: dict = {}
    if not force:
        if os.path.exists(path):
            with open(path) as f:
                cache = json.load(f)
        key = f"{address}|{city}|{state}|{zip5}".lower()
        if key in cache:
            v = cache[key]
            return tuple(v) if v else None
    time.sleep(1.05)
    try:
        r = session.get(
            "https://nominatim.openstreetmap.org/search",
            params={"street": address, "city": city, "state": state, "postalcode": zip5,
                    "country": "US", "format": "jsonv2", "limit": 1},
            headers={"User-Agent": "skinoversteel-nearme-etl/0.1 (hello@skinoversteel.com)"},
            timeout=30,
        )
        hit = r.json()[0] if r.ok and r.json() else None
        val = (float(hit["lat"]), float(hit["lon"])) if hit else None
    except Exception:
        val = None
    if not force:
        cache[key] = val
        with open(path, "w") as f:
            json.dump(cache, f)
    return val
