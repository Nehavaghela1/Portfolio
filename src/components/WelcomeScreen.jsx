import React, { useState, useEffect } from 'react';
import './WelcomeScreen.css';
import { Sparkles, Stars, Rocket } from 'lucide-react';

const WelcomeScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Initial load heartbeat
    const t1 = setTimeout(() => setStage(1), 800);
    // Stage 2: Expansion & Sparkles
    const t2 = setTimeout(() => setStage(2), 2000);
    // Stage 3: Fade out
    const t3 = setTimeout(() => setStage(3), 3200);
    // Stage 4: Unmount
    const t4 = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (stage === 3) return <div className="welcome-overlay fade-out" />;

  return (
    <div className="welcome-overlay">
      <div className="blobs-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      
      <div className={`welcome-content ${stage >= 1 ? 'scale-up' : ''}`}>
        <div className="icon-celebration">
          <Rocket className={`main-icon ${stage >= 2 ? 'launch' : ''}`} size={48} />
          {stage >= 1 && (
            <>
              <Sparkles className="sparkle s-1" size={24} />
              <Stars className="sparkle s-2" size={32} />
              <Sparkles className="sparkle s-3" size={20} />
            </>
          )}
        </div>
        
        <h1 className="welcome-title">
          <span className="welcome-text-1">Welcome</span>
          <br/>
          <span className={`welcome-text-2 ${stage >= 1 ? 'reveal-text' : ''}`}>
            to my universe
          </span>
        </h1>
      </div>
    </div>
  );
};

export default WelcomeScreen;
