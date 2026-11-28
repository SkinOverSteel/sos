import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TrackClicks } from "@/components/TrackClicks";
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

// Warm page token: colors the mobile browser chrome (address bar) before the
// manifest loads. Matches manifest theme_color/background_color (the warm
// theme's E0 cream ground).
export const viewport: Viewport = {
  themeColor: "#FAF5EE",
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
      data-theme="warm"
      className={`${archivo.variable} ${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="sos-skip">
          Skip to content
        </a>
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
              { href: "/near-me", label: "Near me", prefetch: false },
              { href: "/log", label: "The Log" },
            ].map((l) => (
              <Link key={l.href} href={l.href} prefetch={l.prefetch} className="sos-header__link">
                {l.label}
              </Link>
            ))}
          </nav>
          {/* Hard line 4: the support path is a permanent nav item, never buried. */}
          <a href="/support" className="sos-header__support">
            Get support now
          </a>
        </header>
        <main id="main" className="flex flex-1 flex-col">{children}</main>
        {/* The footer as the steel base: the warm skin ends and the whole
            site rests on the engineered material. Copper is remapped to the
            copper-on-steel tokens inside .sos-foot (see globals.css). */}
        <footer className="sos-foot">
          <div className="sos-foot__in">
            <nav className="sos-foot__nav" aria-label="Footer">
              {[
                { href: "/learn", label: "Learn" },
                { href: "/tools", label: "Tools" },
                { href: "/near-me", label: "Near me" },
                { href: "/directory", label: "Directory" },
                { href: "/log", label: "The Log" },
                { href: "/labs", label: "Lab checklists" },
                { href: "/methodology", label: "How we grade" },
                { href: "/about", label: "About" },
                { href: "/support", label: "Get support now" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  // Footer links are low-intent: don't prefetch a tool page's
                  // client chunk just because the reader reached the bottom.
                  prefetch={false}
                  {...(l.href === "/labs" ? { "data-track": "labs_entry", "data-track-from": "footer" } : {})}
                  className="sos-foot__link"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="sos-foot__copy">
              © Skin Over Steel. Education, not medical advice, written to get
              you to a clinician and never around one. We are not a pharmacy and
              we sell nothing. Where we list licensed providers we may earn a
              referral fee, disclosed at the link. A paid relationship never
              changes an evidence grade or a ranking.
            </p>
            <div className="sos-foot__sig">
              <MorseSOS dim label="Morse code S O S" />
              <Link href="/" aria-label="Skin Over Steel home" style={{ display: "inline-flex" }}>
                <WordmarkSvg height={16} style={{ color: "var(--sos-on-steel-hi)" }} />
              </Link>
              <p className="sos-foot__tag">The signal, answered.</p>
            </div>
          </div>
        </footer>
        <Analytics />
        <TrackClicks />
      </body>
    </html>
  );
}
