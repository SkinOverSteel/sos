import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enhancement, honestly",
  description:
    "Penis pumps, fillers, traction devices, surgery, jelqing, peptide 'healing stacks' (BPC-157, TB-500), growth hormone, and gray-market injections: the enhancement landscape, mapped and evidence-graded. What legitimately helps, what's temporary, and what causes permanent injury.",
  alternates: { canonical: "/learn/enhancement" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Enhancement, honestly",
  url: `${SITE.url}/learn/enhancement`,
  description:
    "An evidence-graded map of penile enhancement methods (vacuum devices, traction, fillers, surgery, manual techniques, and gray-market injections) covering efficacy, what is temporary, and injury risk.",
  about: { "@type": "MedicalProcedure", name: "Penile augmentation" },
  audience: { "@type": "Patient" },
};

const METHODS: { grade: Grade; name: string; what: string; verdict: string }[] = [
  {
    grade: "established",
    name: "Vacuum erection devices (“pumps”)",
    what: "A cylinder and pump draw blood into the penis; a ring at the base holds the erection.",
    verdict:
      "Legitimate: for erections. A real, low-risk tool for ED and for rehabilitation after prostate surgery. What they don't do is permanently enlarge: the size effect lasts as long as the ring is on, and aggressive use mostly just bruises.",
  },
  {
    grade: "emerging",
    name: "Traction / extender devices",
    what: "A device worn to apply gentle, sustained tension over weeks to months.",
    verdict:
      "The one non-surgical method with actual (modest) length evidence, and a legitimate tool in Peyronie's. The gains are small and slow and demand real consistency, and it's a clinician's device, not a gym challenge.",
  },
  {
    grade: "emerging",
    name: "Hyaluronic-acid fillers (girth)",
    what: "A temporary dermal filler injected for girth; the body reabsorbs it over time.",
    verdict:
      "Some evidence and reasonable safety when a qualified provider uses HA, but it's temporary, the standards are thin, and the moment it becomes a permanent filler or an unqualified injector, it drops straight into the danger row below.",
  },
  {
    grade: "emerging",
    name: "Surgery (ligament release, grafts, implants)",
    what: "Real urologic procedures: suspensory-ligament release, girth grafting, or a penile implant.",
    verdict:
      "Reserved, specialist territory with genuine complication risk and often modest or variable payoff. Implants are well established, but for erectile dysfunction, not cosmetic size.",
  },
  {
    grade: "anecdote",
    name: "“Exercises” (jelqing) and extreme pumping",
    what: "Manual “milking” routines and over-pumping promoted online for growth.",
    verdict:
      "No credible evidence of lasting size, and a real record of bruising, pain, and scarring. The “heal-and-grow” theory behind it (injure the tissue on purpose so it rebuilds bigger) borrows muscle logic for connective tissue that heals toward scar (the raw material of Peyronie's disease), not length. It's also the usual excuse for the injectable “healing stacks” below. We won't publish the technique, because here the technique is the risk.",
  },
  {
    grade: "high-risk",
    name: "Peptide “healing stacks” (BPC-157 + TB-500, the “wolverine blend”)",
    what: "Gray-market peptides injected to “heal and grow” the micro-trauma from jelqing.",
    verdict:
      "Genuinely interesting preclinical (animal) healing science, and near-zero human evidence: BPC-157's whole human record is a few dozen people in uncontrolled pilots, and it isn't even legally compoundable; TB-500 is an ill-defined product anti-doping agencies ban. “Better healing of tears you inflicted” was never shown to grow anything, and self-injecting unverified biologics into genital tissue carries the same infection and necrosis risk as the row below, minus any upside.",
  },
  {
    grade: "high-risk",
    name: "rHGH (growth hormone) for size",
    what: "A powerful prescription hormone added for systemic “growth.”",
    verdict:
      "It grows genitals in growth-hormone-deficient children, not in adults, where there's no enhancement evidence and little anabolic effect at all, but real harms: acromegaly, insulin resistance, joint pain, and, ironically, impotence. Distributing it for uses like this is a federal crime.",
  },
  {
    grade: "high-risk",
    name: "Gray-market injections (silicone, oil, permanent fillers)",
    what: "Illicit injection of silicone, mineral or paraffin oil, or permanent fillers for size.",
    verdict:
      "The one that maims. The documented record includes hard lumps (granulomas), skin death, deformity, permanent ED, Fournier's gangrene, and (when the material travels) organ damage and death, often surfacing a year or two later. Never. Not once.",
  },
];

export default function EnhancementPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "enhancement")} />
      <Breadcrumbs slug="enhancement" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Enhancement, honestly
      </h1>
      <ArticleMeta
        slug="enhancement"
        gradeNote="This field runs from a legitimate medical device to injections that cause permanent injury. The top grade flags the category; each method is graded on its own below."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The enhancement market runs on anxiety, and it sells everything from a
        legitimate medical device to injections that have cost men their penises,
        with almost no honest signposting in between. The quality of the research
        across the whole field is <strong>low</strong>. So this is a map, not a
        manual: each method, what it actually is, and an honest grade. So you can
        tell medicine from marketing from the things that maim. We don&apos;t
        publish the how-to for the risky ones, on purpose.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The map, graded
        </h2>
        <p className="sos-note" style={{ marginBottom: "20px" }}>
          Ordered from what legitimately helps to what to never let near you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {METHODS.map((m) => (
            <div
              key={m.name}
              className="sos-card"
              style={m.grade === "high-risk" ? { borderLeft: "3px solid var(--sos-emergency)" } : undefined}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "10px" }}>
                <EvidenceBadge grade={m.grade} />
                <span style={{ fontFamily: "var(--sos-sans)", fontWeight: 700, fontStretch: "90%", fontSize: "15px", color: "var(--sos-text-hi)" }}>
                  {m.name}
                </span>
              </div>
              <p className="sos-note" style={{ marginBottom: "8px" }}>{m.what}</p>
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>{m.verdict}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The uncomfortable part: it&apos;s usually not about size
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Most men who go looking for enhancement fall within the normal range to
          begin with. The distress is real, but it&apos;s far more often about{" "}
          <strong>perception</strong>{" "}than anatomy, and no filler fixes that. It&apos;s
          exactly why sexual-medicine guidelines put a psychological conversation{" "}
          <em>before</em>{" "}any procedure: the most effective first appointment is
          usually a talk, not a table. If the worry is function rather than size,
          that&apos;s not cosmetic at all. That&apos;s an{" "}
          <Link href="/learn/ed-workup">ED workup</Link>, and{" "}
          <Link href="/learn/erectile-function-signal">a signal worth reading</Link>.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          If you&apos;ve had an injection, know the emergency
        </h2>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            If you&apos;ve ever had material injected for size and you develop{" "}
            <strong>pain, swelling, hardening, a change in skin color, fever, or
            an area that&apos;s breaking down</strong>, treat it as an emergency
            and get seen now. Silicone and oil cause infection and tissue death
            that only worsen with time, and the fixes get bigger the longer they
            wait. Our <Link href="/support">Get support now</Link>{" "}page is the
            fastest route.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          In one breath: pumps legitimately help <em>erections</em>; traction is
          the only non-surgical thing with real, modest length evidence; the
          &quot;exercises&quot; don&apos;t work; and gray-market injections can
          cost you your penis or your life. The same logic runs through{" "}
          <Link href="/learn/product-forms">what you&apos;re actually buying</Link>:
          the further from a licensed clinician you get, the more the risk is
          yours alone. If it&apos;s about function, get a workup. If it&apos;s
          about how you feel, the first appointment is a conversation, and
          that&apos;s not a consolation prize, it&apos;s the treatment that
          actually works.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://bjui-journals.onlinelibrary.wiley.com/doi/10.1111/bju.15145" target="_blank" rel="noopener noreferrer">systematic review of penile enhancement interventions (BJU Int)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/41344863/" target="_blank" rel="noopener noreferrer">ICSM 2024 penile augmentation recommendations</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4708600/" target="_blank" rel="noopener noreferrer">the science of vacuum devices in penile rehabilitation</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2945848/" target="_blank" rel="noopener noreferrer">mineral-oil sclerosing lipogranuloma of the penis</a>;{" "}
          <a href="https://www.usada.org/spirit-of-sport/bpc-157-peptide-prohibited/" target="_blank" rel="noopener noreferrer">USADA on BPC-157</a>;{" "}
          <a href="https://www.wada-ama.org/en/prohibited-list" target="_blank" rel="noopener noreferrer">the WADA Prohibited List</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3104052/" target="_blank" rel="noopener noreferrer">a review of growth-hormone abuse</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and deliberately not a how-to for
          any procedure or technique. Anything invasive belongs to a licensed
          clinician; anything sold outside that channel is a risk you carry alone.
        </p>
      </div>

      <Faq slug="enhancement" />
      <RelatedArticles slug="enhancement" />
    </article>
  );
}
