import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product } from '../app/types';

export const fetchProductsFromDatabase = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...(doc.data() as Product) });
  });
  return products;
};