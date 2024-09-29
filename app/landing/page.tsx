import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { RainbowButton } from "@/components/ui/rainbow-button";

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
        <div className="absolute top-32 right-4 flex space-x-6 z-10">
          <Link href="/home" passHref>
            <RainbowButton>
            ɡ͡ba Owọ / View Deals
            </RainbowButton>
          </Link>
          <Link href="/login" passHref>
            <RainbowButton>
              Log in
            </RainbowButton>
          </Link>
        </div>
      </div>
    </>
  );
}