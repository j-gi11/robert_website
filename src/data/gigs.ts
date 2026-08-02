export interface Gig {
  /** Stable id AND image filename: `src/assets/gigs/<slug>.jpg`. */
  slug: string
  /**
   * ISO 8601 with offset. Stored machine-readable so past/upcoming can be
   * computed rather than hand-maintained — nobody has to remember to move a
   * gig into the "previously" list. Formatted for display at render time.
   */
  startsAt: string
  venue: string
  city: string
  /** Ticket/RSVP URL. Null renders the label as plain text (e.g. free entry). */
  url: string | null
  /** Link label. "Tickets", "Free entry", "RSVP". */
  action: string
}

/** SAMPLE DATA — replace with Ross's real dates. */
export const GIGS: Gig[] = [
  {
    slug: 'birdland-2026-09-12',
    startsAt: '2026-09-12T20:00:00-04:00',
    venue: 'Birdland Jazz Club',
    city: 'New York, NY',
    url: '#',
    action: 'Tickets',
  },
  {
    slug: 'bar-lunatico-2026-10-03',
    startsAt: '2026-10-03T21:30:00-04:00',
    venue: 'Bar Lunàtico',
    city: 'Brooklyn, NY',
    url: null,
    action: 'Free entry',
  },
  {
    slug: 'owl-music-parlor-2026-10-24',
    startsAt: '2026-10-24T19:00:00-04:00',
    venue: 'The Owl Music Parlor',
    city: 'Brooklyn, NY',
    url: '#',
    action: 'Tickets',
  },
]

/** "SEP 12, 2026 · 8:00 PM" */
export function formatGigDate(startsAt: string): string {
  const d = new Date(startsAt)
  const date = d
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase()
    .replace(',', ',')
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}

export const upcoming = (now = new Date()) =>
  GIGS.filter((g) => new Date(g.startsAt) >= now).sort((a, b) => a.startsAt.localeCompare(b.startsAt))

export const past = (now = new Date()) =>
  GIGS.filter((g) => new Date(g.startsAt) < now).sort((a, b) => b.startsAt.localeCompare(a.startsAt))
