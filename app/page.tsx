"use client"

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import HamburgerMenu from '../components/HamburgerMenu'
import { useState, ChangeEvent, useEffect } from 'react'
import useProductStore from '@/stores/productStore'
import { CartProvider } from '../context/CartContext'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  return (
    <CartProvider>
      <main className="min-h-screen bg-gray-100">
        <Header toggleMenu={toggleMenu} />
        <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <ProductList products={products} />
      </main>
    </CartProvider>
  )
}