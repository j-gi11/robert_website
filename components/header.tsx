'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About Me', href: '#about', color: 'text-muted-green' },
    { label: 'Artist Page', href: '#artist', color: 'text-dark-blue' },
    { label: 'Resume', href: '#resume', color: 'text-bright-purple' },
    { label: 'Credits/Recordings', href: '#credits', color: 'text-deep-red' },
  ];

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 w-full bg-background border-b border-gray-200">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Home Icon */}
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-colors"
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
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 flex-wrap justify-end">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm md:text-base whitespace-nowrap transition-colors hover:underline ${link.color}`}
              >
                {link.label}
              </a>
            ))}
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
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded hover:bg-gray-100 transition-colors ${link.color}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
