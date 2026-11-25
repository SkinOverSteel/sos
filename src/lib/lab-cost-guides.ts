export type GuideSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type GuideFaq = {
  q: string;
  a: string;
};

export type LabCostGuide = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  evidenceGrade: "established" | "emerging" | "anecdote" | "high-risk";
  sources: Array<{ label: string; citation: string }>;
  disclaimer: string;
  handoff: {
    href: string;
    label: string;
    scenario: string;
  };
  sections: GuideSection[];
  faqs: GuideFaq[];
};

export const EDUCATIONAL_DISCLAIMER =
  "Education, not medical advice—built to get you to a clinician better informed, never around one.";

export const labCostGuides: LabCostGuide[] = [
  {
    slug: "normal-total-t-low-free-t",
    title: "Normal Total T + Low Free T / High SHBG: What the Numbers Mean",
    description:
      "Why a normal total testosterone result can still leave bioavailable and free testosterone low when SHBG is elevated, and how to calculate it before your visit.",
    kicker: "Lab Interpretation Guide",
    evidenceGrade: "established",
    sources: [
      {
        label: "Endocrine Society Clinical Practice Guideline (2018)",
        citation:
          "Bhasin S, et al. J Clin Endocrinol Metab. 2018;103(5):1715–1744.",
      },
      {
        label: "Vermeulen Free Testosterone Equation (1999)",
        citation:
          "Vermeulen A, Verdonck L, Kaufman JM. J Clin Endocrinol Metab. 1999;84(10):3666–3672.",
      },
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
    handoff: {
      href: "/tools/free-testosterone?scenario=high-shbg-low-free-t",
      label: "Open Bioavailable Testosterone Calculator with High-SHBG Example →",
      scenario: "high-shbg-low-free-t",
    },
    sections: [
      {
        heading: "Why Total Testosterone Alone Can Miss the Picture",
        body: "Most circulating testosterone is tightly bound to Sex Hormone-Binding Globulin (SHBG) and unavailable to target tissues. Only the unbound (free) fraction and weakly albumin-bound fraction are bioavailable. When SHBG rises, Total T can sit comfortably inside the reference range while Free T drops.",
      },
      {
        heading: "Common Drivers of Elevated SHBG",
        body: "Before assuming primary hormone deficiency, clinicians typically look at reversible factors that push SHBG higher:",
        bullets: [
          "Hyperthyroidism or elevated thyroid hormone",
          "Liver enzyme induction or chronic liver conditions",
          "Aging, very low-calorie diets, or certain anticonvulsant medications",
        ],
      },
      {
        heading: "Assay Method Matters",
        body: "Direct analog free-testosterone immunoassays are notoriously inaccurate at low concentrations. Calculated Free T (Vermeulen) using LC-MS/MS Total T, SHBG, and Albumin—or equilibrium dialysis—is the standard clinical approach.",
      },
    ],
    faqs: [
      {
        q: "What SHBG level is considered high?",
        a: "Reference ranges vary by lab, but SHBG above ~55–60 nmol/L in adult men often warrants calculating Free T rather than relying on Total T alone.",
      },
      {
        q: "Should I test morning fasting?",
        a: "Yes. Guidelines recommend two separate morning fasting draws (before 10:00 AM) to confirm any low testosterone finding.",
      },
    ],
  },
  {
    slug: "core-lab-panel-context",
    title:
      "Core Lab Panel Context: Total T, SHBG, Albumin, LH, FSH, HbA1c, hs-CRP & Fasting Insulin",
    description:
      "What each marker in a comprehensive men's sexual-health and hormone panel actually tells your clinician—and which ones are optional.",
    kicker: "Lab Panel Guide",
    evidenceGrade: "established",
    sources: [
      {
        label: "AUA Erectile Dysfunction Guideline (2018)",
        citation:
          "Burnett AL, et al. J Urol. 2018;200(3):633–641.",
      },
      {
        label: "Endocrine Society Hypogonadism Guideline",
        citation:
          "Bhasin S, et al. J Clin Endocrinol Metab. 2018;103(5):1715–1744.",
      },
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
    handoff: {
      href: "/tools/free-testosterone?scenario=core-lab-panel",
      label: "Try the Bioavailable Testosterone Calculator →",
      scenario: "core-lab-panel",
    },
    sections: [
      {
        heading: "The Hormone Core (Total T, SHBG, Albumin, LH, FSH)",
        body: "Total T, SHBG, and Albumin let you calculate Free and Bioavailable T. LH and FSH tell your clinician whether a low T signal originates at the pituitary/hypothalamus (secondary) or the testes (primary)—critical if fertility is a priority.",
      },
      {
        heading: "The Vascular & Metabolic Context (HbA1c, Fasting Insulin, hs-CRP)",
        body: "Erectile tissue is a sensitive vascular barometer. Insulin resistance and systemic inflammation impair nitric-oxide signaling years before cardiac symptoms appear. Including HbA1c, fasting insulin, and hs-CRP gives your clinician the full metabolic picture.",
      },
    ],
    faqs: [
      {
        q: "Do I need all eight markers on day one?",
        a: "Not always. Morning Total T, SHBG, Albumin, and HbA1c cover most initial workups; LH/FSH are essential if Total T is low or borderline.",
      },
    ],
  },
  {
    slug: "ed-medication-pricing",
    title:
      "ED Medication & Care Pricing: Cash/Generic vs. Subscription & Clinic Markups",
    description:
      "How generic sildenafil and tadalafil pricing compares across pharmacy cash, discount cards, and bundled telehealth subscriptions.",
    kicker: "Cost & Access Guide",
    evidenceGrade: "established",
    sources: [
      {
        label: "FDA Orange Book Generic Equivalence",
        citation: "U.S. Food and Drug Administration, Approved Drug Products.",
      },
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
    handoff: {
      href: "/tools/treatment-cost?scenario=ed-cash-vs-subscription",
      label: "Compare Real Annual Costs in the ED Cost Estimator →",
      scenario: "ed-cash-vs-subscription",
    },
    sections: [
      {
        heading: "Where the Markup Hides",
        body: "Generic sildenafil and tadalafil cost pennies per tablet at wholesale. When purchased through a bundled monthly subscription, you are often paying $40–$90/month for convenience and recurring consults rather than the molecule itself.",
      },
      {
        heading: "Comparing Channels Fairly",
        body: "Always add up the full annual stack: consults, labs, medication, and shipping. A $15/month pharmacy cash fill plus one annual primary-care or urology visit frequently beats a bundled subscription by hundreds of dollars per year.",
      },
    ],
    faqs: [
      {
        q: "Are generic PDE5 inhibitors chemically identical to brand?",
        a: "Yes. FDA-approved generics contain the same active ingredient and must meet bioequivalence standards.",
      },
    ],
  },
];

export function getLabCostGuide(slug: string): LabCostGuide | undefined {
  return labCostGuides.find((g) => g.slug === slug);
}
