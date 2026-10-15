import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AdminDashboard } from './components/AdminDashboard';
import { WorkforceView } from './components/WorkforceView';
import { ProjectsView } from './components/ProjectsView';
import { IntelligenceView } from './components/IntelligenceView';
import { SimulatorView } from './components/SimulatorView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LoginPage } from './components/LoginPage';
import { SplashScreen } from './components/SplashScreen';
import { EmployeePortalWrapper } from './components/employee/EmployeePortalWrapper';
import { SupabaseModal } from './components/SupabaseModal';
import { isSupabaseConfigured } from './lib/supabase';
import { 
  getEmployees, 
  getProjects, 
  saveEmployees, 
  saveProject 
} from './lib/supabaseService';
import { INITIAL_EMPLOYEES } from './data/employees';
import { INITIAL_PROJECTS } from './data/projects';
import { Signal, Wifi, ShieldAlert, X } from 'lucide-react';

export default function App() {
  // Main Data States (Stateful for live hackathon demonstration)
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  // App Opening & Authentication Experience States
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // First open shows splash then login
  const [currentUser, setCurrentUser] = useState(null);

  // Active Role ('admin' = Manager/HR, 'employee' = Employee Portal)
  const [activeRole, setActiveRole] = useState('admin');
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'workforce', 'projects', 'intelligence', 'simulator'
  
  // Active Employee for Employee Portal
  const [activeEmployeeId, setActiveEmployeeId] = useState('EMP-101'); // Default to Rahul Sharma
  const activeEmployee = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Access Denied Guard Alert State
  const [accessDeniedNotice, setAccessDeniedNotice] = useState(null);

  // Modals & Drawers
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [workforceFilterTier, setWorkforceFilterTier] = useState('all');

  // Role-based routing synchronization & route guard
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';

      if (!isLoggedIn) {
        if (hash.startsWith('/manager') || hash.startsWith('/employee')) {
          window.location.hash = '/login';
        }
        return;
      }

      // If authenticated as Manager / HR
      if (activeRole === 'admin') {
        if (hash.startsWith('/employee')) {
          setAccessDeniedNotice({
            title: 'Access Denied (403 Forbidden)',
            message: 'Manager credentials do not have clearance for the Employee personal portal. Redirecting to Manager Command Center...'
          });
          window.location.hash = `#/manager/${adminTab}`;
          setTimeout(() => setAccessDeniedNotice(null), 3500);
        } else if (hash.startsWith('/manager/')) {
          const tab = hash.replace('/manager/', '');
          if (['dashboard', 'workforce', 'projects', 'intelligence', 'simulator'].includes(tab)) {
            setAdminTab(tab);
          }
        }
      }

      // If authenticated as Employee
      if (activeRole === 'employee') {
        if (hash.startsWith('/manager')) {
          setAccessDeniedNotice({
            title: 'Access Denied (403 Forbidden)',
            message: 'Manager & HR Command Center requires executive administrative credentials. Redirecting to your Employee Workspace...'
          });
          window.location.hash = `#/employee/home`;
          setTimeout(() => setAccessDeniedNotice(null), 3500);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn, activeRole, adminTab]);

  // Synchronize hash on portal/tab change
  useEffect(() => {
    if (isLoggedIn) {
      if (activeRole === 'admin') {
        window.location.hash = `#/manager/${adminTab}`;
      } else {
        window.location.hash = `#/employee/home`;
      }
    }
  }, [isLoggedIn, activeRole, adminTab]);

  // LOAD DATA FROM SUPABASE (OR FALLBACK TO INITIAL LOCAL DATA)
  const loadData = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setIsLoadingDb(true);
    try {
      const [empRes, prjRes] = await Promise.all([getEmployees(), getProjects()]);
      if (empRes.isFromDb && empRes.data && empRes.data.length > 0) {
        setEmployees(empRes.data);
        setIsUsingSupabase(true);
      }
      if (prjRes.isFromDb && prjRes.data && prjRes.data.length > 0) {
        setProjects(prjRes.data);
        setIsUsingSupabase(true);
      }
    } catch (err) {
      console.warn('Supabase initialization failed:', err);
    } finally {
      setIsLoadingDb(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle successful login
  const handleLogin = (credentials) => {
    setIsLoggedIn(true);
    setCurrentUser(credentials);
    const role = credentials.role === 'employee' ? 'employee' : 'admin';
    setActiveRole(role);
    if (credentials.employee?.id) {
      setActiveEmployeeId(credentials.employee.id);
    }
  };

  // Handle user logout back to Login screen
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.hash = '/login';
  };

  // Handle new employee registration from Sign Up flow
  const handleRegisterEmployee = (newEmployee) => {
    setEmployees(prev => [newEmployee, ...prev]);
    saveEmployees([newEmployee]);
  };

  // Handle Tab Switch inside Admin Portal
  const handleTabChange = (tabId) => {
    setAdminTab(tabId);
  };

  // Handle AI Matching Team Approval
  const handleApproveTeam = (projectId, teamInput) => {
    const isObjectArray = Array.isArray(teamInput) && teamInput.length > 0 && typeof teamInput[0] === 'object';
    const assignedIds = isObjectArray ? teamInput.map(m => m.id) : (Array.isArray(teamInput) ? teamInput : []);
    const assignedNames = isObjectArray ? teamInput.map(m => m.name) : [];

    setProjects(prev => {
      const updated = prev.map(p => {
        if (p.id === projectId) {
          const updatedPrj = {
            ...p,
            status: 'In Progress',
            stage: 'Fully Staffed',
            assignedEmployees: assignedIds.length > 0 ? assignedIds : (p.assignedEmployees || []),
            assignedTeam: assignedNames.length > 0 ? assignedNames : (p.assignedTeam || []),
            health: 98,
            readiness: 100,
            readinessScore: 98,
            readinessBreakdown: {
              skillCoverage: 100,
              teamAvailability: 92,
              experienceCoverage: 96,
              workloadFeasibility: 94
            }
          };
          saveProject(updatedPrj);
          return updatedPrj;
        }
        return p;
      });
      return updated;
    });

    setEmployees(prev => {
      const updated = prev.map(emp => {
        const matches = assignedIds.length > 0 ? assignedIds.includes(emp.id) : false;
        if (matches) {
          const newLoad = Math.min(100, emp.workload + 20);
          return {
            ...emp,
            workload: newLoad,
            status: newLoad > 90 ? 'Critical' : 'Optimal',
            availability: Math.max(5, 100 - newLoad),
            activeProjects: Array.from(new Set([...(emp.activeProjects || []), projectId]))
          };
        }
        return emp;
      });
      const affected = updated.filter(e => assignedIds.includes(e.id));
      if (affected.length > 0) saveEmployees(affected);
      return updated;
    });
  };

  // Handle Create Project
  const handleCreateProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectForDetail(newProject);
    saveProject(newProject);
  };

  // WORKLOAD REBALANCE HANDLER (Dual-Mode Support)
  const handleRebalanceWorkload = (sourceEmpId, targetEmpId, shiftAmount = 20) => {
    if (sourceEmpId && targetEmpId) {
      setEmployees(prev => {
        const updated = prev.map(emp => {
          if (emp.id === sourceEmpId) {
            const newLoad = Math.max(20, emp.workload - shiftAmount);
            return {
              ...emp,
              workload: newLoad,
              availability: Math.min(80, emp.availability + shiftAmount),
              availableHours: (emp.availableHours || 20) + 8
            };
          }
          if (emp.id === targetEmpId) {
            const newLoad = Math.min(85, emp.workload + shiftAmount);
            return {
              ...emp,
              workload: newLoad,
              availability: Math.max(15, emp.availability - shiftAmount),
              availableHours: Math.max(6, (emp.availableHours || 20) - 8)
            };
          }
          return emp;
        });
        const affected = updated.filter(e => e.id === sourceEmpId || e.id === targetEmpId);
        saveEmployees(affected);
        return updated;
      });
    } else {
      setEmployees(prev => {
        const updated = prev.map(emp => {
          if (emp.workload > 85) {
            return { ...emp, workload: 78, status: 'Optimal' };
          }
          if (emp.workload < 40) {
            return { ...emp, workload: 65, status: 'Optimal' };
          }
          return emp;
        });
        saveEmployees(updated);
        return updated;
      });
    }
  };

  // Handle Notification Alert Action
  const handleAlertAction = (alert) => {
    setIsNotificationsOpen(false);
    if (!alert) return;
    if (alert.type === 'overload') {
      setWorkforceFilterTier('critical');
      handleTabChange('workforce');
    } else if (alert.type === 'unassigned') {
      const targetProj = projects.find(p => p.id === alert.targetId);
      if (targetProj) setSelectedProjectForDetail(targetProj);
      else handleTabChange('projects');
    } else if (alert.type === 'simulator') {
      handleTabChange('simulator');
    }
  };

  // If authenticated as Employee, render full TalentSync AI Android Portal
  if (isLoggedIn && activeRole === 'employee') {
    return (
      <EmployeePortalWrapper 
        onLogout={handleLogout}
        onSwitchToManager={() => setActiveRole('admin')}
        initialEmployeeId={activeEmployeeId || 'EMP-101'}
      />
    );
  }

  // Authentic iPhone Mobile Frame Shell for Splash Screen, Login Page, and Manager Command Center
  return (
    <div className="app-viewport-wrapper mode-frame">
      <div className="iphone-device-wrap">
        {/* Hardware side buttons */}
        <div className="iphone-hw-btn btn-action" />
        <div className="iphone-hw-btn btn-vol-up" />
        <div className="iphone-hw-btn btn-vol-down" />
        <div className="iphone-hw-btn btn-power" />

        <div className="mobile-device-shell">
          
          {/* ============================================================
              1. PREMIUM WORKFORCEIQ APP SPLASH SCREEN (Inside Phone Bezel)
              ============================================================ */}
          {showSplash ? (
            <SplashScreen 
              onComplete={() => {
                setShowSplash(false);
                if (!isLoggedIn) {
                  window.location.hash = '/login';
                }
              }} 
            />
          ) : !isLoggedIn ? (
            /* ============================================================
               2. GLASSMORPHIC AUTHENTICATION SCREEN (Inside Phone Bezel)
               ============================================================ */
            <div className="app-container">
              <div className="app-top-nav-zone">
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
              </div>

              <main className="app-scroll-content">
                <LoginPage 
                  employees={employees}
                  onLogin={handleLogin}
                  onRegisterEmployee={handleRegisterEmployee}
                />
              </main>

              <footer 
                className="app-bottom-nav-zone" 
                style={{ paddingBottom: '14px', height: '18px', borderTop: 'none', background: 'transparent' }}
              >
                <div className="iphone-home-indicator" />
              </footer>
            </div>
          ) : (
            /* ============================================================
               3. AUTHENTICATED MANAGER COMMAND CENTER (Inside Phone Bezel)
               ============================================================ */
            <div className="app-container">
              {/* Access Denied Guard Notification Banner */}
              {accessDeniedNotice && (
                <div className="access-denied-toast">
                  <ShieldAlert size={18} className="access-denied-icon" />
                  <div style={{ flex: 1 }}>
                    <div className="access-denied-title">{accessDeniedNotice.title}</div>
                    <div className="access-denied-desc">{accessDeniedNotice.message}</div>
                  </div>
                  <button 
                    onClick={() => setAccessDeniedNotice(null)}
                    style={{ background: 'transparent', border: 'none', color: '#be123c', cursor: 'pointer', padding: '0 2px' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Top Static Header with Dynamic Island & Switcher & Supabase */}
              <Header 
                activeRole={activeRole}
                activeEmployee={activeEmployee}
                setActiveEmployee={(emp) => setActiveEmployeeId(emp.id)}
                employees={employees}
                unreadAlertCount={4}
                onOpenAlerts={() => setIsNotificationsOpen(true)}
                onLogout={handleLogout}
                onSwitchRole={(role) => setActiveRole(role)}
                onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
                isUsingSupabase={isUsingSupabase}
              />

              {/* SCROLLABLE MAIN PORTAL CONTENT AREA */}
              <main className="app-scroll-content">
                {adminTab === 'dashboard' && (
                  <AdminDashboard 
                    employees={employees}
                    projects={projects}
                    onNavigateTab={(tab) => handleTabChange(tab)}
                    onSelectProject={(proj) => setSelectedProjectForDetail(proj)}
                    onOpenWorkforceFilter={(filter) => {
                      setWorkforceFilterTier(filter);
                      handleTabChange('workforce');
                    }}
                  />
                )}

                {adminTab === 'workforce' && (
                  <WorkforceView 
                    employees={employees}
                    initialFilter={workforceFilterTier}
                    onRebalanceWorkload={handleRebalanceWorkload}
                  />
                )}

                {adminTab === 'projects' && (
                  <ProjectsView 
                    projects={projects}
                    employees={employees}
                    onSelectProject={(proj) => setSelectedProjectForDetail(proj)}
                    onCreateProject={handleCreateProject}
                  />
                )}

                {adminTab === 'intelligence' && (
                  <IntelligenceView 
                    employees={employees}
                    projects={projects}
                    onRebalanceWorkload={handleRebalanceWorkload}
                    onSelectProject={(proj) => setSelectedProjectForDetail(proj)}
                  />
                )}

                {adminTab === 'simulator' && (
                  <SimulatorView 
                    projects={projects}
                    employees={employees}
                  />
                )}
              </main>

              {/* Static Bottom Navigation Bar & Home Indicator */}
              <footer className="app-bottom-nav-zone">
                <BottomNav 
                  activeRole={activeRole}
                  currentTab={adminTab}
                  setCurrentTab={handleTabChange}
                />
                <div className="iphone-home-indicator" />
              </footer>
            </div>
          )}

          {/* PROJECT DETAIL & AI MATCHING MODAL */}
          {selectedProjectForDetail && (
            <ProjectDetailModal 
              project={selectedProjectForDetail}
              employees={employees}
              onClose={() => setSelectedProjectForDetail(null)}
              onApproveTeam={handleApproveTeam}
            />
          )}

          {/* ACTIONABLE NOTIFICATION DRAWER */}
          <NotificationDrawer 
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            onActionClick={handleAlertAction}
          />

          {/* SUPABASE CONNECTION & SYNC MODAL */}
          <SupabaseModal 
            isOpen={isSupabaseModalOpen}
            onClose={() => setIsSupabaseModalOpen(false)}
            onRefreshData={loadData}
            isUsingSupabase={isUsingSupabase}
          />
        </div>
      </div>
    </div>
  );
}
