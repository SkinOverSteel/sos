import type { Grade } from "@/components/EvidenceBadge";

/**
 * The Log, phase one: a private n=1 protocol tracker.
 *
 * baseline → intervention → weekly check-ins → outcome.
 *
 * Storage is the member's own browser (localStorage) and nothing else. There
 * is no account, no sync, and no network call anywhere in this feature. A log
 * is the member's record of a supervised protocol, written in their words;
 * it never contains a dosing recommendation of ours. The clinician export is a
 * conversation aid, not advice.
 *
 * Evidence grading: a single member's log is, by definition, ANECDOTE. The
 * export carries that badge next to the log, and a second badge for the
 * intervention category itself so a clinician sees both at a glance. The
 * category grade comes from the same library articles the badge links to.
 */

export const LOG_STORAGE_KEY = "sos.log.v1";

export type InterventionCategory =
  | "pde5"
  | "trt"
  | "injection"
  | "shockwave"
  | "lifestyle"
  | "psych"
  | "other-rx"
  | "unsupervised";

export type InterventionInfo = {
  label: string;
  /** Evidence grade of the category as a whole (not of this member's log). */
  grade: Grade;
  /** Library article that documents the category. */
  learn: string;
  /** One-line, instrument voice. */
  note: string;
};

export const INTERVENTIONS: Record<InterventionCategory, InterventionInfo> = {
  pde5: {
    label: "PDE5 inhibitor (sildenafil, tadalafil, ...)",
    grade: "established",
    learn: "/learn/pde5-lineup",
    note: "First-line, guideline-backed. Dose and schedule are the prescriber's.",
  },
  trt: {
    label: "Testosterone therapy",
    grade: "established",
    learn: "/learn/testosterone-therapy",
    note: "Established for confirmed hypogonadism with monitoring. Not an ED drug on its own.",
  },
  injection: {
    label: "Intracavernosal injection (trimix, alprostadil)",
    grade: "established",
    learn: "/learn/penile-injections",
    note: "Established second-line therapy. Know the priapism clock before the first dose.",
  },
  shockwave: {
    label: "Low-intensity shockwave therapy",
    grade: "emerging",
    learn: "/learn/shockwave-therapy",
    note: "Early, mixed research. Guidelines call it investigational.",
  },
  lifestyle: {
    label: "Lifestyle (exercise, weight, sleep, alcohol)",
    grade: "established",
    learn: "/learn/training-for-erections",
    note: "Established effect on vascular function; slow and real.",
  },
  psych: {
    label: "Sex therapy / psychological",
    grade: "established",
    learn: "/learn/psychogenic-ed",
    note: "Established for psychogenic and mixed ED, alone or alongside medication.",
  },
  "other-rx": {
    label: "Other prescribed therapy",
    grade: "emerging",
    learn: "/learn/ed-workup",
    note: "Prescribed and supervised, but not in a category above. Graded case by case.",
  },
  unsupervised: {
    label: "Unsupervised / gray-market compound",
    grade: "high-risk",
    learn: "/learn/product-forms",
    note: "No prescriber, no verified product. Log it honestly; the warning signs matter more than the numbers.",
  },
};

export type Baseline = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** IIEF-5 / SHIM total, 5–25, from /tools/erectile-function-score. */
  shim: number | null;
  /** Free text: labs, history, what's been tried. The member's words. */
  notes: string;
};

export type Intervention = {
  category: InterventionCategory;
  /** What it is, as the prescriber named it. */
  name: string;
  /** Dose and schedule as written on the prescription or handout. Member's record only. */
  regimen: string;
  /** Who prescribes and monitors it. Empty for unsupervised. */
  prescriber: string;
  /** ISO date started. */
  started: string;
};

export type CheckIn = {
  id: string;
  /** ISO date. */
  date: string;
  /** IIEF-5 item 2 anchor: "hard enough for penetration", 1–5. */
  firmness: number;
  /** IIEF-5 item 1 anchor: confidence, 1–5. */
  confidence: number;
  /** Side effects or warning signs, in the member's words. */
  sideEffects: string;
  notes: string;
};

export type OutcomeResult = "improved" | "unchanged" | "worse" | "stopped";

export type Outcome = {
  date: string;
  result: OutcomeResult;
  /** IIEF-5 total at the end, if re-taken. */
  shim: number | null;
  summary: string;
};

export type Log = {
  version: 1;
  createdAt: string;
  updatedAt: string;
  baseline: Baseline;
  intervention: Intervention | null;
  checkins: CheckIn[];
  outcome: Outcome | null;
};

export const OUTCOME_LABELS: Record<OutcomeResult, string> = {
  improved: "Improved",
  unchanged: "No change",
  worse: "Worse",
  stopped: "Stopped early",
};

/** IIEF-5 anchors reused for the weekly check-in, so the scale is the SHIM's. */
export const FIRMNESS_ANCHORS = [
  "Almost never or never",
  "A few times",
  "About half the time",
  "Most times",
  "Almost always or always",
];
export const CONFIDENCE_ANCHORS = ["Very low", "Low", "Moderate", "High", "Very high"];

export function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function newLog(): Log {
  const now = new Date().toISOString();
  return {
    version: 1,
    createdAt: now,
    updatedAt: now,
    baseline: { date: todayIso(), shim: null, notes: "" },
    intervention: null,
    checkins: [],
    outcome: null,
  };
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Whole weeks between the intervention start and a check-in date; 0 if none. */
export function weekOf(log: Log, dateIso: string): number {
  if (!log.intervention?.started) return 0;
  const ms = Date.parse(dateIso) - Date.parse(log.intervention.started);
  if (!Number.isFinite(ms) || ms < 0) return 0;
  return Math.floor(ms / (7 * 24 * 3600 * 1000)) + 1;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/* ---- storage: the browser, and only the browser ---- */

function isLog(v: unknown): v is Log {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return o.version === 1 && typeof o.baseline === "object" && Array.isArray(o.checkins);
}

export function loadLog(): Log | null {
  try {
    const raw = window.localStorage.getItem(LOG_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isLog(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveLog(log: Log): Log {
  const next = { ...log, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private mode or blocked storage: the log still lives in React state for
    // this session, and the UI says so.
  }
  return next;
}

export function clearLog(): void {
  try {
    window.localStorage.removeItem(LOG_STORAGE_KEY);
  } catch {
    // nothing to clear
  }
}

export function parseImport(text: string): Log | null {
  try {
    const parsed: unknown = JSON.parse(text);
    return isLog(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
