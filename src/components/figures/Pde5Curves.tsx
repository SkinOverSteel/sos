/**
 * Fig: the shape of each PDE5 inhibitor's window.
 *
 * Four plasma-concentration curves on one 36-hour axis, each normalized to
 * its own peak (so the shapes compare, not the potencies). The curves are
 * one-compartment oral absorption/elimination (Bateman) fitted to two label
 * numbers per drug: median time to peak and terminal half-life.
 *
 *   sildenafil  Tmax ~1 h,   t1/2 ~4 h     (Viagra label)
 *   vardenafil  Tmax ~1 h,   t1/2 ~4-5 h   (Levitra label)
 *   avanafil    Tmax ~0.6 h, t1/2 ~5 h     (Stendra label; PMC4542406)
 *   tadalafil   Tmax ~2 h,   t1/2 ~17.5 h  (Cialis label)
 *
 * The "back to half of peak" hour for each curve is computed from the same
 * model and shown in the legend. It is a shape proxy, not the clinical
 * window: tadalafil stays clinically useful well past half-peak, which is
 * why the article's bar says "up to ~36 h".
 */
type Drug = {
  name: string;
  tmax: number;
  half: number;
  ink: "cu" | "hi" | "md" | "lo";
  dash?: string;
};

const DRUGS: Drug[] = [
  { name: "Tadalafil", tmax: 2, half: 17.5, ink: "cu" },
  { name: "Sildenafil", tmax: 1, half: 4, ink: "hi" },
  { name: "Vardenafil", tmax: 1, half: 4.5, ink: "md", dash: "6 4" },
  { name: "Avanafil", tmax: 0.6, half: 5, ink: "lo", dash: "2 4" },
];

const HOURS = 36;
const X0 = 60;
const X1 = 700;
const Y0 = 250; // baseline (0)
const Y1 = 80; // peak (1.0)

const xAt = (h: number) => X0 + (h / HOURS) * (X1 - X0);
const yAt = (c: number) => Y0 - c * (Y0 - Y1);

/** Absorption rate that puts the Bateman peak at tmax for a given ke (bisection). */
function solveKa(tmax: number, ke: number): number {
  let lo = ke * 1.0001;
  let hi = 200;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const t = Math.log(mid / ke) / (mid - ke);
    if (t > tmax) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function model(d: Drug) {
  const ke = Math.LN2 / d.half;
  const ka = solveKa(d.tmax, ke);
  const raw = (t: number) => Math.exp(-ke * t) - Math.exp(-ka * t);
  const peak = raw(d.tmax);
  const c = (t: number) => raw(t) / peak;
  // descending crossing of 0.5
  let halfBack = HOURS;
  for (let t = d.tmax; t <= HOURS; t += 0.05) {
    if (c(t) <= 0.5) {
      halfBack = t;
      break;
    }
  }
  return { c, halfBack };
}

function path(c: (t: number) => number): string {
  const pts: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * HOURS;
    pts.push(`${xAt(t).toFixed(1)} ${yAt(c(t)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

export function Pde5Curves() {
  const models = DRUGS.map((d) => ({ d, ...model(d) }));
  return (
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-label="Four plasma curves over 36 hours, each scaled to its own peak. Sildenafil, vardenafil, and avanafil rise within the first hour and are back to half of peak by roughly five to seven hours. Tadalafil peaks at two hours and is still above half of peak at about twenty hours."
    >
      <text x="20" y="28" className="t-title f-hi">
        The shape of the window
      </text>
      <text x="20" y="46" className="t-label f-lo">
        plasma level as a share of each drug&apos;s own peak · modeled from label Tmax and half-life
      </text>

      {/* axes */}
      <line x1={X0} x2={X1} y1={Y0} y2={Y0} className="s-lo" strokeWidth="1" />
      <line x1={X0} x2={X0} y1={Y0} y2={Y1 - 10} className="s-lo" strokeWidth="1" />
      {[0, 6, 12, 18, 24, 30, 36].map((h) => (
        <g key={h}>
          <line x1={xAt(h)} x2={xAt(h)} y1={Y0} y2={Y0 + 5} className="s-lo" strokeWidth="1" />
          <text x={xAt(h)} y={Y0 + 18} textAnchor="middle" className="t-label f-lo" style={{ fontSize: 10 }}>
            {h} h
          </text>
        </g>
      ))}
      <text x={X0 - 8} y={yAt(1) + 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        peak
      </text>
      <text x={X0 - 8} y={yAt(0.5) + 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        half
      </text>
      <line x1={X0} x2={X1} y1={yAt(0.5)} y2={yAt(0.5)} className="s-line" strokeWidth="1" strokeDasharray="3 4" />

      {/* curves */}
      {models.map(({ d, c }, i) => (
        <path
          key={d.name}
          d={path(c)}
          className={`f-none s-${d.ink} sos-fig-trace`}
          strokeWidth={d.ink === "cu" ? 2.5 : 1.75}
          strokeDasharray={d.dash}
          strokeLinecap="round"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* legend */}
      {models.map(({ d, halfBack }, i) => {
        const x = 60 + i * 162;
        return (
          <g key={d.name} transform={`translate(${x} 292)`}>
            <line x1="0" x2="26" y1="0" y2="0" className={`s-${d.ink}`} strokeWidth={d.ink === "cu" ? 2.5 : 1.75} strokeDasharray={d.dash} />
            <text x="34" y="4" className={`t-title ${d.ink === "cu" ? "f-cu" : "f-hi"}`}>
              {d.name}
            </text>
            <text x="34" y="22" className="t-label f-lo" style={{ fontSize: 10 }}>
              half of peak by ~{Math.round(halfBack)} h
            </text>
          </g>
        );
      })}
    </svg>
  );
}
