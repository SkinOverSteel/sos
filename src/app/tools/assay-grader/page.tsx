import type { Metadata } from "next";
import Link from "next/link";
import { AssayGrader } from "@/components/AssayGrader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LabsCallout } from "@/components/LabsCallout";
import { MorseSOS } from "@/components/MorseSOS";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/assay-grader`;

export const metadata: Metadata = {
  title: "Blood panel assay grader",
  description:
    "Grade a testosterone blood panel on the thing that actually decides whether the number is worth anything — the assay method. LC-MS/MS vs. immunoassay for total T, calculated or equilibrium-dialysis vs. direct free T. Private, in-browser.",
  alternates: { canonical: "/tools/assay-grader" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Blood panel assay grader",
  url: URL,
  description:
    "An interactive tool that grades a testosterone blood panel on assay quality — which test method it uses — rather than on price.",
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
    { "@type": "ListItem", position: 3, name: "Blood panel assay grader" },
  ],
};

export default function AssayGraderPage() {
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
          <li aria-hidden="true">›</li>
          <li aria-current="page" style={{ color: "var(--sos-text-lo)" }}>
            Blood panel assay grader
          </li>
        </ol>
      </nav>

      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Tools · <b>Grader</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Blood panel assay grader
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        Two panels can both say &ldquo;testosterone&rdquo; and mean different
        tests. The price tells you almost nothing; the{" "}
        <strong>assay method</strong> tells you whether the number can be
        trusted at the low end, where a diagnosis is actually made. Tell this
        what a panel lists and it&apos;ll grade the fit for a workup and name
        what&apos;s worth adding, before you pay.
      </p>

      <MorseSOS style={{ margin: "28px 0 34px" }} />

      <AssayGrader />

      <LabsCallout variant="baseline" />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Method &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          The grading rules follow the measurement guidance in Bhasin S, et al.{" "}
          <a href="https://doi.org/10.1210/jc.2018-00229" target="_blank" rel="noopener noreferrer">
            Testosterone Therapy in Men With Hypogonadism: An Endocrine Society
            Clinical Practice Guideline. J Clin Endocrinol Metab.
            2018;103(5):1715&ndash;1744
          </a>
          : total testosterone by LC-MS/MS or a CDC HoSt&ndash;certified assay,
          and free testosterone by equilibrium dialysis or a calculated value
          rather than a direct immunoassay.
        </p>
        <p className="sos-note">
          General education, not medical advice. This grades a test panel, not
          a person, and never interprets a result.{" "}
          <Link href="/learn/read-your-labs">Read your labs</Link> explains what
          each marker means, and{" "}
          <Link href="/learn/testosterone-test-cost">what a test costs</Link>{" "}
          lists which labs name their assay.
        </p>
      </div>

      <Faq slug="assay-grader" />
    </div>
  );
}
