import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Key, CheckCircle, CreditCard, Building, Globe, DollarSign, Users, Calendar } from 'lucide-react';
import { InfoTooltip } from '../shared/InfoTooltip';

export function SignupForm({ onSwitch, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: details, 2: otp, plan-selection, checkout, success, provider-auth
  const [otp, setOtp] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for individuals getting started',
      features: [
        { text: 'Max 20 concurrent meeting participants', icon: Users },
        { text: 'Max 50 webinar participants', icon: Users },
        { text: '60-minute meeting/webinar limit', icon: Calendar },
        { text: 'Public scheduler (up to 100 bookings/mo)', icon: Globe },
      ],
      buttonText: 'Get Started',
      action: 'success'
    },
    {
      id: 'plus',
      name: 'Plus',
      price: '$10',
      period: '/month',
      description: 'Ideal for professionals and small teams',
      features: [
        { text: 'Max 200 concurrent meeting participants', icon: Users },
        { text: 'Max 500 webinar participants', icon: Users },
        { text: '240-minute meeting/webinar limit', icon: Calendar },
        { text: 'Public scheduler (up to 500 bookings/mo)', icon: Globe },
        { text: 'Custom domain integration', icon: Globe, tooltip: 'Host your meeting links on your own custom domain.' },
        { text: 'Monetization', icon: DollarSign, tooltip: 'Charge attendees for meetings or webinars.' },
      ],
      buttonText: 'Subscribe Now',
      action: 'checkout',
      popular: true
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      price: '$50',
      period: '/month',
      description: 'For growing businesses and creators',
      features: [
        { text: 'Unlimited concurrent participants', icon: Users },
        { text: 'Unlimited webinar participants', icon: Users },
        { text: 'Unlimited-minute meeting/webinar', icon: Calendar },
        { text: 'Public scheduler (unlimited bookings/mo)', icon: Globe },
        { text: 'Custom domain integration', icon: Globe },
        { text: 'Monetization', icon: DollarSign },
      ],
      buttonText: 'Subscribe Now',
      action: 'checkout'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'Advanced needs and large organizations',
      features: [
        { text: 'Everything in Unlimited plan', icon: CheckCircle },
        { text: 'Team addition (add team in workspace)', icon: Building, tooltip: 'Manage roles and permissions for multiple team members.' },
        { text: 'Dedicated support & onboarding', icon: Users },
        { text: 'Advanced analytics & reporting', icon: Calendar },
      ],
      buttonText: 'Request Quote',
      action: 'quote'
    }
  ];

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
      setStep('plan-selection');
    }
  };

  const handleProviderAuth = (provider) => {
    setStep(`${provider}-auth`);
  };

  const handleProviderApprove = () => {
    setStep('plan-selection');
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep(plan.action);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Mock processing delay
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  return (
    <div className={`animate-fade-in w-full transition-all duration-300 ${step === 'plan-selection' ? 'max-w-6xl' : 'max-w-md'}`}>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1"></div>
          <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-2xl font-bold">M</div>
          <div className="flex-1 flex justify-end">
             <InfoTooltip content="Keycloak Registration: New users are created in the configured realm." />
          </div>
        </div>
        
        {step === 'success' ? (
          <div className="text-center py-8 animate-slide-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <CheckCircle size={32} />
              <InfoTooltip className="absolute -top-2 -right-2" content="Keycloak Required Actions: Optional post-registration steps like verify email or update profile are complete." />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {selectedPlan?.id === 'enterprise' ? 'Quote Requested!' : 'Account Created!'}
            </h3>
            <p className="text-slate-500 mb-6">
              {selectedPlan?.id === 'enterprise'
                ? 'Your Meetly account has been created and our sales team will contact you shortly about your Enterprise requirements.'
                : `Your Meetly account has been successfully created${selectedPlan ? ` and your ${selectedPlan.name} plan is active` : ''}.`}
            </p>
            <button
              onClick={onSuccess}
              className="w-full py-2.5 bg-primary rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm mb-3 relative"
            >
              Continue to Dashboard
              <InfoTooltip className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white" content="Keycloak: Redirecting with authorized JWT token." />
            </button>
            <button
              onClick={() => {
                setStep(1);
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setOtp('');
                setSelectedPlan(null);
              }}
              className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Test Signup Again
            </button>
          </div>
        ) : step === 'plan-selection' ? (
           <div className="animate-slide-in">
             <div className="text-center mb-10">
               <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Plan</h2>
               <p className="text-slate-500 max-w-2xl mx-auto">Select the plan that best fits your needs. You can always upgrade or downgrade later.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className={`relative flex flex-col bg-white rounded-2xl border ${plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-slate-200 shadow-sm'} p-6 transition-all`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                    <p className="text-slate-500 text-sm mb-6 h-10">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-extrabold text-slate-800">{plan.price}</span>
                      {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <feature.icon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600 leading-snug">
                            {feature.text}
                            {feature.tooltip && <InfoTooltip content={feature.tooltip} className="ml-1 -mt-1" />}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${plan.popular ? 'bg-primary text-white hover:bg-indigo-700' : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'}`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                ))}
             </div>
           </div>
        ) : step === 'checkout' && selectedPlan ? (
           <div className="animate-slide-in">
             <div className="flex items-center mb-6">
                <button onClick={() => setStep('plan-selection')} className="p-2 -ml-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-slate-800 ml-2">Complete Payment</h2>
             </div>
             
             <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Selected Plan</p>
                  <p className="text-lg font-bold text-slate-800">{selectedPlan.name} Plan</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 font-medium mb-1">Total due today</p>
                  <p className="text-2xl font-extrabold text-primary">{selectedPlan.price}</p>
                </div>
             </div>

             <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="text" required className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none" placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-5 w-5 text-slate-400" />
                    </div>
                    <input type="text" required maxLength={19} className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary tracking-widest font-mono sm:text-sm transition-colors outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" maxLength={5} className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-center sm:text-sm transition-colors outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                    <input type="text" required placeholder="123" maxLength={4} className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary text-center sm:text-sm transition-colors outline-none" />
                  </div>
                </div>

                <button type="submit" className="w-full flex justify-center items-center py-3 px-4 mt-8 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#02042b] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors gap-2">
                  <Lock size={16} /> Pay {selectedPlan.price} Securely
                </button>
                <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Lock size={12} /> Secured by Mock Razorpay
                </div>
             </form>
           </div>
        ) : step === 'quote' && selectedPlan ? (
           <div className="animate-slide-in">
             <div className="flex items-center mb-6">
                <button onClick={() => setStep('plan-selection')} className="p-2 -ml-2 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-slate-800 ml-2">Request Enterprise Quote</h2>
             </div>
             
             <p className="text-slate-500 mb-6 text-sm">Tell us a bit about your organization and we'll get back to you with a custom plan tailored for your needs.</p>

             <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Size</label>
                  <select required className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none bg-white">
                    <option value="">Select company size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">How do you plan to use Meetly?</label>
                  <textarea required rows="4" className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm transition-colors outline-none resize-none" placeholder="e.g. Hosting large webinars, internal team meetings..."></textarea>
                </div>

                <button type="submit" className="w-full flex justify-center items-center py-3 px-4 mt-8 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors gap-2">
                  Submit Request
                </button>
             </form>
           </div>
        ) : step === 'google-auth' || step === 'github-auth' || step === 'microsoft-auth' || step === 'apple-auth' ? (
          <div className="text-center py-4 animate-slide-in">
            <div className="flex justify-center items-center gap-4 mb-6 relative">
              <InfoTooltip className="absolute -top-4 -right-2" content="Keycloak First Broker Login: Automatically creates or links a user account from an Identity Provider." />
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
            <h3 className="text-xl font-medium text-slate-800 mb-2">Sign up with {step.split('-')[0].charAt(0).toUpperCase() + step.split('-')[0].slice(1)}</h3>
            <p className="text-slate-500 mb-6 text-sm">Meetly wants to access your account.</p>
            
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Cancel
              </button>
              <button onClick={handleProviderApprove} className="flex-1 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                Allow
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Create an account</h2>
              <p className="text-slate-500">Get started with Meetly today.</p>
            </div>
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
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <InfoTooltip content="Keycloak enforces password policies configured in the realm settings (length, complexity)." />
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
                <span className="px-2 bg-white text-slate-500 flex items-center gap-2">
                  Or continue with
                  <InfoTooltip content="Keycloak Social Registration: Link a third-party account immediately." />
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
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4 animate-slide-in">
             <div className="flex justify-center items-center gap-2 mb-2">
               <h3 className="text-xl font-bold text-slate-800 text-center">Verify Email</h3>
               <InfoTooltip content="Keycloak Require Action: Verify Email action is triggered before user can login." />
             </div>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 mb-6 text-center mt-2">
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

