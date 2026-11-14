import Link from "next/link";
import { Callout } from "@/components/Callout";
import { providerLink, rankedByCategory } from "@/lib/providers";

/**
 * The hand-off from lab literacy to the directory's blood-testing listings.
 * Lab articles and the free-testosterone calculator show it so a reader who
 * now knows what to order has somewhere licensed to order it.
 *
 * The framing is fixed by the brief: a clinician's order comes first, a
 * self-ordered draw is preparation or monitoring, and the result goes back to
 * a clinician. The link is internal (the directory carries the per-listing
 * disclosure), but when any lab listing is a referral this says so here too,
 * so the reader knows before they click through.
 */
type Variant = "baseline" | "monitoring" | "inputs";

const COPY: Record<Variant, { label: string; body: string }> = {
  baseline: {
    label: "Where to get these drawn",
    body:
      "The simplest route is a clinician's order. For a baseline before an appointment, or a draw between visits, the directory lists accredited labs you can order from directly, ranked on published trust criteria. Take the results to a clinician: a number without a history is not a diagnosis.",
  },
  monitoring: {
    label: "A draw between visits",
    body:
      "Monitoring belongs to your prescriber, who orders the draws and reads them. If you need one between visits, or want a second look at a number, the directory lists accredited labs you can order from directly, ranked on published trust criteria. Take the results back to your prescriber.",
  },
  inputs: {
    label: "Don't have these numbers yet?",
    body:
      "You need total testosterone and SHBG; albumin is optional. Total testosterone is often ordered without SHBG, so ask your clinician for it by name. Or order the panel yourself from an accredited lab in the directory and bring the result to your appointment.",
  },
};

export function LabsCallout({ variant = "baseline" }: { variant?: Variant }) {
  const { label, body } = COPY[variant];
  const anyReferral = rankedByCategory("lab").some((p) => providerLink(p).isReferral);
  return (
    <Callout label={label}>
      <p className="sos-prose sos-labs__body">{body}</p>
      <p className="sos-labs__foot">
        <span className="sos-labs__links">
          <Link href="/directory#lab" className="sos-home__more">
            Blood testing in the directory →
          </Link>
          <Link href="/labs" className="sos-home__more">
            The lab checklists →
          </Link>
        </span>
        {anyReferral ? (
          <span className="sos-note">
            Some listings there are referral links, marked at the link. A
            referral never moves a ranking.
          </span>
        ) : null}
      </p>
    </Callout>
  );
}
