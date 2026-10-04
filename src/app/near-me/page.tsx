import type { Metadata } from "next";
import { StepHeader } from "@/components/StepHeader";
import Link from "next/link";
import { NearMeTool } from "@/components/nearme/NearMeTool";
import { JsonLd } from "@/components/JsonLd";
import { SignalRail } from "@/components/SignalRail";
import { SITE } from "@/lib/site";
import { KINDS, KIND_LABELS, META, METROS } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Near me: TRT clinics, GLP-1 prescribers, compounding pharmacies, gyms",
  description:
    "Enter a US zip and see the nearest testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, and serious gyms, with distance and member-reported price ranges. Built from public registries; businesses only; every state.",
  alternates: { canonical: "/near-me" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Near me: metabolic infrastructure map",
  url: `${SITE.url}/near-me`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Zip-code lookup of the nearest testosterone therapy clinics, GLP-1 prescribers, compounding pharmacies, and strength gyms across the United States, with crowdsourced price ranges.",
  publisher: { "@id": `${SITE.url}/#org` },
};

export default function NearMePage() {
  return (
    <div className="sos-container" style={{ maxWidth: 880 }}>
      <JsonLd data={jsonLd} />
      <StepHeader as="h1" step="care" title="Who treats this near you" className="sos-page-head" more={{ href: "/map", label: "See the whole map →" }}>
        A zip in, the nearest clinics and pharmacies out: testosterone therapy, GLP-1 prescribing,
        licensed compounding, and the gyms where people actually lift. Distances are from your
        zip&apos;s center. Prices are what members report paying, and until three members have
        reported, the published range. The map is the same data, scored per hex.
      </StepHeader>
      <p className="sos-kicker" style={{ margin: "-10px 0 24px" }}>
        <b>{META.states} states</b> · {META.metros} metros at street scale · dataset {META.built}
      </p>

      <NearMeTool />

      <div className="sos-card sos-card--deep" style={{ marginTop: 40 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>What is in the dataset</h2>
        <ul className="sos-note" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
          {KINDS.map((k) => (
            <li key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>{KIND_LABELS[k]}{k === "gym" ? " (mapped metros only)" : ""}</span>
              <span style={{ color: "var(--sos-text-hi)" }}>{META.counts[k].toLocaleString("en-US")}</span>
            </li>
          ))}
        </ul>
        <p className="sos-note" style={{ marginTop: 14 }}>
          Businesses only, from the NPI registry, CMS Open Payments, the FDA 503B registry, state
          pharmacy boards, and OpenStreetMap. {META.geocoded.toLocaleString("en-US")} placed at street
          level by the Census geocoder; the rest sit at their zip centroid and say so. Nothing about
          residents, ever. <Link href="/near-me/methodology">How the map is built</Link> ·{" "}
          <Link href="/map">The map</Link>
        </p>
      </div>

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Metros at street scale</h2>
        <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {METROS.map((m) => (
            <Link key={m.slug} href={`/map/${m.slug}`}>{m.name}</Link>
          ))}
        </p>
      </section>

      <p className="sos-note" style={{ marginTop: 36 }}>
        Education and wayfinding, not medical advice and not a referral. A clinic on this map has
        not been reviewed by us unless it also appears in the{" "}
        <Link href="/directory">provider directory</Link>, where the trust criteria are published.
        Not for use in housing, lending, or insurance decisions.
      </p>
      <SignalRail className="sos-rail--close" />
    </div>
  );
}
