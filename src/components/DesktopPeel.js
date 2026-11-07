import React, { useEffect, useRef, useState } from "react";
import Desktop from "./Desktop/Desktop";
import SimplePage from "../simplePage/SimplePage";
import "./DesktopPeel.css";

export default function DesktopPeel() {
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const drag = useRef(null);
  const progressRef = useRef(0);
  const layer = useRef(null);
  const animation = useRef(null);
  const [settling, setSettling] = useState(false);
  const simple = useRef(null);
  const returnButton = useRef(null);

  const update = (value) => {
    progressRef.current = value;
    setProgress(value);
  };

  useEffect(() => {
    if (revealed)
      simple.current?.querySelector("main")?.focus({ preventScroll: true });
  }, [revealed]);

  useEffect(() => () => cancelAnimationFrame(animation.current), []);

  const finish = (open) => {
    if (!open) setRevealed(false);
    drag.current = null;
    setDragging(false);
    cancelAnimationFrame(animation.current);
    const from = progressRef.current;
    const to = open ? 1 : 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      update(to);
      setRevealed(open);
      setSettling(false);
      if (!open)
        requestAnimationFrame(() =>
          returnButton.current?.focus({ preventScroll: true }),
        );
      return;
    }
    setSettling(true);
    const started = performance.now();
    const duration = Math.max(300, Math.abs(to - from) * 1100);
    const tick = (now) => {
      const time = Math.min(1, (now - started) / duration);
      // One drop and rebound, followed by a smooth roll to the destination.
      const stops = [
        [0, 0],
        [0.28, 0.36],
        [0.44, 0.25],
        [1, 1],
      ];
      let segment = 1;
      while (segment < stops.length - 1 && time > stops[segment][0])
        segment += 1;
      const [startTime, startValue] = stops[segment - 1];
      const [endTime, endValue] = stops[segment];
      const t = (time - startTime) / (endTime - startTime);
      const eased =
        startValue +
        ((endValue - startValue) * (1 - Math.cos(t * Math.PI))) / 2;
      update(from + (to - from) * eased);
      if (time < 1) animation.current = requestAnimationFrame(tick);
      else {
        setSettling(false);
        setRevealed(open);
        if (!open)
          requestAnimationFrame(() =>
            returnButton.current?.focus({ preventScroll: true }),
          );
      }
    };
    animation.current = requestAnimationFrame(tick);
  };

  const start = (event) => {
    if (!event.isPrimary || event.button !== 0 || settling) return;
    cancelAnimationFrame(animation.current);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const move = (event) => {
    const current = drag.current;
    if (!current || current.id !== event.pointerId) return;
    const dy = Math.max(0, event.clientY - current.y);
    if (Math.hypot(event.clientX - current.x, event.clientY - current.y) > 6)
      current.moved = true;
    update(Math.min(1, dy / (window.innerHeight * 0.65)));
  };

  const release = (event) => {
    if (drag.current?.id !== event.pointerId) return;
    finish(!drag.current.moved || progressRef.current > 0.22);
  };

  const startReturn = (event) => {
    if (!event.isPrimary || event.button !== 0 || settling) return;
    cancelAnimationFrame(animation.current);
    drag.current = {
      id: event.pointerId,
      y: event.clientY,
      moved: false,
      returning: true,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveReturn = (event) => {
    const current = drag.current;
    if (!current?.returning || current.id !== event.pointerId) return;
    const distance = Math.max(0, current.y - event.clientY);
    if (Math.abs(current.y - event.clientY) > 6) current.moved = true;
    update(1 - Math.min(1, distance / (window.innerHeight * 0.65)));
  };
  const releaseReturn = (event) => {
    const current = drag.current;
    if (!current?.returning || current.id !== event.pointerId) return;
    finish(current.moved && progressRef.current > 0.78);
  };
  const cancelReturn = () => {
    if (drag.current?.returning) finish(true);
  };

  const restore = () => {
    if (settling || dragging) return;
    setRevealed(false);
    finish(false);
    requestAnimationFrame(() =>
      returnButton.current?.focus({ preventScroll: true }),
    );
  };

  // The stationary sheet winds around a growing cylindrical paper edge.
  const rollY = progress * 1120;
  const rollRadius = 10 + Math.sqrt(progress) * 27;

  return (
    <div
      className={`peel-stage${dragging ? " is-peeling" : ""}${revealed && !dragging && !settling ? " is-revealed" : ""}${settling ? " is-opening" : ""}`}
    >
      <div
        ref={simple}
        className="peel-underneath"
        inert={revealed && !settling ? undefined : ""}
        aria-hidden={!revealed || settling}
      >
        <SimplePage
          onReturn={restore}
          transitioning={settling || dragging}
          returnScrollProps={{
            onPointerDown: startReturn,
            onPointerMove: moveReturn,
            onPointerUp: releaseReturn,
            onPointerCancel: cancelReturn,
            onLostPointerCapture: cancelReturn,
            disabled: settling,
            onClick: (event) => {
              if (event.detail === 0) restore();
            },
          }}
        />
      </div>
      <div
        ref={layer}
        className="peel-desktop"
        inert={revealed || settling || dragging ? "" : undefined}
        aria-hidden={revealed || settling || dragging}
        style={{
          clipPath: `inset(${progress * 112}% 0 0 0)`,
        }}
      >
        <Desktop />
      </div>
      {(!revealed || dragging || settling) && (
        <svg
          className="peel-curl"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ opacity: Math.min(1, progress * 30) }}
        >
          <defs>
            <linearGradient id="peel-paper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#968e7b" />
              <stop offset="18%" stopColor="#e1dac6" />
              <stop offset="42%" stopColor="#fffdf2" />
              <stop offset="60%" stopColor="#f5efdc" />
              <stop offset="84%" stopColor="#c8bfa5" />
              <stop offset="100%" stopColor="#817966" />
            </linearGradient>
            <filter
              id="peel-shadow"
              x="-30%"
              y="-50%"
              width="160%"
              height="250%"
            >
              <feDropShadow
                dx="0"
                dy="22"
                stdDeviation="18"
                floodColor="#17231c"
                floodOpacity="0.45"
              />
            </filter>
          </defs>
          <rect
            x="0"
            y={rollY - rollRadius}
            width="1000"
            height={rollRadius * 2}
            rx="10"
            fill="url(#peel-paper)"
            filter="url(#peel-shadow)"
          />
          <ellipse
            cx="8"
            cy={rollY}
            rx="8"
            ry={rollRadius}
            fill="#d1c7ad"
            stroke="#9f947a"
            strokeWidth="2"
          />
          <ellipse
            cx="8"
            cy={rollY}
            rx="4"
            ry={rollRadius * 0.62}
            fill="#f8f1de"
            stroke="#aa9d80"
          />
          <ellipse
            cx="992"
            cy={rollY}
            rx="8"
            ry={rollRadius}
            fill="#d1c7ad"
            stroke="#9f947a"
            strokeWidth="2"
          />
          <ellipse
            cx="992"
            cy={rollY}
            rx="4"
            ry={rollRadius * 0.62}
            fill="#f8f1de"
            stroke="#aa9d80"
          />
          <path
            d={`M 18 ${rollY - rollRadius * 0.25} H 982`}
            stroke="#fffdf2"
            opacity=".6"
            strokeWidth="2"
          />
        </svg>
      )}
      {!revealed && (
        <button
          ref={returnButton}
          type="button"
          className="peel-banner"
          style={{
            opacity: progress > 0.005 || settling ? 0 : 1,
            pointerEvents: progress > 0.005 && !dragging ? "none" : undefined,
          }}
          disabled={settling}
          aria-label="Open simple portfolio view"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={release}
          onPointerCancel={() => finish(false)}
          onLostPointerCapture={() => {
            if (drag.current) finish(false);
          }}
          onClick={(event) => {
            if (event.detail === 0) {
              finish(true);
            }
          }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 4v16m-6-6 6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="peel-banner-title">Simple view</span>
          <span className="peel-banner-hint">Pull down or click to open</span>

          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 4v16m-6-6 6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <span className="peel-status" role="status">
        {revealed ? "Simple portfolio opened" : ""}
      </span>
    </div>
  );
}
