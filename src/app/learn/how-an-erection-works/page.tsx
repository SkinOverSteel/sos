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
  title: "How an erection actually works",
  description:
    "The plumbing and the wiring in plain terms: the nerve signal, nitric oxide relaxing smooth muscle, arterial inflow, and the veno-occlusive trapping that holds an erection. Why it's a vascular event first, and how each step maps to where things go wrong.",
  alternates: { canonical: "/learn/how-an-erection-works" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "How an erection actually works",
  url: `${SITE.url}/learn/how-an-erection-works`,
  description:
    "A patient's primer on the physiology of erection: the neural trigger, nitric-oxide-driven smooth-muscle relaxation, arterial inflow into the corpora cavernosa, and the veno-occlusive mechanism that traps blood, plus where testosterone and the brain fit.",
  about: { "@type": "MedicalCondition", name: "Erectile function" },
  audience: { "@type": "Patient" },
};

export default function HowAnErectionWorksPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "how-an-erection-works")} />
      <Breadcrumbs slug="how-an-erection-works" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Foundations</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        How an erection actually works
      </h1>
      <ArticleMeta slug="how-an-erection-works" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        Almost every problem the rest of this library covers is a breakdown at
        one specific step of a process most men never had explained to them. So
        here&apos;s the whole thing, start to finish &mdash; the wiring and the
        plumbing &mdash; in plain language. Once you can see the steps, you can
        see <em>where</em> yours is failing, and why a given treatment targets
        the part it does.
      </p>

      <KeyTakeaways
        items={[
          <>An erection is a <strong>vascular event</strong> run by the nervous system: arousal opens a valve, blood does the rest.</>,
          <>The on-switch is <strong>nitric oxide</strong>, which relaxes the smooth muscle inside the penis so blood can pour in.</>,
          <>Rigidity needs <strong>two jobs</strong>: strong inflow, and then trapping that blood by sealing the veins shut.</>,
          <>Testosterone and the brain set the stage (desire, tissue health), but the single erection is mostly <strong>arteries, nerves, and smooth muscle</strong>.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The anatomy, in one paragraph
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The penis has two spongy cylinders running its length, the{" "}
          <strong>corpora cavernosa</strong>, wrapped in a tough fibrous sheath
          called the <strong>tunica albuginea</strong>. Those cylinders are full
          of tiny blood spaces lined with smooth muscle. At rest, that muscle is
          contracted, the spaces are squeezed small, and only a little blood
          passes through &mdash; the penis is soft. An erection is what happens
          when that muscle relaxes and the spaces fill. Everything below is just
          the story of how that relaxation is switched on and how the blood is
          then kept in.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The sequence
        </h2>

        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">The signal</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Arousal &mdash; from touch, sight, thought, or the reflexes of
                sleep &mdash; sends nerve signals down the spinal cord to the
                nerves of the penis. This is the wiring. If the nerves are
                damaged (by diabetes, or by{" "}
                <Link href="/learn/post-prostatectomy-rehabilitation">prostate surgery</Link>),
                the message never fully arrives, no matter how strong the desire.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">The chemical switch: nitric oxide</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Those nerves (and the vessel lining itself) release{" "}
                <strong>nitric oxide</strong>. It&apos;s the on-switch: it tells
                the smooth muscle inside the chambers to relax. This is the exact
                step <Link href="/learn/pde5-lineup">PDE5 pills</Link> protect
                &mdash; they don&apos;t create an erection, they keep the
                nitric-oxide signal working longer, which is why they still need
                real arousal to do anything.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">3</div>
            <div>
              <p className="sos-step__title">The inflow</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                With the muscle relaxed, the arteries feeding the chambers open
                wide and blood rushes in, far faster than it normally would. The
                spongy spaces expand and the penis begins to swell and stiffen.
                This is the first of the two jobs: <strong>getting blood in</strong>.
                Narrowed, unhealthy arteries (the same ones heart disease
                affects) can&apos;t deliver enough &mdash; which is why{" "}
                <Link href="/learn/erectile-function-signal">erectile trouble can be an early warning sign</Link>.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">4</div>
            <div>
              <p className="sos-step__title">The trap</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                As the chambers swell, they press the small draining veins flat
                against the tunica albuginea, pinching off the exits. Blood is now{" "}
                <strong>trapped</strong>, pressure climbs, and a full, firm
                erection you can keep is the result. This second job &mdash;
                holding the blood &mdash; is the one that fails in{" "}
                <Link href="/learn/venous-leak">venous leak</Link>, where the
                seal never fully closes and the erection drains away.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">5</div>
            <div>
              <p className="sos-step__title">The return to soft</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                After orgasm, or when arousal passes, the smooth muscle contracts
                again, the arteries narrow, the veins reopen, and blood drains
                back out. The penis returns to its resting state until the next
                signal starts the sequence over.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Where testosterone and the brain fit
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Notice what <em>isn&apos;t</em> in the five steps: testosterone. It
          matters &mdash; it drives <Link href="/learn/low-desire-vs-ed">desire</Link>{" "}
          and helps keep the penile tissue and nitric-oxide system healthy over
          time &mdash; but the mechanics of a single erection are mostly
          arteries, nerves, and smooth muscle. That&apos;s why a man can have
          perfectly normal testosterone and still have{" "}
          <Link href="/learn/ed-workup">ED</Link>, and why testosterone alone
          often doesn&apos;t fix it. The brain, meanwhile, can override the whole
          sequence from the top: anxiety and stress tighten the very smooth muscle
          that needs to relax, which is how{" "}
          <Link href="/learn/psychogenic-ed">psychogenic ED</Link> works even when
          the plumbing is flawless.
        </p>
      </section>

      <Callout label="The map, not the machine">
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          Every treatment in this library targets one of these steps: pills
          protect step 2, injections force steps 2 and 3, a constriction ring
          helps step 4, and the <Link href="/learn/ed-workup">workup</Link>{" "}
          exists to find which step is yours. Knowing the sequence is what turns
          &ldquo;it doesn&apos;t work&rdquo; into a specific, answerable question.
        </p>
      </Callout>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK513278/" target="_blank" rel="noopener noreferrer">StatPearls: Physiology, Erection</a>{" "}(the neural, nitric-oxide, and veno-occlusive mechanism); and the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>{" "}(how the physiology maps to evaluation and treatment).
        </p>
        <p className="sos-note">
          General education, not medical advice. If your own sequence is failing
          somewhere, the <Link href="/learn/ed-workup">workup</Link> is how a
          clinician finds the step &mdash; and if something feels acutely wrong,{" "}
          <Link href="/support">get support now</Link>.
        </p>
      </div>

      <Faq slug="how-an-erection-works" />
      <RelatedArticles slug="how-an-erection-works" />
    </article>
  );
}
