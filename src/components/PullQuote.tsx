import type { ReactNode } from "react";

/**
 * A pull-quote: a line lifted from the piece, set large in the serif italic
 * voice between hairlines. Optional attribution renders in the mono UI voice.
 */
export function PullQuote({
  cite,
  children,
}: {
  cite?: string;
  children: ReactNode;
}) {
  return (
    <figure className="sos-pullquote">
      <blockquote>{children}</blockquote>
      {cite ? (
        <figcaption>
          <cite>{cite}</cite>
        </figcaption>
      ) : null}
    </figure>
  );
}
