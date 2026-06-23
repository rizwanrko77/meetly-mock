import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
      <div className={twMerge(
        "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border",
        type === 'success' ? "bg-white border-emerald-100" : "bg-white border-red-100"
      )}>
        {type === 'success' ? (
          <CheckCircle className="text-emerald-500" size={20} />
        ) : (
          <XCircle className="text-red-500" size={20} />
        )}
        <p className="text-sm font-medium text-slate-800">{message}</p>
        <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
