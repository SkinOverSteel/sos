import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { LabsCallout } from "@/components/LabsCallout";
import { MorseSOS } from "@/components/MorseSOS";
import { SignalRail } from "@/components/SignalRail";
import { LAB_PANELS, LAB_SOURCES } from "@/lib/labs";
import { SITE } from "@/lib/site";

const TITLE = "Lab checklists: testosterone baseline, on-therapy monitoring, ED workup";
const DESCRIPTION =
  "Which blood tests belong to a testosterone baseline, to monitoring on testosterone therapy, and to an ED workup, each with a one-line reason and its source. A checklist to take to a clinician.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/labs" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  url: `${SITE.url}/labs`,
  description: DESCRIPTION,
  audience: { "@type": "Patient" },
  author: { "@id": `${SITE.url}/#org` },
  publisher: { "@id": `${SITE.url}/#org` },
  isPartOf: { "@type": "WebSite", "@id": `${SITE.url}/#website` },
  inLanguage: "en-US",
};

export default function LabsPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        The workup · <b>Checklists</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What gets drawn, and why
      </h1>
      <p style={{ margin: "0 0 18px" }}>
        <EvidenceBadge grade="established" />
      </p>
      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "14px" }}>
        Three checklists for three conversations. Each line names a test, says
        in one sentence what it is for, and points to where that comes from.
        Take the list to your clinician, or use it to check that the panel
        you were handed covers what it should.
      </p>
      <p className="sos-note" style={{ maxWidth: "62ch" }}>
        A checklist, not an order set and not a diagnosis. Which tests you
        need, and what the results mean for you, is a clinician&apos;s call.{" "}
        <Link href="/learn/read-your-labs">Read your labs</Link> explains each
        marker.
      </p>

      <nav aria-label="Checklists" className="sos-labs__nav">
        {LAB_PANELS.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="sos-chip">
            {p.title}
          </a>
        ))}
      </nav>

      <MorseSOS style={{ margin: "28px 0 8px" }} />

      {LAB_PANELS.map((panel) => (
        <section key={panel.id} id={panel.id} className="sos-labs__panel" aria-labelledby={`${panel.id}-h`}>
          <h2 id={`${panel.id}-h`} className="sos-home__title sos-labs__title">
            {panel.title}
          </h2>
          <p className="sos-prose sos-labs__lede">{panel.lede}</p>
          <ul className="sos-labs__list">
            {panel.items.map((item) => {
              const src = LAB_SOURCES[item.source];
              return (
                <li key={item.name} className="sos-labs__item">
                  <span className="sos-labs__box" aria-hidden="true" />
                  <div>
                    <p className="sos-labs__name">{item.name}</p>
                    {item.when ? <p className="sos-labs__when">{item.when}</p> : null}
                    <p className="sos-labs__why">{item.why}</p>
                    <p className="sos-labs__src">
                      Source:{" "}
                      {src.external ? (
                        <a href={src.href} target="_blank" rel="noopener noreferrer">
                          {src.label}
                        </a>
                      ) : (
                        <Link href={src.href}>{src.label}</Link>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          {panel.id === "baseline" ? (
            <p className="sos-note">
              Have total testosterone and SHBG already?{" "}
              <Link href="/tools/free-testosterone">Estimate free testosterone</Link>.
            </p>
          ) : null}
          {panel.id === "on-therapy" ? (
            <p className="sos-note">
              If hematocrit is climbing, see{" "}
              <Link href="/learn/trt-high-hematocrit">high hematocrit on TRT</Link>.{" "}
              <Link href="/log">The Log</Link> dates these checkpoints from the
              day you started.
            </p>
          ) : null}
          {panel.id === "ed-workup" ? (
            <p className="sos-note">
              The other four steps are in{" "}
              <Link href="/learn/ed-workup">the ED workup, start to finish</Link>.
            </p>
          ) : null}
        </section>
      ))}

      <LabsCallout variant="baseline" />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Testosterone diagnosis and monitoring items are from Bhasin S, et al.
          Testosterone Therapy in Men With Hypogonadism: An Endocrine Society
          Clinical Practice Guideline.{" "}
          <a href={LAB_SOURCES.es2018.href} target="_blank" rel="noopener noreferrer">
            J Clin Endocrinol Metab. 2018;103(5):1715&ndash;1744
          </a>{" "}
          (recommendations 1.1&ndash;1.4 and 2.3, and Table 9). Items marked
          with a library article repeat what that article publishes under its
          own sources.
        </p>
        <p className="sos-note">
          General education, not medical advice. Dose targets and adjustments
          are left out on purpose: those belong to your prescriber.
        </p>
      </div>
      <SignalRail className="sos-rail--close" />
    </div>
  );
}
