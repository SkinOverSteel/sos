// Build guard: catch spaces stripped after inline elements in the compiled HTML.
//
// Next 16 + Turbopack (SWC) drops the leading space of a multi-line JSX text run
// that begins right after an inline element, so authoring
//     <strong>Skin Over Steel</strong> is evidence-graded...   (wrapping to next line)
// compiles to "...Steel</strong>is evidence-graded" with the space gone.
// The fix is an explicit {" "} after the element. This guard scans the prerendered
// HTML and fails the build if any inline close-tag is glued directly to a word,
// so the regression can never ship silently. Runs as `postbuild`.
//
// Rare intentional glue (e.g. pluralizing an acronym: <strong>API</strong>s) would
// trip this. If you ever need that, write it as a single text node (<strong>APIs</strong>)
// or add the exact rendered snippet to ALLOW below.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".next/server/app";
const SYMPTOM = /<\/(strong|em|a|code|b|i)>[A-Za-z0-9]/g;
const ALLOW = new Set([
  // "</strong>s",  // example: intentional acronym plural
]);

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const hits = [];
for (const file of walk(ROOT)) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(SYMPTOM)) {
    const snippet = html.slice(m.index, m.index + 40).replace(/\s+/g, " ");
    if (ALLOW.has(m[0])) continue;
    const page = file.replace(/\\/g, "/").replace(`${ROOT}/`, "/").replace(/\.html$/, "");
    hits.push({ page, snippet });
  }
}

if (hits.length) {
  console.error(`\n✗ jsx-whitespace: ${hits.length} space(s) stripped after an inline element:\n`);
  for (const h of hits) console.error(`  ${h.page}\n      …${h.snippet}…`);
  console.error(`\n  Fix: add an explicit {" "} after the inline tag, e.g.`);
  console.error(`       <strong>X</strong>{" "}next word\n`);
  process.exit(1);
}
console.log("✓ jsx-whitespace: no stripped spaces after inline elements");
