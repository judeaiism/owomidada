import React from 'react';
import Link from 'next/link';
import { FaUser, FaPlus, FaComments, FaBell, FaTshirt, FaUsers } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const { user, logOut } = useAuth();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex flex-col h-full">
        <button onClick={onClose} className="self-end text-2xl">&times;</button>
        <nav className="mt-8 flex-grow">
          <ul className="space-y-4">
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
                  <Link href="/chat" className="flex items-center text-blue-600 hover:text-blue-800">
                    <FaComments className="mr-2" />
                    Chat
                  </Link>
                </li>
                <li>
                  <Link href="/notifications" className="flex items-center text-blue-600 hover:text-blue-800">
                    <FaBell className="mr-2" />
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link href="/merch" className="flex items-center text-blue-600 hover:text-blue-800">
                    <FaTshirt className="mr-2" />
                    Merchandise
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
                <li>
                  <Link href="/village-square" className="flex items-center text-blue-600 hover:text-blue-800">
                    <FaUsers className="mr-2" />
                    Village Square
                  </Link>
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
                <li>
                  <Link href="/merch" className="block w-full">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition duration-300 flex items-center justify-center">
                      <FaTshirt className="mr-2" />
                      Merchandise
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/village-square" className="block w-full">
                    <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-300 flex items-center justify-center">
                      <FaUsers className="mr-2" />
                      Village Square
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
