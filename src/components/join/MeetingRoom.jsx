import React, { useState } from 'react';
import { users } from '../../data/mockData';
import { Mic, MicOff, Video, VideoOff, MonitorUp, MessageSquare, Smile, PhoneOff, Settings } from 'lucide-react';

export function MeetingRoom({ onLeave }) {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="h-screen bg-slate-900 flex flex-col relative overflow-hidden animate-fade-in">
      {/* Top Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-bold">M</div>
          <div className="font-medium">1 Hour Strategy Session</div>
          <div className="px-2 py-0.5 rounded bg-red-500 text-xs font-bold animate-pulse flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div> REC
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="bg-slate-800 px-3 py-1 rounded-lg">10:02 AM</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4 grid grid-cols-2 gap-4 auto-rows-fr">
          {users.map((user, idx) => (
            <div key={user.id} className="bg-slate-800 rounded-2xl relative overflow-hidden group shadow-lg border border-slate-700">
              <img src={user.avatar} alt={user.name} className={`w-full h-full object-cover transition-opacity ${!videoOn && idx === 0 ? 'opacity-0' : 'opacity-100'}`} />
              
              {!videoOn && idx === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-slate-900/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-medium flex items-center gap-2">
                  {user.name} {idx === 0 && "(You)"}
                  {user.role === 'Host' && <span className="text-xs bg-primary px-1.5 py-0.5 rounded ml-1">Host</span>}
                </div>
                {(!micOn && idx === 0) && (
                  <div className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white">
                    <MicOff size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Sidebar */}
        {chatOpen && (
          <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 animate-slide-in">
            <div className="p-4 border-b border-slate-200 font-bold text-slate-800 flex justify-between items-center">
              Meeting Chat
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="flex gap-3">
                <img src={users[1].avatar} alt="" className="w-8 h-8 rounded-full shrink-0" />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm text-slate-800">{users[1].name}</span>
                    <span className="text-xs text-slate-400">10:01 AM</span>
                  </div>
                  <div className="bg-slate-100 p-2.5 rounded-xl rounded-tl-none text-sm text-slate-700 mt-1">
                    Hey everyone, thanks for joining! Let's get started.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-200">
              <input type="text" placeholder="Type a message..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 shrink-0 relative">
        <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
          {micOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        <button onClick={() => setVideoOn(!videoOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${videoOn ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
          {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>
        <div className="w-px h-8 bg-slate-700 mx-2"></div>
        <button className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors">
          <MonitorUp size={20} />
        </button>
        <button onClick={() => setChatOpen(!chatOpen)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${chatOpen ? 'bg-primary text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
          <MessageSquare size={20} />
        </button>
        
        <div className="relative">
          <button onClick={() => setShowReactions(!showReactions)} className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-colors">
            <Smile size={20} />
          </button>
          {showReactions && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-800 rounded-full flex gap-2 p-2 shadow-xl border border-slate-700 animate-fade-in">
              {['👍', '❤️', '✋', '👏', '🎉'].map(emoji => (
                <button key={emoji} className="w-10 h-10 rounded-full hover:bg-slate-700 text-xl flex items-center justify-center transition-transform hover:scale-125">
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-slate-700 mx-2"></div>
        
        <button onClick={onLeave} className="px-6 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20">
          <PhoneOff size={20} /> Leave
        </button>
      </div>
    </div>
  );
}
