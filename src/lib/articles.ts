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
    slug: "pde5-long-term",
    title: "PDE5 inhibitors, long term",
    summary:
      "When they seem to stop working, the drug usually hasn't worn out — your vasculature has changed. The emerging case for long-term vascular benefit, and why your blood-pressure drug choice (nebivolol, telmisartan) matters when you have both ED and hypertension.",
    grade: "emerging",
    section: "Treatment & pharmacology",
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
    slug: "product-forms",
    title: "What you're actually buying",
    summary:
      "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication reveals where it came from — and whether anyone licensed stood behind its quality.",
    grade: "established",
    section: "Quality & safety",
  },
];
