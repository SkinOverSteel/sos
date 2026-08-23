import type { Grade } from "@/components/EvidenceBadge";

/**
 * A named clinician who has reviewed a piece for medical accuracy.
 * Left null until a real credentialed reviewer signs on — we never
 * fabricate a byline or a credential (trust is the product).
 */
export type Reviewer = {
  name: string;
  credentials: string; // e.g. "MD, Urology"
  url?: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  grade: Grade;
  section: string;
  /** First published (ISO date). */
  published: string;
  /** Last reviewed against the editorial standard (ISO date). */
  reviewed: string;
  /** Named clinician reviewer, when one exists. null = editorial review only. */
  reviewer?: Reviewer | null;
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
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "training-for-erections",
    title: "Erections are trainable",
    summary:
      "An erection is a vascular event — and the vasculature adapts to training. The mechanism from intensity to blood flow, why vigorous intervals beat a gentle walk, where anaerobic work earns its place, and the heart-safety caveat that has to come first.",
    grade: "emerging",
    section: "Foundations",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "premature-ejaculation",
    title: "Premature ejaculation, honestly",
    summary:
      "The most common sexual concern men raise — and one of the most treatable. The difference between lifelong and acquired PE, why it so often travels with erectile trouble, and the behavioral and medical options that actually work.",
    grade: "established",
    section: "Conditions",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "peyronies-disease",
    title: "Peyronie's disease: when it curves",
    summary:
      "Curvature from a fibrous plaque — more common than men think, and not cancer. The two phases, why treatment timing is everything, and the injection, traction, and surgical options once it stabilizes.",
    grade: "established",
    section: "Conditions",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "ed-workup",
    title: "The ED workup, start to finish",
    summary:
      "Erectile dysfunction is a symptom, not a diagnosis. The full evaluation — history, exam, and the labs that find the cause — walked start to finish, so you know the map before you go, and know why skipping it is the part that costs you.",
    grade: "established",
    section: "The workup",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "nocturnal-tumescence-testing",
    title: "Overnight erection testing (NPT), explained",
    summary:
      "The oldest question in an ED workup: is the wiring intact? Nocturnal penile tumescence testing checks whether you get erections in your sleep — the classic way to separate a physical cause from a psychological one. What the home and clinic versions measure, why the answer is rarely black-and-white, and where it fits now.",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-08-22",
  },
  {
    slug: "penile-doppler-ultrasound",
    title: "The penile Doppler ultrasound, explained",
    summary:
      "The specialized test that measures your blood flow directly — what actually happens in the room, why the injection dose can make or break the result, when a contrast study (cavernosography) comes next, and the exact numbers (PSV, EDV, RI, both sides) to ask for so you can read the study instead of just hearing \"it's fine.\"",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-08-22",
  },
  {
    slug: "cavernosography",
    title: "Cavernosography: mapping a venous leak",
    summary:
      "When the Doppler suggests blood won't stay in but can't say exactly where it's escaping, this contrast study maps it. What dynamic infusion cavernosometry and cavernosography actually involve, why it's reserved for the few men considering surgery, and the honest limits of chasing a leak.",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-08-22",
  },
  {
    slug: "read-your-labs",
    title: "Read your labs",
    summary:
      "You got the workup — now decode it. What total and free testosterone, SHBG, LH/FSH, fasting insulin, HbA1c, and hs-CRP actually mean, enough to have a real conversation with your clinician instead of guessing.",
    grade: "established",
    section: "The workup",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "testosterone-therapy",
    title: "Testosterone therapy, done right",
    summary:
      "Most of the difference between safe TRT and the gray zone is a real diagnosis and real monitoring. What it is (and isn't), the labs that keep it safe, how to make it affordable through legitimate coverage and cash levers — and the hard line between replacement and anabolic enhancement.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "pde5-long-term",
    title: "PDE5 inhibitors, long term",
    summary:
      "When they seem to stop working, the drug usually hasn't worn out — your vasculature has changed. The emerging case for long-term vascular benefit, and why your blood-pressure drug choice (nebivolol, telmisartan) matters when you have both ED and hypertension.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "pde5-lineup",
    title: "The PDE5 line-up: sildenafil, tadalafil, and the rest",
    summary:
      "Viagra vs Cialis vs the rest, answered. How the four PDE5 inhibitors compare on speed, duration, food, and on-demand vs daily — plus the one hard safety rule they all share, and why they're more alike than different.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "trt-fertility",
    title: "TRT and fertility, without the panic",
    summary:
      "The fear is that testosterone therapy makes you infertile, full stop. The reality is calmer: TRT suppresses sperm while you're on it, but for most men it's a non-issue — usually reversible, often preventable, and only a real concern if you're actively trying to conceive.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "penile-injections",
    title: "Penile injections, when pills aren't enough",
    summary:
      "When PDE5 pills fail or can't be used, there's a real, effective second line — and the most reliable of it is trimix, injected. What it is, where it sits on the treatment ladder, and the one rule that isn't optional: the four-hour priapism emergency.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "bremelanotide-pde5",
    title: "Bremelanotide + PDE5: two different levers",
    summary:
      "One works on desire in the brain, the other on the erection itself — so combining them has real pharmacological logic, and early trials helped PDE5 non-responders. But bremelanotide raises blood pressure, it's off-label in men, and most of what's sold isn't the approved drug. The honest picture.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "telemedicine-visit",
    title: "What a good telemedicine visit looks like",
    summary:
      "Telemedicine can deliver real men's-health care — or a checkout form with a doctor's signature stapled on. The difference is whether anyone actually evaluated you. The green flags, the pill-mill red flags, and the questions to ask.",
    grade: "established",
    section: "Choosing care",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "what-it-costs",
    title: "What it costs — and how to get real value",
    summary:
      "The price is a stack: labs, a consult, the product, and the markup on top. Follow the journey layer by layer, see where the prescriber's cut hides, and learn how to get the most value inside the legal channel in your jurisdiction.",
    grade: "established",
    section: "Money & value",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "generic-pde5-value",
    title: "Generic PDE5, filled for less",
    summary:
      "The molecule went generic years ago — the gap between $3 and $400 is markup, not medicine. Transparent-pricing pharmacies like Cost Plus Drugs, the 90-day lever, and why a higher strength can cost less per dose (a prescriber conversation, not a DIY recipe).",
    grade: "established",
    section: "Money & value",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "enhancement",
    title: "Enhancement, honestly",
    summary:
      "Pumps, fillers, traction, surgery, jelqing, peptide healing stacks, growth hormone, and the gray-market injections that maim — the enhancement landscape mapped and graded, method by method. What legitimately helps, what's only temporary, and what to never let near you.",
    grade: "high-risk",
    section: "Quality & safety",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "product-forms",
    title: "What you're actually buying",
    summary:
      "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication reveals where it came from — and whether anyone licensed stood behind its quality.",
    grade: "established",
    section: "Quality & safety",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
];
