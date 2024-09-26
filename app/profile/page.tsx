import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user, logOut } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={logOut}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;