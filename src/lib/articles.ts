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
    slug: "product-forms",
    title: "What you're actually buying",
    summary:
      "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication reveals where it came from — and whether anyone licensed stood behind its quality.",
    grade: "established",
    section: "Quality & safety",
  },
];
