import { faqs } from "@/lib/faqs";
import { JsonLd } from "@/components/JsonLd";

/**
 * Visible "Common questions" section for an article, plus matching FAQPage
 * structured data built from the same source. Google requires FAQ markup to
 * reflect content that is visible on the page, so both come from one place.
 */
export function Faq({ slug }: { slug: string }) {
  const items = faqs[slug];
  if (!items?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      aria-label="Common questions"
      style={{
        marginTop: "48px",
        paddingTop: "28px",
        borderTop: "1px solid var(--sos-line-soft)",
      }}
    >
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "18px" }}>
        Common questions
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {items.map((f) => (
          <div key={f.q}>
            <h3
              className="sos-h2"
              style={{ fontSize: "16px", textTransform: "none", marginBottom: "8px" }}
            >
              {f.q}
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
