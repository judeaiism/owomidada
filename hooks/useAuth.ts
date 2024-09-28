import { useState, useEffect } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import { storage } from '@/lib/firebase';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bio: string;
  profilePicture?: string;
  sellerSettings?: {
    storeName: string;
    storeDescription: string;
    shippingPolicy: string;
    returnPolicy: string;
    storeLogo: string;
    storeBanner: string;
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, displayName: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(firestore, 'users', user.uid), {
        firstName,
        lastName,
        displayName,
        email,
        createdAt: new Date().toISOString(),
      });
      router.push('/profile');
    } catch (error) {
      setError((error as Error).message);
      console.error('Error signing up:', error);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch (error) {
      setError((error as Error).message);
      console.error('Error logging in:', error);
      throw error; // Re-throw the error so it can be caught in the component
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const updateProfilePicture = async (userId: string, imageFile: File) => {
    try {
      const storageRef = ref(storage, `profile_pictures/${userId}`);
      const uploadTask = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      await updateDoc(doc(firestore, 'users', userId), {
        profilePicture: downloadURL
      });

      return downloadURL;
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  };

  const updateUserData = async (userId: string, userData: any) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, userData);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  };

  const updateSellerSettings = async (userId: string, sellerData: any) => {
    try {
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { sellerSettings: sellerData });
    } catch (error) {
      console.error('Error updating seller settings:', error);
      throw error;
    }
  };

  return { user, signUp, logIn, logOut, error, getUserData, updateProfilePicture, updateUserData, updateSellerSettings };
};