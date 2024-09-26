import React from 'react';
import AuthForm from '@/components/AuthForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default LoginPage;