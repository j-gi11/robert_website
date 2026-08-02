/**
 * Design tokens. Every colour, breakpoint and type step on the site comes
 * from here. No hex literals in components.
 */

export const palette = {
  /** Page field. The site's "white". */
  bg: '#f4f4f4',
  /** Near-black. Text, borders, footer, hero wordmark. */
  ink: '#111111',
  green: '#17914f',
  crimson: '#bf0a34',
  navy: '#123a70',
  purple: '#8c00fa',
  gold: '#ffc627',
} as const

export type PaletteKey = keyof typeof palette

/**
 * The two working accents, per the architecture plan. Crimson is the primary
 * action/active colour; purple is the secondary used for eyebrow labels and
 * carets. The remaining three exist to fill the home grid and tint tiles.
 */
export const accent = {
  primary: palette.crimson,
  secondary: palette.purple,
} as const

export const font = {
  /**
   * Display face — identical to the mockup's stack. Bauhaus 93 is licensed
   * and has no webfont, so it resolves only for visitors who happen to have
   * it installed locally (most Windows machines with Office). Everyone else
   * falls through to Poppins, which is loaded from Google Fonts and is the
   * face the design was actually built and reviewed against.
   *
   * This is settled, not provisional: leaving Bauhaus 93 first in the stack
   * costs nothing and is a free upgrade where it exists. Layouts must be
   * sized against Poppins, since that is what nearly everyone will see.
   */
  display: "'Bauhaus 93', Poppins, Helvetica, Arial, sans-serif",
  /** Eyebrows, filter labels, dates, anything set in caps with letterspacing. */
  mono: "'IBM Plex Mono', ui-monospace, monospace",
} as const

/**
 * The exact webfont request from the mockup. Drop this <link> in index.html
 * (with the two preconnects). Weights are the ones actually used — 800 for
 * display headings, 600/700 for nav and labels, 400 for body.
 */
export const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800' +
  '&family=IBM+Plex+Mono:wght@400;600&display=swap'

/** min-width breakpoints. Mobile-first: base styles are mobile. */
export const bp = {
  tablet: 768,
  desktop: 1200,
} as const

export const media = {
  tablet: `@media (min-width: ${bp.tablet}px)`,
  desktop: `@media (min-width: ${bp.desktop}px)`,
  /** For swapping hover affordances out on touch devices. */
  hover: '@media (hover: hover)',
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
} as const

/**
 * The diagonal-stripe fill used wherever a photo is missing. Pass a palette
 * colour to tint it, or omit for the neutral grey version.
 */
export function placeholderFill(color?: string): string {
  return color
    ? `repeating-linear-gradient(135deg, rgba(255,255,255,.14) 0 10px, rgba(255,255,255,0) 10px 20px), ${color}`
    : 'repeating-linear-gradient(135deg, #e2e2e2 0 12px, #ededed 12px 24px)'
}
