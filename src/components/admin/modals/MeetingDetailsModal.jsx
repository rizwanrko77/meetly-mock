import React from 'react';
import { X } from 'lucide-react';
import { MeetingDetailsPanel } from '../MeetingDetailsPanel';

export function MeetingDetailsModal({ isOpen, onClose, meeting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col w-[80vw] max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 flex-none">
          <h2 className="text-xl font-bold text-slate-800">
            {meeting?.type || "Meeting Details"}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-10 overflow-y-auto flex-1 custom-scrollbar bg-slate-50/50">
          <div className="w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
            {meeting ? (
              <MeetingDetailsPanel meeting={meeting} />
            ) : (
              <div className="text-slate-500 text-sm text-center py-10">Select an item to view details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
