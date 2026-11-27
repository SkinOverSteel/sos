/**
 * Functional line icons for the tools rows on the homepage (and anywhere a
 * tool needs a mark). Single stroke weight, currentColor, 24px grid — per the
 * brand rule: icons only where functional, one stroke weight, no ornament.
 * Keyed by tool slug with a neutral instrument fallback.
 */
type Props = { slug: string; className?: string };

const PATHS: Record<string, React.ReactNode> = {
  // SHIM self-assessment — clipboard with a check
  "erectile-function-score": (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // bioavailable testosterone — calculator
  "free-testosterone": (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 15h0M12 15h0M16 15v4M8 19h4" />
    </>
  ),
  // assay grader — a dial / gauge
  "assay-grader": (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18l4-5" />
      <circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  // treatment-cost estimator — a coin stack
  "treatment-cost": (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
      <path d="M5 11.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
    </>
  ),
  // appointment sheet — a document with lines
  "appointment-sheet": (
    <>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4M9 13h6M9 16h6" />
    </>
  ),
};

export function ToolIcon({ slug, className }: Props) {
  const body = PATHS[slug] ?? (
    // fallback: a plain instrument square
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 12h8" />
    </>
  );
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {body}
    </svg>
  );
}
