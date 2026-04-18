'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreditsDropdownOpen, setIsCreditsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const pathname = usePathname();

  useEffect(() => {
    // Extract page from pathname
    if (pathname === '/') {
      setActivePage('home');
    } else {
      setActivePage(pathname.replace('/', ''));
    }
  }, [pathname]);

  const navLinks = [
    { label: 'About Me', href: '/about', id: 'about', color: '#579D62', bgColor: 'bg-muted-green' },
    { label: 'Artist Page', href: '/artist', id: 'artist', color: '#2C4B7E', bgColor: 'bg-dark-blue' },
    { label: 'Resume', href: '/resume', id: 'resume', color: '#8722EE', bgColor: 'bg-bright-purple' },
  ];

  const creditsLinks = [
    { label: 'Studio Work', href: '/studio-work', id: 'studio-work' },
    { label: 'Live Recordings', href: '/live-recordings', id: 'live-recordings' },
  ];

  const isLinkActive = (id: string) => activePage === id;

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 w-full bg-background border-b border-gray-200">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Home Icon */}
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Home"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4"
              />
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-end flex-1 gap-4">
            <div className="flex items-center justify-between gap-4 flex-1 max-w-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="relative px-3 sm:px-4 py-2 transition-all"
                  style={{
                    backgroundColor: link.color,
                    opacity: isLinkActive(link.id) ? 1 : 0.82,
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = isLinkActive(link.id) ? '1' : '0.82'; }}
                >
                  <span className="text-white text-xs sm:text-sm font-semibold block whitespace-nowrap">
                    {link.label}
                  </span>
                  {isLinkActive(link.id) && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40" />
                  )}
                </Link>
              ))}
            </div>

            {/* Credits Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCreditsDropdownOpen(!isCreditsDropdownOpen)}
                className="px-3 sm:px-4 py-2 transition-all text-white text-xs sm:text-sm font-semibold"
                style={{
                  backgroundColor: '#B6273E',
                  opacity: isLinkActive('studio-work') || isLinkActive('live-recordings') ? 1 : 0.82,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = isLinkActive('studio-work') || isLinkActive('live-recordings') ? '1' : '0.82'; }}
              >
                Credits/Recordings
                <span className="ml-2">▼</span>
              </button>
              {isCreditsDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-max">
                  {creditsLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setIsCreditsDropdownOpen(false)}
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100 first:rounded-t last:rounded-b transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 bg-background shadow-lg rounded-b-lg p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 border-l-4 transition-colors ${isLinkActive(link.id) ? 'bg-gray-100' : ''
                  }`}
                style={{
                  borderLeftColor: link.color,
                }}
              >
                <span className="text-black text-sm font-medium">{link.label}</span>
              </Link>
            ))}

            {/* Mobile Credits Dropdown */}
            <div>
              <button
                onClick={() => setIsCreditsDropdownOpen(!isCreditsDropdownOpen)}
                className="w-full text-left px-4 py-2 border-l-4 text-black text-sm font-medium transition-colors"
                style={{
                  borderLeftColor: '#B6273E',
                  backgroundColor: isCreditsDropdownOpen ? 'rgba(182, 39, 62, 0.1)' : '',
                }}
              >
                Credits/Recordings {isCreditsDropdownOpen ? '▲' : '▼'}
              </button>
              {isCreditsDropdownOpen && (
                <div className="ml-4 space-y-2 mt-2">
                  {creditsLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsCreditsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-black text-sm hover:bg-gray-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
