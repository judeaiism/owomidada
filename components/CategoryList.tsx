import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

interface CategoryListProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = {
  top: ['Vehicles', 'Rentals', "Women's Clothing & Shoes", "Men's Clothing & Shoes", 'Furniture', 'Electronics'],
  all: [
    'Antiques & Collectibles', 'Appliances', 'Arts & Crafts', 'Auto Parts', 'Baby', 'Books, Movies & Music',
    'Electronics', 'Furniture', 'Garage Sale', 'Health & Beauty', 'Home Goods & Decor', 'Home Improvement & Tools',
    'Housing for Sale', 'Jewelry & Watches', 'Luggage & Bags', "Men's Clothing & Shoes", 'Miscellaneous',
    'Musical Instruments', 'Patio & Garden', 'Pet Supplies', 'Rentals', 'Sporting Goods', 'Toys & Games',
    'Vehicles', "Women's Clothing & Shoes"
  ]
};

const CategoryList: React.FC<CategoryListProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start overflow-y-auto">
      <div ref={modalRef} className="bg-white p-6 rounded-lg mt-20 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {categories.top.map((category) => (
            <Link key={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="block p-2 bg-gray-100 rounded hover:bg-gray-200">{category}</span>
            </Link>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.all.map((category) => (
            <Link key={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="block p-2 bg-gray-100 rounded hover:bg-gray-200">{category}</span>
            </Link>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
