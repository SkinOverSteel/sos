import { ImageResponse } from "next/og";
import type { Grade } from "@/components/EvidenceBadge";
import { articles } from "@/lib/articles";
import { tools } from "@/lib/tools";

/**
 * Shared Open Graph card generator for article + tool routes. Each
 * `opengraph-image.tsx` in a /learn/<slug> or /tools/<slug> segment is a thin
 * wrapper that calls articleOg(slug) / toolOg(slug); this is where the actual
 * card is composed so there's a single source of truth for the treatment.
 *
 * The hero is the page's own title with its evidence grade rendered as the
 * brand's outline badge, so a shared link carries the trust signal (the grade)
 * before anyone clicks. Mirrors opengraph-image.tsx (steel plate, copper glow,
 * Morse SOS signature); tokens are inlined because ImageResponse can't read CSS.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const E0 = "#12161A";
const COPPER = "#C97438";
const BONE = "#E8EAEC";
const LOW = "#78828B";

// Dark-theme grade colors (from brand/tokens.css; the card sits on the E0 plate).
const GRADE: Record<Grade, { label: string; color: string }> = {
  established: { label: "Established", color: "#5FA983" },
  emerging: { label: "Emerging", color: "#CFA145" },
  anecdote: { label: "Anecdote", color: "#8B95A0" },
  "high-risk": { label: "High risk", color: "#E0563D" },
};

// Scale the hero down as the title grows so long titles still fit two lines.
function titleSize(title: string) {
  const n = title.length;
  if (n > 46) return 56;
  if (n > 30) return 66;
  return 76;
}

// Outline pill: grade badge (articles) or "Tool" tag. Outline only, never
// filled, per the brand's instrument-not-mood rule for evidence badges.
function pill(label: string, color: string) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: `2px solid ${color}`,
        color,
        borderRadius: 999,
        padding: "10px 22px",
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: 3,
      }}
    >
      <div style={{ width: 13, height: 13, borderRadius: 999, backgroundColor: color }} />
      <span style={{ textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

function card(kicker: string, title: string, label: string, color: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          backgroundColor: E0,
          backgroundImage: `radial-gradient(900px 520px at 15% -10%, rgba(201,116,56,0.18), rgba(18,22,26,0) 60%)`,
        }}
      >
        {/* header: wordmark + grade/tool pill */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 30, fontWeight: 800 }}>
            <span style={{ color: COPPER, fontStyle: "italic" }}>Skin</span>
            <span style={{ color: BONE, marginLeft: 12, letterSpacing: 1 }}>OVER STEEL</span>
          </div>
          {pill(label, color)}
        </div>

        {/* middle: section kicker + the page title (hero) */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: LOW, marginBottom: 22 }}>
            {kicker}
          </div>
          <div style={{ fontSize: titleSize(title), fontWeight: 800, lineHeight: 1.05, color: BONE, maxWidth: 1010 }}>
            {title}
          </div>
        </div>

        {/* footer: domain + Morse SOS ( ··· ––– ··· ) signature */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 22, letterSpacing: 2, color: LOW }}>skinoversteel.com</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            {[10, 10, 10, 44, 44, 44, 10, 10, 10].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, borderRadius: 5, backgroundColor: COPPER, marginLeft: 12 }} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

export function articleOg(slug: string) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return card("Skin Over Steel", "Men's health, evidence-graded", "Guide", COPPER);
  const g = GRADE[a.grade];
  return card(a.section, a.title, g.label, g.color);
}

export function articleAlt(slug: string) {
  const a = articles.find((x) => x.slug === slug);
  return a ? `${a.title} · Skin Over Steel` : "Skin Over Steel";
}

export function toolOg(slug: string) {
  const t = tools.find((x) => x.slug === slug);
  if (!t) return card("Skin Over Steel", "Men's health, evidence-graded", "Tool", COPPER);
  return card(t.kind, t.title, "Tool", COPPER);
}

export function toolAlt(slug: string) {
  const t = tools.find((x) => x.slug === slug);
  return t ? `${t.title} · Skin Over Steel` : "Skin Over Steel";
}
