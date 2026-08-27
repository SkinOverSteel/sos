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
  title: "The urologist visit, on your terms",
  description:
    "What to expect at the urologist for an ED workup or penile Doppler ultrasound: how to prepare, what to tell them before any test, the numbers to ask for, what it costs, and how to push back when the visit becomes a prescription conveyor belt.",
  alternates: { canonical: "/learn/urologist-visit" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The urologist visit, on your terms",
  url: `${SITE.url}/learn/urologist-visit`,
  description:
    "A patient-preparation guide to the urology visit for erectile dysfunction: pre-visit preparation, medication disclosure before diagnostic testing, requesting objective results, cost questions, and self-advocacy.",
  about: { "@type": "MedicalProcedure", name: "Urology consultation for erectile dysfunction" },
  audience: { "@type": "Patient" },
};

export default function UrologistVisitPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "urologist-visit")} />
      <Breadcrumbs slug="urologist-visit" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Choosing care</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The urologist visit, on your terms
      </h1>
      <ArticleMeta slug="urologist-visit" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        Getting to a urologist&apos;s office is the hard part for most men: it
        can take months of not-mentioning-it before the appointment even gets
        made. Which makes what happens next stranger. Having finally arrived,
        most men go <em>passive</em>: answer a few questions, take the script,
        thank the doctor, leave. The visit you waited months for lasts eleven
        minutes and changes nothing you couldn&apos;t have ordered online.
      </p>
      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        It doesn&apos;t have to go that way, and this page is the preparation
        for the version that doesn&apos;t. It was shaped with the same
        contributor behind our piece on{" "}
        <Link href="/learn/psychogenic-ed">performance anxiety</Link>, a man
        who has sat through more of these appointments than most clinicians
        would believe, and paid for every lesson below.
      </p>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Know the map before you walk in
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          A good ED evaluation has a known shape: history, exam, blood work,
          and, only when the question is specifically vascular, imaging. We&apos;ve
          walked the whole sequence in{" "}
          <Link href="/learn/ed-workup">the ED workup, start to finish</Link>,
          and the imaging step in{" "}
          <Link href="/learn/penile-doppler-ultrasound">the penile Doppler ultrasound, explained</Link>.
          Read them before you go. Not because you&apos;ll be quizzed, but
          because a patient who knows the map notices when the visit skips
          territory. If the &ldquo;workup&rdquo; is two questions and a
          prescription pad, you&apos;ll know exactly what got skipped, and you
          can ask why.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Bring the raw material with you: which situations fail and which
          don&apos;t, when it started, what&apos;s changed, every medication and
          supplement you take, and any labs you already have (our{" "}
          <Link href="/learn/read-your-labs">read your labs</Link>{" "}primer
          covers which ones matter). Five minutes of notes beats an hour of
          trying to remember under fluorescent lights.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Before any test: total precision about what you already take
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          This is the single most consequential conversation of the visit, and
          it happens <em>before</em>{" "}any needle or probe. If a Doppler is on
          the table, the clinician will use an in-office injection to produce
          the erection they measure, and the measurements are only meaningful
          if that erection is fully engaged. An office dose that isn&apos;t
          enough <em>for you</em>{" "}can paint a &ldquo;venous leak&rdquo; onto
          the scan of a healthy man: a phantom diagnosis you&apos;ll then spend
          months and real money chasing. The mechanism is laid out in{" "}
          <Link href="/learn/penile-doppler-ultrasound">the Doppler piece</Link>;
          what matters here is your half of it.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          So tell them, specifically and without rounding: what you take, how
          much, how often, and what it actually takes to get you reliably,
          fully hard. If that answer involves a compounded injectable, a
          telehealth prescription, or something you&apos;d rather not say out
          loud, say it out loud anyway. This is history-taking, not a
          confession, and the clinician can only dose and interpret the test
          against your real physiology if they know it. Vagueness here is the
          most expensive modesty in medicine.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Ask what it costs, out loud, before it happens
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A penile Doppler is commonly quoted anywhere from a few hundred
          dollars to around a thousand, for the same test, depending on who&apos;s
          holding the probe and how the facility bills. Nobody volunteers this.
          Ask for the cash price and the billed-to-insurance price before you
          consent, and if the gap is absurd, say so; imaging is one of the most
          shoppable services in medicine. The same layered-markup anatomy we
          traced in{" "}
          <Link href="/learn/what-it-costs">what it costs</Link>{" "}applies in
          the exam room too, and the patients who ask are the ones it
          doesn&apos;t happen to.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Leave with data, not a verdict
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          &ldquo;Everything looks fine&rdquo; is not a result. It&apos;s a
          summary of a result you weren&apos;t shown. Every test in this workup
          produces actual numbers, and you are entitled to all of them:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>From a Doppler:</strong>{" "}PSV, EDV, and RI, for{" "}
            <strong>both the right and left sides</strong>. Those three values{" "}
            <em>are</em>{" "}the test; everything else is interpretation. The{" "}
            <Link href="/learn/penile-doppler-ultrasound">Doppler piece</Link>{" "}
            explains what each one reflects.
          </li>
          <li>
            <strong>From blood work:</strong>{" "}the values and reference
            ranges, not &ldquo;your testosterone is normal.&rdquo;{" "}
            <Link href="/learn/read-your-labs">Read your labs</Link>{" "}shows you
            what to do with them.
          </li>
          <li>
            <strong>From the visit itself:</strong>{" "}a stated working
            diagnosis. Inflow problem, venous leak, hormonal, psychogenic,
            mixed, or &ldquo;we don&apos;t know yet&rdquo;: any of those is an
            acceptable answer. An unstated one is not.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Ask for copies before you leave the building. A patient portal
          &ldquo;summary&rdquo; often omits the numbers; the full report
          doesn&apos;t.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          When the visit becomes a conveyor belt
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          There&apos;s a version of this appointment that ends with a sildenafil
          script and a handshake inside ten minutes, no labs, no numbers, no
          stated diagnosis. Sometimes a{" "}
          <Link href="/learn/pde5-lineup">PDE5 inhibitor</Link>{" "}genuinely is
          the right first move; the drugs are well understood and the
          step-wise logic is defensible. The problem isn&apos;t the pill.
          It&apos;s the pill <em>instead of</em>{" "}an evaluation, the same
          no-one-actually-evaluated-you pattern we flagged in{" "}
          <Link href="/learn/telemedicine-visit">what a good telemedicine visit looks like</Link>,
          running in a building with a real waiting room.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The counter isn&apos;t hostility; it&apos;s three words: <em>why, how,
          when</em>. Why this treatment and not an answer first? How will we
          know it&apos;s working? When do we check again? A good clinician
          answers those easily, and most will visibly recalibrate once they see
          you&apos;re engaged; the conveyor belt runs on the assumption that
          you&apos;re too embarrassed to ask. And if the answers never come,
          you&apos;re allowed to change doctors. A second opinion in urology is
          routine, not an insult.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The half no scan will show
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          One more thing to carry in: the machine measures plumbing, and only
          plumbing. Especially in your forties and fifties, a clean scan is a
          common and genuinely good result, and it usually means the real work
          is{" "}
          <Link href="/learn/psychogenic-ed">north of the belt</Link>: the
          anxiety loop that fails you at the exact moment it matters and then
          feeds on the failure. If your urologist rules out the vasculature and
          says the word &ldquo;psychogenic,&rdquo; that is not a brush-off;
          it&apos;s a diagnosis with its own treatment path, and the visit that
          gets you there was worth every dollar.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "12px" }}>
          From a contributor
        </p>
        <blockquote
          style={{
            margin: 0,
            paddingLeft: "18px",
            borderLeft: "2px solid var(--sos-copper)",
          }}
        >
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
            &ldquo;Most doctors hand you the pill, say &lsquo;have at it,&rsquo;
            and move to the next appointment. Ask the why, the how, and the
            when. Make them explain. You paid for answers, not a coupon.&rdquo;
          </p>
        </blockquote>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Shared by a contributor to Skin Over Steel, writing a book on what he
          found. Fenced as lived experience, one man&apos;s account, not medical
          advice, and included because the posture it describes, prepared, not
          combative, is the one this whole page is teaching.
        </p>
      </div>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          You did the hard part when you booked the appointment. Don&apos;t go
          passive at the door. Walk in knowing{" "}
          <Link href="/learn/ed-workup">the map</Link>, be ruthlessly precise
          about what you already take, ask what things cost before they happen,
          and leave with numbers and a stated diagnosis instead of a verdict
          and a coupon. None of that requires medical training. It requires
          deciding, before you walk in, that you&apos;re a participant in this
          visit and not its throughput.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>{" "}
          (shared decision-making and the evaluation sequence);{" "}
          <a href="https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis" target="_blank" rel="noopener noreferrer">NIDDK: Diagnosis of Erectile Dysfunction</a>; and{" "}
          <a href="https://www.ahrq.gov/questions/index.html" target="_blank" rel="noopener noreferrer">AHRQ: Questions To Ask Your Doctor</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a dosing guide. What
          you disclose belongs in your clinician&apos;s hands; what they
          prescribe, and at what dose, belongs in theirs. Cost figures are
          typical ranges reported by patients and vary by market and facility.
        </p>
      </div>

      <Faq slug="urologist-visit" />
      <RelatedArticles slug="urologist-visit" />
    </article>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};
