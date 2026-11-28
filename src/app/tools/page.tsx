import type { Metadata } from "next";
import { StepHeader } from "@/components/StepHeader";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { JsonLd } from "@/components/JsonLd";
import { toolsHubJsonLd } from "@/lib/jsonld";
import { SignalRail } from "@/components/SignalRail";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, private men's-health instruments: the SHIM (IIEF-5) erectile-function score, a bioavailable testosterone calculator, a treatment cost estimator, and a printable appointment sheet. They run in your browser. Some results are saved there for visit prep.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHub() {
  return (
    <div className="sos-container">
      <JsonLd data={toolsHubJsonLd()} />
      <StepHeader as="h1" step="measure" title="Turn the worry into a number" className="sos-page-head">
        Screen, calculate, estimate costs, or prepare for an appointment. The
        self-check and testosterone calculator save results in this browser for
        visit prep.
      </StepHeader>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {tools.map((t) => {
          const inner = (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "10px",
                }}
              >
                <span className="sos-kicker">
                  {t.status === "live" ? t.kind : `${t.kind} · In development`}
                </span>
              </div>
              <h2
                className="sos-h2"
                style={{ fontSize: "19px", textTransform: "none", marginBottom: "8px" }}
              >
                {t.title}
              </h2>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                {t.blurb}
              </p>
            </>
          );

          return t.status === "live" ? (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="sos-card"
              style={{ display: "block", textDecoration: "none" }}
            >
              {inner}
            </Link>
          ) : (
            <div
              key={t.slug}
              className="sos-card"
              style={{ opacity: 0.55 }}
              aria-disabled="true"
            >
              {inner}
            </div>
          );
        })}
      </div>
      <p className="sos-note" style={{ marginTop: "22px" }}>
        Need the numbers before a tool is any use?{" "}
        <Link href="/labs" data-track="labs_entry" data-track-from="tools">
          The lab checklists
        </Link>{" "}
        list which blood tests belong to which conversation, and why.
      </p>
      <SignalRail className="sos-rail--close" />
    </div>
  );
}
