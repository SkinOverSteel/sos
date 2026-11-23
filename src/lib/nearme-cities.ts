/**
 * The cities table (~260 KB of JSON) and the helpers over it. Kept apart from
 * lib/nearme.ts on purpose: that module is imported by client components (the
 * Near me tool, the hex map), and Next prefetches linked routes' chunks, so
 * anything it imports would ride along on every page of the site. Only server
 * code (city pages, the map region page, the sitemap) imports this file.
 */
import cities from "@/data/nearme/cities.json";
import type { City } from "@/lib/nearme";

export const CITIES = cities as City[];

export function cityBySlug(state: string, slug: string): City | undefined {
  const st = state.toUpperCase();
  return CITIES.find((c) => c.state === st && c.slug === slug);
}

/** Cities with enough signal to earn a programmatic page (thin pages hurt). */
export function citiesWithPages(kind: "trt" | "glp1", state?: string): City[] {
  const st = state?.toUpperCase();
  return CITIES.filter((c) => c.pages.includes(kind) && (!st || c.state === st));
}

function envCap(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

/**
 * Per-kind cap on how many city pages are prerendered at build time. Keeping the
 * long tail out of the build output is what shrinks each deployment (the driver
 * of Vercel Deployment Storage). The capped-out pages are NOT dropped: the city
 * routes set `dynamicParams = true`, so a page beyond the cap renders on its
 * first request and is then cached, and every page stays in the sitemap and in
 * internal links. Override per build with NEARME_PRERENDER_TRT /
 * NEARME_PRERENDER_GLP1; 0 means "prerender them all" (the previous behaviour).
 */
const PRERENDER_CAP: Record<"trt" | "glp1", number> = {
  trt: envCap("NEARME_PRERENDER_TRT", 150),
  glp1: envCap("NEARME_PRERENDER_GLP1", 400),
  glp1: envCap("NEARME_PRERENDER_GLP1", 150),
};

/**
 * The subset of city pages to prerender at build time: the busiest first, so the
 * highest-traffic pages are warm immediately after a deploy and the rest fall to
 * on-demand ISR. Ranked by this kind's listing count, then MII, then total, with
 * a slug tie-break so the build set is deterministic.
 */
export function citiesToPrerender(kind: "trt" | "glp1"): City[] {
  const ranked = [...citiesWithPages(kind)].sort(
    (a, b) =>
      (b.counts[kind] ?? 0) - (a.counts[kind] ?? 0) ||
      b.mii - a.mii ||
      b.total - a.total ||
      a.slug.localeCompare(b.slug),
  );
  const cap = PRERENDER_CAP[kind];
  return cap > 0 ? ranked.slice(0, cap) : ranked;
}

