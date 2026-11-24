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

  test("persists reopening and individual check-in removal", async ({ page }) => {
    await page.goto("/log");
    await page.getByRole("button", { name: "Start a log" }).click();

    await expect(page.getByText("Record the intervention first.")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Close this log" })).toHaveCount(0);
    await page.getByLabel("Category").selectOption("lifestyle");
    const addCheckin = page.getByRole("button", { name: "Add check-in" });
    await expect(addCheckin).toBeDisabled();

    await page.getByRole("button", { name: "Close this log" }).click();
    await expect(page.getByText(/Stage · Closed/)).toBeVisible();

    const firmness = page.getByRole("group", { name: "Hard enough for penetration" })
      .getByRole("button", { name: "3", exact: true });
    const confidence = page.getByRole("group", { name: "Confidence" })
      .getByRole("button", { name: "4", exact: true });
    await page.getByLabel("Date", { exact: true }).nth(1).fill("2026-08-05");
    await firmness.click();
    await expect(addCheckin).toBeDisabled();
    await confidence.click();
    await addCheckin.click();
    await expect(page.getByText(/Stage · Closed · 1 check-in/)).toBeVisible();

    await page.getByLabel("Date", { exact: true }).nth(1).fill("2026-08-12");
    await firmness.click();
    await confidence.click();
    await addCheckin.click();

    const firstCheckin = page.getByRole("button", { name: "Remove check-in from Aug 5, 2026" });
    const secondCheckin = page.getByRole("button", { name: "Remove check-in from Aug 12, 2026" });
    await page.reload();
    await expect(page.getByText(/Stage · Closed · 2 check-ins/)).toBeVisible();
    await firstCheckin.click();
    await expect(page.getByText(/Stage · Closed · 1 check-in/)).toBeVisible();

    await page.getByRole("button", { name: "Reopen the log" }).click();
    await page.reload();
    await expect(page.getByText(/Stage · Active · 1 check-in/)).toBeVisible();
    await expect(firstCheckin).toHaveCount(0);
    await expect(secondCheckin).toBeVisible();
    await expect(page.getByRole("button", { name: "Close this log" })).toBeVisible();
  });

  test("unsupervised compounds get the high-risk badge and a support pointer", async ({ page }) => {
    await page.goto("/log");
    await page.getByRole("button", { name: "Start a log" }).click();
    await page.getByLabel("Category").selectOption("unsupervised");
    const card = page.locator(".sos-card--deep").filter({ hasText: "evidence for this category" });
    await expect(card.locator(".sos-badge")).toHaveText("High risk");
    await expect(card.getByRole("link", { name: "get support now" })).toHaveAttribute("href", "/support");
  });

  test("testosterone therapy shows dated monitoring checkpoints", async ({ page }) => {
    await page.goto("/log");
    await page.getByRole("button", { name: "Start a log" }).click();
    await page.getByLabel("Category").selectOption("trt");
    await page.getByLabel("Started").fill("2026-01-31");
    const rows = page.locator(".sos-checkpoints li");
    await expect(rows).toHaveCount(3);
    // Month arithmetic clamps to the month's last day (Jan 31 + 3 months).
    await expect(rows.nth(0)).toContainText("Apr 30, 2026 to Jul 31, 2026");
    await expect(rows.nth(0)).toContainText("Testosterone level and hematocrit");
    await expect(page.getByRole("link", { name: "What each draw is for" })).toHaveAttribute("href", "/labs#on-therapy");
    // The calendar file is built on the device and keeps its titles neutral.
    const [file] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Save these dates" }).click(),
    ]);
    expect(file.suggestedFilename()).toBe("lab-checks.ics");
    const ics = (await (await import("node:fs/promises")).readFile(await file.path())).toString();
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(3);
    expect(ics).toContain("DTSTART;VALUE=DATE:20260430\r\nDTEND;VALUE=DATE:20260501");
    const unfolded = ics.replace(/\r\n /g, "");
    for (const line of unfolded.split("\r\n").filter((l) => l.startsWith("SUMMARY:"))) {
      expect(line).toMatch(/^SUMMARY:(Lab check|Follow-up visit)/);
      expect(line).not.toMatch(/testosterone|PSA|hematocrit/i);
    }
    for (const line of ics.split("\r\n")) expect(line.length).toBeLessThanOrEqual(75);
    // Other categories get no schedule.
    await page.getByLabel("Category").selectOption("pde5");
    await expect(page.locator(".sos-checkpoints")).toHaveCount(0);
  });

  test("restores a valid backup and rejects a corrupted one", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/log");
    await expect(page.getByRole("button", { name: "Start a log" })).toBeVisible();

    const restore = async (name: string, body: string) =>
      page.locator('input[type="file"]').setInputFiles({
        name,
        mimeType: "application/json",
        buffer: Buffer.from(body),
      });

    // A corrupted-but-shallow-valid file (baseline is an array, a malformed
    // check-in) must be rejected whole, not loaded.
    await restore("bad.json", '{"version":1,"baseline":[],"checkins":[{"firmness":"x"}]}');
    await expect(page.getByText("isn't a Skin Over Steel log backup")).toBeVisible();
    await expect(page.getByRole("button", { name: "Start a log" })).toBeVisible();

    // Not JSON at all.
    await restore("notjson.json", "this is not json");
    await expect(page.getByText("isn't a Skin Over Steel log backup")).toBeVisible();

    const baselineBackup = {
      version: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
      baseline: { date: "2026-01-01", shim: 14, notes: "restored" },
      intervention: null,
      checkins: [],
      outcome: null,
    };
    const intervention = {
      category: "lifestyle",
      name: "Synthetic intervention",
      regimen: "",
      prescriber: "",
      started: "2026-01-01",
    };
    const invalidBackups = [
      { ...baselineBackup, intervention: { ...intervention, category: "constructor" } },
      {
        ...baselineBackup,
        intervention,
        outcome: { date: "2026-01-02", result: "toString", shim: null, summary: "" },
      },
      { ...baselineBackup, baseline: { ...baselineBackup.baseline, shim: 26 } },
      {
        ...baselineBackup,
        intervention,
        checkins: [{
          id: "synthetic",
          date: "2026-01-02",
          firmness: 3,
          confidence: 0,
          sideEffects: "",
          notes: "",
        }],
      },
    ];
    for (const [index, backup] of invalidBackups.entries()) {
      await restore(`invalid-${index}.json`, JSON.stringify(backup));
      await expect(page.getByText("isn't a Skin Over Steel log backup")).toBeVisible();
      await expect(page.getByRole("button", { name: "Start a log" })).toBeVisible();
    }

    await restore("good.json", JSON.stringify(baselineBackup));
    await expect(page.getByRole("button", { name: "Start a log" })).toHaveCount(0);
    await expect(page.getByLabel("SHIM score (5–25)")).toHaveValue("14");

    expect(errors, errors.join("\n")).toEqual([]);
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
