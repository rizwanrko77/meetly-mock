import React, { useState } from 'react';
import { X, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function JoinMeetingModal({ isOpen, onClose }) {
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleJoin = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      onClose();
      navigate('/join');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Join a Meeting</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Code or Link</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800"
                value={meetingCode}
                onChange={e => setMeetingCode(e.target.value)}
                placeholder="e.g. abc-defg-hij"
              />
              <p className="text-xs text-slate-500 mt-2">Enter the meeting code provided by the organizer.</p>
            </div>

            <button
              type="submit"
              disabled={!meetingCode.trim()}
              className="w-full py-3 bg-primary text-white font-medium hover:bg-indigo-700 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Video size={18} /> Join Meeting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
