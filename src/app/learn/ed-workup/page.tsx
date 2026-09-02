import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Figure } from "@/components/Figure";
import { WorkupFunnel } from "@/components/figures/WorkupFunnel";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The ED workup, start to finish",
  description:
    "Erectile dysfunction is a symptom, not a diagnosis. How ED is actually evaluated (the history, physical exam, and lab tests that find the cause, plus the specialized tests some men need) and why the workup is the part that matters most.",
  alternates: { canonical: "/learn/ed-workup" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The ED workup, start to finish",
  url: `${SITE.url}/learn/ed-workup`,
  description:
    "A step-by-step guide to how erectile dysfunction is diagnosed: history, physical exam, laboratory testing, and specialized studies. And how the workup shapes the treatment plan.",
  about: { "@type": "MedicalCondition", name: "Erectile dysfunction" },
  audience: { "@type": "Patient" },
};

export default function EdWorkupPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "ed-workup")} />
      <Breadcrumbs slug="ed-workup" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>The workup</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The ED workup, start to finish
      </h1>
      <ArticleMeta slug="ed-workup" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Erectile dysfunction is a <strong>symptom, not a diagnosis</strong>. The
        whole point of a workup is to answer one question (<em>why</em>) because
        the answer changes everything that comes after it, and occasionally it
        turns up something that matters more than the ED itself. A good clinician
        runs a systematic path, not a guess. Here&apos;s the entire thing, so you
        walk in already holding the map.
      </p>

      <div className="sos-card" style={{ marginBottom: "40px" }}>
        <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
          <strong>Not sure where you land?</strong>{" "}The{" "}
          <Link href="/tools/erectile-function-score">two-minute self-check</Link>{" "}
          scores the same five-question screen clinicians use: a number to bring
          into the workup below.
        </p>
      </div>

      <div className="sos-steps">
        <div className="sos-steps__rail" aria-hidden="true" />

        <div className="sos-step">
          <div className="sos-step__num">1</div>
          <div>
            <p className="sos-step__title">The story</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              The highest-yield part of the workup isn&apos;t a machine. It&apos;s
              the conversation. When did it start, and how? A <strong>sudden</strong>{" "}
              change with morning erections still intact points one way (often
              stress or a medication); a <strong>gradual, everywhere</strong>{" "}
              decline points toward the plumbing. Your clinician also walks your
              medications, sleep, mood, and relationship, because every one of
              them shows up here.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">2</div>
          <div>
            <p className="sos-step__title">The body</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              A focused physical and your vitals. Erectile tissue runs on blood
              flow, so this is often where a broader problem first surfaces:{" "}
              <Link href="/learn/erectile-function-signal">erectile function is a signal</Link>,
              sometimes the earliest visible sign of vascular or metabolic
              trouble. Blood pressure, waistline, the genital exam, and signs of
              low testosterone get checked here, not assumed.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">3</div>
          <div>
            <p className="sos-step__title">The labs</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Blood work looks for treatable drivers and hidden risk at the same
              time: an early-morning <strong>testosterone</strong>{" "}(repeated if
              it&apos;s low), <strong>blood sugar / HbA1c</strong>{" "}and{" "}
              <strong>lipids</strong>, and thyroid or prolactin when the picture
              calls for it. <Link href="/learn/read-your-labs">Read your labs</Link>{" "}
              decodes what each one means, and this is the step that quietly
              screens for diabetes and heart risk. You can{" "}
              <Link href="/directory">line up the blood work</Link>{" "}before your
              visit if you&apos;d rather walk in with numbers.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">4</div>
          <div>
            <p className="sos-step__title">The picture</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Now it gets named. The clinician sorts the cause into{" "}
              <strong>vascular, hormonal, neurological, medication-related, or
              psychological</strong>, most often a mix of a few. That
              classification isn&apos;t academic: it&apos;s the diagnosis every
              downstream decision rests on.
            </p>
          </div>
        </div>

        <div className="sos-step">
          <div className="sos-step__num">5</div>
          <div>
            <p className="sos-step__title">The plan</p>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Only now does treatment make sense, and it follows the cause.
              First-line <Link href="/learn/pde5-long-term">PDE5 inhibitors</Link>,{" "}
              <Link href="/learn/testosterone-therapy">testosterone</Link>{" "}if
              it&apos;s genuinely low, treating the metabolic or cardiovascular
              risk the workup surfaced, and the lifestyle levers that actually
              move erectile function. Matched to what&apos;s wrong, not picked
              off a menu.
            </p>
          </div>
        </div>
      </div>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          When the basics aren&apos;t enough
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Most men never need more than a history, an exam, and blood work. And
          it&apos;s worth knowing that up front. A minority need more.{" "}
          <strong>Specialized testing</strong>. Overnight erection monitoring
          (<Link href="/learn/nocturnal-tumescence-testing">nocturnal penile tumescence</Link>), a <strong><Link href="/learn/penile-doppler-ultrasound">penile duplex ultrasound</Link></strong>{" "}
          to look at blood flow directly, or an in-office{" "}
          <strong>injection test</strong>{" "}is reserved for specific situations:
          younger men, a history of pelvic trauma or surgery, curvature
          (Peyronie&apos;s), or cases where first-line treatment fails and surgery
          is genuinely on the table. If a service runs none of this and still
          produces a prescription in ninety seconds, that&apos;s the tell in{" "}
          <Link href="/learn/telemedicine-visit">what a good telemedicine visit looks like</Link>.
        </p>
        <Figure
          num={1}
          caption={
            <>
              How deep it goes. The first tier (the story, the exam, the labs)
              is the whole workup for most men, and it is the tier that catches
              diabetes and heart risk. Each narrower tier is reserved for the
              situations on the right, which are the guideline&apos;s own
              indications for specialized testing. Widths illustrative.
            </>
          }
        >
          <WorkupFunnel />
        </Figure>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The workup is the part actually worth paying for. Skipping it to buy
          pills from a checkout screen doesn&apos;t just risk treating the wrong
          thing. It skips the one evaluation that can catch diabetes or heart
          disease years before they announce themselves. Get the workup. If you
          still need the pills afterward, that part is easy, and{" "}
          <Link href="/learn/what-it-costs">cheaper than you&apos;d think</Link>.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis" target="_blank" rel="noopener noreferrer">NIDDK: Diagnosis of Erectile Dysfunction</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK562253/" target="_blank" rel="noopener noreferrer">StatPearls: Erectile Dysfunction</a>. The figure&apos;s tiers and triggers follow the AUA guideline&apos;s indications for specialized testing.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a substitute for your own
          workup. Diagnosis and any testing or treatment belong to a licensed
          clinician who can examine you and knows your history.
        </p>
      </div>

      <Faq slug="ed-workup" />
      <RelatedArticles slug="ed-workup" />
    </article>
  );
}
