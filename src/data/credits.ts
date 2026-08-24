import type { Role } from './taxonomy'
import type { Service } from './site'
import type { PaletteKey } from '../theme'

export type ReleaseFormat = 'Album' | 'EP' | 'Single'

export interface Credit {
  /**
   * Stable id AND the image filename. `src/assets/credits/<slug>.jpg`.
   * Kebab-case, artist-then-title. Never renamed once shipped — it is the
   * link between a data row and a file on disk.
   */
  slug: string
  artist: string
  title: string
  format: ReleaseFormat
  /**
   * Fine-grained roles. These drive BOTH the credit line under the tile and
   * the filter groups the entry falls into (see taxonomy.ts). Do not also
   * write a group here — it is derived.
   */
  roles: Role[]
  /** Streaming links for the Listen modal. Omit a service by leaving it out. */
  links: Partial<Record<Service, string>>
  /** Year of release. Sorts the grid, newest first. */
  year: number
  /**
   * Fallback tile colour, used until the album art file exists and as the
   * tint behind it. Pick something drawn from the artwork.
   */
  color: PaletteKey
}

export const CREDITS: Credit[] = [
  {
    slug: 'kate-hunter-time',
    artist: 'Kate Hutner',
    title: 'TIME',
    format: 'Single',
    roles: ['Tracking Engineer', 'Mastering Engineer', 'Producer'],
    links: {
      Spotify: 'https://open.spotify.com/track/20dIgfy4JrXif0ALtALhFe?si=80234a57486843e2',
      'Apple Music': 'https://music.apple.com/us/song/time/1863160244',
    },
    year: 2026, // TODO: confirm actual release year
    color: 'purple',
  },
  {
    slug: 'lone-wolf-syndrome-dear-hunter',
    artist: 'Lone Wolf Syndrome',
    title: 'Dear Hunter',
    format: 'Single',
    roles: ['Trumpet'],
    links: {
      Spotify: 'https://open.spotify.com/track/6ckm9fgIlwrj2eBClVBB0r?si=fe424bcbc2ee4ce2',
      'Apple Music': 'https://music.apple.com/us/album/dear-hunter-single/6768586438',
      Bandcamp: 'https://lonewolfsyndrome.bandcamp.com/track/dear-hunter',
    },
    year: 2026, // TODO: confirm actual release year
    color: 'navy',
  },
  {
    slug: 'wax-jaw-secret-of-the-night',
    artist: 'Wax Jaw',
    title: 'Secret Of The Night',
    format: 'Single',
    roles: ['Assistant Engineer'],
    links: {
      Spotify: 'https://open.spotify.com/track/5AhKNKOlO8bjFMKvH8OdTC?si=5658c3a404fc49fe',
      'Apple Music': 'https://music.apple.com/us/song/secret-of-the-night/1828291433',
      Bandcamp: 'https://wax-jaw.bandcamp.com/track/secret-of-the-night',
    },
    year: 2026, // TODO: confirm actual release year
    color: 'crimson',
  },
]

/** "Nadia Vance, Blue Hour • EP" — line 1 of a tile. */
export const creditTitle = (c: Credit) => `${c.artist}, ${c.title} • ${c.format}`

/** "Mixing Engineer, Guitarist" — line 2 of a tile. */
export const creditRoles = (c: Credit) => c.roles.join(', ')
