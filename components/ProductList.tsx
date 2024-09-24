'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter, SortAsc } from 'lucide-react'

// Mock data for products
const mockProducts = [
  { id: 1, name: 'Smartphone', price: 599, category: 'Electronics' },
  { id: 2, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 3, name: 'T-shirt', price: 19.99, category: 'Fashion' },
  { id: 4, name: 'Jeans', price: 49.99, category: 'Fashion' },
  { id: 5, name: 'Coffee Table', price: 149, category: 'Home & Garden' },
  { id: 6, name: 'Soccer Ball', price: 29.99, category: 'Sports' },
]

export default function ProductList() {
  const [products, setProducts] = useState(mockProducts)
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterCategory, setFilterCategory] = useState('')

  const handleSort = () => {
    const sorted = [...products].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    })
    setProducts(sorted)
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleFilter = (category: string) => {
    setFilterCategory(category)
    if (category) {
      const filtered = mockProducts.filter(product => product.category === category)
      setProducts(filtered)
    } else {
      setProducts(mockProducts)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Listings</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleSort}
            className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            <SortAsc className="w-5 h-5" />
            <span>Sort by Price</span>
          </button>
          <div className="relative">
            <button
              onClick={() => handleFilter(filterCategory ? '' : 'Electronics')}
              className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
            {filterCategory && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                1
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={`https://via.placeholder.com/300x200?text=${product.name}`} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mb-4">{product.category}</p>
              <Link href={`/product/${product.id}`} className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/create-listing" className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
          Create New Listing
        </Link>
      </div>
    </div>
  )
}