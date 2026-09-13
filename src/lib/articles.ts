import type { Grade } from "@/components/EvidenceBadge";

/**
 * A named clinician who has reviewed a piece for medical accuracy.
 * Left null until a real credentialed reviewer signs on. We never
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
  /** One-line plain-English promise under the H1: what the reader gets. */
  deck: string;
  summary: string;
  grade: Grade;
  section: string;
  /** Curated onto the homepage "Start here" set. */
  featured?: boolean;
  /** First published (ISO date). */
  published: string;
  /** Last reviewed against the editorial standard (ISO date). */
  reviewed: string;
  /** Named clinician reviewer, when one exists. null = editorial review only. */
  reviewer?: Reviewer | null;
};

/** Open Floor education library: single source for the /learn hub + sitemap. */
export const articles: Article[] = [
  {
    slug: "erectile-function-signal",
    featured: true,
    title: "Erectile function is a signal",
    deck:
      "Why erectile trouble is often the first sign of heart or metabolic disease, and what to do with that.",
    summary:
      "Often the first visible sign of a vascular or metabolic problem, years before a heart attack or a diabetes diagnosis. Why the body flags it here first, and why it's a reason to get a workup, not to feel shame.",
    grade: "established",
    section: "Why it matters",
    published: "2026-07-20",
    reviewed: "2026-09-01",
  },
  {
    slug: "training-for-erections",
    title: "Erections are trainable",
    deck:
      "How exercise intensity changes blood flow to the penis, and which kind of training the evidence favors.",
    summary:
      "An erection is a vascular event, and the vasculature adapts to training. The mechanism from intensity to blood flow, why vigorous intervals beat a gentle walk, where anaerobic work earns its place, and the heart-safety caveat that has to come first.",
    grade: "emerging",
    section: "Foundations",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "premature-ejaculation",
    title: "Premature ejaculation, honestly",
    deck:
      "Lifelong versus acquired premature ejaculation, why it overlaps with ED, and the treatments that work.",
    summary:
      "The most common sexual concern men raise, and one of the most treatable. The difference between lifelong and acquired PE, why it so often travels with erectile trouble, and the behavioral and medical options that actually work.",
    grade: "established",
    section: "Conditions",
    published: "2026-08-04",
    reviewed: "2026-08-30",
  },
  {
    slug: "psychogenic-ed",
    title: "Performance anxiety and psychogenic ED",
    deck:
      "How performance anxiety causes erectile dysfunction, how it mixes with physical causes, and how it is treated.",
    summary:
      "Sometimes the vasculature is intact and the erection still fails, because the nervous system overrides it. How the anxiety loop starts, why it feeds itself, how it blends with real blood-flow decline as you age, and what actually breaks it. Shaped with a contributor who lived it.",
    grade: "established",
    section: "Conditions",
    published: "2026-08-23",
    reviewed: "2026-08-23",
  },
  {
    slug: "peyronies-disease",
    title: "Peyronie's disease: when it curves",
    deck:
      "What causes penile curvature, why treatment timing matters, and the options once the plaque stabilizes.",
    summary:
      "Curvature from a fibrous plaque, more common than men think, and not cancer. The two phases, why treatment timing is everything, and the injection, traction, and surgical options once it stabilizes.",
    grade: "established",
    section: "Conditions",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "ed-workup",
    featured: true,
    title: "The ED workup, start to finish",
    deck:
      "What a full erectile dysfunction evaluation includes, in order, and what each step rules out.",
    summary:
      "Erectile dysfunction is a symptom, not a diagnosis. The full evaluation (history, exam, and the labs that find the cause) walked start to finish, so you know the map before you go, and know why skipping it is the part that costs you.",
    grade: "established",
    section: "The workup",
    published: "2026-08-04",
    reviewed: "2026-09-01",
  },
  {
    slug: "nocturnal-tumescence-testing",
    title: "Overnight erection testing (NPT), explained",
    deck:
      "How nocturnal penile tumescence testing works and when it separates a physical cause from a psychological one.",
    summary:
      "The oldest question in an ED workup: is the wiring intact? Nocturnal penile tumescence testing checks whether you get erections in your sleep, the classic way to separate a physical cause from a psychological one. What the home and clinic versions measure, why the answer is rarely black-and-white, and where it fits now.",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-08-22",
  },
  {
    slug: "penile-doppler-ultrasound",
    title: "The penile Doppler ultrasound, explained",
    deck:
      "What happens during a penile Doppler ultrasound, what the numbers mean, and when it is worth ordering.",
    summary:
      "The specialized test that measures your blood flow directly: what actually happens in the room, why the injection dose can make or break the result, when a contrast study (cavernosography) comes next, and the exact numbers (PSV, EDV, RI, both sides) to ask for so you can read the study instead of just hearing \"it's fine.\"",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-09-01",
  },
  {
    slug: "cavernosography",
    title: "Cavernosography: mapping a venous leak",
    deck:
      "What cavernosometry and cavernosography measure, how a venous leak is mapped, and who needs the test.",
    summary:
      "When the Doppler suggests blood won't stay in but can't say exactly where it's escaping, this contrast study maps it. What dynamic infusion cavernosometry and cavernosography actually involve, why it's reserved for the few men considering surgery, and the honest limits of chasing a leak.",
    grade: "established",
    section: "The workup",
    published: "2026-08-22",
    reviewed: "2026-09-01",
  },
  {
    slug: "read-your-labs",
    featured: true,
    title: "Read your labs",
    deck:
      "What testosterone, SHBG, LH, FSH, insulin, HbA1c, and hs-CRP results mean on a men's health panel.",
    summary:
      "You got the workup. Now decode it. What total and free testosterone, SHBG, LH/FSH, fasting insulin, HbA1c, and hs-CRP actually mean, enough to have a real conversation with your clinician instead of guessing.",
    grade: "established",
    section: "The workup",
    published: "2026-07-20",
    reviewed: "2026-09-05",
  },
  {
    slug: "testosterone-therapy",
    title: "Testosterone therapy, done right",
    deck:
      "How testosterone replacement is diagnosed, monitored, and paid for when it is done properly.",
    summary:
      "Most of the difference between safe TRT and the gray zone is a real diagnosis and real monitoring. What it is (and isn't), the labs that keep it safe, how to make it affordable through legitimate coverage and cash levers, and the hard line between replacement and anabolic enhancement.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-09-05",
  },
  {
    slug: "pde5-long-term",
    title: "PDE5 inhibitors, long term",
    deck:
      "Why sildenafil and tadalafil seem to stop working, and what long-term daily use does to your vessels.",
    summary:
      "When they seem to stop working, the drug usually hasn't worn out: your vasculature has changed. The emerging case for long-term vascular benefit, and why your blood-pressure drug choice (nebivolol, telmisartan) matters when you have both ED and hypertension.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "pde5-lineup",
    featured: true,
    title: "The PDE5 line-up: sildenafil, tadalafil, and the rest",
    deck:
      "Sildenafil, tadalafil, vardenafil, and avanafil compared on onset, duration, food, dosing, and safety.",
    summary:
      "Viagra vs Cialis vs the rest, answered. How the four PDE5 inhibitors compare on speed, duration, food, and on-demand vs daily, plus the one hard safety rule they all share, and why they're more alike than different.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-09-01",
  },
  {
    slug: "trt-fertility",
    title: "TRT and fertility, without the panic",
    deck:
      "How testosterone therapy affects sperm count, how reversible it is, and how to protect fertility on TRT.",
    summary:
      "The fear is that testosterone therapy makes you infertile, full stop. The reality is calmer: TRT suppresses sperm while you're on it, but for most men it's a non-issue, usually reversible, often preventable, and only a real concern if you're actively trying to conceive.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-08-04",
  },
  {
    slug: "penile-injections",
    title: "Penile injections, when pills aren't enough",
    deck:
      "What trimix and other penile injections are, where they sit after pills, and how dosing is set by a prescriber.",
    summary:
      "When PDE5 pills fail or can't be used, there's a real, effective second line, and the most reliable of it is trimix, injected. What it is, where it sits on the treatment ladder, how the dose actually gets set (numbers included), and the one rule that isn't optional: the four-hour priapism emergency.",
    grade: "established",
    section: "Treatment & pharmacology",
    published: "2026-08-04",
    reviewed: "2026-09-01",
  },
  {
    slug: "apomorphine-troches",
    title: "Apomorphine's second act",
    deck:
      "What apomorphine does for erections, why Uprima failed, and what the 3-in-1 sublingual troche actually contains.",
    summary:
      "A molecule that failed the ED market on its own evidence in 2001 is back inside \"3-in-1\" sublingual troches from compounding pharmacies and telehealth brands. What apomorphine actually does, why Uprima died, which ingredient in the troche is doing the work, and why the locker-room conversation quietly moved to androgens instead.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-08-26",
    reviewed: "2026-08-26",
  },
  {
    slug: "bremelanotide-pde5",
    title: "Bremelanotide + PDE5: two different levers",
    deck:
      "How bremelanotide and PDE5 inhibitors work differently, what combining them showed, and the blood-pressure catch.",
    summary:
      "One works on desire in the brain, the other on the erection itself, so combining them has real pharmacological logic, and early trials helped PDE5 non-responders. But bremelanotide raises blood pressure, it's off-label in men, and most of what's sold isn't the approved drug. The honest picture.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "urologist-visit",
    title: "The urologist visit, on your terms",
    deck:
      "How to prepare for a urologist appointment for ED, what to bring, and what to expect from the visit.",
    summary:
      "The specialist visit is where the workup gets real, and where too many men go passive. How to prepare for the appointment (and the Doppler, if one's coming), why precision about what you already take protects your diagnosis, the data to leave with, and how to push back when the visit turns into a conveyor belt. Shaped with a contributor who learned it the expensive way.",
    grade: "established",
    section: "Choosing care",
    published: "2026-08-27",
    reviewed: "2026-08-30",
  },
  {
    slug: "telemedicine-visit",
    title: "What a good telemedicine visit looks like",
    deck:
      "How to tell a legitimate online ED or TRT consultation from a pill mill.",
    summary:
      "Telemedicine can deliver real men's-health care, or a checkout form with a doctor's signature stapled on. The difference is whether anyone actually evaluated you. The green flags, the pill-mill red flags, and the questions to ask.",
    grade: "established",
    section: "Choosing care",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "what-it-costs",
    title: "What it costs, and how to get real value",
    deck:
      "What ED and testosterone treatment really costs, layer by layer, and where the markup sits.",
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
    deck:
      "How to fill generic sildenafil or tadalafil for a few dollars a dose through transparent-pricing pharmacies.",
    summary:
      "The molecule went generic years ago. The gap between $3 and $400 is markup, not medicine. Transparent-pricing pharmacies like Cost Plus Drugs, the 90-day lever, and why a higher strength can cost less per dose (a prescriber conversation, not a DIY recipe).",
    grade: "established",
    section: "Money & value",
    published: "2026-07-20",
    reviewed: "2026-08-04",
  },
  {
    slug: "enhancement",
    title: "Enhancement, honestly",
    deck:
      "Every penile enhancement method graded by evidence, from pumps and traction to fillers, surgery, and gray-market injections.",
    summary:
      "Pumps, fillers, traction, surgery, jelqing, peptide healing stacks, growth hormone, and the gray-market injections that maim: the enhancement landscape mapped and graded, method by method. What legitimately helps, what's only temporary, and what to never let near you.",
    grade: "high-risk",
    section: "Quality & safety",
    published: "2026-08-04",
    reviewed: "2026-09-01",
  },
  {
    slug: "product-forms",
    title: "What you're actually buying",
    deck:
      "How to tell a licensed-pharmacy vial from a gray-market premix by the form the product arrives in.",
    summary:
      "Lyophilized vial, pre-mixed solution, or a ziplock of premix? How the form of an injectable peptide or ED medication reveals where it came from, and whether anyone licensed stood behind its quality.",
    grade: "established",
    section: "Quality & safety",
    published: "2026-07-20",
    reviewed: "2026-08-30",
  },
  {
    slug: "priapism-clock",
    title: "The priapism clock: what a prolonged erection does, hour by hour",
    deck:
      "What ischemic priapism does to the penis hour by hour, and why four hours is the emergency line.",
    summary:
      "Trapped blood turns acidotic within hours, smooth muscle starts dying by around hour twelve, and by hour thirty-six the odds of recovering an erection are grim. The ischemic priapism damage timeline from the AUA/SMSNA guideline, hour by hour, and what each hour means for the fix.",
    grade: "established",
    section: "Quality & safety",
    published: "2026-08-30",
    reviewed: "2026-09-01",
  },
  {
    slug: "cialis-pre-workout",
    title: "Why bodybuilders take Cialis as a pre-workout",
    deck:
      "What tadalafil does and does not do for the gym pump and performance, according to the trials.",
    summary:
      "Tadalafil for the gym pump is a real trend with real pharmacology behind it: PDE5 lives in your muscles' blood vessels too. But the performance trials mostly say it does nothing, one shows raised muscle-damage markers, and the blood-pressure math with pre-workout stacks is worse than the pump is worth.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-08-30",
    reviewed: "2026-08-30",
  },
  {
    slug: "death-grip",
    title: "Death grip is real, and it's fixable",
    deck:
      "Why some men climax easily alone but not with a partner, and the retraining approach sexual medicine uses.",
    summary:
      "The internet's rudest search term describes something sexual medicine takes seriously: men who climax easily solo but can't finish with a partner, often because their technique trained them that way. What the evidence actually says, what it doesn't, and the retraining that works.",
    grade: "emerging",
    section: "Conditions",
    published: "2026-08-30",
    reviewed: "2026-08-30",
  },
  {
    slug: "stuck-cock-ring",
    title: "The ER visit nobody talks about: the stuck cock ring",
    deck:
      "What happens when a constriction ring will not come off, how quickly it becomes an emergency, and what the ER does.",
    summary:
      "Constriction rings are supposed to come off after 30 minutes. When one won't, it's the same ischemic clock as priapism, wound around the outside: swelling tightens the trap, the injury grades climb with the hours, and the only variable that decides the outcome is how long you wait. The warning signs and what the ER actually does.",
    grade: "established",
    section: "Quality & safety",
    published: "2026-08-30",
    reviewed: "2026-08-30",
  },
  {
    slug: "semen-retention",
    title: "Semen retention: the 7-day testosterone spike is real, and it's a trap",
    deck:
      "What the science says about abstinence and testosterone, and why the famous 7-day spike is not what it seems.",
    summary:
      "The study behind the famous 7-day testosterone spike was retracted in 2021, the spike was never replicated, and even at face value it describes a blip, not a superpower. What the semen-retention evidence actually says, including the prostate-cancer finding that points the other way.",
    grade: "emerging",
    section: "Foundations",
    published: "2026-08-30",
    reviewed: "2026-08-30",
  },
  {
    slug: "honey-packets",
    title: "That $5 'horny honey' packet is unregulated Viagra",
    deck:
      "What FDA testing found inside 'horny honey' packets, and why hidden sildenafil at an unknown dose is dangerous.",
    summary:
      "The viral honey-packet trend, sold at gas stations and on TikTok, is honey plus hidden prescription drugs. FDA lab testing found sildenafil and tadalafil in dozens of named products, at unknown doses. What's actually in the packet, the documented injuries, and how to read the risk.",
    grade: "established",
    section: "Quality & safety",
    published: "2026-08-30",
    reviewed: "2026-08-30",
  },
  {
    slug: "trt-high-hematocrit",
    title:
      "High hematocrit on TRT: the number that ends therapy, and the bad advice that follows",
    deck:
      "What high hematocrit on testosterone therapy means, the real threshold, and what blood donation does and does not fix.",
    summary:
      "Erythrocytosis is the most common TRT side effect, and the advice that follows it is a mess: the guideline's 54% number versus the borrowed 45%, the misread blood-donation studies, the altitude and athlete myths, the delivery-route and BP-drug levers that actually move it, and the ferritin crash from repeated phlebotomy that nobody tests for.",
    grade: "emerging",
    section: "Treatment & pharmacology",
    published: "2026-09-05",
    reviewed: "2026-09-05",
  },
];
