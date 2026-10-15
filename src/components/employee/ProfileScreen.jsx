import React, { useState } from 'react';
import { 
  User, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  LogOut, 
  HelpCircle, 
  ChevronRight, 
  FileText, 
  Briefcase, 
  Check, 
  ExternalLink,
  Shield,
  Phone,
  Mail,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { talentSyncStore } from '../../data/talentSyncStore';

export function ProfileScreen({ 
  employee, 
  onLogout,
  onOpenSupportRequest,
  onOpenLearningCenter
}) {
  if (!employee) return null;

  // Modals inside Profile
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Backend');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Intermediate');
  const [newSkillYears, setNewSkillYears] = useState(2);

  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('Amazon Web Services');
  const [newCertDate, setNewCertDate] = useState('2026-10-01');
  const [newCertCredentialId, setNewCertCredentialId] = useState('');

  const [showEditSummaryModal, setShowEditSummaryModal] = useState(false);
  const [summaryText, setSummaryText] = useState(employee.summary || '');
  const [phoneText, setPhoneText] = useState(employee.phone || '');
  const [emergencyText, setEmergencyText] = useState(employee.emergencyContact || '');

  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifPref, setNotifPref] = useState(true);

  // Skill Add Handler
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    talentSyncStore.addSkill(employee.id, {
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
      years: newSkillYears
    });

    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  // Skill Verification Handler
  const handleSubmitVerification = (skillId) => {
    talentSyncStore.submitSkillForVerification(employee.id, skillId);
  };

  // Cert Add Handler
  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCertName.trim()) return;

    talentSyncStore.addCertification(employee.id, {
      name: newCertName.trim(),
      issuer: newCertIssuer,
      issueDate: newCertDate,
      credentialId: newCertCredentialId.trim()
    });

    setNewCertName('');
    setNewCertCredentialId('');
    setShowAddCertModal(false);
  };

  // Summary Update Handler
  const handleSaveProfileSummary = (e) => {
    e.preventDefault();
    talentSyncStore.updateProfile(employee.id, {
      summary: summaryText.trim(),
      phone: phoneText.trim(),
      emergencyContact: emergencyText.trim()
    });
    setShowEditSummaryModal(false);
  };

  // Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default initial state?')) {
      talentSyncStore.resetToDemoData();
      window.location.reload();
    }
  };

  const getProficiencyClass = (level) => {
    switch (level) {
      case 'Expert': return 'prof-expert';
      case 'Advanced': return 'prof-advanced';
      case 'Intermediate': return 'prof-intermediate';
      default: return 'prof-beginner';
    }
  };

  return (
    <div className="tab-view-container">
      {/* Profile Header Hero */}
      <div className="profile-hero-card">
        <div className="profile-top-group">
          <div className="profile-avatar-wrapper">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="profile-large-avatar" 
            />
            <span className="profile-verified-badge" title="Verified Employee Identity">
              <ShieldCheck size={16} />
            </span>
          </div>

          <div className="profile-details-col">
            <h2 className="profile-name">{employee.name}</h2>
            <div className="profile-emp-id-pill">{employee.id}</div>
            <strong className="profile-role-title">{employee.role}</strong>
            <span className="profile-dept-sub">{employee.department}</span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="profile-contact-strip">
          <div className="contact-item">
            <Mail size={13} />
            <span>{employee.email}</span>
          </div>
          <div className="contact-item">
            <MapPin size={13} />
            <span>{employee.location}</span>
          </div>
          <div className="contact-item">
            <Phone size={13} />
            <span>{employee.phone}</span>
          </div>
        </div>

        {/* Quick Stats Pill Row */}
        <div className="profile-stats-row">
          <div className="profile-stat-box">
            <strong className="stat-big-val">{employee.totalExperience}y</strong>
            <span className="stat-small-label">Experience</span>
          </div>
          <div className="profile-stat-box">
            <strong className="stat-big-val">
              {(employee.skills || []).filter(s => s.isVerified).length}
            </strong>
            <span className="stat-small-label">Verified Skills</span>
          </div>
          <div className="profile-stat-box">
            <strong className="stat-big-val">{(employee.certifications || []).length}</strong>
            <span className="stat-small-label">Certifications</span>
          </div>
        </div>
      </div>

      {/* Professional Summary Section (Editable) */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <FileText size={18} className="text-teal" />
            <h3 className="section-title">Professional Summary</h3>
          </div>
          <button 
            type="button" 
            className="section-link-btn"
            onClick={() => {
              setSummaryText(employee.summary || '');
              setPhoneText(employee.phone || '');
              setEmergencyText(employee.emergencyContact || '');
              setShowEditSummaryModal(true);
            }}
          >
            <Edit3 size={13} />
            <span>Edit Summary</span>
          </button>
        </div>

        <div className="profile-summary-box">
          <p className="summary-body-text">{employee.summary}</p>
          <div className="emergency-contact-row">
            <strong>Emergency Contact:</strong>
            <span>{employee.emergencyContact || 'None provided'}</span>
          </div>
        </div>
      </div>

      {/* SKILLS MANAGEMENT SECTION */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <Award size={18} className="text-cyan" />
            <h3 className="section-title">Skills & Proficiencies ({employee.skills?.length || 0})</h3>
          </div>
          <button 
            type="button" 
            className="section-action-btn"
            onClick={() => setShowAddSkillModal(true)}
          >
            <Plus size={14} />
            <span>Add Skill</span>
          </button>
        </div>

        <p className="skills-hint-caption">
          Verified qualifications have verified badges. Self-reported skills can be submitted to Talent Operations for official audit.
        </p>

        <div className="skills-grid-list">
          {(employee.skills || []).map((skill) => (
            <div key={skill.id} className="skill-card-item">
              <div className="skill-card-header">
                <strong className="skill-name">{skill.name}</strong>
                <span className={`prof-pill ${getProficiencyClass(skill.proficiency)}`}>
                  {skill.proficiency}
                </span>
              </div>

              <div className="skill-card-meta">
                <span>{skill.category}</span>
                <span>•</span>
                <span>{skill.years} yrs exp</span>
              </div>

              <div className="skill-card-footer">
                {skill.isVerified ? (
                  <span className="verified-status-pill verified">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>
                ) : skill.verificationStatus === 'Pending Verification' ? (
                  <span className="verified-status-pill pending">
                    <Clock size={12} />
                    <span>Verification Pending</span>
                  </span>
                ) : (
                  <div className="self-report-action-row">
                    <span className="verified-status-pill self-reported">
                      <span>Self-Reported</span>
                    </span>
                    <button 
                      type="button" 
                      className="submit-verify-btn"
                      onClick={() => handleSubmitVerification(skill.id)}
                    >
                      Verify →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CERTIFICATIONS & ACCREDITATIONS */}
      <div className="dashboard-section">
        <div className="section-header-row">
          <div className="section-title-group">
            <ShieldCheck size={18} className="text-emerald" />
            <h3 className="section-title">Certifications ({(employee.certifications || []).length})</h3>
          </div>
          <button 
            type="button" 
            className="section-action-btn"
            onClick={() => setShowAddCertModal(true)}
          >
            <Plus size={14} />
            <span>Add Credential</span>
          </button>
        </div>

        <div className="certifications-list">
          {(employee.certifications || []).map((cert) => (
            <div key={cert.id} className="cert-item-card">
              <div className="cert-icon-col">
                <Award size={22} className="text-emerald" />
              </div>
              <div className="cert-info-col">
                <strong className="cert-name">{cert.name}</strong>
                <span className="cert-issuer">Issued by {cert.issuer}</span>
                <div className="cert-meta-row">
                  <span>ID: {cert.credentialId}</span>
                  <span>•</span>
                  <span>Issued: {cert.issueDate}</span>
                </div>
              </div>
              <span className={`cert-badge ${cert.verified ? 'verified' : 'unverified'}`}>
                {cert.verified ? 'Verified' : 'Pending Audit'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TRAINING RECORDS */}
      {employee.trainingRecords && employee.trainingRecords.length > 0 && (
        <div className="dashboard-section">
          <div className="section-header-row">
            <div className="section-title-group">
              <GraduationCap size={18} className="text-purple" />
              <h3 className="section-title">Completed Training Records</h3>
            </div>
            <button 
              type="button" 
              className="section-link-btn"
              onClick={onOpenLearningCenter}
            >
              <span>Learning Center</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="training-records-list">
            {employee.trainingRecords.map((trn) => (
              <div key={trn.id} className="training-record-card">
                <div className="trn-top">
                  <strong className="trn-title">{trn.title}</strong>
                  <span className="trn-score-pill">Score: {trn.score}</span>
                </div>
                <div className="trn-sub">
                  <span>{trn.provider}</span>
                  <span>•</span>
                  <span>{trn.hours} hrs completed on {trn.completionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS & ACCOUNT PREFERENCES */}
      <div className="dashboard-section">
        <h3 className="section-title-clean">App & Account Settings</h3>

        <div className="settings-menu-list">
          {/* Notification Preferences */}
          <div className="settings-item-row">
            <div className="settings-item-left">
              <Bell size={18} className="text-amber" />
              <div>
                <strong>In-App Task & Deadline Alerts</strong>
                <p>Receive push notifications for milestone changes</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifPref}
              onChange={(e) => setNotifPref(e.target.checked)}
              className="toggle-switch"
            />
          </div>

          {/* Theme Preference */}
          <div className="settings-item-row">
            <div className="settings-item-left">
              {isDarkMode ? <Moon size={18} className="text-indigo" /> : <Sun size={18} className="text-amber" />}
              <div>
                <strong>Theme Preference</strong>
                <p>{isDarkMode ? 'Dark Mode (OLED Optimized)' : 'Light Mode (Standard Clean)'}</p>
              </div>
            </div>
            <button 
              type="button" 
              className="theme-switch-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>

          {/* Privacy & Security */}
          <button 
            type="button" 
            className="settings-nav-btn"
            onClick={() => setShowPrivacyModal(true)}
          >
            <div className="settings-item-left">
              <Lock size={18} className="text-emerald" />
              <div>
                <strong>Privacy & Authorization Policy</strong>
                <p>Learn how employee records are isolated and protected</p>
              </div>
            </div>
            <ChevronRight size={16} />
          </button>

          {/* Help & Support */}
          <button 
            type="button" 
            className="settings-nav-btn"
            onClick={() => setShowHelpModal(true)}
          >
            <div className="settings-item-left">
              <HelpCircle size={18} className="text-cyan" />
              <div>
                <strong>Help & Documentation</strong>
                <p>Workforce policies, SLA guidelines, and FAQ</p>
              </div>
            </div>
            <ChevronRight size={16} />
          </button>

          {/* Reset Demo Data */}
          <button 
            type="button" 
            className="settings-nav-btn"
            onClick={handleResetData}
          >
            <div className="settings-item-left">
              <RefreshCw size={18} className="text-blue" />
              <div>
                <strong>Reset Demo Database</strong>
                <p>Restore original sample records for hackathon demo</p>
              </div>
            </div>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* LOGOUT BUTTON */}
        <div className="logout-button-wrap">
          <button 
            type="button" 
            className="android-btn-danger btn-block"
            onClick={onLogout}
          >
            <LogOut size={16} />
            <span>Sign Out of Employee Portal</span>
          </button>
        </div>
      </div>

      {/* ADD SKILL MODAL */}
      {showAddSkillModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Add Self-Reported Skill</h3>
              <button className="close-modal-btn" onClick={() => setShowAddSkillModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddSkill} className="modal-body-form">
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. Terraform, Kubernetes, GraphQL..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newSkillCategory} 
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="android-select"
                >
                  <option value="Backend">Backend Engineering</option>
                  <option value="Cloud">Cloud & Infrastructure</option>
                  <option value="DevOps">DevOps & CI/CD</option>
                  <option value="Database">Database & Caching</option>
                  <option value="Frontend">Frontend & Mobile</option>
                  <option value="AI / ML">AI / Machine Learning</option>
                </select>
              </div>

              <div className="form-group">
                <label>Proficiency Level *</label>
                <div className="proficiency-select-row">
                  {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`prof-btn ${newSkillProficiency === lvl ? 'active ' + lvl.toLowerCase() : ''}`}
                      onClick={() => setNewSkillProficiency(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Years of Hands-on Experience</label>
                <input
                  type="number"
                  min="0.5"
                  max="30"
                  step="0.5"
                  value={newSkillYears}
                  onChange={(e) => setNewSkillYears(e.target.value)}
                  required
                />
              </div>

              <div className="official-boundary-notice">
                <AlertCircle size={15} />
                <span>
                  Self-reported skills will be marked as unverified until verified through project deliverables or manager endorsement.
                </span>
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="android-btn-secondary"
                  onClick={() => setShowAddSkillModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="android-btn-primary">
                  Save Skill to Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CERTIFICATION MODAL */}
      {showAddCertModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Add Professional Credential</h3>
              <button className="close-modal-btn" onClick={() => setShowAddCertModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddCert} className="modal-body-form">
              <div className="form-group">
                <label>Certification Name *</label>
                <input
                  type="text"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="e.g. HashiCorp Certified: Terraform Associate"
                  required
                />
              </div>

              <div className="form-group">
                <label>Issuing Organization *</label>
                <input
                  type="text"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  placeholder="e.g. HashiCorp, AWS, CNCF..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Credential Verification ID / URL</label>
                <input
                  type="text"
                  value={newCertCredentialId}
                  onChange={(e) => setNewCertCredentialId(e.target.value)}
                  placeholder="e.g. AWS-PSA-994821 or verify.cncf.io/..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Issue Date</label>
                <input
                  type="date"
                  value={newCertDate}
                  onChange={(e) => setNewCertDate(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="android-btn-secondary"
                  onClick={() => setShowAddCertModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="android-btn-primary">
                  Submit Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SUMMARY MODAL */}
      {showEditSummaryModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Edit Profile Summary</h3>
              <button className="close-modal-btn" onClick={() => setShowEditSummaryModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveProfileSummary} className="modal-body-form">
              <div className="form-group">
                <label>Professional Bio & Summary</label>
                <textarea
                  rows="4"
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  placeholder="Write your engineering background, specialties, and architectural interests..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="text"
                  value={phoneText}
                  onChange={(e) => setPhoneText(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label>Emergency Contact</label>
                <input
                  type="text"
                  value={emergencyText}
                  onChange={(e) => setEmergencyText(e.target.value)}
                  placeholder="Contact Name & Phone"
                />
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="android-btn-secondary"
                  onClick={() => setShowEditSummaryModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="android-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRIVACY MODAL */}
      {showPrivacyModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Privacy & Authorization Boundary</h3>
              <button className="close-modal-btn" onClick={() => setShowPrivacyModal(false)}>✕</button>
            </div>
            <div className="modal-scrollable-body modal-info-copy">
              <p>
                <strong>Strict Tenant & Role Separation:</strong> The workForc IQ Employee Portal strictly restricts record access to your authenticated employee identifier. You cannot view, edit, or modify other employees' assigned tasks, private compensation, or confidential workforce planning forecasts.
              </p>
              <p>
                <strong>Read-Only Governance:</strong> Official project allocations, budget milestones, and capacity ceilings are governed by authorized Workforce Operations administrators. Submitting requests creates traceable tickets for manager evaluation.
              </p>
              <p>
                <strong>Security Standard:</strong> All local caching is encrypted in secure client-side storage with simulated token authorization.
              </p>
            </div>
            <div className="modal-sticky-footer">
              <button type="button" className="android-btn-primary btn-block" onClick={() => setShowPrivacyModal(false)}>
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HELP MODAL */}
      {showHelpModal && (
        <div className="modal-backdrop">
          <div className="android-modal-sheet">
            <div className="modal-drag-handle" />
            <div className="modal-header">
              <h3>Help & Support FAQs</h3>
              <button className="close-modal-btn" onClick={() => setShowHelpModal(false)}>✕</button>
            </div>
            <div className="modal-scrollable-body modal-info-copy">
              <h4>Frequently Asked Questions</h4>
              <p><strong>How do I report a blocked task?</strong><br />Open any assigned task from the Tasks tab, toggle "Report Active Blocker", provide the reason, and confirm.</p>
              <p><strong>How do I resolve milestone scheduling clashes?</strong><br />Visit My Workload from the home dashboard or tap "Raise Request" to file a Deadline Conflict or Workload Support ticket.</p>
              <p><strong>Are self-reported skills immediately verified?</strong><br />No. Self-reported skills display a self-reported tag until reviewed by Talent Operations or verified by approved project deliverables.</p>
            </div>
            <div className="modal-sticky-footer">
              <button type="button" className="android-btn-primary btn-block" onClick={() => setShowHelpModal(false)}>
                Close Help
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
