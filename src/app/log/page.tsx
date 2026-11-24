import type { Metadata } from "next";
import { StepHeader } from "@/components/StepHeader";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LogTool } from "@/components/LogToolLazy";
import { SITE } from "@/lib/site";
import { SignalRail } from "@/components/SignalRail";

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
    <div className="sos-container sos-log-page">
      <JsonLd data={jsonLd} />

      <div className="sos-log-intro">
        <StepHeader as="h1" step="track" title="One protocol, start to finish">
          Record a baseline, an intervention, and weekly check-ins. Print a
          one-page summary to bring to your clinician.
        </StepHeader>
        <aside className="sos-log-privacy" aria-label="Log privacy">
          <h2>Private to this browser</h2>
          <p>
            No account or sync. Download a backup before clearing browser data
            and avoid keeping a log on a shared device.
          </p>
          <p>Dosing is your prescriber&apos;s call. The Log records what you enter.</p>
        </aside>
      </div>

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
      <SignalRail className="sos-rail--close" />
    </div>
  );
}
