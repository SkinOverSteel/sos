/**
 * Near Me: the metabolic-infrastructure map. Data model + ranking.
 *
 * Everything the pages read comes from JSON exported by /etl (businesses and
 * buildings only, never residents). The app never calls the upstream APIs; a
 * deploy depends only on the committed dataset. See docs/near-me/methodology.md.
 *
 * Small summaries (meta, metros, states) are bundled; the cities table lives in
 * nearme-cities.ts so client components importing this module never ship it. The big tables
 * (POIs per state, zip centroids) live under /public/data/nearme locally and
 * in Vercel Blob in production (see nearme-data.ts), fetched on demand: by
 * the browser on /near-me, by the build on the city pages (nearme-server.ts).
 */
import metros from "@/data/nearme/metros.json";
import states from "@/data/nearme/states.json";
import meta from "@/data/nearme/meta.json";
import { dataUrl } from "@/lib/nearme-data";

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
  gym: { low: 100, high: 250, unit: "/mo CrossFit or barbell-club membership", source: "Member reports (2026)", href: "/near-me/methodology" },
};

export type Poi = {
  id: string;
  k: Kind;
  n: string; // name
  a: string; // street address
  c: string; // city
  st: string; // state code
  z: string; // zip
  lat: number;
  lon: number;
  s: string; // source
  cf: number; // confidence 0..1
  t: string[]; // tags
  h: string; // h3 r7
  m: string | null; // metro slug
  pr?: { low: number; high: number; n: number };
};

export type City = {
  city: string;
  state: string;
  slug: string;
  counts: Partial<Record<Kind, number>>;
  total: number;
  mii: number;
  pages: ("trt" | "glp1")[];
};

export type Metro = {
  slug: string;
  name: string;
  states: string[];
  bbox: { south: number; west: number; north: number; east: number };
  counts: Partial<Record<Kind, number>>;
  total: number;
  mii_us: number;
};

export type StateSummary = {
  state: string;
  name: string;
  slug: string;
  counts: Partial<Record<Kind, number>>;
  total: number;
  mii_us: number;
  metros: string[];
};

export const METROS = metros as Metro[];
export const STATES = states as StateSummary[];
export const META = meta as {
  built: string;
  region: string;
  counts: Record<Kind, number>;
  geocoded: number;
  sources: string[];
  weights: Record<Kind, number>;
  states: number;
  metros: number;
  cities_with_pages: Record<string, number>;
  hexes: Record<string, number>;
  priced_pois: number;
};

export const SOURCE_LABELS: Record<string, string> = {
  npi: "NPI registry",
  open_payments: "CMS Open Payments",
  tsbp: "Texas State Board of Pharmacy",
  fda_503b: "FDA 503B registry",
  osm: "OpenStreetMap",
  google_places: "Google Places",
  seed: "Editorial",
};

export function sourceLabel(s: string): string {
  if (s.startsWith("board:")) return `${s.slice(6).toUpperCase()} board of pharmacy`;
  return SOURCE_LABELS[s] ?? s;
}

export function metroBySlug(slug: string): Metro | undefined {
  return METROS.find((m) => m.slug === slug);
}

export function stateByCode(code: string): StateSummary | undefined {
  return STATES.find((s) => s.state === code.toUpperCase());
}

export function metroFor(lat: number, lon: number): Metro | undefined {
  return METROS.find((m) => lat >= m.bbox.south && lat <= m.bbox.north && lon >= m.bbox.west && lon <= m.bbox.east);
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
 * Nearest listings of one kind from a candidate pool. Distance is the primary
 * sort; confidence breaks ties within a mile so a verified clinic outranks a
 * keyword-only hit next door. Nothing commercial enters the sort.
 */
export function nearest(pool: Poi[], lat: number, lon: number, kind: Kind, limit = 8, maxMiles = 25): Ranked[] {
  return pool
    .filter((p) => p.k === kind)
    .map((p) => ({ ...p, miles: miles(lat, lon, p.lat, p.lon) }))
    .filter((p) => p.miles <= maxMiles)
    .sort((a, b) => Math.round(a.miles) - Math.round(b.miles) || b.cf - a.cf || a.miles - b.miles)
    .slice(0, limit);
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

/**
 * Copper fill opacity for an index value, quantised to the four bands above so
 * the map reads as banded instrumentation and every legend swatch is exactly
 * the colour the map paints. Near-empty cells return 0 so the land shows
 * through instead of a copper haze. Single source of truth for map + legend.
 */
export function miiOpacity(mii: number): number {
  if (mii >= 75) return 0.7;
  if (mii >= 50) return 0.49;
  if (mii >= 25) return 0.285;
  if (mii >= 5) return 0.12;
  return 0;
}

export function confidenceLabel(cf: number): string {
  if (cf >= 0.85) return "licensed / verified";
  if (cf >= 0.6) return "specialty match";
  return "keyword match";
}

export function locationLabel(p: Poi): string {
  const bits: string[] = [];
  if (p.t.includes("npi-name")) bits.push("name from NPI registry");
  if (p.t.includes("multi-tenant")) bits.push("multi-tenant building");
  if (p.t.includes("zip-centroid")) bits.push("zip-level location");
  if (p.t.includes("city-level")) bits.push("city-level location");
  return bits.join(" · ");
}

/** Registry names arrive upper-case; render them as a human would write them. */
export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^|[^a-z'])([a-z])/g, (_, pre, c) => pre + c.toUpperCase())
    .replace(/\b([A-Z])'([a-z])/g, (_, a, b) => `${a}'${b.toUpperCase()}`) // O'Brien, D'Angelo; not Women's
    .replace(/\b(Pllc|Llc|Pa|Md|Do|Pc|Inc|Ste|Nw|Ne|Sw|Se|Fm|Ii|Iii|Dba)\b/g, (m) => m.toUpperCase())
    .replace(/\bGlp-1\b/g, "GLP-1")
    .replace(/\bTrt\b/g, "TRT")
    .replace(/\bCrossfit\b/g, "CrossFit");
}

// ---- client-side data access (browser only) --------------------------------

export type ZipHit = { zip: string; lat: number; lon: number; city: string; state: string };

/** Resolve a zip from the sharded table (zips/<zip3>.json in the data store). */
export async function fetchZip(zip: string): Promise<ZipHit | null> {
  const z = zip.trim().slice(0, 5);
  if (!/^\d{5}$/.test(z)) return null;
  const r = await fetch(dataUrl(`zips/${z.slice(0, 3)}.json`));
  if (!r.ok) return null;
  const shard = (await r.json()) as Record<string, [number, number, string, string]>;
  const hit = shard[z];
  return hit ? { zip: z, lat: hit[0], lon: hit[1], city: hit[2], state: hit[3] } : null;
}

const poiCache = new Map<string, Promise<Poi[]>>();

/** POIs for one state, cached for the session. */
export function fetchStatePois(state: string): Promise<Poi[]> {
  const st = state.toUpperCase();
  let p = poiCache.get(st);
  if (!p) {
    p = fetch(dataUrl(`pois/${st}.json`)).then((r) => (r.ok ? (r.json() as Promise<Poi[]>) : []));
    poiCache.set(st, p);
  }
  return p;
}

/** Candidate pool around a point: its state plus any metro's other states. */
export async function fetchPoolFor(hit: ZipHit): Promise<Poi[]> {
  const m = metroFor(hit.lat, hit.lon);
  const codes = new Set([hit.state, ...(m?.states ?? [])]);
  const lists = await Promise.all([...codes].map(fetchStatePois));
  return lists.flat();
}
