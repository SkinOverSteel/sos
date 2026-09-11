import type { NextConfig } from "next";
import path from "node:path";

// Content Security Policy.
// - Next.js hydration + JSON-LD blocks are inline scripts, so 'unsafe-inline' is
//   required for script-src without a nonce (a nonce would force dynamic rendering
//   and defeat static prerendering). 'unsafe-eval' is deliberately NOT allowed.
// - Fonts are self-hosted via next/font, so no external font origins.
// - Vercel Analytics loads from va.vercel-scripts.com and posts to
//   vitals.vercel-insights.com.
// - No iframes, remote images, external fetches, blobs, or workers are used.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    // Pin the workspace root to this project so Next doesn't pick up the
    // stray package-lock.json in the parent home directory.
    root: path.join(__dirname),
  },
  images: {
    // No remote images are used; keep the optimizer closed to third-party hosts.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  async redirects() {
    return [
      {
        // Consolidated into the enhancement map (2026-08-04).
        source: "/learn/jelqing-and-peptides",
        destination: "/learn/enhancement",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
