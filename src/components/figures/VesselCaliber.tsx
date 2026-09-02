/**
 * Fig: the artery size hypothesis, drawn to scale.
 *
 * Three arterial cross-sections at their published calibers (penile 1–2 mm,
 * coronary 3–4 mm, internal carotid 5–7 mm; Montorsi 2005) each carrying
 * the SAME thickness of plaque. The lumen left is what the drawing computes:
 * the small vessel is nearly shut while the large one is barely inconvenienced.
 * That is why erectile function reports vascular disease first.
 *
 * Geometry: 1 mm = 20 SVG units. Plaque thickness is illustrative (0.45 mm)
 * and stated as such in the caption; the diameters are the cited midpoints.
 */
const MM = 20;
const PLAQUE_MM = 0.45;

const VESSELS = [
  { name: "Penile artery", range: "1–2 mm", dMm: 1.5, cx: 130 },
  { name: "Coronary artery", range: "3–4 mm", dMm: 3.5, cx: 360 },
  { name: "Internal carotid", range: "5–7 mm", dMm: 6.0, cx: 590 },
] as const;

const CY = 150;

export function VesselCaliber() {
  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Three artery cross-sections drawn to scale, penile at 1.5 millimetres, coronary at 3.5, carotid at 6, each with the same thickness of plaque. The penile artery keeps about 16 percent of its lumen, the coronary about 55 percent, the carotid about 72 percent."
    >
      <text x="20" y="28" className="t-title f-hi">
        Same plaque, three arteries
      </text>
      <text x="20" y="46" className="t-label f-lo">
        cross-sections to scale · 1 mm = 20 units · plaque 0.45 mm in each
      </text>

      {VESSELS.map((v, i) => {
        const r = (v.dMm / 2) * MM;
        const rl = r - PLAQUE_MM * MM;
        const lumenPct = Math.round(((rl * rl) / (r * r)) * 100);
        const delay = `${0.15 + i * 0.25}s`;
        return (
          <g key={v.name}>
            {/* vessel wall */}
            <circle cx={v.cx} cy={CY} r={r + 2} className="f-e0 s-lo" strokeWidth="1.5" />
            {/* plaque ring: wall minus lumen */}
            <circle
              cx={v.cx}
              cy={CY}
              r={r}
              className="f-line sos-fig-settle"
              style={{ animationDelay: delay }}
            />
            {/* lumen: what still flows */}
            <circle
              cx={v.cx}
              cy={CY}
              r={rl}
              className="f-glow s-cu sos-fig-settle"
              strokeWidth="1.5"
              style={{ animationDelay: delay }}
            />
            {/* caliber tick */}
            <line
              x1={v.cx - r}
              x2={v.cx + r}
              y1={CY + r + 14}
              y2={CY + r + 14}
              className="s-lo"
              strokeWidth="1"
            />
            <line x1={v.cx - r} x2={v.cx - r} y1={CY + r + 10} y2={CY + r + 18} className="s-lo" strokeWidth="1" />
            <line x1={v.cx + r} x2={v.cx + r} y1={CY + r + 10} y2={CY + r + 18} className="s-lo" strokeWidth="1" />

            <text x={v.cx} y={244} textAnchor="middle" className="t-title f-hi">
              {v.name}
            </text>
            <text x={v.cx} y={262} textAnchor="middle" className="t-label f-lo">
              {v.range} across
            </text>
            <text x={v.cx} y={284} textAnchor="middle" className="t-num f-cu">
              {lumenPct}% lumen left
            </text>
          </g>
        );
      })}

      {/* legend */}
      <g transform="translate(20 74)">
        <circle cx="6" cy="0" r="5" className="f-glow s-cu" strokeWidth="1.5" />
        <text x="18" y="4" className="t-label f-md">
          lumen (blood)
        </text>
        <circle cx="152" cy="0" r="5" className="f-line" />
        <text x="164" y="4" className="t-label f-md">
          plaque
        </text>
      </g>
    </svg>
  );
}
