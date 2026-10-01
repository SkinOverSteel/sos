import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LogTool } from "@/components/LogTool";
import { MorseSOS } from "@/components/MorseSOS";
import { SITE } from "@/lib/site";

const URL = `${SITE.url}/log`;

export const metadata: Metadata = {
  title: "The Log: a private protocol tracker",
  description:
    "Track one supervised ED or testosterone protocol from baseline through weekly check-ins to outcome, entirely in your browser, and print a one-page summary for your clinician.",
  alternates: { canonical: "/log" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The Log: a private protocol tracker",
  url: URL,
  description:
    "A browser-local n=1 tracker for a prescribed sexual-health protocol: baseline, intervention, weekly IIEF-5 item ratings, outcome, and a printable clinician summary.",
  audience: { "@type": "Patient" },
  author: { "@id": `${SITE.url}/#org` },
  publisher: { "@id": `${SITE.url}/#org` },
  isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website` },
  inLanguage: "en-US",
};

export default function LogPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />

      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The Log · <b>Private tracker</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        One protocol, start to finish
      </h1>

      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        Baseline, the intervention you and your prescriber chose, a short
        weekly check-in, and the outcome. Then one page you can hand to a
        clinician, with the evidence grade attached. It lives in this browser
        and nowhere else: no account, no sync, nothing sent to us.
      </p>

      <p className="sos-note" style={{ maxWidth: "60ch", marginBottom: "18px" }}>
        That also means it&apos;s only as safe as this device. Download a backup
        before you clear your browser, and don&apos;t keep a log on a shared
        computer. Dosing is always your prescriber&apos;s call; the Log records
        it, it never suggests it.
      </p>

      <MorseSOS style={{ margin: "28px 0 34px" }} />

      <LogTool />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          What the ratings are
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          The two weekly items are questions 1 and 2 of the IIEF-5 / SHIM (
          <a href="https://pubmed.ncbi.nlm.nih.gov/10637462/" target="_blank" rel="noopener noreferrer">
            Rosen RC, et al. 1999
          </a>
          ), scored on the instrument&apos;s own 1&ndash;5 anchors so a clinician can
          read them without a key. Baseline and outcome take the full score
          from <Link href="/tools/erectile-function-score">the self-check</Link>.
        </p>
        <p className="sos-note">
          A log is one person&apos;s experience and carries the Anecdote grade.
          It is a conversation aid, not medical advice; if something feels wrong
          during a protocol, <Link href="/support">get support now</Link>.
        </p>
      </div>
    </div>
  );
}
