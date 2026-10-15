import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  Plus, 
  Filter, 
  Award, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  UserX, 
  UserCheck, 
  Edit3, 
  ChevronRight, 
  X,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function EmployeeDirectoryView({ employees = [], projects = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedWorkloadTier, setSelectedWorkloadTier] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  // Modals
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  // Form State for Add / Edit
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDept, setFormDept] = useState('Cloud Platform Engineering');
  const [formExp, setFormExp] = useState(4);
  const [formLocation, setFormLocation] = useState('Bangalore, India');
  const [formWorkload, setFormWorkload] = useState(40);

  // Departments List
  const departments = [
    'Cloud Platform Engineering',
    'DevOps & Cloud',
    'AI Research & Data',
    'Frontend Engineering',
    'Data Analytics & Engineering',
    'Product Design & Research',
    'Quality Assurance & Testing',
    'Project Operations & Governance',
    'Software Engineering',
    'Information Security'
  ];

  // Filtering Logic
  const filteredEmployees = employees.filter(emp => {
    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const match = emp.name.toLowerCase().includes(q) || 
                    emp.id.toLowerCase().includes(q) || 
                    emp.role.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Department
    if (selectedDept !== 'all' && !emp.department.toLowerCase().includes(selectedDept.toLowerCase())) {
      return false;
    }
    // Workload Tier
    if (selectedWorkloadTier !== 'all') {
      if (selectedWorkloadTier === 'overloaded' && emp.workload < 85) return false;
      if (selectedWorkloadTier === 'healthy' && (emp.workload < 30 || emp.workload >= 85)) return false;
      if (selectedWorkloadTier === 'underutilized' && emp.workload >= 30) return false;
    }
    // Experience
    if (selectedExperience !== 'all') {
      if (selectedExperience === 'senior' && emp.totalExperience < 5) return false;
      if (selectedExperience === 'junior' && emp.totalExperience >= 5) return false;
    }
    return true;
  });

  const handleOpenAdd = () => {
    setFormName('');
    setFormRole('');
    setFormDept('Cloud Platform Engineering');
    setFormExp(4);
    setFormLocation('Bangalore, India');
    setFormWorkload(40);
    setShowAddModal(true);
  };

  const handleOpenEdit = (emp, e) => {
    e.stopPropagation();
    setEditingEmp(emp);
    setFormName(emp.name);
    setFormRole(emp.role);
    setFormDept(emp.department);
    setFormExp(emp.totalExperience);
    setFormLocation(emp.location);
    setFormWorkload(emp.workload);
    setShowEditModal(true);
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) return;

    talentSyncStore.addEmployee({
      name: formName.trim(),
      role: formRole.trim(),
      department: formDept,
      totalExperience: formExp,
      location: formLocation,
      workload: formWorkload,
      skills: [
        { id: 'sk-new', name: 'Software Architecture', category: 'Engineering', proficiency: 'Advanced', years: formExp, isVerified: true, verificationStatus: 'Verified' }
      ]
    });

    setShowAddModal(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingEmp) return;

    talentSyncStore.updateEmployee(editingEmp.id, {
      name: formName.trim(),
      role: formRole.trim(),
      department: formDept,
      totalExperience: Number(formExp),
      location: formLocation,
      workload: Number(formWorkload)
    });

    setShowEditModal(false);
    if (selectedEmployeeForDetail && selectedEmployeeForDetail.id === editingEmp.id) {
      setSelectedEmployeeForDetail(talentSyncStore.getEmployee(editingEmp.id));
    }
  };

  const handleToggleDeactivate = (empId, e) => {
    e.stopPropagation();
    if (window.confirm('Toggle activation status for this employee account?')) {
      talentSyncStore.deactivateEmployee(empId);
      if (selectedEmployeeForDetail && selectedEmployeeForDetail.id === empId) {
        setSelectedEmployeeForDetail(null);
      }
    }
  };

  const getTierClass = (workload) => {
    if (workload >= 85) return 'tier-overloaded';
    if (workload >= 30) return 'tier-healthy';
    return 'tier-underutilized';
  };

  return (
    <div className="tab-view-container">
      {/* Header & Add Action */}
      <div className="tab-header-card admin-header-card">
        <div className="tab-header-top-row">
          <div>
            <h2 className="tab-title">Employee Directory</h2>
            <p className="tab-sub">
              Manage organization talent profiles, skill proficiencies, and workload capacity ({employees.length} Total)
            </p>
          </div>
          <button 
            type="button" 
            className="admin-btn admin-btn-primary add-emp-btn"
            onClick={handleOpenAdd}
          >
            <Plus size={16} />
            <span>Add Employee</span>
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
          placeholder="Search by employee name, role, or ID (e.g. EMP-101)..."
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
        <select 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Departments</option>
          <option value="Cloud">Cloud & Infrastructure</option>
          <option value="AI">AI & Data</option>
          <option value="Frontend">Frontend Engineering</option>
          <option value="Design">Product Design</option>
          <option value="QA">Quality Assurance</option>
          <option value="Security">Information Security</option>
        </select>

        <select 
          value={selectedWorkloadTier} 
          onChange={(e) => setSelectedWorkloadTier(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Workloads</option>
          <option value="overloaded">Overloaded (&gt;85%)</option>
          <option value="healthy">Optimal (30% - 85%)</option>
          <option value="underutilized">Underutilized (&lt;30%)</option>
        </select>

        <select 
          value={selectedExperience} 
          onChange={(e) => setSelectedExperience(e.target.value)}
          className="filter-dropdown-chip"
        >
          <option value="all">All Experience</option>
          <option value="senior">Senior Staff (5+ yrs)</option>
          <option value="junior">Associate (&lt;5 yrs)</option>
        </select>

        {(selectedDept !== 'all' || selectedWorkloadTier !== 'all' || selectedExperience !== 'all' || searchTerm) && (
          <button 
            type="button" 
            className="reset-filters-chip"
            onClick={() => {
              setSelectedDept('all');
              setSelectedWorkloadTier('all');
              setSelectedExperience('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Employees Grid / Cards List */}
      <div className="employee-cards-stack">
        {filteredEmployees.length === 0 ? (
          <div className="empty-sub-state">
            <Users size={36} className="text-muted" />
            <p>No employees match the selected filters.</p>
          </div>
        ) : (
          filteredEmployees.map((emp) => {
            const isDeactivated = emp.status === 'Deactivated';

            return (
              <div 
                key={emp.id} 
                className={`directory-emp-card ${isDeactivated ? 'card-deactivated' : ''}`}
                onClick={() => setSelectedEmployeeForDetail(emp)}
              >
                <div className="emp-card-top-row">
                  <div className="emp-avatar-box">
                    <img 
                      src={emp.avatar} 
                      alt={emp.name} 
                      className="dir-avatar" 
                      style={{ width: 48, height: 48, minWidth: 48, minHeight: 48, maxWidth: 48, maxHeight: 48, borderRadius: 14, objectFit: 'cover', display: 'block' }}
                    />
                    {isDeactivated && <span className="deactivated-badge">Inactive</span>}
                  </div>

                  <div className="emp-title-col">
                    <div className="name-and-id-row">
                      <strong className="dir-emp-name">{emp.name}</strong>
                      <span className="dir-emp-id">{emp.id}</span>
                    </div>
                    <span className="dir-emp-role">{emp.role}</span>
                    <span className="dir-emp-dept">{emp.department}</span>
                  </div>

                  <div className="emp-actions-right">
                    <button 
                      type="button" 
                      className="emp-icon-action-btn"
                      onClick={(e) => handleOpenEdit(emp, e)}
                      title="Edit Employee"
                    >
                      <Edit3 size={15} />
                    </button>
                  </div>
                </div>

                {/* Workload Track & Buffer */}
                <div className="emp-workload-strip">
                  <div className="strip-labels-row">
                    <span className="strip-label">Assigned Workload</span>
                    <strong className={`strip-val ${getTierClass(emp.workload)}`}>
                      {emp.workload}% ({emp.assignedHours}h / 40h)
                    </strong>
                  </div>
                  <div className="workload-track">
                    <div 
                      className="workload-fill" 
                      style={{ 
                        width: `${emp.workload}%`,
                        backgroundColor: emp.workload >= 85 ? '#ef4444' : (emp.workload >= 30 ? '#10b981' : '#38bdf8')
                      }} 
                    />
                  </div>
                </div>

                {/* Skills Chips Preview */}
                <div className="emp-skills-preview-row">
                  {(emp.skills || []).slice(0, 3).map((s) => (
                    <span key={s.id} className="dir-skill-tag">
                      {s.name} ({s.proficiency})
                    </span>
                  ))}
                  {(emp.skills || []).length > 3 && (
                    <span className="dir-more-skills">+{emp.skills.length - 3} more</span>
                  )}
                </div>

                {/* Footer Strip */}
                <div className="emp-card-footer-strip">
                  <div className="footer-meta-pair">
                    <Briefcase size={13} />
                    <span>{(emp.activeProjectIds || []).length} Projects</span>
                  </div>
                  <div className="footer-meta-pair">
                    <Clock size={13} />
                    <span>{emp.availableHours}h Available</span>
                  </div>
                  <span className="view-profile-hint">
                    <span>Inspect Profile</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* EMPLOYEE FULL PROFILE MODAL */}
      {selectedEmployeeForDetail && (
        <div className="modal-backdrop" onClick={() => setSelectedEmployeeForDetail(null)}>
          <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-drag-handle" />

            <div className="modal-header">
              <div className="modal-header-meta">
                <span className="task-id-tag">{selectedEmployeeForDetail.id}</span>
                <span className={`status-pill-badge ${selectedEmployeeForDetail.status === 'Deactivated' ? 'deactivated' : 'active'}`}>
                  {selectedEmployeeForDetail.status || 'Active'}
                </span>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedEmployeeForDetail(null)}>✕</button>
            </div>

            <div className="modal-scrollable-body">
              {/* Profile Card */}
              <div className="admin-emp-profile-hero">
                <img 
                  src={selectedEmployeeForDetail.avatar} 
                  alt={selectedEmployeeForDetail.name} 
                  className="modal-emp-avatar" 
                  style={{ width: 72, height: 72, minWidth: 72, minHeight: 72, maxWidth: 72, maxHeight: 72, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 10px auto' }}
                />
                <h3 className="modal-emp-name">{selectedEmployeeForDetail.name}</h3>
                <span className="modal-emp-role">{selectedEmployeeForDetail.role}</span>
                <span className="modal-emp-dept">{selectedEmployeeForDetail.department}</span>

                <div className="emp-contact-grid">
                  <div className="contact-chip">
                    <Mail size={12} />
                    <span>{selectedEmployeeForDetail.email}</span>
                  </div>
                  <div className="contact-chip">
                    <MapPin size={12} />
                    <span>{selectedEmployeeForDetail.location}</span>
                  </div>
                </div>
              </div>

              {/* Workload & Planned Capacity Box */}
              <div className="task-section-box">
                <h4 className="section-box-title">
                  <Clock size={16} />
                  <span>Planned Capacity & Workload</span>
                </h4>
                <div className="profile-capacity-stats">
                  <div className="stat-col">
                    <span className="stat-label">Planned Capacity</span>
                    <strong>{selectedEmployeeForDetail.plannedCapacityHours || 40} hrs/wk</strong>
                  </div>
                  <div className="stat-col">
                    <span className="stat-label">Assigned Hours</span>
                    <strong>{selectedEmployeeForDetail.assignedHours} hrs/wk</strong>
                  </div>
                  <div className="stat-col">
                    <span className="stat-label">Utilization</span>
                    <strong className={getTierClass(selectedEmployeeForDetail.workload)}>
                      {selectedEmployeeForDetail.workload}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Skills Inventory */}
              <div className="task-section-box">
                <h4 className="section-box-title">
                  <Award size={16} />
                  <span>Skills & Proficiency Levels ({(selectedEmployeeForDetail.skills || []).length})</span>
                </h4>
                <div className="skills-grid-list">
                  {(selectedEmployeeForDetail.skills || []).map((s) => (
                    <div key={s.id} className="skill-card-item">
                      <div className="skill-card-header">
                        <strong className="skill-name">{s.name}</strong>
                        <span className="prof-pill prof-advanced">{s.proficiency}</span>
                      </div>
                      <div className="skill-card-meta">
                        <span>{s.category}</span>
                        <span>•</span>
                        <span>{s.years}y exp</span>
                      </div>
                      <div className="skill-card-footer">
                        {s.isVerified ? (
                          <span className="verified-status-pill verified">✓ Verified</span>
                        ) : (
                          <span className="verified-status-pill self-reported">Self-Reported</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assigned Projects */}
              <div className="task-section-box">
                <h4 className="section-box-title">
                  <Briefcase size={16} />
                  <span>Assigned Projects ({(selectedEmployeeForDetail.activeProjectIds || []).length})</span>
                </h4>
                <div className="assigned-projects-pills">
                  {(selectedEmployeeForDetail.activeProjectIds || []).map((pId) => {
                    const prj = projects.find(p => p.id === pId);
                    return (
                      <div key={pId} className="assigned-proj-item">
                        <strong>{prj ? prj.name : pId}</strong>
                        <span>({pId})</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Account Controls */}
              <div className="account-controls-strip">
                <button 
                  type="button" 
                  className={`deactivate-toggle-btn ${selectedEmployeeForDetail.status === 'Deactivated' ? 'btn-activate' : 'btn-deactivate'}`}
                  onClick={(e) => handleToggleDeactivate(selectedEmployeeForDetail.id, e)}
                >
                  {selectedEmployeeForDetail.status === 'Deactivated' ? (
                    <>
                      <UserCheck size={16} />
                      <span>Activate Employee Account</span>
                    </>
                  ) : (
                    <>
                      <UserX size={16} />
                      <span>Deactivate Employee Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="modal-sticky-footer">
              <button 
                type="button" 
                className="admin-btn-primary btn-block"
                onClick={() => setSelectedEmployeeForDetail(null)}
              >
                Close Directory Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Add Employee to Directory</h3>
              <button className="close-modal-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveAdd} className="modal-body-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Liam Vance"
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Role / Title *</label>
                <input
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  placeholder="e.g. Lead Kubernetes Platform Architect"
                  required
                />
              </div>

              <div className="form-group">
                <label>Department *</label>
                <select 
                  value={formDept} 
                  onChange={(e) => setFormDept(e.target.value)}
                  className="android-select"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Total Years of Experience</label>
                <input
                  type="number"
                  min="0.5"
                  max="35"
                  step="0.5"
                  value={formExp}
                  onChange={(e) => setFormExp(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Austin, USA (Hybrid)"
                />
              </div>

              <div className="form-group">
                <label>Initial Workload Allocation (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formWorkload}
                  onChange={(e) => setFormWorkload(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="android-btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT EMPLOYEE MODAL */}
      {showEditModal && editingEmp && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Edit Employee Record ({editingEmp.id})</h3>
              <button className="close-modal-btn" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-body-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Role</label>
                <input
                  type="text"
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select 
                  value={formDept} 
                  onChange={(e) => setFormDept(e.target.value)}
                  className="android-select"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  min="0.5"
                  max="35"
                  step="0.5"
                  value={formExp}
                  onChange={(e) => setFormExp(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Assigned Workload (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formWorkload}
                  onChange={(e) => setFormWorkload(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="android-btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Commit Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
