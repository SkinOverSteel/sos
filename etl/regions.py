"""
Region registry. Everything in the pipeline and the app is keyed by region.

Two kinds of region:
- STATES: all 50 + DC. Statewide coverage for the registry layers (NPI,
  Open Payments, FDA 503B, state-board pharmacy CSVs). State hex layers are
  scored against the NATIONAL distribution so states compare to each other.
- METROS: the high-resolution batch. Inside a metro bbox we also run the
  OpenStreetMap layers (gyms, pharmacy candidates) and street-level fallback
  geocoding, and export r7/r8/r9 hexes scored against that metro's own
  distribution so the map is readable at street scale.

Bboxes are generous working boxes (lat/lon). They are used to clip and to
tile OSM queries, never to define a listing's eligibility: a listing's
state and zip come from the registry row itself.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class Metro:
    slug: str
    name: str
    states: tuple[str, ...]
    south: float
    west: float
    north: float
    east: float
    zip3: tuple[str, ...] = field(default_factory=tuple)  # 3-digit zip prefixes at the core

    @property
    def bbox(self) -> dict:
        return {"south": self.south, "west": self.west, "north": self.north, "east": self.east}

    def contains(self, lat: float | None, lon: float | None) -> bool:
        return lat is not None and lon is not None and self.south <= lat <= self.north and self.west <= lon <= self.east


METROS: list[Metro] = [
    # Texas four
    Metro("dfw", "Dallas–Fort Worth", ("TX",), 32.45, -97.60, 33.35, -96.20, ("750", "751", "752", "753", "754", "760", "761", "762")),
    Metro("houston", "Houston", ("TX",), 29.30, -95.90, 30.30, -94.90, ("770", "771", "772", "773", "774", "775", "776", "777")),
    Metro("austin", "Austin", ("TX",), 29.95, -98.10, 30.75, -97.40, ("786", "787", "789")),
    Metro("san-antonio", "San Antonio", ("TX",), 29.15, -98.90, 29.85, -98.15, ("780", "781", "782")),
    # Sun Belt
    Metro("phoenix", "Phoenix", ("AZ",), 33.10, -112.60, 33.90, -111.50, ("850", "851", "852", "853")),
    Metro("atlanta", "Atlanta", ("GA",), 33.40, -84.80, 34.20, -83.90, ("300", "301", "302", "303", "305", "306")),
    Metro("miami", "Miami–Fort Lauderdale", ("FL",), 25.40, -80.60, 26.60, -80.00, ("330", "331", "332", "333", "334")),
    Metro("tampa", "Tampa Bay", ("FL",), 27.50, -82.90, 28.40, -82.10, ("335", "336", "337", "338", "346")),
    Metro("las-vegas", "Las Vegas", ("NV",), 35.90, -115.50, 36.40, -114.80, ("889", "890", "891")),
    Metro("nashville", "Nashville", ("TN",), 35.80, -87.20, 36.50, -86.30, ("370", "371", "372")),
    # Coasts
    Metro("los-angeles", "Los Angeles", ("CA",), 33.50, -118.80, 34.40, -117.40, ("900", "901", "902", "903", "904", "905", "906", "907", "908", "910", "911", "912", "913", "914", "915", "916", "917", "918", "926", "927", "928")),
    Metro("new-york", "New York", ("NY", "NJ", "CT"), 40.40, -74.60, 41.20, -73.40, ("100", "101", "102", "103", "104", "105", "106", "107", "110", "111", "112", "113", "114", "115", "116", "070", "071", "072", "073", "074", "075", "076", "077", "078", "079")),
    Metro("bay-area", "San Francisco Bay Area", ("CA",), 37.10, -122.70, 38.20, -121.60, ("940", "941", "943", "944", "945", "946", "947", "948", "949", "950", "951")),
    Metro("seattle", "Seattle", ("WA",), 47.10, -122.70, 48.00, -121.80, ("980", "981", "982", "983", "984")),
    Metro("boston", "Boston", ("MA", "NH"), 42.10, -71.60, 42.80, -70.70, ("017", "018", "019", "020", "021", "022", "023", "024")),
    Metro("washington", "Washington, DC", ("DC", "MD", "VA"), 38.50, -77.70, 39.30, -76.60, ("200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "220", "221", "222", "223")),
    # Mountain / Midwest
    Metro("denver", "Denver", ("CO",), 39.40, -105.40, 40.20, -104.50, ("800", "801", "802", "803", "804", "805")),
    Metro("salt-lake", "Salt Lake City", ("UT",), 40.30, -112.30, 41.00, -111.50, ("840", "841", "843", "844")),
    Metro("chicago", "Chicago", ("IL", "IN"), 41.40, -88.40, 42.30, -87.40, ("600", "601", "602", "603", "604", "605", "606", "607", "608")),
    Metro("minneapolis", "Minneapolis–St. Paul", ("MN",), 44.60, -93.80, 45.40, -92.70, ("550", "551", "553", "554", "555")),
]

METRO_BY_SLUG = {m.slug: m for m in METROS}

# USPS state codes + names. Territories are excluded on purpose (the
# registries cover them, but the pharmacy and gym layers don't).
STATES: dict[str, str] = {
    "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado",
    "CT": "Connecticut", "DE": "Delaware", "DC": "District of Columbia", "FL": "Florida", "GA": "Georgia",
    "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky",
    "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota",
    "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire",
    "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio",
    "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia",
    "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming",
}

# Continental + AK/HI working box for the national overview.
US_BBOX = {"south": 18.5, "west": -170.0, "north": 71.5, "east": -66.5}


def metro_for(lat: float | None, lon: float | None) -> Metro | None:
    for m in METROS:
        if m.contains(lat, lon):
            return m
    return None


def state_slug(code: str) -> str:
    return code.lower()


def city_slug(city: str) -> str:
    import re
    return re.sub(r"[^a-z0-9]+", "-", city.lower()).strip("-")
