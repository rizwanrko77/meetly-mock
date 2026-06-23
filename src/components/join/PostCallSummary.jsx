import React from 'react';
import { Sparkles, Play, Download, Share2, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PostCallSummary() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 animate-fade-in flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Meeting Ended</h1>
          <p className="text-slate-500 mt-2">1 Hour Strategy Session • 4 Participants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Sparkles className="text-purple-500" size={20} /> AI Summary
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wider">Key Decisions</h4>
                  <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                    <li>Approved Q3 roadmap and feature highlights.</li>
                    <li>Agreed to increase marketing budget by 15%.</li>
                    <li>Decided to delay the mobile app launch to Q4.</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="font-semibold text-indigo-900 mb-2 text-sm uppercase tracking-wider">Action Items</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-indigo-800">
                      <input type="checkbox" className="mt-1 border-indigo-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <span>Alex to draft the final Q3 plan by Friday.</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-indigo-800">
                      <input type="checkbox" className="mt-1 border-indigo-300 rounded text-indigo-600 focus:ring-indigo-500" />
                      <span>Sarah to reach out to the design agency for revised quotes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Recording</h3>
              <div className="aspect-video bg-slate-900 rounded-xl relative flex items-center justify-center group overflow-hidden border border-slate-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-50"></div>
                <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 group-hover:scale-110 transition-transform relative z-10 shadow-lg">
                  <Play size={24} className="ml-1" />
                </button>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex justify-center items-center gap-2">
                  <Download size={16} /> Download
                </button>
                <button className="flex-1 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 flex justify-center items-center gap-2">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Feedback</h3>
              <p className="text-sm text-slate-500 mb-4">How was the call quality?</p>
              <div className="flex justify-between mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} className="text-slate-300 hover:text-yellow-400 transition-colors">
                    <Star fill="currentColor" size={32} />
                  </button>
                ))}
              </div>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-primary resize-none mb-4" 
                rows="3"
                placeholder="Any comments?"
              ></textarea>
              <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700">
                Submit Feedback
              </button>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 text-center">
              <h3 className="text-indigo-900 font-bold mb-2">Need to follow up?</h3>
              <p className="text-indigo-700 text-sm mb-4">Schedule another session with Alex.</p>
              <Link to="/admin" className="block w-full py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-50">
                Book Another Meeting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
