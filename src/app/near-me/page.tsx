import type { Metadata } from "next";
import Link from "next/link";
import { NearMeTool } from "@/components/nearme/NearMeTool";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { KINDS, KIND_LABELS, META, citiesWithPages } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Near me: TRT clinics, GLP-1 prescribers, compounding pharmacies, gyms in DFW",
  description:
    "Enter a Dallas–Fort Worth zip and see the nearest testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, and serious gyms, with distance and member-reported price ranges. Built from public registries; businesses only.",
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
    "Zip-code lookup of the nearest testosterone therapy clinics, GLP-1 prescribers, compounding pharmacies, and strength gyms in Dallas–Fort Worth, with crowdsourced price ranges.",
  publisher: { "@id": `${SITE.url}/#org` },
};

export default function NearMePage() {
  return (
    <div className="sos-container" style={{ maxWidth: 880 }}>
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Near me · <b>Dallas–Fort Worth</b> · dataset {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>
        Who treats this near you
      </h1>
      <p className="sos-prose" style={{ marginBottom: 24, maxWidth: "64ch" }}>
        A zip in, the nearest clinics and pharmacies out: testosterone therapy, GLP-1 prescribing,
        licensed compounding, and the gyms where people actually lift. Distances are from your
        zip&apos;s center. Prices are what members report paying, and until three members have
        reported, the published range. The map is the same data, scored per hex.
      </p>

      <NearMeTool />

      <div className="sos-card sos-card--deep" style={{ marginTop: 40 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>What is in the dataset</h2>
        <ul className="sos-note" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
          {KINDS.map((k) => (
            <li key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>{KIND_LABELS[k]}</span>
              <span style={{ color: "var(--sos-text-hi)" }}>{META.counts[k]}</span>
            </li>
          ))}
        </ul>
        <p className="sos-note" style={{ marginTop: 14 }}>
          Businesses only, from NPI, CMS Open Payments, state pharmacy licensing, and OpenStreetMap.
          Nothing about residents, ever.{" "}
          <Link href="/near-me/methodology">How the map is built</Link> ·{" "}
          <Link href="/map">Full DFW map</Link>
        </p>
      </div>

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>By city</h2>
        <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {citiesWithPages("trt").slice(0, 16).map((c) => (
            <Link key={c.slug} href={`/trt/${c.slug}`}>TRT in {c.city}</Link>
          ))}
          {citiesWithPages("glp1").slice(0, 12).map((c) => (
            <Link key={c.slug} href={`/glp1/${c.slug}`}>GLP-1 in {c.city}</Link>
          ))}
        </p>
      </section>

      <p className="sos-note" style={{ marginTop: 36 }}>
        Education and wayfinding, not medical advice and not a referral. A clinic on this map has
        not been reviewed by us unless it also appears in the{" "}
        <Link href="/directory">provider directory</Link>, where the trust criteria are published.
        Not for use in housing, lending, or insurance decisions.
      </p>
    </div>
  );
}
