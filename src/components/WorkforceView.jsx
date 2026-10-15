import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  X, 
  Flame, 
  TrendingDown, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

export function WorkforceView({ 
  employees, 
  initialFilter = 'all',
  onRebalanceWorkload
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState(initialFilter); // 'all', 'overloaded', 'high-load', 'healthy', 'underutilized'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [rebalanceSuccessMsg, setRebalanceSuccessMsg] = useState(null);

  // Filter logic
  const filteredEmployees = employees.filter(emp => {
    // Search match
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q) ||
      emp.skills.some(s => s.name.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (filterTier === 'overloaded') return emp.workload >= 90;
    if (filterTier === 'high-load') return emp.workload >= 71 && emp.workload <= 89;
    if (filterTier === 'healthy') return emp.workload >= 31 && emp.workload <= 70;
    if (filterTier === 'underutilized') return emp.workload <= 30;
    if (filterTier === 'available') return emp.availability >= 40;

    return true;
  });

  const getWorkloadTierBadge = (workload) => {
    if (workload >= 90) return { label: 'OVERLOADED', class: 'badge-overloaded', color: '#f43f5e' };
    if (workload >= 71) return { label: 'HIGH LOAD', class: 'badge-high-load', color: '#f97316' };
    if (workload >= 31) return { label: 'HEALTHY', class: 'badge-healthy', color: '#10b981' };
    return { label: 'UNDERUTILIZED', class: 'badge-underutilized', color: '#06b6d4' };
  };

  const handleApplyRebalance = (source, target, amount = 20) => {
    if (onRebalanceWorkload) {
      onRebalanceWorkload(source.id, target.id, amount);
      setRebalanceSuccessMsg(`Transferred ${amount}% workload from ${source.name} to ${target.name}. Both are now in Healthy range!`);
      setTimeout(() => setRebalanceSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="view-content">
      {/* Title & Stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800 }}>
            Talent Inventory
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {employees.length} Engineers, Specialists & Architects
          </span>
        </div>
      </div>

      {/* Success Notification if rebalanced */}
      {rebalanceSuccessMsg && (
        <div className="alert-strip success" style={{ animation: 'fadeIn 0.3s ease' }}>
          <CheckCircle2 size={16} />
          <span>{rebalanceSuccessMsg}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="search-bar-wrap">
        <Search size={16} style={{ color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search by name, role, skill (e.g. Python, AWS)..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            onClick={() => setSearchQuery('')}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: `All (${employees.length})` },
          { id: 'overloaded', label: `🔴 Overloaded (${employees.filter(e => e.workload >= 90).length})` },
          { id: 'high-load', label: `🟠 High Load (${employees.filter(e => e.workload >= 71 && e.workload <= 89).length})` },
          { id: 'healthy', label: `🟢 Healthy (${employees.filter(e => e.workload >= 31 && e.workload <= 70).length})` },
          { id: 'underutilized', label: `🔵 Underutilized (${employees.filter(e => e.workload <= 30).length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTier(tab.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: filterTier === tab.id ? '#14b8a6' : 'var(--bg-subtle)',
              color: filterTier === tab.id ? '#ffffff' : 'var(--text-secondary)',
              border: filterTier === tab.id ? '1px solid #14b8a6' : '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Employee List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredEmployees.map(emp => {
          const tier = getWorkloadTierBadge(emp.workload);
          return (
            <div 
              key={emp.id} 
              className="employee-card"
              onClick={() => setSelectedEmployee(emp)}
            >
              <div className="emp-card-top">
                <img 
                  src={emp.avatar} 
                  alt={emp.name} 
                  className="emp-avatar" 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
                  }}
                />
                <div className="emp-main-info">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="emp-name">{emp.name}</div>
                    <span className={`badge ${tier.class}`}>{tier.label}</span>
                  </div>
                  <div className="emp-role">{emp.role}</div>
                  <div className="emp-meta-tag">
                    {emp.department} • {emp.totalExperience} yrs exp • {emp.location.split(',')[0]}
                  </div>
                </div>
              </div>

              {/* Workload Progress Bar */}
              <div className="workload-mini-bar-wrap">
                <div className="workload-label-row">
                  <span style={{ color: 'var(--text-secondary)' }}>Current Workload: <strong>{emp.workload}%</strong></span>
                  <span style={{ color: tier.color, fontWeight: 700 }}>{emp.availability}% Available ({emp.availableHours}h/wk)</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min(100, emp.workload)}%`, 
                      background: tier.color 
                    }}
                  />
                </div>
              </div>

              {/* Skills Tags Preview */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {emp.skills.slice(0, 3).map(skill => (
                  <span key={skill.name} className="skill-chip">
                    {skill.name}
                    <span className={`skill-level level-${skill.proficiency.toLowerCase()}`}>
                      {skill.proficiency}
                    </span>
                  </span>
                ))}
                {emp.skills.length > 3 && (
                  <span className="skill-chip" style={{ color: 'var(--text-muted)' }}>
                    +{emp.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredEmployees.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            No talent matching the selected criteria.
          </div>
        )}
      </div>

      {/* EMPLOYEE DETAIL MODAL / BOTTOM SHEET */}
      {selectedEmployee && (
        <div className="modal-backdrop" onClick={() => setSelectedEmployee(null)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle-bar" />
            <div className="sheet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.name} 
                  className="emp-avatar" 
                  style={{ width: '42px', height: '42px' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {selectedEmployee.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {selectedEmployee.id} • {selectedEmployee.role}
                  </div>
                </div>
              </div>
              <button 
                className="icon-btn" 
                onClick={() => setSelectedEmployee(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="sheet-body">
              {/* Workload Status Card */}
              {(() => {
                const tier = getWorkloadTierBadge(selectedEmployee.workload);
                return (
                  <div className="iq-card" style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Capacity Utilization</span>
                      <span className={`badge ${tier.class}`}>{tier.label}</span>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: tier.color, marginBottom: '6px' }}>
                      {selectedEmployee.workload}%
                    </div>
                    <div className="progress-track" style={{ height: '8px', marginBottom: '10px' }}>
                      <div 
                        className="progress-fill" 
                        style={{ width: `${selectedEmployee.workload}%`, background: tier.color }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      <span>Free Capacity: <strong>{selectedEmployee.availability}%</strong></span>
                      <span>Weekly Free Hours: <strong>{selectedEmployee.availableHours}h</strong></span>
                    </div>

                    {/* Quick Rebalance Offer if Overloaded */}
                    {selectedEmployee.workload >= 90 && (
                      <div style={{ marginTop: '12px', padding: '10px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e11d48', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
                          <Flame size={14} />
                          <span>AI Imbalance Alert</span>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: '#9f1239', marginBottom: '8px' }}>
                          This employee is severely overloaded. Priya Patel (25% load) has matching Python/AWS skills.
                        </p>
                        <button 
                          className="btn-cta" 
                          style={{ width: '100%', padding: '8px 12px', fontSize: '0.78rem' }}
                          onClick={() => {
                            const priya = employees.find(e => e.id === 'EMP-102');
                            if (priya) {
                              handleApplyRebalance(selectedEmployee, priya, 20);
                              setSelectedEmployee({
                                ...selectedEmployee,
                                workload: selectedEmployee.workload - 20,
                                availability: selectedEmployee.availability + 20
                              });
                            }
                          }}
                        >
                          <Sparkles size={14} />
                          <span>Auto-Rebalance 20% to Priya Patel</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Verified Skills Catalog */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={15} style={{ color: '#14b8a6' }} />
                  <span>Skills & Verified Proficiencies</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedEmployee.skills.map(s => (
                    <div 
                      key={s.name}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                          {s.years} years exp • Last used: {s.lastUsed}
                        </div>
                        {s.certification && (
                          <div style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ShieldCheck size={11} />
                            <span>{s.certification}</span>
                          </div>
                        )}
                      </div>
                      <span className={`skill-level level-${s.proficiency.toLowerCase()}`} style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                        {s.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project History */}
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={15} style={{ color: '#14b8a6' }} />
                  <span>Past Project Performance</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedEmployee.projectHistory.map((hist, idx) => (
                    <div 
                      key={idx}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '10px 12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{hist.projectName}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{hist.rating}</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Role: {hist.role} • {hist.duration}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Tech: {hist.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Leaves */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, padding: '10px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedEmployee.location}</div>
                </div>
                <div style={{ flex: 1, padding: '10px', background: 'var(--bg-subtle)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Upcoming Leaves</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {selectedEmployee.leavePeriods.length > 0 ? selectedEmployee.leavePeriods[0] : 'None scheduled'}
                  </div>
                </div>
              </div>
            </div>

            <div className="sheet-footer">
              <button 
                className="btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => setSelectedEmployee(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
