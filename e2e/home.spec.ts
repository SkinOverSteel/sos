import { test, expect } from "@playwright/test";

/**
 * The front door's workflow, end to end. The copy lint (copy.spec.ts) checks
 * voice; this checks that the things the homepage promises actually happen.
 */

test("every route tile and section link resolves", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator("main a[href^='/'], body a[href^='/']").evaluateAll((as) =>
    Array.from(new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute("href") || ""))).filter((h) => h && !h.startsWith("/#")),
  );
  expect(hrefs.length).toBeGreaterThan(12);
  const bad: string[] = [];
  for (const h of hrefs) {
    const res = await request.get(h);
    if (res.status() !== 200) bad.push(`${h}: ${res.status()}`);
  }
  expect(bad, bad.join("\n")).toEqual([]);
});

test("the hero zip form lands on Near me with that zip", async ({ page }) => {
  await page.goto("/");
  const zip = page.locator("#home-zip");
  await zip.fill("75201");
  await zip.press("Enter");
  await expect(page).toHaveURL(/\/near-me\?zip=75201/);
  // The tool picks the zip up from the query and runs it.
  await expect(page.locator("h1")).toContainText(/near you/i);
  await expect(page.locator("body")).not.toContainText("Enter a 5-digit zip.");
});

test("the zip form refuses a non-zip before navigating", async ({ page }) => {
  await page.goto("/");
  const zip = page.locator("#home-zip");
  await zip.fill("abc");
  await zip.press("Enter");
  await expect(page).toHaveURL(/\/$/);
  const valid = await zip.evaluate((el) => (el as HTMLInputElement).checkValidity());
  expect(valid).toBe(false);
});

test("support is reachable above the fold on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto("/");
  const support = page.locator("header a[href='/support']");
  await expect(support).toBeVisible();
  const box = await support.boundingBox();
  expect(box && box.y + box.height).toBeLessThan(780);
});

test("the Find care map is a static image that links to the full map", async ({ page }) => {
  await page.goto("/");
  const img = page.locator("a.sos-home__map img");
  await img.scrollIntoViewIfNeeded();
  await expect(img).toHaveAttribute("src", "/map/us-preview.svg");
  const loaded = await img.evaluate((el) => {
    const i = el as HTMLImageElement;
    return i.complete && i.naturalWidth > 0;
  });
  expect(loaded).toBe(true);
  await expect(page.locator("a.sos-home__map")).toHaveAttribute("href", "/map");
  // No hex shard is fetched on the front door.
  const shard = page.waitForRequest(/hex-r\d\.json/, { timeout: 1500 }).then(() => true, () => false);
  await page.mouse.wheel(0, 2000);
  expect(await shard).toBe(false);
});
