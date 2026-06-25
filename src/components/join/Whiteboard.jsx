import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Eraser, Trash2, X } from 'lucide-react';

export function Whiteboard({ onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3b82f6'); // Default primary blue
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // Set up canvas context and handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Fit canvas to parent container
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Fill with white background initially
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Handle window resize to prevent stretching (this will clear the canvas, a more robust solution would save the image data)
    const handleResize = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.putImageData(imgData, 0, 0);
      // Re-apply context settings
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#ffffff' : color;
    ctx.lineWidth = isEraser ? 20 : lineWidth;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    '#000000', // Black
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#22c55e', // Green
    '#eab308'  // Yellow
  ];

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-lg border border-primary/50 bg-white">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="w-full h-full cursor-crosshair touch-none"
      />
      
      {/* Floating Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 z-10 animate-fade-in">
        
        {/* Tool selection */}
        <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-xl">
          <button 
            onClick={() => setIsEraser(false)} 
            className={`p-2 rounded-lg transition-colors ${!isEraser ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            title="Pen"
          >
            <PenTool size={20} />
          </button>
          <button 
            onClick={() => setIsEraser(true)} 
            className={`p-2 rounded-lg transition-colors ${isEraser ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
        </div>

        <div className="w-px h-8 bg-white/10"></div>

        {/* Colors */}
        <div className={`flex items-center gap-2 transition-opacity ${isEraser ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          {colors.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-110'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-px h-8 bg-white/10"></div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={clearCanvas} 
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Clear All"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2 border border-white/5"
            title="Close Whiteboard"
          >
            <X size={20} />
          </button>
        </div>
        
      </div>
    </div>
  );
}
