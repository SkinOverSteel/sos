"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  clearPacket,
  ClinicianPrepPacket,
  createEmptyPacket,
  getSeededQuestions,
  getSmartPrompts,
  loadPacket,
  LogSummary,
  packetToPlainText,
  readLogSummary,
  subscribePacket,
  updatePacket,
} from "@/lib/prep-packet";

export function PrepPacketView() {
  const [packet, setPacket] = useState<ClinicianPrepPacket>(createEmptyPacket);
  const [logSummary, setLogSummary] = useState<LogSummary | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    setPacket(loadPacket());
    setLogSummary(readLogSummary());
    setMounted(true);
    return subscribePacket((next) => setPacket(next));
  }, []);

  const prompts = useMemo(() => getSmartPrompts(packet), [packet]);

  const effectiveQuestions = useMemo(() => {
    if (packet.questions.length > 0) return packet.questions;
    return getSeededQuestions(packet);
  }, [packet]);

  const completion = [
    {
      label: "Symptom Baseline (IIEF-5)",
      done: Boolean(packet.symptomBaseline),
      href: "/tools/erectile-function-score",
    },
    {
      label: "Lab Snapshot",
      done: Boolean(packet.labSnapshot),
      href: "/tools/free-testosterone",
    },
    {
      label: "Medications & History",
      done: Boolean(
        packet.medicationsHistory?.whatChanged ||
          packet.medicationsHistory?.currentMeds
      ),
    },
    {
      label: "Questions for Clinician",
      done: effectiveQuestions.length > 0,
    },
  ];

  function handleClearAll() {
    clearPacket();
    setPacket(createEmptyPacket());
  }

  async function handleCopyPlainText() {
    const text = packetToPlainText(
      { ...packet, questions: effectiveQuestions },
      logSummary
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  }

  function handleExportJson() {
    const blob = new Blob(
      [JSON.stringify({ ...packet, questions: effectiveQuestions }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sos-clinician-prep-packet-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newQuestion.trim();
    if (!trimmed) return;
    const base =
      packet.questions.length > 0 ? packet.questions : effectiveQuestions;
    updatePacket((prev) => ({
      ...prev,
      questions: [
        ...base,
        { id: `q-${Date.now()}`, text: trimmed },
      ],
    }));
    setNewQuestion("");
  }

  function handleRemoveQuestion(id: string) {
    const base =
      packet.questions.length > 0 ? packet.questions : effectiveQuestions;
    updatePacket((prev) => ({
      ...prev,
      questions: base.filter((q) => q.id !== id),
    }));
  }

  if (!mounted) {
    return (
      <div className="py-8 text-sm opacity-70">
        Loading your local Clinician Prep Packet…
      </div>
    );
  }

  return (
    <div className="prep-packet-root space-y-8">
      {/* Print-only clinical header */}
      <div className="hidden print:block border-b border-black pb-3 mb-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-bold text-black">
            Skin Over Steel — Patient Visit Summary
          </h1>
          <span className="text-xs text-black">
            Generated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <p className="text-xs text-black mt-1">
          Patient-recorded educational summary for clinical discussion.
        </p>
      </div>

      {/* Privacy & Actions Bar (hidden on print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 rounded-lg border border-current/15 bg-black/[0.02] p-4">
        <div className="flex items-center gap-2.5 text-sm">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600"
          />
          <span>
            <strong>Local-only privacy:</strong> All data stays strictly on your
            device (zero backend storage).
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="sos-btn sos-btn--primary text-sm"
          >
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={handleCopyPlainText}
            className="sos-btn sos-btn--ghost text-sm border border-current/20"
          >
            {copied ? "Copied for MyChart ✓" : "Copy Plain Text"}
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            className="sos-btn sos-btn--ghost text-sm border border-current/20"
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="sos-btn sos-btn--ghost text-sm text-red-700 dark:text-red-400 border border-current/20"
          >
            Clear All Saved Data
          </button>
        </div>
      </div>

      {/* Completion Status (hidden on print) */}
      <div className="no-print grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {completion.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-current/15 p-3 text-sm flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span aria-hidden="true">{item.done ? "✓" : "○"}</span>
              <span className={item.done ? "font-medium" : "opacity-75"}>
                {item.label}
              </span>
            </div>
            {item.href && !item.done && (
              <Link href={item.href} className="text-xs underline">
                Add
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* 1. Symptom Baseline */}
      <section className="rounded-lg border border-current/15 p-5 print:border-black print:p-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-base font-semibold">
            1. Symptom Baseline (IIEF-5 / SHIM)
          </h2>
          <Link
            href="/tools/erectile-function-score"
            className="no-print text-xs underline"
          >
            {packet.symptomBaseline ? "Retake" : "Take SHIM screen →"}
          </Link>
        </div>
        {packet.symptomBaseline ? (
          <div className="text-sm space-y-1">
            <p>
              <strong>Score:</strong> {packet.symptomBaseline.score} / 25 (
              {packet.symptomBaseline.severity})
            </p>
            <p className="opacity-75">
              <strong>Date taken:</strong> {packet.symptomBaseline.date}
            </p>
          </div>
        ) : (
          <p className="text-sm opacity-75">
            No IIEF-5 score recorded yet.{" "}
            <Link href="/tools/erectile-function-score" className="underline">
              Complete the 2-minute screen
            </Link>{" "}
            to add it here.
          </p>
        )}
      </section>

      {/* 2. Lab Snapshot */}
      <section className="rounded-lg border border-current/15 p-5 print:border-black print:p-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h2 className="text-base font-semibold">2. Lab Snapshot</h2>
          <Link
            href="/tools/free-testosterone"
            className="no-print text-xs underline"
          >
            {packet.labSnapshot?.totalT !== undefined
              ? "Recalculate"
              : "Calculate Free T →"}
          </Link>
        </div>
        {packet.labSnapshot?.totalT !== undefined ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm mb-4">
            <div>
              <span className="opacity-70 block text-xs">Total T</span>
              <strong>
                {packet.labSnapshot.totalT}{" "}
                {packet.labSnapshot.totalTUnit ?? "ng/dL"}
              </strong>
            </div>
            <div>
              <span className="opacity-70 block text-xs">SHBG</span>
              <strong>{packet.labSnapshot.shbg ?? "—"} nmol/L</strong>
            </div>
            <div>
              <span className="opacity-70 block text-xs">Albumin</span>
              <strong>{packet.labSnapshot.albumin ?? "—"} g/dL</strong>
            </div>
            <div>
              <span className="opacity-70 block text-xs">
                Calculated Free T
              </span>
              <strong>
                {packet.labSnapshot.freeT?.toFixed(2) ?? "—"} ng/dL (
                {packet.labSnapshot.freeTPct?.toFixed(1) ?? "—"}%)
              </strong>
            </div>
            <div>
              <span className="opacity-70 block text-xs">Bioavailable T</span>
              <strong>
                {packet.labSnapshot.bioavailableT?.toFixed(0) ?? "—"} ng/dL (
                {packet.labSnapshot.bioavailableTPct?.toFixed(0) ?? "—"}%)
              </strong>
            </div>
          </div>
        ) : (
          <p className="text-sm opacity-75 mb-4">
            No Vermeulen Free/Bioavailable T calculation saved yet.
          </p>
        )}

        {/* Optional Manual Labs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
          {(
            [
              ["lh", "LH (mIU/mL)"],
              ["fsh", "FSH (mIU/mL)"],
              ["hba1c", "HbA1c (%)"],
              ["hsCrp", "hs-CRP (mg/L)"],
              ["fastingInsulin", "Fasting Insulin"],
            ] as const
          ).map(([field, label]) => (
            <label key={field} className="block">
              <span className="block text-xs opacity-75 mb-1">{label}</span>
              <input
                type="text"
                value={packet.labSnapshot?.[field] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  updatePacket((prev) => ({
                    ...prev,
                    labSnapshot: {
                      ...prev.labSnapshot,
                      date:
                        prev.labSnapshot?.date ??
                        new Date().toLocaleDateString("en-US"),
                      [field]: val,
                    },
                  }));
                }}
                placeholder="Optional"
                className="w-full rounded border border-current/20 bg-transparent px-2.5 py-1.5 text-sm print:border-none print:p-0"
              />
            </label>
          ))}
        </div>
      </section>

      {/* 3. Current Medications & History */}
      <section className="rounded-lg border border-current/15 p-5 print:border-black print:p-3">
        <h2 className="text-base font-semibold mb-3">
          3. Current Medications &amp; History
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <label className="block">
            <span className="block text-xs opacity-75 mb-1">What changed</span>
            <textarea
              rows={2}
              value={packet.medicationsHistory?.whatChanged ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                updatePacket((prev) => ({
                  ...prev,
                  medicationsHistory: {
                    whatChanged: val,
                    currentMeds: prev.medicationsHistory?.currentMeds ?? "",
                    duration: prev.medicationsHistory?.duration ?? "",
                  },
                }));
              }}
              placeholder="e.g., Morning erections decreased over 4 months"
              className="w-full rounded border border-current/20 bg-transparent p-2 text-sm print:border-none print:p-0"
            />
          </label>
          <label className="block">
            <span className="block text-xs opacity-75 mb-1">
              Current meds &amp; supplements
            </span>
            <textarea
              rows={2}
              value={packet.medicationsHistory?.currentMeds ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                updatePacket((prev) => ({
                  ...prev,
                  medicationsHistory: {
                    whatChanged: prev.medicationsHistory?.whatChanged ?? "",
                    currentMeds: val,
                    duration: prev.medicationsHistory?.duration ?? "",
                  },
                }));
              }}
              placeholder="e.g., Lisinopril 10mg, Vitamin D3"
              className="w-full rounded border border-current/20 bg-transparent p-2 text-sm print:border-none print:p-0"
            />
          </label>
          <label className="block">
            <span className="block text-xs opacity-75 mb-1">Duration</span>
            <textarea
              rows={2}
              value={packet.medicationsHistory?.duration ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                updatePacket((prev) => ({
                  ...prev,
                  medicationsHistory: {
                    whatChanged: prev.medicationsHistory?.whatChanged ?? "",
                    currentMeds: prev.medicationsHistory?.currentMeds ?? "",
                    duration: val,
                  },
                }));
              }}
              placeholder="e.g., 6 months"
              className="w-full rounded border border-current/20 bg-transparent p-2 text-sm print:border-none print:p-0"
            />
          </label>
        </div>
      </section>

      {/* 4. Protocol Log Summary (Optional) */}
      {logSummary && (
        <section className="rounded-lg border border-current/15 p-5 print:border-black print:p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2 className="text-base font-semibold">4. Protocol Log Summary</h2>
            <Link href="/log" className="no-print text-xs underline">
              Open The Log →
            </Link>
          </div>
          <p className="text-sm">
            Check-ins recorded: <strong>{logSummary.checkInCount}</strong>
            {logSummary.latestDate ? ` (latest: ${logSummary.latestDate})` : ""}
          </p>
          {logSummary.latestNotes && (
            <p className="text-sm opacity-80 mt-1">
              Latest note: {logSummary.latestNotes}
            </p>
          )}
        </section>
      )}

      {/* Smart Contextual Prompts (Non-Diagnostic, hidden on print) */}
      {prompts.length > 0 && (
        <section className="no-print rounded-lg border border-current/15 bg-black/[0.02] p-5">
          <h2 className="text-base font-semibold mb-3">
            Educational Discussion Prompts
          </h2>
          <ul className="space-y-3 text-sm">
            {prompts.map((p) => (
              <li key={p.id}>
                <strong>{p.title}:</strong> {p.body}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Questions for Clinician */}
      <section className="rounded-lg border border-current/15 p-5 print:border-black print:p-3">
        <h2 className="text-base font-semibold mb-3">
          Questions for Clinician
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm mb-4">
          {effectiveQuestions.map((q) => (
            <li key={q.id} className="pr-2">
              <div className="flex items-start justify-between gap-2">
                <span>{q.text}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(q.id)}
                  className="no-print text-xs opacity-60 hover:opacity-100 underline shrink-0"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ol>

        <form onSubmit={handleAddQuestion} className="no-print flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Add a question for your visit…"
            className="flex-1 rounded border border-current/20 bg-transparent px-3 py-1.5 text-sm"
          />
          <button
            type="submit"
            className="sos-btn sos-btn--ghost text-sm border border-current/20"
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
