import React, { useState, useEffect } from 'react';
import { talentSyncStore } from './data/talentSyncStore';

// AUTH & SPLASH SCREENS
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/LoginPage';

// ADMIN / WORKFORCE MANAGER PORTAL COMPONENTS
import { AdminAuthScreen } from './components/admin/AdminAuthScreen';
import { AdminShell } from './components/admin/AdminShell';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { EmployeeDirectoryView } from './components/admin/EmployeeDirectoryView';
import { AITeamBuilderView } from './components/admin/AITeamBuilderView';
import { WorkloadManagementView } from './components/admin/WorkloadManagementView';
import { PlanningSimulatorView } from './components/admin/PlanningSimulatorView';
import { ProjectsManagementModal } from './components/admin/ProjectsManagementModal';
import { ResourceRequestsModal } from './components/admin/ResourceRequestsModal';
import { SkillsIntelligenceModal } from './components/admin/SkillsIntelligenceModal';
import { AlertsCenterDrawer } from './components/admin/AlertsCenterDrawer';
import { AuditTrailModal } from './components/admin/AuditTrailModal';

// EMPLOYEE PORTAL COMPONENTS (For Synchronized Cross-Testing)
import { AuthScreen as EmployeeAuthScreen } from './components/employee/AuthScreen';
import { OnboardingModal } from './components/employee/OnboardingModal';
import { AndroidShell as EmployeeShell } from './components/employee/AndroidShell';
import { DashboardHome } from './components/employee/DashboardHome';
import { TasksScreen } from './components/employee/TasksScreen';
import { ProjectsScreen } from './components/employee/ProjectsScreen';
import { AIAssistantScreen } from './components/employee/AIAssistantScreen';
import { ProfileScreen } from './components/employee/ProfileScreen';
import { TaskDetailModal } from './components/employee/TaskDetailModal';
import { ProjectDetailModal } from './components/employee/ProjectDetailModal';
import { WorkloadModal } from './components/employee/WorkloadModal';
import { SupportRequestsModal } from './components/employee/SupportRequestsModal';
import { LearningCenterModal } from './components/employee/LearningCenterModal';
import { NotificationsDrawer } from './components/employee/NotificationsDrawer';

export default function App() {
  // Opening Splash Screen State
  const [showSplash, setShowSplash] = useState(true);

  // Portal Toggle: 'admin' (Workforce Manager) | 'employee' (Employee Portal)
  const [activePortal, setActivePortal] = useState('admin');

  // Reactive store sync tick
  const [storeTick, setStoreTick] = useState(0);

  useEffect(() => {
    const unsubscribe = talentSyncStore.subscribe(() => {
      setStoreTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  // Synchronized Domain Records from Authoritative Store Layer
  const allEmployees = talentSyncStore.getAllEmployees();
  const allProjects = talentSyncStore.getAllProjects();
  const allAlerts = talentSyncStore.getWorkforceAlerts();
  const allRequests = talentSyncStore.getAllSupportRequests();
  const auditLog = talentSyncStore.getAuditLog();
  const adminKPIs = talentSyncStore.calculateAdminKPIs();
  const departmentAnalytics = talentSyncStore.getDepartmentDistribution();
  const adminUsers = talentSyncStore.getAdminUsers();

  // ==========================================
  // AUTHENTICATION SESSIONS
  // ==========================================
  const [adminSession, setAdminSession] = useState(() => ({
    isLoggedIn: false, // Start at clean login gate after splash
    admin: adminUsers[0] // Default demo admin
  }));

  const [employeeSession, setEmployeeSession] = useState(() => ({
    isLoggedIn: false,
    employeeId: 'EMP-101'
  }));

  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'workforce', 'team-builder', 'workload', 'planning'

  // Admin Modals & Sheets
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleAdminLogout = () => {
    setAdminSession({ isLoggedIn: false, admin: null });
    setIsSettingsModalOpen(false);
  };

  const handleTeamBuilderNavigate = (projectId) => {
    setAdminTab('team-builder');
  };

  // ==========================================
  // EMPLOYEE PORTAL STATE (Shared cross-testing)
  // ==========================================
  const [empActiveTab, setEmpActiveTab] = useState('home');
  const [activeEmployeeId, setActiveEmployeeId] = useState('EMP-101');
  const activeEmployee = talentSyncStore.getEmployee(activeEmployeeId) || allEmployees[0];
  const empTasks = talentSyncStore.getTasksForEmployee(activeEmployeeId);
  const empProjects = talentSyncStore.getProjectsForEmployee(activeEmployeeId);
  const empRequests = talentSyncStore.getRequestsForEmployee(activeEmployeeId);
  const empNotifications = talentSyncStore.getNotificationsForEmployee(activeEmployeeId);
  const empCourses = talentSyncStore.getLearningCourses();
  const empKPIs = talentSyncStore.calculateWorkspaceKPIs(activeEmployeeId);

  // Employee Modals
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [isEmpWorkloadModalOpen, setIsEmpWorkloadModalOpen] = useState(false);
  const [isEmpSupportModalOpen, setIsEmpSupportModalOpen] = useState(false);
  const [supportInitialData, setSupportInitialData] = useState(null);
  const [isEmpLearningModalOpen, setIsEmpLearningModalOpen] = useState(false);
  const [isEmpNotificationsOpen, setIsEmpNotificationsOpen] = useState(false);
  const [isEmpOnboardingOpen, setIsEmpOnboardingOpen] = useState(false);
  const [taskProjectFilter, setTaskProjectFilter] = useState('all');

  // Unified Login Handler for clean login screen
  const handleUnifiedLogin = (credentials) => {
    if (credentials.role === 'admin') {
      setAdminSession({
        isLoggedIn: true,
        admin: credentials.name ? {
          name: credentials.name,
          role: credentials.title || 'VP of Workforce Operations',
          email: credentials.email || 'manager@workforceiq.com',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
        } : adminUsers[0]
      });
      setActivePortal('admin');
      setAdminTab('dashboard');
    } else {
      const empId = credentials.employee?.id || credentials.employeeId || 'EMP-101';
      setActiveEmployeeId(empId);
      setEmployeeSession({ isLoggedIn: true, employeeId: empId });
      talentSyncStore.setActiveSession({ isLoggedIn: true, employeeId: empId });
      setActivePortal('employee');
      setEmpActiveTab('home');
    }
  };

  const isUserAuthenticated = (activePortal === 'admin' && adminSession.isLoggedIn) || 
                             (activePortal === 'employee' && employeeSession.isLoggedIn);

  // 1. APP OPENING SPLASH SCREEN
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. UNIFIED LOGIN GATEWAY (Clean Email & Password, Sign Up with Role, Forgot Password)
  if (!isUserAuthenticated) {
    return (
      <LoginPage 
        employees={allEmployees}
        onLogin={handleUnifiedLogin}
        onRegisterEmployee={(newEmp) => {
          talentSyncStore.addEmployee?.(newEmp);
        }}
      />
    );
  }

  // ==========================================
  // 3. RENDER ADMIN PORTAL (Kalyani's Workforce Manager)
  // ==========================================
  if (activePortal === 'admin') {
    return (
      <>
        <AdminShell
          activeTab={adminTab}
          onSelectTab={(tab) => setAdminTab(tab)}
          activeAdmin={adminSession.admin}
          unreadAlertsCount={allAlerts.filter(a => !a.isRead).length}
          pendingRequestsCount={allRequests.filter(r => r.status === 'Pending').length}
          activePortal={activePortal}
          onSwitchPortal={(portal) => setActivePortal(portal)}
          onOpenProjectsModal={() => setIsProjectsModalOpen(true)}
          onOpenRequestsModal={() => setIsRequestsModalOpen(true)}
          onOpenAlertsDrawer={() => setIsAlertsDrawerOpen(true)}
          onOpenSkillsModal={() => setIsSkillsModalOpen(true)}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        >
          {/* TAB 1: DASHBOARD (Section 4) */}
          {adminTab === 'dashboard' && (
            <AdminDashboardView 
              kpis={adminKPIs}
              departmentAnalytics={departmentAnalytics}
              recentAlerts={allAlerts.slice(0, 4)}
              recentRequests={allRequests.slice(0, 4)}
              allEmployees={allEmployees}
              allProjects={allProjects}
              onNavigateTab={(tab) => setAdminTab(tab)}
              onOpenProjects={() => setIsProjectsModalOpen(true)}
              onOpenRequests={() => setIsRequestsModalOpen(true)}
              onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
              onOpenSkills={() => setIsSkillsModalOpen(true)}
              onOpenReports={() => setAdminTab('planning')}
            />
          )}

          {/* TAB 2: WORKFORCE — EMPLOYEE DIRECTORY (Section 5) */}
          {adminTab === 'workforce' && (
            <EmployeeDirectoryView 
              employees={allEmployees}
              projects={allProjects}
            />
          )}

          {/* TAB 3: TEAM BUILDER — AI ALLOCATION (Section 6) */}
          {adminTab === 'team-builder' && (
            <AITeamBuilderView 
              projects={allProjects}
              employees={allEmployees}
              onAllocationSuccess={() => {}}
            />
          )}

          {/* TAB 4: WORKLOAD — UTILIZATION AND CONFLICTS (Section 7) */}
          {adminTab === 'workload' && (
            <WorkloadManagementView 
              employees={allEmployees}
              projects={allProjects}
              departmentAnalytics={departmentAnalytics}
            />
          )}

          {/* TAB 5: PLANNING — SCENARIOS & ANALYTICS (Section 11 & 12) */}
          {adminTab === 'planning' && (
            <PlanningSimulatorView 
              employees={allEmployees}
              projects={allProjects}
              kpis={adminKPIs}
              departmentAnalytics={departmentAnalytics}
            />
          )}
        </AdminShell>

        {/* ADMIN OVERLAY MODALS */}
        <ProjectsManagementModal 
          isOpen={isProjectsModalOpen}
          onClose={() => setIsProjectsModalOpen(false)}
          projects={allProjects}
          employees={allEmployees}
          onNavigateToTeamBuilder={handleTeamBuilderNavigate}
        />

        <ResourceRequestsModal 
          isOpen={isRequestsModalOpen}
          onClose={() => setIsRequestsModalOpen(false)}
          requests={allRequests}
          employees={allEmployees}
        />

        <SkillsIntelligenceModal 
          isOpen={isSkillsModalOpen}
          onClose={() => setIsSkillsModalOpen(false)}
          employees={allEmployees}
          projects={allProjects}
        />

        <AlertsCenterDrawer 
          isOpen={isAlertsDrawerOpen}
          onClose={() => setIsAlertsDrawerOpen(false)}
          alerts={allAlerts}
          onNavigateToTab={(tab) => {
            setIsAlertsDrawerOpen(false);
            setAdminTab(tab);
          }}
        />

        <AuditTrailModal 
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          activeAdmin={adminSession.admin}
          auditLog={auditLog}
          onLogout={handleAdminLogout}
        />
      </>
    );
  }

  // ==========================================
  // 4. RENDER EMPLOYEE PORTAL (Kalyani's TalentSync Employee Portal)
  // ==========================================
  return (
    <>
      <EmployeeShell
        activeTab={empActiveTab}
        onSelectTab={(tab) => {
          setEmpActiveTab(tab);
          if (tab === 'tasks') setTaskProjectFilter('all');
        }}
        unreadNotifsCount={empNotifications.filter(n => !n.isRead).length}
        pendingTasksCount={empTasks.filter(t => t.status !== 'Completed').length}
        activeProjectsCount={empProjects.length}
        onOpenNotifications={() => setIsEmpNotificationsOpen(true)}
        activeEmployee={activeEmployee}
        allEmployees={allEmployees}
        onSwitchEmployee={(id) => {
          setActiveEmployeeId(id);
          talentSyncStore.setActiveSession({ isLoggedIn: true, employeeId: id });
        }}
      >
        {empActiveTab === 'home' && (
          <DashboardHome 
            employee={activeEmployee}
            kpis={empKPIs}
            projects={empProjects}
            tasks={empTasks}
            onNavigateTab={(tab) => setEmpActiveTab(tab)}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
            onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
            onOpenWorkloadModal={() => setIsEmpWorkloadModalOpen(true)}
            onOpenSupportRequest={(data) => {
              setSupportInitialData(data);
              setIsEmpSupportModalOpen(true);
            }}
            onOpenLearningCenter={() => setIsEmpLearningModalOpen(true)}
          />
        )}

        {empActiveTab === 'tasks' && (
          <TasksScreen 
            tasks={empTasks}
            projects={empProjects}
            initialProjectId={taskProjectFilter}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
          />
        )}

        {empActiveTab === 'projects' && (
          <ProjectsScreen 
            projects={empProjects}
            tasks={empTasks}
            onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
            onNavigateToTasks={(pid) => {
              setTaskProjectFilter(pid);
              setEmpActiveTab('tasks');
            }}
          />
        )}

        {empActiveTab === 'ai' && (
          <AIAssistantScreen 
            employee={activeEmployee}
            tasks={empTasks}
            projects={empProjects}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
            onOpenSupportRequest={(data) => {
              setSupportInitialData(data);
              setIsEmpSupportModalOpen(true);
            }}
            onOpenLearningCenter={() => setIsEmpLearningModalOpen(true)}
          />
        )}

        {empActiveTab === 'profile' && (
          <ProfileScreen 
            employee={activeEmployee}
            onLogout={() => {
              setEmployeeSession({ isLoggedIn: false, employeeId: 'EMP-101' });
            }}
            onOpenSupportRequest={() => setIsEmpSupportModalOpen(true)}
            onOpenLearningCenter={() => setIsEmpLearningModalOpen(true)}
          />
        )}
      </EmployeeShell>

      {/* Employee Modals */}
      {selectedTaskForDetail && (
        <TaskDetailModal 
          task={selectedTaskForDetail}
          onClose={() => setSelectedTaskForDetail(null)}
          onNavigateToProjects={() => {
            setSelectedTaskForDetail(null);
            setEmpActiveTab('projects');
          }}
        />
      )}

      {selectedProjectForDetail && (
        <ProjectDetailModal 
          project={selectedProjectForDetail}
          assignedTasks={empTasks.filter(t => t.projectId === selectedProjectForDetail.id)}
          onClose={() => setSelectedProjectForDetail(null)}
          onNavigateToTasks={(pid) => {
            setSelectedProjectForDetail(null);
            setTaskProjectFilter(pid);
            setEmpActiveTab('tasks');
          }}
        />
      )}

      {isEmpWorkloadModalOpen && (
        <WorkloadModal 
          employee={activeEmployee}
          tasks={empTasks}
          onClose={() => setIsEmpWorkloadModalOpen(false)}
          onOpenSupportRequest={(data) => {
            setSupportInitialData(data);
            setIsEmpSupportModalOpen(true);
          }}
        />
      )}

      {isEmpSupportModalOpen && (
        <SupportRequestsModal 
          employeeId={activeEmployeeId}
          requests={empRequests}
          projects={empProjects}
          initialForm={supportInitialData}
          onClose={() => {
            setIsEmpSupportModalOpen(false);
            setSupportInitialData(null);
          }}
        />
      )}

      {isEmpLearningModalOpen && (
        <LearningCenterModal 
          employee={activeEmployee}
          courses={empCourses}
          onClose={() => setIsEmpLearningModalOpen(false)}
        />
      )}

      <NotificationsDrawer 
        isOpen={isEmpNotificationsOpen}
        notifications={empNotifications}
        employeeId={activeEmployeeId}
        onClose={() => setIsEmpNotificationsOpen(false)}
        onNavigateToItem={(target) => {
          if (!target) return;
          if (target.tab === 'tasks') setEmpActiveTab('tasks');
          else if (target.tab === 'projects') setEmpActiveTab('projects');
          else if (target.tab === 'requests') setIsEmpSupportModalOpen(true);
          else if (target.tab === 'learning') setIsEmpLearningModalOpen(true);
          else setEmpActiveTab('home');
        }}
      />

      <OnboardingModal 
        isOpen={isEmpOnboardingOpen}
        onClose={() => setIsEmpOnboardingOpen(false)}
      />
    </>
  );
}
