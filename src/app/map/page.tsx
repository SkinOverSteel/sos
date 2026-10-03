import type { Metadata } from "next";
import Link from "next/link";
import { HexMap } from "@/components/nearme/HexMap";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CITIES, KINDS, KIND_SHORT, META, miiBand } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "DFW metabolic infrastructure map",
  description:
    "Dallas–Fort Worth on a hex grid, each cell scored 0–100 by its density of testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, and strength gyms. Businesses only; public sources; published methodology.",
  alternates: { canonical: "/map" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Metabolic Infrastructure Index, Dallas–Fort Worth",
  url: `${SITE.url}/map`,
  description:
    "H3 hexagon (resolution 7–9) scores of men's-health and metabolic business density in DFW: TRT clinics, GLP-1 prescribers, 503A/503B compounding pharmacies, strength gyms. Business locations only, no person-level data.",
  license: "https://creativecommons.org/licenses/by-nc/4.0/",
  creator: { "@id": `${SITE.url}/#org` },
  temporalCoverage: META.built,
  spatialCoverage: "Dallas–Fort Worth–Arlington, TX",
  distribution: [7, 8, 9].map((r) => ({
    "@type": "DataDownload",
    encodingFormat: "application/geo+json",
    contentUrl: `${SITE.url}/data/nearme/hex-r${r}.geojson`,
  })),
};

export default function MapPage() {
  const top = [...CITIES].filter((c) => c.total >= 5).sort((a, b) => b.mii - a.mii).slice(0, 12);
  return (
    <div className="sos-container" style={{ maxWidth: 1040 }}>
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Map · <b>Metabolic Infrastructure Index</b> · {META.region} · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>
        Where the infrastructure is
      </h1>
      <p className="sos-prose" style={{ marginBottom: 22, maxWidth: "64ch" }}>
        Every hex is scored 0–100 on the clinics, prescribers, pharmacies, and gyms inside it and
        next to it. Brighter copper is denser. Zoom in and the grid refines from county-scale to
        street-scale. It says where the businesses are. It says nothing about who lives there.
      </p>

      <HexMap height={600} initialZoom={1.1} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 22 }}>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>Reading the index</h2>
          <ul className="sos-note" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
            {[75, 50, 25, 5].map((v) => (
              <li key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span aria-hidden="true" style={{ width: 16, height: 16, borderRadius: 4, background: "var(--sos-copper)", opacity: 0.08 + (v / 100) * 0.82, border: "1px solid var(--sos-line)" }} />
                {v}+ · {miiBand(v)}
              </li>
            ))}
          </ul>
        </div>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>Weights</h2>
          <ul className="sos-note" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
            {KINDS.map((k) => (
              <li key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{KIND_SHORT[k]}</span>
                <span style={{ color: "var(--sos-text-hi)" }}>{Math.round(META.weights[k] * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>Densest cities</h2>
          <ol className="sos-note" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 3 }}>
            {top.map((c) => (
              <li key={c.slug}>
                <Link href={`/trt/${c.slug}`} style={{ color: "var(--sos-text-md)" }}>{c.city}</Link>{" "}
                <span style={{ color: "var(--sos-text-lo)" }}>· MII {c.mii}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="sos-note" style={{ marginTop: 28 }}>
        Data: GeoJSON at r7, r8, r9 is{" "}
        <a href="/data/nearme/hex-r8.geojson">downloadable</a> (CC BY-NC 4.0, attribution to
        Skin Over Steel). Methodology, sources, and limits:{" "}
        <Link href="/near-me/methodology">how the map is built</Link>. Not for use in housing,
        lending, or insurance decisions. <Link href="/near-me">Look up a zip</Link>.
      </p>
    </div>
  );
}
