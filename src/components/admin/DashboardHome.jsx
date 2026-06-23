import React, { useState, useEffect } from 'react';
import { currentUser } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';

export function DashboardHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton type="chart" />
        <LoadingSkeleton type="table" rows={3} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Profile & Plan Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <img src={currentUser.avatar} alt="Profile" className="w-16 h-16 rounded-full border-2 border-slate-100" />
          <div>
            <h2 className="text-xl font-bold text-slate-800">{currentUser.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {currentUser.plan}
              </span>
              <a href="#account" className="text-sm text-primary hover:text-indigo-600 font-medium">View Plan Details</a>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => window.location.hash = 'account'}
            className="flex-1 md:flex-none px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Manage Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 mb-4 rounded-full bg-slate-50 flex items-center justify-center">
              <CalendarIcon size={32} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No recent activity</p>
            <p className="text-sm text-slate-400 mt-1">Your upcoming meetings will appear here.</p>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-bold text-slate-800">June 2026</h3>
              <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                <button className="p-1 rounded text-slate-500 hover:bg-white hover:shadow-sm transition-all"><ChevronLeft size={16} /></button>
                <button className="px-3 py-1 text-sm font-medium text-slate-700 hover:bg-white hover:shadow-sm rounded transition-all">Today</button>
                <button className="p-1 rounded text-slate-500 hover:bg-white hover:shadow-sm transition-all"><ChevronRight size={16} /></button>
              </div>
            </div>
            
            <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
              {['Month', 'Week', 'Day', 'Agenda'].map((view) => (
                <button 
                  key={view}
                  className={`px-3 py-1 text-sm font-medium rounded transition-all ${view === 'Week' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid Mock (Week View) */}
          <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden flex flex-col">
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={day} className="py-2 text-center border-r border-slate-100 last:border-r-0">
                  <div className="text-xs font-medium text-slate-500 uppercase">{day}</div>
                  <div className={`text-sm mt-1 font-semibold ${i === 2 ? 'w-6 h-6 mx-auto bg-primary text-white rounded-full flex items-center justify-center' : 'text-slate-700'}`}>
                    {21 + i}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1 relative bg-white">
              {/* Mock Event 1 */}
              <div className="absolute top-[20%] left-[28.5%] w-[14.2%] px-1">
                <div className="bg-blue-50 border-l-2 border-blue-500 text-blue-700 text-xs p-1 rounded-sm overflow-hidden whitespace-nowrap">
                  10:00 AM - Team Sync
                </div>
              </div>
              {/* Mock Event 2 */}
              <div className="absolute top-[50%] left-[57%] w-[14.2%] px-1">
                <div className="bg-orange-50 border-l-2 border-orange-500 text-orange-700 text-xs p-1 rounded-sm overflow-hidden whitespace-nowrap">
                  2:00 PM - Webinar
                </div>
              </div>
              {/* Grid Lines */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-slate-50 h-1/5 w-full"></div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>Regular meetings</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>Webinars</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>Personal room</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>Recurring meetings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
