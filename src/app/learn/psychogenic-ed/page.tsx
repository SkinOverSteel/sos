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
  title: "Performance anxiety and psychogenic ED",
  description:
    "When the tests are clean and it still fails: how psychogenic ED and performance anxiety work, why the loop feeds itself, how it blends with real blood-flow decline as you age, and what actually breaks it.",
  alternates: { canonical: "/learn/psychogenic-ed" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Performance anxiety and psychogenic ED",
  url: `${SITE.url}/learn/psychogenic-ed`,
  description:
    "Psychogenic erectile dysfunction and performance anxiety: mechanism, the self-feeding anxiety loop, its overlap with vascular causes, and the behavioral and medical approaches supported by guidelines.",
  about: { "@type": "MedicalCondition", name: "Psychogenic erectile dysfunction" },
  audience: { "@type": "Patient" },
};

export default function PsychogenicEdPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "psychogenic-ed")} />
      <Breadcrumbs slug="psychogenic-ed" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Conditions</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Performance anxiety and psychogenic ED
      </h1>
      <ArticleMeta slug="psychogenic-ed" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        There&apos;s a version of this where every test comes back clean. Blood
        flow, fine. Labs, fine. You get erections in your sleep, and it still
        fails when it counts. That isn&apos;t a mystery and it isn&apos;t a
        character flaw. It&apos;s the nervous system doing exactly what
        it&apos;s built to do at exactly the wrong moment. Psychogenic erectile
        dysfunction is real, it&apos;s common, and it&apos;s one of the most
        treatable things on this site once it&apos;s named.
      </p>
      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        This piece was shaped with a contributor who spent most of his life
        inside that loop, and years finding his way out. He&apos;s putting what
        he learned into a book. What follows is the part that&apos;s useful to
        you right now.
      </p>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          It&apos;s in your head, and that makes it physical
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The unhelpful thing people say is &ldquo;it&apos;s all in your
          head,&rdquo; as if that means it isn&apos;t real. It&apos;s the
          opposite. An erection is a <strong>parasympathetic</strong>{" "}event: it
          needs the &ldquo;rest and digest&rdquo; side of the nervous system in
          charge. Anxiety flips you into <strong>sympathetic</strong>{" "}drive,
          fight or flight, which does the vascular opposite: constricts, diverts
          blood, shuts it down. Not weakness. Plumbing driven by wiring. The
          fear itself is the mechanism.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          There&apos;s a signature clinicians look for, and a lot of men
          recognize it the instant they read it: <em>rock solid one moment,
          gone the next, and only ever with a partner.</em>{" "}Fine alone, fails
          with someone else. Fine with a familiar partner, fails with someone
          new. When it&apos;s <strong>situational</strong>{" "}like that, the
          hardware is almost never the problem. The switch is being thrown by
          the moment, not the machine.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The loop
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          One bad night doesn&apos;t stay one bad night. It becomes a{" "}
          <em>memory</em>, the memory becomes an <em>expectation</em>, and next
          time you&apos;re bracing for the failure before anything has happened.
          Clinicians call the next part <strong>spectatoring</strong>: you stop
          being <em>in</em> it and start <em>watching</em>{" "}yourself, monitoring
          for the failure, which guarantees the sympathetic surge that causes
          it. Anxiety, failure, more anxiety. The loop doesn&apos;t need real
          hardware trouble to keep running. It runs on itself.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          For a lot of men it starts young, with everything to prove and no way
          to know the guy across from you is running the same script. Left
          alone, it can outlast the circumstances that started it by decades.
          Our contributor carried it from his first time well into his forties
          before he decided to do something about it, and then tried, by his own
          account, nearly everything on the market before he found what actually
          moved the needle. That search is the book he&apos;s writing now.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why it usually isn&apos;t purely one thing
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The honest picture, especially past 40: it&apos;s rarely <em>all</em>{" "}
          mental or <em>all</em>{" "}physical. A psychogenic pattern that started
          young can still be running the show years later, even as real,
          age-related changes in blood flow layer on top of it. Now you&apos;ve
          got a mind-body loop <strong>and</strong>{" "}a vascular headwind, each
          feeding the other: a soft night for a physical reason writes the
          anxiety memory that causes the next one. That&apos;s not a reason to
          despair; it&apos;s a reason to sort it out properly instead of
          guessing. Two pieces already here do exactly that:{" "}
          <Link href="/learn/nocturnal-tumescence-testing">overnight erection testing (NPT)</Link>{" "}
          asks whether the wiring fires when your conscious mind is offline, and
          the{" "}
          <Link href="/learn/penile-doppler-ultrasound">penile Doppler ultrasound</Link>{" "}
          measures blood flow directly. Between them you learn how much is body,
          how much is mind, and where to aim.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What actually breaks the cycle
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The psychogenic piece responds to treatment, often well, and rarely to
          a pill alone. The levers that carry the evidence:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Sex therapy and CBT.</strong>{" "}A licensed sex therapist or
            CBT clinician is the highest-yield move here, full stop. They
            interrupt the spectatoring, rebuild the anticipation, and treat the
            anxiety as the medical target it is. The part most men skip and
            shouldn&apos;t.
          </li>
          <li>
            <strong>Getting out of your own head.</strong>{" "}Mindfulness and
            attention-refocusing have real evidence for pulling you back{" "}
            <em>into</em>{" "}the experience and out of the monitoring booth. Simple
            isn&apos;t easy, but it&apos;s trainable.
          </li>
          <li>
            <strong>Bringing your partner in.</strong>{" "}Isolation is fuel for
            the loop; a partner who understands the mechanism defuses the
            pressure that drives it. That conversation is treatment, not a
            confession.
          </li>
          <li>
            <strong>A PDE5 as a bridge, not a crutch.</strong>{" "}Used
            deliberately and short-term, a prescription{" "}
            <Link href="/learn/pde5-lineup">PDE5 inhibitor</Link>{" "}can give you a
            run of successful nights that overwrite the failure memory and quiet
            the anticipatory anxiety, then you taper the reliance as confidence
            holds. A legitimate strategy your prescriber can build with you.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          What none of this needs is a stranger&apos;s dose off the internet. It
          needs someone who confirmed the pattern, ruled out a fixable physical
          cause, and matched the approach to your life: the substance of a real
          visit.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The questions to ask (so they don&apos;t just hand you a pill)
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          This is the contributor&apos;s central point, and it&apos;s a good one:
          if you don&apos;t ask, many clinicians will reach for the prescription
          pad and stop there. Walk in with these.
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            Does the situational pattern I&apos;m describing point to a{" "}
            <strong>psychogenic</strong>{" "}component?
          </li>
          <li>
            Should we do <strong>overnight erection testing</strong>{" "}to see if
            the wiring fires in my sleep?
          </li>
          <li>
            Could this be <strong>mixed</strong>, partly anxiety and partly
            blood flow, and can we check both?
          </li>
          <li>
            Can you refer me to a{" "}
            <strong>sex therapist or CBT clinician</strong>, not just a
            prescription?
          </li>
          <li>
            If we use a <strong>PDE5</strong>, can we use it as a short-term
            confidence bridge with a plan to taper?
          </li>
          <li>
            What&apos;s driving the anxiety physically: sleep, stress, a
            medication I&apos;m already on?
          </li>
        </ul>
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
            &ldquo;It was mental from the beginning: rock solid one minute, and
            done the moment it mattered. I spent my life letting it beat me up.
            A couple of years ago I decided to actually do something about it,
            and I tried everything. This information is vital, and most men are
            just too afraid to ask.&rdquo;
          </p>
        </blockquote>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Shared by a contributor to Skin Over Steel, writing a book on what he
          found. Fenced as lived experience, one man&apos;s account, not medical
          advice, and included here because the questions he learned to ask are
          the ones worth carrying into a real visit.
        </p>
      </div>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          If the tests are clean and it still fails, you are not broken and you
          are not alone: you&apos;re caught in a loop that has a name, a
          mechanism, and a way out. The move isn&apos;t to white-knuckle it or
          keep it secret for twenty years. It&apos;s to get it sorted, treat the
          anxiety as the medical thing it is, and, if it&apos;s mixed, treat
          both halves at once. A clinician (or a{" "}
          <Link href="/learn/telemedicine-visit">telemedicine visit that actually evaluates you</Link>){" "}
          can start that today.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>{" "}
          (evaluation, psychogenic vs. organic); and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK562253/" target="_blank" rel="noopener noreferrer">StatPearls: Erectile Dysfunction</a>{" "}
          (mechanism, sympathetic override, and the role of psychological factors).
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a dosing guide. Whether
          a treatment fits (and at what dose, if any) is a decision for a
          licensed clinician who knows your history.
        </p>
      </div>

      <Faq slug="psychogenic-ed" />
      <RelatedArticles slug="psychogenic-ed" />
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
