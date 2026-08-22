import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * PWA / Android web app manifest. Icons point at the file-based metadata
 * routes Next generates from src/app/icon.svg and the PNG icons in /public
 * (icon-192.png / icon-512.png). Theme color = forge floor (E0); the brand's
 * one warm accent (copper) is reserved for the mark itself.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "SOS",
    description:
      "Evidence-graded men's health education and a pseudonymous community.",
    start_url: "/",
    display: "standalone",
    background_color: "#12161A",
    theme_color: "#12161A",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  };
}
