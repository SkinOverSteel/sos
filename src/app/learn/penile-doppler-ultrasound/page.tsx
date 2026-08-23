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
  title: "The penile Doppler ultrasound, explained",
  description:
    "The specialized test that measures penile blood flow directly. What happens in the room, why the injection dose can change the result, when a contrast study (cavernosography) comes next, and the exact numbers — PSV, EDV, RI, both sides — to ask for.",
  alternates: { canonical: "/learn/penile-doppler-ultrasound" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The penile Doppler ultrasound, explained",
  url: `${SITE.url}/learn/penile-doppler-ultrasound`,
  description:
    "A patient's guide to the dynamic penile duplex Doppler ultrasound: what it measures, why the injection dose matters, when cavernosography is used, and how to read the PSV, EDV, and RI values.",
  about: { "@type": "MedicalTest", name: "Penile duplex Doppler ultrasound" },
  audience: { "@type": "Patient" },
};

export default function PenileDopplerPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "penile-doppler-ultrasound")} />
      <Breadcrumbs slug="penile-doppler-ultrasound" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The penile Doppler ultrasound, explained
      </h1>
      <ArticleMeta slug="penile-doppler-ultrasound" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Most of the{" "}
        <Link href="/learn/ed-workup">ED workup</Link> is a conversation, an exam,
        and blood work — and most men never need more than that. But when the
        question is specifically <em>vascular</em> — is enough blood flowing in,
        and is it staying in? — there&apos;s a test that measures it directly: the{" "}
        <strong>dynamic penile duplex Doppler ultrasound</strong>. It&apos;s
        reserved for particular situations, and it&apos;s the kind of test where
        walking in prepared genuinely changes what you get out of it. Here&apos;s
        the whole thing.
      </p>

      <div className="sos-card" style={{ marginBottom: "40px" }}>
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          <strong>This is a specialized test, not a routine one.</strong> It&apos;s
          usually considered for younger men, a history of pelvic trauma or
          surgery, suspected venous leak, or cases where first-line treatment
          fails and surgery is on the table. If you haven&apos;t had the basic{" "}
          <Link href="/learn/ed-workup">workup</Link> yet, that comes first.
        </p>
      </div>

      <div className="sos-steps">
        <div className="sos-steps__rail" aria-hidden="true" />

        <div className="sos-step">
          <div className="sos-step__num">1</div>
          <div>
            <p className="sos-step__title">The injection</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              To measure blood flow, the clinician needs an erection to measure —
              so the test starts with an in-office injection (commonly
              alprostadil). The goal here is different from a treatment like{" "}
              <Link href="/learn/penile-injections">trimix</Link>: it&apos;s to{" "}
              <strong>produce</strong> an erection long enough to image, not to
              give you something to use at home. Then the ultrasound probe reads
              the arteries and veins while the erection develops.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">2</div>
          <div>
            <p className="sos-step__title">What they&apos;re looking for</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Two things. First, <strong>arterial inflow</strong> — is enough
              blood arriving to create rigidity? Second, <strong>venous
              leak</strong> — once you&apos;re erect, is blood draining back out
              too quickly to hold it? Pills and history can hint at these, but the
              Doppler is where inflow and outflow are actually seen and measured,
              side by side.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">3</div>
          <div>
            <p className="sos-step__title">Why the dose is worth a conversation</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              This is the part most people don&apos;t know to ask about. The
              measurements are only meaningful if the erection is{" "}
              <strong>fully engaged</strong>. If the in-office dose isn&apos;t
              enough for you, the study can show a &ldquo;leak&rdquo; that
              wouldn&apos;t appear at an adequate dose — a false alarm that has you
              chasing a problem that isn&apos;t there. So tell the clinician,
              specifically, what it actually takes to give you a reliable, full
              erection. That context helps them run and interpret the test against
              your real physiology, not an under-dosed snapshot.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">4</div>
          <div>
            <p className="sos-step__title">If the picture isn&apos;t clear: cavernosography</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Sometimes the Doppler is inconclusive, or a suspected venous leak
              needs to be mapped precisely. The next step can be{" "}
              <strong><Link href="/learn/cavernosography">cavernosography</Link></strong>{" "}
              — a more invasive study that uses
              injected contrast dye and imaging so leak shows up clearly. Think of
              it as the difference between imaging with and without contrast: same
              question, sharper picture. It&apos;s usually reserved for when the
              Doppler alone can&apos;t answer it, often before considering surgery.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">5</div>
          <div>
            <p className="sos-step__title">Getting your numbers</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Don&apos;t settle for &ldquo;it looks fine.&rdquo; A Doppler produces
              actual measurements — ask for them, for <strong>both the right and
              left sides</strong>, because one side can be normal while the other
              isn&apos;t. The three that matter are in the table below.
            </p>
          </div>
        </div>
      </div>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The three numbers to ask for
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          Request these for the right <em>and</em> left sides. The specific values
          are read by your clinician against the lab&apos;s reference ranges — but
          having them in hand lets you ask real questions instead of accepting a
          verdict.
        </p>
        <div className="sos-card" style={{ padding: 0, overflow: "hidden" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--sos-line-soft)" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    fontFamily: "var(--sos-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--sos-text-md)",
                  }}
                >
                  Value
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "14px 18px",
                    fontFamily: "var(--sos-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--sos-text-md)",
                  }}
                >
                  What it reflects
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--sos-line-soft)" }}>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  <strong>PSV</strong>
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--sos-mono)",
                      fontSize: "13px",
                      color: "var(--sos-text-lo)",
                    }}
                  >
                    Peak Systolic Velocity
                  </span>
                </td>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  Arterial inflow — how strongly blood is arriving. Generally,
                  higher is better.
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--sos-line-soft)" }}>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  <strong>EDV</strong>
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--sos-mono)",
                      fontSize: "13px",
                      color: "var(--sos-text-lo)",
                    }}
                  >
                    End-Diastolic Velocity
                  </span>
                </td>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  Whether blood is draining back out — the signature of venous
                  leak. Generally, lower is better.
                </td>
              </tr>
              <tr>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  <strong>RI</strong>
                  <br />
                  <span
                    style={{
                      fontFamily: "var(--sos-mono)",
                      fontSize: "13px",
                      color: "var(--sos-text-lo)",
                    }}
                  >
                    Resistive Index
                  </span>
                </td>
                <td style={{ padding: "14px 18px", verticalAlign: "top" }}>
                  Combines inflow and outflow into one figure — a summary of how
                  well the erection holds pressure.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Questions worth asking
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A good specialist expects questions — asking them is how you make the
          test count. Reasonable ones: <em>Is the injection dose enough to fully
          engage the erection for me?</em> <em>What are my PSV, EDV, and RI on
          each side?</em> <em>Does the result point to inflow, leak, both, or
          neither?</em> <em>If it&apos;s inconclusive, is cavernosography the next
          step?</em> And <em>what does this change about the plan?</em> If the
          answer to everything is just a prescription with no explanation,
          that&apos;s the same tell described in{" "}
          <Link href="/learn/telemedicine-visit">what a good telemedicine visit looks like</Link>.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The Doppler measures your plumbing — and it does that well. What it
          can&apos;t measure is the large role anxiety and context play in
          erectile function, which is why the{" "}
          <Link href="/learn/ed-workup">full workup</Link> starts with the story,
          not the machine. Used at the right time, with an adequate dose and your
          numbers in hand, it turns &ldquo;something feels wrong&rdquo; into
          something specific you and your clinician can actually act on.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK537320/" target="_blank" rel="noopener noreferrer">StatPearls: Penile Doppler Ultrasound / Duplex Ultrasonography</a>; and{" "}
          <a href="https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis" target="_blank" rel="noopener noreferrer">NIDDK: Diagnosis of Erectile Dysfunction</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a substitute for your own
          workup. Which test you need, how it&apos;s dosed, and what your numbers
          mean belong to a licensed clinician who can examine you and knows your
          history.
        </p>
      </div>

      <Faq slug="penile-doppler-ultrasound" />
      <RelatedArticles slug="penile-doppler-ultrasound" />
    </article>
  );
}
