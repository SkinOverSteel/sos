import type { Metadata } from "next";
import { EvidenceBadge } from "@/components/EvidenceBadge";

export const metadata: Metadata = {
  title: "What you're actually buying: forms, quality & red flags",
  description:
    "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication tells you where it came from — and whether anyone stood behind its quality.",
  alternates: { canonical: "/learn/product-forms" },
};

export default function ProductFormsPage() {
  return (
    <article className="sos-container">
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What you&apos;re actually buying
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
        When you buy an injectable peptide or ED medication, the{" "}
        <strong>form it arrives in</strong> tells you a lot about where it came
        from and whether anyone with a license stood behind its quality. Here is
        how to read it — and the difference between a regulated product and a
        baggie from an anonymous seller.
      </p>

      <Section title="The three forms you'll encounter">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <FormCard
            label="Lyophilized vial (freeze-dried powder)"
            tone="good"
            body="The pharmaceutical standard. A sterile, sealed vial of dry powder that you or a provider reconstitute with bacteriostatic water before use. From a licensed compounding pharmacy it arrives labeled: drug name, strength, lot/batch number, a beyond-use date, the pharmacy's name, and your prescription number. Freeze-drying keeps it stable with a long shelf life."
          />
          <FormCard
            label="Reconstituted / pre-mixed solution"
            tone="ok"
            body="A ready-to-use liquid. Legitimate for some drugs — trimix, for example, is typically dispensed by a compounding pharmacy as a pre-mixed refrigerated solution, labeled, with a cold chain and a beyond-use date. It's trustworthy when it comes from a licensed pharmacy with that labeling and handling — and a question mark when it doesn't."
          />
          <FormCard
            label={'"Ziplock of premix" / unlabeled vials'}
            tone="bad"
            body={
              'A pre-filled syringe or vial handed over in a baggie, with no pharmacy label — often stamped "for research use only / not for human consumption." That is the gray market: no prescription, no sterility or potency guarantee, no independent batch testing, and an unknown storage history. The "research only" label is a legal shield for the seller, not a mark of quality.'
            }
          />
        </div>
      </Section>

      <Section title="Green flags vs. red flags">
        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          <div className="sos-card sos-card--deep">
            <p
              className="sos-kicker"
              style={{ color: "var(--sos-grade-established)", marginBottom: "12px" }}
            >
              Green — legitimate
            </p>
            <ul className="sos-prose" style={flagList}>
              <li>Pharmacy label with your name and an Rx number</li>
              <li>Drug, strength, lot/batch, and beyond-use date printed on it</li>
              <li>Reached you through a prescription and a licensed pharmacy</li>
              <li>Tamper-evident seal; cold chain when required</li>
              <li>A named pharmacist you can actually call</li>
            </ul>
          </div>
          <div className="sos-card sos-card--deep">
            <p
              className="sos-kicker"
              style={{ color: "var(--sos-emergency)", marginBottom: "12px" }}
            >
              Red — walk away
            </p>
            <ul className="sos-prose" style={flagList}>
              <li>&quot;Research use only / not for human consumption&quot;</li>
              <li>No prescription and no licensed pharmacy involved</li>
              <li>No independent potency/purity testing (or a vendor&apos;s own unverifiable &quot;COA&quot;)</li>
              <li>Ziplock or hand-labeled, paid to an anonymous seller</li>
              <li>&quot;Figure the dose out yourself&quot;</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="The three you asked about, specifically">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <CompoundRow grade="established" name="Trimix">
            Exists legitimately <strong>only</strong> as a compounded
            prescription. Real trimix is a pre-mixed, refrigerated vial from a
            licensed compounding pharmacy, labeled, dispensed through your
            prescriber. A baggie of premix from an unknown source is not the same
            product, however similar it looks.
          </CompoundRow>
          <CompoundRow grade="established" name="Bremelanotide (PT-141)">
            A licensed channel exists: it&apos;s FDA-approved as{" "}
            <strong>Vyleesi</strong> (an auto-injector, approved for premenopausal
            women with low sexual desire) and is also compounded — often as a
            lyophilized vial — via prescription. Off-label use in men is{" "}
            <em>emerging</em>, not established. Gray-market &quot;research&quot;
            PT-141 vials carry none of the identity, purity, or dose guarantees
            the licensed forms do.
          </CompoundRow>
          <CompoundRow grade="emerging" name="Retatrutide">
            The one to be clearest about:{" "}
            <strong>
              it is investigational — not FDA-approved, and not lawfully available
              from any licensed pharmacy.
            </strong>{" "}
            That means anything currently sold as &quot;retatrutide&quot; is, by
            definition, gray-market research product with unverified identity,
            purity, and dose. There is no legitimate form to compare it against
            yet. Human safety and efficacy data for this use are still emerging.
            (Its approval status can change — check current status before acting.)
          </CompoundRow>
        </div>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          If you want any of these therapies, the path that comes with quality
          guarantees is the same one: a{" "}
          <strong>licensed prescriber</strong> (telemedicine counts) and a{" "}
          <strong>licensed compounding pharmacy</strong>. That&apos;s the version
          where someone&apos;s license is on the line for what&apos;s in the vial
          — and it&apos;s the only kind of source this site will ever point you
          toward.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Important note
        </p>
        <p className="sos-note">
          This page is general education, not medical advice, and is not an
          endorsement of any unapproved or off-label use. Product availability and
          approval status change over time — verify current status, and make
          decisions with a licensed clinician.
        </p>
      </div>
    </article>
  );
}

const flagList: React.CSSProperties = {
  listStylePosition: "inside",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "15.5px",
  lineHeight: 1.5,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: "40px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function FormCard({
  label,
  body,
  tone,
}: {
  label: string;
  body: string;
  tone: "good" | "ok" | "bad";
}) {
  const accent =
    tone === "good"
      ? "var(--sos-grade-established)"
      : tone === "bad"
        ? "var(--sos-emergency)"
        : "var(--sos-text-lo)";
  return (
    <div
      className="sos-card"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <h3
        className="sos-h2"
        style={{ fontSize: "13px", color: accent, marginBottom: "8px" }}
      >
        {label}
      </h3>
      <p className="sos-prose" style={{ fontSize: "16px" }}>
        {body}
      </p>
    </div>
  );
}

function CompoundRow({
  name,
  grade,
  children,
}: {
  name: string;
  grade: "established" | "emerging" | "anecdote" | "high-risk";
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        paddingLeft: "18px",
        borderLeft: "2px solid var(--sos-line)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        <span
          className="sos-h2"
          style={{ fontSize: "15px", textTransform: "none" }}
        >
          {name}
        </span>
        <EvidenceBadge grade={grade} />
      </div>
      <p className="sos-prose" style={{ fontSize: "16px" }}>
        {children}
      </p>
    </div>
  );
}
