import { create } from 'zustand'

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  condition: string;
  location: string;
  listingType: string;
}

interface ProductsState {
  items: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const useProductStore = create<ProductsState>((set) => ({
  items: [],
  addProduct: (product) => {
    const newProduct = { ...product, id: Date.now().toString() };
    set((state) => ({ 
      items: [...state.items, newProduct] 
    }));
    console.log('Product added:', newProduct);
  },
}));

export default useProductStore;