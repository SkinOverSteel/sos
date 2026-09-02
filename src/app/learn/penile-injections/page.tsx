import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Figure } from "@/components/Figure";
import { TitrationStaircase } from "@/components/figures/TitrationStaircase";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Penile injections, when pills aren't enough",
  description:
    "When ED pills fail or can't be used, penile injection therapy (trimix) is the most effective second line. What it is, how the dose is actually set (with real numbers), where it stays legitimate, and the four-hour priapism rule that isn't optional.",
  alternates: { canonical: "/learn/penile-injections" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Penile injections, when pills aren't enough",
  url: `${SITE.url}/learn/penile-injections`,
  description:
    "Intracavernosal injection therapy (trimix/alprostadil) as second-line treatment for erectile dysfunction: how it works, how dosing is titrated, legitimate sourcing, and priapism safety.",
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

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The pills work for most men, but not all, and not everyone can take them.
        If <Link href="/learn/pde5-lineup">PDE5 inhibitors</Link>{" "}have stopped
        working or were never an option, that is not a dead end: there is a real,
        effective <strong>second line</strong>, and the most reliable part of it is
        an injection. It is far less daunting than the word sounds, and it works
        precisely where pills can&apos;t. Here is the honest picture: what it is,
        where it sits, and the one rule that is never optional.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The treatment ladder
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          ED care escalates in steps. Pills are just the first rung.
        </p>
        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">First line: the pills</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                <Link href="/learn/pde5-lineup">PDE5 inhibitors</Link>{" "}work for the
                majority of men, and they&apos;re where almost everyone starts.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">Second line: injections</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                The most effective step when pills aren&apos;t enough, and the
                focus of this page. It reliably produces an erection even when the
                pills can&apos;t.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">3</div>
            <div>
              <p className="sos-step__title">Also second line: a vacuum device</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                A legitimate, drug-free option for men who&apos;d rather not inject,
                covered in <Link href="/learn/enhancement">the device map</Link>.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">4</div>
            <div>
              <p className="sos-step__title">The definitive fix: an implant</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                When nothing else works or is wanted, a{" "}
                <Link href="/learn/enhancement">penile implant</Link>{" "}is the
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
          The workhorse is <strong>trimix</strong> (a compounded blend of
          alprostadil, papaverine, and phentolamine) delivered with a very fine
          needle into the side of the shaft. It opens the blood vessels{" "}
          <em>directly</em>, which is the whole point: it sidesteps the desire and
          nerve signalling that pills depend on, so it works after prostate
          surgery, with diabetic nerve damage, and in plenty of men for whom pills
          simply don&apos;t. It&apos;s highly effective, and it&apos;s a genuine
          prescription: written by a urologist, mixed by a licensed compounding
          pharmacy, with the first dose given in the office. (Alprostadil alone is
          the FDA-approved version; trimix reaches the same effect with a smaller
          dose and less of the ache alprostadil can cause.)
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          How the dose actually gets set
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          This is the part most pages refuse to print, and refusal is how men
          get hurt: a man who has never seen what a normal trimix dose looks
          like cannot tell when his is wrong, when the pharmacy mixed the wrong
          strength, or when someone on a forum is telling him to freelance his
          way into priapism. So here are the numbers the way a competent
          program prints them on its handout, with what each one is for. They
          are literacy, not a prescription: your prescriber still sets yours.
        </p>

        <div className="sos-card" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "18px" }}>
          <div>
            <p className="sos-note" style={{ marginBottom: "6px" }}>
              <strong>The standard trimix formulation</strong>
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Papaverine 30&nbsp;mg/mL, phentolamine 1&nbsp;mg/mL, alprostadil
              10&nbsp;mcg/mL is the common starting strength; stronger versions
              (20 or 40&nbsp;mcg/mL of alprostadil) exist for men who stop
              responding. What&apos;s on <em>your</em> vial label is the
              difference between a dose and a guess, so read it.
            </p>
          </div>
          <div>
            <p className="sos-note" style={{ marginBottom: "6px" }}>
              <strong>First doses</strong>
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Standard programs start at <strong>0.05&nbsp;mL</strong> (that is
              5 units on the insulin-style syringe, where 1 unit = 0.01&nbsp;mL)
              and climb in <strong>0.05&nbsp;mL steps</strong>, with the first
              injection given in the office. For reference, the FDA-labeled
              single-drug version (alprostadil alone) starts at 2.5&nbsp;mcg and
              titrates in 5 to 10&nbsp;mcg steps at least 24 hours apart.
            </p>
          </div>
          <div>
            <p className="sos-note" style={{ marginBottom: "6px" }}>
              <strong>What &quot;right&quot; looks like</strong>
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Onset in 5 to 20 minutes, an erection firm enough for intercourse
              lasting <strong>under an hour</strong>. That is the official
              titration target from the drug label itself. A dose that keeps you
              hard for two or three hours is not a great dose; it is a warning
              shot, and the answer is a lower one, not toughering it out.
            </p>
          </div>
          <div>
            <p className="sos-note" style={{ marginBottom: "6px" }}>
              <strong>Frequency and ceiling</strong>
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              No more than <strong>3 times per week</strong>{" "}and never twice in
              24 hours. Most protocols also cap the injected volume around
              0.5&nbsp;mL per dose: past that, the fix is a stronger mix, not a
              bigger puddle of the same one. And every few months you go back
              to the prescriber so the dose, and the tissue, get checked.
            </p>
          </div>
        </div>

        <Figure
          num={1}
          caption={
            <>
              The handout, drawn. Left: the dose climbs one supervised step at a
              time from 0.05 mL (five units on the insulin syringe), and most
              programs stop adding volume near half a millilitre and change the
              strength instead. Right: the label&apos;s own target is an erection
              that lasts under an hour. Two to three hours means the dose is too
              high, and four hours is the emergency line. Literacy, not a
              prescription: your prescriber sets yours.
            </>
          }
        >
          <TitrationStaircase />
        </Figure>

        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Why the dose is never self-adjusted: priapism risk is dose-dependent,
          and the curve is not forgiving. The same mechanism that makes trimix
          reliable, that it ignores arousal entirely, means an overshoot has no
          natural brake. That is why titration happens under supervision and
          why{" "}
          <Link href="/support">a written rescue plan</Link>{" "}
          belongs in the same drawer as the vial. Knowing the numbers does not
          make you your own prescriber. It makes you impossible to shortchange,
          and faster to recognize an emergency.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The one rule that isn&apos;t optional: the four-hour mark
        </h2>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
            The trade for that reliability is precision. An erection that lasts{" "}
            <strong>more than four hours is priapism. A medical emergency</strong>.
            Trapped blood starves the tissue of oxygen, and left untreated it scars
            it permanently (the same fibrosis behind{" "}
            <Link href="/learn/peyronies-disease">Peyronie&apos;s</Link>), which can
            cost you erections for good. It&apos;s uncommon, roughly{" "}
            <strong>0.5–5%</strong>{" "}of injection users, and a supervised program
            exists precisely to keep it near zero, which is why the dose is dialed
            in by a clinician and <strong>never freelanced</strong>.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            If an erection passes the four-hour mark: follow{" "}
            <strong>your prescriber&apos;s own reversal instructions</strong>{" "}and
            get emergency care <em>now</em>. Don&apos;t wait it out.{" "}
            <Link href="/support">Get support now</Link>{" "}is the fastest route,
            and the hour-by-hour damage timeline,{" "}
            <Link href="/learn/priapism-clock">the priapism clock</Link>, is the
            reason why.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Doing it right, and legitimately
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Trimix is a legitimate compounded medicine, not a gray-market product,
          and the difference shows in the vial. A labeled vial from a licensed
          compounding pharmacy is a different thing entirely from a pre-mixed
          baggie of unknown contents, which is exactly what{" "}
          <Link href="/learn/product-forms">what you&apos;re actually buying</Link>{" "}
          is about. The dose is titrated to your response, starting in the office,
          and the whole thing runs through the legitimate channel: a{" "}
          <Link href="/learn/telemedicine-visit">real evaluation</Link>, a
          urologist or qualified prescriber, and a{" "}
          <Link href="/directory">licensed compounding pharmacy</Link>. The value
          is in doing it inside that channel. Never in a cheaper syringe from a
          stranger.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          If the pills have stopped working, that&apos;s a doorway, not a wall,
          onto a second line that&apos;s effective and legitimate, injections most
          of all. The needle is smaller than the fear, and the one real risk,
          priapism, is exactly why this is a prescribed, monitored therapy and
          never a DIY. The move is a <Link href="/learn/ed-workup">workup</Link>{" "}
          and a urology conversation, where a treatment that reliably works is
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
          <a href="https://pubmed.ncbi.nlm.nih.gov/37078428/" target="_blank" rel="noopener noreferrer">current status of intracavernosal injection therapy in ED</a>; the{" "}
          <a href="https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a295fc1e-d82c-4f44-bc2d-a552bf594c98" target="_blank" rel="noopener noreferrer">CAVERJECT (alprostadil) FDA label</a>; patient dosing guidance from{" "}
          <a href="https://www.defymedical.com/blog/trimix-patient-info-sheet/" target="_blank" rel="noopener noreferrer">Defy Medical (Trimix patient info)</a> and{" "}
          <a href="https://www.olympiapharmacy.com/blog/trimix-injection-dosage-chart-explained/" target="_blank" rel="noopener noreferrer">Olympia Pharmacy</a>; and the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)" target="_blank" rel="noopener noreferrer">AUA/SMSNA Priapism Guideline (2022)</a>.
        </p>
        <p className="sos-note">
          General education on a harm-reduction footing: we print the numbers a
          competent program prints, because literacy is what keeps a man safe,
          not ignorance. They explain the therapy; they do not replace your
          prescriber, who still sets and adjusts your dose, and who runs the
          first injection in the office. Any erection that runs long is an
          emergency handled through your rescue plan and emergency care, never
          more self-dosing.
        </p>
      </div>

      <Faq slug="penile-injections" />
      <RelatedArticles slug="penile-injections" />
    </article>
  );
}
