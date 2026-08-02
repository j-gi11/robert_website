# Images

Drop files here. No code changes needed beyond the one data row that names them.

## Convention

```
src/assets/
  credits/<credit-slug>.jpg    square album art, 1:1
  gigs/<gig-slug>.jpg          gig photos, 3:2 landscape
  hero/<block-key>.jpg         the five home-page grid photos
  misc/portrait.jpg            the About portrait
  misc/album-cover.jpg         the "album coming soon" artwork
  misc/og.jpg                  social share card, 1200×630
```

The filename **is** the lookup key. `credits/nadia-vance-blue-hour.jpg` is
found by the `Credit` whose `slug` is `nadia-vance-blue-hour`. Rename a file
and it silently stops resolving — so treat slugs as permanent once shipped.

Hero block keys are fixed: `session`, `gig`, `control-room`, `live`.

> **The four files in `hero/` are stock placeholders**, carried over from the
> earlier Next.js version of this repo (they were `public/images/hero-*.jpg`)
> and renamed to match the block they suit — reel-to-reel + mics → `session`,
> empty lit stage → `gig`, mixing console → `control-room`, guitarist
> silhouette → `live`. They are square 1024×1024 AI/stock images, not Ross.
> Replace all four with real photos before launch.

## Why not `public/`?

Files here go through Vite's asset pipeline: content-hashed names (cacheable
forever), tiny files inlined automatically, and `import.meta.glob` gives us a
build-time index. `public/` would mean hand-written URL strings that break
silently. See `src/data/images.ts`.

## Sizes

Export at **2× the largest rendered size**, then let the build compress:

| Folder    | Rendered max | Export at    |
|-----------|--------------|--------------|
| `credits` | 420 px sq    | 840 × 840    |
| `gigs`    | 560 × 373    | 1120 × 746   |
| `hero`    | 640 × 420    | 1280 × 840   |
| `misc/portrait` | 480 × 640 | 960 × 1280 |

Prefer `.webp` (or `.avif`); `.jpg` and `.png` also resolve. Keep each file
under ~300 KB — the hero grid loads five at once and the plan calls out cell
data as a concern.

## Missing files are fine

Anything not supplied yet renders the diagonal-stripe placeholder with its
entry's `color`. The site is designed to look deliberate while photos are
still being collected — do not block on assets.
