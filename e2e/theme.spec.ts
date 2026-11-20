import { test, expect } from "@playwright/test";

/**
 * color-scheme parity. The app's canonical theme is warm (a light cream
 * ground), so the document must declare `color-scheme: light` — otherwise a
 * visitor whose OS is in dark mode gets dark-rendered native controls
 * (scrollbars, <select> menus, number spinners, autofill) on a cream page.
 * Guards the tokens.css declaration against being dropped in a refactor.
 */
test("the canonical warm theme declares a light color-scheme", async ({ page }) => {
  await page.goto("/");
  const { theme, colorScheme } = await page.evaluate(() => {
    const h = document.documentElement;
    return { theme: h.getAttribute("data-theme"), colorScheme: getComputedStyle(h).colorScheme };
  });
  expect(theme).toBe("warm");
  expect(colorScheme).toBe("light");
});
