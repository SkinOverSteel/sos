// Upload the Near Me data shards (public/data/nearme/**) to Vercel Blob under
// the same relative paths, so NEXT_PUBLIC_NEARME_DATA_BASE can point at the
// store and the 40+ MB of shards stay out of the repo.
//
//   BLOB_READ_WRITE_TOKEN=... node scripts/upload-nearme-data.mjs [--no-prune] [--dry-run]
//
// Idempotent: a file is skipped when the store already holds the same bytes
// (compared by size + sha256 recorded in a manifest next to the data).
// This is a SYNC: by default it also deletes store files the local shards no
// longer reference (a stale state/metro after a region change, or orphans left
// by an earlier run that wrote random-suffixed paths) so the Blob store cannot
// grow without bound. Pass --no-prune to upload only and leave the store alone.
// --dry-run previews uploads and prunes without writing (needs the token to
// read the current store). Prints the base URL to put in Vercel's env.
//
// The city pages are prerendered from the shards at build time, so a refresh
// is only live after a redeploy. Set VERCEL_DEPLOY_HOOK (Vercel → project →
// Settings → Git → Deploy Hooks) and the script triggers one after a
// successful upload that changed anything.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { del, list, put } from "@vercel/blob";

const ROOT = join(process.cwd(), "public", "data", "nearme");
const PREFIX = "data/nearme/";
const dry = process.argv.includes("--dry-run");
// Reconcile by default so orphaned shards can't accumulate; --no-prune opts out.
const prune = !process.argv.includes("--no-prune");

if (!process.env.BLOB_READ_WRITE_TOKEN && !dry) {
  console.error("BLOB_READ_WRITE_TOKEN is not set (create a Blob store in Vercel → Storage, then pull the token).");
  process.exit(1);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".json")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
if (files.length === 0) {
  console.error(`nothing under ${ROOT}; run etl/aggregate_h3.py first`);
  process.exit(1);
}

// What the store already holds (size + sha256 from the previous manifest).
// Listing is read-only, so do it whenever a token is available — this lets a
// --dry-run with the token preview real skips and the prune set.
const existing = new Map();
if (process.env.BLOB_READ_WRITE_TOKEN) {
  let cursor;
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
    for (const b of page.blobs) existing.set(b.pathname, b);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
}
let manifest = {};
const manifestBlob = existing.get(`${PREFIX}manifest.json`);
if (manifestBlob) {
  try {
    manifest = await (await fetch(manifestBlob.url, { cache: "no-store" })).json();
  } catch {
    manifest = {};
  }
}

const next = {};
let uploaded = 0;
let skipped = 0;
let base = null;
for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const pathname = PREFIX + rel;
  const body = readFileSync(file);
  const sha = createHash("sha256").update(body).digest("hex");
  next[rel] = { size: body.length, sha256: sha };
  const prev = manifest[rel];
  if (prev && prev.sha256 === sha && existing.has(pathname)) {
    skipped++;
    base ??= existing.get(pathname).url.slice(0, -rel.length - 1);
    continue;
  }
  if (dry) {
    console.log(`would upload ${pathname} (${(body.length / 1024).toFixed(0)} KB)`);
    uploaded++;
    continue;
  }
  const res = await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60 * 60 * 24 * 30,
  });
  base ??= res.url.slice(0, -rel.length - 1);
  uploaded++;
  if (uploaded % 50 === 0) console.log(`${uploaded} uploaded…`);
}

if (!dry) {
  await put(`${PREFIX}manifest.json`, JSON.stringify({ built: new Date().toISOString(), files: Object.keys(next).length, ...next }), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

let pruned = 0;
let reclaimed = 0;
if (prune) {
  const keep = new Set([...Object.keys(next).map((r) => PREFIX + r), `${PREFIX}manifest.json`]);
  const stale = [...existing.keys()].filter((p) => !keep.has(p));
  for (const p of stale) reclaimed += existing.get(p).size ?? 0;
  if (stale.length) {
    if (dry) {
      for (const p of stale) console.log(`would prune ${p} (${((existing.get(p).size ?? 0) / 1024).toFixed(0)} KB)`);
    } else {
      // del accepts up to 1000 urls per call; chunk in case the orphan backlog is large.
      const urls = stale.map((p) => existing.get(p).url);
      for (let i = 0; i < urls.length; i += 1000) await del(urls.slice(i, i + 1000));
    }
    pruned = stale.length;
  }
}

const reclaimedMsg = pruned ? `, ${(reclaimed / 1024 / 1024).toFixed(1)} MB ${dry ? "would be " : ""}reclaimed` : "";
console.log(`${uploaded} uploaded, ${skipped} unchanged, ${pruned} pruned${reclaimedMsg}, ${files.length} files total`);
if (base) {
  console.log(`\nNEXT_PUBLIC_NEARME_DATA_BASE=${base}`);
}

const hook = process.env.VERCEL_DEPLOY_HOOK;
if (!dry && (uploaded > 0 || pruned > 0)) {
  if (hook) {
    const r = await fetch(hook, { method: "POST" });
    console.log(r.ok ? "Production redeploy triggered (city pages rebuild from the new shards)." : `Deploy hook failed: HTTP ${r.status}`);
  } else {
    console.log("Shards changed: redeploy production so the prerendered city pages pick them up (or set VERCEL_DEPLOY_HOOK to automate).");
  }
}
