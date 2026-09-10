"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ClinicianLetterhead } from "@/components/ClinicianLetterhead";
import { EvidenceBadge } from "@/components/EvidenceBadge";

/**
 * ED / TRT treatment-cost estimator. Adds up the real stack (labs, consult,
 * medication, ancillaries) across the legitimate channels and shows where the
 * markup sits. Every default is an editable starting point drawn from public
 * 2026 U.S. cash-price listings (GoodRx / SingleCare) and the ranges in
 * /learn/what-it-costs; the reader's own quotes always win.
 *
 * Client-side only; nothing entered is stored or transmitted.
 */

type Track = "ed" | "trt";
type ConsultChannel = "insurance" | "selfpay" | "telemed";
type EdDrug = "sildenafil" | "tadalafil-prn" | "tadalafil-daily";
type EdChannel = "retail" | "coupon" | "bundled";
type TrtChannel = "retail" | "coupon" | "compounding" | "clinic";

const money = (n: number) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : "—";

/** Per-tablet cash defaults (USD). Editable in the UI. */
const ED_TAB: Record<EdDrug, Record<EdChannel, number>> = {
  sildenafil: { retail: 4, coupon: 1, bundled: 3 },
  "tadalafil-prn": { retail: 8, coupon: 2, bundled: 6 },
  "tadalafil-daily": { retail: 3, coupon: 1, bundled: 2.5 },
};
const ED_DRUG_LABEL: Record<EdDrug, string> = {
  sildenafil: "Sildenafil (generic)",
  "tadalafil-prn": "Tadalafil 20 mg, as needed",
  "tadalafil-daily": "Tadalafil 5 mg, daily",
};
const ED_CHANNEL_LABEL: Record<EdChannel, string> = {
  retail: "Pharmacy cash price",
  coupon: "Pharmacy + discount card",
  bundled: "Telehealth-bundled per dose",
};

/** Testosterone cypionate 200 mg/mL, 10 mL vial (2,000 mg). */
const VIAL_MG = 2000;
const TRT_VIAL_RETAIL = 60; // retail cash, midpoint of $38–$90 listings
const TRT_VIAL_COUPON = 45; // discount-card midpoint of $30–$60
const COMPOUNDING_DISCOUNT_DEFAULT = 15; // % under retail cash via prescriber-routed compounding
const CLINIC_BUNDLE_MONTHLY = 200; // all-in telehealth TRT membership, $150–$300
const TRT_CHANNEL_LABEL: Record<TrtChannel, string> = {
  retail: "Retail pharmacy, cash",
  coupon: "Retail + discount card",
  compounding: "Prescriber-routed compounding pharmacy",
  clinic: "Clinic bundle (all-in monthly)",
};

const CONSULT_LABEL: Record<ConsultChannel, string> = {
  insurance: "Insured visit (copay)",
  selfpay: "Self-pay urologist / clinic",
  telemed: "Telemedicine subscription",
};

type Line = { k: string; annual: number; note?: string };

function NumField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = "any",
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="sos-label" htmlFor={id}>
        {label}
        {hint ? <span style={{ color: "var(--sos-text-lo)" }}> · {hint}</span> : null}
      </label>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {prefix ? (
          <span className="sos-label" style={{ margin: 0, flex: "none" }}>
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          className="sos-field"
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix ? (
          <span className="sos-label" style={{ margin: 0, whiteSpace: "nowrap", flex: "none" }}>
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { v: T; l: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="sos-label">{label}</p>
      <div className="sos-seg" role="group" aria-label={label} style={{ flexWrap: "wrap" }}>
        {options.map((o) => (
          <button key={o.v} type="button" aria-pressed={value === o.v} onClick={() => onChange(o.v)}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExportRow({ k, v }: { k: string; v: string }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--sos-line)" }}>
      <td style={{ padding: "6px 0", color: "var(--sos-text-lo)" }}>{k}</td>
      <td style={{ padding: "6px 0", textAlign: "right", fontWeight: 700, color: "var(--sos-text-hi)" }}>{v}</td>
    </tr>
  );
}

/** Stacked annual-cost bar: where the money actually goes. */
function StackBar({ lines, total }: { lines: Line[]; total: number }) {
  const colors = ["var(--sos-copper)", "var(--sos-text-md)", "var(--sos-text-lo)", "var(--sos-line)"];
  const W = 600;
  const placed = lines.reduce<(Line & { w: number; x: number })[]>((acc, l) => {
    const w = total > 0 ? (l.annual / total) * W : 0;
    const x = acc.length ? acc[acc.length - 1].x + acc[acc.length - 1].w : 0;
    return [...acc, { ...l, w, x }];
  }, []);
  return (
    <svg viewBox={`0 0 ${W} 56`} width="100%" height="56" role="img" aria-label="Share of annual cost by line item">
      {placed.map((s, i) => (
        <rect key={s.k} x={s.x} y={8} width={Math.max(s.w, 0)} height={22} fill={colors[i % colors.length]} />
      ))}
      {placed.map((s) =>
        s.w < 60 ? null : (
          <text
            key={s.k}
            x={s.x + s.w / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--sos-mono)"
            fill="var(--sos-text-md)"
          >
            {s.k} {Math.round((s.annual / total) * 100)}%
          </text>
        ),
      )}
    </svg>
  );
}

const num = (s: string, d = 0) => {
  const v = parseFloat(s);
  return Number.isFinite(v) && v >= 0 ? v : d;
};

export function TreatmentCostCalc() {
  const [track, setTrack] = useState<Track>("ed");

  // Shared: labs + consult
  const [labCost, setLabCost] = useState("150");
  const [labsPerYear, setLabsPerYear] = useState("2");
  const [consult, setConsult] = useState<ConsultChannel>("selfpay");
  const [consultCost, setConsultCost] = useState("200");
  const [consultsPerYear, setConsultsPerYear] = useState("2");
  const [telemedMonthly, setTelemedMonthly] = useState("30");

  // ED
  const [drug, setDrug] = useState<EdDrug>("sildenafil");
  const [edChannel, setEdChannel] = useState<EdChannel>("coupon");
  const [dosesPerMonth, setDosesPerMonth] = useState("8");
  const [tabOverride, setTabOverride] = useState("");

  // TRT
  const [weeklyMg, setWeeklyMg] = useState("120");
  const [trtChannel, setTrtChannel] = useState<TrtChannel>("compounding");
  const [vialRetail, setVialRetail] = useState(String(TRT_VIAL_RETAIL));
  const [compDiscount, setCompDiscount] = useState(String(COMPOUNDING_DISCOUNT_DEFAULT));
  const [clinicMonthly, setClinicMonthly] = useState(String(CLINIC_BUNDLE_MONTHLY));
  const [hcg, setHcg] = useState(false);
  const [hcgMonthly, setHcgMonthly] = useState("120");
  const [ai, setAi] = useState(false);
  const [aiMonthly, setAiMonthly] = useState("12");
  const [supplies, setSupplies] = useState(true);
  const [suppliesMonthly, setSuppliesMonthly] = useState("10");

  const [shown, setShown] = useState(false);
  const [stamp, setStamp] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const calc = useMemo(() => {
    const lines: Line[] = [];
    lines.push({ k: "Labs", annual: num(labCost) * num(labsPerYear) });

    const consultAnnual =
      consult === "telemed" ? num(telemedMonthly) * 12 : num(consultCost) * num(consultsPerYear);
    lines.push({ k: "Consult", annual: consultAnnual, note: CONSULT_LABEL[consult] });

    let retailComparison: number | null = null;

    if (track === "ed") {
      const perTab = tabOverride.trim() === "" ? ED_TAB[drug][edChannel] : num(tabOverride);
      lines.push({
        k: "Medication",
        annual: perTab * num(dosesPerMonth) * 12,
        note: `${ED_DRUG_LABEL[drug]} · ${ED_CHANNEL_LABEL[edChannel]} · ${money(perTab)}/tab`,
      });
    } else {
      const vialsPerYear = (num(weeklyMg) * 52) / VIAL_MG;
      const retail = num(vialRetail, TRT_VIAL_RETAIL);
      retailComparison = vialsPerYear * retail;
      let vialPrice = retail;
      if (trtChannel === "coupon") vialPrice = retail * (TRT_VIAL_COUPON / TRT_VIAL_RETAIL);
      if (trtChannel === "compounding") vialPrice = retail * (1 - num(compDiscount) / 100);
      if (trtChannel === "clinic") {
        lines.push({
          k: "Testosterone",
          annual: num(clinicMonthly) * 12,
          note: `${TRT_CHANNEL_LABEL.clinic} · ${money(num(clinicMonthly))}/mo, medication + monitoring bundled`,
        });
      } else {
        lines.push({
          k: "Testosterone",
          annual: vialsPerYear * vialPrice,
          note: `${TRT_CHANNEL_LABEL[trtChannel]} · ${vialsPerYear.toFixed(1)} vials/yr at ${money(vialPrice)}`,
        });
      }
      const anc =
        (hcg ? num(hcgMonthly) : 0) + (ai ? num(aiMonthly) : 0) + (supplies ? num(suppliesMonthly) : 0);
      if (anc > 0) lines.push({ k: "Ancillaries", annual: anc * 12 });
    }

    const total = lines.reduce((s, l) => s + l.annual, 0);
    return { lines, total, retailComparison };
  }, [
    track, labCost, labsPerYear, consult, consultCost, consultsPerYear, telemedMonthly,
    drug, edChannel, dosesPerMonth, tabOverride,
    weeklyMg, trtChannel, vialRetail, compDiscount, clinicMonthly,
    hcg, hcgMonthly, ai, aiMonthly, supplies, suppliesMonthly,
  ]);

  function estimate() {
    setShown(true);
    setStamp(new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  const medLine = calc.lines.find((l) => l.k === "Testosterone");
  const savings =
    track === "trt" && calc.retailComparison !== null && medLine ? calc.retailComparison - medLine.annual : 0;

  const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" } as const;

  const ancillaries = [
    { id: "hcg", on: hcg, set: setHcg, v: hcgMonthly, setV: setHcgMonthly, l: "hCG (fertility / testicular volume)", hint: "compounded, ~$80–$150/mo" },
    { id: "ai", on: ai, set: setAi, v: aiMonthly, setV: setAiMonthly, l: "Anastrozole (only if estradiol actually needs it)", hint: "generic, ~$10–$20/mo" },
    { id: "supplies", on: supplies, set: setSupplies, v: suppliesMonthly, setV: setSuppliesMonthly, l: "Syringes, needles, swabs", hint: "~$5–$15/mo" },
  ];

  return (
    <div>
      <p className="sos-note" style={{ marginBottom: "24px" }}>
        Every number below is a starting point you can overwrite with your own quote.
        Defaults come from public 2026 U.S. cash-price listings and the ranges in{" "}
        <Link href="/learn/what-it-costs">what it costs</Link>. Everything runs in your
        browser; nothing you enter is saved or sent.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          estimate();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "22px" }}
      >
        <Seg<Track>
          label="What are you costing out?"
          value={track}
          onChange={(v) => {
            setTrack(v);
            setShown(false);
          }}
          options={[
            { v: "ed", l: "ED medication" },
            { v: "trt", l: "Testosterone therapy" },
          ]}
        />

        <fieldset className="sos-fieldset">
          <legend className="sos-kicker">Labs</legend>
          <div style={grid2}>
            <NumField id="labCost" label="Panel cost" value={labCost} onChange={setLabCost} prefix="$" hint="androgen panel ~$75–$250" />
            <NumField id="labsPerYear" label="Panels per year" value={labsPerYear} onChange={setLabsPerYear} step="1" />
          </div>
        </fieldset>

        <fieldset className="sos-fieldset">
          <legend className="sos-kicker">Consult</legend>
          <Seg<ConsultChannel>
            label="Channel"
            value={consult}
            onChange={setConsult}
            options={[
              { v: "selfpay", l: "Self-pay visit" },
              { v: "insurance", l: "Insured copay" },
              { v: "telemed", l: "Telemed subscription" },
            ]}
          />
          {consult === "telemed" ? (
            <div style={{ marginTop: "14px" }}>
              <NumField id="telemedMonthly" label="Subscription" value={telemedMonthly} onChange={setTelemedMonthly} prefix="$" suffix="/ month" hint="$20–$133" />
            </div>
          ) : (
            <div style={{ ...grid2, marginTop: "14px" }}>
              <NumField
                id="consultCost"
                label={consult === "insurance" ? "Copay per visit" : "Cost per visit"}
                value={consultCost}
                onChange={setConsultCost}
                prefix="$"
                hint={consult === "insurance" ? "$0–$150" : "$150–$350"}
              />
              <NumField id="consultsPerYear" label="Visits per year" value={consultsPerYear} onChange={setConsultsPerYear} step="1" />
            </div>
          )}
        </fieldset>

        {track === "ed" ? (
          <fieldset className="sos-fieldset">
            <legend className="sos-kicker">Medication</legend>
            <Seg<EdDrug>
              label="Drug"
              value={drug}
              onChange={(v) => {
                setDrug(v);
                setTabOverride("");
                if (v === "tadalafil-daily") setDosesPerMonth("30");
              }}
              options={[
                { v: "sildenafil", l: "Sildenafil" },
                { v: "tadalafil-prn", l: "Tadalafil 20 mg PRN" },
                { v: "tadalafil-daily", l: "Tadalafil 5 mg daily" },
              ]}
            />
            <div style={{ marginTop: "14px" }}>
              <Seg<EdChannel>
                label="Where you fill it"
                value={edChannel}
                onChange={(v) => {
                  setEdChannel(v);
                  setTabOverride("");
                }}
                options={[
                  { v: "coupon", l: "Pharmacy + discount card" },
                  { v: "retail", l: "Pharmacy cash" },
                  { v: "bundled", l: "Telehealth-bundled" },
                ]}
              />
            </div>
            <div style={{ ...grid2, marginTop: "14px" }}>
              <NumField
                id="tab"
                label="Price per tablet"
                value={tabOverride === "" ? String(ED_TAB[drug][edChannel]) : tabOverride}
                onChange={setTabOverride}
                prefix="$"
                hint="default shown; overwrite with your quote"
              />
              <NumField id="doses" label="Doses per month" value={dosesPerMonth} onChange={setDosesPerMonth} step="1" />
            </div>
          </fieldset>
        ) : (
          <>
            <fieldset className="sos-fieldset">
              <legend className="sos-kicker">Testosterone cypionate</legend>
              <div style={grid2}>
                <NumField id="weeklyMg" label="Weekly dose" value={weeklyMg} onChange={setWeeklyMg} suffix="mg" hint="typical 100–200" />
                <NumField id="vialRetail" label="Retail cash, 10 mL vial" value={vialRetail} onChange={setVialRetail} prefix="$" hint="200 mg/mL · $38–$90" />
              </div>
              <div style={{ marginTop: "14px" }}>
                <Seg<TrtChannel>
                  label="Channel"
                  value={trtChannel}
                  onChange={setTrtChannel}
                  options={[
                    { v: "compounding", l: "Prescriber → compounding pharmacy" },
                    { v: "coupon", l: "Retail + discount card" },
                    { v: "retail", l: "Retail cash" },
                    { v: "clinic", l: "Clinic bundle" },
                  ]}
                />
              </div>
              {trtChannel === "compounding" && (
                <div style={{ marginTop: "14px" }}>
                  <NumField
                    id="compDiscount"
                    label="Discount vs retail cash"
                    value={compDiscount}
                    onChange={setCompDiscount}
                    suffix="%"
                    step="1"
                    hint="prescriber-routed compounding typically lands 10–20% under cash pay"
                  />
                </div>
              )}
              {trtChannel === "clinic" && (
                <div style={{ marginTop: "14px" }}>
                  <NumField
                    id="clinicMonthly"
                    label="All-in membership"
                    value={clinicMonthly}
                    onChange={setClinicMonthly}
                    prefix="$"
                    suffix="/ month"
                    hint="$150–$300; usually includes labs + consults"
                  />
                </div>
              )}
            </fieldset>

            <fieldset className="sos-fieldset">
              <legend className="sos-kicker">Ancillaries</legend>
              <p className="sos-note" style={{ marginBottom: "12px" }}>
                Only what your prescriber has actually written. Toggle on to add a monthly line.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {ancillaries.map((a) => (
                  <div key={a.id} style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <label style={{ display: "flex", gap: "8px", alignItems: "center", flex: "1 1 240px", cursor: "pointer" }}>
                      <input type="checkbox" checked={a.on} onChange={(e) => a.set(e.target.checked)} />
                      <span className="sos-prose" style={{ fontSize: "15px" }}>{a.l}</span>
                    </label>
                    {a.on && (
                      <div style={{ flex: "0 1 220px" }}>
                        <NumField id={`${a.id}Monthly`} label="Monthly" value={a.v} onChange={a.setV} prefix="$" hint={a.hint} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          </>
        )}

        <div>
          <button type="submit" className="sos-btn sos-btn--primary" style={{ border: "none", cursor: "pointer" }}>
            Estimate the year
          </button>
        </div>
      </form>

      {shown && (
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
              Your estimate
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", marginBottom: "20px" }}>
              <div>
                <p className="sos-q-num" style={{ marginBottom: "6px" }}>
                  Per month
                </p>
                <p style={{ fontFamily: "var(--sos-mono)", fontSize: "34px", fontWeight: 600, color: "var(--sos-text-hi)", lineHeight: 1.05 }}>
                  {money(calc.total / 12)}
                </p>
              </div>
              <div>
                <p className="sos-q-num" style={{ marginBottom: "6px" }}>
                  Per year
                </p>
                <p style={{ fontFamily: "var(--sos-mono)", fontSize: "34px", fontWeight: 600, color: "var(--sos-text-hi)", lineHeight: 1.05 }}>
                  {money(calc.total)}
                </p>
              </div>
            </div>

            <StackBar lines={calc.lines} total={calc.total} />

            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px", margin: "14px 0 18px" }}>
              <tbody>
                {calc.lines.map((l) => (
                  <ExportRow key={l.k} k={l.note ? `${l.k} · ${l.note}` : l.k} v={`${money(l.annual)}/yr`} />
                ))}
              </tbody>
            </table>

            {track === "trt" && trtChannel === "compounding" && savings > 0 && (
              <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "14px" }}>
                <strong style={{ color: "var(--sos-copper)" }}>{money(savings)}/yr</strong>{" "}under
                retail cash for the same molecule. That is the usual size of the saving when a
                prescriber routes the script to a compounding pharmacy they work with: 10–20% off
                cash pay for testosterone cypionate, with the ancillaries and any other oil-based
                ester or blend the prescriber writes filled under the same prescription instead
                of a second pharmacy run.
              </p>
            )}
            {track === "trt" && trtChannel === "clinic" && (
              <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "14px" }}>
                The bundle usually folds labs and consults in. If yours does, zero those lines
                above to compare like with like. The convenience is real; so is the markup on
                a vial that costs the pharmacy a fraction of the membership.
              </p>
            )}
            {track === "ed" && edChannel === "bundled" && (
              <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "14px" }}>
                Same generic, priced per dose. Switch the channel to &quot;pharmacy + discount
                card&quot; to see what the tablets cost without the subscription on top.
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "22px" }}>
              <Link href="/learn/what-it-costs" className="sos-btn sos-btn--primary">
                Where the markup hides →
              </Link>
              <Link
                href={track === "trt" ? "/learn/testosterone-therapy" : "/learn/generic-pde5-value"}
                className="sos-btn sos-btn--ghost"
              >
                {track === "trt" ? "Testosterone therapy" : "Generic PDE5 value"}
              </Link>
              <Link href="/directory" className="sos-btn sos-btn--ghost">
                Find a provider
              </Link>
            </div>

            <p className="sos-note">
              An <strong style={{ color: "var(--sos-text-md)" }}>estimate</strong>{" "}built from
              public list prices and your inputs, not a quote. Prices move by pharmacy, ZIP code,
              and which generic is in stock. Cheapest is never gray-market; a licensed pharmacy
              behind the vial is part of what you are paying for.
            </p>
          </div>

          <div className="sos-clinician" style={{ marginTop: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
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
              <ClinicianLetterhead title="Treatment cost estimate" date={stamp}>
                <p style={{ marginTop: 0 }}>
                  A patient-prepared cost summary of the{" "}
                  {track === "trt" ? "testosterone therapy" : "ED medication"}{" "}plan, shared to
                  support a conversation about the most sustainable legitimate channel.
                </p>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px", margin: "18px 0" }}>
                  <tbody>
                    {calc.lines.map((l) => (
                      <ExportRow key={l.k} k={l.note ? `${l.k} · ${l.note}` : l.k} v={`${money(l.annual)}/yr`} />
                    ))}
                    <ExportRow k="Total" v={`${money(calc.total)}/yr · ${money(calc.total / 12)}/mo`} />
                  </tbody>
                </table>
                <p style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                  <EvidenceBadge grade="established" />
                  <span>
                    Costs are market estimates, not clinical evidence. Drug, dose, and channel
                    are the prescriber&apos;s decisions.
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
