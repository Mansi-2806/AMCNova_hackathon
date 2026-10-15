import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  BarChart3, 
  Bot, 
  ArrowRight, 
  ChevronRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

export function OnboardingModal({ isOpen, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      title: 'Welcome to TalentSync AI',
      subtitle: 'Your Personal Employee Portal',
      icon: Sparkles,
      color: '#14b8a6',
      content: 'TalentSync AI Employee Portal gives you direct visibility into your daily priorities, active projects, and personal workload without any administrative clutter.',
      highlights: [
        'Personalized workspace dashboard synced with local time',
        'Real-time KPI metrics calculated strictly from your authorized records',
        'Instant access to AI-powered workforce intelligence'
      ]
    },
    {
      title: 'Tasks & Real-Time Sync',
      subtitle: 'Track, Update & Flag Blockers',
      icon: CheckCircle2,
      color: '#06b6d4',
      content: 'Manage your assignments with granular status controls, interactive acceptance criteria, and progress updates that immediately synchronize with the backend.',
      highlights: [
        'Update progress sliders and check off completed criteria',
        'Flag blockers and deadline risks with transparent reasoning',
        'Add progress notes and inspect comprehensive task audit history'
      ]
    },
    {
      title: 'Workload Health & Support',
      subtitle: 'Balance Capacity & Resolve Conflicts',
      icon: BarChart3,
      color: '#f97316',
      content: 'Monitor your weekly assigned hours against planned 40h capacity. Never burn out in silence — submit workload and deadline conflict support requests directly.',
      highlights: [
        'Interactive weekly workload trend charts and conflict alerts',
        'Submit 7 specialized support request types with full tracking',
        'Receive authorized manager responses directly in the app'
      ]
    },
    {
      title: 'AI Copilot & Skill Development',
      subtitle: 'Targeted Career Progression',
      icon: Bot,
      color: '#8b5cf6',
      content: 'Your dedicated AI Assistant analyzes upcoming milestones, suggests daily task order, and recommends learning paths tailored to your projects.',
      highlights: [
        'Explainable AI task prioritization based on urgency and dependencies',
        'Self-report skills and submit certifications for verification',
        'Track courses in the Learning & Development Center'
      ]
    }
  ];

  const currentSlide = slides[activeStep];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    if (activeStep < slides.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="onboarding-modal-card">
        {/* Progress Dots */}
        <div className="onboarding-progress-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide Visual Icon */}
        <div 
          className="onboarding-icon-wrap" 
          style={{ background: `${currentSlide.color}18`, color: currentSlide.color }}
        >
          <IconComponent size={40} />
        </div>

        {/* Content */}
        <div className="onboarding-text-content">
          <span className="onboarding-step-badge">Step {activeStep + 1} of {slides.length}</span>
          <h2 className="onboarding-title">{currentSlide.title}</h2>
          <h4 className="onboarding-subtitle">{currentSlide.subtitle}</h4>
          <p className="onboarding-description">{currentSlide.content}</p>

          <div className="onboarding-highlights">
            {currentSlide.highlights.map((item, idx) => (
              <div key={idx} className="onboarding-highlight-item">
                <CheckCircle2 size={16} style={{ color: currentSlide.color, flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="onboarding-actions">
          {activeStep > 0 ? (
            <button 
              type="button" 
              className="android-btn-secondary" 
              onClick={handlePrev}
            >
              Back
            </button>
          ) : (
            <button 
              type="button" 
              className="android-btn-secondary" 
              onClick={onClose}
            >
              Skip Tour
            </button>
          )}

          <button 
            type="button" 
            className="android-btn-primary" 
            onClick={handleNext}
          >
            <span>{activeStep === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
