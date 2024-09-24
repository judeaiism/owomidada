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
  fetchProducts: () => void;
}

const useProductStore = create<ProductsState>((set) => ({
  items: [],
  addProduct: (product) => set((state) => ({ items: [...state.items, product] })),
  fetchProducts: () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Sample Product',
        price: 19.99,
        category: 'Electronics',
        image: 'https://example.com/sample-image.jpg',
        description: 'This is a sample product description.',
      },
      // Add more mock products as needed
    ];
    set({ items: mockProducts });
  },
}));

export default useProductStore;