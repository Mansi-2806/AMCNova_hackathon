import React from 'react';
import { 
  Briefcase, 
  Target, 
  Clock, 
  Users, 
  Layers, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export function ProjectsScreen({ 
  projects = [], 
  tasks = [], 
  onOpenProjectDetail,
  onNavigateToTasks 
}) {
  return (
    <div className="tab-view-container">
      {/* Tab Header */}
      <div className="tab-header-card">
        <h2 className="tab-title">My Projects</h2>
        <p className="tab-sub">
          Authorized project assignments and milestone commitments ({projects.length} Active)
        </p>
      </div>

      {/* Projects List */}
      <div className="projects-vertical-list">
        {projects.length === 0 ? (
          <div className="empty-sub-state">
            <Briefcase size={36} className="text-muted" />
            <p>You currently have no active project assignments.</p>
          </div>
        ) : (
          projects.map((project) => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;

            return (
              <div 
                key={project.id} 
                className="project-full-card"
                onClick={() => onOpenProjectDetail(project)}
              >
                {/* Header Row */}
                <div className="proj-card-top-row">
                  <div className="proj-title-group">
                    <span className="proj-id-badge">{project.id}</span>
                    <h3 className="proj-main-name">{project.name}</h3>
                    <span className="proj-client-sub">Client: {project.client}</span>
                  </div>
                  <span className="project-status-badge active">{project.status}</span>
                </div>

                {/* Role Pill */}
                <div className="proj-role-banner">
                  <span className="role-chip-label">Your Role:</span>
                  <strong className="role-chip-name">{project.employeeRole}</strong>
                </div>

                {/* Description snippet */}
                <p className="proj-desc-snippet">{project.description}</p>

                {/* Next Milestone */}
                <div className="proj-milestone-pill-box">
                  <Target size={16} className="text-teal" />
                  <div className="milestone-text-group">
                    <span className="milestone-small-tag">Next Milestone</span>
                    <strong className="milestone-small-val">{project.nextMilestone}</strong>
                  </div>
                  <span className="milestone-target-date">Target: {project.milestoneDate}</span>
                </div>

                {/* Progress Bar */}
                <div className="proj-progress-section">
                  <div className="proj-progress-labels">
                    <span className="progress-label-text">Overall Project Health</span>
                    <strong className="progress-pct-text text-teal">{project.progress}%</strong>
                  </div>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill fill-teal" 
                      style={{ width: `${project.progress}%` }} 
                    />
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="proj-card-footer">
                  <div className="footer-meta-item">
                    <Calendar size={13} />
                    <span>Deadline: {project.deadline}</span>
                  </div>

                  <div className="footer-meta-item">
                    <Users size={13} />
                    <span>{project.teamMembers?.length || project.teamSize} Team Members</span>
                  </div>

                  <button 
                    type="button" 
                    className="open-tasks-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToTasks(project.id);
                    }}
                  >
                    <span>Tasks ({completedTasks}/{projectTasks.length})</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Organizational Notice */}
      <div className="official-boundary-notice">
        <ShieldCheck size={16} />
        <span>
          Project assignments and staffing rosters are governed by Workforce Resource Management.
        </span>
      </div>
    </div>
  );
}
