import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Eye, 
  EyeOff, 
  Sparkles, 
  Building, 
  Briefcase, 
  ChevronLeft
} from 'lucide-react';

export function LoginPage({ employees = [], onLogin, onRegisterEmployee }) {
  // Navigation within auth flow: 'login' | 'signup' | 'forgot-password'
  const [authMode, setAuthMode] = useState('login');

  // Login Form States (NO role selector on login page)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Sign Up Form States (Role selector ONLY here)
  const [regRole, setRegRole] = useState('employee'); // 'admin' | 'employee'
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDepartment, setRegDepartment] = useState('Engineering & Cloud');
  const [regJobRole, setRegJobRole] = useState('Cloud Systems Engineer');
  const [regOrganization, setRegOrganization] = useState('WorkforceIQ Global');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [signupSuccessMsg, setSignupSuccessMsg] = useState('');
  const [signupError, setSignupError] = useState('');

  // Forgot Password States
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSentSuccess, setResetSentSuccess] = useState(false);

  // In-memory registered users store for session
  const [registeredUsers, setRegisteredUsers] = useState([
    {
      email: 'manager@workforceiq.com',
      password: 'manager123',
      role: 'admin',
      name: 'Sarah Connor',
      title: 'VP of Workforce Planning'
    },
    {
      email: 'employee@workforceiq.com',
      password: 'employee123',
      role: 'employee',
      name: 'Rahul Sharma',
      title: 'Senior Cloud Engineer',
      employeeId: 'EMP-101'
    }
  ]);

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const trimmedEmail = loginEmail.trim().toLowerCase();

      // 1. Check registered users list (e.g. users registered through the Sign Up page)
      const foundUser = registeredUsers.find(
        u => u.email.toLowerCase() === trimmedEmail && u.password === loginPassword
      );

      // 2. Check if email matches an employee from the workspace dataset
      const matchedEmployee = employees.find(
        emp => emp.email && emp.email.toLowerCase() === trimmedEmail
      );

      if (foundUser) {
        if (foundUser.role === 'admin') {
          onLogin({
            role: 'admin',
            name: foundUser.name || 'Sarah Connor',
            title: foundUser.title || 'VP of Workforce Planning',
            email: foundUser.email
          });
        } else {
          const emp = matchedEmployee || employees.find(e => e.id === foundUser.employeeId) || employees[0];
          onLogin({
            role: 'employee',
            employee: emp,
            name: foundUser.name || emp.name,
            email: foundUser.email
          });
        }
      } else if (trimmedEmail === 'manager@workforceiq.com' && loginPassword === 'manager123') {
        onLogin({
          role: 'admin',
          name: 'Sarah Connor',
          title: 'VP of Workforce Planning',
          email: 'manager@workforceiq.com'
        });
      } else if (trimmedEmail === 'employee@workforceiq.com' && loginPassword === 'employee123') {
        const emp = employees[0] || { id: 'EMP-101', name: 'Rahul Sharma', role: 'Senior Cloud Engineer', workload: 94 };
        onLogin({
          role: 'employee',
          employee: emp,
          name: emp.name,
          email: 'employee@workforceiq.com'
        });
      } else if (matchedEmployee && loginPassword.length >= 4) {
        onLogin({
          role: 'employee',
          employee: matchedEmployee,
          name: matchedEmployee.name,
          email: matchedEmployee.email
        });
      } else if (trimmedEmail.includes('admin') || trimmedEmail.includes('manager')) {
        // Fallback for manager role
        onLogin({
          role: 'admin',
          name: 'Sarah Connor',
          title: 'VP of Workforce Planning',
          email: loginEmail
        });
      } else if (trimmedEmail.includes('employee') || trimmedEmail.includes('user')) {
        // Fallback for employee role
        const emp = employees[0] || { id: 'EMP-101', name: 'Rahul Sharma', role: 'Senior Cloud Engineer', workload: 94 };
        onLogin({
          role: 'employee',
          employee: emp,
          name: emp.name,
          email: loginEmail
        });
      } else {
        setAuthError('Invalid credentials. Please use demo credentials below or sign up.');
      }
    }, 450);
  };

  // Handle Sign Up Submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setSignupError('');

    if (regPassword !== regConfirmPassword) {
      setSignupError('Passwords do not match. Please re-enter.');
      return;
    }

    if (regPassword.length < 4) {
      setSignupError('Password must be at least 4 characters long.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newUser = {
        email: regEmail.trim(),
        password: regPassword,
        role: regRole, // Role is explicitly configured here during registration
        name: regFullName.trim(),
        title: regRole === 'admin' ? (regOrganization || 'HR Operations') : regJobRole,
        department: regDepartment,
        organization: regOrganization,
        employeeId: regRole === 'employee' ? `EMP-${100 + employees.length + registeredUsers.length + 1}` : undefined
      };

      setRegisteredUsers(prev => [...prev, newUser]);

      // If registered as employee, optionally append to workspace employees list
      if (regRole === 'employee' && onRegisterEmployee) {
        onRegisterEmployee({
          id: newUser.employeeId,
          name: newUser.name,
          role: regJobRole || 'Software Engineer',
          department: regDepartment,
          email: newUser.email,
          avatar: `https://images.unsplash.com/photo-${1534528741775 + registeredUsers.length}?auto=format&fit=crop&w=250&q=80`,
          workload: 60,
          status: 'Optimal',
          skills: ['Cloud Architecture', 'Agile Operations'],
          currentProject: 'WorkforceIQ NextGen'
        });
      }

      // Pre-populate login form with newly created account
      setLoginEmail(newUser.email);
      setLoginPassword(newUser.password);
      setSignupSuccessMsg(`Account created for ${newUser.name}! Please log in.`);

      // Switch back to login page
      setAuthMode('login');
    }, 500);
  };

  // Handle Forgot Password Submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setResetSentSuccess(true);
    }, 600);
  };

  return (
    <div className="auth-glass-container">
      {/* Ambient background glowing orbs */}
      <div className="auth-ambient-orb orb-1" />
      <div className="auth-ambient-orb orb-2" />
      <div className="auth-ambient-orb orb-3" />

      {/* Glassmorphic Central Card */}
      <div className="auth-glass-card">
        
        {/* ============================================================
            MODE 1: LOGIN PORTAL (Mail & Password Only, NO Roles)
            ============================================================ */}
        {authMode === 'login' && (
          <div className="auth-form-body">
            {/* Header Brand */}
            <div className="auth-header">
              <div className="auth-logo-badge">
                <Cpu size={26} strokeWidth={2.4} />
              </div>
              <h2 className="auth-brand-name">WorkforceIQ</h2>
              <h3 className="auth-heading">Welcome Back</h3>
              <p className="auth-subtitle">
                Sign in to your workforce intelligence portal
              </p>
            </div>

            {/* Success alert from Sign Up transition */}
            {signupSuccessMsg && (
              <div className="auth-alert success animate-fade-in">
                <CheckCircle2 size={16} />
                <span>{signupSuccessMsg}</span>
              </div>
            )}

            {/* Error Banner */}
            {authError && (
              <div className="auth-alert error animate-shake">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Credentials Form */}
            <form onSubmit={handleLoginSubmit} className="auth-form">
              {/* Email / Username Field */}
              <div className="auth-input-group">
                <label className="auth-field-label">Email / Username</label>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Password Field with Visibility Toggle */}
              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label className="auth-field-label">Password</label>
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setAuthMode('forgot-password');
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="auth-checkbox-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="auth-checkbox"
                  />
                  <span>Remember Me</span>
                </label>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                className="btn-auth-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="auth-btn-loading">
                    <span className="auth-mini-spinner" />
                    Authenticating Session...
                  </span>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Redirect Link */}
            <div className="auth-footer-prompt">
              <span>Don't have an account?</span>{' '}
              <button
                type="button"
                className="auth-action-link"
                onClick={() => {
                  setSignupError('');
                  setAuthMode('signup');
                }}
              >
                Sign Up
              </button>
            </div>

            {/* Demo 1-Click Credentials Pill Row */}
            <div className="demo-credentials-helper">
              <div className="demo-helper-header">
                <Sparkles size={12} className="demo-helper-icon" />
                <span>Demo 1-Click Credentials</span>
              </div>
              <div className="demo-pill-row">
                <button
                  type="button"
                  className="demo-pill-btn"
                  onClick={() => {
                    setLoginEmail('manager@workforceiq.com');
                    setLoginPassword('manager123');
                    setAuthError('');
                  }}
                >
                  <ShieldCheck size={14} />
                  <span>Manager Demo</span>
                </button>
                <button
                  type="button"
                  className="demo-pill-btn"
                  onClick={() => {
                    setLoginEmail('employee@workforceiq.com');
                    setLoginPassword('employee123');
                    setAuthError('');
                  }}
                >
                  <UserCheck size={14} />
                  <span>Employee Demo</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            MODE 2: SIGN UP FLOW (Role Selector is ONLY here)
            ============================================================ */}
        {authMode === 'signup' && (
          <div className="auth-form-body animate-fade-in">
            <button
              type="button"
              className="auth-back-btn"
              onClick={() => setAuthMode('login')}
            >
              <ChevronLeft size={16} />
              <span>Back to Login</span>
            </button>

            <div className="auth-header" style={{ marginBottom: '14px' }}>
              <div className="auth-logo-badge small">
                <Cpu size={20} strokeWidth={2.4} />
              </div>
              <h2 className="auth-heading">Create your WorkforceIQ account</h2>
              <p className="auth-subtitle">
                Select your role and enter your details to join the portal
              </p>
            </div>

            {signupError && (
              <div className="auth-alert error animate-shake">
                <AlertCircle size={15} />
                <span>{signupError}</span>
              </div>
            )}

            {/* Role Selector: Present ONLY in Sign Up page as requested */}
            <div className="signup-role-section">
              <label className="auth-field-label">Select Your Role</label>
              <div className="signup-role-toggle">
                <button
                  type="button"
                  className={`role-toggle-pill ${regRole === 'admin' ? 'active' : ''}`}
                  onClick={() => setRegRole('admin')}
                >
                  <ShieldCheck size={15} />
                  <span>Manager / HR</span>
                </button>
                <button
                  type="button"
                  className={`role-toggle-pill ${regRole === 'employee' ? 'active' : ''}`}
                  onClick={() => setRegRole('employee')}
                >
                  <UserCheck size={15} />
                  <span>Employee</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSignUpSubmit} className="auth-form compact">
              {/* Full Name */}
              <div className="auth-input-group">
                <label className="auth-field-label">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="auth-input"
                />
              </div>

              {/* Email */}
              <div className="auth-input-group">
                <label className="auth-field-label">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@workforceiq.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="auth-input"
                />
              </div>

              {/* Password */}
              <div className="auth-input-group">
                <label className="auth-field-label">Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="auth-input-group">
                <label className="auth-field-label">Confirm Password</label>
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="auth-input"
                />
              </div>

              {/* Role-Specific Fields */}
              {regRole === 'employee' ? (
                <div className="auth-two-col">
                  <div className="auth-input-group">
                    <label className="auth-field-label">Department</label>
                    <select
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      className="auth-select"
                    >
                      <option value="Engineering & Cloud">Engineering & Cloud</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Security & SecOps">Security & SecOps</option>
                      <option value="Product Architecture">Product Architecture</option>
                    </select>
                  </div>
                  <div className="auth-input-group">
                    <label className="auth-field-label">Job Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cloud Engineer"
                      value={regJobRole}
                      onChange={(e) => setRegJobRole(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              ) : (
                <div className="auth-two-col">
                  <div className="auth-input-group">
                    <label className="auth-field-label">Organization</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Tech"
                      value={regOrganization}
                      onChange={(e) => setRegOrganization(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                  <div className="auth-input-group">
                    <label className="auth-field-label">Department</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Workforce Ops"
                      value={regDepartment}
                      onChange={(e) => setRegDepartment(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-auth-primary"
                style={{ marginTop: '6px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer-prompt" style={{ marginTop: '12px' }}>
              <span>Already have an account?</span>{' '}
              <button
                type="button"
                className="auth-action-link"
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* ============================================================
            MODE 3: FORGOT PASSWORD FLOW
            ============================================================ */}
        {authMode === 'forgot-password' && (
          <div className="auth-form-body animate-fade-in">
            <button
              type="button"
              className="auth-back-btn"
              onClick={() => {
                setResetSentSuccess(false);
                setAuthMode('login');
              }}
            >
              <ChevronLeft size={16} />
              <span>Back to Login</span>
            </button>

            <div className="auth-header">
              <div className="auth-logo-badge small">
                <Lock size={20} strokeWidth={2.4} />
              </div>
              <h2 className="auth-heading">Forgot Password?</h2>
              <p className="auth-subtitle">
                Enter your registered enterprise email address and we'll send you a password recovery link.
              </p>
            </div>

            {resetSentSuccess ? (
              <div className="reset-success-box animate-fade-in">
                <div className="success-icon-bubble">
                  <CheckCircle2 size={34} style={{ color: '#10b981' }} />
                </div>
                <h4 className="success-title">Recovery Link Sent</h4>
                <p className="success-desc">
                  We've dispatched a secure one-time password reset link to{' '}
                  <strong>{forgotEmail}</strong>. Please check your inbox.
                </p>
                <button
                  type="button"
                  className="btn-auth-primary"
                  onClick={() => {
                    setResetSentSuccess(false);
                    setAuthMode('login');
                  }}
                  style={{ marginTop: '14px' }}
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="auth-form">
                <div className="auth-input-group">
                  <label className="auth-field-label">Enterprise Email</label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} className="auth-input-icon" />
                    <input
                      type="email"
                      required
                      placeholder="name@workforceiq.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-auth-primary"
                  disabled={isSubmitting}
                  style={{ marginTop: '8px' }}
                >
                  {isSubmitting ? 'Sending Recovery Link...' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
