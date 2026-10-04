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

