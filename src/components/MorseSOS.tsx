import type { CSSProperties, HTMLAttributes } from "react";

// ··· ––– ···: three dots, three dashes, three dots.
const PATTERN = ["dot", "dot", "dot", "dash", "dash", "dash", "dot", "dot", "dot"] as const;

type MorseSOSProps = {
  /** "loading" animates the pattern as a transmitting signal; "divider" is the static signature (default). */
  variant?: "divider" | "loading";
  /** Quieter treatment, rendered in the line color, e.g. footers, empty / 404 states. */
  dim?: boolean;
  className?: string;
  style?: CSSProperties;
  /**
   * Accessible name. A divider is decorative by default (aria-hidden); a loader
   * announces as a "Loading" status by default. Pass a label to override either.
   */
  label?: string;
};

/**
 * The brand's Morse SOS signature ( ··· ––– ··· ): "the signal, answered."
 * One source for what had been nine copy-pasted <i> tags across the app.
 * variant="loading" turns it into the transmitting loader (see globals.css);
 * the global prefers-reduced-motion rule (tokens.css) stills it to the static
 * signature, so the loading state degrades to the mark itself.
 */
export function MorseSOS({
  variant = "divider",
  dim = false,
  className,
  style,
  label,
}: MorseSOSProps) {
  const classes = [
    "sos-morse",
    dim && "dim",
    variant === "loading" && "sos-morse--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const a11y: HTMLAttributes<HTMLDivElement> =
    variant === "loading"
      ? { role: "status", "aria-label": label ?? "Loading" }
      : label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true };

  return (
    <div className={classes} style={style} {...a11y}>
      {PATTERN.map((kind, i) => (
        <i key={i} className={kind} />
      ))}
    </div>
  );
}
