import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Accessibility floor (CLAUDE.md "Accessibility floor"): axe-core's WCAG 2.x
 * A/AA rules plus best practices, on the front door, every hub, the safety
 * page, the standard, the map, and one article of each shape. A new surface
 * that ships a low-contrast token, a color-only link or a missing landmark
 * fails here before it ships.
 */
const axeSource = readFileSync(join(process.cwd(), "node_modules/axe-core/axe.min.js"), "utf8");

const PAGES = [
  "/",
  "/learn",
  "/tools",
  "/near-me",
  "/directory",
  "/log",
  "/support",
  "/methodology",
  "/map",
  "/learn/erectile-function-signal",
  "/learn/read-your-labs",
  "/learn/what-it-costs",
  "/tools/erectile-function-score",
];

type AxeResult = { violations: { id: string; impact: string; help: string; nodes: { target: string[]; failureSummary?: string }[] }[] };

for (const path of PAGES) {
  test(`${path} has no axe violations`, async ({ page }) => {
    await page.goto(path);
    await page.addScriptTag({ content: axeSource });
    const result = (await page.evaluate(async () => {
      // @ts-expect-error axe is injected above
      return await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] });
    })) as AxeResult;
    const report = result.violations
      .map((v) => `[${v.impact}] ${v.id}: ${v.help}\n` + v.nodes.slice(0, 5).map((n) => `    ${n.target[0]} :: ${(n.failureSummary || "").split("\n")[1] || ""}`).join("\n"))
      .join("\n");
    expect(result.violations, report).toEqual([]);
  });
}
