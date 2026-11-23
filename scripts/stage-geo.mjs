// Stage the map's geography outlines (src/data/geo/*.json) into public/geo so
// the app can fetch them same-origin. Runs before `next dev` and `next build`.
//
// When NEXT_PUBLIC_GEO_BASE is set (production: the Vercel Blob store), the
// client fetches the outlines from there, so we DON'T copy them into public/ —
// that keeps ~1 MB out of the deployment's build output. Unset (local dev, CI,
// any build without the variable), we stage them so /geo/* serves locally and
// nothing breaks without the Blob store. Mirrors the data-shards pattern:
// unset -> local copy, set -> Blob. See scripts/upload-geo.mjs.

import { cpSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src", "data", "geo");
const DEST = join(root, "public", "geo");

if (process.env.NEXT_PUBLIC_GEO_BASE) {
  console.log("[geo] NEXT_PUBLIC_GEO_BASE set; serving outlines from Blob, not staging into public/geo");
  process.exit(0);
}

if (!existsSync(SRC)) {
  console.warn(`[geo] no outlines at ${SRC}; run \`node scripts/build-geo.mjs\` to regenerate them`);
  process.exit(0);
}

mkdirSync(DEST, { recursive: true });
cpSync(SRC, DEST, { recursive: true });
console.log(`[geo] staged outlines into public/geo (NEXT_PUBLIC_GEO_BASE unset)`);
