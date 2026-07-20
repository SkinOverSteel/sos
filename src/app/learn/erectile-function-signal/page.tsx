import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Erectile function is a signal",
  description:
    "Erectile dysfunction is often the earliest visible sign of cardiovascular or metabolic disease — years before a heart attack or diabetes diagnosis. Why the body flags it here first, and why it's a reason to get a workup.",
  alternates: { canonical: "/learn/erectile-function-signal" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Erectile function is a signal",
  url: `${SITE.url}/learn/erectile-function-signal`,
  description:
    "Erectile dysfunction as an early marker of cardiovascular and metabolic disease, and why it warrants a medical workup.",
  about: { "@type": "MedicalCondition", name: "Erectile dysfunction" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function SignalPage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Why it matters</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Erectile function is a signal
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

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        An erection is a vascular event — it depends on healthy blood vessels and
        the nitric-oxide signaling that opens them. So when it starts to fail,
        the body is often reporting a problem that reaches far beyond the bedroom.
        For a lot of men, erectile dysfunction is the{" "}
        <strong>first visible sign</strong> of a vascular or metabolic disease
        that hasn&apos;t announced itself anywhere else yet. That&apos;s why we
        treat it as a signal — one worth answering.
      </p>

      <Section title="Why the signal shows up here first">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The same lining that runs through your heart&apos;s arteries — the
          endothelium — runs through the arteries of the penis. When that lining
          starts to stiffen or fur with plaque, blood flow suffers everywhere.
          But the penile arteries are <strong>smaller</strong>, so they choke
          first. The result can precede chest symptoms by years.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          In other words, ED and cardiovascular disease are often two faces of{" "}
          <em>the same underlying disorder</em> — systemic endothelial
          dysfunction — showing up in the most sensitive place first.
        </p>
      </Section>

      <Section title="What it can be warning about">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Cardiovascular disease
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Research consistently finds ED often precedes cardiovascular
              disease by roughly <strong>2–5 years</strong> — a window in which
              risk can actually be measured and lowered. Guidelines increasingly
              treat new ED (especially in a younger or otherwise-healthy man) as a
              prompt to screen for cardiovascular risk factors.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Metabolic disease — insulin resistance &amp; diabetes
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Insulin resistance impairs the same nitric-oxide signaling, and it
              tracks with low testosterone and low SHBG — a relationship that runs
              both directions. ED can be the first clinical sign of insulin
              resistance and metabolic syndrome, sometimes well before a diabetes
              diagnosis.
            </p>
          </div>
        </div>
      </Section>

      <Section title="This is the smart-move part">
        <p className="sos-prose">
          The point isn&apos;t alarm — it&apos;s leverage. A symptom that shows up
          early is a <strong>gift of time</strong> if you act on it. Treating the
          erection in isolation — a pill, a peptide, an injection — without asking
          what it&apos;s signaling is treating the smoke and ignoring the fire.
          The strong move is to bring it to a clinician and get screened. No
          shame in it; it&apos;s exactly the conversation your urologist
          doesn&apos;t always have time for.
        </p>
      </Section>

      <Section title="What a workup usually looks at">
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Androgen panel:</strong> total and free testosterone, SHBG.
          </li>
          <li>
            <strong>Metabolic / insulin markers:</strong> fasting glucose,
            fasting insulin, HbA1c, a lipid panel — and sometimes hs-CRP.
          </li>
          <li>
            <strong>The basics that get skipped:</strong> blood pressure, weight,
            and a real conversation about the whole picture.
          </li>
          <li>
            Curious what that costs and how to get value?{" "}
            <Link href="/learn/what-it-costs">What it costs</Link> walks the
            price of the workup and the rest of the stack.
          </li>
        </ul>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          Erectile function is one of the most honest readouts of vascular and
          metabolic health a man gets — and it often speaks first. Answer the
          signal: get the workup, treat the cause, and let the symptom improve
          because the system underneath it did.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.mayoclinic.org/diseases-conditions/erectile-dysfunction/in-depth/erectile-dysfunction/art-20045141" target="_blank" rel="noopener noreferrer">Mayo Clinic — ED: a sign of heart disease?</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/24011423/" target="_blank" rel="noopener noreferrer">systematic review of ED &amp; cardiovascular disease</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9405076/" target="_blank" rel="noopener noreferrer">review of endothelial dysfunction, ED &amp; CVD</a>; and{" "}
          <a href="https://diabetesjournals.org/care/article/34/7/1669/38648/Low-Testosterone-Associated-With-Obesity-and-the" target="_blank" rel="noopener noreferrer">Diabetes Care — low testosterone, metabolic syndrome &amp; T2D</a>.
        </p>
        <p className="sos-note">
          This is general education, not medical advice, and not a substitute for
          evaluation by a licensed clinician. If you have new or worsening
          erectile difficulty, see a clinician — it&apos;s worth a real workup.
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
