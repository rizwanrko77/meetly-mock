import React from 'react';
import { Video } from 'lucide-react';

export function UpcomingMeetingsWidget() {
  const meetings = [
    { id: 1, title: 'Discovery Call with Acme Corp', time: 'Today, 10:00 AM', type: '1-on-1' },
    { id: 2, title: 'Product Demo - New Features', time: 'Today, 2:00 PM', type: 'Webinar' },
    { id: 3, title: 'Weekly Team Sync', time: 'Tomorrow, 9:00 AM', type: 'Internal' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
        Upcoming Meetings
        <button onClick={() => window.location.hash = 'scheduler'} className="text-sm text-primary font-medium hover:text-indigo-600">View All</button>
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {meetings.map(meeting => (
          <div key={meeting.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 hover:bg-slate-100 transition-colors cursor-pointer">
            <div className="bg-indigo-100 p-2 rounded-lg text-primary">
              <Video size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">{meeting.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{meeting.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
