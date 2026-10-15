import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Clock, 
  AlertCircle, 
  Layers, 
  GraduationCap, 
  Megaphone, 
  FileText, 
  X,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function NotificationsDrawer({ 
  isOpen, 
  notifications = [], 
  employeeId = 'EMP-101', 
  onClose,
  onNavigateToItem
}) {
  const [filterType, setFilterType] = useState('all');
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    tasks: true,
    projects: true,
    requests: true,
    learning: true,
    announcements: true
  });

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifs = filterType === 'all'
    ? notifications
    : notifications.filter(n => n.type === filterType);

  const handleMarkAllRead = () => {
    talentSyncStore.markAllNotificationsAsRead(employeeId);
  };

  const handleItemClick = (notif) => {
    if (!notif.isRead) {
      talentSyncStore.markNotificationAsRead(notif.id);
    }
    if (notif.linkTarget) {
      onClose();
      onNavigateToItem(notif.linkTarget);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'task': return <AlertCircle size={18} className="text-amber" />;
      case 'project': return <Layers size={18} className="text-cyan" />;
      case 'request': return <FileText size={18} className="text-purple" />;
      case 'learning': return <GraduationCap size={18} className="text-teal" />;
      default: return <Megaphone size={18} className="text-blue" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="task-id-tag">In-App Activity</span>
            <span className="section-title-clean">Notifications ({unreadCount} Unread)</span>
          </div>
          <div className="header-actions-row">
            <button 
              type="button" 
              className="icon-header-btn"
              onClick={() => setShowPreferences(!showPreferences)}
              title="Notification Preferences"
            >
              <SlidersHorizontal size={17} />
            </button>
            <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* Optional Notification Preferences */}
        {showPreferences && (
          <div className="notif-prefs-panel">
            <h4 className="prefs-title">Notification Channels</h4>
            <div className="prefs-grid">
              {Object.keys(prefs).map((k) => (
                <label key={k} className="pref-item">
                  <input
                    type="checkbox"
                    checked={prefs[k]}
                    onChange={() => setPrefs(prev => ({ ...prev, [k]: !prev[k] }))}
                  />
                  <span>{k.charAt(0).toUpperCase() + k.slice(1)} Alerts</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="modal-subtabs">
          {['all', 'task', 'project', 'request', 'learning', 'announcement'].map((type) => (
            <button
              key={type}
              type="button"
              className={`subtab-btn ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="modal-scrollable-body">
          {/* Quick Mark All Read Action */}
          {unreadCount > 0 && (
            <div className="mark-all-bar">
              <span>{unreadCount} unread alerts</span>
              <button 
                type="button" 
                className="mark-all-read-btn"
                onClick={handleMarkAllRead}
              >
                <CheckCheck size={14} />
                <span>Mark All Read</span>
              </button>
            </div>
          )}

          {filteredNotifs.length === 0 ? (
            <div className="empty-sub-state">
              <Bell size={32} className="text-muted" />
              <p>No notifications under this filter.</p>
            </div>
          ) : (
            <div className="notifications-list">
              {filteredNotifs.map((notif) => (
                <div 
                  key={notif.id}
                  className={`notif-card ${notif.isRead ? 'read' : 'unread'}`}
                  onClick={() => handleItemClick(notif)}
                >
                  <div className="notif-icon-col">
                    {getNotifIcon(notif.type)}
                  </div>
                  <div className="notif-content-col">
                    <div className="notif-top-row">
                      <strong className="notif-title">{notif.title}</strong>
                      <span className="notif-time">{notif.timestamp}</span>
                    </div>
                    <p className="notif-message">{notif.message}</p>
                    <div className="notif-action-row">
                      <span className="notif-link-hint">
                        <span>Open details</span>
                        <ExternalLink size={12} />
                      </span>
                      {!notif.isRead && <span className="unread-dot-badge" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-sticky-footer">
          <button type="button" className="android-btn-primary btn-block" onClick={onClose}>
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
