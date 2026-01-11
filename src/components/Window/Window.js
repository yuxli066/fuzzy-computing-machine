import React, { useState, useRef, useEffect } from 'react';
import './Window.css';

function Window({
  id,
  title,
  children,
  icon,
  defaultPosition,
  onClose,
  onMinimize,
  minimized,
  zIndex,
  onFocus,
}) {
  const [position, setPosition] = useState(
    defaultPosition || { x: 100, y: 100 },
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [hasUserDragged, setHasUserDragged] = useState(false);
  const windowRef = useRef(null);
  const titleBarRef = useRef(null);
  const hasMeasuredRef = useRef(false);

  // Measure actual window height and recalculate centered position after render
  useEffect(() => {
    if (
      !windowRef.current
      || hasMeasuredRef.current
      || hasUserDragged
      || isMaximized
    ) return;

    // Wait for next frame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      if (!windowRef.current) return;

      const rect = windowRef.current.getBoundingClientRect();
      const actualHeight = rect.height;
      const isMobile = window.innerWidth <= 768;
      const taskbarHeight = isMobile ? 50 : 65;
      const availableHeight = window.innerHeight - taskbarHeight;

      // Recalculate centered position based on actual dimensions
      // Keep X position from defaultPosition (includes cascade offset), but recalculate Y
      const centerY = isMobile ? 50 : (availableHeight - actualHeight) / 2;

      // Only update if position hasn't been user-modified
      if (!hasUserDragged && defaultPosition) {
        setPosition({
          x: defaultPosition.x, // Keep cascade offset for X
          y: Math.max(0, centerY), // Recalculate Y based on actual height
        });
      }

      hasMeasuredRef.current = true;
    });
  }, [hasUserDragged, isMaximized, defaultPosition]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    if (onFocus) onFocus(id);

    setIsDragging(true);
    setHasUserDragged(true);
    const rect = windowRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging || !windowRef.current) return;

      if (!isMaximized) {
        const rect = windowRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth <= 768;
        const taskbarHeight = isMobile ? 50 : 65;
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - taskbarHeight - rect.height;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        let newX = clientX - dragOffset.x;
        let newY = clientY - dragOffset.y;

        // Constrain to viewport
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setPosition({
          x: newX,
          y: newY,
        });
      }
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMaximize = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) onClose(id);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) onMinimize(id);
  };

  if (minimized) return null;

  const windowStyle = isMaximized
    ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: '50px',
      width: '100%',
      height: 'calc(100% - 50px)',
    }
    : {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
    };

  const windowStyleWithZIndex = {
    ...windowStyle,
    zIndex: zIndex || 100,
  };

  return (
    <div
      ref={windowRef}
      className={`window ${isDragging ? 'dragging' : ''}`}
      style={windowStyleWithZIndex}
      role="dialog"
      tabIndex={-1}
    >
      <div
        ref={titleBarRef}
        className="window-titlebar"
        role="button"
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onClick={() => {
          if (onFocus) onFocus(id);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleMouseDown(e);
          }
        }}
      >
        <div className="window-title">
          {icon && <span className="window-icon">{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button
            type="button"
            className="window-control window-control-minimize"
            onClick={handleMinimize}
            aria-label="Minimize"
          >
            <span>—</span>
          </button>
          <button
            type="button"
            className="window-control window-control-maximize"
            onClick={handleMaximize}
            aria-label="Maximize"
          >
            <span>{isMaximized ? '❐' : '□'}</span>
          </button>
          <button
            type="button"
            className="window-control window-control-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <span>×</span>
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
}

export default Window;
