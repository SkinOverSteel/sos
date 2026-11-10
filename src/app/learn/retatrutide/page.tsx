import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { MorseSOS } from "@/components/MorseSOS";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";
import { sources } from "./sources";

const slug = "retatrutide";
const title = "Retatrutide: the strongest weight-loss data yet, and no lawful way to buy it";
const description =
  "Retatrutide (LY3437943): what the Phase 3 TRIUMPH-1 obesity trial actually showed, why it is still investigational and not FDA-approved, why there is no legitimate pharmacy channel, and why the gray-market men's-health pitch outruns the evidence.";

export const metadata: Metadata = {
  title: "Retatrutide (LY3437943): trial data, legal status, and the gray market",
  description,
  alternates: { canonical: `/learn/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE.url}/learn/${slug}`,
    siteName: SITE.name,
    type: "article",
    publishedTime: "2026-11-10",
    modifiedTime: "2026-11-10",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: title,
  url: `${SITE.url}/learn/${slug}`,
  description,
  about: {
    "@type": "Drug",
    name: "Retatrutide",
    alternateName: ["LY3437943"],
    legalStatus: "Investigational; not FDA-approved",
  },
  audience: { "@type": "Patient" },
};

function Cite({ ids }: { ids: number[] }) {
  return (
    <>
      {ids.map((id) => (
        <a key={id} href={`#source-${id}`} aria-label={`Source ${id}`} style={{ fontSize: "0.8em", verticalAlign: "super" }}>
          [{id}]
        </a>
      ))}
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "18px" }}>{title}</h2>
      <div style={{ display: "grid", gap: "16px" }}>{children}</div>
    </section>
  );
}

export default function RetatrutidePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, slug)} />
      <Breadcrumbs slug={slug} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}><b>Treatment &amp; pharmacology</b></p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>{title}</h1>
      <ArticleMeta slug={slug} gradeNote="Emerging: the weight-loss efficacy from Phase 3 is strong and getting stronger, but retatrutide is not approved, has no finished cardiovascular-outcomes data, and no legitimate pharmacy channel. The men's-health and testosterone claims are unproven. Editorial review, not a clinician sign-off." />
      <MorseSOS style={{ margin: "34px 0" }} />

      <aside className="sos-card" role="note" style={{ borderLeft: "3px solid var(--sos-emergency)", marginBottom: "32px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>The short version</p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Retatrutide is an investigational triple-hormone drug with some of the
          largest weight-loss numbers ever reported in a trial. It is also{" "}
          <strong>not FDA-approved and not lawfully available from any licensed
          pharmacy</strong>: it cannot be prescribed, and it cannot be compounded.
          Anything sold online as &quot;retatrutide&quot; is gray-market research
          product with no guarantee of identity, purity, or dose. The honest move
          is to read the evidence, not to buy the molecule.<Cite ids={[1, 5]} />
        </p>
      </aside>

      <p className="sos-prose">
        Retatrutide, code-named LY3437943, is Eli Lilly&apos;s next-generation
        obesity drug. Where semaglutide (Wegovy) acts on one hormone receptor and
        tirzepatide (Zepbound) acts on two, retatrutide is a triple agonist: it
        activates the GLP-1 and GIP receptors and adds the glucagon receptor,
        which pushes the body to burn more fuel. That third target is why the
        weight-loss numbers are the headline, and why the blood-pressure and
        heart-rate questions matter.<Cite ids={[3, 4]} />
      </p>
      <p className="sos-prose" style={{ marginTop: "16px" }}>
        It reaches a men&apos;s-health site like this one for two reasons. First,
        obesity and metabolic disease sit upstream of a lot of erectile trouble,
        so a drug this effective at fat loss has real relevance. Second, gray-market
        vendors have already turned it into a testosterone-and-erection pitch it
        has not earned. Both of those are worth separating from the hype.
      </p>

      <Section title="What TRIUMPH-1 actually showed">
        <p className="sos-prose">
          TRIUMPH-1 is the pivotal Phase 3 obesity trial. Over 80 weeks,
          participants on the highest dose lost roughly 28% of their body weight
          on average, against about 2% on placebo; a per-protocol analysis of
          people who took it as intended reached about 30%. Those are
          bariatric-surgery-range figures, larger than what semaglutide or
          tirzepatide reported in their own trials.<Cite ids={[2, 3]} />
        </p>
        <p className="sos-prose">
          The trial also reported meaningful cardiometabolic movement, including
          systolic blood-pressure reductions of up to roughly 12 mm Hg at 80
          weeks. That is a genuinely large effect, and it is also a reason for
          caution rather than celebration if you already take a blood-pressure
          medicine.<Cite ids={[2]} />
        </p>
        <p className="sos-note">
          Read what the number is before you spend it. &quot;28% weight loss over
          80 weeks in a supervised trial, with dose escalation and monitoring&quot;
          is not the same as &quot;buy a vial and lose a quarter of your body
          weight.&quot; The result belongs to the trial conditions that produced
          it.
        </p>
      </Section>

      <Section title="The side-effect profile is real, and some of it is cardiovascular">
        <p className="sos-prose">
          The most common adverse effects are gastrointestinal: nausea, vomiting,
          diarrhea, and constipation, as with the whole GLP-1 class. In TRIUMPH-1,
          the share of people who stopped the drug for adverse events rose with
          dose, reaching about 11% at the 12 mg dose versus about 5% on placebo.
          That is not a trivial tail.<Cite ids={[3]} />
        </p>
        <p className="sos-prose">
          Two effects deserve specific attention for men watching their heart and
          vascular health. Low blood pressure was reported in roughly 9% of
          participants on the top dose against under 1% on placebo, which matters
          most if you are already on antihypertensives. And like other drugs in
          the class, retatrutide is associated with a small rise in resting heart
          rate. A dedicated cardiovascular-outcomes trial has not reported, so the
          long-term heart story is genuinely unfinished.<Cite ids={[2, 3]} />
        </p>
        <p className="sos-note">
          Some participants also reported dysesthesia, a burning or altered skin
          sensation, more often than on placebo. None of this is a reason for
          panic; it is a reason these drugs are escalated and monitored by a
          prescriber rather than self-dosed from a research vial.<Cite ids={[3]} />
        </p>
      </Section>

      <Section title="Where it stands with the FDA: filed is not approved">
        <p className="sos-prose">
          As of this writing, retatrutide is <strong>investigational and not
          FDA-approved</strong>. Lilly has reported additional positive Phase 3
          results and has said it intends to file for regulatory approval; public
          summaries describe a planned submission in early 2027. A filing is a
          request, not a decision: no approval exists and no FDA action date has
          been set.<Cite ids={[1, 5]} />
        </p>
        <p className="sos-prose">
          There has also been a reported disagreement over whether retatrutide is
          regulated as a biologic, which can affect the filing pathway and
          timing. The practical takeaway does not change: until the FDA acts,
          there is no approved retatrutide product and no approved label, dose, or
          indication to rely on.<Cite ids={[5]} />
        </p>
        <p className="sos-note">
          Approval status for an investigational drug can move. We checked it for
          this piece; verify the current status before you act on anything you
          read about retatrutide anywhere, including here.
        </p>
      </Section>

      <Section title="Why there is no legitimate way to buy it yet">
        <p className="sos-prose">
          This is the part the vendors blur. Because retatrutide is not an
          approved drug, there is no lawful pharmacy channel for it. It cannot be
          prescribed as an approved medicine, and it cannot be legally compounded:
          compounding pharmacies work from approved or recognized pharmaceutical
          ingredients, and an unapproved investigational molecule does not qualify.
          The only lawful routes to retatrutide are enrolling in a clinical trial
          or waiting for a decision.<Cite ids={[1]} />
        </p>
        <p className="sos-prose">
          That is different from <Link href="/learn/bremelanotide-pde5">bremelanotide</Link>{" "}
          or trimix, which are either FDA-approved or legitimately compounded and
          can run through a licensed clinician and pharmacy. Retatrutide has no
          equivalent. Lilly itself warns the public against compounded or
          counterfeit products sold under its drug names.<Cite ids={[1]} />
        </p>
        <p className="sos-prose">
          So anything currently marketed as &quot;retatrutide&quot; for sale,
          whether labeled a peptide, a &quot;research chemical,&quot; or a
          weight-loss blend, is gray-market product by definition. You cannot
          verify that the vial contains what the label says, at the strength it
          says, free of contaminants. That is the same problem we lay out for the{" "}
          <Link href="/learn/wolverine-blend">&quot;wolverine blend&quot;</Link>{" "}
          and <Link href="/learn/honey-packets">honey packets</Link>: the sourcing
          is the risk. For how to read what you are actually being sold, see{" "}
          <Link href="/learn/product-forms">product forms</Link>.
        </p>
      </Section>

      <Section title="The men's-health pitch: each leap needs its own evidence">
        <p className="sos-prose">
          The gray-market story runs like this: retatrutide causes big weight
          loss, weight loss raises testosterone and improves circulation, so
          retatrutide fixes erections and raises your levels. The first link is
          well supported. The rest is a chain of plausible-sounding substitutions,
          none of which the trials tested as a retatrutide outcome.
        </p>
        <p className="sos-prose">
          It is true that losing significant weight can improve erectile function
          and can raise testosterone in men whose levels were suppressed by
          obesity. But that is an effect of the weight loss and metabolic
          improvement, demonstrated with lifestyle change and with approved drugs,
          not a proven direct property of this specific molecule. Reaching for an
          unapproved vial to capture an effect you could pursue through approved,
          supervised care is taking on the sourcing risk for no added, proven
          benefit.
        </p>
        <p className="sos-note">
          If erections are what brought you here, the better starting point is the{" "}
          <Link href="/learn/ed-workup">ED workup</Link> and the idea that{" "}
          <Link href="/learn/erectile-function-signal">erectile function is a
          signal</Link> of vascular and metabolic health. Those lead somewhere you
          can actually act on, with a clinician, today.
        </p>
      </Section>

      <Section title="Already bought something sold as retatrutide?">
        <p className="sos-prose">
          Keep the packaging and lot details, and tell a clinician exactly what
          the label said, how much you believe you used, and what else you take,
          including any blood-pressure or diabetes medicine. Do not stack it with
          other experimental compounds to chase the trial numbers. If you feel
          faint or lightheaded, have persistent vomiting with signs of dehydration,
          severe or unrelenting abdominal pain, or chest pain, seek medical care
          rather than trying to ride it out. The <Link href="/support">support
          page</Link>{" "}keeps urgent routes close.
        </p>
        <p className="sos-prose">
          Retatrutide has genuinely earned a place on the watchlist: if and when
          it is approved, it could be one of the most effective metabolic tools
          available, and the metabolic win is the kind that matters for men&apos;s
          sexual health. It has not earned a place in a gray-market order. Bring
          the goal, whether that is weight, metabolic health, or erections, to a{" "}
          <Link href="/directory">licensed clinician</Link> who can work the
          approved channel with you now.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <h2 className="sos-kicker" style={{ marginBottom: "14px" }}>Sources &amp; important note</h2>
        <ul className="sos-note" style={{ listStyle: "none", padding: 0, display: "grid", gap: "14px" }}>
          {sources.map((source) => (
            <li id={`source-${source.id}`} key={source.id} style={{ scrollMarginTop: "100px" }}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">[{source.id}] {source.title}</a>. {source.note}
            </li>
          ))}
        </ul>
        <p className="sos-note" style={{ marginTop: "20px" }}>
          Evidence and regulatory status checked November 10, 2026. Emerging grade
          reflects strong but still-maturing Phase 3 efficacy, an unfinished
          cardiovascular-outcomes picture, and an investigational legal status that
          can change. Trial figures are rounded and attributed; company material is
          identified as such and is not independent confirmation. General
          education, not individualized medical advice. No sourcing, dosing, or
          self-treatment protocol is provided for this investigational compound.
        </p>
      </div>
      <Faq slug={slug} />
      <RelatedArticles slug={slug} />
    </article>
  );
}
