# skinoversteel.com

Website for **skinoversteel.com** (SOS).

- **Canonical domain:** https://skinoversteel.com (www → non-www redirect handled at the host/Vercel level)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Hosting:** Vercel

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Affiliate / referral links

A listing only renders as a paid referral once its tracking URL is present —
the same check drives both the FTC disclosure and `rel="sponsored nofollow"`,
so a tracking link can never ship without its disclosure. Without a URL, the
listing links direct and shows as editorial.

| Provider | Program | Tracking link |
|---|---|---|
| Discounted Labs | direct with the provider | in `src/lib/providers.ts` |

Issued links live in `src/lib/providers.ts` so they are reviewable in the diff.
For a link that exists but shouldn't be committed, `providerLink()` reads
whatever string `affiliateUrl` holds, so a `process.env.NEXT_PUBLIC_*` value set
in Vercel → Settings → Environment Variables works too — those are inlined at
build time, so it needs a redeploy either way.

Network programs (Impact, FlexOffers) were applied to in Aug 2026 and declined
on site age; both site-verification tags have been removed, and re-applying
means re-verifying. The `"impact"` variant of `AffiliateNetwork` is kept for
when that happens.

Tracking links are used exactly as issued — their query params carry the
attribution, so never rewrite them, and never route them through an internal
redirect. Ranking never reads affiliate status: see `trustScore` in
`src/lib/providers.ts`.

## Notes

- This project uses Next.js 16 — see `AGENTS.md`; check the bundled docs in `node_modules/next/dist/docs/` before relying on older conventions.
- SEO canonical URLs are configured via `metadataBase` in `src/app/layout.tsx`.
