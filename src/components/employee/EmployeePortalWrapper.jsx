import React, { useState, useEffect } from 'react';
import { talentSyncStore } from '../../data/talentSyncStore';
import { AndroidShell } from './AndroidShell';
import { DashboardHome } from './DashboardHome';
import { TasksScreen } from './TasksScreen';
import { ProjectsScreen } from './ProjectsScreen';
import { AIAssistantScreen } from './AIAssistantScreen';
import { ProfileScreen } from './ProfileScreen';
import { TaskDetailModal } from './TaskDetailModal';
import { ProjectDetailModal } from './ProjectDetailModal';
import { WorkloadModal } from './WorkloadModal';
import { SupportRequestsModal } from './SupportRequestsModal';
import { LearningCenterModal } from './LearningCenterModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { OnboardingModal } from './OnboardingModal';
import { ArrowLeftRight, Building } from 'lucide-react';

export function EmployeePortalWrapper({ 
  onLogout, 
  onSwitchToManager,
  initialEmployeeId = 'EMP-101' 
}) {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'tasks', 'projects', 'ai', 'profile'
  const [activeEmployeeId, setActiveEmployeeId] = useState(initialEmployeeId);

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
  const activeEmployee = talentSyncStore.getEmployee(activeEmployeeId) || allEmployees[0];
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

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {/* Quick Portal Switcher Banner for Hackathon Demo */}
      <div 
        style={{
          position: 'fixed',
          top: '10px',
          right: '12px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px'
        }}
      >
        {onSwitchToManager && (
          <button
            type="button"
            onClick={onSwitchToManager}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#0f766e',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15, 118, 110, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Building size={14} />
            <span>Switch to Manager Portal</span>
          </button>
        )}
      </div>

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
            onLogout={onLogout}
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
    </div>
  );
}
