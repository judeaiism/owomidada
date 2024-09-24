import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const { cart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">&times;</button>
        <nav className="p-4">
          <ul>
            <li className="py-2"><Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li className="py-2"><Link href="/products" className="text-blue-600 hover:text-blue-800">Products</Link></li>
            <li className="py-2"><Link href="/about" className="text-blue-600 hover:text-blue-800">About</Link></li>
            <li className="py-2"><Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact</Link></li>
            <li className="py-2">
              <Link href="/cart" className="text-blue-600 hover:text-blue-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Link href="/create-listing" className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Create New Listing
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
