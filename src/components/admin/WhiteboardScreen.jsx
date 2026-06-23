import React, { useState } from 'react';
import { Pen, Eraser, Square, Circle, Type, StickyNote, Download, Trash2, Palette, MousePointer2 } from 'lucide-react';
import { whiteboardStrokes } from '../../data/mockData';

export function WhiteboardScreen() {
  const [activeTool, setActiveTool] = useState('pen');

  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'square', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'sticky', icon: StickyNote, label: 'Sticky Note' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Whiteboard</h2>
          <p className="text-slate-500 text-sm">Collaborative drawing and brainstorming.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-red-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 shadow-sm">
            <Trash2 size={16} /> Clear Canvas
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex overflow-hidden relative">
        {/* Toolbar */}
        <div className="w-16 border-r border-slate-100 bg-slate-50 flex flex-col items-center py-4 gap-2 z-10 shrink-0">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                title={t.label}
                className={`p-3 rounded-xl transition-all ${activeTool === t.id ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
              >
                <Icon size={20} />
              </button>
            );
          })}
          <div className="w-8 h-px bg-slate-300 my-2"></div>
          <button className="p-3 rounded-xl text-slate-500 hover:bg-slate-200 transition-all group relative">
            <Palette size={20} />
            <div className="absolute left-full ml-2 top-0 bg-white border border-slate-200 p-2 rounded-xl shadow-xl hidden group-hover:flex gap-2 z-20">
              {['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#1E293B'].map(color => (
                <div key={color} className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform border border-slate-200" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </button>
        </div>

        {/* Canvas Area (Mock) */}
        <div className="flex-1 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] bg-slate-50 overflow-hidden cursor-crosshair">
          <svg className="w-full h-full pointer-events-none">
            {whiteboardStrokes.map((stroke, i) => {
              if (stroke.type === 'path') {
                return <path key={i} d={stroke.coordinates} stroke={stroke.color} strokeWidth={stroke.size} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
              }
              if (stroke.type === 'text') {
                const [xStr, yStr] = stroke.coordinates.split(', ');
                const x = parseInt(xStr.split(': ')[1]) + 100;
                const y = parseInt(yStr.split(': ')[1]) + 100;
                return <text key={i} x={x} y={y} fill={stroke.color} fontSize={stroke.size} fontFamily="Inter, sans-serif" fontWeight="bold">{stroke.content}</text>;
              }
              return null;
            })}
            
            {/* Mock drawing 1 */}
            <path d="M 150 150 Q 200 100 250 150 T 350 150" stroke="#4F46E5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 350 150 L 340 140 M 350 150 L 340 160" stroke="#4F46E5" strokeWidth="4" fill="none" strokeLinecap="round" />
            
            <rect x="100" y="200" width="120" height="80" rx="8" stroke="#10B981" strokeWidth="3" fill="#ECFDF5" />
            <text x="160" y="245" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="600">Client App</text>

            <rect x="300" y="200" width="120" height="80" rx="8" stroke="#F59E0B" strokeWidth="3" fill="#FFFBEB" />
            <text x="360" y="245" textAnchor="middle" fill="#B45309" fontSize="14" fontWeight="600">API Server</text>
          </svg>
          
          {/* Mock Sticky Note */}
          <div className="absolute top-[320px] left-[150px] w-48 h-48 bg-yellow-100 border border-yellow-200 shadow-md p-4 transform -rotate-2">
            <div className="text-sm font-medium text-slate-800 font-sans">
              Don't forget to optimize the video streaming codec!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
