import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { HexMap } from "@/components/nearme/HexMap";
import { SITE } from "@/lib/site";
import {
  KIND_LABELS,
  META,
  PUBLISHED_PRICE,
  SOURCE_LABELS,
  cityBySlug,
  citiesWithPages,
  confidenceLabel,
  miiBand,
  poisInCity,
  priceLabel,
  lookupZip,
  titleCase,
  type Kind,
} from "@/lib/nearme";

/**
 * Programmatic city pages (/trt/{city}, /glp1/{city}). Generated from the
 * dataset only for cities with enough listings to be worth indexing. Each is
 * a plain, honest list: name, address, source, confidence, price context,
 * with the same "not a referral" footing as /near-me and a bridge to the
 * relevant evidence-graded article.
 */

const COPY: Record<"trt" | "glp1", { noun: string; article: { href: string; title: string }; intro: (city: string) => string; faq: { q: string; a: string }[] }> = {
  trt: {
    noun: "testosterone therapy",
    article: { href: "/learn/testosterone-therapy", title: "Testosterone therapy: what the evidence says" },
    intro: (c) =>
      `Clinics and practices in ${c} whose NPI registry record is endocrinology, urology, preventive medicine, or a generalist listing that names hormones or testosterone. A listing means the registry says so, not that we checked the medicine.`,
    faq: [
      { q: "Does a listing mean the clinic is good?", a: "No. It means a public registry lists the business under a relevant specialty, or its name says it treats hormones. Quality, pricing, and whether they run proper workups (labs twice, morning, before any prescription) is what the member reports and the evidence-graded articles are for." },
      { q: "What should a legitimate program do first?", a: "Two morning total-testosterone draws, SHBG, LH/FSH, hematocrit, PSA where indicated, and a conversation about fertility before any prescription. A clinic that prescribes on one afternoon draw is a warning sign." },
    ],
  },
  glp1: {
    noun: "GLP-1 prescribing",
    article: { href: "/learn/what-it-costs", title: "What it costs, and how to get real value" },
    intro: (c) =>
      `Practices in ${c} with an obesity-medicine NPI listing, a name that says medical weight loss, or a CMS Open Payments record tied to a GLP-1 product from Novo Nordisk or Eli Lilly. A payment record is a proxy for prescribing, not a judgment about the practice.`,
    faq: [
      { q: "Why use Open Payments as a signal?", a: "It is the only public, business-level record of which practices have a relationship with the GLP-1 manufacturers. It is published by CMS under the Sunshine Act. We export the practice address only, never the recipient's name or the dollar amounts." },
      { q: "Compounded semaglutide: is it legal?", a: "Compounding is allowed only while the FDA lists a shortage or for a documented patient-specific need, and only from a licensed 503A/503B pharmacy. Our pharmacy layer is gated on state licensure. A vial from a website with no pharmacy license is not a pharmacy product." },
    ],
  },
};

export function cityStaticParams(kind: "trt" | "glp1") {
  return citiesWithPages(kind).map((c) => ({ city: c.slug }));
}

export function cityMetadata(kind: "trt" | "glp1", slug: string): Metadata {
  const c = cityBySlug(slug);
  if (!c) return {};
  const n = c.counts[kind] ?? 0;
  const label = kind === "trt" ? "TRT clinics" : "GLP-1 prescribers";
  return {
    title: `${label} in ${c.city}, TX (${n} listed)`,
    description: `${n} ${COPY[kind].noun} ${n === 1 ? "listing" : "listings"} in ${c.city}, Texas from public registries, with distance, source, and member-reported price ranges. Metabolic Infrastructure Index ${c.mii}/100.`,
    alternates: { canonical: `/${kind}/${slug}` },
  };
}

export function CityPage({ kind, slug }: { kind: "trt" | "glp1"; slug: string }) {
  const c = cityBySlug(slug);
  if (!c || (c.counts[kind] ?? 0) < 3) notFound();
  const list = poisInCity(c.city, kind);
  const copy = COPY[kind];
  const pub = PUBLISHED_PRICE[kind];
  const anchor = list.find((p) => lookupZip(p.z)) ?? list[0];
  const center = anchor ? { lat: anchor.lat, lon: anchor.lon } : null;
  const other: Kind[] = kind === "trt" ? ["glp1", "pharmacy", "gym"] : ["trt", "pharmacy", "gym"];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${KIND_LABELS[kind]} in ${c.city}, TX`,
      url: `${SITE.url}/${kind}/${slug}`,
      numberOfItems: list.length,
      itemListElement: list.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "MedicalBusiness",
          name: titleCase(p.n),
          address: { "@type": "PostalAddress", streetAddress: titleCase(p.a), addressLocality: p.c, addressRegion: "TX", postalCode: p.z },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Near me", item: `${SITE.url}/near-me` },
        { "@type": "ListItem", position: 3, name: `${KIND_LABELS[kind]} in ${c.city}` },
      ],
    },
  ];

  return (
    <div className="sos-container" style={{ maxWidth: 880 }}>
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <nav aria-label="Breadcrumb" className="sos-note" style={{ marginBottom: 14 }}>
        <Link href="/" style={{ color: "var(--sos-text-md)" }}>Home</Link> › <Link href="/near-me" style={{ color: "var(--sos-text-md)" }}>Near me</Link> › {c.city}
      </nav>
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        {c.city}, TX · <b>MII {c.mii}</b> · {miiBand(c.mii)} · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>
        {KIND_LABELS[kind]} in {c.city}
      </h1>
      <p className="sos-prose" style={{ marginBottom: 22, maxWidth: "64ch" }}>{copy.intro(c.city)}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 26 }}>
        <Link href={copy.article.href} className="sos-btn sos-btn--ghost">Read the evidence first</Link>
        <Link href={`/near-me#zip=${anchor?.z ?? ""}`} className="sos-btn sos-btn--ghost">Rank by distance from your zip</Link>
      </div>

      {center && <HexMap focus={center} height={300} initialZoom={3.2} showReadout={false} />}

      <p className="sos-note" style={{ margin: "22px 0 12px" }}>
        {list.length} listed · published price range ${pub.low}–${pub.high}{pub.unit} (<Link href={pub.href}>source</Link>). Member ranges replace it at three reports.
      </p>

      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {list.map((p, i) => {
          const price = priceLabel(p);
          return (
            <li key={p.id} className="sos-card" style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "28px 1fr", gap: 10 }}>
              <span style={{ fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-lo)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p style={{ fontFamily: "var(--sos-serif)", fontSize: 16.5, color: "var(--sos-text-hi)", margin: 0 }}>{titleCase(p.n)}</p>
                <p className="sos-note" style={{ margin: "2px 0 0" }}>{[p.a && titleCase(p.a), p.z].filter(Boolean).join(" · ")}</p>
                <p className="sos-note" style={{ margin: "4px 0 0" }}>
                  {SOURCE_LABELS[p.s] ?? p.s} · {confidenceLabel(p.cf)} · {price.member ? `members report ${price.text}` : "no member reports yet"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Also in {c.city}</h2>
        <p className="sos-note">
          {other.map((k) => `${KIND_LABELS[k]}: ${c.counts[k] ?? 0}`).join(" · ")}.{" "}
          <Link href="/map">See the full map</Link>.
        </p>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Questions</h2>
        {copy.faq.map((f) => (
          <details key={f.q} className="sos-card" style={{ padding: "12px 16px", marginBottom: 8 }}>
            <summary style={{ fontFamily: "var(--sos-serif)", fontSize: 16.5, color: "var(--sos-text-hi)", cursor: "pointer" }}>{f.q}</summary>
            <p className="sos-prose" style={{ fontSize: 16, marginTop: 10 }}>{f.a}</p>
          </details>
        ))}
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Other cities</h2>
        <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {citiesWithPages(kind).filter((x) => x.slug !== slug).slice(0, 20).map((x) => (
            <Link key={x.slug} href={`/${kind}/${x.slug}`}>{x.city}</Link>
          ))}
        </p>
      </section>

      <p className="sos-note" style={{ marginTop: 36 }}>
        Wayfinding, not a referral and not an endorsement. A business here has not been reviewed by
        us unless it also appears in the <Link href="/directory">provider directory</Link>. Spot an
        error or a closure? Report it from <Link href="/near-me">the lookup</Link>. How this page is
        built: <Link href="/near-me/methodology">methodology</Link>.
      </p>
    </div>
  );
}
