"use client";

import dynamic from "next/dynamic";

/**
 * The hex map as an on-demand chunk. HexMap carries the h3 geometry library
 * (~280 KB uncompressed); loading it only when a map renders keeps it off
 * every page that merely links to Near me or the map (the header does, on
 * every page, and Next prefetches linked routes' entry chunks).
 */
export const HexMap = dynamic(() => import("./HexMap").then((m) => m.HexMap), {
  loading: () => (
    <div
      aria-hidden="true"
      style={{ minHeight: 320, background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: 10 }}
    />
  ),
});
