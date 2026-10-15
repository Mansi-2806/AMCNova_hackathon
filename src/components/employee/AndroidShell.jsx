import React, { useState, useEffect } from 'react';
import { 
  Home, 
  CheckSquare, 
  Briefcase, 
  Bot, 
  User, 
  Bell, 
  Sparkles, 
  Wifi, 
  Signal, 
  BatteryMedium, 
  Maximize2, 
  Minimize2,
  CheckCircle2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export function AndroidShell({
  activeTab = 'home',
  onSelectTab,
  unreadNotifsCount = 0,
  pendingTasksCount = 0,
  activeProjectsCount = 0,
  onOpenNotifications,
  activeEmployee,
  allEmployees = [],
  onSwitchEmployee,
  children
}) {
  const [currentTime, setCurrentTime] = useState('9:41');
  const [isDeviceFrameMode, setIsDeviceFrameMode] = useState(true);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`android-app-wrapper ${isDeviceFrameMode ? 'mode-device-frame' : 'mode-full-viewport'}`}>
      {/* Frame Mode Floating Switcher (Desktop Inspection Tool) */}
      <div className="frame-mode-toggle-bar">
        <div className="brand-meta-tag">
          <Sparkles size={14} className="text-teal" />
          <span>TalentSync AI • Android Employee Portal</span>
        </div>

        <button 
          type="button" 
          className="frame-toggle-btn"
          onClick={() => setIsDeviceFrameMode(!isDeviceFrameMode)}
          title="Toggle Android Device Frame / Full Screen"
        >
          {isDeviceFrameMode ? (
            <>
              <Maximize2 size={13} />
              <span>Full Screen View</span>
            </>
          ) : (
            <>
              <Minimize2 size={13} />
              <span>Android Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Android Device Hardware Frame Shell */}
      <div className="android-hardware-frame">
        {/* Hardware side keys */}
        {isDeviceFrameMode && (
          <>
            <div className="android-hw-key key-power" />
            <div className="android-hw-key key-volume-up" />
            <div className="android-hw-key key-volume-down" />
          </>
        )}

        <div className="android-screen-surface">
          {/* ANDROID STATUS BAR */}
          <div className="android-status-bar">
            {/* Left: Clock */}
            <div className="status-clock">
              <span>{currentTime}</span>
            </div>

            {/* Center: Camera Punch Hole */}
            <div className="android-camera-punchhole">
              <div className="camera-lens-dot" />
            </div>

            {/* Right: Network, Wi-Fi, Battery */}
            <div className="status-indicators-group">
              <Signal size={13} strokeWidth={2.4} />
              <span className="status-5g-text">5G</span>
              <Wifi size={13} strokeWidth={2.4} />
              <div className="android-battery-badge">
                <div className="battery-level-fill" />
                <span className="battery-pct-label">100%</span>
              </div>
            </div>
          </div>

          {/* ANDROID TOP APP BAR */}
          <div className="android-top-app-bar">
            {/* Brand Logo & Title */}
            <div className="app-bar-brand-group">
              <div className="app-bar-logo-icon">
                <Sparkles size={16} />
              </div>
              <div className="app-bar-title-group">
                <span className="app-bar-brand-name">TalentSync AI</span>
                <span className="app-bar-tagline">Employee Portal</span>
              </div>
            </div>

            {/* Right Actions: Persona Switcher & Notification Bell */}
            <div className="app-bar-actions">
              {/* Persona Quick Switcher Pill */}
              <div className="persona-switcher-wrap">
                <button
                  type="button"
                  className="persona-switcher-pill"
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                >
                  <img 
                    src={activeEmployee?.avatar} 
                    alt={activeEmployee?.name} 
                    className="switcher-avatar" 
                  />
                  <span className="switcher-name">{activeEmployee?.name.split(' ')[0]}</span>
                </button>

                {showPersonaMenu && (
                  <div className="persona-dropdown-menu">
                    <span className="dropdown-title">Switch Demo Persona</span>
                    {allEmployees.map((emp) => (
                      <button
                        key={emp.id}
                        type="button"
                        className={`persona-menu-item ${emp.id === activeEmployee?.id ? 'active' : ''}`}
                        onClick={() => {
                          onSwitchEmployee(emp.id);
                          setShowPersonaMenu(false);
                        }}
                      >
                        <img src={emp.avatar} alt={emp.name} className="menu-avatar" />
                        <div className="menu-text-col">
                          <strong>{emp.name}</strong>
                          <span>{emp.role.split(' ')[0]} • {emp.workload}% load</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell with Badge */}
              <button 
                type="button" 
                className="top-bell-btn"
                onClick={onOpenNotifications}
                aria-label="Open notifications"
              >
                <Bell size={18} />
                {unreadNotifsCount > 0 && (
                  <span className="bell-badge-pill">{unreadNotifsCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* MAIN SCROLLABLE VIEWPORT */}
          <main className="android-viewport-content">
            {children}
          </main>

          {/* ANDROID MATERIAL 3 BOTTOM NAVIGATION BAR */}
          <nav className="android-bottom-nav">
            {/* 1. Home */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => onSelectTab('home')}
            >
              <div className="nav-icon-pill">
                <Home size={20} />
              </div>
              <span className="nav-tab-label">Home</span>
            </button>

            {/* 2. Tasks */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => onSelectTab('tasks')}
            >
              <div className="nav-icon-pill">
                <CheckSquare size={20} />
                {pendingTasksCount > 0 && (
                  <span className="nav-badge-pill">{pendingTasksCount}</span>
                )}
              </div>
              <span className="nav-tab-label">Tasks</span>
            </button>

            {/* 3. Projects */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => onSelectTab('projects')}
            >
              <div className="nav-icon-pill">
                <Briefcase size={20} />
                {activeProjectsCount > 0 && (
                  <span className="nav-badge-pill">{activeProjectsCount}</span>
                )}
              </div>
              <span className="nav-tab-label">Projects</span>
            </button>

            {/* 4. AI Copilot */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => onSelectTab('ai')}
            >
              <div className="nav-icon-pill">
                <Bot size={20} />
              </div>
              <span className="nav-tab-label">AI Copilot</span>
            </button>

            {/* 5. Profile */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => onSelectTab('profile')}
            >
              <div className="nav-icon-pill">
                <User size={20} />
              </div>
              <span className="nav-tab-label">Profile</span>
            </button>
          </nav>

          {/* ANDROID BOTTOM GESTURE NAVIGATION PILL */}
          <div className="android-gesture-pill-area">
            <div className="android-gesture-pill" />
          </div>
        </div>
      </div>
    </div>
  );
}
