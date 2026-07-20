/**
 * Referral directory data model + trust-scoring.
 *
 * Ranking is driven ONLY by the transparent trust criteria below. A paid /
 * affiliate relationship never moves a provider's rank or score — it only
 * triggers an FTC disclosure at the link. Two hard GATES must both be true for
 * a provider to appear at all; everything else is scored, shown, and sortable.
 */

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
  url: string; // FTC-disclosed referral link, or "#" for examples
  blurb: string;
  jurisdictions: string;
  /** GATES — both must be true to be listed. */
  licensed: boolean;
  legitimateChannel: boolean; // Rx-based (pharmacy/telemed) or accredited lab
  /** Scored criteria met (keys from TRUST_CRITERIA). */
  criteria: Record<string, boolean>;
  affiliate: boolean; // paid/referral relationship → disclose at the link
  example?: boolean; // placeholder shown while the directory is being built
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

export const hasRealListings = (): boolean =>
  providers.some((p) => !p.example && passesGates(p));

/**
 * PLACEHOLDER DATA. Every entry is flagged `example: true` and uses url "#".
 * Replace with real, vetted, licensed providers — then flip the directory to
 * indexable and add it to nav + sitemap. Do NOT ship these as real listings.
 */
export const providers: Provider[] = [
  {
    slug: "example-lab-a",
    name: "Example Labs — Direct (placeholder)",
    category: "lab",
    url: "#",
    blurb: "Order androgen + metabolic panels online, draw at a local lab.",
    jurisdictions: "US (most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: true,
      priceTransparent: true,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: true,
    },
    affiliate: true,
    example: true,
  },
  {
    slug: "example-lab-b",
    name: "Example Diagnostics (placeholder)",
    category: "lab",
    url: "#",
    blurb: "Broad hormone panels; results in a portal.",
    jurisdictions: "US",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: true,
      priceTransparent: false,
      privacyRespecting: true,
      noDarkPatterns: true,
      fastAccess: false,
    },
    affiliate: false,
    example: true,
  },
  {
    slug: "example-telemed-a",
    name: "Example Men's Health Telemed (placeholder)",
    category: "telemedicine",
    url: "#",
    blurb: "Licensed prescribers; transparent one-time consult option.",
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
    affiliate: true,
    example: true,
  },
  {
    slug: "example-pharmacy-a",
    name: "Example Compounding Pharmacy (placeholder)",
    category: "pharmacy",
    url: "#",
    blurb: "503A compounding; publishes cash prices; third-party potency testing.",
    jurisdictions: "US (ships most states)",
    licensed: true,
    legitimateChannel: true,
    criteria: {
      thirdPartyVerified: true,
      priceTransparent: true,
      privacyRespecting: true,
      noDarkPatterns: false,
      fastAccess: true,
    },
    affiliate: true,
    example: true,
  },
];
