import React, { useState } from 'react';
import { meetings } from '../../data/mockData';
import { DataTable } from '../shared/DataTable';
import { Play, Download, FileText, Sparkles, Filter, Search, ChevronDown } from 'lucide-react';

export function MeetingsLibrary({ onMeetingSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      key: 'date',
      label: 'Date & Time',
      render: (m) => (
        <div>
          <div className="font-medium text-slate-800">{new Date(m.date).toLocaleDateString()}</div>
          <div className="text-xs text-slate-500">{new Date(m.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Meeting Type',
      render: (m) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
          {m.type}
        </span>
      )
    },
    { key: 'duration', label: 'Duration', className: 'text-slate-600 font-medium' },
    {
      key: 'recording',
      label: 'Recording',
      render: (m) => m.recording ? (
        <div className="flex gap-2">
          <button className="p-1.5 text-primary bg-indigo-50 hover:bg-indigo-100 rounded transition-colors" title="Play">
            <Play size={16} />
          </button>
          <button className="p-1.5 text-slate-500 bg-slate-50 hover:bg-slate-100 rounded transition-colors" title="Download">
            <Download size={16} />
          </button>
        </div>
      ) : <span className="text-sm text-slate-400">None</span>
    },
    {
      key: 'summary',
      label: 'AI Summary',
      render: (m) => (
        <div className="flex items-start gap-2 max-w-xs">
          <Sparkles size={16} className="text-purple-500 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 truncate" title={m.summary}>{m.summary}</p>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Meetings Archive</h2>
          <p className="text-slate-500">Access your past recordings, transcripts, and AI recaps.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-slate-50 outline-none"
            placeholder="Search transcripts, summaries, or attendees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-2">
            Bulk Actions <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={meetings} 
        onRowClick={(row) => onMeetingSelect && onMeetingSelect(row)}
      />
    </div>
  );
}
