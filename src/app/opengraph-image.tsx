import { ImageResponse } from "next/og";

export const alt =
  "Skin Over Steel — evidence-graded men's sexual health";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens (inlined — ImageResponse can't read external CSS).
const E0 = "#12161A";
const COPPER = "#C97438";
const BONE = "#E8EAEC";
const MUTED = "#AEB6BD";
const LOW = "#78828B";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: E0,
          backgroundImage: `radial-gradient(900px 520px at 15% -10%, rgba(201,116,56,0.18), rgba(18,22,26,0) 60%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: LOW,
            marginBottom: 28,
          }}
        >
          <span>Men&apos;s health ·</span>
          <span style={{ color: COPPER, marginLeft: 10 }}>evidence-graded</span>
        </div>

        <div style={{ display: "flex", fontSize: 118, fontWeight: 800, lineHeight: 1 }}>
          <span style={{ color: COPPER, fontStyle: "italic" }}>Skin</span>
          <span style={{ color: BONE, marginLeft: 24, letterSpacing: -2 }}>
            OVER STEEL
          </span>
        </div>

        <div
          style={{
            fontSize: 34,
            color: MUTED,
            marginTop: 34,
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          The conversation your urologist doesn&apos;t have time for.
        </div>

        {/* Morse SOS ( ··· ––– ··· ) */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 52 }}>
          {[10, 10, 10, 52, 52, 52, 10, 10, 10].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 10,
                borderRadius: 5,
                backgroundColor: COPPER,
                marginRight: 14,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
