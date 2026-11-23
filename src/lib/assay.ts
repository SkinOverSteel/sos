/**
 * Assay grader: scores how well a self-ordered blood panel can actually support
 * a testosterone workup, judged on the one thing commodity panels hide — the
 * assay method — not on price.
 *
 * Literacy, not diagnosis (hard line #1): this grades a PANEL's fitness for a
 * workup, never a person's hormones. Every rule traces to the measurement
 * guidance in the Endocrine Society 2018 Clinical Practice Guideline (Bhasin S,
 * et al. J Clin Endocrinol Metab. 2018;103(5):1715–1744): total testosterone by
 * LC-MS/MS or a CDC HoSt–certified assay, and free testosterone by equilibrium
 * dialysis or a calculated value rather than a direct analog immunoassay.
 *
 * Pure and framework-free on purpose: it can be unit-tested, dropped into the
 * Log, or reused on another property without pulling in React.
 */

/** How a panel measures total testosterone. */
export type TotalTMethod = "lcms" | "immunoassay" | "unknown" | "absent";
/** How a panel measures (or computes) free testosterone. */
export type FreeTMethod = "dialysis" | "calculated" | "direct" | "unknown" | "absent";

export type AssayInput = {
  totalT: TotalTMethod;
  freeT: FreeTMethod;
  /** SHBG reported — needed to estimate free T and to read the metabolic angle. */
  shbg: boolean;
  /** Albumin reported — lets a calculated free T use a real value, not a default. */
  albumin: boolean;
};

export type FindingTone = "good" | "caution" | "flag";
export type Finding = { tone: FindingTone; title: string; detail: string };

/**
 * Panel-fitness tiers. Deliberately NOT the evidence grades (established /
 * emerging / anecdote): those grade medical claims, this grades a shopping cart.
 */
export type AssayTier = "strong" | "workable" | "thin" | "insufficient";

export type AssayResult = {
  tier: AssayTier;
  /** One instrument-voice line summarizing the verdict. */
  headline: string;
  findings: Finding[];
  /** Concrete, ordered "fix this before you buy" items; empty when nothing's missing. */
  adds: string[];
};

export const TIER_LABEL: Record<AssayTier, string> = {
  strong: "Strong panel",
  workable: "Workable",
  thin: "Thin",
  insufficient: "Can't anchor a workup",
};

/** Maps a tier to an existing evidence-grade color token (outline/text only). */
export const TIER_GRADE: Record<AssayTier, "established" | "emerging" | "anecdote"> = {
  strong: "established",
  workable: "emerging",
  thin: "anecdote",
  insufficient: "anecdote",
};

const HEADLINE: Record<AssayTier, string> = {
  strong:
    "This panel can carry a real testosterone workup: the method is right and the supporting markers are there.",
  workable:
    "This panel covers the basics. A couple of additions would make the result worth more.",
  thin: "This panel has a gap that can mislead. Fix it before you pay.",
  insufficient:
    "Without a total testosterone, there's no number to build a workup on.",
};

/**
 * Grade a panel. Deterministic: same input, same verdict. Order of findings is
 * total T → free T → SHBG → albumin, so the readout reads top-down by importance.
 */
export function gradeAssay(input: AssayInput): AssayResult {
  const findings: Finding[] = [];
  const adds: string[] = [];

  // --- Total testosterone: the anchor of the whole workup. ---
  switch (input.totalT) {
    case "lcms":
      findings.push({
        tone: "good",
        title: "Total testosterone by LC-MS/MS",
        detail:
          "Mass spectrometry is the method guidelines point to, and the most reliable at the low concentrations where a diagnosis is actually made.",
      });
      break;
    case "immunoassay":
      findings.push({
        tone: "caution",
        title: "Total testosterone by immunoassay",
        detail:
          "A direct immunoassay is least reliable precisely at the low end that matters for a workup. It's usable, but LC-MS/MS is the number to want.",
      });
      adds.push("Ask for total testosterone by LC-MS/MS (mass spectrometry).");
      break;
    case "unknown":
      findings.push({
        tone: "caution",
        title: "Total testosterone method not stated",
        detail:
          "When a panel won't name the assay, assume the cheaper immunoassay. Confirm it's LC-MS/MS before you rely on a borderline result.",
      });
      adds.push("Confirm the total-testosterone assay is LC-MS/MS, not a direct immunoassay.");
      break;
    case "absent":
      findings.push({
        tone: "flag",
        title: "No total testosterone",
        detail:
          "Total testosterone is the number a diagnosis is built on. A panel without it can't anchor a workup, whatever else it includes.",
      });
      adds.push("Add total testosterone — ideally by LC-MS/MS. Nothing else substitutes for it.");
      break;
  }

  // --- Free testosterone: method matters more than its presence. ---
  switch (input.freeT) {
    case "dialysis":
      findings.push({
        tone: "good",
        title: "Free testosterone by equilibrium dialysis",
        detail: "The reference method for the free fraction. Hard to beat when it's offered.",
      });
      break;
    case "calculated":
      findings.push({
        tone: "good",
        title: "Calculated free testosterone",
        detail:
          "Derived from total T, SHBG and albumin — the accessible, validated route, and the one you can reproduce yourself.",
      });
      if (!input.shbg) {
        findings.push({
          tone: "caution",
          title: "Calculated free T, but SHBG not listed",
          detail:
            "A calculated free T needs SHBG as an input. Make sure SHBG is actually included, not just the headline free number.",
        });
      }
      break;
    case "direct":
      findings.push({
        tone: "flag",
        title: "Direct (analog) free-testosterone test",
        detail:
          "The cheap direct free-T immunoassay is widely considered unreliable. A calculated free T is more trustworthy — and you can run it free from total T, SHBG and albumin.",
      });
      adds.push(
        "Drop the direct free-T test; get SHBG instead and calculate free T from total T, SHBG and albumin.",
      );
      break;
    case "unknown":
      findings.push({
        tone: "caution",
        title: "Free-testosterone method not stated",
        detail:
          "If it's a direct analog immunoassay, it's not worth much. A calculated free T from SHBG is the safer choice.",
      });
      break;
    case "absent":
      // Not a gap on its own: a calculated free T from total T + SHBG covers it.
      if (input.shbg) {
        findings.push({
          tone: "good",
          title: "Free T not needed separately",
          detail:
            "With total T and SHBG you can calculate free testosterone yourself, so a separate free-T line isn't required.",
        });
      }
      break;
  }

  // --- SHBG: unlocks free-T estimation and the metabolic read. ---
  if (input.shbg) {
    findings.push({
      tone: "good",
      title: "SHBG included",
      detail:
        "Lets free testosterone be estimated and flags the metabolic picture (low SHBG tracks with insulin resistance).",
    });
  } else if (input.freeT !== "dialysis" && input.freeT !== "direct") {
    findings.push({
      tone: "caution",
      title: "No SHBG",
      detail:
        "Without SHBG you can't estimate free testosterone, and you lose a useful metabolic signal. It's often sold as an add-on.",
    });
    adds.push("Add SHBG — it's what makes a borderline total testosterone interpretable.");
  }

  // --- Albumin: minor, only matters for a precise calculated free T. ---
  if (!input.albumin && input.totalT !== "absent") {
    findings.push({
      tone: "caution",
      title: "No albumin",
      detail:
        "A calculated free T falls back to an assumed albumin (~4.3 g/dL) without it. Fine for most people; add it for precision.",
    });
    adds.push("Albumin is cheap and lets a free-T estimate use your real value instead of a default.");
  } else if (input.albumin) {
    findings.push({
      tone: "good",
      title: "Albumin included",
      detail: "Lets a calculated free testosterone use your actual value.",
    });
  }

  return { tier: tierFor(input, findings), headline: "", findings, adds };
}

/**
 * Collapse the findings into one tier. A flag (something actively misleading,
 * e.g. a direct free-T test) caps the panel at "thin". "strong" needs the right
 * total-T method, SHBG, and a trustworthy free-T route; a missing albumin is a
 * noted caution but doesn't block it, since a calculated free T works without it.
 */
function tierFor(input: AssayInput, findings: Finding[]): AssayTier {
  if (input.totalT === "absent") return "insufficient";
  if (findings.some((f) => f.tone === "flag")) return "thin";
  const ideal =
    input.totalT === "lcms" &&
    input.shbg &&
    (input.freeT === "calculated" || input.freeT === "dialysis");
  return ideal ? "strong" : "workable";
}

/** Convenience: grade + attach the tier's headline. Keeps gradeAssay pure of copy. */
export function gradeAssayWithHeadline(input: AssayInput): AssayResult {
  const r = gradeAssay(input);
  return { ...r, headline: HEADLINE[r.tier] };
}
