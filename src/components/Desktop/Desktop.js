import React, { useState, useEffect } from 'react';
import Window from '../Window/Window';
import './Desktop.css';

const portfolioData = {
  about: {
    title: 'About Me',
    content: [
      "Hi! My name is Leo and I'm a software engineer who's passionate about technology and building software.",
      'I have over 5 years of experience working with web technology.',
      'I am a full stack developer, but my expertise lies within building scalable automation services using cutting edge tools & cloud technologies.',
      'Outside of work, I enjoy working on cars, riding motorcycles, playing fps shooter games, snowboarding, and sightseeing.',
      'For my next role, I am looking to work with a small collaborative team in order to gain more hands on experience with cloud technologies such as AWS or Azure and with building infrastructure for large scale web applications.',
    ],
  },
  experience: {
    title: 'Work Experience',
    content: [
      {
        company: 'Walmart Global Tech - SDET - Nov 2023 – May 2025',
        details: [
          'Created and executed manual & automation tests, conducted periodic measurement analysis. Delivered, and communicated test results.',
          'Designed and implemented functional and end-to-end tests working at UI, API and database levels.',
          'Contributed to planning and estimation activities, including monitoring processes and reviewing QA deliverables and tasks.',
        ],
      },
      {
        company: 'Visa - Sr. Software Test Engineer - April 2022 – August 2023',
        details: [
          'Created & executed test plans, test designs & test cases covering feature integration, regression, and system level testing.',
          'Contributed to API & UI functional automation frameworks using industry wide tools and performed database testing on RDMBS & NoSQL based databases.',
          'Helped debug Linux/Unix/Container based application servers in Docker/Kubernetes.',
        ],
      },
      {
        company:
          'Extron Electronics - Automation Engineer - Nov 2020 – Nov 2021',
        details: [
          'Developed a software support dashboard used to execute 10,000 accessibility tests.',
          'Created & configured a HAPROXY load balancer for network distribution.',
          'Created & configured an Application Portal (layer 7) load balancer for Azure VMs.',
          'Created scripts to automate database migrations and deployment cleanups.',
          'Created multiple accessibility microservices with over 500 downloads on docker hub.',
          'Provided guidance to team members with strategies to help improve code optimization.',
        ],
      },
      {
        company:
          'Glidewell Dental Labs - QA Automation Engineer - Apr 2018 – Apr 2020',
        details: [
          'Designed and built an automation framework used to test both UIs and services.',
          'Set up CI/CD pipelines using Jenkins, Docker & AWS to automate the execution of test builds.',
          'Developed a software support tool used to run selenium tests and restart services.',
        ],
      },
      {
        company: 'Software Engineer - DiagnosisAI - Feb 2017 - Oct 2018',
        details: [
          'Contributed to the development effort of an automated doctor to patient service.',
          "Contributed to the development effort of the company's landing page.",
        ],
      },
      {
        company:
          'Sony Pictures Entertainment - Automation Analyst - Sep 2017 – Apr 2018',
        details: [
          'Contributed to the development effort of a Java/Python automation framework.',
          'Developed automation tests for web apps, REST APIs, thick clients, and other applications.',
          'Collaborated with offshore developers for requirements gathering & framework development.',
        ],
      },
    ],
  },
  projects: {
    title: 'My Projects',
    content: [
      {
        name: 'Auto Apply (Auto Apply to Jobs on LinkedIn)',
        link: 'https://github.com/yuxli066/HashiramaSenju',
      },
      { name: 'Del Rosa Massage', link: 'https://delrosamassage.co' },
      { name: "Mom's Recipe Book", link: 'https://asianmomrecipes.com/' },
      {
        name: 'Bunny Battler',
        link: 'https://github.com/yuxli066/DanzoShimura',
      },
      { name: 'Clueless', link: 'https://github.com/yuxli066/Clueless' },
      { name: 'Stoxbot', link: 'https://github.com/yuxli066/stoxbot' },
      { name: 'IdentifyAI', link: 'https://x.com/identifyai' },
      {
        name: 'Twitter Sentiment Analyzer',
        link: 'https://github.com/yuxli066/TwitterSentimentAnalyzer',
      },
      { name: 'RC Auto Car', link: 'https://github.com/yuxli066/RC-AUTO-Car' },
    ],
  },
  contact: {
    title: 'Contact Me',
    content: {
      email: 'leoli7405@gmail.com',
      linkedin: 'https://www.linkedin.com/in/li-leo/',
      github: 'https://github.com/yuxli066',
      resume:
        'https://drive.google.com/file/d/14yyn6ct_GIblKy87MSOG8N0wvak8SJpT/view?usp=sharing',
    },
  },
};

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
        experience: { x: 20, y: 200 },
        projects: { x: 20, y: 390 },
        contact: { x: 20, y: 550 },
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
  }, [draggingIcon, dragOffset, hasMoved, touchStartIcon, touchStartPos]);

  const renderWindowContent = (type) => {
    switch (type) {
      case 'about':
        return (
          <div className="window-text-content">
            <h2>Welcome to LeoOS 1.0</h2>
            <div className="content-divider" />
            <p>{portfolioData.about.content.join(' ')}</p>
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow('about')}
              >
                OK
              </button>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h2 className="pdf-header">Work Experience</h2>
              {portfolioData.experience.content.map((job) => (
                <div key={job.company} style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    {job.company}
                  </h3>
                  <ul
                    style={{
                      listStyle: 'disc',
                      paddingLeft: '20px',
                      marginTop: '4px',
                    }}
                  >
                    {job.details.map((detail) => (
                      <li key={detail} style={{ marginBottom: '4px' }}>
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
                onClick={() => closeWindow('experience')}
              >
                Close
              </button>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h2 className="pdf-header">Projects</h2>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                {portfolioData.projects.content.map((project) => (
                  <li key={project.name} style={{ marginBottom: '8px' }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#0000ff', textDecoration: 'underline' }}
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
                onClick={() => closeWindow('projects')}
              >
                Close
              </button>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="window-text-content window-pdf-viewer">
            <div className="pdf-content">
              <h2 className="pdf-header">Contact</h2>
              <p style={{ marginBottom: '12px' }}>Contact me via email:</p>
              <p style={{ marginBottom: '16px' }}>
                <a
                  href={`mailto:${portfolioData.contact.content.email}`}
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                >
                  {portfolioData.contact.content.email}
                </a>
              </p>
              <p style={{ marginBottom: '8px' }}>LinkedIn:</p>
              <p style={{ marginBottom: '16px' }}>
                <a
                  href={portfolioData.contact.content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                >
                  {portfolioData.contact.content.linkedin}
                </a>
              </p>
              <p style={{ marginBottom: '8px' }}>GitHub:</p>
              <p style={{ marginBottom: '16px' }}>
                <a
                  href={portfolioData.contact.content.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                >
                  {portfolioData.contact.content.github}
                </a>
              </p>
              <p style={{ marginBottom: '8px' }}>Resume:</p>
              <p>
                <a
                  href={portfolioData.contact.content.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000ff', textDecoration: 'underline' }}
                >
                  View Resume
                </a>
              </p>
            </div>
            <div className="dialog-ok-button-container">
              <button
                type="button"
                className="dialog-ok-button"
                onClick={() => closeWindow('contact')}
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
    { id: 'about', label: 'ABOUTME.EXE', icon: '📄' },
    { id: 'experience', label: 'EXPERIENCE.XPS', icon: '📄' },
    { id: 'projects', label: 'PROJECTS.XPS', icon: '📄' },
    { id: 'contact', label: 'CONTACT.XPS', icon: '📄' },
  ];

  const getCenteredPosition = () => {
    const isMobile = window.innerWidth <= 768;
    const windowWidth = isMobile ? Math.min(900, window.innerWidth * 0.9) : 900;
    const windowHeight = 370;
    const taskbarHeight = isMobile ? 50 : 65;
    const availableHeight = window.innerHeight - taskbarHeight;
    const centerX = (window.innerWidth - windowWidth) / 2;
    const centerY = isMobile ? 50 : (availableHeight - windowHeight) / 2;
    return { x: Math.max(0, centerX), y: Math.max(0, centerY) };
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.start-button')
        && !e.target.closest('.start-menu')
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
                if (e.key === 'Enter' || e.key === ' ') {
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
              <div className="desktop-icon-image">{icon.icon}</div>
              <div className="desktop-icon-label">{icon.label}</div>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(openWindows).map((windowId, index) => {
        const windowData = desktopIcons.find((icon) => icon.id === windowId);
        if (!windowData) return null;

        const basePosition = getCenteredPosition();
        const cascadeOffset = 30;
        const adjustedPosition = {
          x: basePosition.x + index * cascadeOffset,
          y: basePosition.y + index * cascadeOffset,
        };

        const windowTitle = windowData.label.replace(/\.\w+$/, '');

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
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>
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
                  window.location.reload();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    window.location.reload();
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
                className={`taskbar-task ${isMinimized ? 'minimized' : ''}`}
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
                {windowData?.icon}
                {' '}
                {windowData?.label.replace(/\.\w+$/, '')}
              </button>
            );
          })}
        </div>
        <div className="taskbar-tray">
          <div className="taskbar-clock">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Desktop;
