import React, { useState, useRef, useEffect } from "react";
import "./Window.css";

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
  const [size, setSize] = useState(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && id === "experience") {
      const mobileHeight = window.innerHeight * 0.91 - 50;
      return {
        width: 900,
        height: mobileHeight,
      };
    }
    // if (isMobile && id === "about") {
    //   const mobileHeight = window.innerHeight * 0.72 - 50;
    //   return {
    //     width: 900,
    //     height: mobileHeight,
    //   };
    // }

    return {
      width: 900,
      height: id === "experience" ? 850 : null,
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [hasUserDragged, setHasUserDragged] = useState(false);
  const windowRef = useRef(null);
  const titleBarRef = useRef(null);
  const resizeHandleRef = useRef(null);
  const hasMeasuredRef = useRef(false);

  // Measure actual window height and recalculate centered position after render
  useEffect(() => {
    if (!windowRef.current || hasMeasuredRef.current || hasUserDragged) return;

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
  }, [hasUserDragged, defaultPosition]);

  const handleMouseDown = (e) => {
    if (e.target.closest(".window-controls")) return;
    if (e.target.closest(".window-resize-handle")) return;
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
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, dragOffset]);

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) onClose(id);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) onMinimize(id);
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    if (!windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (process.env.NODE_ENV === "development") {
      console.log(
        "setting resizeStart",
        `\ncursor pointer x: ${clientX}`,
        `\ncursor pointer y: ${clientY}`,
        `\nwindow width: ${rect.width}`,
        `\nwindow height: ${rect.height}`,
      );
    }

    setIsResizing(true);
    setResizeStart({
      x: clientX,
      y: clientY,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    const handleResizeMove = (e) => {
      if (!isResizing || !windowRef.current) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - resizeStart.x;
      const deltaY = clientY - resizeStart.y;

      if (process.env.NODE_ENV === "development") {
        console.log(
          "handleResizeMove",
          `\ndeltaX: ${clientX}`,
          `\ndeltaY: ${clientY}`,
        );
      }

      const minWidth = 400;
      const minHeight = 300;

      const newWidth = Math.max(minWidth, resizeStart.width + deltaX);
      const newHeight = Math.max(minHeight, resizeStart.height + deltaY);

      const isMobile = window.innerWidth <= 768;
      const maxWidth = isMobile
        ? window.innerWidth
        : window.innerWidth - position.x;
      const taskbarHeight = isMobile ? 50 : 65;
      const maxHeight = window.innerHeight - position.y - taskbarHeight;

      setSize({
        width: Math.min(newWidth, maxWidth),
        height: Math.min(newHeight, maxHeight),
      });
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.addEventListener("touchmove", handleResizeMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleResizeEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("touchmove", handleResizeMove);
      document.removeEventListener("touchend", handleResizeEnd);
    };
  }, [isResizing, resizeStart, position]);

  if (minimized) return null;

  const windowStyle = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${size.width}px`,
    height: size.height ? `${size.height}px` : "auto",
  };

  const windowStyleWithZIndex = {
    ...windowStyle,
    zIndex: zIndex || 100,
  };

  return (
    <div
      ref={windowRef}
      className={`window ${isDragging ? "dragging" : ""} ${id === "about" ? "window-about" : ""} ${id === "contact" ? "window-contact" : ""} ${id === "experience" ? "window-experience" : ""}`}
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
          if (e.key === "Enter" || e.key === " ") {
            handleMouseDown(e);
          }
        }}
      >
        <div className="window-title">
          {icon && <img src={icon} alt={title} className="window-icon" />}
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
            className="window-control window-control-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <span>×</span>
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
      <div
        ref={resizeHandleRef}
        className="window-resize-handle"
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
        role="button"
        tabIndex={0}
        aria-label="Resize window"
      />
    </div>
  );
}

export default Window;
