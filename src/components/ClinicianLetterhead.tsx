import type { ReactNode } from "react";
import { Wordmark } from "@/components/Wordmark";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";

const GRADE_LEGEND: { grade: Grade; meaning: string }[] = [
  { grade: "established", meaning: "Guideline-level evidence" },
  { grade: "emerging", meaning: "Early or mixed research" },
  { grade: "anecdote", meaning: "Member experience, not clinical evidence" },
  { grade: "high-risk", meaning: "Evidence points to injury" },
];

type ClinicianLetterheadProps = {
  /** Document title, e.g. "Free-testosterone estimate" or "Protocol log summary". */
  title: string;
  /** Absolute date to stamp (caller supplies it; keeps this render deterministic). */
  date?: string;
  /** Pseudonymous member handle, when there is one. */
  handle?: string;
  /** The clinical content: result tables, graded findings, log summary. */
  children: ReactNode;
};

/**
 * Print-optimized wrapper for the "one-page a member hands their doctor."
 * Forces the light/ink palette (data-theme="light") so a printout isn't a
 * dark ink-hog, leads with the wordmark, and carries the evidence-grade legend
 * so the clinician can read the grades. Bridges toward the clinician, never
 * around them, framed as a conversation aid, not advice. Wrap any page/tool
 * result in it; see globals.css for the screen + @media print styling.
 */
export function ClinicianLetterhead({
  title,
  date,
  handle,
  children,
}: ClinicianLetterheadProps) {
  const meta = [
    "Prepared by the patient via skinoversteel.com",
    handle,
    date,
  ].filter(Boolean);

  return (
    <div data-theme="light" className="sos-letterhead">
      <header className="sos-letterhead__head">
        <Wordmark size="18px" />
        <span className="sos-letterhead__kicker">Clinician summary</span>
      </header>

      <div>
        <h1 className="sos-letterhead__title">{title}</h1>
        <p className="sos-letterhead__sub">{meta.join(" · ")}</p>
      </div>

      <div className="sos-letterhead__body">{children}</div>

      <section className="sos-letterhead__legend" aria-label="Evidence grade key">
        <p className="sos-letterhead__legend-title">
          Evidence grades used in this summary
        </p>
        <ul className="sos-letterhead__legend-list">
          {GRADE_LEGEND.map(({ grade, meaning }) => (
            <li key={grade}>
              <EvidenceBadge grade={grade} />
              <span>{meaning}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="sos-letterhead__foot">
        Education, not medical advice. This summary is a conversation aid and
        does not replace clinical judgment. How the grades are assigned:
        skinoversteel.com/methodology
      </footer>
    </div>
  );
}
