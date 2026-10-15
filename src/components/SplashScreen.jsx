import React, { useEffect, useState } from 'react';
import { Cpu, Sparkles } from 'lucide-react';

export function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState('initial'); // 'initial' -> 'animate-in' -> 'fade-out'

  useEffect(() => {
    // Stage 1: Trigger scale-up and fade-in shortly after mounting
    const timerIn = setTimeout(() => {
      setStage('animate-in');
    }, 60);

    // Stage 2: Begin smooth transition out
    const timerOut = setTimeout(() => {
      setStage('fade-out');
    }, 1750);

    // Stage 3: Complete transition into login portal
    const timerComplete = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2100);

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
      clearTimeout(timerComplete);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('fade-out');
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 250);
  };

  return (
    <div 
      className={`splash-screen-container ${stage}`}
      onClick={handleSkip}
      title="Click to skip splash"
    >
      {/* Background ambient lighting orbs */}
      <div className="splash-ambient-glow top" />
      <div className="splash-ambient-glow bottom" />

      {/* Centered Brand Content */}
      <div className="splash-center-content">
        <div className="splash-logo-symbol">
          <div className="splash-icon-inner">
            <Cpu size={42} strokeWidth={2.2} />
          </div>
          <div className="splash-pulse-ring" />
        </div>

        <div className="splash-brand-text">
          <h1 className="splash-brand-title">
            Workforce<span>IQ</span>
          </h1>
          <p className="splash-brand-tagline">
            Strategic Talent Intelligence & Allocation Engine
          </p>
        </div>

        <div className="splash-badge">
          <Sparkles size={12} />
          <span>Autonomous Workforce Architecture</span>
        </div>
      </div>

      <div className="splash-footer-caption">
        Enterprise Decision Platform v2.4
      </div>
    </div>
  );
}
