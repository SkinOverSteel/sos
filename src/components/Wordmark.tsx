import type { CSSProperties, ElementType } from "react";

type WordmarkProps = {
  /** Element to render as, e.g. "span" (default) in a header link, "h1" for a hero. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Font size (any CSS length); the lockup scales from it. Default 15px (header size). */
  size?: string;
};

/**
 * The "SKIN OVER STEEL" wordmark as accessible, theme-aware text, copper
 * "Skin" over the foreground color, condensed Archivo display caps. Mirrors
 * public/wordmark.svg (the portable outlined master) for in-app use where real
 * selectable text beats an image. "Over Steel" uses --sos-text-hi, so it flips
 * to ink under a light/print theme automatically.
 */
export function Wordmark({ as: Tag = "span", className, style, size = "15px" }: WordmarkProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--sos-sans)",
        fontWeight: 800,
        fontStretch: "84%",
        fontSize: size,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span style={{ color: "var(--sos-copper)" }}>Skin</span>
      <span style={{ color: "var(--sos-text-hi)" }}> Over Steel</span>
    </Tag>
  );
}
