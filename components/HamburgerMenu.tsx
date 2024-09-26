import React from 'react';
import Link from 'next/link';
import { FaUser, FaPlus } from 'react-icons/fa'; // Import icons

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-end">
      <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
        <button onClick={onClose} className="self-end text-2xl">&times;</button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaUser className="mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link href="/listing" className="flex items-center text-blue-600 hover:text-blue-800">
                <FaPlus className="mr-2" />
                Create Listing
              </Link>
            </li>
            <li>
              <Link href="/login" className="block w-full">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                  Login / Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
