import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KINDS, KIND_SHORT, META, METROS } from "@/lib/nearme";

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
    source: "NPI registry, monthly NPPES file, all states: endocrinology 207RE0101X, urology 208U00000X, preventive medicine 2083X0100X; family and internal medicine only on a name-keyword hit (testosterone, hormone, low T, men's health, andropause, anti-aging, longevity). Deactivated NPIs skipped.",
    keep: "Practice-location address, organization name, taxonomy codes.",
    drop: "Individual practitioners' names (a solo office is labelled by specialty only), mailing addresses, phone numbers.",
  },
  {
    layer: "GLP-1 prescribers",
    source: "NPI obesity medicine 207RB0002X and weight-loss name keywords; CMS Open Payments general payments from Novo Nordisk and Eli Lilly tied to Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza, grouped to distinct business addresses per state.",
    keep: "Practice address, specialty.",
    drop: "Recipient name, NPI, payment amounts, payment nature.",
  },
  {
    layer: "Compounding pharmacies",
    source: "FDA registered outsourcing facilities (503B), all states; state boards of pharmacy license exports (503A), one CSV per state as operators add them; OpenStreetMap name search inside metros for candidates.",
    keep: "Name, address, license class.",
    drop: "Nothing hidden: an unlicensed candidate is shown at low confidence, never as licensed.",
  },
  {
    layer: "Gyms",
    source: "OpenStreetMap fitness centres and sport tags inside metro boxes; optional Google Places text search.",
    keep: "Name, address, coordinates, tag words (CrossFit, powerlifting, barbell, strength, strongman; independent fitness centres at lower confidence).",
    drop: "Big-box chains, reviews, photos.",
  },
];

export default function NearMeMethodologyPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Near me · <b>methodology</b> · v2 · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>How the map is built</h1>

      <p className="sos-prose" style={{ marginBottom: 28, maxWidth: "64ch" }}>
        A map of businesses that treat, supply, or support men&apos;s metabolic and hormonal
        health. Every state is covered by the public registries; {META.metros} metros are also mapped
        at street scale. Each hexagon gets a Metabolic Infrastructure Index from 0 to 100. This page
        is the whole method, stated plainly enough that you can hold us to it.
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
            <strong>Not a legal opinion.</strong> Compounding, telehealth, and controlled-substance
            rules differ by state. The pharmacy layer asserts licensure or FDA registration only,
            never that a particular prescription is lawful in a particular state.
          </li>
          <li>
            <strong>Not for housing, lending, or insurance.</strong> The index must not be used in,
            or marketed toward, any decision about a person&apos;s housing, credit, or insurability.
            The data license (CC BY-NC 4.0) and this page say so.
          </li>
        </ul>
      </Section>

      <Section title="Coverage">
        <ul className="sos-note" style={{ ...ul, gap: 6 }}>
          <li><b style={{ color: "var(--sos-text-hi)" }}>National overview</b> · TRT, GLP-1, pharmacy · H3 r4–r5 · scored against the national distribution.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>Every state</b> · the registry layers, plus gyms inside metros · H3 r6–r7 · scored nationally.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>{META.metros} metros</b> · all four layers · H3 r7–r9 · scored against the metro&apos;s own distribution, with the national score alongside.</li>
        </ul>
        <p className="sos-note" style={{ marginTop: 10 }}>
          Metros: {METROS.map((m) => m.name).join(", ")}. The gym layer and the OpenStreetMap
          pharmacy candidates exist only inside these boxes; outside them the index uses the three
          registry layers with their weights renormalised, and the hex says so.
        </p>
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
          Zips resolve to Census ZCTA centroids (2023 Gazetteer), with GeoNames filling names and
          non-ZCTA zips. Street geocoding uses the Census Bureau batch geocoder; rows it cannot match
          stay at their zip centroid and are labelled as such wherever they appear. Inside metros,
          Nominatim fills some gaps under its usage policy. Distances are great-circle miles from the
          zip centroid.
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
          For each H3 hexagon and each layer that covers it:
        </p>
        <pre className="sos-note" style={{ background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: 8, padding: 14, overflowX: "auto", color: "var(--sos-text-md)" }}>
{`raw_k  = Σ confidence inside the hex + 0.5 × Σ confidence in the 6 neighbours
comp_k = min(1, ln(1 + raw_k) / ln(1 + P95_k))     P95 over the scoring region
MII    = 100 × Σ w_k·comp_k / Σ w_k                 w: ${KINDS.map((k) => `${KIND_SHORT[k]} ${META.weights[k].toFixed(2)}`).join(", ")}`}
        </pre>
        <p className="sos-note" style={{ marginTop: 10 }}>
          P95 is taken over the whole country for national and state layers and over the metro
          itself for metro layers; every hex also carries the nationally scored value. The log
          compresses the top so one medical tower does not flatten the rest of the map. The neighbour
          term smooths single-listing noise. Empty hexes are not drawn. Weights are a published
          judgment call, revisited each quarter.
        </p>
      </Section>

      <Section title="Programmatic pages">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          A city gets a TRT page only with five or more TRT listings and a GLP-1 page only with eight
          or more GLP-1 listings. Below that it is reachable through the lookup and the state map but
          has no page of its own: a page with two rows is noise for readers and search engines alike.
          Current build: {META.cities_with_pages.trt} TRT city pages, {META.cities_with_pages.glp1} GLP-1 city pages.
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
          <li>State board exports are manual, so 503A coverage grows state by state; until a state&apos;s file exists, its licensed compounders appear only as FDA 503B facilities or OpenStreetMap candidates.</li>
          <li>The gym layer is metro-only. A state hex&apos;s score outside a metro says nothing about gyms.</li>
          <li>About one registry row in ten sits at its zip centroid rather than its street; those rows say so.</li>
        </ul>
      </Section>

      <p className="sos-note" style={{ marginTop: 32 }}>
        Current build: {KINDS.map((k) => `${KIND_SHORT[k]} ${META.counts[k].toLocaleString("en-US")}`).join(" · ")} ·{" "}
        {META.states} states · {META.metros} metros · {META.geocoded.toLocaleString("en-US")} rows at street level.
        Pipeline: standalone Python scripts in the repository&apos;s /etl directory. Hex layers: compact JSON
        under /data/nearme/ (us, states, metros; one row per hex; CC BY-NC 4.0). <Link href="/near-me">Back to the lookup</Link> · <Link href="/map">the map</Link>.
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
