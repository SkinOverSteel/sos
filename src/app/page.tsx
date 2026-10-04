import Link from "next/link";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { MorseSOS } from "@/components/MorseSOS";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { articles } from "@/lib/articles";
import { ROUTES } from "@/lib/routes";
import { liveTools } from "@/lib/tools";

// The site-wide WebSite + Organization graph is emitted once in the root
// layout (see lib/jsonld.ts → siteJsonLd), so the homepage no longer repeats it.

/** The standard, shown as an instrument beside the headline: one real claim per grade. */
const GRADE_EXAMPLES: { grade: Grade; meaning: string; claim: string }[] = [
  {
    grade: "established",
    meaning: "Guideline-level",
    claim: "PDE5 inhibitors like sildenafil are first-line therapy for erectile dysfunction.",
  },
  {
    grade: "emerging",
    meaning: "Early or mixed",
    claim: "Higher-intensity exercise may improve erectile function through vascular adaptation.",
  },
  {
    grade: "anecdote",
    meaning: "Member n=1, fenced off",
    claim: "“Cutting alcohol brought my morning erections back within a month.”",
  },
];

const LOG_PHASES: { name: string; note: string }[] = [
  { name: "Baseline", note: "Your score and labs before anything changes." },
  { name: "Intervention", note: "The prescribed protocol, as written." },
  { name: "Weekly check-ins", note: "The same five questions, every week." },
  { name: "Outcome", note: "What moved, on one page for your clinician." },
];

export default function Home() {
  const featuredArticles = articles.filter((a) => a.featured);
  const featured = (featuredArticles.length ? featuredArticles : articles).slice(0, 4);
  const gradedCount = articles.filter((a) => a.grade === "established").length;

  return (
    <div>
      {/* Hero — "skin over steel" lighting on the dark ground: a warm copper
          glow upper-left, a faint cool steel counter-light lower-right. The
          headline sits left; the grading standard sits beside it as the
          instrument that makes the headline credible. */}
      <section
        style={{
          backgroundColor: "var(--sos-e0)",
          backgroundImage:
            "radial-gradient(1100px 600px at 8% -10%, rgba(201,116,56,0.16), rgba(18,22,26,0) 60%)," +
            "radial-gradient(800px 460px at 104% 110%, rgba(140,161,180,0.07), rgba(18,22,26,0) 58%)",
        }}
      >
        <div className="sos-home">
          <div className="sos-home__hero">
            <div>
              <p className="sos-kicker" style={{ marginBottom: "22px" }}>
                Men&apos;s sexual health · <b>evidence-graded</b>
              </p>
              <h1 className="sos-home__h1">
                The conversation your urologist
                <em>doesn&apos;t have time for.</em>
              </h1>
              <p
                className="sos-prose"
                style={{ maxWidth: "50ch", margin: "26px 0 0", fontSize: "18px" }}
              >
                Plain explanations of erectile function, testosterone, and the
                treatments, each claim graded by its evidence. Private tools to
                score yourself. Licensed providers, ranked on trust. All of it
                built to get you to a clinician better informed, never around
                one.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "32px",
                }}
              >
                <Link href="/learn" className="sos-btn sos-btn--primary">
                  Explore the library
                </Link>
                <Link href="/tools/erectile-function-score" className="sos-btn sos-btn--ghost">
                  Score yourself, privately
                </Link>
              </div>
            </div>

            <aside className="sos-home__panel" aria-labelledby="home-standard">
              <div className="sos-home__panel-head">
                <h2 id="home-standard" className="sos-h2">
                  How every claim is graded
                </h2>
                <Link href="/methodology" className="sos-home__more">
                  The standard →
                </Link>
              </div>
              {GRADE_EXAMPLES.map((ex) => (
                <div key={ex.grade} className="sos-home__grade">
                  <div>
                    <EvidenceBadge grade={ex.grade} />
                    <p className="sos-note" style={{ marginTop: "6px", lineHeight: 1.45 }}>
                      {ex.meaning}
                    </p>
                  </div>
                  <p>{ex.claim}</p>
                </div>
              ))}
            </aside>
          </div>

          {/* The signal rail: what this is, in instrument voice */}
          <div className="sos-home__rail">
            <MorseSOS />
            <span>
              <b>{articles.length}</b>{" "}
              articles, every claim graded
            </span>
            <span>
              <b>{gradedCount}</b>{" "}
              at guideline-level evidence
            </span>
            <span>
              <b>{liveTools.length}</b>{" "}
              private tools, nothing leaves your browser
            </span>
            <span>
              <b>0</b>{" "}
              supplements sold, ever
            </span>
          </div>
        </div>
      </section>

      <div className="sos-home">
        {/* Start where you are: the situation routes shared with /learn */}
        <section className="sos-home__section" aria-labelledby="home-routes">
          <div className="sos-home__section-head">
            <div>
              <h2 id="home-routes" className="sos-h2">
                Start where you are
              </h2>
              <p>
                Where you begin depends on where you&apos;re stuck, not on how
                the library is filed. Pick the situation; we hand you the first
                page.
              </p>
            </div>
            <Link href="/learn" className="sos-home__more">
              Browse all {articles.length} in the library →
            </Link>
          </div>
          <div className="sos-home__routes">
            {ROUTES.map((r) => {
              const crisis = r.href === "/support";
              return (
                <Link
                  key={r.title}
                  href={r.href}
                  className={`sos-home__tile${crisis ? " sos-home__tile--alert" : ""}`}
                >
                  <h3 className="sos-home__tile-title">{r.title}</h3>
                  <p className="sos-home__tile-body">{r.bestFor}</p>
                  <p
                    className="sos-home__tile-foot"
                    style={crisis ? { color: "var(--sos-emergency)" } : undefined}
                  >
                    {crisis ? "Get support now →" : `Start: ${r.startWith} →`}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Start here: the curated four */}
        <section className="sos-home__section" aria-labelledby="home-featured">
          <div className="sos-home__section-head">
            <h2 id="home-featured" className="sos-h2">
              Start here
            </h2>
            <Link href="/learn" className="sos-home__more">
              The whole library →
            </Link>
          </div>
          <ol className="sos-home__list">
            {featured.map((a, i) => (
              <li key={a.slug}>
                <Link href={`/learn/${a.slug}`} className="sos-home__entry">
                  <span className="sos-home__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="sos-home__entry-body">
                    <span className="sos-home__tile-meta" style={{ marginBottom: "8px" }}>
                      <span className="sos-kicker">{a.section}</span>
                      <EvidenceBadge grade={a.grade} />
                    </span>
                    <span className="sos-home__entry-title">{a.title}</span>
                    <span className="sos-home__tile-body">{a.deck}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <MorseSOS dim style={{ margin: "56px auto 0", width: "fit-content" }} />

        {/* Tools: the instruments */}
        <section className="sos-home__section" aria-labelledby="home-tools" style={{ paddingTop: "40px" }}>
          <div className="sos-home__section-head">
            <div>
              <h2 id="home-tools" className="sos-h2">
                Tools
              </h2>
              <p>
                Validated screens and calculators that run in your browser and
                nowhere else. Each one ends in a number you can take to an
                appointment.
              </p>
            </div>
            <Link href="/tools" className="sos-home__more">
              All tools →
            </Link>
          </div>
          <div className="sos-home__grid sos-home__grid--3">
            {liveTools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="sos-home__tile">
                <span className="sos-kicker">{t.kind}</span>
                <h3 className="sos-home__tile-title">{t.title}</h3>
                <p className="sos-home__tile-body">{t.blurb}</p>
                <p className="sos-home__tile-foot">Open →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Find care: near me (the utility) and the directory (the trust standard) */}
        <section className="sos-home__section" aria-labelledby="home-care">
          <div className="sos-home__section-head">
            <h2 id="home-care" className="sos-h2">
              Find care
            </h2>
            <Link href="/map" className="sos-home__more">
              See the whole map →
            </Link>
          </div>
          <div className="sos-home__care">
            <div className="sos-home__tile sos-home__tile--deep" style={{ cursor: "default" }}>
              <span className="sos-kicker">Near me · every US zip</span>
              <h3 className="sos-home__tile-title">Who treats this near you</h3>
              <p className="sos-home__tile-body">
                Testosterone clinics, GLP-1 prescribers, licensed compounding
                pharmacies, and the gyms where people actually lift, ranked by
                distance from your zip, with the prices members report paying.
                Businesses only.
              </p>
              <form action="/near-me" method="get" className="sos-home__care-form">
                <div style={{ flex: "1 1 160px", maxWidth: "220px" }}>
                  <label className="sos-label" htmlFor="home-zip">
                    Zip code
                  </label>
                  <input
                    id="home-zip"
                    name="zip"
                    className="sos-field"
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    placeholder="75201"
                    autoComplete="postal-code"
                  />
                </div>
                <button
                  type="submit"
                  className="sos-btn sos-btn--primary"
                  style={{ border: 0, cursor: "pointer" }}
                >
                  Find
                </button>
              </form>
            </div>
            <Link href="/directory" className="sos-home__tile">
              <span className="sos-kicker">Directory · licensed only</span>
              <h3 className="sos-home__tile-title">Find a provider</h3>
              <p className="sos-home__tile-body">
                Labs, telemedicine, and compounding pharmacies, ranked on
                published trust criteria. Where a listing pays a referral fee,
                the disclosure sits on the link and the ranking does not move.
              </p>
              <p className="sos-home__tile-foot">See the directory →</p>
            </Link>
          </div>
        </section>

        {/* The Log: phase one is live, browser-local */}
        <section className="sos-home__log" aria-labelledby="home-log">
          <div>
            <p className="sos-kicker" style={{ marginBottom: "12px" }}>
              New · <b>The Log</b>
            </p>
            <h2
              id="home-log"
              className="sos-home__tile-title"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: "14px" }}
            >
              One protocol, start to finish
            </h2>
            <p className="sos-prose" style={{ maxWidth: "54ch", fontSize: "17px" }}>
              A private tracker for the work itself, from baseline through
              intervention to outcome, exportable as one page for your
              clinician. It runs in your browser and nowhere else. The library
              stays free either way.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "22px" }}>
              <Link href="/log" className="sos-btn sos-btn--ghost">
                Open the Log →
              </Link>
            </div>
          </div>
          <ol className="sos-home__log-phases" aria-label="The Log's four phases">
            {LOG_PHASES.map((p, i) => (
              <li key={p.name}>
                <span className="sos-home__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="sos-home__log-name">{p.name}</span>
                <span className="sos-home__log-note">{p.note}</span>
              </li>
            ))}
          </ol>
        </section>

        {process.env.BUTTONDOWN_API_KEY ? (
          <div style={{ marginTop: "40px" }}>
            <NewsletterSignup />
          </div>
        ) : null}
        <div style={{ height: "72px" }} />
      </div>
    </div>
  );
}
