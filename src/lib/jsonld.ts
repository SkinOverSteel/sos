import { SITE } from "@/lib/site";
import { articles, type Reviewer } from "@/lib/articles";

const ORG = {
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
} as const;

/**
 * Who reviewed the piece. A named clinician when one exists; otherwise an
 * honest org-level editorial review pointing at the public standard.
 * We never synthesize a fake individual reviewer.
 */
function reviewedBy(reviewer?: Reviewer | null) {
  if (reviewer) {
    return {
      "@type": "Person",
      name: reviewer.name,
      jobTitle: reviewer.credentials,
      ...(reviewer.url ? { url: reviewer.url } : {}),
    };
  }
  return {
    "@type": "Organization",
    name: `${SITE.name} editorial desk`,
    url: `${SITE.url}/methodology`,
  };
}

/**
 * Merge authorship + review E-E-A-T fields into a page's base MedicalWebPage
 * JSON-LD, sourced from the article record so dates/reviewer stay consistent
 * with the visible byline. Pass the page's slug; page-specific fields
 * (`about`, `@type`, `name`, `description`) come from `base`.
 */
export function withReview<T extends Record<string, unknown>>(base: T, slug: string) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return base;
  return {
    ...base,
    datePublished: a.published,
    dateModified: a.reviewed,
    lastReviewed: a.reviewed,
    reviewedBy: reviewedBy(a.reviewer),
    author: ORG,
    publisher: base.publisher ?? ORG,
  };
}
