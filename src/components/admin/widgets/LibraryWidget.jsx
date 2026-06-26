import React from 'react';
import { Folder } from 'lucide-react';
import { initialFiles } from '../LibraryScreen';

export function LibraryWidget() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Folder size={20} className="text-blue-500" /> Library</h3>
        <a href="#library" className="text-sm font-medium text-primary hover:underline">View All</a>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-1">
        {initialFiles.slice(0, 4).map(file => (
          <div 
            key={file.id}
            className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer group"
            onClick={() => window.open(`/preview/${file.id}`, '_blank')}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <file.icon size={20} className={file.color} />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold text-slate-800 truncate">{file.name}</h4>
                <p className="text-xs text-slate-500">{file.size} • {file.type.split('/')[1]}</p>
              </div>
            </div>
          </div>
        ))}
        {initialFiles.length > 4 && (
          <a href="#library" className="block text-center text-sm font-medium text-slate-500 mt-2 py-2 hover:bg-slate-50 rounded-lg transition-colors">
            +{initialFiles.length - 4} more files
          </a>
        )}
      </div>
    </div>
  );
}
