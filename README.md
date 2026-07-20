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

## Notes

- This project uses Next.js 16 — see `AGENTS.md`; check the bundled docs in `node_modules/next/dist/docs/` before relying on older conventions.
- SEO canonical URLs are configured via `metadataBase` in `src/app/layout.tsx`.
