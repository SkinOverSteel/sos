import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Generic PDE5, filled for less",
  description:
    "Sildenafil and tadalafil are cheap generics — the gap between $3 and $400 is markup. Transparent-pricing pharmacies like Cost Plus Drugs, the 90-day supply lever, and the higher-strength economics to discuss with your prescriber.",
  alternates: { canonical: "/learn/generic-pde5-value" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Generic PDE5, filled for less",
  url: `${SITE.url}/learn/generic-pde5-value`,
  description:
    "How to fill a PDE5 inhibitor prescription cheaply through the legitimate channel: generics, transparent-pricing pharmacies, 90-day supply, and per-dose strength economics.",
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function GenericPde5ValuePage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Money &amp; value</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Generic PDE5, filled for less
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
        If you&apos;re a long-term PDE5 user, you&apos;re probably overpaying. Both
        sildenafil (generic Viagra) and tadalafil (generic Cialis) went generic
        years ago — the difference between <strong>$3 and $400</strong> a fill is
        markup, not medicine. Here&apos;s the honest value play, entirely inside
        the licensed channel.
      </p>

      <Section title="The generic reality">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Generic tadalafil runs roughly <strong>$9–$45 for 30 tablets</strong>{" "}
          against $350–$450 for brand Cialis, and generic sildenafil can drop to
          around <strong>$3</strong> a tablet. Paying brand-name money for a PDE5
          inhibitor today is a choice the pricing lets you avoid — you just have to
          shop the cash price instead of accepting the default.
        </p>
      </Section>

      <Section title="Transparent-pricing pharmacies (the Cost Plus model)">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The clearest example is <strong>Mark Cuban&apos;s Cost Plus Drugs</strong>,
          which prices by a simple formula — wholesale cost plus a flat 15% margin
          plus a pharmacy/shipping fee — instead of the usual insurance markup
          games. In a published analysis it offered the{" "}
          <strong>lowest direct-to-consumer price</strong> on 90-day sildenafil
          and tadalafil, undercutting telehealth bundlers by hundreds of dollars
          (over $300 on sildenafil and $900 on tadalafil versus one popular
          platform).
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The principle generalizes: it&apos;s a licensed mail-order pharmacy, and
          any transparent cash-price pharmacy or price-comparison tool tends to
          beat the brand-and-insurance default for a cheap generic. This is the
          same legitimate-channel logic as{" "}
          <Link href="/learn/telemedicine-visit">choosing a real prescriber</Link>{" "}
          — just applied to where you fill.
        </p>
      </Section>

      <Section title="The 90-day lever">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          For a steady long-term user, a <strong>90-day supply</strong> of a
          generic almost always beats three separate 30-day fills on a per-dose
          basis, and it&apos;s where the transparent pharmacies price most
          aggressively. If you take it routinely, ask your prescriber to write the
          script for 90 days.
        </p>
      </Section>

      <Section title="Why a higher strength can cost less per dose">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Here&apos;s the part people mean by &quot;the alpha,&quot; and it&apos;s
          real — but read the whole thing. Generic ED tablets are often priced{" "}
          <strong>similarly across strengths</strong>: a higher-strength tablet
          can cost about the same as a lower one, so per dose it can be far
          cheaper. Splitting a scored tablet is a well-known cost tactic that can
          cut a monthly bill by up to half.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Two honest caveats keep this from being a free-for-all:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>It&apos;s drug- and strength-specific.</strong> The flat-price
            pattern holds for sildenafil, but not always for tadalafil — at some
            pharmacies the 10&nbsp;mg costs several times the 5&nbsp;mg, so
            splitting saves nothing. Check before you assume.
          </li>
          <li>
            <strong>The dose stays with your prescriber.</strong> Only certain
            scored, immediate-release tablets are appropriate to split, your
            prescription has to be written for it, and a pharmacist should confirm
            the tablet is splittable. That&apos;s the conversation to have — not a
            recipe to run on your own.
          </li>
        </ul>
      </Section>

      <Section title="Only if you're already prescribed it">
        <p className="sos-prose">
          This is about paying less for a <em>legitimate prescription</em> — not a
          reason to self-source from a{" "}
          <Link href="/learn/product-forms">gray-market vial</Link> or to
          self-escalate. Long-term use, daily dosing, and any interaction with
          blood-pressure medication still need the supervision covered in{" "}
          <Link href="/learn/pde5-long-term">PDE5 inhibitors, long term</Link>, and
          the emerging vascular upside there isn&apos;t a DIY reason to take more.
          Fill it smart; let your clinician set the dose.
        </p>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          The free alpha isn&apos;t a trick — it&apos;s that the medicine is cheap
          and honest pharmacies exist to prove it. Shop the cash price, buy the
          90-day generic, and let your prescriber decide the strength. The value is
          real and fully legitimate.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://academic.oup.com/jsm/article/21/Supplement_1/qdae001.155/7600827" target="_blank" rel="noopener noreferrer">J. Sexual Medicine — savings with Cost Plus pharmacy for ED</a>;{" "}
          <a href="https://www.costplusdrugs.com/" target="_blank" rel="noopener noreferrer">Mark Cuban Cost Plus Drugs</a>; and{" "}
          <a href="https://www.goodrx.com/healthcare-access/research/differences-in-erectile-dysfunction-medication-prices" target="_blank" rel="noopener noreferrer">GoodRx — ED medication price differences &amp; pill-splitting</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not an instruction to split
          tablets or change your dose. Prices vary and change; splitting and dosing
          decisions belong with your prescriber and pharmacist. We have no paid
          relationship with any pharmacy named here.
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
