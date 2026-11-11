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
  title: "Morning erections: the signal you wake up with",
  description:
    "What nighttime and morning erections are, why they happen during REM sleep largely independent of desire, what it means when they stop, what it doesn't prove on its own, and how this everyday signal differs from the formal overnight test.",
  alternates: { canonical: "/learn/morning-erections" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Morning erections: the signal you wake up with",
  url: `${SITE.url}/learn/morning-erections`,
  description:
    "A patient's guide to nocturnal and morning erections: their REM-sleep origin, why they are largely independent of desire, what losing them can and cannot indicate, and how they relate to formal nocturnal penile tumescence testing.",
  about: { "@type": "MedicalCondition", name: "Nocturnal penile tumescence" },
  audience: { "@type": "Patient" },
};

export default function MorningErectionsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "morning-erections")} />
      <Breadcrumbs slug="morning-erections" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Foundations</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Morning erections: the signal you wake up with
      </h1>
      <ArticleMeta slug="morning-erections" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        The erection you occasionally wake up with has nothing to do with the
        dream you were having or how the morning is going. It&apos;s the last of
        several that happened quietly all night, and because they run on autopilot
        &mdash; no desire required &mdash; they&apos;re one of the most honest
        readouts you have of whether the erectile machinery is in working order.
        Which is exactly why their <em>disappearance</em> is worth understanding.
      </p>

      <KeyTakeaways
        items={[
          <>Nighttime erections happen during <strong>REM sleep</strong>, several times a night, largely independent of sexual thoughts.</>,
          <>Because they don&apos;t need desire or a partner, a steady presence is a <strong>reassuring sign</strong> the plumbing and wiring work.</>,
          <>A consistent <em>loss</em> over weeks can be an early physical clue &mdash; but on its own it <strong>proves nothing</strong>; sleep and stress affect whether you notice one.</>,
          <>This everyday signal is the informal cousin of the formal <Link href="/learn/nocturnal-tumescence-testing">overnight (NPT) test</Link> a clinician can order.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What they actually are
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Several times a night, during REM sleep, the body cycles through
          erections automatically &mdash; a phenomenon doctors call nocturnal
          penile tumescence. Most healthy men have several per night, each
          lasting some minutes; you simply sleep through nearly all of them and
          happen to notice the one still present when you wake. They&apos;re
          driven by the nervous system&apos;s overnight rhythm, not by arousal,
          which is the whole reason they&apos;re useful: they test the{" "}
          <Link href="/learn/how-an-erection-works">hardware</Link> with the
          psychology taken out of the equation.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Testosterone helps set their strength and frequency, and good blood
          flow and healthy nerves make them possible &mdash; so when they&apos;re
          regularly firm, it suggests those systems are broadly intact.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it means if they stop
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          A clear, sustained decline is the part worth noticing. Because these
          erections bypass desire and circumstance, losing them can be an early
          flag that something <em>physical</em> has shifted &mdash; blood flow,
          nerve signaling, or testosterone &mdash; sometimes before daytime
          erections obviously falter. That makes it a genuinely useful thing to
          mention to a clinician.
        </p>
        <Callout label="What it does not prove">
          <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
            One quiet morning means nothing. Poor sleep, alcohol, stress,
            depression, and simply not waking during a REM cycle all affect
            whether you notice an erection, so the signal is about the{" "}
            <strong>trend over weeks</strong>, not any single day. And the reverse
            is only a hint, not a verdict: regularly waking firm suggests the
            hardware can work and points attention toward anxiety or context, but
            it&apos;s not reliable enough to settle the question by itself.
          </p>
        </Callout>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The everyday signal vs. the real test
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Your own observation is a rough gauge; it isn&apos;t a diagnosis.
          When the physical-versus-psychological question genuinely needs
          answering, clinicians don&apos;t rely on what you remember noticing
          &mdash; they can use a formal{" "}
          <Link href="/learn/nocturnal-tumescence-testing">nocturnal penile
          tumescence test</Link>, which measures the erections objectively
          overnight. Think of your morning erections as the free, low-resolution
          version: good for spotting a trend and starting a conversation, not for
          drawing conclusions. Where that conversation leads is the{" "}
          <Link href="/learn/ed-workup">full workup</Link>.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK513278/" target="_blank" rel="noopener noreferrer">StatPearls: Physiology, Erection</a>{" "}(nocturnal erections and their REM-sleep basis); and the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>. For the formal overnight test, see{" "}
          <Link href="/learn/nocturnal-tumescence-testing">nocturnal tumescence testing</Link>.
        </p>
        <p className="sos-note">
          General education, not medical advice. A single observation is not a
          diagnosis; a consistent change over weeks is worth raising with a
          clinician who can examine you and knows your history.
        </p>
      </div>

      <Faq slug="morning-erections" />
      <RelatedArticles slug="morning-erections" />
    </article>
  );
}
