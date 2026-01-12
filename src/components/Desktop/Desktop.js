import React, { useState, useEffect } from "react";
import Window from "../Window/Window";
import "./Desktop.css";
import batIcon from "../../icons/BAT.png";
import briefcaseIcon from "../../icons/Briefcase.png";
import folderOpenedIcon from "../../icons/FolderOpened.png";
import activeContactIcon from "../../icons/ActiveContact.png";
import portfolioInfo from "../../content/general/leo";

function Desktop() {
  const [openWindows, setOpenWindows] = useState({ about: true });
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [windowZIndices, setWindowZIndices] = useState({ about: 100 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [iconPositions, setIconPositions] = useState(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      return {
        about: { x: 20, y: 40 },
        experience: { x: 20, y: 170 },
        projects: { x: 20, y: 300 },
        contact: { x: 20, y: 430 },
      };
    }
    return {
      about: { x: 50, y: 50 },
      experience: { x: 180, y: 50 },
      projects: { x: 310, y: 50 },
      contact: { x: 440, y: 50 },
    };
  });
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [touchStartIcon, setTouchStartIcon] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);
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

  const handleIconMouseDown = (e, iconId) => {
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setTouchStartPos({ x: clientX, y: clientY });
    setTouchStartIcon(iconId);
    setHasMoved(false);
    setDraggingIcon(iconId);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top,
    });
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingIcon) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (touchStartPos) {
        const deltaX = Math.abs(clientX - touchStartPos.x);
        const deltaY = Math.abs(clientY - touchStartPos.y);
        if (deltaX > 5 || deltaY > 5) {
          setHasMoved(true);
        }
      }

      setIconPositions((prev) => {
        const newPos = { ...prev };
        newPos[draggingIcon] = {
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y,
        };
        return newPos;
      });
    };

    const handleUp = () => {
      if (draggingIcon && !hasMoved && touchStartIcon) {
        openWindow(touchStartIcon);
      }
      setDraggingIcon(null);
      setTouchStartPos(null);
      setTouchStartIcon(null);
      setHasMoved(false);
    };

    if (draggingIcon) {
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
  }, [draggingIcon, dragOffset, hasMoved, touchStartIcon, touchStartPos]);

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

    return { x: Math.max(0, centerX), y: Math.max(0, centerY) };
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
      <div className="desktop-background">
        <div className="desktop-icons">
          {desktopIcons.map((icon) => (
            <div
              key={icon.id}
              className="desktop-icon"
              role="button"
              tabIndex={0}
              style={{
                left: `${iconPositions[icon.id].x}px`,
                top: `${iconPositions[icon.id].y}px`,
              }}
              onMouseDown={(e) => handleIconMouseDown(e, icon.id)}
              onTouchStart={(e) => handleIconMouseDown(e, icon.id)}
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
                <img src={icon.icon} alt={icon.label} />
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
