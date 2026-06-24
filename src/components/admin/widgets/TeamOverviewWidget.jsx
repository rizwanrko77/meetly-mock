import React from 'react';
import { Users } from 'lucide-react';

export function TeamOverviewWidget() {
  const team = [
    { id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Online' },
    { id: 2, name: 'Bob Smith', role: 'Member', status: 'In a meeting' },
    { id: 3, name: 'Charlie Davis', role: 'Member', status: 'Offline' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={20} className="text-slate-400" /> Team Overview
        </div>
        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">3 Members</span>
      </h3>
      <div className="flex-1 overflow-y-auto space-y-4">
        {team.map(member => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                {member.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{member.name}</h4>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-green-500' : member.status === 'Offline' ? 'bg-slate-300' : 'bg-yellow-500'}`}></div>
              <span className="text-xs text-slate-600">{member.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
