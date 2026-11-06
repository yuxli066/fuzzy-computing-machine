import React, { useState, useRef, useEffect } from "react";
import "./Clippy.css";
import portfolioInfo from "../../content/general/leo";

function Clippy({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);

  const characterRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClick = useRef(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const clampPosition = (x, y) => ({
    x: Math.max(0, Math.min(x, window.innerWidth - 124)),
    y: Math.max(0, Math.min(y, window.innerHeight - 93)),
  });

  useEffect(() => {
    const onResize = () => {
      setPosition((current) => current && clampPosition(current.x, current.y));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const startDrag = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    setIsPressed(true);
    const rect = characterRef.current.getBoundingClientRect();
    suppressClick.current = false;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 5) return;
    drag.moved = true;
    suppressClick.current = true;
    setIsDragging(true);
    setPosition(clampPosition(drag.left + dx, drag.top + dy));
  };

  const endDrag = () => {
    setIsPressed(false);
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <aside
      className={`clippy${isDragging ? " clippy-dragging" : ""}${position && position.y < 270 ? " clippy-bubble-below" : ""}`}
      aria-label="Clippy desktop helper"
      style={
        position
          ? {
              left: position.x,
              top: position.y,
              right: "auto",
              bottom: "auto",
              "--bubble-left": `${Math.max(-136, 8 - position.x)}px`,
            }
          : undefined
      }
    >
      {isOpen && (
        <div className="clippy-bubble" id="clippy-menu">
          <button
            type="button"
            className="clippy-close"
            aria-label="Dismiss Clippy's help"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          <strong>Hi! I’m Clippy. Click Me!</strong>
          <p>It looks like you’re getting to know Leo. Can I help?</p>
          <div className="clippy-links">
            <button
              type="button"
              onClick={() => {
                onNavigate("contact");
                setIsOpen(false);
              }}
            >
              Get in touch
            </button>
            <a
              href={portfolioInfo.contact.content.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Linkedin
            </a>
            <a
              href={portfolioInfo.contact.content.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leo's Resume
            </a>
          </div>
        </div>
      )}
      <button
        type="button"
        className={`clippy-character${isPressed ? " clippy-pressed" : ""}`}
        ref={characterRef}
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        aria-label={isOpen ? "Hide Clippy's help" : "Ask Clippy for help"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "clippy-menu" : undefined}
        onClick={(event) => {
          if (suppressClick.current && event.detail !== 0) {
            suppressClick.current = false;
            return;
          }
          setIsOpen(!isOpen);
        }}
      >
        <span className="clippy-sprite" aria-hidden="true" />
      </button>
    </aside>
  );
}

export default Clippy;
