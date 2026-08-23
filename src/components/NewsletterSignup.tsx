"use client";

import { useState } from "react";

/**
 * The Vault waitlist capture. Posts to /api/subscribe, which forwards to
 * Buttondown server-side (double opt-in). No analytics on the address, honest
 * fine print, graceful failure. Only rendered when a provider key is configured
 * (see src/app/page.tsx) so a dead form never ships.
 */

type Status = "idle" | "submitting" | "ok" | "already" | "error";

const inputStyle: React.CSSProperties = {
  flex: "1 1 220px",
  fontFamily: "var(--sos-mono)",
  fontSize: "14px",
  padding: "12px 14px",
  background: "var(--sos-e2)",
  color: "var(--sos-text-hi)",
  border: "1px solid var(--sos-line)",
  borderRadius: "8px",
};

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus(data.already ? "already" : "ok");
      } else {
        setStatus("error");
        setError(typeof data?.error === "string" ? data.error : "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Try again shortly.");
    }
  }

  if (status === "ok" || status === "already") {
    return (
      <p
        className="sos-prose"
        role="status"
        aria-live="polite"
        style={{ maxWidth: "52ch", marginTop: "20px", color: "var(--sos-text-md)" }}
      >
        {status === "already"
          ? "You're already on the list. We'll be in touch when The Vault opens."
          : "Check your inbox to confirm. That's the last step, and then you're on the list."}
      </p>
    );
  }

  const busy = status === "submitting";
  return (
    <form onSubmit={onSubmit} style={{ marginTop: "22px", maxWidth: "460px" }}>
      <label htmlFor="vault-email" className="sos-kicker" style={{ display: "block", marginBottom: "10px" }}>
        Know when it opens
      </label>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <input
          id="vault-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          style={inputStyle}
        />
        <button
          type="submit"
          className="sos-btn sos-btn--primary"
          disabled={busy}
          style={{ border: "none", cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}
        >
          {busy ? "Adding…" : "Notify me"}
        </button>
      </div>
      <p className="sos-note" aria-live="polite" style={{ marginTop: "10px", minHeight: "1.2em" }}>
        {status === "error"
          ? error
          : "Double opt-in. No spam, we never sell your address, unsubscribe anytime."}
      </p>
    </form>
  );
}
