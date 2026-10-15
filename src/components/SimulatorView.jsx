import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  UserMinus, 
  UserPlus, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  RefreshCw,
  Award
} from 'lucide-react';
import { simulateScenario } from '../engine/matchingEngine';

export function SimulatorView({ projects, employees }) {
  const [activeScenario, setActiveScenario] = useState('HIRE'); // 'HIRE' or 'REMOVE'

  // Scenario 1: Hire Specialists
  const [selectedSkill, setSelectedSkill] = useState('Kubernetes');
  const [hireCount, setHireCount] = useState(2);
  const [targetProjectForHire, setTargetProjectForHire] = useState(
    projects.find(p => p.id === 'PRJ-007') || projects[0]
  );

  // Scenario 2: Remove Employee
  const [targetProjectForRemove, setTargetProjectForRemove] = useState(projects[0]);
  const [selectedRemoveEmpId, setSelectedRemoveEmpId] = useState(
    targetProjectForRemove.assignedEmployees?.[0] || employees[0].id
  );

  // Run Simulation 1: Hire
  const hireSimResult = simulateScenario(
    'HIRE_SPECIALISTS',
    { skillName: selectedSkill, count: hireCount },
    targetProjectForHire,
    employees
  );

  // Run Simulation 2: Remove
  const removeSimResult = simulateScenario(
    'REMOVE_MEMBER',
    { removedEmployeeId: selectedRemoveEmpId },
    targetProjectForRemove,
    employees
  );

  const removedEmployeeObj = employees.find(e => e.id === selectedRemoveEmpId);

  return (
    <div className="view-content">
      {/* Title */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
          Workforce Simulator
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Test predictive scenarios before executing organizational staffing decisions
        </span>
      </div>

      {/* Scenario Mode Switcher */}
      <div className="role-switch-container">
        <button
          className={`role-tab-btn ${activeScenario === 'HIRE' ? 'active' : ''}`}
          onClick={() => setActiveScenario('HIRE')}
        >
          <UserPlus size={15} />
          <span>Simulate Talent Acquisition</span>
        </button>

        <button
          className={`role-tab-btn ${activeScenario === 'REMOVE' ? 'active' : ''}`}
          onClick={() => setActiveScenario('REMOVE')}
        >
          <UserMinus size={15} />
          <span>Simulate Team Attrition</span>
        </button>
      </div>

      {/* SCENARIO A: SIMULATE HIRING SPECIALISTS */}
      {activeScenario === 'HIRE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="iq-card glow-cyan">
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <div className="card-title">
                <Sparkles size={17} style={{ color: '#14b8a6' }} />
                <span>Simulate Hiring Specialists</span>
              </div>
              <span className="badge badge-teal">Predictive ROI</span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>
              Assess how opening strategic requisitions resolves critical skill gaps and impacts overall Project Readiness Scores.
            </p>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TARGET INITIATIVE</label>
                <select 
                  className="emp-dropdown"
                  style={{ width: '100%', maxWidth: 'none', padding: '8px', marginTop: '4px' }}
                  value={targetProjectForHire.id}
                  onChange={(e) => {
                    const prj = projects.find(p => p.id === e.target.value);
                    if (prj) setTargetProjectForHire(prj);
                  }}
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.readinessScore}% ready)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SPECIALIST SKILL</label>
                  <select 
                    className="emp-dropdown"
                    style={{ width: '100%', maxWidth: 'none', padding: '8px', marginTop: '4px' }}
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                  >
                    <option value="Kubernetes">Kubernetes Engineer</option>
                    <option value="AWS Cloud">AWS Solutions Architect</option>
                    <option value="Machine Learning / AI">AI / ML Specialist</option>
                    <option value="Terraform">Terraform / IaC Engineer</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>HEADCOUNT</label>
                  <select 
                    className="emp-dropdown"
                    style={{ width: '100%', maxWidth: 'none', padding: '8px', marginTop: '4px' }}
                    value={hireCount}
                    onChange={(e) => setHireCount(Number(e.target.value))}
                  >
                    <option value={1}>1 Engineer</option>
                    <option value={2}>2 Engineers</option>
                    <option value={3}>3 Engineers</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATION PREDICTIVE RESULTS */}
          {hireSimResult && (
            <div className="iq-card glow-cyan">
              <div className="card-header" style={{ marginBottom: '10px' }}>
                <div className="card-title">
                  <TrendingUp size={17} style={{ color: '#14b8a6' }} />
                  <span>Predicted Impact Analysis</span>
                </div>
                <span className="badge badge-healthy">+{(hireSimResult.afterReadiness - hireSimResult.beforeReadiness)}% Readiness</span>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '10px', 
                background: '#ffffff', 
                border: '1px solid var(--border-subtle)',
                padding: '12px', 
                borderRadius: '12px',
                marginBottom: '12px'
              }}>
                {/* BEFORE */}
                <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '8px' }}>
                  <div style={{ fontSize: '0.65rem', color: '#be123c', fontWeight: 800, marginBottom: '4px' }}>
                    CURRENT STATE
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Skill Gap: <strong style={{ color: '#be123c' }}>{hireSimResult.beforeGap} engineers</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Readiness: <strong style={{ color: '#f97316' }}>{hireSimResult.beforeReadiness}%</strong>
                  </div>
                </div>

                {/* AFTER */}
                <div>
                  <div style={{ fontSize: '0.65rem', color: '#047857', fontWeight: 800, marginBottom: '4px' }}>
                    AFTER HIRING {hireCount} {selectedSkill.toUpperCase()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Skill Gap: <strong style={{ color: '#10b981' }}>{hireSimResult.afterGap} engineers</strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Readiness: <strong style={{ color: '#10b981' }}>{hireSimResult.afterReadiness}%</strong>
                  </div>
                </div>
              </div>

              {/* Summary note */}
              <div style={{ fontSize: '0.74rem', color: 'var(--text-primary)', lineHeight: '1.4', background: '#f0fdfa', border: '1px solid #99f6e4', padding: '10px', borderRadius: '8px' }}>
                💡 <strong>Decision Verdict:</strong> Adding {hireCount} {selectedSkill} specialist{hireCount > 1 ? 's' : ''} elevates <em>{targetProjectForHire.name}</em> from <strong>{hireSimResult.beforeReadiness}%</strong> to <strong>{hireSimResult.afterReadiness}%</strong>, shifting the project status to <strong>READY TO STAFF</strong>.
              </div>
            </div>
          )}
        </div>
      )}

      {/* SCENARIO B: SIMULATE REMOVING EMPLOYEE */}
      {activeScenario === 'REMOVE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="iq-card" style={{ border: '1px solid #fecdd3' }}>
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <div className="card-title" style={{ color: '#be123c' }}>
                <UserMinus size={17} />
                <span>Simulate Removing Employee</span>
              </div>
              <span className="badge badge-overloaded">Attrition Test</span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>
              Understand what happens if a core contributor departs or is reassigned, and automatically preview the best replacement candidate.
            </p>

            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PROJECT</label>
                <select 
                  className="emp-dropdown"
                  style={{ width: '100%', maxWidth: 'none', padding: '8px', marginTop: '4px' }}
                  value={targetProjectForRemove.id}
                  onChange={(e) => {
                    const prj = projects.find(p => p.id === e.target.value);
                    if (prj) {
                      setTargetProjectForRemove(prj);
                      if (prj.assignedEmployees?.length > 0) {
                        setSelectedRemoveEmpId(prj.assignedEmployees[0]);
                      }
                    }
                  }}
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.assignedEmployees?.length || 0} assigned)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SELECT EMPLOYEE TO REMOVE</label>
                <select 
                  className="emp-dropdown"
                  style={{ width: '100%', maxWidth: 'none', padding: '8px', marginTop: '4px' }}
                  value={selectedRemoveEmpId}
                  onChange={(e) => setSelectedRemoveEmpId(e.target.value)}
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role.split(' ')[0]} - {emp.workload}% load)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SIMULATION PREDICTIVE RESULTS */}
          {removeSimResult && (
            <div className="iq-card">
              <div className="card-header" style={{ marginBottom: '10px' }}>
                <div className="card-title">
                  <AlertTriangle size={17} style={{ color: '#b45309' }} />
                  <span>Impact on {targetProjectForRemove.name}</span>
                </div>
                <span className="badge badge-high-load">-{removeSimResult.projectReadinessDrop}% Readiness</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '12px' }}>
                <div className="metric-card">
                  <span className="metric-label">New Readiness</span>
                  <div className="metric-value" style={{ color: '#d97706' }}>
                    {removeSimResult.newReadinessScore}%
                  </div>
                  <span className="metric-subtext">Drops from 94%</span>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Skill Coverage</span>
                  <div className="metric-value" style={{ color: 'var(--accent-cyan)' }}>
                    {removeSimResult.newSkillCoverage}%
                  </div>
                  <span className="metric-subtext">Residual capability</span>
                </div>
              </div>

              {/* Auto-Discovered Replacement */}
              {removeSimResult.topReplacement && (
                <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={14} style={{ color: '#14b8a6' }} />
                    <span>AUTOMATICALLY DISCOVERED REPLACEMENT</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={removeSimResult.topReplacement.employee.avatar} 
                        alt={removeSimResult.topReplacement.employee.name}
                        className="emp-avatar"
                        style={{ width: '38px', height: '38px', border: '2px solid #14b8a6' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {removeSimResult.topReplacement.employee.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {removeSimResult.topReplacement.employee.role}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-display)' }}>
                        {removeSimResult.topReplacement.overallMatchScore}%
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        Match Score
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
                    "{removeSimResult.topReplacement.rationale}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
