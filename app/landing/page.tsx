'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    console.log('Landing page mounted');

    const redirectTimer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      console.log(`Redirecting to home page after ${elapsedTime}ms`);
      window.location.href = '/home';
    }, 300);

    return () => {
      console.log('Cleaning up timer');
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Image
        src="/1.webp"
        alt="Background 1"
        fill
        className={`object-cover bg-image bg-image-1 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority
        onLoad={handleImageLoad}
      />
      <Image
        src="/2.webp"
        alt="Background 2"
        fill
        className={`object-cover bg-image bg-image-2 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        priority
        onLoad={handleImageLoad}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl text-white">Loading...</div>
        </div>
      )}
    </div>
  );
}