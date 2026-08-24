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

/** No shows booked at the moment. Add real dates here when scheduled. */
export const GIGS: Gig[] = []

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
