import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  Plus, 
  ChevronRight, 
  Check, 
  Calendar,
  X
} from 'lucide-react';

export function TasksScreen({ 
  tasks = [], 
  projects = [], 
  initialProjectId = null,
  onOpenTaskDetail 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(initialProjectId || 'all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedDueDate, setSelectedDueDate] = useState('all');

  // Counts
  const totalCount = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const blockedCount = tasks.filter(t => t.status === 'Blocked' || t.isBlocked).length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;

  // Filter Logic
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const filteredTasks = tasks.filter(task => {
    // Search
    if (searchTerm.trim() && !task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Project
    if (selectedProject !== 'all' && task.projectId !== selectedProject) {
      return false;
    }
    // Status
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'Blocked') {
        if (task.status !== 'Blocked' && !task.isBlocked) return false;
      } else if (task.status !== selectedStatus) {
        return false;
      }
    }
    // Priority
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
      return false;
    }
    // Due Date
    if (selectedDueDate !== 'all') {
      if (!task.dueDate) return false;
      const d = new Date(task.dueDate);
      if (selectedDueDate === 'dueSoon') {
        if (d > sevenDays || task.status === 'Completed') return false;
      } else if (selectedDueDate === 'overdue') {
        if (d >= now || task.status === 'Completed') return false;
      }
    }
    return true;
  });

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'priority-critical';
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  return (
    <div className="tab-view-container">
      {/* Title & Stats */}
      <div className="tab-header-card">
        <h2 className="tab-title">My Tasks</h2>
        <p className="tab-sub">
          Authorized assignments for your authenticated profile ({tasks.length} total)
        </p>

        {/* Quick Summary Pill Bar */}
        <div className="tasks-summary-chips">
          <button 
            type="button" 
            className={`summary-chip ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            <span>All</span>
            <strong>{totalCount}</strong>
          </button>

          <button 
            type="button" 
            className={`summary-chip ${selectedStatus === 'In Progress' ? 'active in-progress' : ''}`}
            onClick={() => setSelectedStatus('In Progress')}
          >
            <span>In Progress</span>
            <strong>{inProgressCount}</strong>
          </button>

          <button 
            type="button" 
            className={`summary-chip ${selectedStatus === 'Blocked' ? 'active blocked' : ''}`}
            onClick={() => setSelectedStatus('Blocked')}
          >
            <span>Blocked</span>
            <strong>{blockedCount}</strong>
          </button>

          <button 
            type="button" 
            className={`summary-chip ${selectedStatus === 'Completed' ? 'active completed' : ''}`}
            onClick={() => setSelectedStatus('Completed')}
          >
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="task-search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search assigned tasks by title..."
          className="search-input"
        />
        {searchTerm && (
          <button 
            type="button" 
            className="clear-search-btn"
            onClick={() => setSearchTerm('')}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter Chips Scroll */}
      <div className="filter-chips-scroll">
        {/* Project Filter */}
        <select 
          value={selectedProject} 
          onChange={(e) => setSelectedProject(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Priority Filter */}
        <select 
          value={selectedPriority} 
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Priorities</option>
          <option value="Critical">Critical Priority</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Due Date Filter */}
        <select 
          value={selectedDueDate} 
          onChange={(e) => setSelectedDueDate(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Deadlines</option>
          <option value="dueSoon">Due Soon (Next 7d)</option>
          <option value="overdue">Overdue</option>
        </select>

        {(selectedProject !== 'all' || selectedPriority !== 'all' || selectedDueDate !== 'all' || selectedStatus !== 'all') && (
          <button 
            type="button" 
            className="reset-filters-chip"
            onClick={() => {
              setSelectedProject('all');
              setSelectedPriority('all');
              setSelectedDueDate('all');
              setSelectedStatus('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className="tasks-vertical-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-sub-state">
            <CheckCircle2 size={36} className="text-muted" />
            <p>No tasks found matching your filter criteria.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'Completed';
            const isBlocked = task.status === 'Blocked' || task.isBlocked;
            const isCritical = task.priority === 'Critical';

            return (
              <div 
                key={task.id} 
                className={`task-item-card ${isBlocked ? 'card-blocked' : ''} ${isDone ? 'card-done' : ''}`}
                onClick={() => onOpenTaskDetail(task)}
              >
                {/* Top Row: Priority & Project */}
                <div className="task-card-meta-row">
                  <span className={`task-priority-pill ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="task-project-tag">
                    <Layers size={11} />
                    <span>{task.projectName}</span>
                  </span>
                  <span className="task-card-id">{task.id}</span>
                </div>

                {/* Title */}
                <h3 className={`task-card-title ${isDone ? 'title-done' : ''}`}>
                  {task.title}
                </h3>

                {/* Description excerpt */}
                <p className="task-card-excerpt">{task.description}</p>

                {/* Blocker Callout */}
                {isBlocked && (
                  <div className="task-card-blocker-banner">
                    <ShieldAlert size={14} className="text-rose" />
                    <span>BLOCKED: {task.blockerReason || 'Waiting on external dependencies.'}</span>
                  </div>
                )}

                {/* Deadline Risk Callout */}
                {task.hasDeadlineRisk && !isBlocked && (
                  <div className="task-card-risk-banner">
                    <AlertTriangle size={14} className="text-amber" />
                    <span>AT RISK: {task.deadlineRiskReason || 'Milestone timeline compressed.'}</span>
                  </div>
                )}

                {/* Bottom Row: Due date, Progress bar, Status */}
                <div className="task-card-bottom-row">
                  <div className="task-due-col">
                    <Clock size={13} />
                    <span className={new Date(task.dueDate) <= new Date() && !isDone ? 'text-urgent' : ''}>
                      {task.dueDate}
                    </span>
                  </div>

                  <div className="task-progress-col">
                    <div className="mini-progress-track">
                      <div 
                        className={`mini-progress-fill ${isDone ? 'fill-emerald' : 'fill-teal'}`}
                        style={{ width: `${task.progress}%` }} 
                      />
                    </div>
                    <span className="progress-num">{task.progress}%</span>
                  </div>

                  <span className={`task-status-pill ${task.status.toLowerCase().replace(' ', '-')}`}>
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
