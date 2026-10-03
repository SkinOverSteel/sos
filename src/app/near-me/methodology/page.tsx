import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KINDS, KIND_SHORT, META } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Near me: how the map is built",
  description:
    "Sources, confidence rules, the Metabolic Infrastructure Index formula, price aggregation, moderation, snapshots, and the uses we forbid. Businesses only, never residents.",
  alternates: { canonical: "/near-me/methodology" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Near me: how the metabolic infrastructure map is built",
  url: `${SITE.url}/near-me/methodology`,
  dateModified: META.built,
  publisher: { "@id": `${SITE.url}/#org` },
};

const SOURCES: { layer: string; source: string; keep: string; drop: string }[] = [
  {
    layer: "TRT clinics",
    source: "NPI registry (NPPES): endocrinology 207RE0101X, urology 208U00000X, preventive medicine 2083X0100X; family and internal medicine only on a name-keyword hit (testosterone, hormone, low T, men's health, andropause, anti-aging, longevity).",
    keep: "Practice-location address, organization name, taxonomy codes.",
    drop: "Individual practitioners' names (a solo office is labelled by specialty only), mailing addresses, phone numbers.",
  },
  {
    layer: "GLP-1 prescribers",
    source: "NPI obesity medicine 207RB0002X and weight-loss name keywords; CMS Open Payments general payments from Novo Nordisk and Eli Lilly tied to Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza.",
    keep: "Practice address, specialty.",
    drop: "Recipient name, NPI, payment amounts, payment nature.",
  },
  {
    layer: "Compounding pharmacies",
    source: "Texas State Board of Pharmacy license verification (503A), FDA registered outsourcing facilities (503B), OpenStreetMap name search for candidates.",
    keep: "Name, address, license class.",
    drop: "Nothing hidden: an unlicensed candidate is shown at low confidence, never as licensed.",
  },
  {
    layer: "Gyms",
    source: "OpenStreetMap fitness centres and sport tags; optional Google Places text search.",
    keep: "Name, address, coordinates, tag words (CrossFit, powerlifting, barbell, strength, strongman).",
    drop: "Big-box chains, reviews, photos.",
  },
];

export default function NearMeMethodologyPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Near me · <b>methodology</b> · v1 · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>How the map is built</h1>

      <p className="sos-prose" style={{ marginBottom: 28, maxWidth: "64ch" }}>
        A map of businesses that treat, supply, or support men&apos;s metabolic and hormonal
        health in Dallas–Fort Worth. Each hexagon gets a Metabolic Infrastructure Index from
        0 to 100. This page is the whole method, stated plainly enough that you can hold us to it.
      </p>

      <Section title="What it is not">
        <ul className="sos-prose" style={ul}>
          <li>
            <strong>Not about people.</strong> Every layer describes a business or a building. No
            layer uses, infers, or stores anything about residents: no census person data, no
            voter data, no demographics, no one&apos;s health status.
          </li>
          <li>
            <strong>Not a referral.</strong> A listing means a public registry says the business
            exists under a relevant category. Reviewed providers live in the{" "}
            <Link href="/directory">directory</Link>, where the trust criteria are published.
          </li>
          <li>
            <strong>Not for housing, lending, or insurance.</strong> The index must not be used in,
            or marketed toward, any decision about a person&apos;s housing, credit, or insurability.
            The data license (CC BY-NC 4.0) and this page say so.
          </li>
        </ul>
      </Section>

      <Section title="Sources (public, business-level)">
        <div style={{ display: "grid", gap: 10 }}>
          {SOURCES.map((s) => (
            <div key={s.layer} className="sos-card" style={{ padding: "14px 16px" }}>
              <p className="sos-h2" style={{ marginBottom: 6 }}>{s.layer}</p>
              <p className="sos-note" style={{ color: "var(--sos-text-md)" }}>{s.source}</p>
              <p className="sos-note" style={{ marginTop: 6 }}>Keep: {s.keep}</p>
              <p className="sos-note">Drop: {s.drop}</p>
            </div>
          ))}
        </div>
        <p className="sos-note" style={{ marginTop: 12 }}>
          Zips resolve to ZCTA centroids (Zippopotam.us). Street geocoding uses Nominatim under its
          usage policy, one request per second. Distances are great-circle miles from the zip centroid.
        </p>
      </Section>

      <Section title="Confidence">
        <ul className="sos-note" style={{ ...ul, gap: 6 }}>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.85 and up</b> · licensed or verified: a TSBP/FDA license, or a specialty match plus a name keyword.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.6 to 0.85</b> · specialty match: the registry taxonomy alone.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.3 to 0.6</b> · keyword match: a generalist whose name says hormones or weight loss, or an unlicensed pharmacy candidate.</li>
        </ul>
        <p className="sos-note" style={{ marginTop: 10 }}>
          Rows under 0.3 are not published. Confidence weights the index and breaks distance ties. It
          is never moved by money.
        </p>
      </Section>

      <Section title="The index">
        <p className="sos-prose" style={{ fontSize: 16, marginBottom: 12 }}>
          For each H3 hexagon at resolution 7 (county scale), 8 (metro), and 9 (street), and each
          layer:
        </p>
        <pre className="sos-note" style={{ background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: 8, padding: 14, overflowX: "auto", color: "var(--sos-text-md)" }}>
{`raw_k  = Σ confidence inside the hex + 0.5 × Σ confidence in the 6 neighbours
comp_k = min(1, ln(1 + raw_k) / ln(1 + P95_k))     P95 over DFW hexes
MII    = 100 × (${KINDS.map((k) => `${META.weights[k].toFixed(2)} ${KIND_SHORT[k]}`).join(" + ")})`}
        </pre>
        <p className="sos-note" style={{ marginTop: 10 }}>
          The log compresses the top so one medical tower does not flatten the rest of the map. The
          neighbour term smooths single-listing noise. Empty hexes are not drawn. Weights are a
          published judgment call, revisited each quarter.
        </p>
      </Section>

      <Section title="Prices">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          A listing shows a member price range only once three or more approved reports exist, as
          the interquartile range so one outlier cannot move it. Below three, the published range
          for the category is shown and attributed. Reports never include names, emails, or phone
          numbers; the API rejects them.
        </p>
      </Section>

      <Section title="Submissions and moderation">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          Members can report a price, a correction, a closure, or a missing business. Every report
          is created as pending and reaches the site only after a moderator approves it and the
          dataset is rebuilt. A report stores an account id and the form fields. IP addresses and
          user agents are never read or stored. Share your experience, don&apos;t prescribe to others.
        </p>
      </Section>

      <Section title="Snapshots">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          The dataset is rebuilt and frozen once a quarter. Openings, closings, counts per city, and
          median reported prices are appended to a time series. A business id is a hash of its
          name, address, and zip, so a move or rename reads as a closure plus an opening.
        </p>
      </Section>

      <Section title="Money">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          There is no paid placement on the map. If sponsored pins or verified-pricing badges ever
          ship, they will be labelled, kept out of the ranking and the index, and described here
          first. Any paid relationship follows the directory rule: disclosed at the link, never
          changes a rank, a score, or a grade.
        </p>
      </Section>

      <Section title="Limits">
        <ul className="sos-note" style={{ ...ul, gap: 4 }}>
          <li>Registries lag; a clinic can close months before NPPES notices.</li>
          <li>Keyword match is exactly that. A wellness clinic&apos;s name is not a workup.</li>
          <li>Open Payments is a prescribing proxy, not a prescribing record.</li>
          <li>OpenStreetMap gym coverage is uneven; Google Places improves recall where configured.</li>
          <li>DFW only, for now.</li>
        </ul>
      </Section>

      <p className="sos-note" style={{ marginTop: 32 }}>
        Current build: {KINDS.map((k) => `${KIND_SHORT[k]} ${META.counts[k]}`).join(" · ")} · hexes r7
        {" "}{META.hexes["7"]}, r8 {META.hexes["8"]}, r9 {META.hexes["9"]}. Pipeline: standalone Python
        scripts in the repository&apos;s /etl directory. Hex layers: GeoJSON at /data/nearme/hex-r7,
        r8, r9 (CC BY-NC 4.0). <Link href="/near-me">Back to the lookup</Link> · <Link href="/map">the map</Link>.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 30 }}>
      <h2 className="sos-h2" style={{ marginBottom: 12 }}>{title}</h2>
      {children}
    </section>
  );
}

const ul: React.CSSProperties = { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 };
