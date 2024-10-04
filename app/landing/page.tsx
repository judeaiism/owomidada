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
    }, 100);

    return () => {
      console.log('Cleaning up timer');
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-[3/4]">
        <Image
          src="/1.webp"
          alt="Background 1"
          fill
          className={`object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          onLoad={handleImageLoad}
        />
        <Image
          src="/2.webp"
          alt="Background 2"
          fill
          className={`object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          priority
          onLoad={handleImageLoad}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl text-black">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}