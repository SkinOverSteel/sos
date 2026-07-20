import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get support now",
  description:
    "Prolonged erection (priapism) after a penile injection is a medical emergency. What to do, how to lower the risk, and when to go to the ER.",
  alternates: { canonical: "/support" },
};

const mono = "var(--sos-mono)";
const serif = "var(--sos-serif)";
const sans = "var(--sos-sans)";

export default function SupportPage() {
  return (
    <div className="w-full">
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "40px 24px 96px",
        }}
      >
        {/* Emergency banner — safety-critical, unmuted on purpose */}
        <aside
          role="alert"
          style={{
            border: "1.5px solid var(--sos-emergency)",
            background: "var(--sos-emergency-glow)",
            borderRadius: "10px",
            padding: "20px 22px",
            marginBottom: "40px",
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: mono,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              color: "var(--sos-emergency)",
              marginBottom: "10px",
            }}
          >
            Medical emergency
          </p>
          <p
            style={{
              fontFamily: sans,
              fontWeight: 700,
              fontStretch: "88%",
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.2,
              color: "var(--sos-text-hi)",
            }}
          >
            An erection lasting 4 hours or longer — or one that is severely
            painful — is a urological emergency. Go to the nearest emergency room
            now.
          </p>
          <p
            style={{
              fontFamily: serif,
              fontSize: "16px",
              lineHeight: 1.55,
              color: "var(--sos-text-md)",
              marginTop: "10px",
            }}
          >
            The longer it lasts, the higher the risk of permanent damage. Early
            treatment gives the best chance of keeping normal function.
          </p>
        </aside>

        {/* Header */}
        <p
          className="uppercase"
          style={{
            fontFamily: mono,
            fontSize: "12px",
            letterSpacing: "0.14em",
            color: "var(--sos-text-lo)",
            marginBottom: "14px",
          }}
        >
          Safety · Penile injection therapy (ICP / trimix)
        </p>
        <h1
          style={{
            fontFamily: sans,
            fontWeight: 800,
            fontStretch: "84%",
            fontSize: "clamp(30px, 5vw, 44px)",
            lineHeight: 1.02,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            color: "var(--sos-text-hi)",
            marginBottom: "16px",
          }}
        >
          Prolonged erection (priapism)
        </h1>
        <span
          className="sos-badge sos-badge--established"
          style={{ color: "var(--sos-grade-established)" }}
        >
          Established
        </span>

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

        <Section title="What's happening">
          <p style={pStyle}>
            Priapism is an involuntary erection that lasts more than four hours
            and doesn&apos;t go down after ejaculation. For anyone using trimix
            or another injection (ICP) therapy, it is the main serious risk to
            know cold — because acting quickly is what protects your long-term
            function.
          </p>
        </Section>

        <Section title="Lower the risk before it happens">
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong style={strong}>
                Never combine an injection with an oral ED pill.
              </strong>{" "}
              Don&apos;t take trimix or any ICP injection within the same 24
              hours as Viagra, Cialis, Levitra, or similar.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Start low, go slow.</strong> Your
              prescriber sets your dose. First doses are kept small and increased
              only under their direction — never self-adjust.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Keep your rescue plan within reach.</strong>{" "}
              If your prescriber gave you rescue instructions or a rescue
              medication, store them somewhere you can find in seconds.
            </li>
          </ul>
        </Section>

        <Section title="If an erection won't go down — act by the clock">
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong style={strong}>Safe first steps you can do now:</strong>{" "}
              apply an ice pack to the perineum/scrotal area, and walk or climb
              stairs to help redirect blood flow.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Rescue medication is prescriber-directed.</strong>{" "}
              Some clinicians recommend an over-the-counter first step
              (pseudoephedrine) or provide a rescue prescription to keep on hand
              (such as terbutaline or phenylephrine). Use these{" "}
              <em>only as, and in the exact amounts, your prescriber told you.</em>{" "}
              We don&apos;t publish rescue doses here on purpose — the right ones
              come from the clinician who prescribed your injections.
            </li>
            <li style={liStyle}>
              <strong style={strong}>
                At 4 hours — or sooner if it&apos;s severely painful — go to the
                ER.
              </strong>{" "}
              Don&apos;t keep waiting for it to resolve on its own.
            </li>
            <li style={liStyle}>
              Afterward, if you notice lumps, curvature, swelling, or tenderness,
              contact your prescriber.
            </li>
          </ul>
        </Section>

        {/* Mental-health / crisis — permanent */}
        <Section title="If you're struggling beyond the physical">
          <p style={pStyle}>
            Sexual health and mental health are tied together, and reaching out
            is the strong move. In the U.S., the{" "}
            <strong style={strong}>988 Suicide &amp; Crisis Lifeline</strong> is
            free and confidential, 24/7 — call or text{" "}
            <a href="tel:988" style={link}>
              988
            </a>
            . Outside the U.S., contact your local emergency number or a crisis
            line in your country.
          </p>
        </Section>

        {/* Source + disclaimer */}
        <div
          style={{
            marginTop: "48px",
            padding: "22px 24px",
            background: "var(--sos-e1)",
            border: "1px solid var(--sos-line)",
            borderRadius: "10px",
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: mono,
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "var(--sos-text-lo)",
              marginBottom: "10px",
            }}
          >
            Sources &amp; important note
          </p>
          <p
            style={{
              fontFamily: mono,
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--sos-text-lo)",
            }}
          >
            Adapted for general education from patient guidance published by{" "}
            <a
              href="https://www.defymedical.com/wp-content/uploads/2022/06/Trimix-Priapism-Instructions.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Defy Medical (Trimix Priapism Instructions, 2022)
            </a>{" "}
            and standard urologic-emergency practice. Dosing of trimix itself is
            set and adjusted only by your prescribing provider. This page is
            education, not medical advice, and does not replace the specific
            instructions your prescriber gave you.
          </p>
        </div>
      </div>
    </div>
  );
}

const pStyle: React.CSSProperties = {
  fontFamily: serif,
  fontSize: "18px",
  lineHeight: 1.65,
  color: "var(--sos-text-md)",
};
const ulStyle: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};
const liStyle: React.CSSProperties = {
  fontFamily: serif,
  fontSize: "17px",
  lineHeight: 1.6,
  color: "var(--sos-text-md)",
  paddingLeft: "18px",
  borderLeft: "2px solid var(--sos-line)",
};
const strong: React.CSSProperties = {
  color: "var(--sos-text-hi)",
  fontWeight: 600,
};
const link: React.CSSProperties = { color: "var(--sos-copper)" };

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "40px" }}>
      <h2
        style={{
          fontFamily: sans,
          fontWeight: 700,
          fontStretch: "90%",
          fontSize: "14.5px",
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          color: "var(--sos-text-hi)",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
