import { test, expect } from "@playwright/test";

/**
 * The Log, end to end: start, baseline, intervention, check-ins, outcome,
 * persistence across reload, export, backup, delete. Everything is local to
 * the browser, so the test needs no fixtures and leaves nothing behind.
 */

test.describe("The Log", () => {
  test("tracks a protocol from baseline to outcome and persists it", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto("/log");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("One protocol");
    await page.getByRole("button", { name: "Start a log" }).click();

    // 1 · baseline
    await page.getByLabel("SHIM score (5–25)").fill("14");
    await page.getByLabel("Notes").first().fill("Total T 310. Nothing tried yet.");

    // 2 · intervention: injection shows the priapism-clock reminder
    await page.getByLabel("Category").selectOption("injection");
    await expect(page.getByRole("link", { name: "the priapism clock" })).toBeVisible();
    await page.getByLabel("Name").fill("Trimix");
    await page.getByLabel("Started").fill("2026-08-01");
    await page.getByLabel("Regimen").fill("as written on the pharmacy label");
    await page.getByLabel("Prescriber / clinic").fill("Urology clinic");

    // 3 · weekly check-ins
    const addCheckin = async (date: string, firm: number, conf: number) => {
      await page.getByLabel("Date").nth(1).fill(date);
      await page
        .getByRole("group", { name: "Hard enough for penetration" })
        .getByRole("button", { name: String(firm), exact: true })
        .click();
      await page
        .getByRole("group", { name: "Confidence" })
        .getByRole("button", { name: String(conf), exact: true })
        .click();
      await page.getByRole("button", { name: "Add check-in" }).click();
    };
    await addCheckin("2026-08-05", 2, 2);
    await addCheckin("2026-08-12", 3, 3);
    await addCheckin("2026-08-19", 4, 3);

    await expect(page.getByText(/3 check-ins/)).toBeVisible();
    // Two single-series trend charts appear once there are ≥2 points, on
    // screen and again on the clinician summary.
    await expect(page.locator("figure")).toHaveCount(4);

    // 4 · outcome
    await page.getByRole("button", { name: "Close this log" }).click();
    await page.getByLabel("Result").selectOption("improved");
    await page.getByLabel("SHIM score now (5–25)").fill("20");
    await expect(page.getByText(/Stage · Closed/)).toBeVisible();

    // persistence: a reload reads the browser's copy back
    await page.reload();
    await expect(page.getByText(/Stage · Closed · 3 check-ins/)).toBeVisible();

    // clinician export carries both grades and the before/after
    const summary = page.locator(".sos-clinician-print");
    await expect(summary).toContainText("Protocol log summary");
    await expect(summary).toContainText("Established");
    await expect(summary).toContainText("Anecdote");
    await expect(summary).toContainText("14 → 20");
    await expect(summary).toContainText("as written on the pharmacy label");

    // backup is a JSON file of the log
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Download backup" }).click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/^sos-log-\d{4}-\d{2}-\d{2}\.json$/);

    // delete asks first, then clears storage
    await page.getByRole("button", { name: "Delete log" }).click();
    await page.getByRole("button", { name: "Yes, delete it" }).click();
    await expect(page.getByRole("button", { name: "Start a log" })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("button", { name: "Start a log" })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("unsupervised compounds get the high-risk badge and a support pointer", async ({ page }) => {
    await page.goto("/log");
    await page.getByRole("button", { name: "Start a log" }).click();
    await page.getByLabel("Category").selectOption("unsupervised");
    const card = page.locator(".sos-card--deep").filter({ hasText: "evidence for this category" });
    await expect(card.locator(".sos-badge")).toHaveText("High risk");
    await expect(card.getByRole("link", { name: "get support now" })).toHaveAttribute("href", "/support");
  });

  test("never sends anything over the network", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (r) => {
      const url = new URL(r.url());
      if (url.hostname !== "localhost") requests.push(r.url());
    });
    await page.goto("/log");
    await page.getByRole("button", { name: "Start a log" }).click();
    await page.getByLabel("Notes").first().fill("private");
    await page.waitForTimeout(500);
    // Google Fonts are the one allowed external fetch; nothing else leaves.
    expect(requests.filter((u) => !/fonts\.(googleapis|gstatic)\.com/.test(u))).toEqual([]);
  });
});
