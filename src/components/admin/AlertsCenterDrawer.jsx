import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Check, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  Filter,
  Eye
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function AlertsCenterDrawer({
  isOpen,
  onClose,
  alerts = [],
  onNavigateToTab
}) {
  const [filterPriority, setFilterPriority] = useState('all');
  const [showResolved, setShowResolved] = useState(false);

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter(a => {
    if (!showResolved && a.resolved) return false;
    if (filterPriority !== 'all' && a.severity?.toLowerCase() !== filterPriority.toLowerCase()) return false;
    return true;
  });

  const handleAcknowledge = (alertId) => {
    talentSyncStore.acknowledgeAlert(alertId);
  };

  const handleResolve = (alertId) => {
    talentSyncStore.resolveAlert(alertId);
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-sheet alerts-drawer-sheet">
        {/* HEADER */}
        <div className="admin-modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge alert-badge-icon">
              <ShieldAlert size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="modal-title">Workforce Alert Center</h2>
              <span className="modal-subtitle">
                {alerts.filter(a => !a.resolved).length} active alerts requiring attention
              </span>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="admin-modal-body">
          {/* FILTER CONTROLS */}
          <div className="alerts-controls-row">
            <div className="priority-filters">
              {['all', 'critical', 'warning', 'info'].map(p => (
                <button
                  key={p}
                  type="button"
                  className={`status-pill ${filterPriority === p ? 'active' : ''}`}
                  onClick={() => setFilterPriority(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            <label className="show-resolved-label">
              <input 
                type="checkbox"
                checked={showResolved}
                onChange={e => setShowResolved(e.target.checked)}
              />
              <span>Show Resolved</span>
            </label>
          </div>

          {/* ALERTS LIST */}
          <div className="alerts-stack-list">
            {filteredAlerts.length === 0 ? (
              <div className="empty-alerts-box">
                <CheckCircle2 size={32} className="text-emerald-500" />
                <h4>No Active Alerts in this Category</h4>
                <p>All identified operational constraints and bottlenecks have been acknowledged or resolved.</p>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const isCritical = alert.severity === 'Critical';
                const isWarning = alert.severity === 'Warning';

                return (
                  <div 
                    key={alert.id} 
                    className={`admin-card alert-item-card ${isCritical ? 'card-critical' : isWarning ? 'card-warning' : ''} ${alert.resolved ? 'is-resolved' : ''}`}
                  >
                    <div className="alert-top-line">
                      <div className="alert-badge-group">
                        <span className={`priority-tag tag-${(alert.severity || 'Medium').toLowerCase()}`}>
                          {alert.severity}
                        </span>
                        <span className="alert-cat-tag">{alert.category || 'Workforce'}</span>
                      </div>

                      <span className="alert-time-sub">
                        <Clock size={11} className="inline mr-1" />
                        {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </div>

                    <h4 className="alert-title">{alert.title}</h4>
                    <p className="alert-desc">{alert.description || alert.message}</p>

                    {/* Target details */}
                    {(alert.targetEmployee || alert.targetProject) && (
                      <div className="alert-target-pill">
                        <strong>Affected Entity: </strong>
                        <span>{alert.targetEmployee || alert.targetProject}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="alert-actions-footer">
                      {alert.resolved ? (
                        <span className="resolved-tag">
                          <CheckCircle2 size={13} className="text-emerald-500" />
                          <span>Resolved</span>
                        </span>
                      ) : (
                        <div className="alert-btns-group">
                          {!alert.acknowledged && (
                            <button 
                              type="button" 
                              className="admin-btn-sm admin-btn-ghost"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              <Eye size={13} />
                              <span>Acknowledge</span>
                            </button>
                          )}
                          <button 
                            type="button" 
                            className="admin-btn-sm admin-btn-primary"
                            onClick={() => handleResolve(alert.id)}
                          >
                            <Check size={13} />
                            <span>Mark Resolved</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
