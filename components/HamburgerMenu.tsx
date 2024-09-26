import React from 'react';
import Link from 'next/link';
import { FaUser, FaPlus } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const { user, logOut } = useAuth();

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
            {user ? (
              <>
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
                  <button
                    onClick={logOut}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="block w-full">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="block w-full">
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300">
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
