import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  Users,
  Layers,
  CheckCircle2
} from 'lucide-react';

export function AdminAuthScreen({ onLogin, onSwitchToEmployeePortal, adminUsers = [] }) {
  const [email, setEmail] = useState('director.hr@talentsync.ai');
  const [password, setPassword] = useState('Admin@TalentSync2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter an authorized administrator email.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const matched = adminUsers.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (matched || email.includes('admin') || email.includes('director')) {
        onLogin(matched || adminUsers[0]);
      } else {
        setErrorMsg('Unauthorized credentials. Use director.hr@talentsync.ai or click a demo admin profile below.');
      }
    }, 400);
  };

  const handleQuickDemo = (user) => {
    setEmail(user.email);
    setPassword('Admin@TalentSync2026');
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(user);
    }, 300);
  };

  return (
    <div className="admin-auth-container">
      {/* Brand Hero */}
      <div className="admin-auth-hero">
        <div className="admin-logo-badge">
          <ShieldCheck size={36} />
        </div>
        <h1 className="admin-app-title">workForc IQ</h1>
        <div className="admin-portal-tag">
          <span className="admin-pill">Admin & Workforce Manager Portal</span>
          <span className="admin-badge">Enterprise Edition</span>
        </div>
        <p className="admin-subtitle">
          AI-driven workforce planning, intelligent team allocation, utilization analytics, and resource governance.
        </p>
      </div>

      {/* Login Card */}
      <div className="admin-auth-card">
        <div className="auth-card-header">
          <h2>Manager Sign In</h2>
          <p>Access organizational workforce overview & resource controls</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="admin-email">Corporate Administrator Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="director.hr@talentsync.ai"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="admin-pass">Password</label>
              <span className="admin-sec-badge">Role-Based Access Control</span>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Authenticating Administrator...</span>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Demo Profiles */}
        <div className="quick-demo-section">
          <div className="quick-demo-divider">
            <span>OR SELECT 1-CLICK DEMO MANAGER</span>
          </div>
          <div className="demo-persona-chips">
            {adminUsers.map((user) => (
              <button 
                key={user.id}
                type="button"
                className="persona-chip"
                onClick={() => handleQuickDemo(user)}
              >
                <img src={user.avatar} alt={user.name} className="chip-avatar" />
                <div className="chip-info">
                  <strong>{user.name}</strong>
                  <span>{user.role} • {user.department}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Portal Switcher Link to Test Synchronization */}
        {onSwitchToEmployeePortal && (
          <div className="portal-switch-prompt">
            <button 
              type="button" 
              className="switch-portal-link"
              onClick={onSwitchToEmployeePortal}
            >
              <span>Switch to Employee Portal (Test Shared Database Sync) →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
