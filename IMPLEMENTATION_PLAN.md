# Robert Ross Recording — Implementation Plan

Build spec for `robertrossrecording.com`. Written to be handed to an
implementer who has not seen the mockup. Everything needed is either in this
document or in the files it points at.

**Source of the design:** a Claude Design mockup (`Robert Ross Recording - UI
Mockup.dc.html`) plus a written architecture plan. Both are already distilled
into this document — you do not need them.

---

## 1 · Stack and constraints

| | |
|---|---|
| Framework | React 19 + TypeScript, built by Vite 6 |
| Routing | `react-router-dom` v7 |
| Styling | **CSS Modules** (`*.module.css`) — built into Vite, no runtime, no dependency |
| Hosting | **GitHub Pages** — fully static, no server, no Node at runtime |
| Content | Hand-edited TypeScript data files. No CMS. |

Hard constraints that shape everything below:

- **No backend.** The booking form must post to a third-party endpoint or fall
  back to `mailto:`. There is nowhere to run server code.
- **No client-side data fetching.** All content is imported at build time.
- **Static routes only.** Four pages, known at build time.

The repo currently holds only the data layer and tokens (§3, §4) plus a
placeholder `App.tsx`. Everything else is yours to create.

---

## 2 · Target file structure

```
src/
  main.tsx                    exists — wires React root
  App.tsx                     exists as a stub — replace with the router
  theme.ts                    exists — design tokens, do not duplicate values
  vite-env.d.ts               exists
  data/
    site.ts                   exists — identity strings, SINGLE SOURCE OF TRUTH
    taxonomy.ts               exists — filter groups + role→group derivation
    credits.ts                exists — sample credit entries
    gigs.ts                   exists — sample gig dates
    images.ts                 exists — slug → hashed asset URL
  assets/
    README.md                 exists — image conventions
    credits/ gigs/ hero/ misc/
  routes/
    Home.tsx
    Artist.tsx
    Credits.tsx
    About.tsx
  components/
    Header.tsx                desktop nav + mobile bar
    MobileMenu.tsx            full-screen colour panel
    Footer.tsx
    InstagramGlyph.tsx        the drawn mark, no label
    Placeholder.tsx           diagonal-stripe fill w/ caption
    Image.tsx                 <img> that degrades to Placeholder
    FilterBar.tsx             the three pills + count + clear
    CreditTile.tsx
    ListenModal.tsx
    BookingForm.tsx
  styles/
    global.css                reset, fonts, base type
```

---

## 3 · Data layer — already written, read before coding

Four files under `src/data/` define every piece of content. **Read them
first.** They are the contract; components consume, never restate.

- **`site.ts`** — name, email, Instagram handle + URL, location, form
  endpoint, meta description. *No component may hardcode any of these.* If
  you type `robertrossrecording` inside a `.tsx`, you have introduced a bug.
- **`taxonomy.ts`** — the three filter groups, their roles, and
  `groupsOf()` / `matchesFilter()`. Critically: **a credit never declares its
  filter group.** It lists fine-grained roles; group membership is derived.
  Use `matchesFilter()` — do not reimplement the predicate.
- **`credits.ts`** — `Credit[]` with sample data. Shape is final, values are
  placeholder.
- **`gigs.ts`** — `Gig[]` with ISO timestamps, plus `upcoming()` / `past()` /
  `formatGigDate()`. Past-vs-upcoming is computed, never hand-maintained.
- **`images.ts`** — `image(folder, slug)` returns a hashed URL or
  `undefined`. See `src/assets/README.md`. **`undefined` is a normal state,
  not an error** — render the placeholder.

### Filter semantics (get this right)

Selecting nothing shows everything. you can only select one filter or no filters.  

---

## 4 · Design tokens — `src/theme.ts`

Palette: `bg #f4f4f4` · `ink #111` · `green #17914f` · `crimson #bf0a34` ·
`navy #123a70` · `purple #8c00fa` · `gold #ffc627`.

Crimson is the primary accent (active nav underline, links, hover fills, the
booking band). Purple is secondary (eyebrow labels, carets). Green/navy/gold
exist to fill the home grid and tint tiles.

**Type — settled, do not substitute.** Use the mockup's stack exactly:

```
'Bauhaus 93', Poppins, Helvetica, Arial, sans-serif
```

Bauhaus 93 is licensed with no webfont, so it resolves only for visitors who
already have it installed; everyone else gets **Poppins**, which is what the
design was built and reviewed against. Size every layout against Poppins.
Labels, dates, eyebrows and filter text are **IBM Plex Mono**, uppercase,
`letter-spacing: .14em`.

Load both in `index.html` — two preconnects plus `theme.ts`'s `FONT_HREF`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
```

**Breakpoints.** Mobile-first. `≥768px` tablet, `≥1200px` desktop.

**Mirror the tokens into CSS custom properties** on `:root` in
`styles/global.css` so CSS Modules can use `var(--crimson)` rather than
importing JS. Keep the two lists in sync by hand — there are seven colours.

**Shape language:** everything on the site is square-cornered *except* the
filter pills, the CTA buttons and the form fields, which are fully rounded.
That contrast is deliberate — pills read as controls precisely because
nothing else is round. Do not soften corners elsewhere.

---

## 5 · Routing and GitHub Pages

Four routes: `/` `/artist` `/credits` `/about`.

GitHub Pages has no rewrite rules, so a deep link to `/credits` 404s. The fix
is standard: **copy `dist/index.html` to `dist/404.html` after build.** Pages
serves `404.html` for unknown paths; since it is the SPA shell, the router
takes over and the URL is preserved. Add to `package.json`:

```json
"build": "tsc -b && vite build && cp dist/index.html dist/404.html"
```

If deploying to `user.github.io/repo` rather than an apex domain, also set
`base: '/repo/'` in `vite.config.ts` and pass the same value as the router's
`basename`. With a custom domain (`robertrossrecording.com`) neither is
needed — keep `base: '/'` and add a `public/CNAME` file containing the domain.

Scroll behaviour: restore to top on route change, **except** when navigating
to `/about#booking`, which must scroll to the form anchor. Every "Contact me
→" link on the site points at `/about#booking`, not `/about`.

---

## 6 · Global chrome

### Desktop header
Sticky. Background `rgba(244,244,244,.94)` with `backdrop-filter: blur(6px)`
and a 1px hairline bottom border. Padding `20px 60px`.

- **Left:** wordmark "Robert Ross Recording", 15px/700 — **hidden on Home**,
  because the hero *is* the wordmark. Visible on all other routes.
- **Centre-left:** three links in this order — **About · Artist · Studio
  Credits**. 15px/700. Active route carries a 3px crimson bottom border;
  inactive is `transparent` (reserve the space so nothing shifts).
- **Right:** the Instagram glyph, mark only, no label. Present on every page
  including Home. 34px square, 2px `ink` border, 9px radius.

No dropdowns anywhere on the site.

### Mobile header
56px bar: wordmark left (shown on Home too, since the mobile hero is
type-first), Instagram glyph + hamburger right, both 34px squares.

### Mobile menu
Full-screen overlay, `grid-template-rows: 1fr 1fr 1fr auto`. One saturated
block per link — **green, purple, crimson** in that order — each filling its
row with 30px/700 white type, centred. The bottom `auto` row is an `ink` bar
holding `@ROBERTROSSRECORDING` in mono caps and a `×` close button.

Fade in over 160ms. Closes on: link tap, `×`, `Escape`, and tap outside a
link. Lock `document.body` scroll while open and restore on close.

### Footer (all pages)
`ink` background, `#f4f4f4` type. Left: wordmark 14px/700. Right: email link,
Instagram link, and `NYC · open to travel`. Underlined links with
`text-underline-offset: 3px`. Stacks vertically on mobile.

---

## 7 · Pages

### 7.1 Home (`/`)

**Desktop** — a colour-block grid, three columns, rows `220px 240px 190px`:

```
┌─────────────────────────┬──────────┐
│  Robert Ross Recording  │ session  │   row 1
│  (spans cols 1–2,       ├──────────┤
│   rows 1–2, on bg)      │  Artist  │   row 2  ← crimson
│                         │ Engineer │
│                         │ &Producer│
├──────────┬──────────────┼──────────┤
│   gig    │ control-room │   live   │   row 3
└──────────┴──────────────┴──────────┘
```

Title cell: 78px/800, `line-height: .95`, `letter-spacing: -.035em`, ink on
`bg`, breaking as "Robert Ross / Recording". Role cell: crimson field, 38px/800
white, breaking as "Artist / Engineer / & Producer".

The four remaining cells (`green`, `navy`, `purple`, `gold` — keys `session`,
`gig`, `control-room`, `live`) each hold a photo from `assets/hero/`. **On
hover the colour cross-fades to reveal the photo** with the colour left as a
tint, and a mono caption appears. 450ms ease. Each block is a link to the page
it represents.

**Mobile** — same content, reflowed: title cell full-width at top, role cell
full-width beneath it, then the four blocks as a 2×2 grid at 120px rows. **No
hover on touch** — instead each block cross-fades to its photo on
scroll-into-view (`IntersectionObserver`), staggered ~120ms apart. Blocks stay
tappable.

**Below the grid, both viewports:** the short blurb at 22px (17px mobile),
`max-width: 62ch`, then a single pill button "About & booking →" — ink fill,
white type, crimson on hover — linking to `/about`. Nothing else on this page.

### 7.2 Artist (`/artist`)

Two sections.

**Upcoming gigs.** Eyebrow `01 — LIVE` in purple mono caps, then `Upcoming
gigs` at 64px/800.

*Desktop:* two columns, `1.1fr .9fr`, 56px gap. Left is a list of gig rows
separated by 2px ink top-borders — mono crimson date, 26px/700 venue, then
city and a ticket link on one baseline. Hovering a row fades every *other* row
to `opacity: .55` and swaps the **sticky** photo in the right column to that
gig's image. Sticky at `top: 90px`, 420px tall.

*Mobile:* full-width cards, photo on top (150px), details beneath. No sticky
column.

Rows come from `upcoming()`. If `past()` is non-empty, render it below as a
collapsed "previously" list.

**Album band.** Full-bleed `navy`. Eyebrow `02 — RECORD`, then `ALBUM /
COMING / SOON` at 76px/800 uppercase, a one-line note, and a square artwork
placeholder (`misc/album-cover`) to the right. Two columns `1fr .8fr` on
desktop, stacked on mobile where the type scales to 46px but stays the loudest
thing on the page.

### 7.3 Studio Credits (`/credits`) — the complex one

Eyebrow `STUDIO`, heading `Credits`.

**Filter bar.** Sticky below the header (`top: 74px` desktop / `58px` mobile),
2px ink borders top and bottom, `bg` background so content scrolls under it.

- Left: the standing label `FILTER BY` in grey mono caps, then the three pills
  from `GROUPS` — `STUDIO MUSICIAN`, `PRODUCTION & COMPOSITION`, `ENGINEER`.
  Multi-select toggles; "all" is the default. A selected pill fills with its
  group colour (navy / purple / crimson), white type, and shows a `✓`.
- Right: a live result count `"6 of 8"` that updates the instant anything
  toggles, a `clear` text button shown only when something is active, and —
  held visually apart from the filters — a crimson **`Contact me →`** link to
  `/about#booking`.
- Mobile: pills scroll horizontally in the sticky bar; the count and contact
  link wrap to a second line.

Those legibility cues are not decoration — they are the reason a visitor knows
the pills are controls. Keep all four: standing label, pill shape, fill-on-
select, live count.

**Grid.** 3 columns desktop, 2 mobile, gap 32/18px. Each tile:

- Square art from `assets/credits/<slug>`, falling back to a
  `color`-tinted stripe placeholder.
- Hover (desktop): a `rgba(17,17,17,.55)` scrim fades in with a pill-outlined
  `Listen ▸`. On mobile there is no hover, so a small `Listen ▸` badge sits
  permanently in the tile's bottom-right corner.
- Line 1: `creditTitle(c)` → "Nadia Vance, Blue Hour • EP", 15px/600.
- Line 2: `creditRoles(c)` → "Mixing Engineer, Guitarist", 14px, `#666`.

Sort newest `year` first. Animate re-flow briefly when filters change; respect
`prefers-reduced-motion`.

**Empty state:** "Nothing matches all of those. Try removing a filter."

**Listen modal.** Opens on tile click, centred, on both desktop and mobile.
Contains the artwork, title line, credit line, a `LISTEN ON` label, and one
full-width outlined button per entry in `links` (order from `SERVICES` in
`site.ts`). Nothing plays in-page — these are hand-offs, `target="_blank"`.

Closing is deliberately over-served. **All five must work:**
1. the `×` in the corner
2. clicking the dimmed backdrop
3. `Escape`
4. swipe-down on touch
5. the browser back button — the modal pushes a history entry, so back closes
   it rather than leaving the site

On close, focus returns to the tile that opened it, and the grid keeps both
its scroll position and its active filters. Trap focus inside the modal while
open and lock body scroll.

### 7.4 About (`/about`)

**Top half.** Desktop is two columns `.75fr 1fr`: portrait left
(`misc/portrait`, 3:4, **sticky** at `top: 100px`), copy right. Eyebrow
`ABOUT`, heading `Ross`, then three paragraphs at 19px with `max-width: 62ch`.
Beneath the copy, an outlined pill combining the Instagram glyph and
`@robertrossrecording` — a second, softer contact route alongside the header
glyph. Mobile: portrait full-width 4:3 on top, copy at 16.5px beneath, the
Instagram row full-width and tappable.

Copy is final and lives in the mockup — three paragraphs, first-person,
beginning "Robert Ross Recording is a one man army run by (me!) Robert Ross
Harburda…". Keep it verbatim.

**Bottom half — booking form.** Full-bleed `crimson` band, `id="booking"`.
Eyebrow `BOOKING`, heading `Let's talk` at 56px/800 white.

Fields, in this order, two columns on desktop and one on mobile:

| Field | Required | Notes |
|---|---|---|
| First Name | ✓ | |
| Last Name | ✓ | |
| Email | ✓ | `type="email"`, `inputMode="email"` |
| Phone Number | | `type="tel"` |
| City & State (open to travel!) | | |
| Subject | | |
| Message | ✓ | textarea, min-height 150px, placeholder "Please tell me about yourself and how I can be of service. How did you hear about me?" |

Then a captcha slot and a submit button (`ink` fill, pill, full-width on
mobile). Fields are `rgba(255,255,255,.82)` on the crimson, 14px radius, 48px
minimum height on mobile.

Below the form: `Or email directly: ross@robertrossrecording.com · NYC, open
to travel` — pulled from `site.ts`.

---

## 8 · The booking form has no server

`site.formEndpoint` is `null` today. Implement both branches:

- **Endpoint set** — `POST` the form as `FormData` with
  `Accept: application/json`. Render success and error **in place**; never
  navigate away, never lose what was typed on failure.
- **Endpoint null** — degrade to composing a `mailto:` with the fields in the
  body, and show the direct email address prominently. The form must never
  silently do nothing.

Validate required fields client-side before either path. Formspree is the
suggested provider (works from static hosts, has a free tier, ships its own
spam filtering — which is also what the captcha slot is for; don't wire a real
reCAPTCHA unless Ross asks, since it needs a key and adds a third-party
script).

---

## 9 · Accessibility and quality bar

- Every interactive element reachable and operable by keyboard, with a visible
  focus ring. The colour-block hero links and the filter pills are the two
  places this is easy to get wrong.
- Filter pills are `<button aria-pressed>`. The result count lives in an
  `aria-live="polite"` region.
- The modal: `role="dialog"`, `aria-modal`, focus trapped, focus restored.
- Images carry real `alt` text; placeholders are `aria-hidden` decorative.
- Contrast: white on `gold #ffc627` **fails** — use `ink` for any type sitting
  on gold.
- Honour `prefers-reduced-motion` for the hero cross-fades, tile re-flow and
  modal animation.
- Respect `hover: hover` — every hover-only behaviour needs a touch
  equivalent, already specified per-page above.

---

## 10 · Build order

Ordered so each step is independently reviewable, and so the parts with final
content land before the parts still waiting on Ross.

1. **Foundation** — `global.css` with tokens and fonts, router in `App.tsx`,
   `Header` / `Footer` / `MobileMenu`, `Placeholder` + `Image`. Four empty
   route stubs.
2. **Home** — the hero grid, both viewports, with placeholders standing in for
   all five photos.
3. **About** — copy is final, so this is the first page that can be *finished*.
   Includes the booking form and the `#booking` anchor behaviour.
4. **Credits** — filter bar, grid, then the listen modal with all five close
   paths. The most logic on the site; budget accordingly.
5. **Artist** — last, because real gig dates and photos are still pending.

## 11 · Definition of done

- `npm run build` passes with zero TypeScript errors.
- All four routes reachable by deep link on a GitHub Pages deploy (verifies
  the `404.html` copy landed).
- No hex colour literal and no identity string anywhere outside `theme.ts` and
  `data/site.ts`.
- Every hover behaviour has a working touch counterpart.
- The site renders complete and intentional with **zero image files present** —
  placeholders throughout, nothing broken.

## 12 · Still needed from Ross

Blocking nothing above, but the site ships with placeholder content until
these arrive: the real credit list (titles, roles, streaming links), real gig
dates, the five hero photos, the About portrait, album artwork, and a form
endpoint. Type is settled — build against Poppins per §4.
