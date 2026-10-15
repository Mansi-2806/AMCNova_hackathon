import React from 'react';
import { 
  Users, 
  UserCheck, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  Sparkles, 
  Briefcase, 
  Flame, 
  Layers, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap
} from 'lucide-react';

export function AdminDashboard({
  employees,
  projects,
  onNavigateTab,
  onSelectProject,
  onOpenWorkforceFilter
}) {
  // Workforce Calculations
  const totalEmployees = employees.length;
  const overloadedEmployees = employees.filter(e => e.workload >= 90);
  const underutilizedEmployees = employees.filter(e => e.workload <= 30);
  const healthyEmployees = employees.filter(e => e.workload > 30 && e.workload < 90);
  const availableEmployees = employees.filter(e => e.availability >= 40);
  const currentlyAssigned = employees.filter(e => e.activeProjects && e.activeProjects.length > 0);
  const availableSoon = employees.filter(e => e.upcomingAvailabilityDate !== 'Immediate');

  // Capacity Percentages
  const avgWorkload = Math.round(employees.reduce((acc, e) => acc + e.workload, 0) / totalEmployees);
  const allocatedCapacityPct = Math.round((currentlyAssigned.length / totalEmployees) * 100);
  const overloadedCapacityPct = Math.round((overloadedEmployees.length / totalEmployees) * 100);
  const availableCapacityPct = Math.max(0, 100 - allocatedCapacityPct);

  // Project Calculations
  const activeProjects = projects.filter(p => p.status === 'Active');
  const upcomingProjects = projects.filter(p => p.status === 'Upcoming');
  const needsStaffingProjects = upcomingProjects.filter(p => !p.assignedEmployees || p.assignedEmployees.length === 0);
  const incompleteProjects = projects.filter(p => (p.assignedEmployees?.length || 0) < p.requiredTeamSize);

  // Skill Analytics
  const skillCounts = {};
  employees.forEach(emp => {
    emp.skills.forEach(s => {
      skillCounts[s.name] = (skillCounts[s.name] || 0) + 1;
    });
  });

  const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1]);
  const mostAvailableSkills = sortedSkills.slice(0, 3);
  
  // Critical shortages: high demand, low supply
  const criticalShortages = [
    { name: 'Kubernetes', available: skillCounts['Kubernetes'] || 2, needed: 8, severity: 'Critical' },
    { name: 'Machine Learning / AI', available: skillCounts['Machine Learning / AI'] || 4, needed: 9, severity: 'High' },
    { name: 'Cybersecurity & SecOps', available: skillCounts['Cybersecurity & SecOps'] || 3, needed: 6, severity: 'High' }
  ];

  return (
    <div className="view-content">
      {/* AI Decision Alert Banner */}
      <div className="iq-card glow-cyan">
        <div className="card-header" style={{ marginBottom: '8px' }}>
          <div className="card-title" style={{ color: '#0f766e' }}>
            <Sparkles size={18} style={{ color: '#14b8a6' }} />
            <span>AI Decision Engine Live</span>
          </div>
          <span className="badge badge-teal">Real-time</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          Organization talent balance is evaluated across <strong>{totalEmployees} employees</strong> and <strong>{projects.length} initiatives</strong>. 4 intelligent optimization recommendations require review.
        </p>
      </div>

      {/* Critical Alerts Banner (Direct from Prompt) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div 
          className="alert-strip danger" 
          style={{ cursor: 'pointer' }}
          onClick={() => onOpenWorkforceFilter('overloaded')}
        >
          <Flame size={18} style={{ color: '#f43f5e', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <strong>{overloadedEmployees.length} employees are currently overloaded</strong>
            <p style={{ fontSize: '0.72rem', opacity: 0.9 }}>Rahul Sharma (94%) & Arjun Verma (96%) exceed safe capacity threshold.</p>
          </div>
          <ArrowRight size={14} />
        </div>

        <div 
          className="alert-strip info" 
          style={{ cursor: 'pointer' }}
          onClick={() => onOpenWorkforceFilter('underutilized')}
        >
          <TrendingDown size={18} style={{ color: '#06b6d4', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <strong>{underutilizedEmployees.length} employees with relevant skills are underutilized</strong>
            <p style={{ fontSize: '0.72rem', opacity: 0.9 }}>Priya Patel (25%) and 7 others have immediate allocation capacity.</p>
          </div>
          <ArrowRight size={14} />
        </div>

        <div 
          className="alert-strip warning" 
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigateTab('intelligence')}
        >
          <AlertTriangle size={18} style={{ color: '#f97316', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <strong>3 upcoming projects have critical skill gaps</strong>
            <p style={{ fontSize: '0.72rem', opacity: 0.9 }}>Severe Kubernetes & ML deficits detected in Q4 roadmap.</p>
          </div>
          <ArrowRight size={14} />
        </div>

        {/* Project Alpha 82% ready */}
        <div 
          className="alert-strip success" 
          style={{ cursor: 'pointer' }}
          onClick={() => {
            const prj = projects.find(p => p.id === 'PRJ-006');
            if (prj) onSelectProject(prj);
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <strong>Project Alpha (AI Analytics) is 82% ready for staffing</strong>
            <p style={{ fontSize: '0.72rem', opacity: 0.9 }}>Optimal 6-member team generated. Tap to review & approve.</p>
          </div>
          <ArrowRight size={14} />
        </div>
      </div>

      {/* WORKFORCE CAPACITY VISUALIZER */}
      <div className="iq-card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Layers size={17} style={{ color: '#14b8a6' }} />
              <span>Workforce Capacity Distribution</span>
            </div>
            <span className="card-subtitle">Aggregated organizational bandwidth</span>
          </div>
          <span className="badge badge-teal">{avgWorkload}% Avg Load</span>
        </div>

        <div className="capacity-visualizer">
          <div className="capacity-stacked-bar">
            <div 
              className="bar-segment allocated" 
              style={{ width: `${allocatedCapacityPct}%` }}
              title={`Allocated: ${allocatedCapacityPct}%`}
            />
            <div 
              className="bar-segment available" 
              style={{ width: `${availableCapacityPct}%` }}
              title={`Available: ${availableCapacityPct}%`}
            />
            <div 
              className="bar-segment overloaded" 
              style={{ width: `${overloadedCapacityPct}%` }}
              title={`Overloaded: ${overloadedCapacityPct}%`}
            />
          </div>

          <div className="capacity-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#14b8a6' }} />
              <span>Allocated ({allocatedCapacityPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#10b981' }} />
              <span>Available ({availableCapacityPct}%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#f43f5e' }} />
              <span>Overloaded ({overloadedCapacityPct}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* WORKFORCE OVERVIEW (2x3 Grid) */}
      <div className="iq-card">
        <div className="card-header">
          <div className="card-title">
            <Users size={17} style={{ color: '#14b8a6' }} />
            <span>Workforce Overview</span>
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            onClick={() => onNavigateTab('workforce')}
          >
            View All ({totalEmployees})
          </button>
        </div>

        <div className="metric-grid-2x3">
          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Total Talent</span>
              <Users size={14} style={{ color: '#64748b' }} />
            </div>
            <div className="metric-value">{totalEmployees}</div>
            <span className="metric-subtext">Across 6 departments</span>
          </div>

          <div className="metric-card" style={{ cursor: 'pointer' }} onClick={() => onOpenWorkforceFilter('available')}>
            <div className="metric-header">
              <span className="metric-label">Available Now</span>
              <UserCheck size={14} style={{ color: '#10b981' }} />
            </div>
            <div className="metric-value" style={{ color: '#10b981' }}>{availableEmployees.length}</div>
            <span className="metric-subtext">≥40% open capacity</span>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Currently Assigned</span>
              <Briefcase size={14} style={{ color: '#14b8a6' }} />
            </div>
            <div className="metric-value" style={{ color: '#0f766e' }}>{currentlyAssigned.length}</div>
            <span className="metric-subtext">Active project tasks</span>
          </div>

          <div className="metric-card" style={{ cursor: 'pointer' }} onClick={() => onOpenWorkforceFilter('overloaded')}>
            <div className="metric-header">
              <span className="metric-label">Overloaded</span>
              <Flame size={14} style={{ color: '#f43f5e' }} />
            </div>
            <div className="metric-value" style={{ color: '#f43f5e' }}>{overloadedEmployees.length}</div>
            <span className="metric-subtext">≥90% capacity load</span>
          </div>

          <div className="metric-card" style={{ cursor: 'pointer' }} onClick={() => onOpenWorkforceFilter('underutilized')}>
            <div className="metric-header">
              <span className="metric-label">Underutilized</span>
              <TrendingDown size={14} style={{ color: '#06b6d4' }} />
            </div>
            <div className="metric-value" style={{ color: '#06b6d4' }}>{underutilizedEmployees.length}</div>
            <span className="metric-subtext">≤30% capacity load</span>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <span className="metric-label">Available Soon</span>
              <Clock size={14} style={{ color: '#f59e0b' }} />
            </div>
            <div className="metric-value" style={{ color: '#f59e0b' }}>{availableSoon.length}</div>
            <span className="metric-subtext">Rolling off in 30 days</span>
          </div>
        </div>
      </div>

      {/* SKILL OVERVIEW & CRITICAL SHORTAGES */}
      <div className="iq-card">
        <div className="card-header">
          <div className="card-title">
            <Zap size={17} style={{ color: '#f59e0b' }} />
            <span>Skill Supply & Shortages</span>
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            onClick={() => onNavigateTab('intelligence')}
          >
            Analytics
          </button>
        </div>

        {/* Most Available Skills */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '600' }}>
            MOST AVAILABLE SKILLS IN-HOUSE
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {mostAvailableSkills.map(([skill, count]) => (
              <div key={skill} className="skill-chip">
                <span>{skill}</span>
                <span className="skill-level level-expert">{count} talent</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Shortages */}
        <div>
          <div style={{ fontSize: '0.72rem', color: '#f43f5e', marginBottom: '8px', fontWeight: '600' }}>
            CRITICAL SHORTAGES vs DEMAND
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {criticalShortages.map(item => (
              <div 
                key={item.name} 
                style={{ 
                  background: 'var(--bg-subtle)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: '10px', 
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                    Available: <span style={{ color: '#14b8a6', fontWeight: 600 }}>{item.available}</span> | Required in Q4: <span style={{ color: '#f43f5e', fontWeight: 600 }}>{item.needed}</span>
                  </div>
                </div>
                <span className="badge badge-overloaded">
                  Gap: {item.needed - item.available}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT OVERVIEW */}
      <div className="iq-card">
        <div className="card-header">
          <div className="card-title">
            <Briefcase size={17} style={{ color: '#14b8a6' }} />
            <span>Project Staffing Pipeline</span>
          </div>
          <button 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            onClick={() => onNavigateTab('projects')}
          >
            All Projects
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
          <div className="metric-card">
            <span className="metric-label">Active Projects</span>
            <div className="metric-value">{activeProjects.length}</div>
            <span className="metric-subtext">Fully or partially staffed</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Upcoming Pipeline</span>
            <div className="metric-value" style={{ color: '#14b8a6' }}>{upcomingProjects.length}</div>
            <span className="metric-subtext">Needs team formation</span>
          </div>
        </div>

        {/* Highlight upcoming projects requiring staffing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            PROJECTS NEEDING IMMEDIATE ALLOCATION
          </div>
          {upcomingProjects.map(proj => (
            <div 
              key={proj.id}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => onSelectProject(proj)}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>{proj.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  Team Needed: {proj.requiredTeamSize} | Priority: <span style={{ color: proj.priority === 'Critical' ? '#f43f5e' : '#f97316' }}>{proj.priority}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: '800', 
                  fontSize: '1rem',
                  color: proj.readinessScore >= 80 ? '#10b981' : '#f97316'
                }}>
                  {proj.readinessScore}%
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {proj.readinessScore >= 80 ? 'Ready to Staff' : 'Attention Req'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
