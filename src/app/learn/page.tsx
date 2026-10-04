import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { learnHubJsonLd } from "@/lib/jsonld";
import { LibraryBrowser } from "@/components/LibraryBrowser";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Evidence-graded men's health education: the Open Floor. Start where you are, and every claim carries a visible evidence grade.",
  alternates: { canonical: "/learn" },
};

/**
 * Situation routes into the library. Where a reader starts is a function of
 * where they're stuck, not of the article taxonomy: each card names the
 * situation it's best for and the concrete thing the reader leaves with,
 * then hands them the first article in that path. The one non-/learn route
 * is deliberate: the crisis path belongs one tap away, not buried mid-list.
 */
const ROUTES: {
  title: string;
  bestFor: string;
  leavesWith: string;
  href: string;
  startWith: string;
}[] = [
  {
    title: "First sign, no answers",
    bestFor:
      "Something has changed and you can't explain it: weaker erections, less interest, a signal you don't know how to read.",
    leavesWith:
      "Why the change is worth a workup, and the full map of that workup before you book anything.",
    href: "/learn/erectile-function-signal",
    startWith: "Erectile function is a signal",
  },
  {
    title: "Labs in hand, no context",
    bestFor:
      "A PDF full of numbers and reference ranges, and nobody has told you what any of it means.",
    leavesWith:
      "Enough fluency in testosterone, SHBG, insulin, and inflammation markers to hold a real conversation with your clinician.",
    href: "/learn/read-your-labs",
    startWith: "Read your labs",
  },
  {
    title: "Weighing treatment",
    bestFor:
      "Choosing between the pills, daily versus on-demand, testosterone, or what comes next when pills stop working.",
    leavesWith:
      "The honest comparisons, the safety rules, and the dosing literacy to follow a prescription with your eyes open.",
    href: "/learn/pde5-lineup",
    startWith: "The PDE5 line-up",
  },
  {
    title: "Quoted a price",
    bestFor:
      "A $400 quote on a $3 molecule, a subscription you can't unwind, or a stack of charges you can't parse.",
    leavesWith:
      "The cost stack unpacked, layer by layer, and the legal levers that bring the price down.",
    href: "/learn/what-it-costs",
    startWith: "What it costs",
  },
  {
    title: "Something went wrong",
    bestFor:
      "An erection that has lasted too long, a reaction that worries you, or a question that needs an answer tonight.",
    leavesWith:
      "The rescue ladder by the clock, what the ER actually does, and crisis resources one tap away.",
    href: "/support",
    startWith: "Support",
  },
];

export default function LearnHub() {
  const established = articles.filter((a) => a.grade === "established").length;
  return (
    <div className="sos-container">
      <JsonLd data={learnHubJsonLd()} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The Open Floor
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Learn
      </h1>
      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "20px" }}>
        Evidence-graded education, in plain language. Every claim carries a
        visible grade so you always know how much weight it holds. This bridges
        toward your clinician, never around them.
      </p>

      <dl className="sos-lib__legend" aria-label="How the library is graded">
        <div>
          <dt>
            <EvidenceBadge grade="established" />
          </dt>
          <dd>Guideline-level evidence. {established} of {articles.length} articles.</dd>
        </div>
        <div>
          <dt>
            <EvidenceBadge grade="emerging" />
          </dt>
          <dd>Early or mixed research. Promising, not settled.</dd>
        </div>
        <div>
          <dt>
            <EvidenceBadge grade="anecdote" />
          </dt>
          <dd>Member n=1 reports, fenced off from the evidence.</dd>
        </div>
        <div className="sos-lib__legend-link">
          <dd>
            <Link href="/methodology">How we grade →</Link>
          </dd>
        </div>
      </dl>

      <section aria-labelledby="start-here">
        <div className="sos-lib__head">
          <h2 id="start-here" className="sos-h2">
            Start where you are
          </h2>
          <a href="#library" className="sos-note sos-lib__skip">
            Skip to the full library ↓
          </a>
        </div>
        <div className="sos-routes">
          {ROUTES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className={`sos-card sos-route${r.href === "/support" ? " sos-route--urgent" : ""}`}
            >
              <h3 className="sos-route__title">{r.title}</h3>
              <p className="sos-route__text">
                <strong>Best for.</strong> {r.bestFor}
              </p>
              <p className="sos-route__text">
                <strong>You leave with.</strong> {r.leavesWith}
              </p>
              <span className="sos-route__cta">Start: {r.startWith} →</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="library" aria-labelledby="library-heading" style={{ marginTop: "56px" }}>
        <h2 id="library-heading" className="sos-h2" style={{ marginBottom: "6px" }}>
          Everything in the library
        </h2>
        <p className="sos-note" style={{ marginBottom: "20px" }}>
          Grouped in reading order. Narrow by section, grade, or a word in the
          title.
        </p>
        <LibraryBrowser articles={articles} />
      </section>
    </div>
  );
}
