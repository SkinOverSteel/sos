/**
 * Fig: how a trimix dose gets set, as a staircase, next to what "right"
 * looks like on the clock.
 *
 * Left: the titration staircase a competent program prints on its handout
 * (the article's sources: Caverject label, Defy Medical and Olympia Pharmacy
 * patient sheets). Start at 0.05 mL (5 units on an insulin-style syringe,
 * 1 unit = 0.01 mL), climb in 0.05 mL steps, first dose in the office, most
 * protocols capping the volume near 0.5 mL, past which the fix is a stronger
 * mix. How many steps a given man climbs is individual, so the drawn stairs
 * stop early and the rest is dotted.
 *
 * Right: the titration target from the label. Onset in 5 to 20 minutes and
 * an erection lasting under an hour. Two to three hours is a warning shot
 * (the answer is a lower dose). Four hours is the emergency line, which is
 * the priapism clock's job to explain.
 *
 * Literacy, not a prescription: the prescriber still sets the dose.
 */
const STEP_ML = 0.05;
const DRAWN_STEPS = 6;
const CAP_ML = 0.5;

// left panel geometry
const LX0 = 60;
const LX1 = 380;
const LY0 = 250; // 0 mL
const LY1 = 92; // CAP_ML
const stepW = (LX1 - LX0) / 10;
const yMl = (ml: number) => LY0 - (ml / CAP_ML) * (LY0 - LY1);

function staircase(): string {
  const pts: string[] = [`M${LX0} ${LY0}`];
  for (let i = 1; i <= DRAWN_STEPS; i++) {
    const x0 = LX0 + (i - 1) * stepW;
    const x1 = LX0 + i * stepW;
    const y = yMl(i * STEP_ML);
    pts.push(`L${x0.toFixed(1)} ${y.toFixed(1)} L${x1.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

// right panel: duration bar, 0 to 4 h
const RX0 = 440;
const RX1 = 700;
const RY = 150;
const xH = (h: number) => RX0 + (h / 4) * (RX1 - RX0);

export function TitrationStaircase() {
  const ceilStepsY = yMl(DRAWN_STEPS * STEP_ML);
  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Left: a staircase of trimix doses starting at 0.05 millilitres, five units on an insulin syringe, rising in 0.05 millilitre steps toward a volume cap near 0.5 millilitres, with the first dose given in the office. Right: a duration scale. Under one hour is the titration target, two to three hours is a warning shot meaning a lower dose, and four hours is the emergency line."
    >
      {/* ---- left: the staircase ---- */}
      <text x="20" y="28" className="t-title f-hi">
        How the dose climbs
      </text>
      <text x="20" y="46" className="t-label f-lo">
        0.05 mL steps · first dose in the office
      </text>

      {/* axes */}
      <line x1={LX0} x2={LX1} y1={LY0} y2={LY0} className="s-lo" strokeWidth="1" />
      <line x1={LX0} x2={LX0} y1={LY0} y2={LY1 - 8} className="s-lo" strokeWidth="1" />
      {[0.1, 0.2, 0.3, 0.4, 0.5].map((ml) => (
        <g key={ml}>
          <line x1={LX0 - 4} x2={LX0} y1={yMl(ml)} y2={yMl(ml)} className="s-lo" strokeWidth="1" />
          <text x={LX0 - 8} y={yMl(ml) + 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
            {ml.toFixed(2)}
          </text>
        </g>
      ))}
      <text x={LX0 - 8} y={LY1 - 14} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        mL
      </text>
      <text x={(LX0 + LX1) / 2} y={LY0 + 18} textAnchor="middle" className="t-label f-lo" style={{ fontSize: 10 }}>
        each supervised step, one at a time
      </text>

      {/* volume cap */}
      <line x1={LX0} x2={LX1} y1={yMl(CAP_ML)} y2={yMl(CAP_ML)} className="s-line" strokeWidth="1" strokeDasharray="3 4" />
      <text x={LX1} y={yMl(CAP_ML) - 6} textAnchor="end" className="t-label f-md" style={{ fontSize: 10 }}>
        ~0.5 mL cap: stronger mix, not more volume
      </text>

      {/* dotted continuation */}
      <line
        x1={LX0 + DRAWN_STEPS * stepW}
        x2={LX1}
        y1={ceilStepsY}
        y2={yMl(CAP_ML)}
        className="s-lo"
        strokeWidth="1"
        strokeDasharray="2 5"
      />

      {/* the stairs */}
      <path d={staircase()} className="f-none s-cu sos-fig-trace" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {/* first-dose marker */}
      <circle cx={LX0 + stepW / 2} cy={yMl(STEP_ML)} r="4" className="f-cu" />
      <text x={LX0 + stepW / 2 + 10} y={yMl(STEP_ML) + 12} className="t-label f-cu" style={{ fontSize: 10 }}>
        0.05 mL = 5 units · in the office
      </text>

      {/* ---- right: what right looks like ---- */}
      <text x={RX0} y="28" className="t-title f-hi">
        What right looks like
      </text>
      <text x={RX0} y="46" className="t-label f-lo">
        onset 5 to 20 min · how long it lasts
      </text>

      {/* bands */}
      <rect x={xH(0)} y={RY - 11} width={xH(1) - xH(0)} height="22" rx="4" className="f-cu" />
      <rect x={xH(1)} y={RY - 11} width={xH(4) - xH(1)} height="22" rx="4" className="f-line" />
      <line x1={xH(4)} x2={xH(4)} y1={RY - 22} y2={RY + 22} className="s-em" strokeWidth="3" />

      {/* ticks */}
      {[0, 1, 2, 3, 4].map((h) => (
        <text key={h} x={xH(h)} y={RY + 40} textAnchor={h === 4 ? "end" : h === 0 ? "start" : "middle"} className="t-label f-lo" style={{ fontSize: 10 }}>
          {h} h
        </text>
      ))}

      {/* callouts */}
      <text x={xH(0.5)} y={RY - 24} textAnchor="middle" className="t-title f-cu">
        target
      </text>
      <text x={xH(0.5)} y={RY + 4} textAnchor="middle" className="t-label f-e0" style={{ fontSize: 10 }}>
        under 1 h
      </text>
      <text x={xH(2.5)} y={RY + 4} textAnchor="middle" className="t-label f-md" style={{ fontSize: 10 }}>
        2 to 3 h: a warning shot
      </text>
      <text x={xH(2.5)} y={RY + 62} textAnchor="middle" className="t-serif f-md">
        the answer is a lower dose
      </text>
      <text x={xH(4)} y={RY - 30} textAnchor="end" className="t-title f-em">
        4 h
      </text>
      <text x={xH(4)} y={RY + 78} textAnchor="end" className="t-label f-em" style={{ fontSize: 10 }}>
        emergency line: the rescue plan
      </text>

      <text x={RX0} y="286" className="t-label f-lo">
        max 3× a week · never twice in 24 h
      </text>
    </svg>
  );
}
