// Active and Upcoming Projects for WorkforceIQ
export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'OmniAI Enterprise Platform',
    client: 'Global FinTech Corp',
    description: 'High-throughput predictive fraud detection and intelligent decision orchestration system built on distributed microservices and LLM pipelines.',
    status: 'Active',
    stage: 'In Development',
    priority: 'Critical',
    startDate: '2026-06-01',
    endDate: '2026-12-30',
    duration: '7 months',
    requiredTeamSize: 6,
    assignedEmployees: ['EMP-101', 'EMP-103', 'EMP-105', 'EMP-111', 'EMP-113', 'EMP-120'],
    estimatedWorkloadPerPerson: 75,
    requiredSkills: [
      { skill: 'Python', proficiency: 'Expert', minExperience: 4, weight: 1.2 },
      { skill: 'Machine Learning / AI', proficiency: 'Expert', minExperience: 4, weight: 1.3 },
      { skill: 'AWS Cloud', proficiency: 'Intermediate', minExperience: 3, weight: 1.0 },
      { skill: 'Kubernetes', proficiency: 'Intermediate', minExperience: 2, weight: 1.1 },
      { skill: 'PostgreSQL', proficiency: 'Intermediate', minExperience: 3, weight: 0.9 },
      { skill: 'UI/UX Design', proficiency: 'Intermediate', minExperience: 2, weight: 0.8 }
    ],
    readinessScore: 94,
    readinessBreakdown: {
      skillCoverage: 98,
      teamAvailability: 88,
      experienceCoverage: 95,
      workloadFeasibility: 92
    }
  },
  {
    id: 'PRJ-002',
    name: 'Cloud Native Telemetry Mesh',
    client: 'Apex Health Systems',
    description: 'Zero-trust real-time patient telemetry monitoring across multi-region cloud infrastructure with strict HIPAA compliance.',
    status: 'Active',
    stage: 'Deployment Phase',
    priority: 'High',
    startDate: '2026-04-15',
    endDate: '2026-11-30',
    duration: '7.5 months',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-101', 'EMP-104', 'EMP-107', 'EMP-114', 'EMP-127'],
    estimatedWorkloadPerPerson: 65,
    requiredSkills: [
      { skill: 'AWS Cloud', proficiency: 'Expert', minExperience: 4, weight: 1.2 },
      { skill: 'Cybersecurity & SecOps', proficiency: 'Expert', minExperience: 4, weight: 1.3 },
      { skill: 'React / Next.js', proficiency: 'Intermediate', minExperience: 3, weight: 1.0 },
      { skill: 'Python', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 },
      { skill: 'Docker', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 }
    ],
    readinessScore: 91,
    readinessBreakdown: {
      skillCoverage: 95,
      teamAvailability: 85,
      experienceCoverage: 92,
      workloadFeasibility: 90
    }
  },
  {
    id: 'PRJ-003',
    name: 'NextGen Autonomous Logistics',
    client: 'DHL Global Logistics',
    description: 'Route optimization & real-time shipment scheduling leveraging neural network heuristics and edge telemetry.',
    status: 'Active',
    stage: 'Core Architecture',
    priority: 'High',
    startDate: '2026-07-01',
    endDate: '2027-02-28',
    duration: '8 months',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-102', 'EMP-109', 'EMP-112', 'EMP-116', 'EMP-123'],
    estimatedWorkloadPerPerson: 60,
    requiredSkills: [
      { skill: 'Python', proficiency: 'Expert', minExperience: 3, weight: 1.1 },
      { skill: 'Data Analytics', proficiency: 'Intermediate', minExperience: 3, weight: 1.0 },
      { skill: 'AWS Cloud', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 },
      { skill: 'Machine Learning / AI', proficiency: 'Intermediate', minExperience: 2, weight: 1.1 },
      { skill: 'PostgreSQL', proficiency: 'Intermediate', minExperience: 3, weight: 0.9 }
    ],
    readinessScore: 89,
    readinessBreakdown: {
      skillCoverage: 92,
      teamAvailability: 90,
      experienceCoverage: 88,
      workloadFeasibility: 86
    }
  },
  {
    id: 'PRJ-004',
    name: 'WealthTech Investment Gateway',
    client: 'Barclays Private Banking',
    description: 'High-frequency algorithmic trading analytics, portfolio rebalancing engine, and client mobile dashboard.',
    status: 'Active',
    stage: 'Integration & Testing',
    priority: 'Medium',
    startDate: '2026-05-01',
    endDate: '2026-12-15',
    duration: '7.5 months',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-104', 'EMP-106', 'EMP-109', 'EMP-115', 'EMP-121', 'EMP-128'],
    estimatedWorkloadPerPerson: 70,
    requiredSkills: [
      { skill: 'React / Next.js', proficiency: 'Expert', minExperience: 4, weight: 1.2 },
      { skill: 'TypeScript', proficiency: 'Expert', minExperience: 3, weight: 1.1 },
      { skill: 'PostgreSQL', proficiency: 'Expert', minExperience: 4, weight: 1.0 },
      { skill: 'Node.js', proficiency: 'Intermediate', minExperience: 3, weight: 0.9 },
      { skill: 'Data Analytics', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 }
    ],
    readinessScore: 92,
    readinessBreakdown: {
      skillCoverage: 96,
      teamAvailability: 87,
      experienceCoverage: 94,
      workloadFeasibility: 89
    }
  },
  {
    id: 'PRJ-005',
    name: 'CyberShield Zero-Trust Enclave',
    client: 'Nordic Defense & Aero',
    description: 'Military-grade infrastructure hardening, air-gapped Kubernetes mesh, and automated compliance auditing.',
    status: 'Active',
    stage: 'Security Audit',
    priority: 'Critical',
    startDate: '2026-08-01',
    endDate: '2027-04-30',
    duration: '9 months',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-105', 'EMP-108', 'EMP-111', 'EMP-119', 'EMP-122', 'EMP-129'],
    estimatedWorkloadPerPerson: 75,
    requiredSkills: [
      { skill: 'Kubernetes', proficiency: 'Expert', minExperience: 3, weight: 1.3 },
      { skill: 'Cybersecurity & SecOps', proficiency: 'Expert', minExperience: 4, weight: 1.3 },
      { skill: 'Terraform', proficiency: 'Intermediate', minExperience: 3, weight: 1.0 },
      { skill: 'Docker', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 },
      { skill: 'Python', proficiency: 'Intermediate', minExperience: 2, weight: 0.8 }
    ],
    readinessScore: 86,
    readinessBreakdown: {
      skillCoverage: 91,
      teamAvailability: 82,
      experienceCoverage: 89,
      workloadFeasibility: 80
    }
  },

  // UPCOMING PROJECTS (Requiring Staffing & Intelligent Decision Making)
  {
    id: 'PRJ-006',
    name: 'AI Analytics Platform',
    client: 'Cognitive Enterprise Corp',
    description: 'Enterprise intelligence engine unifying real-time data lakehouse streams with self-serve LLM analytics and automated anomaly reports.',
    status: 'Upcoming',
    stage: 'Needs Staffing',
    priority: 'Critical',
    startDate: '2026-11-15',
    endDate: '2027-05-15',
    duration: '6 months',
    requiredTeamSize: 6,
    assignedEmployees: [], // Needs Staffing!
    estimatedWorkloadPerPerson: 65,
    requiredSkills: [
      { skill: 'Python', proficiency: 'Expert', minExperience: 2, weight: 1.2 },
      { skill: 'AWS Cloud', proficiency: 'Intermediate', minExperience: 2, weight: 1.1 },
      { skill: 'Data Analytics', proficiency: 'Intermediate', minExperience: 2, weight: 1.0 },
      { skill: 'Docker', proficiency: 'Beginner', minExperience: 1, weight: 0.8 },
      { skill: 'Machine Learning / AI', proficiency: 'Intermediate', minExperience: 2, weight: 1.2 },
      { skill: 'React / Next.js', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 }
    ],
    readinessScore: 82, // Matches prompt: "Project Alpha is 82% ready for staffing"
    readinessBreakdown: {
      skillCoverage: 95,
      teamAvailability: 78,
      experienceCoverage: 86,
      workloadFeasibility: 72
    }
  },
  {
    id: 'PRJ-007',
    name: 'Cloud Migration & Multi-Cluster K8s',
    client: 'Bavaria Automotive Group',
    description: 'Transition of legacy core plant telemetry to high-density Kubernetes on AWS with Terraform automation.',
    status: 'Upcoming',
    stage: 'Attention Required',
    priority: 'Critical',
    startDate: '2026-12-01',
    endDate: '2027-07-01',
    duration: '7 months',
    requiredTeamSize: 4,
    assignedEmployees: [], // Incomplete / Severe Gap!
    estimatedWorkloadPerPerson: 70,
    requiredSkills: [
      { skill: 'Kubernetes', proficiency: 'Expert', minExperience: 3, weight: 1.4 },
      { skill: 'AWS Cloud', proficiency: 'Intermediate', minExperience: 3, weight: 1.1 },
      { skill: 'Terraform', proficiency: 'Expert', minExperience: 3, weight: 1.2 },
      { skill: 'Docker', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 }
    ],
    readinessScore: 62, // Matches prompt: "Readiness: 62% Status: ATTENTION REQUIRED Reason: Critical Kubernetes skill gap"
    readinessBreakdown: {
      skillCoverage: 68,
      teamAvailability: 58,
      experienceCoverage: 65,
      workloadFeasibility: 55
    }
  },
  {
    id: 'PRJ-008',
    name: 'Digital Patient Care Mobile Suite',
    client: 'Novartis Healthcare Global',
    description: 'Cross-platform mobile and web patient application with end-to-end encrypted biometric telemetry and FHIR protocol sync.',
    status: 'Upcoming',
    stage: 'Needs Staffing',
    priority: 'High',
    startDate: '2026-11-20',
    endDate: '2027-06-30',
    duration: '7.5 months',
    requiredTeamSize: 4,
    assignedEmployees: [],
    estimatedWorkloadPerPerson: 60,
    requiredSkills: [
      { skill: 'React / Next.js', proficiency: 'Expert', minExperience: 3, weight: 1.2 },
      { skill: 'TypeScript', proficiency: 'Intermediate', minExperience: 2, weight: 1.0 },
      { skill: 'UI/UX Design', proficiency: 'Expert', minExperience: 3, weight: 1.1 },
      { skill: 'Node.js', proficiency: 'Intermediate', minExperience: 2, weight: 0.9 }
    ],
    readinessScore: 91,
    readinessBreakdown: {
      skillCoverage: 96,
      teamAvailability: 92,
      experienceCoverage: 90,
      workloadFeasibility: 88
    }
  }
];
