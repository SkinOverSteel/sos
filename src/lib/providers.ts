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

/** Affiliate network a referral relationship runs through. */
export type AffiliateNetwork = "impact";

export const AFFILIATE_NETWORK_LABELS: Record<AffiliateNetwork, string> = {
  impact: "impact.com",
};

export type Provider = {
  slug: string;
  name: string;
  category: ProviderCategory;
  url: string; // canonical listing URL (never a tracking link)
  blurb: string;
  jurisdictions: string;
  /** GATES — both must be true to be listed. */
  licensed: boolean;
  legitimateChannel: boolean; // Rx-based (pharmacy/telemed) or accredited lab
  /** Scored criteria met (keys from TRUST_CRITERIA). */
  criteria: Record<string, boolean>;
  affiliate: boolean; // paid/referral relationship → disclose at the link
  /** Network the referral runs through; owner-facing + disclosure copy. */
  affiliateNetwork?: AffiliateNetwork;
  /**
   * Tracking URL from the network. Optional on purpose: a provider can be
   * approved for a program before the link exists, and until it is filled in
   * the card falls back to `url` and renders as an editorial listing.
   */
  affiliateUrl?: string;
  /** Owner-facing basis for the draft; shown only in DRAFT preview mode. */
  sourceNote?: string;
};

export function passesGates(p: Provider): boolean {
  return p.licensed && p.legitimateChannel;
}

/**
 * Resolve the outbound link for a card.
 *
 * `isReferral` is what drives BOTH the FTC disclosure and rel="sponsored", so
 * the two can never drift apart: a link is only ever disclosed as paid when a
 * tracking URL is actually in use, and a tracking URL can never ship without
 * its disclosure. Tracking links are used as-is (no self-redirect) so network
 * attribution isn't broken.
 */
export function providerLink(p: Provider): {
  href: string;
  isReferral: boolean;
  rel: string;
} {
  const tracking = p.affiliate ? p.affiliateUrl?.trim() : undefined;
  const isReferral = !!tracking;
  return {
    href: tracking || p.url,
    isReferral,
    rel: isReferral
      ? "sponsored nofollow noopener noreferrer"
      : "noopener noreferrer",
  };
}

/** True when any listed provider currently links out through a referral. */
export function hasReferralListings(): boolean {
  return providers.some((p) => passesGates(p) && providerLink(p).isReferral);
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

/**
 * Labcorp OnDemand runs its referral program through Impact (impact.com).
 * Set NEXT_PUBLIC_AFF_LABCORP_ONDEMAND to the tracking link Impact issues once
 * the program approves the site; until then the listing links direct and is
 * presented as editorial. The site-verification tag Impact requires lives in
 * the root layout.
 */
const LABCORP_ONDEMAND_REFERRAL =
  process.env.NEXT_PUBLIC_AFF_LABCORP_ONDEMAND ?? "";

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
    affiliate: true,
    affiliateNetwork: "impact",
    affiliateUrl: LABCORP_ONDEMAND_REFERRAL,
    sourceNote: "Accredited national lab; transparent published prices; authorized-clinician order handled by the platform. First referral relationship (Impact); its rank comes from the trust criteria alone and would be identical without it.",
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
