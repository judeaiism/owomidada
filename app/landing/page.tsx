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
          layout="fill"
          objectFit="cover"
          priority
          className="bg-image bg-image-1"
        />
        <Image
          src="/2.webp"
          alt="Background 2"
          layout="fill"
          objectFit="cover"
          priority
          className="bg-image bg-image-2"
        />
        <div className="absolute top-32 right-4 flex space-x-4 z-10">
          <Link href="/home" className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 transition-colors">
            Gba Owo/Register
          </Link>
          <Link href="/login" className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 transition-colors">
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}