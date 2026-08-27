import { SITE } from "@/lib/site";
import { articles, type Reviewer } from "@/lib/articles";
import { liveTools } from "@/lib/tools";
import { CATEGORY_LABELS, CATEGORY_ORDER, rankedByCategory } from "@/lib/providers";

/**
 * Stable @id for the site's Organization node. The node itself is emitted once,
 * site-wide, by siteJsonLd() in the root layout; article schema references it by
 * @id so Google merges every page's markup into one connected entity graph.
 */
export const ORG_ID = `${SITE.url}/#org`;
const ORG_REF = { "@id": ORG_ID } as const;

/**
 * Site-level entity graph (Organization + WebSite), rendered once in the root
 * layout so it appears on every page. Gives search engines and LLMs a single,
 * canonical entity to attach the whole site to.
 *
 * Deliberately omitted for now:
 *  - `sameAs`: added only when real, owned profiles exist (X, Reddit, YouTube,
 *    Wikidata). A lone code-repo link is a weak signal for a health entity.
 *  - WebSite `potentialAction` SearchAction: no /search results page exists yet;
 *    we don't advertise a sitelinks searchbox we can't serve.
 */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        alternateName: "SOS",
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/#logo`,
          url: `${SITE.url}/logo.png`,
          contentUrl: `${SITE.url}/logo.png`,
          width: 512,
          height: 512,
          caption: SITE.name,
        },
        image: { "@id": `${SITE.url}/#logo` },
        slogan: SITE.tagline,
        description:
          "Independent, evidence-graded men's sexual-health education. Every claim carries a visible evidence grade and cites primary sources. It bridges toward a clinician, not a pharmacy or a seller.",
        knowsAbout: [
          "Erectile dysfunction",
          "Erectile function",
          "Testosterone",
          "Testosterone replacement therapy",
          "Men's sexual health",
          "Peyronie's disease",
          "Premature ejaculation",
          "PDE5 inhibitors",
        ],
        publishingPrinciples: `${SITE.url}/methodology`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        alternateName: "SOS",
        url: SITE.url,
        description:
          "Evidence-graded men's sexual-health education and a pseudonymous community.",
        publisher: ORG_REF,
        inLanguage: "en-US",
      },
    ],
  };
}

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
 *
 * `author`/`publisher` reference the site Organization node by @id (see
 * siteJsonLd), so each article connects to the one canonical entity.
 */
export function withReview<T extends Record<string, unknown>>(base: T, slug: string) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return base;
  const related = articles
    .filter((x) => x.slug !== a.slug && x.section === a.section)
    .slice(0, 4)
    .map((x) => `${SITE.url}/learn/${x.slug}`);
  return {
    ...base,
    inLanguage: "en-US",
    datePublished: a.published,
    dateModified: a.reviewed,
    lastReviewed: a.reviewed,
    reviewedBy: reviewedBy(a.reviewer),
    author: ORG_REF,
    publisher: ORG_REF,
    isPartOf: { "@type": "CollectionPage", name: "Learn", url: `${SITE.url}/learn` },
    ...(related.length ? { relatedLink: related } : {}),
  };
}

/**
 * CollectionPage + ItemList for the /learn hub. Lists every article with its
 * evidence grade, section, and review date so search engines see the full
 * catalog topology in one shot.
 */
export function learnHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Learn",
    url: `${SITE.url}/learn`,
    description:
      "Evidence-graded men's sexual-health education: the Open Floor. Every claim carries a visible evidence grade.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/learn/${a.slug}`,
        name: a.title,
      })),
    },
  };
}

/**
 * CollectionPage + ItemList for the /tools hub. Lists every live interactive
 * tool so search engines can discover and potentially carousel them.
 */
export function toolsHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tools",
    url: `${SITE.url}/tools`,
    description:
      "Private, browser-only self-assessment tools for men's sexual health. Nothing is stored or transmitted.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: liveTools.length,
      itemListElement: liveTools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.url}/tools/${t.slug}`,
        name: t.title,
      })),
    },
  };
}

/**
 * CollectionPage + ItemList for the /directory hub. Lists gate-passing
 * providers grouped by category, ranked by trust score, so search engines
 * see the directory structure with no rendering.
 */
export function directoryHubJsonLd() {
  const items: { "@type": string; position: number; url: string; name: string }[] = [];
  let pos = 1;
  for (const cat of CATEGORY_ORDER) {
    for (const p of rankedByCategory(cat)) {
      items.push({
        "@type": "ListItem",
        position: pos++,
        url: `${SITE.url}/directory#${p.slug}`,
        name: `${p.name} — ${CATEGORY_LABELS[cat]}`,
      });
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Find a provider",
    url: `${SITE.url}/directory`,
    description:
      "A transparent directory of licensed labs, telemedicine, and compounding pharmacies, ranked only on trust criteria, never on who pays.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items,
    },
  };
}
