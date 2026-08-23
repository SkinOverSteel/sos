"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ClinicianLetterhead } from "@/components/ClinicianLetterhead";
import { EvidenceBadge } from "@/components/EvidenceBadge";

/**
 * The SHIM / IIEF-5 self-check: an interactive, client-only scoring of the
 * validated 5-item International Index of Erectile Function (Rosen et al., 1999).
 *
 * Design rules honored here:
 *  - Answers never leave the browser (pure local state, no network, no analytics
 *    on responses). Stated to the user as a trust promise.
 *  - A screen, never a diagnosis. Every result routes toward a clinician.
 *  - Instrument voice: a factual readout, not an alarm. Per the brand, the
 *    reserved emergency-red token is NOT used for a screen result (no guilt).
 */

type Question = { id: string; prompt: string; options: string[] };

// Response anchors are the validated IIEF-5 wording; option index 0..4 → 1..5.
const QUESTIONS: Question[] = [
  {
    id: "confidence",
    prompt: "How do you rate your confidence that you could get and keep an erection?",
    options: ["Very low", "Low", "Moderate", "High", "Very high"],
  },
  {
    id: "firmness",
    prompt:
      "When you had erections with sexual stimulation, how often were they hard enough for penetration?",
    options: [
      "Almost never or never",
      "A few times (much less than half the time)",
      "Sometimes (about half the time)",
      "Most times (much more than half the time)",
      "Almost always or always",
    ],
  },
  {
    id: "maintained-after",
    prompt:
      "During intercourse, how often were you able to keep your erection after you had entered your partner?",
    options: [
      "Almost never or never",
      "A few times",
      "Sometimes (about half the time)",
      "Most times",
      "Almost always or always",
    ],
  },
  {
    id: "maintained-completion",
    prompt: "During intercourse, how difficult was it to keep your erection until completion?",
    options: [
      "Extremely difficult",
      "Very difficult",
      "Difficult",
      "Slightly difficult",
      "Not difficult",
    ],
  },
  {
    id: "satisfaction",
    prompt: "When you attempted intercourse, how often was it satisfactory for you?",
    options: [
      "Almost never or never",
      "A few times",
      "Sometimes (about half the time)",
      "Most times",
      "Almost always or always",
    ],
  },
];

type Tone = "established" | "emerging" | "copper";
type Band = { label: string; tone: Tone; lead: string };

function bandFor(total: number): Band {
  if (total >= 22)
    return {
      label: "No ED indicated",
      tone: "established",
      lead:
        "Your answers land in the range that doesn't indicate erectile dysfunction. If you came here because something still feels off, trust that. A screen is a six-month snapshot, not the whole picture, and a workup is still the way to be sure.",
    };
  if (total >= 17)
    return {
      label: "Mild",
      tone: "emerging",
      lead:
        "Your answers point to mild difficulty. This is common and usually very treatable, and it's often the earliest place a vascular or metabolic change shows up, which is exactly why it's worth a workup rather than a wait-and-see.",
    };
  if (total >= 12)
    return {
      label: "Mild to moderate",
      tone: "emerging",
      lead:
        "Your answers point to mild-to-moderate difficulty. That's a clear reason to get the full workup, not to reach for a checkout-screen prescription. The evaluation finds the cause, and the cause is what makes treatment actually work.",
    };
  if (total >= 8)
    return {
      label: "Moderate",
      tone: "copper",
      lead:
        "Your answers point to moderate difficulty. It's genuinely treatable once a clinician finds the why, so the highest-value next step is a real evaluation, which also screens for the vascular and metabolic risks that travel with it.",
    };
  return {
    label: "Severe",
    tone: "copper",
    lead:
      "Your answers point to significant difficulty. That's worth taking seriously, and it is treatable once the cause is found. Bring this score to a real evaluation; it's the fastest route to the right plan, and to catching anything underneath it.",
  };
}

// Short item labels for the clinician summary (order matches QUESTIONS).
const ITEM_SHORT = [
  "Confidence",
  "Firmness for penetration",
  "Maintenance after penetration",
  "Maintenance to completion",
  "Intercourse satisfaction",
];

/** One labeled row inside the clinician-summary table. */
function ExportRow({ k, v }: { k: string; v: string }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--sos-line)" }}>
      <td style={{ padding: "6px 0", color: "var(--sos-text-lo)" }}>{k}</td>
      <td style={{ padding: "6px 0", textAlign: "right", fontWeight: 700, color: "var(--sos-text-hi)" }}>
        {v}
      </td>
    </tr>
  );
}

export function ShimTool() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );
  const [shown, setShown] = useState(false);
  const [stamp, setStamp] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = answers.filter((a) => a !== null).length;
  const complete = answeredCount === QUESTIONS.length;
  const total = useMemo(
    () => answers.reduce<number>((sum, a) => sum + (a ?? 0), 0),
    [answers],
  );

  function choose(qi: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = value;
      return next;
    });
  }

  function reveal() {
    if (!complete) return;
    setShown(true);
    setStamp(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
    // Move focus to the readout so screen readers announce it and keyboard
    // users land on the result. rAF lets the region mount first.
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setShown(false);
  }

  const band = shown ? bandFor(total) : null;

  return (
    <div>
      <p className="sos-note" style={{ marginBottom: "24px" }}>
        Answer for the <strong style={{ color: "var(--sos-text-md)" }}>past six months</strong>.
        Everything runs in your browser. Your answers never leave your device.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          reveal();
        }}
      >
        {QUESTIONS.map((q, qi) => (
          <fieldset key={q.id} className="sos-fieldset" style={{ marginBottom: "30px" }}>
            <p className="sos-q-num">
              Question {qi + 1} of {QUESTIONS.length}
            </p>
            <legend className="sos-q">{q.prompt}</legend>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {q.options.map((opt, oi) => {
                const value = oi + 1;
                const selected = answers[qi] === value;
                return (
                  <label
                    key={opt}
                    className={`sos-opt${selected ? " sos-opt--sel" : ""}`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={value}
                      checked={selected}
                      onChange={() => choose(qi, value)}
                    />
                    <span className="sos-opt__dot" aria-hidden="true" />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            type="submit"
            className="sos-btn sos-btn--primary"
            disabled={!complete}
            style={{
              border: "none",
              cursor: complete ? "pointer" : "not-allowed",
              opacity: complete ? 1 : 0.45,
            }}
          >
            Read my score
          </button>
          <span className="sos-q-num" aria-live="polite">
            {answeredCount} of {QUESTIONS.length} answered
          </span>
        </div>
      </form>

      {shown && band && (
        <>
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="sos-card sos-card--deep"
          style={{ marginTop: "34px", outline: "none" }}
        >
          <p className="sos-kicker" style={{ marginBottom: "16px" }}>
            Your result
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--sos-mono)",
                fontSize: "44px",
                fontWeight: 600,
                color: "var(--sos-text-hi)",
                lineHeight: 1,
              }}
            >
              {total}
              <span style={{ fontSize: "22px", color: "var(--sos-text-lo)" }}> / 25</span>
            </span>
            <span className={`sos-badge sos-badge--${band.tone}`}>{band.label}</span>
          </div>

          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
            {band.lead}
          </p>

          {band.tone !== "established" && (
            <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
              Erectile tissue runs on blood flow, so a lower score can be an early
              signal worth listening to:{" "}
              <Link href="/learn/erectile-function-signal">
                erectile function is a signal
              </Link>
              , sometimes the first visible sign of a vascular or metabolic problem.
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "22px",
              marginBottom: "22px",
            }}
          >
            <Link href="/learn/ed-workup" className="sos-btn sos-btn--primary">
              The ED workup →
            </Link>
            <Link href="/learn/read-your-labs" className="sos-btn sos-btn--ghost">
              Read your labs
            </Link>
            <Link href="/directory" className="sos-btn sos-btn--ghost">
              Find a provider
            </Link>
          </div>

          <p className="sos-note" style={{ marginBottom: "16px" }}>
            This is a validated <strong style={{ color: "var(--sos-text-md)" }}>screening
            questionnaire</strong>{" "}(the SHIM / IIEF-5), not a diagnosis. Only a clinician
            who can examine you and knows your history can diagnose ED or its cause:
            bring your score to that conversation.
          </p>

          <button
            type="button"
            className="sos-btn sos-btn--ghost"
            onClick={reset}
            style={{ border: "1px solid var(--sos-line)", cursor: "pointer" }}
          >
            Start over
          </button>
        </div>

        <div className="sos-clinician" style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "14px",
            }}
          >
            <p className="sos-kicker" style={{ margin: 0 }}>
              For your clinician
            </p>
            <button
              type="button"
              className="sos-btn sos-btn--ghost"
              onClick={() => window.print()}
              style={{ border: "1px solid var(--sos-line)", cursor: "pointer" }}
            >
              Print / save as PDF
            </button>
          </div>

          <div className="sos-clinician-print">
            <ClinicianLetterhead title="Erectile-function self-check (IIEF-5 / SHIM)" date={stamp}>
              <p style={{ marginTop: 0 }}>
                The validated IIEF-5 / SHIM screen (Rosen et al., 1999),
                self-scored for the past six months: a screen to inform a
                conversation, not a diagnosis.
              </p>
              <p style={{ fontFamily: "var(--sos-mono)", margin: "16px 0" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "var(--sos-text-hi)" }}>
                  {total} / 25
                </span>
                <span style={{ marginLeft: "14px", color: "var(--sos-text-lo)" }}>
                  Severity:{" "}
                  <strong style={{ color: "var(--sos-text-hi)" }}>{band.label}</strong>
                </span>
              </p>
              <p className="sos-letterhead__legend-title" style={{ margin: "0 0 8px" }}>
                Item scores (1&ndash;5)
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
                <tbody>
                  {ITEM_SHORT.map((label, i) => (
                    <ExportRow key={label} k={`${i + 1}. ${label}`} v={String(answers[i] ?? "—")} />
                  ))}
                </tbody>
              </table>
              <p style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
                <EvidenceBadge grade="established" />
                <span>
                  The IIEF-5 is a validated screening instrument for erectile
                  dysfunction.
                </span>
              </p>
            </ClinicianLetterhead>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
