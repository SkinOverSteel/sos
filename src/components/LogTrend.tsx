"use client";

import { useState } from "react";

/**
 * Small-multiple trend lines for the Log's weekly ratings: one single-series
 * chart per IIEF-5 item, sharing the week axis, so no second hue is needed
 * (copper is the only warm color in the system). Marks follow the house
 * chart rules: 2px line, 8px markers ringed in the surface color, recessive
 * grid, direct labels on first and last point only, hover tooltip per mark.
 * Pure SVG + CSS tokens; re-themes with the page and prints on the letterhead.
 */

export type TrendPoint = { week: number; value: number; date: string };

type Props = {
  title: string;
  points: TrendPoint[];
  /** Lower-bound label at y=1 and upper-bound label at y=5, e.g. the anchors. */
  anchors: [string, string];
};

const W = 320;
const H = 120;
const PAD = { t: 14, r: 18, b: 24, l: 22 };

export function LogTrend({ title, points, anchors }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const sorted = [...points].sort((a, b) => a.week - b.week);
  if (sorted.length < 2) return null;

  const minW = sorted[0].week;
  const maxW = sorted[sorted.length - 1].week;
  const x = (w: number) =>
    PAD.l + ((w - minW) / Math.max(1, maxW - minW)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + ((5 - v) / 4) * (H - PAD.t - PAD.b);
  const d = sorted.map((p, i) => `${i ? "L" : "M"}${x(p.week).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const h = hover != null ? sorted[hover] : null;

  return (
    <figure style={{ margin: 0 }}>
      <figcaption
        className="sos-letterhead__legend-title"
        style={{ margin: "0 0 4px" }}
      >
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`${title}, weeks ${minW} to ${maxW}: ${sorted.map((p) => `week ${p.week} ${p.value}`).join(", ")}`}
        style={{ display: "block", maxWidth: `${W}px`, fontFamily: "var(--sos-mono)", overflow: "visible" }}
        onMouseLeave={() => setHover(null)}
      >
        {/* recessive grid: 1 and 5 only, plus midline */}
        {[1, 3, 5].map((v) => (
          <line
            key={v}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y(v)}
            y2={y(v)}
            stroke="var(--sos-line)"
            strokeWidth={1}
            strokeDasharray={v === 3 ? "2 3" : undefined}
          />
        ))}
        <text x={PAD.l - 6} y={y(5) + 3} fontSize={9} textAnchor="end" fill="var(--sos-text-lo)">5</text>
        <text x={PAD.l - 6} y={y(1) + 3} fontSize={9} textAnchor="end" fill="var(--sos-text-lo)">1</text>
        <text x={PAD.l} y={H - 8} fontSize={9} fill="var(--sos-text-lo)">wk {minW}</text>
        <text x={W - PAD.r} y={H - 8} fontSize={9} textAnchor="end" fill="var(--sos-text-lo)">wk {maxW}</text>

        <path d={d} fill="none" stroke="var(--sos-copper)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {sorted.map((p, i) => (
          <g key={`${p.week}-${p.date}`}>
            {/* hit target larger than the mark */}
            <circle
              cx={x(p.week)}
              cy={y(p.value)}
              r={10}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              tabIndex={0}
              aria-label={`Week ${p.week}, ${p.date}: ${p.value} of 5`}
              style={{ outline: "none" }}
            />
            <circle
              cx={x(p.week)}
              cy={y(p.value)}
              r={4}
              fill="var(--sos-copper)"
              stroke="var(--sos-e2)"
              strokeWidth={2}
              pointerEvents="none"
            />
          </g>
        ))}

        {/* direct labels: first and last only */}
        {[first, last].map((p, i) => (
          <text
            key={i}
            x={x(p.week)}
            y={y(p.value) - 9}
            fontSize={10}
            fontWeight={600}
            textAnchor={i === 0 ? "start" : "end"}
            fill="var(--sos-text-hi)"
            pointerEvents="none"
          >
            {p.value}
          </text>
        ))}

        {h && (() => {
          const left = x(h.week) > W / 2;
          const bx = left ? x(h.week) - 8 - 104 : x(h.week) + 8;
          return (
          <g pointerEvents="none">
            <line x1={x(h.week)} x2={x(h.week)} y1={PAD.t} y2={H - PAD.b} stroke="var(--sos-text-lo)" strokeWidth={1} strokeDasharray="2 2" />
            <rect
              x={bx}
              y={PAD.t}
              width={104}
              height={30}
              rx={4}
              fill="var(--sos-e3)"
              stroke="var(--sos-line)"
            />
            <text x={bx + 6} y={PAD.t + 12} fontSize={9} fill="var(--sos-text-lo)">
              wk {h.week} · {h.date}
            </text>
            <text x={bx + 6} y={PAD.t + 24} fontSize={10} fontWeight={600} fill="var(--sos-text-hi)">
              {h.value} / 5
            </text>
          </g>
          );
        })()}
      </svg>
      <p className="sos-note" style={{ fontSize: "11px", margin: "2px 0 0", fontFamily: "var(--sos-mono)" }}>
        1 = {anchors[0]} · 5 = {anchors[1]}
      </p>
    </figure>
  );
}
