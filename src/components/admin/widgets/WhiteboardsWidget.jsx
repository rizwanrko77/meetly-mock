import React from 'react';
import { PenTool } from 'lucide-react';

export function WhiteboardsWidget() {
  const whiteboards = [
    { id: 1, title: 'Product Roadmap Q3', updated: '2 hours ago', color: 'bg-indigo-100 text-indigo-700' },
    { id: 2, title: 'Architecture Brainstorm', updated: 'Yesterday', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
        Recent Whiteboards
        <button onClick={() => window.location.hash = 'whiteboard'} className="text-sm text-primary font-medium hover:text-indigo-600">View All</button>
      </h3>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {whiteboards.map(board => (
          <div key={board.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between hover:bg-slate-100 transition-colors cursor-pointer">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${board.color}`}>
              <PenTool size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 line-clamp-2">{board.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{board.updated}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
