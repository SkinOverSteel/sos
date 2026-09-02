/**
 * Fig: what the three Doppler numbers look like on the trace.
 *
 * Three cavernosal-artery spectral waveforms after the injection, two heart
 * beats each. The shape is the whole story: PSV is the height of the systolic
 * peak (inflow), EDV is where the trace sits between beats (outflow), and RI
 * is the ratio (PSV − EDV) / PSV. The cutoffs are the commonly used ones
 * (Sikka 2013 SOP; AJR 2020 review): PSV ≥ 30 cm/s = competent inflow,
 * < 25 = arterial insufficiency; EDV > 5 cm/s = veno-occlusive dysfunction;
 * RI < 0.75 = venous leak.
 *
 * Waveforms are synthesized (a smooth systolic peak decaying toward the
 * diastolic floor), scaled so 50 cm/s = 120 units. Illustrative, not a
 * patient's trace.
 */
type Panel = {
  key: string;
  title: string;
  psv: number;
  edv: number;
  note: string;
};

const PANELS: Panel[] = [
  { key: "normal", title: "Competent", psv: 46, edv: 1, note: "tall peak, floor near zero" },
  { key: "arterial", title: "Arterial insufficiency", psv: 18, edv: 2, note: "the peak never gets there" },
  { key: "venous", title: "Venous leak", psv: 42, edv: 11, note: "good peak, floor stays up" },
];

const W = 200; // panel width
const H = 150; // trace height
const SCALE = 120 / 50; // units per cm/s
const BASE = H; // y of 0 cm/s inside a panel

function velocityAt(phase: number, psv: number, edv: number): number {
  // phase in [0,1): fast systolic upstroke to the peak at 0.16, then decay.
  const up = 0.16;
  let f: number;
  if (phase < up) {
    f = Math.sin((phase / up) * (Math.PI / 2));
  } else {
    f = Math.exp(-(phase - up) / 0.11);
  }
  return edv + (psv - edv) * f;
}

function wavePath(psv: number, edv: number): string {
  const cycles = 2;
  const n = 70;
  const pts: string[] = [];
  for (let c = 0; c < cycles; c++) {
    for (let i = 0; i < n; i++) {
      const phase = i / n;
      const x = ((c + phase) / cycles) * W;
      const y = BASE - velocityAt(phase, psv, edv) * SCALE;
      pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  }
  pts.push(`${W} ${(BASE - edv * SCALE).toFixed(1)}`);
  return "M" + pts.join(" L");
}

function ri(psv: number, edv: number): string {
  return ((psv - edv) / psv).toFixed(2);
}

export function DopplerWaveforms() {
  return (
    <svg
      viewBox="0 0 720 330"
      role="img"
      aria-label="Three penile Doppler waveforms. Competent: peak systolic velocity 46 centimetres per second, end-diastolic 1, resistive index 0.98. Arterial insufficiency: peak 18, floor 2, index 0.89. Venous leak: peak 42, floor 11, index 0.74. Cutoffs: PSV at or above 30 is competent inflow, below 25 is insufficiency; EDV above 5 and RI below 0.75 indicate venous leak."
    >
      <text x="20" y="28" className="t-title f-hi">
        The three numbers, on the trace
      </text>
      <text x="20" y="46" className="t-label f-lo">
        cavernosal artery after the injection · two beats · illustrative
      </text>

      {PANELS.map((p, i) => {
        const ox = 20 + i * (W + 40);
        const oy = 70;
        const yPsv = BASE - p.psv * SCALE;
        const yEdv = BASE - p.edv * SCALE;
        const y30 = BASE - 30 * SCALE;
        const y5 = BASE - 5 * SCALE;
        return (
          <g key={p.key} transform={`translate(${ox} ${oy})`}>
            {/* panel floor */}
            <rect x="0" y="0" width={W} height={H} rx="6" className="f-e0 s-soft" strokeWidth="1" />
            {/* cutoff guides */}
            <line x1="0" x2={W} y1={y30} y2={y30} className="s-line" strokeWidth="1" strokeDasharray="3 4" />
            <text x={W - 4} y={y30 - 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
              30 cm/s
            </text>
            <line x1="0" x2={W} y1={y5} y2={y5} className="s-line" strokeWidth="1" strokeDasharray="3 4" />
            <text x={W - 4} y={y5 - 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
              5 cm/s
            </text>
            {/* baseline */}
            <line x1="0" x2={W} y1={BASE} y2={BASE} className="s-lo" strokeWidth="1" />
            {/* the trace */}
            <path
              d={wavePath(p.psv, p.edv)}
              className={`f-none s-cu sos-fig-trace${i > 0 ? " sos-fig-trace--late" : ""}`}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            {/* PSV / EDV markers */}
            <circle cx={(0.16 / 2) * W} cy={yPsv} r="3" className="f-cu" />
            <circle cx={W - 2} cy={yEdv} r="3" className="f-cu" />

            {/* readout */}
            <text x="0" y={H + 26} className="t-title f-hi">
              {p.title}
            </text>
            <text x="0" y={H + 47} className="t-serif f-md">
              {p.note}
            </text>
            <text x="0" y={H + 71} className="t-num f-md">
              <tspan className="f-lo">PSV </tspan>
              {p.psv}
              <tspan className="f-lo"> · EDV </tspan>
              {p.edv}
              <tspan className="f-lo"> · RI </tspan>
              {ri(p.psv, p.edv)}
            </text>
          </g>
        );
      })}

      {/* cutoffs footer */}
      <text x="20" y="318" className="t-label f-lo">
        PSV ≥ 30 competent · &lt; 25 insufficiency · EDV &gt; 5 leak · RI &lt; 0.75 leak
      </text>
    </svg>
  );
}
