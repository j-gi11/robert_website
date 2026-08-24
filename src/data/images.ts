/**
 * Image resolution by slug.
 *
 * Images live in `src/assets/<folder>/<slug>.<ext>` — NOT in `public/`.
 * Going through Vite's asset pipeline buys three things `public/` doesn't:
 * content-hashed filenames (safe to cache forever), automatic inlining of
 * anything tiny, and a build that fails loudly on a missing file instead of
 * shipping a broken <img>.
 *
 * Adding an image is two steps and no plumbing: drop the file in the folder
 * named after its slug, and reference that slug from the data file.
 */

type Glob = Record<string, string>

const about = import.meta.glob('../assets/about/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Glob

const credits = import.meta.glob('../assets/credits/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Glob

const gigs = import.meta.glob('../assets/gigs/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Glob

const home = import.meta.glob('../assets/home/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Glob

const misc = import.meta.glob('../assets/misc/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Glob

function index(glob: Glob): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [path, url] of Object.entries(glob)) {
    const slug = path.split('/').pop()!.replace(/\.[^.]+$/, '')
    out[slug] = url
  }
  return out
}

const REGISTRY = {
  about: index(about),
  credits: index(credits),
  gigs: index(gigs),
  home: index(home),
  misc: index(misc),
} as const

export type ImageFolder = keyof typeof REGISTRY

/**
 * Returns the hashed URL for `<folder>/<slug>`, or undefined when the file
 * hasn't been supplied yet. Callers MUST handle undefined by rendering the
 * diagonal-stripe placeholder — the site is meant to look intentional while
 * Ross is still sending photos over, not broken.
 */
export function image(folder: ImageFolder, slug: string | undefined): string | undefined {
  if (!slug) return undefined
  const url = REGISTRY[folder][slug]
  if (!url && import.meta.env.DEV) {
    console.warn(`[images] no file for ${folder}/${slug} — rendering placeholder`)
  }
  return url
}
