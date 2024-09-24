import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Product } from '../app/types';

export const fetchProductsFromDatabase = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    const productData = doc.data() as Omit<Product, 'id'>;
    products.push({ ...productData, id: doc.id });
  });
  return products;
};