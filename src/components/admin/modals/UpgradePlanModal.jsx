import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Building, Globe, DollarSign, Users, Calendar, ArrowLeft, User, Lock } from 'lucide-react';
import { InfoTooltip } from '../../shared/InfoTooltip';

export function UpgradePlanModal({ isOpen, onClose }) {
  const [step, setStep] = useState('plan-selection'); // plan-selection, checkout, quote, success
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!isOpen) return null;

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
      buttonText: 'Current Plan',
      action: null,
      disabled: true
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
      buttonText: 'Upgrade Now',
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
      buttonText: 'Upgrade Now',
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

  const handlePlanSelect = (plan) => {
    if (plan.disabled) return;
    setSelectedPlan(plan);
    setStep(plan.action);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
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

  const handleClose = () => {
    setStep('plan-selection');
    setSelectedPlan(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className={`bg-white rounded-2xl shadow-xl w-full relative transition-all duration-300 ${step === 'plan-selection' ? 'max-w-6xl' : 'max-w-md'} max-h-[95vh] flex flex-col`}>
        
        {/* Header */}
        <div className="flex-none flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800">
              {step === 'plan-selection' ? 'Upgrade Your Plan' : step === 'checkout' ? 'Complete Payment' : step === 'quote' ? 'Enterprise Quote' : 'Success'}
            </h2>
            <InfoTooltip content="Subscription Management: View and upgrade your current pricing tier to unlock more capabilities." />
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
          {step === 'plan-selection' ? (
            <div className="animate-slide-in">
              <div className="text-center mb-10">
                <p className="text-slate-500 max-w-2xl mx-auto">Select the plan that best fits your needs. Upgrades are pro-rated and applied immediately.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className={`relative flex flex-col bg-white rounded-2xl border ${plan.popular ? 'border-primary shadow-lg scale-105 z-10' : 'border-slate-200 shadow-sm'} p-6 transition-all ${plan.disabled ? 'opacity-70' : ''}`}>
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
                      disabled={plan.disabled}
                      className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${plan.disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : plan.popular ? 'bg-primary text-white hover:bg-indigo-700' : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200'}`}
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
                 <span className="text-slate-500 ml-2">Back to plans</span>
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
                 <span className="text-slate-500 ml-2">Back to plans</span>
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
          ) : step === 'success' ? (
            <div className="text-center py-8 animate-slide-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {selectedPlan?.id === 'enterprise' ? 'Quote Requested!' : 'Upgrade Successful!'}
              </h3>
              <p className="text-slate-500 mb-8">
                {selectedPlan?.id === 'enterprise'
                  ? 'Our sales team will contact you shortly to discuss your Enterprise requirements.'
                  : `Your account has been successfully upgraded to the ${selectedPlan?.name} plan.`}
              </p>
              <button
                onClick={handleClose}
                className="w-full py-2.5 bg-primary rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Return to Settings
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
