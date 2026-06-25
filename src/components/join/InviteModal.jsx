import React, { useState } from 'react';
import { X, Copy, Mail, Send, CheckCircle2 } from 'lucide-react';

export function InviteModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const meetingLink = "https://meetly.com/j/123-456-789";

  const handleCopy = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!email) return;
    setInviteSent(true);
    setEmail('');
    setTimeout(() => setInviteSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail size={18} className="text-primary" /> Invite People
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Meeting Link</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 px-3 py-2.5 rounded-xl text-sm font-mono truncate">
                {meetingLink}
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl transition-colors shrink-0"
              >
                {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-xs font-medium uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Email Invite Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Invite by Email</label>
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Enter email addresses..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                disabled={!email}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white font-medium rounded-xl transition-colors shrink-0 shadow-lg shadow-primary/20"
              >
                <Send size={16} /> Send
              </button>
            </form>
            
            {inviteSent && (
              <p className="text-xs text-green-400 mt-2 flex items-center gap-1 animate-fade-in">
                <CheckCircle2 size={12} /> Invite sent successfully!
              </p>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
