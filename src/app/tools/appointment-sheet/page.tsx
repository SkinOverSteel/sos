import type { Metadata } from "next";
import Link from "next/link";
import { AppointmentSheet } from "@/components/AppointmentSheet";
import { JsonLd } from "@/components/JsonLd";
import { MorseSOS } from "@/components/MorseSOS";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/tools/appointment-sheet`;
const TITLE = "Appointment sheet: what to bring to a urology or men's-health visit";
const DESCRIPTION =
  "Put what changed, your SHIM score, everything you take, the labs you have and your questions on one printed page before an erectile-function or testosterone appointment. Private: nothing is saved or sent.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools/appointment-sheet" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  url: URL,
  description: DESCRIPTION,
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
    { "@type": "ListItem", position: 3, name: "Appointment sheet" },
  ],
};

const crumb: React.CSSProperties = { color: "var(--sos-text-md)", textDecoration: "none" };

export default function AppointmentSheetPage() {
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
            <Link href="/" style={crumb}>Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link href="/tools" style={crumb}>Tools</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" style={{ color: "var(--sos-text-lo)" }}>
            Appointment sheet
          </li>
        </ol>
      </nav>

      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Tools · <b>Worksheet</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The appointment sheet
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "14px" }}>
        The visit is short, and the most useful part of it is what you tell
        the clinician. Write it down the night before: what changed, what you
        take, what results you have, and what you want answered. Then print
        one page and hand it over.
      </p>
      <p className="sos-note" style={{ maxWidth: "62ch" }}>
        Nothing you type here is saved or sent. It stays in this tab until you
        print it or close it. The reasoning behind each section is in{" "}
        <Link href="/learn/urologist-visit">the urologist visit, on your terms</Link>.
      </p>

      <MorseSOS style={{ margin: "28px 0 34px" }} />

      <AppointmentSheet />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Important note
        </p>
        <p className="sos-note">
          A conversation aid, not medical advice. The sheet records your own
          history and questions; it does not suggest a test, a treatment or a
          dose. If something is wrong right now,{" "}
          <Link href="/support">get support now</Link>.
        </p>
      </div>
    </div>
  );
}
