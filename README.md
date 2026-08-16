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

Referral relationships run through affiliate networks (currently Impact,
impact.com). The verification tag Impact requires is emitted from
`src/app/layout.tsx`.

A listing only renders as a paid referral once its tracking URL is present —
the same check drives both the FTC disclosure and `rel="sponsored nofollow"`,
so a tracking link can never ship without its disclosure. Until the URL is set,
the listing links direct and shows as editorial.

| Env var | Provider |
|---|---|
| `NEXT_PUBLIC_AFF_LABCORP_ONDEMAND` | Labcorp OnDemand (Impact) |

Set these in Vercel → Project → Settings → Environment Variables (or in a local
`.env.local`), then redeploy — `NEXT_PUBLIC_*` values are inlined at build time.
Ranking never uses affiliate status: see `trustScore` in `src/lib/providers.ts`.

## Notes

- This project uses Next.js 16 — see `AGENTS.md`; check the bundled docs in `node_modules/next/dist/docs/` before relying on older conventions.
- SEO canonical URLs are configured via `metadataBase` in `src/app/layout.tsx`.
