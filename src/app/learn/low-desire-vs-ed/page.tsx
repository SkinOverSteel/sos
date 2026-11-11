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
  title: "Low desire vs. ED: wanting to, and being able to",
  description:
    "Low libido and erectile dysfunction are different problems with different workups. How to tell them apart, why the distinction matters, what testosterone does and doesn't explain, and why guidelines say to screen for low testosterone without reaching for it by reflex.",
  alternates: { canonical: "/learn/low-desire-vs-ed" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Low desire vs. ED: wanting to, and being able to",
  url: `${SITE.url}/learn/low-desire-vs-ed`,
  description:
    "A patient's guide to distinguishing low sexual desire (male hypoactive sexual desire) from erectile dysfunction: why they are separate systems, how the workup differs, the role and limits of testosterone, and the other common causes of low libido.",
  about: { "@type": "MedicalCondition", name: "Low sexual desire (male hypoactive sexual desire disorder)" },
  audience: { "@type": "Patient" },
};

export default function LowDesirePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "low-desire-vs-ed")} />
      <Breadcrumbs slug="low-desire-vs-ed" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Conditions</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Low desire vs. ED: wanting to, and being able to
      </h1>
      <ArticleMeta slug="low-desire-vs-ed" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        Two men walk into the same appointment with the same opening line
        &mdash; <em>&ldquo;something&apos;s wrong with my sex life&rdquo;</em>{" "}
        &mdash; and they have opposite problems. One wants sex and his body
        won&apos;t cooperate. The other&apos;s body works, but the wanting is
        gone. Those are <strong>different systems</strong>, with different
        causes and different workups, and the single most useful thing you can
        do before any appointment is figure out which one you&apos;re actually
        describing.
      </p>

      <KeyTakeaways
        items={[
          <><strong>Desire</strong> (wanting sex) and <strong>erectile function</strong> (getting and keeping an erection) are separate. Sort out which is the problem first.</>,
          <>The quick test: with enough privacy and stimulation, is the <em>interest</em> there but the erection unreliable (that&apos;s ED), or is the <em>interest itself</em> missing (that&apos;s low desire)?</>,
          <>Low testosterone is <em>one</em> cause of low desire, so guidelines say to check it &mdash; but desire doesn&apos;t track the number, and testosterone is not a reflex fix.</>,
          <>Depression, stress, relationships, sleep, alcohol and a long list of <strong>medications</strong> drive low desire at least as often as hormones.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Two different systems
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Desire is a <em>drive</em> &mdash; the brain&apos;s interest in sex,
          shaped by mood, hormones, context, and the relationship. Erectile
          function is a <em>mechanism</em> &mdash; the vascular and nerve
          plumbing that turns arousal into a usable erection. They&apos;re
          linked (nothing kills interest like a run of failures, and nothing
          softens an erection like not wanting to be there), but they&apos;re
          not the same thing, and a workup that treats them as one misses.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A useful way to separate them: think about the situations where the
          machinery usually shows itself &mdash; a firm morning erection, an
          erection with solo stimulation. If those still happen but partnered
          sex fails, the hardware is largely intact and the story is more about
          desire, anxiety, or context. If the interest is there but the erection
          is unreliable everywhere, that points at{" "}
          <Link href="/learn/ed-workup">the ED workup</Link>. If the interest
          itself has quietly gone missing, that&apos;s low desire, and it leads
          somewhere different.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Where testosterone fits &mdash; and where it doesn&apos;t
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Low testosterone is a genuine, established cause of low desire, which
          is exactly why the guidelines say to check a morning testosterone
          level when libido is low, especially if it comes with other signs of
          deficiency (fatigue, loss of morning erections, low mood, body-composition
          changes). That part is settled. What&apos;s less intuitive is that
          desire does <em>not</em> move neatly with the testosterone number,
          particularly in older men &mdash; the European guidance is explicit
          that sexual desire doesn&apos;t directly track circulating testosterone
          in everyone. So a low libido is a reason to <strong>test</strong>, not
          a diagnosis on its own, and a normal level doesn&apos;t close the book.
        </p>
        <Callout label="The reflex to resist">
          <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
            &ldquo;Low drive, so take testosterone&rdquo; is the gray-market
            pitch, and it gets the logic backwards. Testosterone helps desire
            when the cause is a real, confirmed deficiency; in men whose levels
            are normal it&apos;s not a reliable fix, and it carries its own risks
            (fertility, hematocrit, and more &mdash; see{" "}
            <Link href="/learn/testosterone-therapy">testosterone therapy</Link>{" "}
            and <Link href="/learn/trt-high-hematocrit">the hematocrit issue</Link>).
            That&apos;s why it belongs to a prescriber reading your labs, not a
            vial you start on a hunch.
          </p>
        </Callout>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The rest of the list
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Hormones are one lane; they&apos;re far from the only one. Low desire
          is driven at least as often by things that never show up on a
          testosterone panel:
        </p>
        <ul className="sos-prose" style={{ fontSize: "16px", paddingLeft: "22px", marginBottom: "18px", display: "grid", gap: "8px" }}>
          <li><strong>Mood and stress:</strong> depression and anxiety blunt desire directly, and chronic stress and poor sleep do the same.</li>
          <li><strong>Medications:</strong> SSRIs are a leading cause, and some blood-pressure drugs, opioids, and finasteride can lower libido too.</li>
          <li><strong>The relationship and the context:</strong> unaddressed conflict, resentment, or mismatched expectations are real medical-history items, not a footnote.</li>
          <li><strong>Other endocrine issues:</strong> thyroid problems and high prolactin can both suppress desire, which is why the blood work looks past testosterone alone.</li>
          <li><strong>Alcohol and substances:</strong> common, reversible, and easy to under-report.</li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Because the list is long and overlapping, the workup for low desire is
          a candid history plus targeted blood work, not a single test &mdash;
          and the history only works if it&apos;s honest, which is the whole
          point of{" "}
          <Link href="/learn/lying-to-your-urologist">not editing the story you tell your clinician</Link>.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Name the problem before you chase a fix. If the interest is there and
          the erection isn&apos;t, start with{" "}
          <Link href="/learn/ed-workup">the ED workup</Link>. If the interest
          itself has faded, that&apos;s low desire &mdash; worth a real
          evaluation, worth a testosterone check, and worth resisting the easy
          story that a single hormone is the answer. Both roads lead to the same
          place: a clinician who takes the history seriously and tests before
          treating.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/low-sexual-desire-and-male-hypoactive-sexual-desire-disorder" target="_blank" rel="noopener noreferrer">EAU Guidelines on Sexual and Reproductive Health: Low Sexual Desire and Male Hypoactive Sexual Desire Disorder</a>;{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline</a>; and the{" "}
          <a href="https://www.issm.info/media/attachments/2021/08/17/03-clinical-guidelines---issm-quick-reference-guide-on-td---vsept2015.pdf" target="_blank" rel="noopener noreferrer">ISSM Quick Reference Guide on Testosterone Deficiency</a>{" "}(screen for low testosterone when desire is low).
        </p>
        <p className="sos-note">
          General education, not medical advice. Which problem you have, which
          tests you need, and whether treatment (including testosterone) is right
          for you belong to a licensed clinician who can examine you and knows
          your history. If low mood is part of the picture,{" "}
          <Link href="/support">support is here</Link>.
        </p>
      </div>

      <Faq slug="low-desire-vs-ed" />
      <RelatedArticles slug="low-desire-vs-ed" />
    </article>
  );
}
