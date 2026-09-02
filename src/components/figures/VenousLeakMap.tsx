/**
 * Fig: what cavernosography and cavernosometry each show.
 *
 * Left, the map: a schematic (not anatomical) circuit of the erectile chamber.
 * Contrast comes in with the infusion; a competent tunica compresses the small
 * exit veins as the chamber fills, so nothing leaves; on a leak the contrast is
 * seen escaping down a specific route (here the deep dorsal route, drawn in
 * copper). The surgeon needs the route, not just the fact.
 *
 * Right, the numbers: pressure after the infusion stops. A competent chamber
 * holds; a leaking one falls fast. The commonly cited signature is a drop
 * of more than about 45 mmHg in 30 seconds, or needing a high flow just to
 * hold the pressure (DICC; see the article's sources). Curves illustrative.
 */
const CHAMBER = { x: 120, y: 120, w: 170, h: 120 };

export function VenousLeakMap() {
  const c = CHAMBER;
  const cxMid = c.x + c.w / 2;
  const cyMid = c.y + c.h / 2;

  // pressure trace: 0..30 s across 240 units, 0..160 mmHg over 130 units
  const px = (s: number) => 440 + (s / 30) * 240;
  const py = (mmHg: number) => 250 - (mmHg / 160) * 130;
  const hold = `M${px(0)} ${py(150)} L${px(30)} ${py(140)}`;
  const leakPts: string[] = [];
  for (let s = 0; s <= 30; s += 2) {
    const p = 150 * Math.exp(-s / 22);
    leakPts.push(`${px(s).toFixed(1)} ${py(p).toFixed(1)}`);
  }
  const leak = "M" + leakPts.join(" L");

  return (
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Left: a schematic of the erectile chamber with contrast infused from the artery. Two exit routes are held shut by the tunica; one, the deep dorsal route, is leaking contrast, shown in copper. Right: intracavernosal pressure over thirty seconds after infusion stops. A competent chamber holds near 150 millimetres of mercury; a leaking chamber falls to about 40."
    >
      {/* ---- left: the map ---- */}
      <text x="20" y="28" className="t-title f-hi">
        The map
      </text>
      <text x="20" y="46" className="t-label f-lo">
        cavernosography · where the contrast goes
      </text>

      {/* inflow: artery + infusion */}
      <path d={`M20 ${cyMid} H${c.x - 4}`} className="f-none s-lo" strokeWidth="2" />
      <path d={`M20 ${cyMid} H${c.x - 4}`} className="f-none s-cu sos-fig-flow" strokeWidth="2" />
      <text x="20" y={cyMid - 12} className="t-label f-md">
        artery in
      </text>
      <text x="20" y={cyMid + 22} className="t-label f-lo">
        with contrast
      </text>

      {/* chamber: tunica (outer) + sinusoids (inner) */}
      <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="26" className="f-e0 s-md" strokeWidth="3" />
      <rect x={c.x + 10} y={c.y + 10} width={c.w - 20} height={c.h - 20} rx="18" className="f-glow s-cu" strokeWidth="1" />
      <text x={cxMid} y={cyMid - 4} textAnchor="middle" className="t-label f-hi">
        chamber
      </text>
      <text x={cxMid} y={cyMid + 12} textAnchor="middle" className="t-label f-lo">
        sinusoids fill
      </text>
      <text x={c.x + c.w - 6} y={c.y - 8} textAnchor="end" className="t-label f-md">
        tunica
      </text>

      {/* exit 1: held shut (top) */}
      <path d={`M${cxMid - 40} ${c.y} V80`} className="f-none s-lo" strokeWidth="2" />
      <line x1={cxMid - 48} x2={cxMid - 32} y1={c.y - 6} y2={c.y - 6} className="s-md" strokeWidth="3" />
      <text x={cxMid - 40} y="72" textAnchor="middle" className="t-label f-lo">
        held shut
      </text>

      {/* exit 2: held shut (bottom) */}
      <path d={`M${cxMid + 20} ${c.y + c.h} V270`} className="f-none s-lo" strokeWidth="2" />
      <line x1={cxMid + 12} x2={cxMid + 28} y1={c.y + c.h + 6} y2={c.y + c.h + 6} className="s-md" strokeWidth="3" />
      <text x={cxMid + 20} y="286" textAnchor="middle" className="t-label f-lo">
        crural veins · held shut
      </text>

      {/* exit 3: THE LEAK (right, deep dorsal route) */}
      <path d={`M${c.x + c.w} ${c.y + 34} H330 Q350 ${c.y + 34} 350 ${c.y + 14} V60`} className="f-none s-lo" strokeWidth="2" />
      <path d={`M${c.x + c.w} ${c.y + 34} H330 Q350 ${c.y + 34} 350 ${c.y + 14} V60`} className="f-none s-cu sos-fig-flow" strokeWidth="2.5" />
      <circle cx="350" cy="56" r="4" className="f-cu" />
      <text x="362" y="60" className="t-title f-cu">
        leak
      </text>
      <text x="362" y="76" className="t-label f-lo">
        deep dorsal route
      </text>
      <text x="362" y="93" className="t-label f-lo">
        contrast seen escaping
      </text>

      {/* ---- right: the numbers ---- */}
      <text x="440" y="28" className="t-title f-hi">
        The numbers
      </text>
      <text x="440" y="46" className="t-label f-lo">
        cavernosometry · after infusion stops
      </text>

      {/* axes */}
      <line x1={px(0)} x2={px(30)} y1={py(0)} y2={py(0)} className="s-lo" strokeWidth="1" />
      <line x1={px(0)} x2={px(0)} y1={py(0)} y2={py(160)} className="s-lo" strokeWidth="1" />
      <text x={px(0) - 6} y={py(150) + 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
        150
      </text>
      <text x={px(0) - 6} y={py(0) + 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
        0
      </text>
      <text x={px(0)} y={py(0) + 16} className="t-label f-lo" style={{ fontSize: 9 }}>
        0 s
      </text>
      <text x={px(30)} y={py(0) + 16} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
        30 s
      </text>
      <text x={px(0) - 6} y={py(160) - 2} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
        mmHg
      </text>
      {/* the 45 mmHg drop band */}
      <line x1={px(0)} x2={px(30)} y1={py(105)} y2={py(105)} className="s-line" strokeWidth="1" strokeDasharray="3 4" />
      <text x={px(30)} y={py(105) - 4} textAnchor="end" className="t-label f-lo" style={{ fontSize: 9 }}>
        −45 mmHg
      </text>

      {/* traces */}
      <path d={hold} className="f-none s-md sos-fig-trace" strokeWidth="2" strokeLinecap="round" />
      <path d={leak} className="f-none s-cu sos-fig-trace sos-fig-trace--late" strokeWidth="2.5" strokeLinecap="round" />
      <text x={px(29)} y={py(140) - 7} textAnchor="end" className="t-label f-md">
        holds
      </text>
      <text x={px(29)} y={py(150 * Math.exp(-30 / 22)) + 15} textAnchor="end" className="t-label f-cu">
        leak
      </text>
      <text x="440" y="286" className="t-label f-lo">
        fast fall or high flow = leak
      </text>
    </svg>
  );
}
