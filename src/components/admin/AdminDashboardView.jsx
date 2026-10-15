import React from 'react';
import { 
  Users, 
  Briefcase, 
  Activity, 
  AlertTriangle, 
  TrendingDown, 
  FileText, 
  UserPlus, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  ChevronRight, 
  Layers, 
  BarChart3, 
  GraduationCap, 
  SlidersHorizontal,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Building2,
  PieChart
} from 'lucide-react';

export function AdminDashboardView({
  kpis,
  departmentAnalytics = [],
  projects = [],
  employees = [],
  alerts = [],
  onNavigateTab,
  onOpenProjects,
  onOpenRequests,
  onOpenAlerts,
  onOpenSkills,
  onOpenReports
}) {
  const criticalAlerts = alerts.filter(a => !a.resolved).slice(0, 3);

  return (
    <div className="tab-view-container admin-dashboard-container">
      {/* Overview Hero Card */}
      <div className="admin-hero-overview-card">
        <div className="admin-hero-top">
          <div>
            <span className="admin-sub-tag">Organizational Intelligence</span>
            <h1 className="admin-hero-heading">Workforce Overview</h1>
            <p className="admin-hero-desc">
              Live capacity monitoring, AI staffing optimization, and resource governance across departments.
            </p>
          </div>
          <div className="utilization-gauge-pill">
            <span className="gauge-pct-text">{kpis.workforceUtilizationPct}%</span>
            <span className="gauge-pct-sub">Org Utilization</span>
          </div>
        </div>

        {/* Global Utilization Progress */}
        <div className="global-util-wrap">
          <div className="util-bar-track">
            <div 
              className="util-bar-fill" 
              style={{ width: `${Math.min(100, kpis.workforceUtilizationPct)}%` }} 
            />
          </div>
          <div className="util-labels-row">
            <span>Target: 75% - 85% Optimal Band</span>
            <span>Capacity: 40h standard/employee</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD SHORTCUTS BAR (Section 4 Requirement) */}
      <div className="admin-shortcuts-scroll">
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={() => onNavigateTab('workforce')}
        >
          <Users size={14} />
          <span>Directory</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={() => onNavigateTab('team-builder')}
        >
          <Sparkles size={14} />
          <span>AI Team Builder</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={() => onNavigateTab('workload')}
        >
          <BarChart3 size={14} />
          <span>Workload & Conflicts</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={onOpenProjects}
        >
          <Briefcase size={14} />
          <span>Projects</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={onOpenRequests}
        >
          <FileText size={14} />
          <span>Requests ({kpis.pendingRequests})</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={onOpenSkills}
        >
          <GraduationCap size={14} />
          <span>Skills Inventory</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={onOpenAlerts}
        >
          <ShieldAlert size={14} />
          <span>Alerts ({alerts.filter(a => !a.resolved).length})</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={() => onNavigateTab('planning')}
        >
          <SlidersHorizontal size={14} />
          <span>Simulator</span>
        </button>
        <button 
          type="button" 
          className="admin-shortcut-chip"
          onClick={onOpenReports}
        >
          <FileSpreadsheet size={14} />
          <span>Reports & CSV</span>
        </button>
      </div>

      {/* 8 DYNAMIC KPI CARDS (Requirement 4) */}
      <div className="admin-kpi-grid">
        {/* 1. Total Employees */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('workforce')}
        >
          <div className="kpi-icon-wrap bg-blue-subtle text-blue-primary">
            <Users size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Total Employees</span>
            <strong className="admin-kpi-value">{kpis.totalEmployees}</strong>
            <span className="admin-kpi-hint">Across 6 departments</span>
          </div>
        </div>

        {/* 2. Available Employees */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('workforce')}
        >
          <div className="kpi-icon-wrap bg-emerald-subtle text-emerald">
            <CheckCircle2 size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Available Talent</span>
            <strong className="admin-kpi-value text-emerald">{kpis.availableEmployees}</strong>
            <span className="admin-kpi-hint">&lt;35% utilization</span>
          </div>
        </div>

        {/* 3. Active Projects */}
        <div 
          className="admin-kpi-card"
          onClick={onOpenProjects}
        >
          <div className="kpi-icon-wrap bg-indigo-subtle text-indigo">
            <Briefcase size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Active Projects</span>
            <strong className="admin-kpi-value text-indigo">{kpis.activeProjects}</strong>
            <span className="admin-kpi-hint">{projects.filter(p => p.status === 'Upcoming').length} upcoming</span>
          </div>
        </div>

        {/* 4. Workforce Utilization */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('workload')}
        >
          <div className="kpi-icon-wrap bg-cyan-subtle text-cyan">
            <Activity size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Avg Utilization</span>
            <strong className="admin-kpi-value text-cyan">{kpis.workforceUtilizationPct}%</strong>
            <span className="admin-kpi-hint">Organization-wide</span>
          </div>
        </div>

        {/* 5. Overloaded Employees */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('workload')}
        >
          <div className="kpi-icon-wrap bg-rose-subtle text-rose">
            <AlertTriangle size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Overloaded Staff</span>
            <strong className="admin-kpi-value text-rose">{kpis.overloadedEmployees}</strong>
            <span className="admin-kpi-hint">&gt;85% threshold</span>
          </div>
        </div>

        {/* 6. Underutilized Employees */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('workload')}
        >
          <div className="kpi-icon-wrap bg-amber-subtle text-amber">
            <TrendingDown size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Underutilized</span>
            <strong className="admin-kpi-value text-amber">{kpis.underutilizedEmployees}</strong>
            <span className="admin-kpi-hint">Bench capacity</span>
          </div>
        </div>

        {/* 7. Pending Resource Requests */}
        <div 
          className="admin-kpi-card"
          onClick={onOpenRequests}
        >
          <div className="kpi-icon-wrap bg-purple-subtle text-purple">
            <FileText size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Pending Requests</span>
            <strong className="admin-kpi-value text-purple">{kpis.pendingRequests}</strong>
            <span className="admin-kpi-hint">Awaiting manager review</span>
          </div>
        </div>

        {/* 8. Unfilled Project Positions */}
        <div 
          className="admin-kpi-card"
          onClick={() => onNavigateTab('team-builder')}
        >
          <div className="kpi-icon-wrap bg-orange-subtle text-orange">
            <UserPlus size={18} />
          </div>
          <div className="kpi-content-col">
            <span className="admin-kpi-label">Unfilled Positions</span>
            <strong className="admin-kpi-value text-orange">{kpis.unfilledPositions}</strong>
            <span className="admin-kpi-hint">Staffing shortfall</span>
          </div>
        </div>
      </div>

      {/* RESOURCE ALERTS SECTION (Requirement 4 & 10) */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <ShieldAlert size={18} className="text-rose" />
            <h3 className="section-title">Critical Resource Alerts</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={onOpenAlerts}
          >
            <span>View All ({alerts.filter(a => !a.resolved).length})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="admin-alerts-stack">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className={`admin-alert-banner ${alert.severity.toLowerCase()}`}>
              <div className="alert-badge-col">
                <span className={`alert-sev-pill ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>
                <span className="alert-type-name">{alert.type}</span>
              </div>

              <div className="alert-text-col">
                <strong className="alert-main-title">{alert.title}</strong>
                <p className="alert-main-msg">{alert.message}</p>
              </div>

              <button 
                type="button" 
                className="alert-quick-act-btn"
                onClick={onOpenAlerts}
              >
                <span>Inspect Alert</span>
                <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* VISUAL CHARTS SECTION (Requirement 4) */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <BarChart3 size={18} className="text-blue-primary" />
            <h3 className="section-title">Workforce Utilization & Department Distribution</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={onOpenReports}
          >
            <span>Export CSV</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Department Workforce & Workload Bars */}
        <div className="department-analytics-card">
          <span className="chart-sub-caption">Department-wise Headcount & Workload Utilization</span>
          <div className="dept-bars-list">
            {departmentAnalytics.map((dept, i) => (
              <div key={i} className="dept-bar-row">
                <div className="dept-name-col">
                  <strong>{dept.name}</strong>
                  <span>{dept.count} engineers</span>
                </div>

                <div className="dept-metric-track">
                  <div 
                    className="dept-metric-fill" 
                    style={{ 
                      width: `${Math.min(100, dept.avgWorkload)}%`,
                      backgroundColor: dept.avgWorkload >= 85 ? '#ef4444' : (dept.avgWorkload >= 60 ? '#2563eb' : '#10b981')
                    }} 
                  />
                </div>

                <span className="dept-pct-label">{dept.avgWorkload}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI WORKFORCE INSIGHTS SECTION (Requirement 4) */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <Sparkles size={18} className="text-purple" />
            <h3 className="section-title">AI Workforce Insights & Recommendations</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={() => onNavigateTab('team-builder')}
          >
            <span>Run Team Builder</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="ai-insights-stack">
          {/* Workload insight */}
          <div className="admin-insight-box">
            <div className="insight-top-pill-row">
              <span className="ai-tag-pill">Capacity Optimization</span>
              <span className="ai-reason-pill">Overload Heuristic</span>
            </div>
            <strong className="insight-title-text">
              Rebalance Rahul Sharma (92%) to Priya Patel (35%)
            </strong>
            <p className="insight-body-text">
              Transferring 20% telemetry workload frees 8 hours on Rahul Sharma, mitigating delivery failure for the critical Oct 24 milestone.
            </p>
            <button 
              type="button" 
              className="insight-cta-btn"
              onClick={() => onNavigateTab('workload')}
            >
              <span>Execute Rebalance in Workload Manager</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Project staffing insight */}
          <div className="admin-insight-box">
            <div className="insight-top-pill-row">
              <span className="ai-tag-pill">Staffing Gap</span>
              <span className="ai-reason-pill">Timeline Constraint</span>
            </div>
            <strong className="insight-title-text">
              PRJ-005 CyberShield Kickoff in 16 Days (0/4 Staffed)
            </strong>
            <p className="insight-body-text">
              AI Team Builder identifies Zoe Martinez (Security Expert) and Alex Thorne as high-match candidates for immediate staffing.
            </p>
            <button 
              type="button" 
              className="insight-cta-btn"
              onClick={() => onNavigateTab('team-builder')}
            >
              <span>Open AI Team Builder for PRJ-005</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
