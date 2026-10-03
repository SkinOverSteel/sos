import type { Metadata } from "next";
import Link from "next/link";
import { HexMap, US_VIEW } from "@/components/nearme/HexMap";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KINDS, KIND_SHORT, META, METROS, STATES, miiBand } from "@/lib/nearme";
import { dataDownloadUrl, dataUrl } from "@/lib/nearme-data";

export const metadata: Metadata = {
  title: "US metabolic infrastructure map",
  description:
    "The United States on a hex grid, each cell scored 0–100 by its density of testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, and strength gyms. Businesses only; public sources; published methodology. 20 metros at street scale, every state at county scale.",
  alternates: { canonical: "/map" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Metabolic Infrastructure Index, United States",
  url: `${SITE.url}/map`,
  description:
    "H3 hexagon scores of men's-health and metabolic business density: TRT clinics, GLP-1 prescribers, 503A/503B compounding pharmacies, strength gyms. Business locations only, no person-level data. National (r4–r5), per state (r6–r7), and per metro (r7–r9) layers.",
  license: "https://creativecommons.org/licenses/by-nc/4.0/",
  creator: { "@id": `${SITE.url}/#org` },
  temporalCoverage: META.built,
  spatialCoverage: "United States",
  distribution: [4, 5].map((r) => ({
    "@type": "DataDownload",
    encodingFormat: "application/json",
    contentUrl: dataDownloadUrl(SITE.url, `us/hex-r${r}.json`),
  })),
};

export default function MapPage() {
  const metroLabels = METROS.map((m) => ({ name: m.name.split("–")[0].split(",")[0].replace(/ Bay Area$| Bay$/, ""), lat: (m.bbox.south + m.bbox.north) / 2, lon: (m.bbox.west + m.bbox.east) / 2 }));
  const topMetros = [...METROS].sort((a, b) => b.mii_us - a.mii_us);
  const topStates = [...STATES].sort((a, b) => b.total - a.total);
  return (
    <div className="sos-container" style={{ maxWidth: 1040 }}>
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Map · <b>Metabolic Infrastructure Index</b> · {META.region} · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>Where the infrastructure is</h1>
      <p className="sos-prose" style={{ marginBottom: 22, maxWidth: "64ch" }}>
        Every hex is scored 0–100 on the clinics, prescribers, pharmacies, and gyms inside it and
        next to it. Brighter copper is denser. The national view is county-scale; each state and
        each of the {META.metros} mapped metros has its own finer grid. It says where the businesses
        are. It says nothing about who lives there.
      </p>

      <HexMap region="us" resolutions={[4, 5]} bbox={US_VIEW} labels={metroLabels} height={560} initialZoom={1} national />

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
          <p className="sos-note" style={{ marginTop: 10 }}>
            Weights: {KINDS.map((k) => `${KIND_SHORT[k]} ${Math.round(META.weights[k] * 100)}%`).join(" · ")}. Outside the mapped metros the gym layer is absent and the other three are reweighted.
          </p>
        </div>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>Metros at street scale</h2>
          <ol className="sos-note" style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 3 }}>
            {topMetros.map((m) => (
              <li key={m.slug}>
                <Link href={`/map/${m.slug}`} style={{ color: "var(--sos-text-md)" }}>{m.name}</Link>{" "}
                <span style={{ color: "var(--sos-text-lo)" }}>· MII {m.mii_us}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>States</h2>
          <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
            {topStates.map((s) => (
              <Link key={s.state} href={`/map/${s.slug}`} style={{ color: "var(--sos-text-md)" }}>{s.state}</Link>
            ))}
          </p>
        </div>
      </div>

      <p className="sos-note" style={{ marginTop: 28 }}>
        Data: the national, state, and metro hex layers are{" "}
        <a href={dataUrl("us/hex-r5.json")}>downloadable</a> as compact JSON (H3 index + scores
        per row; CC BY-NC 4.0, attribution to Skin Over Steel). Methodology, sources, and limits:{" "}
        <Link href="/near-me/methodology">how the map is built</Link>. Not for use in housing,
        lending, or insurance decisions. <Link href="/near-me">Look up a zip</Link>.
      </p>
    </div>
  );
}
