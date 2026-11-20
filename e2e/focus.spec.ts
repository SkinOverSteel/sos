import { test, expect } from "@playwright/test";

/**
 * Visible focus states (accessibility floor). Every keyboard-focused element
 * gets an on-brand copper ring: the global :focus-visible baseline covers
 * links in running prose / footer / breadcrumbs that have no component rule,
 * while components with their own treatment keep it. Guards against a reset
 * that strips focus, or the baseline being removed.
 */

test("inline prose links get the copper focus ring", async ({ page }) => {
  await page.goto("/learn/death-grip");
  const copper = (await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--sos-copper").trim(),
  )).toLowerCase();

  await page.locator(".sos-prose a").first().evaluate((el) => ((el as HTMLElement).id = "__focus_target"));
  await page.keyboard.press("Tab"); // establish keyboard modality so :focus-visible matches

  const ring = await page.evaluate(() => {
    const a = document.getElementById("__focus_target")!;
    a.focus();
    const cs = getComputedStyle(a);
    return { fv: a.matches(":focus-visible"), width: parseFloat(cs.outlineWidth), color: cs.outlineColor };
  });

  expect(ring.fv, "prose link should match :focus-visible").toBe(true);
  expect(ring.width, "focus outline should be a visible 2px").toBeGreaterThanOrEqual(2);

  // The outline color should be the brand copper, not the UA default.
  const toHex = (rgb: string) => {
    const m = rgb.match(/\d+/g)!;
    return "#" + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
  };
  expect(toHex(ring.color)).toBe(copper);
});

test("components with their own focus treatment keep it", async ({ page }) => {
  await page.goto("/");
  const hdr = await page.evaluate(() => {
    const a = document.querySelector(".sos-header__link") as HTMLElement | null;
    if (!a) return null;
    a.focus();
    const cs = getComputedStyle(a);
    return { outline: cs.outlineStyle, hasShadow: cs.boxShadow !== "none" };
  });
  expect(hdr, "header link should exist").not.toBeNull();
  expect(hdr!.hasShadow, "header link keeps its box-shadow focus ring").toBe(true);
});
