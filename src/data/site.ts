/**
 * SINGLE SOURCE OF TRUTH for every identity string on the site.
 *
 * Rule for implementers: no component may hardcode an email address, an
 * Instagram handle, a URL, or the business name. Import from here instead.
 * If you find yourself typing "robertrossrecording" inside a .tsx file,
 * you are doing it wrong.
 */

const INSTAGRAM_HANDLE = 'robert_ross_music'
const EMAIL = 'robertrossrecording@gmail.com'

export const site = {
  /** Legal/display name of the business. Used in wordmark, footer, <title>. */
  name: 'Robert Ross Recording',
  /** The person. Used in About copy and structured data. */
  personName: 'Robert Ross Harburda',
  /** What he goes by. */
  shortName: 'Ross',
  /** Tagline under the wordmark on the hero. */
  role: 'Artist, Engineer & Producer',
  /** Shown in footer and the booking band. */
  location: 'NYC · open to travel',

  domain: 'robertrossrecording.com',
  url: 'https://robertrossrecording.com',

  email: EMAIL,
  /** Pre-built mailto: — never build this inline. */
  emailHref: `mailto:${EMAIL}`,

  instagram: {
    handle: INSTAGRAM_HANDLE,
    /** With the @, for display. */
    display: `@${INSTAGRAM_HANDLE}`,
    /** Uppercased, for the mono-type mobile menu footer. */
    displayCaps: `@${INSTAGRAM_HANDLE.toUpperCase()}`,
    url: `https://instagram.com/${INSTAGRAM_HANDLE}`,
  },

  /**
   * Booking form POST target. GitHub Pages is static, so the form needs a
   * third-party endpoint. Formspree is the default; swap the URL only.
   * Until a real endpoint exists this stays null and the form falls back to
   * a mailto: composition (see IMPLEMENTATION_PLAN.md §8).
   */
  formEndpoint: null as string | null,

  /** Default <meta description> / OG description. */
  description:
    'Robert Ross Recording — artist, engineer and producer working out of NYC. ' +
    'Classical orchestras, big band jazz, DIY house shows: all production sizes and budgets.',
} as const

/** Streaming services that may appear on a credit. Order here = render order. */
export const SERVICES = ['Spotify', 'Apple Music', 'Bandcamp', 'YouTube', 'SoundCloud'] as const
export type Service = (typeof SERVICES)[number]
