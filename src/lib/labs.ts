/**
 * Lab checklists: which blood tests belong to which conversation, each with a
 * one-line reason and the source it comes from. Single source for the /labs
 * page and for the Log's testosterone-therapy checkpoints.
 *
 * Literacy, not an order set (hard line #1): this lists what a competent
 * program already checks and when, cited to the guideline. Dose targets and
 * adjustments are deliberately absent; those stay the prescriber's call.
 *
 * Every "es2018" item was checked against the guideline text (recommendations
 * 1.1–1.4, 2.3 and Table 9). "article" items repeat what the linked library
 * article already publishes under its own sources.
 */

export type LabSource = { label: string; href: string; external: boolean };

export const LAB_SOURCES = {
  es2018: {
    label: "Endocrine Society 2018",
    href: "https://doi.org/10.1210/jc.2018-00229",
    external: true,
  },
  readYourLabs: { label: "Read your labs", href: "/learn/read-your-labs", external: false },
  trtArticle: { label: "Testosterone therapy, done right", href: "/learn/testosterone-therapy", external: false },
  edWorkup: { label: "The ED workup", href: "/learn/ed-workup", external: false },
} satisfies Record<string, LabSource>;

export type LabItem = {
  name: string;
  /** When it is drawn, for on-therapy items. */
  when?: string;
  why: string;
  source: keyof typeof LAB_SOURCES;
};

export type LabPanel = {
  id: string;
  title: string;
  lede: string;
  items: LabItem[];
};

export const LAB_PANELS: LabPanel[] = [
  {
    id: "baseline",
    title: "Before a testosterone conversation",
    lede:
      "What a clinician needs to tell whether testosterone is low, why, and whether therapy would be safe to start.",
    items: [
      {
        name: "Total testosterone, early morning, on two separate days",
        why: "The diagnosis needs symptoms plus a consistently low level. One draw is not enough.",
        source: "es2018",
      },
      {
        name: "SHBG, with albumin",
        why: "Lets free testosterone be estimated when the total is borderline or SHBG is unusually high or low.",
        source: "es2018",
      },
      {
        name: "LH and FSH",
        why: "Separates a testicular cause from a pituitary one, which changes the rest of the workup.",
        source: "es2018",
      },
      {
        name: "Prolactin",
        why: "High prolactin can suppress testosterone. Checked when LH and FSH point to a pituitary cause.",
        source: "es2018",
      },
      {
        name: "Hematocrit (CBC)",
        why: "The baseline every later draw on therapy is compared against.",
        source: "es2018",
      },
      {
        name: "PSA",
        why: "A prostate baseline for men who choose prostate monitoring with their clinician: ages 55 to 69, or 40 to 69 at increased risk.",
        source: "es2018",
      },
      {
        name: "Estradiol",
        why: "Often on a baseline panel. Read in context, not chased to a number.",
        source: "readYourLabs",
      },
    ],
  },
  {
    id: "on-therapy",
    title: "On testosterone therapy",
    lede:
      "The monitoring that keeps prescribed therapy safe. Your prescriber orders these and reads them; this is so you know what should be happening.",
    items: [
      {
        name: "Testosterone level",
        when: "3 to 6 months after starting",
        why: "Shows where the prescribed regimen has landed. When in the dosing cycle to draw depends on the formulation, so ask your prescriber.",
        source: "es2018",
      },
      {
        name: "Hematocrit",
        when: "3 to 6 months after starting, then every year",
        why: "Testosterone raises red-cell count. Above 54% the guideline says to stop therapy until it comes down.",
        source: "es2018",
      },
      {
        name: "Follow-up visit",
        when: "3 to 12 months after starting, then every year",
        why: "Whether symptoms have responded, and whether there are side effects.",
        source: "es2018",
      },
      {
        name: "PSA",
        when: "3 to 12 months after starting, then per standard screening guidance",
        why: "For men who chose prostate monitoring before starting.",
        source: "es2018",
      },
      {
        name: "Estradiol",
        when: "When there is breast tenderness or enlargement",
        why: "Checked on symptoms, not on a schedule.",
        source: "trtArticle",
      },
      {
        name: "Lipids and blood pressure",
        when: "Periodically, typically at least once a year",
        why: "Cardiovascular risk is reviewed alongside the hormone.",
        source: "trtArticle",
      },
    ],
  },
  {
    id: "ed-workup",
    title: "Bloods in an ED workup",
    lede:
      "The blood work is one step of five. It looks for treatable causes and for the conditions erectile trouble can be an early sign of.",
    items: [
      {
        name: "Total testosterone, early morning",
        why: "Repeated if it comes back low.",
        source: "edWorkup",
      },
      {
        name: "HbA1c or fasting glucose",
        why: "The screen for prediabetes and diabetes.",
        source: "edWorkup",
      },
      {
        name: "Lipid panel",
        why: "Standard cardiovascular risk: total, LDL, HDL, triglycerides.",
        source: "edWorkup",
      },
      {
        name: "Thyroid or prolactin",
        why: "Added when the history or exam points that way, not for everyone.",
        source: "edWorkup",
      },
    ],
  },
];

/* ---- the Log: dated checkpoints for testosterone therapy ---- */

export type Checkpoint = {
  /** What happens in this window. */
  what: string;
  /** ISO dates (YYYY-MM-DD), inclusive window. */
  from: string;
  to: string;
  state: "past" | "open" | "ahead";
};

/** Calendar-month arithmetic on an ISO date, clamped to the month's last day. */
export function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  first.setUTCDate(Math.min(d, last));
  return first.toISOString().slice(0, 10);
}

/**
 * First-year monitoring windows from the Endocrine Society 2018 guideline
 * (Table 9), dated from the day therapy started. Returns [] for a missing or
 * malformed start date.
 */
export function trtCheckpoints(startedIso: string, todayIso: string): Checkpoint[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startedIso)) return [];
  const windows: { what: string; from: number; to: number }[] = [
    { what: "Testosterone level and hematocrit", from: 3, to: 6 },
    { what: "Follow-up visit; PSA if you chose prostate monitoring", from: 3, to: 12 },
    { what: "Yearly from here: hematocrit and a follow-up visit", from: 15, to: 18 },
  ];
  return windows.map((w) => {
    const from = addMonths(startedIso, w.from);
    const to = addMonths(startedIso, w.to);
    const state = todayIso > to ? "past" : todayIso >= from ? "open" : "ahead";
    return { what: w.what, from, to, state };
  });
}
