'use client';

import { useCartStore } from '@/store/useCartStore';
import ProductCard from '@/components/ProductCard';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      {/* Implement checkout functionality as needed */}
    </div>
  );
}