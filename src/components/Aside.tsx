import type { ReactNode } from "react";

/**
 * A margin note: a quiet, mono-voiced aside that floats into the column edge on
 * wide screens (running text wraps around it) and drops inline on narrow ones.
 * Good for a citation, a caveat, or a "worth knowing" that shouldn't interrupt
 * the main line.
 */
export function Aside({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <aside className="sos-aside">
      {label ? <span className="sos-aside__label">{label}</span> : null}
      {children}
    </aside>
  );
}
