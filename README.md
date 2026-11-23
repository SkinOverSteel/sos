# skinoversteel.com

Website for **Skin Over Steel** (SOS) — a men's sexual-health platform pairing
evidence-graded education with a harm-reduction safety layer and a vetted,
transparent provider directory. "The conversation your urologist doesn't have
time for" — bridging toward medicine, never around it.

- **Canonical domain:** <https://skinoversteel.com> (www → non-www redirect handled at the host/Vercel level)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Hosting:** Vercel

## What's here

- **Open Floor** (`/learn`, `/methodology`, `/tools`) — the free, indexable
  education library. Every claim carries a visible evidence grade; articles
  emit `MedicalWebPage`/`FAQPage` structured data for search and AI agents.
- **Safety layer** (`/support`) — harm-reduction first and permanent in nav:
  the trimix priapism rescue ladder, "when to go to the ER", and
  mental-health/crisis resources.
- **Provider directory** (`/directory`, `/labs`, `/near-me`, `/map`) —
  licensed blood testing, compounding pharmacies, and telemedicine, ranked on a
  trust standard that never reads affiliate status (see below).
- **The Log** (`/log`) — a private n=1 protocol tracker. Baseline →
  intervention → weekly check-ins → outcome, with a one-page clinician export.
  Stored entirely in the member's browser (`localStorage`): no account, no
  sync, no network call.

Project context and the hard content/safety lines live in `CLAUDE.md`.

## Local development

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No environment variables are needed for local
development — the Near Me data and map geography are staged locally, and the DB
and newsletter features degrade gracefully when their variables are unset.

## Scripts

| Command                      | Description                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`                | Start the dev server                                                                             |
| `npm run build`              | Production build (`postbuild` runs the JSX-whitespace check)                                     |
| `npm run start`              | Serve the production build                                                                        |
| `npm run lint`               | Run ESLint                                                                                        |
| `npm run test:e2e`           | Playwright browser tests against the production build (`e2e/`)                                    |
| `npm run citations:build`    | Regenerate `src/lib/sources.ts` from each `/learn` article's Sources section (`build-citations.mjs`) |
| `npm run prices:check`       | Verify published lab prices still appear on the source product pages (`check-lab-prices.mjs`)     |
| `npm run gsc`                | Google Search Console report (`gsc-report.mjs`)                                                   |
| `npm run gsc:index`          | Request Google indexing for new/updated sitemap URLs (`gsc-request-indexing.mjs`)                 |
| `npm run data:upload`        | Push the Near Me data shards to Vercel Blob (`upload-nearme-data.mjs`)                            |
| `npm run geo:upload`         | Push the map geography outlines to Vercel Blob (`upload-geo.mjs`)                                 |
| `npm run map:preview`        | Re-render the homepage's static national map, `public/map/us-preview.svg` (`build-map-preview.mjs`); commit the result after a data refresh |
| `node scripts/build-geo.mjs` | Rebuild the static map geography in `src/data/geo/` from us-atlas (`build-geo.mjs`)               |

## Environment variables

All optional; the site builds and runs without any of them.

| Variable                       | Used by                        | Notes                                                                 |
| ------------------------------ | ------------------------------ | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_NEARME_DATA_BASE` | Near Me map/lookup             | Base URL of the Blob store for data shards. Unset → local copies.     |
| `NEXT_PUBLIC_GEO_BASE`         | Map geography                  | Base URL of the Blob store for outlines. Unset → staged locally.      |
| `BLOB_READ_WRITE_TOKEN`        | `data:upload`, `geo:upload`    | Vercel Blob write token (scripts only; not needed at runtime).        |
| `DATABASE_URL`                 | `POST /api/near-me/submit`     | Postgres. Unset → provider-suggestion submissions are accepted no-op. |
| `BUTTONDOWN_API_KEY`           | `POST /api/subscribe`          | Newsletter (Buttondown). Unset → subscribe is a no-op.                |

`NEXT_PUBLIC_*` values are inlined at build time, so changing them requires a
redeploy. See the Near Me section below for the Blob setup flow.

## API routes

| Route                   | Purpose                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| `GET  /api/health`      | Liveness endpoint for uptime monitors (dynamic, never cached).        |
| `POST /api/subscribe`   | Newsletter sign-up via Buttondown.                                    |
| `POST /api/near-me/submit` | Pending provider suggestions → Postgres (`etl/schema.sql`); no email field. |

## Repository structure

| Path        | Contents                                                |
| ----------- | ------------------------------------------------------- |
| `src/`      | Application code (App Router pages, components, `lib/`)  |
| `public/`   | Static assets                                           |
| `brand/`    | Brand assets, design references, and `tokens.css`       |
| `scripts/`  | Operational scripts (data, geo, GSC, citations, prices) |
| `etl/`      | Near Me dataset build + DB schema                       |
| `e2e/`      | Playwright browser tests (the Log flow, brand-voice copy lint) |
| `.github/`  | CI: lint, typecheck, build, browser tests on every PR   |
| `CLAUDE.md` | Project context for Claude Code                         |
| `AGENTS.md` | Agent instructions, incl. Next.js 16 conventions        |

## Affiliate link mechanism

Consumer-facing disclosure lives on the site itself (see `src/lib/providers.ts`
and the directory components). This section documents the invariants for anyone
editing that code. **Editorial ranking and referral monetization are decoupled
by design:**

- A listing renders as a paid referral **only** when its tracking URL is
  present in `src/lib/providers.ts`. The same check drives both the FTC
  disclosure and `rel="sponsored nofollow"`, so a tracking link can never
  ship without its disclosure. Without a URL, the listing links direct and
  shows as editorial.
- Issued links live in `src/lib/providers.ts` so they are reviewable in the
  diff. `providerLink()` reads whatever string `affiliateUrl` holds, so a
  `NEXT_PUBLIC_*` environment variable set in Vercel works for links that
  shouldn't be committed.
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

The map's geography layer is separate from those shards. Simplified US land,
state, and county outlines (~1 MB) sit under the hex grid as a coastline and
state-line backdrop. The source is committed in `src/data/geo/`; they rarely
change, so regenerate them from us-atlas with `node scripts/build-geo.mjs` if
the boundaries need a refresh. Like the shards, they are served from the Blob
store in production so they stay out of each deployment's build output:

1. `BLOB_READ_WRITE_TOKEN=… npm run geo:upload` (idempotent; `--dry-run`
   lists changes). Prints the base URL.
2. Set `NEXT_PUBLIC_GEO_BASE` in Vercel (Production + Preview) to it, e.g.
   `https://<store>.public.blob.vercel-storage.com/geo`.

Unset, `scripts/stage-geo.mjs` (run on `predev`/`prebuild`) copies the
outlines into `public/geo/` so they serve same-origin — dev, CI, and any build
without the variable keep working with no token. `public/geo/` is gitignored.
The Blob host is already in the CSP `connect-src` for the shards, and the
outlines are fetched by the browser, so an upload is live without a redeploy.

## Notes

- This project uses Next.js 16 — see `AGENTS.md`; check the bundled docs in
  `node_modules/next/dist/docs/` before relying on older conventions.
- SEO canonical URLs are configured via `metadataBase` in `src/app/layout.tsx`.
- Design tokens are the single source of truth in `brand/tokens.css`; derive
  new UI colors and type from tokens, never hardcoded hex.
