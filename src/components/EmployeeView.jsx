import React, { useState } from 'react';
import { 
  Award, 
  Briefcase, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  MapPin, 
  TrendingUp, 
  Layers,
  BookOpen,
  Calendar,
  Flame,
  Plus
} from 'lucide-react';
import { calculateEmployeeMatch } from '../engine/matchingEngine';

export function EmployeeView({
  activeEmployee,
  projects,
  currentTab = 'home',
  onUpdateSkills
}) {
  const [enrolledCourses, setEnrolledCourses] = useState({});
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('Docker');
  const [newSkillProf, setNewSkillProf] = useState('Intermediate');

  if (!activeEmployee) return null;

  // Workload Tier Badge
  const getWorkloadTier = (workload) => {
    if (workload >= 90) return { label: 'OVERLOADED', color: '#f43f5e', class: 'badge-overloaded' };
    if (workload >= 71) return { label: 'HIGH LOAD', color: '#f59e0b', class: 'badge-high-load' };
    if (workload >= 31) return { label: 'HEALTHY', color: '#10b981', class: 'badge-healthy' };
    return { label: 'UNDERUTILIZED', color: '#38bdf8', class: 'badge-underutilized' };
  };

  const workloadTier = getWorkloadTier(activeEmployee.workload);

  // Match active employee against upcoming projects (e.g. AI Analytics Platform)
  const upcomingProj = projects.find(p => p.id === 'PRJ-006') || projects.find(p => p.status === 'Upcoming') || projects[0];
  const readinessMatch = calculateEmployeeMatch(activeEmployee, upcomingProj);

  // Assigned Projects for this employee
  const myAssignedProjects = projects.filter(p => 
    p.assignedEmployees && p.assignedEmployees.includes(activeEmployee.id)
  );

  // Personalized Recommended Learning Modules based on upcoming project needs
  const recommendedCourses = [
    {
      id: 'CRS-01',
      title: 'Docker Intermediate: Multi-Stage Production Builds',
      targetSkill: 'Docker',
      gap: 'Beginner → Intermediate',
      duration: '2 weeks (8 hrs)',
      urgency: 'High',
      reason: `Required for upcoming ${upcomingProj.name}`
    },
    {
      id: 'CRS-02',
      title: 'Advanced Kubernetes Microservices Mesh & Istio',
      targetSkill: 'Kubernetes',
      gap: '1 level upskill',
      duration: '3 weeks (12 hrs)',
      urgency: 'Medium',
      reason: 'Organization-wide high-demand infrastructure track'
    },
    {
      id: 'CRS-03',
      title: 'Production LLMs & Prompt Engineering Pipelines',
      targetSkill: 'Machine Learning / AI',
      gap: 'Foundational → Applied',
      duration: '4 weeks (16 hrs)',
      urgency: 'High',
      reason: 'Elevates readiness for AI Analytics Platform to 95%'
    }
  ];

  const handleEnroll = (courseId) => {
    setEnrolledCourses(prev => ({ ...prev, [courseId]: true }));
  };

  return (
    <div className="view-content">
      {/* Employee Greeting Header */}
      <div className="iq-card glow-cyan">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src={activeEmployee.avatar} 
            alt={activeEmployee.name} 
            className="emp-avatar" 
            style={{ width: '56px', height: '56px', border: '2px solid #14b8a6' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', color: '#0f766e', fontWeight: 700, textTransform: 'uppercase' }}>
              Employee Intelligence Portal
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Welcome, {activeEmployee.name}
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {activeEmployee.role} • {activeEmployee.department}
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: HOME */}
      {currentTab === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* MY WORKLOAD GAUGE */}
          <div className="iq-card">
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <div className="card-title">
                <Clock size={17} style={{ color: '#06b6d4' }} />
                <span>My Bandwidth & Workload</span>
              </div>
              <span className={`badge ${workloadTier.class}`}>{workloadTier.label}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '2rem', 
                fontWeight: 800, 
                color: workloadTier.color,
                lineHeight: 1
              }}>
                {activeEmployee.workload}%
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                of total capacity utilized
              </span>
            </div>

            <div className="progress-track" style={{ height: '8px', marginBottom: '10px' }}>
              <div 
                className="progress-fill" 
                style={{ width: `${activeEmployee.workload}%`, background: workloadTier.color }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span>Available Capacity: <strong style={{ color: '#059669' }}>{activeEmployee.availability}%</strong></span>
              <span>Open Weekly Hours: <strong>{activeEmployee.availableHours}h</strong></span>
            </div>
          </div>

          {/* PROJECT READINESS (From Prompt) */}
          <div className="iq-card glow-cyan">
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <div className="card-title">
                <Sparkles size={17} style={{ color: '#14b8a6' }} />
                <span>Upcoming Project Readiness</span>
              </div>
              <span className="badge badge-teal">AI Assessment</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {upcomingProj.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Client: {upcomingProj.client} • Starts {upcomingProj.startDate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '1.4rem', 
                  fontWeight: 800, 
                  color: '#0f766e' 
                }}>
                  {readinessMatch?.overallMatchScore || 84}%
                </span>
              </div>
            </div>

            <div style={{ 
              padding: '10px 12px', 
              background: '#f0fdfa', 
              borderRadius: '10px', 
              border: '1px solid #99f6e4',
              fontSize: '0.74rem',
              color: 'var(--text-primary)',
              lineHeight: '1.4'
            }}>
              ✨ <strong>You're {readinessMatch?.overallMatchScore || 84}% ready</strong> for the upcoming <em>{upcomingProj.name}</em> project. 
              Closing the Docker intermediate gap will increase your qualification to 96%.
            </div>
          </div>

          {/* MY ACTIVE PROJECTS PREVIEW */}
          <div className="iq-card">
            <div className="card-header">
              <div className="card-title">
                <Briefcase size={17} style={{ color: '#059669' }} />
                <span>My Active Projects ({myAssignedProjects.length})</span>
              </div>
            </div>

            {myAssignedProjects.length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
                You have no active project commitments. Full 100% capacity is currently open for assignment!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {myAssignedProjects.map((p, idx) => (
                  <div 
                    key={p.id}
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
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        Role: {idx === 0 ? 'Lead Architect' : 'Contributing Engineer'} • {p.duration}
                      </div>
                    </div>
                    <span className="badge badge-cyan">
                      {idx === 0 ? '60% Load' : '20% Load'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MY SKILLS */}
      {currentTab === 'skills' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>
                My Skills & Proficiencies
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {activeEmployee.skills.length} verified competencies
              </span>
            </div>

            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.72rem', padding: '6px 10px' }}
              onClick={() => alert("Skill profile updated! Manager notified for endorsement.")}
            >
              <Plus size={14} />
              <span>Add Skill</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeEmployee.skills.map(skill => (
              <div 
                key={skill.name}
                className="iq-card"
                style={{ padding: '12px 14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{skill.name}</div>
                  <span className={`skill-level level-${skill.proficiency.toLowerCase()}`}>
                    {skill.proficiency}
                  </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {skill.years} years experience • Last applied: {skill.lastUsed}
                </div>

                {skill.certification && (
                  <div style={{ 
                    marginTop: '6px', 
                    fontSize: '0.68rem', 
                    color: '#0f766e', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    background: '#f0fdfa',
                    border: '1px solid #99f6e4',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}>
                    <ShieldCheck size={12} />
                    <span>{skill.certification}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MY PROJECTS */}
      {currentTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>
              My Assigned Projects
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Active commitments and deliverables
            </span>
          </div>

          {myAssignedProjects.length === 0 ? (
            <div className="iq-card" style={{ textAlign: 'center', padding: '30px' }}>
              <Briefcase size={28} style={{ color: '#14b8a6', margin: '0 auto 8px' }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Active Project Allocations</div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Your capacity is open. Managers are evaluating team compositions for upcoming Q4 initiatives.
              </p>
            </div>
          ) : (
            myAssignedProjects.map((p, idx) => (
              <div key={p.id} className="iq-card glow-cyan">
                <div className="card-header" style={{ marginBottom: '6px' }}>
                  <div>
                    <span className="badge badge-cyan">{p.priority} Priority</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {p.name}
                    </h4>
                  </div>
                  <span className="badge badge-healthy">Active</span>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Client: {p.client} • Duration: {p.duration}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  background: 'var(--bg-subtle)', 
                  padding: '8px 12px', 
                  borderRadius: '8px', 
                  fontSize: '0.72rem' 
                }}>
                  <span>My Role: <strong style={{ color: 'var(--text-primary)' }}>{idx === 0 ? 'Lead Architect' : 'Support Developer'}</strong></span>
                  <span>My Allocation: <strong style={{ color: '#0f766e' }}>{idx === 0 ? '60%' : '20%'}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: LEARNING & UPSKILLING */}
      {currentTab === 'learning' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>
              Recommended Learning & Upskilling
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Curated modules to qualify you for upcoming high-priority projects
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recommendedCourses.map(course => (
              <div key={course.id} className="iq-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.68rem', color: '#0f766e', fontWeight: 700 }}>{course.targetSkill} Track</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>{course.title}</div>
                  </div>
                  <span className={`badge ${course.urgency === 'High' ? 'badge-orange' : 'badge-teal'}`}>{course.urgency} Urgency</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <span>Delta: <strong style={{ color: '#d97706' }}>{course.gap}</strong></span>
                  <span>Duration: <strong style={{ color: 'var(--text-primary)' }}>{course.duration}</strong></span>
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: '10px', background: 'var(--bg-subtle)', padding: '6px 8px', borderRadius: '6px' }}>
                  💡 {course.reason}
                </div>

                <button 
                  className={enrolledCourses[course.id] ? "btn-emerald" : "btn-primary"}
                  style={{ width: '100%', padding: '8px', fontSize: '0.75rem' }}
                  onClick={() => handleEnroll(course.id)}
                >
                  {enrolledCourses[course.id] ? (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Enrolled • 25% Progress</span>
                    </>
                  ) : (
                    <>
                      <BookOpen size={15} />
                      <span>Enroll in Module</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE */}
      {currentTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>
              Personal Talent Record
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Verified experience, location & scheduled availability
            </span>
          </div>

          <div className="iq-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Employee ID</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeEmployee.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Total Experience</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeEmployee.totalExperience} Years</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Location</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeEmployee.location}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Work Email</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f766e' }}>{activeEmployee.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Upcoming Leaves</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#d97706' }}>
                  {activeEmployee.leavePeriods.length > 0 ? activeEmployee.leavePeriods[0] : 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
