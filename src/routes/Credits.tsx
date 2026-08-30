import { useEffect, useMemo, useRef, useState } from 'react'
import { CREDITS, Credit } from '../data/credits'
import { matchesFilter, GroupKey } from '../data/taxonomy'
import { imageUrls } from '../data/images'
import FilterBar from '../components/FilterBar'
import CreditTile from '../components/CreditTile'
import ListenModal from '../components/ListenModal'
import PageImageGate from '../components/PageImageGate'
import styles from './Credits.module.css'

const SORTED_CREDITS = [...CREDITS].sort((a, b) => b.year - a.year)
const CREDIT_IMAGES = imageUrls('credits')

export default function Credits() {
  const [active, setActive] = useState<GroupKey | null>(null)
  const [openCredit, setOpenCredit] = useState<Credit | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)

  const visible = useMemo(
    () => SORTED_CREDITS.filter((c) => matchesFilter(c.roles, active ? [active] : [])),
    [active],
  )

  const handleToggle = (key: GroupKey) => {
    setActive((current) => (current === key ? null : key))
  }

  const handleOpen = (credit: Credit, trigger: HTMLButtonElement) => {
    openerRef.current = trigger
    setOpenCredit(credit)
  }

  const handleClose = () => {
    setOpenCredit(null)
  }

  useEffect(() => {
    if (openCredit === null) {
      openerRef.current?.focus()
    }
  }, [openCredit])

  return (
    <PageImageGate images={CREDIT_IMAGES}>
    <main className={styles.credits}>
      <div className={styles.pagePad}>
        <span className={styles.eyebrow}>STUDIO</span>
        <h1 className={styles.heading}>Credits</h1>

        <FilterBar
          active={active}
          onToggle={handleToggle}
          onClear={() => setActive(null)}
          visibleCount={visible.length}
          totalCount={SORTED_CREDITS.length}
        />

        {visible.length > 0 ? (
          <div className={styles.grid} key={active ?? 'all'}>
            {visible.map((credit) => (
              <CreditTile key={credit.slug} credit={credit} onOpen={handleOpen} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Nothing matches all of those. Try removing a filter.</p>
        )}
      </div>

      <ListenModal credit={openCredit} onClose={handleClose} />
    </main>
    </PageImageGate>
  )
}
