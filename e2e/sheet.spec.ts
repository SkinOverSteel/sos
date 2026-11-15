import { test, expect } from "@playwright/test";

/** The appointment sheet: a form, a printout, and nothing stored or sent. */
test("fills the sheet, builds the printout, and keeps nothing", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.hostname !== "localhost" && !/fonts\.(googleapis|gstatic)\.com/.test(u.hostname)) external.push(r.url());
  });
  await page.goto("/tools/appointment-sheet");
  const print = page.getByRole("button", { name: "Print / save as PDF" });
  await expect(print).toBeDisabled();

  await page.getByLabel("In your words").fill("Fine alone, fails with a partner.");
  await page.getByLabel("How it started").selectOption("Gradual");
  await page.getByLabel(/SHIM/).fill("14");
  await page.getByLabel("Medications, supplements, anything else").fill("tadalafil, as prescribed");
  await page.getByLabel("Lipid panel").check();
  await page.getByLabel(/working diagnosis/).check();
  await page.getByLabel("Your own, one per line").fill("Is this related to my blood pressure?");
  await expect(print).toBeEnabled();

  const out = page.locator(".sos-clinician-print");
  await expect(out).toContainText("Appointment sheet");
  await expect(out).toContainText("Fine alone, fails with a partner.");
  await expect(out).toContainText("Gradual onset");
  await expect(out).toContainText("14 of 25");
  await expect(out).toContainText("Lipid panel");
  await expect(out).toContainText("Is this related to my blood pressure?");
  // No grades on this sheet, so no grade key.
  await expect(out.locator(".sos-letterhead__legend")).toHaveCount(0);

  // Nothing persisted, nothing sent.
  const stored = await page.evaluate(() => window.localStorage.length + window.sessionStorage.length);
  expect(stored).toBe(0);
  await page.reload();
  await expect(page.getByLabel("In your words")).toHaveValue("");
  expect(external).toEqual([]);
});

/**
 * Print leaves only the clinician summary in the flow. Hiding the tool UI
 * with visibility alone kept its height and printed blank trailing pages.
 */
test("print media drops the tool UI and keeps the summary", async ({ page }) => {
  await page.goto("/tools/appointment-sheet");
  await page.getByLabel("In your words").fill("x");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".sos-clinician-print")).toBeVisible();
  await expect(page.getByLabel("In your words")).toBeHidden();
  const { doc, summary } = await page.evaluate(() => ({
    doc: document.querySelector("main")!.getBoundingClientRect().height,
    summary: document.querySelector(".sos-clinician-print")!.getBoundingClientRect().height,
  }));
  // Nothing else contributes height.
  expect(doc - summary).toBeLessThan(40);
});
