import React from 'react';
import { currentUser } from '../../data/mockData';
import { Video, Calendar as CalendarIcon, Clock, ShieldCheck } from 'lucide-react';

export function WaitingRoom({ onJoin }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-fade-in bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary z-0 rounded-b-[4rem]"></div>

      <div className="z-10 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full p-8 md:p-12 text-center">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <img src={currentUser.avatar} alt="Host" className="w-full h-full rounded-full border-4 border-white shadow-md object-cover" />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <Video size={12} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-2">{currentUser.name} is waiting for you</h2>
        <p className="text-slate-500 text-lg mb-8">{currentUser.role} • {currentUser.plan}</p>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <CalendarIcon className="text-primary" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">1 Hour Strategy Session</h4>
              <p className="text-slate-500 text-sm">June 25, 2026</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Clock className="text-primary" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">10:00 AM - 11:00 AM</h4>
              <p className="text-slate-500 text-sm">Starts in 5 minutes</p>
            </div>
          </div>
        </div>

        <button 
          onClick={onJoin}
          className="w-full py-4 bg-primary hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
        >
          Join Meeting
        </button>

        <div className="mt-6 flex justify-center gap-4 text-sm font-medium">
          <button className="text-slate-500 hover:text-slate-800">Reschedule</button>
          <span className="text-slate-300">•</span>
          <button className="text-slate-500 hover:text-red-600">Cancel</button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} /> End-to-end encrypted
        </div>
      </div>
    </div>
  );
}
