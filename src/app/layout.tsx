import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteJsonLd } from "@/lib/jsonld";
import { Wordmark } from "@/components/Wordmark";
import { WordmarkSvg } from "@/components/WordmarkSvg";
import { MorseSOS } from "@/components/MorseSOS";
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

// Steel page token: colors the mobile browser chrome (address bar) before the
// manifest loads. Matches manifest theme_color/background_color.
export const viewport: Viewport = {
  themeColor: "#12161A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skinoversteel.com"),
  title: {
    default: "Skin Over Steel",
    template: "%s | Skin Over Steel",
  },
  description:
    "Evidence-graded men's sexual-health education, private self-assessment tools, and a transparent directory of licensed providers. The conversation your urologist doesn't have time for.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://skinoversteel.com",
    siteName: "Skin Over Steel",
    title: "Skin Over Steel",
    description:
      "Evidence-graded men's sexual-health education, private tools, and a transparent provider directory.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Over Steel",
    description:
      "Evidence-graded men's sexual-health education, private tools, and a transparent provider directory.",
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
        <script
          type="application/ld+json"
          // Site-wide Organization + WebSite entity graph. Content is all
          // internal constants; escape `<` defensively per JSON-LD convention.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <header className="sos-header">
          <Link href="/" className="sos-header__brand">
            <Wordmark />
          </Link>
          <nav className="sos-header__nav" aria-label="Primary">
            {[
              { href: "/learn", label: "Learn" },
              { href: "/tools", label: "Tools" },
              { href: "/near-me", label: "Near me" },
              { href: "/log", label: "The Log" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="sos-header__link">
                {l.label}
              </Link>
            ))}
          </nav>
          {/* Hard line 4: the support path is a permanent nav item, never buried. */}
          <a href="/support" className="sos-header__support">
            Support
          </a>
        </header>
        <main id="main" className="flex flex-1 flex-col">{children}</main>
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
              { href: "/log", label: "The Log" },
              { href: "/about", label: "About" },
              { href: "/support", label: "Support" },
            ].map((l) => (
              <Link
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
              </Link>
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
            © Skin Over Steel. Education, not medical advice. It bridges toward
            your clinician, never around them. Not a pharmacy and not a seller.
            Where we list licensed providers, we may earn a referral fee, always
            disclosed at the link; a paid relationship never changes an evidence
            grade or a ranking.
          </p>
          <div
            style={{
              marginTop: "36px",
              paddingTop: "24px",
              borderTop: "1px solid var(--sos-line-soft)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              textAlign: "center",
            }}
          >
            <MorseSOS dim label="Morse code S O S" />
            <Link href="/" aria-label="Skin Over Steel home" style={{ display: "inline-flex" }}>
              <WordmarkSvg height={16} />
            </Link>
            <p
              style={{
                fontFamily: "var(--sos-serif)",
                fontStyle: "italic",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--sos-copper)",
                margin: 0,
              }}
            >
              The signal, answered.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
