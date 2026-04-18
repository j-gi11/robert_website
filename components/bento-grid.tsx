"use client";

import { useState } from "react";
import { HeroSection } from "./hero-section";
import { BentoBox } from "./bento-box";
import { HomeIcon } from "./home-icon";
import { PagePlaceholder } from "./page-placeholder";
import { AboutSection } from "./about-section";

type View = "home" | "artist" | "resume" | "credits" | "live-recordings";

export function BentoGrid() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [creditsExpanded, setCreditsExpanded] = useState(false);

  const handleHomeClick = () => {
    setCurrentView("home");
    setCreditsExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCreditsClick = () => {
    if (creditsExpanded) {
      setCreditsExpanded(false);
    } else {
      setCreditsExpanded(true);
    }
  };

  // Home/Landing View
  if (currentView === "home") {
    return (
      <main>
        <HomeIcon onClick={handleHomeClick} />

        {/* Hero Section with Bento Grid */}
        <div className="min-h-screen w-full p-3 md:p-4 lg:p-6 bg-background">
          <div
            className="
              grid 
              min-h-[calc(100vh-1.5rem)] 
              md:h-[calc(100vh-2rem)] 
              lg:h-[calc(100vh-3rem)]
              gap-3 
              md:gap-4 
              grid-cols-2
              auto-rows-[minmax(80px,auto)]
              md:grid-cols-12
              md:grid-rows-4
            "
          >
            {/* Main Hero Block */}
            <HeroSection />

            {/* Bento Boxes - Right Side */}
            {/* Box 1: About Me - Muted Green */}
            <BentoBox
              color="#579D62"
              label="About Me"
              onClick={handleAboutClick}
            />

            {/* Box 2: Artist Page - Dark Blue */}
            <BentoBox
              color="#2C4B7E"
              label="Artist Page"
              onClick={() => setCurrentView("artist")}
            />

            {/* Box 3: Resume - Bright Purple */}
            <BentoBox
              color="#8722EE"
              label="Resume"
              onClick={() => setCurrentView("resume")}
            />

            {/* Box 4: Credits/Recordings - Deep Red (Dynamic) */}
            {!creditsExpanded ? (
              <BentoBox
                color="#B6273E"
                label="Credits/Recordings"
                onClick={handleCreditsClick}
              />
            ) : (
              <>
                <BentoBox
                  color="#B6273E"
                  label="Credits/Studio Work"
                  onClick={() => setCurrentView("credits")}
                />
                <BentoBox
                  color="#B6273E"
                  label="Live Recordings"
                  onClick={() => setCurrentView("live-recordings")}
                />
              </>
            )}
          </div>
        </div>

        {/* About Section */}
        <AboutSection />
      </main>
    );
  }

  // Artist Page
  if (currentView === "artist") {
    return (
      <main>
        <HomeIcon onClick={handleHomeClick} />
        <PagePlaceholder
          title="Artist Page"
          description="Explore Robert Ross Harburda's artistic endeavors, discography, and creative projects."
        />
      </main>
    );
  }

  // Resume Page
  if (currentView === "resume") {
    return (
      <main>
        <HomeIcon onClick={handleHomeClick} />
        <PagePlaceholder
          title="Resume"
          description="Professional experience, skills, and credentials in audio engineering and production."
        />
      </main>
    );
  }

  // Credits Page
  if (currentView === "credits") {
    return (
      <main>
        <HomeIcon onClick={handleHomeClick} />
        <PagePlaceholder
          title="Credits & Studio Work"
          description="Notable projects, collaborations, and studio engineering work."
        />
      </main>
    );
  }

  // Live Recordings Page
  if (currentView === "live-recordings") {
    return (
      <main>
        <HomeIcon onClick={handleHomeClick} />
        <PagePlaceholder
          title="Live Recordings"
          description="Collection of live performances and recordings featuring Robert Ross Harburda."
        />
      </main>
    );
  }

  return null;
}
