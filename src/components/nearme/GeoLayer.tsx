"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * The static geography that sits UNDER the hex grid: US land as the E1 "steel"
 * ground over the E0 water the SVG already paints, state borders, and — at
 * state/metro scale — the county grid. It gives the hexes a coastline and a
 * state line to sit against, the way a vector basemap would, but it is just
 * simplified outlines served same-origin from /public/geo (built by
 * scripts/build-geo.mjs), so the site's CSP stays closed: no tile server, no
 * third-party script, no runtime decoder.
 *
 * Everything is drawn with the HexMap's own lon/lat -> viewBox projection, so
 * it registers exactly with the hexes at every zoom and pan.
 */

type Project = (lon: number, lat: number) => [number, number];
type Ring = [number, number][];
type Nation = { polys: Ring[][] };
type States = { lines: Ring[]; labels: { a: string; lon: number; lat: number }[] };
type Counties = { lines: Ring[]; major: Ring[] };

const geoUrl = (name: string) => `/geo/${name}`;

/** Cache across mounts/regions so panning between pages never refetches. */
const cache = new Map<string, Promise<unknown>>();
function load<T>(name: string): Promise<T> {
  let p = cache.get(name) as Promise<T> | undefined;
  if (!p) {
    p = fetch(geoUrl(name)).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
    cache.set(name, p);
  }
  return p;
}

/** One SVG path string for a set of polylines. */
function linePath(lines: Ring[], project: Project): string {
  let d = "";
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      const [x, y] = project(line[i][0], line[i][1]);
      d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }
  return d;
}

/** One SVG path string for filled polygons (rings incl. holes, even-odd). */
function fillPath(polys: Ring[][], project: Project): string {
  let d = "";
  for (const poly of polys) {
    for (const ring of poly) {
      for (let i = 0; i < ring.length; i++) {
        const [x, y] = project(ring[i][0], ring[i][1]);
        d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      d += "Z";
    }
  }
  return d;
}

type Props = {
  project: Project;
  /** Data region, e.g. "us", "states/tx", "metros/dfw". Counties load off "us". */
  region: string;
  zoom: number;
  /** viewBox units per label glyph, matched to the HexMap's metro labels. */
  labelPx: number;
};

export function GeoLayer({ project, region, zoom, labelPx }: Props) {
  const [nation, setNation] = useState<Nation | null>(null);
  const [states, setStates] = useState<States | null>(null);
  const [counties, setCounties] = useState<Counties | null>(null);
  const detail = region !== "us";

  useEffect(() => {
    let live = true;
    load<Nation>("us-nation.json").then((d) => live && setNation(d)).catch(() => {});
    load<States>("us-states.json").then((d) => live && setStates(d)).catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!detail) return;
    let live = true;
    load<Counties>("us-counties.json").then((d) => live && setCounties(d)).catch(() => {});
    return () => {
      live = false;
    };
  }, [detail]);

  const land = useMemo(() => (nation ? fillPath(nation.polys, project) : ""), [nation, project]);
  const stateLines = useMemo(() => (states ? linePath(states.lines, project) : ""), [states, project]);
  const countyLines = useMemo(() => (counties ? linePath(counties.lines, project) : ""), [counties, project]);
  const countyMajor = useMemo(() => (counties ? linePath(counties.major, project) : ""), [counties, project]);

  // Strokes are in viewBox units; divide by zoom to hold a steady on-screen weight.
  const w = (px: number) => px / zoom;

  return (
    <g aria-hidden="true" style={{ pointerEvents: "none" }}>
      {land && <path d={land} fill="var(--sos-e1)" fillRule="evenodd" stroke="none" />}
      {detail && countyLines && (
        <path d={countyLines} fill="none" stroke="var(--sos-line-soft)" strokeWidth={w(0.4)} strokeOpacity={0.7} />
      )}
      {detail
        ? countyMajor && <path d={countyMajor} fill="none" stroke="var(--sos-line)" strokeWidth={w(0.8)} />
        : stateLines && <path d={stateLines} fill="none" stroke="var(--sos-line)" strokeWidth={w(0.7)} strokeOpacity={0.9} />}
      {!detail &&
        states?.labels.map((s) => {
          const [x, y] = project(s.lon, s.lat);
          return (
            <text
              key={s.a}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--sos-mono)"
              fontSize={labelPx * 0.82}
              letterSpacing="0.1em"
              fill="var(--sos-text-lo)"
              style={{ textTransform: "uppercase" }}
            >
              {s.a}
            </text>
          );
        })}
    </g>
  );
}
