import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Key, CheckCircle } from 'lucide-react';

export function SignupForm({ onSwitch, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (name && email && password) {
      setStep(2);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length > 0) {
      setStep('success');
    }
  };

  const handleGoogleAuth = () => {
    setStep('google-auth');
  };

  const handleGoogleApprove = () => {
    setStep('success');
  };

  return (
    <div className="animate-fade-in w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">M</div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Create an account</h2>
        <p className="text-center text-slate-500 mb-8">Get started with Meetly today.</p>

        {step === 'success' ? (
          <div className="text-center py-8 animate-slide-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Account Created!</h3>
            <p className="text-slate-500 mb-6">Your Meetly account has been successfully created.</p>
            <button
              onClick={onSuccess}
              className="w-full py-2.5 bg-primary rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm mb-3"
            >
              Continue to Dashboard
            </button>
            <button
              onClick={() => {
                setStep(1);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setOtp('');
              }}
              className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Test Signup Again
            </button>
          </div>
        ) : step === 'google-auth' ? (
          <div className="text-center py-4 animate-slide-in">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center p-2.5 shadow-sm text-slate-600">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-xl font-bold shadow-sm">M</div>
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-2">Sign up with Google</h3>
            <p className="text-slate-500 mb-6 text-sm">Meetly wants to access your Google Account.</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-8">
              <p className="text-sm font-medium text-slate-700 mb-3">This will allow Meetly to:</p>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                <li>View your email address</li>
                <li>See your personal info, including any personal info you've made publicly available</li>
              </ul>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button onClick={handleGoogleApprove} className="flex-1 py-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                Allow
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Continue
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex justify-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Sign up with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 animate-slide-in">
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 mb-6 text-center">
              We've sent a verification code to <strong>{email}</strong>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Verification Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 text-center tracking-widest text-lg border border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-colors outline-none"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Verify & Create Account
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full flex justify-center py-2 px-4 mt-2 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Edit Details
            </button>
          </form>
        )}
      </div>

      <p className="text-center mt-8 text-sm text-slate-600">
        Already have an account?{' '}
        <button onClick={onSwitch} className="font-semibold text-primary hover:text-indigo-500 inline-flex items-center">
          <ArrowLeft size={16} className="mr-1" /> Back to login
        </button>
      </p>
    </div>
  );
}
