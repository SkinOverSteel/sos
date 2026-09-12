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
      {/* Hero — full-bleed "skin over steel" lighting on the dark ground: warm
          copper glow (--sos-copper, #C97438) upper-left, faint cool steel
          counter-light lower-right, a subtle center vignette for depth. */}
      <section
        style={{
          backgroundColor: "var(--sos-e0)",
          backgroundImage:
            "radial-gradient(1000px 560px at 14% -6%, rgba(201,116,56,0.17), rgba(18,22,26,0) 60%)," +
            "radial-gradient(760px 440px at 101% 116%, rgba(140,161,180,0.07), rgba(18,22,26,0) 58%)," +
            "radial-gradient(120% 130% at 50% 34%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.24))",
        }}
      >
        <div
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
          Plain explanations of erectile function, testosterone, and the
          treatments, each claim graded by its evidence. Private tools to
          score yourself. A directory of licensed providers. All of it built to
          get you to a clinician better informed.
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
        </div>
      </section>

      {/* Start here: featured articles */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "56px", paddingBottom: "20px" }}>
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
              Browse all {articles.length} in the library →
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
            <h2 className="sos-h2">Tools</h2>
            <Link
              href="/tools"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              Score yourself, privately →
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

      {/* The standard: how every claim is graded (claim, then proof) */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "36px", paddingBottom: "20px" }}>
          <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
            How every claim is graded
          </h2>
          <p className="sos-prose" style={{ maxWidth: "62ch" }}>
            Every claim on this site carries one of three grades, and every
            source is named. The grade tells you how much weight the evidence
            can bear before you take it into an appointment. A member&apos;s
            experience is welcome here, and it is always marked as one.
          </p>
          <p style={{ marginTop: "18px" }}>
            <Link
              href="/methodology"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              Read the full standard →
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
            <h2 className="sos-h2">Find a provider</h2>
            <Link
              href="/directory"
              style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-copper)" }}
            >
              See the directory →
            </Link>
          </div>
          <Link href="/directory" className="sos-card" style={{ display: "block", textDecoration: "none" }}>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Licensed labs, telemedicine, and compounding pharmacies, ranked on
              published trust criteria. Where a listing pays a referral fee, the
              disclosure sits on the link and the ranking does not move.
            </p>
          </Link>
        </div>
      </section>

      {/* The Log (in progress): one line, no dead-end panel */}
      <section style={{ borderTop: "1px solid var(--sos-line-soft)" }}>
        <div className="sos-container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
          <p className="sos-kicker" style={{ marginBottom: "12px" }}>
            Next · The Log
          </p>
          <p className="sos-prose" style={{ maxWidth: "62ch" }}>
            A private tracker for the work itself, from baseline through
            intervention to outcome, exportable as one page for your clinician.
            In progress. The library stays free either way.
          </p>
          {process.env.BUTTONDOWN_API_KEY ? <NewsletterSignup /> : null}
        </div>
      </section>

    </div>
  );
}
