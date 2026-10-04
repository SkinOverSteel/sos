import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The workflow header: a mono step kicker ("01 · Understand") over a large
 * condensed display title, with an optional lede and a right-hand link. The
 * homepage uses it for each section; the hub pages use it as their H1 so a
 * reader arriving from search gets the same orientation the front door gives.
 *
 * Steps are fixed site-wide: 01 Understand (Learn), 02 Measure (Tools),
 * 03 Find care (Near me, Directory), 04 Track (The Log).
 */
export const STEPS = {
  understand: { step: "01", verb: "Understand" },
  measure: { step: "02", verb: "Measure" },
  care: { step: "03", verb: "Find care" },
  track: { step: "04", verb: "Track" },
} as const;

export type StepKey = keyof typeof STEPS;

export function StepHeader({
  id,
  step,
  title,
  as: Tag = "h2",
  children,
  more,
  className,
}: {
  id?: string;
  step: StepKey;
  title: string;
  /** Heading level: the hub pages pass "h1". */
  as?: "h1" | "h2";
  /** Lede paragraph under the title. */
  children?: ReactNode;
  more?: { href: string; label: string };
  className?: string;
}) {
  const { step: n, verb } = STEPS[step];
  return (
    <div className={["sos-home__section-head", className].filter(Boolean).join(" ")}>
      <div>
        <p className="sos-home__step">
          <b>{n}</b> · {verb}
        </p>
        <Tag id={id} className="sos-home__title">
          {title}
        </Tag>
        {children ? <p>{children}</p> : null}
      </div>
      {more ? (
        <Link href={more.href} className="sos-home__more">
          {more.label}
        </Link>
      ) : null}
    </div>
  );
}
