import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Briefcase, 
  Sliders, 
  Award, 
  Clock, 
  Calendar, 
  Search, 
  Check, 
  Plus, 
  ArrowRight, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp,
  BarChart,
  Layers,
  HelpCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function AITeamBuilderView({
  projects = [],
  employees = [],
  onAllocationSuccess
}) {
  // 1. Project Selection State
  // Default to PRJ-005 (CyberShield) or first project with open positions
  const defaultProj = projects.find(p => (p.assignedEmployees?.length || 0) < (p.requiredTeamSize || 4)) || projects[0];
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProj ? defaultProj.id : 'PRJ-005');

  const currentProject = projects.find(p => p.id === selectedProjectId) || defaultProj;

  // 2. Custom Match Constraints State
  const [targetTeamSize, setTargetTeamSize] = useState(currentProject?.requiredTeamSize || 4);
  const [workloadHoursRequired, setWorkloadHoursRequired] = useState(20);
  const [minProficiency, setMinProficiency] = useState('Intermediate');
  const [minExperience, setMinExperience] = useState(3);
  const [selectedSkills, setSelectedSkills] = useState(
    currentProject?.requiredSkills || ['Cloud Architecture', 'Cybersecurity', 'Python']
  );
  const [newSkillInput, setNewSkillInput] = useState('');

  // 3. Selection & Roster State
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState(
    currentProject?.assignedEmployees || []
  );
  const [compareIds, setCompareIds] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const [allocationStatus, setAllocationStatus] = useState(null); // 'success' | null
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);

  // When project changes, refresh target parameters
  const handleSelectProject = (projId) => {
    setSelectedProjectId(projId);
    const p = projects.find(x => x.id === projId);
    if (p) {
      setTargetTeamSize(p.requiredTeamSize || 4);
      setSelectedSkills(p.requiredSkills || ['Cloud Architecture', 'Python']);
      setSelectedEmployeeIds(p.assignedEmployees || []);
      setAllocationStatus(null);
    }
  };

  // 4. Transparent AI Matching Algorithm (Multi-Factor Rule Engine)
  const rankedCandidates = useMemo(() => {
    if (!employees || employees.length === 0) return [];

    const proficiencyWeights = {
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3,
      'Expert': 4
    };
    const reqProfLevel = proficiencyWeights[minProficiency] || 2;

    return employees.map(emp => {
      // a. Skill Match Calculation
      let matchedSkills = [];
      let totalSkillScore = 0;

      selectedSkills.forEach(reqSkill => {
        const found = emp.skills?.find(s => 
          s.name.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(s.name.toLowerCase())
        );
        if (found) {
          const empProfLevel = proficiencyWeights[found.level] || 2;
          const profRatio = Math.min(1.2, empProfLevel / reqProfLevel);
          matchedSkills.push({ name: found.name, level: found.level, score: profRatio });
          totalSkillScore += profRatio;
        }
      });

      const skillMatchRatio = selectedSkills.length > 0 
        ? (matchedSkills.length / selectedSkills.length) * 0.7 + (totalSkillScore / (selectedSkills.length * 1.2)) * 0.3
        : 0.8;
      const skillMatchPct = Math.min(99, Math.round(skillMatchRatio * 100));

      // b. Availability & Capacity Scoring
      const availableHours = emp.availableHours !== undefined ? emp.availableHours : Math.max(0, 40 - (emp.assignedHours || 30));
      const hasSufficientHours = availableHours >= workloadHoursRequired;
      const capacityRatio = Math.min(1, availableHours / Math.max(1, workloadHoursRequired));
      
      // c. Experience factor
      const expRatio = Math.min(1.2, (emp.totalExperience || 1) / Math.max(1, minExperience));

      // d. Potential Conflicts
      const hasConflict = (emp.schedulingConflicts && emp.schedulingConflicts.length > 0) || (emp.workload >= 100);
      const conflictPenalty = hasConflict ? 15 : 0;

      // Composite Match Score (0 - 100)
      let compositeScore = Math.round(
        (skillMatchPct * 0.50) + 
        (capacityRatio * 30) + 
        (Math.min(1, expRatio) * 20) - 
        conflictPenalty
      );
      compositeScore = Math.max(15, Math.min(98, compositeScore));

      // Generate transparent explanation
      let explanation = '';
      if (compositeScore >= 85) {
        explanation = `High match: Matched ${matchedSkills.length}/${selectedSkills.length} key skills, ${availableHours}h available capacity, solid experience.`;
      } else if (compositeScore >= 70) {
        explanation = `Good fit: Matched ${matchedSkills.length} skills with ${availableHours}h bandwidth. Minor workload balancing recommended.`;
      } else if (hasConflict) {
        explanation = `Constraint Alert: Capacity is tight (${emp.workload}% current workload). Requires shifting existing commitments.`;
      } else {
        explanation = `Skill gap: Matches only ${matchedSkills.length} of ${selectedSkills.length} required competencies. Upskilling required.`;
      }

      return {
        ...emp,
        matchScore: compositeScore,
        matchedSkills,
        unmatchedSkills: selectedSkills.filter(s => !matchedSkills.some(m => m.name.toLowerCase() === s.toLowerCase())),
        availableHours,
        hasSufficientHours,
        hasConflict,
        explanation
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [employees, selectedSkills, minProficiency, minExperience, workloadHoursRequired]);

  // 5. Team Readiness & Roster Stats
  const teamRosterStats = useMemo(() => {
    const selectedEmps = rankedCandidates.filter(c => selectedEmployeeIds.includes(c.id));
    if (selectedEmps.length === 0) {
      return { count: 0, avgMatch: 0, totalCapacity: 0, skillsCoveredPct: 0, readiness: 0 };
    }

    const avgMatch = Math.round(selectedEmps.reduce((acc, c) => acc + c.matchScore, 0) / selectedEmps.length);
    const totalCapacity = selectedEmps.reduce((acc, c) => acc + c.availableHours, 0);

    // Check unique skills covered
    const allMatchedSkillNames = new Set(selectedEmps.flatMap(e => e.matchedSkills.map(m => m.name.toLowerCase())));
    const coveredCount = selectedSkills.filter(s => 
      allMatchedSkillNames.has(s.toLowerCase()) || 
      [...allMatchedSkillNames].some(name => name.includes(s.toLowerCase()) || s.toLowerCase().includes(name))
    ).length;
    
    const skillsCoveredPct = selectedSkills.length > 0 
      ? Math.round((coveredCount / selectedSkills.length) * 100) 
      : 100;

    const sizeCompletion = Math.min(1, selectedEmps.length / Math.max(1, targetTeamSize));
    const readiness = Math.round((avgMatch * 0.4) + (skillsCoveredPct * 0.3) + (sizeCompletion * 30));

    return {
      count: selectedEmps.length,
      avgMatch,
      totalCapacity,
      skillsCoveredPct,
      readiness: Math.min(100, readiness)
    };
  }, [rankedCandidates, selectedEmployeeIds, selectedSkills, targetTeamSize]);

  // Toggle candidate selection
  const handleToggleSelect = (empId) => {
    setSelectedEmployeeIds(prev => 
      prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
    );
  };

  // Compare candidates
  const handleToggleCompare = (empId) => {
    setCompareIds(prev => {
      if (prev.includes(empId)) {
        return prev.filter(id => id !== empId);
      }
      if (prev.length >= 2) {
        return [prev[1], empId]; // keep last 2
      }
      return [...prev, empId];
    });
  };

  // Add custom skill tag
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !selectedSkills.includes(newSkillInput.trim())) {
      setSelectedSkills([...selectedSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skillToRemove));
  };

  // Confirm Team Allocation Action
  const handleConfirmAllocation = () => {
    if (selectedEmployeeIds.length === 0) {
      alert('Please select at least one employee for the proposed team roster.');
      return;
    }

    talentSyncStore.allocateTeamToProject(selectedProjectId, selectedEmployeeIds);
    setAllocationStatus('success');

    if (onAllocationSuccess) {
      onAllocationSuccess(selectedProjectId, selectedEmployeeIds);
    }

    setTimeout(() => {
      setAllocationStatus(null);
    }, 4500);
  };

  return (
    <div className="tab-view-container admin-team-builder-container">
      {/* HEADER BANNER */}
      <div className="admin-view-header">
        <div className="admin-header-title-row">
          <div>
            <div className="admin-sub-tag">
              <Sparkles size={12} className="text-blue-primary" />
              <span>AI Multi-Factor Allocation Engine</span>
            </div>
            <h1 className="admin-header-title">AI Team Builder</h1>
          </div>
          <button 
            type="button" 
            className="filter-toggle-btn admin-tune-btn"
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            title="Configure Target Constraints"
          >
            <Sliders size={16} />
            <span>Constraints</span>
          </button>
        </div>
        <p className="admin-header-subtitle">
          Rule-based heuristic matching evaluates skill relevance, proficiency depth, available bandwidth, and workload balance.
        </p>
      </div>

      {/* ALLOCATION SUCCESS BANNER */}
      {allocationStatus === 'success' && (
        <div className="admin-success-banner" role="alert">
          <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
          <div className="banner-content">
            <h4>Team Allocation Confirmed & Synced!</h4>
            <p>
              Successfully assigned {selectedEmployeeIds.length} specialists to <strong>{currentProject?.name}</strong>. 
              Workload records, project capacity, and employee portal assignments have been synchronized in real time.
            </p>
          </div>
          <button 
            type="button" 
            className="banner-close-btn"
            onClick={() => setAllocationStatus(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. PROJECT TARGET SELECTOR */}
      <div className="admin-card project-picker-card">
        <div className="card-sec-header">
          <div className="sec-title-group">
            <Briefcase size={16} className="text-blue-primary" />
            <h3>Target Project Staffing Requirement</h3>
          </div>
          <span className="badge-pill blue-badge">
            {currentProject?.status || 'Active'}
          </span>
        </div>

        <div className="project-select-field">
          <label htmlFor="project-select">Select Project to Staff:</label>
          <select 
            id="project-select" 
            className="admin-select"
            value={selectedProjectId}
            onChange={(e) => handleSelectProject(e.target.value)}
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.id} — {p.name} ({p.assignedEmployees?.length || 0}/{p.requiredTeamSize || 4} Staffed)
              </option>
            ))}
          </select>
        </div>

        {/* Project Meta summary */}
        {currentProject && (
          <div className="project-meta-grid">
            <div className="meta-box">
              <span className="meta-label">Priority</span>
              <span className={`meta-val priority-tag tag-${(currentProject.priority || 'Medium').toLowerCase()}`}>
                {currentProject.priority}
              </span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Target Team</span>
              <span className="meta-val">{targetTeamSize} Members</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Workload/Role</span>
              <span className="meta-val">{workloadHoursRequired}h / week</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Target Deadline</span>
              <span className="meta-val">{currentProject.deadline || '2027-02-28'}</span>
            </div>
          </div>
        )}

        {/* Required Skills Chips */}
        <div className="skills-req-section">
          <div className="skills-req-header">
            <span className="meta-label">Required Skills Profile:</span>
            <span className="skills-count-tag">{selectedSkills.length} Required</span>
          </div>
          <div className="skills-tags-wrap">
            {selectedSkills.map(skill => (
              <span key={skill} className="skill-chip active-chip">
                {skill}
                <button 
                  type="button" 
                  className="chip-remove" 
                  onClick={() => handleRemoveSkill(skill)}
                  title={`Remove ${skill}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <form onSubmit={handleAddSkill} className="add-skill-inline-form">
            <input 
              type="text" 
              className="admin-input-sm"
              placeholder="+ Add required skill (e.g. AWS, React)..."
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
            />
            <button type="submit" className="admin-btn-sm admin-btn-outline">
              <Plus size={14} /> Add
            </button>
          </form>
        </div>
      </div>

      {/* 2. CONSTRAINTS ACCORDION DRAWER */}
      {showConfigDrawer && (
        <div className="admin-card config-drawer-card">
          <div className="card-sec-header">
            <div className="sec-title-group">
              <Sliders size={16} className="text-blue-primary" />
              <h3>Refine Allocation Constraints</h3>
            </div>
            <button 
              type="button" 
              className="icon-btn-ghost"
              onClick={() => setShowConfigDrawer(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="constraints-form-grid">
            <div className="form-group-item">
              <label>Target Team Size</label>
              <div className="stepper-wrap">
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setTargetTeamSize(Math.max(1, targetTeamSize - 1))}
                >-</button>
                <span className="stepper-val">{targetTeamSize}</span>
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setTargetTeamSize(Math.min(8, targetTeamSize + 1))}
                >+</button>
              </div>
            </div>

            <div className="form-group-item">
              <label>Workload Required (h/wk)</label>
              <div className="stepper-wrap">
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setWorkloadHoursRequired(Math.max(10, workloadHoursRequired - 5))}
                >-</button>
                <span className="stepper-val">{workloadHoursRequired}h</span>
                <button 
                  type="button" 
                  className="stepper-btn"
                  onClick={() => setWorkloadHoursRequired(Math.min(40, workloadHoursRequired + 5))}
                >+</button>
              </div>
            </div>

            <div className="form-group-item">
              <label>Min Skill Proficiency</label>
              <select 
                className="admin-select"
                value={minProficiency}
                onChange={(e) => setMinProficiency(e.target.value)}
              >
                <option value="Beginner">Beginner & Up</option>
                <option value="Intermediate">Intermediate & Up</option>
                <option value="Advanced">Advanced & Up</option>
                <option value="Expert">Expert Only</option>
              </select>
            </div>

            <div className="form-group-item">
              <label>Min Experience</label>
              <select 
                className="admin-select"
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
              >
                <option value={1}>1+ Years</option>
                <option value={3}>3+ Years</option>
                <option value={5}>5+ Years</option>
                <option value={7}>7+ Years</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROPOSED TEAM ROSTER DOCK */}
      <div className="admin-card team-roster-dock-card">
        <div className="roster-top-bar">
          <div>
            <span className="admin-sub-tag">Proposed Team Roster</span>
            <div className="roster-headline">
              <h3>{selectedEmployeeIds.length} of {targetTeamSize} Selected</h3>
              <div className={`readiness-pill readiness-${teamRosterStats.readiness >= 80 ? 'high' : 'medium'}`}>
                <Zap size={13} />
                <span>{teamRosterStats.readiness}% Team Readiness</span>
              </div>
            </div>
          </div>

          <button 
            type="button"
            className="admin-btn admin-btn-primary confirm-alloc-btn"
            onClick={handleConfirmAllocation}
            disabled={selectedEmployeeIds.length === 0}
          >
            <ShieldCheck size={16} />
            <span>Confirm Allocation</span>
          </button>
        </div>

        {/* Live Roster Metrics Grid */}
        <div className="roster-metrics-row">
          <div className="roster-stat-cell">
            <span className="roster-stat-num">{teamRosterStats.avgMatch}%</span>
            <span className="roster-stat-lbl">Avg Match</span>
          </div>
          <div className="roster-stat-cell">
            <span className="roster-stat-num">{teamRosterStats.skillsCoveredPct}%</span>
            <span className="roster-stat-lbl">Skills Covered</span>
          </div>
          <div className="roster-stat-cell">
            <span className="roster-stat-num">{teamRosterStats.totalCapacity}h</span>
            <span className="roster-stat-lbl">Avail Bandwidth</span>
          </div>
        </div>

        {/* Selected Avatars Strip */}
        <div className="selected-roster-strip">
          {selectedEmployeeIds.length === 0 ? (
            <div className="empty-roster-msg">
              <Users size={16} className="text-muted" />
              <span>No candidates selected yet. Pick from ranked recommendations below.</span>
            </div>
          ) : (
            <div className="roster-chips-scroll">
              {selectedEmployeeIds.map(empId => {
                const emp = employees.find(e => e.id === empId);
                if (!emp) return null;
                return (
                  <div key={empId} className="roster-emp-chip">
                    <img src={emp.avatar} alt={emp.name} className="roster-chip-avatar" />
                    <span className="roster-chip-name">{emp.name.split(' ')[0]}</span>
                    <button 
                      type="button" 
                      className="chip-unselect"
                      onClick={() => handleToggleSelect(empId)}
                      title="Remove from roster"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 4. CANDIDATE COMPARISON MODAL / DRAWER */}
      {compareIds.length === 2 && (
        <div className="admin-card comparison-card">
          <div className="card-sec-header">
            <div className="sec-title-group">
              <TrendingUp size={16} className="text-blue-primary" />
              <h3>Side-by-Side Candidate Comparison</h3>
            </div>
            <button 
              type="button" 
              className="icon-btn-ghost"
              onClick={() => setCompareIds([])}
            >
              <X size={16} />
            </button>
          </div>

          <div className="comparison-grid-cols">
            {compareIds.map(id => {
              const cand = rankedCandidates.find(c => c.id === id);
              if (!cand) return null;
              const isSelected = selectedEmployeeIds.includes(cand.id);

              return (
                <div key={cand.id} className="compare-col-card">
                  <div className="compare-profile-top">
                    <img src={cand.avatar} alt={cand.name} className="compare-avatar" />
                    <div>
                      <h4 className="compare-name">{cand.name}</h4>
                      <span className="compare-role">{cand.role}</span>
                    </div>
                  </div>

                  <div className="compare-stats-stack">
                    <div className="stat-comparison-row">
                      <span className="lbl">Match Score</span>
                      <strong className="val text-blue-primary">{cand.matchScore}%</strong>
                    </div>
                    <div className="stat-comparison-row">
                      <span className="lbl">Experience</span>
                      <strong className="val">{cand.totalExperience} Years</strong>
                    </div>
                    <div className="stat-comparison-row">
                      <span className="lbl">Workload / Cap</span>
                      <strong className="val">{cand.workload}% ({cand.availableHours}h free)</strong>
                    </div>
                    <div className="stat-comparison-row">
                      <span className="lbl">Key Skills</span>
                      <div className="skills-mini-wrap">
                        {cand.matchedSkills.map(s => (
                          <span key={s.name} className="mini-tag">{s.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    className={`admin-btn-sm w-full ${isSelected ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                    onClick={() => handleToggleSelect(cand.id)}
                  >
                    {isSelected ? '✓ In Proposed Team' : '+ Add to Team'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. RANKED CANDIDATE RECOMMENDATIONS LIST */}
      <div className="ranked-candidates-section">
        <div className="candidates-list-header">
          <div>
            <h3>Ranked Candidate Recommendations</h3>
            <span className="candidates-count-subtitle">
              {rankedCandidates.length} employees evaluated against project criteria
            </span>
          </div>

          <div className="list-legend-row">
            <span className="legend-tag high-legend">90%+ Strong Match</span>
            <span className="legend-tag med-legend">70-89% Compatible</span>
          </div>
        </div>

        <div className="candidates-stack">
          {rankedCandidates.map((cand, index) => {
            const isSelected = selectedEmployeeIds.includes(cand.id);
            const isComparingThis = compareIds.includes(cand.id);

            return (
              <div 
                key={cand.id} 
                className={`admin-card candidate-match-card ${isSelected ? 'is-selected' : ''}`}
              >
                {/* Top Row: Rank & Match Score */}
                <div className="candidate-top-row">
                  <div className="candidate-rank-col">
                    <span className="rank-badge">#{index + 1}</span>
                    <img src={cand.avatar} alt={cand.name} className="candidate-avatar" />
                    <div>
                      <div className="cand-name-row">
                        <h4 className="candidate-name">{cand.name}</h4>
                        <span className="emp-id-label">{cand.id}</span>
                      </div>
                      <span className="candidate-role-dept">{cand.role} • {cand.department}</span>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="match-score-badge-wrap">
                    <div className={`match-score-pill score-${cand.matchScore >= 85 ? 'high' : cand.matchScore >= 70 ? 'mid' : 'low'}`}>
                      <span className="score-num">{cand.matchScore}%</span>
                      <span className="score-lbl">Match</span>
                    </div>
                  </div>
                </div>

                {/* Recommendation Explanation */}
                <div className="ai-explanation-box">
                  <Sparkles size={14} className="text-blue-primary flex-shrink-0" />
                  <p className="explanation-text">{cand.explanation}</p>
                </div>

                {/* Candidate Stats Row */}
                <div className="candidate-metrics-grid">
                  <div className="cand-metric-item">
                    <span className="cand-metric-lbl">Experience</span>
                    <span className="cand-metric-val">{cand.totalExperience} yrs</span>
                  </div>
                  <div className="cand-metric-item">
                    <span className="cand-metric-lbl">Current Load</span>
                    <span className={`cand-metric-val load-${cand.workload > 100 ? 'over' : 'ok'}`}>
                      {cand.workload}% ({cand.assignedHours || 0}h)
                    </span>
                  </div>
                  <div className="cand-metric-item">
                    <span className="cand-metric-lbl">Avail Capacity</span>
                    <span className="cand-metric-val text-emerald-600 font-semibold">
                      {cand.availableHours}h / wk
                    </span>
                  </div>
                  <div className="cand-metric-item">
                    <span className="cand-metric-lbl">Active Projects</span>
                    <span className="cand-metric-val">
                      {cand.activeProjectIds?.length || 0} projects
                    </span>
                  </div>
                </div>

                {/* Matched Skills Chips */}
                <div className="cand-skills-row">
                  <span className="cand-skills-lbl">Matching Skills:</span>
                  <div className="cand-matched-chips">
                    {cand.matchedSkills.map(s => (
                      <span key={s.name} className="skill-match-tag">
                        ✓ {s.name} ({s.level})
                      </span>
                    ))}
                    {cand.unmatchedSkills.slice(0, 2).map(s => (
                      <span key={s} className="skill-miss-tag">
                        - {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Conflict Warnings */}
                {cand.hasConflict && (
                  <div className="conflict-warning-pill">
                    <AlertTriangle size={13} className="text-amber-500" />
                    <span>Potential capacity bottleneck: Current workload at {cand.workload}%</span>
                  </div>
                )}

                {/* Action Footer */}
                <div className="candidate-card-actions">
                  <button 
                    type="button" 
                    className={`admin-btn-sm ${isComparingThis ? 'admin-btn-primary' : 'admin-btn-ghost'}`}
                    onClick={() => handleToggleCompare(cand.id)}
                  >
                    <BarChart size={13} />
                    <span>{isComparingThis ? 'Comparing' : 'Compare'}</span>
                  </button>

                  <button 
                    type="button" 
                    className={`admin-btn-sm ${isSelected ? 'admin-btn-secondary selected-btn' : 'admin-btn-primary select-btn'}`}
                    onClick={() => handleToggleSelect(cand.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} />
                        <span>Selected in Roster</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Add to Team</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
