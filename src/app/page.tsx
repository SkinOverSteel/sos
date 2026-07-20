export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <main className="flex max-w-2xl flex-col items-center gap-8">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--sos-mono)",
            fontSize: "12px",
            letterSpacing: "0.14em",
            color: "var(--sos-text-lo)",
          }}
        >
          Men&apos;s health · <b style={{ color: "var(--sos-copper)", fontWeight: 600 }}>evidence-graded</b>
        </p>

        <h1
          style={{
            fontFamily: "var(--sos-sans)",
            fontWeight: 850,
            fontStretch: "78%",
            fontSize: "clamp(46px, 8vw, 84px)",
            lineHeight: 0.96,
            letterSpacing: "-0.015em",
            textTransform: "uppercase",
            color: "var(--sos-text-hi)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--sos-serif)",
              fontStyle: "italic",
              fontWeight: 560,
              textTransform: "none",
              letterSpacing: 0,
              color: "var(--sos-copper)",
            }}
          >
            Skin
          </span>{" "}
          Over Steel
        </h1>

        <p
          style={{
            fontFamily: "var(--sos-serif)",
            fontSize: "19px",
            lineHeight: 1.6,
            color: "var(--sos-text-md)",
            maxWidth: "52ch",
          }}
        >
          The conversation your urologist doesn&apos;t have time for.
        </p>

        {/* Signature: Morse SOS divider (··· ––– ···) */}
        <div
          className="sos-morse"
          role="img"
          aria-label="Morse code S O S"
        >
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

        <p
          className="uppercase"
          style={{
            fontFamily: "var(--sos-mono)",
            fontSize: "12px",
            letterSpacing: "0.12em",
            color: "var(--sos-text-lo)",
          }}
        >
          The signal, answered · Coming soon
        </p>
      </main>
    </div>
  );
}
