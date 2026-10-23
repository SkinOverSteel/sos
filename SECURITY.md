# Security policy

Skin Over Steel publishes YMYL (your-money-or-your-life) health content and
runs a community and protocol-tracking app. We take both code and content
security seriously.

## Reporting a vulnerability

Report privately through GitHub's **"Report a vulnerability"** button under this
repository's **Security** tab (Private Vulnerability Reporting). Please do not
open a public issue for a suspected vulnerability.

Include, where you can: the affected URL or component, reproduction steps, and
the impact you observed. We aim to acknowledge within a few business days.

## Dependency / supply-chain posture

- Runtime (production) dependencies are tracked by Dependabot and bumped
  promptly; see `.github/dependabot.yml`. GitHub Dependabot alerts remain
  enabled for all dependencies, dev tooling included.
- Next.js and React security releases are applied as a priority because the app
  is server-rendered (App Router). Current: `next 16.4.2`, `react`/`react-dom
  19.2.4`.

## Known, accepted advisories

Advisories we have reviewed and deliberately accept, with the reason and the
condition that would make us revisit. These are dev-only tooling issues that
never ship to users.

### GHSA-vfj7-8cjw-p6xm — `braces` stack-exhaustion DoS

- **Reviewed:** 2026-10-23
- **Reached via:** `eslint-config-next` → `@next/eslint-plugin-next` →
  `fast-glob` → `micromatch` → `braces`. Every node is a **devDependency**
  (`dev: true` in `package-lock.json`); none is in the production bundle.
- **Why accepted:**
  1. No fix exists. The advisory lists affected `<= 3.0.3` with
     **patched: None**; 3.0.3 is already the newest release and is what the
     lockfile resolves.
  2. No attack surface. `braces` only parses glob patterns supplied by our own
     ESLint configuration during `npm run lint`; it never processes
     user-, network-, or build-time untrusted input, and it does not run in
     production.
  3. The only `npm audit fix --force` path is a downgrade to
     `eslint-config-next@14.2.35`, which is incompatible with this Next 16 app's
     flat ESLint config and would break linting — a worse outcome than a
     dev-only DoS with no reachable trigger.
- **Revisit when:** `braces` ships a patched release, or `eslint-config-next`
  drops the `fast-glob`/`micromatch`/`braces` chain. At that point bump and
  remove this entry.
