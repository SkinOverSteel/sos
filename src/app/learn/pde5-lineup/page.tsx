import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The PDE5 line-up: sildenafil, tadalafil, and the rest",
  description:
    "Viagra vs Cialis vs the rest, answered. How the four PDE5 inhibitors (sildenafil, tadalafil, vardenafil, avanafil) compare on speed, duration, food, and on-demand vs daily, plus the one hard safety rule they all share.",
  alternates: { canonical: "/learn/pde5-lineup" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The PDE5 line-up: sildenafil, tadalafil, and the rest",
  url: `${SITE.url}/learn/pde5-lineup`,
  description:
    "A comparison of the four PDE5 inhibitors used for erectile dysfunction (sildenafil, tadalafil, vardenafil, and avanafil) across onset, duration, food effect, dosing pattern, and shared safety.",
  about: { "@type": "DrugClass", name: "PDE5 inhibitors" },
  audience: { "@type": "Patient" },
};

const DURATION = [
  { name: "Sildenafil", pct: "15%", window: "≈ 4–6 hrs" },
  { name: "Vardenafil", pct: "15%", window: "≈ 4–6 hrs" },
  { name: "Avanafil", pct: "17%", window: "≈ 6 hrs" },
  { name: "Tadalafil", pct: "100%", window: "up to ~36 hrs" },
];

const ROWS = [
  { drug: "Sildenafil", brand: "Viagra", onset: "~30–60 min", food: "Fatty meals delay it", taken: "On-demand", cost: "Generic: pennies" },
  { drug: "Tadalafil", brand: "Cialis", onset: "~30–45 min", food: "Minimal", taken: "On-demand or low-dose daily", cost: "Generic: cheap" },
  { drug: "Vardenafil", brand: "Levitra", onset: "~30–60 min", food: "High-fat delays it", taken: "On-demand", cost: "Generic: cheap" },
  { drug: "Avanafil", brand: "Stendra", onset: "~15–30 min (fastest)", food: "Minimal", taken: "On-demand", cost: "Newest generic: priciest here" },
];

export default function Pde5LineupPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "pde5-lineup")} />
      <Breadcrumbs slug="pde5-lineup" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The PDE5 line-up: sildenafil, tadalafil, and the rest
      </h1>
      <ArticleMeta slug="pde5-lineup" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        &quot;Viagra or Cialis?&quot; is the most-asked question in this whole
        category, and the honest answer is that they&apos;re{" "}
        <strong>more alike than different</strong>. All four are the same class of
        drug (PDE5 inhibitors), all need arousal to do anything, all are
        prescription, and all are now generic. What actually separates them comes
        down to four things: how fast, how long, whether food matters, and whether
        you take one when you need it or a small dose every day.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          How long the window lasts
        </h2>
        <p className="sos-note" style={{ marginBottom: "18px" }}>
          The single biggest difference between them.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {DURATION.map((d) => (
            <div
              key={d.name}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(84px, 108px) 1fr auto",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--sos-mono)", fontSize: "13px", color: "var(--sos-text-hi)" }}>
                {d.name}
              </span>
              <div className="sos-bar">
                <div className="sos-bar__fill" style={{ width: d.pct }} />
              </div>
              <span style={{ fontFamily: "var(--sos-mono)", fontSize: "12px", color: "var(--sos-text-lo)", whiteSpace: "nowrap" }}>
                {d.window}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The four, side by side
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px", minWidth: "520px" }}>
            <thead>
              <tr>
                {["Drug", "Onset", "Food", "Taken", "Cost"].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.drug}>
                  <td style={td}>
                    <span style={{ color: "var(--sos-text-hi)" }}>{r.drug}</span>
                    <span style={{ color: "var(--sos-text-lo)" }}> · {r.brand}</span>
                  </td>
                  <td style={td}>{r.onset}</td>
                  <td style={td}>{r.food}</td>
                  <td style={td}>{r.taken}</td>
                  <td style={td}>{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The real fork: on-demand vs. daily
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Three of the four are <strong>on-demand</strong>: take one an hour or
          so ahead, get a window of a few hours. Tadalafil can be used that way
          too, but its long half-life means one dose covers most of a weekend,
          and it also comes as a <strong>low daily dose</strong>{" "}that keeps you
          continuously covered and takes the planning out of it entirely (a nice
          side effect: daily tadalafil also eases the urinary symptoms of an
          enlarged prostate). If spontaneity is the goal, that&apos;s usually the
          conversation to have, and it&apos;s part of why{" "}
          <Link href="/learn/pde5-long-term">PDE5 inhibitors, long term</Link>{" "}
          are more than a one-off pill.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What they share, including the one hard rule
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Because they&apos;re one class, they share a side-effect profile:
          headache, facial flushing, a stuffy nose, and indigestion are the
          common ones; sildenafil can add a temporary blue tint to vision. Most
          are mild and fade.
        </p>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            The rule that isn&apos;t optional: <strong>never combine any of them
            with nitrates</strong> (the heart/chest-pain drugs like
            nitroglycerin, or recreational &quot;poppers&quot;). Together they can
            drop blood pressure to a dangerous level. Alpha-blockers for the
            prostate need care too. This is exactly why these stay prescription
            and why the <Link href="/learn/telemedicine-visit">visit</Link>{" "}that
            screens your heart history matters, the same ground covered in{" "}
            <Link href="/learn/pde5-long-term">PDE5 inhibitors, long term</Link>.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Cost: the molecule is cheap now
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Sildenafil and tadalafil went generic years ago and cost close to
          nothing at a transparent pharmacy; vardenafil is generic too. Avanafil
          is the newest to go generic and is still the priciest of the four. The
          gap between a few dollars and a few hundred is markup, not medicine:
          the whole point of{" "}
          <Link href="/learn/generic-pde5-value">generic PDE5, filled for less</Link>{" "}
          and <Link href="/learn/what-it-costs">what it costs</Link>. If you have a
          prescription in hand, you can{" "}
          <Link href="/directory">fill it through a licensed pharmacy</Link>{" "}for a
          fraction of the branded price.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The four are close cousins. The choice usually isn&apos;t about which is
          &quot;strongest&quot;: it&apos;s speed vs. a long window, whether food
          gets in the way, and on-demand vs. daily, matched to how you actually
          live. That&apos;s a five-minute prescriber conversation, and once
          it&apos;s settled the drug is cheap and legitimate, which is exactly why
          there&apos;s no reason to gamble on a{" "}
          <Link href="/learn/product-forms">gas-station or gray-market version</Link>{" "}
          of a pill you can get, real, for pennies.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK549843/" target="_blank" rel="noopener noreferrer">StatPearls: PDE5 Inhibitors</a>; and a{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4542406/" target="_blank" rel="noopener noreferrer">comparative review of the available PDE5 inhibitors</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a dosing guide. Which
          agent fits (and at what dose, if any) is a decision for a licensed
          prescriber who knows your heart history and medications.
        </p>
      </div>

      <Faq slug="pde5-lineup" />
      <RelatedArticles slug="pde5-lineup" />
    </article>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: "11px",
  color: "var(--sos-copper)",
  padding: "0 14px 10px 0",
  borderBottom: "1px solid var(--sos-line)",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  textAlign: "left",
  color: "var(--sos-text-md)",
  padding: "12px 14px 12px 0",
  borderBottom: "1px solid var(--sos-line-soft)",
  verticalAlign: "top",
};
