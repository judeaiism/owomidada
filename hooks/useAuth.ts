import { useState, useEffect } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { NextRouter } from 'next/router';

export const useAuth = (router?: NextRouter) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        email,
      });
      router?.push('/profile');
    } catch (error) {
      setError((error as Error).message);
      console.error('Error signing up:', error);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      router?.push('/profile');
    } catch (error) {
      setError((error as Error).message);
      console.error('Error logging in:', error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      router?.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { user, signUp, logIn, logOut, error };
};