// TalentSync AI — Centralized Domain Data Models & Mock Database (Shared by Admin & Employee Portals)

export const ADMIN_USERS = [
  {
    id: 'ADM-001',
    name: 'Sarah Connor',
    role: 'VP of Workforce Planning',
    email: 'director.hr@talentsync.ai',
    department: 'People Operations & Workforce Intelligence',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    permissions: ['all', 'allocate', 'rebalance', 'approve_requests', 'manage_projects', 'simulations']
  },
  {
    id: 'ADM-002',
    name: 'Alex Mercer',
    role: 'Chief Resource Planning Officer',
    email: 'admin@talentsync.ai',
    department: 'Global Engineering Operations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    permissions: ['all']
  }
];

export const INITIAL_EMPLOYEES_DATA = [
  {
    id: 'EMP-101',
    name: 'Rahul Sharma',
    role: 'Senior Cloud Backend Architect',
    department: 'Cloud Platform Engineering',
    location: 'Bangalore, India (Hybrid)',
    totalExperience: 6.5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    email: 'rahul.s@talentsync.ai',
    phone: '+91 98765 43210',
    emergencyContact: 'Anita Sharma (+91 98765 43211)',
    summary: 'Lead Cloud Backend Architect with 6+ years specializing in distributed systems, event-driven architectures, AWS multi-region infrastructure, and high-throughput financial platforms.',
    workload: 92, // OVERLOADED (>85%)
    plannedCapacityHours: 40,
    assignedHours: 37,
    availableHours: 3,
    availability: 8, // 8% free
    activeProjectIds: ['PRJ-001', 'PRJ-002'],
    status: 'Active',
    skills: [
      { id: 'SK-01', name: 'Python', category: 'Backend', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified', dateVerified: '2025-11-12' },
      { id: 'SK-02', name: 'AWS Cloud Architecture', category: 'Cloud', proficiency: 'Expert', years: 5, isVerified: true, verificationStatus: 'Verified', dateVerified: '2026-02-18' },
      { id: 'SK-03', name: 'PostgreSQL & Aurora', category: 'Database', proficiency: 'Expert', years: 5, isVerified: true, verificationStatus: 'Verified', dateVerified: '2025-08-10' },
      { id: 'SK-04', name: 'Docker & Containers', category: 'DevOps', proficiency: 'Intermediate', years: 3, isVerified: false, verificationStatus: 'Self-Reported', dateAdded: '2026-09-01' },
      { id: 'SK-05', name: 'Kubernetes Microservices', category: 'DevOps', proficiency: 'Beginner', years: 1.5, isVerified: false, verificationStatus: 'Self-Reported', dateAdded: '2026-09-15' },
      { id: 'SK-06', name: 'FastAPI / AsyncIO', category: 'Backend', proficiency: 'Advanced', years: 4, isVerified: true, verificationStatus: 'Verified', dateVerified: '2026-01-20' },
      { id: 'SK-07', name: 'Distributed Systems & Redis', category: 'Infrastructure', proficiency: 'Advanced', years: 4, isVerified: true, verificationStatus: 'Verified', dateVerified: '2025-10-05' }
    ],
    certifications: [
      { id: 'CERT-01', name: 'AWS Certified Solutions Architect — Professional', issuer: 'Amazon Web Services', issueDate: '2024-03-15', expiryDate: '2027-03-15', credentialId: 'AWS-PSA-994821', verified: true },
      { id: 'CERT-02', name: 'Certified Associate in Python Programming (PCAP)', issuer: 'Python Institute', issueDate: '2023-08-20', expiryDate: 'Lifetime', credentialId: 'PY-PCAP-77312', verified: true }
    ],
    trainingRecords: [
      { id: 'TRN-01', title: 'Zero-Trust Cloud Security Architecture', provider: 'TalentSync Academy', completionDate: '2026-04-10', hours: 16, score: '98%' },
      { id: 'TRN-02', title: 'High-Concurrency PostgreSQL Tuning', provider: 'TalentSync Academy', completionDate: '2025-11-28', hours: 12, score: '95%' }
    ],
    weeklyWorkloadTrends: [
      { week: 'W1 (Past)', assigned: 36, capacity: 40, loadPct: 90 },
      { week: 'W2 (Current)', assigned: 37, capacity: 40, loadPct: 92 },
      { week: 'W3 (Next)', assigned: 38, capacity: 40, loadPct: 95 },
      { week: 'W4 (Upcoming)', assigned: 34, capacity: 40, loadPct: 85 }
    ],
    schedulingConflicts: [
      {
        id: 'CONF-01',
        title: 'Overlapping Critical Milestones',
        projectA: 'PRJ-001 (OmniAI)',
        projectB: 'PRJ-002 (Telemetry Mesh)',
        date: '2026-10-24 - 2026-10-25',
        severity: 'High',
        description: 'OmniAI Beta Release and Telemetry Mesh Penetration Testing deliver on the same 48-hour window.'
      }
    ]
  },
  {
    id: 'EMP-102',
    name: 'Priya Patel',
    role: 'Cloud Infrastructure Associate',
    department: 'DevOps & Cloud',
    location: 'Pune, India (Hybrid)',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    email: 'priya.p@talentsync.ai',
    phone: '+91 98111 22334',
    emergencyContact: 'Rajesh Patel (+91 98111 22335)',
    summary: 'Cloud Engineer specializing in Terraform infrastructure as code, AWS automation, and CI/CD pipelines. Highly available for allocation.',
    workload: 35, // AVAILABLE (35%)
    plannedCapacityHours: 40,
    assignedHours: 14,
    availableHours: 26,
    availability: 65,
    activeProjectIds: ['PRJ-003'],
    status: 'Active',
    skills: [
      { id: 'SK-11', name: 'Python', category: 'Backend', proficiency: 'Intermediate', years: 3, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-12', name: 'AWS Cloud Architecture', category: 'Cloud', proficiency: 'Intermediate', years: 2.5, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-13', name: 'Terraform', category: 'DevOps', proficiency: 'Intermediate', years: 2, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-14', name: 'Docker & Containers', category: 'DevOps', proficiency: 'Beginner', years: 1.5, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [
      { id: 'CERT-03', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', issueDate: '2024-05-10', verified: true }
    ],
    trainingRecords: [],
    weeklyWorkloadTrends: [
      { week: 'W1', assigned: 15, capacity: 40, loadPct: 37 },
      { week: 'W2', assigned: 14, capacity: 40, loadPct: 35 },
      { week: 'W3', assigned: 16, capacity: 40, loadPct: 40 },
      { week: 'W4', assigned: 14, capacity: 40, loadPct: 35 }
    ],
    schedulingConflicts: []
  },
  {
    id: 'EMP-103',
    name: 'Sarah Jenkins',
    role: 'Principal AI & Machine Learning Scientist',
    department: 'AI Research & Data',
    location: 'San Francisco, USA (Remote)',
    totalExperience: 8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    email: 'sarah.j@talentsync.ai',
    phone: '+1 415 555 0192',
    emergencyContact: 'David Jenkins (+1 415 555 0193)',
    summary: 'Lead AI researcher specialized in distributed deep learning, PyTorch transformer inference, vector embeddings, and real-time fraud mitigation heuristics.',
    workload: 65, // HEALTHY
    plannedCapacityHours: 40,
    assignedHours: 26,
    availableHours: 14,
    availability: 35,
    activeProjectIds: ['PRJ-001'],
    status: 'Active',
    skills: [
      { id: 'SK-31', name: 'Machine Learning / AI', category: 'AI / ML', proficiency: 'Expert', years: 8, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-32', name: 'Python', category: 'Backend', proficiency: 'Expert', years: 8, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-33', name: 'PyTorch / TensorFlow', category: 'AI / ML', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-34', name: 'Data Analytics', category: 'Data', proficiency: 'Expert', years: 7, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [
      { id: 'CERT-04', name: 'TensorFlow Developer Certificate', issuer: 'Google', issueDate: '2023-10-12', verified: true }
    ],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-104',
    name: 'Marcus Chen',
    role: 'Senior Staff Frontend Architect',
    department: 'Frontend Engineering',
    location: 'Singapore (Remote)',
    totalExperience: 7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    email: 'marcus.c@talentsync.ai',
    phone: '+65 9123 4567',
    emergencyContact: 'Evelyn Chen (+65 9123 4568)',
    summary: 'Senior Staff Frontend Architect specialized in React, TypeScript, high-performance web applications, and Design Systems.',
    workload: 85, // HIGH LOAD
    plannedCapacityHours: 40,
    assignedHours: 34,
    availableHours: 6,
    availability: 15,
    activeProjectIds: ['PRJ-002', 'PRJ-004'],
    status: 'Active',
    skills: [
      { id: 'SK-21', name: 'React / Next.js', category: 'Frontend', proficiency: 'Expert', years: 7, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-22', name: 'TypeScript', category: 'Frontend', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-23', name: 'UI/UX Design', category: 'Design', proficiency: 'Intermediate', years: 4, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-105',
    name: 'Elena Rostova',
    role: 'Senior Data Platform Engineer',
    department: 'Data Analytics & Engineering',
    location: 'Berlin, Germany',
    totalExperience: 5.5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    email: 'elena.r@talentsync.ai',
    phone: '+49 151 2345678',
    emergencyContact: 'Viktor Rostov (+49 151 2345679)',
    summary: 'Apache Kafka streaming pipelines, Snowflake data warehouses, and DBT data model orchestration specialist.',
    workload: 55, // HEALTHY
    plannedCapacityHours: 40,
    assignedHours: 22,
    availableHours: 18,
    availability: 45,
    activeProjectIds: ['PRJ-004'],
    status: 'Active',
    skills: [
      { id: 'SK-41', name: 'Data Analytics', category: 'Data', proficiency: 'Expert', years: 5, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-42', name: 'Python', category: 'Backend', proficiency: 'Advanced', years: 4, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-43', name: 'Kafka & Streaming', category: 'Data', proficiency: 'Expert', years: 4, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-106',
    name: 'Jordan Taylor',
    role: 'Lead UI/UX Product Designer',
    department: 'Product Design & Research',
    location: 'Austin, USA (Hybrid)',
    totalExperience: 6,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    email: 'jordan.t@talentsync.ai',
    phone: '+1 512 555 0188',
    emergencyContact: 'Morgan Taylor (+1 512 555 0189)',
    summary: 'Design systems creator, mobile UX specialist, accessibility compliance lead (WCAG 2.2 AA).',
    workload: 70, // HEALTHY
    plannedCapacityHours: 40,
    assignedHours: 28,
    availableHours: 12,
    availability: 30,
    activeProjectIds: ['PRJ-001', 'PRJ-004'],
    status: 'Active',
    skills: [
      { id: 'SK-51', name: 'UI/UX Design', category: 'Design', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-52', name: 'Figma & Design Systems', category: 'Design', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-53', name: 'Mobile Interaction Design', category: 'Design', proficiency: 'Advanced', years: 4, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-107',
    name: 'Vikram Malhotra',
    role: 'Senior QA Automation & Chaos Engineer',
    department: 'Quality Assurance & Testing',
    location: 'Hyderabad, India',
    totalExperience: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    email: 'vikram.m@talentsync.ai',
    phone: '+91 97000 11223',
    emergencyContact: 'Kavita Malhotra (+91 97000 11224)',
    summary: 'End-to-end automation with Playwright, performance load testing with Locust, and AWS Fault Injection Simulator chaos drills.',
    workload: 80, // HIGH LOAD
    plannedCapacityHours: 40,
    assignedHours: 32,
    availableHours: 8,
    availability: 20,
    activeProjectIds: ['PRJ-002'],
    status: 'Active',
    skills: [
      { id: 'SK-61', name: 'QA Automation', category: 'QA', proficiency: 'Expert', years: 5, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-62', name: 'Python', category: 'Backend', proficiency: 'Advanced', years: 4, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-63', name: 'Performance Load Testing', category: 'QA', proficiency: 'Expert', years: 4, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-108',
    name: 'Maya Lin',
    role: 'Technical Project Operations Manager',
    department: 'Project Operations & Governance',
    location: 'Toronto, Canada',
    totalExperience: 7,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    email: 'maya.l@talentsync.ai',
    phone: '+1 416 555 0144',
    emergencyContact: 'Sam Lin (+1 416 555 0145)',
    summary: 'Agile transformation lead, SOC2 compliance audit orchestrator, and multi-team sprint governance coordinator.',
    workload: 60, // HEALTHY
    plannedCapacityHours: 40,
    assignedHours: 24,
    availableHours: 16,
    availability: 40,
    activeProjectIds: ['PRJ-001', 'PRJ-003'],
    status: 'Active',
    skills: [
      { id: 'SK-71', name: 'Project Governance', category: 'Management', proficiency: 'Expert', years: 7, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-72', name: 'Agile & Scrum Operations', category: 'Management', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-109',
    name: 'Alex Thorne',
    role: 'Junior Full-Stack Engineer',
    department: 'Software Engineering',
    location: 'London, UK (Hybrid)',
    totalExperience: 2,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    email: 'alex.t@talentsync.ai',
    phone: '+44 20 7946 0912',
    emergencyContact: 'Claire Thorne (+44 20 7946 0913)',
    summary: 'Full-stack software engineer with React and Node.js foundation. Currently in rotational bench period with high availability for new projects.',
    workload: 20, // UNDERUTILIZED (<30%)
    plannedCapacityHours: 40,
    assignedHours: 8,
    availableHours: 32,
    availability: 80,
    activeProjectIds: ['PRJ-003'],
    status: 'Active',
    skills: [
      { id: 'SK-81', name: 'React / Next.js', category: 'Frontend', proficiency: 'Intermediate', years: 2, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-82', name: 'TypeScript', category: 'Frontend', proficiency: 'Intermediate', years: 2, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-83', name: 'Node.js / Express', category: 'Backend', proficiency: 'Intermediate', years: 2, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  },
  {
    id: 'EMP-110',
    name: 'Zoe Martinez',
    role: 'Cybersecurity & SecOps Specialist',
    department: 'Information Security',
    location: 'Denver, USA (Remote)',
    totalExperience: 4.5,
    avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed287413?auto=format&fit=crop&w=300&q=80',
    email: 'zoe.m@talentsync.ai',
    phone: '+1 303 555 0167',
    emergencyContact: 'Carlos Martinez (+1 303 555 0168)',
    summary: 'Cloud security posture management (CSPM), container vulnerability scanning, and IAM privilege hardening.',
    workload: 45, // HEALTHY
    plannedCapacityHours: 40,
    assignedHours: 18,
    availableHours: 22,
    availability: 55,
    activeProjectIds: [],
    status: 'Active',
    skills: [
      { id: 'SK-91', name: 'Cybersecurity & SecOps', category: 'Security', proficiency: 'Expert', years: 4.5, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-92', name: 'AWS Cloud Architecture', category: 'Cloud', proficiency: 'Advanced', years: 3.5, isVerified: true, verificationStatus: 'Verified' }
    ],
    certifications: [],
    trainingRecords: [],
    weeklyWorkloadTrends: [],
    schedulingConflicts: []
  }
];

export const INITIAL_PROJECTS_DATA = [
  {
    id: 'PRJ-001',
    name: 'OmniAI Enterprise Platform',
    client: 'Global FinTech Corp',
    description: 'High-throughput real-time predictive fraud detection and intelligent decision orchestration system built on distributed microservices and LLM streaming pipelines.',
    objectives: [
      'Architect sub-15ms p99 latency transaction verification pipeline',
      'Deploy zero-data-loss multi-region Aurora PostgreSQL with cross-region read replicas',
      'Integrate mTLS authentication and OAuth2 token introspection across 12 microservices'
    ],
    status: 'Active',
    stage: 'In Development',
    priority: 'Critical',
    employeeRole: 'Lead Cloud Backend Architect',
    responsibilities: [
      'Lead infrastructure architecture & database clustering on AWS',
      'Implement real-time microservices in Python / FastAPI with asyncio concurrency'
    ],
    progress: 78,
    nextMilestone: 'Beta Milestone & Chaos Resiliency Testing',
    milestoneDate: '2026-10-25',
    deadline: '2026-12-30',
    startDate: '2026-06-01',
    requiredTeamSize: 6,
    assignedEmployees: ['EMP-101', 'EMP-103', 'EMP-106', 'EMP-108'],
    teamMembers: [
      { id: 'EMP-101', name: 'Rahul Sharma', role: 'Lead Cloud Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-103', name: 'Sarah Jenkins', role: 'Principal AI Scientist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-106', name: 'Jordan Taylor', role: 'Lead Product Designer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-108', name: 'Maya Lin', role: 'Project Operations', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80' }
    ],
    requiredSkills: [
      { skill: 'Python', proficiency: 'Expert', minExperience: 4 },
      { skill: 'AWS Cloud Architecture', proficiency: 'Expert', minExperience: 4 },
      { skill: 'Machine Learning / AI', proficiency: 'Expert', minExperience: 5 },
      { skill: 'UI/UX Design', proficiency: 'Advanced', minExperience: 3 }
    ],
    announcements: [
      { id: 'ANN-01', date: '2026-10-12', title: 'Sprint 14 Freeze', content: 'Feature freeze begins this Thursday for Beta release staging.' }
    ],
    resources: [
      { name: 'System Architecture RFC', type: 'Design Doc', url: 'https://internal.talentsync.ai/rfc/omni-ai' }
    ]
  },
  {
    id: 'PRJ-002',
    name: 'Cloud Native Telemetry Mesh',
    client: 'Apex Health Systems',
    description: 'Zero-trust real-time patient telemetry monitoring across multi-region cloud infrastructure with strict HIPAA security compliance.',
    objectives: [
      'Ingest 250,000 real-time biometric metrics per second',
      'Guarantee 99.999% system availability with automated failover'
    ],
    status: 'Active',
    stage: 'Deployment Phase',
    priority: 'High',
    employeeRole: 'Principal Infrastructure Lead',
    responsibilities: ['Configure WebSocket telemetry ingest nodes with eBPF network kernel acceleration'],
    progress: 62,
    nextMilestone: 'Zero-Trust HIPAA Penetration Audit',
    milestoneDate: '2026-10-24',
    deadline: '2026-11-30',
    startDate: '2026-04-15',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-101', 'EMP-104', 'EMP-107'],
    teamMembers: [
      { id: 'EMP-101', name: 'Rahul Sharma', role: 'Infrastructure Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-104', name: 'Marcus Chen', role: 'Staff Frontend Architect', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-107', name: 'Vikram Malhotra', role: 'Senior QA Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
    ],
    requiredSkills: [
      { skill: 'AWS Cloud Architecture', proficiency: 'Expert', minExperience: 4 },
      { skill: 'React / Next.js', proficiency: 'Expert', minExperience: 4 },
      { skill: 'QA Automation', proficiency: 'Advanced', minExperience: 3 }
    ],
    announcements: [],
    resources: []
  },
  {
    id: 'PRJ-003',
    name: 'NextGen Autonomous Logistics',
    client: 'DHL Global Logistics',
    description: 'Route optimization & real-time shipment scheduling leveraging neural network heuristics and edge vehicle telemetry.',
    objectives: ['Reduce carrier transit deadhead mileage by 18%'],
    status: 'Active',
    stage: 'Core Architecture',
    priority: 'High',
    employeeRole: 'DevOps & Pipeline Specialist',
    responsibilities: ['Maintain automated Terraform deployments and CI pipelines.'],
    progress: 44,
    nextMilestone: 'Fleet Alpha Simulation',
    milestoneDate: '2026-11-15',
    deadline: '2027-02-28',
    startDate: '2026-07-01',
    requiredTeamSize: 5,
    assignedEmployees: ['EMP-102', 'EMP-108', 'EMP-109'],
    teamMembers: [
      { id: 'EMP-102', name: 'Priya Patel', role: 'Cloud Engineer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-108', name: 'Maya Lin', role: 'Project Lead', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-109', name: 'Alex Thorne', role: 'Full-Stack Dev', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80' }
    ],
    requiredSkills: [
      { skill: 'Terraform', proficiency: 'Intermediate', minExperience: 2 },
      { skill: 'Python', proficiency: 'Intermediate', minExperience: 2 },
      { skill: 'React / Next.js', proficiency: 'Intermediate', minExperience: 2 }
    ],
    announcements: [],
    resources: []
  },
  {
    id: 'PRJ-004',
    name: 'WealthTech Investment Gateway',
    client: 'Barclays Private Banking',
    description: 'High-frequency algorithmic trading analytics, portfolio rebalancing engine, and client mobile dashboard.',
    objectives: ['Process real-time market data ticks and portfolio rebalancing recommendations under 50ms.'],
    status: 'Active',
    stage: 'Integration & Testing',
    priority: 'Medium',
    employeeRole: 'Staff Frontend & Data Architect',
    responsibilities: ['Build algorithmic rebalancing visual charts'],
    progress: 58,
    nextMilestone: 'Trading Engine Stress Testing',
    milestoneDate: '2026-11-05',
    deadline: '2026-12-15',
    startDate: '2026-05-01',
    requiredTeamSize: 4,
    assignedEmployees: ['EMP-104', 'EMP-105', 'EMP-106'],
    teamMembers: [
      { id: 'EMP-104', name: 'Marcus Chen', role: 'Frontend Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-105', name: 'Elena Rostova', role: 'Data Platform Engineer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-106', name: 'Jordan Taylor', role: 'UI/UX Lead', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' }
    ],
    requiredSkills: [
      { skill: 'React / Next.js', proficiency: 'Expert', minExperience: 5 },
      { skill: 'Data Analytics', proficiency: 'Expert', minExperience: 4 }
    ],
    announcements: [],
    resources: []
  },
  {
    id: 'PRJ-005',
    name: 'CyberShield Zero-Trust Ingress Gateway',
    client: 'Defense & Aerospace Systems',
    description: 'Hardware-security-module backed ingress proxy with automated token rotation and behavioral anomaly detection.',
    objectives: ['Deploy zero-trust network perimeter with automated cryptographic certificate rotation.'],
    status: 'Upcoming',
    stage: 'Staffing Needed',
    priority: 'Critical',
    employeeRole: 'Unassigned',
    responsibilities: ['Architect cryptographic ingress proxy and SecOps automation'],
    progress: 10,
    nextMilestone: 'Team Allocation & Kickoff',
    milestoneDate: '2026-11-01',
    deadline: '2027-04-30',
    startDate: '2026-11-01',
    requiredTeamSize: 4,
    assignedEmployees: [], // 0 of 4 positions filled (Staffing Shortage!)
    teamMembers: [],
    requiredSkills: [
      { skill: 'Cybersecurity & SecOps', proficiency: 'Expert', minExperience: 4 },
      { skill: 'AWS Cloud Architecture', proficiency: 'Expert', minExperience: 4 },
      { skill: 'Python', proficiency: 'Advanced', minExperience: 3 },
      { skill: 'Docker & Containers', proficiency: 'Intermediate', minExperience: 2 }
    ],
    announcements: [],
    resources: []
  },
  {
    id: 'PRJ-006',
    name: 'QuantumEdge AI Predictive Analytics',
    client: 'MedTech Diagnostics',
    description: 'Edge computer vision and federated learning model for real-time surgical camera anomaly alerting.',
    objectives: ['Train lightweight vision transformers running on edge TPU accelerators with 99.4% precision.'],
    status: 'Upcoming',
    stage: 'Preliminary Staffing',
    priority: 'High',
    employeeRole: 'AI Model Specialist',
    responsibilities: ['Implement federated learning aggregation protocol'],
    progress: 15,
    nextMilestone: 'Model Feasibility Benchmark',
    milestoneDate: '2026-11-10',
    deadline: '2027-05-31',
    startDate: '2026-11-10',
    requiredTeamSize: 3,
    assignedEmployees: ['EMP-103'], // 1 of 3 positions filled (2 unfilled)
    teamMembers: [
      { id: 'EMP-103', name: 'Sarah Jenkins', role: 'Principal AI Scientist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' }
    ],
    requiredSkills: [
      { skill: 'Machine Learning / AI', proficiency: 'Expert', minExperience: 5 },
      { skill: 'Python', proficiency: 'Expert', minExperience: 4 },
      { skill: 'Docker & Containers', proficiency: 'Advanced', minExperience: 3 }
    ],
    announcements: [],
    resources: []
  }
];

export const INITIAL_RESOURCE_ALERTS = [
  {
    id: 'ALT-01',
    type: 'Overloaded Employee',
    severity: 'Critical',
    title: 'Workload Exceeds Threshold: Rahul Sharma (92%)',
    message: 'Rahul Sharma is assigned 37 hours across 2 active projects with overlapping critical milestones.',
    affectedEmployeeId: 'EMP-101',
    affectedEmployeeName: 'Rahul Sharma',
    affectedProjectId: 'PRJ-001',
    timestamp: '1 hour ago',
    acknowledged: false,
    resolved: false
  },
  {
    id: 'ALT-02',
    type: 'Staffing Shortage',
    severity: 'Critical',
    title: 'Unstaffed Project: CyberShield Ingress (0/4 Staffed)',
    message: 'Critical priority project starts in 16 days with 0 assigned engineers. Security & Cloud experts needed.',
    affectedEmployeeId: null,
    affectedEmployeeName: 'N/A',
    affectedProjectId: 'PRJ-005',
    timestamp: '3 hours ago',
    acknowledged: false,
    resolved: false
  },
  {
    id: 'ALT-03',
    type: 'Scheduling Conflict',
    severity: 'High',
    title: 'Milestone Conflict: PRJ-001 vs PRJ-002 on Oct 24-25',
    message: 'Beta Release and HIPAA Pen-Test deliver on the same 48-hour window with shared infrastructure dependencies.',
    affectedEmployeeId: 'EMP-101',
    affectedEmployeeName: 'Rahul Sharma',
    affectedProjectId: 'PRJ-001',
    timestamp: '5 hours ago',
    acknowledged: true,
    resolved: false
  },
  {
    id: 'ALT-04',
    type: 'Critical Skill Shortage',
    severity: 'High',
    title: 'Skill Gap: Machine Learning & Vector Embeddings',
    message: 'Demand for senior AI practitioners across upcoming pipelines exceeds currently available bench capacity by 35%.',
    affectedEmployeeId: null,
    affectedEmployeeName: 'N/A',
    affectedProjectId: 'PRJ-006',
    timestamp: '1 day ago',
    acknowledged: false,
    resolved: false
  },
  {
    id: 'ALT-05',
    type: 'Underutilized Employee',
    severity: 'Medium',
    title: 'Bench Allocation Opportunity: Alex Thorne (20%)',
    message: 'Alex Thorne has 32 hours of available weekly capacity suitable for frontend/fullstack assignments.',
    affectedEmployeeId: 'EMP-109',
    affectedEmployeeName: 'Alex Thorne',
    affectedProjectId: 'PRJ-003',
    timestamp: '1 day ago',
    acknowledged: true,
    resolved: false
  }
];

export const INITIAL_AUDIT_LOG = [
  {
    id: 'AUD-001',
    adminName: 'Sarah Connor',
    adminEmail: 'director.hr@talentsync.ai',
    action: 'Workforce Allocation Approved',
    target: 'PRJ-004 (WealthTech Investment Gateway)',
    details: 'Allocated Marcus Chen, Elena Rostova, and Jordan Taylor to core staffing roster.',
    timestamp: '2026-10-14 16:30',
    decision: 'Approved'
  },
  {
    id: 'AUD-002',
    adminName: 'Sarah Connor',
    adminEmail: 'director.hr@talentsync.ai',
    action: 'Resource Request Review',
    target: 'REQ-2026-081 (Rahul Sharma)',
    details: 'Changed status to Under Review. Formulated rebalancing proposal to pair Priya Patel on TSK-105.',
    timestamp: '2026-10-15 09:30',
    decision: 'In Progress'
  },
  {
    id: 'AUD-003',
    adminName: 'Alex Mercer',
    adminEmail: 'admin@talentsync.ai',
    action: 'Skill Verification Approved',
    target: 'REQ-2026-064 (Rahul Sharma)',
    details: 'Verified AWS Certified Solutions Architect Professional credential AWS-PSA-994821.',
    timestamp: '2026-10-05 14:00',
    decision: 'Approved'
  },
  {
    id: 'AUD-004',
    adminName: 'Sarah Connor',
    adminEmail: 'director.hr@talentsync.ai',
    action: 'Workload Threshold Configured',
    target: 'System Settings',
    details: 'Updated organization high-utilization alert trigger from 90% to 85%.',
    timestamp: '2026-10-01 10:15',
    decision: 'System Update'
  }
];

export const INITIAL_TASKS_DATA = [
  {
    id: 'TSK-101',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Deploy Multi-Region Aurora PostgreSQL with Cross-Region Replicas',
    description: 'Configure and provision Amazon Aurora PostgreSQL cluster across us-east-1 and eu-west-1. Establish asynchronous streaming replication, test automated failover RTO under 30 seconds.',
    acceptanceCriteria: [
      { id: 'ac-1', text: 'Terraform script validates in CI pipeline with strict security group egress', completed: true },
      { id: 'ac-2', text: 'Cross-region replication lag is measured < 100ms under 5k writes/sec', completed: true },
      { id: 'ac-3', text: 'Automated failover drill executed with zero data corruption', completed: false }
    ],
    priority: 'Critical',
    status: 'In Progress',
    progress: 75,
    dueDate: '2026-10-18',
    estimatedHours: 14,
    dependencies: [],
    notes: [
      { id: 'n-1', author: 'Rahul Sharma', timestamp: '2026-10-14 11:30', text: 'Initial cluster successfully deployed in us-east-1 staging.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-103',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-002',
    projectName: 'Cloud Native Telemetry Mesh',
    title: 'Resolve Memory Leak in Telemetry Edge WebSocket Ingestion Worker',
    description: 'Investigate resident memory growth in Python asyncio worker consuming telemetry packets from Apex medical sensors.',
    acceptanceCriteria: [
      { id: 'ac-8', text: 'Memory profile snapshot captured using tracemalloc under synthetic load', completed: true },
      { id: 'ac-9', text: 'Root cause identified and unclosed WebSocket socket references cleaned up', completed: false }
    ],
    priority: 'Critical',
    status: 'Blocked',
    progress: 40,
    dueDate: '2026-10-16',
    estimatedHours: 16,
    dependencies: [],
    notes: [
      { id: 'n-4', author: 'Rahul Sharma', timestamp: '2026-10-15 08:30', text: 'Waiting on vendor upstream eBPF driver patch.' }
    ],
    isBlocked: true,
    blockerReason: 'Upstream vendor eBPF driver library has memory buffer bug. Vendor ETA unconfirmed.',
    hasDeadlineRisk: true,
    deadlineRiskReason: 'Task is due tomorrow; blocks automated HIPAA pen-test on Oct 24.',
    history: [],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-105',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-002',
    projectName: 'Cloud Native Telemetry Mesh',
    title: 'Establish Zero-Trust Prometheus & Grafana Telemetry Alerting Rules',
    description: 'Configure real-time latency spike alerts, error rate SLO thresholds, and PagerDuty routing rules for Apex biometric data pipeline.',
    acceptanceCriteria: [
      { id: 'ac-14', text: 'Alertmanager routing matrix defined for P1, P2, and P3 incidents', completed: true },
      { id: 'ac-15', text: 'Grafana dashboards provisioned via YAML config maps', completed: true }
    ],
    priority: 'High',
    status: 'In Progress',
    progress: 60,
    dueDate: '2026-10-22',
    estimatedHours: 10,
    dependencies: [],
    notes: [],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-104',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Migrate Redis Cache to AWS ElastiCache Cluster',
    description: 'Decommission legacy self-hosted Redis instance and cut over microservices to Redis 7.0 multi-AZ replication group with encryption at rest.',
    acceptanceCriteria: [
      { id: 'ac-10', text: 'CloudWatch alarm configured for CPUUtilization and EngineCPUUtilization', completed: true },
      { id: 'ac-11', text: 'All microservices verify TLS 1.3 mutual handshake', completed: true }
    ],
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-10-12',
    estimatedHours: 8,
    dependencies: [],
    notes: [
      { id: 'n-5', author: 'Rahul Sharma', timestamp: '2026-10-12 16:00', text: 'Cluster cutover completed with zero downtime.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [],
    syncStatus: 'synced'
  }
];

export const INITIAL_SUPPORT_REQUESTS = [
  {
    id: 'REQ-2026-081',
    employeeId: 'EMP-101',
    employeeName: 'Rahul Sharma',
    type: 'Workload Support',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    priority: 'High',
    description: 'Workload at 92% with simultaneous critical milestone deadlines on Oct 24 & Oct 25.',
    reason: 'Both OmniAI Beta release and Telemetry Mesh HIPAA audit occur within 24 hours. Requesting temporary offloading of Telemetry Prometheus tasks (TSK-105) to Priya Patel (35% load).',
    status: 'Under Review',
    submittedAt: '2026-10-14 16:45',
    latestResponse: 'Sarah Connor (Workforce Manager): Reviewing allocation. Looking to pair Priya Patel on TSK-105 by Thursday.',
    resolutionDetails: null,
    history: [
      { timestamp: '2026-10-14 16:45', action: 'Request Submitted', by: 'Rahul Sharma' },
      { timestamp: '2026-10-15 09:30', action: 'Under Review', by: 'Sarah Connor (Workforce Manager)' }
    ]
  },
  {
    id: 'REQ-2026-064',
    employeeId: 'EMP-101',
    employeeName: 'Rahul Sharma',
    type: 'Skill Verification',
    projectId: null,
    projectName: 'N/A',
    priority: 'Medium',
    description: 'Verification of AWS Solutions Architect — Professional certification.',
    reason: 'Renewed certificate credential AWS-PSA-994821 with Amazon Web Services.',
    status: 'Approved',
    submittedAt: '2026-10-02 11:15',
    latestResponse: 'Talent Operations: Credential ID verified against AWS verification portal. Verified badge added to profile.',
    resolutionDetails: 'Verified and official skill score updated to Expert.',
    history: [
      { timestamp: '2026-10-02 11:15', action: 'Submitted', by: 'Rahul Sharma' },
      { timestamp: '2026-10-05 14:00', action: 'Approved', by: 'Talent Operations Admin' }
    ]
  },
  {
    id: 'REQ-2026-052',
    employeeId: 'EMP-101',
    employeeName: 'Rahul Sharma',
    type: 'Training Request',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    priority: 'Medium',
    description: 'Sponsorship request for Certified Kubernetes Administrator (CKA) exam and labs.',
    reason: 'Required for container orchestration standardization planned for OmniAI Q1 scale-out.',
    status: 'Submitted',
    submittedAt: '2026-10-15 10:20',
    latestResponse: 'Awaiting departmental learning budget review.',
    resolutionDetails: null,
    history: [
      { timestamp: '2026-10-15 10:20', action: 'Submitted', by: 'Rahul Sharma' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    employeeId: 'EMP-101',
    title: 'Upcoming Milestone Deadline',
    message: 'OmniAI Enterprise Platform Beta Milestone is scheduled in 10 days (Oct 25). Please review open deliverables.',
    type: 'project',
    timestamp: '2 hours ago',
    isRead: false,
    linkTarget: { tab: 'projects', itemId: 'PRJ-001' }
  },
  {
    id: 'NOTIF-02',
    employeeId: 'EMP-101',
    title: 'Blocker Escalation Recorded',
    message: 'Your blocker report on TSK-103 (Telemetry Worker Memory Leak) was forwarded to Principal Systems Architect.',
    type: 'task',
    timestamp: '4 hours ago',
    isRead: false,
    linkTarget: { tab: 'tasks', itemId: 'TSK-103' }
  }
];

export const INITIAL_LEARNING_COURSES = [
  {
    id: 'CRS-01',
    title: 'Docker Intermediate: Multi-Stage Production Builds & Security',
    targetSkill: 'Docker & Containers',
    category: 'Technical Track',
    duration: '2 weeks (8 hrs total)',
    difficulty: 'Intermediate',
    urgency: 'High',
    reason: 'Closes self-reported skill gap from Intermediate to Advanced for upcoming Q1 Container Migration.',
    progressStatus: 'In Progress',
    progressPercent: 45,
    modules: [
      { title: 'Multi-stage build minimization & scratch base images', completed: true },
      { title: 'Rootless container daemon & non-root user execution', completed: true }
    ]
  }
];
