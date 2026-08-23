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
  title: "Premature ejaculation, honestly",
  description:
    "Premature ejaculation is the most common male sexual concern, and one of the most treatable. The difference between lifelong and acquired PE, why it so often tracks with erectile function, and the behavioral and medical options that actually work.",
  alternates: { canonical: "/learn/premature-ejaculation" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Premature ejaculation, honestly",
  url: `${SITE.url}/learn/premature-ejaculation`,
  description:
    "Lifelong vs acquired premature ejaculation, its link to erectile dysfunction, and the behavioral and pharmacological treatments supported by guidelines.",
  about: { "@type": "MedicalCondition", name: "Premature ejaculation" },
  audience: { "@type": "Patient" },
};

export default function PrematureEjaculationPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "premature-ejaculation")} />
      <Breadcrumbs slug="premature-ejaculation" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Conditions</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Premature ejaculation, honestly
      </h1>
      <ArticleMeta slug="premature-ejaculation" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        It&apos;s the most common sexual concern men actually raise with a
        clinician, and one of the most treatable. Premature ejaculation
        isn&apos;t a character flaw or a verdict on anyone; it&apos;s a medical
        pattern with understood mechanisms and real options. The first useful
        move is figuring out <em>which kind</em>{" "}it is, because that points at
        what to do.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "14px",
          marginBottom: "8px",
        }}
      >
        <div className="sos-card">
          <p className="sos-kicker" style={{ marginBottom: "10px" }}>
            <b>Lifelong</b> · primary
          </p>
          <p className="sos-prose" style={{ fontSize: "15.5px" }}>
            There from the start: since you first became sexually active, almost
            always within about a minute. Usually reflects how the ejaculatory
            reflex is <strong>wired</strong>{" "}(serotonin signaling), not something
            that broke.
          </p>
        </div>
        <div className="sos-card">
          <p className="sos-kicker" style={{ marginBottom: "10px" }}>
            <b>Acquired</b> · secondary
          </p>
          <p className="sos-prose" style={{ fontSize: "15.5px" }}>
            New, or newly worse. A latency that used to be normal has shortened.
            This kind more often has a specific, <strong>treatable driver</strong>{" "}
            behind it, which is the good news.
          </p>
        </div>
      </div>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the type matters
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Lifelong PE tends to be about the body&apos;s baseline set-point.
          Acquired PE is a <em>change</em>, and changes have causes: thyroid
          problems, prostate inflammation, anxiety, and, very commonly, erectile
          trouble. Sorting the type is the first thing a workup does, because it
          decides what&apos;s worth chasing.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The erection connection
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Here&apos;s the link most men miss: when erections are unreliable, the
          body learns to <strong>rush</strong>, finishing quickly before the
          erection fades. Treat the underlying erectile dysfunction and the
          premature ejaculation often eases on its own. That&apos;s why a real
          evaluation checks both at once: the same{" "}
          <Link href="/learn/ed-workup">workup</Link>{" "}that treats{" "}
          <Link href="/learn/erectile-function-signal">erectile function as a signal</Link>{" "}
          is where this gets untangled, and why{" "}
          <Link href="/learn/pde5-long-term">PDE5 treatment</Link>{" "}sometimes
          improves the timing too.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What actually helps
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The honest headline: this responds to treatment, often well. Clinical
          guidelines draw from a few levers (used alone, but frequently{" "}
          <strong>combined</strong>, which tends to beat any one of them):
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Behavioral approaches.</strong>{" "}The stop-start and squeeze
            techniques train recognition of the point of no return; pelvic-floor
            work can help too. A clinician or sex therapist teaches these
            properly. That&apos;s the difference between a technique and a tip.
          </li>
          <li>
            <strong>Topical anesthetics.</strong>{" "}A cream or spray that gently
            dials down sensitivity, applied before sex.
          </li>
          <li>
            <strong>Prescription options.</strong>{" "}Certain antidepressants
            (SSRIs) delay ejaculation as a class effect, daily or on-demand
            depending on the agent. Whether, and which, is a prescriber&apos;s
            call matched to your pattern, not a self-serve decision.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          What none of this needs is a dose from a stranger on the internet. It
          needs someone who confirmed the type, ruled out a fixable cause, and
          matched the option to your goals: the substance of a real visit.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Common, treatable, medical: three facts that between them dissolve most
          of the shame around premature ejaculation. The move isn&apos;t a
          lifetime of workarounds or a mystery pill; it&apos;s a conversation that
          sorts the type, checks for a fixable cause, and matches a treatment to
          it. A clinician (or a{" "}
          <Link href="/learn/telemedicine-visit">telemedicine visit that actually evaluates you</Link>){" "}
          can start that today.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/disorders-of-ejaculation" target="_blank" rel="noopener noreferrer">AUA/SMSNA Disorders of Ejaculation Guideline</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4184677/" target="_blank" rel="noopener noreferrer">ISSM Guidelines for the Diagnosis &amp; Treatment of PE</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK546701/" target="_blank" rel="noopener noreferrer">StatPearls: Premature Ejaculation</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a dosing guide. Which
          treatment fits (and at what dose, if any) is a decision for a licensed
          clinician who knows your history.
        </p>
      </div>

      <Faq slug="premature-ejaculation" />
      <RelatedArticles slug="premature-ejaculation" />
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
