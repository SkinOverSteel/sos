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
  cityBySlug,
  citiesWithPages,
  confidenceLabel,
  locationLabel,
  metroBySlug,
  metroFor,
  miiBand,
  priceLabel,
  sourceLabel,
  stateByCode,
  titleCase,
  type Kind,
} from "@/lib/nearme";
import { poisInCity } from "@/lib/nearme-server";

/**
 * Programmatic city pages (/trt/{state}/{city}, /glp1/{state}/{city}).
 * Generated from the dataset only for cities above the listing threshold set
 * in the ETL (thin pages hurt). Each is a plain, honest list: name, address,
 * source, confidence, price context, with the same "not a referral" footing
 * as /near-me and a bridge to the relevant evidence-graded article.
 */

type PageKind = "trt" | "glp1";

const COPY: Record<PageKind, { noun: string; article: { href: string; title: string }; intro: (city: string, st: string) => string; faq: { q: string; a: string }[] }> = {
  trt: {
    noun: "testosterone therapy",
    article: { href: "/learn/testosterone-therapy", title: "Testosterone therapy: what the evidence says" },
    intro: (c, st) =>
      `Clinics and practices in ${c}, ${st} whose NPI registry record is endocrinology, urology, preventive medicine, or a generalist listing that names hormones or testosterone. A listing means the registry says so, not that we checked the medicine.`,
    faq: [
      { q: "Does a listing mean the clinic is good?", a: "No. It means a public registry lists the business under a relevant specialty, or its name says it treats hormones. Quality, pricing, and whether they run proper workups (labs twice, morning, before any prescription) is what the member reports and the evidence-graded articles are for." },
      { q: "What should a legitimate program do first?", a: "Two morning total-testosterone draws, SHBG, LH/FSH, hematocrit, PSA where indicated, and a conversation about fertility before any prescription. A clinic that prescribes on one afternoon draw is a warning sign." },
    ],
  },
  glp1: {
    noun: "GLP-1 prescribing",
    article: { href: "/learn/what-it-costs", title: "What it costs, and how to get real value" },
    intro: (c, st) =>
      `Practices in ${c}, ${st} with an obesity-medicine NPI listing, a name that says medical weight loss, or a CMS Open Payments record tied to a GLP-1 product from Novo Nordisk or Eli Lilly. A payment record is a proxy for prescribing, not a judgment about the practice.`,
    faq: [
      { q: "Why use Open Payments as a signal?", a: "It is the only public, business-level record of which practices have a relationship with the GLP-1 manufacturers. It is published by CMS under the Sunshine Act. We export the practice address only, never the recipient's name or the dollar amounts." },
      { q: "Compounded semaglutide: is it legal?", a: "Compounding is allowed only while the FDA lists a shortage or for a documented patient-specific need, and only from a pharmacy licensed in your state (503A) or registered with the FDA (503B). Rules differ by state; our pharmacy layer asserts licensure only, never the legality of a particular prescription. A vial from a website with no pharmacy license is not a pharmacy product." },
    ],
  },
};

export function cityStaticParams(kind: PageKind) {
  return citiesWithPages(kind).map((c) => ({ state: c.state.toLowerCase(), city: c.slug }));
}

export function cityMetadata(kind: PageKind, state: string, slug: string): Metadata {
  const c = cityBySlug(state, slug);
  if (!c) return {};
  const n = c.counts[kind] ?? 0;
  const label = kind === "trt" ? "TRT clinics" : "GLP-1 prescribers";
  return {
    title: `${label} in ${c.city}, ${c.state} (${n} listed)`,
    description: `${n} ${COPY[kind].noun} ${n === 1 ? "listing" : "listings"} in ${c.city}, ${stateByCode(c.state)?.name ?? c.state} from public registries, with source, confidence tier, and member-reported price ranges. Metabolic Infrastructure Index ${c.mii}/100.`,
    alternates: { canonical: `/${kind}/${state.toLowerCase()}/${slug}` },
  };
}

export function CityPage({ kind, state, slug }: { kind: PageKind; state: string; slug: string }) {
  const c = cityBySlug(state, slug);
  if (!c || !c.pages.includes(kind)) notFound();
  const st = c.state;
  const stateName = stateByCode(st)?.name ?? st;
  const all = poisInCity(st, c.city, kind);
  const isGeneric = (n: string) => n.endsWith(" practice");
  const list = all.filter((p) => !isGeneric(p.n));
  const generic = all.filter((p) => isGeneric(p.n));
  const copy = COPY[kind];
  const pub = PUBLISHED_PRICE[kind];
  const anchor = all.find((p) => p.t.includes("geocoded")) ?? all[0];
  const metro = anchor ? metroFor(anchor.lat, anchor.lon) ?? (anchor.m ? metroBySlug(anchor.m) : undefined) : undefined;
  const other: Kind[] = kind === "trt" ? ["glp1", "pharmacy", "gym"] : ["trt", "pharmacy", "gym"];
  const href = `/${kind}/${st.toLowerCase()}/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${KIND_LABELS[kind]} in ${c.city}, ${st}`,
      url: `${SITE.url}${href}`,
      numberOfItems: list.length,
      itemListElement: list.slice(0, 50).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "MedicalBusiness",
          name: titleCase(p.n),
          address: { "@type": "PostalAddress", streetAddress: titleCase(p.a), addressLocality: p.c, addressRegion: p.st, postalCode: p.z },
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
        { "@type": "ListItem", position: 3, name: stateName, item: `${SITE.url}/map/${st.toLowerCase()}` },
        { "@type": "ListItem", position: 4, name: `${KIND_LABELS[kind]} in ${c.city}` },
      ],
    },
  ];

  return (
    <div className="sos-container" style={{ maxWidth: 880 }}>
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <nav aria-label="Breadcrumb" className="sos-note" style={{ marginBottom: 14 }}>
        <Link href="/" style={{ color: "var(--sos-text-md)" }}>Home</Link> › <Link href="/near-me" style={{ color: "var(--sos-text-md)" }}>Near me</Link> ›{" "}
        <Link href={`/map/${st.toLowerCase()}`} style={{ color: "var(--sos-text-md)" }}>{stateName}</Link> › {c.city}
      </nav>
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        {c.city}, {st} · <b>MII {c.mii}</b> · {miiBand(c.mii)} · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>{KIND_LABELS[kind]} in {c.city}</h1>
      <p className="sos-prose" style={{ marginBottom: 22, maxWidth: "64ch" }}>{copy.intro(c.city, st)}</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 26 }}>
        <Link href={copy.article.href} className="sos-btn sos-btn--ghost">Read the evidence first</Link>
        <Link href={`/near-me#zip=${anchor?.z ?? ""}`} className="sos-btn sos-btn--ghost">Rank by distance from your zip</Link>
      </div>

      {anchor && (
        <HexMap
          region={metro ? `metros/${metro.slug}` : `states/${st.toLowerCase()}`}
          resolutions={metro ? [7, 8, 9] : [6, 7]}
          bbox={metro ? metro.bbox : { south: anchor.lat - 1.5, north: anchor.lat + 1.5, west: anchor.lon - 2, east: anchor.lon + 2 }}
          focus={{ lat: anchor.lat, lon: anchor.lon }}
          height={300}
          initialZoom={3.2}
          showReadout={false}
          national={!metro}
        />
      )}

      <p className="sos-note" style={{ margin: "22px 0 12px" }}>
        {all.length} listed ({list.length} named{generic.length ? `, ${generic.length} specialty-only` : ""}) · published price range ${pub.low}–${pub.high}{pub.unit} (<Link href={pub.href}>source</Link>). Member ranges replace it at three reports.
      </p>

      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 8 }}>
        {list.map((p, i) => {
          const price = priceLabel(p);
          const loc = locationLabel(p);
          return (
            <li key={p.id} className="sos-card" style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "28px 1fr", gap: 10 }}>
              <span style={{ fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-lo)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p style={{ fontFamily: "var(--sos-serif)", fontSize: 16.5, color: "var(--sos-text-hi)", margin: 0 }}>{titleCase(p.n)}</p>
                <p className="sos-note" style={{ margin: "2px 0 0" }}>{[p.a && titleCase(p.a), p.z].filter(Boolean).join(" · ")}{loc ? ` · ${loc}` : ""}</p>
                <p className="sos-note" style={{ margin: "4px 0 0" }}>
                  {sourceLabel(p.s)} · {confidenceLabel(p.cf)} · {price.member ? `members report ${price.text}` : "no member reports yet"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {generic.length > 0 && (
        <details className="sos-card sos-card--deep" style={{ marginTop: 14, padding: "12px 16px" }}>
          <summary className="sos-note" style={{ cursor: "pointer", color: "var(--sos-text-md)" }}>
            {generic.length} specialty-only {generic.length === 1 ? "practice" : "practices"}: individual NPI records with no business name on file, shown by specialty and address only
          </summary>
          <ul className="sos-note" style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "grid", gap: 4 }}>
            {generic.map((p) => (
              <li key={p.id}>{titleCase(p.n)} · {[p.a && titleCase(p.a), p.z].filter(Boolean).join(" · ")} · {confidenceLabel(p.cf)}</li>
            ))}
          </ul>
        </details>
      )}

      <section style={{ marginTop: 36 }}>
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Also in {c.city}</h2>
        <p className="sos-note">
          {other.map((k) => `${KIND_LABELS[k]}: ${c.counts[k] ?? 0}`).join(" · ")}.{" "}
          <Link href={metro ? `/map/${metro.slug}` : `/map/${st.toLowerCase()}`}>See the {metro ? metro.name : stateName} map</Link>.
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
        <h2 className="sos-h2" style={{ marginBottom: 12 }}>Other cities in {stateName}</h2>
        <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {citiesWithPages(kind, st).filter((x) => x.slug !== slug).slice(0, 24).map((x) => (
            <Link key={x.slug} href={`/${kind}/${st.toLowerCase()}/${x.slug}`}>{x.city}</Link>
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
