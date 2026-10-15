import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  Clock,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { CreateProjectModal } from './CreateProjectModal';

export function ProjectsView({
  projects,
  employees,
  onSelectProject,
  onCreateProject
}) {
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'active'
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = projects.filter(p => {
    if (filter === 'upcoming') return p.status === 'Upcoming';
    if (filter === 'active') return p.status === 'Active';
    return true;
  });

  return (
    <div className="view-content">
      {/* Header & Add Project Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
            Project Staffing Pipeline
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            AI-driven team readiness & talent matching
          </span>
        </div>

        <button 
          className="btn-cta" 
          style={{ padding: '8px 14px', fontSize: '0.78rem' }}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={15} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[
          { id: 'all', label: `All Projects (${projects.length})` },
          { id: 'upcoming', label: `Upcoming (${projects.filter(p => p.status === 'Upcoming').length})` },
          { id: 'active', label: `Active (${projects.filter(p => p.status === 'Active').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: filter === tab.id ? '#14b8a6' : 'var(--bg-subtle)',
              color: filter === tab.id ? '#ffffff' : 'var(--text-secondary)',
              border: filter === tab.id ? '1px solid #14b8a6' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredProjects.map(proj => {
          const isReady = proj.readinessScore >= 80;
          const assignedCount = proj.assignedEmployees?.length || 0;
          const assignedProfiles = employees.filter(e => proj.assignedEmployees?.includes(e.id));

          return (
            <div 
              key={proj.id} 
              className={`iq-card ${isReady ? 'glow-cyan' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelectProject(proj)}
            >
              <div className="card-header" style={{ marginBottom: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-teal">{proj.priority}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{proj.id}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '3px' }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Client: {proj.client} • {proj.duration}
                  </div>
                </div>

                {/* Project Readiness Score badge */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: '1.4rem', 
                    fontWeight: 800, 
                    color: isReady ? '#10b981' : '#f97316',
                    lineHeight: 1
                  }}>
                    {proj.readinessScore}%
                  </div>
                  <span className={`badge ${isReady ? 'badge-healthy' : 'badge-high-load'}`} style={{ fontSize: '0.62rem', marginTop: '4px' }}>
                    {isReady ? 'READY TO STAFF' : 'ATTENTION REQ'}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
                {proj.description}
              </p>

              {/* Readiness Breakdown Bar */}
              {proj.readinessBreakdown && (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '4px', 
                  background: 'var(--bg-subtle)', 
                  padding: '8px', 
                  borderRadius: '10px',
                  marginBottom: '12px',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>SKILL COV</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#06b6d4' }}>{proj.readinessBreakdown.skillCoverage}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>AVAILABILITY</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#14b8a6' }}>{proj.readinessBreakdown.teamAvailability}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>EXPERIENCE</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981' }}>{proj.readinessBreakdown.experienceCoverage}%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>FEASIBILITY</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f97316' }}>{proj.readinessBreakdown.workloadFeasibility}%</div>
                  </div>
                </div>
              )}

              {/* Skills Required Chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {proj.requiredSkills.slice(0, 4).map(req => (
                  <span key={req.skill} className="skill-chip">
                    {req.skill}
                    <span className={`skill-level level-${req.proficiency.toLowerCase()}`}>
                      {req.proficiency}
                    </span>
                  </span>
                ))}
                {proj.requiredSkills.length > 4 && (
                  <span className="skill-chip" style={{ color: 'var(--text-muted)' }}>
                    +{proj.requiredSkills.length - 4} more
                  </span>
                )}
              </div>

              {/* Assigned Team Avatars or Staffing Call to Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', marginLeft: '6px' }}>
                    {assignedProfiles.map((member, mIdx) => (
                      <img 
                        key={member.id}
                        src={member.avatar} 
                        alt={member.name}
                        title={member.name}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          marginLeft: mIdx > 0 ? '-8px' : '0',
                          border: '2px solid #ffffff',
                          objectFit: 'cover'
                        }}
                      />
                    ))}
                  </div>

                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {assignedCount > 0 
                      ? `${assignedCount} / ${proj.requiredTeamSize} Staffed`
                      : `Needs ${proj.requiredTeamSize} Members`
                    }
                  </span>
                </div>

                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 12px', fontSize: '0.72rem', gap: '4px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(proj);
                  }}
                >
                  <Sparkles size={13} style={{ color: '#14b8a6' }} />
                  <span>AI Staffing & Gaps</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for creating a new project */}
      {showCreateModal && (
        <CreateProjectModal 
          onClose={() => setShowCreateModal(false)}
          onCreateProject={onCreateProject}
        />
      )}
    </div>
  );
}
