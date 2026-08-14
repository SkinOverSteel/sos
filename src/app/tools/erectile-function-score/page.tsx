import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ShimTool } from "@/components/ShimTool";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/erectile-function-score`;

export const metadata: Metadata = {
  title: "Erectile function self-check (SHIM / IIEF-5)",
  description:
    "A free, private erectile-function self-check using the validated 5-item IIEF-5 (SHIM) questionnaire. Score it in two minutes — your answers never leave your device — then see what to do next.",
  alternates: { canonical: "/tools/erectile-function-score" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Erectile function self-check (SHIM / IIEF-5)",
  url: URL,
  description:
    "An interactive, private self-check for erectile function based on the validated 5-item International Index of Erectile Function (IIEF-5 / SHIM).",
  about: { "@type": "MedicalCondition", name: "Erectile dysfunction" },
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
    { "@type": "ListItem", position: 3, name: "Erectile function self-check" },
  ],
};

export default function ErectileFunctionScorePage() {
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
        Tools · <b>Self-assessment</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The erectile-function self-check
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        This is the <strong>IIEF-5</strong> — also called the SHIM — a five-question
        screen that clinicians use to gauge erectile function. It takes about two
        minutes. It won&apos;t diagnose anything; what it does is turn a vague worry
        into a number you can actually bring to a clinician, and point you at the
        right next step.
      </p>

      <div className="sos-morse" style={{ margin: "28px 0 34px" }} aria-hidden="true">
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
        <i className="dash" />
        <i className="dash" />
        <i className="dash" />
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
      </div>

      <ShimTool />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Source &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          The instrument is the 5-item International Index of Erectile Function
          (IIEF-5 / SHIM):{" "}
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/10637462/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rosen RC, et al. Int J Impot Res. 1999
          </a>
          . Scoring bands follow the validated cut-points; see also{" "}
          <a
            href="https://www.ncbi.nlm.nih.gov/books/NBK562253/"
            target="_blank"
            rel="noopener noreferrer"
          >
            StatPearls: Erectile Dysfunction
          </a>
          .
        </p>
        <p className="sos-note">
          A screening score is not a diagnosis and not medical advice. It can&apos;t
          examine you, and it can&apos;t see the cause. Diagnosis and treatment
          belong to a licensed clinician —{" "}
          <Link href="/learn/ed-workup">the workup</Link> is how the cause actually
          gets found.
        </p>
      </div>

      <Faq slug="erectile-function-score" />
    </div>
  );
}
