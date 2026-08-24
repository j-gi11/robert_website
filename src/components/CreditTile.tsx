import { forwardRef } from 'react'
import { Credit, creditRoles, creditTitle } from '../data/credits'
import { palette } from '../theme'
import Image from './Image'
import styles from './CreditTile.module.css'

interface CreditTileProps {
  credit: Credit
  onOpen: (credit: Credit, trigger: HTMLButtonElement) => void
}

const CreditTile = forwardRef<HTMLButtonElement, CreditTileProps>(function CreditTile(
  { credit, onOpen },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.tile}
      onClick={(e) => onOpen(credit, e.currentTarget)}
    >
      <span className={styles.art}>
        <Image
          folder="credits"
          slug={credit.slug}
          alt={creditTitle(credit)}
          color={credit.color}
          height="100%"
        />
        <span className={styles.overlay} aria-hidden="true">
          <span className={styles.listenPill}>Listen ▸</span>
        </span>
        <span className={styles.mobileBadge} aria-hidden="true">
          Listen ▸
        </span>
      </span>
      <span className={styles.title}>{creditTitle(credit)}</span>
      <span className={styles.roles} style={{ color: palette[credit.color] }}>
        {creditRoles(credit)}
      </span>
    </button>
  )
})

export default CreditTile
