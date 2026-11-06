import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./Window.css";

function getWindowArea() {
  const banner = document.querySelector(".peel-stage > .peel-banner");
  const top = (banner?.getBoundingClientRect().height || 74) + 8;
  const bottom = window.innerHeight - (window.innerWidth <= 768 ? 50 : 65) - 8;
  return { width: window.innerWidth, height: window.innerHeight, top, bottom };
}

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

  const [area, setArea] = useState(getWindowArea);
  const [measuredHeight, setMeasuredHeight] = useState(300);
  useLayoutEffect(() => {
    const updateBounds = () => setArea(getWindowArea());
    const observer = new ResizeObserver(() => {
      updateBounds();
      if (windowRef.current)
        setMeasuredHeight(windowRef.current.getBoundingClientRect().height);
    });
    const banner = document.querySelector(".peel-stage > .peel-banner");
    if (banner) observer.observe(banner);
    if (windowRef.current) observer.observe(windowRef.current);
    window.addEventListener("resize", updateBounds);
    updateBounds();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [minimized]);

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
    if (e.button !== undefined && e.button !== 0) return;
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
      const bounds = getWindowArea();
      const maxY = Math.max(bounds.top, bounds.bottom - rect.height);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      let newX = clientX - dragOffset.x;
      let newY = clientY - dragOffset.y;

      // Constrain to viewport
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(bounds.top, Math.min(newY, maxY));

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
      document.addEventListener("touchcancel", handleUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("touchcancel", handleUp);
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
      document.addEventListener("touchcancel", handleResizeEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.removeEventListener("touchmove", handleResizeMove);
      document.removeEventListener("touchend", handleResizeEnd);
      document.removeEventListener("touchcancel", handleResizeEnd);
    };
  }, [isResizing, resizeStart, position]);

  if (minimized) return null;

  const availableHeight = Math.max(80, area.bottom - area.top);
  const visibleWidth = Math.min(size.width, area.width * 0.9);
  const visibleHeight = Math.min(
    size.height || measuredHeight,
    availableHeight,
  );
  const safeY = Math.max(
    area.top,
    Math.min(position.y, area.bottom - visibleHeight),
  );
  const windowStyle = {
    position: "absolute",
    left: `${Math.max(0, Math.min(position.x, area.width - visibleWidth))}px`,
    top: `${safeY}px`,
    width: `${visibleWidth}px`,
    minWidth: 0,
    minHeight: Math.min(250, availableHeight),
    maxHeight: `${Math.max(80, area.bottom - safeY)}px`,
    height: size.height
      ? `${Math.min(size.height, availableHeight)}px`
      : "auto",
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
            e.preventDefault();
            if (onFocus) onFocus(id);
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
