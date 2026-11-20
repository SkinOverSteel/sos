import { test, expect } from "@playwright/test";

/**
 * Citation coverage + drift guard (CLAUDE.md: the Open Floor is the SEO/AI-agent
 * surface, "citations" are part of its structured data). Every /learn article
 * with a visible "Sources" section must mirror those external links into its
 * MedicalWebPage `citation` JSON-LD, with the same set of URLs — so the
 * machine-readable evidence base can't silently fall out of sync with the prose
 * the reviewer actually vetted. Sourced from src/lib/sources.ts.
 */

test("every article's sources appear in its citation schema", async ({ page, request }) => {
  test.setTimeout(300_000);

  const xml = await (await request.get("/sitemap.xml")).text();
  const slugs = [...xml.matchAll(/<loc>https?:\/\/[^/]+\/learn\/([^/<]+)<\/loc>/g)].map((m) => m[1]);
  expect(slugs.length, "sitemap should list articles").toBeGreaterThan(40);

  const norm = (u: string) => u.replace(/\/$/, "");
  const failures: string[] = [];

  for (const slug of slugs) {
    await page.goto(`/learn/${slug}`);

    // Visible citations: external links in the first link-bearing paragraph of
    // the "Sources" card (mirrors how src/lib/sources.ts was built).
    const visible: string[] = await page.evaluate(() => {
      const kick = [...document.querySelectorAll(".sos-card .sos-kicker, .sos-card p")].find((e) =>
        /^\s*Sources\b/i.test(e.textContent || ""),
      );
      if (!kick) return [];
      let para = kick.nextElementSibling;
      while (para && para.querySelectorAll('a[href^="http"]').length === 0) para = para.nextElementSibling;
      if (!para) return [];
      return [...para.querySelectorAll('a[href^="http"]')]
        .map((a) => (a as HTMLAnchorElement).href)
        .filter((h) => !/skinoversteel\.com/.test(h));
    });

    // Schema citations: from the MedicalWebPage JSON-LD block.
    const schema: string[] = await page.evaluate(() => {
      for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
        try {
          const j = JSON.parse(s.textContent || "");
          if (j["@type"] === "MedicalWebPage") {
            const c = j.citation;
            if (!c) return [];
            return (Array.isArray(c) ? c : [c]).map((x: { url: string }) => x.url);
          }
        } catch {
          /* ignore */
        }
      }
      return [];
    });

    const v = new Set(visible.map(norm));
    const s = new Set(schema.map(norm));
    const missing = [...v].filter((u) => !s.has(u)); // visible but not in schema
    const extra = [...s].filter((u) => !v.has(u)); // in schema but not visible
    if (missing.length) failures.push(`${slug}: ${missing.length} source(s) missing from citation schema: ${missing.join(", ")}`);
    if (extra.length) failures.push(`${slug}: ${extra.length} citation(s) not in the visible sources: ${extra.join(", ")}`);
  }

  expect(failures, failures.join("\n")).toEqual([]);
});
