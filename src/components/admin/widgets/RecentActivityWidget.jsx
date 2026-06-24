import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export function RecentActivityWidget() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-slate-50 flex items-center justify-center">
          <CalendarIcon size={32} className="text-slate-300" />
        </div>
        <p className="text-slate-500 font-medium">No recent activity</p>
        <p className="text-sm text-slate-400 mt-1">Your recent actions and events will appear here.</p>
      </div>
    </div>
  );
}
