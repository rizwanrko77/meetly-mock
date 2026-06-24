import React, { useState } from 'react';
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
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function TimeSelectionStep({ onSelectTime, themeColor }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

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
    // Don't allow clicking past dates
    if (isBefore(day, startOfDay(new Date()))) return;
    setSelectedDate(day);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 bg-white animate-fade-in min-h-[500px]">
      {/* Calendar Section */}
      <div className={cn("p-6 md:p-8 flex-1 transition-all", selectedDate ? "md:w-2/3 md:border-r border-slate-100" : "w-full")}>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Select a Date & Time</h2>
        
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-medium text-slate-800">{format(currentMonth, 'MMMM yyyy')}</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors border border-slate-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-4 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-500">
              {day}
            </div>
          ))}
          
          {days.map((day, i) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isPast = isBefore(day, startOfDay(new Date()));
            const isSelected = selectedDate && format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
            const isTodayDate = isToday(day);

            return (
              <div key={i} className="flex justify-center items-center h-12">
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={!isCurrentMonth || isPast}
                  className={cn(
                    "w-12 h-12 rounded-full font-medium text-sm flex items-center justify-center transition-all",
                    !isCurrentMonth && "text-transparent pointer-events-none",
                    isCurrentMonth && isPast && "text-slate-300 cursor-not-allowed",
                    isCurrentMonth && !isPast && !isSelected && "text-slate-700 hover:bg-slate-100",
                    isTodayDate && !isSelected && "text-primary font-bold bg-slate-50",
                    isSelected && "text-white shadow-md font-bold"
                  )}
                  style={isSelected ? { backgroundColor: themeColor } : {}}
                >
                  {format(day, 'd')}
                  {/* Mock availability dot indicator */}
                  {isCurrentMonth && !isPast && !isSelected && (
                     <div className="absolute mt-8 w-1 h-1 rounded-full bg-slate-300"></div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-sm font-medium text-slate-600">
          <Globe size={16} className="text-slate-400" /> India Standard Time (IST)
        </div>
      </div>

      {/* Time Slots Section (Slide in from right) */}
      {selectedDate && (
        <div className="p-6 md:p-8 md:w-1/3 bg-slate-50 md:bg-white animate-fade-in shrink-0 overflow-y-auto max-h-[600px]">
          <h3 className="text-slate-800 font-medium mb-6">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h3>
          <div className="space-y-3">
            {mockTimes.map(time => (
              <button
                key={time}
                onClick={() => onSelectTime(`${format(selectedDate, 'EEEE, MMMM d, yyyy')} at ${time}`)}
                className="w-full py-3.5 rounded-lg border font-bold text-sm transition-all shadow-sm"
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
  );
}
