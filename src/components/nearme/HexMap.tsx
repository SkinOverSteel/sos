"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { miiBand, miiOpacity } from "@/lib/nearme";
import { dataUrl } from "@/lib/nearme-data";
import { GeoLayer } from "./GeoLayer";

/**
 * Hex map rendered as SVG from the exported GeoJSON (no tile server, no
 * third-party script, so the site's CSP stays closed). Works for any region
 * the ETL exported: "us" (r4/r5), "states/tx" (r6/r7), "metros/dfw"
 * (r7/r8/r9). The resolution follows zoom. Colour is copper opacity by MII,
 * quantised to the legend bands, over the land drawn by GeoLayer — the map
 * reads as instrumentation on the steel ground, not a heatmap.
 *
 * Interaction: wheel / pinch / buttons / double-click to zoom (toward the
 * cursor), drag to pan, hover or focus a hex for its reading. Keyboard: +/-
 * zoom, arrows pan. Zoom and pan ease with requestAnimationFrame and the
 * resolution tiers cross-fade; both collapse to an instant jump under
 * prefers-reduced-motion.
 */

export type Bbox = { south: number; west: number; north: number; east: number };

type Feature = {
  properties: { h3: string; mii: number; mii_us: number; trt: number; glp1: number; pharmacy: number; gym: number; n: number; coverage: string };
  geometry: { coordinates: [number, number][][] };
};

type CompactLayer = { cols: string[]; rows: (string | number)[][] };
type HexPath = { f: Feature; d: string };

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
  /** Render the band ramp as an overlay card inside the map. */
  showLegend?: boolean;
  /** Use the nationally normalised score instead of the region's own. */
  national?: boolean;
};

const W = 900;
const EASE = 0.3; // per-frame approach fraction for zoom/pan
const DEG_PER_25MI = 25 / 69; // ~0.362° of latitude

type View = { z: number; cx: number; cy: number };

export function HexMap({
  region, resolutions, bbox, labels = [], focus,
  height = 520, initialZoom = 1, showReadout = true, showLegend = false, national = false,
}: Props) {
  // Height keeps hexes regular: a degree of longitude shrinks with latitude.
  const midLat = (bbox.north + bbox.south) / 2;
  const H = Math.round((W * (bbox.north - bbox.south)) / ((bbox.east - bbox.west) * Math.cos((midLat * Math.PI) / 180)));
  // Stable across renders so the geography layer's path memoisation holds.
  const project = useCallback(
    (lon: number, lat: number): [number, number] => [
      ((lon - bbox.west) / (bbox.east - bbox.west)) * W,
      ((bbox.north - lat) / (bbox.north - bbox.south)) * H,
    ],
    [bbox.west, bbox.east, bbox.north, bbox.south, H],
  );

  const home = useCallback(
    (): View => ({ z: initialZoom, ...(focus ? pt(project(focus.lon, focus.lat)) : { cx: W / 2, cy: H / 2 }) }),
    // focus is read once for the initial frame; later focus changes are an effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [project, initialZoom],
  );

  // Displayed view is state (read during render); the tween target and the
  // rAF handle live in refs (touched only in handlers, effects, and the loop).
  const [view, setView] = useState<View>(home);
  const viewRef = useRef<View>(view);
  const target = useRef<View>(view);
  const raf = useRef<number | null>(null);
  const reduced = useRef(false);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const [layers, setLayers] = useState<Record<number, Feature[]>>({});
  const [hover, setHover] = useState<Feature | null>(null);
  // Cursor-following tooltip: position in container coords, plus edge flips.
  const [tip, setTip] = useState<{ x: number; y: number; flipX: boolean; flipY: boolean } | null>(null);
  const hoverRef = useRef<Feature | null>(null);
  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);
  const [error, setError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const maxZoom = 2 ** (resolutions.length + 1);
  const clampZoom = useCallback((z: number) => Math.min(maxZoom, Math.max(0.8, z)), [maxZoom]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = () => (reduced.current = mq.matches);
    mq.addEventListener("change", on);
    return () => {
      mq.removeEventListener("change", on);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const tickRef = useRef<() => void>(undefined);
  const tick = useCallback(() => {
    const v = viewRef.current, t = target.current;
    const dz = t.z - v.z, dcx = t.cx - v.cx, dcy = t.cy - v.cy;
    if (Math.abs(dz) < t.z * 0.002 && Math.abs(dcx) < 0.2 && Math.abs(dcy) < 0.2) {
      viewRef.current = { ...t };
      raf.current = null;
    } else {
      viewRef.current = { z: v.z + dz * EASE, cx: v.cx + dcx * EASE, cy: v.cy + dcy * EASE };
      raf.current = requestAnimationFrame(() => tickRef.current?.());
    }
    setView(viewRef.current);
  }, []);
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const animateTo = useCallback(
    (z: number, cx: number, cy: number) => {
      target.current = { z: clampZoom(z), cx, cy };
      if (reduced.current) {
        viewRef.current = { ...target.current };
        if (raf.current != null) { cancelAnimationFrame(raf.current); raf.current = null; }
        setView(viewRef.current);
      } else if (raf.current == null) {
        raf.current = requestAnimationFrame(tick);
      }
    },
    [clampZoom, tick],
  );

  const jump = useCallback(
    (z: number, cx: number, cy: number) => {
      const next = { z: clampZoom(z), cx, cy };
      target.current = next;
      viewRef.current = next;
      if (raf.current != null) { cancelAnimationFrame(raf.current); raf.current = null; }
      setView(next);
    },
    [clampZoom],
  );

  // Recentre on a new focus (same region — a changed region remounts the map).
  const focusKey = focus ? `${focus.lat},${focus.lon}` : "";
  useEffect(() => {
    if (!focus) return;
    const [cx, cy] = project(focus.lon, focus.lat);
    animateTo(Math.max(viewRef.current.z, 3), cx, cy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey]);

  // The visible viewBox for a view, clamped so the map can't be dragged away.
  const boxOf = useCallback((v: View) => {
    const vw = W / v.z, vh = H / v.z;
    const vx = Math.min(Math.max(v.cx - vw / 2, -W * 0.2), W * 1.2 - vw);
    const vy = Math.min(Math.max(v.cy - vh / 2, -H * 0.2), H * 1.2 - vh);
    return { vx, vy, vw, vh };
  }, [H]);

  const z = view.z;
  const { vx, vy, vw, vh } = boxOf(view);

  // Resolution follows zoom; each doubling moves one step up.
  const step = Math.min(resolutions.length - 1, Math.max(0, Math.floor(Math.log2(z) + 0.4)));
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

  const val = useCallback((f: Feature) => (national ? f.properties.mii_us : f.properties.mii), [national]);

  // Only cells with a reading are drawn; near-empty cells let the land show.
  const paths = useMemo<HexPath[]>(
    () =>
      features
        .filter((f) => miiOpacity(val(f)) > 0)
        .map((f) => ({
          f,
          d:
            f.geometry.coordinates[0]
              .map(([lon, lat], i) => {
                const [x, y] = project(lon, lat);
                return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
              })
              .join(" ") + "Z",
        })),
    [features, project, val],
  );

  // Cross-fade the outgoing resolution out as the new one fades in.
  const [exit, setExit] = useState<{ paths: HexPath[]; id: number; op: number } | null>(null);
  const [enterOp, setEnterOp] = useState(1);
  const prevFeat = useRef(features);
  const prevPaths = useRef(paths);
  const fadeId = useRef(0);
  useEffect(() => {
    if (prevFeat.current !== features) {
      if (prevFeat.current.length && !reduced.current) {
        const id = ++fadeId.current;
        setExit({ paths: prevPaths.current, id, op: 1 });
        setEnterOp(0);
        const r1 = requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            setEnterOp(1);
            setExit((e) => (e && e.id === id ? { ...e, op: 0 } : e));
          }),
        );
        const t = setTimeout(() => setExit((e) => (e && e.id === id ? null : e)), 280);
        prevFeat.current = features;
        prevPaths.current = paths;
        return () => { cancelAnimationFrame(r1); clearTimeout(t); };
      }
      prevFeat.current = features;
    }
    prevPaths.current = paths;
  }, [features, paths]);

  const labelPx = (11 * Math.max(1, H / height)) / Math.sqrt(z);
  const zoomBy = (k: number) => animateTo(viewRef.current.z * k, viewRef.current.cx, viewRef.current.cy);
  const zoomAt = (k: number, fx: number, fy: number) => {
    const b = boxOf(viewRef.current);
    const worldX = b.vx + fx * b.vw, worldY = b.vy + fy * b.vh;
    const nz = clampZoom(viewRef.current.z * k);
    const nvw = W / nz, nvh = H / nz;
    animateTo(nz, worldX + nvw * (0.5 - fx), worldY + nvh * (0.5 - fy));
  };
  const pan = (dx: number, dy: number) => animateTo(viewRef.current.z, viewRef.current.cx + dx / z, viewRef.current.cy + dy / z);
  const frac = (e: { clientX: number; clientY: number }) => {
    const r = svgRef.current!.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] as const;
  };

  const focusXY = focus ? project(focus.lon, focus.lat) : null;
  const ring25 = focus ? Math.abs(project(focus.lon, focus.lat + DEG_PER_25MI)[1] - project(focus.lon, focus.lat)[1]) : 0;

  const hex = (p: HexPath, interactive: boolean) => {
    const m = val(p.f);
    const on = hover === p.f;
    return (
      <path
        key={p.f.properties.h3}
        d={p.d}
        fill="var(--sos-copper)"
        fillOpacity={on ? Math.min(0.92, miiOpacity(m) + 0.22) : miiOpacity(m)}
        stroke={on ? "var(--sos-text-hi)" : "none"}
        strokeWidth={on ? 1.4 / z : 0}
        style={on ? { filter: "drop-shadow(0 0 3px var(--sos-copper-hot))" } : undefined}
        onPointerEnter={interactive ? () => setHover(p.f) : undefined}
        onPointerLeave={interactive ? () => setHover((h) => (h === p.f ? null : h)) : undefined}
      >
        <title>{`MII ${m} · ${p.f.properties.n} listings`}</title>
      </path>
    );
  };

  return (
    <div style={{ position: "relative", background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: "10px", overflow: "hidden" }}>
      <style>{`
        .sos-focus-halo { animation: sosFocusPulse 2.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes sosFocusPulse { 0% { opacity: .5; transform: scale(.6); } 70% { opacity: 0; } 100% { opacity: 0; transform: scale(2.4); } }
        @media (prefers-reduced-motion: reduce) { .sos-focus-halo { animation: none; opacity: .4; transform: none; } }
      `}</style>
      <svg
        ref={svgRef}
        role="img"
        aria-label="Hex map colored by Metabolic Infrastructure Index"
        tabIndex={0}
        viewBox={`${vx} ${vy} ${vw} ${vh}`}
        style={{ display: "block", width: "100%", height, cursor: dragging ? "grabbing" : "grab", outline: "none", touchAction: "none" }}
        onWheel={(e) => {
          e.preventDefault();
          const [fx, fy] = frac(e);
          zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, fx, fy);
        }}
        onDoubleClick={(e) => {
          const [fx, fy] = frac(e);
          zoomAt(1.8, fx, fy);
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, cx: viewRef.current.cx, cy: viewRef.current.cy };
          setDragging(true);
          setTip(null);
          (e.target as Element).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!svgRef.current) return;
          if (drag.current) {
            const scale = W / viewRef.current.z / svgRef.current.clientWidth;
            jump(viewRef.current.z, drag.current.cx - (e.clientX - drag.current.x) * scale, drag.current.cy - (e.clientY - drag.current.y) * scale);
            return;
          }
          if (hoverRef.current) {
            const r = svgRef.current.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            setTip({ x, y, flipX: x > r.width - 190, flipY: y > r.height - 96 });
          }
        }}
        onPointerUp={() => {
          drag.current = null;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current = null;
          setDragging(false);
          setHover(null);
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
        <GeoLayer project={project} region={region} zoom={z} labelPx={labelPx} />
        {exit && (
          <g style={{ opacity: exit.op, transition: "opacity 260ms ease", pointerEvents: "none" }}>
            {exit.paths.map((p) => hex(p, false))}
          </g>
        )}
        <g style={{ opacity: enterOp, transition: "opacity 260ms ease" }}>
          {paths.map((p) => hex(p, true))}
        </g>
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
        {focusXY && (
          <g transform={`translate(${focusXY[0]} ${focusXY[1]})`} style={{ pointerEvents: "none" }}>
            {ring25 > 0 && (
              <circle r={ring25} fill="none" stroke="var(--sos-text-md)" strokeOpacity={0.5} strokeWidth={0.8 / z} strokeDasharray={`${3 / z} ${3 / z}`} />
            )}
            <circle className="sos-focus-halo" r={9 / z} fill="none" stroke="var(--sos-copper-hot)" strokeWidth={2 / z} />
            <circle r={9 / z} fill="none" stroke="var(--sos-text-hi)" strokeWidth={1.4 / z} />
            <circle r={2.5 / z} fill="var(--sos-text-hi)" />
          </g>
        )}
      </svg>

      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 4 }}>
        <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.3)} style={btn}>+</button>
        <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.3)} style={btn}>−</button>
        <button type="button" aria-label="Reset view" onClick={() => animateTo(home().z, home().cx, home().cy)} style={{ ...btn, fontSize: 13 }}>⟲</button>
      </div>

      {showLegend && (
        <div
          style={{ position: "absolute", top: 10, left: 10, fontFamily: "var(--sos-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--sos-text-md)", background: "rgba(18,22,26,0.82)", border: "1px solid var(--sos-line)", borderRadius: 8, padding: "9px 11px", display: "grid", gap: 4 }}
        >
          <div style={{ color: "var(--sos-text-lo)", textTransform: "uppercase", marginBottom: 2 }}>Index</div>
          {[80, 60, 35, 10].map((v) => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{ width: 14, height: 14, borderRadius: 3, background: "var(--sos-copper)", opacity: miiOpacity(v), border: "1px solid var(--sos-line)" }} />
              {miiBand(v)}
            </div>
          ))}
        </div>
      )}

      {hover && tip && !dragging && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: tip.x + (tip.flipX ? -14 : 14),
            top: tip.y + (tip.flipY ? -14 : 14),
            transform: `translate(${tip.flipX ? "-100%" : "0"}, ${tip.flipY ? "-100%" : "0"})`,
            pointerEvents: "none",
            fontFamily: "var(--sos-mono)",
            fontSize: 11.5,
            lineHeight: 1.5,
            letterSpacing: "0.03em",
            color: "var(--sos-text-md)",
            background: "rgba(18,22,26,0.94)",
            border: "1px solid var(--sos-line)",
            borderRadius: 8,
            padding: "7px 9px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
            zIndex: 2,
          }}
        >
          <div>
            <b style={{ color: "var(--sos-text-hi)", fontSize: 13 }}>MII {val(hover)}</b>
            <span style={{ color: "var(--sos-copper-hot)" }}> · {miiBand(val(hover))}</span>
          </div>
          <div style={{ color: "var(--sos-text-lo)" }}>
            TRT {hover.properties.trt} · GLP-1 {hover.properties.glp1} · Rx {hover.properties.pharmacy} · gym {hover.properties.gym}
          </div>
          <div style={{ color: "var(--sos-text-lo)" }}>
            {hover.properties.n} listings{hover.properties.coverage === "registry" ? " · registry only" : ""}
          </div>
        </div>
      )}

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
              res {res} · {paths.length} hexes · drag to pan, wheel to zoom
            </>
          )}
        </div>
      )}
    </div>
  );
}

const pt = ([cx, cy]: [number, number]) => ({ cx, cy });

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
