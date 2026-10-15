import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  Plus, 
  Award, 
  GraduationCap, 
  Bot, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  Target,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';

export function DashboardHome({
  employee,
  kpis,
  projects = [],
  tasks = [],
  onNavigateTab,
  onOpenTaskDetail,
  onOpenProjectDetail,
  onOpenWorkloadModal,
  onOpenSupportRequest,
  onOpenLearningCenter
}) {
  if (!employee) return null;

  // Local Time Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getGreeting();

  // Filter Tasks for Today's Priorities (Overdue, Due Soon, or Critical/High priority)
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const priorityTasks = tasks.filter(t => {
    if (t.status === 'Completed') return false;
    if (t.priority === 'Critical') return true;
    if (t.isBlocked) return true;
    if (!t.dueDate) return false;
    const d = new Date(t.dueDate);
    return d <= sevenDays;
  }).slice(0, 3);

  const getWorkloadTierBadge = (workload) => {
    if (workload >= 90) return { label: 'OVERLOADED', color: '#f43f5e', bg: '#fff1f2' };
    if (workload >= 75) return { label: 'HIGH LOAD', color: '#f59e0b', bg: '#fefce8' };
    if (workload >= 30) return { label: 'HEALTHY', color: '#10b981', bg: '#f0fdf4' };
    return { label: 'UNDERUTILIZED', color: '#38bdf8', bg: '#f0f9ff' };
  };

  const workloadTier = getWorkloadTierBadge(kpis.workloadPct);

  return (
    <div className="tab-view-container">
      {/* Personalized Welcome Header */}
      <div className="workspace-hero-card">
        <div className="hero-top-row">
          <div className="hero-avatar-wrap">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="hero-avatar"
            />
            <span className="online-indicator" />
          </div>
          <div className="hero-greeting-col">
            <span className="hero-time-tag">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <h1 className="hero-welcome-title">{greeting}, {employee.name.split(' ')[0]} 👋</h1>
            <p className="hero-role-sub">{employee.role} • {employee.department}</p>
          </div>
        </div>

        {/* Sync & Location Bar */}
        <div className="hero-meta-bar">
          <span className="hero-loc-chip">📍 {employee.location}</span>
          <span className="hero-status-chip">
            <span className="pulse-dot" /> Employee Session Active
          </span>
        </div>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="quick-actions-bar">
        <button 
          type="button" 
          className="quick-action-pill"
          onClick={() => onOpenSupportRequest({ type: 'Workload Support' })}
        >
          <Plus size={15} />
          <span>Raise Request</span>
        </button>
        <button 
          type="button" 
          className="quick-action-pill"
          onClick={onOpenWorkloadModal}
        >
          <BarChart3 size={15} />
          <span>My Workload</span>
        </button>
        <button 
          type="button" 
          className="quick-action-pill"
          onClick={() => onNavigateTab('tasks')}
        >
          <CheckCircle2 size={15} />
          <span>All Tasks</span>
        </button>
        <button 
          type="button" 
          className="quick-action-pill"
          onClick={() => onNavigateTab('ai')}
        >
          <Bot size={15} />
          <span>AI Copilot</span>
        </button>
        <button 
          type="button" 
          className="quick-action-pill"
          onClick={onOpenLearningCenter}
        >
          <GraduationCap size={15} />
          <span>Learning</span>
        </button>
      </div>

      {/* 6 DYNAMIC KPI CARDS (Calculated strictly from actual records) */}
      <div className="kpi-cards-grid">
        {/* 1. Active Projects */}
        <div 
          className="kpi-card"
          onClick={() => onNavigateTab('projects')}
        >
          <div className="kpi-icon-wrap bg-teal-subtle text-teal">
            <Briefcase size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Active Projects</span>
            <strong className="kpi-value text-teal">{kpis.activeProjectsCount}</strong>
            <span className="kpi-hint">Assigned & authorized</span>
          </div>
        </div>

        {/* 2. Pending Tasks */}
        <div 
          className="kpi-card"
          onClick={() => onNavigateTab('tasks')}
        >
          <div className="kpi-icon-wrap bg-cyan-subtle text-cyan">
            <CheckCircle2 size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Pending Tasks</span>
            <strong className="kpi-value text-cyan">{kpis.pendingTasksCount}</strong>
            <span className="kpi-hint">{tasks.filter(t => t.status === 'Completed').length} completed</span>
          </div>
        </div>

        {/* 3. Tasks Due Soon */}
        <div 
          className="kpi-card"
          onClick={() => onNavigateTab('tasks')}
        >
          <div className="kpi-icon-wrap bg-amber-subtle text-amber">
            <Clock size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Tasks Due Soon</span>
            <strong className="kpi-value text-amber">{kpis.tasksDueSoon}</strong>
            <span className="kpi-hint">Next 7 days</span>
          </div>
        </div>

        {/* 4. Current Workload */}
        <div 
          className="kpi-card"
          onClick={onOpenWorkloadModal}
        >
          <div 
            className="kpi-icon-wrap"
            style={{ backgroundColor: workloadTier.bg, color: workloadTier.color }}
          >
            <BarChart3 size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Current Workload</span>
            <strong className="kpi-value" style={{ color: workloadTier.color }}>
              {kpis.workloadPct}%
            </strong>
            <span className="kpi-hint">{kpis.assignedHours}h of 40h</span>
          </div>
        </div>

        {/* 5. Availability */}
        <div 
          className="kpi-card"
          onClick={onOpenWorkloadModal}
        >
          <div className="kpi-icon-wrap bg-emerald-subtle text-emerald">
            <TrendingUp size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Availability</span>
            <strong className="kpi-value text-emerald">{kpis.availabilityPct}%</strong>
            <span className="kpi-hint">{kpis.availableHours}h / week free</span>
          </div>
        </div>

        {/* 6. Pending Requests */}
        <div 
          className="kpi-card"
          onClick={() => onOpenSupportRequest()}
        >
          <div className="kpi-icon-wrap bg-purple-subtle text-purple">
            <ShieldAlert size={20} />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Pending Requests</span>
            <strong className="kpi-value text-purple">{kpis.pendingRequestsCount}</strong>
            <span className="kpi-hint">In review by ops</span>
          </div>
        </div>
      </div>

      {/* TODAY'S PRIORITIES SECTION */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <AlertTriangle size={18} className="text-amber" />
            <h3 className="section-title">Today's Priorities</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={() => onNavigateTab('tasks')}
          >
            <span>View All ({tasks.length})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="priorities-list">
          {priorityTasks.map((t) => (
            <div 
              key={t.id} 
              className={`priority-task-card ${t.isBlocked ? 'is-blocked-card' : ''}`}
              onClick={() => onOpenTaskDetail(t)}
            >
              <div className="priority-task-top">
                <span className={`priority-tag ${t.priority.toLowerCase()}`}>
                  {t.priority}
                </span>
                <span className="priority-due-tag">
                  <Clock size={12} /> Due {t.dueDate}
                </span>
              </div>
              <strong className="priority-task-title">{t.title}</strong>
              <span className="priority-proj-sub">{t.projectName}</span>

              {t.isBlocked && (
                <div className="inline-blocker-pill">
                  <ShieldAlert size={12} />
                  <span>BLOCKED: {t.blockerReason}</span>
                </div>
              )}

              <div className="priority-task-footer">
                <div className="mini-progress-track">
                  <div 
                    className="mini-progress-fill" 
                    style={{ width: `${t.progress}%` }} 
                  />
                </div>
                <span className="mini-progress-num">{t.progress}%</span>
                <span className="mini-status-chip">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MY WORKLOAD GAUGE & CONFLICT BANNER */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <BarChart3 size={18} className="text-teal" />
            <h3 className="section-title">My Workload & Capacity</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={onOpenWorkloadModal}
          >
            <span>Deep Dive</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="workload-summary-card">
          <div className="workload-summary-top">
            <div>
              <span className="load-level-label">Capacity Utilization</span>
              <div className="load-value-row">
                <strong className="load-big-val" style={{ color: workloadTier.color }}>
                  {kpis.workloadPct}%
                </strong>
                <span 
                  className="workload-state-pill"
                  style={{ backgroundColor: workloadTier.bg, color: workloadTier.color }}
                >
                  {workloadTier.label}
                </span>
              </div>
            </div>
            <div className="load-hours-col">
              <span className="hours-stat"><strong>{kpis.assignedHours} hrs</strong> assigned</span>
              <span className="hours-sub">of 40h standard week</span>
            </div>
          </div>

          <div className="workload-track">
            <div 
              className="workload-fill" 
              style={{ width: `${kpis.workloadPct}%`, backgroundColor: workloadTier.color }} 
            />
          </div>

          {/* Conflict Alert Banner */}
          {employee.schedulingConflicts && employee.schedulingConflicts.length > 0 && (
            <div className="dashboard-conflict-callout">
              <ShieldAlert size={18} className="text-rose" />
              <div className="callout-body">
                <strong>Potential Milestone Clash Detected</strong>
                <p>Overlapping deadlines between PRJ-001 and PRJ-002 on Oct 24-25.</p>
              </div>
              <button 
                type="button" 
                className="callout-action-btn"
                onClick={() => onOpenSupportRequest({
                  type: 'Deadline Conflict',
                  description: 'Overlapping deadlines between PRJ-001 and PRJ-002. Requesting review.'
                })}
              >
                Request Help
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MY PROJECTS SECTION */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <Briefcase size={18} className="text-cyan" />
            <h3 className="section-title">My Projects ({projects.length})</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={() => onNavigateTab('projects')}
          >
            <span>All Projects</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="projects-card-stack">
          {projects.map((p) => (
            <div 
              key={p.id} 
              className="project-summary-card"
              onClick={() => onOpenProjectDetail(p)}
            >
              <div className="project-card-header">
                <div>
                  <strong className="proj-title">{p.name}</strong>
                  <span className="proj-role-text">{p.employeeRole}</span>
                </div>
                <span className="project-status-badge active">{p.status}</span>
              </div>

              <div className="project-milestone-row">
                <Target size={14} className="text-teal" />
                <span>Next: <strong>{p.nextMilestone}</strong> ({p.milestoneDate})</span>
              </div>

              <div className="project-card-bottom">
                <div className="project-progress-wrap">
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill fill-teal" 
                      style={{ width: `${p.progress}%` }} 
                    />
                  </div>
                </div>
                <span className="proj-pct">{p.progress}%</span>
                <span className="proj-deadline-tag">Due {p.deadline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI PERSONAL INSIGHTS */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <Sparkles size={18} className="text-purple" />
            <h3 className="section-title">AI Personal Insights</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={() => onNavigateTab('ai')}
          >
            <span>Ask Copilot</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="ai-insights-stack">
          {/* Priority order insight */}
          <div className="ai-insight-card">
            <div className="insight-badge-row">
              <span className="ai-tag-pill">Task Ordering</span>
              <span className="ai-reason-pill">Urgency Heuristic</span>
            </div>
            <strong className="insight-heading">Prioritize TSK-103 Memory Leak Resolution First</strong>
            <p className="insight-text">
              Due tomorrow (Oct 16) and required before HIPAA pen-testing begins on Oct 24.
            </p>
            <button 
              type="button" 
              className="insight-action-link"
              onClick={() => {
                const t = tasks.find(tsk => tsk.id === 'TSK-103');
                if (t) onOpenTaskDetail(t);
              }}
            >
              Open TSK-103 Controls →
            </button>
          </div>

          {/* Workload insight */}
          <div className="ai-insight-card">
            <div className="insight-badge-row">
              <span className="ai-tag-pill">Capacity Alert</span>
              <span className="ai-reason-pill">Overload Model</span>
            </div>
            <strong className="insight-heading">92% Workload with Overlapping Deliverables</strong>
            <p className="insight-text">
              Recommend submitting a Workload Support Request to delegate Prometheus telemetry tasks.
            </p>
            <button 
              type="button" 
              className="insight-action-link"
              onClick={() => onOpenSupportRequest({
                type: 'Workload Support',
                description: 'Capacity rebalancing for upcoming Oct 24 milestone.'
              })}
            >
              Draft Support Request →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
