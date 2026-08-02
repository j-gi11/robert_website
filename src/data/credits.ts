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

/**
 * SAMPLE DATA — every entry below is placeholder content from the mockup and
 * must be replaced wholesale when Ross's real credit list arrives. Keep the
 * shape, throw away the values.
 */
export const CREDITS: Credit[] = [
  {
    slug: 'nadia-vance-blue-hour',
    artist: 'Nadia Vance',
    title: 'Blue Hour',
    format: 'EP',
    roles: ['Mixing Engineer', 'Guitarist'],
    links: { Spotify: '#', 'Apple Music': '#' },
    year: 2025,
    color: 'navy',
  },
  {
    slug: 'the-ellis-quartet-nightshift',
    artist: 'The Ellis Quartet',
    title: 'Nightshift',
    format: 'Album',
    roles: ['Producer', 'Tracking Engineer', 'Trumpet'],
    links: { Spotify: '#', Bandcamp: '#', 'Apple Music': '#' },
    year: 2025,
    color: 'crimson',
  },
  {
    slug: 'junia-paper-cranes',
    artist: 'Junia',
    title: 'Paper Cranes',
    format: 'Single',
    roles: ['Producer', 'Composer', 'Keys'],
    links: { Spotify: '#', 'Apple Music': '#' },
    year: 2024,
    color: 'purple',
  },
  {
    slug: 'marcus-bell-big-band-two-bridges',
    artist: 'Marcus Bell Big Band',
    title: 'Two Bridges',
    format: 'Album',
    roles: ['Assistant Engineer', 'Trumpet'],
    links: { Spotify: '#', Bandcamp: '#' },
    year: 2024,
    color: 'gold',
  },
  {
    slug: 'soft-arrivals-held',
    artist: 'Soft Arrivals',
    title: 'Held',
    format: 'EP',
    roles: ['Mixing Engineer', 'Bassist'],
    links: { Spotify: '#', 'Apple Music': '#', Bandcamp: '#' },
    year: 2024,
    color: 'green',
  },
  {
    slug: 'odessa-ray-cold-bloom',
    artist: 'Odessa Ray',
    title: 'Cold Bloom',
    format: 'Single',
    roles: ['Mastering Engineer'],
    links: { Spotify: '#' },
    year: 2023,
    color: 'crimson',
  },
  {
    slug: 'the-fifth-floor-loose-change',
    artist: 'The Fifth Floor',
    title: 'Loose Change',
    format: 'Album',
    roles: ['Producer', 'Bassist', 'Guitarist'],
    links: { Spotify: '#', 'Apple Music': '#' },
    year: 2023,
    color: 'navy',
  },
  {
    slug: 'camille-okoye-salt-air',
    artist: 'Camille Okoye',
    title: 'Salt Air',
    format: 'EP',
    roles: ['Tracking Engineer', 'Keys'],
    links: { Bandcamp: '#', 'Apple Music': '#' },
    year: 2022,
    color: 'purple',
  },
]

/** "Nadia Vance, Blue Hour • EP" — line 1 of a tile. */
export const creditTitle = (c: Credit) => `${c.artist}, ${c.title} • ${c.format}`

/** "Mixing Engineer, Guitarist" — line 2 of a tile. */
export const creditRoles = (c: Credit) => c.roles.join(', ')
