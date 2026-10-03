import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Kind, Poi } from "@/lib/nearme";

/**
 * Build-time access to the per-state POI shards for the programmatic pages.
 * Reads the same files the browser fetches, so the two can never disagree.
 */
const cache = new Map<string, Poi[]>();

export function statePois(state: string): Poi[] {
  const st = state.toUpperCase();
  let rows = cache.get(st);
  if (!rows) {
    try {
      rows = JSON.parse(readFileSync(path.join(process.cwd(), "public", "data", "nearme", "pois", `${st}.json`), "utf8")) as Poi[];
    } catch {
      rows = [];
    }
    cache.set(st, rows);
  }
  return rows;
}

export function poisInCity(state: string, city: string, kind: Kind): Poi[] {
  return statePois(state)
    .filter((p) => p.c === city && p.k === kind)
    .sort((a, b) => b.cf - a.cf || a.n.localeCompare(b.n));
}
