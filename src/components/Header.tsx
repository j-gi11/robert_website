import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { site } from '../data/site'
import MobileMenu from './MobileMenu'
import styles from './Header.module.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Artist', href: '/artist' },
    { label: 'Studio Credits', href: '/credits' },
  ]

  return (
    <>
      <header className={styles.header}>
        <div className={styles.desktop}>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink} data-active={pathname === '/'}>
              Home
            </Link>
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
            <InstagramIcon fontSize="inherit" />
          </a>
        </div>

        <div className={styles.mobile}>
          <Link to="/" className={styles.homeLink} aria-label={`${site.name} home`}>
            <HomeOutlinedIcon fontSize="inherit" />
          </Link>
          <div className={styles.mobileRight}>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.instagram}>
              <InstagramIcon fontSize="inherit" />
            </a>
            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuRoundedIcon fontSize="inherit" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={[{ label: 'Home', href: '/' }, ...navLinks]}
        />
      )}
    </>
  )
}
