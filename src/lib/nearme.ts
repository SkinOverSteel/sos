/**
 * Near Me: the metabolic-infrastructure map. Data model + ranking.
 *
 * Twelve layers in two families. The four METABOLIC layers (TRT, GLP-1,
 * compounding pharmacy, gym) score the index. The eight CARE layers
 * (urology, endocrinology, penile implant practices, shockwave/PRP, vacuum
 * device suppliers, sleep medicine, labs, sexual medicine / sex therapy) are
 * listed in the lookup and counted per hex and per region, never weighted
 * into the index, so the MII keeps meaning what it meant.
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

export type Kind =
  | "trt" | "glp1" | "pharmacy" | "gym"
  | "urology" | "endo" | "implant" | "shockwave" | "ved" | "sleep" | "lab" | "sextherapy";
export type ScoredKind = "trt" | "glp1" | "pharmacy" | "gym";

/** The four metabolic layers that score the index (weights in META.weights). */
export const SCORED_KINDS: ScoredKind[] = ["trt", "glp1", "pharmacy", "gym"];
/** Care layers: listed and counted, never weighted into the index. */
export const CARE_KINDS: Kind[] = ["urology", "endo", "implant", "shockwave", "ved", "sleep", "lab", "sextherapy"];
export const KINDS: Kind[] = [...SCORED_KINDS, ...CARE_KINDS];

export function isScored(k: Kind): k is ScoredKind {
  return (SCORED_KINDS as Kind[]).includes(k);
}

/** How the lookup groups its sections. */
export const KIND_GROUPS: { id: string; label: string; note: string; kinds: Kind[] }[] = [
  { id: "metabolic", label: "Metabolic infrastructure", note: "The four layers that score the map.", kinds: SCORED_KINDS },
  { id: "specialists", label: "Specialists", note: "Registry specialty matches, every state.", kinds: ["urology", "endo", "sleep"] },
  { id: "procedures", label: "Procedures and devices", note: "Proxies and name matches; read the evidence grade before you pay.", kinds: ["implant", "shockwave", "ved"] },
  { id: "workup", label: "Workup and talk", note: "Where the labs get drawn and the other half of the problem gets heard.", kinds: ["lab", "sextherapy"] },
];

export const KIND_LABELS: Record<Kind, string> = {
  trt: "Testosterone therapy clinics",
  glp1: "GLP-1 prescribers",
  pharmacy: "Compounding pharmacies",
  gym: "Serious gyms",
  urology: "Urologists",
  endo: "Endocrinologists",
  implant: "Penile implant practices",
  shockwave: "Shockwave and PRP clinics",
  ved: "Vacuum erection device suppliers",
  sleep: "Sleep medicine and sleep labs",
  lab: "Labs and draw sites",
  sextherapy: "Sexual medicine and sex therapy",
};

export const KIND_SHORT: Record<Kind, string> = {
  trt: "TRT clinic",
  glp1: "GLP-1 prescriber",
  pharmacy: "Compounding pharmacy",
  gym: "Gym",
  urology: "Urologist",
  endo: "Endocrinologist",
  implant: "Implant practice",
  shockwave: "Shockwave / PRP",
  ved: "VED supplier",
  sleep: "Sleep medicine",
  lab: "Lab",
  sextherapy: "Sex therapy",
};

/** Instrument-voice abbreviations for tight UI (list badges, tooltips). */
export const KIND_ABBR: Record<Kind, string> = {
  trt: "TRT", glp1: "GLP-1", pharmacy: "Rx", gym: "Gym",
  urology: "URO", endo: "ENDO", implant: "IMPL", shockwave: "ESWT", ved: "VED", sleep: "SLEEP", lab: "LAB", sextherapy: "SEXMED",
};

/**
 * One line per layer: what a listing here means, and the evidence to read
 * first where the layer sells something graded below ESTABLISHED.
 */
export const KIND_NOTE: Record<Kind, { text: string; read?: { href: string; label: string } }> = {
  trt: { text: "Endocrinology, urology, or preventive-medicine registry listings, plus generalists whose name says hormones.", read: { href: "/learn/testosterone-therapy", label: "Testosterone therapy: what the evidence says" } },
  glp1: { text: "Obesity-medicine listings, weight-loss names, and practices with a CMS Open Payments record from a GLP-1 maker.", read: { href: "/learn/what-it-costs", label: "What it costs" } },
  pharmacy: { text: "503A licensed, 503B FDA-registered, or self-declared compounding pharmacies, labelled by which.", read: { href: "/learn/product-forms", label: "Read what you are buying" } },
  gym: { text: "CrossFit boxes, barbell and strength clubs, independent fitness centres; big-box chains left out.", read: { href: "/learn/training-for-erections", label: "Erections are trainable" } },
  urology: { text: "NPI registry, urology specialty, every state. The specialist for the erectile-function workup.", read: { href: "/learn/urologist-visit", label: "The urologist visit, on your terms" } },
  endo: { text: "NPI registry, endocrinology specialty, every state. Hormones, thyroid, diabetes; not every practice runs a testosterone program.", read: { href: "/learn/read-your-labs", label: "Read your labs" } },
  implant: { text: "Practices with a CMS Open Payments device record from a penile-implant maker, or a urology practice whose name says prosthetics. A proxy for implant surgery being offered there, not a surgeon list." },
  shockwave: { text: "Name matches only: GAINSWave, P-shot, or shockwave with a men's-health context. Evidence grade EMERGING, and the clinic device is often not the trial device.", read: { href: "/learn/shockwave-therapy", label: "Shockwave therapy, graded" } },
  ved: { text: "Medical-supply businesses whose name says urology, men's health, or the device. Thin layer: most devices ship by mail, and the fitting is a clinician's job." },
  sleep: { text: "Sleep-medicine physicians and sleep-disorder diagnostic centers from the NPI registry. Sleep apnea travels with erectile dysfunction and low testosterone; the workup often starts here.", read: { href: "/learn/ed-workup", label: "The ED workup" } },
  lab: { text: "Clinical laboratories from the NPI registry; national draw-site brands flagged. Two morning draws before any testosterone decision.", read: { href: "/learn/read-your-labs", label: "Read your labs" } },
  sextherapy: { text: "Practices whose registered name says sex therapy or sexual medicine. For the part of erectile function that is not plumbing.", read: { href: "/learn/psychogenic-ed", label: "Psychogenic ED" } },
};

/** What a member price report measures for each layer, and the form label for it. */
export const PRICE_UNIT: Record<Kind, { unit: string; label: string }> = {
  trt: { unit: "/mo", label: "Monthly, USD" },
  glp1: { unit: "/mo", label: "Monthly, USD" },
  pharmacy: { unit: "/mo", label: "Monthly, USD" },
  gym: { unit: "/mo", label: "Monthly, USD" },
  urology: { unit: "/visit", label: "Per visit, USD (cash or after insurance)" },
  endo: { unit: "/visit", label: "Per visit, USD (cash or after insurance)" },
  implant: { unit: "/procedure", label: "Per procedure, USD (your share)" },
  shockwave: { unit: "/course", label: "Per course, USD" },
  ved: { unit: "/device", label: "Per device, USD" },
  sleep: { unit: "/study", label: "Per study, USD (your share)" },
  lab: { unit: "/panel", label: "Per panel, USD" },
  sextherapy: { unit: "/session", label: "Per session, USD" },
};

/** Per-kind price context shown when a listing has fewer than 3 member reports.
 *  Published ranges, attributed; a member range always replaces these. Layers
 *  without a published range we can cite show no range until members report. */
export const PUBLISHED_PRICE: Partial<Record<Kind, { low: number; high: number; unit: string; source: string; href: string }>> = {
  trt: { low: 20, high: 133, unit: "/mo membership, before labs", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  glp1: { low: 199, high: 1349, unit: "/mo, compounded to brand cash price", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  pharmacy: { low: 25, high: 80, unit: "/mo compounded testosterone cypionate", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
  gym: { low: 100, high: 250, unit: "/mo CrossFit or barbell-club membership", source: "Member reports (2026)", href: "/near-me/methodology" },
  shockwave: { low: 2000, high: 6000, unit: "/course, cash; nothing investigational is covered", source: "Shockwave therapy, graded (SOS, 2026)", href: "/learn/shockwave-therapy" },
  lab: { low: 75, high: 250, unit: "/panel, self-pay baseline labs", source: "What it costs (SOS, 2026 cash listings)", href: "/learn/what-it-costs" },
};

/** Layers whose street-level search runs only inside the mapped metros. */
export const METRO_SEARCH_KINDS: Kind[] = ["gym", "shockwave", "ved", "sextherapy", "lab"];

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
  /** Per-layer listing counts. A layer added after this build is simply absent. */
  counts: Partial<Record<Kind, number>>;
  /** Layers the index is scored over (absent on builds before the care layers). */
  scored?: string[];
  geocoded: number;
  sources: string[];
  weights: Record<ScoredKind, number>;
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

/** Listings of a layer in the current build (0 for a layer the build predates). */
export function kindCount(k: Kind): number {
  return META.counts[k] ?? 0;
}

/**
 * Why a layer shows nothing at this zip. Distinguishes "not in this build yet"
 * from "thin layer" from a plain empty radius, so an empty list never reads
 * as "there is nothing near you".
 */
export function emptyNote(kind: Kind, inMetro: boolean): string {
  if (kindCount(kind) === 0) return "This layer arrives with the next data refresh.";
  if (kind === "gym" && !inMetro) return "The gym layer covers the 20 mapped metros only, so far.";
  if (METRO_SEARCH_KINDS.includes(kind) && !inMetro) {
    return "Nothing within 25 miles in the current dataset. Outside the 20 mapped metros this layer is registry name matches only.";
  }
  return "Nothing within 25 miles in the current dataset.";
}

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
  if (p.pr) return { text: `$${p.pr.low}–$${p.pr.high}${PRICE_UNIT[p.k].unit} · ${p.pr.n} reports`, member: true };
  const d = PUBLISHED_PRICE[p.k];
  return { text: d ? `$${d.low}–$${d.high}${d.unit}` : "no published range", member: false };
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
  if (p.t.includes("draw-site")) bits.push("national draw-site brand");
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
