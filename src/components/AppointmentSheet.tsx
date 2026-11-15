"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ClinicianLetterhead } from "@/components/ClinicianLetterhead";

/**
 * The appointment sheet: the raw material a clinician needs, on one printed
 * page. It is a form and a printout and nothing else: state lives in memory
 * only (no storage, no network), so closing the tab discards it. That is
 * deliberate; this is the tool most likely to be filled in on a shared
 * computer the night before a visit.
 *
 * It records the member's own history and questions. It never suggests a
 * test, a drug or a dose.
 */
const ONSET = ["Sudden", "Gradual", "Not sure"] as const;
const MORNING = ["Still there", "Fewer than before", "Gone", "Not sure"] as const;

const LABS = [
  "Total testosterone",
  "SHBG",
  "LH and FSH",
  "Prolactin",
  "Estradiol",
  "HbA1c or fasting glucose",
  "Lipid panel",
  "Hematocrit (CBC)",
  "PSA",
] as const;

const QUESTIONS = [
  "What do you think is causing this, and what is the working diagnosis?",
  "Which tests are you ordering, and what would each result change?",
  "What will each test or treatment cost me, before it happens?",
  "Can I have copies of my results, with the values and reference ranges?",
  "If this treatment doesn't work, what is the next step?",
  "What should make me call you, and what should send me to the ER?",
] as const;

function toggle(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function AppointmentSheet() {
  const uid = useId();
  const [situation, setSituation] = useState("");
  const [started, setStarted] = useState("");
  const [onset, setOnset] = useState("");
  const [morning, setMorning] = useState("");
  const [shim, setShim] = useState("");
  const [taking, setTaking] = useState("");
  const [labs, setLabs] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [ownQuestions, setOwnQuestions] = useState("");

  const shimNum = Number(shim);
  const shimValid = shim !== "" && Number.isInteger(shimNum) && shimNum >= 5 && shimNum <= 25;
  const stamp = new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const own = ownQuestions.split("\n").map((q) => q.trim()).filter(Boolean);
  const allQuestions = [...QUESTIONS.filter((q) => questions.includes(q)), ...own];
  const empty =
    !situation && !started && !onset && !morning && !shimValid && !taking && labs.length === 0 && allQuestions.length === 0;

  return (
    <div className="sos-print-keep">
      <div className="sos-print-drop">
      <section className="sos-card" style={{ marginBottom: "18px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>1 · What is happening</h2>
        <label className="sos-label" htmlFor={`${uid}-sit`}>In your words</label>
        <textarea
          id={`${uid}-sit`}
          className="sos-field"
          rows={4}
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          aria-describedby={`${uid}-sit-hint`}
        />
        <p id={`${uid}-sit-hint`} className="sos-note" style={{ margin: "6px 0 16px", fontSize: "13px" }}>
          Which situations fail and which don&apos;t, and what has changed.
        </p>
        <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <div>
            <label className="sos-label" htmlFor={`${uid}-start`}>When it started</label>
            <input
              id={`${uid}-start`}
              className="sos-field"
              type="text"
              placeholder="e.g. about a year ago"
              value={started}
              onChange={(e) => setStarted(e.target.value)}
            />
          </div>
          <div>
            <label className="sos-label" htmlFor={`${uid}-onset`}>How it started</label>
            <select id={`${uid}-onset`} className="sos-field" value={onset} onChange={(e) => setOnset(e.target.value)}>
              <option value="">Choose one</option>
              {ONSET.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="sos-label" htmlFor={`${uid}-am`}>Morning erections</label>
            <select id={`${uid}-am`} className="sos-field" value={morning} onChange={(e) => setMorning(e.target.value)}>
              <option value="">Choose one</option>
              {MORNING.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="sos-card" style={{ marginBottom: "18px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>2 · Your score</h2>
        <label className="sos-label" htmlFor={`${uid}-shim`}>SHIM (IIEF-5) total · optional</label>
        <input
          id={`${uid}-shim`}
          className="sos-field"
          style={{ maxWidth: "160px" }}
          type="number"
          inputMode="numeric"
          min={5}
          max={25}
          step={1}
          placeholder="5 to 25"
          value={shim}
          onChange={(e) => setShim(e.target.value)}
          aria-describedby={`${uid}-shim-hint`}
        />
        <p id={`${uid}-shim-hint`} className="sos-note" style={{ marginTop: "6px", fontSize: "13px" }}>
          Don&apos;t have one? <Link href="/tools/erectile-function-score">Take the two-minute self-check</Link>{" "}
          in another tab, then come back.
        </p>
      </section>

      <section className="sos-card" style={{ marginBottom: "18px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>3 · Everything you take</h2>
        <label className="sos-label" htmlFor={`${uid}-take`}>Medications, supplements, anything else</label>
        <textarea
          id={`${uid}-take`}
          className="sos-field"
          rows={4}
          value={taking}
          onChange={(e) => setTaking(e.target.value)}
          aria-describedby={`${uid}-take-hint`}
        />
        <p id={`${uid}-take-hint`} className="sos-note" style={{ marginTop: "6px", fontSize: "13px" }}>
          What, how much, how often, exactly as it is. Include anything that was not prescribed. This is
          history-taking, not a confession: your clinician can only work with what they know.
        </p>
      </section>

      <section className="sos-card" style={{ marginBottom: "18px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>4 · Labs you are bringing</h2>
        <p className="sos-note" style={{ marginBottom: "14px", fontSize: "13px" }}>
          Tick the results you have and bring the report itself.{" "}
          <Link href="/labs">The lab checklists</Link> say what each is for.
        </p>
        <div className="sos-sheet__checks">
          {LABS.map((l) => (
            <label key={l} className="sos-sheet__check">
              <input type="checkbox" checked={labs.includes(l)} onChange={() => setLabs((v) => toggle(v, l))} />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="sos-card" style={{ marginBottom: "18px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "14px" }}>5 · Questions to ask</h2>
        <div className="sos-sheet__checks sos-sheet__checks--wide">
          {QUESTIONS.map((q) => (
            <label key={q} className="sos-sheet__check">
              <input
                type="checkbox"
                checked={questions.includes(q)}
                onChange={() => setQuestions((v) => toggle(v, q))}
              />
              <span>{q}</span>
            </label>
          ))}
        </div>
        <label className="sos-label" htmlFor={`${uid}-own`} style={{ marginTop: "18px" }}>
          Your own, one per line
        </label>
        <textarea
          id={`${uid}-own`}
          className="sos-field"
          rows={3}
          value={ownQuestions}
          onChange={(e) => setOwnQuestions(e.target.value)}
        />
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", margin: "28px 0 14px" }}>
        <button
          type="button"
          className="sos-btn sos-btn--primary"
          onClick={() => window.print()}
          disabled={empty}
          style={{ border: 0, cursor: empty ? "not-allowed" : "pointer", opacity: empty ? 0.5 : 1 }}
        >
          Print / save as PDF
        </button>
        <span className="sos-note">
          {empty ? "Fill in at least one section first." : "Nothing is saved. Print it before you close this tab."}
        </span>
      </div>
      </div>

      <div className="sos-clinician-print">
        <ClinicianLetterhead title="Appointment sheet" date={stamp} legend={false}>
          <p style={{ marginTop: 0 }}>
            Written by the patient before the visit, to make the history quicker to take.
          </p>
          <dl className="sos-sheet__out">
            <div>
              <dt>What is happening</dt>
              <dd>{situation || "—"}</dd>
            </div>
            <div>
              <dt>Onset</dt>
              <dd>{[started, onset && `${onset} onset`].filter(Boolean).join(" · ") || "—"}</dd>
            </div>
            <div>
              <dt>Morning erections</dt>
              <dd>{morning || "—"}</dd>
            </div>
            <div>
              <dt>SHIM (IIEF-5) total</dt>
              <dd>{shimValid ? `${shimNum} of 25, self-scored` : "—"}</dd>
            </div>
            <div>
              <dt>Currently taking</dt>
              <dd>{taking || "—"}</dd>
            </div>
            <div>
              <dt>Lab results brought</dt>
              <dd>{labs.length ? LABS.filter((l) => labs.includes(l)).join(", ") : "—"}</dd>
            </div>
            <div>
              <dt>Questions</dt>
              <dd>
                {allQuestions.length ? (
                  <ol>
                    {allQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ol>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </ClinicianLetterhead>
      </div>
    </div>
  );
}
