import React, { useState } from 'react';
import { eventTypes } from '../../data/mockData';
import { Clock, Users, Link as LinkIcon, Plus, Copy, MoreVertical, ToggleLeft, ToggleRight } from 'lucide-react';
import { ToggleSwitch } from '../shared/ToggleSwitch';

export function SchedulerScreen() {
  const [types, setTypes] = useState(eventTypes);

  const handleToggle = (id, checked) => {
    setTypes(types.map(t => t.id === id ? { ...t, active: checked } : t));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Event Types</h2>
          <p className="text-slate-500">Create and manage your scheduling links.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
          <Plus size={16} /> New Event Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {types.map((type) => (
          <div key={type.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col h-64">
            {/* Top border color strip */}
            <div className={`absolute top-0 left-0 w-full h-1.5 ${type.active ? 'bg-primary' : 'bg-slate-300'}`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <ToggleSwitch checked={type.active} onChange={(c) => handleToggle(type.id, c)} />
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1">{type.name}</h3>
            <div className="text-sm text-slate-500 mb-4 flex items-center gap-2">
              <Clock size={14} /> {type.duration} mins
              {type.price > 0 && <span className="ml-2 px-2 py-0.5 bg-green-50 text-green-700 rounded-md text-xs font-semibold">${type.price}</span>}
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <button className="text-sm font-medium text-primary hover:text-indigo-600 flex items-center gap-1.5 transition-colors">
                <Copy size={14} /> Copy link
              </button>
              <button className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5">
                <LinkIcon size={14} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users size={20} className="text-primary" /> Round-Robin Routing
        </h3>
        <p className="text-slate-500 mb-6 max-w-2xl">
          Automatically assign meetings to available team members based on their availability, priority, or equal distribution.
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-sm text-primary">
            <Users size={32} />
          </div>
          <h4 className="font-semibold text-slate-800 mb-2">Team scheduling not enabled</h4>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Upgrade to the Teams plan to use round-robin and collective scheduling features.</p>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
