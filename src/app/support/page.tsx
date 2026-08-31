import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get support now",
  description:
    "Prolonged erection (priapism) after a penile injection, act by the clock: the non-drug steps, the rescue doses used in standard programs (pseudoephedrine, terbutaline, phenylephrine), and what the ER actually does to reverse it.",
  alternates: { canonical: "/support" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Prolonged erection (priapism): emergency guidance",
  url: `${SITE.url}/support`,
  description:
    "Harm-reduction guidance for a prolonged erection after penile injection therapy: the clock, the rescue doses published in standard patient handouts, and the ER reversal procedure (aspiration, phenylephrine, shunting).",
  about: { "@type": "MedicalCondition", name: "Priapism" },
  audience: { "@type": "Patient" },
  publisher: { "@id": `${SITE.url}/#org` },
};

const mono = "var(--sos-mono)";
const serif = "var(--sos-serif)";
const sans = "var(--sos-sans)";

export default function SupportPage() {
  return (
    <div className="w-full">
      <JsonLd data={jsonLd} />
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "40px 24px 96px",
        }}
      >
        {/* Emergency banner: safety-critical, unmuted on purpose */}
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
            An erection lasting 4 hours or longer (or one that is severely
            painful) is a urological emergency. Go to the nearest emergency room
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

        <MorseSOS style={{ margin: "34px 0" }} />

        <Section title="What's happening">
          <p style={pStyle}>
            Priapism is an involuntary erection that lasts more than four hours
            and doesn&apos;t go down after ejaculation. For anyone using trimix
            or another injection (ICP) therapy, it is the main serious risk to
            know cold, because acting quickly is what protects your long-term
            function. The trapped blood is starving the tissue of oxygen, and
            the damage clock is running the whole time. So this page runs on a
            clock too, with the actual numbers, because harm reduction means
            knowing what to do at hour two <em>before</em>{" "}it&apos;s hour three.
            (What the damage looks like, hour by hour, is{" "}
            <a href="/learn/priapism-clock" style={link}>
              the priapism clock
            </a>
            .)
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
              <strong style={strong}>Start low, go slow.</strong>{" "}
              Standard programs start the first injection at no more than
              0.05&nbsp;mL (5 units on the syringe) and go up only in
              0.05&nbsp;mL steps under a prescriber&apos;s direction. Never
              self-adjust. The dose that works is almost never the dose that
              feels impressive.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Keep your rescue plan within reach.</strong>{" "}
              If your prescriber gave you rescue instructions or a rescue
              medication, store them somewhere you can find in seconds, and read
              them once now, at peace, not for the first time at hour three.
            </li>
            <li style={liStyle}>
              <strong style={strong}>No rescue plan yet?</strong> Ask your
              prescriber for one before you need it: a written protocol and,
              where appropriate, a rescue prescription to keep on hand. That is
              a normal request in a competent injection program, not a paranoid
              one.
            </li>
          </ul>
        </Section>

        <Section title="The ladder: act by the clock">
          <p style={{ ...pStyle, marginBottom: "18px" }}>
            The moves below are the ones published in standard patient handouts
            for injection therapy. We print the numbers because they already
            exist on paper in every good program, and freezing at hour three
            because you never saw them is the failure mode we&apos;re here to
            prevent. They are the ladder, not a substitute for it: at four
            hours, the ladder ends at the ER.
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong style={strong}>Past your usual window, or approaching 2 hours:</strong>{" "}
              non-drug measures first. Apply an ice pack to the perineum or
              scrotal area (a frozen bag of vegetables works), and walk or climb
              stairs to redirect blood flow. These are real first steps, but
              know their limit: the urology guidelines are explicit that once
              this is a true ischemic priapism, ice, exercise, and pills are
              unlikely to fix it and must never delay definitive treatment.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Still going around 2 to 3 hours:</strong>{" "}
              the over-the-counter step in standard handouts is{" "}
              <strong style={strong}>pseudoephedrine 30&nbsp;mg by mouth</strong>{" "}
              (the real Sudafed, sold behind the pharmacy counter, ID required)
              or <strong style={strong}>diphenhydramine 25 to 50&nbsp;mg</strong>{" "}
              (Benadryl). Pick one, not both. If you have heart disease, high
              blood pressure, or take interacting medications, skip straight to
              calling your prescriber or the ER instead.
            </li>
            <li style={liStyle}>
              <strong style={strong}>
                Around 3 hours, or the OTC step didn&apos;t work: prescription
                rescue, if your prescriber gave you one.
              </strong>{" "}
              The two standard options:{" "}
              <strong style={strong}>terbutaline 10&nbsp;mg once</strong>, then
              another 5 to 10&nbsp;mg fifteen minutes later only if needed; or,{" "}
              <strong style={strong}>
                phenylephrine HCl 0.1%: 0.25&nbsp;mL injected into the penis
                every 3 to 5 minutes
              </strong>
              , up to a total of 1&nbsp;mL (1,000&nbsp;mcg) over no more than
              one hour, pressing on the injection site and massaging the shaft
              after each one so the drug spreads. Use these only as, and in the
              exact amounts, your prescriber told you. The numbers are printed
              here so you can recognize them and verify your own paperwork, not
              to replace it.
            </li>
            <li style={liStyle}>
              <strong style={strong}>
                At 4 hours (or sooner if it&apos;s severely painful): go to the
                ER. Now.
              </strong>{" "}
              The self-management phase is over. Nothing you take at home at
              hour four is a substitute for what they do there, and every hour
              past four raises the odds of permanent damage.
            </li>
            <li style={liStyle}>
              <strong style={strong}>Afterward:</strong> if you notice lumps,
              curvature, swelling, or tenderness, contact your prescriber. That
              is scar tissue forming, the same process behind{" "}
              <a href="/learn/peyronies-disease" style={link}>
                Peyronie&apos;s disease
              </a>
              , and early attention matters.
            </li>
          </ul>
        </Section>

        <Section title="What the ER actually does: the reversal">
          <p style={{ ...pStyle, marginBottom: "18px" }}>
            Men delay because they imagine the ER visit is worse than the
            problem. It isn&apos;t. Here is the actual sequence, from the
            AUA/SMSNA priapism guideline:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>
              <strong style={strong}>Confirm what kind it is.</strong> A blood
              sample is drawn from the penis (a corporal blood gas). Ischemic
              priapism, the kind injection therapy causes, shows up as dark,
              oxygen-starved blood, and it is the emergency.
            </li>
            <li style={liStyle}>
              <strong style={strong}>First-line reversal: drain and reverse.</strong>{" "}
              A needle goes into the corpora and the trapped blood is aspirated
              out, usually with saline irrigation, while{" "}
              <strong style={strong}>phenylephrine</strong>, the reversal drug,
              is injected in small repeated doses until the erection comes down.
              Blood pressure and heart rate are monitored while they do it.
              For a prolonged erection from an injection, the same drug is the
              guideline&apos;s recommended treatment even before four hours.
            </li>
            <li style={liStyle}>
              <strong style={strong}>If that fails: a shunt.</strong>{" "}A small
              surgical window is made between the erection chambers and the head
              of the penis (a distal shunt, sometimes with tunneling) to let the
              blood drain. It is a last resort, but it exists, and it works when
              the drugs don&apos;t.
            </li>
            <li style={liStyle}>
              <strong style={strong}>The part nobody says out loud:</strong>{" "}
              after an ischemic event lasting more than about 36 hours, the
              guideline itself counsels that the likelihood of recovering
              erectile function is low, and early penile prosthesis placement
              becomes the conversation. That is the entire reason the four-hour
              rule exists. Go early and the fix is usually a needle and an
              afternoon. Wait and it can cost you erections permanently.
            </li>
          </ul>
        </Section>

        {/* Mental-health / crisis, permanent */}
        <Section title="If you're struggling beyond the physical">
          <p style={pStyle}>
            Sexual health and mental health are tied together, and reaching out
            is the strong move. In the U.S., the{" "}
            <strong style={strong}>988 Suicide &amp; Crisis Lifeline</strong>{" "}
            is free and confidential, 24/7. Call or text{" "}
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
            Rescue doses adapted from patient guidance published by{" "}
            <a
              href="https://www.defymedical.com/wp-content/uploads/2022/06/Trimix-Priapism-Instructions.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Defy Medical (Trimix Priapism Instructions, 2022)
            </a>
            ; ER management from the{" "}
            <a
              href="https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              AUA/SMSNA Priapism Guideline (2022)
            </a>
            . This page practices harm reduction on purpose: the numbers are
            published because they already exist in every responsible
            program&apos;s paperwork, and a man who recognizes them acts faster
            than one who never saw them. They are education, not medical
            advice, and they do not replace the specific instructions your
            prescriber gave you. If your paperwork disagrees with this page,
            follow your prescriber and ask why.
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
