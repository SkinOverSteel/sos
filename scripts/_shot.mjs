import { chromium } from "@playwright/test";
const [,, url, out, w] = process.argv;
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }).catch(async () => chromium.launch());
const p = await b.newPage({ viewport: { width: Number(w||1280), height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await p.screenshot({ path: out, fullPage: true });
await b.close();
