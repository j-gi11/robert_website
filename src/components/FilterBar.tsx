import { Link } from 'react-router-dom'
import { GROUPS, GroupKey } from '../data/taxonomy'
import styles from './FilterBar.module.css'

interface FilterBarProps {
  active: GroupKey | null
  onToggle: (key: GroupKey) => void
  onClear: () => void
  visibleCount: number
  totalCount: number
}

export default function FilterBar({ active, onToggle, onClear, visibleCount, totalCount }: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.pills}>
        <span className={styles.label}>FILTER BY</span>
        {GROUPS.map((group) => {
          const isActive = active === group.key
          return (
            <button
              key={group.key}
              type="button"
              className={styles.pill}
              data-color={group.color}
              aria-pressed={isActive}
              onClick={() => onToggle(group.key)}
            >
              {group.label}
              {isActive && <span aria-hidden="true"> ✓</span>}
            </button>
          )
        })}
      </div>

      <div className={styles.right}>
        <span className={styles.count} aria-live="polite">
          {visibleCount} of {totalCount}
        </span>
        {active !== null && (
          <button type="button" className={styles.clear} onClick={onClear}>
            clear
          </button>
        )}
        <Link to="/about#booking" className={styles.contact}>
          Contact me →
        </Link>
      </div>
    </div>
  )
}
