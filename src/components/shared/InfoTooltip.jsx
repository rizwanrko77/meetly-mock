import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

export function InfoTooltip({ content, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [styles, setStyles] = useState({});
  const containerRef = useRef(null);

  const calculatePosition = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const isNearRight = rect.right > window.innerWidth - 280;
    const isNearTop = rect.top < 100;
    
    let newStyles = {
      position: 'fixed',
      zIndex: 99999,
      width: 'max-content',
      maxWidth: '18rem',
    };

    if (isNearRight) {
      newStyles.right = window.innerWidth - rect.right;
    } else {
      newStyles.left = rect.left;
    }

    if (isNearTop) {
      newStyles.top = rect.bottom + 8;
    } else {
      newStyles.bottom = window.innerHeight - rect.top + 8;
    }

    setStyles(newStyles);
  };

  const handleEnter = () => {
    calculatePosition();
    setIsVisible(true);
  };

  useEffect(() => {
    if (!isVisible) return;
    const handleScroll = () => calculatePosition();
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => {
        if (!isVisible) calculatePosition();
        setIsVisible(!isVisible);
      }}
    >
      <button 
        type="button" 
        className="text-slate-400 hover:text-primary transition-colors focus:outline-none"
        aria-label="More information"
      >
        <Info size={16} />
      </button>

      {isVisible && createPortal(
        <div style={styles} className="p-3 text-sm text-left text-white bg-slate-800 rounded-lg shadow-2xl animate-fade-in pointer-events-none border border-slate-700">
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}
