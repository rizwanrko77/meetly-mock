import React from 'react';

export function KpiCard({ title, value, icon: Icon, trend, trendLabel, color = "primary" }) {
  const colors = {
    primary: "bg-indigo-50 text-indigo-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-emerald-600' : 'text-red-600'} flex items-center bg-slate-50 px-2 py-1 rounded-md`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {trendLabel && (
        <div className="text-xs text-slate-400 mt-2">{trendLabel}</div>
      )}
    </div>
  );
}
