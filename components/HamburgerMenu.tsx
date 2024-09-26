import React from 'react';
import Link from 'next/link';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-end">
      <div className="w-64 bg-white h-full shadow-lg p-4">
        <button onClick={onClose} className="float-right text-2xl">&times;</button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-blue-600 hover:text-blue-800">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
