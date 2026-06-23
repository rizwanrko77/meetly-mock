import React from 'react';
import { X } from 'lucide-react';

export function SecondarySidebar({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-slate-200 h-full flex flex-col shrink-0 animate-slide-in shadow-xl md:shadow-none absolute md:relative right-0 z-40">
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  );
}
