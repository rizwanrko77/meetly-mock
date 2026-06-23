import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={twMerge(
          "block w-10 h-6 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-slate-300"
        )}></div>
        <div className={twMerge(
          "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform",
          checked ? "translate-x-4" : ""
        )}></div>
      </div>
      {label && <div className="ml-3 text-sm font-medium text-slate-700">{label}</div>}
    </label>
  );
}
