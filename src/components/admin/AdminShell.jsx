import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  BarChart3, 
  SlidersHorizontal,
  Bell, 
  ShieldCheck, 
  Signal, 
  Wifi, 
  Maximize2, 
  Minimize2,
  FolderKanban,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';

export function AdminShell({
  activeTab = 'dashboard',
  onSelectTab,
  activeAdmin,
  unreadAlertsCount = 0,
  onOpenAlerts,
  onOpenSettings,
  onOpenProjects,
  onOpenRequests,
  onLogout,
  children
}) {
  const [currentTime, setCurrentTime] = useState('9:41');
  const [isDeviceFrameMode, setIsDeviceFrameMode] = useState(true);

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
    <div className={`android-app-wrapper admin-theme-wrap ${isDeviceFrameMode ? 'mode-device-frame' : 'mode-full-viewport'}`}>
      {/* Desktop Mode Toggle */}
      <div className="frame-mode-toggle-bar admin-mode-bar">
        <div className="brand-meta-tag admin-meta-tag">
          <ShieldCheck size={14} className="text-blue-primary" />
          <span>workForc IQ • Admin / Workforce Manager Android App</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {onLogout && (
            <button 
              type="button" 
              className="frame-toggle-btn"
              onClick={onLogout}
              style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.4)' }}
              title="Log out of Manager Portal"
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          )}

          <button 
            type="button" 
            className="frame-toggle-btn"
            onClick={() => setIsDeviceFrameMode(!isDeviceFrameMode)}
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
      </div>

      {/* Android Hardware Frame */}
      <div className="android-hardware-frame admin-hardware-frame">
        {isDeviceFrameMode && (
          <>
            <div className="android-hw-key key-power" />
            <div className="android-hw-key key-volume-up" />
            <div className="android-hw-key key-volume-down" />
          </>
        )}

        <div className="android-screen-surface">
          {/* ANDROID STATUS BAR */}
          <div className="android-status-bar admin-status-bar">
            <div className="status-clock">
              <span>{currentTime}</span>
            </div>

            <div className="android-camera-punchhole">
              <div className="camera-lens-dot" />
            </div>

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
          <div className="android-top-app-bar admin-top-bar">
            <div className="app-bar-brand-group">
              <div className="app-bar-logo-icon admin-logo-icon">
                <ShieldCheck size={18} />
              </div>
              <div className="app-bar-title-group">
                <span className="app-bar-brand-name">workForc IQ</span>
                <span className="app-bar-tagline admin-tagline">Workforce Manager</span>
              </div>
            </div>

            <div className="app-bar-actions">
              {/* Projects Shortcut */}
              <button 
                type="button"
                className="top-bar-icon-btn"
                onClick={onOpenProjects}
                title="Projects Management"
              >
                <FolderKanban size={17} />
              </button>

              {/* Resource Requests Shortcut */}
              <button 
                type="button"
                className="top-bar-icon-btn"
                onClick={onOpenRequests}
                title="Employee Resource Requests"
              >
                <FileText size={17} />
              </button>

              {/* Alerts Bell */}
              <button 
                type="button" 
                className="top-bell-btn admin-bell-btn"
                onClick={onOpenAlerts}
                title="Workforce Alerts"
              >
                <Bell size={17} />
                {unreadAlertsCount > 0 && (
                  <span className="bell-badge-pill admin-badge-pill">{unreadAlertsCount}</span>
                )}
              </button>

              {/* Settings / Profile */}
              <button 
                type="button" 
                className="top-bar-avatar-btn"
                onClick={onOpenSettings}
                title="Admin Settings & Profile"
                style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, borderRadius: '50%', overflow: 'hidden', padding: 0, border: '2px solid #2563eb', flexShrink: 0, cursor: 'pointer' }}
              >
                <img 
                  src={activeAdmin?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'} 
                  alt={activeAdmin?.name} 
                  className="top-avatar"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                />
              </button>

              {/* Log Out Button */}
              {onLogout && (
                <button 
                  type="button" 
                  className="top-bar-icon-btn admin-logout-btn"
                  onClick={onLogout}
                  title="Log Out of Manager Portal"
                  style={{
                    color: '#f43f5e',
                    borderColor: 'rgba(244, 63, 94, 0.35)',
                    background: 'rgba(244, 63, 94, 0.1)',
                    marginLeft: '2px'
                  }}
                >
                  <LogOut size={16} />
                </button>
              )}
            </div>
          </div>

          {/* VIEWPORT CONTENT */}
          <main className="android-viewport-content admin-viewport-content">
            {children}
          </main>

          {/* 5-ITEM ANDROID BOTTOM NAVIGATION (Requirement 14) */}
          <nav className="android-bottom-nav admin-bottom-nav">
            {/* 1. Home — Workforce Overview */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => onSelectTab('dashboard')}
            >
              <div className="nav-icon-pill admin-icon-pill">
                <LayoutDashboard size={20} />
              </div>
              <span className="nav-tab-label">Home</span>
            </button>

            {/* 2. Workforce — Employee Directory */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'workforce' ? 'active' : ''}`}
              onClick={() => onSelectTab('workforce')}
            >
              <div className="nav-icon-pill admin-icon-pill">
                <Users size={20} />
              </div>
              <span className="nav-tab-label">Workforce</span>
            </button>

            {/* 3. Team Builder — AI Allocation */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'team-builder' ? 'active' : ''}`}
              onClick={() => onSelectTab('team-builder')}
            >
              <div className="nav-icon-pill admin-icon-pill">
                <Sparkles size={20} />
              </div>
              <span className="nav-tab-label">Team Builder</span>
            </button>

            {/* 4. Workload — Utilization and Conflicts */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'workload' ? 'active' : ''}`}
              onClick={() => onSelectTab('workload')}
            >
              <div className="nav-icon-pill admin-icon-pill">
                <BarChart3 size={20} />
              </div>
              <span className="nav-tab-label">Workload</span>
            </button>

            {/* 5. Planning — Scenarios & Analytics */}
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'planning' ? 'active' : ''}`}
              onClick={() => onSelectTab('planning')}
            >
              <div className="nav-icon-pill admin-icon-pill">
                <SlidersHorizontal size={20} />
              </div>
              <span className="nav-tab-label">Planning</span>
            </button>
          </nav>

          {/* ANDROID GESTURE PILL */}
          <div className="android-gesture-pill-area">
            <div className="android-gesture-pill" />
          </div>
        </div>
      </div>
    </div>
  );
}
