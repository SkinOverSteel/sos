"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  type AssayInput,
  type AssayResult,
  type FreeTMethod,
  type TotalTMethod,
  gradeAssayWithHeadline,
  TIER_GRADE,
  TIER_LABEL,
} from "@/lib/assay";

/**
 * Grades a blood panel on assay quality, not price — the "read what you're
 * actually buying" tool applied to lab work. Everything runs client-side;
 * nothing entered is stored or sent. The verdict routes toward the calculator,
 * the directory and a clinician, never a diagnosis.
 */

type Opt<T extends string> = { value: T; label: string };

const TOTAL_OPTS: Opt<TotalTMethod>[] = [
  { value: "lcms", label: "LC-MS/MS" },
  { value: "immunoassay", label: "Immunoassay" },
  { value: "unknown", label: "Not stated" },
  { value: "absent", label: "Not included" },
];

const FREE_OPTS: Opt<FreeTMethod>[] = [
  { value: "calculated", label: "Calculated" },
  { value: "dialysis", label: "Equilibrium dialysis" },
  { value: "direct", label: "Direct" },
  { value: "unknown", label: "Not stated" },
  { value: "absent", label: "Not included" },
];

const YESNO: Opt<"yes" | "no">[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/** A labeled segmented control; mirrors the unit toggles on the free-T calculator. */
function Seg<T extends string>({
  legend,
  hint,
  name,
  value,
  opts,
  onChange,
}: {
  legend: string;
  hint?: string;
  name: string;
  value: T;
  opts: Opt<T>[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
      <legend className="sos-label" style={{ marginBottom: hint ? "2px" : "8px" }}>
        {legend}
      </legend>
      {hint ? (
        <p className="sos-note" style={{ margin: "0 0 10px" }}>
          {hint}
        </p>
      ) : null}
      <div className="sos-seg" role="group" aria-label={legend} data-field={name}>
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={value === o.value}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const TONE_MARK: Record<"good" | "caution" | "flag", string> = {
  good: "✓",
  caution: "•",
  flag: "!",
};
const TONE_COLOR: Record<"good" | "caution" | "flag", string> = {
  good: "var(--sos-grade-established)",
  caution: "var(--sos-grade-emerging)",
  flag: "var(--sos-grade-anecdote)",
};

export function AssayGrader() {
  const [totalT, setTotalT] = useState<TotalTMethod>("lcms");
  const [freeT, setFreeT] = useState<FreeTMethod>("calculated");
  const [shbg, setShbg] = useState<"yes" | "no">("yes");
  const [albumin, setAlbumin] = useState<"yes" | "no">("no");
  const [result, setResult] = useState<AssayResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function grade() {
    const input: AssayInput = {
      totalT,
      freeT,
      shbg: shbg === "yes",
      albumin: albumin === "yes",
    };
    setResult(gradeAssayWithHeadline(input));
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return (
    <div>
      <p className="sos-note" style={{ marginBottom: "24px" }}>
        Pick what the panel you&apos;re looking at actually lists — the method
        names are usually in the test title or the &ldquo;what&apos;s
        included&rdquo; section. Everything runs in your browser; nothing is
        saved or sent.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          grade();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <Seg
          legend="Total testosterone, measured by"
          hint="The anchor of a workup. Mass spectrometry (LC-MS/MS) is the method to want."
          name="totalT"
          value={totalT}
          opts={TOTAL_OPTS}
          onChange={setTotalT}
        />
        <Seg
          legend="Free testosterone, measured by"
          hint="A calculated value or equilibrium dialysis beats the cheaper direct test."
          name="freeT"
          value={freeT}
          opts={FREE_OPTS}
          onChange={setFreeT}
        />
        <Seg
          legend="SHBG included?"
          hint="Lets free testosterone be estimated; also a metabolic signal."
          name="shbg"
          value={shbg}
          opts={YESNO}
          onChange={setShbg}
        />
        <Seg
          legend="Albumin included?"
          name="albumin"
          value={albumin}
          opts={YESNO}
          onChange={setAlbumin}
        />

        <div>
          <button
            type="submit"
            className="sos-btn sos-btn--primary"
            data-track="assay_grader_run"
            data-track-total={totalT}
            data-track-free={freeT}
            style={{ border: "none", cursor: "pointer" }}
          >
            Grade this panel
          </button>
        </div>
      </form>

      {result ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="sos-card sos-card--deep"
          style={{ marginTop: "34px", outline: "none" }}
        >
          <p className="sos-kicker" style={{ marginBottom: "12px" }}>
            Panel grade
          </p>
          <p
            style={{
              fontFamily: "var(--sos-mono)",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: `var(--sos-grade-${TIER_GRADE[result.tier]})`,
              margin: "0 0 10px",
            }}
          >
            {TIER_LABEL[result.tier]}
          </p>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
            {result.headline}
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: "0 0 20px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {result.findings.map((f) => (
              <li key={f.title} style={{ display: "flex", gap: "12px" }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--sos-mono)",
                    fontWeight: 700,
                    color: TONE_COLOR[f.tone],
                    flex: "none",
                    width: "1em",
                    textAlign: "center",
                  }}
                >
                  {TONE_MARK[f.tone]}
                </span>
                <span>
                  <strong style={{ color: "var(--sos-text-hi)" }}>{f.title}.</strong>{" "}
                  <span className="sos-prose" style={{ fontSize: "15px" }}>
                    {f.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {result.adds.length > 0 ? (
            <div style={{ marginBottom: "20px" }}>
              <p className="sos-q-num" style={{ marginBottom: "8px" }}>
                Before you buy
              </p>
              <ul className="sos-prose" style={{ fontSize: "15px", paddingLeft: "18px", margin: 0 }}>
                {result.adds.map((a) => (
                  <li key={a} style={{ marginBottom: "6px" }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px" }}>
            <Link
              href="/tools/free-testosterone"
              className="sos-btn sos-btn--primary"
              data-track="assay_grader_out"
              data-track-target="calculator"
            >
              Calculate free T →
            </Link>
            <Link
              href="/directory#lab"
              className="sos-btn sos-btn--ghost"
              data-track="assay_grader_out"
              data-track-target="directory"
            >
              Find a lab
            </Link>
            <Link
              href="/learn/read-your-labs"
              className="sos-btn sos-btn--ghost"
              data-track="assay_grader_out"
              data-track-target="read-your-labs"
            >
              Read your labs
            </Link>
          </div>

          <p className="sos-note">
            This grades the <strong style={{ color: "var(--sos-text-md)" }}>panel</strong>,
            not you. It says whether a test can support a workup, never what your
            result means — that reading is your clinician&apos;s.
          </p>
        </div>
      ) : null}
    </div>
  );
}
