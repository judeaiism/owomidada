'use client';

import { useRouter } from 'next/navigation';
import useProductStore from '@/stores/productStore';
import ProductList from '@/components/ProductList';
import { useState, ChangeEvent } from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const products = useProductStore((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  const filteredProducts = products
    .filter((product) => product.category.toLowerCase() === category.toLowerCase())
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{category}</h1>

      <div className="flex flex-col items-center my-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          onClick={toggleCategoryList}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse Categories
        </button>
      </div>

      <CategoryList isOpen={isCategoryListOpen} onClose={toggleCategoryList} />

      <ProductList products={filteredProducts} />
    </div>
  );
}