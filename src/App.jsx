import React, { useState, useEffect } from 'react';
import { talentSyncStore } from './data/talentSyncStore';
import { AuthScreen } from './components/employee/AuthScreen';
import { OnboardingModal } from './components/employee/OnboardingModal';
import { AndroidShell } from './components/employee/AndroidShell';
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
  // Session State
  const [session, setSession] = useState(() => talentSyncStore.getActiveSession());
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'tasks', 'projects', 'ai', 'profile'
  const [activeEmployeeId, setActiveEmployeeId] = useState(session?.employeeId || 'EMP-101');

  // Reactive store trigger
  const [storeTick, setStoreTick] = useState(0);

  useEffect(() => {
    const unsubscribe = talentSyncStore.subscribe(() => {
      setStoreTick(t => t + 1);
    });
    return unsubscribe;
  }, []);

  // Synchronized Domain Records for Authenticated Employee
  const allEmployees = talentSyncStore.getAllEmployees();
  const activeEmployee = talentSyncStore.getEmployee(activeEmployeeId);
  const tasks = talentSyncStore.getTasksForEmployee(activeEmployeeId);
  const projects = talentSyncStore.getProjectsForEmployee(activeEmployeeId);
  const requests = talentSyncStore.getRequestsForEmployee(activeEmployeeId);
  const notifications = talentSyncStore.getNotificationsForEmployee(activeEmployeeId);
  const courses = talentSyncStore.getLearningCourses();
  const kpis = talentSyncStore.calculateWorkspaceKPIs(activeEmployeeId);

  // Modals & Sheets
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState(null);
  const [isWorkloadModalOpen, setIsWorkloadModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportInitialData, setSupportInitialData] = useState(null);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [taskProjectFilter, setTaskProjectFilter] = useState('all');

  // AUTH HANDLERS
  const handleLogin = (empId, rememberMe = true) => {
    setActiveEmployeeId(empId);
    const newSession = { isLoggedIn: true, employeeId: empId };
    if (rememberMe) {
      talentSyncStore.setActiveSession(newSession);
    }
    setSession(newSession);
    setActiveTab('home');
  };

  const handleLogout = () => {
    const cleared = { isLoggedIn: false, employeeId: 'EMP-101' };
    talentSyncStore.setActiveSession(cleared);
    setSession(cleared);
  };

  const handleSwitchEmployee = (empId) => {
    setActiveEmployeeId(empId);
    talentSyncStore.setActiveSession({ isLoggedIn: true, employeeId: empId });
  };

  // CROSS-TAB NAVIGATION HELPERS
  const handleNavigateToTasksFromProject = (projectId) => {
    setTaskProjectFilter(projectId);
    setActiveTab('tasks');
  };

  const handleOpenSupportFromAnywhere = (prefill = null) => {
    setSupportInitialData(prefill);
    setIsSupportModalOpen(true);
  };

  const handleNotificationLinkClick = (target) => {
    if (!target) return;
    if (target.tab === 'tasks') {
      setActiveTab('tasks');
      if (target.itemId) {
        const t = tasks.find(tsk => tsk.id === target.itemId);
        if (t) setSelectedTaskForDetail(t);
      }
    } else if (target.tab === 'projects') {
      setActiveTab('projects');
      if (target.itemId) {
        const p = projects.find(prj => prj.id === target.itemId);
        if (p) setSelectedProjectForDetail(p);
      }
    } else if (target.tab === 'requests') {
      setIsSupportModalOpen(true);
    } else if (target.tab === 'learning') {
      setIsLearningModalOpen(true);
    } else if (target.tab === 'profile') {
      setActiveTab('profile');
    } else {
      setActiveTab('home');
    }
  };

  // If Not Authenticated: Render Employee Login Screen
  if (!session?.isLoggedIn) {
    return (
      <>
        <AuthScreen 
          onLogin={handleLogin}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          allEmployees={allEmployees}
        />
        <OnboardingModal 
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />
      </>
    );
  }

  // Authenticated Employee Portal in Authentic Android Shell
  return (
    <>
      <AndroidShell
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'tasks') setTaskProjectFilter('all');
        }}
        unreadNotifsCount={notifications.filter(n => !n.isRead).length}
        pendingTasksCount={tasks.filter(t => t.status !== 'Completed').length}
        activeProjectsCount={projects.length}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        activeEmployee={activeEmployee}
        allEmployees={allEmployees}
        onSwitchEmployee={handleSwitchEmployee}
      >
        {/* TAB 1: HOME — MY WORKSPACE */}
        {activeTab === 'home' && (
          <DashboardHome 
            employee={activeEmployee}
            kpis={kpis}
            projects={projects}
            tasks={tasks}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
            onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
            onOpenWorkloadModal={() => setIsWorkloadModalOpen(true)}
            onOpenSupportRequest={handleOpenSupportFromAnywhere}
            onOpenLearningCenter={() => setIsLearningModalOpen(true)}
          />
        )}

        {/* TAB 2: TASKS — TASK MANAGEMENT */}
        {activeTab === 'tasks' && (
          <TasksScreen 
            tasks={tasks}
            projects={projects}
            initialProjectId={taskProjectFilter}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
          />
        )}

        {/* TAB 3: PROJECTS — ASSIGNED PROJECTS */}
        {activeTab === 'projects' && (
          <ProjectsScreen 
            projects={projects}
            tasks={tasks}
            onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
            onNavigateToTasks={handleNavigateToTasksFromProject}
          />
        )}

        {/* TAB 4: AI ASSISTANT — PERSONALIZED COPILOT */}
        {activeTab === 'ai' && (
          <AIAssistantScreen 
            employee={activeEmployee}
            tasks={tasks}
            projects={projects}
            onOpenTaskDetail={(task) => setSelectedTaskForDetail(task)}
            onOpenSupportRequest={handleOpenSupportFromAnywhere}
            onOpenLearningCenter={() => setIsLearningModalOpen(true)}
          />
        )}

        {/* TAB 5: PROFILE — EMPLOYEE PROFILE & SETTINGS */}
        {activeTab === 'profile' && (
          <ProfileScreen 
            employee={activeEmployee}
            onLogout={handleLogout}
            onOpenSupportRequest={handleOpenSupportFromAnywhere}
            onOpenLearningCenter={() => setIsLearningModalOpen(true)}
          />
        )}
      </AndroidShell>

      {/* MODALS & DRAWERS */}
      {selectedTaskForDetail && (
        <TaskDetailModal 
          task={selectedTaskForDetail}
          onClose={() => setSelectedTaskForDetail(null)}
          onNavigateToProjects={() => {
            setSelectedTaskForDetail(null);
            setActiveTab('projects');
          }}
        />
      )}

      {selectedProjectForDetail && (
        <ProjectDetailModal 
          project={selectedProjectForDetail}
          assignedTasks={tasks.filter(t => t.projectId === selectedProjectForDetail.id)}
          onClose={() => setSelectedProjectForDetail(null)}
          onNavigateToTasks={handleNavigateToTasksFromProject}
        />
      )}

      {isWorkloadModalOpen && (
        <WorkloadModal 
          employee={activeEmployee}
          tasks={tasks}
          onClose={() => setIsWorkloadModalOpen(false)}
          onOpenSupportRequest={handleOpenSupportFromAnywhere}
        />
      )}

      {isSupportModalOpen && (
        <SupportRequestsModal 
          employeeId={activeEmployeeId}
          requests={requests}
          projects={projects}
          initialForm={supportInitialData}
          onClose={() => {
            setIsSupportModalOpen(false);
            setSupportInitialData(null);
          }}
        />
      )}

      {isLearningModalOpen && (
        <LearningCenterModal 
          employee={activeEmployee}
          courses={courses}
          onClose={() => setIsLearningModalOpen(false)}
        />
      )}

      <NotificationsDrawer 
        isOpen={isNotificationsOpen}
        notifications={notifications}
        employeeId={activeEmployeeId}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToItem={handleNotificationLinkClick}
      />

      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
    </>
  );
}
