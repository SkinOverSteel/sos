// Build the static geography layer that sits UNDER the Near Me hex grid.
//
// Input:  us-atlas counties-10m TopoJSON (WGS84 lon/lat), which carries the
//         nation, state, and county objects over one shared arc set.
// Output: three compact, simplified JSON files in public/geo/ that the app
//         serves same-origin (CSP stays closed, no tile server, no runtime
//         decoder). All three share the same simplified arcs, so a county
//         border never drifts from its state border or the coastline.
//
//   us-nation.json    land polygons           -> the E1 "steel" ground fill
//   us-states.json    state border lines      + USPS label anchors
//   us-counties.json  county border lines      (loaded only for finer views)
//
// Coordinates are [lon, lat] rounded to 4 decimals (~11 m). Re-run with:
//   node scripts/build-geo.mjs
// The source is fetched from a CDN at build time only; the emitted files are
// committed to the repo so the map works without any ETL or upload step.

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SRC = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "geo");
// Douglas-Peucker tolerance in degrees, per layer. States/nation are only ever
// seen at national-to-state zoom, so they can be coarse; counties show at metro
// zoom and need more detail. Coords round to 3 decimals (~110 m), well under a
// pixel at every zoom this map reaches.
const TOL = { line: 0.02, county: 0.008 };
const PREC = 1e3;

// USPS abbreviations keyed by the state names us-atlas ships.
const ABBR = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", "District of Columbia": "DC",
  Florida: "FL", Georgia: "GA", Hawaii: "HI", Idaho: "ID", Illinois: "IL",
  Indiana: "IN", Iowa: "IA", Kansas: "KS", Kentucky: "KY", Louisiana: "LA",
  Maine: "ME", Maryland: "MD", Massachusetts: "MA", Michigan: "MI",
  Minnesota: "MN", Mississippi: "MS", Missouri: "MO", Montana: "MT",
  Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
  "New Mexico": "NM", "New York": "NY", "North Carolina": "NC",
  "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR",
  Pennsylvania: "PA", "Rhode Island": "RI", "South Carolina": "SC",
  "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT",
  Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV",
  Wisconsin: "WI", Wyoming: "WY", "Puerto Rico": "PR",
};

const round = (n) => Math.round(n * PREC) / PREC;

// Douglas-Peucker, iterative, keeps first and last point.
function simplify(pts, eps) {
  if (pts.length < 3) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  const eps2 = eps * eps;
  while (stack.length) {
    const [a, b] = stack.pop();
    let idx = -1, maxD = 0;
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i];
      let d2;
      if (len2 === 0) {
        d2 = (px - ax) ** 2 + (py - ay) ** 2;
      } else {
        let t = ((px - ax) * dx + (py - ay) * dy) / len2;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        d2 = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2;
      }
      if (d2 > maxD) { maxD = d2; idx = i; }
    }
    if (maxD > eps2 && idx !== -1) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }
  const out = [];
  for (let i = 0; i < pts.length; i++) if (keep[i]) out.push(pts[i]);
  return out;
}

async function main() {
  process.stdout.write(`Fetching ${SRC} ...\n`);
  const topo = await fetch(SRC).then((r) => {
    if (!r.ok) throw new Error(`source fetch failed: ${r.status}`);
    return r.json();
  });

  const [sx, sy] = topo.transform.scale;
  const [tx, ty] = topo.transform.translate;

  // Decode every arc to absolute lon/lat once (delta decode + transform).
  const raw = topo.arcs.map((arc) => {
    let x = 0, y = 0;
    return arc.map((d) => {
      x += d[0]; y += d[1];
      return [x * sx + tx, y * sy + ty];
    });
  });
  // Two simplifications: coarse for the national-zoom nation/state files,
  // fine for the metro-zoom county file. Each file stays internally
  // consistent because every layer inside it reuses one arc set.
  const build = (eps) =>
    raw.map((pts) => simplify(pts, eps).map(([lon, lat]) => [round(lon), round(lat)]));
  const coarse = build(TOL.line);
  const fine = build(TOL.county);

  // Absolute coords for one arc index (negative -> reversed arc ~i).
  const arcCoords = (arcs, i) => (i < 0 ? arcs[~i].slice().reverse() : arcs[i]);

  // Stitch a ring (list of arc indices) into one coordinate list.
  const ring = (arcs, indices) => {
    const out = [];
    for (const i of indices) {
      const c = arcCoords(arcs, i);
      for (let k = out.length ? 1 : 0; k < c.length; k++) out.push(c[k]);
    }
    return out;
  };

  // Polygons of an object -> array of polygons, each an array of rings.
  const polygons = (arcs, object) => {
    const out = [];
    for (const g of object.geometries) {
      const polys = g.type === "Polygon" ? [g.arcs] : g.type === "MultiPolygon" ? g.arcs : [];
      for (const poly of polys) out.push(poly.map((r) => ring(arcs, r)));
    }
    return out;
  };

  // Set of unique arc ids an object references (by abs index).
  const arcIds = (object) => {
    const ids = new Set();
    const walk = (a) => {
      if (Array.isArray(a[0])) { a.forEach(walk); return; }
      for (const i of a) ids.add(i < 0 ? ~i : i);
    };
    for (const g of object.geometries) if (g.arcs) walk(g.arcs);
    return ids;
  };

  // Deduplicated border network: each referenced arc drawn once.
  const meshLines = (arcs, object) => [...arcIds(object)].map((id) => arcs[id]);

  // Label anchor: point-in-ish centroid of a state's largest ring.
  const anchor = (g) => {
    const polys = g.type === "Polygon" ? [g.arcs] : g.type === "MultiPolygon" ? g.arcs : [];
    let best = null, bestSpan = -1;
    for (const poly of polys) {
      const r = ring(coarse, poly[0]);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      let sx2 = 0, sy2 = 0;
      for (const [lon, lat] of r) {
        sx2 += lon; sy2 += lat;
        if (lon < minX) minX = lon; if (lon > maxX) maxX = lon;
        if (lat < minY) minY = lat; if (lat > maxY) maxY = lat;
      }
      const span = (maxX - minX) * (maxY - minY);
      if (span > bestSpan) { bestSpan = span; best = [round(sx2 / r.length), round(sy2 / r.length)]; }
    }
    return best;
  };

  const nation = { type: "fill", polys: polygons(coarse, topo.objects.nation) };

  const stateLabels = topo.objects.states.geometries
    .map((g) => {
      const a = ABBR[g.properties?.name];
      const pt = a && anchor(g);
      return pt ? { a, lon: pt[0], lat: pt[1] } : null;
    })
    .filter(Boolean);
  const states = { type: "lines", lines: meshLines(coarse, topo.objects.states), labels: stateLabels };

  // County file (fine): split the state/coast borders out from the internal
  // county grid so a metro view can draw both weights from one consistent set.
  const stateArcs = arcIds(topo.objects.states);
  const major = [], minor = [];
  for (const id of arcIds(topo.objects.counties)) (stateArcs.has(id) ? major : minor).push(fine[id]);
  const counties = { type: "lines", lines: minor, major };

  mkdirSync(OUT, { recursive: true });
  const emit = (name, data) => {
    const path = join(OUT, name);
    writeFileSync(path, JSON.stringify(data));
    const kb = (JSON.stringify(data).length / 1024).toFixed(0);
    const n = data.polys
      ? `${data.polys.length} polys`
      : `${data.lines.length} lines${data.major ? ` + ${data.major.length} major` : ""}`;
    process.stdout.write(`  ${name}: ${n}, ${kb} KB\n`);
  };
  emit("us-nation.json", nation);
  emit("us-states.json", states);
  emit("us-counties.json", counties);
  process.stdout.write("Done.\n");
}

main().catch((e) => {
  process.stderr.write(`build-geo failed: ${e.stack || e}\n`);
  process.exit(1);
});
