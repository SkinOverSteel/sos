"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { miiBand } from "@/lib/nearme";
import { dataUrl } from "@/lib/nearme-data";

/**
 * Hex map rendered as SVG from the exported GeoJSON (no tile server, no
 * third-party script, so the site's CSP stays closed). Works for any region
 * the ETL exported: "us" (r4/r5), "states/tx" (r6/r7), "metros/dfw"
 * (r7/r8/r9). The resolution follows zoom. Color is copper opacity by MII,
 * so the map reads as instrumentation over the steel ground, not a heatmap.
 *
 * Interaction: wheel / pinch / buttons to zoom, drag to pan, hover or focus
 * a hex for its reading. Keyboard: +/- zoom, arrows pan.
 */

export type Bbox = { south: number; west: number; north: number; east: number };

type Feature = {
  properties: { h3: string; mii: number; mii_us: number; trt: number; glp1: number; pharmacy: number; gym: number; n: number; coverage: string };
  geometry: { coordinates: [number, number][][] };
};

type CompactLayer = { cols: string[]; rows: (string | number)[][] };

/** Compact rows -> features, deriving each outline from its H3 index. */
async function decode(layer: CompactLayer): Promise<Feature[]> {
  const { cellToBoundary } = await import("h3-js");
  return layer.rows.map((r) => {
    const ring = cellToBoundary(r[0] as string, true) as [number, number][]; // [lng, lat]
    return {
      properties: {
        h3: r[0] as string, mii: r[1] as number, mii_us: r[2] as number, trt: r[3] as number, glp1: r[4] as number,
        pharmacy: r[5] as number, gym: r[6] as number, n: r[7] as number, coverage: r[8] ? "full" : "registry",
      },
      geometry: { coordinates: [ring] },
    };
  });
}

type Props = {
  /** Path in the data store, e.g. "us", "states/tx", "metros/dfw". */
  region: string;
  /** Resolutions the region exported, low to high. */
  resolutions: number[];
  bbox: Bbox;
  /** Labels to draw (cities, metros). */
  labels?: { name: string; lat: number; lon: number }[];
  /** lat/lon to center on and mark (the member's zip centroid). */
  focus?: { lat: number; lon: number; label?: string } | null;
  height?: number;
  initialZoom?: number;
  showReadout?: boolean;
  /** Use the nationally normalised score instead of the region's own. */
  national?: boolean;
};

const W = 900;

export function HexMap({ region, resolutions, bbox, labels = [], focus, height = 520, initialZoom = 1, showReadout = true, national = false }: Props) {
  // Height keeps hexes regular: a degree of longitude shrinks with latitude.
  const midLat = (bbox.north + bbox.south) / 2;
  const H = Math.round((W * (bbox.north - bbox.south)) / ((bbox.east - bbox.west) * Math.cos((midLat * Math.PI) / 180)));
  const project = (lon: number, lat: number): [number, number] => [
    ((lon - bbox.west) / (bbox.east - bbox.west)) * W,
    ((bbox.north - lat) / (bbox.north - bbox.south)) * H,
  ];

  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(() => (focus ? project(focus.lon, focus.lat) : [W / 2, H / 2]));
  const [layers, setLayers] = useState<Record<number, Feature[]>>({});
  const [hover, setHover] = useState<Feature | null>(null);
  const [error, setError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [prevFocus, setPrevFocus] = useState(focus);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  if (focus !== prevFocus) {
    setPrevFocus(focus);
    if (focus) {
      setCenter(project(focus.lon, focus.lat));
      if (zoom < 2.5) setZoom(3);
    }
  }

  // Resolution steps: each zoom doubling moves one resolution up.
  const step = Math.min(resolutions.length - 1, Math.max(0, Math.floor(Math.log2(zoom) + 0.4)));
  const res = resolutions[step];

  useEffect(() => {
    if (layers[res]) return;
    let live = true;
    fetch(dataUrl(`${region}/hex-r${res}.json`))
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((layer: CompactLayer) => decode(layer))
      .then((features) => {
        if (live) setLayers((l) => ({ ...l, [res]: features }));
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
    };
  }, [region, res, layers]);

  const features = useMemo(() => {
    for (const r of [res, ...resolutions]) if (layers[r]) return layers[r];
    return [] as Feature[];
  }, [layers, res, resolutions]);
  const vw = W / zoom;
  const vh = H / zoom;
  const vx = Math.min(Math.max(center[0] - vw / 2, -W * 0.2), W * 1.2 - vw);
  const vy = Math.min(Math.max(center[1] - vh / 2, -H * 0.2), H * 1.2 - vh);

  const paths = useMemo(
    () =>
      features.map((f) => ({
        f,
        d:
          f.geometry.coordinates[0]
            .map(([lon, lat], i) => {
              const [x, y] = project(lon, lat);
              return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
            })
            .join(" ") + "Z",
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [features, bbox.south, bbox.west, bbox.north, bbox.east],
  );

  // Labels are sized in viewBox units; scale them by how much the box is shrunk to fit.
  const labelPx = (11 * Math.max(1, H / height)) / Math.sqrt(zoom);
  const zoomBy = (k: number) => setZoom((z) => Math.min(2 ** (resolutions.length + 1), Math.max(0.8, z * k)));
  const pan = (dx: number, dy: number) => setCenter(([x, y]) => [x + dx / zoom, y + dy / zoom]);
  const val = (f: Feature) => (national ? f.properties.mii_us : f.properties.mii);

  return (
    <div style={{ position: "relative", background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: "10px", overflow: "hidden" }}>
      <svg
        ref={svgRef}
        role="img"
        aria-label="Hex map colored by Metabolic Infrastructure Index"
        tabIndex={0}
        viewBox={`${vx} ${vy} ${vw} ${vh}`}
        style={{ display: "block", width: "100%", height, cursor: dragging ? "grabbing" : "grab", outline: "none", touchAction: "none" }}
        onWheel={(e) => {
          e.preventDefault();
          zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15);
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, cx: center[0], cy: center[1] };
          setDragging(true);
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current || !svgRef.current) return;
          const scale = vw / svgRef.current.clientWidth;
          setCenter([drag.current.cx - (e.clientX - drag.current.x) * scale, drag.current.cy - (e.clientY - drag.current.y) * scale]);
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "+" || e.key === "=") zoomBy(1.25);
          else if (e.key === "-") zoomBy(0.8);
          else if (e.key === "ArrowLeft") pan(-40, 0);
          else if (e.key === "ArrowRight") pan(40, 0);
          else if (e.key === "ArrowUp") pan(0, -40);
          else if (e.key === "ArrowDown") pan(0, 40);
          else return;
          e.preventDefault();
        }}
      >
        <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="var(--sos-e0)" />
        {paths.map(({ f, d }) => {
          const m = val(f);
          return (
            <path
              key={f.properties.h3}
              d={d}
              fill="var(--sos-copper)"
              fillOpacity={0.08 + (m / 100) * 0.82}
              stroke={hover === f ? "var(--sos-text-hi)" : "var(--sos-e0)"}
              strokeWidth={hover === f ? 1.5 / zoom : 0.6 / zoom}
              onPointerEnter={() => setHover(f)}
              onPointerLeave={() => setHover((h) => (h === f ? null : h))}
            >
              <title>{`MII ${m} · ${f.properties.n} listings`}</title>
            </path>
          );
        })}
        {labels.map((c) => {
          const [x, y] = project(c.lon, c.lat);
          return (
            <text
              key={c.name}
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily="var(--sos-mono)"
              fontSize={labelPx}
              letterSpacing="0.08em"
              fill="var(--sos-text-md)"
              style={{ pointerEvents: "none", textTransform: "uppercase", paintOrder: "stroke", stroke: "var(--sos-e0)", strokeWidth: labelPx / 4 }}
            >
              {c.name}
            </text>
          );
        })}
        {focus && (
          <g transform={`translate(${project(focus.lon, focus.lat).join(" ")})`}>
            <circle r={9 / zoom} fill="none" stroke="var(--sos-text-hi)" strokeWidth={1.5 / zoom} />
            <circle r={2.5 / zoom} fill="var(--sos-text-hi)" />
          </g>
        )}
      </svg>

      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 4 }}>
        <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.3)} style={btn}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.3)} style={btn}>−</button>
      </div>

      {showReadout && (
        <div
          aria-live="polite"
          style={{ position: "absolute", left: 10, bottom: 10, fontFamily: "var(--sos-mono)", fontSize: 12, letterSpacing: "0.04em", color: "var(--sos-text-md)", background: "rgba(18,22,26,0.85)", border: "1px solid var(--sos-line)", borderRadius: 8, padding: "8px 10px", maxWidth: "calc(100% - 20px)" }}
        >
          {error ? (
            "Map data unavailable."
          ) : hover ? (
            <>
              <b style={{ color: "var(--sos-text-hi)" }}>MII {val(hover)}</b> · {miiBand(val(hover))} · r{res}
              {hover.properties.coverage === "registry" ? " · registry layers only" : ""}
              <br />
              TRT {hover.properties.trt} · GLP-1 {hover.properties.glp1} · Rx {hover.properties.pharmacy} · gym {hover.properties.gym}
            </>
          ) : (
            <>
              res {res} · {features.length} hexes · drag to pan, wheel to zoom
            </>
          )}
        </div>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  width: 34,
  height: 34,
  fontFamily: "var(--sos-mono)",
  fontSize: 18,
  lineHeight: 1,
  color: "var(--sos-text-hi)",
  background: "var(--sos-e2)",
  border: "1px solid var(--sos-line)",
  borderRadius: 8,
  cursor: "pointer",
};

/** Continental US box for the national overview; Alaska and Hawaii sit off-canvas and can be panned to. */
export const US_VIEW: Bbox = { south: 24.0, west: -125.5, north: 49.8, east: -66.5 };
