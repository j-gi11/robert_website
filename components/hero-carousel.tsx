'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/hero-1.jpg', alt: 'Recording studio mixing console' },
  { src: '/images/hero-2.jpg', alt: 'Concert stage with dramatic lighting' },
  { src: '/images/hero-3.jpg', alt: 'Vintage reel-to-reel tape machine' },
  { src: '/images/hero-4.jpg', alt: 'Musician silhouette on stage' },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            style={{ opacity: 0.50 }}
            priority={index === 0}
          />
        </div>
      ))}
      {/* Off-white overlay to keep text legible */}
      <div className="absolute inset-0 bg-background/75" />
    </div>
  );
}
