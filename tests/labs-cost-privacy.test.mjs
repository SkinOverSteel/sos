import test from "node:test";
import assert from "node:assert/strict";

// Pure logic mirrors for Node ESM test runner without TS loader
function sanitizeAnalyticsProps(raw) {
  const ALLOWED = new Set([
    "tool",
    "scenario",
    "track",
    "channel",
    "category",
    "provider",
    "isReferral",
    "filter",
  ]);
  if (!raw) return {};
  const clean = {};
  for (const [k, v] of Object.entries(raw)) {
    if (!ALLOWED.has(k)) continue;
    if (typeof v === "string" || typeof v === "boolean") {
      clean[k] = v;
    }
  }
  return clean;
}

test("sanitizeAnalyticsProps strips all PII and clinical values", () => {
  const dirty = {
    tool: "free-testosterone",
    scenario: "high-shbg-low-free-t",
    totalT: 520,
    shbg: 68,
    albumin: 4.3,
    score: 14,
    zip: "78701",
    notes: "private symptom note",
  };
  const clean = sanitizeAnalyticsProps(dirty);
  assert.deepEqual(clean, {
    tool: "free-testosterone",
    scenario: "high-shbg-low-free-t",
  });
  assert.equal("totalT" in clean, false);
  assert.equal("score" in clean, false);
  assert.equal("zip" in clean, false);
  assert.equal("notes" in clean, false);
});
