/**
 * Fig: how deep the ED workup goes, and what sends a man deeper.
 *
 * Four tiers, narrowing. The widths are illustrative (most men are fully
 * worked up at the first tier; a minority ever reach imaging; very few reach
 * the contrast study), and the caption says so. The right-hand triggers are
 * the AUA guideline's indications for specialized testing, which the article
 * gives in prose: younger men, lifelong or trauma-related ED, curvature, a
 * failed first-line trial, and surgery genuinely on the table.
 */
type Tier = {
  title: string;
  detail: string;
  w: number;
  trigger?: [string, string?];
};

const TIERS: Tier[] = [
  { title: "Story · exam · labs", detail: "the whole workup, for most men", w: 1.0 },
  {
    title: "First-line treatment",
    detail: "PDE5 inhibitor · fix what the labs found",
    w: 0.82,
    trigger: ["once the cause is named"],
  },
  {
    title: "Specialized testing",
    detail: "NPT · Doppler · injection test",
    w: 0.68,
    trigger: ["younger, lifelong, pelvic trauma,", "curvature, or first-line fails"],
  },
  {
    title: "Contrast study",
    detail: "cavernosography",
    w: 0.34,
    trigger: ["only when surgery is on the table"],
  },
];

const LEFT = 20;
const FULL = 400;
const TOP = 68;
const H = 56;
const GAP = 10;
const NOTE_X = LEFT + FULL + 34;

export function WorkupFunnel() {
  return (
    <svg
      viewBox="0 0 720 340"
      role="img"
      aria-label="A four-tier funnel. Widest: story, exam, and labs, the whole workup for most men. Next: first-line treatment once the cause is named. Narrower: specialized testing, reserved for younger men, lifelong or trauma-related dysfunction, curvature, or a failed first-line trial. Narrowest: a contrast study, only when surgery is on the table."
    >
      <text x="20" y="28" className="t-title f-hi">
        How deep the workup goes
      </text>
      <text x="20" y="46" className="t-label f-lo">
        widths illustrative · most men are done at the first tier
      </text>

      {TIERS.map((t, i) => {
        const y = TOP + i * (H + GAP);
        const w = FULL * t.w;
        const x = LEFT + (FULL - w) / 2;
        const isTop = i === 0;
        const midY = y + H / 2;
        return (
          <g key={t.title}>
            <rect
              x={x}
              y={y}
              width={w}
              height={H}
              rx="8"
              className={`${isTop ? "f-glow s-cu" : "f-e0 s-line"} sos-fig-settle`}
              strokeWidth={isTop ? 1.5 : 1}
              style={{ animationDelay: `${i * 0.18}s` }}
            />
            <text x={LEFT + FULL / 2} y={y + 24} textAnchor="middle" className={`t-title ${isTop ? "f-cu" : "f-hi"}`}>
              {t.title}
            </text>
            <text x={LEFT + FULL / 2} y={y + 42} textAnchor="middle" className="t-label f-lo">
              {t.detail}
            </text>

            {t.trigger ? (
              <>
                <line x1={LEFT + FULL + 14} x2={LEFT + FULL + 26} y1={midY} y2={midY} className="s-lo" strokeWidth="1" />
                <text x={NOTE_X} y={midY - 11} className="t-label f-lo">
                  go deeper when
                </text>
                <text x={NOTE_X} y={midY + 8} className="t-serif f-md">
                  {t.trigger[0]}
                </text>
                {t.trigger[1] ? (
                  <text x={NOTE_X} y={midY + 27} className="t-serif f-md">
                    {t.trigger[1]}
                  </text>
                ) : null}
              </>
            ) : (
              <>
                <line x1={LEFT + FULL + 14} x2={LEFT + FULL + 26} y1={midY} y2={midY} className="s-cu" strokeWidth="1.5" />
                <text x={NOTE_X} y={midY + 4} className="t-title f-cu">
                  most men stop here
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
