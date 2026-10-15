// 32 Comprehensive Employee Profiles for WorkforceIQ
export const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-101',
    name: 'Rahul Sharma',
    role: 'Senior Cloud Backend Engineer',
    department: 'Engineering',
    location: 'Bangalore, India',
    totalExperience: 6,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'rahul.s@workforceiq.ai',
    workload: 94, // OVERLOADED
    availability: 6, // 6% available
    availableHours: 3,
    upcomingAvailabilityDate: '2026-12-15',
    leavePeriods: ['2026-11-20 to 2026-11-24'],
    activeProjects: ['PRJ-001', 'PRJ-002'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 6, lastUsed: 'Current', certification: 'Python Institute Certified PCAP' },
      { name: 'AWS Cloud', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: 'AWS Solutions Architect Professional' },
      { name: 'Docker', proficiency: 'Intermediate', years: 3, lastUsed: '1 month ago', certification: null },
      { name: 'PostgreSQL', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: null },
      { name: 'Kubernetes', proficiency: 'Beginner', years: 1, lastUsed: '6 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'FinTech Core Ledger', role: 'Lead Architect', tech: 'Python, AWS, Aurora', duration: '14 mos', rating: 'Exceptional (4.9/5)' },
      { projectName: 'Enterprise SSO Gateway', role: 'Backend Engineer', tech: 'Python, Docker, Redis', duration: '8 mos', rating: 'Exceeded (4.8/5)' }
    ]
  },
  {
    id: 'EMP-102',
    name: 'Priya Patel',
    role: 'Cloud Infrastructure Associate',
    department: 'DevOps & Cloud',
    location: 'Pune, India',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    email: 'priya.p@workforceiq.ai',
    workload: 25, // UNDERUTILIZED - Perfect candidate for workload balancing with Rahul!
    availability: 75,
    availableHours: 30,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-003'],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: 'Certified Associate Python' },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 2.5, lastUsed: 'Current', certification: 'AWS Cloud Practitioner' },
      { name: 'Terraform', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: 'HashiCorp Certified Terraform' },
      { name: 'Docker', proficiency: 'Beginner', years: 1, lastUsed: '2 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Cloud Migration Pilot', role: 'Cloud Engineer', tech: 'AWS, Terraform, Python', duration: '6 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-103',
    name: 'Sarah Jenkins',
    role: 'Principal AI & Machine Learning Scientist',
    department: 'AI Research',
    location: 'San Francisco, USA',
    totalExperience: 8,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    email: 'sarah.j@workforceiq.ai',
    workload: 65, // HEALTHY
    availability: 35,
    availableHours: 14,
    upcomingAvailabilityDate: '2026-11-01',
    leavePeriods: ['2026-12-24 to 2027-01-02'],
    activeProjects: ['PRJ-001'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 8, lastUsed: 'Current', certification: 'Deep Learning Specialization (Coursera)' },
      { name: 'Machine Learning / AI', proficiency: 'Expert', years: 7, lastUsed: 'Current', certification: 'TensorFlow Developer Certified' },
      { name: 'Data Analytics', proficiency: 'Expert', years: 6, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 3, lastUsed: '3 months ago', certification: 'AWS Machine Learning Specialty' },
      { name: 'Docker', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Predictive Fraud Engine', role: 'Lead Data Scientist', tech: 'Python, PyTorch, AWS', duration: '12 mos', rating: 'Outstanding (5.0/5)' },
      { projectName: 'NLP Customer Support Bot', role: 'AI Researcher', tech: 'Transformers, Python', duration: '9 mos', rating: 'Exceptional (4.9/5)' }
    ]
  },
  {
    id: 'EMP-104',
    name: 'Marcus Chen',
    role: 'Senior Staff Frontend Architect',
    department: 'Frontend Engineering',
    location: 'Singapore',
    totalExperience: 7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    email: 'marcus.c@workforceiq.ai',
    workload: 85, // HIGH LOAD
    availability: 15,
    availableHours: 6,
    upcomingAvailabilityDate: '2026-11-15',
    leavePeriods: [],
    activeProjects: ['PRJ-002', 'PRJ-004'],
    skills: [
      { name: 'React / Next.js', proficiency: 'Expert', years: 7, lastUsed: 'Current', certification: 'Meta Frontend Certified' },
      { name: 'TypeScript', proficiency: 'Expert', years: 6, lastUsed: 'Current', certification: null },
      { name: 'UI/UX Design', proficiency: 'Intermediate', years: 4, lastUsed: '1 month ago', certification: 'NN/g UX Master' },
      { name: 'GraphQL', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Node.js', proficiency: 'Intermediate', years: 4, lastUsed: '6 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Design System Unification', role: 'Frontend Lead', tech: 'React, TypeScript, Tailwind', duration: '10 mos', rating: 'Exceptional (4.9/5)' },
      { projectName: 'OmniChannel Portal', role: 'Senior Developer', tech: 'Next.js, GraphQL', duration: '8 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-105',
    name: 'Elena Rostova',
    role: 'DevOps & Site Reliability Engineer',
    department: 'DevOps & Cloud',
    location: 'Berlin, Germany',
    totalExperience: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    email: 'elena.r@workforceiq.ai',
    workload: 92, // OVERLOADED - Rare Kubernetes talent
    availability: 8,
    availableHours: 3,
    upcomingAvailabilityDate: '2026-12-01',
    leavePeriods: [],
    activeProjects: ['PRJ-001', 'PRJ-005'],
    skills: [
      { name: 'Kubernetes', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: 'CKA (Certified Kubernetes Admin)' },
      { name: 'Docker', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: 'Docker Certified Associate' },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: 'AWS SysOps Administrator' },
      { name: 'Terraform', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: 'Terraform Associate' },
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: '2 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Zero-Downtime Multi-Region K8s', role: 'Lead DevOps', tech: 'Kubernetes, Terraform, AWS', duration: '11 mos', rating: 'Exceptional (4.9/5)' }
    ]
  },
  {
    id: 'EMP-106',
    name: 'David O\'Connor',
    role: 'Data & BI Analytics Specialist',
    department: 'Data & Analytics',
    location: 'Dublin, Ireland',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    email: 'david.oc@workforceiq.ai',
    workload: 30, // UNDERUTILIZED
    availability: 70,
    availableHours: 28,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-004'],
    skills: [
      { name: 'Data Analytics', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: 'Google Data Analytics Professional' },
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'Machine Learning / AI', proficiency: 'Beginner', years: 1, lastUsed: '4 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Executive Sales Dashboard', role: 'Data Analyst', tech: 'SQL, Python, Tableau', duration: '7 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-107',
    name: 'Amina Al-Mansoor',
    role: 'Senior Cyber & Cloud Security Analyst',
    department: 'Security & Compliance',
    location: 'Dubai, UAE',
    totalExperience: 6,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80',
    email: 'amina.m@workforceiq.ai',
    workload: 55, // HEALTHY
    availability: 45,
    availableHours: 18,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: ['2026-11-10 to 2026-11-14'],
    activeProjects: ['PRJ-002'],
    skills: [
      { name: 'Cybersecurity & SecOps', proficiency: 'Expert', years: 6, lastUsed: 'Current', certification: 'CISSP, CompTIA Security+' },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: 'AWS Security Specialty' },
      { name: 'Docker', proficiency: 'Intermediate', years: 3, lastUsed: '1 month ago', certification: null },
      { name: 'Kubernetes', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: 'CKS (Kubernetes Security)' }
    ],
    projectHistory: [
      { projectName: 'SOC2 Compliance Remediation', role: 'Security Lead', tech: 'AWS, GuardDuty, K8s', duration: '9 mos', rating: 'Exceptional (4.9/5)' }
    ]
  },
  {
    id: 'EMP-108',
    name: 'Kavita Nair',
    role: 'Lead Product & UX Designer',
    department: 'Design & Product',
    location: 'Bengaluru, India',
    totalExperience: 5,
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=250&q=80',
    email: 'kavita.n@workforceiq.ai',
    workload: 40, // HEALTHY
    availability: 60,
    availableHours: 24,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-005'],
    skills: [
      { name: 'UI/UX Design', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: 'HFI Certified Usability Analyst' },
      { name: 'React / Next.js', proficiency: 'Beginner', years: 1.5, lastUsed: '2 months ago', certification: null },
      { name: 'TypeScript', proficiency: 'Beginner', years: 1, lastUsed: '3 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'B2B Analytics Redesign', role: 'Lead UX Designer', tech: 'Figma, Prototyping', duration: '8 mos', rating: 'Outstanding (5.0/5)' }
    ]
  },
  {
    id: 'EMP-109',
    name: 'Vikram Mehta',
    role: 'Senior Full Stack & Cloud Developer',
    department: 'Engineering',
    location: 'Mumbai, India',
    totalExperience: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    email: 'vikram.m@workforceiq.ai',
    workload: 75, // HIGH LOAD
    availability: 25,
    availableHours: 10,
    upcomingAvailabilityDate: '2026-11-20',
    leavePeriods: [],
    activeProjects: ['PRJ-003', 'PRJ-004'],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'React / Next.js', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'Node.js', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Merchant Settlement Engine', role: 'Fullstack Dev', tech: 'React, Node.js, Postgres', duration: '11 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-110',
    name: 'Tanya Gomez',
    role: 'Junior DevOps Engineer',
    department: 'DevOps & Cloud',
    location: 'Austin, USA',
    totalExperience: 2,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    email: 'tanya.g@workforceiq.ai',
    workload: 20, // UNDERUTILIZED - Perfect candidate for Docker/K8s upskilling!
    availability: 80,
    availableHours: 32,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: [],
    skills: [
      { name: 'Docker', proficiency: 'Beginner', years: 1.5, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Beginner', years: 1, lastUsed: 'Current', certification: 'AWS Certified Cloud Practitioner' },
      { name: 'Python', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null },
      { name: 'Terraform', proficiency: 'Beginner', years: 0.5, lastUsed: '1 month ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'CI/CD Automation Sprint', role: 'Associate DevOps', tech: 'GitHub Actions, Docker', duration: '4 mos', rating: 'Strong (4.5/5)' }
    ]
  },
  {
    id: 'EMP-111',
    name: 'Arjun Verma',
    role: 'Backend API Specialist',
    department: 'Engineering',
    location: 'Delhi, India',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    email: 'arjun.v@workforceiq.ai',
    workload: 96, // OVERLOADED
    availability: 4,
    availableHours: 2,
    upcomingAvailabilityDate: '2026-12-30',
    leavePeriods: [],
    activeProjects: ['PRJ-001', 'PRJ-005'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: 'Django Certified Developer' },
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'GraphQL', proficiency: 'Expert', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Docker', proficiency: 'Intermediate', years: 2, lastUsed: '1 month ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Microservices Gateway', role: 'Backend Lead', tech: 'Python, FastAPI, Redis', duration: '9 mos', rating: 'Exceptional (4.8/5)' }
    ]
  },
  {
    id: 'EMP-112',
    name: 'Chloe Dubois',
    role: 'Data Scientist & ML Engineer',
    department: 'AI Research',
    location: 'Paris, France',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'chloe.d@workforceiq.ai',
    workload: 50, // HEALTHY
    availability: 50,
    availableHours: 20,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-003'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: null },
      { name: 'Machine Learning / AI', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: 'Coursera ML by Andrew Ng' },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Beginner', years: 1, lastUsed: '4 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Recommendation Engine V2', role: 'ML Engineer', tech: 'Python, Scikit-learn', duration: '8 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-113',
    name: 'Suresh Raina',
    role: 'Cloud Architect & Team Lead',
    department: 'DevOps & Cloud',
    location: 'Chennai, India',
    totalExperience: 9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    email: 'suresh.r@workforceiq.ai',
    workload: 65, // HEALTHY
    availability: 35,
    availableHours: 14,
    upcomingAvailabilityDate: '2026-11-05',
    leavePeriods: [],
    activeProjects: ['PRJ-001'],
    skills: [
      { name: 'AWS Cloud', proficiency: 'Expert', years: 8, lastUsed: 'Current', certification: 'AWS Certified Solutions Architect' },
      { name: 'Terraform', proficiency: 'Expert', years: 5, lastUsed: 'Current', certification: null },
      { name: 'Docker', proficiency: 'Intermediate', years: 6, lastUsed: 'Current', certification: null },
      { name: 'Kubernetes', proficiency: 'Intermediate', years: 3, lastUsed: '1 month ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Enterprise Multi-Cloud Mesh', role: 'Lead Architect', tech: 'AWS, Terraform, Transit VPC', duration: '15 mos', rating: 'Exceptional (5.0/5)' }
    ]
  },
  {
    id: 'EMP-114',
    name: 'Jessica Taylor',
    role: 'React Frontend Developer',
    department: 'Frontend Engineering',
    location: 'London, UK',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    email: 'jessica.t@workforceiq.ai',
    workload: 25, // UNDERUTILIZED
    availability: 75,
    availableHours: 30,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-002'],
    skills: [
      { name: 'React / Next.js', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Intermediate', years: 2.5, lastUsed: 'Current', certification: null },
      { name: 'UI/UX Design', proficiency: 'Beginner', years: 1.5, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Customer Support Portal', role: 'Frontend Dev', tech: 'React, Tailwind, Redux', duration: '6 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-115',
    name: 'Hiroshi Tanaka',
    role: 'Database & Backend Performance Specialist',
    department: 'Engineering',
    location: 'Tokyo, Japan',
    totalExperience: 7,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
    email: 'hiroshi.t@workforceiq.ai',
    workload: 80, // HIGH LOAD
    availability: 20,
    availableHours: 8,
    upcomingAvailabilityDate: '2026-11-30',
    leavePeriods: [],
    activeProjects: ['PRJ-004', 'PRJ-005'],
    skills: [
      { name: 'PostgreSQL', proficiency: 'Expert', years: 7, lastUsed: 'Current', certification: 'PostgreSQL Professional' },
      { name: 'Python', proficiency: 'Intermediate', years: 5, lastUsed: 'Current', certification: null },
      { name: 'Node.js', proficiency: 'Intermediate', years: 4, lastUsed: '2 months ago', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'High Throughput Ledger', role: 'DBA & Backend', tech: 'Postgres Sharding, Python', duration: '12 mos', rating: 'Outstanding (4.9/5)' }
    ]
  },
  {
    id: 'EMP-116',
    name: 'Fatima Zahra',
    role: 'Data Engineer & ETL Architect',
    department: 'Data & Analytics',
    location: 'Casablanca, Morocco',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'fatima.z@workforceiq.ai',
    workload: 60, // HEALTHY
    availability: 40,
    availableHours: 16,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-003'],
    skills: [
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'Python', proficiency: 'Intermediate', years: 3.5, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: 'AWS Data Analytics Specialty' }
    ],
    projectHistory: [
      { projectName: 'Customer 360 Pipeline', role: 'ETL Developer', tech: 'Airflow, Python, Redshift', duration: '8 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-117',
    name: 'Lucas Silva',
    role: 'Mobile & Frontend Specialist',
    department: 'Frontend Engineering',
    location: 'São Paulo, Brazil',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    email: 'lucas.s@workforceiq.ai',
    workload: 20, // UNDERUTILIZED
    availability: 80,
    availableHours: 32,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: [],
    skills: [
      { name: 'React / Next.js', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'UI/UX Design', proficiency: 'Beginner', years: 1.5, lastUsed: '3 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Field Operations Mobile App', role: 'React Native Dev', tech: 'React Native, Redux', duration: '7 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-118',
    name: 'Ananya Deshmukh',
    role: 'AI / NLP Researcher',
    department: 'AI Research',
    location: 'Hyderabad, India',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    email: 'ananya.d@workforceiq.ai',
    workload: 70, // HEALTHY
    availability: 30,
    availableHours: 12,
    upcomingAvailabilityDate: '2026-11-10',
    leavePeriods: [],
    activeProjects: ['PRJ-001'],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Machine Learning / AI', proficiency: 'Intermediate', years: 2.5, lastUsed: 'Current', certification: 'DeepLearning.AI NLP' },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Contract Summarizer AI', role: 'NLP Specialist', tech: 'Python, HuggingFace', duration: '6 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-119',
    name: 'Oliver Hansen',
    role: 'Security & DevSecOps Engineer',
    department: 'Security & Compliance',
    location: 'Copenhagen, Denmark',
    totalExperience: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    email: 'oliver.h@workforceiq.ai',
    workload: 35, // HEALTHY
    availability: 65,
    availableHours: 26,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-005'],
    skills: [
      { name: 'Cybersecurity & SecOps', proficiency: 'Intermediate', years: 5, lastUsed: 'Current', certification: 'CEH (Certified Ethical Hacker)' },
      { name: 'Docker', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Kubernetes', proficiency: 'Beginner', years: 1.5, lastUsed: '2 months ago', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Vulnerability Scanning Suite', role: 'SecOps Dev', tech: 'Trivy, SonarQube, AWS', duration: '8 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-120',
    name: 'Neha Kapoor',
    role: 'Staff Product Manager',
    department: 'Design & Product',
    location: 'Gurugram, India',
    totalExperience: 7,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    email: 'neha.k@workforceiq.ai',
    workload: 90, // OVERLOADED
    availability: 10,
    availableHours: 4,
    upcomingAvailabilityDate: '2026-12-05',
    leavePeriods: [],
    activeProjects: ['PRJ-001', 'PRJ-002'],
    skills: [
      { name: 'UI/UX Design', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: 'Pragmatic Product Management' },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Enterprise Workflow Revamp', role: 'Lead PM', tech: 'Agile, User Discovery', duration: '12 mos', rating: 'Exceptional (4.9/5)' }
    ]
  },
  {
    id: 'EMP-121',
    name: 'Daniel Kim',
    role: 'TypeScript & Frontend Specialist',
    department: 'Frontend Engineering',
    location: 'Seoul, South Korea',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    email: 'daniel.k@workforceiq.ai',
    workload: 55, // HEALTHY
    availability: 45,
    availableHours: 18,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-004'],
    skills: [
      { name: 'React / Next.js', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: null },
      { name: 'GraphQL', proficiency: 'Intermediate', years: 2.5, lastUsed: 'Current', certification: null },
      { name: 'Node.js', proficiency: 'Beginner', years: 1.5, lastUsed: '4 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'High-Freq Trading Front-End', role: 'Frontend Engineer', tech: 'React, WebSockets', duration: '9 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-122',
    name: 'Maya Lin',
    role: 'Cloud Automation Engineer',
    department: 'DevOps & Cloud',
    location: 'Vancouver, Canada',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    email: 'maya.l@workforceiq.ai',
    workload: 30, // UNDERUTILIZED - Prime candidate for Kubernetes upskilling
    availability: 70,
    availableHours: 28,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-005'],
    skills: [
      { name: 'Terraform', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: 'Terraform Associate' },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Docker', proficiency: 'Beginner', years: 1.5, lastUsed: 'Current', certification: null },
      { name: 'Kubernetes', proficiency: 'Beginner', years: 0.5, lastUsed: '1 month ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'IaC Fleet Provisioning', role: 'Cloud Engineer', tech: 'Terraform, AWS, Bash', duration: '7 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-123',
    name: 'Karthik Raja',
    role: 'Senior Python & Data Engineer',
    department: 'Engineering',
    location: 'Coimbatore, India',
    totalExperience: 6,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    email: 'karthik.r@workforceiq.ai',
    workload: 65, // HEALTHY
    availability: 35,
    availableHours: 14,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-003'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 6, lastUsed: 'Current', certification: null },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Intermediate', years: 5, lastUsed: 'Current', certification: null },
      { name: 'Docker', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Distributed Real-time Ingestion', role: 'Lead Data Eng', tech: 'Python, Kafka, Postgres', duration: '11 mos', rating: 'Outstanding (4.8/5)' }
    ]
  },
  {
    id: 'EMP-124',
    name: 'Zoe Martinez',
    role: 'UI Designer & Prototyper',
    department: 'Design & Product',
    location: 'Barcelona, Spain',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=250&q=80',
    email: 'zoe.m@workforceiq.ai',
    workload: 45, // HEALTHY
    availability: 55,
    availableHours: 22,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-004'],
    skills: [
      { name: 'UI/UX Design', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: 'Interaction Design Foundation' },
      { name: 'React / Next.js', proficiency: 'Beginner', years: 1, lastUsed: '2 months ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Mobile Banking Design Kit', role: 'UI Designer', tech: 'Figma, Design Tokens', duration: '5 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-125',
    name: 'Amitabh Joshi',
    role: 'Solutions Architect & Enterprise Advisor',
    department: 'Engineering',
    location: 'Pune, India',
    totalExperience: 11,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80',
    email: 'amitabh.j@workforceiq.ai',
    workload: 95, // OVERLOADED
    availability: 5,
    availableHours: 2,
    upcomingAvailabilityDate: '2027-01-15',
    leavePeriods: [],
    activeProjects: ['PRJ-001', 'PRJ-002', 'PRJ-005'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 10, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Expert', years: 9, lastUsed: 'Current', certification: 'AWS Solutions Architect Professional' },
      { name: 'Kubernetes', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Expert', years: 8, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Core Banking Modernization', role: 'Principal Architect', tech: 'AWS, Microservices', duration: '18 mos', rating: 'Legendary (5.0/5)' }
    ]
  },
  {
    id: 'EMP-126',
    name: 'Siddharth Rao',
    role: 'Junior Python & Data Specialist',
    department: 'Engineering',
    location: 'Noida, India',
    totalExperience: 2,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    email: 'siddharth.r@workforceiq.ai',
    workload: 15, // UNDERUTILIZED
    availability: 85,
    availableHours: 34,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: [],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 1.5, lastUsed: 'Current', certification: null },
      { name: 'PostgreSQL', proficiency: 'Beginner', years: 1, lastUsed: '1 month ago', certification: null }
    ],
    projectHistory: [
      { projectName: 'Internal Log Parser Tool', role: 'Junior Dev', tech: 'Python, Pandas', duration: '3 mos', rating: 'Solid (4.5/5)' }
    ]
  },
  {
    id: 'EMP-127',
    name: 'Nadia Petrova',
    role: 'Machine Learning Operations (MLOps) Engineer',
    department: 'AI Research',
    location: 'Warsaw, Poland',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    email: 'nadia.p@workforceiq.ai',
    workload: 50, // HEALTHY
    availability: 50,
    availableHours: 20,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-002'],
    skills: [
      { name: 'Python', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: null },
      { name: 'Machine Learning / AI', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'Docker', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Real-time Inference Serving', role: 'MLOps Engineer', tech: 'MLflow, Docker, FastAPI', duration: '8 mos', rating: 'Strong (4.8/5)' }
    ]
  },
  {
    id: 'EMP-128',
    name: 'Gabriel Morales',
    role: 'Full Stack Node & React Engineer',
    department: 'Engineering',
    location: 'Bogotá, Colombia',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    email: 'gabriel.m@workforceiq.ai',
    workload: 60, // HEALTHY
    availability: 40,
    availableHours: 16,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-004'],
    skills: [
      { name: 'Node.js', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: 'OpenJS Node Certified' },
      { name: 'React / Next.js', proficiency: 'Intermediate', years: 3.5, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'GraphQL', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Partner API Portal', role: 'Backend Dev', tech: 'Node.js, Express, Redis', duration: '7 mos', rating: 'Strong (4.7/5)' }
    ]
  },
  {
    id: 'EMP-129',
    name: 'Simran Chadha',
    role: 'Quality & Test Automation Engineer',
    department: 'Engineering',
    location: 'Chandigarh, India',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    email: 'simran.c@workforceiq.ai',
    workload: 25, // UNDERUTILIZED
    availability: 75,
    availableHours: 30,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-005'],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: 'ISTQB Certified Tester' },
      { name: 'Docker', proficiency: 'Beginner', years: 1, lastUsed: '2 months ago', certification: null },
      { name: 'TypeScript', proficiency: 'Beginner', years: 1.5, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Automated Regression Suite', role: 'QA Lead', tech: 'Playwright, Python, PyTest', duration: '6 mos', rating: 'Strong (4.6/5)' }
    ]
  },
  {
    id: 'EMP-130',
    name: 'Alexander Vogt',
    role: 'Senior Cloud Security Architect',
    department: 'Security & Compliance',
    location: 'Munich, Germany',
    totalExperience: 8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    email: 'alex.v@workforceiq.ai',
    workload: 85, // HIGH LOAD
    availability: 15,
    availableHours: 6,
    upcomingAvailabilityDate: '2026-11-28',
    leavePeriods: [],
    activeProjects: ['PRJ-001', 'PRJ-003'],
    skills: [
      { name: 'Cybersecurity & SecOps', proficiency: 'Expert', years: 8, lastUsed: 'Current', certification: 'CCSP, CISSP' },
      { name: 'AWS Cloud', proficiency: 'Expert', years: 7, lastUsed: 'Current', certification: null },
      { name: 'Terraform', proficiency: 'Intermediate', years: 4, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Zero Trust Network Architecture', role: 'Lead Architect', tech: 'AWS, Okta, Zscaler', duration: '14 mos', rating: 'Outstanding (4.9/5)' }
    ]
  },
  {
    id: 'EMP-131',
    name: 'Mei-Ling Zhou',
    role: 'Frontend & Data Visualization Engineer',
    department: 'Frontend Engineering',
    location: 'Hong Kong',
    totalExperience: 4,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    email: 'meiling.z@workforceiq.ai',
    workload: 35, // HEALTHY
    availability: 65,
    availableHours: 26,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: ['PRJ-002'],
    skills: [
      { name: 'React / Next.js', proficiency: 'Expert', years: 4, lastUsed: 'Current', certification: null },
      { name: 'TypeScript', proficiency: 'Intermediate', years: 3.5, lastUsed: 'Current', certification: null },
      { name: 'Data Analytics', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Interactive Telemetry Dashboards', role: 'D3/React Specialist', tech: 'D3.js, React, WebSockets', duration: '8 mos', rating: 'Exceptional (4.9/5)' }
    ]
  },
  {
    id: 'EMP-132',
    name: 'Rohan Gupta',
    role: 'Cloud Native & Microservices Dev',
    department: 'Engineering',
    location: 'Gurugram, India',
    totalExperience: 3,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    email: 'rohan.g@workforceiq.ai',
    workload: 20, // UNDERUTILIZED
    availability: 80,
    availableHours: 32,
    upcomingAvailabilityDate: 'Immediate',
    leavePeriods: [],
    activeProjects: [],
    skills: [
      { name: 'Python', proficiency: 'Intermediate', years: 3, lastUsed: 'Current', certification: null },
      { name: 'AWS Cloud', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: 'AWS Developer Associate' },
      { name: 'Docker', proficiency: 'Intermediate', years: 2, lastUsed: 'Current', certification: null },
      { name: 'Kubernetes', proficiency: 'Beginner', years: 1, lastUsed: 'Current', certification: null }
    ],
    projectHistory: [
      { projectName: 'Serverless Event Broker', role: 'Backend Dev', tech: 'AWS Lambda, EventBridge, Python', duration: '5 mos', rating: 'Strong (4.7/5)' }
    ]
  }
];
