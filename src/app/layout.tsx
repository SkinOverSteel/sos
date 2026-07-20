import type { Metadata } from "next";
import { Archivo, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
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
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "var(--sos-copper)",
              textDecoration: "none",
            }}
          >
            Get support now
          </a>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
