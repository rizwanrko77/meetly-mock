import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, CheckCircle, Key, Smartphone, Fingerprint, Building } from 'lucide-react';
import { InfoTooltip } from '../shared/InfoTooltip';

export function LoginForm({ onSwitch, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('login'); // login, google-auth, passwordless, sso, mfa, success, forgot-password, forgot-otp, reset-password, reset-success

  const handleStandardLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setStep('mfa');
    }
  };

  const handleProviderAuth = (provider) => {
    setStep(`${provider}-auth`);
  };

  const handleProviderApprove = () => {
    setStep('success');
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    if (otp) {
      setStep('success');
    }
  };

  const handlePasswordless = (e) => {
    e.preventDefault();
    setStep('passwordless-auth');
  };

  const handleSSO = (e) => {
    e.preventDefault();
    setStep('sso-auth');
  };

  return (
    <div className="animate-fade-in w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1"></div>
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">M</div>
          <div className="flex-1 flex justify-end">
             <InfoTooltip content="Keycloak: Centralized Identity and Access Management for modern applications." />
          </div>
        </div>
        
        {step === 'success' ? (
          <div className="text-center py-8 animate-slide-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <CheckCircle size={32} />
              <InfoTooltip className="absolute -top-2 -right-2" content="Keycloak: Active session established successfully." />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Login Successful!</h3>
            <p className="text-slate-500 mb-6">Welcome back to Meetly.</p>
            <button
              onClick={onSuccess}
              className="w-full py-2.5 bg-primary rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm mb-3 relative"
            >
              Continue to Dashboard
              <InfoTooltip className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white" content="Keycloak: Redirecting with authorized JWT token." />
            </button>
            <button
              onClick={() => {
                setStep('login');
                setEmail('');
                setPassword('');
                setOtp('');
              }}
              className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Test Login Again
            </button>
          </div>
        ) : step === 'mfa' ? (
           <form onSubmit={handleMfaSubmit} className="space-y-4 animate-slide-in">
             <div className="flex items-center justify-center gap-2 mb-2">
               <h3 className="text-xl font-bold text-slate-800 text-center">Two-Factor Authentication</h3>
               <InfoTooltip content="Keycloak MFA: OTP, WebAuthn, or SMS verification for enhanced security." />
             </div>
             <p className="text-center text-slate-500 mb-6 text-sm">Enter the code from your authenticator app.</p>
             
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Authenticator Code</label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Smartphone className="h-5 w-5 text-slate-400" />
                 </div>
                 <input
                   type="text"
                   required
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                   className="block w-full pl-10 pr-3 py-2 text-center tracking-widest text-lg border border-slate-200 rounded-lg focus:ring-primary focus:border-primary transition-colors outline-none"
                   placeholder="000 000"
                   maxLength={6}
                 />
               </div>
             </div>
             
             <button
               type="submit"
               className="w-full flex justify-center py-2.5 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
             >
               Verify Code
             </button>
             <button
               type="button"
               onClick={() => setStep('login')}
               className="w-full flex justify-center py-2 px-4 mt-2 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
             >
               Cancel
             </button>
           </form>
        ) : step === 'google-auth' || step === 'github-auth' || step === 'microsoft-auth' || step === 'apple-auth' ? (
          <div className="text-center py-4 animate-slide-in">
            <div className="flex justify-center items-center gap-4 mb-6 relative">
              <InfoTooltip className="absolute -top-4 -right-2" content="Keycloak Identity Brokering: Delegates authentication to a third-party Identity Provider (IdP)." />
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center p-2.5 shadow-sm text-slate-600">
                {step === 'google-auth' && (
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                )}
                {step === 'github-auth' && <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                {step === 'microsoft-auth' && <div className="grid grid-cols-2 gap-0.5 w-6 h-6"><div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div><div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div></div>}
                {step === 'apple-auth' && <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.29-.88 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>}
              </div>
              <div className="w-8 h-px bg-slate-300"></div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-xl font-bold shadow-sm">M</div>
            </div>
            <h3 className="text-xl font-medium text-slate-800 mb-2">Sign in with {step.split('-')[0].charAt(0).toUpperCase() + step.split('-')[0].slice(1)}</h3>
            <p className="text-slate-500 mb-6 text-sm">Meetly wants to access your account.</p>
            
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep('login')} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button onClick={handleProviderApprove} className="flex-1 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                Allow
              </button>
            </div>
          </div>
        ) : step === 'passwordless-auth' ? (
          <div className="text-center py-4 animate-slide-in">
             <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center">
                  <Fingerprint size={32} />
                </div>
             </div>
             <div className="flex justify-center items-center gap-2 mb-2">
                <h3 className="text-xl font-medium text-slate-800">Passkey Login</h3>
                <InfoTooltip content="Keycloak WebAuthn: Passwordless authentication using device biometrics or security keys." />
             </div>
             <p className="text-slate-500 mb-8 text-sm">Use your device biometrics (Touch ID / Face ID) or a security key to sign in securely without a password.</p>
             <div className="flex gap-3">
              <button onClick={() => setStep('login')} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button onClick={() => setStep('success')} className="flex-1 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                Authenticate
              </button>
            </div>
          </div>
        ) : step === 'sso-auth' ? (
           <div className="text-center py-4 animate-slide-in">
             <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-16 bg-indigo-50 text-primary rounded-full flex items-center justify-center">
                  <Building size={32} />
                </div>
             </div>
             <div className="flex justify-center items-center gap-2 mb-2">
                <h3 className="text-xl font-medium text-slate-800">Enterprise SSO</h3>
                <InfoTooltip content="Keycloak SAML/OIDC: Single Sign-On using corporate identity providers (e.g., Azure AD, Okta)." />
             </div>
             <p className="text-slate-500 mb-6 text-sm">Sign in with your company credentials.</p>
             <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none"
                      placeholder="Organization Email or Domain"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="button" onClick={() => setStep('login')} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                    Back
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Continue
                  </button>
                </div>
             </form>
           </div>
        ) : step === 'forgot-password' ? (
          <form onSubmit={(e) => { e.preventDefault(); if(email) setStep('forgot-otp'); }} className="space-y-4 animate-slide-in">
            <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Reset Password</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">Enter your email address and we'll send you a verification code to reset your password.</p>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <InfoTooltip content="Keycloak triggers an email action workflow containing a secure, time-limited reset link or OTP." />
              </div>
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
            
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 mt-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Send Reset Code
            </button>
            <button
              type="button"
              onClick={() => setStep('login')}
              className="w-full flex justify-center py-2 px-4 mt-2 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Back to Login
            </button>
          </form>
        ) : step === 'forgot-otp' ? (
          <form onSubmit={(e) => { e.preventDefault(); if(otp.length > 0) setStep('reset-password'); }} className="space-y-4 animate-slide-in">
            <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Verification Code</h3>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 mb-6 text-center">
              We've sent a code to <strong>{email}</strong>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Enter Code</label>
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
              Verify Code
            </button>
            <button
               type="button"
               onClick={() => setStep('forgot-password')}
               className="w-full flex justify-center py-2 px-4 mt-2 border border-slate-200 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
             >
               Back
             </button>
          </form>
        ) : step === 'reset-password' ? (
          <form onSubmit={(e) => { e.preventDefault(); if(password === confirmPassword) setStep('reset-success'); else alert("Passwords do not match!"); }} className="space-y-4 animate-slide-in">
            <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Create New Password</h3>
            <p className="text-center text-slate-500 mb-6 text-sm">Please enter your new password below.</p>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-slate-700">New Password</label>
                <InfoTooltip content="Keycloak Password Policies enforced here (e.g., length, complexity, not recently used)." />
              </div>
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
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
              Reset Password
            </button>
          </form>
        ) : step === 'reset-success' ? (
          <div className="text-center py-8 animate-slide-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Password Reset Successful!</h3>
            <p className="text-slate-500 mb-6">Your password has been changed successfully.</p>
            <button
              onClick={() => {
                setStep('login');
                setPassword('');
                setConfirmPassword('');
                setOtp('');
              }}
              className="w-full py-2.5 bg-primary rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm mb-3"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div className="text-center mb-6">
               <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
               <p className="text-slate-500">Please enter your details to sign in.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-slate-700">Email</label>
              </div>
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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); setStep('forgot-password'); }} className="text-sm font-medium text-primary hover:text-indigo-500 flex items-center gap-1">
                  Forgot password?
                </a>
              </div>
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
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
                <label htmlFor="remember-me" className="block text-sm text-slate-700">Remember me</label>
                <InfoTooltip content="Keycloak: Uses persistent session cookies to maintain login state." />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Sign in
            </button>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                 type="button"
                 onClick={handleSSO}
                 className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
               >
                 <Building className="w-4 h-4 mr-2 text-slate-500" />
                 SSO
              </button>
              <button
                 type="button"
                 onClick={handlePasswordless}
                 className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
               >
                 <Fingerprint className="w-4 h-4 mr-2 text-slate-500" />
                 Passkey
              </button>
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500 flex items-center gap-2">
                  Or continue with
                  <InfoTooltip content="Keycloak Social Login: Connects with external Identity Providers." />
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleProviderAuth('google')}
                className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleProviderAuth('microsoft')}
                className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="grid grid-cols-2 gap-[1px] w-4 h-4 mr-2">
                  <div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div>
                  <div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div>
                </div>
                Microsoft
              </button>
              <button
                type="button"
                onClick={() => handleProviderAuth('github')}
                className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
               <button
                type="button"
                onClick={() => handleProviderAuth('apple')}
                className="flex justify-center items-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.29-.88 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.1zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="text-center mt-8 text-sm text-slate-600 flex items-center justify-center gap-2">
        Don't have an account?{' '}
        <button onClick={onSwitch} className="font-semibold text-primary hover:text-indigo-500 inline-flex items-center">
          Create an account <ArrowRight size={16} className="ml-1" />
        </button>
        <InfoTooltip content="Keycloak Self-Registration: Allows users to create their own accounts in the realm." />
      </div>
    </div>
  );
}
