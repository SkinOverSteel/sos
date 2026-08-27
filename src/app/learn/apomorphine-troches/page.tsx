import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { withReview } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apomorphine's second act",
  description:
    "Apomorphine troches for ED, explained: what the dopamine-agonist actually does, why sublingual apomorphine (Uprima) was withdrawn, what's really inside the compounded sildenafil-tadalafil-apomorphine \"3-in-1\" troches sold by telehealth, and what user feedback says about them.",
  alternates: { canonical: "/learn/apomorphine-troches" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Apomorphine's second act",
  url: `${SITE.url}/learn/apomorphine-troches`,
  description:
    "Apomorphine for erectile dysfunction: the Uprima history, the compounded sildenafil-tadalafil-apomorphine troche trend, and what the evidence and user feedback actually show.",
  about: { "@type": "Drug", name: "Apomorphine" },
  audience: { "@type": "Patient" },
};

export default function ApomorphineTrochesPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "apomorphine-troches")} />
      <Breadcrumbs slug="apomorphine-troches" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Apomorphine&apos;s second act
      </h1>
      <ArticleMeta
        slug="apomorphine-troches"
        gradeNote="Apomorphine's own ED evidence is Established, and establishes modest efficacy. The three-drug troche combination has no clinical trial behind it. The androgen add-ons discussed at the end are Anecdote grade."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      {/* Safety callout: read first */}
      <aside
        role="note"
        className="sos-card"
        style={{
          border: "1.5px solid var(--sos-emergency)",
          background: "var(--sos-emergency-glow)",
          marginBottom: "40px",
        }}
      >
        <p className="sos-kicker" style={{ color: "var(--sos-emergency)", marginBottom: "8px" }}>
          Read this first
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The troches discussed here are <strong>prescription compounds</strong>, and
          the ones that combine sildenafil and tadalafil are stacking{" "}
          <strong>two PDE5 inhibitors in one dose</strong>. Every PDE5 inhibitor, at
          any dose, is dangerous with nitrates, and apomorphine can cause fainting.
          None of this is a stack to assemble or adjust yourself, and this page is
          not a recommendation to. It&apos;s a map of a market.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        If you&apos;ve seen an ad for a &quot;3-in-1&quot; sublingual ED troche that
        melts under your tongue and claims to be several times stronger than the
        pills, you&apos;ve met apomorphine&apos;s second act. The first act ended
        two decades ago, when the molecule was tested honestly and came up short.
        The revival is worth understanding, not because the product is a scandal{" "}
        – it isn&apos;t – but because it&apos;s a clean case study in how compounded
        telehealth builds a product: one cheap generic doing the work, one exotic
        ingredient doing the marketing.
      </p>

      <Section title="A different lever: dopamine, not blood flow">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Apomorphine is real pharmacology, and its mechanism is genuinely
          interesting. Despite the name, it&apos;s not an opioid. It&apos;s a{" "}
          <strong>dopamine agonist</strong>{" "}that acts in the brain, mainly on D2
          receptors in the hypothalamus, at one of the switchboards where sexual
          arousal is assembled. Stimulate it and the brain sends a pro-erectile
          signal down the spinal cord.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          That makes it a <strong>central</strong>{" "}lever, upstream of the erection,
          where a PDE5 inhibitor like sildenafil or tadalafil is{" "}
          <strong>peripheral hydraulics</strong>{" "}– it helps penile blood vessels
          open once arousal is already happening. Same upstream/downstream split we
          walked through for{" "}
          <Link href="/learn/bremelanotide-pde5">bremelanotide + PDE5</Link>, and
          on paper the combination logic is identical: two different levers on two
          different parts of the problem.
        </p>
      </Section>

      <Section title="Act one: Uprima, tested and retired">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Here&apos;s what makes apomorphine different from most gray-zone
          ingredients: it already had its fair trial. Sublingual apomorphine was
          developed as a real drug (Uprima, also sold as Ixense) and approved in
          Europe in 2001. In the pivotal studies, the 3 mg dose produced erections
          firm enough for intercourse in about{" "}
          <strong>49% of attempts, against a baseline of about 24%</strong>. Real,
          measurable, and honest. Also clearly weaker than the PDE5 inhibitors it
          had to compete with.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Then came the tolerability bill. The signature side effect was{" "}
          <strong>nausea</strong>, the most common reason men quit the drug, with
          dizziness, yawning, and in rare cases fainting alongside. Public Citizen
          formally urged the FDA to reject it over the syncope cases, the US
          application was withdrawn, and after a few quiet years in Europe the
          product was discontinued there too.
        </p>
        <p className="sos-note">
          The molecule kept its legitimate career where the mechanism fits:
          apomorphine remains an approved rescue therapy in{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>Parkinson&apos;s disease</strong>, where its dopamine
          agonism is the whole point, and where nausea is so expected that
          pre-treating with an anti-nausea drug is standard discussion.
        </p>
      </Section>

      <Section title="Act two: the compounded troche">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Twenty years later apomorphine is back, and what changed isn&apos;t the
          science. It&apos;s the business model. Compounding pharmacies can legally
          combine patent-expired drugs into &quot;personalized&quot; formulations
          that never have to pass a clinical trial, and telehealth turned that into
          a national mail-order channel. The flagship products are sublingual
          troches that pair a{" "}
          <strong>full-strength sildenafil dose with a large tadalafil dose</strong>{" "}
          (formulas on the market run up to 100 mg and 40 mg respectively, the
          tadalafil several times a typical on-demand amount) plus{" "}
          <strong>about 6 mg of apomorphine</strong>. Sold as &quot;3-in-1&quot; and
          &quot;3x stronger than generics,&quot; by one flagship brand and by
          compounding pharmacies supplying med spas and telehealth clinics with
          essentially the same recipe.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Two things are true at once. First: this specific three-drug combination
          has <strong>never been through a clinical trial</strong>, and apomorphine
          has never been FDA-approved for erectile dysfunction. Second: the
          products mostly do work for the men who take them, because a maximum
          dose of sildenafil stacked with a multiple of the usual tadalafil dose
          is a very large amount of PDE5 inhibition. Which raises the only
          question that matters: <em>which ingredient are you paying for?</em>
        </p>
      </Section>

      <Section title="What users actually report">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Read enough user feedback on the troches and a consistent picture forms,
          and it&apos;s the picture the pharmacology predicts:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              &quot;It works&quot; tracks the PDE5 payload
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              The satisfied reports describe exactly what high-dose, long-acting
              PDE5 inhibition delivers: reliability and a 36-hour window. That&apos;s
              the tadalafil talking. Nothing in the feedback pattern separates the
              triple troche from what the same men would get from the two generics
              alone, and no trial exists to make that separation either.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Nausea is the tell
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              The side effect users most often attribute to the &quot;special&quot;
              ingredient is queasiness, apomorphine&apos;s signature, the same one
              that retired Uprima. When the marginal ingredient&apos;s clearest
              contribution is its side effect, that tells you something about its
              marginal benefit.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The product friction is its own review
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Independent testing found the troches soften at warm room
              temperature and fully melt near 120°F, a real problem for a product
              that ships through summer mail. Recurring complaints center on
              subscription cancellation and price: the troche costs several times
              what the same generic molecules cost from a transparent pharmacy.
            </p>
          </div>
        </div>
        <p className="sos-note" style={{ marginTop: "16px" }}>
          None of this makes the troche dangerous by compounded-product standards,
          and a licensed 503A/503B pharmacy with a real prescription is the
          legitimate channel. The point is narrower: the evidence says you&apos;re
          buying a premium wrapper around two generics you could{" "}
          <Link href="/learn/generic-pde5-value">fill for a few dollars</Link>.
        </p>
      </Section>

      <Section title="Meanwhile, the conversation moved to androgens">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Here&apos;s the part the ads won&apos;t tell you. In the communities that
          log and compare these things over years, the men chasing better desire
          and erection <em>quality</em>{" "}(as distinct from acute rigidity, which
          PDE5 inhibitors own outright) largely didn&apos;t land on dopamine
          agonists. They landed on <strong>androgens</strong>: specifically DHT and
          its derivatives, with mesterolone (Proviron) the perennial name, used as
          an add-on by men already on{" "}
          <Link href="/learn/testosterone-therapy">testosterone therapy</Link>.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The mechanistic story is coherent: DHT binds the androgen receptor
          several-fold more strongly than testosterone, genital tissue is
          DHT-dominant, desire itself is androgen-dependent, and mesterolone also
          lowers SHBG, which raises the{" "}
          <Link href="/learn/read-your-labs">free fraction of testosterone</Link>.
          And the epistemics are almost a mirror image of the troche: apomorphine
          has trials proving modest efficacy and a marketing machine behind it;
          mesterolone has no modern trials and no marketing at all, and survives
          purely on decades of repeated first-person reports.
        </p>
        <p className="sos-note">
          Now the fence, stated plainly. Those reports are{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>Anecdote grade</strong>: consistent, but never run through
          the trials that would separate effect from expectation. Mesterolone is
          not FDA-approved, and in the US, DHT-derivative anabolics are Schedule
          III controlled substances, which means the supply is gray-market with
          all the{" "}
          <Link href="/learn/product-forms">identity and purity problems</Link>{" "}
          that implies, plus real androgen side effects (hair, lipids, prostate
          monitoring, suppression). We don&apos;t publish protocols for that, and
          the honest version of this signal isn&apos;t &quot;source Proviron.&quot;
          It&apos;s that if desire and erection quality are the problem,{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>your androgen status is the first thing worth
          checking with a clinician</strong>, with real labs, inside the legal
          channel.
        </p>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          Apomorphine is a real molecule with a fair trial on the books, and the
          verdict from that trial hasn&apos;t changed: modest efficacy, nausea as
          the price, retired for cause. The troche revival re-sells that molecule
          inside a large double dose of PDE5 generics, at a multiple of the
          generic price, with no new evidence, and user feedback keeps
          rediscovering the original verdict one queasy evening at a time. If a
          prescriber and a licensed pharmacy stand behind a troche and it works
          for you, that&apos;s a legitimate treatment. But know which ingredient
          is working, pay generic prices for it where you can, and take the
          desire-and-quality question where it actually leads: a{" "}
          <Link href="/learn/telemedicine-visit">real evaluation</Link>{" "}and your
          own lab work, not a stronger-sounding lozenge.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11741126/" target="_blank" rel="noopener noreferrer">oral apomorphine SL for erectile dysfunction (efficacy and tolerability)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11558862/" target="_blank" rel="noopener noreferrer">dose-optimization study of sublingual apomorphine</a>;{" "}
          <a href="https://www.citizen.org/article/letter-urging-rejection-of-apomorphine-uprima/" target="_blank" rel="noopener noreferrer">Public Citizen letter urging FDA rejection of Uprima</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11136727/" target="_blank" rel="noopener noreferrer">apomorphine sublingual film in Parkinson&apos;s disease</a>;{" "}
          compounded formulation specifications from{" "}
          <a href="https://www.empowerpharmacy.com/compounding-pharmacy/sildenafil-apomorphine-hcl-troche/" target="_blank" rel="noopener noreferrer">Empower Pharmacy</a>{" "}and{" "}
          <a href="https://www.cfspharmacy.com/apomorphine-sildenafil-tadalafil-compounded/" target="_blank" rel="noopener noreferrer">CareFirst Specialty Pharmacy</a>;{" "}
          <a href="https://www.innerbody.com/rugiet-reviews" target="_blank" rel="noopener noreferrer">Innerbody&apos;s independent testing and review of the flagship troche</a>; and{" "}
          <a href="https://en.wikipedia.org/wiki/Mesterolone" target="_blank" rel="noopener noreferrer">mesterolone pharmacology</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a treatment protocol.
          Every drug named here is prescription-only where lawfully available at
          all; mesterolone and other DHT derivatives are not FDA-approved and are
          controlled substances in the US. Treatment decisions, combinations, and
          monitoring belong with a licensed clinician who knows your history.
        </p>
      </div>
      <Faq slug="apomorphine-troches" />
      <RelatedArticles slug="apomorphine-troches" />
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}
