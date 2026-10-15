import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Users, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  GraduationCap, 
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  calculateEmployeeMatch, 
  formOptimizedTeam, 
  analyzeInternalTalentDiscovery, 
  analyzeSkillGaps, 
  generateTrainingRecommendations 
} from '../engine/matchingEngine';

export function ProjectDetailModal({
  project,
  employees,
  onClose,
  onApproveTeam
}) {
  const [activeTab, setActiveTab] = useState('team'); // 'team', 'candidates', 'discovery', 'gaps', 'training'
  const [allocatedSuccess, setAllocatedSuccess] = useState(false);

  // Run AI Algorithms
  const optimizedTeam = formOptimizedTeam(project, employees);
  const internalDiscovery = analyzeInternalTalentDiscovery(project, employees);
  const skillGaps = analyzeSkillGaps(project, employees);
  const trainingRecommendations = generateTrainingRecommendations(project, employees);

  // Scored Individual Candidates
  const allCandidateMatches = employees
    .map(emp => calculateEmployeeMatch(emp, project))
    .sort((a, b) => b.overallMatchScore - a.overallMatchScore);

  const handleApprove = () => {
    if (optimizedTeam && onApproveTeam) {
      const assignedIds = optimizedTeam.selectedMembers.map(m => m.id);
      onApproveTeam(project.id, assignedIds);
      setAllocatedSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setAllocatedSuccess(false);
      }, 4000);
    }
  };

  const getReadinessColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-sheet" 
        style={{ maxWidth: '520px', maxHeight: '92vh' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle-bar" />

        {/* Modal Top Header */}
        <div className="sheet-header">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-teal">{project.priority} Priority</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{project.id}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {project.name}
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Client: {project.client} • Duration: {project.duration}
            </span>
          </div>

          <button className="icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Success Banner */}
        {allocatedSuccess && (
          <div className="alert-strip success" style={{ margin: '12px 16px 0', animation: 'fadeIn 0.3s ease' }}>
            <CheckCircle2 size={16} />
            <span>Optimal Team successfully approved and assigned! Workloads and availability updated in real-time.</span>
          </div>
        )}

        {/* Sub-Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-subtle)', 
          background: 'var(--bg-subtle)',
          overflowX: 'auto',
          padding: '0 8px'
        }}>
          {[
            { id: 'team', label: 'Smart Team', icon: Users },
            { id: 'candidates', label: 'Candidate Matches', icon: Award },
            { id: 'discovery', label: 'Internal Talent', icon: Cpu },
            { id: 'gaps', label: `Gaps (${skillGaps.length})`, icon: AlertTriangle },
            { id: 'training', label: 'Upskilling', icon: GraduationCap }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 12px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #14b8a6' : '2px solid transparent',
                  color: isActive ? '#0f766e' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Contents */}
        <div className="sheet-body">
          {/* TAB 1: SMART TEAM FORMATION */}
          {activeTab === 'team' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Holistic Team Scorecard */}
              {optimizedTeam && (
                <div className="iq-card glow-cyan">
                  <div className="card-header" style={{ marginBottom: '10px' }}>
                    <div className="card-title">
                      <Sparkles size={17} style={{ color: '#14b8a6' }} />
                      <span>Synergized Team Architecture</span>
                    </div>
                    <span className="badge badge-teal">{optimizedTeam.selectedMembers.length} Members</span>
                  </div>

                  {/* 5-Metric Scoreboard Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                    <div className="metric-card" style={{ padding: '8px 10px' }}>
                      <span className="metric-label" style={{ fontSize: '0.65rem' }}>TEAM MATCH</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#14b8a6' }}>
                        {optimizedTeam.teamMatchScore}%
                      </div>
                    </div>

                    <div className="metric-card" style={{ padding: '8px 10px' }}>
                      <span className="metric-label" style={{ fontSize: '0.65rem' }}>SKILL COVERAGE</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                        {optimizedTeam.skillCoverage}%
                      </div>
                    </div>

                    <div className="metric-card" style={{ padding: '8px 10px' }}>
                      <span className="metric-label" style={{ fontSize: '0.65rem' }}>AVAILABILITY</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>
                        {optimizedTeam.availability}%
                      </div>
                    </div>

                    <div className="metric-card" style={{ padding: '8px 10px' }}>
                      <span className="metric-label" style={{ fontSize: '0.65rem' }}>WORKLOAD BAL.</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f97316' }}>
                        {optimizedTeam.workloadBalance}%
                      </div>
                    </div>

                    <div className="metric-card" style={{ padding: '8px 10px', gridColumn: 'span 2' }}>
                      <span className="metric-label" style={{ fontSize: '0.65rem' }}>PROJECT READINESS</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: getReadinessColor(optimizedTeam.projectReadiness) }}>
                        {optimizedTeam.projectReadiness}% — READY TO STAFF
                      </div>
                    </div>
                  </div>

                  {/* Explainable AI Rationale */}
                  <div style={{ 
                    padding: '10px 12px', 
                    background: '#f0fdfa', 
                    border: '1px solid #99f6e4', 
                    borderRadius: '10px',
                    fontSize: '0.74rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.4'
                  }}>
                    <strong style={{ color: '#0f766e' }}>AI Synergy Rationale:</strong> {optimizedTeam.rationale}
                  </div>
                </div>
              )}

              {/* Complementary Team Members List */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  RECOMMENDED COMPLEMENTARY LINEUP
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {optimizedTeam?.selectedMembers.map((member, idx) => (
                    <div 
                      key={member.id}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="emp-avatar" 
                          style={{ width: '38px', height: '38px' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {member.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            {member.role.split(' ')[0]} • Covers: <strong style={{ color: 'var(--accent-cyan)' }}>{member.contributedSkills.slice(0, 2).join(', ')}</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-display)' }}>
                          {member.matchScore}%
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                          {member.workload}% Load
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Approve & Allocate */}
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '12px' }}
                onClick={handleApprove}
              >
                <CheckCircle2 size={16} />
                <span>Approve & Allocate Recommended Team</span>
              </button>
            </div>
          )}

          {/* TAB 2: INDIVIDUAL CANDIDATE MATCHES */}
          {activeTab === 'candidates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Multi-factor match considering skill proficiency, years of experience, current workload, and project history.
              </div>

              {allCandidateMatches.slice(0, 8).map(({ employee, overallMatchScore, skillMatch, experienceMatch, availability, workloadSuitability, projectExperience, rationale }) => (
                <div 
                  key={employee.id}
                  className="iq-card"
                  style={{ padding: '14px', border: overallMatchScore >= 85 ? '1px solid var(--border-cyan)' : '1px solid var(--border-subtle)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={employee.avatar} 
                        alt={employee.name} 
                        className="emp-avatar" 
                        style={{ width: '38px', height: '38px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{employee.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{employee.role} • {employee.location.split(',')[0]}</div>
                      </div>
                    </div>

                    <div className="match-score-badge">
                      <span className="match-pct">{overallMatchScore}%</span>
                      <span className="match-lbl">Match</span>
                    </div>
                  </div>

                  {/* Multi-Factor Breakdown */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', textAlign: 'center', margin: '8px 0', background: 'var(--bg-subtle)', padding: '6px', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>SKILL</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4' }}>{skillMatch}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>EXP</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#14b8a6' }}>{experienceMatch}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>AVAIL</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>{availability}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>LOAD</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: workloadSuitability >= 70 ? '#10b981' : '#f43f5e' }}>{workloadSuitability}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>HIST</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b' }}>{projectExperience}%</div>
                    </div>
                  </div>

                  {/* Explainable AI Rationale */}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4', fontStyle: 'italic', background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '6px' }}>
                    "{rationale}"
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: INTERNAL TALENT DISCOVERY */}
          {activeTab === 'discovery' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Feature Header */}
              <div className="iq-card glow-cyan">
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Internal Talent Discovery
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Can We Build This Team Internally?
                </h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                  <span 
                    className="badge" 
                    style={{ 
                      fontSize: '0.85rem', 
                      padding: '4px 12px',
                      background: internalDiscovery?.verdict === 'YES' ? '#d1fae5' : '#fef3c7',
                      color: internalDiscovery?.verdict === 'YES' ? '#047857' : '#b45309',
                      border: `1px solid ${internalDiscovery?.verdict === 'YES' ? '#a7f3d0' : '#fde68a'}`
                    }}
                  >
                    VERDICT: {internalDiscovery?.verdict} ({internalDiscovery?.coveragePercent}% Coverage)
                  </span>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {internalDiscovery?.summary}
                </p>
              </div>

              {/* Per-skill internal talent counts */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  INTERNAL TALENT DEPTH BREAKDOWN
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {internalDiscovery?.skillBreakdown.map(item => (
                    <div 
                      key={item.skill}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.skill}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                          Required: {item.requiredProficiency} ({item.minExperience}y+ exp)
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: item.qualifiedTalent >= 2 ? '#059669' : '#e11d48' }}>
                          {item.qualifiedTalent} Qualified
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          {item.readilyAvailableTalent} Available
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SKILL GAP ANALYSIS */}
          {activeTab === 'gaps' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Intelligent gap detection comparing project demands against open organizational bandwidth.
              </div>

              {skillGaps.length === 0 ? (
                <div className="alert-strip success">
                  <CheckCircle2 size={16} />
                  <span>No critical skill gaps detected. Organization has full talent sufficiency for this project.</span>
                </div>
              ) : (
                skillGaps.map(gap => (
                  <div key={gap.skill} className="iq-card" style={{ border: '1px solid #fecdd3' }}>
                    <div className="card-header" style={{ marginBottom: '8px' }}>
                      <div className="card-title" style={{ color: '#be123c' }}>
                        <AlertTriangle size={16} />
                        <span>Critical Skill Gap: {gap.skill}</span>
                      </div>
                      <span className="badge badge-overloaded">{gap.severity}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '0.72rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Required: <strong style={{ color: 'var(--text-primary)' }}>{gap.requiredHeadcount} engineers</strong></span>
                      <span style={{ color: 'var(--text-secondary)' }}>Available: <strong style={{ color: 'var(--accent-cyan)' }}>{gap.availableHeadcount} engineer</strong></span>
                      <span style={{ color: '#be123c' }}>Deficit: <strong>{gap.gapCount} engineers</strong></span>
                    </div>

                    {/* 4 Actionable Strategies from Prompt */}
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      RECOMMENDED STRATEGIES:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {gap.strategies.map((strat, sIdx) => (
                        <div 
                          key={sIdx}
                          style={{
                            padding: '8px 10px',
                            background: strat.recommended ? '#f0fdf4' : 'var(--bg-subtle)',
                            border: strat.recommended ? '1px solid #bbf7d0' : '1px solid var(--border-subtle)',
                            borderRadius: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: strat.recommended ? '#059669' : 'var(--text-primary)' }}>
                              {strat.option}
                            </span>
                            {strat.recommended && (
                              <span className="badge badge-healthy" style={{ fontSize: '0.6rem' }}>AI Preferred</span>
                            )}
                          </div>
                          <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            {strat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: TRAINING RECOMMENDATION ENGINE */}
          {activeTab === 'training' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Identifies internal talent closest to qualification to close project skill gaps without hiring.
              </div>

              {trainingRecommendations.map((rec, rIdx) => (
                <div key={rIdx} className="iq-card" style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={rec.avatar} alt={rec.employeeName} className="emp-avatar" style={{ width: '36px', height: '36px' }} />
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{rec.employeeName}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Target: <strong style={{ color: 'var(--accent-cyan)' }}>{rec.skill}</strong></div>
                      </div>
                    </div>
                    <span className="badge badge-cyan">{rec.trainingPriority} Priority</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', background: 'var(--bg-subtle)', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
                    <span>Current: <strong style={{ color: 'var(--text-secondary)' }}>{rec.currentProficiency}</strong></span>
                    <span>Target: <strong style={{ color: 'var(--accent-cyan)' }}>{rec.requiredProficiency}</strong></span>
                    <span>Gap: <strong style={{ color: 'var(--accent-amber)' }}>{rec.skillGapLevel}</strong></span>
                    <span>Est: <strong style={{ color: '#059669' }}>{rec.estimatedReadiness}</strong></span>
                  </div>

                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    {rec.explanation}
                  </p>

                  <button 
                    className="btn-secondary" 
                    style={{ width: '100%', fontSize: '0.72rem', padding: '6px' }}
                    onClick={() => alert(`Enrolled ${rec.employeeName} into '${rec.recommendedCourse}'!`)}
                  >
                    <GraduationCap size={14} />
                    <span>Enroll in {rec.recommendedCourse}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="sheet-footer">
          <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
            Close
          </button>
          {activeTab === 'team' && (
            <button className="btn-cta" style={{ flex: 2 }} onClick={handleApprove}>
              <CheckCircle2 size={16} />
              <span>Approve Team</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
