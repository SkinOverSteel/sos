import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { learnHubJsonLd } from "@/lib/jsonld";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Evidence-graded men's health education: the Open Floor. Start where you are, and every claim carries a visible evidence grade.",
  alternates: { canonical: "/learn" },
};

export default function LearnHub() {
  return (
    <div className="sos-container">
      <JsonLd data={learnHubJsonLd()} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The Open Floor
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Learn
      </h1>
      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "40px" }}>
        Evidence-graded education, in plain language. Every claim carries a
        visible grade (<strong>Established</strong>, <strong>Emerging</strong>,
        or <strong>Anecdote</strong>) so you always know how much weight it
        holds. This bridges toward your clinician, never around them.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Start where you are
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {ROUTES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="sos-card"
              style={{ display: "block", textDecoration: "none" }}
            >
              <h3
                className="sos-h2"
                style={{ fontSize: "19px", textTransform: "none", marginBottom: "10px" }}
              >
                {r.title}
              </h3>
              <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "8px" }}>
                <strong>Best for.</strong>{" "}
                {r.bestFor}
              </p>
              <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
                <strong>You leave with.</strong>{" "}
                {r.leavesWith}
              </p>
              <span
                style={{
                  fontFamily: "var(--sos-mono)",
                  fontSize: "13px",
                  color: "var(--sos-copper)",
                }}
              >
                Start: {r.startWith} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Everything in the library
        </h2>
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
      </section>
    </div>
  );
}
