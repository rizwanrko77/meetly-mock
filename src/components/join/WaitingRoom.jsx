import React, { useState } from 'react';
import { currentUser, users } from '../../data/mockData';
import { Video, Calendar as CalendarIcon, Clock, ShieldCheck, Users, Key, CreditCard, MessageSquare, CheckCircle2 } from 'lucide-react';

export function WaitingRoom({ onJoin }) {
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const joinedParticipants = users.slice(2, 4); // Just some mock participants
  
  return (
    <div className="flex-1 flex items-center justify-center p-6 animate-fade-in bg-slate-50 min-h-screen relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary z-0 rounded-b-[4rem]"></div>

      <div className="z-10 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-2xl w-full p-6 md:p-10 text-center flex flex-col max-h-[90vh] overflow-y-auto">
        
        <div className="flex-shrink-0">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <img src={currentUser.avatar} alt="Host" className="w-full h-full rounded-full border-4 border-white shadow-md object-cover" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <Video size={12} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{currentUser.name} is waiting for you</h2>
          <p className="text-slate-500 text-sm mb-6">{currentUser.role} • {currentUser.plan}</p>
        </div>

        {/* Status Banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm font-medium mb-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
          Status: Waiting for Host to start the meeting
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
          {/* Meeting Details */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <CalendarIcon className="text-primary" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">1 Hour Strategy Session</h4>
                <p className="text-slate-500 text-xs mt-0.5">June 25, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <Clock className="text-primary" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">10:00 AM - 11:00 AM</h4>
                <p className="text-slate-500 text-xs mt-0.5">Starts in 5 minutes</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Users className="text-emerald-600" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">Already Joined</h4>
                <div className="flex -space-x-2 overflow-hidden mt-1">
                  {joinedParticipants.map(p => (
                    <img key={p.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={p.avatar} alt={p.name} title={p.name} />
                  ))}
                  <div className="inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 text-[10px] font-medium text-slate-600">
                    +2
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <Key className="text-rose-600" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">Passcode</h4>
                <p className="text-slate-500 text-xs mt-0.5 tracking-widest font-mono">847291</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8 text-left">
          {/* Pre-question */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <label className="flex items-center gap-2 font-semibold text-slate-800 text-sm mb-3">
              <MessageSquare size={16} className="text-primary" />
              Pre-meeting Question
            </label>
            <p className="text-sm text-slate-600 mb-2">What is your main goal for this strategy session?</p>
            <textarea 
              rows={2}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="Your answer..."
              value={questionAnswer}
              onChange={e => setQuestionAnswer(e.target.value)}
            />
          </div>

          {/* Payment */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <CreditCard className="text-slate-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">Meeting Fee</h4>
                <p className="text-slate-500 text-xs mt-0.5">$50.00 USD</p>
              </div>
            </div>
            {isPaid ? (
              <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <CheckCircle2 size={16} /> Paid
              </div>
            ) : (
              <button 
                onClick={() => setIsPaid(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Pay Now
              </button>
            )}
          </div>
        </div>

        <div className="mt-auto">
          <button 
            onClick={onJoin}
            disabled={!isPaid}
            className="w-full py-3.5 bg-primary hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isPaid ? 'Join Meeting' : 'Payment Required to Join'}
          </button>

          <div className="mt-5 flex justify-center gap-4 text-sm font-medium">
            <button className="text-slate-500 hover:text-slate-800 transition-colors">Reschedule</button>
            <span className="text-slate-300">•</span>
            <button className="text-slate-500 hover:text-red-600 transition-colors">Cancel</button>
          </div>
          
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} /> End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
