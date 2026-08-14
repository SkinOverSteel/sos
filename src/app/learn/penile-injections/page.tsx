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
  title: "Penile injections, when pills aren't enough",
  description:
    "When ED pills fail or can't be used, penile injection therapy (trimix) is the most effective second line. What it is, where it sits on the treatment ladder, how it stays legitimate, and the four-hour priapism rule that isn't optional.",
  alternates: { canonical: "/learn/penile-injections" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Penile injections, when pills aren't enough",
  url: `${SITE.url}/learn/penile-injections`,
  description:
    "Intracavernosal injection therapy (trimix/alprostadil) as second-line treatment for erectile dysfunction: how it works, the treatment ladder, legitimate sourcing, and priapism safety.",
  about: { "@type": "MedicalTherapy", name: "Intracavernosal injection therapy" },
  audience: { "@type": "Patient" },
};

export default function PenileInjectionsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "penile-injections")} />
      <Breadcrumbs slug="penile-injections" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Penile injections, when pills aren&apos;t enough
      </h1>
      <ArticleMeta slug="penile-injections" />

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
        The pills work for most men — but not all, and not everyone can take them.
        If <Link href="/learn/pde5-lineup">PDE5 inhibitors</Link> have stopped
        working or were never an option, that is not a dead end: there is a real,
        effective <strong>second line</strong>, and the most reliable part of it is
        an injection. It is far less daunting than the word sounds — and it works
        precisely where pills can&apos;t. Here is the honest picture: what it is,
        where it sits, and the one rule that is never optional.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The treatment ladder
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          ED care escalates in steps — pills are just the first rung.
        </p>
        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">First line — the pills</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                <Link href="/learn/pde5-lineup">PDE5 inhibitors</Link> work for the
                majority of men, and they&apos;re where almost everyone starts.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">Second line — injections</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The most effective step when pills aren&apos;t enough — and the
                focus of this page. It reliably produces an erection even when the
                pills can&apos;t.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">3</div>
            <div>
              <p className="sos-step__title">Also second line — a vacuum device</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                A legitimate, drug-free option for men who&apos;d rather not inject
                — covered in <Link href="/learn/enhancement">the device map</Link>.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">4</div>
            <div>
              <p className="sos-step__title">The definitive fix — an implant</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                When nothing else works or is wanted, a{" "}
                <Link href="/learn/enhancement">penile implant</Link> is the
                high-satisfaction end of the ladder.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the injection actually is
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The workhorse is <strong>trimix</strong> — a compounded blend of
          alprostadil, papaverine, and phentolamine — delivered with a very fine
          needle into the side of the shaft. It opens the blood vessels{" "}
          <em>directly</em>, which is the whole point: it sidesteps the desire and
          nerve signalling that pills depend on, so it works after prostate
          surgery, with diabetic nerve damage, and in plenty of men for whom pills
          simply don&apos;t. It&apos;s highly effective, and it&apos;s a genuine
          prescription — written by a urologist, mixed by a licensed compounding
          pharmacy, with the first dose given in the office. (Alprostadil alone is
          the FDA-approved version; trimix reaches the same effect with a smaller
          dose and less of the ache alprostadil can cause.)
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The one rule that isn&apos;t optional: the four-hour mark
        </h2>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
            The trade for that reliability is precision. An erection that lasts{" "}
            <strong>more than four hours is priapism — a medical emergency</strong>.
            Trapped blood starves the tissue of oxygen, and left untreated it scars
            it permanently (the same fibrosis behind{" "}
            <Link href="/learn/peyronies-disease">Peyronie&apos;s</Link>), which can
            cost you erections for good. It&apos;s uncommon — roughly{" "}
            <strong>0.5–5%</strong> of injection users — and a supervised program
            exists precisely to keep it near zero, which is why the dose is dialed
            in by a clinician and <strong>never freelanced</strong>.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            If an erection passes the four-hour mark: follow{" "}
            <strong>your prescriber&apos;s own reversal instructions</strong> and
            get emergency care <em>now</em> — don&apos;t wait it out.{" "}
            <Link href="/support">Get support now</Link> is the fastest route.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Doing it right — and legitimately
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Trimix is a legitimate compounded medicine, not a gray-market product —
          and the difference shows in the vial. A labeled vial from a licensed
          compounding pharmacy is a different thing entirely from a pre-mixed
          baggie of unknown contents, which is exactly what{" "}
          <Link href="/learn/product-forms">what you&apos;re actually buying</Link>{" "}
          is about. The dose is titrated to your response, starting in the office,
          and the whole thing runs through the legitimate channel: a{" "}
          <Link href="/learn/telemedicine-visit">real evaluation</Link>, a
          urologist or qualified prescriber, and a{" "}
          <Link href="/directory">licensed compounding pharmacy</Link>. The value
          is in doing it inside that channel — never in a cheaper syringe from a
          stranger.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          If the pills have stopped working, that&apos;s a doorway, not a wall —
          onto a second line that&apos;s effective and legitimate, injections most
          of all. The needle is smaller than the fear, and the one real risk,
          priapism, is exactly why this is a prescribed, monitored therapy and
          never a DIY. The move is a <Link href="/learn/ed-workup">workup</Link>{" "}
          and a urology conversation — where a treatment that reliably works is
          waiting.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK542217/" target="_blank" rel="noopener noreferrer">StatPearls: Alprostadil</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/37078428/" target="_blank" rel="noopener noreferrer">current status of intracavernosal injection therapy in ED</a>; and the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)" target="_blank" rel="noopener noreferrer">AUA/SMSNA Priapism Guideline (2022)</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and deliberately not a dosing or
          injection how-to. Penile injection therapy is prescribed, dosed, and
          first administered by a licensed clinician — and any prolonged erection
          is an emergency, handled through your prescriber&apos;s instructions and
          emergency care, never self-managed dosing.
        </p>
      </div>

      <Faq slug="penile-injections" />
      <RelatedArticles slug="penile-injections" />
    </article>
  );
}
