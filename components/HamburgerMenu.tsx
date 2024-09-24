import React from 'react';
import Link from 'next/link';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
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
