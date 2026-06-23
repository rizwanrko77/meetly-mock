import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LayoutDashboard, Video, PlusCircle } from 'lucide-react';

export function TestHub() {
  const modules = [
    {
      title: 'Auth Flow',
      description: 'Login and signup flows with form validation and mock toast notifications.',
      icon: LogIn,
      path: '/auth',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Admin Dashboard',
      description: 'Full 3-panel layout with scheduler, whiteboard, and meetings library.',
      icon: LayoutDashboard,
      path: '/admin',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Meeting Room',
      description: 'Video conferencing simulator from waiting room to post-call summary.',
      icon: Video,
      path: '/join',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Add New Feature',
      description: 'Placeholder for future modules. Scalable architecture ready.',
      icon: PlusCircle,
      path: '#',
      color: 'bg-slate-100 text-slate-400',
      comingSoon: true,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full text-center space-y-4 mb-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-6 shadow-lg shadow-indigo-200">
          <span className="text-3xl font-bold">M</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Meetly — Unified Video & Scheduling
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Select a visualization to explore the interactive mock modules. Each module demonstrates the core UX/UI flows using hardcoded data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
        {modules.map((mod, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${mod.color}`}>
              <mod.icon size={24} />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2">{mod.title}</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              {mod.description}
            </p>
            
            {mod.comingSoon ? (
              <span className="inline-flex items-center text-sm font-semibold text-slate-400">
                Coming Soon
              </span>
            ) : (
              <Link 
                to={mod.path} 
                className="inline-flex items-center justify-center w-full bg-primary hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Explore Module
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
