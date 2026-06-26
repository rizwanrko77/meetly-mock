import React, { useRef, useState, useEffect } from 'react';
import { Pen, Highlighter, Eraser, Trash, MousePointer2 } from 'lucide-react';

export function AnnotationOverlay({ pageId = 'default' }) {
  const canvasRef = useRef(null);
  const savedCanvases = useRef({});
  const prevPageId = useRef(pageId);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('cursor'); // 'cursor', 'pen', 'highlighter', 'eraser'
  const [color, setColor] = useState('#ef4444'); // red default

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Resize canvas to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      
      // Restore canvas content if it exists on resize to prevent clearing
      if (savedCanvases.current[pageId]) {
        const ctx = canvas.getContext('2d');
        ctx.putImageData(savedCanvases.current[pageId], 0, 0);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []); // Only run on mount

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (prevPageId.current !== pageId) {
      // Save current state
      savedCanvases.current[prevPageId.current] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Restore new page state if it exists
      if (savedCanvases.current[pageId]) {
        ctx.putImageData(savedCanvases.current[pageId], 0, 0);
      }
      
      prevPageId.current = pageId;
    }
  }, [pageId]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const lastPos = useRef({ x: 0, y: 0 });

  const startDrawing = (e) => {
    if (tool === 'cursor') return;
    if (e.cancelable) e.preventDefault(); 
    
    const { x, y } = getCoordinates(e);
    lastPos.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || tool === 'cursor') return;
    if (e.cancelable) e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else {
      ctx.globalCompositeOperation = 'source-over';
      // 30% opacity for highlighter: hex 4D
      ctx.strokeStyle = tool === 'highlighter' ? `${color}4D` : color;
      ctx.lineWidth = tool === 'highlighter' ? 24 : 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
    
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    if (tool === 'cursor') return;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-40 ${tool !== 'cursor' ? 'cursor-crosshair touch-none' : 'pointer-events-none'}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      
      {/* Floating Toolbar (Side) */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 bg-slate-800 rounded-full shadow-2xl border border-slate-700 p-2 flex flex-col items-center gap-1 sm:gap-2 animate-fade-in">
        <button 
          onClick={() => setTool('cursor')}
          className={`p-2 sm:p-3 rounded-full transition-colors ${tool === 'cursor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          title="Cursor / Scroll"
        >
          <MousePointer2 size={20} />
        </button>
        <div className="h-px w-6 bg-slate-700 my-1"></div>
        <button 
          onClick={() => setTool('pen')}
          className={`p-2 sm:p-3 rounded-full transition-colors ${tool === 'pen' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          title="Pen"
        >
          <Pen size={20} />
        </button>
        <button 
          onClick={() => setTool('highlighter')}
          className={`p-2 sm:p-3 rounded-full transition-colors ${tool === 'highlighter' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          title="Highlighter"
        >
          <Highlighter size={20} />
        </button>
        <button 
          onClick={() => setTool('eraser')}
          className={`p-2 sm:p-3 rounded-full transition-colors ${tool === 'eraser' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
          title="Eraser"
        >
          <Eraser size={20} />
        </button>
        
        <div className="h-px w-6 bg-slate-700 my-1"></div>
        
        {/* Colors */}
        <div className="flex flex-col items-center gap-2 py-1 sm:py-2">
           {['#ef4444', '#3b82f6', '#10b981', '#f59e0b'].map(c => (
             <button 
               key={c}
               onClick={() => setColor(c)}
               className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-800' : 'hover:scale-110'}`}
               style={{ backgroundColor: c }}
               title="Color Picker"
             />
           ))}
        </div>

        <div className="h-px w-6 bg-slate-700 my-1"></div>
        
        <button 
          onClick={() => {
            clearCanvas();
            savedCanvases.current[pageId] = null;
          }}
          className="p-2 sm:p-3 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
          title="Clear All"
        >
          <Trash size={20} />
        </button>
      </div>
    </>
  );
}
