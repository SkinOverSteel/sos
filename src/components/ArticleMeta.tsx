import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Format an ISO date (YYYY-MM-DD) as "Jul 20, 2026" — no timezone surprises. */
function fmt(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/**
 * Instrument-voice byline under an article H1: evidence grade, who reviewed it,
 * and honest publish/review dates linking to the public standard. When a named
 * clinician has reviewed, it says so; otherwise it reads "Editorial review" —
 * we never imply medical review that didn't happen.
 */
export function ArticleMeta({
  slug,
  gradeNote,
}: {
  slug: string;
  /** Optional nuance shown on hover over the grade badge (e.g. "the BP effect is Established, the combination is Emerging"). */
  gradeNote?: string;
}) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return null;

  const reviewLabel = a.reviewer
    ? `Medically reviewed by ${a.reviewer.name}, ${a.reviewer.credentials}`
    : "Editorial review";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingBottom: "20px",
        borderBottom: "1px solid var(--sos-line-soft)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <EvidenceBadge grade={a.grade} title={gradeNote} />
        <span
          style={{
            fontFamily: "var(--sos-mono)",
            fontSize: "12px",
            letterSpacing: "0.03em",
            color: "var(--sos-text-md)",
          }}
        >
          {reviewLabel}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--sos-mono)",
          fontSize: "12px",
          lineHeight: 1.6,
          letterSpacing: "0.02em",
          color: "var(--sos-text-lo)",
          margin: 0,
        }}
      >
        Published <time dateTime={a.published}>{fmt(a.published)}</time>
        {" · "}
        Last reviewed <time dateTime={a.reviewed}>{fmt(a.reviewed)}</time>
        {" · "}
        <Link
          href="/methodology"
          style={{ color: "var(--sos-copper)", textDecoration: "none" }}
        >
          How we review &rarr;
        </Link>
      </p>
    </div>
  );
}
