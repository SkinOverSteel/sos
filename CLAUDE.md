# Skin Over Steel (SOS) — Project Brief

Men's sexual health platform: evidence-graded education + pseudonymous community
+ a protocol-tracking utility app. Heritage: private bodybuilding forum culture
circa 2004 (structured n=1 logs, earned reputation, private sections), rebuilt
as a modern, cost-effective web application. Domain target: skinoversteel.com
(NOTE: as of Jul 2026 the domain was listed for sale on GoDaddy — verify
ownership before shipping anything public).

## Positioning (the spine — do not drift from this)

- "The conversation your urologist doesn't have time for."
- Bridges TOWARD medicine, never around it. We are not "what doctors don't know."
- Trust is the product. No supplement-funnel patterns, no hype, no shame.
- ED/function content is YMYL: cite sources, named credentialed reviewers when
  available, visible evidence grades on every claim.

## Hard content lines (enforce in code, seeds, moderation, and copy)

1. NEVER dosing instructions for prescription or gray-market compounds —
   editorial or UGC.
2. NEVER how-to technique protocols for physically risky enhancement
   procedures. Risk landscape, warning signs, "when to seek care" — yes.
   Instructions — no.
3. Community guideline: "share your experience, don't prescribe to others."
4. Mental-health/crisis resources are a permanent nav item ("Get support now"),
   never buried.
5. No phallic innuendo anywhere in marks, icons, illustrations, or microcopy.
   Dignity over cleverness, always.

## Evidence grading system (brand component, render as outline badges)

- ESTABLISHED  #5FA983 (dark) / #3E7A5A (light) — guideline-level evidence
- EMERGING     #CFA145 (dark) / #A87B1E (light) — early/mixed research
- ANECDOTE     #8B95A0 (dark) / #5C6873 (light) — member n=1, fenced off
- HIGH RISK    red-family, same outline style — practices where evidence
  points to injury (spec in v2.1 addendum, not yet designed)
Badges are outline-only on dark (instrumentation, not mood). Never fill.

## Brand system (see /brand/*.html — v2 dark is canonical for the app)

Concept: "skin over steel" — warm/organic always layered OVER rigid/engineered.
SOS = Morse distress signal, claimed deliberately: "The signal, answered."
Signature device: Morse SOS pattern (··· ––– ···) as divider/loading state.

Fonts (all Google Fonts, free):
- Display/headings: Archivo variable — weight 700–850, width 78–90%, uppercase
  display. Width axis may animate for "measured progression" moments only.
- Body: Source Serif 4 — the warm human voice; italic + copper = vulnerable copy.
- Utility/data: IBM Plex Mono — logs, metadata, badges, UI instrument voice.

Dark palette (elevation system):
- E0 #12161A page · E1 #191E24 panel · E2 #21272E card · E3 #2A313A raised
- lines #333B44 / #272E36 · text #E8EAEC / #AEB6BD / #78828B
- Copper #C97438 (hover #E08A47) — the ONLY warm color, ~10% of any screen
Light palette (marketing/education pages): bg #EFF1F2 (cool, not cream),
ink #242A31, copper #B15C24, tint #F3E3D6.

Voice:
- UI = instrument voice: terse mono, factual, no confetti, no guilt.
- Editorial/community = human voice: warm, direct about anatomy and feelings,
  "talk to a clinician" framed as the smart move.
- Say: erectile function, members, evidence grade, signal, workup.
- Avoid: "performance," "manhood," "cure," "hack" (noun), guarantees.

## Product model

- Open Floor (free, public, indexable): education library w/ structured data
  (MedicalWebPage, FAQPage schema), citations — the SEO/AI-agent surface.
- The Vault (paid membership): The Log + full community + research briefs.
- Charter (earned via Signal Score, never sold): moderation, early features.
- The Log: n=1 protocol tracker. baseline → intervention → weekly metrics →
  outcome. Private by default, publishable with auto-attached evidence grade,
  one-page PDF "clinician export."
- Signal Score: earned from completed logs, citations, "signals" received
  (signals replace likes; meaning = "heard, you're not alone"). Not purchasable.
- Pseudonymity by design: auto-generated handles, initials avatars with copper
  ring, tenure marks ("member · 8 mo · 3 logs").

## Safety layer + referral/monetization model

Thesis: get ahead of the harm, put the solution front-and-center, and earn trust
that later converts to transparent referral revenue. Reducing harm IS the funnel.

- **Safety layer ("Get support now"):** harm-reduction first, permanent nav.
  Flagship = trimix priapism emergency. Prolonged erection (>4 hrs) is a true
  emergency (ischemic priapism → permanent damage). Present the PRESCRIBER's /
  pharmacy's OWN official patient instructions (e.g. Empower Pharmacy trimix
  reversal sheet), attributed, plus unambiguous ER-escalation. Frame as "follow
  your prescriber's instructions / seek emergency care" — NEVER our own
  self-administered pharmacological reversal dosing (respects hard line #1/#2).
  Mental-health/crisis resources live here too.
- **Product-form transparency (consumer protection):** teach users to read what
  they're actually buying — gray-market "ziplock of premix" (red flag) vs
  licensed-pharmacy lyophilized vial vs properly reconstituted peptide hormone —
  for bremelanotide, trimix, etc. This is a quality/safety literacy tool, NOT a
  sourcing guide for gray-market product.
- **Referral/affiliate directory (the revenue):** transparent, competitive
  directory of LICENSED providers who compete on the trust standard, never
  pay-to-rank: blood testing (androgen monitoring + insulin/metabolic panels),
  compounding pharmacies, and telemedicine (the legitimate Rx channel). FTC
  disclosure required; a paid relationship can NEVER move an evidence grade or a
  ranking. Gate every listing on legitimacy (licensed, prescription-based).
  See sibling model in american-peptide affiliate notes.
- **Drug-tier guardrail (critical — differentiate by legal status):**
  - Trimix = legitimately compounded Rx (alprostadil/papaverine/phentolamine).
    OK for education + licensed-pharmacy/telemed referral.
  - Bremelanotide = FDA-approved as Vyleesi (premenopausal women, HSDD);
    off-label in men; also compounded. Education + licensed referral with
    off-label disclosure.
  - Retatrutide = INVESTIGATIONAL (Lilly, Phase 3), NOT FDA-approved and NOT
    lawfully compoundable. EDUCATION-ONLY, EMERGING/ANECDOTE grade, explicit
    "no legitimate pharmacy channel exists" warning. Do NOT build buy/referral
    flows for it. Revisit only if it earns approval. (Verify status at build
    time — investigational status changes.)

## Build phases (cost-effective path)

Original brief suggested: 1) Open Floor static (Astro/Eleventy), 2) self-hosted
Discourse community, 3) The Log app (SvelteKit or Next + Postgres/Supabase).
Current implementation: unified on **Next.js 16** (App Router) so the static
Open Floor (SSG) and the later Log app share one stack/repo. See AGENTS.md.

## Repo conventions

- Design tokens live in /brand/tokens.css — single source of truth; both HTML
  brand guides in /brand/ are reference renderings of the same tokens.
  The Next app imports these tokens; new UI derives colors/type from tokens,
  never hardcoded hex.
- Accessibility floor: body text ≥7:1 contrast on E0–E2, visible focus states,
  prefers-reduced-motion respected (Morse loading animation must degrade to
  static).

---

@AGENTS.md
