import { createElement } from "react";
import type { Metadata } from "next";
import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteJsonLd } from "@/lib/jsonld";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skinoversteel.com"),
  title: {
    default: "Skin Over Steel",
    template: "%s | Skin Over Steel",
  },
  description:
    "Evidence-graded men's health education and a pseudonymous community. The conversation your urologist doesn't have time for.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://skinoversteel.com",
    siteName: "Skin Over Steel",
    title: "Skin Over Steel",
    description:
      "Evidence-graded men's health education and a pseudonymous community.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Over Steel",
    description:
      "Evidence-graded men's health education and a pseudonymous community.",
  },
  other: {
    // FlexOffers site verification for the affiliate/referral program. This
    // one takes a standard `content` attribute, so unlike Impact's tag (see
    // the raw element in the body) it goes through the Metadata API.
    "fo-verify": "5e0400cc-a61c-4ca9-b8a3-04b527848a62",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          Impact (impact.com) site verification for the affiliate/referral
          program. Their tag uses a `value` attribute rather than `content`,
          which the Metadata API cannot emit, so it is written raw here and
          hoisted into <head> by React.
        */}
        {createElement("meta", {
          name: "impact-site-verification",
          value: "7c2d4279-c681-4725-a6fd-da4cbe019016",
        })}
        <script
          type="application/ld+json"
          // Site-wide Organization + WebSite entity graph. Content is all
          // internal constants; escape `<` defensively per JSON-LD convention.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid var(--sos-line-soft)",
          }}
        >
          <a
            href="/"
            className="uppercase"
            style={{
              fontFamily: "var(--sos-sans)",
              fontWeight: 800,
              fontStretch: "84%",
              fontSize: "15px",
              letterSpacing: "0.02em",
              color: "var(--sos-text-hi)",
              textDecoration: "none",
            }}
          >
            Skin Over Steel
          </a>
          <a
            href="/support"
            className="uppercase"
            style={{
              fontFamily: "var(--sos-mono)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "var(--sos-text-lo)",
              textDecoration: "none",
            }}
          >
            Support
          </a>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
        <footer
          style={{
            borderTop: "1px solid var(--sos-line-soft)",
            padding: "28px 24px 40px",
            marginTop: "40px",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            {[
              { href: "/learn", label: "Learn" },
              { href: "/tools", label: "Tools" },
              { href: "/directory", label: "Find a provider" },
              { href: "/about", label: "About" },
              { href: "/methodology", label: "How we review" },
              { href: "/support", label: "Support" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "var(--sos-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "var(--sos-text-md)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p
            style={{
              fontFamily: "var(--sos-mono)",
              fontSize: "11.5px",
              lineHeight: 1.7,
              color: "var(--sos-text-lo)",
              maxWidth: "68ch",
            }}
          >
            © Skin Over Steel. Education, not medical advice — bridges toward your
            clinician, never around them. Not a pharmacy and not a seller. Where
            we list licensed providers, we may earn a referral fee, always
            disclosed at the link; a paid relationship never changes an evidence
            grade or a ranking.
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
