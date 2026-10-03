"use client";

import { useState } from "react";
import type { Poi } from "@/lib/nearme";

/**
 * Member report: a price paid, a correction, a closure, or a clinic we are
 * missing. Everything lands in a moderation queue (status "pending") and
 * reaches the site only after a person approves it and the dataset is
 * rebuilt. The form sends an account id and the fields below; no IP, no
 * email, no free-form location. Until accounts ship, the id is a random
 * browser-local token, so a report can be withdrawn but never traced.
 */

type Props = { poi?: Poi | null; kind?: Poi["k"]; onClose?: () => void };

function accountId(): string {
  try {
    const k = "sos.nearme.account";
    let v = localStorage.getItem(k);
    if (!v) {
      v = crypto.randomUUID();
      localStorage.setItem(k, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

export function SubmitReport({ poi, kind, onClose }: Props) {
  const [type, setType] = useState<"price" | "new" | "closed" | "correction">(poi ? "price" : "new");
  const [price, setPrice] = useState("");
  const [includes, setIncludes] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/near-me/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: accountId(),
          kind: poi?.k ?? kind ?? "trt",
          poiId: poi?.id ?? null,
          businessName: poi ? undefined : name,
          city: poi ? poi.c : city,
          zip: poi ? poi.z : zip,
          reportType: type,
          monthlyUsd: type === "price" ? Number(price) : null,
          includes: type === "price" ? includes : undefined,
          note,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) {
        setState("done");
        setMsg("Received. A moderator reviews every report before it is published.");
      } else {
        setState("error");
        setMsg(j.error ?? "Couldn't send that.");
      }
    } catch {
      setState("error");
      setMsg("Couldn't reach the server.");
    }
  }

  return (
    <div
      role="dialog"
      aria-labelledby="nm-report-title"
      className="sos-card sos-card--deep"
      style={{ marginTop: 24, borderLeft: "3px solid var(--sos-copper)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <p id="nm-report-title" className="sos-kicker" style={{ marginBottom: 12 }}>
          Member report{poi ? ` · ${poi.n.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase())}` : ""}
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className="sos-btn sos-btn--ghost" style={{ padding: "6px 10px", fontSize: 11, cursor: "pointer" }}>
            Close
          </button>
        )}
      </div>

      {state === "done" ? (
        <p className="sos-note" role="status">{msg}</p>
      ) : (
        <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
          <div className="sos-seg" role="group" aria-label="Report type">
            {(poi ? (["price", "correction", "closed"] as const) : (["new", "price"] as const)).map((t) => (
              <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>
                {{ price: "Price paid", new: "Missing clinic", closed: "Closed", correction: "Correction" }[t]}
              </button>
            ))}
          </div>

          {!poi && (
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "2fr 1fr 1fr" }}>
              <div>
                <label className="sos-label" htmlFor="nm-name">Business name</label>
                <input id="nm-name" className="sos-field" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="sos-label" htmlFor="nm-city">City</label>
                <input id="nm-city" className="sos-field" required maxLength={60} value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <label className="sos-label" htmlFor="nm-zip2">Zip</label>
                <input id="nm-zip2" className="sos-field" required pattern="[0-9]{5}" maxLength={5} inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))} />
              </div>
            </div>
          )}

          {type === "price" && (
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 2fr" }}>
              <div>
                <label className="sos-label" htmlFor="nm-price">Monthly, USD</label>
                <input id="nm-price" className="sos-field" required type="number" min={0} max={9999} step={1} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div>
                <label className="sos-label" htmlFor="nm-inc">What it covered</label>
                <input id="nm-inc" className="sos-field" maxLength={120} placeholder="visits + meds, labs extra" value={includes} onChange={(e) => setIncludes(e.target.value)} />
              </div>
            </div>
          )}

          <div>
            <label className="sos-label" htmlFor="nm-note">Note (optional, no names)</label>
            <textarea id="nm-note" className="sos-field" rows={2} maxLength={500} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button type="submit" className="sos-btn sos-btn--primary" disabled={state === "sending"} style={{ border: 0, cursor: "pointer" }}>
              {state === "sending" ? "Sending" : "Send to moderation"}
            </button>
            <span className="sos-note">Share your experience, don&apos;t prescribe to others. Stored with an account id only.</span>
          </div>
          {state === "error" && <p role="alert" className="sos-note" style={{ color: "var(--sos-copper)" }}>{msg}</p>}
        </form>
      )}
    </div>
  );
}
