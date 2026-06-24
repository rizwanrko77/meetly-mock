import React, { useState } from 'react';
import { Plus, Settings, Clock, Link as LinkIcon } from 'lucide-react';
import { RobustCalendar } from './calendar/RobustCalendar';
import { NewMeetingModal } from './modals/NewMeetingModal';
import { PublicPageSettingsModal } from './modals/PublicPageSettingsModal';
import { AvailabilityModal } from './modals/AvailabilityModal';
import { ManageBookingModal } from './modals/ManageBookingModal';

export function SchedulerScreen() {
  const [activeModal, setActiveModal] = useState(null); // 'new', 'settings', 'availability', 'manage'
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleDateClick = (date) => {
    console.log('Clicked date:', date);
    // Could open a "New Booking" modal specifically for this date, 
    // but for now, we'll just open the New Meeting type modal or alert.
    // setActiveModal('new');
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setActiveModal('manage');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Scheduler</h2>
          <p className="text-slate-500">Manage your availability, event types, and bookings.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setActiveModal('settings')}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Settings size={16} className="text-slate-500" /> Public Page Settings
          </button>
          
          <button 
            onClick={() => setActiveModal('availability')}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Clock size={16} className="text-slate-500" /> Availability
          </button>
          
          <button 
            onClick={() => setActiveModal('new')}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={16} /> New Event
          </button>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className="w-full">
        <RobustCalendar 
          onDateClick={handleDateClick}
          onBookingClick={handleBookingClick}
        />
      </div>

      {/* Modals */}
      <NewMeetingModal 
        isOpen={activeModal === 'new'} 
        onClose={() => setActiveModal(null)}
        onSave={(data) => {
          console.log('Saved Event:', data);
          setActiveModal(null);
        }}
      />

      <PublicPageSettingsModal
        isOpen={activeModal === 'settings'} 
        onClose={() => setActiveModal(null)}
        onSave={(data) => {
          console.log('Saved Settings:', data);
          setActiveModal(null);
        }}
      />

      <AvailabilityModal
        isOpen={activeModal === 'availability'} 
        onClose={() => setActiveModal(null)}
        onSave={(data) => {
          console.log('Saved Availability:', data);
          setActiveModal(null);
        }}
      />

      <ManageBookingModal
        isOpen={activeModal === 'manage'}
        onClose={() => {
          setActiveModal(null);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
        onAction={(action, booking) => {
          console.log(`Action: ${action} on booking:`, booking);
          // Handle delete, modify, cancel, reschedule here
        }}
      />
    </div>
  );
}
