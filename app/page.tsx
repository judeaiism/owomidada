"use client"

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ProductList from '../components/ProductList'
import HamburgerMenu from '../components/HamburgerMenu'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header toggleMenu={toggleMenu} />
      <HamburgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <SearchBar />
      <ProductList />
    </main>
  )
}