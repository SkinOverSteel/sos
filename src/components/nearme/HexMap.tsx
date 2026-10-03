"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ZIPS, miiBand } from "@/lib/nearme";

/**
 * DFW hex map, rendered as SVG from the exported GeoJSON (no tile server, no
 * third-party script, so the site's CSP stays closed). Resolution follows
 * zoom: r7 wide, r8 metro, r9 street. Color is copper opacity by MII, so the
 * map reads as instrumentation over the steel ground rather than a heatmap.
 *
 * Interaction: wheel / pinch / buttons to zoom, drag to pan, hover or focus
 * a hex for its reading. Keyboard: +/- zoom, arrows pan.
 */

type Feature = {
  properties: { h3: string; mii: number; trt: number; glp1: number; pharmacy: number; gym: number; n: number };
  geometry: { coordinates: [number, number][][] };
};

const BBOX = { south: 32.45, north: 33.35, west: -97.6, east: -96.2 };
const W = 900;
// Height keeps hexes regular: at 33°N a degree of longitude is ~0.84 of a
// degree of latitude on the ground.
const H = Math.round((W * (BBOX.north - BBOX.south)) / ((BBOX.east - BBOX.west) * 0.838));

/** City labels from the zip table (mean of each city's zip centroids). */
const CITY_LABELS: { name: string; lat: number; lon: number }[] = (() => {
  const acc: Record<string, { lat: number; lon: number; n: number }> = {};
  for (const [lat, lon, city] of Object.values(ZIPS)) {
    const a = (acc[city] ??= { lat: 0, lon: 0, n: 0 });
    a.lat += lat;
    a.lon += lon;
    a.n += 1;
  }
  return Object.entries(acc)
    .filter(([, a]) => a.n >= 4)
    .map(([name, a]) => ({ name, lat: a.lat / a.n, lon: a.lon / a.n }));
})();

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - BBOX.west) / (BBOX.east - BBOX.west)) * W;
  // simple equirectangular with latitude correction for DFW (~33°N)
  const y = ((BBOX.north - lat) / (BBOX.north - BBOX.south)) * H;
  return [x, y];
}

export function HexMap({
  focus,
  height = 520,
  initialZoom = 1,
  showReadout = true,
}: {
  /** lat/lon to center on and mark (the member's zip centroid). */
  focus?: { lat: number; lon: number; label?: string } | null;
  height?: number;
  initialZoom?: number;
  showReadout?: boolean;
}) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState<[number, number]>(() =>
    focus ? project(focus.lon, focus.lat) : [W / 2, H / 2],
  );
  const [layers, setLayers] = useState<Record<number, Feature[]>>({});
  const [hover, setHover] = useState<Feature | null>(null);
  const [error, setError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [prevFocus, setPrevFocus] = useState(focus);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Re-center when the caller moves the focus (derived state during render,
  // per React's "adjusting state when a prop changes" pattern).
  if (focus !== prevFocus) {
    setPrevFocus(focus);
    if (focus) {
      setCenter(project(focus.lon, focus.lat));
      if (zoom < 2.5) setZoom(3);
    }
  }

  const res = zoom < 1.8 ? 7 : zoom < 4 ? 8 : 9;

  useEffect(() => {
    if (layers[res]) return;
    let live = true;
    fetch(`/data/nearme/hex-r${res}.geojson`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((fc) => {
        if (live) setLayers((l) => ({ ...l, [res]: fc.features }));
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
    };
  }, [res, layers]);

  const features = useMemo(() => layers[res] ?? layers[8] ?? layers[7] ?? [], [layers, res]);
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
    [features],
  );

  const zoomBy = (k: number) => setZoom((z) => Math.min(8, Math.max(0.8, z * k)));
  const pan = (dx: number, dy: number) => setCenter(([x, y]) => [x + dx / zoom, y + dy / zoom]);

  return (
    <div
      style={{
        position: "relative",
        background: "var(--sos-e1)",
        border: "1px solid var(--sos-line)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        role="img"
        aria-label="Hex map of Dallas–Fort Worth colored by Metabolic Infrastructure Index"
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
          setCenter([
            drag.current.cx - (e.clientX - drag.current.x) * scale,
            drag.current.cy - (e.clientY - drag.current.y) * scale,
          ]);
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
          const m = f.properties.mii;
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
        {CITY_LABELS.filter((c) => zoom >= 1 || c.name.length < 12).map((c) => {
          const [x, y] = project(c.lon, c.lat);
          return (
            <text
              key={c.name}
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily="var(--sos-mono)"
              fontSize={11 / Math.sqrt(zoom)}
              letterSpacing="0.08em"
              fill="var(--sos-text-md)"
              style={{ pointerEvents: "none", textTransform: "uppercase", paintOrder: "stroke", stroke: "var(--sos-e0)", strokeWidth: 3 / zoom }}
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
        {[
          ["+", () => zoomBy(1.3), "Zoom in"],
          ["−", () => zoomBy(1 / 1.3), "Zoom out"],
        ].map(([label, fn, aria]) => (
          <button
            key={label as string}
            type="button"
            aria-label={aria as string}
            onClick={fn as () => void}
            style={btn}
          >
            {label as string}
          </button>
        ))}
      </div>

      {showReadout && (
        <div
          aria-live="polite"
          style={{
            position: "absolute",
            left: 10,
            bottom: 10,
            fontFamily: "var(--sos-mono)",
            fontSize: 12,
            letterSpacing: "0.04em",
            color: "var(--sos-text-md)",
            background: "rgba(18,22,26,0.85)",
            border: "1px solid var(--sos-line)",
            borderRadius: 8,
            padding: "8px 10px",
            maxWidth: "calc(100% - 20px)",
          }}
        >
          {error ? (
            "Map data unavailable."
          ) : hover ? (
            <>
              <b style={{ color: "var(--sos-text-hi)" }}>MII {hover.properties.mii}</b> · {miiBand(hover.properties.mii)} · r{res}
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
