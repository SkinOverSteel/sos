import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180). Padded, opaque steel plate with the copper
 * italic "S" mark + Morse SOS dots — mirrors src/app/icon.svg, sized for the
 * iOS home-screen tile (no transparency, generous padding per Apple guidance).
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Brand tokens (inlined — ImageResponse can't read external CSS).
const E0 = "#12161A";
const COPPER = "#C97438";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: E0,
          backgroundImage:
            "radial-gradient(200px 150px at 20% 0%, rgba(201,116,56,0.28), rgba(18,22,26,0) 62%)",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            fontStyle: "italic",
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: COPPER,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          S
        </div>
        {/* Morse SOS dots ( ··· ) — the brand signature. */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 18 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COPPER,
                marginRight: i < 2 ? 14 : 0,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
