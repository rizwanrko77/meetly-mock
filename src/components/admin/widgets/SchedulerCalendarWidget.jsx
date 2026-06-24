import React from 'react';
import { RobustCalendar } from '../calendar/RobustCalendar';

export function SchedulerCalendarWidget() {
  const handleDateClick = (date) => {
    // Navigate to scheduler or show modal
    window.location.hash = 'scheduler';
  };

  const handleBookingClick = (booking) => {
    // Navigate to scheduler or show modal
    window.location.hash = 'scheduler';
  };

  return (
    <div className="h-[600px]">
      <RobustCalendar 
        onDateClick={handleDateClick} 
        onBookingClick={handleBookingClick} 
      />
    </div>
  );
}
