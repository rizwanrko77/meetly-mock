import React, { useState, useEffect, useRef } from 'react';
import { Pen, Eraser, Square, Circle, Type, StickyNote, Download, Trash2, Palette, MousePointer2, Plus, MoreVertical, ChevronLeft, Maximize, Minimize } from 'lucide-react';
import { whiteboards } from '../../data/mockData';

export function WhiteboardScreen() {
  const [activeWhiteboard, setActiveWhiteboard] = useState(null);
  const [boards, setBoards] = useState(whiteboards);

  useEffect(() => {
    setBoards(whiteboards);
  }, []);

  if (activeWhiteboard) {
    return <CanvasView whiteboard={activeWhiteboard} onBack={() => setActiveWhiteboard(null)} />;
  }

  return <ListView boards={boards} setBoards={setBoards} onSelect={setActiveWhiteboard} />;
}

function ListView({ boards, setBoards, onSelect }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleCreate = () => {
    const title = window.prompt("Enter new whiteboard title:", "Untitled Whiteboard");
    if (title) {
      const newBoard = {
        id: `wb-${Date.now()}`,
        title: title,
        lastModified: 'Just now',
        thumbnailColor: ['bg-indigo-100', 'bg-emerald-100', 'bg-amber-100', 'bg-rose-100', 'bg-blue-100'][Math.floor(Math.random() * 5)]
      };
      setBoards([newBoard, ...boards]);
      onSelect(newBoard);
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setActiveMenu(null);
    if (window.confirm("Are you sure you want to delete this whiteboard?")) {
      setBoards(boards.filter(b => b.id !== id));
    }
  };

  const handleExport = (e) => {
    e.stopPropagation();
    setActiveMenu(null);
    window.alert("Exporting whiteboard as PDF/PNG (Mock)");
  };
  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Whiteboards</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and access your collaborative canvases.</p>
        </div>
        <button onClick={handleCreate} className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={18} /> New Whiteboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {boards.map((wb) => (
          <div key={wb.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group cursor-pointer" onClick={() => onSelect(wb)}>
            <div className={`h-32 ${wb.thumbnailColor} relative`}>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-1.5 bg-white/80 hover:bg-white rounded text-slate-700 shadow-sm relative" 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setActiveMenu(activeMenu === wb.id ? null : wb.id); 
                  }}
                >
                  <MoreVertical size={16} />
                </button>
                {activeMenu === wb.id && (
                  <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-20">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveMenu(null); window.alert("Invite collaborators to " + wb.title); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      Collaborate
                    </button>
                    <button 
                      onClick={(e) => handleExport(e)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Export
                    </button>
                    <button 
                      onClick={(e) => handleDelete(e, wb.id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 truncate">{wb.title}</h3>
              <div className="flex justify-between items-end mt-1">
                <p className="text-xs text-slate-500">Modified {wb.lastModified}</p>
                {wb.collaborators && (
                  <div className="flex -space-x-2">
                    {wb.collaborators.map(c => (
                      <img 
                        key={c.id} 
                        src={c.avatar} 
                        alt={c.name}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm object-cover" 
                        title={c.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CanvasView({ whiteboard, onBack }) {
  const [activeTool, setActiveTool] = useState('pen');
  const [activeColor, setActiveColor] = useState('#4F46E5');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [strokes, setStrokes] = useState(whiteboard.initialStrokes || []);
  const [currentStroke, setCurrentStroke] = useState(null);
  
  const svgRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const getCoordinates = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const handlePointerDown = (e) => {
    if (activeTool !== 'pen') return;
    const { x, y } = getCoordinates(e);
    setCurrentStroke({ color: activeColor, points: [{ x, y }] });
  };

  const handlePointerMove = (e) => {
    if (activeTool !== 'pen' || !currentStroke) return;
    const { x, y } = getCoordinates(e);
    setCurrentStroke(prev => ({
      ...prev,
      points: [...prev.points, { x, y }]
    }));
  };

  const handlePointerUp = () => {
    if (currentStroke) {
      setStrokes(prev => [...prev, currentStroke]);
      setCurrentStroke(null);
    }
  };

  const renderPath = (stroke) => {
    if (stroke.points.length === 0) return '';
    const d = stroke.points.reduce((acc, point, index) => {
      return acc + (index === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`);
    }, '');
    return d;
  };

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
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-slate-50 flex flex-col" : "p-6 max-w-6xl mx-auto h-[calc(100vh-4rem)] flex flex-col animate-fade-in"}>
      <div className={`flex justify-between items-center ${isFullscreen ? 'p-4 border-b border-slate-200 bg-white' : 'mb-4'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{whiteboard.title}</h2>
            <p className="text-slate-500 text-xs">Unsaved changes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)} 
            className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />} 
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Export
          </button>
          <button 
            onClick={() => setStrokes([])}
            className="px-3 py-1.5 text-sm font-medium text-red-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Trash2 size={16} /> Clear Canvas
          </button>
        </div>
      </div>

      <div className={`flex-1 bg-white border border-slate-200 shadow-sm flex overflow-hidden relative ${isFullscreen ? '' : 'rounded-2xl'}`}>
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
            <Palette size={20} style={{ color: activeColor }} />
            <div className="absolute left-full ml-2 top-0 bg-white border border-slate-200 p-2 rounded-xl shadow-xl hidden group-hover:flex gap-2 z-20">
              {['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#1E293B'].map(color => (
                <div 
                  key={color} 
                  onClick={() => setActiveColor(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform border ${activeColor === color ? 'border-slate-800 ring-2 ring-slate-200' : 'border-slate-200'}`} 
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </button>
        </div>

        {/* Canvas Area */}
        <div 
          className="flex-1 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] bg-slate-50 overflow-hidden cursor-crosshair touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <svg ref={svgRef} className="w-full h-full pointer-events-none">
            {strokes.map((stroke, i) => (
              <g key={i}>
                <path 
                  d={renderPath(stroke)} 
                  stroke={stroke.color} 
                  strokeWidth={4} 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                {stroke.author && stroke.points && stroke.points.length > 0 && (
                  <text 
                    x={stroke.points[stroke.points.length - 1].x + 10} 
                    y={stroke.points[stroke.points.length - 1].y + 10} 
                    fill={stroke.color} 
                    fontSize={12} 
                    fontFamily="Inter, sans-serif" 
                    fontWeight="600"
                  >
                    {stroke.author}
                  </text>
                )}
              </g>
            ))}
            {currentStroke && (
              <path 
                d={renderPath(currentStroke)} 
                stroke={currentStroke.color} 
                strokeWidth={4} 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
