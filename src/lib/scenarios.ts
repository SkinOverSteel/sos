export type FreeTScenario = {
  kind: "free-t";
  id: string;
  label: string;
  totalT: string;
  tUnit: "ng/dL" | "nmol/L";
  shbg: string;
  albumin: string;
};

export type CostScenario = {
  kind: "cost";
  id: string;
  label: string;
  track: "ed" | "trt";
  edChannel?: "coupon" | "bundled";
};

export type ScenarioPreset = FreeTScenario | CostScenario;

const SCENARIOS: Record<string, ScenarioPreset> = {
  "high-shbg-low-free-t": {
    kind: "free-t",
    id: "high-shbg-low-free-t",
    label: "Normal Total T (520 ng/dL) with High SHBG (68 nmol/L)",
    totalT: "520",
    tUnit: "ng/dL",
    shbg: "68",
    albumin: "4.3",
  },
  "core-lab-panel": {
    kind: "free-t",
    id: "core-lab-panel",
    label: "Baseline Reference Example (450 ng/dL, SHBG 35 nmol/L)",
    totalT: "450",
    tUnit: "ng/dL",
    shbg: "35",
    albumin: "4.3",
  },
  "ed-cash-vs-subscription": {
    kind: "cost",
    id: "ed-cash-vs-subscription",
    label: "Generic ED Medication: Pharmacy Cash vs. Bundled Subscription",
    track: "ed",
    edChannel: "coupon",
  },
};

export function parseScenarioPreset(
  scenarioParam: string | null | undefined
): ScenarioPreset | null {
  if (!scenarioParam) return null;
  const key = scenarioParam.trim().toLowerCase();
  return SCENARIOS[key] ?? null;
}
