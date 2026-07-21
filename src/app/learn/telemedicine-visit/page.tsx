import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "What a good telemedicine visit looks like",
  description:
    "How to tell a legitimate men's-health telemedicine visit from a pill mill: the green flags of real evaluation, the red flags of a checkout-form prescription, and the questions to ask.",
  alternates: { canonical: "/learn/telemedicine-visit" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "What a good telemedicine visit looks like",
  url: `${SITE.url}/learn/telemedicine-visit`,
  description:
    "Distinguishing legitimate men's-health telemedicine from pill-mill prescribing: evaluation standards, red flags, and questions to ask.",
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

const GREEN = [
  <>Takes a <strong>real history</strong> — cardiovascular risk, every medication you take (the nitrate check), and the whole ED-as-a-signal picture.</>,
  <>Orders or reviews <strong>labs before prescribing</strong> — an androgen and metabolic panel, and for testosterone, two early-morning draws, not a single number. (See <Link href="/learn/read-your-labs">read your labs</Link>.)</>,
  <>Screens <strong>blood pressure and cardiovascular risk</strong> — non-negotiable before ED or hormone therapy, given how these drugs interact with the heart.</>,
  <>A <strong>named clinician licensed in your state</strong> whom you can actually talk to — not a form reviewed within two business days.</>,
  <>Explains the <strong>why</strong> and bridges toward medicine — treats ED as a signal worth investigating, not just a pill to sell.</>,
  <><strong>Structured follow-up and monitoring</strong> — rechecking that treatment is working and safe (for testosterone, hematocrit and PSA).</>,
  <>Lets you <strong>use your own pharmacy</strong>, prices transparently, and doesn&apos;t trap you in a subscription.</>,
];

const RED = [
  <>Prescribes off a <strong>one-page intake form</strong> — no labs, no exam, no real conversation.</>,
  <>No blood-pressure or <strong>cardiovascular screening</strong> at all.</>,
  <>Won&apos;t name the prescriber or confirm they&apos;re <strong>licensed where you live</strong>.</>,
  <>Bundles product at a markup, <strong>membership lock-in</strong>, and hard upsells.</>,
  <>Will prescribe <strong>off-label or gray-market</strong> compounds with no workup.</>,
  <><strong>No follow-up</strong> once the sale is made.</>,
];

const QUESTIONS = [
  "Who is my prescriber, and are they licensed in my state?",
  "What labs will you run before prescribing — and will you repeat testosterone in the morning?",
  "How do you screen my heart and blood pressure?",
  "Can I use my own pharmacy?",
  "What's the follow-up and monitoring plan?",
];

export default function TelemedicineVisitPage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Choosing care</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What a good telemedicine visit looks like
      </h1>
      <EvidenceBadge grade="established" />

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

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Telemedicine can deliver genuinely good men&apos;s-health care — or it can
        be a checkout form with a doctor&apos;s signature stapled on. The
        difference is simple: <strong>did anyone actually evaluate you?</strong>{" "}
        A real prescriber is the throughline that separates every safe path on
        this site from the gray market, so it&apos;s worth knowing how to spot one.
      </p>

      <Section title="Green flags — a real evaluation">
        <div className="sos-card sos-card--deep">
          <ul className="sos-prose" style={flagList}>
            {GREEN.map((item, i) => (
              <li key={i} style={{ color: "var(--sos-grade-established)" }}>
                <span style={{ color: "var(--sos-text-md)" }}>✓ {item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Red flags — a pill mill">
        <div className="sos-card sos-card--deep">
          <ul className="sos-prose" style={flagList}>
            {RED.map((item, i) => (
              <li key={i} style={{ color: "var(--sos-emergency)" }}>
                <span style={{ color: "var(--sos-text-md)" }}>✕ {item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="The nuance: sometimes in-person still matters">
        <p className="sos-prose">
          Especially for testosterone therapy, guidelines favor an in-person exam
          by the prescriber where possible — or a local primary-care exam
          alongside the telehealth visit. Good platforms acknowledge that and work
          with it. A pill mill just skips it. Telemedicine done right isn&apos;t
          lesser care; it&apos;s the same evaluation, delivered at a distance.
        </p>
      </Section>

      <Section title="Questions to bring">
        <div className="sos-card">
          <ul className="sos-prose" style={{ ...flagList, gap: "12px" }}>
            {QUESTIONS.map((q, i) => (
              <li key={i}>
                <span style={{ fontFamily: "var(--sos-mono)", color: "var(--sos-copper)", fontSize: "13px", marginRight: "8px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          Good telemedicine is a real clinician doing real evaluation at a
          distance. A pill mill is a vending machine with a disclaimer. Everything
          this site is about — the{" "}
          <Link href="/learn/erectile-function-signal">signal</Link>, the{" "}
          <Link href="/learn/read-your-labs">workup</Link>, treatment, and{" "}
          <Link href="/learn/product-forms">where the product comes from</Link> —
          runs through having an actual prescriber. Choose one who acts like it.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8604198/" target="_blank" rel="noopener noreferrer">Testosterone replacement therapy in the era of telemedicine</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/32945730/" target="_blank" rel="noopener noreferrer">Evaluation of online telehealth platforms for ED</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10397420/" target="_blank" rel="noopener noreferrer">Characteristics of direct-to-consumer ED platforms</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice. Telemedicine regulations and what
          a clinician can prescribe vary by state and country — verify licensure
          where you live.
        </p>
      </div>
    </article>
  );
}

const flagList: React.CSSProperties = {
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
