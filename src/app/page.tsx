import Link from "next/link";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { MorseSOS } from "@/components/MorseSOS";
import { articles } from "@/lib/articles";
import { liveTools } from "@/lib/tools";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// The site-wide WebSite + Organization graph is emitted once in the root
// layout (see lib/jsonld.ts → siteJsonLd), so the homepage no longer repeats it.

const GRADE_EXAMPLES: { grade: Grade; meaning: string; claim: string }[] = [
  {
    grade: "established",
    meaning: "Guideline-level evidence.",
    claim: "PDE5 inhibitors like sildenafil are first-line therapy for erectile dysfunction.",
  },
  {
    grade: "emerging",
    meaning: "Early or mixed research.",
    claim: "Higher-intensity exercise may improve erectile function through vascular adaptation.",
  },
  {
    grade: "anecdote",
    meaning: "Member experience, fenced off from fact.",
    claim: "“Cutting alcohol brought my morning erections back within a month.”",
  },
];

export default function Home() {
  const featuredArticles = articles.filter((a) => a.featured);
  const featured = (featuredArticles.length ? featuredArticles : articles).slice(0, 4);
  return (
    <div>
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
          Evidence-graded education, private self-assessment tools, and a
          transparent directory of licensed providers — no hype, no shame, no
          supplement funnel.
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
          <Link href="/directory" className="sos-btn sos-btn--ghost">
            Find a provider
          </Link>
        </div>

        <MorseSOS style={{ margin: "48px auto 0", width: "fit-content" }} />
      </section>

      {/* Thesis + the grade system (claim, then proof) */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "56px", paddingBottom: "20px" }}>
          <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
            Trust is the product
          </h2>
          <p className="sos-prose" style={{ maxWidth: "62ch" }}>
            Sexual-health information online is mostly funnels: content built to
            sell you something. This is the opposite. Every claim carries a visible
            evidence grade, sources are named, and the point is to get you to a
            clinician better informed, not to sell you around one.
          </p>
          <p style={{ marginTop: "18px" }}>
            <Link
              href="/methodology"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              Sources named, reviewed against a public standard →
            </Link>
          </p>

          <div className="sos-card sos-card--deep" style={{ marginTop: "28px" }}>
            {GRADE_EXAMPLES.map((ex, i) => (
              <div
                key={ex.grade}
                style={{
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  padding: i === 0 ? "0 0 18px" : "18px 0",
                  borderTop: i > 0 ? "1px solid var(--sos-line)" : "none",
                }}
              >
                <div style={{ flex: "0 0 150px" }}>
                  <EvidenceBadge grade={ex.grade} />
                  <p className="sos-note" style={{ marginTop: "8px" }}>
                    {ex.meaning}
                  </p>
                </div>
                <p className="sos-prose" style={{ flex: "1 1 260px", fontSize: "16px", margin: 0 }}>
                  {ex.claim}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start here: featured articles */}
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

      {/* Tools */}
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
            <h2 className="sos-h2">Instruments, not opinions</h2>
            <Link
              href="/tools"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              All tools →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {liveTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="sos-card"
                style={{ display: "block", textDecoration: "none" }}
              >
                <span className="sos-kicker">{t.kind}</span>
                <h3 className="sos-h2" style={{ fontSize: "18px", textTransform: "none", margin: "8px 0 6px" }}>
                  {t.title}
                </h3>
                <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                  {t.blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find a provider */}
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
            <h2 className="sos-h2">Ranked on trust, never on who pays</h2>
            <Link
              href="/directory"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              The directory →
            </Link>
          </div>
          <Link href="/directory" className="sos-card" style={{ display: "block", textDecoration: "none" }}>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Licensed labs, telemedicine, and compounding pharmacies, ranked only
              on transparent trust criteria. A paid relationship never moves a
              ranking or a grade, it only adds a disclosure.
            </p>
          </Link>
        </div>
      </section>

      {/* The Vault (coming) */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "48px", paddingBottom: "80px" }}>
          <p className="sos-kicker" style={{ marginBottom: "14px" }}>
            The Vault · being built
          </p>
          <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
            A place to log the work
          </h2>
          <p className="sos-prose" style={{ maxWidth: "62ch" }}>
            The library is the open floor. The next layer is private: The Log, an
            n=1 tracker that runs from baseline through intervention to outcome,
            publishable with its evidence grade attached and exportable as a
            one-page summary for your clinician. Pseudonymous by default, with
            reputation earned through the work instead of likes.
          </p>
          <p
            className="sos-prose"
            style={{ maxWidth: "62ch", marginTop: "14px", color: "var(--sos-text-lo)", fontSize: "15.5px" }}
          >
            Being built now. The open library stays free, and stays the point.
          </p>
          {process.env.BUTTONDOWN_API_KEY ? <NewsletterSignup /> : null}
        </div>
      </section>

    </div>
  );
}
