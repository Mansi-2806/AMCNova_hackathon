import React from 'react';
import { 
  X, 
  Flame, 
  AlertTriangle, 
  GraduationCap, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight,
  Bell
} from 'lucide-react';

export function NotificationDrawer({
  isOpen,
  onClose,
  onActionClick
}) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'N1',
      type: 'overload',
      icon: Flame,
      color: '#f43f5e',
      badge: 'Workload Imbalance',
      title: 'Rahul Sharma is at 94% workload',
      desc: 'Severe capacity strain detected across 2 concurrent projects. Priya Patel has 75% free capacity with matching Python/AWS skills.',
      actionText: 'Auto-Rebalance 20%',
      target: 'rebalance'
    },
    {
      id: 'N2',
      type: 'gap',
      icon: AlertTriangle,
      color: '#fbbf24',
      badge: 'Critical Skill Gap',
      title: 'Project Alpha requires Kubernetes expertise',
      desc: 'Upcoming Cloud Migration project has a 2-engineer Kubernetes gap. 3 candidates identified for rapid upskilling.',
      actionText: 'View Skill Gap Analysis',
      target: 'projects'
    },
    {
      id: 'N3',
      type: 'training',
      icon: GraduationCap,
      color: '#06b6d4',
      badge: 'Training Opportunity',
      title: '3 employees can be trained to close Kubernetes gap',
      desc: 'Tanya Gomez, Maya Lin, and Rohan Gupta possess Beginner Docker/Cloud skills and are 2 weeks away from Intermediate qualification.',
      actionText: 'Review Upskilling Candidates',
      target: 'intelligence'
    },
    {
      id: 'N4',
      type: 'ready',
      icon: CheckCircle2,
      color: '#10b981',
      badge: 'Staffing Ready',
      title: 'AI Analytics Platform reached 82% readiness',
      desc: 'Optimal 6-member team combination discovered with 95% internal skill coverage and no hiring necessary.',
      actionText: 'Review & Allocate Team',
      target: 'project-alpha'
    },
    {
      id: 'N5',
      type: 'internal',
      icon: Lightbulb,
      color: '#14b8a6',
      badge: 'Internal Talent Match',
      title: 'You already have suitable internal talent for Q4',
      desc: 'Internal workforce scan indicates 92% of all upcoming skills exist internally. External hiring freeze can be maintained.',
      actionText: 'Open Internal Talent Discovery',
      target: 'intelligence'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-sheet" 
        style={{ maxWidth: '480px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle-bar" />
        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} style={{ color: '#14b8a6' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Workforce Intelligence Alerts
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="sheet-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map(item => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Icon size={15} style={{ color: item.color }} />
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: item.color, textTransform: 'uppercase' }}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.title}
                  </div>

                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {item.desc}
                  </p>

                  <button 
                    className="btn-secondary" 
                    style={{ 
                      alignSelf: 'flex-start', 
                      marginTop: '4px', 
                      padding: '4px 10px', 
                      fontSize: '0.7rem',
                      borderColor: 'var(--border-subtle)'
                    }}
                    onClick={() => {
                      onActionClick(item.target);
                      onClose();
                    }}
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sheet-footer">
          <button className="btn-secondary" style={{ width: '100%' }} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
