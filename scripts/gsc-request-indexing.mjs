// Google Indexing API — request indexing for new or updated URLs.
//
// Reads the live sitemap, diffs it against a local ledger of URLs already
// submitted, and sends URL_UPDATED notifications for the new ones, newest-first
// by sitemap order, up to the daily quota. The ledger (reports/indexing-ledger.json,
// gitignored) means re-running the script only ever submits what's new.
//
// ── Read this before relying on it ───────────────────────────────────────────
//   Google documents the Indexing API for JobPosting and BroadcastEvent pages
//   only, and says requests for other content types "may be ignored". There is
//   no official API equivalent of the Search Console "Request indexing" button.
//   Use this as a nudge on top of the sitemap, not instead of it. The sitemap
//   (https://skinoversteel.com/sitemap.xml) remains the path Google actually
//   commits to.
//
//   Default quota is 200 publish requests per day per project. The script
//   stops at --limit (default 150) to leave headroom.
//
// ── One-time setup ───────────────────────────────────────────────────────────
//   1. Google Cloud Console → same project as scripts/gsc-report.mjs → enable
//      the "Web Search Indexing API".
//   2. Search Console → property → Settings → Users and permissions → the
//      service-account email must be an OWNER (not Full/Restricted). The
//      Indexing API checks ownership, not just access.
//   3. export GSC_SA_KEY_FILE="C:/Users/waite/.secrets/<your-sa-key>.json"
//
// Run:
//   npm run gsc:index                      # submit new sitemap URLs (dry run first!)
//   npm run gsc:index -- --dry-run         # show what would be sent, send nothing
//   npm run gsc:index -- --limit=20        # cap this run
//   npm run gsc:index -- --filter=/learn/  # only URLs containing a substring
//   npm run gsc:index -- --status          # query Google's last-notification state
//   node scripts/gsc-request-indexing.mjs https://skinoversteel.com/near-me ...
//                                          # explicit URLs, ledger ignored
//   npm run gsc:index -- --force           # resubmit even if in the ledger

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createSign } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Config ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=')
      return [k, v ?? true]
    }),
)
const explicitUrls = args.filter((a) => !a.startsWith('--'))

const SITEMAP_URL = process.env.GSC_SITEMAP_URL || 'https://skinoversteel.com/sitemap.xml'
const KEY_FILE = process.env.GSC_SA_KEY_FILE
const LIMIT = Number(flags.limit || 150)
const DRY_RUN = Boolean(flags['dry-run'])
const FORCE = Boolean(flags.force)
const STATUS = Boolean(flags.status)
const FILTER = typeof flags.filter === 'string' ? flags.filter : null
const LEDGER_FILE = resolve(__dirname, '..', 'reports', 'indexing-ledger.json')

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/indexing'
const PUBLISH_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'
const METADATA_URL = 'https://indexing.googleapis.com/v3/urlNotifications/metadata'

class IndexingError extends Error {}
function fail(msg) {
  throw new IndexingError(msg)
}

// ── Auth: sign a JWT with the service account, exchange for an access token ──
function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function getAccessToken(keyFile) {
  if (!keyFile) fail('GSC_SA_KEY_FILE is not set (path to the service-account JSON).')
  let sa
  try {
    sa = JSON.parse(await readFile(resolve(keyFile), 'utf8'))
  } catch (e) {
    fail(`Could not read/parse key file at ${keyFile}: ${e.message}`)
  }
  if (!sa.client_email || !sa.private_key) {
    fail('Key file is missing client_email / private_key — is it a service-account JSON?')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  )
  const signingInput = `${header}.${claim}`
  const signature = base64url(createSign('RSA-SHA256').update(signingInput).sign(sa.private_key))

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${signingInput}.${signature}`,
    }),
  })
  const json = await res.json()
  if (!res.ok) fail(`Token exchange failed (${res.status}): ${JSON.stringify(json)}`)
  return { token: json.access_token, clientEmail: sa.client_email }
}

// ── Sitemap + ledger ─────────────────────────────────────────────────────────
async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL)
  if (!res.ok) fail(`Could not fetch sitemap ${SITEMAP_URL} (${res.status})`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
  if (urls.length === 0) fail(`No <loc> entries found in ${SITEMAP_URL}`)
  return urls
}

async function loadLedger() {
  try {
    return JSON.parse(await readFile(LEDGER_FILE, 'utf8'))
  } catch {
    return { submitted: {} }
  }
}

async function saveLedger(ledger) {
  await mkdir(dirname(LEDGER_FILE), { recursive: true })
  await writeFile(LEDGER_FILE, JSON.stringify(ledger, null, 2) + '\n')
}

// ── Indexing API ─────────────────────────────────────────────────────────────
async function publish(token, url) {
  const res = await fetch(PUBLISH_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body: json }
}

async function metadata(token, url) {
  const res = await fetch(`${METADATA_URL}?url=${encodeURIComponent(url)}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body: json }
}

function explain(status, body, clientEmail) {
  const msg = body?.error?.message || JSON.stringify(body)
  if (status === 403) {
    return (
      `${msg}\n  → ${clientEmail} must be an OWNER of the Search Console property, ` +
      `and the Web Search Indexing API must be enabled on the Cloud project.`
    )
  }
  if (status === 429) return `${msg}\n  → Daily quota exhausted. Try again tomorrow.`
  return msg
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Dry runs never touch Google, so they don't need a key.
  const { token, clientEmail } = DRY_RUN ? {} : await getAccessToken(KEY_FILE)

  // Status mode: ask Google what it last heard about each URL.
  if (STATUS) {
    if (DRY_RUN) fail('--status needs a real key; drop --dry-run.')
    const urls = explicitUrls.length ? explicitUrls : Object.keys((await loadLedger()).submitted)
    if (!urls.length) fail('Nothing to check. Pass URLs or submit some first.')
    for (const url of urls) {
      const { ok, status, body } = await metadata(token, url)
      if (ok) {
        const t = body.latestUpdate?.notifyTime || '—'
        console.log(`${url}\n  last notified: ${t}`)
      } else {
        console.log(`${url}\n  ${status}: ${explain(status, body, clientEmail)}`)
      }
    }
    return
  }

  const ledger = await loadLedger()

  let candidates
  if (explicitUrls.length) {
    candidates = explicitUrls
  } else {
    const sitemap = await fetchSitemapUrls()
    console.log(`Sitemap: ${sitemap.length} URLs`)
    candidates = sitemap
    if (!FORCE) candidates = candidates.filter((u) => !ledger.submitted[u])
    if (FILTER) candidates = candidates.filter((u) => u.includes(FILTER))
  }

  if (!candidates.length) {
    console.log('Nothing new to submit. (Use --force to resubmit ledger entries.)')
    return
  }

  const batch = candidates.slice(0, LIMIT)
  console.log(
    `${candidates.length} candidate URL(s); submitting ${batch.length}` +
      (candidates.length > batch.length ? ` (rest on the next run)` : '') +
      (DRY_RUN ? ' [DRY RUN]' : ''),
  )

  let sent = 0
  let failed = 0
  for (const url of batch) {
    if (DRY_RUN) {
      console.log(`  would send  ${url}`)
      continue
    }
    const { ok, status, body } = await publish(token, url)
    if (ok) {
      sent++
      ledger.submitted[url] = new Date().toISOString()
      console.log(`  ok          ${url}`)
    } else {
      failed++
      console.log(`  ${status}  ${url}\n  ${explain(status, body, clientEmail)}`)
      if (status === 429 || status === 403) break // no point continuing
    }
  }

  if (!DRY_RUN) {
    await saveLedger(ledger)
    console.log(`\nSent ${sent}, failed ${failed}. Ledger: ${LEDGER_FILE}`)
  }
}

main().catch((e) => {
  if (e instanceof IndexingError) {
    console.error(`\n✖ ${e.message}`)
    process.exit(1)
  }
  throw e
})
