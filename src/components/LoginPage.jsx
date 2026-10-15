import React, { useState } from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  UserCheck, 
  Flame, 
  TrendingDown, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  Shield,
  KeyRound
} from 'lucide-react';

export function LoginPage({ employees, onLogin }) {
  const [selectedPortal, setSelectedPortal] = useState('admin'); // 'admin' or 'employee'
  const [selectedEmpId, setSelectedEmpId] = useState('EMP-101'); // Default to Rahul Sharma
  const [email, setEmail] = useState('admin@workforceiq.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handlePortalSwitch = (portal) => {
    setSelectedPortal(portal);
    if (portal === 'admin') {
      setEmail('director.hr@workforceiq.ai');
    } else {
      const emp = employees.find(e => e.id === selectedEmpId) || employees[0];
      setEmail(emp.email);
    }
  };

  const handleEmployeeChange = (empId) => {
    setSelectedEmpId(empId);
    const emp = employees.find(e => e.id === empId);
    if (emp) setEmail(emp.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedPortal === 'admin') {
        onLogin({
          role: 'admin',
          name: 'Sarah Connor',
          title: 'VP of Workforce Planning',
          email: 'director.hr@workforceiq.ai',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
        });
      } else {
        const emp = employees.find(e => e.id === selectedEmpId) || employees[0];
        onLogin({
          role: 'employee',
          employee: emp
        });
      }
    }, 450);
  };

  // Quick 1-Click Demo Login Shortcuts
  const handleQuickDemo = (role, empId = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'admin') {
        onLogin({
          role: 'admin',
          name: 'Sarah Connor',
          title: 'VP of Workforce Planning',
          email: 'director.hr@workforceiq.ai',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
        });
      } else {
        const emp = employees.find(e => e.id === empId) || employees[0];
        onLogin({
          role: 'employee',
          employee: emp
        });
      }
    }, 350);
  };

  return (
    <div className="login-page-container">
      {/* Brand Hero */}
      <div className="login-brand-header">
        <div className="login-logo-glow">
          <Cpu size={32} />
        </div>
        <h1 className="login-title">WorkforceIQ</h1>
        <p className="login-subtitle">
          AI-Powered Workforce Intelligence & Talent Allocation Engine
        </p>
      </div>

      {/* Portal Selection Cards */}
      <div className="portal-selection-wrap">
        <div 
          className={`portal-card ${selectedPortal === 'admin' ? 'active' : ''}`}
          onClick={() => handlePortalSwitch('admin')}
        >
          <div className="portal-card-top">
            <div className="portal-icon-wrap admin">
              <Shield size={20} />
            </div>
            {selectedPortal === 'admin' && (
              <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>Selected</span>
            )}
          </div>
          <div className="portal-card-title">Manager & HR Portal</div>
          <div className="portal-card-desc">
            Workforce planning, team allocation, capacity balancing & predictive simulations.
          </div>
        </div>

        <div 
          className={`portal-card ${selectedPortal === 'employee' ? 'active' : ''}`}
          onClick={() => handlePortalSwitch('employee')}
        >
          <div className="portal-card-top">
            <div className="portal-icon-wrap employee">
              <UserCheck size={20} />
            </div>
            {selectedPortal === 'employee' && (
              <span className="badge badge-teal" style={{ fontSize: '0.62rem' }}>Selected</span>
            )}
          </div>
          <div className="portal-card-title">Employee Portal</div>
          <div className="portal-card-desc">
            Personal workload gauge, project readiness scores, skill gaps & upskilling.
          </div>
        </div>
      </div>

      {/* Main Login Form */}
      <div className="login-form-card">
        <form onSubmit={handleSubmit}>
          {selectedPortal === 'employee' && (
            <div style={{ marginBottom: '14px' }}>
              <label className="form-field-label">SELECT DEMO EMPLOYEE PROFILE</label>
              <select 
                className="login-input-field" 
                value={selectedEmpId}
                onChange={(e) => handleEmployeeChange(e.target.value)}
              >
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} — {emp.role.split(' ')[0]} ({emp.workload}% Load)
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={{ marginBottom: '12px' }}>
            <label className="form-field-label">ENTERPRISE SSO EMAIL</label>
            <input 
              type="email" 
              required
              className="login-input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-field-label">PASSWORD / TOKEN</label>
              <span style={{ fontSize: '0.68rem', color: '#14b8a6', cursor: 'pointer' }}>SSO Key</span>
            </div>
            <input 
              type="password" 
              required
              className="login-input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '12px', fontSize: '0.9rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Authenticating Biometrics...</span>
            ) : (
              <>
                <KeyRound size={16} />
                <span>
                  Enter {selectedPortal === 'admin' ? 'Manager Command Center' : 'Employee Portal'}
                </span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Track Testing Personas */}
        <div className="quick-personas-section">
          <div className="quick-personas-title">
            <Sparkles size={13} style={{ color: '#06b6d4' }} />
            <span>1-CLICK QUICK ACCESS TEST PERSONAS</span>
          </div>

          <div className="persona-quick-grid">
            <button 
              type="button"
              className="persona-btn"
              onClick={() => handleQuickDemo('admin')}
            >
              <div className="persona-btn-role" style={{ color: '#0f766e' }}>🏢 HR Executive</div>
              <div className="persona-btn-name">Sarah Connor</div>
              <div className="persona-btn-sub">Full Org Access</div>
            </button>

            <button 
              type="button"
              className="persona-btn"
              onClick={() => handleQuickDemo('employee', 'EMP-101')}
            >
              <div className="persona-btn-role" style={{ color: '#f43f5e' }}>🔴 Overloaded (94%)</div>
              <div className="persona-btn-name">Rahul Sharma</div>
              <div className="persona-btn-sub">Senior Cloud Eng</div>
            </button>

            <button 
              type="button"
              className="persona-btn"
              onClick={() => handleQuickDemo('employee', 'EMP-102')}
            >
              <div className="persona-btn-role" style={{ color: '#06b6d4' }}>🔵 Underutilized (25%)</div>
              <div className="persona-btn-name">Priya Patel</div>
              <div className="persona-btn-sub">Cloud Associate</div>
            </button>

            <button 
              type="button"
              className="persona-btn"
              onClick={() => handleQuickDemo('employee', 'EMP-103')}
            >
              <div className="persona-btn-role" style={{ color: '#10b981' }}>🟢 Healthy (65%)</div>
              <div className="persona-btn-name">Sarah Jenkins</div>
              <div className="persona-btn-sub">Principal AI Lead</div>
            </button>
          </div>
        </div>

        {/* Enterprise Security Badges Footer */}
        <div className="login-security-footer">
          <div className="sec-item">
            <ShieldCheck size={12} style={{ color: '#10b981' }} />
            <span>SOC2 Type II</span>
          </div>
          <span>•</span>
          <div className="sec-item">
            <Lock size={12} style={{ color: '#06b6d4' }} />
            <span>Zero-Trust Auth</span>
          </div>
          <span>•</span>
          <div className="sec-item">
            <Cpu size={12} style={{ color: '#14b8a6' }} />
            <span>Decision Engine v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
