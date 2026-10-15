// WorkforceIQ Intelligent Decision & Matching Engine

import { PROFICIENCY_LEVELS } from '../data/skills';

/**
 * Calculate multi-factor match score between an employee and project requirements
 */
export function calculateEmployeeMatch(employee, project) {
  if (!project || !project.requiredSkills) return null;

  const requiredSkills = project.requiredSkills;
  let skillScores = [];
  let matchedSkillCount = 0;
  let strongSkills = [];

  requiredSkills.forEach(req => {
    const empSkill = employee.skills.find(
      s => s.name.toLowerCase() === req.skill.toLowerCase()
    );

    if (empSkill) {
      matchedSkillCount++;
      const empWeight = PROFICIENCY_LEVELS[empSkill.proficiency]?.weight || 1;
      const reqWeight = PROFICIENCY_LEVELS[req.proficiency]?.weight || 1;

      // Proficiency score (up to 100)
      let profScore = Math.min(100, Math.round((empWeight / reqWeight) * 95));
      if (empWeight >= reqWeight) profScore = 100;

      // Experience score
      const expRatio = Math.min(1.2, empSkill.years / (req.minExperience || 2));
      const expScore = Math.min(100, Math.round(expRatio * 90));

      const blended = Math.round(profScore * 0.6 + expScore * 0.4);
      skillScores.push(blended);

      if (empWeight >= reqWeight && empSkill.years >= (req.minExperience || 2)) {
        strongSkills.push(empSkill.name);
      }
    } else {
      skillScores.push(15); // Base penalty for missing skill
    }
  });

  const avgSkillScore = skillScores.length > 0 
    ? Math.round(skillScores.reduce((a, b) => a + b, 0) / skillScores.length)
    : 40;

  // Experience Match: Overall total experience vs project level
  const avgMinExp = requiredSkills.reduce((acc, r) => acc + (r.minExperience || 2), 0) / (requiredSkills.length || 1);
  const expMatch = Math.min(100, Math.max(50, Math.round((employee.totalExperience / (avgMinExp * 1.3)) * 92)));

  // Availability score: Higher available % = higher score
  const availabilityScore = Math.round(employee.availability);

  // Workload Suitability:
  // Best: 20% - 60% workload (score 90 - 100)
  // Moderate: 61% - 80% (score 70 - 85)
  // Overloaded: > 85% (score 20 - 45)
  let workloadSuitability = 100;
  if (employee.workload > 90) {
    workloadSuitability = Math.max(20, 100 - (employee.workload - 80) * 4);
  } else if (employee.workload > 70) {
    workloadSuitability = 75 - (employee.workload - 70) * 1.5;
  } else if (employee.workload < 30) {
    workloadSuitability = 98; // High capacity available!
  } else {
    workloadSuitability = 90;
  }
  workloadSuitability = Math.round(workloadSuitability);

  // Project Experience score: domain relevance based on history
  const projectExpScore = Math.min(98, 65 + (employee.projectHistory?.length || 1) * 10);

  // Composite Overall Match Score (Balanced, intelligent weighting)
  // DO NOT recommend employees solely based on skill names; availability & workload carry heavy weight!
  const overallMatchScore = Math.round(
    avgSkillScore * 0.35 +
    expMatch * 0.15 +
    availabilityScore * 0.25 +
    workloadSuitability * 0.15 +
    projectExpScore * 0.10
  );

  // Generate Explainable AI Rationale
  let rationale = '';
  if (strongSkills.length > 0) {
    rationale = `Recommended because ${employee.name.split(' ')[0]} has strong ${strongSkills.slice(0, 2).join(' & ')} experience, is currently ${employee.workload}% allocated (${employee.availability}% available capacity), and has successfully delivered ${employee.projectHistory?.length || 1} similar production systems.`;
  } else {
    rationale = `Qualified candidate with solid foundational capabilities (${employee.skills[0]?.name || 'Engineering'}), currently carrying a ${employee.workload}% workload with ${employee.availability}% open bandwidth.`;
  }

  if (employee.workload >= 90) {
    rationale += ` Note: Currently in high-load tier (${employee.workload}%), so allocation would benefit from workload rebalancing.`;
  } else if (employee.workload <= 30) {
    rationale += ` High-value allocation candidate: readily underutilized with immediate availability.`;
  }

  return {
    employee,
    overallMatchScore,
    skillMatch: avgSkillScore,
    experienceMatch: expMatch,
    availability: availabilityScore,
    workloadSuitability,
    projectExperience: projectExpScore,
    matchedSkillCount,
    totalRequiredSkills: requiredSkills.length,
    strongSkills,
    rationale
  };
}

/**
 * Scan entire workforce to answer "Can We Build This Team Internally?"
 */
export function analyzeInternalTalentDiscovery(project, employees) {
  if (!project || !project.requiredSkills) return null;

  const skillBreakdown = project.requiredSkills.map(req => {
    const qualifiedEmployees = employees.filter(emp => {
      const s = emp.skills.find(sk => sk.name.toLowerCase() === req.skill.toLowerCase());
      if (!s) return false;
      const empWeight = PROFICIENCY_LEVELS[s.proficiency]?.weight || 1;
      const reqWeight = PROFICIENCY_LEVELS[req.proficiency]?.weight || 1;
      return empWeight >= reqWeight;
    });

    const totalWithSkill = employees.filter(emp =>
      emp.skills.some(sk => sk.name.toLowerCase() === req.skill.toLowerCase())
    );

    const availableEmployees = qualifiedEmployees.filter(emp => emp.workload < 85);

    return {
      skill: req.skill,
      requiredProficiency: req.proficiency,
      minExperience: req.minExperience,
      totalInternalTalent: totalWithSkill.length,
      qualifiedTalent: qualifiedEmployees.length,
      readilyAvailableTalent: availableEmployees.length,
      status: qualifiedEmployees.length >= 2 ? 'Adequate' : qualifiedEmployees.length === 1 ? 'Tight' : 'Critical Gap'
    };
  });

  const totalReq = skillBreakdown.length;
  const coveredReq = skillBreakdown.filter(s => s.qualifiedTalent >= 1).length;
  const coveragePercent = Math.round((coveredReq / (totalReq || 1)) * 100);

  let verdict = 'YES';
  let summary = '';

  if (coveragePercent === 100) {
    verdict = 'YES';
    summary = `Internal workforce can satisfy 100% of project requirements. The organization has strong internal talent depth across all required domains, avoiding external hiring costs.`;
  } else if (coveragePercent >= 75) {
    verdict = 'PARTIALLY';
    summary = `Internal workforce can cover ${coveragePercent}% of project requirements. Most core competencies exist internally, but 1–2 niche skill gaps require upskilling or targeted contract support.`;
  } else {
    verdict = 'NO';
    summary = `Critical skills are unavailable internally (only ${coveragePercent}% coverage). Immediate upskilling or external recruitment is recommended before project launch.`;
  }

  return {
    verdict,
    coveragePercent,
    summary,
    skillBreakdown
  };
}

/**
 * Detect Skill Gaps for a project and recommend 4 distinct actionable strategies
 */
export function analyzeSkillGaps(project, employees) {
  if (!project || !project.requiredSkills) return [];

  const gaps = [];

  project.requiredSkills.forEach(req => {
    const qualifiedAndAvailable = employees.filter(emp => {
      const s = emp.skills.find(sk => sk.name.toLowerCase() === req.skill.toLowerCase());
      if (!s) return false;
      const empWeight = PROFICIENCY_LEVELS[s.proficiency]?.weight || 1;
      const reqWeight = PROFICIENCY_LEVELS[req.proficiency]?.weight || 1;
      return empWeight >= reqWeight && emp.workload < 85;
    });

    const neededHeadcount = Math.max(1, Math.round(project.requiredTeamSize / project.requiredSkills.length));
    const availableHeadcount = qualifiedAndAvailable.length;

    if (availableHeadcount < neededHeadcount || availableHeadcount === 0) {
      const gapCount = Math.max(1, neededHeadcount - availableHeadcount);
      gaps.push({
        skill: req.skill,
        requiredProficiency: req.proficiency,
        minExperience: req.minExperience,
        requiredHeadcount: neededHeadcount + 1, // Target depth
        availableHeadcount,
        gapCount,
        severity: availableHeadcount === 0 ? 'Critical' : 'Moderate',
        strategies: [
          {
            option: 'Option 1: Train Existing Employees',
            description: `Upskill 2-3 adjacent engineers possessing foundational proficiency. Takes 2–4 weeks.`,
            recommended: true
          },
          {
            option: 'Option 2: Reallocate Talent',
            description: `Shift 20–30% workload of qualified engineers from lower-priority active initiatives.`,
            recommended: false
          },
          {
            option: 'Option 3: Hire External Talent',
            description: `Open external contractor requisition for specialized ${req.skill} lead (approx. 4–6 weeks lead time).`,
            recommended: false
          },
          {
            option: 'Option 4: Delay Staffing',
            description: `Adjust project kickoff date by 3 weeks until senior engineers finish current release cycle.`,
            recommended: false
          }
        ]
      });
    }
  });

  return gaps;
}

/**
 * Identify employees who are closest to qualification for training upskilling
 */
export function generateTrainingRecommendations(project, employees) {
  if (!project || !project.requiredSkills) return [];

  const recommendations = [];

  project.requiredSkills.forEach(req => {
    const targetWeight = PROFICIENCY_LEVELS[req.proficiency]?.weight || 2;

    // Find employees who know this skill at a lower proficiency OR have related skills
    employees.forEach(emp => {
      const existingSkill = emp.skills.find(
        s => s.name.toLowerCase() === req.skill.toLowerCase()
      );

      if (existingSkill) {
        const currentWeight = PROFICIENCY_LEVELS[existingSkill.proficiency]?.weight || 1;
        if (currentWeight < targetWeight) {
          const levelGap = targetWeight - currentWeight;
          const readinessWeeks = levelGap === 1 ? '2–3 weeks' : '4–6 weeks';

          recommendations.push({
            employeeId: emp.id,
            employeeName: emp.name,
            avatar: emp.avatar,
            role: emp.role,
            skill: req.skill,
            currentProficiency: existingSkill.proficiency,
            requiredProficiency: req.proficiency,
            skillGapLevel: `${levelGap} level${levelGap > 1 ? 's' : ''}`,
            recommendedCourse: `${req.skill} Advanced Practitioner & Production Mastery`,
            estimatedReadiness: readinessWeeks,
            trainingPriority: emp.workload <= 70 ? 'HIGH' : 'MEDIUM',
            workload: emp.workload,
            explanation: `${emp.name} already has ${existingSkill.years} yrs of experience in ${req.skill} (${existingSkill.proficiency}). Bridging to ${req.proficiency} takes only ${readinessWeeks}.`
          });
        }
      }
    });
  });

  // Sort by priority and lowest existing workload
  return recommendations.sort((a, b) => (a.trainingPriority === 'HIGH' ? -1 : 1)).slice(0, 8);
}

/**
 * Smart Team Formation Algorithm: Forms an optimized, synergistic team
 */
export function formOptimizedTeam(project, employees) {
  if (!project || !project.requiredSkills) return null;

  const teamSize = project.requiredTeamSize || 5;

  // Score all available employees
  const scoredCandidates = employees.map(emp => calculateEmployeeMatch(emp, project));

  // Sort primarily by overall match score
  const sorted = [...scoredCandidates].sort((a, b) => b.overallMatchScore - a.overallMatchScore);

  // Greedily pick complementary team members to ensure all skills are covered
  const selectedMembers = [];
  const coveredSkills = new Set();

  for (const candidate of sorted) {
    if (selectedMembers.length >= teamSize) break;

    // Check if candidate adds uncovered skills or high synergy
    const newSkillsBrought = candidate.strongSkills.filter(s => !coveredSkills.has(s));

    if (newSkillsBrought.length > 0 || selectedMembers.length < teamSize) {
      selectedMembers.push(candidate);
      candidate.strongSkills.forEach(s => coveredSkills.add(s));
    }
  }

  // If team size not reached, pad with remaining highest scoring
  for (const candidate of sorted) {
    if (selectedMembers.length >= teamSize) break;
    if (!selectedMembers.some(m => m.employee.id === candidate.employee.id)) {
      selectedMembers.push(candidate);
    }
  }

  // Calculate holistic team metrics
  const totalSkills = project.requiredSkills.length;
  const coveredCount = project.requiredSkills.filter(req => 
    selectedMembers.some(m => m.employee.skills.some(s => s.name.toLowerCase() === req.skill.toLowerCase()))
  ).length;

  const skillCoverage = Math.min(100, Math.round((coveredCount / (totalSkills || 1)) * 100));
  const avgAvailability = Math.round(selectedMembers.reduce((acc, m) => acc + m.availability, 0) / (selectedMembers.length || 1));
  const avgWorkload = Math.round(selectedMembers.reduce((acc, m) => acc + m.employee.workload, 0) / (selectedMembers.length || 1));
  const workloadBalance = Math.max(60, 100 - Math.abs(avgWorkload - 50));
  const teamMatchScore = Math.round(
    skillCoverage * 0.4 +
    avgAvailability * 0.25 +
    workloadBalance * 0.25 +
    (selectedMembers.reduce((acc, m) => acc + m.experienceMatch, 0) / (selectedMembers.length || 1)) * 0.1
  );

  const projectReadiness = Math.round(teamMatchScore * 0.95 + 4);

  // Describe the role each employee plays in this complementary team
  const complementaryBreakdown = selectedMembers.map(m => {
    const primarySkills = m.employee.skills
      .filter(s => project.requiredSkills.some(r => r.skill.toLowerCase() === s.name.toLowerCase()))
      .map(s => s.name);

    return {
      id: m.employee.id,
      name: m.employee.name,
      role: m.employee.role,
      avatar: m.employee.avatar,
      workload: m.employee.workload,
      availability: m.employee.availability,
      contributedSkills: primarySkills.length > 0 ? primarySkills : [m.employee.skills[0]?.name || 'Core Eng'],
      matchScore: m.overallMatchScore
    };
  });

  const rationale = `This synergized team achieves ${skillCoverage}% skill coverage across all project domains. Key roles are distributed complementary without redundancy, with an average team availability of ${avgAvailability}% and balanced workload across engineering and cloud tracks.`;

  return {
    teamMatchScore,
    skillCoverage,
    availability: avgAvailability,
    workloadBalance,
    projectReadiness,
    selectedMembers: complementaryBreakdown,
    rationale
  };
}

/**
 * Workload Balancing Engine: Find imbalances and formulate 1-click rebalance plans
 */
export function detectWorkloadImbalances(employees) {
  const overloaded = employees.filter(e => e.workload >= 90);
  const underutilized = employees.filter(e => e.workload <= 35);

  const rebalanceProposals = [];

  overloaded.forEach(source => {
    // Find an underutilized peer in the same department or with overlapping skills
    const candidate = underutilized.find(target => {
      const sharedSkill = target.skills.some(ts => 
        source.skills.some(ss => ss.name.toLowerCase() === ts.name.toLowerCase())
      );
      return sharedSkill && target.id !== source.id;
    });

    if (candidate) {
      const shiftPercent = 20;
      rebalanceProposals.push({
        id: `REB-${source.id}-${candidate.id}`,
        sourceEmployee: source,
        targetEmployee: candidate,
        sharedSkill: candidate.skills.find(ts => 
          source.skills.some(ss => ss.name.toLowerCase() === ts.name.toLowerCase())
        )?.name || 'Technical Track',
        shiftPercent,
        before: {
          source: source.workload,
          target: candidate.workload
        },
        after: {
          source: source.workload - shiftPercent,
          target: candidate.workload + shiftPercent
        },
        recommendation: `Move ${shiftPercent}% of ${source.name.split(' ')[0]}'s workload to ${candidate.name.split(' ')[0]}. Both share ${candidate.skills[0]?.name || 'engineering'} proficiency.`
      });
    }
  });

  return rebalanceProposals;
}

/**
 * What-If Simulation Engine
 */
export function simulateScenario(type, payload, project, employees) {
  if (type === 'REMOVE_MEMBER') {
    const { removedEmployeeId } = payload;
    const remainingEmployees = employees.filter(e => e.id !== removedEmployeeId);
    const newTeam = formOptimizedTeam(project, remainingEmployees);
    
    // Find best replacement
    const replacementPool = remainingEmployees.filter(
      e => !project.assignedEmployees.includes(e.id)
    );
    const topReplacement = replacementPool
      .map(e => calculateEmployeeMatch(e, project))
      .sort((a, b) => b.overallMatchScore - a.overallMatchScore)[0];

    return {
      type,
      projectReadinessDrop: Math.max(5, 94 - (newTeam ? newTeam.projectReadiness : 80)),
      newReadinessScore: newTeam ? newTeam.projectReadiness : 78,
      newSkillCoverage: newTeam ? newTeam.skillCoverage : 82,
      topReplacement: topReplacement || null
    };
  }

  if (type === 'HIRE_SPECIALISTS') {
    const { skillName, count = 2 } = payload;
    // Calculate before gap
    const initialGaps = analyzeSkillGaps(project, employees);
    const currentGap = initialGaps.find(g => g.skill.toLowerCase() === skillName.toLowerCase())?.gapCount || 3;
    const newGap = Math.max(0, currentGap - count);
    const readinessBoost = count * 9;

    return {
      type,
      skillName,
      hireCount: count,
      beforeGap: currentGap,
      afterGap: newGap,
      beforeReadiness: project.readinessScore || 72,
      afterReadiness: Math.min(99, (project.readinessScore || 72) + readinessBoost)
    };
  }

  return null;
}
