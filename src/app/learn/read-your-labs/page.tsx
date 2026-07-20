import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Read your labs",
  description:
    "Decode a men's health workup: total & free testosterone, SHBG, LH/FSH, estradiol, prolactin, fasting glucose/insulin, HbA1c, HOMA-IR, and hs-CRP — what each marker means and why context matters.",
  alternates: { canonical: "/learn/read-your-labs" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Read your labs",
  url: `${SITE.url}/learn/read-your-labs`,
  description:
    "A plain-language decoder for the hormone and metabolic markers in a men's health workup.",
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

type Marker = { name: string; range?: string; body: React.ReactNode };

const HORMONES: Marker[] = [
  {
    name: "Total testosterone",
    range: "low if < ~300 ng/dL",
    body: (
      <>
        The headline number — but one value isn&apos;t a diagnosis. Because it
        swings by time of day and day to day, guidelines call for{" "}
        <strong>two early-morning (8–10 AM) draws</strong> on separate days
        before anyone concludes it&apos;s low.
      </>
    ),
  },
  {
    name: "Free / bioavailable testosterone",
    range: "assay-dependent",
    body: (
      <>
        The fraction actually available to your tissues. Most useful when total T
        is borderline, or when symptoms don&apos;t match the total — especially if
        SHBG is off. Not the primary diagnostic on its own.
      </>
    ),
  },
  {
    name: "SHBG",
    body: (
      <>
        The carrier protein that binds testosterone. High SHBG (aging, thyroid)
        ties up more T and lowers the free fraction; <strong>low SHBG tracks with
        insulin resistance and excess weight</strong> — so it&apos;s also a
        metabolic tell, not just a hormone footnote.
      </>
    ),
  },
  {
    name: "LH & FSH",
    body: (
      <>
        The pituitary&apos;s signals. If testosterone is low, these say{" "}
        <em>where</em> the problem is: high LH/FSH means the testes aren&apos;t
        responding (primary); low-or-normal LH/FSH with low T means the signal
        from the brain is down (secondary). It changes the whole workup.
      </>
    ),
  },
  {
    name: "Estradiol (E2)",
    body: (
      <>
        Men need some estrogen — it&apos;s made from testosterone. Measured with a
        sensitive assay; both too-low and too-high cause problems, so it&apos;s
        read in context, not chased to a number.
      </>
    ),
  },
  {
    name: "Prolactin",
    body: (
      <>
        High prolactin can suppress testosterone and cause ED — occasionally from
        a benign pituitary tumor — so it belongs in a low-T workup.
      </>
    ),
  },
];

const METABOLIC: Marker[] = [
  {
    name: "Fasting glucose",
    range: "100–125 pre / ≥126 diabetes (mg/dL)",
    body: "A single snapshot of blood sugar after an overnight fast. Useful, but it moves later than insulin does.",
  },
  {
    name: "HbA1c",
    range: "5.7–6.4% pre / ≥6.5% diabetes",
    body: "Your roughly three-month average blood sugar. The standard screen for prediabetes and diabetes (American Diabetes Association criteria).",
  },
  {
    name: "Fasting insulin + HOMA-IR",
    range: "HOMA-IR ≳ 2.5 suggests resistance",
    body: (
      <>
        The early-warning pair. Insulin can run <strong>high while glucose still
        looks normal</strong> — the body compensating before sugar rises. HOMA-IR
        combines fasting insulin and glucose into one insulin-resistance estimate,
        and it often moves years before HbA1c does.
      </>
    ),
  },
  {
    name: "Lipid panel",
    body: "Standard cardiovascular risk — total, LDL, HDL, triglycerides. Triglycerides in particular track with insulin resistance.",
  },
  {
    name: "hs-CRP",
    range: "<1 low · 1–3 avg · >3 high (mg/L)",
    body: "A marker of low-grade inflammation used for cardiovascular risk. Above 10 usually means an active infection — ignore it for risk until it settles.",
  },
];

const SAFETY: Marker[] = [
  {
    name: "PSA",
    body: "A prostate baseline your clinician establishes and monitors — particularly before and during testosterone therapy.",
  },
  {
    name: "Hematocrit / CBC",
    body: "Testosterone therapy can thicken the blood by raising red-cell count, so hematocrit is a baseline and a monitored safety marker — not something to read in isolation.",
  },
];

export default function ReadYourLabsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Read your labs
      </h1>
      <EvidenceBadge grade="established" />

      <div className="sos-morse" style={{ margin: "34px 0" }} aria-hidden="true">
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

      <p className="sos-prose" style={{ marginBottom: "16px" }}>
        You did the smart thing and{" "}
        <Link href="/learn/erectile-function-signal">got the workup</Link>. Now
        the results are a wall of numbers with reference ranges. Here&apos;s what
        the ones that matter actually mean — enough to have a real conversation
        with your clinician, not to diagnose yourself.
      </p>
      <p className="sos-note" style={{ marginBottom: "44px" }}>
        Reference ranges vary by lab and assay. A value outside the range
        isn&apos;t automatically a problem, and one inside isn&apos;t automatically
        fine — symptoms, trend, and the whole picture decide, and that reading is
        your clinician&apos;s job.
      </p>

      <MarkerGroup title="The hormones" markers={HORMONES} />
      <MarkerGroup title="The metabolism (the drivers underneath)" markers={METABOLIC} />
      <MarkerGroup title="Safety baselines (before & during treatment)" markers={SAFETY} />

      <Section title="How to actually read it">
        <ul className="sos-prose" style={list}>
          <li>
            <strong>One number is a data point, not a verdict.</strong> Hormones
            especially need repeat, early-morning testing.
          </li>
          <li>
            <strong>Watch the trend.</strong> Retesting over time tells you more
            than any single panel — and keeps you on the smallest plan that works
            (see <Link href="/learn/what-it-costs">what it costs</Link>).
          </li>
          <li>
            <strong>The metabolic markers often speak first.</strong> Rising
            fasting insulin and falling SHBG can flag trouble long before glucose
            or testosterone look abnormal.
          </li>
        </ul>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          Your labs are a map, not a diagnosis. Knowing what each marker measures
          turns a passive handoff into a real conversation — you can ask better
          questions, catch the metabolic story early, and make decisions with your
          clinician instead of around them.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Thresholds drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline" target="_blank" rel="noopener noreferrer">AUA Testosterone Deficiency Guideline</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK532933/" target="_blank" rel="noopener noreferrer">StatPearls: Male Hypogonadism</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK278954/" target="_blank" rel="noopener noreferrer">Endotext: Assessing Insulin Sensitivity (HOMA-IR)</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8280753/" target="_blank" rel="noopener noreferrer">C-reactive protein in risk stratification</a>. Glucose/HbA1c thresholds per the American Diabetes Association.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a diagnostic tool.
          Interpret your results with a licensed clinician who knows your history.
        </p>
      </div>
    </article>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}

function MarkerGroup({ title, markers }: { title: string; markers: Marker[] }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {markers.map((m) => (
          <div key={m.name} className="sos-card">
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
              <span className="sos-h2" style={{ fontSize: "15px", textTransform: "none" }}>
                {m.name}
              </span>
              {m.range && (
                <span
                  style={{
                    fontFamily: "var(--sos-mono)",
                    fontSize: "12.5px",
                    color: "var(--sos-copper)",
                  }}
                >
                  {m.range}
                </span>
              )}
            </div>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              {m.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
