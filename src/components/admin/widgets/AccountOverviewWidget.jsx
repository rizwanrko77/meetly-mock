import React from 'react';
import { currentUser } from '../../../data/mockData';

export function AccountOverviewWidget() {
  return (
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
  );
}
