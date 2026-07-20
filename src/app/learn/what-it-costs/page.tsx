import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "What it costs — and how to get real value",
  description:
    "The price of ED and men's-health therapy is a stack: labs, a consult, the product, and the prescriber's markup. A layer-by-layer journey to getting the most value inside the legal channel in your jurisdiction.",
  alternates: { canonical: "/learn/what-it-costs" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "What it costs — and how to get real value",
  url: `${SITE.url}/learn/what-it-costs`,
  description:
    "A layer-by-layer breakdown of what men's-health therapy costs — labs, consult, product, and prescriber markup — and how to get value within the legal channel.",
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function WhatItCostsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Money &amp; value</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What it costs
      </h1>
      <EvidenceBadge grade="established" title="Cost-stack structure is well established; specific figures are illustrative 2026 ranges." />

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

      <p className="sos-prose" style={{ marginBottom: "16px" }}>
        The number you pay is never one number. It&apos;s a{" "}
        <strong>stack</strong> of separate costs — bloodwork, a consult, the
        product itself, and a markup layered on top. Learn to see each layer and
        two things happen: you stop overpaying, and you can spot when
        someone&apos;s taking too big a cut. Here&apos;s the journey, roughly in
        the order you&apos;ll walk it.
      </p>
      <p className="sos-note" style={{ marginBottom: "40px" }}>
        Figures below are illustrative U.S. self-pay ranges (2026) to show the
        shape of the stack — not quotes. Always get current prices for your own
        provider and jurisdiction.
      </p>

      <Step
        n="1"
        title="Baseline labs — the workup"
        range="~$75–$250 self-pay"
      >
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Before any prescription, a real clinician wants a baseline: an{" "}
          <strong>androgen panel</strong> (total and free testosterone, SHBG) and
          a <strong>metabolic / insulin panel</strong> (fasting glucose, insulin,
          A1c, lipids). It&apos;s how the process bridges toward medicine — and a
          number to measure against later.
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            A single total-testosterone test runs as little as ~$15–$20 direct;
            a fuller men&apos;s hormone panel is ~$150–$350; a metabolic panel is
            ~$25–$80.
          </li>
          <li>
            <strong>Value lever:</strong> ordering direct-to-consumer (you book
            online, draw at a local lab) is usually cheaper than the same panel
            marked up through a clinic. Ask exactly what analytes are included.
          </li>
        </ul>
      </Step>

      <Step
        n="2"
        title="The consult — where the vig begins"
        range="$0–$150 up front, or $20–$133/mo"
      >
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          A licensed prescriber (telemedicine counts) reviews your labs and, if
          appropriate, writes the prescription. This is the first place the{" "}
          <strong>&quot;vig&quot;</strong> — the prescriber&apos;s cut — enters
          the stack.
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            Initial consults commonly run $0–$150 (some clinics $100–$500).
            Memberships range ~$20–$133/month.
          </li>
          <li>
            Two models: a <strong>one-time consult</strong> plus your own
            pharmacy, versus a <strong>monthly membership</strong> that bundles
            care and product together.
          </li>
          <li>
            <strong>Value lever:</strong> figure out whether a membership is
            buying you real ongoing care or just a subscription to marked-up
            product. Ask if you can use your own pharmacy for the fill.
          </li>
        </ul>
      </Step>

      <Step
        n="3"
        title="The product — the compounding pharmacy"
        range="Trimix ~$50–$300 / vial"
      >
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Your prescription is filled by a licensed compounding pharmacy. Using
          trimix as the worked example: a vial runs roughly{" "}
          <strong>$50–$300</strong>, and how long it lasts — weeks to months —
          depends on the protocol <em>your prescriber</em> sets, which is what
          turns a per-vial price into your real monthly cost.
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            The <strong>same vial</strong> can cost very differently: pharmacy
            selection alone can swing the price by around 50%, and a clinic that
            bundles the product usually adds a markup over the pharmacy&apos;s
            cash price.
          </li>
          <li>
            <strong>Value lever:</strong> ask the pharmacy for its{" "}
            <em>cash price</em> directly and compare bundled vs. unbundled. Online
            compounding pharmacies often have the lowest per-dose cost.{" "}
            <strong>HSA/FSA</strong> dollars effectively cut 20–37% via tax
            savings.
          </li>
        </ul>
      </Step>

      <Section title="The stack, put together">
        <div className="sos-card sos-card--deep" style={{ padding: 0, overflow: "hidden" }}>
          <StackRow layer="Labs (baseline / periodic)" range="$75 – $250" note="Often once or a few times a year" />
          <StackRow layer="Consult or membership" range="$0 – $150  ·  or  $20 – $133/mo" note="The prescriber's vig enters here" />
          <StackRow layer="Product (e.g. trimix)" range="$50 – $300 / vial" note="Lasts weeks–months per protocol" last />
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "18px" }}>
          The gap between a lean stack and an expensive one is mostly the{" "}
          <strong>vig and the bundling</strong> — not the medicine. Same molecule,
          very different total, depending on how many markups sit between you and
          the pharmacy.
        </p>
      </Section>

      <Section title="Getting the greatest value — legitimately">
        <ul className="sos-prose" style={list}>
          <li><strong>Unbundle when you can:</strong> labs direct, a consult for the script, the pharmacy&apos;s cash price for the product.</li>
          <li><strong>Watch for lock-in:</strong> a membership that quietly marks up product can cost more than it saves.</li>
          <li><strong>Use tax-advantaged dollars:</strong> HSA/FSA where you&apos;re eligible.</li>
          <li><strong>Re-test, don&apos;t over-buy:</strong> periodic labs keep you on the smallest effective plan your clinician supports.</li>
          <li>
            <strong>Cheapest is not gray-market.</strong> A $20 baggie with no
            pharmacy behind it isn&apos;t value — it&apos;s unverified risk. See{" "}
            <Link href="/learn/product-forms">what you&apos;re actually buying</Link>.
          </li>
        </ul>
      </Section>

      <Section title="Your jurisdiction changes the map">
        <ul className="sos-prose" style={list}>
          <li>
            In the U.S., trimix and compounded bremelanotide via a licensed
            prescriber + compounding pharmacy are broadly available with a
            prescription — but telemedicine-prescribing rules and compounding
            regulations differ by state, and some states or insurers restrict
            specialty compounds.
          </li>
          <li>
            Internationally it varies widely: some countries don&apos;t permit
            compounded ED injections or cross-state/border telemedicine
            prescribing, and importing prescription drugs is often restricted.
          </li>
          <li>
            <strong>Retatrutide is investigational everywhere</strong> — there is
            no lawful purchase channel in any jurisdiction, so the value question
            simply doesn&apos;t apply. The only lawful routes are a clinical trial
            or waiting for approval.
          </li>
          <li>
            <strong>Bottom line:</strong> verify what&apos;s legal where you live.
            The value move is optimizing <em>within</em> the legal channel — never
            routing around it.
          </li>
        </ul>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Illustrative ranges drawn from published 2026 self-pay pricing:{" "}
          <a href="https://www.defymedical.com/blog/how-much-does-trimix-cost/" target="_blank" rel="noopener noreferrer">Defy Medical (trimix cost)</a>,{" "}
          <a href="https://www.questhealth.com/product/mens-hormone-test-panel-basic/13073M.html" target="_blank" rel="noopener noreferrer">Quest Diagnostics (men&apos;s hormone panels)</a>, and{" "}
          <a href="https://vidavitalmedical.com/mens-health-clinic-costs/" target="_blank" rel="noopener noreferrer">VidaVital MD (clinic cost guide)</a>.
        </p>
        <p className="sos-note">
          This is general education, not medical, legal, or financial advice.
          Prices and laws change and vary by provider and jurisdiction — get
          current quotes and confirm what&apos;s legal where you live with the
          appropriate professional.
        </p>
      </div>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}

function Step({
  n,
  title,
  range,
  children,
}: {
  n: string;
  title: string;
  range: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "36px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap", marginBottom: "6px" }}>
        <span style={{ fontFamily: "var(--sos-mono)", fontSize: "12px", color: "var(--sos-copper)", letterSpacing: "0.12em" }}>
          STEP {n}
        </span>
        <h2 className="sos-h2" style={{ textTransform: "none", fontSize: "17px" }}>{title}</h2>
      </div>
      <p style={{ fontFamily: "var(--sos-mono)", fontSize: "14px", color: "var(--sos-text-hi)", marginBottom: "12px" }}>
        {range}
      </p>
      {children}
    </section>
  );
}

function StackRow({
  layer,
  range,
  note,
  last,
}: {
  layer: string;
  range: string;
  note: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "6px 16px",
        padding: "16px 20px",
        borderBottom: last ? "none" : "1px solid var(--sos-line-soft)",
      }}
    >
      <span style={{ fontFamily: "var(--sos-sans)", fontWeight: 700, fontStretch: "90%", fontSize: "14px", color: "var(--sos-text-hi)" }}>
        {layer}
      </span>
      <span style={{ fontFamily: "var(--sos-mono)", fontSize: "13.5px", color: "var(--sos-copper)", textAlign: "right" }}>
        {range}
      </span>
      <span style={{ fontFamily: "var(--sos-mono)", fontSize: "12px", color: "var(--sos-text-lo)", gridColumn: "1 / -1" }}>
        {note}
      </span>
    </div>
  );
}
