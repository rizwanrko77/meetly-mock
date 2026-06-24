import React from 'react';
import { Bell, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function NotificationLogsWidget() {
  const logs = [
    { id: 1, text: 'New booking received from Samantha Smith', type: 'info', time: '10 mins ago' },
    { id: 2, text: 'Security check: Failed login attempt', type: 'warning', time: '2 hours ago' },
    { id: 3, text: 'System update completed successfully', type: 'success', time: '1 day ago' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Bell size={20} className="text-slate-400" /> Notification Logs
      </h3>
      <div className="flex-1 overflow-y-auto space-y-4">
        {logs.map(log => (
          <div key={log.id} className="flex gap-3 items-start">
            <div className="mt-0.5">
              {log.type === 'info' && <Bell size={16} className="text-blue-500" />}
              {log.type === 'warning' && <ShieldAlert size={16} className="text-orange-500" />}
              {log.type === 'success' && <CheckCircle2 size={16} className="text-green-500" />}
            </div>
            <div>
              <p className="text-sm text-slate-700">{log.text}</p>
              <p className="text-xs text-slate-400 mt-1">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
