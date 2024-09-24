'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  )
}