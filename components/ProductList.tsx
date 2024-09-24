'use client'

import React from 'react';
import { Product } from '../app/types';
import { useCart, CartItem } from '../context/CartContext';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = { ...product, quantity: 1 };
    addToCart(cartItem);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;