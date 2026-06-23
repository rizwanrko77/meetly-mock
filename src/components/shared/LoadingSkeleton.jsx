import React from 'react';

export function LoadingSkeleton({ type = 'table', rows = 5 }) {
  if (type === 'chart') {
    return (
      <div className="animate-pulse bg-white rounded-xl border border-slate-200 p-6 h-80 flex flex-col justify-end gap-2">
        <div className="flex gap-2 h-full items-end">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-slate-200 flex-1 rounded-t-md" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="h-12 bg-slate-50 border-b border-slate-200"></div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex h-16 border-b border-slate-100 items-center px-6 gap-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
