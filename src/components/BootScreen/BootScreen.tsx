import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [dots, setDots] = useState('');

  const bootMessages = [
  
    'Loading components...',
    'Initializing windows...',
    'Setting up environment...',
    'Almost ready!'
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, currentStep * progressIncrement);
      setProgress(newProgress);

      // Update text based on progress
      const messageIndex = Math.min(
        Math.floor((newProgress / 100) * bootMessages.length),
        bootMessages.length - 1
      );
      setCurrentText(bootMessages[messageIndex]);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(onBootComplete, 500); // Small delay before hiding
      }
    }, interval);

    // Animate dots
    const dotsTimer = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(dotsTimer);
    };
  }, [onBootComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#000',
      fontFamily: 'MS Sans Serif, sans-serif',
      fontSize: '11px'
    }}>
      {/* Windows 98 Style Window for Boot Screen */}
      <div className="window" style={{
        width: '400px',
        maxWidth: 'calc(100vw - 40px)',
        margin: '0 20px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        boxShadow: '2px 2px 0px #808080'
      }}>

        {/* Title Bar */}
        <div className="title-bar" style={{
          background: 'linear-gradient(90deg, #0080ff 0%, #0040ff 100%)',
          color: 'white',
          padding: '2px 4px',
          fontWeight: 'bold',
          fontSize: '11px'
        }}>
          <div className="title-bar-text">Loading...</div>
        </div>
        
        {/* Window Content */}
        <div className="window-body" style={{
          padding: '20px',
          textAlign: 'center'
        }}>
          {/* Logo */}
          <div style={{
            fontSize: '32px',
            marginBottom: '20px',
            filter: 'contrast(1.2)'
          }}>
            💻
          </div>

          {/* Company Name */}
          <h2 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#000'
          }}>
            PORTFOLIO OS
          </h2>

          {/* Version */}
          <p style={{
            fontSize: '11px',
            marginBottom: '20px',
            color: '#808080'
          }}>
            Version 1.0 - Developer Edition
          </p>

          {/* Progress Bar Container - Windows 98 Style */}
          <div style={{
            width: '100%',
            height: '18px',
            background: '#808080',
            border: '1px inset #c0c0c0',
            marginBottom: '15px',
            position: 'relative'
          }}>
            {/* Progress Bar Fill */}
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: '#0080ff',
              transition: 'width 0.1s ease'
            }} />
            
            {/* Progress Text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '10px',
              fontWeight: 'bold',
              color: progress > 50 ? '#fff' : '#000',
              textShadow: '1px 1px 1px rgba(255,255,255,0.5)'
            }}>
              {Math.round(progress)}%
            </div>
          </div>

          {/* Status Text */}
          <p style={{
            fontSize: '11px',
            minHeight: '16px',
            textAlign: 'left',
            marginBottom: '10px',
            color: '#000'
          }}>
            {currentText}{dots}
          </p>

          {/* Windows 98 Style Loading Squares */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2px',
            marginTop: '10px'
          }}>
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  background: i % 2 === 0 ? '#0080ff' : '#c0c0c0',
                  border: '1px inset #c0c0c0',
                  animation: `blink 1s infinite`,
                  animationDelay: `${i * 0.25}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { 
            background-color: #0080ff;
            border: 1px inset #c0c0c0;
          }
          51%, 100% { 
            background-color: #c0c0c0;
            border: 1px outset #c0c0c0;
          }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
