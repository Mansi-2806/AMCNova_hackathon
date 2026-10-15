// TalentSync AI — Employee Portal Reactive Persistent State & Backend Synchronization Store
import {
  INITIAL_EMPLOYEES_DATA,
  INITIAL_PROJECTS_DATA,
  INITIAL_TASKS_DATA,
  INITIAL_SUPPORT_REQUESTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEARNING_COURSES
} from './talentSyncData';

const STORAGE_KEYS = {
  EMPLOYEES: 'talentsync_employees_v1',
  PROJECTS: 'talentsync_projects_v1',
  TASKS: 'talentsync_tasks_v1',
  REQUESTS: 'talentsync_requests_v1',
  NOTIFICATIONS: 'talentsync_notifications_v1',
  LEARNING: 'talentsync_learning_v1',
  ACTIVE_USER: 'talentsync_active_user_v1',
  THEME: 'talentsync_theme_v1'
};

// Safe LocalStorage helpers
function loadFromStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`[TalentSyncStore] Failed reading ${key}:`, e);
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[TalentSyncStore] Failed writing ${key}:`, e);
  }
}

// In-memory runtime cache initialized from storage or defaults
let employeesCache = loadFromStorage(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES_DATA);
let projectsCache = loadFromStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS_DATA);
let tasksCache = loadFromStorage(STORAGE_KEYS.TASKS, INITIAL_TASKS_DATA);
let requestsCache = loadFromStorage(STORAGE_KEYS.REQUESTS, INITIAL_SUPPORT_REQUESTS);
let notificationsCache = loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
let learningCache = loadFromStorage(STORAGE_KEYS.LEARNING, INITIAL_LEARNING_COURSES);

// Subscriptions listener array
const listeners = new Set();
function notifyListeners() {
  listeners.forEach(fn => {
    try { fn(); } catch (err) { console.error('[TalentSyncStore] Listener error:', err); }
  });
}

export const talentSyncStore = {
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  // RESET TO DEMO DATA
  resetToDemoData() {
    employeesCache = JSON.parse(JSON.stringify(INITIAL_EMPLOYEES_DATA));
    projectsCache = JSON.parse(JSON.stringify(INITIAL_PROJECTS_DATA));
    tasksCache = JSON.parse(JSON.stringify(INITIAL_TASKS_DATA));
    requestsCache = JSON.parse(JSON.stringify(INITIAL_SUPPORT_REQUESTS));
    notificationsCache = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));
    learningCache = JSON.parse(JSON.stringify(INITIAL_LEARNING_COURSES));

    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);
    saveToStorage(STORAGE_KEYS.PROJECTS, projectsCache);
    saveToStorage(STORAGE_KEYS.TASKS, tasksCache);
    saveToStorage(STORAGE_KEYS.REQUESTS, requestsCache);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notificationsCache);
    saveToStorage(STORAGE_KEYS.LEARNING, learningCache);

    notifyListeners();
  },

  // SESSION
  getActiveSession() {
    return loadFromStorage(STORAGE_KEYS.ACTIVE_USER, {
      isLoggedIn: true,
      employeeId: 'EMP-101'
    });
  },

  setActiveSession(session) {
    saveToStorage(STORAGE_KEYS.ACTIVE_USER, session);
    notifyListeners();
  },

  // EMPLOYEES
  getEmployee(empId = 'EMP-101') {
    return employeesCache.find(e => e.id === empId) || employeesCache[0];
  },

  getAllEmployees() {
    return [...employeesCache];
  },

  updateProfile(empId, fields) {
    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        return { ...emp, ...fields };
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);
    notifyListeners();
  },

  addSkill(empId, { name, category = 'Technical', proficiency = 'Intermediate', years = 1 }) {
    const newSkill = {
      id: `SK-${Date.now().toString().slice(-4)}`,
      name,
      category,
      proficiency,
      years: Number(years),
      isVerified: false,
      verificationStatus: 'Self-Reported',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        return {
          ...emp,
          skills: [newSkill, ...emp.skills]
        };
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    // Create confirmation in-app notification
    this.addNotification({
      employeeId: empId,
      title: 'Skill Added to Profile',
      message: `"${name}" added as self-reported (${proficiency}). You can submit it for official verification anytime.`,
      type: 'learning',
      linkTarget: { tab: 'profile', itemId: 'skills' }
    });

    notifyListeners();
    return newSkill;
  },

  submitSkillForVerification(empId, skillId) {
    let skillName = '';
    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        return {
          ...emp,
          skills: emp.skills.map(s => {
            if (s.id === skillId) {
              skillName = s.name;
              return { ...s, verificationStatus: 'Pending Verification' };
            }
            return s;
          })
        };
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    // Automatically create a Support Request in the support center!
    this.createSupportRequest({
      employeeId: empId,
      type: 'Skill Verification',
      projectId: null,
      projectName: 'N/A',
      priority: 'Medium',
      description: `Verification request for skill: ${skillName}`,
      reason: `Employee submitted practical code artifacts and project experience for verification.`
    });

    notifyListeners();
  },

  addCertification(empId, certData) {
    const newCert = {
      id: `CERT-${Date.now().toString().slice(-4)}`,
      name: certData.name,
      issuer: certData.issuer,
      issueDate: certData.issueDate || new Date().toISOString().split('T')[0],
      expiryDate: certData.expiryDate || 'No Expiry',
      credentialId: certData.credentialId || `CRED-${Math.floor(Math.random() * 899999 + 100000)}`,
      verified: false
    };

    employeesCache = employeesCache.map(emp => {
      if (emp.id === empId) {
        return {
          ...emp,
          certifications: [newCert, ...emp.certifications]
        };
      }
      return emp;
    });
    saveToStorage(STORAGE_KEYS.EMPLOYEES, employeesCache);

    // Auto submit verification request
    this.createSupportRequest({
      employeeId: empId,
      type: 'Skill Verification',
      projectId: null,
      projectName: 'N/A',
      priority: 'Medium',
      description: `Official verification for certification: ${certData.name} (${certData.issuer})`,
      reason: `Credential ID: ${newCert.credentialId}`
    });

    notifyListeners();
    return newCert;
  },

  // TASKS
  getTasksForEmployee(empId = 'EMP-101') {
    return tasksCache.filter(t => t.assignedTo === empId);
  },

  getTaskById(taskId) {
    return tasksCache.find(t => t.id === taskId);
  },

  updateTask(taskId, updates) {
    const oldTask = tasksCache.find(t => t.id === taskId);
    if (!oldTask) return;

    const newHistory = [...(oldTask.history || [])];
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    if (updates.status && updates.status !== oldTask.status) {
      newHistory.unshift({
        timestamp: nowStr,
        action: 'Status Changed',
        details: `Status transitioned from "${oldTask.status}" to "${updates.status}"`
      });
    }

    if (updates.progress !== undefined && updates.progress !== oldTask.progress) {
      newHistory.unshift({
        timestamp: nowStr,
        action: 'Progress Updated',
        details: `Progress adjusted from ${oldTask.progress}% to ${updates.progress}%`
      });
    }

    if (updates.isBlocked && !oldTask.isBlocked) {
      newHistory.unshift({
        timestamp: nowStr,
        action: 'Blocker Flagged',
        details: `Reported blocker: "${updates.blockerReason || 'Unspecified'}"`
      });
      // Generate notification
      this.addNotification({
        employeeId: oldTask.assignedTo,
        title: 'Task Blocker Recorded',
        message: `Blocker recorded for ${oldTask.title}. Project Manager notified.`,
        type: 'task',
        linkTarget: { tab: 'tasks', itemId: taskId }
      });
    }

    if (updates.hasDeadlineRisk && !oldTask.hasDeadlineRisk) {
      newHistory.unshift({
        timestamp: nowStr,
        action: 'Deadline Risk Raised',
        details: `Risk flagged: "${updates.deadlineRiskReason || 'At risk of missing milestone'}"`
      });
    }

    tasksCache = tasksCache.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updates,
          history: newHistory,
          syncStatus: 'synced'
        };
      }
      return task;
    });

    saveToStorage(STORAGE_KEYS.TASKS, tasksCache);
    notifyListeners();
  },

  addTaskNote(taskId, noteText, author = 'Rahul Sharma') {
    const newNote = {
      id: `n-${Date.now().toString().slice(-4)}`,
      author,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      text: noteText
    };

    tasksCache = tasksCache.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          notes: [...(task.notes || []), newNote],
          history: [
            {
              timestamp: newNote.timestamp,
              action: 'Note Added',
              details: `"${noteText.slice(0, 40)}${noteText.length > 40 ? '...' : ''}"`
            },
            ...(task.history || [])
          ]
        };
      }
      return task;
    });

    saveToStorage(STORAGE_KEYS.TASKS, tasksCache);
    notifyListeners();
  },

  toggleTaskAcceptanceCriterion(taskId, criterionId) {
    tasksCache = tasksCache.map(task => {
      if (task.id === taskId) {
        const updatedCriteria = (task.acceptanceCriteria || []).map(ac => {
          if (ac.id === criterionId) {
            return { ...ac, completed: !ac.completed };
          }
          return ac;
        });

        // Recalculate progress optionally if criteria driven
        const total = updatedCriteria.length;
        const done = updatedCriteria.filter(c => c.completed).length;
        const autoProgress = total > 0 ? Math.round((done / total) * 100) : task.progress;

        return {
          ...task,
          acceptanceCriteria: updatedCriteria,
          progress: autoProgress,
          status: autoProgress === 100 ? 'Completed' : (task.status === 'Completed' ? 'In Progress' : task.status)
        };
      }
      return task;
    });

    saveToStorage(STORAGE_KEYS.TASKS, tasksCache);
    notifyListeners();
  },

  // PROJECTS
  getProjectsForEmployee(empId = 'EMP-101') {
    const emp = this.getEmployee(empId);
    if (!emp) return [];
    return projectsCache.filter(p => (emp.activeProjectIds || []).includes(p.id));
  },

  getAllProjects() {
    return [...projectsCache];
  },

  // SUPPORT REQUESTS
  getRequestsForEmployee(empId = 'EMP-101') {
    return requestsCache.filter(r => r.employeeId === empId);
  },

  createSupportRequest(reqData) {
    const count = requestsCache.length + 1;
    const reqId = `REQ-2026-${String(count).padStart(3, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newRequest = {
      id: reqId,
      employeeId: reqData.employeeId || 'EMP-101',
      type: reqData.type || 'Workload Support',
      projectId: reqData.projectId || null,
      projectName: reqData.projectName || (reqData.projectId ? 'Project ' + reqData.projectId : 'General'),
      priority: reqData.priority || 'Medium',
      description: reqData.description,
      reason: reqData.reason || '',
      status: 'Submitted',
      submittedAt: nowStr,
      latestResponse: 'Received by TalentSync Workforce Engine. Pending review by Workforce Manager.',
      resolutionDetails: null,
      history: [
        { timestamp: nowStr, action: 'Request Submitted', by: 'Authenticated Employee' }
      ]
    };

    requestsCache = [newRequest, ...requestsCache];
    saveToStorage(STORAGE_KEYS.REQUESTS, requestsCache);

    // Create in-app notification confirming submission
    this.addNotification({
      employeeId: newRequest.employeeId,
      title: `Support Request Logged (${reqId})`,
      message: `Your "${newRequest.type}" request was registered and queued for manager review.`,
      type: 'request',
      linkTarget: { tab: 'requests', itemId: reqId }
    });

    notifyListeners();
    return newRequest;
  },

  // NOTIFICATIONS
  getNotificationsForEmployee(empId = 'EMP-101') {
    return notificationsCache.filter(n => n.employeeId === empId);
  },

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
    notifyListeners();
    return newNotif;
  },

  markNotificationAsRead(notifId) {
    notificationsCache = notificationsCache.map(n => {
      if (n.id === notifId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notificationsCache);
    notifyListeners();
  },

  markAllNotificationsAsRead(empId = 'EMP-101') {
    notificationsCache = notificationsCache.map(n => {
      if (n.employeeId === empId) {
        return { ...n, isRead: true };
      }
      return n;
    });
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notificationsCache);
    notifyListeners();
  },

  // LEARNING CENTER
  getLearningCourses() {
    return [...learningCache];
  },

  updateCourseProgress(courseId, { progressStatus, progressPercent, moduleIndex }) {
    learningCache = learningCache.map(course => {
      if (course.id === courseId) {
        const updatedCourse = { ...course };
        if (progressStatus) updatedCourse.progressStatus = progressStatus;
        if (progressPercent !== undefined) updatedCourse.progressPercent = progressPercent;

        if (moduleIndex !== undefined && updatedCourse.modules && updatedCourse.modules[moduleIndex]) {
          const newModules = [...updatedCourse.modules];
          newModules[moduleIndex].completed = !newModules[moduleIndex].completed;
          updatedCourse.modules = newModules;

          const totalMods = newModules.length;
          const completedMods = newModules.filter(m => m.completed).length;
          updatedCourse.progressPercent = Math.round((completedMods / totalMods) * 100);
          if (updatedCourse.progressPercent === 100) {
            updatedCourse.progressStatus = 'Completed';
          } else if (updatedCourse.progressPercent > 0) {
            updatedCourse.progressStatus = 'In Progress';
          }
        }

        return updatedCourse;
      }
      return course;
    });

    saveToStorage(STORAGE_KEYS.LEARNING, learningCache);
    notifyListeners();
  },

  // DERIVED WORKSPACE KPIS
  calculateWorkspaceKPIs(empId = 'EMP-101') {
    const emp = this.getEmployee(empId);
    const tasks = this.getTasksForEmployee(empId);
    const projects = this.getProjectsForEmployee(empId);
    const requests = this.getRequestsForEmployee(empId);

    const activeProjectsCount = projects.filter(p => p.status === 'Active').length;
    const pendingTasks = tasks.filter(t => t.status !== 'Completed');
    const pendingTasksCount = pendingTasks.length;

    // Tasks due within next 7 days or overdue
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasksDueSoon = pendingTasks.filter(t => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      return d <= sevenDaysFromNow;
    }).length;

    const pendingRequestsCount = requests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

    return {
      activeProjectsCount,
      pendingTasksCount,
      tasksDueSoon,
      workloadPct: emp ? emp.workload : 0,
      assignedHours: emp ? emp.assignedHours : 0,
      plannedCapacityHours: emp ? emp.plannedCapacityHours : 40,
      availabilityPct: emp ? emp.availability : 0,
      availableHours: emp ? emp.availableHours : 0,
      pendingRequestsCount
    };
  }
};
