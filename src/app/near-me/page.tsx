import type { Metadata } from "next";
import { StepHeader } from "@/components/StepHeader";
import Link from "next/link";
import { NearMeTool } from "@/components/nearme/NearMeTool";
import { JsonLd } from "@/components/JsonLd";
import { SignalRail } from "@/components/SignalRail";
import { SITE } from "@/lib/site";
import { KIND_GROUPS, KIND_LABELS, META, METROS, METRO_SEARCH_KINDS, kindCount } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Near me: urologists, TRT clinics, labs, pharmacies, sleep medicine, and more",
  description:
    "Enter a US zip and see the nearest testosterone clinics, GLP-1 prescribers, licensed compounding pharmacies, serious gyms, urologists, endocrinologists, penile implant practices, shockwave clinics, vacuum device suppliers, sleep labs, lab draw sites, and sex therapists, with distance and member-reported price ranges. Built from public registries; businesses only; every state.",
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
    "Zip-code lookup of the nearest testosterone therapy clinics, GLP-1 prescribers, compounding pharmacies, strength gyms, urologists, endocrinologists, penile implant practices, shockwave/PRP clinics, vacuum erection device suppliers, sleep medicine, clinical labs, and sexual medicine / sex therapy practices across the United States, with crowdsourced price ranges.",
  publisher: { "@id": `${SITE.url}/#org` },
};

export default function NearMePage() {
  return (
    <div className="sos-container" style={{ maxWidth: 880 }}>
      <JsonLd data={jsonLd} />
      <StepHeader as="h1" step="care" title="Who treats this near you" className="sos-page-head" more={{ href: "/map", label: "See the whole map →" }}>
        A zip in, the nearest care out: testosterone therapy, GLP-1 prescribing, licensed
        compounding, the gyms where people actually lift, and the care layers around them:
        urologists, endocrinologists, implant practices, shockwave clinics, device suppliers, sleep
        labs, draw sites, sex therapists. Distances are from your zip&apos;s center. Prices are what
        members report paying, and until three members have reported, the published range. The map
        is the same data, scored per hex on the four metabolic layers.
      </StepHeader>
      <p className="sos-kicker" style={{ margin: "-10px 0 24px" }}>
        <b>{META.states} states</b> · {META.metros} metros at street scale · dataset {META.built}
      </p>

      <NearMeTool />

      <div className="sos-card sos-card--deep" style={{ marginTop: 40 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>What is in the dataset</h2>
        <ul className="sos-note" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
          {KIND_GROUPS.map((g) => (
            <li key={g.id} style={{ display: "grid", gap: 6 }}>
              <span style={{ color: "var(--sos-text-lo)", textTransform: "uppercase", letterSpacing: "0.04em", fontSize: 11, marginTop: g.id === "metabolic" ? 0 : 6 }}>
                {g.label}{g.id === "metabolic" ? " · scored" : " · counted, not scored"}
              </span>
              {g.kinds.map((k) => (
                <span key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>
                    {KIND_LABELS[k]}
                    {k === "gym" ? " (mapped metros only)" : METRO_SEARCH_KINDS.includes(k) ? " (street search in mapped metros)" : ""}
                  </span>
                  <span style={{ color: "var(--sos-text-hi)" }}>{kindCount(k) ? kindCount(k).toLocaleString("en-US") : "next refresh"}</span>
                </span>
              ))}
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
            <Link key={m.slug} href={`/map/${m.slug}`} prefetch={false}>{m.name}</Link>
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
