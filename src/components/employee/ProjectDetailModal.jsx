import React from 'react';
import { 
  Briefcase, 
  Layers, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Flag, 
  AlertCircle, 
  ChevronRight, 
  Target,
  FileText,
  Megaphone,
  ArrowRight
} from 'lucide-react';

export function ProjectDetailModal({ project, assignedTasks = [], onClose, onNavigateToTasks }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="project-status-badge active">{project.status}</span>
            <span className="task-id-tag">{project.id}</span>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {/* Project Title & Client */}
          <div className="project-detail-hero">
            <h2 className="project-hero-title">{project.name}</h2>
            <p className="project-client-name">Client: {project.client}</p>
            <div className="employee-role-card">
              <span className="role-label">Your Authorized Role</span>
              <strong className="role-title">{project.employeeRole}</strong>
            </div>
          </div>

          {/* Progress & Milestone Card */}
          <div className="project-stat-strip">
            <div className="stat-col">
              <span className="stat-strip-label">Project Progress</span>
              <strong className="stat-strip-val text-teal">{project.progress}%</strong>
            </div>
            <div className="stat-divider" />
            <div className="stat-col">
              <span className="stat-strip-label">Final Deadline</span>
              <strong className="stat-strip-val">{project.deadline}</strong>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="project-progress-bar-wrap">
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill fill-teal" 
                style={{ width: `${project.progress}%` }} 
              />
            </div>
          </div>

          {/* Next Milestone Box */}
          <div className="milestone-highlight-box">
            <div className="milestone-icon-wrap">
              <Target size={20} />
            </div>
            <div className="milestone-content">
              <span className="milestone-tag">Upcoming Milestone</span>
              <strong className="milestone-name">{project.nextMilestone}</strong>
              <div className="milestone-date-row">
                <Clock size={13} />
                <span>Target: {project.milestoneDate}</span>
              </div>
            </div>
          </div>

          {/* Direct Tasks Shortcut */}
          <div className="project-tasks-shortcut-card">
            <div className="shortcut-info">
              <CheckCircle2 size={20} className="shortcut-icon" />
              <div>
                <strong>Assigned Tasks ({assignedTasks.length})</strong>
                <p>
                  {assignedTasks.filter(t => t.status === 'Completed').length} completed, {' '}
                  {assignedTasks.filter(t => t.status !== 'Completed').length} pending
                </p>
              </div>
            </div>
            <button 
              type="button" 
              className="shortcut-nav-btn"
              onClick={() => {
                onClose();
                onNavigateToTasks(project.id);
              }}
            >
              <span>View Tasks</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Project Description & Objectives */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <FileText size={16} />
              <span>Project Overview & Objectives</span>
            </h4>
            <p className="task-description-text">{project.description}</p>
            <div className="objectives-list">
              {(project.objectives || []).map((obj, i) => (
                <div key={i} className="objective-item">
                  <CheckCircle2 size={15} className="obj-icon" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Responsibilities */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <Briefcase size={16} />
              <span>Your Assigned Responsibilities</span>
            </h4>
            <ul className="responsibilities-list">
              {(project.responsibilities || []).map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>

          {/* Authorized Team Information */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <Users size={16} />
              <span>Authorized Team Members ({project.teamMembers?.length || project.teamSize})</span>
            </h4>
            <div className="team-members-list">
              {(project.teamMembers || []).map((member) => (
                <div key={member.id} className="team-member-item">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="team-member-avatar" 
                  />
                  <div className="team-member-info">
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                  </div>
                  {member.id === 'EMP-101' && (
                    <span className="you-pill">You</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          {project.announcements && project.announcements.length > 0 && (
            <div className="task-section-box">
              <h4 className="section-box-title">
                <Megaphone size={16} />
                <span>Project Announcements</span>
              </h4>
              <div className="announcements-list">
                {project.announcements.map((ann) => (
                  <div key={ann.id} className="announcement-item">
                    <div className="ann-header">
                      <strong>{ann.title}</strong>
                      <span className="ann-date">{ann.date}</span>
                    </div>
                    <p className="ann-body">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Resources */}
          {project.resources && project.resources.length > 0 && (
            <div className="task-section-box">
              <h4 className="section-box-title">
                <ExternalLink size={16} />
                <span>Related Documentation & Resources</span>
              </h4>
              <div className="resources-links">
                {project.resources.map((res, i) => (
                  <a 
                    key={i} 
                    href={res.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="resource-link-chip"
                  >
                    <span>{res.name}</span>
                    <span className="res-type-badge">{res.type}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Read-Only Notice */}
          <div className="official-boundary-notice">
            <AlertCircle size={15} />
            <span>
              Official project membership, budget milestones, and deadlines are managed by Workforce Operations.
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
              onNavigateToTasks(project.id);
            }}
          >
            Open Assigned Project Tasks ({assignedTasks.length})
          </button>
        </div>
      </div>
    </div>
  );
}
