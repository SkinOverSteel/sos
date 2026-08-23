import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";

/**
 * Internal-link cluster at the foot of an article: same-section pieces first,
 * then others, so the library reads as a connected topic map (better crawl
 * depth + dwell). Data-driven from articles.ts. No per-article wiring.
 */
export function RelatedArticles({ slug, max = 3 }: { slug: string; max?: number }) {
  const current = articles.find((a) => a.slug === slug);
  if (!current) return null;

  const pool = articles.filter((a) => a.slug !== slug);
  const sameSection = pool.filter((a) => a.section === current.section);
  const others = pool.filter((a) => a.section !== current.section);
  const picks = [...sameSection, ...others].slice(0, max);
  if (!picks.length) return null;

  return (
    <nav
      aria-label="Related reading"
      style={{
        marginTop: "48px",
        paddingTop: "28px",
        borderTop: "1px solid var(--sos-line-soft)",
      }}
    >
      <p className="sos-kicker" style={{ marginBottom: "16px" }}>
        Continue reading
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {picks.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="sos-card"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "6px",
              }}
            >
              <span className="sos-kicker">{a.section}</span>
              <EvidenceBadge grade={a.grade} />
            </div>
            <h3
              className="sos-h2"
              style={{ fontSize: "16px", textTransform: "none", margin: 0 }}
            >
              {a.title} &rarr;
            </h3>
          </Link>
        ))}
      </div>
    </nav>
  );
}
