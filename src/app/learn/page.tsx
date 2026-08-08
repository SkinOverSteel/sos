import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Evidence-graded men's health education — the Open Floor. Every claim carries a visible evidence grade.",
  alternates: { canonical: "/learn" },
};

export default function LearnHub() {
  return (
    <div className="sos-container">
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The Open Floor
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Learn
      </h1>
      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "40px" }}>
        Evidence-graded education, in plain language. Every claim carries a
        visible grade — <strong>Established</strong>, <strong>Emerging</strong>,
        or <strong>Anecdote</strong> — so you always know how much weight it
        holds. This bridges toward your clinician, never around them.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {articles.map((a) => (
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
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <span className="sos-kicker">{a.section}</span>
              <EvidenceBadge grade={a.grade} />
            </div>
            <h2
              className="sos-h2"
              style={{ fontSize: "19px", textTransform: "none", marginBottom: "8px" }}
            >
              {a.title}
            </h2>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              {a.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
