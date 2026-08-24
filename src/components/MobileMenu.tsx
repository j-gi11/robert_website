import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { site } from '../data/site'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navLinks: Array<{ label: string; href: string }>
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'auto'
      }
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleBackdropClick} role="presentation">
      <div className={styles.menu}>
        <div className={styles.linkGrid}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={styles.linkBlock}
              onClick={onClose}
              data-index={navLinks.indexOf(link)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.handle}>{site.instagram.displayCaps}</span>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseRoundedIcon fontSize="inherit" />
          </button>
        </div>
      </div>
    </div>
  )
}
