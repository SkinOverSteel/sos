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
  title: "Sleep and erections: the overnight connection",
  description:
    "How short sleep lowers testosterone, why obstructive sleep apnea is strongly linked to erectile dysfunction through endothelial strain, what treating the sleep problem does and doesn't fix, and why a snoring, unrefreshing night is a medical lead.",
  alternates: { canonical: "/learn/sleep-and-erections" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Sleep and erections: the overnight connection",
  url: `${SITE.url}/learn/sleep-and-erections`,
  description:
    "A patient's guide to how sleep affects erectile function: the effect of sleep restriction on testosterone, the association between obstructive sleep apnea and erectile dysfunction, the endothelial mechanism, and the mixed evidence on CPAP for ED.",
  about: { "@type": "MedicalCondition", name: "Sleep and erectile function" },
  audience: { "@type": "Patient" },
};

export default function SleepAndErectionsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "sleep-and-erections")} />
      <Breadcrumbs slug="sleep-and-erections" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Foundations</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Sleep and erections: the overnight connection
      </h1>
      <ArticleMeta slug="sleep-and-erections" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-lead" style={{ marginBottom: "32px" }}>
        A lot of the machinery behind an erection gets maintained while
        you&apos;re asleep &mdash; the hormones, the blood-vessel health, the{" "}
        <Link href="/learn/morning-erections">nighttime erections</Link>{" "}
        themselves. So it&apos;s not a stretch that bad sleep shows up below the
        belt. Two parts of this are well established, and one of them, sleep
        apnea, is a genuinely important medical lead that&apos;s easy to miss.
      </p>

      <KeyTakeaways
        items={[
          <>In a controlled study, cutting healthy young men to ~5 hours a night for one week lowered daytime <strong>testosterone by about 10&ndash;15%</strong>.</>,
          <><strong>Obstructive sleep apnea</strong> is strongly associated with erectile dysfunction, through repeated overnight oxygen drops that strain blood vessels.</>,
          <>Treating apnea <em>may</em> help erections, but the evidence is mixed and modest &mdash; the bigger reason to treat it is heart and metabolic health.</>,
          <>Loud snoring, witnessed breathing pauses, or waking unrefreshed are a <strong>medical lead worth following</strong>, not a lifestyle footnote.</>,
        ]}
      />

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Sleep and testosterone
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Testosterone is produced on a daily rhythm that leans heavily on sleep,
          and the clearest demonstration is a small, tightly controlled study: ten
          healthy young men restricted to about five hours of sleep for a week saw
          their daytime testosterone fall by roughly 10 to 15 percent, with the
          lowest levels in the afternoon, and they reported feeling worse as it
          dropped. It&apos;s a small study published as a research letter, so treat
          the exact number as preliminary rather than precise &mdash; but the
          direction is consistent with what&apos;s known: chronic short sleep works
          against the hormonal system that supports{" "}
          <Link href="/learn/low-desire-vs-ed">desire</Link> and tissue health.
          That makes sleep a real, and fixable, contributor rather than a vague
          wellness slogan.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bigger lead: sleep apnea
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          Obstructive sleep apnea &mdash; where the airway repeatedly collapses in
          sleep, dropping blood oxygen dozens or hundreds of times a night &mdash;
          is strongly associated with erectile dysfunction. The leading mechanism
          is the lining of the blood vessels: those repeated oxygen dips and the
          surges of stress they trigger damage the <em>endothelium</em>, the same
          vessel lining that healthy erections (and{" "}
          <Link href="/learn/erectile-function-signal">heart health</Link>) depend
          on. Apnea also fragments the deep sleep that supports testosterone. So it
          hits erectile function from two directions at once.
        </p>
        <Callout label="Signs worth acting on">
          <p className="sos-prose" style={{ fontSize: "16px", margin: 0 }}>
            Loud habitual snoring, a partner noticing you stop breathing,
            morning headaches, waking unrefreshed, daytime sleepiness, or
            high blood pressure. Any of these plus erectile trouble is a
            reasonable prompt to get screened for apnea &mdash; a test that can
            change far more than your sex life.
          </p>
        </Callout>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Does treating the sleep problem fix the erection?
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Honestly: sometimes, partly. Reviews suggest that treating apnea (most
          often with CPAP) can improve erectile-function scores for some men, but
          the high-quality evidence is limited and the effect is modest &mdash;
          and for the ED itself, <Link href="/learn/pde5-lineup">PDE5 pills</Link>{" "}
          tend to outperform CPAP, with the two sometimes combined. So the honest
          framing isn&apos;t &ldquo;fix your sleep and the ED disappears.&rdquo;
          It&apos;s that untreated apnea is a drag on the system, a serious health
          risk in its own right, and worth addressing regardless &mdash; with
          better erections a plausible bonus rather than a promise. As everywhere
          in this library, the move is to find and treat the real cause, not to
          treat the symptom in isolation.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/21632481/" target="_blank" rel="noopener noreferrer">Leproult R, Van Cauter E. Effect of 1 week of sleep restriction on testosterone levels in young healthy men, JAMA 2011;305(21):2173&ndash;2174</a>; and the{" "}
          <a href="https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013169.pub2/full" target="_blank" rel="noopener noreferrer">Cochrane review: positive airway pressure therapy for erectile dysfunction in men with obstructive sleep apnoea</a>{" "}(the association is clear; the treatment benefit for ED is uncertain and modest).
        </p>
        <p className="sos-note">
          General education, not medical advice. Whether sleep apnea or short
          sleep is driving your situation, and what to do about it, belong to a
          clinician who can evaluate you. If low mood is part of the picture,{" "}
          <Link href="/support">support is here</Link>.
        </p>
      </div>

      <Faq slug="sleep-and-erections" />
      <RelatedArticles slug="sleep-and-erections" />
    </article>
  );
}
