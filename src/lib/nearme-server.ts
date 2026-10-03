import "server-only";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Kind, Poi } from "@/lib/nearme";
import { DATA_BASE, dataUrl } from "@/lib/nearme-data";

/**
 * Build-time access to the per-state POI shards for the programmatic pages.
 * Reads the local file when the ETL output is present, otherwise the same
 * shard the browser would fetch from the data store, so the two can never
 * disagree.
 */
const cache = new Map<string, Promise<Poi[]>>();
let warned = false;

export function statePois(state: string): Promise<Poi[]> {
  const st = state.toUpperCase();
  let p = cache.get(st);
  if (!p) {
    p = load(st);
    cache.set(st, p);
  }
  return p;
}

async function load(st: string): Promise<Poi[]> {
  const local = path.join(process.cwd(), "public", "data", "nearme", "pois", `${st}.json`);
  if (existsSync(local)) {
    return JSON.parse(readFileSync(local, "utf8")) as Poi[];
  }
  if (DATA_BASE.startsWith("http")) {
    const r = await fetch(dataUrl(`pois/${st}.json`), { cache: "force-cache" });
    if (r.ok) return (await r.json()) as Poi[];
  }
  if (!warned) {
    warned = true;
    console.warn(`[near-me] no POI shards: run the ETL or set NEXT_PUBLIC_NEARME_DATA_BASE (looked for ${local})`);
  }
  return [];
}

export async function poisInCity(state: string, city: string, kind: Kind): Promise<Poi[]> {
  return (await statePois(state))
    .filter((p) => p.c === city && p.k === kind)
    .sort((a, b) => b.cf - a.cf || a.n.localeCompare(b.n));
}
