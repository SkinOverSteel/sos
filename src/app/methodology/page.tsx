import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we review",
  description:
    "The editorial standard every Skin Over Steel article is held to: how we grade evidence, how we source, who reviews it, the lines we won't cross, and how we handle being wrong.",
  alternates: { canonical: "/methodology" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "How we review: editorial and evidence standards",
  url: `${SITE.url}/methodology`,
  description:
    "How Skin Over Steel grades evidence, sources claims, reviews content, discloses money, and issues corrections.",
  datePublished: "2026-08-04",
  dateModified: "2026-08-04",
  publisher: { "@id": `${SITE.url}/#org` },
};

const GRADES: { grade: Grade; def: string }[] = [
  {
    grade: "established",
    def: "Guideline-level evidence: major clinical guidelines (e.g., the AUA) or strong, consistent peer-reviewed research. Safe to lean on.",
  },
  {
    grade: "emerging",
    def: "Early or mixed research. Biologically plausible and promising, but not yet settled. Weigh it as provisional, and expect it to move.",
  },
  {
    grade: "anecdote",
    def: "Lived experience, fenced off as exactly that: a member's n=1, never generalized into a recommendation for anyone else.",
  },
  {
    grade: "high-risk",
    def: "Practices where the evidence points to injury. Flagged so you can see the danger and the warning signs, never written as a how-to.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The standard
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        How we review
      </h1>

      <p className="sos-prose" style={{ marginBottom: "40px", maxWidth: "64ch" }}>
        Most information in men&apos;s sexual health is a funnel dressed up as
        advice. Here, the trust is the product, so this is the standard every
        article is held to, stated plainly enough that you can hold us to it.
      </p>

      <Section title="How we grade evidence">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "22px" }}>
          Every claim carries a visible <strong>evidence grade</strong>, so you
          always know how much weight it holds before you act on it.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {GRADES.map(({ grade, def }) => (
            <div
              key={grade}
              className="sos-card"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <EvidenceBadge grade={grade} />
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                {def}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How we source">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Claims trace back to <strong>named sources</strong> (clinical practice
          guidelines, peer-reviewed literature, and official prescriber or
          pharmacy documentation) cited on the page so you can check the
          original yourself. When the evidence is thin or contested, we say so
          and grade it down rather than rounding up to certainty.
        </p>
      </Section>

      <Section title="Who reviews it">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Every article is written and edited against this standard by the{" "}
          <strong>Skin Over Steel editorial desk</strong>, and carries the date
          it was last reviewed. That is what an <em>Editorial review</em>{" "}byline
          means: held to the standard on this page, not signed off by a named
          physician.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Named clinician review is the next layer of trust we&apos;re building.
          When a credentialed reviewer signs off on a piece, their name and
          credentials will appear on it. And we will never do the reverse:
          invent a reviewer, borrow a credential, or imply a doctor vetted
          something they didn&apos;t. An honest &quot;not yet&quot; beats a
          fabricated byline every time.
        </p>
      </Section>

      <Section title="The lines we won't cross">
        <ul className="sos-prose" style={list}>
          <li>
            <strong>No dosing or self-treatment protocols</strong>{" "}for
            prescription or gray-market compounds. That call belongs to your
            prescriber, every time.
          </li>
          <li>
            <strong>No how-to for physically risky procedures.</strong>{" "}We cover
            the risk landscape, the warning signs, and when to seek care, never
            the technique.
          </li>
          <li>
            <strong>We bridge toward medicine, not around it.</strong>{" "}The goal
            is to get you to a clinician better informed, not to route you past
            one.
          </li>
          <li>
            <strong>Crisis and emergency resources stay one tap away.</strong>{" "}
            The permanent <Link href="/support">Support</Link>{" "}link, including
            the prolonged-erection emergency, is never buried behind a paywall.
          </li>
        </ul>
      </Section>

      <Section title="Where the money is, and isn't">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Skin Over Steel is not a pharmacy and not a seller. Where the{" "}
          <Link href="/directory">directory</Link>{" "}lists a licensed provider we
          have a paid relationship with, we may earn a referral fee, disclosed at
          the link. The guardrail is absolute:
        </p>
        <p className="sos-note">
          A paid relationship <strong style={{ color: "var(--sos-text-hi)" }}>never
          moves an evidence grade or a ranking</strong>. It only adds a
          disclosure. Rankings follow published trust criteria alone. And a
          product with no legitimate, licensed channel gets education only, never
          a buy or referral flow.
        </p>
      </Section>

      <Section title="When we're wrong">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Evidence moves, and so will these pages. When the research shifts, a
          grade can be <strong>downgraded</strong>{" "}and the review date updated;
          material corrections are made in the open rather than quietly. This
          site&apos;s content and code are public, which is the point: a
          standard you can audit is the only kind worth publishing.
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
