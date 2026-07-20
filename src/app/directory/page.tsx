import type { Metadata } from "next";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  TRUST_CRITERIA,
  type Provider,
  rankedByCategory,
  trustScore,
  hasRealListings,
} from "@/lib/providers";

// Kept out of the index, nav, and sitemap until real providers are listed.
export const metadata: Metadata = {
  title: "Find a provider",
  description:
    "A transparent directory of licensed labs, telemedicine, and compounding pharmacies — ranked only on trust criteria, never on who pays.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/directory" },
};

export default function DirectoryPage() {
  const live = hasRealListings();
  return (
    <div className="sos-container">
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Directory · <b>How we rank</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Find a provider
      </h1>

      {!live && (
        <div
          role="note"
          className="sos-card"
          style={{
            borderLeft: "3px solid var(--sos-copper)",
            marginBottom: "32px",
          }}
        >
          <p className="sos-note">
            This directory is being built. The entries below are{" "}
            <strong style={{ color: "var(--sos-text-hi)" }}>
              format placeholders
            </strong>{" "}
            — they illustrate the ranking, not real recommendations. No provider
            is endorsed yet.
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
        <span
          className="sos-h2"
          style={{ textTransform: "none", fontSize: "16px" }}
        >
          {p.name}
          {p.example && (
            <span
              style={{
                fontFamily: "var(--sos-mono)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--sos-copper)",
                border: "1px solid var(--sos-copper)",
                borderRadius: "4px",
                padding: "2px 6px",
                marginLeft: "10px",
                verticalAlign: "middle",
              }}
            >
              EXAMPLE
            </span>
          )}
        </span>
        <span
          style={{
            fontFamily: "var(--sos-mono)",
            fontSize: "13px",
            color: "var(--sos-copper)",
          }}
          title="Trust score — from criteria only"
        >
          Trust {score}
        </span>
      </div>

      <p className="sos-prose" style={{ fontSize: "15.5px", marginBottom: "10px" }}>
        {p.blurb}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 14px",
          marginBottom: "12px",
        }}
      >
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
        <span
          style={{
            fontFamily: "var(--sos-mono)",
            fontSize: "12px",
            color: "var(--sos-text-lo)",
          }}
        >
          {p.jurisdictions}
          {p.affiliate ? " · referral link (disclosed)" : ""}
        </span>
        {p.example ? (
          <span
            style={{
              fontFamily: "var(--sos-mono)",
              fontSize: "12px",
              color: "var(--sos-text-lo)",
            }}
          >
            link pending
          </span>
        ) : (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              fontFamily: "var(--sos-mono)",
              fontSize: "12px",
              color: "var(--sos-copper)",
            }}
          >
            Visit →
          </a>
        )}
      </div>
    </div>
  );
}
