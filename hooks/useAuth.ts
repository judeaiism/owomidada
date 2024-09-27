import { useState, useEffect } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
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

  return { user, signUp, logIn, logOut, error };
};