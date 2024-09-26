import React from 'react';
import AuthForm from '@/components/AuthForm';

const SignupPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <AuthForm isLogin={false} />
    </div>
  );
};

export default SignupPage;