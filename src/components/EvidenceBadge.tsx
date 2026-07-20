/**
 * Evidence-grade badge — outline-only, never filled (per brand spec).
 * Colors derive from tokens in /brand/tokens.css.
 */
export type Grade = "established" | "emerging" | "anecdote" | "high-risk";

const GRADE: Record<Grade, { label: string; color: string }> = {
  established: { label: "Established", color: "var(--sos-grade-established)" },
  emerging: { label: "Emerging", color: "var(--sos-grade-emerging)" },
  anecdote: { label: "Anecdote", color: "var(--sos-grade-anecdote)" },
  "high-risk": { label: "High risk", color: "var(--sos-emergency)" },
};

export function EvidenceBadge({
  grade,
  title,
}: {
  grade: Grade;
  title?: string;
}) {
  const { label, color } = GRADE[grade];
  return (
    <span className="sos-badge" style={{ color }} title={title}>
      {label}
    </span>
  );
}
