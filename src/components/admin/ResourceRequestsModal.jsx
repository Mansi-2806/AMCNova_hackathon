import React, { useState } from 'react';
import { 
  FileText, 
  Check, 
  X, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  User, 
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function ResourceRequestsModal({
  isOpen,
  onClose,
  requests = [],
  employees = []
}) {
  const [filterType, setFilterType] = useState('all');
  const [selectedReq, setSelectedReq] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [workloadReductionHours, setWorkloadReductionHours] = useState(8);
  const [actionFeedback, setActionFeedback] = useState(null);

  if (!isOpen) return null;

  const filteredRequests = requests.filter(r => {
    if (filterType === 'pending') return r.status === 'Pending' || r.status === 'In Review';
    if (filterType === 'resolved') return r.status === 'Approved' || r.status === 'Resolved' || r.status === 'Rejected';
    return true;
  });

  const handleApprove = (req) => {
    const isWorkload = req.type?.toLowerCase().includes('workload') || req.category?.toLowerCase().includes('workload');
    const adjustment = isWorkload ? Number(workloadReductionHours) : 0;
    const notes = resolutionNotes.trim() || 'Approved by Workforce Operations. Capacity adjusted in core roster.';

    talentSyncStore.respondToSupportRequest(req.id, 'Approved', notes, adjustment);

    setActionFeedback({
      type: 'approved',
      message: `Request ${req.id} approved. Employee notified and capacity updated.`
    });
    setSelectedReq(null);
    setResolutionNotes('');

    setTimeout(() => {
      setActionFeedback(null);
    }, 4500);
  };

  const handleReject = (req) => {
    const notes = resolutionNotes.trim() || 'Cannot fulfill at this sprint cycle. Please re-apply next milestone.';

    talentSyncStore.respondToSupportRequest(req.id, 'Rejected', notes, 0);

    setActionFeedback({
      type: 'rejected',
      message: `Request ${req.id} rejected with feedback notes.`
    });
    setSelectedReq(null);
    setResolutionNotes('');

    setTimeout(() => {
      setActionFeedback(null);
    }, 4500);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-sheet">
        {/* MODAL HEADER */}
        <div className="admin-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <FileText size={20} className="text-blue-primary" />
            </div>
            <div>
              <h2 className="modal-title">Resource Requests Queue</h2>
              <span className="modal-subtitle">Workforce support, capacity relief & equipment approvals</span>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* FEEDBACK BANNER */}
        {actionFeedback && (
          <div className="admin-action-banner">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>{actionFeedback.message}</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="admin-modal-body">
          {/* FILTER TABS */}
          <div className="requests-filter-pills">
            <button 
              type="button"
              className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All Requests ({requests.length})
            </button>
            <button 
              type="button"
              className={`filter-pill ${filterType === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterType('pending')}
            >
              Pending Review ({requests.filter(r => r.status === 'Pending' || r.status === 'In Review').length})
            </button>
            <button 
              type="button"
              className={`filter-pill ${filterType === 'resolved' ? 'active' : ''}`}
              onClick={() => setFilterType('resolved')}
            >
              Resolved ({requests.filter(r => r.status === 'Approved' || r.status === 'Resolved' || r.status === 'Rejected').length})
            </button>
          </div>

          {/* REQUESTS LIST */}
          <div className="requests-stack-list">
            {filteredRequests.map(req => {
              const isPending = req.status === 'Pending' || req.status === 'In Review';
              const isSelected = selectedReq?.id === req.id;
              const emp = employees.find(e => e.id === req.employeeId);

              return (
                <div key={req.id} className={`admin-card request-item-card ${isPending ? 'is-pending' : ''}`}>
                  {/* Top Bar */}
                  <div className="request-card-top">
                    <div className="req-meta-left">
                      <span className="req-id-tag">{req.id}</span>
                      <span className={`priority-tag tag-${(req.urgency || req.priority || 'Medium').toLowerCase()}`}>
                        {req.urgency || req.priority || 'Medium'} Urgency
                      </span>
                    </div>

                    <span className={`status-badge badge-${req.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {req.status}
                    </span>
                  </div>

                  {/* Requester Information */}
                  <div className="requester-profile-row">
                    <img 
                      src={emp?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                      alt={req.employeeName || emp?.name} 
                      className="requester-avatar"
                    />
                    <div>
                      <div className="requester-name-row">
                        <strong>{req.employeeName || emp?.name}</strong>
                        <span className="text-xs text-muted">({req.employeeId})</span>
                      </div>
                      <span className="requester-role">{emp?.role} • {emp?.department}</span>
                    </div>
                  </div>

                  {/* Subject & Description */}
                  <div className="request-body-block">
                    <h4 className="req-subject">{req.subject || req.title}</h4>
                    <p className="req-details">{req.description || req.details}</p>
                  </div>

                  {/* Date & Category */}
                  <div className="req-footer-meta">
                    <span className="meta-text">
                      <Calendar size={12} className="inline mr-1" />
                      Submitted: {req.dateSubmitted || '2026-10-14'}
                    </span>
                    <span className="req-cat-pill">{req.category || req.type || 'Workload Relief'}</span>
                  </div>

                  {/* Resolution Notes (if already resolved) */}
                  {req.resolutionNotes && (
                    <div className="resolved-notes-box">
                      <strong>Admin Resolution:</strong>
                      <p>{req.resolutionNotes}</p>
                      {req.resolvedAt && (
                        <span className="text-xs text-muted">Resolved on {new Date(req.resolvedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  )}

                  {/* Action Controls for Pending Requests */}
                  {isPending && (
                    <div className="request-action-area">
                      {isSelected ? (
                        <div className="review-action-drawer">
                          <label className="text-xs font-semibold">Admin Decision Notes & Justification:</label>
                          <textarea 
                            className="admin-textarea"
                            rows={2}
                            placeholder="Add reason, adjustments, or follow-up instructions..."
                            value={resolutionNotes}
                            onChange={(e) => setResolutionNotes(e.target.value)}
                          />

                          {(req.category?.toLowerCase().includes('workload') || req.type?.toLowerCase().includes('workload')) && (
                            <div className="workload-relief-field">
                              <label className="text-xs">Capacity Relief Adjustment (hours/week):</label>
                              <input 
                                type="number" 
                                min={4} 
                                max={20} 
                                className="admin-input-sm"
                                value={workloadReductionHours}
                                onChange={(e) => setWorkloadReductionHours(e.target.value)}
                              />
                            </div>
                          )}

                          <div className="decision-btns-row">
                            <button 
                              type="button" 
                              className="admin-btn-sm admin-btn-ghost"
                              onClick={() => setSelectedReq(null)}
                            >
                              Cancel
                            </button>
                            <button 
                              type="button" 
                              className="admin-btn-sm admin-btn-danger"
                              onClick={() => handleReject(req)}
                            >
                              <XCircle size={14} />
                              <span>Reject Request</span>
                            </button>
                            <button 
                              type="button" 
                              className="admin-btn-sm admin-btn-primary"
                              onClick={() => handleApprove(req)}
                            >
                              <CheckCircle2 size={14} />
                              <span>Approve & Sync</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="quick-actions-row">
                          <button 
                            type="button" 
                            className="admin-btn-sm admin-btn-primary"
                            onClick={() => {
                              setSelectedReq(req);
                              setResolutionNotes(`Approved workload rebalance for ${req.employeeName || emp?.name}.`);
                            }}
                          >
                            <ShieldCheck size={14} />
                            <span>Review & Decide</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
