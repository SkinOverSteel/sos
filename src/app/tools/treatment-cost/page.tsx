import type { Metadata } from "next";
import Link from "next/link";
import { MorseSOS } from "@/components/MorseSOS";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { TreatmentCostCalc } from "@/components/TreatmentCostCalc";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/treatment-cost`;

export const metadata: Metadata = {
  title: "ED & TRT treatment-cost estimator",
  description:
    "Add up the real stack of ED medication or testosterone therapy (labs, consult, medication, ancillaries) across pharmacy cash, discount card, prescriber-routed compounding, and clinic bundles, and see where the markup hides. Private, in-browser.",
  alternates: { canonical: "/tools/treatment-cost" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "ED & TRT treatment-cost estimator",
  url: URL,
  description:
    "An interactive, private estimator for the yearly cost of erectile-dysfunction medication or testosterone replacement therapy across the legitimate channels.",
  about: [
    { "@type": "MedicalCondition", name: "Erectile dysfunction" },
    { "@type": "MedicalCondition", name: "Hypogonadism" },
  ],
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
    { "@type": "ListItem", position: 3, name: "Treatment-cost estimator" },
  ],
};

export default function TreatmentCostPage() {
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
        The treatment-cost estimator
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        The molecule is the cheap part. What you pay for a year of ED medication or
        testosterone therapy is set by <strong>how many markups</strong>{" "}sit between
        you and a licensed pharmacy: the labs, the consult, the channel the script
        goes through, and the ancillaries riding along. This adds the stack up by
        channel so you can see the shape of it before you commit to any of them.
      </p>

      <MorseSOS style={{ margin: "28px 0 34px" }} />

      <TreatmentCostCalc />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Where the defaults come from
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Tablet and vial defaults are midpoints of public 2026 U.S. cash-price listings
          (
          <a href="https://www.goodrx.com/testosterone-cypionate" target="_blank" rel="noopener noreferrer">
            GoodRx
          </a>
          ,{" "}
          <a href="https://www.singlecare.com/prescription/testosterone-cypionate" target="_blank" rel="noopener noreferrer">
            SingleCare
          </a>
          ). Lab, consult, and subscription ranges match{" "}
          <Link href="/learn/what-it-costs">what it costs</Link>. The compounding-pharmacy
          line reflects a pattern that shows up consistently in practice: when a prescriber
          routes a testosterone cypionate script to a compounding pharmacy they work with,
          the cash price typically lands 10–20% under retail, and the same pharmacy can fill
          the ancillaries and other oil-based esters or blends the prescriber writes. That
          is a legitimate, prescription-only channel, not a sourcing tip.
        </p>
        <p className="sos-note">
          Not a quote and not medical advice. Which channel, which drug, and which dose
          are your prescriber&apos;s decisions. Bring the printout to that conversation.{" "}
          <Link href="/learn/product-forms">Product forms</Link>{" "}explains why the
          cheapest vial with no pharmacy behind it is the most expensive one.
        </p>
      </div>

      <Faq slug="treatment-cost" />
    </div>
  );
}
