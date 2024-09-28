import { create } from 'zustand';
import { firestore, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

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
  userId: string;
  createdAt: Date;
  shippingOptions: {
    offerShipping: boolean;
    publicMeetup: boolean;
    doorPickup: boolean;
    doorDropoff: boolean;
  };
}

interface ProductsState {
  items: Product[];
  addProduct: (product: Omit<Product, 'id' | 'userId' | 'createdAt'>) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchUserProducts: (userId: string) => Promise<void>;  // Add this line
}

const useProductStore = create<ProductsState>((set) => ({
  items: [],
  addProduct: async (product) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User must be logged in to create a listing');

    const newProduct = {
      ...product,
      userId: user.uid,
      createdAt: new Date(),
    };

    const docRef = await addDoc(collection(firestore, 'listings'), newProduct);
    const productWithId = { ...newProduct, id: docRef.id };

    set((state) => ({ 
      items: [...state.items, productWithId] 
    }));
  },
  fetchProducts: async () => {
    const querySnapshot = await getDocs(collection(firestore, 'listings'));
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    set({ items: products });
  },
  fetchUserProducts: async (userId: string) => {  // Add this function
    const q = query(collection(firestore, 'listings'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    set({ items: userProducts });
  },
}));

export default useProductStore;