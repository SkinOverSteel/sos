// Re-reads the lab product pages behind /learn/testosterone-test-cost and
// reports whether each published price still appears there.
//
//   npm run prices:check
//
// The prices live in src/data/lab-prices.json with the date they were read.
// Each row carries `present` (a pattern proving we got the real product page)
// and `expect` (patterns that hold only while the price is unchanged). Both
// are tried against the raw HTML and against the tag-stripped text.
//
//   OK          page read, price as published
//   CHANGED     page read, price pattern gone: go and look, then update the row
//   UNREADABLE  page not fetched or not recognisable (blocked, moved, redesigned)
//
// Exits 1 if any row is not OK. Not part of CI: it depends on three outside
// sites being up. When a price moves, update the JSON row and its `expect`
// patterns, set `checked` to today, and fix the figures quoted in prose:
//   src/app/learn/testosterone-test-cost/page.tsx (lede, description)
//   src/lib/articles.ts and src/lib/faqs.ts (testosterone-test-cost entries)
//   src/app/learn/what-it-costs/page.tsx (the single-test range)
import { readFile } from "node:fs/promises";

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

const data = JSON.parse(await readFile(new URL("../src/data/lab-prices.json", import.meta.url), "utf8"));

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");

async function check(row) {
  let html;
  try {
    const res = await fetch(row.href, { headers: { "user-agent": UA }, redirect: "follow", signal: AbortSignal.timeout(30_000) });
    if (!res.ok) return { status: "UNREADABLE", why: `HTTP ${res.status}` };
    html = await res.text();
  } catch (err) {
    return { status: "UNREADABLE", why: err instanceof Error ? err.message : String(err) };
  }
  const text = strip(html);
  const hit = (pattern) => {
    const re = new RegExp(pattern, "s");
    return re.test(html) || re.test(text);
  };
  if (!hit(row.present)) return { status: "UNREADABLE", why: "product not found on the page" };
  const missing = row.expect.filter((p) => !hit(p));
  return missing.length ? { status: "CHANGED", why: `no match for ${missing.join(" | ")}` } : { status: "OK", why: "" };
}

console.log(`Published prices, last read ${data.checked}\n`);
let bad = 0;
for (const row of data.rows) {
  const r = await check(row);
  if (r.status !== "OK") bad++;
  console.log(`${r.status.padEnd(11)} ${row.price.padEnd(5)} ${row.lab} · ${row.test}${r.why ? `\n            ${r.why}\n            ${row.href}` : ""}`);
}
console.log(bad ? `\n${bad} of ${data.rows.length} need a look.` : `\nAll ${data.rows.length} as published.`);
process.exit(bad ? 1 : 0);
