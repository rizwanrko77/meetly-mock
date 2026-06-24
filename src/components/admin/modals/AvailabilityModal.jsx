import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, ShieldCheck, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isToday, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function AvailabilityModal({ isOpen, onClose, onSave }) {
  const [scheduleType, setScheduleType] = useState('weekly'); // 'weekly' or 'monthly'
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [selectedDates, setSelectedDates] = useState([]); // Array of 'yyyy-MM-dd'
  const [isRecurring, setIsRecurring] = useState(true);
  
  // Global time slots
  const [globalTimeSlots, setGlobalTimeSlots] = useState([{ id: '1', start: '10:00', end: '12:00' }]);
  
  // Overrides for specific dates (format: { 'yyyy-MM-dd': [{ id, start, end }] })
  const [dateOverrides, setDateOverrides] = useState({});

  const [bufferTime, setBufferTime] = useState('15');
  const [autoConfirm, setAutoConfirm] = useState(true);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  if (!isOpen) return null;

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleDate = (dateStr) => {
    setSelectedDates(prev => 
      prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
    );
  };

  const addGlobalTimeSlot = () => {
    setGlobalTimeSlots([...globalTimeSlots, { id: Math.random().toString(), start: '09:00', end: '17:00' }]);
  };

  const removeGlobalTimeSlot = (id) => {
    setGlobalTimeSlots(globalTimeSlots.filter(t => t.id !== id));
  };

  const updateGlobalTimeSlot = (id, field, value) => {
    setGlobalTimeSlots(globalTimeSlots.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const addOverrideSlot = (dateStr) => {
    const currentSlots = dateOverrides[dateStr] || [{ id: Math.random().toString(), start: '09:00', end: '17:00' }];
    setDateOverrides({
      ...dateOverrides,
      [dateStr]: [...currentSlots, { id: Math.random().toString(), start: '09:00', end: '17:00' }]
    });
  };

  const removeOverrideSlot = (dateStr, id) => {
    const currentSlots = dateOverrides[dateStr] || [];
    const newSlots = currentSlots.filter(t => t.id !== id);
    if (newSlots.length === 0) {
      const newOverrides = { ...dateOverrides };
      delete newOverrides[dateStr];
      setDateOverrides(newOverrides);
    } else {
      setDateOverrides({ ...dateOverrides, [dateStr]: newSlots });
    }
  };

  const updateOverrideSlot = (dateStr, id, field, value) => {
    const currentSlots = dateOverrides[dateStr] || [];
    setDateOverrides({
      ...dateOverrides,
      [dateStr]: currentSlots.map(t => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const enableOverride = (dateStr) => {
    if (!dateOverrides[dateStr]) {
      // Initialize with copy of global slots
      setDateOverrides({
        ...dateOverrides,
        [dateStr]: globalTimeSlots.map(t => ({ ...t, id: Math.random().toString() }))
      });
    }
  };

  const removeOverride = (dateStr) => {
    const newOverrides = { ...dateOverrides };
    delete newOverrides[dateStr];
    setDateOverrides(newOverrides);
  };

  const renderMiniCalendar = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm w-full max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <ChevronLeft size={18} />
          </button>
          <span className="font-bold text-slate-800 text-sm">{format(currentMonth, 'MMMM yyyy')}</span>
          <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDays.map(d => <div key={d} className="text-xs font-semibold text-slate-400">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const isSelected = selectedDates.includes(dateStr);
            const inMonth = isSameMonth(day, monthStart);
            const isCurrentDay = isToday(day);
            const hasOverride = !!dateOverrides[dateStr];

            return (
              <button
                type="button"
                key={day.toString()}
                onClick={() => toggleDate(dateStr)}
                disabled={!inMonth}
                className={cn(
                  "h-8 w-8 rounded-full text-sm flex items-center justify-center transition-colors relative mx-auto",
                  !inMonth ? "text-slate-300 opacity-50 cursor-not-allowed" : "cursor-pointer",
                  inMonth && !isSelected && "hover:bg-slate-100 text-slate-700",
                  isSelected && "bg-primary text-white shadow-sm font-bold",
                  isCurrentDay && !isSelected && "ring-1 ring-primary text-primary"
                )}
              >
                {format(day, 'd')}
                {hasOverride && isSelected && (
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full border border-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSlotEditor = (slots, onAdd, onRemove, onUpdate) => (
    <div className="space-y-3">
      {slots.map((slot, index) => (
        <div key={slot.id} className="flex items-center gap-3">
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="relative">
              <input 
                type="time" 
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                value={slot.start}
                onChange={e => onUpdate(slot.id, 'start', e.target.value)}
              />
            </div>
            <div className="relative">
              <input 
                type="time" 
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                value={slot.end}
                onChange={e => onUpdate(slot.id, 'end', e.target.value)}
              />
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => onRemove(slot.id)}
            disabled={slots.length === 1}
            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={onAdd}
        className="text-primary hover:text-indigo-700 text-sm flex items-center gap-1 font-medium transition-colors"
      >
        <Plus size={14} /> Add another time slot
      </button>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      scheduleType,
      selectedDays: scheduleType === 'weekly' ? selectedDays : [],
      selectedDates: scheduleType === 'monthly' ? selectedDates : [],
      globalTimeSlots,
      dateOverrides,
      isRecurring,
      bufferTime,
      autoConfirm
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon size={20} className="text-primary" /> Define Availability
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <form id="availability-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Schedule Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">Schedule Type</label>
              <div className="flex bg-slate-100 p-1 rounded-xl w-full max-w-md">
                <button
                  type="button"
                  className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-colors", scheduleType === 'weekly' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700')}
                  onClick={() => setScheduleType('weekly')}
                >
                  Weekly Routine
                </button>
                <button
                  type="button"
                  className={cn("flex-1 py-2 text-sm font-medium rounded-lg transition-colors", scheduleType === 'monthly' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700')}
                  onClick={() => setScheduleType('monthly')}
                >
                  Monthly Custom
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              {scheduleType === 'weekly' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Select Available Days</label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedDays.includes(day)
                            ? "bg-primary text-white shadow-sm ring-2 ring-primary/20"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50 hover:bg-indigo-50"
                        )}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-3">Select Specific Dates</label>
                    {renderMiniCalendar()}
                  </div>
                  <div className="flex-1">
                     <label className="block text-sm font-medium text-slate-700 mb-3">Selected ({selectedDates.length})</label>
                     <div className="bg-white border border-slate-200 rounded-xl p-3 h-[280px] overflow-y-auto">
                        {selectedDates.length === 0 ? (
                          <div className="text-sm text-slate-400 text-center mt-10">Click dates on the calendar to add them.</div>
                        ) : (
                          <div className="space-y-2">
                            {selectedDates.sort().map(d => (
                              <div key={d} className="flex items-center justify-between bg-slate-50 p-2 rounded-lg text-sm border border-slate-100">
                                <span className="font-medium text-slate-700">{format(new Date(d), 'MMM d, yyyy')}</span>
                                <button type="button" onClick={() => toggleDate(d)} className="text-slate-400 hover:text-red-500">
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                     </div>
                  </div>
                </div>
              )}

              {scheduleType === 'monthly' && (
                <div className="mt-5 pt-5 border-t border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={isRecurring}
                        onChange={e => setIsRecurring(e.target.checked)}
                      />
                      <div className={cn("block w-10 h-6 rounded-full transition-colors", isRecurring ? "bg-primary" : "bg-slate-300")}></div>
                      <div className={cn("absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform", isRecurring ? "translate-x-4" : "")}></div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors block">
                        Recurring Schedule
                      </span>
                      <span className="text-xs text-slate-500">Apply these selected dates to all upcoming months</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Time Settings */}
            <div className="flex flex-col md:flex-row gap-8 border-t border-slate-100 pt-8">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Global Time Constraints
                </label>
                <p className="text-xs text-slate-500 mb-4">These times apply to all selected {scheduleType === 'weekly' ? 'days' : 'dates'} by default.</p>
                
                {renderTimeSlotEditor(
                  globalTimeSlots, 
                  addGlobalTimeSlot, 
                  removeGlobalTimeSlot, 
                  updateGlobalTimeSlot
                )}
              </div>

              {((scheduleType === 'monthly' && selectedDates.length > 0) || (scheduleType === 'weekly' && selectedDays.length > 0)) && (
                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-8 md:pt-0 md:pl-8">
                  <label className="block text-sm font-semibold text-slate-800 mb-4">
                    {scheduleType === 'weekly' ? 'Day' : 'Date'}-Specific Times
                  </label>
                  <p className="text-xs text-slate-500 mb-4">Override times for specific {scheduleType === 'weekly' ? 'days' : 'dates'}.</p>
                  
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {(scheduleType === 'weekly' 
                      ? [...selectedDays].sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
                      : [...selectedDates].sort()
                    ).map(itemStr => {
                      const hasOverride = !!dateOverrides[itemStr];
                      const displayLabel = scheduleType === 'weekly' ? itemStr : format(new Date(itemStr), 'MMM d, yyyy');
                      return (
                        <div key={itemStr} className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-700">{displayLabel}</span>
                            {!hasOverride ? (
                              <button type="button" onClick={() => enableOverride(itemStr)} className="text-xs font-medium text-primary hover:text-indigo-700 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                                Set Custom Times
                              </button>
                            ) : (
                              <button type="button" onClick={() => removeOverride(itemStr)} className="text-xs font-medium text-red-500 hover:text-red-700 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                                Reset to Global
                              </button>
                            )}
                          </div>
                          {hasOverride && (
                            <div className="mt-3 pt-3 border-t border-slate-200">
                              {renderTimeSlotEditor(
                                dateOverrides[itemStr],
                                () => addOverrideSlot(itemStr),
                                (id) => removeOverrideSlot(itemStr, id),
                                (id, field, value) => updateOverrideSlot(itemStr, id, field, value)
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column for Durations & Buffer */}
              <div className="space-y-8">
                {/* Durations */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Meeting Durations</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: '15 min', value: '15' },
                      { label: '30 min', value: '30' },
                      { label: '45 min', value: '45' },
                      { label: '60 min', value: '60' },
                      { label: 'Custom', value: 'custom' }
                    ].map(d => {
                      // Using a simple local state for mockup purposes, normally this would be in component state
                      const isSelected = ['15', '30', '60'].includes(d.value);
                      return (
                        <button
                          key={d.value}
                          type="button"
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            isSelected
                              ? "bg-primary text-white shadow-sm ring-2 ring-primary/20"
                              : "bg-white text-slate-600 border border-slate-200 hover:border-primary/50 hover:bg-indigo-50"
                          )}
                        >
                          {d.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Select the meeting lengths you want to offer publicly.</p>
                </div>

                {/* Buffer */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-3">Buffer Time</label>
                  <select 
                    className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={bufferTime}
                    onChange={e => setBufferTime(e.target.value)}
                  >
                    <option value="0">No buffer</option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">Time added before and after meetings.</p>
                </div>
              </div>

              {/* Confirmation Settings */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary" /> Booking Confirmation
                </label>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative mt-1">
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={autoConfirm}
                        onChange={e => setAutoConfirm(e.target.checked)}
                      />
                      <div className={cn("block w-12 h-7 rounded-full transition-colors", autoConfirm ? "bg-green-500" : "bg-slate-300")}></div>
                      <div className={cn("absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform", autoConfirm ? "translate-x-5" : "")}></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {autoConfirm ? 'Auto-Confirm Meetings' : 'Manual Confirmation Required'}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {autoConfirm 
                          ? 'New bookings are automatically approved.' 
                          : 'Review and approve every booking request.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
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
            type="submit"
            form="availability-form"
            className="px-5 py-2.5 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
}

