import React, { useState, useEffect, useRef } from "react";
import Window from "../Window/Window";
import Clippy from "../Clippy/Clippy";
import "./Desktop.css";
import batIcon from "../../icons/BAT.png";
import briefcaseIcon from "../../icons/Briefcase.png";
import folderOpenedIcon from "../../icons/FolderOpened.png";
import activeContactIcon from "../../icons/ActiveContact.png";
import portfolioInfo from "../../content/general/leo";

const iconIds = ["about", "experience", "projects", "contact"];

function automaticIconPositions(width, height) {
  const mobile = width <= 768;
  const horizontal = width > height || height < 480;
  const columns =
    mobile && !horizontal
      ? 1
      : Math.min(4, Math.max(1, Math.floor((width - 24) / 90)));
  const gapX = columns === 1 ? 0 : Math.min(130, (width - 100) / (columns - 1));
  const rows = Math.ceil(iconIds.length / columns);
  const gapY = Math.min(
    130,
    Math.max(85, (height - 110) / Math.max(1, rows - 1)),
  );
  return Object.fromEntries(
    iconIds.map((id, index) => [
      id,
      {
        x: Math.max(
          0,
          Math.min((mobile ? 12 : 35) + (index % columns) * gapX, width - 80),
        ),
        y: Math.max(
          0,
          Math.min(20 + Math.floor(index / columns) * gapY, height - 110),
        ),
      },
    ]),
  );
}

function overlapsIcon(a, b) {
  const gap = 8;
  return (
    a.x < b.x + b.width + gap &&
    a.x + a.width + gap > b.x &&
    a.y < b.y + b.height + gap &&
    a.y + a.height + gap > b.y
  );
}

function arrangeWithoutOverlaps(container, current, moved) {
  const { width, height } = container.getBoundingClientRect();
  const defaults = automaticIconPositions(width, height);
  const placed = [];
  const result = {};
  // Respect deliberate placements first, then fit untouched icons around them.
  const order = [...iconIds].sort(
    (a, b) => Number(moved.has(b)) - Number(moved.has(a)),
  );
  for (const id of order) {
    const element = container.querySelector(`[data-icon-id="${id}"]`);
    const size = { width: element.offsetWidth, height: element.offsetHeight };
    const maxX = Math.max(0, width - size.width);
    const maxY = Math.max(0, height - size.height);
    const preferred = moved.has(id) ? current[id] : defaults[id];
    let candidate = {
      x: Math.max(0, Math.min(preferred.x, maxX)),
      y: Math.max(0, Math.min(preferred.y, maxY)),
      ...size,
    };
    if (placed.some((other) => overlapsIcon(candidate, other))) {
      let best = null;
      let distance = Infinity;
      const xs = [
        ...new Set([
          0,
          maxX,
          ...Array.from(
            { length: Math.floor(maxX / 12) + 1 },
            (_, n) => n * 12,
          ),
        ]),
      ];
      const ys = [
        ...new Set([
          0,
          maxY,
          ...Array.from(
            { length: Math.floor(maxY / 12) + 1 },
            (_, n) => n * 12,
          ),
        ]),
      ];
      for (const x of xs)
        for (const y of ys) {
          const option = { x, y, ...size };
          const score = (x - preferred.x) ** 2 + (y - preferred.y) ** 2;
          if (
            score < distance &&
            !placed.some((other) => overlapsIcon(option, other))
          ) {
            best = option;
            distance = score;
          }
        }
      if (best) candidate = best;
    }
    result[id] = { x: candidate.x, y: candidate.y };
    placed.push(candidate);
  }
  return result;
}

function Desktop() {
  const [openWindows, setOpenWindows] = useState(() =>
    window.innerWidth > 768 ? { about: true } : {},
  );
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [windowZIndices, setWindowZIndices] = useState({ about: 100 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [iconPositions, setIconPositions] = useState(() =>
    automaticIconPositions(window.innerWidth, window.innerHeight - 144),
  );
  const iconsRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(74);
  const movedIcons = useRef(new Set());
  useEffect(() => {
    const container = iconsRef.current;
    const arrange = () => {
      const banner = document.querySelector(".peel-stage > .peel-banner");
      if (banner)
        setScrollHeight(Math.ceil(banner.getBoundingClientRect().height) + 8);
      setIconPositions((current) =>
        arrangeWithoutOverlaps(container, current, movedIcons.current),
      );
    };
    const observer = new ResizeObserver(arrange);
    observer.observe(container);
    const banner = document.querySelector(".peel-stage > .peel-banner");
    if (banner) observer.observe(banner);
    return () => observer.disconnect();
  }, []);
  const iconDragRef = useRef(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  // TODO: Re-enable tooltip feature
  // const [showResizeHelper, setShowResizeHelper] = useState(false);
  // const [resizeHandlePosition, setResizeHandlePosition] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: true,
    }));
    setMinimizedWindows((prev) => ({
      ...prev,
      [windowId]: false,
    }));
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    setWindowZIndices((prev) => ({
      ...prev,
      [windowId]: newZIndex,
    }));
  };

  const focusWindow = (windowId) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    setWindowZIndices((prev) => ({
      ...prev,
      [windowId]: newZIndex,
    }));
  };

  const closeWindow = (windowId) => {
    setOpenWindows((prev) => {
      const newState = { ...prev };
      delete newState[windowId];
      return newState;
    });
    setWindowZIndices((prev) => {
      const newState = { ...prev };
      delete newState[windowId];
      return newState;
    });
  };

  const minimizeWindow = (windowId) => {
    setMinimizedWindows((prev) => ({
      ...prev,
      [windowId]: true,
    }));
  };

  const handleIconPointerDown = (event, iconId) => {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    iconDragRef.current = {
      id: event.pointerId,
      iconId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleIconPointerMove = (event) => {
    const drag = iconDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    if (
      !drag.moved &&
      Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 8
    )
      return;
    drag.moved = true;
    movedIcons.current.add(drag.iconId);
    const bounds = event.currentTarget.parentElement.getBoundingClientRect();
    const icon = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(
        event.clientX - bounds.left - drag.offsetX,
        bounds.width - icon.width,
      ),
    );
    const y = Math.max(
      0,
      Math.min(
        event.clientY - bounds.top - drag.offsetY,
        bounds.height - icon.height,
      ),
    );
    setIconPositions((previous) => {
      const candidate = { x, y, width: icon.width, height: icon.height };
      const collision = iconIds.some((id) => {
        if (id === drag.iconId) return false;
        const other = iconsRef.current.querySelector(`[data-icon-id="${id}"]`);
        return overlapsIcon(candidate, {
          ...previous[id],
          width: other.offsetWidth,
          height: other.offsetHeight,
        });
      });
      return collision ? previous : { ...previous, [drag.iconId]: { x, y } };
    });
  };

  const handleIconPointerUp = (event) => {
    const drag = iconDragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    iconDragRef.current = null;
    if (!drag.moved) openWindow(drag.iconId);
  };

  const cancelIconDrag = () => {
    iconDragRef.current = null;
  };

  const renderWindowContent = (type) => {
    switch (type) {
      case "about":
        return (
          <div className="window-text-content">
            <h2>LeoOS XP 1.0</h2>
            <div className="content-divider" />
            <p style={{ whiteSpace: "pre-wrap" }}>
              {portfolioInfo.about.content.join(" ")}
            </p>
            <div className="content-divider" />
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow("about")}
              >
                OK
              </button>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h1 className="pdf-header">Work Experience</h1>
              {portfolioInfo.experience.content.map((job) => (
                <div key={job.company} style={{ marginBottom: "16px" }}>
                  <h3 style={{ fontWeight: "bold", marginBottom: "8px" }}>
                    {job.company}
                  </h3>
                  <ul
                    style={{
                      listStyle: "disc",
                      paddingLeft: "20px",
                      marginTop: "4px",
                    }}
                  >
                    {job.details.map((detail) => (
                      <li key={detail} style={{ marginBottom: "4px" }}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow("experience")}
              >
                Close
              </button>
            </div>
          </div>
        );
      case "projects":
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h1 className="pdf-header">Projects</h1>
              <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                {portfolioInfo.projects.content.map((project) => (
                  <li key={project.name} style={{ marginBottom: "8px" }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#0000ff", textDecoration: "underline" }}
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow("projects")}
              >
                Close
              </button>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h1 className="pdf-header">Contact</h1>
              <p style={{ marginBottom: "12px" }}>Contact me via email:</p>
              <p style={{ marginBottom: "16px" }}>
                <a
                  href={`mailto:${portfolioInfo.contact.content.email}`}
                  style={{ color: "#0000ff", textDecoration: "underline" }}
                >
                  {portfolioInfo.contact.content.email}
                </a>
              </p>
              <p style={{ marginBottom: "8px" }}>LinkedIn:</p>
              <p style={{ marginBottom: "16px" }}>
                <a
                  href={portfolioInfo.contact.content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0000ff", textDecoration: "underline" }}
                >
                  {portfolioInfo.contact.content.linkedin}
                </a>
              </p>
              <p style={{ marginBottom: "8px" }}>GitHub:</p>
              <p style={{ marginBottom: "16px" }}>
                <a
                  href={portfolioInfo.contact.content.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0000ff", textDecoration: "underline" }}
                >
                  {portfolioInfo.contact.content.github}
                </a>
              </p>
              <p style={{ marginBottom: "8px" }}>Resume:</p>
              <p>
                <a
                  href={portfolioInfo.contact.content.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0000ff", textDecoration: "underline" }}
                >
                  View Resume
                </a>
              </p>
            </div>
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow("contact")}
              >
                Close
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const desktopIcons = [
    { id: "about", label: "ABOUTME.EXE", icon: batIcon },
    { id: "experience", label: "EXPERIENCE.XPS", icon: briefcaseIcon },
    { id: "projects", label: "PROJECTS.XPS", icon: folderOpenedIcon },
    { id: "contact", label: "CONTACT.XPS", icon: activeContactIcon },
  ];

  const getCenteredPosition = (windowId) => {
    const isMobile = window.innerWidth <= 768;
    const windowWidth = isMobile ? Math.min(900, window.innerWidth * 0.9) : 900;
    const windowHeight = 370;
    const taskbarHeight = isMobile ? 50 : 65;
    const availableHeight = window.innerHeight - taskbarHeight;
    const centerX = (window.innerWidth - windowWidth) / 2;
    let centerY = isMobile ? 50 : (availableHeight - windowHeight) / 2;

    // Move about and experience windows higher
    if (windowId === "about" || windowId === "experience") {
      const offset = isMobile ? 30 : 50; // Move up by 30px on mobile, 50px on desktop
      centerY = Math.max(0, centerY - offset);
    }

    const horizontalOffset = windowId === "about" ? (isMobile ? 12 : 60) : 0;
    return {
      x: Math.max(0, centerX - horizontalOffset),
      y: Math.max(0, centerY),
    };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".start-button") &&
        !e.target.closest(".start-menu")
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // TODO: Re-enable tooltip feature
  // Show resize helper tooltip once on first load
  // useEffect(() => {
  //   const hasSeenHelper = localStorage.getItem("hasSeenResizeHelper");
  //   if (!hasSeenHelper && openWindows.about && !minimizedWindows.about) {
  //     // Delay showing the helper so the window can render first
  //     const timer = setTimeout(() => {
  //       // Find the resize handle element
  //       const resizeHandle = document.querySelector('.window.window-about .window-resize-handle');
  //       if (resizeHandle) {
  //         const rect = resizeHandle.getBoundingClientRect();
  //         setResizeHandlePosition({
  //           x: rect.left + rect.width / 2,
  //           y: rect.top + rect.height / 2,
  //         });
  //         setShowResizeHelper(true);
  //       }
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  //   return undefined;
  // }, [openWindows.about, minimizedWindows.about]);

  // const dismissResizeHelper = () => {
  //   setShowResizeHelper(false);
  //   localStorage.setItem("hasSeenResizeHelper", "true");
  // };

  return (
    <div className="desktop">
      <Clippy onNavigate={openWindow} />
      <div className="desktop-background">
        <div
          className="desktop-icons"
          ref={iconsRef}
          style={{
            top: scrollHeight,
            height: `calc(100% - ${scrollHeight}px)`,
          }}
        >
          {desktopIcons.map((icon) => (
            <div
              key={icon.id}
              className="desktop-icon"
              data-icon-id={icon.id}
              role="button"
              tabIndex={0}
              style={{
                left: `${iconPositions[icon.id].x}px`,
                top: `${iconPositions[icon.id].y}px`,
              }}
              onPointerDown={(e) => handleIconPointerDown(e, icon.id)}
              onPointerMove={handleIconPointerMove}
              onPointerUp={handleIconPointerUp}
              onPointerCancel={cancelIconDrag}
              onLostPointerCapture={cancelIconDrag}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openWindow(icon.id);
                }
              }}
              onDoubleClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openWindow(icon.id);
              }}
            >
              <div className="desktop-icon-image">
                <img src={icon.icon} alt={icon.label} draggable={false} />
              </div>
              <div className="desktop-icon-label">{icon.label}</div>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(openWindows).map((windowId, index) => {
        const windowData = desktopIcons.find((icon) => icon.id === windowId);
        if (!windowData) return null;

        const basePosition = getCenteredPosition(windowId);
        const cascadeOffset = 30;
        const adjustedPosition = {
          x: basePosition.x + index * cascadeOffset,
          y: basePosition.y + index * cascadeOffset,
        };

        const windowTitle = windowData.label.replace(/\.\w+$/, "");

        return (
          <Window
            key={windowId}
            id={windowId}
            title={windowTitle}
            icon={windowData.icon}
            defaultPosition={adjustedPosition}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            minimized={minimizedWindows[windowId]}
            zIndex={windowZIndices[windowId] || 100}
            onFocus={focusWindow}
          >
            {renderWindowContent(windowId)}
          </Window>
        );
      })}

      {/* TODO: Re-enable tooltip feature */}
      {/* {showResizeHelper && resizeHandlePosition && openWindows.about && !minimizedWindows.about && (
        <div
          className="resize-helper-tooltip"
          style={{
            left: `${resizeHandlePosition.x}px`,
            top: `${resizeHandlePosition.y - 120}px`,
          }}
        >
          <div className="resize-helper-content">
            <div className="resize-helper-header">
              <span className="resize-helper-icon">💡</span>
              <span className="resize-helper-title">Tip</span>
              <button
                type="button"
                className="resize-helper-close"
                onClick={dismissResizeHelper}
                aria-label="Close tip"
              >
                ×
              </button>
            </div>
            <div className="resize-helper-body">
              Drag from the bottom-right corner to resize this window!
            </div>
          </div>
          <div className="resize-helper-arrow" />
        </div>
      )} */}

      <div className="taskbar">
        <div className="taskbar-start">
          <button
            type="button"
            className="start-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowStartMenu(!showStartMenu);
            }}
          >
            <span className="start-text">Start</span>
          </button>
          {showStartMenu && (
            <div
              className="start-menu"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="menu"
              tabIndex={0}
            >
              <div
                className="start-menu-item start-menu-item-disabled"
                role="menuitem"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="start-menu-icon">🖼️</span>
                <span className="start-menu-text">
                  Gallery
                  <span style={{ fontSize: "11px", opacity: 0.7 }}>
                    (Coming Soon)
                  </span>
                </span>
              </div>
              <div
                className="start-menu-item"
                role="menuitem"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line no-alert
                  if (
                    window.confirm(
                      "Are you sure you want to shutdown (refresh)?",
                    )
                  ) {
                    window.location.reload();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    // eslint-disable-next-line no-alert
                    if (
                      window.confirm(
                        "Are you sure you want to shutdown (refresh)?",
                      )
                    ) {
                      window.location.reload();
                    }
                  }
                }}
              >
                <span className="start-menu-icon">⏻</span>
                <span className="start-menu-text">Shutdown</span>
              </div>
            </div>
          )}
        </div>
        <div className="taskbar-tasks">
          {Object.keys(openWindows).map((windowId) => {
            const windowData = desktopIcons.find(
              (icon) => icon.id === windowId,
            );
            const isMinimized = minimizedWindows[windowId];
            return (
              <button
                key={windowId}
                type="button"
                className={`taskbar-task ${isMinimized ? "minimized" : ""}`}
                onClick={() => {
                  if (isMinimized) {
                    setMinimizedWindows((prev) => ({
                      ...prev,
                      [windowId]: false,
                    }));
                  } else {
                    focusWindow(windowId);
                  }
                }}
              >
                {windowData?.icon && (
                  <img
                    src={windowData.icon}
                    alt={windowData.label}
                    className="taskbar-icon"
                  />
                )}
                <span>{windowData?.label.replace(/\.\w+$/, "")}</span>
              </button>
            );
          })}
        </div>
        <div className="taskbar-tray">
          <div className="taskbar-clock">
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
