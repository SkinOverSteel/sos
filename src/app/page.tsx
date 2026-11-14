import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { StepHeader } from "@/components/StepHeader";
import { UtilityPanel } from "@/components/UtilityPanel";
import { SignalRail } from "@/components/SignalRail";
import { articles } from "@/lib/articles";
import { ROUTES } from "@/lib/routes";
import { liveTools } from "@/lib/tools";

// The site-wide WebSite + Organization graph is emitted once in the root
// layout (see lib/jsonld.ts → siteJsonLd), so the homepage no longer repeats it.

/**
 * The page is ordered by what people come here to do, heaviest demand first:
 * understand what's happening, measure it, find someone licensed to treat it,
 * then track the protocol. The editorial standard that backs all of it is one
 * link in the rail; it earns trust on the article page, not on the front door.
 */
const LOG_PHASES: { name: string; note: string }[] = [
  { name: "Baseline", note: "Your score and labs, before anything changes." },
  { name: "Intervention", note: "The protocol exactly as prescribed." },
  { name: "Weekly check-ins", note: "The same five questions, every week." },
  { name: "Outcome", note: "What changed, on one page for your clinician." },
];

export default function Home() {
  const featuredArticles = articles.filter((a) => a.featured);
  const featured = (featuredArticles.length ? featuredArticles : articles).slice(0, 4);

  return (
    <div>
      {/* Hero — "skin over steel" lighting on the dark ground: a warm copper
          glow upper-left, a faint cool steel counter-light lower-right. The
          headline sits left; the three highest-demand utilities sit beside it
          as one instrument panel, so the first screen is already useful. */}
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
                Erectile function, testosterone, and the treatments for both,
                explained plainly, with every claim graded by its evidence.
                Built to get you to a clinician better informed, never around
                one.
              </p>
              <div className="sos-home__cta">
                <Link href="/learn" className="sos-btn sos-btn--primary">
                  Start where you are
                </Link>
                <Link href="/support" className="sos-btn sos-btn--ghost">
                  Get support now
                </Link>
              </div>
            </div>

            {/* The instrument panel: zip finder, self-check, the Log */}
            <UtilityPanel idPrefix="home" headingHidden />
          </div>

          {/* The signal rail: what this is, in instrument voice. The editorial
              standard lives here as one link, not as a section. */}
          <SignalRail />
        </div>
      </section>

      <div className="sos-home">
        {/* 01 Understand: the situation routes, then the curated four */}
        <section className="sos-home__section" aria-labelledby="home-routes">
          <StepHeader
            id="home-routes"
            step="understand"
            title="Where are you stuck?"
            more={{ href: "/learn", label: `Browse all ${articles.length} in the library →` }}
          >
            Pick the situation closest to yours. Each one opens on the page
            to read first.
          </StepHeader>
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
                    style={crisis ? { color: "var(--sos-emergency-hot)" } : undefined}
                  >
                    {crisis ? "Get support now →" : `Start: ${r.startWith} →`}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="sos-home__sub-head">
            <h3 className="sos-h2">Read these first</h3>
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

        {/* 02 Measure: the instruments */}
        <section className="sos-home__section" aria-labelledby="home-tools">
          <StepHeader
            id="home-tools"
            step="measure"
            title="Turn the worry into a number"
            more={{ href: "/tools", label: "All tools →" }}
          >
            Validated screens and calculators that run in your browser and
            nowhere else. Each ends in a figure you can take to an
            appointment.
          </StepHeader>
          <div className="sos-home__grid sos-home__grid--3">
            {liveTools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="sos-home__tile">
                <span className="sos-kicker">{t.kind}</span>
                <h3 className="sos-home__tile-title">{t.title}</h3>
                <p className="sos-home__tile-body">{t.brief ?? t.blurb}</p>
                <p className="sos-home__tile-foot">Open the {t.kind.toLowerCase()} →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 03 Find care: near me (the utility) and the directory (the trust standard) */}
        <section className="sos-home__section" aria-labelledby="home-care">
          <StepHeader
            id="home-care"
            step="care"
            title="Someone licensed, near you"
            more={{ href: "/map", label: "See the whole map →" }}
          >
            Clinics, prescribers, and licensed pharmacies from public
            registries, ranked by distance and by published trust criteria.
            Never by who pays.
          </StepHeader>
          <div className="sos-home__care">
            <Link href="/map" className="sos-home__map" aria-label="Open the US map">
              {/* A static render of the national hex map (scripts/build-map-preview.mjs):
                  no shard, no h3 library and no map JavaScript on the front door. */}
              <img
                className="sos-home__map-img"
                src="/map/us-preview.svg"
                width={900}
                height={468}
                loading="lazy"
                decoding="async"
                alt="Map of the United States, hex by hex, shaded by the density of testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies and strength gyms"
              />
              <span className="sos-home__map-cap">
                <span className="sos-kicker">The map · every US zip</span>
                <span className="sos-home__map-title">Where care is, and where it&apos;s thin</span>
                <span className="sos-note">
                  Hex by hex: testosterone clinics, GLP-1 prescribers, licensed
                  compounding pharmacies, strength gyms.
                </span>
              </span>
            </Link>
            <div className="sos-home__care-side">
              <form action="/near-me" method="get" className="sos-home__tile sos-home__tile--deep" style={{ cursor: "default" }}>
                <span className="sos-kicker">Near me</span>
                <h3 className="sos-home__tile-title">Who treats this near you</h3>
                <p className="sos-home__tile-body" style={{ flex: "none" }}>
                  Sorted by distance from your zip, with the prices members
                  report paying.
                </p>
                <div className="sos-home__care-form" style={{ marginTop: "6px" }}>
                  <div style={{ flex: "1 1 120px" }}>
                    <label className="sos-label" htmlFor="home-zip-2">
                      Zip code
                    </label>
                    <input
                      id="home-zip-2"
                      name="zip"
                      className="sos-field"
                      inputMode="numeric"
                      pattern="[0-9]{5}"
                      title="A five-digit US zip code"
                      required
                      maxLength={5}
                      placeholder="75201"
                      autoComplete="postal-code"
                    />
                  </div>
                  <button type="submit" className="sos-btn sos-btn--primary" style={{ border: 0, cursor: "pointer" }}>
                    Find
                  </button>
                </div>
              </form>
              <Link href="/directory" className="sos-home__tile">
                <span className="sos-kicker">Directory · licensed only</span>
                <h3 className="sos-home__tile-title">Find a provider</h3>
                <p className="sos-home__tile-body">
                  Labs, telemedicine, and compounding pharmacies, ranked on
                  published trust criteria. Any referral fee is disclosed on
                  the link and never moves a ranking.
                </p>
                <p className="sos-home__tile-foot">See the directory →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 04 Track: the Log, phase one live and browser-local */}
        <section className="sos-home__log" aria-labelledby="home-log">
          <div>
            <StepHeader id="home-log" step="track" title="One protocol, start to finish" className="sos-home__log-head" />
            <p className="sos-prose" style={{ maxWidth: "50ch", fontSize: "17px" }}>
              Record a baseline, follow the protocol as prescribed, and answer
              the same five questions each week. At the end you have one page
              that shows your clinician what changed. It stays on this device
              unless you export it.
            </p>
            <div className="sos-home__cta" style={{ marginTop: "24px" }}>
              <Link href="/log" className="sos-btn sos-btn--primary">
                Open the Log
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
        <div style={{ height: "32px" }} />
      </div>
    </div>
  );
}
