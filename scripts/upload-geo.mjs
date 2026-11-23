// Upload the map's geography outlines (src/data/geo/*.json) to Vercel Blob
// under geo/<name>, so NEXT_PUBLIC_GEO_BASE can point at the store and the
// ~1 MB of outlines stays out of each deployment's build output.
//
//   BLOB_READ_WRITE_TOKEN=... node scripts/upload-geo.mjs [--dry-run]
//
// Idempotent: a file is skipped when the store already holds the same bytes
// (compared by sha256 recorded in geo/manifest.json next to the data). The
// outlines are three stable files that change only when build-geo is rerun, so
// there is nothing to prune. Prints the base URL to put in Vercel's env.
//
// The outlines are fetched by the browser (GeoLayer), so a refresh is live as
// soon as the upload finishes and the env var points here — no redeploy needed.

import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { list, put } from "@vercel/blob";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "geo");
const PREFIX = "geo/";
const dry = process.argv.includes("--dry-run");

if (!process.env.BLOB_READ_WRITE_TOKEN && !dry) {
  console.error("BLOB_READ_WRITE_TOKEN is not set (create a Blob store in Vercel → Storage, then pull the token).");
  process.exit(1);
}

const files = readdirSync(ROOT).filter((f) => f.endsWith(".json")).sort();
if (files.length === 0) {
  console.error(`nothing under ${ROOT}; run scripts/build-geo.mjs first`);
  process.exit(1);
}

// What the store already holds, and the previous manifest's hashes.
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
for (const name of files) {
  const pathname = PREFIX + name;
  const body = readFileSync(join(ROOT, name));
  const sha = createHash("sha256").update(body).digest("hex");
  next[name] = { size: body.length, sha256: sha };
  const prev = manifest[name];
  if (prev && prev.sha256 === sha && existing.has(pathname)) {
    skipped++;
    base ??= existing.get(pathname).url.slice(0, -name.length - 1);
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
  base ??= res.url.slice(0, -name.length - 1);
  uploaded++;
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

console.log(`${uploaded} uploaded, ${skipped} unchanged, ${files.length} files total`);
if (base) {
  console.log(`\nNEXT_PUBLIC_GEO_BASE=${base}`);
}
