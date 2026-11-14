import { test, expect } from "@playwright/test";

/**
 * The lab articles and the free-testosterone calculator hand off to the
 * directory's blood-testing listings, and that anchor exists.
 */
const PAGES = [
  "/learn/read-your-labs",
  "/learn/testosterone-therapy",
  "/learn/trt-high-hematocrit",
  "/learn/ed-workup",
  "/tools/free-testosterone",
];

for (const path of PAGES) {
  test(`${path} links to the directory's blood testing`, async ({ page }) => {
    await page.goto(path);
    const link = page.locator("aside.sos-callout a[href='/directory#lab']");
    await expect(link).toBeVisible();
  });
}

test("the directory's blood-testing section is the link target", async ({ page }) => {
  await page.goto("/directory#lab");
  await expect(page.locator("section#lab h2")).toHaveText(/blood testing/i);
});

test("/labs lists the three checklists, each line with a source", async ({ page }) => {
  await page.goto("/labs");
  for (const id of ["baseline", "on-therapy", "ed-workup"]) {
    const items = page.locator(`section#${id} .sos-labs__item`);
    expect(await items.count()).toBeGreaterThan(3);
    for (const item of await items.all()) await expect(item.locator(".sos-labs__src a")).toBeVisible();
  }
  // Literacy only: the page carries no dose targets.
  await expect(page.locator("main")).not.toContainText(/ng\/dL|mg\b/);
});
