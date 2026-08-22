import type { MetadataRoute } from "next";

/**
 * Web app manifest — makes SOS installable (Android home screen, desktop PWA)
 * and sets the browser theme color to the steel page token. Icons:
 *  - /favicon.ico            legacy "any"
 *  - /icon-192, /icon-512    maskable PNGs (safe-zone padded, see public/)
 * Serves at /manifest.webmanifest; the <link rel="manifest"> is auto-injected.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Skin Over Steel",
    short_name: "SOS",
    description:
      "Evidence-graded men's health education and a pseudonymous community. The conversation your urologist doesn't have time for.",
    start_url: "/",
    display: "standalone",
    background_color: "#12161A",
    theme_color: "#12161A",
    categories: ["health", "medical", "education"],
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
