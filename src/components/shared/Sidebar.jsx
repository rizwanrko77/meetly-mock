import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Sidebar({ links, activeHash, onNavigate }) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={twMerge(
        "bg-white border-r border-slate-200 h-screen flex-col hidden md:flex shrink-0 transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center px-6 border-b border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 text-primary font-bold text-xl min-w-max">
          <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center shrink-0">M</div>
          {!isCollapsed && <span>Meetly</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
        <div className={`flex items-center mb-2 px-3 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</div>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary bg-indigo-50 hover:bg-indigo-100 transition-colors p-1.5 rounded-lg shadow-sm border border-indigo-100"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = activeHash === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              title={isCollapsed ? link.label : undefined}
              className={twMerge(
                "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-max",
                isActive 
                  ? "bg-indigo-50 text-primary" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                isCollapsed ? "justify-center px-0" : "gap-3"
              )}
            >
              <Icon size={18} className={twMerge("shrink-0", isActive ? "text-primary" : "text-slate-400")} />
              {!isCollapsed && <span>{link.label}</span>}
            </button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-200 space-y-1 overflow-hidden">
        <button 
          onClick={() => onNavigate('account')}
          title={isCollapsed ? "Account" : undefined}
          className={twMerge(
            "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-max",
            activeHash === 'account' ? "bg-indigo-50 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            isCollapsed ? "justify-center px-0" : "gap-3"
          )}
        >
          <User size={18} className={twMerge("shrink-0", activeHash === 'account' ? "text-primary" : "text-slate-400")} />
          {!isCollapsed && <span>Account</span>}
        </button>
        <button 
          onClick={() => onNavigate('settings')}
          title={isCollapsed ? "Settings" : undefined}
          className={twMerge(
            "w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-max",
            activeHash === 'settings' ? "bg-indigo-50 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            isCollapsed ? "justify-center px-0" : "gap-3"
          )}
        >
          <Settings size={18} className={twMerge("shrink-0", activeHash === 'settings' ? "text-primary" : "text-slate-400")} />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
