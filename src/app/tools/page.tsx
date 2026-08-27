import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import { JsonLd } from "@/components/JsonLd";
import { toolsHubJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free, private men's-health instruments, starting with the IIEF-5 / SHIM erectile-function self-check. They run in your browser, keep nothing, and bridge toward a clinician.",
  alternates: { canonical: "/tools" },
};

export default function ToolsHub() {
  return (
    <div className="sos-container">
      <JsonLd data={toolsHubJsonLd()} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Instruments
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Tools
      </h1>
      <p className="sos-prose" style={{ maxWidth: "60ch", marginBottom: "40px" }}>
        Small, private instruments: a validated screen, a calculator, an
        estimate. They run entirely in your browser, keep nothing, and point you
        toward a clinician rather than around one.
      </p>

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
    </div>
  );
}
