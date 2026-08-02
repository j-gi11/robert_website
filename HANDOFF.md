# Handing this to a cheap model

`IMPLEMENTATION_PLAN.md` is the human reference. Do **not** paste it whole
into a model, and do not paste it five times. This file is how to feed it out
in slices that cost the least and still land the intended output.

Measured sizes for this repo:

| | words | ≈ tokens |
|---|---|---|
| `IMPLEMENTATION_PLAN.md` entire | 2,700 | ~3,900 |
| `src/data/*.ts` + `theme.ts` (with comments) | 2,050 | ~3,000 |
| §7 Pages alone (the bulk) | 1,055 | ~1,500 |
| One page subsection (§7.1–7.4) | ~260 | ~380 |
| The contract block below | — | ~450 |

Naive approach — paste plan + data layer on all five build steps — costs
about **34,500 input tokens**. The sliced approach below costs about
**11,000**, and under a third of that after prompt caching. Same output.

---

## Rule 0 — does the model have file access?

This is the biggest fork, worth more than every other optimisation combined.

**Agentic tools (Claude Code, Cursor, Copilot agent mode, Aider)** — they can
read the repo. Never paste anything. A complete task prompt is two sentences:

```
Read IMPLEMENTATION_PLAN.md §4, §6 and src/theme.ts, then create
src/components/Header.tsx + Header.module.css implementing §6 "Desktop
header" and "Mobile header". Import all colours from theme.ts and all
strings from src/data/site.ts. Output only those two files.
```

~60 tokens. The model pulls exactly what it needs and nothing else. **If your
cheap model can read files, stop here — the rest of this document is for
chat-only models.**

**Chat-only (web UI, raw API)** — you must paste. Use the slicing below.

---

## Rule 1 — one build step per conversation

§10 of the plan already orders the work into five steps. Each is a separate
request. Never ask for two.

Cheap models degrade sharply with output length; a request for "the Credits
page and the Artist page" produces two mediocre pages instead of one good
one. It also means a failure costs you one step, not the whole site.

## Rule 2 — send only the sections that step needs

| Build step | Plan sections to paste | ≈ tokens |
|---|---|---|
| 1 Foundation | §1, §2, §4, §5, §6 | 1,250 |
| 2 Home | §4, §7.1 | 700 |
| 3 About + form | §4, §7.4, §8 | 900 |
| 4 Credits | §4, §7.3, plus the contract block | 1,300 |
| 5 Artist | §4, §7.2 | 700 |

§4 (design tokens) recurs because every step needs the palette. §3, §9, §11
fold into the preamble below. §12 is for you, not the model — never send it.

## Rule 3 — put the stable part first

Structure every prompt as **[preamble] → [sections] → [task]**, with the
preamble byte-identical each time. On the Anthropic API that makes it a
cacheable prefix, so steps 2–5 pay roughly a tenth for it. Even without
caching, a fixed preamble keeps the model's conventions from drifting between
steps.

## Rule 4 — paste the contract, not the data files

The files under `src/data/` are ~3,000 tokens, mostly explanatory comments
aimed at a human. A model only needs the shape. This block is ~450 tokens and
carries the same information:

````
// src/data/site.ts
export const site: { name, personName, shortName, role, location, domain,
  url, email, emailHref, description: string
  instagram: { handle, display, displayCaps, url: string }
  formEndpoint: string | null }
export const SERVICES = ['Spotify','Apple Music','Bandcamp','YouTube','SoundCloud']
export type Service = (typeof SERVICES)[number]

// src/theme.ts
export const palette = { bg:'#f4f4f4', ink:'#111111', green:'#17914f',
  crimson:'#bf0a34', navy:'#123a70', purple:'#8c00fa', gold:'#ffc627' }
export type PaletteKey = keyof typeof palette
export const accent = { primary, secondary: string }
export const font = { display, mono: string }
export const FONT_HREF: string
export const bp = { tablet: 768, desktop: 1200 }
export const media = { tablet, desktop, hover, reducedMotion: string }
export function placeholderFill(color?: string): string

// src/data/taxonomy.ts
export const GROUPS: { key, label, color: string; roles: string[] }[]
  // keys: 'musician' | 'production' | 'engineering'
export type GroupKey, Role
export function groupsOf(roles: readonly Role[]): GroupKey[]
export function matchesFilter(roles: readonly Role[], active: readonly GroupKey[]): boolean
  // AND across groups; empty active = show all. USE THIS, do not reimplement.

// src/data/credits.ts
export interface Credit { slug, artist, title: string; format: 'Album'|'EP'|'Single'
  roles: Role[]; links: Partial<Record<Service,string>>; year: number; color: PaletteKey }
export const CREDITS: Credit[]
export const creditTitle: (c: Credit) => string  // "Artist, Title • EP"
export const creditRoles: (c: Credit) => string  // "Producer, Trumpet"

// src/data/gigs.ts
export interface Gig { slug, startsAt, venue, city, action: string; url: string | null }
export const GIGS: Gig[]
export function formatGigDate(startsAt: string): string  // "SEP 12, 2026 · 8:00 PM"
export function upcoming(now?: Date): Gig[]
export function past(now?: Date): Gig[]

// src/data/images.ts
export function image(folder: 'credits'|'gigs'|'hero'|'misc', slug?: string): string | undefined
  // undefined is NORMAL — render the placeholder, never a broken <img>.
  // hero slugs: 'session' | 'gig' | 'control-room' | 'live'
````

## Rule 5 — constrain the output explicitly

Cheap models pad. Unprompted they will add a README, a test file, install a UI
library, and explain their reasoning at length — all of it tokens you pay for
and then delete. The DON'T list in the preamble is doing real work; keep it.

## Rule 6 — verify with the compiler, not the model

Don't spend tokens asking a model to review its own output. Run:

```
npm run build
```

and paste any errors straight back with no commentary. That loop is nearly
free and catches more than a self-review will. Only escalate to a stronger
model when the same error survives two rounds.

---

## The preamble — paste verbatim, unchanged, every time

```
You are implementing a static portfolio site. React 19 + TypeScript, built by
Vite 6, styled with CSS Modules, deployed to GitHub Pages. No backend, no data
fetching, no CMS.

CONVENTIONS — these are hard requirements:
- Never hardcode a colour. Import from src/theme.ts.
- Never hardcode a name, email, Instagram handle or URL. Import from
  src/data/site.ts.
- Content comes from src/data/*.ts, imported at build time.
- Images resolve via image(folder, slug) and may return undefined. That is a
  normal state: render a diagonal-stripe placeholder, never a broken image.
- Mobile-first CSS. Breakpoints 768px and 1200px.
- Every hover behaviour needs a touch equivalent.
- Everything is square-cornered EXCEPT filter pills, CTA buttons and form
  fields, which are fully rounded. This contrast is deliberate.
- Keyboard-operable with visible focus rings. Honour prefers-reduced-motion.

DON'T:
- Don't add dependencies. React, react-dom and react-router-dom only.
- Don't add Tailwind, styled-components, or any UI or animation library.
- Don't write tests, READMEs, comments explaining what code does, or a summary.
- Don't modify files outside the ones you were asked for.
- Don't restate the spec back to me.

OUTPUT: complete files only, each in its own fenced block labelled with its
full path. No diffs or patches — always the whole file. No prose before or
after.
```

## Task lines

Append one of these after the pasted sections. Step 1 first; each assumes the
previous landed.

```
1. Create src/styles/global.css (CSS reset, the Google Fonts <link> goes in
   index.html, tokens from theme.ts mirrored as :root custom properties),
   src/App.tsx with the router and the four routes, and
   src/components/: Header.tsx, MobileMenu.tsx, Footer.tsx,
   InstagramGlyph.tsx, Placeholder.tsx, Image.tsx — each with a
   .module.css. Route files may be one-line stubs.

2. Create src/routes/Home.tsx + Home.module.css per §7.1. Hero photo slugs
   are session, gig, control-room, live.

3. Create src/routes/About.tsx + About.module.css per §7.4, and
   src/components/BookingForm.tsx + .module.css per §8. Implement both
   branches of site.formEndpoint (null and set).

4. Create src/components/FilterBar.tsx, CreditTile.tsx, ListenModal.tsx and
   src/routes/Credits.tsx, each with a .module.css, per §7.3. All five modal
   close paths are required. Use matchesFilter() from taxonomy.ts.

5. Create src/routes/Artist.tsx + Artist.module.css per §7.2, using
   upcoming(), past() and formatGigDate() from gigs.ts.
```

## Where a cheap model will actually fail

Spend your review attention here rather than reading every line:

1. **Filter logic** — it will reimplement `matchesFilter` as OR. Check that
   selecting two pills narrows rather than widens the grid.
2. **Modal close paths** — the browser-back one (§7.3) gets skipped almost
   every time. Test all five.
3. **Hardcoded strings** — the email and handle will get inlined somewhere.
   `grep -rn "robertrossrecording\|#bf0a34" src --include=*.tsx` should return
   nothing.
4. **Missing-image handling** — it will render `<img src={undefined}>`.
   Confirm the placeholder path works by testing with an empty assets folder.
5. **Touch equivalents** — desktop hover gets built, the mobile counterpart
   quietly doesn't. Check the home grid and the credit tiles at <768px.

If a step fails twice, hand that one step to a stronger model rather than
continuing to iterate. Steps 4 and 1 are the likeliest to need it.
