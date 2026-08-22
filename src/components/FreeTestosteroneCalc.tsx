"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ClinicianLetterhead } from "@/components/ClinicianLetterhead";
import { EvidenceBadge } from "@/components/EvidenceBadge";

/**
 * Free & bioavailable testosterone by the Vermeulen method (Vermeulen A, et al.
 * J Clin Endocrinol Metab. 1999). Solves the SHBG/albumin binding equilibrium
 * as a quadratic in free T. Estimates only — labs and calculators vary slightly
 * in their constants — so the readout routes toward a clinician, never a verdict.
 *
 * Everything runs client-side; nothing entered is stored or transmitted.
 */

// Association constants (L/mol) and molecular weights.
const KT = 1.0e9; // testosterone–SHBG
const KA = 3.6e4; // testosterone–albumin
const MW_ALB = 66500; // albumin, g/mol
const NGDL_PER_NMOLL = 28.84; // 1 nmol/L testosterone = 28.84 ng/dL

type TUnit = "ng/dL" | "nmol/L";
type AUnit = "g/dL" | "g/L";

function toNmolL(totalT: number, unit: TUnit): number {
  return unit === "nmol/L" ? totalT : totalT / NGDL_PER_NMOLL;
}
function albToGL(albumin: number, unit: AUnit): number {
  return unit === "g/L" ? albumin : albumin * 10;
}

type Result = {
  freeNgdl: number;
  freeNmolL: number;
  freePgml: number;
  freePct: number;
  bioNgdl: number;
  bioNmolL: number;
  bioPct: number;
};

/** All inputs already normalized: total T in nmol/L, SHBG in nmol/L, albumin g/L. */
function vermeulen(totalT_nmolL: number, shbg_nmolL: number, albumin_gL: number): Result {
  const T = totalT_nmolL * 1e-9; // mol/L
  const S = shbg_nmolL * 1e-9;
  const A = albumin_gL / MW_ALB;

  const N = 1 + KA * A;
  const a = N * KT;
  const b = N + KT * (S - T);
  const c = -T;

  const FT = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a); // mol/L free T
  const shbgBound = (KT * FT * S) / (1 + KT * FT); // mol/L bound to SHBG
  const bioT = T - shbgBound; // free + albumin-bound

  const freeNmolL = FT * 1e9;
  const bioNmolL = bioT * 1e9;
  return {
    freeNmolL,
    freeNgdl: freeNmolL * NGDL_PER_NMOLL,
    freePgml: freeNmolL * NGDL_PER_NMOLL * 10,
    freePct: (freeNmolL / totalT_nmolL) * 100,
    bioNmolL,
    bioNgdl: bioNmolL * NGDL_PER_NMOLL,
    bioPct: (bioNmolL / totalT_nmolL) * 100,
  };
}

function freePctNote(pct: number): string {
  if (pct < 1.5)
    return "A relatively small share of your testosterone is free — a pattern often driven by higher SHBG. Total T can read as reassuring while the usable fraction lags, which is exactly why free T is worth calculating.";
  if (pct <= 3)
    return "That sits within the broad typical range for the free fraction (roughly 1.5–2.5% of total). Reference ranges still vary by lab and age — the number means the most in context.";
  return "A relatively large share is free — often seen with lower SHBG. What it means still depends on your total T and your symptoms.";
}

const fmt = (n: number, d = 1) => (Number.isFinite(n) ? n.toFixed(d) : "—");

/** One labeled row inside the clinician-summary tables. */
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

export function FreeTestosteroneCalc() {
  const [totalT, setTotalT] = useState("");
  const [tUnit, setTUnit] = useState<TUnit>("ng/dL");
  const [shbg, setShbg] = useState("");
  const [albumin, setAlbumin] = useState("");
  const [aUnit, setAUnit] = useState<AUnit>("g/dL");
  const [shown, setShown] = useState(false);
  const [stamp, setStamp] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const tt = parseFloat(totalT);
  const sh = parseFloat(shbg);
  const albRaw = albumin.trim() === "" ? (aUnit === "g/dL" ? 4.3 : 43) : parseFloat(albumin);
  const valid = tt > 0 && sh > 0 && albRaw > 0;

  const result = useMemo<Result | null>(() => {
    if (!valid) return null;
    return vermeulen(toNmolL(tt, tUnit), sh, albToGL(albRaw, aUnit));
  }, [valid, tt, tUnit, sh, albRaw, aUnit]);

  function calculate() {
    if (!valid) return;
    setShown(true);
    setStamp(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
    requestAnimationFrame(() => resultRef.current?.focus());
  }
  function clear() {
    setTotalT("");
    setShbg("");
    setAlbumin("");
    setShown(false);
  }

  return (
    <div>
      <p className="sos-note" style={{ marginBottom: "24px" }}>
        You&apos;ll need three numbers from a blood test:{" "}
        <strong style={{ color: "var(--sos-text-md)" }}>total testosterone</strong>,{" "}
        <strong style={{ color: "var(--sos-text-md)" }}>SHBG</strong>, and — optionally —{" "}
        <strong style={{ color: "var(--sos-text-md)" }}>albumin</strong>. Everything runs in
        your browser; nothing you enter is saved or sent.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        {/* Total testosterone */}
        <div>
          <label className="sos-label" htmlFor="totalT">
            Total testosterone
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              id="totalT"
              className="sos-field"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder={tUnit === "ng/dL" ? "e.g. 600" : "e.g. 20.8"}
              value={totalT}
              onChange={(e) => setTotalT(e.target.value)}
            />
            <div className="sos-seg" role="group" aria-label="Total testosterone units">
              {(["ng/dL", "nmol/L"] as TUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={tUnit === u}
                  onClick={() => setTUnit(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SHBG */}
        <div>
          <label className="sos-label" htmlFor="shbg">
            SHBG
          </label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              id="shbg"
              className="sos-field"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="e.g. 30"
              value={shbg}
              onChange={(e) => setShbg(e.target.value)}
            />
            <span
              className="sos-label"
              style={{ margin: 0, whiteSpace: "nowrap", flex: "none" }}
            >
              nmol/L
            </span>
          </div>
        </div>

        {/* Albumin (optional) */}
        <div>
          <label className="sos-label" htmlFor="albumin">
            Albumin <span style={{ color: "var(--sos-text-lo)" }}>· optional</span>
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              id="albumin"
              className="sos-field"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder={aUnit === "g/dL" ? "default 4.3" : "default 43"}
              value={albumin}
              onChange={(e) => setAlbumin(e.target.value)}
            />
            <div className="sos-seg" role="group" aria-label="Albumin units">
              {(["g/dL", "g/L"] as AUnit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  aria-pressed={aUnit === u}
                  onClick={() => setAUnit(u)}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            type="submit"
            className="sos-btn sos-btn--primary"
            disabled={!valid}
            style={{
              border: "none",
              cursor: valid ? "pointer" : "not-allowed",
              opacity: valid ? 1 : 0.45,
            }}
          >
            Calculate free T
          </button>
          {!valid && (
            <span className="sos-q-num">Enter total testosterone and SHBG</span>
          )}
        </div>
      </form>

      {shown && result && (
        <>
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="sos-card sos-card--deep"
          style={{ marginTop: "34px", outline: "none" }}
        >
          <p className="sos-kicker" style={{ marginBottom: "18px" }}>
            Your result
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", marginBottom: "20px" }}>
            <div>
              <p className="sos-q-num" style={{ marginBottom: "6px" }}>
                Free testosterone
              </p>
              <p
                style={{
                  fontFamily: "var(--sos-mono)",
                  fontSize: "34px",
                  fontWeight: 600,
                  color: "var(--sos-text-hi)",
                  lineHeight: 1.05,
                }}
              >
                {fmt(result.freeNgdl)}
                <span style={{ fontSize: "16px", color: "var(--sos-text-lo)" }}> ng/dL</span>
              </p>
              <p className="sos-note" style={{ marginTop: "4px" }}>
                {fmt(result.freeNmolL, 2)} nmol/L · {fmt(result.freePgml, 0)} pg/mL ·{" "}
                <strong style={{ color: "var(--sos-copper)" }}>
                  {fmt(result.freePct, 1)}% of total
                </strong>
              </p>
            </div>

            <div>
              <p className="sos-q-num" style={{ marginBottom: "6px" }}>
                Bioavailable testosterone
              </p>
              <p
                style={{
                  fontFamily: "var(--sos-mono)",
                  fontSize: "34px",
                  fontWeight: 600,
                  color: "var(--sos-text-hi)",
                  lineHeight: 1.05,
                }}
              >
                {fmt(result.bioNgdl, 0)}
                <span style={{ fontSize: "16px", color: "var(--sos-text-lo)" }}> ng/dL</span>
              </p>
              <p className="sos-note" style={{ marginTop: "4px" }}>
                {fmt(result.bioNmolL, 1)} nmol/L · {fmt(result.bioPct, 0)}% of total
              </p>
            </div>
          </div>

          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
            {freePctNote(result.freePct)}
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "22px" }}>
            <Link href="/learn/read-your-labs" className="sos-btn sos-btn--primary">
              Read your labs →
            </Link>
            <Link href="/learn/testosterone-therapy" className="sos-btn sos-btn--ghost">
              Testosterone therapy
            </Link>
            <Link href="/directory" className="sos-btn sos-btn--ghost">
              Find a provider
            </Link>
          </div>

          <p className="sos-note" style={{ marginBottom: "16px" }}>
            An <strong style={{ color: "var(--sos-text-md)" }}>estimate</strong>{" "}
            by the Vermeulen method — not a diagnosis, and not a substitute for your lab&apos;s
            own reference range.
            Whether a number is &quot;low&quot; depends on your total T, your symptoms, and your
            clinician&apos;s read — bring it to that conversation.
          </p>

          <button
            type="button"
            className="sos-btn sos-btn--ghost"
            onClick={clear}
            style={{ border: "1px solid var(--sos-line)", cursor: "pointer" }}
          >
            Clear
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
            <ClinicianLetterhead title="Free-testosterone estimate" date={stamp}>
              <p style={{ marginTop: 0 }}>
                Estimated from a blood test by the Vermeulen method — shared to
                support a conversation about androgen status, not as a diagnosis.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  margin: "18px 0",
                }}
              >
                <div>
                  <p className="sos-letterhead__legend-title" style={{ margin: "0 0 8px" }}>
                    Inputs
                  </p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
                    <tbody>
                      <ExportRow k="Total testosterone" v={`${totalT} ${tUnit}`} />
                      <ExportRow k="SHBG" v={`${shbg} nmol/L`} />
                      <ExportRow
                        k="Albumin"
                        v={
                          albumin.trim() === ""
                            ? `${aUnit === "g/dL" ? "4.3 g/dL" : "43 g/L"} (assumed)`
                            : `${albumin} ${aUnit}`
                        }
                      />
                    </tbody>
                  </table>
                </div>
                <div>
                  <p className="sos-letterhead__legend-title" style={{ margin: "0 0 8px" }}>
                    Estimate (Vermeulen)
                  </p>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
                    <tbody>
                      <ExportRow k="Free testosterone" v={`${fmt(result.freeNgdl)} ng/dL`} />
                      <ExportRow k="Free fraction" v={`${fmt(result.freePct, 1)}% of total`} />
                      <ExportRow k="Bioavailable T" v={`${fmt(result.bioNgdl, 0)} ng/dL`} />
                    </tbody>
                  </table>
                </div>
              </div>
              <p style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                <EvidenceBadge grade="established" />
                <span>
                  The Vermeulen calculation is a validated estimate of free
                  testosterone when equilibrium dialysis isn&apos;t available.
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
