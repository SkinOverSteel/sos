import { ImageResponse } from "next/og";

/**
 * Square brand logo (512×512 PNG) served at a stable /logo.png URL so the
 * Organization JSON-LD (see lib/jsonld.ts) can point `logo` at a real image:
 * the mark Google may show in a knowledge panel. Mirrors the treatment in
 * opengraph-image.tsx, scaled to a square and reusing the same brand tokens.
 */
export const dynamic = "force-static";

const SIZE = 512;

// Brand tokens (inlined; ImageResponse can't read external CSS).
const E0 = "#12161A";
const COPPER = "#C97438";
const BONE = "#E8EAEC";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px",
          backgroundColor: E0,
          backgroundImage: `radial-gradient(520px 360px at 12% -10%, rgba(201,116,56,0.20), rgba(18,22,26,0) 62%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: COPPER, fontSize: 104, fontStyle: "italic" }}>
            SKIN
          </span>
          <span style={{ color: BONE, fontSize: 104 }}>OVER</span>
          <span style={{ color: BONE, fontSize: 104 }}>STEEL</span>
        </div>

        {/* Morse SOS ( ··· ––– ··· ): the brand's signature device. */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
          {[8, 8, 8, 34, 34, 34, 8, 8, 8].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 8,
                borderRadius: 4,
                backgroundColor: COPPER,
                marginRight: 10,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE },
  );
}
