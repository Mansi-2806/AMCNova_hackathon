import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  History, 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Sliders, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  FileText,
  Key,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function AuditTrailModal({
  isOpen,
  onClose,
  activeAdmin,
  auditLog = [],
  onLogout
}) {
  const [subTab, setSubTab] = useState('audit'); // 'audit' | 'settings' | 'permissions'
  const [notificationMute, setNotificationMute] = useState(false);
  const [sessionTimeoutMins, setSessionTimeoutMins] = useState(30);

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-sheet">
        {/* HEADER */}
        <div className="admin-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <ShieldCheck size={20} className="text-blue-primary" />
            </div>
            <div>
              <h2 className="modal-title">Admin Governance & Settings</h2>
              <span className="modal-subtitle">Authoritative audit ledger, role controls & profile</span>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="admin-modal-body">
          {/* TAB BAR */}
          <div className="requests-filter-pills">
            <button 
              type="button" 
              className={`filter-pill ${subTab === 'audit' ? 'active' : ''}`}
              onClick={() => setSubTab('audit')}
            >
              <History size={13} className="inline mr-1" />
              Audit Trail ({auditLog.length})
            </button>
            <button 
              type="button" 
              className={`filter-pill ${subTab === 'settings' ? 'active' : ''}`}
              onClick={() => setSubTab('settings')}
            >
              <Settings size={13} className="inline mr-1" />
              Profile & Preferences
            </button>
            <button 
              type="button" 
              className={`filter-pill ${subTab === 'permissions' ? 'active' : ''}`}
              onClick={() => setSubTab('permissions')}
            >
              <Lock size={13} className="inline mr-1" />
              Role Permissions
            </button>
          </div>

          {/* TAB 1: AUDIT TRAIL */}
          {subTab === 'audit' && (
            <div className="audit-ledger-tab">
              <div className="audit-explainer-row">
                <span className="text-xs text-muted">
                  Immutable ledger capturing all staffing reallocations, approvals, threshold updates, and system decisions.
                </span>
              </div>

              <div className="audit-entries-stack">
                {auditLog.map(entry => (
                  <div key={entry.id} className="admin-card audit-item-card">
                    <div className="audit-top-row">
                      <div className="audit-action-group">
                        <span className="audit-action-name">{entry.action}</span>
                        <span className="audit-decision-pill">{entry.decision || 'Logged'}</span>
                      </div>
                      <span className="audit-time-tag">
                        <Clock size={11} className="inline mr-1" />
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </div>

                    <div className="audit-target-line">
                      <strong>Target: </strong>
                      <span className="text-blue-primary font-medium">{entry.target}</span>
                    </div>

                    <p className="audit-details-text">{entry.details}</p>

                    <div className="audit-actor-footer">
                      <span className="text-xs text-muted">Operator: </span>
                      <span className="text-xs font-semibold">{entry.performedBy || 'System/Admin'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & PREFERENCES */}
          {subTab === 'settings' && (
            <div className="admin-settings-tab">
              {/* Profile Card */}
              <div className="admin-card profile-settings-card">
                <div className="profile-hero-row">
                  <img 
                    src={activeAdmin?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'} 
                    alt={activeAdmin?.name}
                    className="profile-large-avatar" 
                  />
                  <div>
                    <h3 className="profile-name">{activeAdmin?.name || 'Sarah Connor'}</h3>
                    <span className="profile-role">{activeAdmin?.role || 'VP of Workforce Operations'}</span>
                    <span className="profile-email text-xs text-muted block mt-1">{activeAdmin?.email || 'admin@talentsync.ai'}</span>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="admin-card preferences-card">
                <h4 className="sec-title-sm">Operational Preferences</h4>

                <div className="pref-item-row">
                  <div>
                    <strong>Workforce Alert Push Notifications</strong>
                    <p className="text-xs text-muted">Deliver mobile alerts when team member exceeds 100% capacity.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={!notificationMute} 
                    onChange={() => setNotificationMute(!notificationMute)}
                    className="admin-checkbox"
                  />
                </div>

                <div className="pref-item-row">
                  <div>
                    <strong>Session Inactivity Timeout</strong>
                    <p className="text-xs text-muted">Auto-lock session after period of inactivity.</p>
                  </div>
                  <select 
                    className="admin-select-sm"
                    value={sessionTimeoutMins}
                    onChange={e => setSessionTimeoutMins(Number(e.target.value))}
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>
              </div>

              {/* Logout Action */}
              <div className="logout-box">
                <button 
                  type="button" 
                  className="admin-btn admin-btn-danger w-full"
                  onClick={onLogout}
                >
                  <LogOut size={16} />
                  <span>Log Out of Admin Portal</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ROLE PERMISSIONS */}
          {subTab === 'permissions' && (
            <div className="permissions-tab">
              <div className="admin-card permissions-matrix-card">
                <h4 className="sec-title-sm">Access Control Matrix (RBAC)</h4>
                <p className="text-xs text-muted mb-3">
                  Permissions are validated cryptographically against both UI interaction gates and repository operations.
                </p>

                <div className="matrix-list">
                  <div className="matrix-item">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <strong>Employee CRUD & Deactivation</strong>
                      <span className="text-xs text-muted block">Authorized (VP & Chief Resource Officer)</span>
                    </div>
                  </div>

                  <div className="matrix-item">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <strong>AI Team Staffing & Project Creation</strong>
                      <span className="text-xs text-muted block">Authorized</span>
                    </div>
                  </div>

                  <div className="matrix-item">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <strong>Workload Redistribution & Approval</strong>
                      <span className="text-xs text-muted block">Authorized</span>
                    </div>
                  </div>

                  <div className="matrix-item">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <strong>What-If Sandbox Live Commit</strong>
                      <span className="text-xs text-muted block">Authorized</span>
                    </div>
                  </div>

                  <div className="matrix-item">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <div>
                      <strong>Report CSV Generation & Audit Access</strong>
                      <span className="text-xs text-muted block">Full Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
