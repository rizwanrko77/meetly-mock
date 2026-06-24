import React, { useState } from 'react';
import { CheckCircle2, User, Mail, MessageSquare, Calendar, Clock, X } from 'lucide-react';

export function BookingFormStep({ onConfirm, onCancel, themeColor, selectedEvent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm(); // Trigger whatever final action (e.g. back to home)
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col p-8 text-center items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-scale-in" style={{ backgroundColor: themeColor }}>
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Confirmation Successful!</h2>
          <p className="text-slate-600 mb-2">
            You are scheduled for <strong>{selectedEvent?.title || 'Meeting'}</strong>.
          </p>
          <p className="text-slate-500 text-sm mb-6">
            A calendar invitation has been sent to your email address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Confirm Booking</h2>
          <button onClick={onCancel} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-800 mb-1">{selectedEvent?.title || 'Meeting'}</h3>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {selectedEvent?.time?.split(' at ')[0] || 'Selected Date'}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {selectedEvent?.time?.split(' at ')[1] || 'Selected Time'} ({selectedEvent?.duration || '30'} min)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Name *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': themeColor }}
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': themeColor }}
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Additional Participants
                <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': themeColor }}
                  placeholder="guest1@example.com, guest2@example.com"
                  value={formData.guests}
                  onChange={e => setFormData({...formData, guests: e.target.value})}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1.5">Add guest emails separated by commas.</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Notes
                <span className="text-xs font-normal text-slate-400 ml-2">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={18} className="text-slate-400" />
                </div>
                <textarea 
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  style={{ '--tw-ring-color': themeColor }}
                  placeholder="Share anything that will help prepare for our meeting."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="booking-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-wait"
            style={{ backgroundColor: themeColor }}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
