export const PREP_PACKET_STORAGE_KEY = "sos_clinician_packet_v1";
const PACKET_EVENT = "sos:prep-packet-updated";

export type SymptomBaseline = {
  score: number;
  severity: string;
  date: string;
};

export type LabSnapshot = {
  totalT?: number;
  totalTUnit?: "ng/dL" | "nmol/L";
  shbg?: number;
  albumin?: number;
  freeT?: number;
  bioavailableT?: number;
  freeTPct?: number;
  bioavailableTPct?: number;
  lh?: string;
  fsh?: string;
  hba1c?: string;
  hsCrp?: string;
  fastingInsulin?: string;
  date: string;
};

export type CostEstimate = {
  mode: string;
  channel: string;
  annualTotal: number;
  monthlyTotal: number;
  date: string;
};

export type MedicationsHistory = {
  whatChanged: string;
  currentMeds: string;
  duration: string;
  updatedAt?: string;
};

export type ClinicianQuestion = {
  id: string;
  text: string;
};

export type ClinicianPrepPacket = {
  version: 1;
  updatedAt: string;
  symptomBaseline?: SymptomBaseline;
  labSnapshot?: LabSnapshot;
  costEstimate?: CostEstimate;
  medicationsHistory?: MedicationsHistory;
  questions: ClinicianQuestion[];
};

export type SmartPrompt = {
  id: string;
  title: string;
  body: string;
};

export function createEmptyPacket(): ClinicianPrepPacket {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    questions: [],
  };
}

export function loadPacket(): ClinicianPrepPacket {
  if (typeof window === "undefined") return createEmptyPacket();
  try {
    const raw = window.localStorage.getItem(PREP_PACKET_STORAGE_KEY);
    if (!raw) return createEmptyPacket();
    const parsed = JSON.parse(raw) as Partial<ClinicianPrepPacket>;
    if (parsed && parsed.version === 1) {
      return {
        version: 1,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
        symptomBaseline: parsed.symptomBaseline,
        labSnapshot: parsed.labSnapshot,
        costEstimate: parsed.costEstimate,
        medicationsHistory: parsed.medicationsHistory,
        questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      };
    }
  } catch {
    // Ignore malformed storage
  }
  return createEmptyPacket();
}

export function savePacket(packet: ClinicianPrepPacket): void {
  if (typeof window === "undefined") return;
  try {
    const next: ClinicianPrepPacket = {
      ...packet,
      version: 1,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(PREP_PACKET_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(PACKET_EVENT, { detail: next }));
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

export function updatePacket(
  updater: (prev: ClinicianPrepPacket) => ClinicianPrepPacket
): ClinicianPrepPacket {
  const current = loadPacket();
  const next = updater(current);
  savePacket(next);
  return next;
}

export function clearPacket(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREP_PACKET_STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent(PACKET_EVENT, { detail: createEmptyPacket() })
    );
  } catch {
    // Ignore
  }
}

export function subscribePacket(
  listener: (packet: ClinicianPrepPacket) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleCustom = (e: Event) => {
    const detail = (e as CustomEvent<ClinicianPrepPacket>).detail;
    listener(detail ?? loadPacket());
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === PREP_PACKET_STORAGE_KEY) {
      listener(loadPacket());
    }
  };

  window.addEventListener(PACKET_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(PACKET_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * Rule-based, strictly non-diagnostic discussion prompts based on entered numbers.
 */
export function getSmartPrompts(packet: ClinicianPrepPacket): SmartPrompt[] {
  const prompts: SmartPrompt[] = [];
  const labs = packet.labSnapshot;
  const shim = packet.symptomBaseline;

  if (labs && typeof labs.totalT === "number" && typeof labs.freeT === "number") {
    const totalNgDl =
      labs.totalTUnit === "nmol/L" ? labs.totalT * 28.84 : labs.totalT;
    // Reference context: Total T >= 350 ng/dL while calculated Free T < 6.5 ng/dL (65 pg/mL)
    if (totalNgDl >= 350 && labs.freeT < 6.5) {
      prompts.push({
        id: "normal-total-low-free",
        title: "Total T vs. Calculated Free T",
        body: "Total T is within common reference ranges while calculated Free T is low — consider asking your clinician about SHBG drivers (e.g., thyroid function, liver health, or medication effects).",
      });
    } else if (totalNgDl < 300) {
      prompts.push({
        id: "low-total-t-confirm",
        title: "Confirming Morning Total T",
        body: "Guidelines typically recommend confirming a low morning Total T with a repeat fasting draw (before 10:00 AM) plus LH/FSH to distinguish primary vs. secondary patterns.",
      });
    }
  }

  if (labs && typeof labs.shbg === "number" && labs.shbg > 55) {
    prompts.push({
      id: "elevated-shbg",
      title: "Elevated SHBG Context",
      body: "SHBG above ~55 nmol/L binds a larger fraction of Total T. Ask whether repeating Free T by equilibrium dialysis or checking thyroid/metabolic markers makes sense.",
    });
  }

  if (shim && shim.score <= 16) {
    prompts.push({
      id: "shim-workup",
      title: "Erectile Function & Vascular/Metabolic Context",
      body: "An IIEF-5 score of 16 or below often prompts clinicians to review cardiovascular risk factors (blood pressure, lipids, HbA1c, fasting insulin) alongside hormone labs.",
    });
  }

  if (!labs) {
    prompts.push({
      id: "no-labs-yet",
      title: "Baseline Lab Panel",
      body: "If you haven't had recent labs, consider asking for a morning fasting draw including Total T, SHBG, Albumin (for calculated Free T), LH, FSH, and HbA1c.",
    });
  }

  return prompts;
}

export function getSeededQuestions(packet: ClinicianPrepPacket): ClinicianQuestion[] {
  const qs: ClinicianQuestion[] = [];
  const labs = packet.labSnapshot;
  const shim = packet.symptomBaseline;

  if (labs && typeof labs.totalT === "number" && typeof labs.freeT === "number") {
    const totalNgDl =
      labs.totalTUnit === "nmol/L" ? labs.totalT * 28.84 : labs.totalT;
    if (totalNgDl >= 350 && labs.freeT < 6.5) {
      qs.push({
        id: "q-shbg-drivers",
        text: "My Total T is in range, but calculated Free T is low. Could we look at what is driving SHBG and whether equilibrium dialysis Free T is warranted?",
      });
    }
  }

  if (shim && shim.score <= 16) {
    qs.push({
      id: "q-vascular-metabolic",
      text: "Given my IIEF-5 score, which vascular or metabolic labs (e.g., HbA1c, fasting insulin, lipids) should we check alongside hormones?",
    });
  }

  qs.push({
    id: "q-next-step",
    text: "Based on my history and current medications, what is the most conservative next step to test before considering long-term therapy?",
  });

  return qs;
}

export type LogSummary = {
  baselineDate?: string;
  latestDate?: string;
  checkInCount: number;
  latestNotes?: string;
};

export function readLogSummary(): LogSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("sos.log.v1");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      baseline?: { date?: string };
      checkIns?: Array<{ date?: string; notes?: string }>;
    };
    const checkIns = Array.isArray(parsed.checkIns) ? parsed.checkIns : [];
    const latest = checkIns.length > 0 ? checkIns[checkIns.length - 1] : undefined;
    if (!parsed.baseline && checkIns.length === 0) return null;
    return {
      baselineDate: parsed.baseline?.date,
      latestDate: latest?.date,
      checkInCount: checkIns.length,
      latestNotes: latest?.notes,
    };
  } catch {
    return null;
  }
}

export function packetToPlainText(
  packet: ClinicianPrepPacket,
  logSummary: LogSummary | null
): string {
  const lines: string[] = [
    "SKIN OVER STEEL — PATIENT VISIT SUMMARY",
    `Generated: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`,
    "Disclaimer: Patient-recorded educational summary for clinical discussion.",
    "",
  ];

  lines.push("1. SYMPTOM BASELINE (IIEF-5 / SHIM)");
  if (packet.symptomBaseline) {
    lines.push(
      `   Score: ${packet.symptomBaseline.score}/25 (${packet.symptomBaseline.severity})`
    );
    lines.push(`   Date: ${packet.symptomBaseline.date}`);
  } else {
    lines.push("   Not recorded yet.");
  }
  lines.push("");

  lines.push("2. LAB SNAPSHOT");
  if (packet.labSnapshot) {
    const l = packet.labSnapshot;
    if (l.totalT !== undefined)
      lines.push(`   Total T: ${l.totalT} ${l.totalTUnit ?? "ng/dL"}`);
    if (l.shbg !== undefined) lines.push(`   SHBG: ${l.shbg} nmol/L`);
    if (l.albumin !== undefined) lines.push(`   Albumin: ${l.albumin} g/dL`);
    if (l.freeT !== undefined)
      lines.push(
        `   Calculated Free T: ${l.freeT.toFixed(2)} ng/dL (${l.freeTPct?.toFixed(2) ?? "—"}%)`
      );
    if (l.bioavailableT !== undefined)
      lines.push(
        `   Bioavailable T: ${l.bioavailableT.toFixed(1)} ng/dL (${l.bioavailableTPct?.toFixed(1) ?? "—"}%)`
      );
    if (l.lh) lines.push(`   LH: ${l.lh}`);
    if (l.fsh) lines.push(`   FSH: ${l.fsh}`);
    if (l.hba1c) lines.push(`   HbA1c: ${l.hba1c}`);
    if (l.hsCrp) lines.push(`   hs-CRP: ${l.hsCrp}`);
    if (l.fastingInsulin) lines.push(`   Fasting Insulin: ${l.fastingInsulin}`);
  } else {
    lines.push("   Not recorded yet.");
  }
  lines.push("");

  lines.push("3. CURRENT MEDICATIONS & HISTORY");
  if (packet.medicationsHistory) {
    const m = packet.medicationsHistory;
    if (m.whatChanged) lines.push(`   What changed: ${m.whatChanged}`);
    if (m.currentMeds) lines.push(`   Current meds/supplements: ${m.currentMeds}`);
    if (m.duration) lines.push(`   Duration: ${m.duration}`);
  } else {
    lines.push("   Not recorded yet.");
  }
  lines.push("");

  if (logSummary) {
    lines.push("4. PROTOCOL LOG SUMMARY");
    lines.push(
      `   Check-ins recorded: ${logSummary.checkInCount}${
        logSummary.latestDate ? ` (latest: ${logSummary.latestDate})` : ""
      }`
    );
    if (logSummary.latestNotes) lines.push(`   Latest note: ${logSummary.latestNotes}`);
    lines.push("");
  }

  lines.push("QUESTIONS FOR CLINICIAN");
  if (packet.questions.length > 0) {
    packet.questions.forEach((q, idx) => {
      lines.push(`   ${idx + 1}. ${q.text}`);
    });
  } else {
    lines.push("   None added.");
  }

  return lines.join("\n");
}
