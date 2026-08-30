import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { image, imageUrls } from '../data/images'
import { palette } from '../theme'
import PageImageGate from '../components/PageImageGate'
import styles from './Home.module.css'

interface HeroCellConfig {
  key: string
  color: string
  label: string
  link: string
}

const heroCells: HeroCellConfig[] = [
  { key: 'session', color: palette.green, label: 'session', link: '/artist' },
  { key: 'gig', color: palette.navy, label: 'gig', link: '/artist' },
  { key: 'control-room', color: palette.purple, label: 'control-room', link: '/credits' },
  { key: 'live', color: palette.gold, label: 'live', link: '/artist' },
]

/**
 * Shared photo pool for the hero grid. Each cell holds an index into this
 * pool; with 4 cells and 5 photos there's always exactly one "resting"
 * index not currently assigned to any cell. A cell advances by picking up
 * whatever is resting, so no photo is ever on screen in two cells at once.
 */
const PHOTO_POOL = ['studio-duo', 'ensemble-session', 'control-desk', 'piano-horns', 'tetons']
/** How long a photo stays fully shown before the cell dips to its color. */
const PHOTO_HOLD_MS = 5000
/** Random jitter on the photo-hold length — wide, so cells drift well out of lockstep. */
const HOLD_JITTER_MS = 3200
/** How long the cell rests on pure color (desktop only) before the next photo fades in. */
const COLOR_HOLD_MS = 2200
/** Random jitter on the color-hold length. */
const COLOR_JITTER_MS = 1400

const randomBetween = (base: number, jitter: number) => base + (Math.random() * jitter - jitter / 2)

interface CellRef {
  element: HTMLDivElement | null
  visible: boolean
}

export default function Home() {
  const homeImages = useMemo(() => imageUrls('home'), [])
  const cellRefs = useRef<Map<string, CellRef>>(new Map())
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set())
  const [activeIndices, setActiveIndices] = useState<number[]>(
    heroCells.map((_, i) => i),
  )
  const [phases, setPhases] = useState<('photo' | 'color')[]>(
    heroCells.map(() => 'photo'),
  )
  const hoveredKeysRef = useRef<Set<string>>(new Set())
  const phasesRef = useRef<('photo' | 'color')[]>(heroCells.map(() => 'photo'))

  useEffect(() => {
    // Mobile scroll-into-view effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLDivElement
            const cellKey = element.dataset.cell
            if (cellKey) {
              setTimeout(() => {
                setVisibleCells((prev) => new Set([...prev, cellKey]))
              }, 120 * Array.from(cellRefs.current.keys()).indexOf(cellKey))
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all photo blocks on mobile
    cellRefs.current.forEach((ref) => {
      if (ref.element) {
        observer.observe(ref.element)
      }
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timeoutIds: number[] = []

    const setPhase = (ci: number, phase: 'photo' | 'color') => {
      phasesRef.current[ci] = phase
      setPhases((prev) => {
        const next = [...prev]
        next[ci] = phase
        return next
      })
    }

    // Color dip is over — pick the resting photo and fade back to a photo.
    const swapAndReturn = (ci: number) => {
      setActiveIndices((prev) => {
        const resting = [0, 1, 2, 3, 4].find((i) => !prev.includes(i))
        if (resting === undefined) return prev
        const next = [...prev]
        next[ci] = resting
        return next
      })
      setPhase(ci, 'photo')
      timeoutIds[ci] = window.setTimeout(() => waitThenDip(ci), randomBetween(PHOTO_HOLD_MS, HOLD_JITTER_MS))
    }

    // Enter the color dip right now, skipping any remaining wait.
    const enterColorNow = (ci: number) => {
      setPhase(ci, 'color')
      timeoutIds[ci] = window.setTimeout(() => swapAndReturn(ci), randomBetween(COLOR_HOLD_MS, COLOR_JITTER_MS))
    }

    // Photo is showing (or hovered/frozen) — wait, then dip into the
    // cell's own color before the next photo takes over.
    const waitThenDip = (ci: number) => {
      if (hoveredKeysRef.current.has(heroCells[ci].key)) {
        timeoutIds[ci] = window.setTimeout(() => waitThenDip(ci), 500)
        return
      }
      enterColorNow(ci)
    }

    // Fully random start per cell, rather than an even stagger, so cells
    // never fall into a repeating rhythm relative to one another.
    heroCells.forEach((_, ci) => {
      timeoutIds[ci] = window.setTimeout(() => waitThenDip(ci), Math.random() * PHOTO_HOLD_MS)
    })

    // At least one cell should always be mid-transition — if a gap opens up
    // where every cell is just sitting on a photo, pull a random eligible
    // one into its color dip immediately instead of waiting it out.
    const watchdog = window.setInterval(() => {
      if (phasesRef.current.includes('color')) return
      const candidates = heroCells
        .map((_, i) => i)
        .filter((i) => !hoveredKeysRef.current.has(heroCells[i].key))
      if (candidates.length === 0) return
      const ci = candidates[Math.floor(Math.random() * candidates.length)]
      clearTimeout(timeoutIds[ci])
      enterColorNow(ci)
    }, 700)

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
      clearInterval(watchdog)
    }
  }, [])

  return (
    <PageImageGate images={homeImages}>
      <div>
        <div className={styles.hero}>
        {/* Title Cell */}
        <div className={styles.titleCell}>
          <h1 className={styles.titleText}>
            Robert Ross<br />
            Recording
          </h1>
        </div>

        {/* Photo Blocks */}
        {heroCells.map((cell, ci) => {
          const activeSlug = PHOTO_POOL[activeIndices[ci]]
          const activeUrl = image('home', activeSlug)
          const blockClass =
            cell.label === 'session'
              ? styles.sessionBlock
              : cell.label === 'gig'
                ? styles.gigBlock
                : cell.label === 'control-room'
                  ? styles.controlRoomBlock
                  : styles.liveBlock

          return (
            <div
              key={cell.key}
              className={`${styles.heroCell} ${blockClass} ${visibleCells.has(cell.key) ? styles.visible : ''}`}
              style={{
                backgroundColor: cell.color,
              }}
              data-cell={cell.key}
              data-phase={phases[ci]}
              ref={(el) => {
                if (el) {
                  cellRefs.current.set(cell.key, { element: el, visible: false })
                }
              }}
              onMouseEnter={() => hoveredKeysRef.current.add(cell.key)}
              onMouseLeave={() => hoveredKeysRef.current.delete(cell.key)}
              onTouchStart={() => hoveredKeysRef.current.add(cell.key)}
              onTouchEnd={() => hoveredKeysRef.current.delete(cell.key)}
            >
              <div className={styles.colorOverlay} style={{ backgroundColor: cell.color }} />

              {PHOTO_POOL.map((slug, pi) => {
                const url = image('home', slug)
                if (!url) return null
                const isActive = pi === activeIndices[ci]
                return (
                  <img
                    key={slug}
                    src={url}
                    alt={isActive ? cell.label : ''}
                    className={`${styles.cyclePhoto} ${isActive ? styles.cyclePhotoActive : ''}`}
                  />
                )
              })}

              <div
                className={styles.colorTint}
                style={{ backgroundColor: cell.color }}
                aria-hidden="true"
              />

              {activeUrl && (
                <div
                  className={styles.photoHoverOverlay}
                  style={{ backgroundImage: `url(${activeUrl})` }}
                  aria-hidden="true"
                />
              )}

              <span className={styles.caption}>{cell.label}</span>
            </div>
          )
        })}

        {/* Role Cell - No hover, no link */}
        <div className={styles.roleCell}>
          <div className={styles.roleText}>
            Artist<br />
            Engineer<br />
            &amp; Producer
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.blurb}>
          Currently operating out of NYC, Robert Ross Recording offers studio recording, mixing, mastering, production, live sound, as well as session and live musician services.
        </p>

        <Link to="/about#booking" className={styles.ctaButton}>
          About &amp; booking →
        </Link>
      </div>
      </div>
    </PageImageGate>
  )
}
