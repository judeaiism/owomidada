import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/1.webp" />
        <link rel="preload" as="image" href="/2.webp" />
      </Head>
      <div className="min-h-screen relative overflow-hidden">
        <Image
          src="/1.webp"
          alt="Background 1"
          fill
          className="object-cover bg-image bg-image-1"
        />
        <Image
          src="/2.webp"
          alt="Background 2"
          fill
          className="object-cover bg-image bg-image-2"
        />
        <div className="absolute top-32 left-0 right-0 flex flex-col items-center z-10">
          <Link href="/home" passHref>
            <button className="text-xl md:text-6xl px-6 py-3 md:px-24 md:py-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors duration-200 ease-in-out">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}