import type { ReactNode } from "react";

/**
 * "The short version" — a scannable summary of an article's load-bearing
 * points, usually placed just under the byline or at the close. Copper-ticked
 * list in the serif reading voice.
 */
export function KeyTakeaways({
  items,
  label = "The short version",
}: {
  items: ReactNode[];
  label?: string;
}) {
  return (
    <aside className="sos-takeaways" aria-label={label}>
      <p className="sos-takeaways__label">{label}</p>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
