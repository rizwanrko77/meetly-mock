import React, { useState } from 'react';
import { X, Users, Plus, Play } from 'lucide-react';
import { users } from '../../data/mockData';

export function BreakoutRoomsModal({ onClose, onStart }) {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Room 1', participants: [users[1], users[2]] },
    { id: 2, name: 'Room 2', participants: [users[3]] }
  ]);
  const [unassigned, setUnassigned] = useState([users[0]]);

  const addRoom = () => {
    setRooms([...rooms, { id: Date.now(), name: `Room ${rooms.length + 1}`, participants: [] }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Breakout Rooms</h2>
              <p className="text-sm text-slate-400">Assign participants to different rooms</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Unassigned */}
          {unassigned.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Unassigned Participants ({unassigned.length})</h3>
              <div className="flex flex-wrap gap-2">
                {unassigned.map(u => (
                  <div key={u.id} className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                    <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-slate-300">{u.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rooms */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Rooms ({rooms.length})</h3>
              <button onClick={addRoom} className="text-sm text-primary hover:text-blue-400 flex items-center gap-1">
                <Plus size={16} /> Add Room
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {rooms.map(room => (
                <div key={room.id} className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-slate-200">{room.name}</h4>
                    <span className="text-xs font-medium bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{room.participants.length}</span>
                  </div>
                  
                  {room.participants.length > 0 ? (
                    <div className="space-y-2">
                      {room.participants.map(p => (
                        <div key={p.id} className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                          <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full" />
                          <span className="text-sm text-slate-300">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-slate-500 text-sm border-2 border-dashed border-slate-700 rounded-lg">
                      Drag participants here
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 bg-slate-800/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={onStart} className="px-5 py-2 bg-primary hover:bg-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Play size={16} /> Open All Rooms
          </button>
        </div>
      </div>
    </div>
  );
}
