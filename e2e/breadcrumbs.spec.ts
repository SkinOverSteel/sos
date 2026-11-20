import { test, expect } from "@playwright/test";

/**
 * Breadcrumb parity. Google requires BreadcrumbList structured data to match
 * the visible trail; it's also a plain UX expectation that the trail shows
 * where you are. For every /learn and /tools detail page, assert each name in
 * the BreadcrumbList JSON-LD appears as text in the visible breadcrumb nav —
 * so a page can't ship a 3-item schema trail with a 2-item visible one.
 */

test("the visible breadcrumb trail matches the BreadcrumbList schema", async ({ page, request }) => {
  test.setTimeout(300_000);

  const xml = await (await request.get("/sitemap.xml")).text();
  const all = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/");
  const paths = all.filter((p) => /^\/(learn|tools)\/[^/]+$/.test(p));
  expect(paths.length).toBeGreaterThan(40);

  const failures: string[] = [];
  for (const path of paths) {
    await page.goto(path);

    const names: string[] = await page.evaluate(() => {
      for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const j = JSON.parse(s.textContent || "");
          if (j["@type"] === "BreadcrumbList") {
            return (j.itemListElement || []).map((i: { name: string }) => i.name);
          }
        } catch {
          /* ignore */
        }
      }
      return [];
    });
    if (names.length === 0) {
      failures.push(`${path}: no BreadcrumbList schema`);
      continue;
    }

    const navText = ((await page.locator('nav[aria-label="Breadcrumb"]').first().textContent()) || "").replace(/\s+/g, " ").trim();
    for (const name of names) {
      const norm = name.replace(/\s+/g, " ").trim();
      if (!navText.includes(norm)) {
        failures.push(`${path}: crumb "${norm}" is in the schema but not the visible trail (${navText})`);
      }
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
