import { track } from "@vercel/analytics";

export type SafeAnalyticsEvent =
  | "tool_launched"
  | "calculator_calculated"
  | "cost_compared"
  | "directory_filter_changed"
  | "partner_link_clicked";

const ALLOWED_EVENTS = new Set<SafeAnalyticsEvent>([
  "tool_launched",
  "calculator_calculated",
  "cost_compared",
  "directory_filter_changed",
  "partner_link_clicked",
]);

/**
 * Strict allowlist of non-PII, non-clinical property keys.
 * Lab values, IIEF-5 scores, zip codes, and free-text entries are never permitted.
 */
const ALLOWED_PROP_KEYS = new Set([
  "tool",
  "scenario",
  "track",
  "channel",
  "category",
  "provider",
  "isReferral",
  "filter",
]);

export type SafeAnalyticsProps = Record<string, string | boolean>;

export function sanitizeAnalyticsProps(
  raw?: Record<string, unknown>
): SafeAnalyticsProps {
  if (!raw) return {};
  const clean: SafeAnalyticsProps = {};
  for (const [key, val] of Object.entries(raw)) {
    if (!ALLOWED_PROP_KEYS.has(key)) continue;
    if (typeof val === "string" || typeof val === "boolean") {
      clean[key] = val;
    }
  }
  return clean;
}

export function trackSafeEvent(
  event: SafeAnalyticsEvent,
  props?: Record<string, unknown>
): void {
  if (!ALLOWED_EVENTS.has(event)) return;
  const safeProps = sanitizeAnalyticsProps(props);
  if (typeof window === "undefined") return;
  try {
    track(event, safeProps);
  } catch {
    // Never break UI on analytics failure
  }
}
