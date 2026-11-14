/**
 * Interactive tools: the "instruments" surface. Single source for the /tools
 * hub, the sitemap, and llms.txt. Only `status: "live"` tools have a real route
 * and get indexed; "soon" entries are roadmap teasers on the hub only.
 */
export type Tool = {
  slug: string;
  title: string;
  blurb: string;
  /** One-line version for the homepage tile; the hub keeps the full blurb. */
  brief?: string;
  /** Short label for the hub card kicker. */
  kind: string;
  status: "live" | "soon";
};

export const tools: Tool[] = [
  {
    slug: "erectile-function-score",
    title: "SHIM score (IIEF-5)",
    blurb:
      "The SHIM score: the validated IIEF-5 screen, scored privately in your browser. Five questions, two minutes, and a score a clinician will recognize.",
    brief: "Five questions, two minutes. The validated IIEF-5 screen, scored on your device.",
    kind: "Self-assessment",
    status: "live",
  },
  {
    slug: "free-testosterone",
    title: "Bioavailable testosterone calculator",
    blurb:
      "Estimate free and bioavailable testosterone from total T, SHBG, and albumin (Vermeulen method): the number your total-T result doesn't show.",
    brief:
      "Free and bioavailable testosterone from total T, SHBG, and albumin: the number a total-T result doesn't show.",
    kind: "Calculator",
    status: "live",
  },
  {
    slug: "treatment-cost",
    title: "ED-treatment cost estimator",
    blurb:
      "Add up the real stack of ED medication or testosterone therapy (labs, consult, medication, ancillaries) and see where the markup hides across pharmacy cash, discount card, prescriber-routed compounding, and clinic bundles.",
    brief:
      "Labs, consult, medication, ancillaries: the whole bill, compared across the ways to buy it.",
    kind: "Calculator",
    status: "live",
  },
];

export const liveTools = tools.filter((t) => t.status === "live");
