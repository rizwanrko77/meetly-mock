import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Sidebar({ links, activeHash, onNavigate }) {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col hidden md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center">M</div>
          Meetly
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Menu</div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeHash === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={twMerge(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-indigo-50 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={18} className={isActive ? "text-primary" : "text-slate-400"} />
              {link.label}
            </button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200 space-y-1">
        <button 
          onClick={() => onNavigate('account')}
          className={twMerge(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeHash === 'account' ? "bg-indigo-50 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <User size={18} className={activeHash === 'account' ? "text-primary" : "text-slate-400"} />
          Account
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          className={twMerge(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            activeHash === 'settings' ? "bg-indigo-50 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          )}
        >
          <Settings size={18} className={activeHash === 'settings' ? "text-primary" : "text-slate-400"} />
          Settings
        </button>
      </div>
    </aside>
  );
}
