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

const slug = "atx-304";
const title = "ATX-304: the exercise pill is real. The six-pack is still hypothetical.";
const description = "ATX-304 (ATX304, formerly O304): human trial results, the 8% vs. 33% metabolism claims, fat loss, side effects, and why it is not an ED drug or a proven gym shortcut.";

export const metadata: Metadata = {
  title: "ATX-304 (ATX304): human trials, fat loss, and safety",
  description,
  alternates: { canonical: `/learn/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE.url}/learn/${slug}`,
    siteName: SITE.name,
    type: "article",
    publishedTime: "2026-09-16",
    modifiedTime: "2026-09-16",
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
  about: { "@type": "Drug", name: "ATX-304", alternateName: ["ATX304", "O304"] },
  audience: { "@type": "Patient" },
};

function Cite({ ids }: { ids: number[] }) {
  return <>{ids.map((id) => <a key={id} href={`#source-${id}`} aria-label={`Source ${id}`} style={{ fontSize: "0.8em", verticalAlign: "super" }}>[{id}]</a>)}</>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "18px" }}>{title}</h2>
      <div style={{ display: "grid", gap: "16px" }}>{children}</div>
    </section>
  );
}

export default function Atx304Page() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, slug)} />
      <Breadcrumbs slug={slug} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}><b>Treatment &amp; pharmacology</b></p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>{title}</h1>
      <ArticleMeta slug={slug} gradeNote="Emerging: real early human metabolic signals, including an older O304 trial, but the current obesity evidence is a small conference report plus sponsor disclosures. Durable weight loss, exercise replacement, and sexual benefits are not established. Editorial review, not a clinician sign-off." />
      <MorseSOS style={{ margin: "34px 0" }} />

      <aside className="sos-card" role="note" style={{ borderLeft: "3px solid var(--sos-emergency)", marginBottom: "32px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>The short version</p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          ATX-304 is an investigational oral small molecule, not a peptide. Its developer says it is not available for human use outside clinical trials. The recent human study reported metabolic improvements but minimal weight loss at the exposure tested. That is a reason to keep watching the research, not a reason to buy a research chemical.<Cite ids={[6]} />
        </p>
      </aside>

      <p className="sos-prose">
        A pill that makes your metabolism act more like you exercised is an excellent pitch to a man who wants less belly and more engine. ATX-304, also searched as ATX304 and previously studied as O304, has more behind it than a mouse photo and a supplement label: there is published human research under the old name and a newer obesity study under the new one.<Cite ids={[3, 4, 5]} />
      </p>
      <p className="sos-prose" style={{ marginTop: "16px" }}>
        The trap is turning that into a result nobody measured. Better metabolic markers are not automatically a six-pack, a bigger bench, or better erections. The interesting version of this story is what survives when those promises are taken off the table.
      </p>

      <Section title="What is ATX-304, and why the exercise comparison?">
        <p className="sos-prose">
          AMPK, short for AMP-activated protein kinase, helps cells respond to their energy state. The ATX-304 program aims to influence that signaling network alongside mitochondrial activity, increasing fuel use rather than simply presenting another appetite-suppression pitch. Cambrian describes it as a peripherally restricted, oral small molecule targeting obesity and associated metabolic disease.<Cite ids={[1, 6]} />
        </p>
        <p className="sos-prose">
          The pharmacology is not just &quot;metformin, but stronger.&quot; Earlier O304 work described preservation of the activating phosphorylation of AMPK. More recent research also describes increased mitochondrial respiration, including uncoupling; the sponsor&apos;s 2026 mechanistic report says AMPK activation was not secondary to falling cellular ATP levels.<Cite ids={[3, 4, 6]} />
        </p>
        <p className="sos-note">
          Those are mechanistic findings, not proof that the drug reproduces an exercise program. A pathway shared with exercise does not establish equivalent strength, fitness, or health outcomes. &quot;Exercise mimetic&quot; describes the research ambition, not permission to retire your legs.
        </p>
      </Section>

      <Section title="The human evidence did not start with the new name">
        <p className="sos-prose">
          In 2018, Steneberg and colleagues published TELLUS: an exploratory, randomized, double-blind, placebo-controlled Phase IIa study of O304 in 65 people with type 2 diabetes already taking metformin. Treatment lasted 28 days. The paper reported signals in fasting glucose, insulin resistance, blood pressure, and calf-muscle microvascular perfusion.<Cite ids={[4]} />
        </p>
        <p className="sos-prose">
          Read the methods before upgrading that to a victory lap. The glucose analysis highlighted in the paper selected a baseline-glucose subgroup after the fact, and some perfusion analyses were also post hoc. This was short proof-of-concept work in a specific patient population, not evidence that a healthy lifter can take the compound indefinitely and become metabolically invincible.<Cite ids={[4]} />
        </p>
        <p className="sos-note">
          That history matters when a newer announcement calls its results the first human translation. The 2026 Phase 1b study is a new study in obesity and prediabetes, not the first human evidence anywhere in the O304/ATX-304 lineage. Different study phases and populations should not be mashed into one continuous weight-loss trial.<Cite ids={[3, 4, 6]} />
        </p>
      </Section>

      <Section title="The 2026 study: metabolic movement, minimal weight loss">
        <p className="sos-prose">
          The ADA conference abstract describes 23 participants with obesity and prediabetes, randomized 2:1 to ATX-304 or placebo for eight weeks, with an optional open-label extension to 16 weeks. It reports increases in adiponectin and reductions in liver and visceral fat compared with baseline. This is a conference abstract, not a full-length clinical trial report.<Cite ids={[5]} />
        </p>
        <p className="sos-prose">
          Cambrian&apos;s June 18, 2026 release adds reduced triglycerides and an 8% increase in resting metabolic rate. It also says something that deserves at least as much attention: <strong>minimal weight loss was observed at this exposure level</strong>.<Cite ids={[6]} />
        </p>
        <p className="sos-prose">
          That does not make the metabolic findings worthless, and it does not tell us what a different exposure might do. It does mean this study is not evidence of dramatic human weight loss. Resting metabolic rate measures energy expenditure at rest; it is not a percentage of body fat lost, an exercise-performance score, or a promise about how your waist will change.
        </p>
        <div className="sos-card sos-card--deep">
          <h3 className="sos-h2" style={{ fontSize: "22px", marginBottom: "12px" }}>8% versus &quot;up to 33%&quot;: do not shop for the bigger number</h3>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            The published abstract says resting metabolic rate increased &quot;up to 33%&quot; compared with baseline. The sponsor&apos;s later release reports 8%. The available text does not reconcile the populations, time points, or summary statistics behind those figures. We cannot treat them as interchangeable, label 33% the average, or turn either into a placebo-adjusted treatment effect without the corresponding analysis.<Cite ids={[5, 6]} />
          </p>
          <p className="sos-note" style={{ marginTop: "12px" }}>
            The same caution applies to the fat and biomarker results: a statistically significant change from baseline is not automatically a statistically significant difference from placebo. Randomization does not make every number in an abstract a between-group result.
          </p>
        </div>
      </Section>

      <Section title="Fat loss without losing muscle: check the species">
        <p className="sos-prose">
          The animal evidence is genuinely interesting. A 2025 JCI Insight study found reduced body fat and improvements in liver steatosis and fibrosis development in a mouse model of progressive fatty liver disease. The work included tissue-level metabolic analyses, not just a lighter mouse on a scale.<Cite ids={[3]} />
        </p>
        <p className="sos-prose">
          The 2026 ADA abstract also summarizes earlier animal findings in which ATX-304 combined with incretin drugs increased weight loss and limited regain after incretin withdrawal without a change in lean tissue mass. That passage describes animal work, not the 23-person study that follows it.<Cite ids={[5]} />
        </p>
        <p className="sos-prose">
          Preserving lean tissue in an animal model is not proof of muscle retention during a human cut, and it is certainly not a muscle-building result. Combining ATX-304 with a GLP-1 drug in a study rationale does not establish a safe or effective do-it-yourself stack. The human combination question still needs its own trial, not a dose converter.
        </p>
      </Section>

      <Section title="Does ATX-304 help erections or testosterone?">
        <p className="sos-prose">
          Neither the older TELLUS report nor the new Phase 1b abstract reports an erectile-function benefit or a testosterone-treatment outcome. The blood-flow measurement in TELLUS was in calf muscle, not penile tissue. Calling that an ED result changes the organ and the outcome without doing the experiment.<Cite ids={[4, 5]} />
        </p>
        <p className="sos-prose">
          This is where the story belongs on Skin Over Steel: a metabolic drug can become a men&apos;s-health promise through a sequence of plausible-sounding substitutions. Better glucose handling becomes better circulation; better circulation becomes better erections; better body composition becomes higher testosterone. Each step needs evidence of its own.
        </p>
        <p className="sos-note">
          If erection changes brought you here, start with the <Link href="/learn/ed-workup">ED workup</Link>, not an AMPK experiment. For the separate question of actual exercise and erectile function, read <Link href="/learn/training-for-erections">Erections are trainable</Link>. For another case where vascular pharmacology outruns gym-outcome evidence, see <Link href="/learn/cialis-pre-workout">Cialis as a pre-workout</Link>.
        </p>
      </Section>

      <Section title="Side effects: reassuring early observations are not a finished safety profile">
        <p className="sos-prose">
          In the newer study, the sponsor reported predominantly mild treatment-emergent adverse events at a frequency similar to placebo, no increase in monitored core body temperature or 24-hour heart rate, and no new safety signals during the extension. These are encouraging observations in that study, not proof that every dose, combination, or duration is safe.<Cite ids={[6]} />
        </p>
        <p className="sos-prose">
          A small, short study cannot settle uncommon harms, long-term safety, or interactions with the combinations people actually take. Nor can a trial of a controlled investigational product certify an unrelated powder sold under the same name. A vendor&apos;s label is not a bridge into the clinical evidence.
        </p>
        <p className="sos-note">
          The older trial&apos;s blood-pressure and glucose findings also belong in the conversation with a clinician, especially if you take medicines affecting either. They justify caution and disclosure; they do not establish a specific ATX-304 drug-interaction formula.<Cite ids={[4]} />
        </p>
      </Section>

      <Section title="Is ATX-304 approved, and what happens next?">
        <p className="sos-prose">
          The current developer material describes ATX-304 as investigational and unavailable for human use outside clinical trials. Cambrian&apos;s program page labels the program Phase 2, while its June release describes REWIRE-1 and REWIRE-2 as planned studies of muscle function, lipid metabolism, and weight loss. Those statements are development updates, not evidence of completed Phase 2 efficacy or confirmation that a particular site is recruiting.<Cite ids={[1, 6]} />
        </p>
        <p className="sos-prose">
          The next useful results would show how much benefit remains against placebo, whether it lasts, what happens to muscle function as well as lean mass, and what the fuller adverse-event record looks like. An exercise-replacement claim would also need relevant human performance outcomes, not just a metabolism graph.
        </p>
      </Section>

      <Section title="Already bought it? Keep the label, lose the secrecy">
        <p className="sos-prose">
          If you have already used something sold as ATX304, tell your clinician exactly what the label said, when you used it, how much you believe you took, and what else you take. Keep the packaging and lot details. Do not escalate or add other experimental products to chase a resting-metabolism number from an abstract. If you are in a trial, contact the study team about symptoms and follow its instructions.
        </p>
        <p className="sos-prose">
          For chest pain, fainting, severe breathlessness, confusion, or a severe allergic reaction, seek emergency care rather than trying to identify the ingredient yourself. These are general emergency warning signs, not a list of proven ATX-304 adverse effects. The <Link href="/support">support page</Link>{" "}keeps urgent-care routes close.
        </p>
        <p className="sos-prose">
          ATX-304 deserves a place on the research watchlist. It has not earned a place in your supplement organizer. Bring the goal you were trying to solve, whether that is weight, glucose, fatigue, or erections, to a <Link href="/directory">licensed clinician</Link>. That conversation is useful now, even while the drug&apos;s story is unfinished.
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
          Evidence checked September 16, 2026. Emerging grade reflects preliminary human efficacy, a small conference report, and substantial reliance on developer disclosures for the current program. Sponsor material is identified as such; it is not independent confirmation. General education, not individualized medical advice. No sourcing, self-dosing, or stacking protocol is provided for this investigational compound.
        </p>
      </div>
      <Faq slug={slug} />
      <RelatedArticles slug={slug} />
    </article>
  );
}
