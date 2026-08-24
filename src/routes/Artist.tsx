import { useEffect, useState } from 'react'
import { formatGigDate, past, upcoming } from '../data/gigs'
import { palette } from '../theme'
import Image from '../components/Image'
import styles from './Artist.module.css'

const UPCOMING = upcoming()
const PAST = past()

/** Live/gig photos, cycled here while no upcoming gigs are booked. */
const CYCLE_SLUGS = ['gig-1', 'gig-2']
const CYCLE_INTERVAL_MS = 6000

export default function Artist() {
  const [hoveredIndex, setHoveredIndex] = useState(0)
  const hoveredGig = UPCOMING[hoveredIndex]

  const [cycleIndex, setCycleIndex] = useState(0)

  useEffect(() => {
    if (UPCOMING.length > 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setCycleIndex((i) => (i + 1) % CYCLE_SLUGS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <main className={styles.artist}>
      <section className={styles.pagePad}>
        <span className={styles.eyebrow}>01 — LIVE</span>
        <h1 className={styles.heading}>Upcoming gigs</h1>

        {UPCOMING.length > 0 ? (
          <div className={styles.gigLayout}>
            <div className={styles.gigList}>
              {UPCOMING.map((gig, i) => (
                <div
                  key={gig.slug}
                  className={`${styles.gigRow} ${i !== hoveredIndex ? styles.faded : ''}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                >
                  <div className={styles.mobilePhoto}>
                    <Image folder="gigs" slug={gig.slug} alt={gig.venue} height="100%" />
                  </div>
                  <div className={styles.gigDate}>{formatGigDate(gig.startsAt)}</div>
                  <div className={styles.gigVenue}>{gig.venue}</div>
                  <div className={styles.gigMeta}>
                    <span>{gig.city}</span>
                    {gig.url ? (
                      <a
                        href={gig.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.gigAction}
                        onFocus={() => setHoveredIndex(i)}
                      >
                        {gig.action} →
                      </a>
                    ) : (
                      <span className={styles.gigAction}>{gig.action}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.stickyPhoto}>
              <div className={styles.stickyPhotoInner}>
                <Image folder="gigs" slug={hoveredGig.slug} alt={hoveredGig.venue} height="100%" />
              </div>
              <span className={styles.stickyCaption}>{hoveredGig.venue}</span>
            </div>
          </div>
        ) : (
          <div className={styles.gigLayout}>
            <div className={styles.emptyPhoto}>
              {CYCLE_SLUGS.map((slug, i) => (
                <div
                  key={slug}
                  className={`${styles.cycleImage} ${i === cycleIndex ? styles.cycleImageActive : ''}`}
                >
                  <Image folder="gigs" slug={slug} alt="" height="100%" />
                </div>
              ))}
            </div>

            <div className={styles.emptyState}>
              <span className={styles.emptyBadge}>Coming soon</span>
              <p className={styles.emptyText}>Nothing on the calendar right now. Check back soon!</p>
            </div>

            <div className={styles.stickyPhoto}>
              <div className={styles.stickyPhotoInner}>
                {CYCLE_SLUGS.map((slug, i) => (
                  <div
                    key={slug}
                    className={`${styles.cycleImage} ${i === cycleIndex ? styles.cycleImageActive : ''}`}
                  >
                    <Image folder="gigs" slug={slug} alt="" height="100%" />
                  </div>
                ))}
              </div>
              <span className={styles.stickyCaption}>Coming soon</span>
            </div>
          </div>
        )}

        {PAST.length > 0 && (
          <details className={styles.previously}>
            <summary className={styles.previouslySummary}>Previously</summary>
            <div className={styles.pastList}>
              {PAST.map((gig) => (
                <div key={gig.slug} className={styles.pastRow}>
                  <span className={styles.pastDate}>{formatGigDate(gig.startsAt)}</span>
                  <span className={styles.pastVenue}>{gig.venue}</span>
                  <span className={styles.pastCity}>{gig.city}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </section>

      <section className={styles.albumBand}>
        <div className={styles.albumInner}>
          <div>
            <span className={styles.albumEyebrow}>02 — RECORD</span>
            <div className={styles.albumTitle}>
              Album
              <br />
              Coming
              <br />
              Soon
            </div>
            <p className={styles.albumNote}>Debut record on its way. Written, recorded, and produced by me!</p>
          </div>
          <div className={styles.albumArt}>
            <Image folder="misc" slug="album-cover" alt="Album artwork" color={palette.navy} height="100%" />
          </div>
        </div>
      </section>
    </main>
  )
}
