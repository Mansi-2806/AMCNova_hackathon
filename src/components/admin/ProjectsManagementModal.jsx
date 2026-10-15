import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  X, 
  CheckCircle2, 
  Clock, 
  Users, 
  Calendar, 
  AlertTriangle, 
  ChevronRight, 
  ShieldCheck, 
  Tag, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function ProjectsManagementModal({
  isOpen,
  onClose,
  projects = [],
  employees = [],
  onNavigateToTeamBuilder
}) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // New Project Form State
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('High');
  const [newDeadline, setNewDeadline] = useState('2027-03-31');
  const [newTeamSize, setNewTeamSize] = useState(4);
  const [newSkillsStr, setNewSkillsStr] = useState('React, Node.js, Cloud');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const filteredProjects = projects.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const activeProject = projects.find(p => p.id === selectedProjectId);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) {
      setFormError('Please fill in Project Name and Description.');
      return;
    }

    const skills = newSkillsStr.split(',').map(s => s.trim()).filter(Boolean);

    talentSyncStore.createProject({
      name: newName.trim(),
      client: newClient.trim() || 'Internal Enterprise',
      description: newDesc.trim(),
      priority: newPriority,
      deadline: newDeadline,
      requiredTeamSize: Number(newTeamSize),
      requiredSkills: skills.length > 0 ? skills : ['General Software Engineering']
    });

    // Reset and hide form
    setNewName('');
    setNewClient('');
    setNewDesc('');
    setFormError('');
    setShowCreateForm(false);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-sheet">
        {/* MODAL HEADER */}
        <div className="admin-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Briefcase size={20} className="text-blue-primary" />
            </div>
            <div>
              <h2 className="modal-title">Project & Resource Management</h2>
              <span className="modal-subtitle">Organization staffing allocation & delivery tracking</span>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="admin-modal-body">
          {/* TOP CONTROLS */}
          <div className="projects-controls-bar">
            <div className="status-filters-pills">
              {['all', 'active', 'planning & staffing', 'upcoming'].map(st => (
                <button
                  key={st}
                  type="button"
                  className={`status-pill ${filterStatus === st ? 'active' : ''}`}
                  onClick={() => setFilterStatus(st)}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>

            <button 
              type="button" 
              className="admin-btn-sm admin-btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Plus size={14} />
              <span>New Project</span>
            </button>
          </div>

          {/* CREATE PROJECT FORM DRAWER */}
          {showCreateForm && (
            <form onSubmit={handleCreateProject} className="admin-card create-project-card">
              <div className="card-sec-header">
                <h3>Define New Enterprise Project</h3>
                <button 
                  type="button" 
                  className="icon-btn-ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  <X size={15} />
                </button>
              </div>

              {formError && (
                <div className="form-error-banner">{formError}</div>
              )}

              <div className="form-fields-grid">
                <div className="field-group">
                  <label>Project Name *</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="e.g. Apollo Cloud Migration" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)} 
                    required 
                  />
                </div>

                <div className="field-group">
                  <label>Client / Division</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    placeholder="e.g. Fintech Business Unit" 
                    value={newClient} 
                    onChange={e => setNewClient(e.target.value)} 
                  />
                </div>

                <div className="field-group full-width">
                  <label>Description & Objectives *</label>
                  <textarea 
                    className="admin-textarea" 
                    rows={2} 
                    placeholder="Briefly describe project scope and milestones..."
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    required
                  />
                </div>

                <div className="field-group">
                  <label>Priority</label>
                  <select 
                    className="admin-select"
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value)}
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Deadline</label>
                  <input 
                    type="date" 
                    className="admin-input"
                    value={newDeadline}
                    onChange={e => setNewDeadline(e.target.value)}
                  />
                </div>

                <div className="field-group">
                  <label>Required Team Size</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={12} 
                    className="admin-input"
                    value={newTeamSize}
                    onChange={e => setNewTeamSize(e.target.value)}
                  />
                </div>

                <div className="field-group full-width">
                  <label>Required Skills (comma separated)</label>
                  <input 
                    type="text" 
                    className="admin-input"
                    placeholder="e.g. React, Kotlin, Docker, AWS"
                    value={newSkillsStr}
                    onChange={e => setNewSkillsStr(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-submit-row">
                <button 
                  type="button" 
                  className="admin-btn admin-btn-ghost"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary"
                >
                  Create & Initialize Staffing
                </button>
              </div>
            </form>
          )}

          {/* PROJECT LIST */}
          <div className="projects-grid-list">
            {filteredProjects.map(proj => {
              const assignedCount = proj.assignedEmployees?.length || 0;
              const requiredCount = proj.requiredTeamSize || 4;
              const isShortage = assignedCount < requiredCount;

              return (
                <div key={proj.id} className="admin-card project-card-item">
                  <div className="project-card-top">
                    <div>
                      <div className="proj-id-badge">
                        <span>{proj.id}</span>
                        <span className={`priority-tag tag-${(proj.priority || 'Medium').toLowerCase()}`}>
                          {proj.priority}
                        </span>
                      </div>
                      <h3 className="project-card-title">{proj.name}</h3>
                      <span className="project-client-sub">{proj.client}</span>
                    </div>

                    <span className={`status-badge badge-${(proj.status || 'Active').toLowerCase()}`}>
                      {proj.status}
                    </span>
                  </div>

                  <p className="project-card-desc">{proj.description}</p>

                  {/* Staffing Progress Meter */}
                  <div className="staffing-status-box">
                    <div className="staffing-label-row">
                      <span className="staff-lbl">Staffing Allocation:</span>
                      <strong className={`staff-val ${isShortage ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {assignedCount} of {requiredCount} Positions Filled
                      </strong>
                    </div>

                    <div className="staff-meter-track">
                      <div 
                        className={`staff-meter-fill ${isShortage ? 'fill-amber' : 'fill-emerald'}`}
                        style={{ width: `${Math.min(100, (assignedCount / Math.max(1, requiredCount)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Assigned Team Avatars */}
                  <div className="project-team-row">
                    <span className="team-sub-lbl">Assigned Team:</span>
                    {assignedCount === 0 ? (
                      <span className="empty-team-flag">No staff allocated yet</span>
                    ) : (
                      <div className="team-avatars-stack">
                        {proj.assignedEmployees.map(empId => {
                          const emp = employees.find(e => e.id === empId);
                          return (
                            <img 
                              key={empId} 
                              src={emp?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                              alt={emp?.name || empId}
                              title={`${emp?.name} (${emp?.role})`}
                              className="team-avatar-circle"
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Required Skills Chips */}
                  <div className="proj-skills-chips-row">
                    {(proj.requiredSkills || []).slice(0, 3).map(skill => (
                      <span key={skill} className="skill-chip-sm">{skill}</span>
                    ))}
                    {(proj.requiredSkills?.length || 0) > 3 && (
                      <span className="skill-chip-more">+{proj.requiredSkills.length - 3}</span>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="proj-card-actions">
                    <div className="deadline-tag">
                      <Calendar size={13} />
                      <span>Due {proj.deadline || '2027-02-28'}</span>
                    </div>

                    {isShortage ? (
                      <button 
                        type="button" 
                        className="admin-btn-sm admin-btn-primary"
                        onClick={() => {
                          onClose();
                          if (onNavigateToTeamBuilder) onNavigateToTeamBuilder(proj.id);
                        }}
                      >
                        <Sparkles size={13} />
                        <span>Staff with AI</span>
                      </button>
                    ) : (
                      <span className="badge-pill green-badge">
                        <CheckCircle2 size={12} /> Staffed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
