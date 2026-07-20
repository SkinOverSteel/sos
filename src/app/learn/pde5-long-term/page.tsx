import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "PDE5 inhibitors, long term",
  description:
    "Why PDE5 inhibitors seem to lose effect (usually disease progression, not tolerance), the emerging case for long-term vascular benefit, and why blood-pressure drug choice — nebivolol, telmisartan — matters when you have both ED and hypertension.",
  alternates: { canonical: "/learn/pde5-long-term" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "PDE5 inhibitors, long term",
  url: `${SITE.url}/learn/pde5-long-term`,
  description:
    "Long-term PDE5 inhibitor use: diminishing returns vs. disease progression, emerging vascular benefits, blood-pressure drug interactions, and safety.",
  about: { "@type": "Drug", name: "PDE5 inhibitor" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function Pde5Page() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        PDE5 inhibitors, long term
      </h1>
      <EvidenceBadge grade="emerging" title="The vascular-benefit and drug-selection theses are emerging / largely observational. The nitrate contraindication is Established." />

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
          PDE5 inhibitors are vasodilators. <strong>Never</strong> combine them
          with nitrates (including heart nitroglycerin and recreational
          &quot;poppers&quot;/amyl nitrite) — the combination can cause sudden,
          life-threatening drops in blood pressure. Any combination with
          blood-pressure medication must be set and monitored by your prescriber.
          Nothing below is a protocol to assemble yourself.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        PDE5 inhibitors — sildenafil, tadalafil, and relatives — are usually
        framed as on-demand pills. Two things complicate that picture over the
        long run, and both are worth understanding before you conclude the drug
        &quot;stopped working&quot; or reach for a bigger effect.
      </p>

      <Section title="Why they seem to stop working — and usually haven't">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          True tolerance — <em>tachyphylaxis</em>, the drug genuinely wearing out
          — has <strong>not</strong> been confirmed clinically. Chronic use
          doesn&apos;t appear to breed resistance. So when the response fades, the
          more likely explanation is that the <strong>underlying disease is
          progressing</strong>: worsening endothelial function, atherosclerosis,
          or diabetes.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          That reframes &quot;diminishing returns&quot; entirely — it&apos;s less
          a reason to push the dose and more a reason to look deeper. The fading
          effect is itself a signal. (That&apos;s the whole thesis of{" "}
          <Link href="/learn/erectile-function-signal">erectile function is a signal</Link>.)
          Many apparent &quot;failures&quot; are also fixable inputs — timing and
          food with some agents, insufficient stimulation, or low testosterone —
          not the pill quitting.
        </p>
      </Section>

      <Section title="The daily-dosing option">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          For a fading on-demand response, clinicians often consider a{" "}
          <strong>daily regimen</strong> (tadalafil is used this way) instead of
          episodic dosing — an approach that doesn&apos;t show tachyphylaxis and
          can restore responsiveness even in some on-demand non-responders. Which
          agent, which schedule, and whether it fits your other medications is a
          prescriber&apos;s call — not something to improvise.
        </p>
      </Section>

      <Section title="The emerging vascular upside">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Beyond erections, PDE5 inhibitors improve{" "}
          <strong>endothelial function</strong> — the same vascular lining
          discussed in the signal article — and tadalafil does so independently
          of how much ED a man has. Large observational studies associate PDE5
          inhibitor use with meaningfully lower rates of major cardiovascular
          events and all-cause mortality, mostly in middle-aged men with elevated
          baseline risk, with a possible dose-response.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The plausible mechanisms are real: better endothelial function, mild
          vasodilation, anti-inflammatory and antiplatelet effects, and some
          direct protection of heart muscle.
        </p>
        <p className="sos-note">
          Honest caveat — this evidence is largely <strong style={{ color: "var(--sos-text-hi)" }}>observational</strong>.
          Men who use these drugs and stay sexually active may simply be healthier
          to begin with, so causation isn&apos;t proven and this is not a
          guideline reason to take a PDE5 inhibitor &quot;for your heart.&quot;
          The blood-pressure effect itself is modest — think endothelial support
          with a gentle vasodilatory tilt, not a blood-pressure drug.
        </p>
      </Section>

      <Section title="Why your blood-pressure drug choice matters — the real lever">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Here&apos;s the useful insight for anyone treating <em>both</em> ED and
          hypertension: the win isn&apos;t stacking drugs for a bigger hit —
          it&apos;s that some blood-pressure medications sabotage erections and
          some protect them. A clinician managing both can choose accordingly.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Nebivolol (Bystolic)
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Unusual among beta-blockers: it triggers{" "}
              <strong>nitric-oxide-mediated vasodilation</strong>. In head-to-head
              study, metoprolol worsened erectile-function scores while nebivolol
              did not — and it improved some — at comparable blood-pressure
              control. Among beta-blockers, it&apos;s the erection-friendlier
              choice.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Telmisartan
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              An ARB with <strong>PPAR-γ activity</strong> that improves insulin
              sensitivity and endothelial function beyond other ARBs — while ARBs
              as a class are generally erection-neutral. For a man whose ED sits on
              top of metabolic syndrome, it treats blood pressure{" "}
              <em>and</em> the metabolic driver underneath.
            </p>
          </div>
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px" }}>
          That&apos;s the legitimate &quot;synergy&quot;: not a bigger vasodilator
          hit, but choosing agents that control blood pressure and metabolism{" "}
          <strong>without wrecking erectile function</strong> — and ideally
          supporting the shared endothelium. It&apos;s individualized, and it&apos;s
          your prescriber&apos;s call.
        </p>
      </Section>

      <Section title="The safety reality of combining vasodilators">
        <ul className="sos-prose" style={list}>
          <li>
            <strong style={{ color: "var(--sos-emergency)" }}>Nitrates: absolute contraindication.</strong>{" "}
            Synergistic, potentially fatal hypotension — includes prescribed
            nitroglycerin and recreational poppers. <EvidenceBadge grade="established" />
          </li>
          <li>
            <strong>Alpha-blockers:</strong> risk of a sudden blood-pressure drop
            (fainting, and worse); needs careful timing and dosing by a prescriber.
          </li>
          <li>
            <strong>Other antihypertensives</strong> (beta-blockers like nebivolol,
            ARBs like telmisartan, ACE inhibitors, calcium-channel blockers,
            diuretics): usually only <em>small</em> additive drops in blood
            pressure without a rise in serious events — but &quot;usually&quot; is
            doing work. It&apos;s still additive, so the first combination and any
            changes belong under medical supervision, especially if you&apos;re on
            several agents or prone to dehydration.
          </li>
        </ul>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          PDE5 inhibitors probably don&apos;t wear out — your vasculature changing
          is the likelier story, and that&apos;s a reason to investigate, not just
          escalate. There&apos;s a real, still-emerging case that they support the
          endothelium long-term. And if you&apos;re treating blood pressure too,
          the smart lever isn&apos;t a bigger combined hit — it&apos;s choosing
          agents like nebivolol and telmisartan that defend erectile function and
          the metabolism beneath it. Take this to a clinician; the combination has
          to be built for you and watched.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1397768/" target="_blank" rel="noopener noreferrer">Treating ED when PDE5 inhibitors fail</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/17324145/" target="_blank" rel="noopener noreferrer">MR NOED study (nebivolol vs metoprolol)</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10878497/" target="_blank" rel="noopener noreferrer">tadalafil &amp; cardiovascular events/mortality</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11323371/" target="_blank" rel="noopener noreferrer">meta-analysis of PDE5i cardiovascular outcomes</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/21848583/" target="_blank" rel="noopener noreferrer">telmisartan &amp; insulin sensitivity (systematic review)</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK558978/" target="_blank" rel="noopener noreferrer">StatPearls: sildenafil pharmacology &amp; interactions</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a treatment protocol.
          Every drug and combination here is prescription-only and must be chosen,
          dosed, and monitored by a licensed clinician who knows your full
          history. Do not start, stop, or combine any of these on your own.
        </p>
      </div>
    </article>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  fontSize: "16px",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}
