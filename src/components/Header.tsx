import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import MobileMenu from './MobileMenu'
import InstagramGlyph from './InstagramGlyph'
import styles from './Header.module.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Artist', href: '/artist' },
    { label: 'Studio Credits', href: '/credits' },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.desktop}>
          {!isHome && (
            <Link to="/" className={styles.wordmark}>
              {site.name}
            </Link>
          )}
          <nav className={styles.nav}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={styles.navLink}
                data-active={pathname === link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.instagram}>
            <InstagramGlyph />
          </a>
        </div>

        <div className={styles.mobile}>
          <Link to="/" className={styles.wordmark}>
            {site.name}
          </Link>
          <div className={styles.mobileRight}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.instagram}>
              <InstagramGlyph />
            </a>
            <button
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
        />
      )}
    </>
  )
}
