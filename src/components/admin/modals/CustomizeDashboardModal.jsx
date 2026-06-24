import React, { useState, useEffect } from 'react';
import { X, ArrowUp, ArrowDown, LayoutDashboard } from 'lucide-react';
import { ToggleSwitch } from '../../shared/ToggleSwitch';

export const AVAILABLE_WIDGETS = [
  { id: 'accountOverview', name: 'Account Overview', colSpan: 'col-span-1 lg:col-span-3' }, // Full width
  { id: 'recentActivity', name: 'Recent Activity', colSpan: 'col-span-1 lg:col-span-1' },
  { id: 'upcomingMeetings', name: 'Upcoming Meetings', colSpan: 'col-span-1 lg:col-span-1' },
  { id: 'schedulerCalendar', name: 'Scheduler Calendar', colSpan: 'col-span-1 lg:col-span-2' },
  { id: 'whiteboards', name: 'Recent Whiteboards', colSpan: 'col-span-1 lg:col-span-1' },
  { id: 'billingHistory', name: 'Billing History', colSpan: 'col-span-1 lg:col-span-2' },
  { id: 'teamOverview', name: 'Team Overview', colSpan: 'col-span-1 lg:col-span-1' },
  { id: 'notificationLogs', name: 'Notification Logs', colSpan: 'col-span-1 lg:col-span-1' }
];

export function CustomizeDashboardModal({ isOpen, onClose, onSave, currentConfig }) {
  // config state represents the ordered list of ALL widgets, but includes a 'visible' flag
  const [config, setConfig] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Build a working list based on what's active, then append inactive ones at the bottom
      const workingConfig = [];
      
      // First add the currently active ones in order
      currentConfig.forEach(activeId => {
        const w = AVAILABLE_WIDGETS.find(aw => aw.id === activeId);
        if (w) workingConfig.push({ ...w, visible: true });
      });

      // Then add the rest
      AVAILABLE_WIDGETS.forEach(aw => {
        if (!currentConfig.includes(aw.id)) {
          workingConfig.push({ ...aw, visible: false });
        }
      });

      setConfig(workingConfig);
    }
  }, [isOpen, currentConfig]);

  if (!isOpen) return null;

  const handleToggle = (id, visible) => {
    setConfig(config.map(item => item.id === id ? { ...item, visible } : item));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newConfig = [...config];
    const temp = newConfig[index];
    newConfig[index] = newConfig[index - 1];
    newConfig[index - 1] = temp;
    setConfig(newConfig);
  };

  const moveDown = (index) => {
    if (index === config.length - 1) return;
    const newConfig = [...config];
    const temp = newConfig[index];
    newConfig[index] = newConfig[index + 1];
    newConfig[index + 1] = temp;
    setConfig(newConfig);
  };

  const handleSave = () => {
    // Return only the IDs of visible widgets in the sorted order
    const newActiveConfig = config.filter(c => c.visible).map(c => c.id);
    onSave(newActiveConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutDashboard size={20} className="text-primary" /> Customize Dashboard
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-500 mb-6">
            Select which widgets you want to see on your dashboard and use the arrows to reorder them.
          </p>
          
          <div className="space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50 max-h-[50vh] overflow-y-auto">
            {config.map((item, index) => (
              <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${item.visible ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-transparent opacity-60'}`}>
                <div className="flex items-center gap-3">
                  <ToggleSwitch 
                    checked={item.visible} 
                    onChange={(checked) => handleToggle(item.id, checked)} 
                  />
                  <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                </div>
                
                <div className="flex items-center bg-slate-100 rounded border border-slate-200 overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors border-r border-slate-200"
                  >
                    <ArrowUp size={14} className="text-slate-600" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === config.length - 1}
                    className="p-1 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ArrowDown size={14} className="text-slate-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            Save Layout
          </button>
        </div>
      </div>
    </div>
  );
}
