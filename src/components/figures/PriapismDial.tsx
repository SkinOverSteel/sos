/**
 * Fig: the priapism clock as a 48-hour dial.
 *
 * One lap = 48 hours (7.5 degrees per hour), zero at the top. The ring is
 * banded by what the trapped blood is doing to the tissue at that hour,
 * using the article's own AUA/SMSNA 2022 timeline: under 1 h is the
 * prescriber's target; 1 to 4 h is the prolonged-erection zone where the
 * prescriber's sheet applies; 4 h is the emergency line (ischemic priapism
 * by definition); edema from about 6 h; necrosis and fibrosis 12 to 24 h;
 * no viable smooth muscle by 36 h; past 48 h the reversal drugs stop
 * working. The hand sweeps to the 4-hour mark and stops. Emergency ink is
 * used only for the zones where the guideline's damage evidence sits, per
 * the token rule (safety-critical, never decorative).
 */
const CX = 190;
const CY = 216;
const R = 126;
const DEG_PER_H = 360 / 48;

function pt(hour: number, r: number): [number, number] {
  const a = ((hour * DEG_PER_H - 90) * Math.PI) / 180;
  return [+(CX + r * Math.cos(a)).toFixed(1), +(CY + r * Math.sin(a)).toFixed(1)];
}

function arc(h0: number, h1: number, r: number): string {
  const [x0, y0] = pt(h0, r);
  const [x1, y1] = pt(h1, r);
  const large = h1 - h0 > 24 ? 1 : 0;
  return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}

type Zone = {
  h0: number;
  h1: number;
  ink: "cu" | "lo" | "em";
  opacity?: number;
  label: string;
  note: string;
};

const ZONES: Zone[] = [
  { h0: 0, h1: 1, ink: "cu", label: "0 to 1 h", note: "the target a prescriber titrates toward" },
  { h0: 1, h1: 4, ink: "cu", opacity: 0.45, label: "1 to 4 h", note: "prolonged: the prescriber's own sheet applies" },
  { h0: 4, h1: 6, ink: "lo", label: "4 h", note: "ischemic priapism by definition: the ER" },
  { h0: 6, h1: 12, ink: "lo", opacity: 0.6, label: "about 6 h", note: "smooth-muscle edema can begin" },
  { h0: 12, h1: 36, ink: "em", opacity: 0.55, label: "12 to 36 h", note: "necrosis and fibrosis; the window closes" },
  { h0: 36, h1: 48, ink: "em", label: "36 h and past", note: "no viable muscle; past 48 h the drugs fail" },
];

const HAND = pt(4, R - 26);
const EM_A = pt(4, R - 14);
const EM_B = pt(4, R + 14);

export function PriapismDial() {
  return (
    <svg
      viewBox="0 0 720 392"
      role="img"
      aria-label="A 48-hour dial. Zero to one hour is the prescriber's target. One to four hours is a prolonged erection where the prescriber's instructions apply. Four hours is the emergency line for ischemic priapism. Smooth-muscle edema can begin around six hours, necrosis and fibrosis run from twelve to thirty-six hours, and by thirty-six hours no viable smooth muscle remains. A hand points to the four-hour mark."
    >
      <text x="20" y="28" className="t-title f-hi">
        The clock, on a dial
      </text>
      <text x="20" y="46" className="t-label f-lo">
        one lap = 48 hours · zones per AUA/SMSNA 2022 · times approximate
      </text>

      {/* ring base */}
      <circle cx={CX} cy={CY} r={R} className="f-none s-line" strokeWidth="22" />

      {/* zones */}
      {ZONES.map((z) => (
        <path
          key={z.label}
          d={arc(z.h0, z.h1, R)}
          className={`f-none s-${z.ink}`}
          strokeWidth="22"
          style={z.opacity !== undefined ? { opacity: z.opacity } : undefined}
        />
      ))}

      {/* hour ticks + labels every 4 h */}
      {Array.from({ length: 12 }, (_, i) => i * 4).map((h) => {
        const [x0, y0] = pt(h, R + 13);
        const [x1, y1] = pt(h, R + 19);
        const [tx, ty] = pt(h, R + 32);
        return (
          <g key={h}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} className="s-lo" strokeWidth="1.5" />
            <text x={tx} y={ty + 4} textAnchor="middle" className="t-label f-lo" style={{ fontSize: 10 }}>
              {h}
            </text>
          </g>
        );
      })}

      {/* the 4-hour emergency line across the ring */}
      <line x1={EM_A[0]} y1={EM_A[1]} x2={EM_B[0]} y2={EM_B[1]} className="s-em" strokeWidth="3" />

      {/* hand: sweeps from 0 to 4 h and stops */}
      <g className="sos-fig-sweep" style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <line x1={CX} y1={CY} x2={HAND[0]} y2={HAND[1]} className="s-hi" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={CX} cy={CY} r="5" className="f-hi" />
      </g>

      {/* center readout */}
      <text x={CX} y={CY + 48} textAnchor="middle" className="t-title f-em" style={{ fontSize: 22 }}>
        4 h
      </text>
      <text x={CX} y={CY + 66} textAnchor="middle" className="t-label f-lo">
        the emergency line
      </text>

      {/* legend column */}
      {ZONES.map((z, i) => {
        const y = 80 + i * 48;
        return (
          <g key={z.label} transform={`translate(392 ${y})`}>
            <rect
              x="0"
              y="-9"
              width="14"
              height="14"
              rx="3"
              className={`f-${z.ink}`}
              style={z.opacity !== undefined ? { opacity: z.opacity } : undefined}
            />
            <text x="24" y="3" className={`t-title ${z.ink === "em" ? "f-em" : "f-hi"}`}>
              {z.label}
            </text>
            <text x="24" y="22" className="t-serif f-md">
              {z.note}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
