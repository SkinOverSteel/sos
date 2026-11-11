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
  title: "The pelvic floor and erections",
  description:
    "What the pelvic-floor muscles do for rigidity and ejaculation, what the randomized evidence for pelvic-floor exercises in erectile dysfunction actually shows, why assessment matters before Kegels, and why aggressive DIY routines can backfire.",
  alternates: { canonical: "/learn/pelvic-floor-and-erections" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The pelvic floor and erections",
  url: `${SITE.url}/learn/pelvic-floor-and-erections`,
  description:
    "A patient's guide to the role of the pelvic-floor muscles in erection and ejaculation, the limited randomized evidence for pelvic-floor muscle exercises in erectile dysfunction, and why supervised assessment beats self-directed routines.",
  about: { "@type": "MedicalCondition", name: "Pelvic floor muscle function" },
  audience: { "@type": "Patient" },
};

export default function PelvicFloorPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "pelvic-floor-and-erections")} />
      <Breadcrumbs slug="pelvic-floor-and-erections" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Foundations</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The pelvic floor and erections
      </h1>
      <ArticleMeta
        slug="pelvic-floor-and-erections"
        gradeNote="One good RCT plus smaller studies support pelvic-floor exercise for ED; the evidence is real but limited, hence Emerging."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        There&apos;s a layer of muscle at the base of the penis that most men
        never think about, and it does real work during an erection. It&apos;s
        also the subject of a lot of online promises, some of them overblown and
        a few of them risky. Here&apos;s what these muscles actually do, what the
        evidence for training them genuinely shows, and why &ldquo;just do
        Kegels&rdquo; is not quite the right advice.
      </p>

      <KeyTakeaways
        items={[
          <>The pelvic-floor muscles help <strong>press the draining veins shut</strong>, supporting rigidity and a firmer, upward angle &mdash; and they&apos;re central to ejaculation control.</>,
          <>A randomized trial found pelvic-floor exercises <strong>improved erectile function</strong> in a meaningful share of men. The evidence is real but limited.</>,
          <>The muscles can be <strong>too weak or too tense</strong>, and those need opposite approaches &mdash; which is why assessment comes before exercises.</>,
          <>Aggressive, self-invented routines can make things worse. Supervision by a <strong>pelvic-floor physical therapist</strong> is the safe version.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What these muscles do
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          When an erection forms, blood fills the chambers and the penis presses
          the draining veins shut to trap it &mdash; the{" "}
          <Link href="/learn/how-an-erection-works">veno-occlusive step</Link>.
          The pelvic-floor muscles (chiefly the ischiocavernosus and
          bulbospongiosus, wrapped around the base) add to that: when they
          contract, they raise the pressure inside the erection and help pin the
          veins, which supports a rigid, upward-pointing erection and helps hold
          it. They also fire rhythmically during ejaculation, which is why
          they&apos;re tied to ejaculatory control as well as rigidity. In short,
          they&apos;re part of the holding job, not the getting job.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the evidence actually shows
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          This is where honesty matters, because the online claims run ahead of
          the data. The strongest single piece of evidence is a randomized
          controlled trial: men with erectile dysfunction who did pelvic-floor
          muscle exercises with biofeedback and lifestyle advice improved
          significantly more than controls on a standard erectile-function score,
          and after six months a portion had regained normal function while
          others improved partially and some didn&apos;t respond. That&apos;s a
          genuinely encouraging result for a zero-drug, low-risk intervention
          &mdash; and it&apos;s also one modest trial plus some smaller studies,
          not a mountain of proof. Hence the <strong>Emerging</strong> grade: worth
          trying, not a guaranteed fix, and better for some causes of ED (notably
          when outflow and pelvic-floor weakness are in play) than others.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why &ldquo;just do Kegels&rdquo; is incomplete
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          A pelvic floor can fail in two opposite ways. It can be too{" "}
          <em>weak</em> to assist the trap &mdash; the case the exercises are
          meant for. Or it can be too <em>tense</em>, chronically overactive, which
          is a feature of some pelvic-pain presentations and is thought to play a
          role in <Link href="/learn/hard-flaccid">hard flaccid syndrome</Link>.
          Those need opposite work: strengthening in one case, down-training and
          release in the other. Pile strengthening onto an already over-tight
          floor and you can entrench the problem. That&apos;s the whole reason
          assessment should come before a routine.
        </p>
        <Callout label="Get assessed before you train">
          <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
            A <strong>pelvic-floor physical therapist</strong> can tell which
            kind of floor you have and coach the technique so you&apos;re actually
            contracting the right muscles (most people cue it wrong at first).
            That&apos;s the safe, evidence-aligned version. Chasing an aggressive
            self-made protocol from a video is how some men make a minor issue a
            bigger one.
          </p>
        </Callout>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The pelvic floor is a real, trainable part of the erection, and gentle,
          correctly taught exercise is a reasonable, low-risk thing to try &mdash;
          ideally alongside the rest of a workup rather than instead of it. Treat
          it as one useful lever with modest evidence, get it assessed before you
          start, and be skeptical of anyone promising it as a cure.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/15527607/" target="_blank" rel="noopener noreferrer">Dorey G, et al. Randomised controlled trial of pelvic floor muscle exercises and manometric biofeedback for erectile dysfunction, Br J Gen Pract 2004;54(508):819&ndash;825</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/16104916/" target="_blank" rel="noopener noreferrer">Dorey G, et al. Pelvic floor exercises for erectile dysfunction, BJU Int 2005</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK513278/" target="_blank" rel="noopener noreferrer">StatPearls: Physiology, Erection</a>{" "}(the veno-occlusive role of the pelvic muscles).
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a prescription to
          self-train. Whether exercises fit your situation, and how to do them
          safely, belong to a clinician and ideally a pelvic-floor physical
          therapist who can assess you.
        </p>
      </div>

      <Faq slug="pelvic-floor-and-erections" />
      <RelatedArticles slug="pelvic-floor-and-erections" />
    </article>
  );
}
