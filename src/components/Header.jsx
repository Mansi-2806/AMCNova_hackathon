import React from 'react';
import { 
  Cpu, 
  Bell, 
  UserCheck, 
  ShieldAlert, 
  LogOut,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  Shield,
  Database
} from 'lucide-react';

export function Header({
  activeRole,
  activeEmployee,
  setActiveEmployee,
  employees,
  unreadAlertCount,
  onOpenAlerts,
  onLogout,
  onSwitchRole,
  onOpenSupabaseModal,
  isUsingSupabase
}) {
  return (
    <div className="app-top-nav-zone">
      {/* Mobile Top Status Bar with Static Dynamic Island */}
      <div className="mobile-status-bar">
        <span className="status-time">9:41</span>
        <div className="mobile-dynamic-island">
          <div className="mobile-island-sensor" />
          <div className="mobile-island-camera" />
        </div>
        <div className="status-icons">
          <Signal size={12} strokeWidth={2.4} />
          <Wifi size={12} strokeWidth={2.4} />
          <div className="ios-battery">
            <div className="ios-battery-fill" />
          </div>
        </div>
      </div>

      <header className="app-header">
        <div className="header-top-row">
          {/* Brand & Active Portal Badge */}
          <div className="brand-badge">
            <div className="brand-logo-icon">
              <Cpu size={18} />
            </div>
            <div className="brand-title-wrap">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="brand-name">workForc IQ</span>
                <span className={`badge ${activeRole === 'admin' ? 'badge-teal' : 'badge-cyan'}`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                  {activeRole === 'admin' ? 'HR Manager' : 'Employee'}
                </span>
              </div>
              <span className="brand-tagline">
                {activeRole === 'admin' ? 'Strategic Talent Command' : `${activeEmployee?.name || 'Talent'} Workspace`}
              </span>
            </div>
          </div>

          {/* Header Controls: Switch Role, Supabase, Notifications, Logout */}
          <div className="header-actions">
            {/* Quick Switch to Employee Portal */}
            {activeRole === 'admin' && onSwitchRole && (
              <button 
                className="icon-btn" 
                onClick={() => onSwitchRole('employee')}
                title="Switch to Employee Portal (workForc IQ)"
                style={{ color: '#0f766e', borderColor: 'rgba(20, 184, 166, 0.4)' }}
              >
                <UserCheck size={15} />
              </button>
            )}

            {/* Supabase Status / Config Button */}
            <button 
              className="icon-btn" 
              onClick={onOpenSupabaseModal}
              title={isUsingSupabase ? "Supabase: Connected" : "Supabase: Local Mode (Click to configure)"}
              style={{ position: 'relative', color: isUsingSupabase ? '#38bdf8' : '#94a3b8' }}
            >
              <Database size={15} />
              <span 
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isUsingSupabase ? '#10b981' : '#f59e0b'
                }} 
              />
            </button>

            {/* Notifications */}
            {activeRole === 'admin' && (
              <button 
                className="icon-btn" 
                onClick={onOpenAlerts}
                title="Workforce Alerts & Notifications"
              >
                <Bell size={15} />
                {unreadAlertCount > 0 && (
                  <span className="badge-counter">{unreadAlertCount}</span>
                )}
              </button>
            )}

            {/* Logout to Portal Gateway */}
            <button 
              className="icon-btn" 
              style={{ color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
              onClick={onLogout}
              title="Log Out to Portal Login Gateway"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Employee Switcher Row when in Employee Role */}
        {activeRole === 'employee' && (
          <div className="employee-select-bar">
            <div className="emp-picker-label">
              <Sparkles size={13} />
              <span>Switch Perspective:</span>
            </div>
            <select 
              className="emp-dropdown"
              value={activeEmployee?.id}
              onChange={(e) => {
                const selected = employees.find(emp => emp.id === e.target.value);
                if (selected) setActiveEmployee(selected);
              }}
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.workload}% Load - {emp.role.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        )}
      </header>
    </div>
  );
}
