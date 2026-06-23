import React, { useState } from 'react';
import { X, Mail, User, Shield, Loader2 } from 'lucide-react';

export function InviteMemberModal({ isOpen, onClose, onInvite }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onInvite({ name, email, role });
      setName('');
      setEmail('');
      setRole('Viewer');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">Invite Team Member</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="e.g. Jane Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="email" 
                placeholder="e.g. jane@meetly.mock" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role & Permissions</label>
            <div className="relative">
              <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg sm:text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white appearance-none" 
              >
                <option value="Admin">Admin (Full Access)</option>
                <option value="Editor">Editor (Can edit settings)</option>
                <option value="Viewer">Viewer (Read-only)</option>
              </select>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!name || !email || isSubmitting} 
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Sending Invite...' : 'Send Invite'}
          </button>
        </div>
      </div>
    </div>
  );
}
