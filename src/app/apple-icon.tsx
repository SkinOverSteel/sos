import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Apple touch icon (180×180). Padded, opaque warm copper plate with a cream
 * italic "S" mark + Morse SOS dots, mirrors src/app/icon.svg, sized for the
 * iOS home-screen tile (no transparency, generous padding per Apple guidance).
 *
 * The "S" is set in Source Serif 4 (the brand serif) to match the favicon.
 * Satori has no system fonts, so naming a family alone renders the fallback
 * sans: the face has to be supplied as data. We load a single-glyph subset
 * (see _fonts/) at build time; force-static keeps this a build-time render,
 * so the font file is never needed by the runtime.
 */
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Warm-theme tokens (inlined; ImageResponse can't read external CSS).
// The tile is a saturated copper plate with a cream mark, to pop at icon size.
const PLATE = "#AE5A24";
const MARK = "#FAF5EE";

export default async function AppleIcon() {
  const serif = await readFile(
    join(process.cwd(), "src/app/_fonts/SourceSerif4-BoldItalic-S.ttf"),
  );

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
          backgroundColor: PLATE,
          backgroundImage:
            "radial-gradient(200px 150px at 20% 0%, rgba(230,163,104,0.42), rgba(174,90,36,0) 62%)",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            fontStyle: "italic",
            fontFamily: "Source Serif 4",
            color: MARK,
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          S
        </div>
        {/* Morse SOS dots ( ··· ): the brand signature. */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 18 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: MARK,
                marginRight: i < 2 ? 14 : 0,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Source Serif 4", data: serif, style: "italic", weight: 700 },
      ],
    },
  );
}
