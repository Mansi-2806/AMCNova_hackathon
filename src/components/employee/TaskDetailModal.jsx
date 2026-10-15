import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  ShieldAlert, 
  Send, 
  Calendar, 
  Layers, 
  History, 
  ListChecks, 
  FileText, 
  Check, 
  X,
  Share2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function TaskDetailModal({ task, onClose, onNavigateToProjects }) {
  if (!task) return null;

  const [currentStatus, setCurrentStatus] = useState(task.status);
  const [currentProgress, setCurrentProgress] = useState(task.progress);
  const [isBlocked, setIsBlocked] = useState(task.isBlocked || false);
  const [blockerReason, setBlockerReason] = useState(task.blockerReason || '');
  const [hasDeadlineRisk, setHasDeadlineRisk] = useState(task.hasDeadlineRisk || false);
  const [deadlineRiskReason, setDeadlineRiskReason] = useState(task.deadlineRiskReason || '');
  const [newNote, setNewNote] = useState('');
  const [syncingState, setSyncingState] = useState('synced'); // 'synced' | 'saving'

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setSyncingState('saving');
    talentSyncStore.updateTask(task.id, {
      status: newStatus,
      progress: newStatus === 'Completed' ? 100 : (newStatus === 'To Do' && currentProgress === 100 ? 0 : currentProgress)
    });
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const handleProgressChange = (val) => {
    const num = Number(val);
    setCurrentProgress(num);
    const autoStatus = num === 100 ? 'Completed' : (currentStatus === 'Completed' ? 'In Progress' : currentStatus);
    setCurrentStatus(autoStatus);
    setSyncingState('saving');
    talentSyncStore.updateTask(task.id, {
      progress: num,
      status: autoStatus
    });
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const handleToggleCriterion = (criterionId) => {
    setSyncingState('saving');
    talentSyncStore.toggleTaskAcceptanceCriterion(task.id, criterionId);
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const handleSaveBlocker = () => {
    setSyncingState('saving');
    talentSyncStore.updateTask(task.id, {
      isBlocked,
      blockerReason: isBlocked ? blockerReason : null,
      status: isBlocked ? 'Blocked' : (currentStatus === 'Blocked' ? 'In Progress' : currentStatus)
    });
    if (isBlocked) setCurrentStatus('Blocked');
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const handleSaveRisk = () => {
    setSyncingState('saving');
    talentSyncStore.updateTask(task.id, {
      hasDeadlineRisk,
      deadlineRiskReason: hasDeadlineRisk ? deadlineRiskReason : null
    });
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSyncingState('saving');
    talentSyncStore.addTaskNote(task.id, newNote.trim());
    setNewNote('');
    setTimeout(() => setSyncingState('synced'), 400);
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'badge-priority-critical';
      case 'High': return 'badge-priority-high';
      case 'Medium': return 'badge-priority-medium';
      default: return 'badge-priority-low';
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className={`task-priority-pill ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority} Priority
            </span>
            <span className="task-id-tag">{task.id}</span>
            <div className="sync-status-indicator">
              {syncingState === 'saving' ? (
                <>
                  <RefreshCw size={12} className="spin-icon" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <Check size={12} className="check-icon" />
                  <span>Synced</span>
                </>
              )}
            </div>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {/* Title & Project */}
          <div className="task-detail-title-section">
            <h2 className="task-detail-title">{task.title}</h2>
            <div className="task-project-link">
              <Layers size={15} />
              <span>{task.projectName}</span>
            </div>
          </div>

          {/* Status Controls */}
          <div className="task-control-card">
            <label className="section-small-label">Task Status</label>
            <div className="status-selector-grid">
              {['To Do', 'In Progress', 'Blocked', 'Completed'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`status-btn ${currentStatus === s ? 'active ' + s.toLowerCase().replace(' ', '-') : ''}`}
                  onClick={() => handleStatusChange(s)}
                >
                  {s === 'Completed' && <CheckCircle2 size={14} />}
                  {s === 'Blocked' && <AlertTriangle size={14} />}
                  <span>{s}</span>
                </button>
              ))}
            </div>

            {/* Progress Slider */}
            <div className="progress-slider-container">
              <div className="slider-label-row">
                <span className="slider-title">Execution Progress</span>
                <span className="slider-val-badge">{currentProgress}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                step="5"
                value={currentProgress}
                onChange={(e) => handleProgressChange(e.target.value)}
                className="android-slider"
              />
              <div className="slider-ticks">
                <span>0% (Not Started)</span>
                <span>50%</span>
                <span>100% (Done)</span>
              </div>
            </div>
          </div>

          {/* Due Date & Estimates Info */}
          <div className="task-meta-grid">
            <div className="meta-info-card">
              <Calendar size={18} className="meta-icon" />
              <div>
                <span className="meta-label">Deadline</span>
                <strong className={`meta-val ${new Date(task.dueDate) <= new Date() ? 'text-urgent' : ''}`}>
                  {task.dueDate}
                </strong>
              </div>
            </div>

            <div className="meta-info-card">
              <Clock size={18} className="meta-icon" />
              <div>
                <span className="meta-label">Estimated Effort</span>
                <strong className="meta-val">{task.estimatedHours || 12} Hours</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <FileText size={16} />
              <span>Description & Scope</span>
            </h4>
            <p className="task-description-text">{task.description}</p>
          </div>

          {/* Acceptance Criteria */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <ListChecks size={16} />
              <span>Acceptance Criteria</span>
            </h4>
            <div className="acceptance-list">
              {(task.acceptanceCriteria || []).map((ac) => (
                <label key={ac.id} className="acceptance-item">
                  <input
                    type="checkbox"
                    checked={ac.completed}
                    onChange={() => handleToggleCriterion(ac.id)}
                  />
                  <span className={`acceptance-text ${ac.completed ? 'completed' : ''}`}>
                    {ac.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          {task.dependencies && task.dependencies.length > 0 && (
            <div className="task-section-box">
              <h4 className="section-box-title">
                <Layers size={16} />
                <span>Task Dependencies</span>
              </h4>
              <div className="dependencies-chips">
                {task.dependencies.map((depId) => (
                  <span key={depId} className="dep-chip">
                    Requires: {depId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Blocker Reporting Section */}
          <div className={`blocker-panel ${isBlocked ? 'active-blocker' : ''}`}>
            <div className="panel-toggle-header">
              <div className="toggle-info">
                <ShieldAlert size={18} className="blocker-icon" />
                <div>
                  <strong>Report Active Blocker</strong>
                  <p>Notify managers that this task cannot proceed</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isBlocked}
                onChange={(e) => {
                  setIsBlocked(e.target.checked);
                }}
                className="toggle-switch"
              />
            </div>

            {isBlocked && (
              <div className="blocker-input-area">
                <textarea
                  rows="2"
                  value={blockerReason}
                  onChange={(e) => setBlockerReason(e.target.value)}
                  placeholder="Explain why this task is blocked (e.g. waiting for third-party driver or backend API spec)..."
                  className="blocker-textarea"
                />
                <button 
                  type="button" 
                  className="save-blocker-btn"
                  onClick={handleSaveBlocker}
                >
                  Confirm & Sync Blocker
                </button>
              </div>
            )}
          </div>

          {/* Deadline Risk Flagging */}
          <div className={`risk-panel ${hasDeadlineRisk ? 'active-risk' : ''}`}>
            <div className="panel-toggle-header">
              <div className="toggle-info">
                <AlertCircle size={18} className="risk-icon" />
                <div>
                  <strong>Flag Risk of Missing Deadline</strong>
                  <p>Alert workforce engine of potential milestone slippage</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasDeadlineRisk}
                onChange={(e) => setHasDeadlineRisk(e.target.checked)}
                className="toggle-switch"
              />
            </div>

            {hasDeadlineRisk && (
              <div className="blocker-input-area">
                <textarea
                  rows="2"
                  value={deadlineRiskReason}
                  onChange={(e) => setDeadlineRiskReason(e.target.value)}
                  placeholder="Detail why the target deadline may be missed..."
                  className="blocker-textarea"
                />
                <button 
                  type="button" 
                  className="save-risk-btn"
                  onClick={handleSaveRisk}
                >
                  Save Deadline Risk Alert
                </button>
              </div>
            )}
          </div>

          {/* Progress Notes */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <FileText size={16} />
              <span>Progress Notes ({(task.notes || []).length})</span>
            </h4>
            
            <div className="notes-thread">
              {(task.notes || []).map((note) => (
                <div key={note.id} className="note-bubble">
                  <div className="note-author-row">
                    <span className="note-author">{note.author}</span>
                    <span className="note-time">{note.timestamp}</span>
                  </div>
                  <p className="note-body">{note.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNote} className="add-note-form">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add progress note or engineering update..."
                className="note-input"
              />
              <button type="submit" className="note-send-btn" disabled={!newNote.trim()}>
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Task Audit History */}
          <div className="task-section-box">
            <h4 className="section-box-title">
              <History size={16} />
              <span>Audit History</span>
            </h4>
            <div className="audit-timeline">
              {(task.history || []).map((item, idx) => (
                <div key={idx} className="audit-timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-info">
                    <div className="timeline-action-row">
                      <strong>{item.action}</strong>
                      <span className="timeline-time">{item.timestamp}</span>
                    </div>
                    <span className="timeline-details">{item.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="modal-sticky-footer">
          <button type="button" className="android-btn-primary btn-block" onClick={onClose}>
            Done & Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
