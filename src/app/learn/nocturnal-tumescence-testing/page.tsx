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
  title: "Overnight erection testing (NPT), explained",
  description:
    "Nocturnal penile tumescence testing checks whether you get erections in your sleep: the classic way to separate a physical cause of ED from a psychological one. What RigiScan and snap-gauge tests measure, why the answer is rarely black-and-white, and where the test fits today.",
  alternates: { canonical: "/learn/nocturnal-tumescence-testing" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Overnight erection testing (NPT), explained",
  url: `${SITE.url}/learn/nocturnal-tumescence-testing`,
  description:
    "A patient's guide to nocturnal penile tumescence (NPT) testing: what sleep erections reveal, how RigiScan and snap-gauge tests differ, and how the physical-versus-psychological answer fits the wider ED workup.",
  about: { "@type": "MedicalTest", name: "Nocturnal penile tumescence testing" },
  audience: { "@type": "Patient" },
};

export default function NptTestingPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "nocturnal-tumescence-testing")} />
      <Breadcrumbs slug="nocturnal-tumescence-testing" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Overnight erection testing (NPT), explained
      </h1>
      <ArticleMeta slug="nocturnal-tumescence-testing" />

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
        Healthy men have several erections a night, in their sleep, without ever
        knowing it. That quiet fact is the basis of one of the oldest tests in the{" "}
        <Link href="/learn/ed-workup">ED workup</Link>:{" "}
        <strong>nocturnal penile tumescence (NPT) testing</strong>. If the
        erections still happen while you sleep, the wiring and the plumbing are
        largely intact, which points the search for a cause in a very different
        direction than if they don&apos;t. Here&apos;s what it measures, and the
        honest limits of what it can tell you.
      </p>

      <div className="sos-card" style={{ marginBottom: "40px" }}>
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          <strong>The core question it answers:</strong>{" "}is the barrier physical or
          psychological? Erections during sleep bypass anxiety, performance
          pressure, and the situation entirely. So they isolate whether the body
          <em> can</em>{" "}do it, separate from whether it does when you&apos;re awake.
        </p>
      </div>

      <section style={{ marginTop: "8px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why sleep erections matter
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The erections that happen during REM sleep run on the same machinery as
          any other: nerves signaling, arteries opening, blood held under
          pressure. But they happen with the conscious mind switched off. So if
          strong, rigid erections occur reliably overnight, the vascular and
          neurological hardware is doing its job, and the difficulty during sex is
          more likely psychological or situational. If they&apos;re weak or absent
          asleep too, that&apos;s a signal to look harder at a physical cause,
          which is where tests like the{" "}
          <Link href="/learn/penile-doppler-ultrasound">penile Doppler ultrasound</Link>{" "}
          come in.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The two versions
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          NPT testing runs from a formal lab-grade recording to a simple home
          screen. They answer the question at different resolutions.
        </p>

        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">RigiScan: the detailed record</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                A device worn on the penis overnight, sometimes across two or three
                nights, occasionally in a sleep lab. It continuously logs the{" "}
                <strong>number</strong>{" "}of erections, their <strong>rigidity</strong>{" "}
                at base and tip, and how <strong>long</strong>{" "}each lasts. This is
                the version that produces a real, gradable answer, not just whether
                erections happened, but whether they were rigid enough to count.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">Snap-gauge / stamp test: the screen</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                A far simpler band worn around the shaft (a plastic snap-gauge, or
                historically a ring of postage stamps) designed to break if an
                erection expands the shaft overnight. It&apos;s cheap and doable at
                home, but it&apos;s a blunt instrument: it tells you{" "}
                <em>something happened</em>, not how rigid it was or how long it
                lasted. Useful as a rough screen, not a verdict.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the answer is rarely black-and-white
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The physical-versus-psychological split is a useful lens, not a clean
          line. Most ED is a <strong>mix</strong>, a small vascular change that
          seeds doubt, then anxiety that magnifies it. Sleep quality, depression,
          and some medications can also blunt overnight erections without any
          vascular problem at all, muddying the result. So NPT is best read as one
          strong pointer among several, weighed alongside your{" "}
          <Link href="/learn/ed-workup">history, exam, and labs</Link>, not as a
          standalone diagnosis.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Where it fits now
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          NPT is used far less than it once was. For most men, a careful history
          already answers the physical-versus-psychological question (a sudden
          change with morning erections intact tells much the same story), and
          treatment often moves ahead without formal testing. NPT keeps a real role
          in <strong>selective</strong>{" "}cases: younger men, unclear or complex
          presentations, or medico-legal situations where an objective record
          matters. If it&apos;s offered to you, the fair question is the same one
          that applies to any test: <em>what will this change about the plan?</em>
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          NPT testing asks whether the body can still produce an erection when the
          mind is offline, a genuinely useful question, because a &ldquo;yes&rdquo;
          reframes the whole problem toward the psychological, and a &ldquo;no&rdquo;
          justifies looking harder at the plumbing. It&apos;s an older test with a
          narrower role today, but when the physical-versus-psychological question
          is the one that&apos;s stuck, it can still be the one that moves things
          forward.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK562253/" target="_blank" rel="noopener noreferrer">StatPearls: Erectile Dysfunction</a>; and{" "}
          <a href="https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis" target="_blank" rel="noopener noreferrer">NIDDK: Diagnosis of Erectile Dysfunction</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a substitute for your own
          workup. Whether this test is warranted, and what its findings mean for
          you, belong to a licensed clinician who can examine you and knows your
          history.
        </p>
      </div>

      <Faq slug="nocturnal-tumescence-testing" />
      <RelatedArticles slug="nocturnal-tumescence-testing" />
    </article>
  );
}
