import type { Grade } from "@/components/EvidenceBadge";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  grade: Grade;
  section: string;
};

/** Open Floor education library — single source for the /learn hub + sitemap. */
export const articles: Article[] = [
  {
    slug: "erectile-function-signal",
    title: "Erectile function is a signal",
    summary:
      "Often the first visible sign of a vascular or metabolic problem — years before a heart attack or a diabetes diagnosis. Why the body flags it here first, and why it's a reason to get a workup, not to feel shame.",
    grade: "established",
    section: "Why it matters",
  },
  {
    slug: "read-your-labs",
    title: "Read your labs",
    summary:
      "You got the workup — now decode it. What total and free testosterone, SHBG, LH/FSH, fasting insulin, HbA1c, and hs-CRP actually mean, enough to have a real conversation with your clinician instead of guessing.",
    grade: "established",
    section: "The workup",
  },
  {
    slug: "pde5-long-term",
    title: "PDE5 inhibitors, long term",
    summary:
      "When they seem to stop working, the drug usually hasn't worn out — your vasculature has changed. The emerging case for long-term vascular benefit, and why your blood-pressure drug choice (nebivolol, telmisartan) matters when you have both ED and hypertension.",
    grade: "emerging",
    section: "Treatment & pharmacology",
  },
  {
    slug: "bremelanotide-pde5",
    title: "Bremelanotide + PDE5: two different levers",
    summary:
      "One works on desire in the brain, the other on the erection itself — so combining them has real pharmacological logic, and early trials helped PDE5 non-responders. But bremelanotide raises blood pressure, it's off-label in men, and most of what's sold isn't the approved drug. The honest picture.",
    grade: "emerging",
    section: "Treatment & pharmacology",
  },
  {
    slug: "telemedicine-visit",
    title: "What a good telemedicine visit looks like",
    summary:
      "Telemedicine can deliver real men's-health care — or a checkout form with a doctor's signature stapled on. The difference is whether anyone actually evaluated you. The green flags, the pill-mill red flags, and the questions to ask.",
    grade: "established",
    section: "Choosing care",
  },
  {
    slug: "what-it-costs",
    title: "What it costs — and how to get real value",
    summary:
      "The price is a stack: labs, a consult, the product, and the markup on top. Follow the journey layer by layer, see where the prescriber's cut hides, and learn how to get the most value inside the legal channel in your jurisdiction.",
    grade: "established",
    section: "Money & value",
  },
  {
    slug: "generic-pde5-value",
    title: "Generic PDE5, filled for less",
    summary:
      "The molecule went generic years ago — the gap between $3 and $400 is markup, not medicine. Transparent-pricing pharmacies like Cost Plus Drugs, the 90-day lever, and why a higher strength can cost less per dose (a prescriber conversation, not a DIY recipe).",
    grade: "established",
    section: "Money & value",
  },
  {
    slug: "product-forms",
    title: "What you're actually buying",
    summary:
      "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication reveals where it came from — and whether anyone licensed stood behind its quality.",
    grade: "established",
    section: "Quality & safety",
  },
];
