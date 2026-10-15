import React, { useState } from 'react';
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
import { INITIAL_EMPLOYEES } from './data/employees';
import { INITIAL_PROJECTS } from './data/projects';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function App() {
  // Main Data States (Stateful for live hackathon demonstration)
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  // Authentication & Session State
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Can log out to test login portal
  const [currentUser, setCurrentUser] = useState({
    role: 'admin',
    name: 'Sarah Connor',
    title: 'VP of Workforce Planning'
  });

  // Active Role ('admin' or 'employee')
  const [activeRole, setActiveRole] = useState('admin');
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'workforce', 'projects', 'intelligence', 'simulator'
  const [employeeTab, setEmployeeTab] = useState('home'); // 'home', 'skills', 'projects', 'learning', 'profile'
  
  // Active Employee for Employee Portal
  const [activeEmployeeId, setActiveEmployeeId] = useState('EMP-101'); // Default to Rahul Sharma
  const activeEmployee = employees.find(e => e.id === activeEmployeeId) || employees[0];

  // Modals & Drawers
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [workforceFilterTier, setWorkforceFilterTier] = useState('all');

  // LOGIN HANDLER
  const handleLogin = (userSession) => {
    setIsLoggedIn(true);
    setCurrentUser(userSession);
    setActiveRole(userSession.role);
    if (userSession.role === 'employee' && userSession.employee) {
      setActiveEmployeeId(userSession.employee.id);
      setEmployeeTab('home');
    } else {
      setAdminTab('dashboard');
    }
  };

  // LOGOUT HANDLER
  const handleLogout = () => {
    setIsLoggedIn(false);
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
    } else if (target === 'projects') {
      setActiveRole('admin');
      setAdminTab('projects');
    } else if (target === 'intelligence') {
      setActiveRole('admin');
      setAdminTab('intelligence');
    } else if (target === 'project-alpha') {
      setActiveRole('admin');
      const prj = projects.find(p => p.id === 'PRJ-006');
      if (prj) setSelectedProjectForDetail(prj);
    }
  };

  const currentTab = activeRole === 'admin' ? adminTab : employeeTab;
  const setCurrentTab = activeRole === 'admin' ? setAdminTab : setEmployeeTab;

  return (
    <div className="app-viewport-wrapper mode-frame">
      <div className="iphone-device-wrap">
        {/* Hardware side buttons */}
        <div className="iphone-hw-btn btn-action" />
        <div className="iphone-hw-btn btn-vol-up" />
        <div className="iphone-hw-btn btn-vol-down" />
        <div className="iphone-hw-btn btn-power" />

        <div className="mobile-device-shell">
          {/* If logged out: Render the dedicated Portal Login Page */}
          {!isLoggedIn ? (
            <div className="app-container" style={{ paddingBottom: '20px' }}>
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
              <LoginPage 
                employees={employees}
                onLogin={handleLogin}
              />
              <div className="iphone-home-indicator" />
            </div>
          ) : (
          /* If logged in: Render the Authenticated Portal */
          <div className="app-container">
            {/* Top Sticky Header */}
            <Header 
              activeRole={activeRole}
              activeEmployee={activeEmployee}
              setActiveEmployee={(emp) => setActiveEmployeeId(emp.id)}
              employees={employees}
              unreadAlertCount={4}
              onOpenAlerts={() => setIsNotificationsOpen(true)}
              onLogout={handleLogout}
            />

            {/* MAIN PORTAL PAGES */}
            {activeRole === 'admin' ? (
              <>
                {adminTab === 'dashboard' && (
                  <AdminDashboard 
                    employees={employees}
                    projects={projects}
                    onNavigateTab={(tab) => setAdminTab(tab)}
                    onSelectProject={(proj) => setSelectedProjectForDetail(proj)}
                    onOpenWorkforceFilter={(filter) => {
                      setWorkforceFilterTier(filter);
                      setAdminTab('workforce');
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

            {/* Dedicated Bottom Navigation Bar */}
            <BottomNav 
              activeRole={activeRole}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />

            {/* iOS Home Indicator Bar */}
            <div className="iphone-home-indicator" />
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
