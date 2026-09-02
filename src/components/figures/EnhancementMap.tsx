/**
 * Fig: the enhancement map on two axes.
 *
 * Across: evidence of a lasting size gain (none to modest). Up: injury risk
 * (low to maims). Every method from the article's graded list, plotted as a
 * dot in its evidence-grade color. Positions are editorial placements
 * consistent with each method's verdict in the list (and the caption says
 * so); the grades are the article's. The picture makes the honest point
 * that most of the map sits in the top-left: no lasting gain, real harm.
 */
import type { Grade } from "@/components/EvidenceBadge";

type Method = {
  name: string;
  grade: Grade;
  x: number; // evidence of lasting size gain, 0..1
  y: number; // injury risk, 0..1
  dx?: number;
  dy?: number;
  anchor?: "start" | "end";
};

const METHODS: Method[] = [
  { name: "Vacuum devices", grade: "established", x: 0.12, y: 0.12, dx: 12, dy: 4 },
  { name: "Traction devices", grade: "emerging", x: 0.72, y: 0.28, dx: -12, dy: 4, anchor: "end" },
  { name: "HA fillers (girth, temporary)", grade: "emerging", x: 0.5, y: 0.44, dx: 12, dy: 4 },
  { name: "Surgery", grade: "emerging", x: 0.42, y: 0.66, dx: 12, dy: 4 },
  { name: "Jelqing, extreme pumping", grade: "anecdote", x: 0.1, y: 0.42, dx: 12, dy: 4 },
  { name: "Peptide stacks (BPC-157, TB-500)", grade: "high-risk", x: 0.08, y: 0.6, dx: 12, dy: 4 },
  { name: "rHGH for size", grade: "high-risk", x: 0.06, y: 0.78, dx: 12, dy: 4 },
  { name: "Silicone, oil, permanent fillers", grade: "high-risk", x: 0.04, y: 0.95, dx: 12, dy: 4 },
];

const GRADE_FILL: Record<Grade, string> = {
  established: "f-est",
  emerging: "f-emg",
  anecdote: "f-anec",
  "high-risk": "f-em",
};

const X0 = 70;
const X1 = 690;
const Y0 = 270; // low risk
const Y1 = 70; // maims
const px = (x: number) => X0 + x * (X1 - X0);
const py = (y: number) => Y0 - y * (Y0 - Y1);

export function EnhancementMap() {
  return (
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-label="A scatter map. Across: evidence of lasting size gain, none to modest. Up: injury risk, low to maims. Vacuum devices sit at no gain, low risk. Traction devices sit at modest gain, low to moderate risk. Fillers and surgery sit in the middle with moderate risk. Jelqing, peptide stacks, growth hormone, and gray-market injections all sit at no gain with rising risk, gray-market injections at the top."
    >
      <text x="20" y="28" className="t-title f-hi">
        The map, on two axes
      </text>
      <text x="20" y="46" className="t-label f-lo">
        across: evidence of lasting gain · up: injury risk · positions editorial
      </text>

      {/* frame */}
      <rect x={X0} y={Y1 - 12} width={X1 - X0} height={Y0 - Y1 + 12} className="f-e0 s-soft" strokeWidth="1" rx="6" />
      {/* quadrant hints */}
      <text x={px(0.55)} y={Y1 + 4} className="t-label f-lo" style={{ fontSize: 10 }}>
        no lasting gain, real harm
      </text>
      <text x={X1 - 10} y={Y0 - 8} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        the only honest corner
      </text>

      {/* axes */}
      <line x1={X0} x2={X1} y1={Y0} y2={Y0} className="s-lo" strokeWidth="1" />
      <line x1={X0} x2={X0} y1={Y0} y2={Y1 - 12} className="s-lo" strokeWidth="1" />
      <text x={X0} y={Y0 + 18} className="t-label f-lo" style={{ fontSize: 10 }}>
        no evidence
      </text>
      <text x={X1} y={Y0 + 18} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        modest, real evidence
      </text>
      <text x={X0 - 8} y={Y0} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        low
      </text>
      <text x={X0 - 8} y={Y1 - 2} textAnchor="end" className="t-label f-lo" style={{ fontSize: 10 }}>
        maims
      </text>

      {/* dots */}
      {METHODS.map((m, i) => (
        <g key={m.name}>
          <circle
            cx={px(m.x)}
            cy={py(m.y)}
            r="7"
            className={`${GRADE_FILL[m.grade]} sos-fig-settle`}
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          />
          <text
            x={px(m.x) + (m.dx ?? 12)}
            y={py(m.y) + (m.dy ?? 4)}
            textAnchor={m.anchor ?? "start"}
            className={`t-serif ${m.grade === "high-risk" ? "f-em" : "f-hi"}`}
          >
            {m.name}
          </text>
        </g>
      ))}

      {/* legend */}
      {(
        [
          ["established", "Established"],
          ["emerging", "Emerging"],
          ["anecdote", "Anecdote"],
          ["high-risk", "High risk"],
        ] as [Grade, string][]
      ).map(([g, label], i) => (
        <g key={g} transform={`translate(${70 + i * 150} 318)`}>
          <circle cx="0" cy="-4" r="5" className={GRADE_FILL[g]} />
          <text x="12" y="0" className="t-label f-md">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
