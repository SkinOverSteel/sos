"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ClinicianLetterhead } from "@/components/ClinicianLetterhead";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import {
  CONFIDENCE_ANCHORS,
  FIRMNESS_ANCHORS,
  INTERVENTIONS,
  OUTCOME_LABELS,
  clearLog,
  formatDate,
  loadLog,
  newId,
  newLog,
  parseImport,
  saveLog,
  todayIso,
  weekOf,
  type CheckIn,
  type Intervention,
  type InterventionCategory,
  type Log,
  type OutcomeResult,
} from "@/lib/log";

/**
 * The Log, phase one. Everything here is local: React state mirrored to
 * localStorage, no network. See src/lib/log.ts for the model and the rules.
 *
 * Instrument voice throughout: terse labels, a factual readout, no confetti
 * and no guilt. The member's own words go in the free-text fields; we never
 * suggest a dose, a titration, or a product.
 */

const CATEGORY_ORDER: InterventionCategory[] = [
  "pde5",
  "trt",
  "injection",
  "shockwave",
  "lifestyle",
  "psych",
  "other-rx",
  "unsupervised",
];

const ghostBtn = { border: "1px solid var(--sos-line)", cursor: "pointer" } as const;

function Section({
  num,
  title,
  done,
  children,
}: {
  num: string;
  title: string;
  done?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="sos-card" style={{ marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        <p className="sos-kicker" style={{ margin: 0 }}>
          {num} · <b>{title}</b>
        </p>
        {done && (
          <span className="sos-q-num" style={{ color: "var(--sos-grade-established)" }}>
            Recorded
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label className="sos-label">{label}</label>
      {children}
      {hint && (
        <p className="sos-note" style={{ marginTop: "6px", fontSize: "13px" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function Scale({
  label,
  value,
  anchors,
  onChange,
}: {
  label: string;
  value: number;
  anchors: string[];
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <span className="sos-label">{label}</span>
      <div className="sos-seg" role="group" aria-label={label}>
        {anchors.map((a, i) => (
          <button
            key={a}
            type="button"
            aria-pressed={value === i + 1}
            title={a}
            onClick={() => onChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="sos-note" style={{ marginTop: "6px", fontSize: "13px" }}>
        {value ? `${value} · ${anchors[value - 1]}` : "1 to 5, the SHIM's own anchors."}
      </p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--sos-line)" }}>
      <td style={{ padding: "6px 0", color: "var(--sos-text-lo)", verticalAlign: "top" }}>{k}</td>
      <td
        style={{
          padding: "6px 0 6px 16px",
          textAlign: "right",
          fontWeight: 700,
          color: "var(--sos-text-hi)",
          whiteSpace: "pre-wrap",
        }}
      >
        {v}
      </td>
    </tr>
  );
}

function shimOrNull(s: string): number | null {
  if (s.trim() === "") return null;
  const n = Number(s);
  return Number.isInteger(n) && n >= 5 && n <= 25 ? n : null;
}

const noop = () => () => {};
const isClient = () => typeof window !== "undefined";

export function LogTool() {
  // Server render and the hydration pass both show the placeholder; the first
  // client render after hydration reads the browser's copy. No effect needed.
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const [log, setLog] = useState<Log | null>(() => (isClient() ? loadLog() : null));
  const [stamp] = useState(() =>
    isClient()
      ? new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : "",
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [importError, setImportError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function commit(next: Log) {
    setLog(saveLog(next));
  }

  // Drafts for the add-a-check-in form.
  const [ciDate, setCiDate] = useState("");
  const [ciFirm, setCiFirm] = useState(0);
  const [ciConf, setCiConf] = useState(0);
  const [ciSide, setCiSide] = useState("");
  const [ciNotes, setCiNotes] = useState("");

  if (!ready) {
    return (
      <p className="sos-q-num" aria-live="polite">
        Loading your log from this browser…
      </p>
    );
  }

  if (!log) {
    return (
      <div className="sos-card sos-card--deep">
        <p className="sos-kicker" style={{ marginBottom: "12px" }}>
          No log on this device
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "18px" }}>
          A log is one protocol, start to finish: where you began, what you and
          your prescriber chose, a short weekly check-in, and how it ended. It
          lives in this browser only. Nothing is sent to us.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            className="sos-btn sos-btn--primary"
            style={{ border: "none", cursor: "pointer" }}
            onClick={() => commit(newLog())}
          >
            Start a log
          </button>
          <button
            type="button"
            className="sos-btn sos-btn--ghost"
            style={ghostBtn}
            onClick={() => fileRef.current?.click()}
          >
            Restore from backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const parsed = parseImport(await f.text());
              if (parsed) {
                setImportError("");
                commit(parsed);
              } else {
                setImportError("That file isn't a Skin Over Steel log backup.");
              }
              e.target.value = "";
            }}
          />
        </div>
        {importError && (
          <p className="sos-note" style={{ marginTop: "12px", color: "var(--sos-copper)" }}>
            {importError}
          </p>
        )}
      </div>
    );
  }

  const iv = log.intervention;
  const info = iv ? INTERVENTIONS[iv.category] : null;
  const stage = log.outcome ? "Closed" : iv ? "Active" : "Baseline";
  const sorted = [...log.checkins].sort((a, b) => a.date.localeCompare(b.date));
  const canAddCheckin = Boolean(iv && ciFirm && ciConf);

  function setBaseline(patch: Partial<Log["baseline"]>) {
    commit({ ...log!, baseline: { ...log!.baseline, ...patch } });
  }

  function setIntervention(patch: Partial<Intervention>) {
    const base: Intervention = iv ?? {
      category: "pde5",
      name: "",
      regimen: "",
      prescriber: "",
      started: todayIso(),
    };
    commit({ ...log!, intervention: { ...base, ...patch } });
  }

  function addCheckin() {
    if (!canAddCheckin) return;
    const ci: CheckIn = {
      id: newId(),
      date: ciDate || todayIso(),
      firmness: ciFirm,
      confidence: ciConf,
      sideEffects: ciSide.trim(),
      notes: ciNotes.trim(),
    };
    commit({ ...log!, checkins: [...log!.checkins, ci] });
    setCiDate("");
    setCiFirm(0);
    setCiConf(0);
    setCiSide("");
    setCiNotes("");
  }

  function removeCheckin(id: string) {
    commit({ ...log!, checkins: log!.checkins.filter((c) => c.id !== id) });
  }

  function setOutcome(patch: Partial<NonNullable<Log["outcome"]>>) {
    const base = log!.outcome ?? {
      date: todayIso(),
      result: "unchanged" as OutcomeResult,
      shim: null,
      summary: "",
    };
    commit({ ...log!, outcome: { ...base, ...patch } });
  }

  function download() {
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sos-log-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* status strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "22px",
        }}
      >
        <p className="sos-q-num" style={{ margin: 0 }}>
          Stage · <span style={{ color: "var(--sos-text-hi)" }}>{stage}</span>
          {" · "}
          {log.checkins.length} check-in{log.checkins.length === 1 ? "" : "s"}
          {" · "}saved in this browser
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button type="button" className="sos-btn sos-btn--ghost" style={ghostBtn} onClick={download}>
            Download backup
          </button>
          {confirmDelete ? (
            <>
              <button
                type="button"
                className="sos-btn sos-btn--ghost"
                style={{ ...ghostBtn, color: "var(--sos-emergency)" }}
                onClick={() => {
                  clearLog();
                  setLog(null);
                  setConfirmDelete(false);
                }}
              >
                Yes, delete it
              </button>
              <button
                type="button"
                className="sos-btn sos-btn--ghost"
                style={ghostBtn}
                onClick={() => setConfirmDelete(false)}
              >
                Keep it
              </button>
            </>
          ) : (
            <button
              type="button"
              className="sos-btn sos-btn--ghost"
              style={ghostBtn}
              onClick={() => setConfirmDelete(true)}
            >
              Delete log
            </button>
          )}
        </div>
      </div>

      {/* 1 · baseline */}
      <Section num="1" title="Baseline" done={Boolean(log.baseline.notes || log.baseline.shim)}>
        <p className="sos-note" style={{ marginBottom: "16px" }}>
          Where you started, before anything changed. A number beats an
          adjective: take{" "}
          <Link href="/tools/erectile-function-score">the self-check</Link> and
          record the score.
        </p>
        <div style={{ display: "grid", gap: "0 16px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <Field label="Date">
            <input
              className="sos-field"
              type="date"
              value={log.baseline.date}
              onChange={(e) => setBaseline({ date: e.target.value })}
            />
          </Field>
          <Field label="SHIM score (5–25)" hint="Leave blank if you haven't taken it.">
            <input
              className="sos-field"
              type="number"
              min={5}
              max={25}
              inputMode="numeric"
              value={log.baseline.shim ?? ""}
              onChange={(e) => setBaseline({ shim: shimOrNull(e.target.value) })}
            />
          </Field>
        </div>
        <Field
          label="Notes"
          hint="Labs you already have, how long this has been going on, what you've tried. Your words; this goes on the clinician page."
        >
          <textarea
            className="sos-field"
            rows={4}
            value={log.baseline.notes}
            onChange={(e) => setBaseline({ notes: e.target.value })}
          />
        </Field>
      </Section>

      {/* 2 · intervention */}
      <Section num="2" title="Intervention" done={Boolean(iv?.name)}>
        <p className="sos-note" style={{ marginBottom: "16px" }}>
          What you and your prescriber chose. Record the regimen exactly as it
          was written for you. The Log never suggests one.
        </p>
        <Field label="Category">
          <select
            className="sos-field"
            value={iv?.category ?? ""}
            onChange={(e) => setIntervention({ category: e.target.value as InterventionCategory })}
          >
            <option value="" disabled>
              Choose one
            </option>
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>
                {INTERVENTIONS[c].label}
              </option>
            ))}
          </select>
        </Field>

        {info && (
          <div
            className="sos-card sos-card--deep"
            style={{
              marginBottom: "18px",
              borderLeft: `3px solid ${
                info.grade === "high-risk" ? "var(--sos-emergency)" : "var(--sos-copper)"
              }`,
            }}
          >
            <p style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 8px" }}>
              <EvidenceBadge grade={info.grade} />
              <span className="sos-q-num">evidence for this category</span>
            </p>
            <p className="sos-note" style={{ marginBottom: "8px" }}>
              {info.note} <Link href={info.learn}>Read the article.</Link>
            </p>
            {iv?.category === "injection" && (
              <p className="sos-note" style={{ color: "var(--sos-text-md)" }}>
                An erection lasting more than four hours is an emergency. Keep{" "}
                <Link href="/support">the priapism clock</Link> where you can
                find it.
              </p>
            )}
            {iv?.category === "unsupervised" && (
              <p className="sos-note" style={{ color: "var(--sos-text-md)" }}>
                Logging this honestly is the right move, and so is telling a
                clinician. <Link href="/learn/product-forms">Know what you&apos;re
                holding</Link>, and if anything goes wrong,{" "}
                <Link href="/support">get support now</Link>.
              </p>
            )}
          </div>
        )}

        {iv && (
          <>
            <div style={{ display: "grid", gap: "0 16px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <Field label="Name" hint="As your prescriber named it.">
                <input
                  className="sos-field"
                  type="text"
                  value={iv.name}
                  onChange={(e) => setIntervention({ name: e.target.value })}
                />
              </Field>
              <Field label="Started">
                <input
                  className="sos-field"
                  type="date"
                  value={iv.started}
                  onChange={(e) => setIntervention({ started: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Regimen" hint="Dose and schedule exactly as written on your prescription or handout.">
              <input
                className="sos-field"
                type="text"
                value={iv.regimen}
                onChange={(e) => setIntervention({ regimen: e.target.value })}
              />
            </Field>
            <Field
              label="Prescriber / clinic"
              hint={
                iv.category === "unsupervised"
                  ? "None, by definition. Leave blank."
                  : "Who prescribes and monitors it. Name or clinic is enough."
              }
            >
              <input
                className="sos-field"
                type="text"
                value={iv.prescriber}
                onChange={(e) => setIntervention({ prescriber: e.target.value })}
              />
            </Field>
          </>
        )}
      </Section>

      {/* 3 · weekly check-ins */}
      <Section num="3" title="Weekly check-in" done={log.checkins.length > 0}>
        {!iv ? (
          <p className="sos-note">Record the intervention first.</p>
        ) : (
          <>
            <p className="sos-note" style={{ marginBottom: "16px" }}>
              Two SHIM items and a line about side effects. Once a week is
              enough; the pattern is what your clinician reads.
            </p>
            <Field label="Date" hint="Blank means today.">
              <input
                className="sos-field"
                type="date"
                value={ciDate}
                onChange={(e) => setCiDate(e.target.value)}
              />
            </Field>
            <Scale
              label="Hard enough for penetration"
              value={ciFirm}
              anchors={FIRMNESS_ANCHORS}
              onChange={setCiFirm}
            />
            <Scale
              label="Confidence"
              value={ciConf}
              anchors={CONFIDENCE_ANCHORS}
              onChange={setCiConf}
            />
            <Field label="Side effects / warning signs" hint="Headache, flushing, pain, anything prolonged. Blank is a valid answer.">
              <input
                className="sos-field"
                type="text"
                value={ciSide}
                onChange={(e) => setCiSide(e.target.value)}
              />
            </Field>
            <Field label="Notes">
              <textarea
                className="sos-field"
                rows={2}
                value={ciNotes}
                onChange={(e) => setCiNotes(e.target.value)}
              />
            </Field>
            <button
              type="button"
              className="sos-btn sos-btn--primary"
              disabled={!canAddCheckin}
              onClick={addCheckin}
              style={{
                border: "none",
                cursor: canAddCheckin ? "pointer" : "not-allowed",
                opacity: canAddCheckin ? 1 : 0.45,
              }}
            >
              Add check-in
            </button>

            {sorted.length > 0 && (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontFamily: "var(--sos-mono)",
                  fontSize: "13px",
                  marginTop: "24px",
                }}
              >
                <thead>
                  <tr style={{ color: "var(--sos-text-lo)", textAlign: "left" }}>
                    <th style={{ padding: "6px 0", fontWeight: 500 }}>Wk</th>
                    <th style={{ padding: "6px 0", fontWeight: 500 }}>Date</th>
                    <th style={{ padding: "6px 0", fontWeight: 500 }}>Firm</th>
                    <th style={{ padding: "6px 0", fontWeight: 500 }}>Conf</th>
                    <th style={{ padding: "6px 0", fontWeight: 500 }}>Side effects</th>
                    <th aria-label="Remove" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => (
                    <tr key={c.id} style={{ borderTop: "1px solid var(--sos-line)", color: "var(--sos-text-md)" }}>
                      <td style={{ padding: "8px 8px 8px 0" }}>{weekOf(log, c.date)}</td>
                      <td style={{ padding: "8px 8px 8px 0" }}>{formatDate(c.date)}</td>
                      <td style={{ padding: "8px 8px 8px 0", color: "var(--sos-text-hi)" }}>{c.firmness}</td>
                      <td style={{ padding: "8px 8px 8px 0", color: "var(--sos-text-hi)" }}>{c.confidence}</td>
                      <td style={{ padding: "8px 8px 8px 0" }}>{c.sideEffects || "—"}</td>
                      <td style={{ padding: "8px 0", textAlign: "right" }}>
                        <button
                          type="button"
                          onClick={() => removeCheckin(c.id)}
                          aria-label={`Remove check-in from ${formatDate(c.date)}`}
                          style={{
                            background: "none",
                            border: 0,
                            color: "var(--sos-text-lo)",
                            cursor: "pointer",
                            fontFamily: "var(--sos-mono)",
                            fontSize: "12px",
                          }}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Section>

      {/* 4 · outcome */}
      <Section num="4" title="Outcome" done={Boolean(log.outcome)}>
        {!iv ? (
          <p className="sos-note">Record the intervention first.</p>
        ) : (
          <>
            <p className="sos-note" style={{ marginBottom: "16px" }}>
              Close the log when the trial ends, whichever way it went. A
              &quot;stopped early&quot; with the reason is as useful to a
              clinician as a win.
            </p>
            {!log.outcome ? (
              <button
                type="button"
                className="sos-btn sos-btn--ghost"
                style={ghostBtn}
                onClick={() => setOutcome({})}
              >
                Close this log
              </button>
            ) : (
              <>
                <div style={{ display: "grid", gap: "0 16px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                  <Field label="Date">
                    <input
                      className="sos-field"
                      type="date"
                      value={log.outcome.date}
                      onChange={(e) => setOutcome({ date: e.target.value })}
                    />
                  </Field>
                  <Field label="Result">
                    <select
                      className="sos-field"
                      value={log.outcome.result}
                      onChange={(e) => setOutcome({ result: e.target.value as OutcomeResult })}
                    >
                      {(Object.keys(OUTCOME_LABELS) as OutcomeResult[]).map((r) => (
                        <option key={r} value={r}>
                          {OUTCOME_LABELS[r]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="SHIM score now (5–25)" hint="Re-take the self-check for a before/after.">
                    <input
                      className="sos-field"
                      type="number"
                      min={5}
                      max={25}
                      inputMode="numeric"
                      value={log.outcome.shim ?? ""}
                      onChange={(e) => setOutcome({ shim: shimOrNull(e.target.value) })}
                    />
                  </Field>
                </div>
                <Field label="Summary" hint="What happened, and what you'd want your clinician to know.">
                  <textarea
                    className="sos-field"
                    rows={3}
                    value={log.outcome.summary}
                    onChange={(e) => setOutcome({ summary: e.target.value })}
                  />
                </Field>
                <button
                  type="button"
                  className="sos-btn sos-btn--ghost"
                  style={ghostBtn}
                  onClick={() => commit({ ...log, outcome: null })}
                >
                  Reopen the log
                </button>
              </>
            )}
          </>
        )}
      </Section>

      {/* clinician export */}
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
            style={ghostBtn}
          >
            Print / save as PDF
          </button>
        </div>

        <div className="sos-clinician-print">
          <ClinicianLetterhead title="Protocol log summary" date={stamp}>
            <p style={{ marginTop: 0 }}>
              A patient-kept record of one supervised trial: baseline, the
              prescribed intervention, weekly self-ratings on two IIEF-5 items,
              and outcome. Prepared to inform a conversation, not to replace
              one.
            </p>

            <p className="sos-letterhead__legend-title" style={{ margin: "16px 0 8px" }}>
              Baseline · {formatDate(log.baseline.date)}
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
              <tbody>
                <Row k="IIEF-5 / SHIM" v={log.baseline.shim != null ? `${log.baseline.shim} / 25` : "not taken"} />
                {log.baseline.notes && <Row k="Notes" v={log.baseline.notes} />}
              </tbody>
            </table>

            <p className="sos-letterhead__legend-title" style={{ margin: "16px 0 8px" }}>
              Intervention{iv ? ` · started ${formatDate(iv.started)}` : ""}
            </p>
            {iv && info ? (
              <>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
                  <tbody>
                    <Row k="Category" v={info.label} />
                    <Row k="Name" v={iv.name || "—"} />
                    <Row k="Regimen (as prescribed)" v={iv.regimen || "—"} />
                    <Row k="Prescriber" v={iv.prescriber || (iv.category === "unsupervised" ? "none (unsupervised)" : "—")} />
                  </tbody>
                </table>
                <p style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0 0", flexWrap: "wrap" }}>
                  <EvidenceBadge grade={info.grade} />
                  <span>Evidence for this category as a whole. {info.note}</span>
                </p>
              </>
            ) : (
              <p style={{ margin: 0 }}>Not yet recorded.</p>
            )}

            <p className="sos-letterhead__legend-title" style={{ margin: "16px 0 8px" }}>
              Weekly check-ins ({sorted.length})
            </p>
            {sorted.length ? (
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "12px" }}>
                <thead>
                  <tr style={{ color: "var(--sos-text-lo)", textAlign: "left" }}>
                    <th style={{ padding: "4px 0", fontWeight: 500 }}>Wk</th>
                    <th style={{ padding: "4px 0", fontWeight: 500 }}>Date</th>
                    <th style={{ padding: "4px 0", fontWeight: 500 }}>Firmness</th>
                    <th style={{ padding: "4px 0", fontWeight: 500 }}>Confidence</th>
                    <th style={{ padding: "4px 0", fontWeight: 500 }}>Side effects / notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c) => (
                    <tr key={c.id} style={{ borderTop: "1px solid var(--sos-line)" }}>
                      <td style={{ padding: "5px 8px 5px 0" }}>{weekOf(log, c.date)}</td>
                      <td style={{ padding: "5px 8px 5px 0" }}>{formatDate(c.date)}</td>
                      <td style={{ padding: "5px 8px 5px 0" }}>{c.firmness} / 5</td>
                      <td style={{ padding: "5px 8px 5px 0" }}>{c.confidence} / 5</td>
                      <td style={{ padding: "5px 0" }}>{[c.sideEffects, c.notes].filter(Boolean).join(" · ") || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ margin: 0 }}>None yet.</p>
            )}

            <p className="sos-letterhead__legend-title" style={{ margin: "16px 0 8px" }}>
              Outcome{log.outcome ? ` · ${formatDate(log.outcome.date)}` : ""}
            </p>
            {log.outcome ? (
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--sos-mono)", fontSize: "13px" }}>
                <tbody>
                  <Row k="Result" v={OUTCOME_LABELS[log.outcome.result]} />
                  <Row
                    k="IIEF-5 / SHIM, before → after"
                    v={`${log.baseline.shim ?? "—"} → ${log.outcome.shim ?? "—"}`}
                  />
                  {log.outcome.summary && <Row k="Summary" v={log.outcome.summary} />}
                </tbody>
              </table>
            ) : (
              <p style={{ margin: 0 }}>Trial still in progress.</p>
            )}

            <p style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
              <EvidenceBadge grade="anecdote" />
              <span>
                This log is one person&apos;s experience (n=1). It is a signal
                to discuss, not evidence that the intervention works.
              </span>
            </p>
          </ClinicianLetterhead>
        </div>
      </div>
    </div>
  );
}
