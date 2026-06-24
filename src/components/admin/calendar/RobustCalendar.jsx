import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  subDays,
  startOfMonth,
  endOfMonth,
  parseISO,
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Mock Bookings
const mockBookings = [
  {
    id: '1',
    title: 'Discovery Call',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:00 AM',
    duration: 30,
    inviteeName: 'Alice Johnson',
    inviteeEmail: 'alice@example.com',
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Product Demo',
    date: new Date().toISOString().split('T')[0], // Today
    time: '02:00 PM',
    duration: 60,
    inviteeName: 'Bob Smith',
    inviteeEmail: 'bob@acme.com',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Consultation',
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    time: '11:00 AM',
    duration: 45,
    inviteeName: 'Charlie Davis',
    inviteeEmail: 'charlie@test.com',
    status: 'confirmed'
  }
];

export function RobustCalendar({ onDateClick, onBookingClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'

  // Navigation handlers
  const next = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const prev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(subDays(currentDate, 7));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const today = () => setCurrentDate(new Date());

  // Header Text
  const headerText = () => {
    if (view === 'month') return format(currentDate, 'MMMM yyyy');
    if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }
    return format(currentDate, 'MMMM d, yyyy');
  };

  // Get bookings for a specific day
  const getBookingsForDay = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return mockBookings.filter(b => b.date === dateStr);
  };

  // Render Month View
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
          {weekDays.map(day => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {days.map((day, i) => {
            const dayBookings = getBookingsForDay(day);
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isTodayDate = isToday(day);

            return (
              <div 
                key={day.toString()} 
                className={cn(
                  "border-r border-b border-slate-100 p-2 min-h-[100px] transition-colors cursor-pointer hover:bg-slate-50",
                  !isCurrentMonth && "bg-slate-50/50 text-slate-400",
                  i % 7 === 6 && "border-r-0"
                )}
                onClick={() => onDateClick(day)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={cn(
                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full",
                    isTodayDate ? "bg-primary text-white" : isCurrentMonth ? "text-slate-700" : "text-slate-400"
                  )}>
                    {format(day, dateFormat)}
                  </span>
                </div>
                <div className="space-y-1">
                  {dayBookings.map(booking => (
                    <div 
                      key={booking.id}
                      onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
                      className={cn(
                        "text-xs p-1.5 rounded truncate border transition-all hover:opacity-80",
                        booking.status === 'pending' 
                          ? "bg-yellow-50 border-yellow-200 text-yellow-800" 
                          : "bg-indigo-50 border-indigo-100 text-indigo-700"
                      )}
                    >
                      {booking.time} - {booking.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Week View
  const renderWeekView = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

    return (
      <div className="flex flex-col h-[600px] overflow-y-auto">
        <div className="flex border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="w-16 shrink-0 border-r border-slate-200 bg-slate-50"></div>
          {days.map(day => (
            <div key={day.toString()} className="flex-1 py-3 text-center border-r border-slate-200 bg-slate-50">
              <div className="text-xs font-semibold text-slate-500 uppercase">{format(day, 'EEE')}</div>
              <div className={cn(
                "text-lg font-bold mt-1 inline-block w-8 h-8 rounded-full leading-8",
                isToday(day) ? "bg-primary text-white" : "text-slate-800"
              )}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-1 relative">
          <div className="w-16 shrink-0 border-r border-slate-200 bg-slate-50">
            {hours.map(hour => (
              <div key={hour} className="h-16 text-right pr-2 text-xs text-slate-400 relative -top-2.5">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
            ))}
          </div>
          <div className="flex-1 flex relative">
            {days.map((day, dayIdx) => (
              <div key={day.toString()} className="flex-1 border-r border-slate-100 relative" onClick={() => onDateClick(day)}>
                {hours.map(hour => (
                  <div key={hour} className="h-16 border-b border-slate-100/50"></div>
                ))}
                {/* Render bookings absolute positioned (Mock logic, not precise hour placement for simplicity) */}
                {getBookingsForDay(day).map((booking, idx) => (
                  <div
                    key={booking.id}
                    onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
                    className={cn(
                      "absolute w-[90%] left-[5%] p-2 rounded-lg border text-xs cursor-pointer shadow-sm z-10 transition-transform hover:scale-[1.02]",
                      booking.status === 'pending' 
                        ? "bg-yellow-50 border-yellow-200 text-yellow-800" 
                        : "bg-indigo-50 border-indigo-200 text-indigo-700"
                    )}
                    style={{ top: `${(idx + 1) * 60 + 20}px` }} // Hacky mock positioning
                  >
                    <div className="font-semibold">{booking.title}</div>
                    <div>{booking.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Day View
  const renderDayView = () => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
    const dayBookings = getBookingsForDay(currentDate);

    return (
      <div className="flex flex-col h-[600px] overflow-y-auto">
        <div className="flex border-b border-slate-200 sticky top-0 bg-white z-10">
          <div className="w-16 shrink-0 border-r border-slate-200 bg-slate-50"></div>
          <div className="flex-1 py-4 text-center bg-slate-50">
             <div className="text-sm font-semibold text-slate-500 uppercase">{format(currentDate, 'EEEE')}</div>
             <div className="text-2xl font-bold text-slate-800 mt-1">{format(currentDate, 'MMMM d, yyyy')}</div>
          </div>
        </div>
        <div className="flex flex-1 relative">
          <div className="w-16 shrink-0 border-r border-slate-200 bg-slate-50">
            {hours.map(hour => (
              <div key={hour} className="h-20 text-right pr-2 text-xs text-slate-400 relative -top-2.5">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
              </div>
            ))}
          </div>
          <div className="flex-1 relative" onClick={() => onDateClick(currentDate)}>
             {hours.map(hour => (
                <div key={hour} className="h-20 border-b border-slate-100"></div>
             ))}
             {/* Render bookings */}
             {dayBookings.map((booking, idx) => (
                <div
                  key={booking.id}
                  onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
                  className={cn(
                    "absolute w-[90%] left-[5%] p-3 rounded-xl border text-sm cursor-pointer shadow-sm z-10 transition-transform hover:scale-[1.01]",
                    booking.status === 'pending' 
                      ? "bg-yellow-50 border-yellow-200 text-yellow-800" 
                      : "bg-indigo-50 border-indigo-200 text-indigo-800"
                  )}
                  style={{ top: `${(idx + 1) * 80 + 20}px` }} // Hacky mock positioning
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold">{booking.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 border border-current">{booking.status}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs opacity-90">
                    <span className="flex items-center gap-1"><Clock size={12} /> {booking.time}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {booking.inviteeName}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px] animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
        <div className="flex items-center gap-4">
          <button onClick={today} className="px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
            Today
          </button>
          <div className="flex items-center gap-1">
            <button onClick={prev} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <h2 className="text-xl font-bold text-slate-800 min-w-[200px]">
            {headerText()}
          </h2>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors",
                view === v ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Body */}
      <div className="flex-1 bg-white">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
      </div>
    </div>
  );
}
