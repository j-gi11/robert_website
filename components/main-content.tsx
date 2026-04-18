import { HeroCarousel } from './hero-carousel';

export function MainContent() {
  return (
    <main className="flex flex-col min-h-[calc(100vh-57px)]">
      {/* Hero Section with Carousel — fills all remaining space */}
      <section className="relative flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
        <HeroCarousel />
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight text-balance mb-4">
            Robert Ross Harburda
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted font-normal">
            Engineer, Artist &amp; Producer
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-5 px-6 flex items-center justify-center gap-5 border-t border-gray-200 bg-background">
        <p className="text-sm text-muted">&copy; 2025 Robert Ross Harburda. All rights reserved.</p>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-muted hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        </a>

        {/* Email */}
        <a
          href="mailto:robert@example.com"
          aria-label="Email"
          className="text-muted hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
      </footer>
    </main>
  );
}
