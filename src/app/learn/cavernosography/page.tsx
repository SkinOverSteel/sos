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
  title: "Cavernosography: mapping a venous leak",
  description:
    "The contrast study used when a penile Doppler suggests blood won't stay in but can't say where it's escaping. What cavernosography and dynamic infusion cavernosometry involve, when they're warranted, and the honest limits of chasing a leak.",
  alternates: { canonical: "/learn/cavernosography" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Cavernosography: mapping a venous leak",
  url: `${SITE.url}/learn/cavernosography`,
  description:
    "A patient's guide to cavernosography and dynamic infusion cavernosometry: how the contrast study maps venous leak, when it's warranted after a penile Doppler, and what it changes about treatment.",
  about: { "@type": "MedicalTest", name: "Cavernosography" },
  audience: { "@type": "Patient" },
};

export default function CavernosographyPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "cavernosography")} />
      <Breadcrumbs slug="cavernosography" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Cavernosography: mapping a venous leak
      </h1>
      <ArticleMeta slug="cavernosography" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The{" "}
        <Link href="/learn/penile-doppler-ultrasound">penile Doppler ultrasound</Link>{" "}
        can tell you that blood isn&apos;t staying in — a venous leak — but it
        can&apos;t always tell you <em>where</em>. When that specific answer
        matters, there&apos;s a more detailed test:{" "}
        <strong>cavernosography</strong>, usually paired with{" "}
        <strong>dynamic infusion cavernosometry</strong>. It&apos;s invasive, and
        it&apos;s reserved for a small number of men. Here&apos;s what it is, and
        the honest question of whether it&apos;s worth doing.
      </p>

      <div className="sos-card" style={{ marginBottom: "40px" }}>
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          <strong>This is a niche, later-stage test.</strong>{" "}It comes after a{" "}
          <Link href="/learn/ed-workup">workup</Link>{" "}and a{" "}
          <Link href="/learn/penile-doppler-ultrasound">Doppler</Link>, and almost
          only when someone is seriously weighing surgery for venous leak. Most
          men — even most men with confirmed leak — never need it.
        </p>
      </div>

      <section style={{ marginTop: "8px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it actually involves
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The penis is kept erect with a controlled saline infusion, then contrast
          dye is introduced and imaged with X-ray or fluoroscopy. On the images,
          dye escaping through the veins shows the leak directly — not inferred
          from flow speeds, but seen. The paired{" "}
          <strong>cavernosometry</strong>{" "}half measures the pressures: how much
          infusion it takes to reach an erection, and how fast pressure falls when
          the infusion stops. Together they answer two questions — <em>is there a
          leak</em>, and <em>where is it</em> — with a precision the Doppler
          can&apos;t reach.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the dye, when the Doppler already hinted at it
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          It&apos;s the difference between imaging with contrast and without. The
          Doppler measures{" "}
          <Link href="/learn/penile-doppler-ultrasound">EDV — end-diastolic velocity</Link>,
          which rises when blood is draining out, so it flags <em>that</em>{" "}a leak
          is likely. But a surgeon considering repair needs to know <em>where</em>{" "}
          the blood is escaping and how much. Cavernosography maps that. Without a
          map, there&apos;s nothing precise to operate on.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The honest part: does it change anything?
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          This is the question worth asking before you agree to an invasive test.
          Surgery to fix venous leak has a <strong>limited and frequently
          disappointing track record</strong> — results often fade over time — so
          mapping a leak is only worthwhile when it will genuinely guide a
          procedure someone has decided is right for them. For the large majority,
          effective treatment doesn&apos;t depend on this level of detail:{" "}
          <Link href="/learn/pde5-lineup">PDE5 inhibitors</Link>,{" "}
          <Link href="/learn/penile-injections">penile injections</Link>, a vacuum
          device, or — when nothing else works — a penile implant, which sidesteps
          the leak question entirely. Cavernosography earns its place only when the
          answer would actually change the plan.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Cavernosography is a precise tool for a narrow job: showing a surgeon
          exactly where a venous leak is before an operation that&apos;s already on
          the table. If surgery isn&apos;t genuinely being considered, mapping the
          leak rarely changes what happens next. Ask the direct question —{" "}
          <em>will this test change my treatment?</em> — and let the answer decide
          whether an invasive study is worth it.
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

      <Faq slug="cavernosography" />
      <RelatedArticles slug="cavernosography" />
    </article>
  );
}
