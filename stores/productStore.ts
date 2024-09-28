import { create } from 'zustand';
import { firestore, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
  hidden: boolean; // Add this line
  shippingOptions: {
    offerShipping: boolean;
    publicMeetup: boolean;
    doorPickup: boolean;
    doorDropoff: boolean;
  };
}

interface ProductsState {
  items: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchUserProducts: (userId: string) => Promise<void>;
  hideProduct: (productId: string) => Promise<void>;
  unhideProduct: (productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
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
      hidden: false, // Add this line to set the initial hidden state
    };

    const docRef = await addDoc(collection(firestore, 'listings'), newProduct);
    const productWithId = { ...newProduct, id: docRef.id };

    set((state) => ({ 
      items: [...state.items, productWithId] 
    }));
  },
  fetchProducts: async () => {
    const querySnapshot = await getDocs(collection(firestore, 'listings'));
    const products = querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product))
      .filter(product => !product.hidden); // Filter out hidden products
    set({ items: products });
  },
  fetchUserProducts: async (userId: string) => {
    const q = query(collection(firestore, 'listings'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
    set({ items: userProducts }); // Keep all user products, including hidden ones
  },
  hideProduct: async (productId: string) => {
    const productRef = doc(firestore, 'listings', productId);
    await updateDoc(productRef, { hidden: true });
    set((state) => ({
      items: state.items.map(item => 
        item.id === productId ? { ...item, hidden: true } : item
      )
    }));
  },
  unhideProduct: async (productId: string) => {
    const productRef = doc(firestore, 'listings', productId);
    await updateDoc(productRef, { hidden: false });
    set((state) => ({
      items: state.items.map(item => 
        item.id === productId ? { ...item, hidden: false } : item
      )
    }));
  },
  deleteProduct: async (productId: string) => {
    const productRef = doc(firestore, 'listings', productId);
    await deleteDoc(productRef);
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    }));
  },
}));

export default useProductStore;