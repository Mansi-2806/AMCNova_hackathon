import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AdminDashboard } from './components/AdminDashboard';
import { WorkforceView } from './components/WorkforceView';
import { ProjectsView } from './components/ProjectsView';
import { IntelligenceView } from './components/IntelligenceView';
import { SimulatorView } from './components/SimulatorView';
import { EmployeeView } from './components/EmployeeView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LoginPage } from './components/LoginPage';
import { SplashScreen } from './components/SplashScreen';
import { INITIAL_EMPLOYEES } from './data/employees';
import { INITIAL_PROJECTS } from './data/projects';
import { Signal, Wifi, Battery, ShieldAlert, X } from 'lucide-react';

export default function App() {
  // Main Data States (Stateful for live hackathon demonstration)
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // App Opening & Authentication Experience States
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // First open shows splash then login
  const [currentUser, setCurrentUser] = useState(null);

  // Active Role ('admin' = Manager/HR, 'employee' = Employee Portal)
  const [activeRole, setActiveRole] = useState('admin');
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'workforce', 'projects', 'intelligence', 'simulator'
  const [employeeTab, setEmployeeTab] = useState('home'); // 'home', 'skills', 'projects', 'learning', 'profile'
  
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
          window.location.hash = `#/employee/${employeeTab}`;
          setTimeout(() => setAccessDeniedNotice(null), 3500);
        } else if (hash.startsWith('/employee/')) {
          const tab = hash.replace('/employee/', '');
          if (['home', 'skills', 'projects', 'learning', 'profile'].includes(tab)) {
            setEmployeeTab(tab);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isLoggedIn, activeRole, adminTab, employeeTab]);

  // LOGIN HANDLER (Role-Based Authentication Redirect)
  const handleLogin = (userSession) => {
    setIsLoggedIn(true);
    setCurrentUser(userSession);
    setActiveRole(userSession.role);
    setAccessDeniedNotice(null);

    if (userSession.role === 'employee') {
      if (userSession.employee) {
        setActiveEmployeeId(userSession.employee.id);
      }
      setEmployeeTab('home');
      window.location.hash = '/employee/dashboard';
    } else {
      setAdminTab('dashboard');
      window.location.hash = '/manager/dashboard';
    }
  };

  // LOGOUT HANDLER (Clears session, strictly returns to login)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAccessDeniedNotice(null);
    window.location.hash = '/login';
  };

  // SIGN UP HANDLER (Adds newly registered employee to mock workforce)
  const handleRegisterEmployee = (newEmp) => {
    setEmployees(prev => [newEmp, ...prev]);
  };

  // WORKLOAD REBALANCE HANDLER (Core Differentiator from Prompt)
  const handleRebalanceWorkload = (sourceEmpId, targetEmpId, shiftAmount = 20) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === sourceEmpId) {
        const newLoad = Math.max(20, emp.workload - shiftAmount);
        return {
          ...emp,
          workload: newLoad,
          availability: Math.min(80, emp.availability + shiftAmount),
          availableHours: emp.availableHours + 8
        };
      }
      if (emp.id === targetEmpId) {
        const newLoad = Math.min(85, emp.workload + shiftAmount);
        return {
          ...emp,
          workload: newLoad,
          availability: Math.max(15, emp.availability - shiftAmount),
          availableHours: Math.max(6, emp.availableHours - 8)
        };
      }
      return emp;
    }));
  };

  // APPROVE & ALLOCATE RECOMMENDED TEAM
  const handleApproveTeam = (projectId, assignedEmployeeIds) => {
    // 1. Update Project
    setProjects(prev => prev.map(proj => {
      if (proj.id === projectId) {
        return {
          ...proj,
          status: 'Active',
          stage: 'Fully Staffed',
          assignedEmployees: assignedEmployeeIds,
          readinessScore: 98,
          readinessBreakdown: {
            skillCoverage: 100,
            teamAvailability: 92,
            experienceCoverage: 96,
            workloadFeasibility: 94
          }
        };
      }
      return proj;
    }));

    // 2. Update Employees workload & assigned projects
    setEmployees(prev => prev.map(emp => {
      if (assignedEmployeeIds.includes(emp.id)) {
        const addedWorkload = 25;
        const newLoad = Math.min(95, emp.workload + addedWorkload);
        return {
          ...emp,
          workload: newLoad,
          availability: Math.max(5, 100 - newLoad),
          activeProjects: Array.from(new Set([...(emp.activeProjects || []), projectId]))
        };
      }
      return emp;
    }));
  };

  // CREATE NEW PROJECT
  const handleCreateProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectForDetail(newProject);
  };

  // ALERT ACTION HANDLER
  const handleAlertAction = (target) => {
    if (target === 'rebalance') {
      setActiveRole('admin');
      setAdminTab('intelligence');
      window.location.hash = '/manager/intelligence';
    } else if (target === 'projects') {
      setActiveRole('admin');
      setAdminTab('projects');
      window.location.hash = '/manager/projects';
    } else if (target === 'intelligence') {
      setActiveRole('admin');
      setAdminTab('intelligence');
      window.location.hash = '/manager/intelligence';
    } else if (target === 'project-alpha') {
      setActiveRole('admin');
      const prj = projects.find(p => p.id === 'PRJ-006');
      if (prj) setSelectedProjectForDetail(prj);
    }
  };

  // Tab Selection with Hash Update
  const handleTabChange = (tab) => {
    if (activeRole === 'admin') {
      setAdminTab(tab);
      window.location.hash = `/manager/${tab}`;
    } else {
      setEmployeeTab(tab);
      window.location.hash = `/employee/${tab}`;
    }
  };

  const currentTab = activeRole === 'admin' ? adminTab : employeeTab;

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
              1. PREMIUM WORKFORCEIQ APP SPLASH SCREEN
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
               2. GLASSMORPHIC AUTHENTICATION SCREEN (LOGIN / SIGNUP / FORGOT)
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
               3. AUTHENTICATED WORKFORCEIQ PORTAL (MANAGER OR EMPLOYEE)
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

              {/* Top Static Header with Dynamic Island */}
              <Header 
                activeRole={activeRole}
                activeEmployee={activeEmployee}
                setActiveEmployee={(emp) => setActiveEmployeeId(emp.id)}
                employees={employees}
                unreadAlertCount={4}
                onOpenAlerts={() => setIsNotificationsOpen(true)}
                onLogout={handleLogout}
              />

              {/* SCROLLABLE MAIN PORTAL CONTENT AREA */}
              <main className="app-scroll-content">
                {activeRole === 'admin' ? (
                  <>
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
                  </>
                ) : (
                  /* EMPLOYEE PERSONAL PORTAL */
                  <EmployeeView 
                    activeEmployee={activeEmployee}
                    projects={projects}
                    currentTab={employeeTab}
                  />
                )}
              </main>

              {/* Static Bottom Navigation Bar & Home Indicator */}
              <footer className="app-bottom-nav-zone">
                <BottomNav 
                  activeRole={activeRole}
                  currentTab={currentTab}
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
        </div>
      </div>
    </div>
  );
}
