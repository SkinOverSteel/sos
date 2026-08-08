import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Skin Over Steel is: evidence-graded men's sexual-health education and a transparent, criteria-ranked provider directory. Trust is the product.",
  alternates: { canonical: "/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Skin Over Steel",
  url: `${SITE.url}/about`,
  description:
    "Evidence-graded men's sexual-health education and a transparent provider directory.",
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function AboutPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        About
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What this is
      </h1>

      <div className="sos-morse" style={{ margin: "30px 0 40px" }} aria-hidden="true">
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
        <strong>Skin Over Steel</strong> is evidence-graded education and a
        transparent provider directory for men&apos;s sexual health — the
        conversation your urologist doesn&apos;t have time for. Most information
        in this space is a funnel built to sell you something. This is the
        opposite: the trust is the product.
      </p>

      <Section title="The standard">
        <p className="sos-prose">
          Every claim carries a visible <strong>evidence grade</strong> —{" "}
          Established, Emerging, or Anecdote — so you always know how much weight
          it holds. Sources are named. And everything bridges{" "}
          <em>toward</em> medicine, never around it: the goal is to get you to a
          clinician better informed, not to route you past one.
        </p>
      </Section>

      <Section title="What we won't do">
        <ul className="sos-prose" style={list}>
          <li><strong>No dosing or self-treatment protocols</strong> for prescription or gray-market compounds — the dose is your prescriber&apos;s call.</li>
          <li><strong>No gray-market sourcing.</strong> We point toward licensed clinicians and pharmacies, and explain how to tell the difference.</li>
          <li><strong>No pay-to-rank.</strong> In the directory, a paid relationship never moves a ranking or a grade — it only adds a disclosure.</li>
          <li><strong>No hype, no shame, no medical advice.</strong> Education, graded honestly.</li>
        </ul>
      </Section>

      <Section title="The two halves">
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <Link href="/learn" className="sos-card" style={{ display: "block", textDecoration: "none" }}>
            <h3 className="sos-h2" style={{ fontSize: "16px", textTransform: "none", marginBottom: "6px" }}>
              The library →
            </h3>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Evidence-graded articles: why sexual function is a signal worth
              answering, how to read your labs, treatment pharmacology, real
              value, and how to spot legitimate care.
            </p>
          </Link>
          <Link href="/directory" className="sos-card" style={{ display: "block", textDecoration: "none" }}>
            <h3 className="sos-h2" style={{ fontSize: "16px", textTransform: "none", marginBottom: "6px" }}>
              The directory →
            </h3>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Licensed labs, telemedicine, and compounding pharmacies — ranked
              only on transparent trust criteria, never on who pays.
            </p>
          </Link>
        </div>
      </Section>

      <Section title="The name">
        <p className="sos-prose">
          &quot;Skin over steel&quot; — warm and human, layered over something
          engineered and hard. <strong>SOS</strong> is the distress signal,
          claimed on purpose: the signal, answered. You&apos;ll see its Morse
          pattern (··· ––– ···) throughout.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-note">
          Skin Over Steel is general education, not medical advice, and not a
          pharmacy or seller. Nothing here replaces evaluation by a licensed
          clinician who knows your history.
        </p>
      </div>
    </div>
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
