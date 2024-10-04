"use client"

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import ProductList from '../../components/ProductList';
import HamburgerMenu from '../../components/HamburgerMenu';
import CategoryList from '../../components/CategoryList';
import Footer from '../../components/Footer';
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import useProductStore from '@/stores/productStore';
import PulsatingButton from '../../components/magicui/pulsating-button';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const { user, getUserData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items: products, fetchProducts } = useProductStore();
  const [userData, setUserData] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        setUserData(data);
      }
    };
    fetchUserData();
  }, [user, getUserData]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['/placeholder1.jpg', '/placeholder2.jpg', '/placeholder3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handlePopupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Add the email to Firestore
      await addDoc(collection(db, 'subscribedEmails'), {
        email: email,
        timestamp: new Date()
      });
      console.log('Email successfully stored in Firebase');
      setIsPopupOpen(false);
      setEmail(''); // Clear the email input
    } catch (error) {
      console.error('Error storing email in Firebase:', error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    // Add meta tag to prevent zooming on mobile
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);

    return () => {
      // Remove the meta tag when component unmounts
      document.getElementsByTagName('head')[0].removeChild(meta);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header toggleMenu={toggleMenu} userData={userData} />
      <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center my-4">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
          <PulsatingButton
            onClick={toggleCategoryList}
            className="mt-4 mb-8"
          >
            Browse Categories
          </PulsatingButton>
          
          {/* Image Carousel Placeholder */}
          <div className="relative w-full max-w-3xl h-64 mb-8">
            <Image
              src={images[currentImageIndex]}
              alt={`Placeholder ${currentImageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentImageIndex === 0}
              className="rounded-lg object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
            >
              &#8250;
            </button>
          </div>
        </div>
        <ProductList products={products} userData={userData} />
      </div>
      <CategoryList isOpen={isCategoryListOpen} onClose={toggleCategoryList} />
      <Footer />

      {/* Updated Pop-up Dialog */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-[300px] w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">OWOMIDA</DialogTitle>
            <DialogDescription className="text-sm">
              Get notified about latest drops.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePopupSubmit} className="grid gap-3 py-3">
            <div className="grid grid-cols-1 items-center gap-3">
              <Input
                id="email"
                placeholder="Enter your email"
                className="col-span-1 text-sm"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full text-sm">Submit</Button>
          </form>
          <p className="text-xs text-center text-gray-500">
            Disclaimer: © 2024 Owomida. All rights reserved.
          </p>
          <p className="text-xs text-center text-gray-500">
            Built with <a href="https://mvpin24.store" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mvpin24</a>
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}