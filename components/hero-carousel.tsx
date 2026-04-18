'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Placeholder images
  const images = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images Container */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Background ${index + 1}`}
            fill
            className="object-cover opacity-10"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Off-white Overlay */}
      <div className="absolute inset-0 bg-background/80" />
    </div>
  );
}
