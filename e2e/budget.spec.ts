import { test, expect } from "@playwright/test";

/**
 * Payload budget for the front door. The homepage is static HTML, one CSS
 * file, the fonts, a static map image and the framework runtime. Nothing
 * page-specific from elsewhere should ride along: the hex map and the Log
 * tool are split into on-demand chunks precisely so that linking to them
 * from the header does not pull them onto every page.
 */
test("the homepage ships no map or Log code and stays under budget", async ({ page }) => {
  let js = 0;
  const offenders: string[] = [];
  page.on("response", async (res) => {
    const u = new URL(res.url());
    if (u.hostname !== "localhost" || !(res.headers()["content-type"] ?? "").includes("javascript")) return;
    const body = await res.body().catch(() => Buffer.alloc(0));
    js += body.length;
    const text = body.toString("utf8");
    if (/cellToBoundary|latLngToCell/.test(text)) offenders.push(`${u.pathname} carries the hex geometry library`);
    // The lazy loaders themselves are a few KB and name the module; the
    // tools they load are tens of KB. Only a real tool chunk is an offender.
    if (body.length > 20 * 1024 && /LogTool|HexMap/.test(text)) offenders.push(`${u.pathname} carries a tool chunk`);
  });
  await page.goto("/");
  await page.mouse.wheel(0, 8000);
  await page.waitForLoadState("networkidle");
  expect(offenders, offenders.join("\n")).toEqual([]);
  // Framework runtime (react-dom + next client) is ~400 KB uncompressed; the
  // budget leaves room for small shared chunks, not for a tool or a map.
  expect(js, `homepage JavaScript ${(js / 1024).toFixed(0)} KB uncompressed`).toBeLessThan(560 * 1024);
});
