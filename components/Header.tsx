import React from 'react'
import Link from 'next/link'

interface HeaderProps {
  toggleMenu: () => void
  userData: any; // Add this line
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, userData }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">Owọ mi dá - Marketplace</h1>
        </Link>
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {userData && (
        <div className="container mx-auto px-4 py-2 text-sm text-gray-600">
          <span>Welcome, {userData.firstName}</span>
          {/* Add more personalized content based on userData */}
        </div>
      )}
    </header>
  )
}

export default Header