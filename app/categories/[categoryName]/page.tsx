'use client';

import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/store/useProductsStore';
import ProductList from '@/components/ProductList';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

export default function CategoryPage({ params }) {
  const { category } = params;
  const products = useProductsStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products
    .filter((product) => product.category.toLowerCase() === category.toLowerCase())
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{category}</h1>

      {/* Search, Sort, and Filter */}
      <div className="my-4">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Implement sort and filter components similarly */}
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}