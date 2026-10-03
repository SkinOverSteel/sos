# skinoversteel.com

Website for **Skin Over Steel** (SOS) — a men's health platform covering sexual health, hormonal optimization, and harm reduction, with evidence-graded editorial content and a vetted provider directory.

- **Canonical domain:** <https://skinoversteel.com> (www → non-www redirect handled at the host/Vercel level)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Hosting:** Vercel

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)                   |
| `npm run build` | Production build                                   |
| `npm run start` | Serve the production build                         |
| `npm run lint`  | Run ESLint                                         |
| `npm run gsc`   | Google Search Console report (`scripts/gsc-report.mjs`) |
| `npm run test:e2e` | Playwright browser tests against the production build (`e2e/`) |
| `npm run data:upload` | Push the Near Me data shards to Vercel Blob (`scripts/upload-nearme-data.mjs`) |

## Repository structure

| Path        | Contents                                            |
| ----------- | --------------------------------------------------- |
| `src/`      | Application code (App Router pages, components, `lib/`) |
| `public/`   | Static assets                                       |
| `brand/`    | Brand assets and design references                  |
| `scripts/`  | Operational scripts (GSC reporting)                 |
| `e2e/`      | Playwright browser tests (the Log flow, brand-voice copy lint) |
| `.github/`  | CI: lint, typecheck, build, browser tests on every PR |
| `.claude/`  | Claude Code configuration                           |
| `CLAUDE.md` | Project context for Claude Code                     |
| `AGENTS.md` | Agent instructions, incl. Next.js 16 conventions    |

## Affiliate link mechanism

Consumer-facing disclosure lives on the site itself (see `src/lib/providers.ts`
and the directory components). This section documents the invariants for anyone
editing that code. Editorial ranking and referral monetization are decoupled by
design:

- A listing renders as a paid referral **only** when its tracking URL is
  present in `src/lib/providers.ts`. The same check drives both the FTC
  disclosure and `rel="sponsored nofollow"`, so a tracking link can never
  ship without its disclosure. Without a URL, the listing links direct and
  shows as editorial.
- Issued links live in `src/lib/providers.ts` so they are reviewable in the
  diff. `providerLink()` reads whatever string `affiliateUrl` holds, so a
  `NEXT_PUBLIC_*` environment variable set in Vercel works for links that
  shouldn't be committed (env vars are inlined at build time — a change
  requires a redeploy either way).
- Tracking links are used exactly as issued. Their query params carry the
  attribution — never rewrite them, never route them through an internal
  redirect.
- **Ranking never reads affiliate status.** See `trustScore` in
  `src/lib/providers.ts`.

## Near Me data (Vercel Blob)

The Near Me map and lookup read ~40 MB of data shards (hex layers, POIs per
state, zip centroids) that the ETL writes to `public/data/nearme/`. In
production they are served from a Vercel Blob store under the same relative
paths, so the repo does not carry them:

1. Create a Blob store (Vercel → Storage) and pull `BLOB_READ_WRITE_TOKEN`.
2. After a dataset rebuild: `BLOB_READ_WRITE_TOKEN=… npm run data:upload`
   (idempotent; `--prune` removes stale files, `--dry-run` lists changes).
3. Set `NEXT_PUBLIC_NEARME_DATA_BASE` in Vercel (Production + Preview) to the
   base URL the script prints, e.g.
   `https://<store>.public.blob.vercel-storage.com/data/nearme`, and redeploy.

`public/data/nearme/` is gitignored: the ETL writes it locally and the upload
publishes it. Unset, the app reads the local copies (after running the ETL);
CI sets the variable to the public store URL, which needs no token. The small
build-time summaries (`src/data/nearme/*.json`) stay in git.

## Notes

- This project uses Next.js 16 — see `AGENTS.md`; check the bundled docs in
  `node_modules/next/dist/docs/` before relying on older conventions.
- SEO canonical URLs are configured via `metadataBase` in `src/app/layout.tsx`.
