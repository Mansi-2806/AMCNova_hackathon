import React, { useState, useEffect } from 'react';
import { talentSyncStore } from './data/talentSyncStore';

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
  // Portal Toggle: Default to 'admin' as requested by the user
  const [activePortal, setActivePortal] = useState('admin'); // 'admin' | 'employee'

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
  // ADMIN PORTAL STATE
  // ==========================================
  const [adminSession, setAdminSession] = useState(() => ({
    isLoggedIn: true,
    admin: adminUsers[0] // Default demo session: Sarah Connor, VP of Workforce Operations
  }));
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'workforce', 'team-builder', 'workload', 'planning'

  // Admin Modals & Sheets
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleAdminLogin = (adminUser) => {
    setAdminSession({ isLoggedIn: true, admin: adminUser });
    setAdminTab('dashboard');
  };

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
  const [employeeSession, setEmployeeSession] = useState(() => talentSyncStore.getActiveSession());
  const [empActiveTab, setEmpActiveTab] = useState('home');
  const [activeEmployeeId, setActiveEmployeeId] = useState(employeeSession?.employeeId || 'EMP-101');
  const activeEmployee = talentSyncStore.getEmployee(activeEmployeeId);
  const empTasks = talentSyncStore.getTasksForEmployee(activeEmployeeId);
  const empProjects = talentSyncStore.getProjectsForEmployee(activeEmployeeId);
  const empRequests = talentSyncStore.getRequestsForEmployee(activeEmployeeId);
  const empNotifications = talentSyncStore.getNotificationsForEmployee(activeEmployeeId);
  const empCourses = talentSyncStore.getLearningCourses();
  const empKPIs = talentSyncStore.calculateWorkspaceKPIs(activeEmployeeId);

  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [isEmpWorkloadModalOpen, setIsEmpWorkloadModalOpen] = useState(false);
  const [isEmpSupportModalOpen, setIsEmpSupportModalOpen] = useState(false);
  const [supportInitialData, setSupportInitialData] = useState(null);
  const [isEmpLearningModalOpen, setIsEmpLearningModalOpen] = useState(false);
  const [isEmpNotificationsOpen, setIsEmpNotificationsOpen] = useState(false);
  const [isEmpOnboardingOpen, setIsEmpOnboardingOpen] = useState(false);
  const [taskProjectFilter, setTaskProjectFilter] = useState('all');

  // ==========================================
  // 1. RENDER ADMIN / WORKFORCE MANAGER PORTAL
  // ==========================================
  if (activePortal === 'admin') {
    // If Admin not logged in: Render Admin Authentication Screen
    if (!adminSession?.isLoggedIn) {
      return (
        <AdminAuthScreen 
          onLogin={handleAdminLogin}
          onSwitchToEmployeePortal={() => setActivePortal('employee')}
          adminUsers={adminUsers}
        />
      );
    }

    // Authenticated Admin Shell with 5 bottom tabs and modals
    return (
      <>
        <AdminShell
          activeTab={adminTab}
          onSelectTab={(tab) => setAdminTab(tab)}
          activeAdmin={adminSession.admin}
          unreadAlertsCount={allAlerts.filter(a => !a.resolved).length}
          onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onOpenProjects={() => setIsProjectsModalOpen(true)}
          onOpenRequests={() => setIsRequestsModalOpen(true)}
          onLogout={handleAdminLogout}
        >
          {/* TAB 1: HOME — WORKFORCE OVERVIEW (Section 4) */}
          {adminTab === 'dashboard' && (
            <AdminDashboardView 
              kpis={adminKPIs}
              departmentAnalytics={departmentAnalytics}
              projects={allProjects}
              employees={allEmployees}
              alerts={allAlerts}
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
  // 2. RENDER EMPLOYEE PORTAL (Sync Verification)
  // ==========================================
  if (!employeeSession?.isLoggedIn) {
    return (
      <>
        <EmployeeAuthScreen 
          onLogin={(empId, remember) => {
            setActiveEmployeeId(empId);
            setEmployeeSession({ isLoggedIn: true, employeeId: empId });
          }}
          onOpenOnboarding={() => setIsEmpOnboardingOpen(true)}
          allEmployees={allEmployees}
        />
        <OnboardingModal 
          isOpen={isEmpOnboardingOpen}
          onClose={() => setIsEmpOnboardingOpen(false)}
        />
      </>
    );
  }

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
    </>
  );
}
