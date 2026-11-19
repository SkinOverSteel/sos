import { test, expect } from "@playwright/test";

/**
 * Open Graph coverage. Every /learn article and /tools tool must ship its own
 * social card (opengraph-image.tsx in the segment), so a shared link carries
 * the page's title and evidence grade — not the site-wide fallback. A new
 * article that forgets the wrapper falls back to /opengraph-image and fails
 * here before it ships.
 *
 * Hubs (/learn, /tools) legitimately use the site-wide card, so only the
 * <slug> detail pages are checked.
 */

function isDetailPage(path: string): boolean {
  return /^\/(learn|tools)\/[^/]+$/.test(path);
}

test("every article and tool ships its own Open Graph card", async ({ page, request }) => {
  test.setTimeout(300_000);

  const xml = await (await request.get("/sitemap.xml")).text();
  const all = [...xml.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)?<\/loc>/g)].map((m) => m[1] || "/");
  const paths = all.filter(isDetailPage);
  expect(paths.length, "sitemap should list learn/tools detail pages").toBeGreaterThan(40);

  const failures: string[] = [];
  for (const path of paths) {
    const res = await page.goto(path);
    if (res?.status() !== 200) {
      failures.push(`${path}: HTTP ${res?.status()}`);
      continue;
    }

    // The og:image (and twitter:image) must point at this page's own
    // opengraph-image route, carrying a version hash — never the site-wide
    // fallback at /opengraph-image.
    const own = new RegExp(`${path.replace(/[/]/g, "\\/")}\\/opengraph-image\\?[a-f0-9]+$`);
    for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const content = await page.locator(sel).first().getAttribute("content");
      if (!content) {
        failures.push(`${path}: missing ${sel}`);
      } else if (!own.test(new URL(content).pathname + new URL(content).search)) {
        failures.push(`${path}: ${sel} is not its own card -> ${content}`);
      }
    }

    // The card must render (1200x630 PNG served 200), not 404.
    const imgUrl = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    if (imgUrl) {
      const imgPath = new URL(imgUrl).pathname + new URL(imgUrl).search;
      const img = await request.get(imgPath);
      if (img.status() !== 200) failures.push(`${path}: card ${imgPath} -> HTTP ${img.status()}`);
      else if (!(img.headers()["content-type"] || "").includes("image/png")) {
        failures.push(`${path}: card is not a PNG -> ${img.headers()["content-type"]}`);
      }
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});
