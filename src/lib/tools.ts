/**
 * Interactive tools: the "instruments" surface. Single source for the /tools
 * hub, the sitemap, and llms.txt. Only `status: "live"` tools have a real route
 * and get indexed; "soon" entries are roadmap teasers on the hub only.
 */
export type Tool = {
  slug: string;
  title: string;
  blurb: string;
  /** Short label for the hub card kicker. */
  kind: string;
  status: "live" | "soon";
};

export const tools: Tool[] = [
  {
    slug: "erectile-function-score",
    title: "Erectile-function self-check",
    blurb:
      "The validated IIEF-5 / SHIM screen, scored privately in your browser. It turns a vague worry into a number you can take to a clinician.",
    kind: "Self-assessment",
    status: "live",
  },
  {
    slug: "free-testosterone",
    title: "Free-testosterone calculator",
    blurb:
      "Estimate free and bioavailable testosterone from total T, SHBG, and albumin (Vermeulen method): the number your total-T result doesn't show.",
    kind: "Calculator",
    status: "live",
  },
  {
    slug: "treatment-cost",
    title: "ED-treatment cost estimator",
    blurb:
      "Add up the real stack (labs, consult, and medication) and see where the markup hides across the legitimate channels.",
    kind: "Calculator",
    status: "soon",
  },
];

export const liveTools = tools.filter((t) => t.status === "live");
