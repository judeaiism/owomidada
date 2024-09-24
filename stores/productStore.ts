import { create } from 'zustand'

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductsState {
  items: Product[];
  addProduct: (product: Product) => void;
  // Add other actions like removeProduct, updateProduct
}

const useProductStore = create<ProductsState>((set) => ({
  items: [],
  addProduct: (product) => set((state) => ({ items: [...state.items, product] })),
  // Implement other actions here
}));

export default useProductStore;