import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KINDS, KIND_SHORT, META, METROS, miiBand, miiOpacity } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Best US metros for men's metabolic health access, ranked",
  description:
    "The 20 street-scale metros ranked by the Metabolic Infrastructure Index: how much testosterone, GLP-1, compounding-pharmacy, and strength-gym access is actually within reach. A measure of infrastructure, not of the people who live there. Public sources; published methodology.",
  alternates: { canonical: "/map/rankings" },
};

const ranked = [...METROS].sort((a, b) => b.mii_us - a.mii_us || b.total - a.total);
const leader = ranked[0];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "US metros ranked by the Metabolic Infrastructure Index",
  description:
    "Twenty US metros ranked 0–100 by their density of testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, and strength gyms. Business locations only; no person-level data.",
  url: `${SITE.url}/map/rankings`,
  numberOfItems: ranked.length,
  itemListElement: ranked.map((m, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: m.name,
    url: `${SITE.url}/map/${m.slug}`,
  })),
};

export default function RankingsPage() {
  return (
    <div className="sos-container" style={{ maxWidth: 1040 }}>
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Map · <b>Metabolic Infrastructure Index</b> · metros ranked · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>
        Where the access actually is
      </h1>
      <p className="sos-prose" style={{ marginBottom: 20, maxWidth: "64ch" }}>
        The {ranked.length} metros we map at street scale, ranked by the{" "}
        <Link href="/near-me/methodology">Metabolic Infrastructure Index</Link>: how much
        testosterone, GLP-1, licensed compounding, and strength-training infrastructure sits inside
        a cell and next to it, scored 0–100 on the national distribution. {leader.name} leads at MII{" "}
        {leader.mii_us}.
      </p>
      <p className="sos-note" style={{ marginBottom: 28, maxWidth: "64ch" }}>
        This ranks <b>infrastructure</b> — the businesses within reach — not the people who live
        there, and not body composition, hormone levels, or anything about residents. It is
        wayfinding, not a referral and not medical advice. Counts are businesses from public
        registries, so a dense metro reflects supply, not quality.
      </p>

      <div style={{ overflowX: "auto", margin: "0 -4px" }}>
        <table className="sos-rank" style={{ width: "100%", minWidth: 560, borderCollapse: "collapse" }}>
          <caption className="sos-note" style={{ captionSide: "top", textAlign: "left", marginBottom: 10 }}>
            MII on the national scale · {KINDS.map((k) => KIND_SHORT[k]).join(" · ")} are businesses counted in the metro
          </caption>
          <thead>
            <tr>
              <th scope="col" style={th()}>#</th>
              <th scope="col" style={th()}>Metro</th>
              <th scope="col" style={th("right")}>MII</th>
              {KINDS.map((k) => (
                <th key={k} scope="col" style={th("right")}>{KIND_SHORT[k]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map((m, i) => (
              <tr key={m.slug}>
                <td style={td("mono", "lo")}>{String(i + 1).padStart(2, "0")}</td>
                <th scope="row" style={{ ...td("serif", "hi"), fontWeight: 400 }}>
                  <Link href={`/map/${m.slug}`} style={{ color: "var(--sos-text-hi)" }}>{m.name}</Link>
                </th>
                <td style={td("mono", "hi", "right")}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                    <span
                      aria-hidden="true"
                      style={{ width: 12, height: 12, borderRadius: 3, background: "var(--sos-copper)", opacity: miiOpacity(m.mii_us), border: "1px solid var(--sos-line)" }}
                    />
                    {m.mii_us}
                    <span style={{ color: "var(--sos-text-lo)", fontSize: 11, width: 52, textAlign: "left" }}>{miiBand(m.mii_us)}</span>
                  </span>
                </td>
                {KINDS.map((k) => (
                  <td key={k} style={td("mono", "md", "right")}>{(m.counts[k] ?? 0).toLocaleString("en-US")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="sos-note" style={{ marginTop: 28, maxWidth: "70ch" }}>
        The index weights {KINDS.map((k) => `${KIND_SHORT[k]} ${Math.round(META.weights[k] * 100)}%`).join(" · ")}, and
        a log curve keeps one medical tower from flattening the rest. Read{" "}
        <Link href="/near-me/methodology">how the map is built</Link>, see{" "}
        <Link href="/map">the whole map</Link>, or <Link href="/near-me">look up a zip</Link>.
        Not for use in housing, lending, or insurance decisions.
      </p>
    </div>
  );
}

function th(align: "left" | "right" = "left"): React.CSSProperties {
  return {
    fontFamily: "var(--sos-mono)",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--sos-text-lo)",
    textAlign: align,
    fontWeight: 600,
    padding: "0 12px 10px",
    borderBottom: "1px solid var(--sos-line)",
    whiteSpace: "nowrap",
  };
}

function td(
  family: "mono" | "serif",
  tone: "hi" | "md" | "lo",
  align: "left" | "right" = "left",
): React.CSSProperties {
  return {
    fontFamily: family === "mono" ? "var(--sos-mono)" : "var(--sos-serif)",
    fontSize: family === "mono" ? 13 : 16,
    color: `var(--sos-text-${tone})`,
    textAlign: align,
    padding: "11px 12px",
    borderBottom: "1px solid var(--sos-line-dim, var(--sos-line))",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  };
}
