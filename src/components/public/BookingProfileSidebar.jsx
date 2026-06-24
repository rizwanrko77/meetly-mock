import React from 'react';
import { Clock, Video, Link as LinkIcon, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export function BookingProfileSidebar({ 
  step, 
  onBack, 
  selectedEvent, 
  selectedTime, 
  settings 
}) {
  const themeColor = settings?.themeColor || '#4f46e5';

  return (
    <div className="w-full md:w-1/3 bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col shrink-0">
      {/* Back Button for Mobile or specific steps */}
      {step > 1 && (
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors w-fit"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50">
            <ArrowLeft size={16} />
          </div>
        </button>
      )}

      {/* Host Profile Info */}
      <div className="text-center md:text-left">
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name} 
          className="w-20 h-20 rounded-full mx-auto md:mx-0 mb-4 border-4 border-white shadow-sm"
        />
        <h3 className="text-slate-500 font-medium text-sm mb-1">{currentUser.name}</h3>
        
        {/* If no event is selected, show generic page info. If selected, show event info */}
        {!selectedEvent ? (
          <>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">{settings?.pageTitle || 'My Scheduling Page'}</h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              {settings?.welcomeMessage || 'Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.'}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">{selectedEvent.title}</h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-600">
                <Clock size={20} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                <div>
                  <p className="font-medium">{selectedEvent.duration || '30'} min</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-slate-600">
                <Video size={20} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                <div>
                  <p className="font-medium">Web conferencing details provided upon confirmation.</p>
                </div>
              </div>
              {selectedTime && (
                <div className="flex items-start gap-3 text-slate-600">
                  <CalendarIcon size={20} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                  <div>
                    <p className="font-medium text-slate-800">{selectedTime}</p>
                    <p className="text-sm">India Standard Time</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-auto pt-8">
         <div className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1">
            Powered by <div className="w-5 h-5 bg-primary text-white flex items-center justify-center rounded text-[10px] font-bold ml-1">M</div> Meetly
         </div>
      </div>
    </div>
  );
}
