import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { getLabCostGuide, labCostGuides } from "@/lib/lab-cost-guides";
import { SITE } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return labCostGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLabCostGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/labs-and-cost/${guide.slug}` },
  };
}

export default async function LabCostGuidePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const guide = getLabCostGuide(slug);
  if (!guide) notFound();

  const url = `${SITE.url}/guides/labs-and-cost/${guide.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: guide.title,
        url,
        description: guide.description,
        audience: { "@type": "Patient" },
        author: { "@id": `${SITE.url}/#org` },
        publisher: { "@id": `${SITE.url}/#org` },
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={jsonLd} />

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <p className="sos-kicker m-0">{guide.kicker}</p>
          <EvidenceBadge grade={guide.evidenceGrade} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{guide.title}</h1>
        <p className="mt-3 text-base opacity-85">{guide.description}</p>
      </header>

      {/* Interactive Handoff CTA */}
      <div className="mb-8 rounded-lg border border-current/20 bg-black/[0.03] p-5">
        <p className="text-sm font-semibold mb-2">Interactive Tool Handoff</p>
        <p className="text-sm opacity-80 mb-4">
          Launch the calculator pre-loaded with this scenario—everything runs
          privately in your browser.
        </p>
        <Link
          href={guide.handoff.href}
          data-track="tool_launched"
          data-track-scenario={guide.handoff.scenario}
          className="sos-btn sos-btn--primary inline-block"
        >
          {guide.handoff.label}
        </Link>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {guide.sections.map((sec) => (
          <section key={sec.heading}>
            <h2 className="text-xl font-semibold mb-2">{sec.heading}</h2>
            <p className="sos-prose text-base leading-relaxed">{sec.body}</p>
            {sec.bullets && (
              <ul className="list-disc pl-6 mt-3 space-y-1.5 text-base">
                {sec.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* FAQs */}
      {guide.faqs.length > 0 && (
        <section className="mt-10 pt-8 border-t border-current/15">
          <h2 className="text-xl font-semibold mb-4">Common Questions</h2>
          <dl className="space-y-4">
            {guide.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-base">{f.q}</dt>
                <dd className="mt-1 text-sm opacity-85">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Sources */}
      <section className="mt-10 pt-6 border-t border-current/15 text-sm">
        <h2 className="font-semibold mb-2">Named Sources</h2>
        <ul className="space-y-1 opacity-80">
          {guide.sources.map((s) => (
            <li key={s.label}>
              <strong>{s.label}:</strong> {s.citation}
            </li>
          ))}
        </ul>
      </section>

      {/* Educational Disclaimer */}
      <footer className="mt-8 rounded-lg border border-current/15 p-4 text-xs opacity-80">
        {guide.disclaimer}
      </footer>
    </main>
  );
}
