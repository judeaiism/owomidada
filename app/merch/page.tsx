'use client'

import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { PaystackButton } from 'react-paystack'

// Dynamically import PaystackButton with ssr option set to false
const DynamicPaystackButton = dynamic(
  () => import('react-paystack').then((mod) => mod.PaystackButton),
  { ssr: false }
)

// Define our own PaystackButtonProps type
interface PaystackButtonProps {
  email: string;
  amount: number;
  metadata: {
    name: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  publicKey: string;
  text: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  reference: string;
  currency: string;
  channels?: string[];
  label?: string;
}

// Add this interface for the merchandise item
interface MerchItem {
  id: string;
  title: string;
  description: string;
  price: number; // Change this to a number
  videoSrc: string;
  imageSrc: string;
}

// Add this interface for the HeroDialog props
interface HeroDialogProps {
  item: MerchItem;
  type: 'video' | 'image';
}

// Add this new interface for Paystack configuration
interface PaystackConfig {
  reference: string;
  email: string;
  amount: number;
  publicKey: string;
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
            <p className="text-lg font-bold mt-2">₦{(item.price / 100).toLocaleString()}</p>
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
    id: "1",
    title: "Exclusive T-Shirt",
    description: "Limited edition t-shirt with our logo",
    price: 8600000, // Price in cents
    videoSrc: "/videos/tshirt-video.mp4",
    imageSrc: "/images/tshirt-image.jpg"
  },
  {
    id: "2",
    title: "Premium Hoodie",
    description: "Comfortable hoodie for all seasons",
    price: 8600000, // Price in cents
    videoSrc: "/videos/hoodie-video.mp4",
    imageSrc: "/images/hoodie-image.jpg"
  },
  // Add more items as needed
];

export default function MerchPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePaystackSuccessAction = (reference: string) => {
    console.log('Payment successful. Reference:', reference);
    setError('');
    // Handle successful payment (e.g., clear cart, show success message, redirect to thank you page)
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment window closed.');
    setError('Your payment was not completed. If you experienced any issues, please try again or contact our support team.');
  };

  const componentProps = (item: MerchItem): PaystackButtonProps => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_LIVE_PUBLIC_KEY;
    if (!publicKey) {
      console.error("Paystack public key is not set");
      setError("We're sorry, but our payment system is currently unavailable. Please try again later or contact support.");
      return {
        email: '',
        amount: 0,
        metadata: { name: '', custom_fields: [] },
        publicKey: '',
        text: 'Pay Now',
        onSuccess: () => {},
        onClose: () => {},
        reference: '',
        currency: 'NGN',
      };
    }

    return {
      email,
      amount: item.price,
      metadata: {
        name,
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: name
          },
          {
            display_name: "Item",
            variable_name: "item",
            value: item.title
          },
          {
            display_name: "Callback URL",
            variable_name: "callback_url",
            value: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`
          }
        ]
      },
      publicKey,
      text: "Pay Now",
      onSuccess: handlePaystackSuccessAction,
      onClose: handlePaystackCloseAction,
      reference: `${item.id}_${Date.now()}`,
      currency: "NGN",
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      label: `Payment for ${item.title}`,
    };
  };

  const isFormValid = email.trim() !== '' && name.trim() !== '';

  if (!isMounted) {
    return null; // or a loading spinner
  }

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
        
        {/* Add instructions for users */}
        <div className="mb-4 text-center text-yellow-400">
          <p>Please enter your name and email before clicking "Pay Now"</p>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 text-black w-full sm:w-auto"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 text-black w-full sm:w-auto"
          />
        </div>
        
        {/* Display a message if the form is not valid */}
        {!isFormValid && (
          <div className="mb-4 text-center text-red-500">
            <p>Please fill in both name and email fields to enable payment.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {merchItems.map((item: MerchItem) => (
            <div key={item.id} className="space-y-4">
              <HeroDialog item={item} type="video" />
              <HeroDialog item={item} type="image" />
              <div className="text-center">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-300 mt-1">{item.description}</p>
                <p className="text-lg font-bold mt-2">₦{(item.price / 100).toLocaleString()}</p>
                <DynamicPaystackButton 
                  {...componentProps(item)} 
                  className={`mt-3 px-4 py-2 rounded ${
                    isFormValid 
                      ? 'bg-white text-black hover:bg-gray-200 cursor-pointer' 
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!isFormValid}
                />
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  )
}