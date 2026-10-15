import React from 'react';
import { 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

export function WorkloadModal({ 
  employee, 
  tasks = [], 
  onClose, 
  onOpenSupportRequest 
}) {
  if (!employee) return null;

  const workloadPct = employee.workload || 92;
  const assignedHours = employee.assignedHours || 37;
  const plannedCapacityHours = employee.plannedCapacityHours || 40;
  const availableHours = employee.availableHours || 3;
  const conflicts = employee.schedulingConflicts || [];
  const weeklyTrends = employee.weeklyWorkloadTrends || [
    { week: 'W1 (Past)', assigned: 36, capacity: 40, loadPct: 90 },
    { week: 'W2 (Current)', assigned: 37, capacity: 40, loadPct: 92 },
    { week: 'W3 (Next)', assigned: 38, capacity: 40, loadPct: 95 },
    { week: 'W4 (Upcoming)', assigned: 34, capacity: 40, loadPct: 85 }
  ];

  const getTierInfo = (pct) => {
    if (pct >= 90) return { label: 'OVERLOADED', color: '#f43f5e', bg: '#fff1f2', text: 'Workload exceeds sustainable thresholds. Proactive manager rebalance recommended.' };
    if (pct >= 75) return { label: 'HIGH LOAD', color: '#f59e0b', bg: '#fefce8', text: 'High capacity utilization with limited buffer for unscheduled emergencies.' };
    if (pct >= 30) return { label: 'OPTIMAL / HEALTHY', color: '#10b981', bg: '#f0fdf4', text: 'Balanced allocation within target 40h standard working capacity.' };
    return { label: 'UNDERUTILIZED', color: '#38bdf8', bg: '#f0f9ff', text: 'Available capacity exists for new project tasks or upskilling tracks.' };
  };

  const tier = getTierInfo(workloadPct);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span 
              className="tier-badge" 
              style={{ backgroundColor: tier.bg, color: tier.color, borderColor: tier.color }}
            >
              {tier.label} ({workloadPct}%)
            </span>
            <span className="task-id-tag">Capacity Monitor</span>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {/* Main Workload Gauge Card */}
          <div className="workload-summary-hero">
            <h2 className="workload-hero-title">Workload & Capacity Analysis</h2>
            <p className="workload-hero-subtitle">
              Measured against organizational 40-hour planned capacity standard
            </p>

            <div className="workload-gauge-box">
              <div className="gauge-metric-main">
                <span className="gauge-number" style={{ color: tier.color }}>{workloadPct}%</span>
                <span className="gauge-sub">Current Assigned Allocation</span>
              </div>
              <div className="gauge-breakdown-row">
                <div className="gauge-pill">
                  <span className="pill-muted">Assigned</span>
                  <strong>{assignedHours} hrs / wk</strong>
                </div>
                <div className="gauge-pill">
                  <span className="pill-muted">Planned Capacity</span>
                  <strong>{plannedCapacityHours} hrs / wk</strong>
                </div>
                <div className="gauge-pill">
                  <span className="pill-muted">Remaining Buffer</span>
                  <strong>{availableHours} hrs / wk</strong>
                </div>
              </div>
            </div>

            {/* Visual Gauge Bar */}
            <div className="workload-track-wrapper">
              <div className="workload-track">
                <div 
                  className="workload-fill" 
                  style={{ width: `${Math.min(100, workloadPct)}%`, backgroundColor: tier.color }} 
                />
              </div>
              <div className="track-threshold-marker" style={{ left: '85%' }}>
                <span className="threshold-label">85% Limit</span>
              </div>
            </div>

            <p className="tier-explanation-text">{tier.text}</p>
          </div>

          {/* Workload Assistance Box if Overloaded */}
          {workloadPct >= 85 && (
            <div className="workload-assistance-card">
              <div className="assistance-header">
                <ShieldAlert size={22} className="assistance-icon" />
                <div>
                  <h4 className="assistance-title">Workload Assistance & Recommendation</h4>
                  <p className="assistance-desc">
                    Your active assignments are at {workloadPct}%. You have critical overlapping project milestones approaching next week.
                  </p>
                </div>
              </div>
              <div className="assistance-action-strip">
                <button 
                  type="button" 
                  className="submit-assistance-req-btn"
                  onClick={() => {
                    onClose();
                    onOpenSupportRequest({
                      type: 'Workload Support',
                      description: `Workload at ${workloadPct}% (${assignedHours} hrs assigned). Requesting temporary capacity assistance for upcoming milestone deadlines.`,
                      priority: 'High'
                    });
                  }}
                >
                  <span>Submit Workload Support Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Detected Scheduling Conflicts */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <AlertTriangle size={16} className="text-amber" />
              <span>Detected Scheduling Conflicts ({conflicts.length})</span>
            </h4>

            {conflicts.length === 0 ? (
              <div className="empty-sub-state">
                <CheckCircle2 size={24} className="text-emerald" />
                <p>No conflicting milestone deadlines detected on your calendar.</p>
              </div>
            ) : (
              <div className="conflicts-list">
                {conflicts.map((conf) => (
                  <div key={conf.id} className="conflict-item-card">
                    <div className="conflict-header-row">
                      <span className="conflict-severity-tag">{conf.severity} Severity</span>
                      <span className="conflict-date">{conf.date}</span>
                    </div>
                    <strong className="conflict-title">{conf.title}</strong>
                    <div className="conflict-projects-involved">
                      <span className="proj-tag">{conf.projectA}</span>
                      <span className="vs-tag">vs</span>
                      <span className="proj-tag">{conf.projectB}</span>
                    </div>
                    <p className="conflict-desc">{conf.description}</p>
                    
                    <button 
                      type="button" 
                      className="conflict-action-link"
                      onClick={() => {
                        onClose();
                        onOpenSupportRequest({
                          type: 'Deadline Conflict',
                          description: `Scheduling conflict detected: ${conf.title} (${conf.projectA} & ${conf.projectB}). Requesting milestone sequencing review.`,
                          priority: 'High'
                        });
                      }}
                    >
                      Report this Conflict to Management →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weekly Workload Trend (Visual Bar Chart) */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <TrendingUp size={16} />
              <span>4-Week Capacity Projection</span>
            </h4>

            <div className="weekly-trend-chart">
              {weeklyTrends.map((trend, i) => (
                <div key={i} className="trend-bar-column">
                  <div className="trend-bar-val">{trend.loadPct}%</div>
                  <div className="trend-bar-track">
                    <div 
                      className="trend-bar-fill" 
                      style={{ 
                        height: `${Math.min(100, trend.loadPct)}%`,
                        backgroundColor: trend.loadPct >= 90 ? '#f43f5e' : (trend.loadPct >= 75 ? '#f59e0b' : '#10b981')
                      }} 
                    />
                  </div>
                  <span className="trend-bar-label">{trend.week.split(' ')[0]}</span>
                  <span className="trend-hours-label">{trend.assigned}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Commitments & Deadlines */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <Calendar size={16} />
              <span>Upcoming Assignment Deadlines</span>
            </h4>
            <div className="commitments-list">
              {tasks.filter(t => t.status !== 'Completed').slice(0, 4).map((task) => (
                <div key={task.id} className="commitment-row">
                  <div className="commitment-meta">
                    <strong>{task.title}</strong>
                    <span className="commitment-proj">{task.projectName}</span>
                  </div>
                  <div className="commitment-right">
                    <span className="commitment-due">{task.dueDate}</span>
                    <span className="commitment-load">{task.estimatedHours || 8} hrs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boundaries Notice */}
          <div className="official-boundary-notice">
            <Info size={15} />
            <span>
              Official capacity limits are managed by organizational workforce policies. Workload indicators provide operational visibility to facilitate support.
            </span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="modal-sticky-footer">
          <button 
            type="button" 
            className="android-btn-primary btn-block"
            onClick={() => {
              onClose();
              onOpenSupportRequest({
                type: 'Workload Support',
                description: `Workload at ${workloadPct}%. Requesting allocation assistance.`,
                priority: 'High'
              });
            }}
          >
            Request Workload Support
          </button>
        </div>
      </div>
    </div>
  );
}
