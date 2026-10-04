import { chromium } from "@playwright/test";
const [,, url, out] = process.argv;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }).catch(() => chromium.launch());
const p = await b.newPage({ viewport: { width: 1280, height: 820 } });
await p.goto(url, { waitUntil: "networkidle" });
await p.screenshot({ path: out });
await b.close();
