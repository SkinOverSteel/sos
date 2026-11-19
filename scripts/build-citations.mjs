// Regenerates src/lib/sources.ts from the visible "Sources" section of every
// /learn article, so the MedicalWebPage `citation` JSON-LD mirrors the prose
// the reviewer actually vetted. The article page is the one source of truth;
// this file is a derived mirror, and e2e/citations.spec.ts fails if the two
// drift.
//
//   npm run build  (first, so the pages render)
//   npx next start &            # serve the built site
//   node scripts/build-citations.mjs [baseUrl]   # default http://localhost:3000
//
// Review the diff before committing: titles come straight from the link text,
// minus a leading "[n]" reference marker.

import { chromium } from "playwright";
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const base = process.argv[2] || "http://localhost:3000";
const slugs = execSync("ls src/app/learn")
  .toString()
  .trim()
  .split("\n")
  .filter((s) => s !== "page.tsx")
  .sort();

const browser = await chromium.launch();
const page = await browser.newPage();
const out = {};

for (const slug of slugs) {
  await page.goto(`${base}/learn/${slug}`, { waitUntil: "domcontentloaded" });
  const cites = await page.evaluate(() => {
    const kick = [...document.querySelectorAll(".sos-card .sos-kicker, .sos-card p")].find((e) =>
      /^\s*Sources\b/i.test(e.textContent || ""),
    );
    if (!kick) return [];
    let para = kick.nextElementSibling;
    while (para && para.querySelectorAll('a[href^="http"]').length === 0) para = para.nextElementSibling;
    if (!para) return [];
    return [...para.querySelectorAll('a[href^="http"]')]
      .filter((a) => !/skinoversteel\.com/.test(a.href))
      .map((a) => ({
        url: a.href,
        title: (a.textContent || "").trim().replace(/^\[\d+\]\s*/, "").replace(/\s+/g, " "),
      }));
  });
  if (cites.length) out[slug] = cites;
}

await browser.close();

const ts = `// Per-article source citations, mirrored from each article's visible "Sources"
// section. The article page stays the one source of truth; this feeds the
// MedicalWebPage \`citation\` JSON-LD (withReview in src/lib/jsonld.ts), and
// e2e/citations.spec.ts guards against drift. Regenerate with
// scripts/build-citations.mjs. product-forms has no sources section.

export type Citation = { url: string; title: string };

export const SOURCES: Record<string, Citation[]> = ${JSON.stringify(out, null, 2)};
`;

writeFileSync("src/lib/sources.ts", ts);
const n = Object.values(out).reduce((a, c) => a + c.length, 0);
console.log(`wrote src/lib/sources.ts: ${Object.keys(out).length} articles, ${n} citations`);
