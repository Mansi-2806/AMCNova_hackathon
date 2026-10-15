import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  Activity, 
  Layers, 
  Calendar, 
  Zap, 
  ArrowRight,
  Filter,
  Check,
  Building2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function PlanningSimulatorView({
  employees = [],
  projects = [],
  kpis = {},
  departmentAnalytics = []
}) {
  // Top Sub-tab Toggle: 'simulator' vs 'reports'
  const [activeSubTab, setActiveSubTab] = useState('simulator');

  // SIMULATION STATE
  // Pre-configured scenario presets (Requirement 11)
  const SCENARIO_PRESETS = [
    {
      id: 'urgent-project',
      title: 'Emergency Project Injection',
      desc: 'Introduce a priority "GovSecure Compliance" project requiring 3 senior cloud & security engineers (+20h/wk).',
      type: 'add-project',
      impact: {
        utilizationDelta: +8,
        overloadedDelta: +2,
        deliveryRisk: 'Medium (42%)',
        skillCoverageDelta: -4,
        shortageDelta: 0,
        explanation: 'Injecting this urgent contract increases engineering utilization from 82% to 90%. Rahul Sharma and Marcus Vance will experience temporary workload strain (+15%), but organization revenue throughput expands by 18%.'
      }
    },
    {
      id: 'key-leave',
      title: 'Key Person Temporary Leave',
      desc: 'Simulate unexpected 4-week medical leave for Lead Architect Rahul Sharma (PRJ-001 & PRJ-002).',
      type: 'employee-leave',
      impact: {
        utilizationDelta: -5,
        overloadedDelta: +1,
        deliveryRisk: 'High (68%)',
        skillCoverageDelta: -12,
        shortageDelta: +2,
        explanation: 'Removing Rahul generates critical skill shortages in Distributed Systems on PRJ-001. Elena Rostova and James Wilson absorb backfill tasks, elevating delivery risk on FinPay by 24%.'
      }
    },
    {
      id: 'deadline-shift',
      title: 'Accelerate Project Milestone (-3 wks)',
      desc: 'Compress Nova Analytics AI CoPilot deadline from 2026-12-15 to 2026-11-20 to beat competitor launch.',
      type: 'compress-deadline',
      impact: {
        utilizationDelta: +6,
        overloadedDelta: +1,
        deliveryRisk: 'Medium (38%)',
        skillCoverageDelta: 0,
        shortageDelta: +1,
        explanation: 'Compressing the schedule requires an additional 25 sprint hours per week. Aisha Al-Mansoor requires QA support assistance from David Kim to prevent milestone slippage.'
      }
    },
    {
      id: 'reassign-staff',
      title: 'Reassign Marcus Vance to CyberShield',
      desc: 'Move Marcus Vance from PRJ-001 CloudScale to PRJ-005 CyberShield to expedite zero-trust implementation.',
      type: 'reassign',
      impact: {
        utilizationDelta: 0,
        overloadedDelta: -1,
        deliveryRisk: 'Low (15%)',
        skillCoverageDelta: +10,
        shortageDelta: -1,
        explanation: 'Fills the senior DevOps void on CyberShield while keeping Marcus within an 85% healthy utilization band. CloudScale milestone delivery remains protected by James Wilson.'
      }
    }
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState('urgent-project');
  const [simulationApplied, setSimulationApplied] = useState(false);
  const [appliedFeedback, setAppliedFeedback] = useState(null);

  const activeScenario = SCENARIO_PRESETS.find(s => s.id === selectedScenarioId) || SCENARIO_PRESETS[0];

  // Baseline Metrics vs Simulated Metrics
  const baseUtilization = kpis.workforceUtilizationPct || 82;
  const baseOverloaded = kpis.overloadedEmployees || 2;
  const baseShortages = kpis.unfilledPositions || 5;

  const simulatedMetrics = useMemo(() => {
    const deltaUtil = activeScenario.impact.utilizationDelta;
    const deltaOver = activeScenario.impact.overloadedDelta;
    const deltaShort = activeScenario.impact.shortageDelta;

    return {
      utilization: Math.min(100, Math.max(30, baseUtilization + deltaUtil)),
      overloaded: Math.max(0, baseOverloaded + deltaOver),
      shortages: Math.max(0, baseShortages + deltaShort),
      deliveryRisk: activeScenario.impact.deliveryRisk,
      skillCoverage: Math.min(100, 88 + activeScenario.impact.skillCoverageDelta)
    };
  }, [activeScenario, baseUtilization, baseOverloaded, baseShortages]);

  // Apply Scenario to Live Action
  const handleApplyScenario = () => {
    talentSyncStore.addAuditLogEntry({
      action: 'Simulation Scenario Applied to Live',
      target: activeScenario.title,
      details: `Admin confirmed simulation: ${activeScenario.desc}`,
      decision: 'Approved'
    });

    setSimulationApplied(true);
    setAppliedFeedback(`Scenario "${activeScenario.title}" logged to audit trail. Workforce parameters updated in scenario sandbox.`);

    setTimeout(() => {
      setAppliedFeedback(null);
    }, 4500);
  };

  // Reset Simulation
  const handleResetSimulation = () => {
    setSelectedScenarioId('urgent-project');
    setSimulationApplied(false);
  };

  // REPORTS STATE (Requirement 12)
  const [reportFilterDept, setReportFilterDept] = useState('all');
  const [reportDateRange, setReportDateRange] = useState('q4-2026');

  const filteredReportEmployees = useMemo(() => {
    if (reportFilterDept === 'all') return employees;
    return employees.filter(e => e.department === reportFilterDept);
  }, [employees, reportFilterDept]);

  // Export CSV Action (using real records from talentSyncStore)
  const handleExportCSV = () => {
    const csvContent = talentSyncStore.generateCSVReport();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `workForc_IQ_Workforce_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    talentSyncStore.addAuditLogEntry({
      action: 'Report Exported',
      target: 'workForc_IQ_Workforce_Report.csv',
      details: 'Workforce Manager exported complete organization utilization CSV report.',
      decision: 'Exported'
    });
  };

  return (
    <div className="tab-view-container admin-planning-container">
      {/* HEADER BANNER */}
      <div className="admin-view-header">
        <div className="admin-header-title-row">
          <div>
            <div className="admin-sub-tag">
              <SlidersHorizontal size={12} className="text-blue-primary" />
              <span>What-If Modeling & Business Intelligence</span>
            </div>
            <h1 className="admin-header-title">Planning & Simulation</h1>
          </div>

          {/* Sub-tab pills */}
          <div className="sub-tab-pills">
            <button 
              type="button"
              className={`sub-pill-btn ${activeSubTab === 'simulator' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('simulator')}
            >
              <Zap size={14} />
              <span>Simulator</span>
            </button>
            <button 
              type="button"
              className={`sub-pill-btn ${activeSubTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('reports')}
            >
              <FileSpreadsheet size={14} />
              <span>Reports</span>
            </button>
          </div>
        </div>
        <p className="admin-header-subtitle">
          Test resource allocation trade-offs in an isolated sandbox, evaluate delivery risk, and export certified workforce reports.
        </p>
      </div>

      {/* FEEDBACK BANNER */}
      {appliedFeedback && (
        <div className="admin-success-banner" role="alert">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <div className="banner-content">
            <h4>Simulation Scenario Confirmed</h4>
            <p>{appliedFeedback}</p>
          </div>
        </div>
      )}

      {/* SUB-VIEW 1: WHAT-IF SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="simulator-subview">
          {/* SCENARIO SELECTOR CARD */}
          <div className="admin-card scenario-selector-card">
            <div className="card-sec-header">
              <div className="sec-title-group">
                <SlidersHorizontal size={16} className="text-blue-primary" />
                <h3>Select What-If Scenario to Simulate</h3>
              </div>
              <span className="badge-pill blue-badge">Sandbox Mode</span>
            </div>

            <div className="scenario-chips-stack">
              {SCENARIO_PRESETS.map(scenario => {
                const isSelected = selectedScenarioId === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    className={`scenario-choice-box ${isSelected ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedScenarioId(scenario.id);
                      setSimulationApplied(false);
                    }}
                  >
                    <div className="scenario-choice-top">
                      <div className="scenario-choice-title">
                        <span className="scenario-bullet" />
                        <strong>{scenario.title}</strong>
                      </div>
                      {isSelected && (
                        <span className="active-badge">Active Sandbox</span>
                      )}
                    </div>
                    <p className="scenario-choice-desc">{scenario.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIMULATION IMPACT COMPARISON CARD */}
          <div className="admin-card simulation-impact-card">
            <div className="card-sec-header">
              <div className="sec-title-group">
                <Sparkles size={16} className="text-blue-primary" />
                <div>
                  <h3>Current Baseline vs. Simulated Impact</h3>
                  <span className="sec-sub-text">Temporary sandbox — zero change to live data until approved</span>
                </div>
              </div>
              <button 
                type="button"
                className="admin-btn-sm admin-btn-ghost"
                onClick={handleResetSimulation}
                title="Reset simulation parameters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="simulation-diff-grid">
              {/* Metric 1: Utilization */}
              <div className="diff-metric-card">
                <span className="diff-metric-label">Org Utilization</span>
                <div className="diff-values-row">
                  <span className="val-baseline">{baseUtilization}%</span>
                  <ArrowRight size={14} className="text-muted" />
                  <span className="val-simulated text-blue-primary font-bold">
                    {simulatedMetrics.utilization}%
                  </span>
                </div>
                <div className="diff-delta-tag">
                  {activeScenario.impact.utilizationDelta >= 0 ? '+' : ''}
                  {activeScenario.impact.utilizationDelta}% change
                </div>
              </div>

              {/* Metric 2: Overloaded Staff */}
              <div className="diff-metric-card">
                <span className="diff-metric-label">Overloaded Staff</span>
                <div className="diff-values-row">
                  <span className="val-baseline">{baseOverloaded}</span>
                  <ArrowRight size={14} className="text-muted" />
                  <span className={`val-simulated ${simulatedMetrics.overloaded > baseOverloaded ? 'text-rose-600 font-bold' : 'text-emerald-600'}`}>
                    {simulatedMetrics.overloaded}
                  </span>
                </div>
                <div className="diff-delta-tag">
                  {activeScenario.impact.overloadedDelta >= 0 ? '+' : ''}
                  {activeScenario.impact.overloadedDelta} engineers
                </div>
              </div>

              {/* Metric 3: Delivery Risk */}
              <div className="diff-metric-card">
                <span className="diff-metric-label">Project Delivery Risk</span>
                <div className="diff-values-row">
                  <span className="val-baseline">Low (12%)</span>
                  <ArrowRight size={14} className="text-muted" />
                  <span className="val-simulated text-amber-600 font-bold">
                    {simulatedMetrics.deliveryRisk}
                  </span>
                </div>
                <div className="diff-delta-tag tag-warning">
                  Forecast Estimate*
                </div>
              </div>

              {/* Metric 4: Skill Coverage */}
              <div className="diff-metric-card">
                <span className="diff-metric-label">Skill Coverage</span>
                <div className="diff-values-row">
                  <span className="val-baseline">88%</span>
                  <ArrowRight size={14} className="text-muted" />
                  <span className="val-simulated text-emerald-600 font-bold">
                    {simulatedMetrics.skillCoverage}%
                  </span>
                </div>
                <div className="diff-delta-tag">
                  {activeScenario.impact.skillCoverageDelta >= 0 ? '+' : ''}
                  {activeScenario.impact.skillCoverageDelta}% coverage
                </div>
              </div>
            </div>

            {/* AI Explanation & Trade-off Analysis */}
            <div className="sim-analysis-box">
              <div className="analysis-header">
                <Info size={15} className="text-blue-primary" />
                <strong>Workforce Planner Trade-off Analysis:</strong>
              </div>
              <p className="analysis-p">{activeScenario.impact.explanation}</p>
              <div className="disclaimer-note">
                * Note: Scenario forecasts are heuristic estimates based on current sprint velocities and historical allocations.
              </div>
            </div>

            {/* Apply to Live Action Button */}
            <div className="simulation-actions-footer">
              <button 
                type="button" 
                className="admin-btn admin-btn-primary w-full"
                onClick={handleApplyScenario}
                disabled={simulationApplied}
              >
                {simulationApplied ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Scenario Logged to Audit Trail</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>Confirm & Apply Scenario to Live Organization</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: REPORTS & ANALYTICS */}
      {activeSubTab === 'reports' && (
        <div className="reports-subview">
          {/* Controls Bar */}
          <div className="admin-card report-filters-card">
            <div className="card-sec-header">
              <div className="sec-title-group">
                <Filter size={16} className="text-blue-primary" />
                <h3>Report Scope & Filters</h3>
              </div>
              <button 
                type="button" 
                className="admin-btn-sm admin-btn-primary"
                onClick={handleExportCSV}
                title="Download complete workforce records as CSV"
              >
                <Download size={14} />
                <span>Export CSV Report</span>
              </button>
            </div>

            <div className="report-controls-row">
              <div className="control-field">
                <label>Department:</label>
                <select 
                  className="admin-select-sm"
                  value={reportFilterDept}
                  onChange={(e) => setReportFilterDept(e.target.value)}
                >
                  <option value="all">All Departments ({employees.length} Staff)</option>
                  {departmentAnalytics.map(d => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="control-field">
                <label>Reporting Period:</label>
                <select 
                  className="admin-select-sm"
                  value={reportDateRange}
                  onChange={(e) => setReportDateRange(e.target.value)}
                >
                  <option value="q4-2026">Q4 2026 (Current Sprint Cycle)</option>
                  <option value="annual-2026">Full Year 2026</option>
                  <option value="forecast-2027">2027 Headcount Projection</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUMMARY TABLE OF APPLICATION RECORDS */}
          <div className="admin-card report-table-card">
            <div className="card-sec-header">
              <div className="sec-title-group">
                <FileText size={16} className="text-blue-primary" />
                <h3>Live Workforce Allocation Ledger ({filteredReportEmployees.length} Records)</h3>
              </div>
            </div>

            <div className="report-table-scroll">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Workload</th>
                    <th>Assigned</th>
                    <th>Available</th>
                    <th>Active Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReportEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td className="font-mono text-xs">{emp.id}</td>
                      <td>
                        <div className="table-emp-cell">
                          <img src={emp.avatar} alt={emp.name} className="table-avatar" />
                          <span className="font-medium">{emp.name}</span>
                        </div>
                      </td>
                      <td>{emp.department}</td>
                      <td className="text-xs text-muted">{emp.role}</td>
                      <td>
                        <span className={`table-badge badge-${emp.workload > 100 ? 'over' : emp.workload < 70 ? 'under' : 'optimal'}`}>
                          {emp.workload}%
                        </span>
                      </td>
                      <td>{emp.assignedHours || 0}h</td>
                      <td className="text-emerald-600 font-semibold">{emp.availableHours || 0}h</td>
                      <td>
                        <div className="table-projects-list">
                          {(emp.activeProjectIds || []).map(pid => (
                            <span key={pid} className="table-proj-tag">{pid}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer-actions">
              <span className="text-xs text-muted">
                Showing actual application records synchronized with the authoritative repository layer.
              </span>
              <button 
                type="button" 
                className="admin-btn-sm admin-btn-outline"
                onClick={handleExportCSV}
              >
                <Download size={13} />
                <span>Save CSV File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
