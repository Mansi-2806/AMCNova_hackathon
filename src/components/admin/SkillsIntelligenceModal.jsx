import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  X, 
  Award, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Building2, 
  Users, 
  Search, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export function SkillsIntelligenceModal({
  isOpen,
  onClose,
  employees = [],
  projects = []
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'gaps' | 'training'
  const [searchSkill, setSearchSkill] = useState('');

  if (!isOpen) return null;

  // 1. Organization Skills Aggregation
  const skillsInventory = useMemo(() => {
    const map = {};
    employees.forEach(emp => {
      (emp.skills || []).forEach(s => {
        const key = s.name;
        if (!map[key]) {
          map[key] = {
            name: s.name,
            totalCount: 0,
            departments: new Set(),
            levels: { Beginner: 0, Intermediate: 0, Advanced: 0, Expert: 0 },
            experts: []
          };
        }
        map[key].totalCount += 1;
        map[key].departments.add(emp.department);
        if (map[key].levels[s.level] !== undefined) {
          map[key].levels[s.level] += 1;
        }
        if (s.level === 'Expert' || s.level === 'Advanced') {
          map[key].experts.push({ name: emp.name, avatar: emp.avatar, role: emp.role, id: emp.id });
        }
      });
    });

    return Object.values(map).sort((a, b) => b.totalCount - a.totalCount);
  }, [employees]);

  const filteredSkills = useMemo(() => {
    if (!searchSkill.trim()) return skillsInventory;
    return skillsInventory.filter(s => s.name.toLowerCase().includes(searchSkill.toLowerCase()));
  }, [skillsInventory, searchSkill]);

  // 2. Skill Gaps vs Project Requirements
  const skillGaps = useMemo(() => {
    const requiredSkillsMap = {};
    projects.forEach(p => {
      (p.requiredSkills || []).forEach(s => {
        if (!requiredSkillsMap[s]) {
          requiredSkillsMap[s] = { skill: s, projectCount: 0, projects: [] };
        }
        requiredSkillsMap[s].projectCount += 1;
        requiredSkillsMap[s].projects.push(p.name);
      });
    });

    return Object.keys(requiredSkillsMap).map(s => {
      const avail = skillsInventory.find(inv => inv.name.toLowerCase() === s.toLowerCase());
      const availableExperts = avail ? avail.experts.length : 0;
      const projectsNeeding = requiredSkillsMap[s].projectCount;
      const isCriticalGap = availableExperts < projectsNeeding;

      return {
        skill: s,
        neededInProjects: projectsNeeding,
        projectNames: requiredSkillsMap[s].projects,
        availableExperts,
        isCriticalGap,
        severity: isCriticalGap ? 'Critical' : 'Moderate',
        suggestedAction: isCriticalGap 
          ? `Upskill 2 engineers from QA/DevOps via certified bootcamps` 
          : `Adequately staffed across ${projectsNeeding} initiatives`
      };
    }).sort((a, b) => (b.isCriticalGap ? 1 : 0) - (a.isCriticalGap ? 1 : 0));
  }, [projects, skillsInventory]);

  // 3. Recommended Training & Upskilling Programs
  const trainingPrograms = [
    {
      id: 'TRN-01',
      title: 'Certified Kubernetes Administrator (CKA) & Cloud Security',
      targetSkill: 'Cloud Architecture & Kubernetes',
      domain: 'Software Engineering & Cloud',
      duration: '6 Weeks (Self-paced + Mentor Labs)',
      eligibleEmployees: employees.filter(e => e.department === 'Software Engineering' && !e.skills?.some(s => s.name.includes('Cyber'))).slice(0, 3),
      type: 'AI-Recommended Upskilling'
    },
    {
      id: 'TRN-02',
      title: 'Enterprise Zero-Trust & Network Defense Specialization',
      targetSkill: 'Cybersecurity',
      domain: 'Security & Operations',
      duration: '4 Weeks Bootcamp',
      eligibleEmployees: employees.filter(e => e.skills?.some(s => s.name.includes('DevOps') || s.name.includes('Cloud'))).slice(0, 2),
      type: 'AI-Recommended Upskilling'
    },
    {
      id: 'TRN-03',
      title: 'Deep Learning & LLM Systems Architecture',
      targetSkill: 'AI / Machine Learning',
      domain: 'Data Science & Research',
      duration: '8 Weeks Intensive',
      eligibleEmployees: employees.filter(e => e.department === 'Data Science & AI').slice(0, 2),
      type: 'AI-Recommended Upskilling'
    }
  ];

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-sheet">
        {/* HEADER */}
        <div className="admin-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <GraduationCap size={20} className="text-blue-primary" />
            </div>
            <div>
              <h2 className="modal-title">Skills & Training Intelligence</h2>
              <span className="modal-subtitle">Enterprise competency graph & proactive talent upskilling</span>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="admin-modal-body">
          {/* TAB BAR */}
          <div className="requests-filter-pills">
            <button 
              type="button" 
              className={`filter-pill ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              Skills Inventory ({skillsInventory.length})
            </button>
            <button 
              type="button" 
              className={`filter-pill ${activeTab === 'gaps' ? 'active' : ''}`}
              onClick={() => setActiveTab('gaps')}
            >
              Skill Gaps ({skillGaps.filter(g => g.isCriticalGap).length} Critical)
            </button>
            <button 
              type="button" 
              className={`filter-pill ${activeTab === 'training' ? 'active' : ''}`}
              onClick={() => setActiveTab('training')}
            >
              AI Upskilling Pathways
            </button>
          </div>

          {/* TAB 1: SKILLS INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="skills-inventory-tab">
              {/* Search */}
              <div className="skill-search-box">
                <Search size={15} className="text-muted" />
                <input 
                  type="text" 
                  className="admin-input-sm w-full"
                  placeholder="Search technical or operational competencies..."
                  value={searchSkill}
                  onChange={e => setSearchSkill(e.target.value)}
                />
              </div>

              <div className="skills-grid-cards">
                {filteredSkills.map(skill => (
                  <div key={skill.name} className="admin-card skill-summary-card">
                    <div className="skill-card-top">
                      <div className="skill-title-block">
                        <Award size={16} className="text-blue-primary" />
                        <h4 className="skill-name">{skill.name}</h4>
                      </div>
                      <span className="skill-staff-count">{skill.totalCount} Specialists</span>
                    </div>

                    {/* Proficiency breakdown */}
                    <div className="prof-levels-row">
                      <span className="prof-tag">Adv/Exp: {skill.levels.Advanced + skill.levels.Expert}</span>
                      <span className="prof-tag">Inter: {skill.levels.Intermediate}</span>
                      <span className="prof-tag">Beg: {skill.levels.Beginner}</span>
                    </div>

                    {/* Department reach */}
                    <div className="skill-depts-line">
                      <span className="text-xs text-muted">Departments: </span>
                      <span className="text-xs font-medium">{Array.from(skill.departments).join(', ')}</span>
                    </div>

                    {/* Top Experts Avatars */}
                    {skill.experts.length > 0 && (
                      <div className="skill-experts-row">
                        <span className="text-xs text-muted">Key Experts:</span>
                        <div className="experts-avatars-stack">
                          {skill.experts.slice(0, 3).map(exp => (
                            <img 
                              key={exp.id} 
                              src={exp.avatar} 
                              alt={exp.name} 
                              title={`${exp.name} (${exp.role})`}
                              className="expert-avatar" 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SKILL GAPS */}
          {activeTab === 'gaps' && (
            <div className="skills-gaps-tab">
              <div className="gaps-explainer-banner">
                <Sparkles size={16} className="text-blue-primary" />
                <p>
                  AI evaluates incoming and active project commitments against senior staff competencies to flag delivery bottlenecks.
                </p>
              </div>

              <div className="gaps-stack">
                {skillGaps.map(gap => (
                  <div key={gap.skill} className={`admin-card gap-item-card ${gap.isCriticalGap ? 'is-critical' : ''}`}>
                    <div className="gap-top-row">
                      <div>
                        <div className="gap-title-group">
                          <h4 className="gap-skill-name">{gap.skill}</h4>
                          <span className={`priority-tag tag-${gap.severity.toLowerCase()}`}>
                            {gap.severity} Shortage
                          </span>
                        </div>
                        <span className="gap-projects-sub">
                          Required by {gap.neededInProjects} Project(s): {gap.projectNames.join(', ')}
                        </span>
                      </div>

                      <div className="gap-ratio-box">
                        <span className="ratio-number">{gap.availableExperts} / {gap.neededInProjects}</span>
                        <span className="ratio-label">Avail vs Req</span>
                      </div>
                    </div>

                    <div className="gap-action-box">
                      <span className="action-label">Recommendation:</span>
                      <p className="action-text">{gap.suggestedAction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TRAINING & UPSKILLING PATHWAYS */}
          {activeTab === 'training' && (
            <div className="training-pathways-tab">
              <div className="gaps-explainer-banner">
                <BookOpen size={16} className="text-blue-primary" />
                <p>
                  Curated internal and industry training pathways designed to close high-priority organizational talent shortages.
                </p>
              </div>

              <div className="training-programs-stack">
                {trainingPrograms.map(prog => (
                  <div key={prog.id} className="admin-card program-card">
                    <div className="prog-card-top">
                      <div>
                        <span className="ai-rec-tag">
                          <Sparkles size={11} className="inline mr-1" />
                          {prog.type}
                        </span>
                        <h4 className="prog-title">{prog.title}</h4>
                        <span className="prog-domain">{prog.domain} • {prog.duration}</span>
                      </div>
                      <span className="badge-pill blue-badge">{prog.targetSkill}</span>
                    </div>

                    <div className="candidates-for-prog">
                      <span className="cand-for-lbl">Top Recommended Candidates:</span>
                      <div className="cand-chips-row">
                        {prog.eligibleEmployees.map(emp => (
                          <div key={emp.id} className="cand-training-chip">
                            <img src={emp.avatar} alt={emp.name} className="cand-chip-avatar" />
                            <span>{emp.name} ({emp.role})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="prog-footer">
                      <span className="text-xs text-muted">Est. Readiness Impact: +20% proficiency in target sprint</span>
                      <button type="button" className="admin-btn-sm admin-btn-outline">
                        Enroll Candidates
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
