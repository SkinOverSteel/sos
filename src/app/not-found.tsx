import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal lost (404)",
};

export default function NotFound() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <p className="sos-kicker" style={{ marginBottom: "20px" }}>
        404 · <b>signal lost</b>
      </p>

      <h1
        style={{
          fontFamily: "var(--sos-sans)",
          fontWeight: 850,
          fontStretch: "80%",
          fontSize: "clamp(40px, 7vw, 68px)",
          lineHeight: 1,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "var(--sos-text-hi)",
        }}
      >
        No signal here
      </h1>

      <p
        style={{
          fontFamily: "var(--sos-serif)",
          fontSize: "18px",
          lineHeight: 1.6,
          color: "var(--sos-text-md)",
          maxWidth: "44ch",
          margin: "22px auto 0",
        }}
      >
        This page couldn&apos;t be found — but you&apos;re not stuck. Pick up the
        thread again below.
      </p>

      {/* Dimmed Morse SOS — the signal, gone quiet */}
      <div className="sos-morse dim" style={{ margin: "40px auto 0", width: "fit-content" }} aria-hidden="true">
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
        <i className="dash" />
        <i className="dash" />
        <i className="dash" />
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
      </div>

      <div
        style={{
          display: "flex",
          gap: "14px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "44px",
        }}
      >
        <Link href="/" className="sos-btn sos-btn--primary">
          Home
        </Link>
        <Link href="/learn" className="sos-btn sos-btn--ghost">
          The library
        </Link>
        <Link href="/support" className="sos-btn sos-btn--ghost">
          Get support
        </Link>
      </div>
    </div>
  );
}
