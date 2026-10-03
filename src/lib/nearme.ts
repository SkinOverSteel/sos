/**
 * Near Me: the metabolic-infrastructure map. Data model + ranking.
 *
 * Everything the pages read comes from JSON exported by /etl (businesses and
 * buildings only, never residents). The app never calls the upstream APIs; a
 * deploy depends only on the committed dataset. See docs/near-me/methodology.md.
 */
import pois from "@/data/nearme/pois.json";
import cities from "@/data/nearme/cities.json";
import zips from "@/data/nearme/zips.json";
import meta from "@/data/nearme/meta.json";

export type Kind = "trt" | "glp1" | "pharmacy" | "gym";

export const KINDS: Kind[] = ["trt", "glp1", "pharmacy", "gym"];

export const KIND_LABELS: Record<Kind, string> = {
  trt: "Testosterone therapy clinics",
  glp1: "GLP-1 prescribers",
  pharmacy: "Compounding pharmacies",
  gym: "Serious gyms",
};

export const KIND_SHORT: Record<Kind, string> = {
  trt: "TRT clinic",
  glp1: "GLP-1 prescriber",
  pharmacy: "Compounding pharmacy",
  gym: "Gym",
};

/** Per-kind price context shown when a listing has fewer than 3 member reports.
 *  Published ranges, attributed; a member range always replaces these. */
export const PUBLISHED_PRICE: Record<Kind, { low: number; high: number; unit: string; source: string; href: string }> = {
  trt: { low: 20, high: 133, unit: "/mo membership, before labs", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  glp1: { low: 199, high: 1349, unit: "/mo, compounded to brand cash price", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  pharmacy: { low: 25, high: 80, unit: "/mo compounded testosterone cypionate", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  gym: { low: 100, high: 250, unit: "/mo CrossFit or barbell-club membership", source: "Member reports (DFW, 2026)", href: "/near-me/methodology" },
};

export type Poi = {
  id: string;
  k: Kind;
  n: string; // name
  a: string; // street address
  c: string; // city
  z: string; // zip
  lat: number;
  lon: number;
  s: string; // source
  cf: number; // confidence 0..1
  t: string[]; // tags
  h: string; // h3 r8
  pr?: { low: number; high: number; n: number };
};

export type City = {
  city: string;
  slug: string;
  counts: Partial<Record<Kind, number>>;
  total: number;
  mii: number;
  mii_max: number;
};

export const POIS = pois as Poi[];
export const CITIES = cities as City[];
export const ZIPS = zips as unknown as Record<string, [number, number, string]>;
export const META = meta as {
  built: string;
  region: string;
  counts: Record<Kind, number>;
  sources: string[];
  weights: Record<Kind, number>;
  hexes: Record<string, number>;
  priced_pois: number;
};

export const SOURCE_LABELS: Record<string, string> = {
  npi: "NPI registry",
  open_payments: "CMS Open Payments",
  tsbp: "Texas State Board of Pharmacy",
  fda_503b: "FDA 503B list",
  osm: "OpenStreetMap",
  google_places: "Google Places",
  seed: "Editorial",
};

export function lookupZip(z: string): { lat: number; lon: number; city: string } | null {
  const hit = ZIPS[z.trim().slice(0, 5)];
  return hit ? { lat: hit[0], lon: hit[1], city: hit[2] } : null;
}

/** Great-circle distance in miles. */
export function miles(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type Ranked = Poi & { miles: number };

/**
 * Nearest listings of one kind. Distance is the primary sort; confidence
 * breaks ties within a mile so a verified clinic outranks a keyword-only hit
 * next door. Nothing commercial enters the sort (there are no paid pins yet;
 * when there are, they will be labelled and will still never move a rank).
 */
export function nearest(lat: number, lon: number, kind: Kind, limit = 8, maxMiles = 25): Ranked[] {
  return POIS.filter((p) => p.k === kind)
    .map((p) => ({ ...p, miles: miles(lat, lon, p.lat, p.lon) }))
    .filter((p) => p.miles <= maxMiles)
    .sort((a, b) => Math.round(a.miles) - Math.round(b.miles) || b.cf - a.cf || a.miles - b.miles)
    .slice(0, limit);
}

export function cityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function poisInCity(city: string, kind: Kind): Poi[] {
  return POIS.filter((p) => p.c === city && p.k === kind).sort((a, b) => b.cf - a.cf || a.n.localeCompare(b.n));
}

/** Cities with enough signal to earn a programmatic page (thin pages hurt). */
export function citiesWithPages(kind: Kind, min = 3): City[] {
  return CITIES.filter((c) => (c.counts[kind] ?? 0) >= min);
}

export function priceLabel(p: Poi): { text: string; member: boolean } {
  if (p.pr) return { text: `$${p.pr.low}–$${p.pr.high}/mo · ${p.pr.n} reports`, member: true };
  const d = PUBLISHED_PRICE[p.k];
  return { text: `$${d.low}–$${d.high}${d.unit}`, member: false };
}

/** Index bands, for legends and copy. Instrument voice: a reading, not a grade. */
export function miiBand(mii: number): string {
  if (mii >= 75) return "dense";
  if (mii >= 50) return "served";
  if (mii >= 25) return "thin";
  return "sparse";
}

export function confidenceLabel(cf: number): string {
  if (cf >= 0.85) return "licensed / verified";
  if (cf >= 0.6) return "specialty match";
  return "keyword match";
}

/** Registry names arrive upper-case; render them as a human would write them. */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (c) => c.toUpperCase())
    .replace(/\b(Pllc|Llc|Pa|Md|Do|Pc|Inc|Ste|Nw|Ne|Sw|Se|Fm|Ii|Iii)\b/g, (m) => m.toUpperCase())
    .replace(/\bGlp-1\b/g, "GLP-1")
    .replace(/\bTrt\b/g, "TRT")
    .replace(/\bCrossfit\b/g, "CrossFit");
}
