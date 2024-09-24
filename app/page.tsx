"use client"

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import HamburgerMenu from '../components/HamburgerMenu'
import CategoryList from '../components/CategoryList'
import { useState, ChangeEvent, useEffect } from 'react'
import useProductStore from '@/stores/productStore'
import { CartProvider } from '../context/CartContext'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { items: products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen)
  }

  return (
    <CartProvider>
      <main className="min-h-screen bg-gray-100">
        <Header toggleMenu={toggleMenu} />
        <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center my-4">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
            <button
              onClick={toggleCategoryList}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Browse Categories
            </button>
          </div>
          <ProductList products={products} />
        </div>
        <CategoryList isOpen={isCategoryListOpen} onClose={toggleCategoryList} />
      </main>
    </CartProvider>
  )
}