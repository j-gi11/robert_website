import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../data/images'
import { palette } from '../theme'
import styles from './Home.module.css'

interface HeroCellConfig {
  slug: string
  color: string
  label: string
  link: string
  isRole?: boolean
}

const heroCells: HeroCellConfig[] = [
  { slug: 'session', color: palette.green, label: 'session', link: '/artist' },
  { slug: 'gig', color: palette.navy, label: 'gig', link: '/artist' },
  { slug: 'control-room', color: palette.purple, label: 'control-room', link: '/credits' },
  { slug: 'live', color: palette.gold, label: 'live', link: '/artist' },
]

interface CellRef {
  element: HTMLDivElement | null
  visible: boolean
}

export default function Home() {
  const cellRefs = useRef<Map<string, CellRef>>(new Map())
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set())

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
        {heroCells.map((cell) => {
          const imageUrl = image('hero', cell.slug)
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
              key={cell.slug}
              className={`${styles.heroCell} ${blockClass} ${visibleCells.has(cell.slug) ? styles.visible : ''}`}
              style={{
                backgroundColor: cell.color,
              }}
              data-cell={cell.slug}
              ref={(el) => {
                if (el) {
                  cellRefs.current.set(cell.slug, { element: el, visible: false })
                }
              }}
            >
              <div className={styles.colorOverlay} style={{ backgroundColor: cell.color }} />

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={cell.label}
                  className={styles.photoImage}
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
          Robert Ross Recording is a one man army run by Robert Ross Harburda — Ross. Working out of NYC, at the world famous jazz club Birdland. Classical orchestras, big band jazz, DIY house shows: all production sizes and budgets.
        </p>

        <Link to="/about#booking" className={styles.ctaButton}>
          About &amp; booking →
        </Link>
      </div>
    </div>
  )
}
