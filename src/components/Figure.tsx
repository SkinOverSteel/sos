import type { ReactNode } from "react";

type FigureProps = {
  /** Figure number within the article, rendered as a mono kicker ("FIG. 1"). */
  num?: number;
  /** Plain-prose caption. Say what the picture shows and the one thing to take from it. */
  caption: ReactNode;
  children: ReactNode;
};

/**
 * Frame for an original explanatory figure (an inline SVG built from the
 * design tokens). The frame, caption, and figure kicker are shared chrome so
 * every figure on the site reads as one instrument. Motion inside a figure
 * must be CSS-driven so the global prefers-reduced-motion rule stills it.
 */
export function Figure({ num, caption, children }: FigureProps) {
  return (
    <figure className="sos-figure">
      <div className="sos-figure__frame">{children}</div>
      <figcaption className="sos-figure__cap">
        {num !== undefined ? (
          <span className="sos-figure__num">Fig. {num}</span>
        ) : null}
        {caption}
      </figcaption>
    </figure>
  );
}
