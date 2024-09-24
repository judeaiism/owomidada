import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object
  // You can find this in your Firebase project settings
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
