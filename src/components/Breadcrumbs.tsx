import Link from "next/link";
import { articles } from "@/lib/articles";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

/**
 * Visible breadcrumb trail (Home › Learn) plus matching BreadcrumbList
 * structured data. The current article is the final crumb in the markup
 * (its H1 is the visible "you are here"), with no link per convention.
 */
export function Breadcrumbs({ slug }: { slug: string }) {
  const title = articles.find((a) => a.slug === slug)?.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE.url}/learn` },
      ...(title ? [{ "@type": "ListItem", position: 3, name: title }] : []),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
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
            <Link href="/learn" style={{ color: "var(--sos-text-md)", textDecoration: "none" }}>
              Learn
            </Link>
          </li>
        </ol>
      </nav>
    </>
  );
}
