import { test, expect, type Page } from "@playwright/test";

/**
 * Click events. Locally the analytics script is absent, so `track()` calls
 * queue on window.vaq; the tests read that queue. Events describe the link
 * that was clicked and nothing the member typed.
 */
type Queued = [string, { name?: string; data?: Record<string, string> }];

async function events(page: Page) {
  const q = await page.evaluate(() => ((window as unknown as { vaq?: unknown[] }).vaq ?? []) as unknown[]);
  return (q as Queued[]).filter((e) => e[0] === "event").map((e) => e[1]);
}

test("the labs note reports which link was used", async ({ page }) => {
  await page.goto("/learn/read-your-labs");
  await page.locator("aside.sos-callout a[href='/labs']").click();
  await expect(page).toHaveURL(/\/labs$/);
  const ev = await events(page);
  expect(ev).toContainEqual({
    name: "labs_callout",
    data: { page: "/learn/read-your-labs", variant: "baseline", target: "checklists" },
  });
});

test("a directory outbound click names the listing and whether it is a referral", async ({ page, context }) => {
  // Keep the test offline: the outbound request itself is aborted.
  await context.route(/^https?:\/\/(?!localhost)/, (r) => r.abort());
  await page.goto("/directory");
  const link = page.locator("section#lab a[data-track='directory_outbound']").first();
  await link.evaluate((a) => a.setAttribute("target", "_self"));
  await link.evaluate((a) => a.addEventListener("click", (e) => e.preventDefault()));
  await link.click();
  const ev = (await events(page)).filter((e) => e.name === "directory_outbound");
  expect(ev).toHaveLength(1);
  expect(ev[0].data?.category).toBe("lab");
  expect(ev[0].data?.referral).toMatch(/^(yes|no)$/);
  expect(ev[0].data?.provider).toBeTruthy();
});

test("the homepage links to the lab checklists", async ({ page }) => {
  await page.goto("/");
  await page.locator("main a[href='/labs']").click();
  await expect(page).toHaveURL(/\/labs$/);
  expect(await events(page)).toContainEqual({ name: "labs_entry", data: { page: "/", from: "home" } });
});

test("the Log and the appointment sheet carry no tracked elements", async ({ page }) => {
  await page.goto("/log");
  await page.getByRole("button", { name: "Start a log" }).click();
  await page.getByLabel("Category").selectOption("trt");
  await page.getByLabel("Started").fill("2026-01-31");
  expect(await page.locator("main [data-track]").count()).toBe(0);
  await page.goto("/tools/appointment-sheet");
  expect(await page.locator("main [data-track]").count()).toBe(0);
});
