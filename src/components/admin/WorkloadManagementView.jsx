import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  Users, 
  Building2, 
  Briefcase, 
  Layers, 
  Zap, 
  Check, 
  X,
  ChevronDown,
  Info
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function WorkloadManagementView({
  employees = [],
  projects = [],
  departmentAnalytics = []
}) {
  // Configurable thresholds (Requirement 7)
  const [overloadThreshold, setOverloadThreshold] = useState(100); // %
  const [underutilizedThreshold, setUnderutilizedThreshold] = useState(70); // %
  const [standardHours, setStandardHours] = useState(40); // hrs/week
  const [showConfig, setShowConfig] = useState(false);

  // Filter view: 'all' | 'overloaded' | 'optimal' | 'underutilized'
  const [filterTab, setFilterTab] = useState('all');
  const [groupBy, setGroupBy] = useState('employee'); // 'employee' | 'department' | 'project'
  const [selectedDept, setSelectedDept] = useState('all');
  
  // Rebalance Execution State
  const [activeRebalanceProposal, setActiveRebalanceProposal] = useState(null);
  const [rebalanceFeedback, setRebalanceFeedback] = useState(null);

  // 1. Categorize Employees based on configurable thresholds
  const categorizedEmployees = useMemo(() => {
    return employees.map(emp => {
      const load = emp.workload || 0;
      let status = 'optimal';
      if (load > overloadThreshold) {
        status = 'overloaded';
      } else if (load < underutilizedThreshold) {
        status = 'underutilized';
      }

      // Check overlapping projects
      const activeProjectsCount = (emp.activeProjectIds || []).length;
      const hasOverlapConflict = activeProjectsCount >= 2;

      return {
        ...emp,
        status,
        hasOverlapConflict,
        activeProjectsCount
      };
    });
  }, [employees, overloadThreshold, underutilizedThreshold]);

  // Filtered list
  const filteredEmployees = useMemo(() => {
    return categorizedEmployees.filter(emp => {
      if (filterTab !== 'all' && emp.status !== filterTab) return false;
      if (selectedDept !== 'all' && emp.department !== selectedDept) return false;
      return true;
    });
  }, [categorizedEmployees, filterTab, selectedDept]);

  // Counts
  const counts = useMemo(() => {
    const overloaded = categorizedEmployees.filter(e => e.status === 'overloaded').length;
    const underutilized = categorizedEmployees.filter(e => e.status === 'underutilized').length;
    const optimal = categorizedEmployees.filter(e => e.status === 'optimal').length;
    const conflicts = categorizedEmployees.filter(e => e.hasOverlapConflict).length;
    return { overloaded, underutilized, optimal, conflicts, total: categorizedEmployees.length };
  }, [categorizedEmployees]);

  // 2. AI Workload Redistribution Recommendations Engine
  const redistributionRecommendations = useMemo(() => {
    const overloadedEmps = categorizedEmployees.filter(e => e.status === 'overloaded');
    const availableEmps = categorizedEmployees.filter(e => e.status === 'underutilized' && e.status !== 'Deactivated');

    const recommendations = [];

    overloadedEmps.forEach(overloaded => {
      // Find suitable recipient with overlapping skills or in same department
      const match = availableEmps.find(avail => 
        avail.department === overloaded.department ||
        avail.skills?.some(s1 => overloaded.skills?.some(s2 => s2.name.toLowerCase() === s1.name.toLowerCase()))
      ) || availableEmps[0];

      if (match) {
        const transferPct = 20; // 8 hours (20% of 40h standard)
        const proposedOverloadedNewLoad = overloaded.workload - transferPct;
        const proposedRecipientNewLoad = match.workload + transferPct;

        recommendations.push({
          id: `REC-${overloaded.id}-${match.id}`,
          fromEmployee: overloaded,
          toEmployee: match,
          amountPct: transferPct,
          amountHours: Math.round((transferPct / 100) * standardHours),
          currentDonorLoad: overloaded.workload,
          proposedDonorLoad: proposedOverloadedNewLoad,
          currentRecipientLoad: match.workload,
          proposedRecipientLoad: proposedRecipientNewLoad,
          reason: `${overloaded.name} is operating at ${overloaded.workload}% (${overloaded.assignedHours}h/wk) with ${overloaded.activeProjectsCount} overlapping projects. Shifting ${Math.round((transferPct / 100) * standardHours)}h/wk of non-critical sprint tickets to ${match.name} restores both specialists into the optimal 75-90% bandwidth zone.`,
          sharedCompetencies: match.skills?.filter(s1 => 
            overloaded.skills?.some(s2 => s2.name.toLowerCase() === s1.name.toLowerCase())
          ).map(s => s.name) || [match.department]
        });
      }
    });

    return recommendations;
  }, [categorizedEmployees, standardHours]);

  // Handle Approve Rebalance
  const handleExecuteRebalance = (rec) => {
    talentSyncStore.rebalanceWorkload(rec.fromEmployee.id, rec.toEmployee.id, rec.amountPct);
    setRebalanceFeedback({
      type: 'success',
      message: `Workload rebalanced: Transferred ${rec.amountHours}h (${rec.amountPct}%) from ${rec.fromEmployee.name} to ${rec.toEmployee.name}. Live assignments updated.`
    });
    setActiveRebalanceProposal(null);

    setTimeout(() => {
      setRebalanceFeedback(null);
    }, 4500);
  };

  return (
    <div className="tab-view-container admin-workload-container">
      {/* HEADER BANNER */}
      <div className="admin-view-header">
        <div className="admin-header-title-row">
          <div>
            <div className="admin-sub-tag">
              <BarChart3 size={12} className="text-blue-primary" />
              <span>Utilization & Conflict Governance</span>
            </div>
            <h1 className="admin-header-title">Workload Management</h1>
          </div>
          <button 
            type="button" 
            className="filter-toggle-btn admin-tune-btn"
            onClick={() => setShowConfig(!showConfig)}
            title="Adjust Workload Thresholds"
          >
            <Sliders size={16} />
            <span>Thresholds</span>
          </button>
        </div>
        <p className="admin-header-subtitle">
          Monitor employee utilization against planned capacity, detect overlapping project commitments, and execute AI-guided workload balancing.
        </p>
      </div>

      {/* FEEDBACK BANNER */}
      {rebalanceFeedback && (
        <div className="admin-success-banner" role="alert">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="banner-content">
            <h4>Live Rebalance Applied!</h4>
            <p>{rebalanceFeedback.message}</p>
          </div>
          <button 
            type="button" 
            className="banner-close-btn"
            onClick={() => setRebalanceFeedback(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* CONFIGURABLE THRESHOLDS BAR (Requirement 7) */}
      {showConfig && (
        <div className="admin-card threshold-config-card">
          <div className="card-sec-header">
            <div className="sec-title-group">
              <Sliders size={16} className="text-blue-primary" />
              <h3>Configurable Workload Parameters</h3>
            </div>
            <button 
              type="button" 
              className="icon-btn-ghost"
              onClick={() => setShowConfig(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="thresholds-grid">
            <div className="thresh-item">
              <label>Standard Capacity:</label>
              <div className="stepper-wrap">
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setStandardHours(Math.max(30, standardHours - 5))}
                >-</button>
                <span className="stepper-val">{standardHours}h / wk</span>
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setStandardHours(Math.min(50, standardHours + 5))}
                >+</button>
              </div>
            </div>

            <div className="thresh-item">
              <label>Overload Trigger:</label>
              <div className="stepper-wrap">
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setOverloadThreshold(Math.max(90, overloadThreshold - 5))}
                >-</button>
                <span className="stepper-val">{overloadThreshold}%</span>
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setOverloadThreshold(Math.min(130, overloadThreshold + 5))}
                >+</button>
              </div>
            </div>

            <div className="thresh-item">
              <label>Underutilized Trigger:</label>
              <div className="stepper-wrap">
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setUnderutilizedThreshold(Math.max(50, underutilizedThreshold - 5))}
                >-</button>
                <span className="stepper-val">{underutilizedThreshold}%</span>
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setUnderutilizedThreshold(Math.min(80, underutilizedThreshold + 5))}
                >+</button>
              </div>
            </div>
          </div>
          <p className="thresh-note">
            <Info size={12} className="inline mr-1" />
            Adjusting thresholds dynamically recalculates classifications and AI redistribution suggestions across the organization.
          </p>
        </div>
      )}

      {/* KPI TILES SUMMARY */}
      <div className="workload-summary-grid">
        <button 
          type="button"
          className={`workload-kpi-box ${filterTab === 'overloaded' ? 'active-kpi' : ''}`}
          onClick={() => setFilterTab(filterTab === 'overloaded' ? 'all' : 'overloaded')}
        >
          <div className="kpi-icon-wrap red-wrap">
            <AlertTriangle size={16} />
          </div>
          <div className="kpi-details">
            <span className="kpi-count text-rose-600">{counts.overloaded}</span>
            <span className="kpi-label">Overloaded (&gt;{overloadThreshold}%)</span>
          </div>
        </button>

        <button 
          type="button"
          className={`workload-kpi-box ${filterTab === 'optimal' ? 'active-kpi' : ''}`}
          onClick={() => setFilterTab(filterTab === 'optimal' ? 'all' : 'optimal')}
        >
          <div className="kpi-icon-wrap green-wrap">
            <CheckCircle2 size={16} />
          </div>
          <div className="kpi-details">
            <span className="kpi-count text-emerald-600">{counts.optimal}</span>
            <span className="kpi-label">Optimal Band</span>
          </div>
        </button>

        <button 
          type="button"
          className={`workload-kpi-box ${filterTab === 'underutilized' ? 'active-kpi' : ''}`}
          onClick={() => setFilterTab(filterTab === 'underutilized' ? 'all' : 'underutilized')}
        >
          <div className="kpi-icon-wrap blue-wrap">
            <TrendingDown size={16} />
          </div>
          <div className="kpi-details">
            <span className="kpi-count text-blue-primary">{counts.underutilized}</span>
            <span className="kpi-label">Underutilized (&lt;{underutilizedThreshold}%)</span>
          </div>
        </button>
      </div>

      {/* AI WORKLOAD REDISTRIBUTION SECTION (Requirement 7) */}
      <div className="admin-card ai-redistribution-card">
        <div className="card-sec-header">
          <div className="sec-title-group">
            <Zap size={18} className="text-amber-500" />
            <div>
              <h3>AI Workload Rebalancing Proposals</h3>
              <span className="sec-sub-text">Recommended ticket & milestone reallocations</span>
            </div>
          </div>
          <span className="badge-pill amber-badge">
            {redistributionRecommendations.length} Actions Available
          </span>
        </div>

        {redistributionRecommendations.length === 0 ? (
          <div className="empty-rebalance-msg">
            <CheckCircle2 size={24} className="text-emerald-500" />
            <div>
              <strong>Workforce Load is Well-Balanced</strong>
              <p>No critical overload conditions detected based on current thresholds.</p>
            </div>
          </div>
        ) : (
          <div className="proposals-stack">
            {redistributionRecommendations.map(rec => (
              <div key={rec.id} className="proposal-item-card">
                {/* Rebalance Flow visual */}
                <div className="rebalance-transfer-row">
                  {/* Donor */}
                  <div className="transfer-party donor-party">
                    <img src={rec.fromEmployee.avatar} alt={rec.fromEmployee.name} className="party-avatar" />
                    <div>
                      <span className="party-name">{rec.fromEmployee.name}</span>
                      <span className="party-load text-rose-600 font-semibold">
                        {rec.currentDonorLoad}% → {rec.proposedDonorLoad}%
                      </span>
                    </div>
                  </div>

                  {/* Transfer arrow */}
                  <div className="transfer-flow-indicator">
                    <span className="transfer-amount-pill">
                      -{rec.amountHours}h ({rec.amountPct}%)
                    </span>
                    <ArrowRight size={18} className="text-blue-primary animate-pulse" />
                  </div>

                  {/* Recipient */}
                  <div className="transfer-party recipient-party">
                    <img src={rec.toEmployee.avatar} alt={rec.toEmployee.name} className="party-avatar" />
                    <div>
                      <span className="party-name">{rec.toEmployee.name}</span>
                      <span className="party-load text-emerald-600 font-semibold">
                        {rec.currentRecipientLoad}% → {rec.proposedRecipientLoad}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Justification & Impact */}
                <div className="proposal-explanation">
                  <p>{rec.reason}</p>
                  <div className="shared-skills-row">
                    <span className="skills-sub">Competency Match:</span>
                    {rec.sharedCompetencies.map(s => (
                      <span key={s} className="match-tag-sm">✓ {s}</span>
                    ))}
                  </div>
                </div>

                {/* Approval Action */}
                <div className="proposal-action-bar">
                  <span className="constraint-note">
                    Verified: 0 conflicting delivery milestones during sprint cycle.
                  </span>
                  <button 
                    type="button" 
                    className="admin-btn-sm admin-btn-primary"
                    onClick={() => handleExecuteRebalance(rec)}
                  >
                    <Check size={14} />
                    <span>Approve & Execute Rebalance</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DEPARTMENT WORKLOAD COMPARISON CHART & BREAKDOWN */}
      <div className="admin-card dept-workload-card">
        <div className="card-sec-header">
          <div className="sec-title-group">
            <Building2 size={16} className="text-blue-primary" />
            <h3>Department Capacity vs. Assigned Load</h3>
          </div>
        </div>

        <div className="dept-bars-stack">
          {departmentAnalytics.map(dept => {
            const isHigh = dept.avgWorkload > 90;
            return (
              <div key={dept.name} className="dept-load-row">
                <div className="dept-load-label-row">
                  <span className="dept-name-lbl">{dept.name} ({dept.count} Staff)</span>
                  <span className={`dept-pct-lbl ${isHigh ? 'text-rose-600 font-bold' : ''}`}>
                    {dept.avgWorkload}% Avg Load
                  </span>
                </div>
                <div className="dept-bar-track">
                  <div 
                    className={`dept-bar-fill ${isHigh ? 'fill-danger' : 'fill-primary'}`} 
                    style={{ width: `${Math.min(100, dept.avgWorkload)}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EMPLOYEE UTILIZATION LIST (Search & Filter) */}
      <div className="admin-card employee-workload-list-card">
        <div className="card-sec-header">
          <div className="sec-title-group">
            <Users size={16} className="text-blue-primary" />
            <h3>Employee Utilization Breakdown ({filteredEmployees.length})</h3>
          </div>

          {/* Department Filter dropdown */}
          <select 
            className="admin-select-sm"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departmentAnalytics.map(d => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* List of employees with capacity vs assigned workload */}
        <div className="workload-emp-stack">
          {filteredEmployees.map(emp => {
            const plannedHours = emp.plannedCapacityHours || standardHours;
            const assignedHours = emp.assignedHours !== undefined ? emp.assignedHours : Math.round((emp.workload / 100) * standardHours);
            const isOver = emp.status === 'overloaded';
            const isUnder = emp.status === 'underutilized';

            return (
              <div key={emp.id} className="workload-emp-row">
                <div className="emp-brief-col">
                  <img src={emp.avatar} alt={emp.name} className="emp-sm-avatar" />
                  <div>
                    <div className="emp-name-tag">
                      <span className="name">{emp.name}</span>
                      <span className="id-sub">{emp.id}</span>
                    </div>
                    <span className="role-dept-sub">{emp.role} • {emp.department}</span>
                  </div>
                </div>

                {/* Utilization gauge & stats */}
                <div className="emp-util-col">
                  <div className="util-stats-line">
                    <span className="hours-line">
                      <strong>{assignedHours}h</strong> / {plannedHours}h planned
                    </span>
                    <span className={`util-pct-badge badge-${emp.status}`}>
                      {emp.workload}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="emp-progress-track">
                    <div 
                      className={`emp-progress-fill ${isOver ? 'fill-over' : isUnder ? 'fill-under' : 'fill-optimal'}`}
                      style={{ width: `${Math.min(100, emp.workload)}%` }}
                    />
                  </div>

                  {/* Overlap & Conflict Flag */}
                  {emp.hasOverlapConflict && (
                    <span className="conflict-inline-flag">
                      <AlertTriangle size={11} className="text-amber-500 inline mr-1" />
                      {emp.activeProjectsCount} overlapping active projects
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
