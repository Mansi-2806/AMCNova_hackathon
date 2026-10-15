import React, { useState } from 'react';
import { 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle, 
  ChevronRight, 
  Plus, 
  Layers, 
  ShieldCheck, 
  X,
  History,
  Tag
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function SupportRequestsModal({ 
  employeeId = 'EMP-101', 
  requests = [], 
  projects = [],
  initialForm = null,
  onClose 
}) {
  const [activeTab, setActiveTab] = useState(initialForm ? 'submit' : 'track');
  
  // Submit Form States
  const [reqType, setReqType] = useState(initialForm?.type || 'Workload Support');
  const [selectedProjectId, setSelectedProjectId] = useState(initialForm?.projectId || (projects[0]?.id || ''));
  const [priority, setPriority] = useState(initialForm?.priority || 'High');
  const [description, setDescription] = useState(initialForm?.description || '');
  const [reason, setReason] = useState(initialForm?.reason || '');
  const [supportingInfo, setSupportingInfo] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  const requestTypes = [
    'Workload Support',
    'Deadline Conflict',
    'Additional Resource',
    'Project Clarification',
    'Training Request',
    'Skill Verification',
    'Profile Correction'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const prj = projects.find(p => p.id === selectedProjectId);

    const created = talentSyncStore.createSupportRequest({
      employeeId,
      type: reqType,
      projectId: selectedProjectId || null,
      projectName: prj ? prj.name : 'N/A',
      priority,
      description: description.trim(),
      reason: reason.trim(),
      supportingInfo: supportingInfo.trim()
    });

    setSubmitSuccess(created.id);
    setDescription('');
    setReason('');
    setSupportingInfo('');

    setTimeout(() => {
      setSubmitSuccess(null);
      setActiveTab('track');
      setExpandedRequestId(created.id);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Submitted':
        return { label: 'Submitted', color: '#06b6d4', bg: '#ecfeff' };
      case 'Under Review':
        return { label: 'Under Review', color: '#f59e0b', bg: '#fefce8' };
      case 'Approved':
        return { label: 'Approved', color: '#10b981', bg: '#f0fdf4' };
      case 'Resolved':
        return { label: 'Resolved', color: '#14b8a6', bg: '#f0fdfa' };
      case 'Rejected':
        return { label: 'Rejected', color: '#f43f5e', bg: '#fff1f2' };
      default:
        return { label: status, color: '#64748b', bg: '#f1f5f9' };
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="task-id-tag">Workforce Operations</span>
            <span className="section-title-clean">Requests & Support</span>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Tab Switcher */}
        <div className="modal-subtabs">
          <button
            type="button"
            className={`subtab-btn ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => setActiveTab('track')}
          >
            Track Requests ({requests.length})
          </button>
          <button
            type="button"
            className={`subtab-btn ${activeTab === 'submit' ? 'active' : ''}`}
            onClick={() => setActiveTab('submit')}
          >
            + New Request
          </button>
        </div>

        <div className="modal-scrollable-body">
          {activeTab === 'submit' ? (
            /* SUBMIT FORM TAB */
            <form onSubmit={handleSubmit} className="support-form">
              {submitSuccess && (
                <div className="success-banner">
                  <CheckCircle2 size={18} />
                  <span>Request <strong>{submitSuccess}</strong> submitted successfully! Navigating to tracking...</span>
                </div>
              )}

              <div className="form-group">
                <label>Request Type *</label>
                <select 
                  value={reqType} 
                  onChange={(e) => setReqType(e.target.value)}
                  className="android-select"
                >
                  {requestTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Associated Project */}
              {reqType !== 'Profile Correction' && reqType !== 'Skill Verification' && (
                <div className="form-group">
                  <label>Associated Project</label>
                  <select 
                    value={selectedProjectId} 
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="android-select"
                  >
                    <option value="">General / Not Project-Specific</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Priority */}
              <div className="form-group">
                <label>Urgency / Priority *</label>
                <div className="priority-pill-select">
                  {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`priority-select-btn ${priority === p ? 'active ' + p.toLowerCase() : ''}`}
                      onClick={() => setPriority(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Summary Description *</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Workload at 92% — requesting task reassignment for Oct 24 milestone"
                  required
                  className="android-input"
                />
              </div>

              {/* Reason / Details */}
              <div className="form-group">
                <label>Detailed Reason & Business Context *</label>
                <textarea
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why this request is necessary, overlapping commitments, or specific blockers..."
                  required
                  className="android-textarea"
                />
              </div>

              {/* Supporting info */}
              <div className="form-group">
                <label>Supporting Evidence / Reference Links (Optional)</label>
                <input
                  type="text"
                  value={supportingInfo}
                  onChange={(e) => setSupportingInfo(e.target.value)}
                  placeholder="e.g. Ticket TSK-103, Jira link, certificate credential ID..."
                  className="android-input"
                />
              </div>

              <div className="official-boundary-notice">
                <ShieldCheck size={16} />
                <span>
                  Requests are reviewed by authorized Workforce Managers. Official assignments update after approval.
                </span>
              </div>

              <button 
                type="submit" 
                className="android-btn-primary btn-block"
                disabled={!description.trim() || submitSuccess}
              >
                <Send size={16} />
                <span>Submit Support Request</span>
              </button>
            </form>
          ) : (
            /* TRACK REQUESTS TAB */
            <div className="tracking-list-container">
              {requests.length === 0 ? (
                <div className="empty-sub-state">
                  <FileText size={32} className="text-muted" />
                  <p>You have not submitted any support requests yet.</p>
                  <button 
                    type="button" 
                    className="android-btn-secondary" 
                    onClick={() => setActiveTab('submit')}
                  >
                    Create Your First Request
                  </button>
                </div>
              ) : (
                <div className="requests-cards-list">
                  {requests.map((req) => {
                    const badge = getStatusBadge(req.status);
                    const isExpanded = expandedRequestId === req.id;

                    return (
                      <div 
                        key={req.id} 
                        className={`request-card ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                      >
                        <div className="request-card-header">
                          <div className="request-id-meta">
                            <strong className="request-id-title">{req.id}</strong>
                            <span className="request-date">{req.submittedAt}</span>
                          </div>
                          <span 
                            className="request-status-pill"
                            style={{ backgroundColor: badge.bg, color: badge.color }}
                          >
                            {badge.label}
                          </span>
                        </div>

                        <div className="request-title-row">
                          <span className="req-type-badge">{req.type}</span>
                          {req.projectName && req.projectName !== 'N/A' && (
                            <span className="req-proj-badge">{req.projectName}</span>
                          )}
                        </div>

                        <p className="request-description">{req.description}</p>

                        {/* Expandable Details */}
                        {isExpanded && (
                          <div className="request-expanded-content" onClick={(e) => e.stopPropagation()}>
                            <div className="expanded-section">
                              <span className="expanded-label">Business Reason:</span>
                              <p className="expanded-text">{req.reason || 'None provided'}</p>
                            </div>

                            <div className="expanded-section response-section">
                              <span className="expanded-label">Latest Authorized Response:</span>
                              <p className="expanded-text response-text">
                                {req.latestResponse || 'Awaiting Workforce Manager review.'}
                              </p>
                            </div>

                            {req.resolutionDetails && (
                              <div className="expanded-section resolution-section">
                                <span className="expanded-label">Resolution Details:</span>
                                <p className="expanded-text">{req.resolutionDetails}</p>
                              </div>
                            )}

                            {/* Timeline */}
                            {req.history && req.history.length > 0 && (
                              <div className="request-history-list">
                                <span className="expanded-label">Activity Trail:</span>
                                {req.history.map((h, i) => (
                                  <div key={i} className="req-history-item">
                                    <Clock size={12} />
                                    <span>{h.timestamp} — {h.action} by <em>{h.by}</em></span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="expand-hint-row">
                          <span>{isExpanded ? 'Tap to collapse' : 'Tap to view manager response & history'}</span>
                          <ChevronRight size={14} className={`chevron-icon ${isExpanded ? 'rotated' : ''}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
