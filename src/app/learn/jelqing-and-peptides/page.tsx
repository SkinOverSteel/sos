import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jelqing and the healing-stack theory",
  description:
    "Jelqing plus a peptide 'healing stack' — the wolverine blend of BPC-157 and TB-500, and rHGH — promises to injure the tissue and heal it bigger. An honest, evidence-graded look at whether it works and what it costs. No how-to.",
  alternates: { canonical: "/learn/jelqing-and-peptides" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Jelqing and the healing-stack theory",
  url: `${SITE.url}/learn/jelqing-and-peptides`,
  description:
    "An evidence-graded review of the jelqing 'heal-and-grow' theory and the peptides stacked with it — BPC-157, TB-500 (thymosin beta-4), and recombinant human growth hormone — covering efficacy, regulatory status, and injury risk.",
  about: { "@type": "MedicalProcedure", name: "Penile augmentation" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

const PARTS: { grade: Grade; name: string; what: string; verdict: string }[] = [
  {
    grade: "anecdote",
    name: "Jelqing",
    what: "A manual “milking” technique meant to force repeated micro-trauma — on the theory the tissue heals back bigger.",
    verdict:
      "No credible evidence of lasting size, and a real record of bruising, pain, and scarring. Erectile tissue isn't a muscle you hypertrophy — connective tissue heals toward scar, which is how you get curvature, not length. We don't publish the technique, because here the technique is the risk.",
  },
  {
    grade: "high-risk",
    name: "The “wolverine blend” — BPC-157 + TB-500",
    what: "Two synthetic peptides sold gray-market and stacked for “healing” — the fast-recovery nickname is the whole pitch.",
    verdict:
      "The honest state: genuinely interesting preclinical (animal) tissue-repair signals, and near-zero human evidence. BPC-157's entire human record is a few dozen people in uncontrolled pilot studies, and regulators found no legal basis even to compound it; TB-500 is an ill-defined product that anti-doping agencies ban as a growth factor. “Better healing of self-inflicted tears” was never shown to mean a bigger penis — in anyone.",
  },
  {
    grade: "high-risk",
    name: "rHGH (growth hormone)",
    what: "A real, powerful prescription hormone, added for systemic “growth.”",
    verdict:
      "It grows genitals in growth-hormone-deficient children — not in adults, where there's no enhancement evidence and little anabolic effect at all. What it reliably brings is acromegaly, insulin resistance, joint pain, fluid retention, and — the irony — impotence. Distributing it for uses like this is a federal crime, which is a large part of why the supply is what it is.",
  },
];

export default function JelqingAndPeptidesPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "jelqing-and-peptides")} />
      <Breadcrumbs slug="jelqing-and-peptides" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Jelqing and the healing-stack theory
      </h1>
      <ArticleMeta
        slug="jelqing-and-peptides"
        gradeNote="The underlying healing science is a real frontier; using it to justify jelqing plus gray-market self-injection for enlargement is not — that part is unproven and injury-risk. Each piece is graded on its own below."
      />

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
        The pitch is tidy: <strong>jelq</strong> to deliberately micro-injure the
        tissue, then inject a <strong>&quot;wolverine blend&quot;</strong> of
        BPC-157 and TB-500 — sometimes with growth hormone — to{" "}
        <strong>heal it back bigger</strong>. It borrows the logic of building
        muscle and points it at tissue that doesn&apos;t work that way. It&apos;s
        mechanically seductive, almost entirely unproven for this, and the
        injectable half is where it turns genuinely dangerous. Here&apos;s each
        piece, graded — not a protocol. There are no doses on this page on purpose;
        the only question worth answering is whether it works and what it costs.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The stack, graded
        </h2>
        <p className="sos-note" style={{ marginBottom: "20px" }}>
          Three parts, three very different honest verdicts.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {PARTS.map((p) => (
            <div
              key={p.name}
              className="sos-card"
              style={p.grade === "high-risk" ? { borderLeft: "3px solid var(--sos-emergency)" } : undefined}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "10px" }}>
                <EvidenceBadge grade={p.grade} />
                <span style={{ fontFamily: "var(--sos-sans)", fontWeight: 700, fontStretch: "90%", fontSize: "15px", color: "var(--sos-text-hi)" }}>
                  {p.name}
                </span>
              </div>
              <p className="sos-note" style={{ marginBottom: "8px" }}>{p.what}</p>
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>{p.verdict}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the theory is seductive — and where it breaks
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          &quot;Injure it, then heal it stronger&quot; is a real principle — for{" "}
          <strong>muscle</strong>. The erectile chambers aren&apos;t muscle you
          hypertrophy with reps, and the tunica that wraps them heals like
          connective tissue everywhere else: toward <strong>scar</strong>. That&apos;s
          not a bigger penis — that&apos;s the raw material of{" "}
          <Link href="/learn/peyronies-disease">Peyronie&apos;s disease</Link>, a
          curve from a fibrous plaque. Even granting that BPC-157 or thymosin β4
          help wounds close faster in a rat, &quot;faster healing of tears you
          inflicted on purpose&quot; is a very long way from a proven way to grow.
          Nobody has shown the loop closes.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The supply problem
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Set efficacy aside and one hard fact remains: you cannot verify what&apos;s
          in a gray-market vial. BPC-157 isn&apos;t legally compoundable; TB-500 is
          sold &quot;without detailed qualitative description&quot; — meaning even
          the sellers don&apos;t fully define it. Drawing an unknown-purity biologic
          into a syringe and putting it into genital tissue is the exact{" "}
          <Link href="/learn/enhancement">enhancement-injection</Link> pattern that
          ends in granulomas, infection, and necrosis — and it&apos;s the same
          reason <Link href="/learn/product-forms">what you&apos;re actually buying</Link>{" "}
          matters more than any label on it.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          If you&apos;ve injected — know the emergency
        </h2>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            If you&apos;ve injected anything for size or &quot;healing&quot; and you
            develop <strong>pain, swelling, hardening, a change in skin color,
            fever, or an area that&apos;s breaking down</strong> — treat it as an
            emergency and get seen now. Infection and tissue death only worsen with
            time. <Link href="/support">Get support now</Link> is the fastest route.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          The healing-stack theory borrows muscle logic for tissue that scars
          instead of grows, adds injectables nobody can verify and no human study
          supports for this, and stacks real harm — fibrosis, infection, growth
          hormone&apos;s own metabolic and erectile downsides — against a payoff of
          zero. The healing you can actually bank on is unglamorous: not injuring
          yourself, and a vascular system you&apos;ve{" "}
          <Link href="/learn/training-for-erections">trained</Link> and{" "}
          <Link href="/learn/ed-workup">had checked</Link>. If the goal is size, the
          honest map is <Link href="/learn/enhancement">here</Link>. If it&apos;s
          function, that&apos;s a workup — not a wolverine blend.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.usada.org/spirit-of-sport/bpc-157-peptide-prohibited/" target="_blank" rel="noopener noreferrer">USADA on BPC-157</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11859134/" target="_blank" rel="noopener noreferrer">a BPC-157 literature &amp; patent review</a>;{" "}
          <a href="https://www.wada-ama.org/en/prohibited-list" target="_blank" rel="noopener noreferrer">the WADA Prohibited List (growth factors, incl. TB-500)</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3104052/" target="_blank" rel="noopener noreferrer">a review of human growth hormone abuse</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and deliberately not a protocol,
          dosing guide, or how-to. Anything injectable belongs to a licensed
          clinician; unapproved compounds sold outside that channel are a risk you
          carry alone.
        </p>
      </div>

      <RelatedArticles slug="jelqing-and-peptides" />
    </article>
  );
}
