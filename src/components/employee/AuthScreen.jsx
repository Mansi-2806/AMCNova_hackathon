import React, { useState } from 'react';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Layers, 
  HelpCircle,
  Smartphone
} from 'lucide-react';

export function AuthScreen({ onLogin, onOpenOnboarding, allEmployees = [] }) {
  const [identifier, setIdentifier] = useState('EMP-101');
  const [password, setPassword] = useState('TalentSync@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your Employee ID or Corporate Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your account password.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Find matching employee or default to EMP-101
      const normalized = identifier.trim().toLowerCase();
      const matched = allEmployees.find(emp => 
        emp.id.toLowerCase() === normalized || 
        emp.email.toLowerCase() === normalized
      );

      if (matched) {
        onLogin(matched.id, rememberMe);
      } else if (normalized.startsWith('emp-') || normalized.includes('@talentsync.ai')) {
        // Allow demonstration login for standard test format
        onLogin(allEmployees[0]?.id || 'EMP-101', rememberMe);
      } else {
        setErrorMsg('Invalid Employee ID or Password. For demo testing, use EMP-101 or click a quick-login profile below.');
      }
    }, 450);
  };

  const handleQuickSelect = (empId) => {
    setIdentifier(empId);
    setPassword('TalentSync@2026');
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(empId, rememberMe);
    }, 300);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotInput.trim()) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
      setForgotInput('');
    }, 2000);
  };

  return (
    <div className="android-auth-container">
      {/* Brand Hero Header */}
      <div className="android-auth-hero">
        <div className="auth-logo-badge">
          <Sparkles size={32} className="logo-sparkle" />
        </div>
        <h1 className="auth-app-title">workForc IQ</h1>
        <div className="auth-portal-tag">
          <span className="portal-pill">Employee Portal</span>
          <span className="portal-ver">Android Edition v2.4</span>
        </div>
        <p className="auth-subtitle">
          Intelligent workforce workspace for task management, workload monitoring, and AI recommendations.
        </p>
      </div>

      {/* Login Card */}
      <div className="android-auth-card">
        <div className="auth-card-header">
          <h2>Employee Sign In</h2>
          <p>Access your personalized workspace & projects</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Employee ID or Email */}
          <div className="form-group">
            <label htmlFor="auth-identifier">Employee ID or Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                id="auth-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="EMP-101 or name@talentsync.ai"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password with Eye Toggle */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="auth-password">Password</label>
              <button 
                type="button" 
                className="forgot-link-btn"
                onClick={() => setShowForgotModal(true)}
              >
                Forgot Password?
              </button>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="remember-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember this device</span>
            </label>
            <span className="security-tag">
              <ShieldCheck size={14} /> 256-bit Encrypted
            </span>
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="android-btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-label">Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Employee Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Feature Tour Shortcut */}
        <div className="auth-tour-trigger">
          <button 
            type="button" 
            className="tour-btn"
            onClick={onOpenOnboarding}
          >
            <HelpCircle size={15} />
            <span>New employee? Take the 1-minute Feature Tour</span>
          </button>
        </div>

        {/* Quick Demo Personas */}
        <div className="quick-demo-section">
          <div className="quick-demo-divider">
            <span>OR 1-CLICK DEMO AUTHENTICATION</span>
          </div>
          <p className="quick-demo-hint">Select a fictional employee persona to inspect personalized dashboard & records:</p>
          
          <div className="demo-persona-chips">
            <button 
              type="button"
              className="persona-chip active-chip"
              onClick={() => handleQuickSelect('EMP-101')}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" 
                alt="Rahul" 
                className="chip-avatar" 
              />
              <div className="chip-info">
                <strong>Rahul Sharma (EMP-101)</strong>
                <span>Sr. Cloud Architect • Overloaded 92%</span>
              </div>
            </button>

            <button 
              type="button"
              className="persona-chip"
              onClick={() => handleQuickSelect('EMP-102')}
            >
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" 
                alt="Priya" 
                className="chip-avatar" 
              />
              <div className="chip-info">
                <strong>Priya Patel (EMP-102)</strong>
                <span>DevOps Associate • Available 65%</span>
              </div>
            </button>

            <button 
              type="button"
              className="persona-chip"
              onClick={() => handleQuickSelect('EMP-104')}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" 
                alt="Marcus" 
                className="chip-avatar" 
              />
              <div className="chip-info">
                <strong>Marcus Chen (EMP-104)</strong>
                <span>Frontend Architect • 85% Load</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Reset Account Password</h3>
              <button 
                className="close-modal-btn"
                onClick={() => setShowForgotModal(false)}
              >
                ✕
              </button>
            </div>
            
            {forgotSuccess ? (
              <div className="modal-success-state">
                <CheckCircle2 size={42} className="success-icon" />
                <h4>Recovery Instructions Sent!</h4>
                <p>A secure password reset link has been dispatched to your corporate email.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="modal-body-form">
                <p className="modal-info-text">
                  Enter your registered employee email or ID to receive a secure password recovery token.
                </p>
                <div className="form-group">
                  <label>Employee ID or Email</label>
                  <input
                    type="text"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    placeholder="e.g. rahul.s@talentsync.ai"
                    required
                  />
                </div>
                <div className="modal-actions-row">
                  <button 
                    type="button" 
                    className="android-btn-secondary"
                    onClick={() => setShowForgotModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="android-btn-primary">
                    Send Recovery Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
