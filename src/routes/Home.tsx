import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../data/images'
import { palette } from '../theme'
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
const ROTATE_INTERVAL_MS = 5000
/** Random jitter applied to each cell's own interval, so cells drift out of lockstep. */
const ROTATE_JITTER_MS = 1800
/** Stagger between cells' first tick, so they don't all change together. */
const STAGGER_MS = ROTATE_INTERVAL_MS / heroCells.length

interface CellRef {
  element: HTMLDivElement | null
  visible: boolean
}

export default function Home() {
  const cellRefs = useRef<Map<string, CellRef>>(new Map())
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set())
  const [activeIndices, setActiveIndices] = useState<number[]>(
    heroCells.map((_, i) => i),
  )
  const hoveredKeysRef = useRef<Set<string>>(new Set())

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

    const scheduleCell = (ci: number) => {
      const tick = () => {
        if (!hoveredKeysRef.current.has(heroCells[ci].key)) {
          setActiveIndices((prev) => {
            const resting = [0, 1, 2, 3, 4].find((i) => !prev.includes(i))
            if (resting === undefined) return prev
            const next = [...prev]
            next[ci] = resting
            return next
          })
        }
        const jitter = ROTATE_INTERVAL_MS + (Math.random() * ROTATE_JITTER_MS - ROTATE_JITTER_MS / 2)
        timeoutIds[ci] = window.setTimeout(tick, jitter)
      }
      timeoutIds[ci] = window.setTimeout(tick, ci * STAGGER_MS + Math.random() * 500)
    }

    heroCells.forEach((_, ci) => scheduleCell(ci))

    return () => timeoutIds.forEach((id) => clearTimeout(id))
  }, [])

  return (
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
  )
}
