import Link from "next/link";

/**
 * The three highest-demand utilities as one instrument panel. Every article
 * shows it in its end matter with the rows chosen by the article's section (an
 * ED article offers the self-check, a testosterone article the free-T
 * calculator, a treatment article the zip finder and the Log) under a visible
 * "The tools" header. The homepage shows it beside the headline with
 * `headingHidden`: there the h1 already owns the voice, so the panel keeps its
 * accessible name but drops the competing visible title, leaving only the quiet
 * "private · in your browser" instrument tag.
 */
export type UtilityKey = "zip" | "selfcheck" | "freet" | "cost" | "log" | "directory";

const ROWS: Record<Exclude<UtilityKey, "zip">, { href: string; title: string; note: string; cta: string }> = {
  selfcheck: {
    href: "/tools/erectile-function-score",
    title: "Score your erectile function",
    note: "Five questions, the validated IIEF-5 screen. Two minutes.",
    cta: "Start the self-check →",
  },
  freet: {
    href: "/tools/free-testosterone",
    title: "Estimate your free testosterone",
    note: "From total T, SHBG and albumin: the number the total-T result doesn't show.",
    cta: "Open the calculator →",
  },
  cost: {
    href: "/tools/treatment-cost",
    title: "Price the whole treatment stack",
    note: "Labs, consult, medication, ancillaries, across the ways to buy.",
    cta: "Open the estimator →",
  },
  log: {
    href: "/log",
    title: "Track a protocol in the Log",
    note: "Baseline to outcome, printable for your clinician.",
    cta: "Open the Log →",
  },
  directory: {
    href: "/directory",
    title: "Find a licensed provider",
    note: "Labs, telemedicine, compounding pharmacies, ranked on trust.",
    cta: "See the directory →",
  },
};

/** Which rows an article's section earns. The zip finder is on every panel. */
export function utilitiesForSection(section: string): UtilityKey[] {
  switch (section) {
    case "The workup":
      return ["zip", "freet", "selfcheck"];
    case "Money & value":
      return ["zip", "cost", "directory"];
    case "Treatment & pharmacology":
    case "Choosing care":
    case "Quality & safety":
      return ["zip", "cost", "log"];
    default:
      return ["zip", "selfcheck", "log"];
  }
}

export function UtilityPanel({
  rows = ["zip", "selfcheck", "log"],
  idPrefix = "panel",
  heading = "The tools",
  headingHidden = false,
  as: Tag = "h2",
}: {
  rows?: UtilityKey[];
  /** Keeps the zip input's id unique when a page shows more than one form. */
  idPrefix?: string;
  heading?: string;
  /** Homepage: suppress the visible title (the h1 already carries the voice)
   *  while keeping the panel's accessible name. */
  headingHidden?: boolean;
  as?: "h2" | "h3";
}) {
  const zipId = `${idPrefix}-zip`;
  const headId = `${idPrefix}-head`;
  return (
    <aside
      className="sos-home__panel"
      {...(headingHidden ? { "aria-label": heading } : { "aria-labelledby": headId })}
    >
      <div className="sos-home__panel-head">
        {headingHidden ? null : (
          <Tag id={headId} className="sos-h2">
            {heading}
          </Tag>
        )}
        <span className="sos-note" style={{ lineHeight: 1 }}>
          private · in your browser
        </span>
      </div>

      {rows.map((key) =>
        key === "zip" ? (
          <form key={key} action="/near-me" method="get" className="sos-home__panel-row">
            <label className="sos-label" htmlFor={zipId} style={{ marginBottom: "6px" }}>
              Who treats this near me
            </label>
            <div className="sos-home__care-form" style={{ marginTop: 0 }}>
              <input
                id={zipId}
                name="zip"
                className="sos-field"
                style={{ flex: "1 1 120px" }}
                inputMode="numeric"
                pattern="[0-9]{5}"
                title="A five-digit US zip code"
                required
                maxLength={5}
                placeholder="Zip code"
                autoComplete="postal-code"
                aria-describedby={`${zipId}-note`}
              />
              <button type="submit" className="sos-btn sos-btn--primary" style={{ border: 0, cursor: "pointer" }}>
                Find
              </button>
            </div>
            <p id={`${zipId}-note`} className="sos-note" style={{ marginTop: "8px", lineHeight: 1.5 }}>
              Clinics, licensed pharmacies, prescribers. Every US zip.
            </p>
          </form>
        ) : (
          <Link key={key} href={ROWS[key].href} className="sos-home__panel-row sos-home__panel-link">
            <span className="sos-home__panel-title">{ROWS[key].title}</span>
            <span className="sos-note" style={{ lineHeight: 1.5 }}>
              {ROWS[key].note}
            </span>
            <span className="sos-home__tile-foot">{ROWS[key].cta}</span>
          </Link>
        ),
      )}
    </aside>
  );
}
