import React, { useState } from 'react';
import { ChevronRight, Clock, Video, Calendar, ChevronLeft, Globe } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  isBefore,
  startOfDay
} from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const mockUpcomingEvents = [
  { id: '101', title: 'Q3 Product Roadmap Review', date: 'Oct 15, 2026', time: '10:00 AM', duration: 60, type: 'Webinar', color: 'bg-green-500' },
  { id: '102', title: 'Community Q&A Session', date: 'Oct 20, 2026', time: '2:00 PM', duration: 45, type: 'Group', color: 'bg-blue-500' }
];

export function EventSelectionStep({ onSelect, themeColor }) {
  const [activeTab, setActiveTab] = useState('booking');
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Duration state
  const [selectedDuration, setSelectedDuration] = useState('30');
  const offeredDurations = [
    { label: '15 min', value: '15' },
    { label: '30 min', value: '30' },
    { label: '60 min', value: '60' }
  ];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Mock available times for a selected date
  const mockTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', 
    '13:00', '13:30', '14:00', '15:00', '16:00'
  ];

  const handleDateClick = (day) => {
    if (isBefore(day, startOfDay(new Date()))) return;
    // Mock availability: block weekends
    if (day.getDay() === 0 || day.getDay() === 6) return;
    setSelectedDate(day);
  };

  return (
    <div className="p-6 md:p-8 flex-1 bg-white animate-fade-in flex flex-col h-full max-h-[800px] overflow-hidden">
      <div className="flex border-b border-slate-200 mb-6 gap-2 shrink-0">
        <button 
          onClick={() => setActiveTab('booking')}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'booking' 
              ? 'border-primary text-slate-800' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
          style={activeTab === 'booking' ? { borderColor: themeColor } : {}}
        >
          Booking Calendar
        </button>
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors ${
            activeTab === 'upcoming' 
              ? 'border-primary text-slate-800' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
          style={activeTab === 'upcoming' ? { borderColor: themeColor } : {}}
        >
          Upcoming Events
        </button>
      </div>
      
      {activeTab === 'booking' && (
        <div className="animate-fade-in flex-1 overflow-y-auto pb-4 flex flex-col md:flex-row gap-8">
          <div className={cn("flex-1 transition-all", selectedDate ? "md:border-r border-slate-100 pr-8" : "")}>
            
            {/* Meeting Duration Selection */}
            <div className="mb-6 pb-6 border-b border-slate-100">
              <label className="block text-sm font-bold text-slate-800 mb-3">Meeting Duration</label>
              <div className="flex flex-wrap gap-2">
                {offeredDurations.map(d => (
                  <button
                    key={d.value}
                    onClick={() => setSelectedDuration(d.value)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-bold transition-all border",
                      selectedDuration === d.value
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    )}
                    style={selectedDuration === d.value ? { backgroundColor: themeColor, borderColor: themeColor } : {}}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-slate-800">{format(currentMonth, 'MMMM yyyy')}</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-4 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-bold text-slate-500">
                  {day}
                </div>
              ))}
              
              {days.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isPast = isBefore(day, startOfDay(new Date()));
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                const isAvailable = !isPast && !isWeekend;
                const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                const isTodayDate = isToday(day);

                return (
                  <div key={i} className="flex justify-center items-center h-10">
                    <button
                      onClick={() => handleDateClick(day)}
                      disabled={!isCurrentMonth || !isAvailable}
                      className={cn(
                        "w-10 h-10 rounded-full font-medium text-sm flex items-center justify-center transition-all",
                        !isCurrentMonth && "text-transparent pointer-events-none",
                        isCurrentMonth && !isAvailable && "text-slate-300 cursor-not-allowed",
                        isCurrentMonth && isAvailable && !isSelected && "text-slate-700 hover:bg-slate-100 bg-slate-50",
                        isTodayDate && !isSelected && isAvailable && "text-primary font-bold border border-primary/30",
                        isSelected && "text-white shadow-md font-bold"
                      )}
                      style={isSelected ? { backgroundColor: themeColor } : {}}
                    >
                      {format(day, 'd')}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-500">
              <Globe size={16} /> India Standard Time (IST)
            </div>
          </div>

          {selectedDate && (
            <div className="md:w-64 animate-fade-in shrink-0">
              <h3 className="text-slate-800 font-medium mb-4">
                {format(selectedDate, 'EEEE, MMMM d')}
              </h3>
              <div className="space-y-2 pr-2 max-h-[350px] overflow-y-auto">
                {mockTimes.map(time => (
                  <button
                    key={time}
                    onClick={() => onSelect({
                      id: 'custom',
                      title: 'Meeting',
                      time: `${format(selectedDate, 'EEEE, MMMM d, yyyy')} at ${time}`,
                      duration: 30,
                      type: '1-on-1',
                      color: 'bg-primary'
                    })}
                    className="w-full py-2.5 rounded-lg border font-bold text-sm transition-all shadow-sm"
                    style={{ 
                      borderColor: themeColor,
                      color: themeColor,
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = themeColor;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = themeColor;
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="space-y-4 animate-fade-in flex-1 overflow-y-auto pr-2 pb-4">
          {mockUpcomingEvents.map(event => (
            <div 
              key={event.id}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white text-left shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div>
                  <h3 className="text-slate-800 font-bold">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-500 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {event.date} at {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video size={14} /> {event.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors shrink-0 ml-4"
                style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
              >
                Join Event
              </button>
            </div>
          ))}
          {mockUpcomingEvents.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              No upcoming events scheduled at this time.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
