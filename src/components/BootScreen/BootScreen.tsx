import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [dots, setDots] = useState('');

  const bootMessages = [
    'Starting Portfolio OS...',
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
      background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: 'white',
      fontFamily: 'MS Sans Serif, monospace'
    }}>
      {/* Logo */}
      <div style={{
        fontSize: '48px',
        marginBottom: '40px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        animation: 'pulse 2s infinite'
      }}>
        💻
      </div>

      {/* Company Name */}
      <h1 style={{
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        letterSpacing: '2px'
      }}>
        PORTFOLIO OS
      </h1>

      {/* Version */}
      <p style={{
        fontSize: '14px',
        marginBottom: '60px',
        opacity: 0.8
      }}>
        Version 1.0 - Developer Edition
      </p>

      {/* Progress Bar Container */}
      <div style={{
        width: '300px',
        height: '20px',
        background: '#333',
        border: '2px inset #c0c0c0',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Progress Bar Fill */}
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
          transition: 'width 0.1s ease',
          boxShadow: progress > 0 ? 'inset 0 2px 4px rgba(255,255,255,0.3)' : 'none'
        }} />
        
        {/* Progress Text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          fontWeight: 'bold',
          color: progress > 50 ? '#000' : '#fff',
          textShadow: progress > 50 ? '1px 1px 1px rgba(255,255,255,0.5)' : '1px 1px 1px rgba(0,0,0,0.5)'
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* Status Text */}
      <p style={{
        fontSize: '16px',
        minHeight: '24px',
        textAlign: 'center',
        opacity: 0.9
      }}>
        {currentText}{dots}
      </p>

      {/* Loading Animation */}
      <div style={{
        marginTop: '40px',
        display: 'flex',
        gap: '8px'
      }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              background: '#4CAF50',
              borderRadius: '50%',
              animation: `bounce 1.4s infinite ease-in-out both`,
              animationDelay: `${i * 0.16}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BootScreen;
