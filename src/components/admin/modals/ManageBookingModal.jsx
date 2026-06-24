import React from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, Trash2, Edit2, AlertCircle } from 'lucide-react';

export function ManageBookingModal({ isOpen, onClose, booking, onAction }) {
  if (!isOpen || !booking) return null;

  const handleAction = (action) => {
    onAction(action, booking);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Manage Booking</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{booking.title}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarIcon size={16} className="text-slate-400" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock size={16} className="text-slate-400" />
                <span>{booking.time} ({booking.duration} mins)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Users size={16} className="text-slate-400" />
                <span>{booking.inviteeName} ({booking.inviteeEmail})</span>
              </div>
            </div>

            {booking.status === 'pending' && (
              <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-lg flex items-start gap-2 text-sm border border-yellow-200">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>This booking requires your manual confirmation.</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {booking.status === 'pending' && (
              <button 
                onClick={() => handleAction('confirm')}
                className="w-full py-2.5 bg-green-50 text-green-700 font-medium hover:bg-green-100 rounded-xl transition-colors border border-green-200"
              >
                Confirm Booking
              </button>
            )}
            
            <button 
              onClick={() => handleAction('reschedule')}
              className="w-full py-2.5 bg-white text-slate-700 font-medium hover:bg-slate-50 rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2"
            >
              <Edit2 size={16} /> Reschedule
            </button>
            
            <button 
              onClick={() => handleAction('cancel')}
              className="w-full py-2.5 bg-red-50 text-red-600 font-medium hover:bg-red-100 rounded-xl transition-colors border border-red-200 flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
