import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Flame, 
  TrendingDown, 
  AlertTriangle,
  Lightbulb,
  Zap,
  BarChart3
} from 'lucide-react';
import { detectWorkloadImbalances } from '../engine/matchingEngine';

export function IntelligenceView({
  employees,
  projects,
  onRebalanceWorkload,
  onSelectProject
}) {
  const [successToast, setSuccessToast] = useState(null);

  // Compute live imbalances
  const detectedImbalances = detectWorkloadImbalances(employees);

  // Skill demand vs supply data
  const skillAnalytics = [
    { name: 'Python', demand: 24, available: 18, status: 'Balanced', color: '#10b981' },
    { name: 'AWS Cloud', demand: 20, available: 12, status: 'Moderate', color: '#38bdf8' },
    { name: 'Kubernetes', demand: 16, available: 3, status: 'Critical Shortage', color: '#f43f5e' },
    { name: 'React / Next.js', demand: 18, available: 14, status: 'Balanced', color: '#10b981' },
    { name: 'Machine Learning / AI', demand: 15, available: 5, status: 'Shortage', color: '#f59e0b' },
    { name: 'Cybersecurity', demand: 12, available: 4, status: 'Shortage', color: '#f59e0b' }
  ];

  // Key Intelligence Insights (from prompt)
  const intelligenceInsights = [
    {
      type: 'opportunity',
      icon: Users,
      color: '#38bdf8',
      title: 'Talent Capacity Window',
      text: '18 employees with Python skills are currently available for allocation across Q4 projects.'
    },
    {
      type: 'optimization',
      icon: TrendingDown,
      color: '#10b981',
      title: 'Underutilized Cloud Engineers',
      text: '7 employees with AWS experience are currently in the underutilized bandwidth tier (<30%).'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      color: '#f43f5e',
      title: 'Critical Infrastructure Deficit',
      text: 'Cloud Migration & Multi-Cluster K8s project has a 38% skill gap in Kubernetes and Terraform.'
    },
    {
      type: 'strategic',
      icon: Lightbulb,
      color: '#14b8a6',
      title: 'Internal Staffing Potential',
      text: 'Your organization can internally staff 4 of the next 5 upcoming projects without external hiring.'
    },
    {
      type: 'upskilling',
      icon: Zap,
      color: '#f59e0b',
      title: 'High Upskilling Return',
      text: 'Cloud Computing & K8s are in highest demand. 8 junior DevOps engineers should be prioritized for upskilling.'
    }
  ];

  const handleApplyRebalance = (proposal) => {
    if (onRebalanceWorkload) {
      onRebalanceWorkload(
        proposal.sourceEmployee.id, 
        proposal.targetEmployee.id, 
        proposal.shiftPercent
      );
      setSuccessToast(`Transferred ${proposal.shiftPercent}% workload from ${proposal.sourceEmployee.name} to ${proposal.targetEmployee.name}!`);
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  return (
    <div className="view-content">
      {/* Title */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
          Workforce Intelligence Engine
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Continuous talent analytics & automated decision support
        </span>
      </div>

      {successToast && (
        <div className="alert-strip success" style={{ animation: 'fadeIn 0.3s ease' }}>
          <CheckCircle2 size={16} />
          <span>{successToast}</span>
        </div>
      )}

      {/* WORKLOAD BALANCING ENGINE (Highlight Feature from Prompt) */}
      <div className="iq-card glow-cyan">
        <div className="card-header" style={{ marginBottom: '8px' }}>
          <div className="card-title">
            <Scale size={18} style={{ color: '#14b8a6' }} />
            <span>Automated Workload Balancing</span>
          </div>
          <span className="badge badge-teal">{detectedImbalances.length} Opportunities</span>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '14px' }}>
          The engine continuously detects overloaded talent and identifies underutilized peers with matching competencies to rebalance capacity with zero productivity loss.
        </p>

        {detectedImbalances.length === 0 ? (
          <div className="alert-strip success">
            <CheckCircle2 size={16} />
            <span>All engineering tracks are currently within healthy workload thresholds (31%–70%).</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {detectedImbalances.map(prop => (
              <div 
                key={prop.id}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Shared Competency: <span style={{ color: '#0f766e' }}>{prop.sharedSkill}</span>
                  </div>
                  <span className="badge badge-high-load">Imbalance Detected</span>
                </div>

                {/* BEFORE vs AFTER Comparison Card */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '10px', 
                  background: '#ffffff', 
                  border: '1px solid var(--border-subtle)',
                  padding: '12px', 
                  borderRadius: '10px',
                  marginBottom: '10px'
                }}>
                  {/* BEFORE */}
                  <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '10px' }}>
                    <div style={{ fontSize: '0.65rem', color: '#be123c', fontWeight: 800, marginBottom: '6px' }}>
                      BEFORE REBALANCE
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {prop.sourceEmployee.name.split(' ')[0]}: <strong style={{ color: '#be123c' }}>{prop.before.source}%</strong> (Overloaded)
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {prop.targetEmployee.name.split(' ')[0]}: <strong style={{ color: '#06b6d4' }}>{prop.before.target}%</strong> (Underutilized)
                    </div>
                  </div>

                  {/* AFTER */}
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#047857', fontWeight: 800, marginBottom: '6px' }}>
                      AFTER REBALANCE
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {prop.sourceEmployee.name.split(' ')[0]}: <strong style={{ color: '#047857' }}>{prop.after.source}%</strong> (Healthy)
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {prop.targetEmployee.name.split(' ')[0]}: <strong style={{ color: '#047857' }}>{prop.after.target}%</strong> (Healthy)
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  💡 <strong>Recommendation:</strong> {prop.recommendation}
                </div>

                <button 
                  className="btn-cta" 
                  style={{ width: '100%', padding: '9px', fontSize: '0.78rem' }}
                  onClick={() => handleApplyRebalance(prop)}
                >
                  <Sparkles size={14} />
                  <span>Apply Workload Rebalance ({prop.shiftPercent}%)</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SKILL DEMAND vs SUPPLY ANALYTICS */}
      <div className="iq-card">
        <div className="card-header">
          <div className="card-title">
            <BarChart3 size={17} style={{ color: '#14b8a6' }} />
            <span>Skill Supply vs Market Demand</span>
          </div>
          <span className="badge badge-teal">Q4 Roadmap</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {skillAnalytics.map(skill => (
            <div key={skill.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</span>
                <span style={{ color: skill.color, fontWeight: 700 }}>
                  Available: {skill.available} / Needed: {skill.demand}
                </span>
              </div>
              <div className="progress-track" style={{ height: '6px' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${Math.min(100, Math.round((skill.available / skill.demand) * 100))}%`, 
                    background: skill.color 
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXECUTIVE INTELLIGENCE INSIGHTS (Direct from Prompt) */}
      <div className="iq-card">
        <div className="card-header" style={{ marginBottom: '10px' }}>
          <div className="card-title">
            <BrainCircuit size={17} style={{ color: 'var(--accent-cyan)' }} />
            <span>AI Executive Insights</span>
          </div>
          <span className="badge badge-cyan">Automated</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {intelligenceInsights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 12px'
                }}
              >
                <div 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '8px', 
                    background: `${insight.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: insight.color,
                    flexShrink: 0
                  }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {insight.title}
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '2px' }}>
                    {insight.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
