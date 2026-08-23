import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { FreeTestosteroneCalc } from "@/components/FreeTestosteroneCalc";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/free-testosterone`;

export const metadata: Metadata = {
  title: "Free testosterone calculator (Vermeulen)",
  description:
    "Estimate free and bioavailable testosterone from total T, SHBG, and albumin using the Vermeulen equation — the usable fraction your total-T result doesn't show. Private, in-browser, and built to take to your clinician.",
  alternates: { canonical: "/tools/free-testosterone" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Free testosterone calculator (Vermeulen)",
  url: URL,
  description:
    "An interactive, private calculator for free and bioavailable testosterone from total testosterone, SHBG, and albumin, using the Vermeulen method.",
  about: { "@type": "MedicalCondition", name: "Hypogonadism" },
  audience: { "@type": "Patient" },
  author: { "@id": `${SITE.url}/#org` },
  publisher: { "@id": `${SITE.url}/#org` },
  isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website` },
  inLanguage: "en-US",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE.url}/tools` },
    { "@type": "ListItem", position: 3, name: "Free testosterone calculator" },
  ],
};

export default function FreeTestosteronePage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />

      <nav aria-label="Breadcrumb" style={{ marginBottom: "14px" }}>
        <ol
          style={{
            listStyle: "none",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            margin: 0,
            padding: 0,
            fontFamily: "var(--sos-mono)",
            fontSize: "12px",
            letterSpacing: "0.06em",
            color: "var(--sos-text-lo)",
          }}
        >
          <li>
            <Link href="/" style={{ color: "var(--sos-text-md)", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/tools" style={{ color: "var(--sos-text-md)", textDecoration: "none" }}>
              Tools
            </Link>
          </li>
        </ol>
      </nav>

      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Tools · <b>Calculator</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The free-testosterone calculator
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        Most of your testosterone is bound up and unavailable — tightly to SHBG,
        loosely to albumin. <strong>Free</strong> and <strong>bioavailable</strong>{" "}
        testosterone are the fractions your body can actually use, and when SHBG runs
        high or low, a normal-looking total can hide the real story. This estimates
        both from your labs using the <strong>Vermeulen equation</strong> — the method
        that tracks closest to the gold standard.
      </p>

      <MorseSOS style={{ margin: "28px 0 34px" }} />

      <FreeTestosteroneCalc />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Method &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Calculated by the Vermeulen method:{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/10523012/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vermeulen A, et al. J Clin Endocrinol Metab. 1999
          </a>
          . It models testosterone&apos;s binding to SHBG and albumin; individual labs
          and calculators use slightly different constants, so treat the output as an
          estimate. Default albumin is 4.3 g/dL when left blank.
        </p>
        <p className="sos-note">
          Not a diagnosis and not medical advice. Whether a value is &quot;low&quot;
          depends on your total testosterone, your symptoms, and your lab&apos;s own
          reference range — read it with a clinician.{" "}
          <Link href="/learn/read-your-labs">Read your labs</Link> walks through what
          each marker means.
        </p>
      </div>

      <Faq slug="free-testosterone" />
    </div>
  );
}
