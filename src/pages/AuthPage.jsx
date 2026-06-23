import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHash } from '../hooks/useHash';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { Toast } from '../components/shared/Toast';

export function AuthPage() {
  const [hash, setHash] = useHash('login');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin');
  };

  const handleSignupSuccess = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="z-10 w-full flex justify-center">
        {hash === 'login' ? (
          <LoginForm onSwitch={() => setHash('signup')} onSuccess={handleLoginSuccess} />
        ) : (
          <SignupForm onSwitch={() => setHash('login')} onSuccess={handleSignupSuccess} />
        )}
      </div>

      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage('')} />
      )}
    </div>
  );
}
