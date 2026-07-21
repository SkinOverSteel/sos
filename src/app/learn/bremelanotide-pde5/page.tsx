import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bremelanotide + PDE5: two different levers",
  description:
    "The pharmacology of combining bremelanotide (PT-141) with PDE5 inhibitors: complementary central-desire and peripheral-erection mechanisms, early evidence in PDE5 non-responders, and the blood-pressure and off-label safety realities.",
  alternates: { canonical: "/learn/bremelanotide-pde5" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Bremelanotide + PDE5: two different levers",
  url: `${SITE.url}/learn/bremelanotide-pde5`,
  description:
    "Combining bremelanotide (PT-141) with PDE5 inhibitors — mechanisms, emerging evidence, and cardiovascular/off-label safety.",
  about: { "@type": "Drug", name: "Bremelanotide" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function BremelanotidePde5Page() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Bremelanotide + PDE5: two different levers
      </h1>
      <EvidenceBadge grade="emerging" title="The combination in men is early-stage and off-label. Bremelanotide's blood-pressure effect and cardiovascular contraindications are Established from its FDA label." />

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

      {/* Safety callout — read first */}
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
          Bremelanotide <strong>raises blood pressure</strong> and is
          contraindicated in uncontrolled hypertension or known cardiovascular
          disease. In men it is <strong>off-label</strong>, and combining it with
          a PDE5 inhibitor is not an approved regimen. This is a decision for a
          clinician who has screened your cardiovascular status — not a stack to
          assemble yourself.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The reason combining these two is even interesting is that they don&apos;t
        do the same job. A PDE5 inhibitor is <strong>peripheral hydraulics</strong>
        — it helps the blood vessels of the penis open once arousal is already
        happening. Bremelanotide works <strong>upstream, in the brain</strong>, on
        desire and arousal itself. Two different levers on two different parts of
        the problem.
      </p>

      <Section title="Two mechanisms, not one bigger one">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              PDE5 inhibitors — peripheral
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Work through the nitric-oxide / cGMP pathway to relax and open
              penile blood vessels. They enable an erection when arousal is
              present — but they don&apos;t create desire. (More in{" "}
              <Link href="/learn/pde5-long-term">PDE5 inhibitors, long term</Link>.)
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Bremelanotide (PT-141) — central
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              A melanocortin-receptor agonist that acts in the central nervous
              system on the pathways of sexual desire and arousal — upstream of
              the erection itself. That&apos;s a fundamentally different target
              from a PDE5 inhibitor, which is exactly why the two could address
              different failure points.
            </p>
          </div>
        </div>
      </Section>

      <Section title="What the evidence actually shows">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Early-phase trials found that co-administering PT-141 with sildenafil
          produced a <strong>significantly greater erectile response</strong> than
          sildenafil alone. In men who didn&apos;t respond adequately to sildenafil,
          PT-141 outperformed placebo (roughly <strong>34% vs 9%</strong> reporting
          meaningful improvement) — pointing to a real add-on role for PDE5
          non-responders.
        </p>
        <p className="sos-note">
          Read that with care. These were <strong style={{ color: "var(--sos-text-hi)" }}>small, early-stage</strong>{" "}
          studies, largely of an intranasal formulation that was later
          discontinued. The only approved bremelanotide product (Vyleesi, a
          subcutaneous injection) is approved <strong style={{ color: "var(--sos-text-hi)" }}>for women</strong> with
          low sexual desire — use in men, and the combination with a PDE5
          inhibitor, is off-label and not established. Promising ≠ proven.
        </p>
      </Section>

      <Section title="The catch that changes the calculus: it raises blood pressure">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          This is the part that makes &quot;just add it for more effect&quot;
          wrong. Bremelanotide <strong>transiently raises blood pressure</strong>{" "}
          (about 6 mmHg systolic, peaking a few hours after a dose) and lowers
          heart rate, returning to baseline within about half a day. Its label
          <strong> contraindicates</strong> it in uncontrolled hypertension or
          known cardiovascular disease, does not recommend it in people at high
          cardiovascular risk, and caps use at no more than a few doses a month.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          So it isn&apos;t &quot;extra vasodilation&quot; layered on a PDE5
          inhibitor — it&apos;s a drug pushing blood pressure the{" "}
          <em>opposite</em> direction, with its own cardiac profile. That&apos;s
          precisely why the combination belongs with a prescriber who has checked
          your heart and blood pressure first — and why the{" "}
          <Link href="/learn/erectile-function-signal">cardiovascular workup</Link>{" "}
          matters here more than ever.
        </p>
      </Section>

      <Section title="And most 'PT-141' isn't the approved drug">
        <p className="sos-prose">
          Because it&apos;s off-label in men, much of what&apos;s sold as
          &quot;PT-141&quot; is gray-market research product — the unverified
          identity, purity, and dose problem covered in{" "}
          <Link href="/learn/product-forms">what you&apos;re actually buying</Link>.
          Stacking an unverified pressor with a vasodilator, off a baggie, with no
          clinician watching your blood pressure, is where the real danger lives.
          The legitimate path is a licensed prescriber.
        </p>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          The two-lever idea is genuine pharmacology, and there&apos;s early
          evidence it can help men who don&apos;t respond to a PDE5 inhibitor
          alone. But in men it&apos;s off-label, the combination evidence is
          early, and bremelanotide&apos;s blood-pressure and cardiac effects make
          self-combining genuinely risky. The alpha, if there is one, is only
          real inside a supervised, cardiovascularly-screened plan — never out of
          a baggie.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/15833522/" target="_blank" rel="noopener noreferrer">co-administration of PT-141 &amp; sildenafil (enhanced response)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/14999221/" target="_blank" rel="noopener noreferrer">PT-141 in men with inadequate response to sildenafil</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7752520/" target="_blank" rel="noopener noreferrer">review of emerging ED therapies</a>; and the{" "}
          <a href="https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8c9607a2-5b57-4a59-b159-cf196deebdd9" target="_blank" rel="noopener noreferrer">FDA VYLEESI (bremelanotide) prescribing information</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a treatment protocol.
          Bremelanotide is off-label in men and its use with a PDE5 inhibitor is
          not an approved regimen; both are prescription drugs that must be
          chosen, dosed, and monitored by a licensed clinician who knows your
          cardiovascular history. Do not combine them on your own.
        </p>
      </div>
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
