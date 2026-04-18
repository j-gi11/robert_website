'use client';

import { useState } from 'react';
import { HeroCarousel } from './hero-carousel';

export function MainContent() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Carousel */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
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

      {/* About Me Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground border-b-4 border-muted-green pb-3 mb-6 inline-block">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Placeholder content for About Me section. This is where you can showcase your background, experience, and what drives your passion for audio engineering and music production.
          </p>
        </div>
      </section>

      {/* Artist Page Section */}
      <section id="artist" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground border-b-4 border-dark-blue pb-3 mb-6 inline-block">
            Artist Page
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Placeholder content for Artist Page section. Feature your work, collaborations, and artistic achievements here.
          </p>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground border-b-4 border-bright-purple pb-3 mb-6 inline-block">
            Resume
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Placeholder content for Resume section. Highlight your skills, experience, and professional qualifications.
          </p>
        </div>
      </section>

      {/* Credits / Recordings Section */}
      <section id="credits" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground border-b-4 border-deep-red pb-3 mb-6 inline-block">
              Studio Work
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Placeholder content for Studio Work section. Feature your studio recordings and production credits.
            </p>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground border-b-4 border-deep-red pb-3 mb-6 inline-block">
              Live Recordings
            </h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              Placeholder content for Live Recordings section. Showcase your live performance recordings and events.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <section className="py-12 sm:py-16 text-center text-muted text-sm">
        <p>&copy; 2024 Robert Ross Harburda. All rights reserved.</p>
      </section>
    </main>
  );
}
