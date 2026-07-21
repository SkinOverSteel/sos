import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { SITE } from "@/lib/site";
import { articles } from "@/lib/articles";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.tagline,
};

const GRADES: { grade: Grade; meaning: string }[] = [
  { grade: "established", meaning: "Guideline-level evidence." },
  { grade: "emerging", meaning: "Early or mixed research." },
  { grade: "anecdote", meaning: "Member experience, fenced off from fact." },
];

export default function Home() {
  const featured = articles.slice(0, 4);
  return (
    <div>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding: "72px 24px 56px",
          textAlign: "center",
        }}
      >
        <p className="sos-kicker" style={{ marginBottom: "24px" }}>
          Men&apos;s sexual health · <b>evidence-graded</b>
        </p>
        <h1
          style={{
            fontFamily: "var(--sos-sans)",
            fontWeight: 850,
            fontStretch: "78%",
            fontSize: "clamp(46px, 8vw, 84px)",
            lineHeight: 0.96,
            letterSpacing: "-0.015em",
            textTransform: "uppercase",
            color: "var(--sos-text-hi)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--sos-serif)",
              fontStyle: "italic",
              fontWeight: 560,
              textTransform: "none",
              letterSpacing: 0,
              color: "var(--sos-copper)",
            }}
          >
            Skin
          </span>{" "}
          Over Steel
        </h1>
        <p
          style={{
            fontFamily: "var(--sos-serif)",
            fontSize: "clamp(19px, 2.4vw, 23px)",
            lineHeight: 1.5,
            color: "var(--sos-text-md)",
            maxWidth: "40ch",
            margin: "26px auto 0",
          }}
        >
          The conversation your urologist doesn&apos;t have time for.
        </p>
        <p className="sos-prose" style={{ maxWidth: "52ch", margin: "18px auto 0", fontSize: "17px" }}>
          Evidence-graded education and a pseudonymous community for men&apos;s
          sexual health — bridging toward medicine, never around it. No hype, no
          shame, no supplement funnel.
        </p>

        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "34px",
          }}
        >
          <Link href="/learn" className="sos-btn sos-btn--primary">
            Explore the library
          </Link>
        </div>

        <div
          className="sos-morse"
          style={{ margin: "48px auto 0", width: "fit-content" }}
          aria-hidden="true"
        >
          <i className="dot" />
          <i className="dot" />
          <i className="dot" />
          <i className="dash" />
          <i className="dash" />
          <i className="dash" />
          <i className="dot" />
          <i className="dot" />
          <i className="dot" />
        </div>
      </section>

      {/* Thesis */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "56px", paddingBottom: "20px" }}>
          <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
            Trust is the product
          </h2>
          <p className="sos-prose" style={{ maxWidth: "62ch" }}>
            Sexual-health information online is mostly funnels — content built to
            sell you something. This is the opposite: every claim carries a visible
            evidence grade, sources are named, and the whole point is to get you to
            a clinician better informed, not to sell you around one.
          </p>
        </div>
      </section>

      {/* Start here — featured articles */}
      <section>
        <div className="sos-container" style={{ paddingTop: "36px", paddingBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <h2 className="sos-h2">Start here</h2>
            <Link
              href="/learn"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              See all {articles.length} in the library →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {featured.map((a) => (
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
                    marginBottom: "8px",
                  }}
                >
                  <span className="sos-kicker">{a.section}</span>
                  <EvidenceBadge grade={a.grade} />
                </div>
                <h3 className="sos-h2" style={{ fontSize: "18px", textTransform: "none", marginBottom: "6px" }}>
                  {a.title}
                </h3>
                <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                  {a.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence grades */}
      <section>
        <div className="sos-container" style={{ paddingTop: "36px", paddingBottom: "80px" }}>
          <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
            Every claim carries a grade
          </h2>
          <div className="sos-card sos-card--deep">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {GRADES.map(({ grade, meaning }) => (
                <div
                  key={grade}
                  style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}
                >
                  <EvidenceBadge grade={grade} />
                  <span className="sos-prose" style={{ fontSize: "16px" }}>{meaning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
