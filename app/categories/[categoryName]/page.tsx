'use client';

import { useRouter } from 'next/navigation';
import useProductStore from '@/stores/productStore';
import ProductList from '@/components/ProductList';
import { useState, ChangeEvent } from 'react';
import SearchBar from '@/components/SearchBar';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const products = useProductStore((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products
    .filter((product) => product.category.toLowerCase() === category.toLowerCase())
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">{category}</h1>

      {/* Search, Sort, and Filter */}
      <div className="my-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Implement sort and filter components similarly */}
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}