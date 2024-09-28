import { useState, useEffect } from 'react';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  name?: string;  // Add this line
  avatar?: string;  // Add this line
  // Add any other fields that might be in your user data
}

export const useUserData = (userId: string | null) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        if (userDoc.exists()) {
          setUserData({ id: userDoc.id, ...userDoc.data() } as UserData);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, loading, error };
};