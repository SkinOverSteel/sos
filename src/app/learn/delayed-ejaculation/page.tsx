import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { Callout } from "@/components/Callout";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delayed ejaculation: when the finish line keeps moving",
  description:
    "Delayed ejaculation and anejaculation, the under-served mirror of premature ejaculation: the recognized definition, the common causes (the medication list first), what a workup looks for, and why no treatment is FDA-approved.",
  alternates: { canonical: "/learn/delayed-ejaculation" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Delayed ejaculation: when the finish line keeps moving",
  url: `${SITE.url}/learn/delayed-ejaculation`,
  description:
    "A patient's guide to delayed ejaculation and anejaculation: the AUA/SMSNA definition, the leading causes (SSRIs and other medications, neurologic, hormonal, and psychogenic), the workup, and the off-label, limited state of treatment.",
  about: { "@type": "MedicalCondition", name: "Delayed ejaculation" },
  audience: { "@type": "Patient" },
};

export default function DelayedEjaculationPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "delayed-ejaculation")} />
      <Breadcrumbs slug="delayed-ejaculation" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Conditions</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Delayed ejaculation: when the finish line keeps moving
      </h1>
      <ArticleMeta
        slug="delayed-ejaculation"
        gradeNote="The condition is recognized in guidelines; effective treatment is limited and entirely off-label, hence Emerging."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        <Link href="/learn/premature-ejaculation">Premature ejaculation</Link>{" "}
        gets all the attention. Its opposite &mdash; taking a very long time to
        finish, or not finishing at all &mdash; is the one men tend to mention
        last, if ever, usually after everything else has been covered. It&apos;s
        a real, recognized condition, it&apos;s often <em>fixable once it&apos;s
        named</em>, and the single most common cause is sitting in the medicine
        cabinet.
      </p>

      <KeyTakeaways
        items={[
          <>Delayed ejaculation is a consistent, bothersome difficulty reaching ejaculation despite enough stimulation and the <em>desire</em> to finish. Its fullest form is anejaculation.</>,
          <><strong>Check the medication list first.</strong> SSRIs are the most common identifiable cause; antipsychotics, opioids and some others contribute.</>,
          <>Other causes: neurologic (diabetes, nerve injury, pelvic surgery), hormonal (low testosterone, thyroid), and psychogenic.</>,
          <><strong>No drug is FDA-approved for it.</strong> Everything tried is off-label with limited evidence &mdash; which is why the honest first move is finding a reversible cause, not stacking a pill.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it actually is
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          The AUA/SMSNA guideline describes acquired delayed ejaculation as a
          consistent, bothersome inability to ejaculate, or a markedly longer
          time to get there, despite adequate stimulation and the desire to
          finish. Those last two clauses matter: this isn&apos;t about low
          interest (that&apos;s{" "}
          <Link href="/learn/low-desire-vs-ed">low desire</Link>), and it
          isn&apos;t about an unreliable erection (that&apos;s{" "}
          <Link href="/learn/ed-workup">ED</Link>). The arousal and the erection
          are working; the reflex at the end isn&apos;t firing. In its fullest
          form, anejaculation, it doesn&apos;t happen at all.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          It can be lifelong or acquired, and it can be global (every situation)
          or situational (fine solo, stuck with a partner, or the reverse). That
          pattern is diagnostic gold for a clinician, so it&apos;s worth noticing
          before the appointment.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The causes, roughly in the order worth checking
        </h2>
        <ul className="sos-prose" style={{ fontSize: "16px", paddingLeft: "22px", marginBottom: "18px", display: "grid", gap: "10px" }}>
          <li>
            <strong>Medications &mdash; start here.</strong> SSRIs are the most
            common identifiable cause (the effect is common enough that they&apos;re
            used deliberately to slow premature ejaculation). Antipsychotics,
            opioids, and some blood-pressure drugs add to the list.
          </li>
          <li>
            <strong>Neurologic.</strong> Diabetes, multiple sclerosis, spinal-cord
            or nerve injury, and the aftermath of pelvic or prostate surgery can
            all blunt the ejaculatory reflex.
          </li>
          <li>
            <strong>Hormonal.</strong> Low testosterone and thyroid problems can
            contribute, which is part of why a workup usually includes blood work.
          </li>
          <li>
            <strong>Psychogenic and situational.</strong> Anxiety, a large gap
            between masturbation style and partnered sex, or relationship stress
            can all play a role.
          </li>
          <li>
            <strong>Aging.</strong> Some lengthening of the time to ejaculate is a
            normal part of getting older; it only becomes a &ldquo;disorder&rdquo;
            when it&apos;s consistent and bothersome.
          </li>
        </ul>
        <Callout label="The medication conversation is a prescriber conversation">
          <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
            The guideline&apos;s advice when a drug is the likely culprit is to
            discuss a dose adjustment, a switch, or a staged change with the
            prescriber. The emphasis is deliberate: stopping an antidepressant
            abruptly on your own can be genuinely harmful. Bring it up, don&apos;t
            self-adjust.
          </p>
        </Callout>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The honest part: treatment
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Here&apos;s why this page carries the <strong>Emerging</strong> grade.
          The condition is well recognized, but <em>no medication is FDA-approved
          to treat it.</em> The drugs that get tried &mdash; bupropion,
          cabergoline, bethanechol, oxytocin, and others &mdash; are all
          off-label, and the evidence behind them is limited. That&apos;s not a
          reason to despair; it&apos;s a reason to go after the <em>reversible</em>{" "}
          causes first. For a great many men, the fix is a medication change or
          treating a hormonal issue, not adding another drug on top.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          When testosterone is genuinely low, normalizing it is a reasonable,
          guideline-mentioned step. Beyond that, a clinician may trial an
          off-label agent, and a sex therapist can help with the psychogenic and
          situational threads. The through-line is the same as the rest of this
          library: test and understand before you treat.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/disorders-of-ejaculation" target="_blank" rel="noopener noreferrer">Disorders of Ejaculation: An AUA/SMSNA Guideline</a>{" "}(
          <a href="https://pubmed.ncbi.nlm.nih.gov/34961344/" target="_blank" rel="noopener noreferrer">J Urol 2022, PMID 34961344</a>), which defines delayed ejaculation, lists the contributing medications, and states that the pharmacotherapy options are off-label and none are FDA-approved.
        </p>
        <p className="sos-note">
          General education, not medical advice. What&apos;s causing it, whether a
          medication is involved, and what to try belong to a licensed clinician
          who can examine you and knows your history &mdash; and no antidepressant
          should be changed without your prescriber. If something feels wrong,{" "}
          <Link href="/support">get support now</Link>.
        </p>
      </div>

      <Faq slug="delayed-ejaculation" />
      <RelatedArticles slug="delayed-ejaculation" />
    </article>
  );
}
