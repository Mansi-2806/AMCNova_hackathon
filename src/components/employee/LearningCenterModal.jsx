import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Play, 
  Check, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { talentSyncStore } from '../../data/talentSyncStore';

export function LearningCenterModal({ 
  employee, 
  courses = [], 
  onClose 
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCourseId, setExpandedCourseId] = useState('CRS-01');
  const [personalGoal, setPersonalGoal] = useState('Achieve AWS Solutions Architect Pro renewal and master multi-stage Docker caching before Q1 migration.');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(personalGoal);

  const categories = ['All', 'Technical Track', 'Certification Track', 'Soft Skills Track'];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleToggleModule = (courseId, moduleIdx) => {
    talentSyncStore.updateCourseProgress(courseId, { moduleIndex: moduleIdx });
    
    // Check if newly completed
    const crs = courses.find(c => c.id === courseId);
    if (crs && crs.modules) {
      const willBeCompleted = crs.modules.filter((m, i) => i === moduleIdx ? !m.completed : m.completed).length === crs.modules.length;
      if (willBeCompleted) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleStartCourse = (courseId) => {
    talentSyncStore.updateCourseProgress(courseId, {
      progressStatus: 'In Progress',
      progressPercent: 15
    });
    setExpandedCourseId(courseId);
  };

  const handleSaveGoal = () => {
    setPersonalGoal(tempGoal);
    setIsEditingGoal(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="android-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-drag-handle" />

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="task-id-tag">TalentSync Academy</span>
            <span className="section-title-clean">Learning & Upskilling</span>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-scrollable-body">
          {/* Header Hero */}
          <div className="learning-hero-card">
            <div className="learning-hero-icon">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="learning-hero-title">Personalized Growth Engine</h3>
              <p className="learning-hero-sub">
                Recommendations tailored to your cloud architecture role and upcoming Q1 project requirements.
              </p>
            </div>
          </div>

          {/* Personal Learning Goal Box */}
          <div className="learning-goal-card">
            <div className="goal-header-row">
              <div className="goal-title-group">
                <Target size={16} className="text-teal" />
                <strong>2026 Personal Development Goal</strong>
              </div>
              <button 
                type="button" 
                className="edit-goal-btn"
                onClick={() => {
                  if (isEditingGoal) handleSaveGoal();
                  else {
                    setTempGoal(personalGoal);
                    setIsEditingGoal(true);
                  }
                }}
              >
                {isEditingGoal ? 'Save Goal' : 'Edit Goal'}
              </button>
            </div>

            {isEditingGoal ? (
              <textarea
                rows="2"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="goal-textarea"
              />
            ) : (
              <p className="goal-text">"{personalGoal}"</p>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="filter-chips-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Courses List */}
          <div className="courses-vertical-list">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourseId === course.id;
              const isDone = course.progressPercent === 100 || course.progressStatus === 'Completed';

              return (
                <div key={course.id} className={`course-card ${isDone ? 'completed-card' : ''}`}>
                  <div 
                    className="course-card-top"
                    onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                  >
                    <div className="course-badge-row">
                      <span className="course-cat-tag">{course.category}</span>
                      <span className={`urgency-badge ${course.urgency?.toLowerCase()}`}>
                        {course.urgency} Urgency
                      </span>
                    </div>

                    <h4 className="course-title">{course.title}</h4>

                    <div className="course-meta-row">
                      <div className="meta-pair">
                        <Clock size={13} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="meta-pair">
                        <Award size={13} />
                        <span>{course.targetSkill}</span>
                      </div>
                      <span className="diff-pill">{course.difficulty}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="course-progress-wrap">
                      <div className="progress-labels">
                        <span className="progress-status-text">
                          {isDone ? '✓ Completed' : (course.progressStatus || 'Not Started')}
                        </span>
                        <strong className="progress-percent-text">{course.progressPercent || 0}%</strong>
                      </div>
                      <div className="progress-bar-track">
                        <div 
                          className="progress-bar-fill fill-cyan"
                          style={{ width: `${course.progressPercent || 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="expand-trigger-row">
                      <span className="reason-summary-hint">
                        <Sparkles size={13} /> {course.reason}
                      </span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Interactive Modules */}
                  {isExpanded && (
                    <div className="course-expanded-body">
                      <h5 className="modules-header">Curriculum & Interactive Checkpoints</h5>
                      <div className="modules-checklist">
                        {(course.modules || []).map((mod, idx) => (
                          <label key={idx} className="module-item-row">
                            <input
                              type="checkbox"
                              checked={mod.completed}
                              onChange={() => handleToggleModule(course.id, idx)}
                            />
                            <span className={`module-title-text ${mod.completed ? 'completed' : ''}`}>
                              {mod.title}
                            </span>
                          </label>
                        ))}
                      </div>

                      {course.progressStatus === 'Not Started' && (
                        <button 
                          type="button" 
                          className="start-course-btn"
                          onClick={() => handleStartCourse(course.id)}
                        >
                          <Play size={14} fill="currentColor" />
                          <span>Start This Learning Path</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="modal-sticky-footer">
          <button type="button" className="android-btn-primary btn-block" onClick={onClose}>
            Close Learning Center
          </button>
        </div>
      </div>
    </div>
  );
}
