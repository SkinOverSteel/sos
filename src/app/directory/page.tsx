import type { Metadata } from "next";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  TRUST_CRITERIA,
  DIRECTORY_LIVE,
  type Provider,
  rankedByCategory,
  trustScore,
} from "@/lib/providers";

// Indexed only once live; kept out of nav + sitemap while in draft.
export const metadata: Metadata = {
  title: "Find a provider",
  description:
    "A transparent directory of licensed labs, telemedicine, and compounding pharmacies — ranked only on trust criteria, never on who pays.",
  robots: { index: DIRECTORY_LIVE, follow: DIRECTORY_LIVE },
  alternates: { canonical: "/directory" },
};

export default function DirectoryPage() {
  return (
    <div className="sos-container">
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Directory · <b>How we rank</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Find a provider
      </h1>

      {!DIRECTORY_LIVE && (
        <div
          role="note"
          className="sos-card"
          style={{
            borderLeft: "3px solid var(--sos-copper)",
            marginBottom: "32px",
          }}
        >
          <p className="sos-kicker" style={{ marginBottom: "8px" }}>
            Draft · owner preview
          </p>
          <p className="sos-note">
            Proposed licensed providers, researched from public information and
            staged for review — <strong style={{ color: "var(--sos-text-hi)" }}>not public and not yet endorsed</strong>.
            All are editorial (no paid relationship). Trust scores are drafted
            from public info and pending verification before anything goes live.
          </p>
        </div>
      )}

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        Every provider here clears two hard gates and is then ranked only on the
        trust criteria below. A paid or referral relationship{" "}
        <strong>never</strong> changes a rank or a score — it only adds a
        disclosure at the link. That is the whole point: the ranking is
        trustworthy because money can&apos;t buy it.
      </p>

      <div className="sos-card sos-card--deep" style={{ marginBottom: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "12px" }}>
          The gates (required to be listed)
        </h2>
        <ul className="sos-prose" style={listStyle}>
          <li>Licensed / accredited in the jurisdictions it serves</li>
          <li>
            A legitimate channel — prescription-based care (telemedicine,
            pharmacy) or an accredited lab
          </li>
        </ul>
        <h2 className="sos-h2" style={{ margin: "22px 0 12px" }}>
          The scored criteria (drive the rank)
        </h2>
        <ul className="sos-prose" style={listStyle}>
          {TRUST_CRITERIA.map((c) => (
            <li key={c.key}>
              {c.label}{" "}
              <span style={{ fontFamily: "var(--sos-mono)", color: "var(--sos-text-lo)", fontSize: "13px" }}>
                (weight {c.weight})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const list = rankedByCategory(cat);
        if (list.length === 0) return null;
        return (
          <section key={cat} style={{ marginBottom: "40px" }}>
            <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
              {CATEGORY_LABELS[cat]}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {list.map((p) => (
                <ProviderCard key={p.slug} provider={p} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="sos-note" style={{ marginTop: "40px" }}>
        Not a pharmacy and not a seller. Where a listing is a paid or referral
        relationship, it is disclosed at the link; a paid relationship never
        changes an evidence grade or a ranking.
      </p>
    </div>
  );
}

const listStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "16px",
};

function ProviderCard({ provider: p }: { provider: Provider }) {
  const score = trustScore(p);
  return (
    <div className="sos-card">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        <span className="sos-h2" style={{ textTransform: "none", fontSize: "16px" }}>
          {p.name}
        </span>
        <span
          style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
          title="Trust score — from criteria only"
        >
          Trust {score}
        </span>
      </div>

      <p className="sos-prose" style={{ fontSize: "15.5px", marginBottom: "10px" }}>
        {p.blurb}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", marginBottom: "12px" }}>
        {TRUST_CRITERIA.map((c) => {
          const met = !!p.criteria[c.key];
          return (
            <span
              key={c.key}
              style={{
                fontFamily: "var(--sos-mono)",
                fontSize: "12px",
                color: met ? "var(--sos-grade-established)" : "var(--sos-text-lo)",
              }}
            >
              {met ? "✓" : "–"} {c.label}
            </span>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontFamily: "var(--sos-mono)", fontSize: "12px", color: "var(--sos-text-lo)" }}>
          {p.jurisdictions}
          {p.affiliate ? " · referral link (disclosed)" : " · editorial listing"}
        </span>
        <a
          href={p.url}
          target="_blank"
          rel={p.affiliate ? "noopener noreferrer sponsored" : "noopener noreferrer"}
          style={{ fontFamily: "var(--sos-mono)", fontSize: "12px", color: "var(--sos-copper)" }}
        >
          Visit →
        </a>
      </div>

      {!DIRECTORY_LIVE && p.sourceNote && (
        <p
          className="sos-note"
          style={{
            marginTop: "12px",
            paddingTop: "10px",
            borderTop: "1px solid var(--sos-line-soft)",
            fontSize: "12px",
          }}
        >
          <span style={{ color: "var(--sos-copper)" }}>Basis:</span> {p.sourceNote}
        </p>
      )}
    </div>
  );
}
