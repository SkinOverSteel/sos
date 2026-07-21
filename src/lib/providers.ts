/**
 * Referral directory data model + trust-scoring.
 *
 * Ranking is driven ONLY by the transparent trust criteria below. A paid /
 * affiliate relationship never moves a provider's rank or score — it only
 * triggers an FTC disclosure at the link. Two hard GATES must both be true for
 * a provider to appear at all; everything else is scored, shown, and sortable.
 *
 * DIRECTORY_LIVE gates publication: while false, the page is noindex, kept out
 * of nav + sitemap, and shows a DRAFT banner. Flip to true only after the owner
 * has reviewed and approved the listings and verified the trust criteria.
 */

export const DIRECTORY_LIVE = true;

export type ProviderCategory = "lab" | "pharmacy" | "telemedicine";

export const CATEGORY_LABELS: Record<ProviderCategory, string> = {
  lab: "Blood testing",
  pharmacy: "Compounding pharmacy",
  telemedicine: "Telemedicine",
};

export const CATEGORY_ORDER: ProviderCategory[] = [
  "lab",
  "telemedicine",
  "pharmacy",
];

/** Scored trust criteria — the only inputs to a provider's rank. */
export type TrustCriterion = { key: string; label: string; weight: number };

export const TRUST_CRITERIA: TrustCriterion[] = [
  { key: "thirdPartyVerified", label: "Third-party verified / accredited", weight: 3 },
  { key: "priceTransparent", label: "Publishes pricing up front", weight: 2 },
  { key: "privacyRespecting", label: "Strong data privacy", weight: 2 },
  { key: "noDarkPatterns", label: "No lock-in; easy to cancel", weight: 2 },
  { key: "fastAccess", label: "Fast, clear turnaround", weight: 1 },
];

export type Provider = {
  slug: string;
  name: string;
  category: ProviderCategory;
  url: string; // real listing URL
  blurb: string;
  jurisdictions: string;
  /** GATES — both must be true to be listed. */
  licensed: boolean;
  legitimateChannel: boolean; // Rx-based (pharmacy/telemed) or accredited lab
  /** Scored criteria met (keys from TRUST_CRITERIA). */
  criteria: Record<string, boolean>;
  affiliate: boolean; // paid/referral relationship → disclose at the link
  /** Owner-facing basis for the draft; shown only in DRAFT preview mode. */
  sourceNote?: string;
};

export function passesGates(p: Provider): boolean {
  return p.licensed && p.legitimateChannel;
}

export function trustScore(p: Provider): number {
  const total = TRUST_CRITERIA.reduce((s, c) => s + c.weight, 0);
  const got = TRUST_CRITERIA.reduce(
    (s, c) => s + (p.criteria[c.key] ? c.weight : 0),
    0,
  );
  return Math.round((got / total) * 100);
}

/** Listed (gate-passing) providers in a category, ranked by trust score. */
export function rankedByCategory(cat: ProviderCategory): Provider[] {
  return providers
    .filter((p) => p.category === cat && passesGates(p))
    .sort(
      (a, b) => trustScore(b) - trustScore(a) || a.name.localeCompare(b.name),
    );
}

const ALL = {
  thirdPartyVerified: true,
  priceTransparent: true,
  privacyRespecting: true,
  noDarkPatterns: true,
  fastAccess: true,
};

/**
 * PROPOSED listings — researched from public info, staged for owner review.
 * All are editorial (affiliate: false) until a paid relationship is set.
 * Trust criteria are drafted from public info and pending owner verification.
 */
export const providers: Provider[] = [
  // ---- Blood testing ----
  {
    slug: "quest-health",
    name: "Quest (questhealth.com)",
    category: "lab",
    url: "https://www.questhealth.com/",
    blurb: "Consumer-ordered androgen and metabolic panels at a national accredited lab, prices shown up front.",
    jurisdictions: "US (most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: { ...ALL },
    affiliate: false,
    sourceNote: "CLIA/CAP-accredited national lab; direct-to-consumer testing with published upfront pricing.",
  },
  {
    slug: "labcorp-ondemand",
    name: "Labcorp OnDemand",
    category: "lab",
    url: "https://www.ondemand.labcorp.com/",
    blurb: "Order hormone and metabolic tests online, draw at a national accredited lab; the clinician order is built in.",
    jurisdictions: "US (most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: { ...ALL },
    affiliate: false,
    sourceNote: "Accredited national lab; transparent published prices; authorized-clinician order handled by the platform.",
  },
  {
    slug: "discounted-labs",
    name: "Discounted Labs",
    category: "lab",
    url: "https://www.discountedlabs.com/",
    blurb: "Patient-advocate-founded; low, transparent pricing on TRT-focused panels, drawn at Quest sites with sensitive assays.",
    jurisdictions: "US (most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: { ...ALL },
    affiliate: false,
    sourceNote: "Founded by patient advocate Nelson Vergel; draws at Quest locations, sensitive LC/MS assays, very transparent low pricing.",
  },

  // ---- Telemedicine ----
  {
    slug: "defy-medical",
    name: "Defy Medical",
    category: "telemedicine",
    url: "https://www.defymedical.com/",
    blurb: "Physician-led men's-health and hormone clinic since 2012; conservative, labs-first, fee-for-service.",
    jurisdictions: "US (state-dependent)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: false,
      priceTransparent: true,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: true,
    },
    affiliate: false,
    sourceNote: "Established 2012, physician/NP/pharmacist team; strong TRT-community reputation for depth of care; fee-for-service pricing.",
  },
  {
    slug: "marek-health",
    name: "Marek Health",
    category: "telemedicine",
    url: "https://marekhealth.com/",
    blurb: "Labs-and-coaching-forward hormone optimization; comprehensive panels with a physician + health-coach model.",
    jurisdictions: "US (state-dependent)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: false,
      priceTransparent: true,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: true,
    },
    affiliate: false,
    sourceNote: "Comprehensive multi-system panels; physician + coach interpretation; requires an independently obtained annual physical.",
  },

  // ---- Compounding pharmacy ----
  {
    slug: "empower-pharmacy",
    name: "Empower Pharmacy",
    category: "pharmacy",
    url: "https://www.empowerpharmacy.com/",
    blurb: "PCAB-accredited 503A compounding + FDA-registered 503B facility; sterile batches tested before release.",
    jurisdictions: "US (licensed nationwide)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: true,
      priceTransparent: false,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: true,
    },
    affiliate: false,
    sourceNote: "PCAB-accredited 503A + FDA-registered 503B outsourcing facility under cGMP; every sterile batch tested for potency, sterility, endotoxins. Dispenses via a prescriber.",
  },
  {
    slug: "cost-plus-drugs",
    name: "Mark Cuban Cost Plus Drugs",
    category: "pharmacy",
    url: "https://www.costplusdrugs.com/",
    blurb: "Licensed mail-order pharmacy with radical price transparency — strongest for cheap generic fills.",
    jurisdictions: "US (most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: false,
      priceTransparent: true,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: true,
    },
    affiliate: false,
    sourceNote: "Licensed mail-order pharmacy; wholesale + flat 15% transparent pricing. Dispensing (generics), not a compounder — included for cheap generic fills.",
  },
];
