// TalentSync AI — Employee Portal Centralized Domain Data Models & Mock Database

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
    location: 'Pune, India',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    email: 'priya.p@talentsync.ai',
    phone: '+91 98111 22334',
    emergencyContact: 'Rajesh Patel (+91 98111 22335)',
    summary: 'Cloud Engineer specializing in Terraform infrastructure as code, AWS automation, and CI/CD pipelines.',
    workload: 35, // HEALTHY / AVAILABLE
    plannedCapacityHours: 40,
    assignedHours: 14,
    availableHours: 26,
    availability: 65,
    activeProjectIds: ['PRJ-003'],
    skills: [
      { id: 'SK-11', name: 'Python', category: 'Backend', proficiency: 'Intermediate', years: 3, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-12', name: 'AWS Cloud Architecture', category: 'Cloud', proficiency: 'Intermediate', years: 2.5, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-13', name: 'Terraform', category: 'DevOps', proficiency: 'Intermediate', years: 2, isVerified: true, verificationStatus: 'Verified' }
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
    workload: 85,
    plannedCapacityHours: 40,
    assignedHours: 34,
    availableHours: 6,
    availability: 15,
    activeProjectIds: ['PRJ-002'],
    skills: [
      { id: 'SK-21', name: 'React / Next.js', category: 'Frontend', proficiency: 'Expert', years: 7, isVerified: true, verificationStatus: 'Verified' },
      { id: 'SK-22', name: 'TypeScript', category: 'Frontend', proficiency: 'Expert', years: 6, isVerified: true, verificationStatus: 'Verified' }
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
    employeeRole: 'Lead Cloud Backend Architect',
    responsibilities: [
      'Lead infrastructure architecture & database clustering on AWS',
      'Implement real-time microservices in Python / FastAPI with asyncio concurrency',
      'Oversee load testing, database failover rehearsals, and zero-trust security compliance'
    ],
    progress: 78,
    nextMilestone: 'Beta Milestone & Chaos Resiliency Testing',
    milestoneDate: '2026-10-25',
    deadline: '2026-12-30',
    startDate: '2026-06-01',
    teamSize: 6,
    teamMembers: [
      { id: 'EMP-101', name: 'Rahul Sharma', role: 'Lead Cloud Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-103', name: 'Sarah Jenkins', role: 'Principal AI Scientist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-111', name: 'David Kim', role: 'Data Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
    ],
    announcements: [
      { id: 'ANN-01', date: '2026-10-12', title: 'Sprint 14 Freeze', content: 'Feature freeze begins this Thursday for Beta release staging.' },
      { id: 'ANN-02', date: '2026-10-05', title: 'Security Audit Sign-Off', content: 'Preliminary static code analysis passed with zero high-severity findings.' }
    ],
    resources: [
      { name: 'System Architecture RFC', type: 'Design Doc', url: 'https://internal.talentsync.ai/rfc/omni-ai' },
      { name: 'API Swagger Documentation', type: 'API Specs', url: 'https://api.omni-ai.internal/docs' },
      { name: 'Grafana Telemetry Dashboard', type: 'Observability', url: 'https://grafana.internal/d/omni-ai-prod' }
    ]
  },
  {
    id: 'PRJ-002',
    name: 'Cloud Native Telemetry Mesh',
    client: 'Apex Health Systems',
    description: 'Zero-trust real-time patient telemetry monitoring across multi-region cloud infrastructure with strict HIPAA security compliance and edge sensor ingestion.',
    objectives: [
      'Ingest 250,000 real-time biometric metrics per second',
      'Guarantee 99.999% system availability with automated failover',
      'Pass third-party SOC2 Type II and HIPAA automated compliance controls'
    ],
    status: 'Active',
    employeeRole: 'Principal Infrastructure Lead',
    responsibilities: [
      'Configure WebSocket telemetry ingest nodes with eBPF network kernel acceleration',
      'Establish Prometheus & Grafana distributed metric alerting and dead-letter queues',
      'Ensure encrypted at-rest and in-transit patient biometric data flow'
    ],
    progress: 62,
    nextMilestone: 'Zero-Trust HIPAA Penetration Audit',
    milestoneDate: '2026-10-24',
    deadline: '2026-11-30',
    startDate: '2026-04-15',
    teamSize: 5,
    teamMembers: [
      { id: 'EMP-101', name: 'Rahul Sharma', role: 'Infrastructure Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { id: 'EMP-104', name: 'Marcus Chen', role: 'Staff Frontend Architect', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
    ],
    announcements: [
      { id: 'ANN-03', date: '2026-10-14', title: 'HIPAA Pen Test Schedule', content: 'Third-party auditors will initiate penetration tests on Oct 24 09:00 UTC.' }
    ],
    resources: [
      { name: 'HIPAA Compliance Checklist', type: 'Compliance', url: 'https://compliance.internal/hipaa-mesh' },
      { name: 'Ingest Worker Repo', type: 'GitLab', url: 'https://gitlab.internal/health/telemetry-mesh' }
    ]
  },
  {
    id: 'PRJ-003',
    name: 'NextGen Autonomous Logistics',
    client: 'DHL Global Logistics',
    description: 'Route optimization & real-time shipment scheduling leveraging neural network heuristics and edge vehicle telemetry.',
    objectives: [
      'Reduce carrier transit deadhead mileage by 18%',
      'Dynamic dispatch recalculation under 3 seconds per delivery event'
    ],
    status: 'Active',
    employeeRole: 'DevOps & Pipeline Specialist',
    responsibilities: ['Maintain automated Terraform deployments and CI pipelines.'],
    progress: 44,
    nextMilestone: 'Fleet Alpha Simulation',
    milestoneDate: '2026-11-15',
    deadline: '2027-02-28',
    startDate: '2026-07-01',
    teamSize: 5,
    teamMembers: [
      { id: 'EMP-102', name: 'Priya Patel', role: 'Cloud Engineer', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' }
    ],
    announcements: [],
    resources: []
  }
];

export const INITIAL_TASKS_DATA = [
  {
    id: 'TSK-101',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Deploy Multi-Region Aurora PostgreSQL with Cross-Region Replicas',
    description: 'Configure and provision Amazon Aurora PostgreSQL cluster across us-east-1 and eu-west-1. Establish asynchronous streaming replication, test automated failover RTO under 30 seconds, and benchmark read scalability under 10k connections.',
    acceptanceCriteria: [
      { id: 'ac-1', text: 'Terraform script validates in CI pipeline with strict security group egress', completed: true },
      { id: 'ac-2', text: 'Cross-region replication lag is measured < 100ms under 5k writes/sec', completed: true },
      { id: 'ac-3', text: 'Automated failover drill executed with zero data corruption', completed: false },
      { id: 'ac-4', text: 'Monitoring alerts linked to Slack #fintech-alerts channel', completed: false }
    ],
    priority: 'Critical',
    status: 'In Progress',
    progress: 75,
    dueDate: '2026-10-18', // In 3 days
    estimatedHours: 14,
    dependencies: [],
    notes: [
      { id: 'n-1', author: 'Rahul Sharma', timestamp: '2026-10-14 11:30', text: 'Initial Terraform cluster successfully deployed in us-east-1 staging. Setting up replication bridge to eu-west-1.' },
      { id: 'n-2', author: 'Sarah Connor (Manager)', timestamp: '2026-10-14 14:15', text: 'Great progress Rahul! Ensure replication lag metric is pushed to Datadog before Friday.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-12 09:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma by Sarah Connor' },
      { timestamp: '2026-10-13 10:15', action: 'Status Changed', details: 'Changed from To Do to In Progress' },
      { timestamp: '2026-10-14 16:30', action: 'Progress Updated', details: 'Progress updated from 50% to 75%' }
    ],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-102',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Implement mTLS & OAuth2 Token Introspection for FinTech Gateway',
    description: 'Build mutual TLS handshaking verification layer and caching token introspection endpoint using Redis to prevent gateway bottleneck during high volume spikes.',
    acceptanceCriteria: [
      { id: 'ac-5', text: 'X.509 client certificate verification enforced on /v1/transactions', completed: true },
      { id: 'ac-6', text: 'Redis caching layer handles token introspection with 5-minute TTL', completed: false },
      { id: 'ac-7', text: 'Load test completes with 12,000 req/sec without latency degradation', completed: false }
    ],
    priority: 'High',
    status: 'To Do',
    progress: 25,
    dueDate: '2026-10-21', // In 6 days
    estimatedHours: 12,
    dependencies: ['TSK-101'],
    notes: [
      { id: 'n-3', author: 'Rahul Sharma', timestamp: '2026-10-13 16:00', text: 'Awaiting completion of Aurora cluster configuration before running load test harness.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-12 09:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma' }
    ],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-103',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-002',
    projectName: 'Cloud Native Telemetry Mesh',
    title: 'Resolve Memory Leak in Telemetry Edge WebSocket Ingestion Worker',
    description: 'Investigate resident memory growth in Python asyncio worker consuming telemetry packets from Apex medical sensors. Worker restarts every 6 hours due to OOM kill.',
    acceptanceCriteria: [
      { id: 'ac-8', text: 'Memory profile snapshot captured using tracemalloc / memray under synthetic load', completed: true },
      { id: 'ac-9', text: 'Root cause identified and unclosed WebSocket socket references cleaned up', completed: false },
      { id: 'ac-10', text: '72-hour continuous burn-in test shows flat memory usage under 250MB', completed: false }
    ],
    priority: 'Critical',
    status: 'Blocked',
    progress: 40,
    dueDate: '2026-10-16', // TOMORROW / DUE SOON!
    estimatedHours: 16,
    dependencies: [],
    notes: [
      { id: 'n-4', author: 'Rahul Sharma', timestamp: '2026-10-15 08:30', text: 'Worker memory profiling points to unreleased C-extension buffer in vendor eBPF network driver. Waiting on patch release from vendor upstream.' }
    ],
    isBlocked: true,
    blockerReason: 'Upstream vendor eBPF driver library has an unreleased memory buffer bug (Issue #419). Vendor ETA is currently unconfirmed.',
    hasDeadlineRisk: true,
    deadlineRiskReason: 'Task is due tomorrow Oct 16; without vendor patch, automated HIPAA pen-test on Oct 24 will be blocked.',
    history: [
      { timestamp: '2026-10-10 14:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma' },
      { timestamp: '2026-10-12 11:00', action: 'Status Changed', details: 'Changed to In Progress' },
      { timestamp: '2026-10-15 08:30', action: 'Flagged as Blocked', details: 'Reported vendor eBPF library memory leak blocker' }
    ],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-104',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Author Reusable Terraform Cloud Modules for Staging & Production',
    description: 'Package VPC peering, IAM least-privilege roles, and AWS KMS envelope encryption into versioned internal Terraform modules with automated documentation.',
    acceptanceCriteria: [
      { id: 'ac-11', text: 'Modules version tagged v1.2.0 in internal GitHub registry', completed: true },
      { id: 'ac-12', text: 'tfsec security scanner passes with zero warnings', completed: true },
      { id: 'ac-13', text: 'Peer code review approved by DevOps security lead', completed: true }
    ],
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-10-10', // Past
    estimatedHours: 8,
    dependencies: [],
    notes: [
      { id: 'n-5', author: 'Rahul Sharma', timestamp: '2026-10-10 17:00', text: 'Modules deployed and verified across staging environments.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-08 09:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma' },
      { timestamp: '2026-10-10 17:00', action: 'Task Completed', details: 'Marked completed with 100% progress' }
    ],
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
      { id: 'ac-15', text: 'Grafana dashboards provisioned via YAML config maps', completed: true },
      { id: 'ac-16', text: 'Synthetic incident simulation triggers PagerDuty on-call phone escalation', completed: false }
    ],
    priority: 'High',
    status: 'In Progress',
    progress: 60,
    dueDate: '2026-10-22', // In 7 days
    estimatedHours: 10,
    dependencies: [],
    notes: [
      { id: 'n-6', author: 'Rahul Sharma', timestamp: '2026-10-14 10:00', text: 'Dashboards created. Ready for synthetic paging drill on Monday.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-11 10:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma' }
    ],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-106',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    title: 'Optimize Distributed Lock Contention on Redis Cache Cluster',
    description: 'Profile Redis key eviction and redlock mutex acquisition times under synthetic 20,000 transaction/sec burst load to eliminate 8ms thread blocking.',
    acceptanceCriteria: [
      { id: 'ac-17', text: 'Benchmark script written in Locust / Python', completed: false },
      { id: 'ac-18', text: 'Lock timeout tuned from 500ms to 80ms with exponential backoff jitter', completed: false }
    ],
    priority: 'Medium',
    status: 'To Do',
    progress: 0,
    dueDate: '2026-10-28',
    estimatedHours: 8,
    dependencies: ['TSK-101'],
    notes: [],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-13 14:00', action: 'Task Created', details: 'Backlogged for Sprint 15' }
    ],
    syncStatus: 'synced'
  },
  {
    id: 'TSK-107',
    assignedTo: 'EMP-101',
    projectId: 'PRJ-002',
    projectName: 'Cloud Native Telemetry Mesh',
    title: 'HIPAA Audit Compliance Logging Pipeline Validation',
    description: 'Ensure all audit logs contain cryptographically hashed employee IDs, immutable AWS S3 Object Lock retention, and zero plaintext PHI.',
    acceptanceCriteria: [
      { id: 'ac-19', text: 'S3 bucket policy configured with Compliance Mode 7-year lock', completed: true },
      { id: 'ac-20', text: 'Automated test suite validates zero SSN / medical record numbers leaked in logs', completed: true }
    ],
    priority: 'High',
    status: 'In Progress',
    progress: 85,
    dueDate: '2026-10-19',
    estimatedHours: 6,
    dependencies: [],
    notes: [
      { id: 'n-7', author: 'Rahul Sharma', timestamp: '2026-10-15 11:00', text: 'Final verification run scheduled with security officer tomorrow.' }
    ],
    isBlocked: false,
    blockerReason: null,
    hasDeadlineRisk: false,
    deadlineRiskReason: null,
    history: [
      { timestamp: '2026-10-12 11:00', action: 'Task Assigned', details: 'Assigned to Rahul Sharma' }
    ],
    syncStatus: 'synced'
  }
];

export const INITIAL_SUPPORT_REQUESTS = [
  {
    id: 'REQ-2026-081',
    employeeId: 'EMP-101',
    type: 'Workload Support',
    projectId: 'PRJ-001',
    projectName: 'OmniAI Enterprise Platform',
    priority: 'High',
    description: 'Workload at 92% with simultaneous critical milestone deadlines on Oct 24 & Oct 25.',
    reason: 'Both OmniAI Beta release and Telemetry Mesh HIPAA audit occur within 24 hours. Requesting temporary offloading of Telemetry Prometheus tasks (TSK-105) to another engineer to ensure zero quality degradation.',
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
  },
  {
    id: 'NOTIF-03',
    employeeId: 'EMP-101',
    title: 'Workload Support Request Updated',
    message: 'Sarah Connor updated REQ-2026-081 to "Under Review" with a suggested delegation plan.',
    type: 'request',
    timestamp: '1 day ago',
    isRead: false,
    linkTarget: { tab: 'requests', itemId: 'REQ-2026-081' }
  },
  {
    id: 'NOTIF-04',
    employeeId: 'EMP-101',
    title: 'New AI Learning Recommendation',
    message: 'TalentSync AI detected a Docker proficiency gap for upcoming Q1 projects. Recommended course added.',
    type: 'learning',
    timestamp: '2 days ago',
    isRead: true,
    linkTarget: { tab: 'learning', itemId: 'CRS-01' }
  },
  {
    id: 'NOTIF-05',
    employeeId: 'EMP-101',
    title: 'Enterprise Architecture All-Hands',
    message: 'Quarterly engineering roadmap discussion scheduled for Friday at 16:00 UTC.',
    type: 'announcement',
    timestamp: '3 days ago',
    isRead: true,
    linkTarget: { tab: 'home', itemId: null }
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
      { title: 'Rootless container daemon & non-root user execution', completed: true },
      { title: 'Trivy / Grype vulnerability scanning in CI', completed: false },
      { title: 'Docker daemon metrics & cgroup v2 resource limits', completed: false }
    ]
  },
  {
    id: 'CRS-02',
    title: 'Production LLMs & Prompt Engineering Pipelines',
    targetSkill: 'Machine Learning / AI',
    category: 'Technical Track',
    duration: '4 weeks (16 hrs total)',
    difficulty: 'Advanced',
    urgency: 'Medium',
    reason: 'Elevates technical match for AI Decision Orchestrator upcoming roadmap by +18%.',
    progressStatus: 'Not Started',
    progressPercent: 0,
    modules: [
      { title: 'Streaming LLM token generation with async backpressure', completed: false },
      { title: 'Vector embeddings with pgvector on Aurora PostgreSQL', completed: false },
      { title: 'RAG retrieval guardrails and prompt injection defenses', completed: false }
    ]
  },
  {
    id: 'CRS-03',
    title: 'Certified Kubernetes Administrator (CKA) Intensive',
    targetSkill: 'Kubernetes Microservices',
    category: 'Certification Track',
    duration: '6 weeks (24 hrs total)',
    difficulty: 'Advanced',
    urgency: 'High',
    reason: 'Directly maps to sponsored Training Request REQ-2026-052.',
    progressStatus: 'Not Started',
    progressPercent: 0,
    modules: [
      { title: 'Cluster architecture, installation & configuration', completed: false },
      { title: 'Services, Ingress & CoreDNS networking deep dive', completed: false },
      { title: 'Troubleshooting worker node failure & etcd snapshots', completed: false }
    ]
  },
  {
    id: 'CRS-04',
    title: 'Cross-Functional Engineering Leadership & Technical Writing',
    targetSkill: 'Leadership & Communication',
    category: 'Soft Skills Track',
    duration: '1 week (4 hrs total)',
    difficulty: 'Intermediate',
    urgency: 'Low',
    reason: 'Recommended for Senior Engineers preparing for Staff Architect promotions.',
    progressStatus: 'Not Started',
    progressPercent: 0,
    modules: [
      { title: 'Writing persuasive RFCs and Technical Decision Records (ADRs)', completed: false },
      { title: 'Mentoring junior engineers without micro-managing', completed: false }
    ]
  }
];
