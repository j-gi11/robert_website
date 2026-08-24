import { useEffect, useRef } from 'react'
import { Credit, creditRoles, creditTitle } from '../data/credits'
import { SERVICES } from '../data/site'
import Image from './Image'
import styles from './ListenModal.module.css'

interface ListenModalProps {
  credit: Credit | null
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export default function ListenModal({ credit, onClose }: ListenModalProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const pushedHistory = useRef(false)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    if (!credit) return

    window.history.pushState({ listenModal: true }, '')
    pushedHistory.current = true

    const handlePopState = () => {
      pushedHistory.current = false
      onClose()
    }
    window.addEventListener('popstate', handlePopState)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.body.style.overflow = previousOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit])

  const requestClose = () => {
    if (pushedHistory.current) {
      window.history.back()
    } else {
      onClose()
    }
  }

  useEffect(() => {
    if (!credit) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        requestClose()
        return
      }
      if (e.key === 'Tab' && cardRef.current) {
        const focusable = cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit])

  if (!credit) return null

  const links = SERVICES.filter((service) => credit.links[service])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    touchStartY.current = null
    if (delta > 80) requestClose()
  }

  return (
    <div className={styles.scrim} onClick={requestClose}>
      <div
        ref={cardRef}
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="listen-modal-title"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button ref={closeBtnRef} type="button" className={styles.close} onClick={requestClose} aria-label="Close">
          ×
        </button>

        <div className={styles.art}>
          <Image folder="credits" slug={credit.slug} alt={creditTitle(credit)} color={credit.color} height="100%" />
        </div>

        <div id="listen-modal-title" className={styles.title}>
          {creditTitle(credit)}
        </div>
        <div className={styles.credit}>{creditRoles(credit)}</div>

        <div className={styles.listenLabel}>LISTEN ON</div>
        <div className={styles.links}>
          {links.map((service) => (
            <a
              key={service}
              href={credit.links[service]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {service}
            </a>
          ))}
        </div>

        <div className={styles.hint}>Esc, tap outside, or × to close</div>
      </div>
    </div>
  )
}
