/**
 * Fig: the thresholds that matter, as band scales.
 *
 * Five markers from the article, each drawn as a horizontal scale with the
 * published cut points: total testosterone (AUA: low if under about
 * 300 ng/dL on two morning draws), fasting glucose and HbA1c (ADA: 100 to
 * 125 mg/dL and 5.7 to 6.4% prediabetes; 126 and 6.5% diabetes), HOMA-IR
 * (about 2.5 and up suggests resistance) and hs-CRP (under 1 low, 1 to 3
 * average, over 3 high, mg/L). Neutral gray is the unremarkable range;
 * copper is attention, deeper copper the diagnostic cut. Reference ranges
 * vary by lab and assay, and the caption says so.
 */
type Band = { from: number; to: number; tone: "neutral" | "watch" | "cut"; label?: string };
type Scale = {
  name: string;
  unit: string;
  min: number;
  max: number;
  ticks: number[];
  bands: Band[];
  note: string;
};

const SCALES: Scale[] = [
  {
    name: "Total testosterone",
    unit: "ng/dL",
    min: 0,
    max: 1000,
    ticks: [300, 1000],
    bands: [
      { from: 0, to: 300, tone: "cut", label: "low" },
      { from: 300, to: 1000, tone: "neutral" },
    ],
    note: "two morning draws before it counts",
  },
  {
    name: "Fasting glucose",
    unit: "mg/dL",
    min: 60,
    max: 160,
    ticks: [100, 126],
    bands: [
      { from: 60, to: 100, tone: "neutral" },
      { from: 100, to: 126, tone: "watch", label: "pre" },
      { from: 126, to: 160, tone: "cut", label: "diabetes" },
    ],
    note: "",
  },
  {
    name: "HbA1c",
    unit: "%",
    min: 4,
    max: 8,
    ticks: [5.7, 6.5],
    bands: [
      { from: 4, to: 5.7, tone: "neutral" },
      { from: 5.7, to: 6.5, tone: "watch", label: "pre" },
      { from: 6.5, to: 8, tone: "cut", label: "diabetes" },
    ],
    note: "",
  },
  {
    name: "HOMA-IR",
    unit: "",
    min: 0,
    max: 5,
    ticks: [2.5],
    bands: [
      { from: 0, to: 2.5, tone: "neutral" },
      { from: 2.5, to: 5, tone: "watch", label: "suggests resistance" },
    ],
    note: "",
  },
  {
    name: "hs-CRP",
    unit: "mg/L",
    min: 0,
    max: 5,
    ticks: [1, 3],
    bands: [
      { from: 0, to: 1, tone: "neutral", label: "low" },
      { from: 1, to: 3, tone: "watch", label: "average" },
      { from: 3, to: 5, tone: "cut", label: "high" },
    ],
    note: "",
  },
];

const X0 = 190;
const X1 = 700;
const TOP = 74;
const ROW = 50;
const BAR_H = 14;

const TONE_CLASS: Record<Band["tone"], string> = {
  neutral: "f-line",
  watch: "f-cu",
  cut: "f-cu",
};
const TONE_OPACITY: Record<Band["tone"], number | undefined> = {
  neutral: undefined,
  watch: 0.45,
  cut: undefined,
};

export function LabBands() {
  return (
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-label="Five band scales. Total testosterone: low under about 300 nanograms per decilitre. Fasting glucose: 100 to 125 prediabetes, 126 and up diabetes. HbA1c: 5.7 to 6.4 percent prediabetes, 6.5 and up diabetes. HOMA-IR: 2.5 and up suggests insulin resistance. hs-CRP: under 1 low, 1 to 3 average, over 3 high."
    >
      <text x="20" y="28" className="t-title f-hi">
        The cut points, on a scale
      </text>
      <text x="20" y="46" className="t-label f-lo">
        gray: unremarkable · copper: attention · deep copper: the diagnostic cut · ranges vary by lab
      </text>

      {SCALES.map((s, i) => {
        const y = TOP + i * ROW;
        const sx = (v: number) => X0 + ((v - s.min) / (s.max - s.min)) * (X1 - X0);
        return (
          <g key={s.name}>
            <text x="20" y={y + BAR_H / 2 + 4} className="t-title f-hi">
              {s.name}
            </text>
            {s.unit ? (
              <text x="20" y={y + BAR_H / 2 + 18} className="t-label f-lo" style={{ fontSize: 10 }}>
                {s.unit}
              </text>
            ) : null}
            {s.bands.map((b) => (
              <g key={`${b.from}-${b.to}`}>
                <rect
                  x={sx(b.from)}
                  y={y}
                  width={sx(b.to) - sx(b.from)}
                  height={BAR_H}
                  className={`${TONE_CLASS[b.tone]} sos-fig-settle`}
                  style={{ opacity: TONE_OPACITY[b.tone], animationDelay: `${i * 0.1}s` }}
                />
                {b.label ? (
                  <text
                    x={(sx(b.from) + sx(b.to)) / 2}
                    y={y + BAR_H + 13}
                    textAnchor="middle"
                    className={`t-label ${b.tone === "neutral" ? "f-lo" : "f-cu"}`}
                    style={{ fontSize: 10 }}
                  >
                    {b.label}
                  </text>
                ) : null}
              </g>
            ))}
            {s.ticks.map((t) => (
              <g key={t}>
                <line x1={sx(t)} x2={sx(t)} y1={y - 5} y2={y + BAR_H} className="s-hi" strokeWidth="1.5" />
                <text x={sx(t)} y={y - 8} textAnchor="middle" className="t-num f-hi" style={{ fontSize: 11 }}>
                  {t}
                </text>
              </g>
            ))}
            {s.note ? (
              <text x={X1} y={y + BAR_H + 13} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
                {s.note}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
