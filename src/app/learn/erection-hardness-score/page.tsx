import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Erection Hardness Score (EHS), explained",
  description:
    "The Erection Hardness Score is a validated 0-to-4 scale that puts a plain number on how rigid an erection is. What each grade means, why Grade 3 is the usual threshold for penetration, how it differs from the IIEF-5 screen, and how to use it with your clinician.",
  alternates: { canonical: "/learn/erection-hardness-score" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The Erection Hardness Score (EHS), explained",
  url: `${SITE.url}/learn/erection-hardness-score`,
  description:
    "A patient's guide to the Erection Hardness Score (EHS): a single-item, patient-reported 0-to-4 scale of erectile rigidity, what each grade means, and how it fits alongside the IIEF-5 in an ED workup.",
  about: { "@type": "MedicalTest", name: "Erection Hardness Score" },
  audience: { "@type": "Patient" },
};

export default function ErectionHardnessScorePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "erection-hardness-score")} />
      <Breadcrumbs slug="erection-hardness-score" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The Erection Hardness Score (EHS), explained
      </h1>
      <ArticleMeta slug="erection-hardness-score" />

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
        &ldquo;How hard is hard enough?&rdquo; is a question most men never get a
        straight answer to, and it&apos;s hard to describe out loud in a clinic
        room. The <strong>Erection Hardness Score</strong>{" "}was built to fix
        exactly that: a single question, answered on a scale from{" "}
        <strong>0 to 4</strong>, that turns a vague worry into one number you and
        a clinician can actually use. It is the measure behind a lot of the
        erectile-dysfunction drug trials you&apos;ve read about, and it takes
        about five seconds to answer.
      </p>

      <div className="sos-card" style={{ marginBottom: "40px" }}>
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          <strong>What it is in one line:</strong>{" "}a validated, patient-reported
          scale for the <em>rigidity</em>{" "}of an erection, from 0 (no change) to
          4 (fully rigid). It measures hardness in the moment, which is a
          different thing from the broader picture of function over months that
          the{" "}
          <Link href="/tools/erectile-function-score">IIEF-5 self-check</Link>{" "}
          captures.
        </p>
      </div>

      <section style={{ marginTop: "8px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The five grades
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          You answer one question &mdash; &ldquo;How would you describe the
          hardness of your erection?&rdquo; &mdash; by picking the grade that fits
          best. The wording below is the validated scale.
        </p>

        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">0</div>
            <div>
              <p className="sos-step__title">Grade 0 &mdash; no enlargement</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The penis does not enlarge at all.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">Grade 1 &mdash; larger, not hard</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The penis is larger, but not hard.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">Grade 2 &mdash; hard, not enough to penetrate</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The penis is hard, but not hard enough for penetration.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">3</div>
            <div>
              <p className="sos-step__title">Grade 3 &mdash; hard enough to penetrate</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The penis is hard enough for penetration, but not completely hard.
                This is the grade clinicians usually treat as the threshold of a{" "}
                <strong>functional</strong>{" "}erection.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">4</div>
            <div>
              <p className="sos-step__title">Grade 4 &mdash; completely hard</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The penis is completely hard and fully rigid. This is the usual
                goal of treatment, and what most men mean by &ldquo;normal.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why Grade 3 is the line that matters
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The jump from <strong>Grade 2 to Grade 3</strong>{" "}is the one that
          changes whether sex is possible at all, so it&apos;s the line trials and
          clinicians care about most. A validated follow-up study found that the
          likelihood of a satisfying, successful attempt climbs sharply at Grade 3
          and higher. Read practically: Grade 3 is &ldquo;this works, but there&apos;s
          room,&rdquo; and Grade 4 is the target. That&apos;s also why the goal of a
          PDE5 inhibitor or other therapy is usually framed as moving you from a 2
          to a 3 or 4, not chasing some abstract perfect score.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          EHS vs. the IIEF-5: two tools, two jobs
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          They&apos;re easy to confuse, and they answer different questions:
        </p>
        <ul className="sos-prose" style={{ fontSize: "16px", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <li>
            <strong>The EHS is a snapshot of rigidity.</strong>{" "}One question, one
            moment, one number from 0 to 4. It&apos;s fast, it&apos;s concrete, and
            it&apos;s the natural way to describe a single erection.
          </li>
          <li>
            <strong>The{" "}
            <Link href="/tools/erectile-function-score">IIEF-5 / SHIM</Link>{" "}is a
            picture over time.</strong>{" "}Five questions covering the last six
            months &mdash; confidence, firmness, keeping it, finishing &mdash; scored
            out of 25. It grades the <em>severity</em>{" "}of erectile dysfunction
            rather than the hardness of one erection.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "12px" }}>
          Used together they&apos;re complementary: the IIEF-5 says how big the
          problem is across months, the EHS says how hard things are right now and
          whether a change in treatment actually moved the needle. If you keep a{" "}
          <Link href="/log">Log</Link>, the weekly &ldquo;hard enough for
          penetration&rdquo; rating is essentially the EHS Grade 3 threshold,
          tracked week over week.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it can&apos;t tell you
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The EHS is <strong>self-reported</strong>, so it&apos;s a communication
          tool, not a diagnosis. It doesn&apos;t say <em>why</em>{" "}an erection is a
          Grade 2 &mdash; that&apos;s what the rest of the{" "}
          <Link href="/learn/ed-workup">workup</Link>{" "}is for &mdash; and a low grade
          driven by a one-off bad night reads the same as one driven by a vascular
          problem. It also says nothing about duration, sensation, or ejaculation.
          Its value is narrow and real: it gives you and your clinician the same
          plain word for a thing that&apos;s otherwise easy to talk past, and a
          baseline to measure treatment against.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          How to use it
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Before an appointment, settle on the grade that best describes a typical
          erection over the last few weeks, and a second number for your firmest.
          &ldquo;Most are a 2, my best is a 3&rdquo; tells a clinician more in six
          words than a paragraph of hedging. If you&apos;re starting or changing a
          treatment, write the number down first; the honest test of whether
          something is working is whether that number moves. For the fuller
          picture, pair it with the{" "}
          <Link href="/tools/erectile-function-score">two-minute IIEF-5 self-check</Link>{" "}
          &mdash; it runs in your browser and keeps nothing &mdash; and bring both
          numbers in. A grade that isn&apos;t improving, or erectile trouble that
          appeared suddenly, is a reason to get seen: it&apos;s often{" "}
          <Link href="/learn/erectile-function-signal">a signal about the rest of your health</Link>.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The Erection Hardness Score is the rare clinical instrument that&apos;s
          genuinely simple: one question, a 0-to-4 answer, with Grade 3 as the line
          where sex becomes possible and Grade 4 as the goal. It won&apos;t tell you
          what&apos;s wrong, but it will give you an honest, shared number &mdash; to
          describe where you are, and to check whether a treatment is actually
          getting you somewhere.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/17888069/" target="_blank" rel="noopener noreferrer">Mulhall et al., &ldquo;Validation of the Erection Hardness Score,&rdquo; J Sex Med 2007</a>;{" "}
          <a href="https://www.sexhealthmatters.org/component/content/article/ed-diagnosis-erection-hardness-score/" target="_blank" rel="noopener noreferrer">SMSNA / SexHealthMatters: Erection Hardness Score</a>; and the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a substitute for your own
          workup. The EHS is a self-report scale; what a given grade means for you,
          and what to do about it, belongs to a licensed clinician who can examine
          you and knows your history.
        </p>
      </div>

      <Faq slug="erection-hardness-score" />
      <RelatedArticles slug="erection-hardness-score" />
    </article>
  );
}
