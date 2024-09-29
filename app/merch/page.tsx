'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Add this interface for the merchandise item
interface MerchItem {
  title: string;
  description: string;
  price: string;
  videoSrc: string;
  imageSrc: string;
}

// Add this interface for the HeroDialog props
interface HeroDialogProps {
  item: MerchItem;
  type: 'video' | 'image';
}

function HeroDialog({ item, type }: HeroDialogProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const currentMedia = mediaRef.current;
    if (currentMedia && type === 'video') {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      currentMedia.addEventListener('play', handlePlay);
      currentMedia.addEventListener('pause', handlePause);

      return () => {
        currentMedia.removeEventListener('play', handlePlay);
        currentMedia.removeEventListener('pause', handlePause);
      };
    }
  }, [type]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video">
          <img
            src={item.imageSrc}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" className="text-white border-white">
              {type === 'video' ? 'Watch Video' : 'View Image'}
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col bg-gray-900 text-white">
        <div className="flex-grow overflow-y-auto">
          {type === 'video' ? (
            <video
              ref={mediaRef}
              src={item.videoSrc}
              controls
              className="w-full aspect-video object-cover"
            />
          ) : (
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-gray-300 mt-1">{item.description}</p>
            <p className="text-lg font-bold mt-2">{item.price}</p>
          </div>
        </div>
        <div className="p-4 border-t border-gray-700">
          <Button className="w-full bg-white text-black hover:bg-gray-200">Add to Cart</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Add this array of MerchItem objects
const merchItems: MerchItem[] = [
  {
    title: "Exclusive T-Shirt",
    description: "Limited edition t-shirt with our logo",
    price: "$29.99",
    videoSrc: "/videos/tshirt-video.mp4",
    imageSrc: "/images/tshirt-image.jpg"
  },
  {
    title: "Premium Hoodie",
    description: "Comfortable hoodie for all seasons",
    price: "$49.99",
    videoSrc: "/videos/hoodie-video.mp4",
    imageSrc: "/images/hoodie-image.jpg"
  },
  // Add more items as needed
];

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Exclusive Merchandise</h1>
          <Link href="/" passHref>
            <Button 
              variant="outline" 
              className="text-black bg-white border-white hover:bg-gray-200 hover:text-black transition-colors duration-300 text-lg px-6 py-3"
            >
              Home
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {merchItems.map((item: MerchItem, index: number) => (
            <div key={index} className="space-y-4">
              <HeroDialog item={item} type="video" />
              <HeroDialog item={item} type="image" />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                <p className="text-lg font-bold mt-2">{item.price}</p>
                <Button className="mt-3 bg-white text-black hover:bg-gray-200">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}