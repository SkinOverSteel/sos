import { test, expect } from "@playwright/test";

/**
 * Brand-voice copy lint (CLAUDE.md, "Voice"). Walks the sitemap and reads
 * each page's visible text.
 *
 * Two tiers, because the library quotes research, clinical terms, and the
 * marketing claims it debunks ("not a cure", "no sterility guarantee", "the
 * key to manhood"):
 *  - Everywhere: the page returns 200 and keeps the support link in the
 *    header (hard line 4).
 *  - Instrument surfaces (home, tools, Log, support, directory, methodology,
 *    about, near-me, map): the UI never says "performance", "manhood", "cure", "guarantee",
 *    or "hack" as a noun. Articles and the library hub are prose and exempt;
 *    their voice is reviewed by a person, not a regex. The /trt and /glp1
 *    city pages print registry business names verbatim, so they are exempt too.
 *
 * Hard line 4: the support link is in the header of every page.
 */

const INSTRUMENT = [
  /\bperformance\b/i,
  /\bmanhood\b/i,
  /\bcure[ds]?\b/i,
  /\bguarantee[ds]?\b/i,
  /\ba hack\b/i,
  /\bhacks\b/i,
];

function isInstrumentSurface(path: string): boolean {
  if (path.startsWith("/trt/") || path.startsWith("/glp1/")) return false; // third-party business names are data
  return path !== "/learn" && !path.startsWith("/learn/") && path !== "/privacy";
}

test("every page keeps the brand voice and the support link", async ({ page, request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/");
  expect(paths.length).toBeGreaterThan(40);

  const failures: string[] = [];
  for (const path of paths) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);

    const text = await page.locator("body").innerText();
    for (const re of isInstrumentSurface(path) ? INSTRUMENT : []) {
      const m = text.match(re);
      if (m) failures.push(`${path}: "${m[0]}"`);
    }

    const support = page.locator("header a[href='/support']");
    if ((await support.count()) === 0) failures.push(`${path}: no support link in header`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
