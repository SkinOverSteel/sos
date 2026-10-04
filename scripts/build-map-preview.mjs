// Renders the homepage's national map as one static SVG, so the front door
// ships no hex shard, no h3 library and no map JavaScript: an <img>, cached.
//
//   npm run map:preview        # after the ETL re-exports public/data/nearme
//
// Reads the r4 US hex layer (NEXT_PUBLIC_NEARME_DATA_BASE when it is a URL,
// else the local public/data/nearme copy), the geography in public/geo, the
// metro list in src/data/nearme, and the dark palette from brand/tokens.css,
// then writes public/map/us-preview.svg. Commit the result; it changes only
// when the data does. Projection and bands match components/nearme/HexMap.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { cellToBoundary } from "h3-js";

const W = 900;
// HexMap's US_VIEW with a little western margin so the coast labels don't clip.
const BBOX = { south: 24.0, west: -128.5, north: 49.8, east: -66.5 };
const midLat = (BBOX.north + BBOX.south) / 2;
const H = Math.round((W * (BBOX.north - BBOX.south)) / ((BBOX.east - BBOX.west) * Math.cos((midLat * Math.PI) / 180)));
const project = (lon, lat) => [
  ((lon - BBOX.west) / (BBOX.east - BBOX.west)) * W,
  ((BBOX.north - lat) / (BBOX.north - BBOX.south)) * H,
];

// --- palette: the dark block of the single source of truth
const tokens = readFileSync("brand/tokens.css", "utf8");
const dark = tokens.split('[data-theme="dark"]')[1].split('[data-theme="light"]')[0];
const token = (name) => {
  const m = dark.match(new RegExp(`--sos-${name}:\\s*(#[0-9A-Fa-f]{6}|rgba?\\([^)]*\\))`));
  if (!m) throw new Error(`token --sos-${name} not found in brand/tokens.css`);
  return m[1];
};
const C = { e0: token("e0"), e1: token("e1"), line: token("line"), copper: token("copper"), md: token("text-md"), lo: token("text-lo") };

// --- bands, as lib/nearme.ts miiOpacity
const opacity = (mii) => (mii >= 75 ? 0.7 : mii >= 50 ? 0.49 : mii >= 25 ? 0.285 : mii >= 5 ? 0.12 : 0);

// --- data
const base = (process.env.NEXT_PUBLIC_NEARME_DATA_BASE ?? "/data/nearme").replace(/\/$/, "");
async function layer(path) {
  if (base.startsWith("http")) {
    const r = await fetch(`${base}/${path}`);
    if (!r.ok) throw new Error(`${base}/${path}: ${r.status}`);
    return r.json();
  }
  return JSON.parse(readFileSync(`public${base}/${path}`, "utf8"));
}
const hex = await layer("us/hex-r4.json");
const nation = JSON.parse(readFileSync("public/geo/us-nation.json", "utf8"));
const states = JSON.parse(readFileSync("public/geo/us-states.json", "utf8"));
const metros = JSON.parse(readFileSync("src/data/nearme/metros.json", "utf8"));

// Integer, relative coordinates with repeated points collapsed: the same
// picture at a third of the bytes.
const trace = (pts, close) => {
  let d = "", px = 0, py = 0, n = 0;
  for (const [fx, fy] of pts) {
    const x = Math.round(fx), y = Math.round(fy);
    if (n && x === px && y === py) continue;
    d += n ? `l${x - px} ${y - py}` : `M${x} ${y}`;
    px = x; py = y; n++;
  }
  if (n < 2) return "";
  return d + (close ? "Z" : "");
};
const ring = (pts) => trace(pts, true);
const land = nation.polys.map((poly) => poly.map((r) => ring(r.map(([lon, lat]) => project(lon, lat)))).join("")).join("");
const stateLines = states.lines.map((line) => trace(line.map(([lon, lat]) => project(lon, lat)), false)).join("");

// one path per band keeps the file small and the paint order simple
const iH3 = hex.cols.indexOf("h3"), iMii = hex.cols.indexOf("mii_us");
const bands = new Map();
for (const row of hex.rows) {
  const op = opacity(row[iMii]);
  if (!op) continue;
  const b = cellToBoundary(row[iH3], true).map(([lon, lat]) => project(lon, lat));
  if (b.some(([x]) => x < -50 || x > W + 50)) continue; // Alaska / Hawaii / antimeridian wrap
  bands.set(op, (bands.get(op) ?? "") + ring(b));
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const label = (name, lon, lat, size, fill) => {
  const [x, y] = project(lon, lat);
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${size}" fill="${fill}">${esc(name)}</text>`;
};
const stateLabels = states.labels.map((s) => label(s.a, s.lon, s.lat, 9, C.lo)).join("");
const metroLabels = metros
  .map((m) => ({ name: m.name.split("–")[0].split(",")[0].replace(/ Bay Area$| Bay$/, "").toUpperCase(), lat: (m.bbox.south + m.bbox.north) / 2, lon: (m.bbox.west + m.bbox.east) / 2 }))
  .map((m) => label(m.name, m.lon, m.lat, 11, C.md))
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<title>United States, hex by hex: density of testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies and strength gyms</title>
<style>text{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;letter-spacing:.08em;text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke:${C.e0};stroke-width:2.5px;stroke-linejoin:round}</style>
<rect width="${W}" height="${H}" fill="${C.e0}"/>
<path d="${land}" fill="${C.e1}" fill-rule="evenodd"/>
<path d="${stateLines}" fill="none" stroke="${C.line}" stroke-width="0.7" stroke-opacity="0.9"/>
${[...bands.entries()].sort((a, b) => a[0] - b[0]).map(([op, d]) => `<path d="${d}" fill="${C.copper}" fill-opacity="${op}"/>`).join("\n")}
<g>${stateLabels}</g>
<g>${metroLabels}</g>
</svg>
`;
mkdirSync("public/map", { recursive: true });
writeFileSync("public/map/us-preview.svg", svg);
console.log(`public/map/us-preview.svg: ${(svg.length / 1024).toFixed(0)} KB, ${[...bands.values()].reduce((n, d) => n + d.split("Z").length - 1, 0)} hexes, ${W}x${H}`);
