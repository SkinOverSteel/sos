import type { Metadata } from "next";
import { StepHeader } from "@/components/StepHeader";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { learnHubJsonLd } from "@/lib/jsonld";
import { LibraryBrowser } from "@/components/LibraryBrowser";
import { ROUTES } from "@/lib/routes";
import { SignalRail } from "@/components/SignalRail";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Plain-language men's sexual-health education on erectile function, testosterone, and treatment. Every claim carries a visible evidence grade and a named source.",
  alternates: { canonical: "/learn" },
};

export default function LearnHub() {
  const established = articles.filter((a) => a.grade === "established").length;
  return (
    <div className="sos-container">
      <JsonLd data={learnHubJsonLd()} />
      <StepHeader as="h1" step="understand" title="The library, graded" className="sos-page-head">
        Erectile function, testosterone, and treatment, in plain language.
        Every claim carries a visible grade, so you know how much weight it
        holds. All of it is written to get you to a clinician, never around
        one.
      </StepHeader>

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
      <SignalRail className="sos-rail--close" />
    </div>
  );
}
