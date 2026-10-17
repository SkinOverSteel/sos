import type { ReactNode } from "react";

/**
 * A boxed aside in instrument voice: a labelled note set off from the running
 * prose. `tone="alert"` switches the edge to the reserved emergency red for
 * safety-critical notes (never decorative — per the brand's red-family rule).
 */
export function Callout({
  label,
  tone = "default",
  children,
}: {
  label?: string;
  tone?: "default" | "alert";
  children: ReactNode;
}) {
  return (
    <aside className={`sos-callout${tone === "alert" ? " sos-callout--alert" : ""}`}>
      {label ? <p className="sos-callout__label">{label}</p> : null}
      {children}
    </aside>
  );
}
