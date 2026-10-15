// TalentSync AI — Centralized Reactive Store (Shared between Admin & Employee Portals)
import {
  ADMIN_USERS,
  INITIAL_EMPLOYEES_DATA,
  INITIAL_PROJECTS_DATA,
  INITIAL_TASKS_DATA,
  INITIAL_SUPPORT_REQUESTS,
  INITIAL_RESOURCE_ALERTS,
  INITIAL_AUDIT_LOG,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEARNING_COURSES
} from './talentSyncData.js';

const STORAGE_KEYS = {
  EMPLOYEES: 'talentsync_employees_v2',
  PROJECTS: 'talentsync_projects_v2',
  TASKS: 'talentsync_tasks_v2',
  REQUESTS: 'talentsync_requests_v2',
  ALERTS: 'talentsync_alerts_v2',
  AUDIT: 'talentsync_audit_v2',
  NOTIFICATIONS: 'talentsync_notifications_v2',
  LEARNING: 'talentsync_learning_v2',
  ACTIVE_USER: 'talentsync_active_user_v2',
  ADMIN_SETTINGS: 'talentsync_admin_settings_v2'
};

function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

let employeesCache = loadFromStorage(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES_DATA);
let projectsCache = loadFromStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS_DATA);
let tasksCache = loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS_DATA);
let requestsCache = loadFromStorage(STORAGE_KEYS.REQUESTS, INITIAL_SUPPORT_REQUESTS);
let alertsCache = loadFromStorage(STORAGE_KEYS.ALERTS, INITIAL_RESOURCE_ALERTS);
let auditCache = loadFromStorage(STORAGE_KEYS.AUDIT, INITIAL_AUDIT_LOG);
let notificationsCache = loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
let learningCache = loadFromStorage(STORAGE_KEYS.LEARNING, INITIAL_LEARNING_COURSES);
let adminSettingsCache = loadFromStorage(STORAGE_KEYS.ADMIN_SETTINGS, {
  overloadThreshold: 85,
  underutilizedThreshold: 30,
  pushAlertsEnabled: true,
  emailDigestsEnabled: true
});

const listeners = new Set();
function notifyListeners() {
  listeners.forEach(fn => {
    try { fn(); } catch (err) {}
  });
}

export const talentSyncStore = {
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  // RESET DATABASE
  resetToDemoData() {
    employeesCache = JSON.parse(JSON.stringify(INITIAL_EMPLOYEES_DATA));
    projectsCache = JSON.parse(JSON.stringify(INITIAL_PROJECTS_DATA));
    tasksCache = JSON.parse(JSON.stringify(INITIAL_TASKS_DATA));
    requestsCache = JSON.parse(JSON.stringify(INITIAL_SUPPORT_REQUESTS));
    alertsCache = JSON.parse(JSON.stringify(INITIAL_RESOURCE_ALERTS));
    auditCache = JSON.parse(JSON.stringify(INITIAL_AUDIT_LOG));
    notificationsCache = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));
    learningCache = JSON.parse(JSON.stringify(INITIAL_LEARNING_COURSES));

    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);
    saveToStorage(STORAGE_KEYS.PROJECTS, projectsCache);
    saveToStorage(STORAGE_KEYS.TASKS, tasksCache);
    saveToStorage(STORAGE_KEYS.REQUESTS, requestsCache);
    saveToStorage(STORAGE_KEYS.ALERTS, alertsCache);
    saveToStorage(STORAGE_KEYS.AUDIT, auditCache);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notificationsCache);
    saveToStorage(STORAGE_KEYS.LEARNING, learningCache);

    notifyListeners();
  },

  // SESSION
  getActiveSession() {
    return loadFromStorage(STORAGE_KEYS.ACTIVE_USER, {
      isLoggedIn: true,
      role: 'admin',
      adminUser: ADMIN_USERS[0],
      employeeId: 'EMP-101'
    });
  },

  setActiveSession(session) {
    saveToStorage(STORAGE_KEYS.ACTIVE_USER, session);
    notifyListeners();
  },

  getAdminUsers() {
    return ADMIN_USERS;
  },

  // ADMIN SETTINGS
  getAdminSettings() {
    return { ...adminSettingsCache };
  },

  updateAdminSettings(updates) {
    adminSettingsCache = { ...adminSettingsCache, ...updates };
    saveToStorage(STORAGE_KEYS.ADMIN_SETTINGS, adminSettingsCache);
    this.addAuditLogEntry({
      action: 'Settings Updated',
      target: 'System Settings',
      details: `Workload overload threshold set to ${adminSettingsCache.overloadThreshold}%.`,
      decision: 'System Update'
    });
    notifyListeners();
  },

  // 8 DYNAMIC ADMIN KPIS (Derived strictly from underlying data)
  calculateAdminKPIs() {
    const totalEmployees = employeesCache.filter(e => e.status !== 'Deactivated').length;
    const availableEmployees = employeesCache.filter(e => e.status !== 'Deactivated' && e.workload <= adminSettingsCache.underutilizedThreshold).length;
    const activeProjects = projectsCache.filter(p => p.status === 'Active').length;
    
    // Utilization
    const totalWorkload = employeesCache.filter(e => e.status !== 'Deactivated').reduce((sum, e) => sum + (e.workload || 0), 0);
    const avgUtilization = totalEmployees > 0 ? Math.round(totalWorkload / totalEmployees) : 0;

    const overloadedEmployees = employeesCache.filter(e => e.status !== 'Deactivated' && e.workload >= adminSettingsCache.overloadThreshold).length;
    const underutilizedEmployees = employeesCache.filter(e => e.status !== 'Deactivated' && e.workload <= adminSettingsCache.underutilizedThreshold).length;
    const pendingRequests = requestsCache.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

    // Unfilled Project Positions
    const unfilledPositions = projectsCache.reduce((sum, p) => {
      const needed = p.requiredTeamSize || 0;
      const assigned = (p.assignedEmployees || []).length;
      return sum + Math.max(0, needed - assigned);
    }, 0);

    return {
      totalEmployees,
      availableEmployees,
      activeProjects,
      workforceUtilizationPct: avgUtilization,
      overloadedEmployees,
      underutilizedEmployees,
      pendingRequests,
      unfilledPositions
    };
  },

  // DEPARTMENT ANALYTICS
  getDepartmentDistribution() {
    const depts = {};
    employeesCache.filter(e => e.status !== 'Deactivated').forEach(e => {
      const d = e.department.split('&')[0].trim();
      if (!depts[d]) depts[d] = { count: 0, totalWorkload: 0 };
      depts[d].count += 1;
      depts[d].totalWorkload += e.workload || 0;
    });

    return Object.keys(depts).map(name => ({
      name,
      count: depts[name].count,
      avgWorkload: Math.round(depts[name].totalWorkload / depts[name].count)
    }));
  },

  // EMPLOYEES CRUD
  getAllEmployees() {
    return [...employeesCache];
  },

  getEmployee(empId) {
    return employeesCache.find(e => e.id === empId);
  },

  addEmployee(empData) {
    const newId = `EMP-${100 + employeesCache.length + 1}`;
    const newEmp = {
      id: newId,
      name: empData.name,
      role: empData.role,
      department: empData.department,
      location: empData.location || 'Remote',
      totalExperience: Number(empData.totalExperience || 3),
      avatar: empData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      email: empData.email || `${empData.name.toLowerCase().replace(/\s+/g, '.')}@talentsync.ai`,
      phone: empData.phone || '+1 555 0100',
      emergencyContact: empData.emergencyContact || 'None',
      summary: empData.summary || 'Newly joined workforce specialist.',
      workload: Number(empData.workload || 0),
      plannedCapacityHours: 40,
      assignedHours: Math.round((Number(empData.workload || 0) / 100) * 40),
      availableHours: Math.max(0, 40 - Math.round((Number(empData.workload || 0) / 100) * 40)),
      availability: Math.max(0, 100 - Number(empData.workload || 0)),
      activeProjectIds: [],
      status: 'Active',
      skills: empData.skills || [],
      certifications: [],
      trainingRecords: [],
      weeklyWorkloadTrends: [],
      schedulingConflicts: []
    };

    employeesCache = [newEmp, ...employeesCache];
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    this.addAuditLogEntry({
      action: 'Employee Added',
      target: `${newEmp.name} (${newId})`,
      details: `Added ${newEmp.role} to ${newEmp.department}.`,
      decision: 'Created'
    });

    notifyListeners();
    return newEmp;
  },

  updateEmployee(empId, updates) {
    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        const updated = { ...emp, ...updates };
        if (updates.workload !== undefined) {
          updated.assignedHours = Math.round((updates.workload / 100) * 40);
          updated.availableHours = Math.max(0, 40 - updated.assignedHours);
          updated.availability = Math.max(0, 100 - updates.workload);
        }
        return updated;
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    this.addAuditLogEntry({
      action: 'Employee Updated',
      target: empId,
      details: `Updated details for ${empId}.`,
      decision: 'Updated'
    });

    notifyListeners();
  },

  deactivateEmployee(empId) {
    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        return { ...emp, status: emp.status === 'Deactivated' ? 'Active' : 'Deactivated' };
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    this.addAuditLogEntry({
      action: 'Employee Account Status Changed',
      target: empId,
      details: `Account toggle for ${empId}.`,
      decision: 'Status Toggle'
    });

    notifyListeners();
  },

  // PROJECTS CRUD
  getAllProjects() {
    return [...projectsCache];
  },

  createProject(projData) {
    const count = projectsCache.length + 1;
    const newId = `PRJ-${String(count).padStart(3, '0')}`;
    const newProj = {
      id: newId,
      name: projData.name,
      client: projData.client || 'Enterprise Internal',
      description: projData.description,
      objectives: projData.objectives || ['Deliver scheduled milestones on time and within budget.'],
      status: projData.status || 'Active',
      stage: 'Planning & Staffing',
      priority: projData.priority || 'High',
      employeeRole: 'Core Team',
      responsibilities: [],
      progress: 0,
      nextMilestone: projData.nextMilestone || 'Kickoff & Requirements',
      milestoneDate: projData.milestoneDate || '2026-11-15',
      deadline: projData.deadline || '2027-02-28',
      startDate: projData.startDate || new Date().toISOString().split('T')[0],
      requiredTeamSize: Number(projData.requiredTeamSize || 4),
      assignedEmployees: projData.assignedEmployees || [],
      teamMembers: (projData.assignedEmployees || []).map(id => {
        const emp = this.getEmployee(id);
        return { id, name: emp?.name, role: emp?.role, avatar: emp?.avatar };
      }),
      requiredSkills: projData.requiredSkills || [],
      announcements: [],
      resources: []
    };

    projectsCache = [newProj, ...projectsCache];
    saveToStorage(STORAGE_KEYS.PROJECTS, projectsCache);

    this.addAuditLogEntry({
      action: 'Project Created',
      target: `${newProj.name} (${newId})`,
      details: `Created project with ${newProj.requiredTeamSize} required positions.`,
      decision: 'Created'
    });

    notifyListeners();
    return newProj;
  },

  updateProject(projectId, updates) {
    projectsCache = projectsCache.map(p => {
      if (p.id === projectId) {
        return { ...p, ...updates };
      }
      return p;
    });
    saveToStorage(STORAGE_KEYS.PROJECTS, projectsCache);
    notifyListeners();
  },

  // AI TEAM ALLOCATION
  allocateTeamToProject(projectId, employeeIds) {
    const proj = projectsCache.find(p => p.id === projectId);
    if (!proj) return;

    // 1. Update Project assigned employees
    const members = employeeIds.map(id => {
      const emp = this.getEmployee(id);
      return { id, name: emp?.name, role: emp?.role, avatar: emp?.avatar };
    });

    projectsCache = projectsCache.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          assignedEmployees: employeeIds,
          teamMembers: members,
          status: 'Active',
          stage: employeeIds.length >= (p.requiredTeamSize || 4) ? 'Fully Staffed' : 'Partially Staffed'
        };
      }
      return p;
    });

    // 2. Update Employees workload (+20% for each assignment if not already in)
    employeesCache = employeesCache.map(emp => {
      if (employeeIds.includes(emp.id)) {
        const isNew = !(emp.activeProjectIds || []).includes(projectId);
        const addedLoad = isNew ? 20 : 0;
        const newWorkload = Math.min(100, (emp.workload || 0) + addedLoad);
        const newAssignedHours = Math.round((newWorkload / 100) * 40);
        return {
          ...emp,
          workload: newWorkload,
          assignedHours: newAssignedHours,
          availableHours: Math.max(0, 40 - newAssignedHours),
          availability: Math.max(0, 100 - newWorkload),
          activeProjectIds: Array.from(new Set([...(emp.activeProjectIds || []), projectId]))
        };
      }
      return emp;
    });

    saveToStorage(STORAGE_KEYS.PROJECTS, projectsCache);
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    this.addAuditLogEntry({
      action: 'AI Team Allocation Confirmed',
      target: `${proj.name} (${projectId})`,
      details: `Allocated ${employeeIds.length} employees: ${employeeIds.join(', ')}.`,
      decision: 'Approved'
    });

    // Notify each employee
    employeeIds.forEach(empId => {
      this.addNotification({
        employeeId: empId,
        title: 'New Project Staffing Assignment',
        message: `You were officially assigned to ${proj.name} by Workforce Planning.`,
        type: 'project',
        linkTarget: { tab: 'projects', itemId: projectId }
      });
    });

    notifyListeners();
  },

  // WORKLOAD REBALANCING (Core Hackathon Innovation)
  rebalanceWorkload(fromEmpId, toEmpId, amountPercent = 20) {
    const fromEmp = this.getEmployee(fromEmpId);
    const toEmp = this.getEmployee(toEmpId);
    if (!fromEmp || !toEmp) return;

    employeesCache = employeesCache.map(emp => {
      if (emp.id === fromEmpId) {
        const newLoad = Math.max(20, emp.workload - amountPercent);
        const newHours = Math.round((newLoad / 100) * 40);
        return {
          ...emp,
          workload: newLoad,
          assignedHours: newHours,
          availableHours: 40 - newHours,
          availability: 100 - newLoad
        };
      }
      if (emp.id === toEmpId) {
        const newLoad = Math.min(95, emp.workload + amountPercent);
        const newHours = Math.round((newLoad / 100) * 40);
        return {
          ...emp,
          workload: newLoad,
          assignedHours: newHours,
          availableHours: 40 - newHours,
          availability: 100 - newLoad
        };
      }
      return emp;
    });

    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    this.addAuditLogEntry({
      action: 'Workload Rebalance Applied',
      target: `${fromEmp.name} → ${toEmp.name}`,
      details: `Transferred ${amountPercent}% workload (${Math.round((amountPercent / 100) * 40)}h) to resolve overload.`,
      decision: 'Applied'
    });

    // Notify employees
    this.addNotification({
      employeeId: fromEmpId,
      title: 'Workload Rebalance Completed',
      message: `Management reduced your workload by ${amountPercent}% to ensure milestone balance.`,
      type: 'workload',
      linkTarget: { tab: 'home', itemId: null }
    });

    this.addNotification({
      employeeId: toEmpId,
      title: 'Workload Assignment Adjusted',
      message: `Management allocated +${amountPercent}% project capacity to support team delivery.`,
      type: 'workload',
      linkTarget: { tab: 'home', itemId: null }
    });

    notifyListeners();
  },

  // RESOURCE REQUESTS REVIEW (Approve / Reject)
  respondToSupportRequest(requestId, decision, resolutionNotes, adminName = 'Sarah Connor') {
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let targetEmpId = null;
    let reqType = '';

    requestsCache = requestsCache.map(req => {
      if (req.id === requestId) {
        targetEmpId = req.employeeId;
        reqType = req.type;
        return {
          ...req,
          status: decision === 'Approved' ? 'Approved' : 'Rejected',
          latestResponse: `${adminName}: ${resolutionNotes}`,
          resolutionDetails: resolutionNotes,
          resolutionNotes: resolutionNotes,
          history: [
            { timestamp: nowStr, action: decision, by: adminName },
            ...(req.history || [])
          ]
        };
      }
      return req;
    });

    // If Skill Verification was approved, verify employee's skill!
    if (decision === 'Approved' && reqType === 'Skill Verification' && targetEmpId) {
      employeesCache = employeesCache.map(emp => {
        if (emp.id === targetEmpId) {
          return {
            ...emp,
            skills: (emp.skills || []).map(s => {
              if (s.verificationStatus === 'Pending Verification') {
                return { ...s, isVerified: true, verificationStatus: 'Verified', dateVerified: nowStr.split(' ')[0] };
              }
              return s;
            })
          };
        }
        return emp;
      });
      saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);
    }

    saveToStorage(STORAGE_KEYS.REQUESTS, requestsCache);

    this.addAuditLogEntry({
      action: `Resource Request ${decision}`,
      target: requestId,
      details: `${decision} by ${adminName}: "${resolutionNotes}"`,
      decision
    });

    if (targetEmpId) {
      this.addNotification({
        employeeId: targetEmpId,
        title: `Support Request ${decision} (${requestId})`,
        message: `${adminName} has ${decision.toLowerCase()} your request: "${resolutionNotes}".`,
        type: 'request',
        linkTarget: { tab: 'requests', itemId: requestId }
      });
    }

    notifyListeners();
  },

  // ALERTS CENTER
  getAlerts() {
    return [...alertsCache];
  },

  acknowledgeAlert(alertId) {
    alertsCache = alertsCache.map(a => a.id === alertId ? { ...a, acknowledged: true } : a);
    saveToStorage(STORAGE_KEYS.ALERTS, alertsCache);
    notifyListeners();
  },

  resolveAlert(alertId) {
    alertsCache = alertsCache.map(a => a.id === alertId ? { ...a, resolved: true, acknowledged: true } : a);
    saveToStorage(STORAGE_KEYS.ALERTS, alertsCache);
    this.addAuditLogEntry({
      action: 'Resource Alert Resolved',
      target: alertId,
      details: `Marked alert ${alertId} as resolved.`,
      decision: 'Resolved'
    });
    notifyListeners();
  },

  // AUDIT LOG
  getAuditLog() {
    return [...auditCache];
  },

  addAuditLogEntry(entry) {
    const session = this.getActiveSession();
    const adminUser = session?.adminUser || ADMIN_USERS[0];
    const newEntry = {
      id: `AUD-${String(auditCache.length + 1).padStart(3, '0')}`,
      adminName: adminUser.name,
      adminEmail: adminUser.email,
      action: entry.action,
      target: entry.target || 'General',
      details: entry.details,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      decision: entry.decision || 'Logged'
    };

    auditCache = [newEntry, ...auditCache];
    saveToStorage(STORAGE_KEYS.AUDIT, auditCache);
  },

  // CSV REPORT EXPORT GENERATOR
  generateCSVReport() {
    const rows = [
      ['Employee ID', 'Name', 'Role', 'Department', 'Workload (%)', 'Assigned Hours', 'Capacity Hours', 'Availability (%)', 'Active Projects']
    ];

    employeesCache.forEach(e => {
      rows.push([
        e.id,
        `"${e.name}"`,
        `"${e.role}"`,
        `"${e.department}"`,
        e.workload,
        e.assignedHours,
        e.plannedCapacityHours,
        e.availability,
        `"${(e.activeProjectIds || []).join('; ')}"`
      ]);
    });

    return rows.map(r => r.join(',')).join('\n');
  },

  // NOTIFICATIONS (Shared with Employee portal)
  addNotification(notifData) {
    const newNotif = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      employeeId: notifData.employeeId || 'EMP-101',
      title: notifData.title,
      message: notifData.message,
      type: notifData.type || 'task',
      timestamp: 'Just now',
      isRead: false,
      linkTarget: notifData.linkTarget || { tab: 'home', itemId: null }
    };
    notificationsCache = [newNotif, ...notificationsCache];
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notificationsCache);
  },

  // EMPLOYEE PORTAL QUERIES (Shared cross-portal database)
  getTasksForEmployee(empId) {
    return tasksCache.filter(t => t.assignedTo === empId);
  },

  getAllTasks() {
    return [...tasksCache];
  },

  getProjectsForEmployee(empId) {
    const emp = this.getEmployee(empId);
    if (!emp) return [];
    const pids = emp.activeProjectIds || [];
    return projectsCache.filter(p => pids.includes(p.id) || (p.assignedEmployees || []).includes(empId));
  },

  getRequestsForEmployee(empId) {
    return requestsCache.filter(r => r.employeeId === empId);
  },

  getNotificationsForEmployee(empId) {
    return notificationsCache.filter(n => n.employeeId === empId);
  },

  getLearningCourses() {
    return [...learningCache];
  },

  calculateWorkspaceKPIs(empId) {
    const emp = this.getEmployee(empId);
    const empTasks = this.getTasksForEmployee(empId);
    const empProjects = this.getProjectsForEmployee(empId);
    const activeTasks = empTasks.filter(t => t.status !== 'Completed').length;
    const completedTasks = empTasks.filter(t => t.status === 'Completed').length;
    const blockedTasks = empTasks.filter(t => t.isBlocked).length;
    return {
      workloadPct: emp?.workload || 0,
      assignedHours: emp?.assignedHours || 0,
      plannedCapacityHours: emp?.plannedCapacityHours || 40,
      availableHours: emp?.availableHours || 0,
      activeProjectsCount: empProjects.length,
      activeTasksCount: activeTasks,
      completedTasksCount: completedTasks,
      blockedTasksCount: blockedTasks
    };
  },

  // ALL REQUESTS FOR ADMIN VIEW
  getAllRequests() {
    return [...requestsCache];
  },

  getAllSupportRequests() {
    return this.getAllRequests();
  },

  getWorkforceAlerts() {
    return this.getAlerts();
  }
};
