"use client"

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import HamburgerMenu from '../components/HamburgerMenu';
import CategoryList from '../components/CategoryList';
import Footer from '../components/Footer';
import { useState, ChangeEvent, useEffect } from 'react';
import useProductStore from '@/stores/productStore';
import PulsatingButton from '../components/magicui/pulsating-button';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const products = useProductStore((state) => state.items);

  useEffect(() => {
    console.log('Products in Home component:', products);
  }, [products]);

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

  return (
    <main className="min-h-screen bg-gray-100">
      <Header toggleMenu={toggleMenu} />
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
        <ProductList products={products} />
      </div>
      <CategoryList isOpen={isCategoryListOpen} onClose={toggleCategoryList} />
      <Footer />
    </main>
  );
}