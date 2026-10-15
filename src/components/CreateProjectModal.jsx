import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles, Briefcase } from 'lucide-react';
import { SKILLS_CATALOG } from '../data/skills';

export function CreateProjectModal({ onClose, onCreateProject }) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('High');
  const [teamSize, setTeamSize] = useState(5);
  const [duration, setDuration] = useState('6 months');
  const [requiredSkills, setRequiredSkills] = useState([
    { skill: 'Python', proficiency: 'Expert', minExperience: 3 },
    { skill: 'AWS Cloud', proficiency: 'Intermediate', minExperience: 2 }
  ]);

  const handleAddSkill = () => {
    setRequiredSkills([
      ...requiredSkills,
      { skill: 'Docker', proficiency: 'Intermediate', minExperience: 2 }
    ]);
  };

  const handleRemoveSkill = (index) => {
    setRequiredSkills(requiredSkills.filter((_, idx) => idx !== index));
  };

  const handleSkillChange = (index, field, value) => {
    const updated = [...requiredSkills];
    updated[index][field] = value;
    setRequiredSkills(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject = {
      id: `PRJ-00${Math.floor(Math.random() * 90) + 10}`,
      name,
      client: client || 'Enterprise Partner',
      description: description || 'New strategic cross-department initiative.',
      status: 'Upcoming',
      stage: 'Needs Staffing',
      priority,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-06-30',
      duration,
      requiredTeamSize: Number(teamSize),
      assignedEmployees: [],
      estimatedWorkloadPerPerson: 65,
      requiredSkills,
      readinessScore: 78,
      readinessBreakdown: {
        skillCoverage: 85,
        teamAvailability: 75,
        experienceCoverage: 80,
        workloadFeasibility: 72
      }
    };

    onCreateProject(newProject);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-sheet" 
        style={{ maxWidth: '480px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle-bar" />
        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} style={{ color: '#14b8a6' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Create New Project
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="sheet-body">
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PROJECT NAME</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. NextGen LLM Customer Copilot"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  marginTop: '4px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CLIENT</label>
                <input 
                  type="text" 
                  placeholder="e.g. Global Tech"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ width: '110px' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PRIORITY</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    outline: 'none'
                  }}
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TEAM SIZE</label>
                <input 
                  type="number" 
                  min="2"
                  max="12"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>DURATION</label>
                <input 
                  type="text" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    marginTop: '4px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Skills Requirement Builder */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>REQUIRED SKILLS & PROFICIENCY</label>
                <button 
                  type="button" 
                  onClick={handleAddSkill}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#14b8a6',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Plus size={13} />
                  <span>Add Skill</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {requiredSkills.map((req, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <select
                      value={req.skill}
                      onChange={(e) => handleSkillChange(idx, 'skill', e.target.value)}
                      style={{
                        flex: 2,
                        background: '#ffffff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '6px 8px',
                        color: 'var(--text-primary)',
                        fontSize: '0.75rem',
                        outline: 'none'
                      }}
                    >
                      {SKILLS_CATALOG.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>

                    <select
                      value={req.proficiency}
                      onChange={(e) => handleSkillChange(idx, 'proficiency', e.target.value)}
                      style={{
                        flex: 1.5,
                        background: '#ffffff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        padding: '6px 8px',
                        color: 'var(--text-primary)',
                        fontSize: '0.75rem',
                        outline: 'none'
                      }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>

                    <button 
                      type="button"
                      onClick={() => handleRemoveSkill(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sheet-footer">
            <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-cta" style={{ flex: 2 }}>
              <Sparkles size={15} />
              <span>Generate AI Matches</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
