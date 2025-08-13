import React, { useState } from 'react';
import { techStack } from '../../data/techStack';
import { PersonaState } from '../../types';

const AshishExe: React.FC = () => {
  const [personaState, setPersonaState] = useState<PersonaState>({
    currentAngle: 1,
    currentBackground: 'retro-1'
  });

  const backgrounds = [
    { id: 'retro-1', name: 'Retro Pattern 1', style: { background: 'repeating-linear-gradient(45deg, #ff6b6b, #ff6b6b 10px, #4ecdc4 10px, #4ecdc4 20px)' }},
    { id: 'retro-2', name: 'Retro Pattern 2', style: { background: 'repeating-conic-gradient(#ff9f43 0% 25%, #10ac84 0% 50%)' }},
    { id: 'retro-3', name: 'Retro Pattern 3', style: { background: 'linear-gradient(45deg, #667eea 25%, transparent 25%), linear-gradient(-45deg, #667eea 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #667eea 75%), linear-gradient(-45deg, transparent 75%, #667eea 75%)', backgroundSize: '20px 20px' }},
    { id: 'solid', name: 'Solid Blue', style: { background: '#0080ff' }}
  ];

  const rotateLeft = () => {
    setPersonaState(prev => ({
      ...prev,
      currentAngle: prev.currentAngle === 1 ? 4 : prev.currentAngle - 1
    }));
  };

  const rotateRight = () => {
    setPersonaState(prev => ({
      ...prev,
      currentAngle: prev.currentAngle === 4 ? 1 : prev.currentAngle + 1
    }));
  };

  const changeBackground = () => {
    const currentIndex = backgrounds.findIndex(bg => bg.id === personaState.currentBackground);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    setPersonaState(prev => ({
      ...prev,
      currentBackground: backgrounds[nextIndex].id
    }));
  };

  const currentBackground = backgrounds.find(bg => bg.id === personaState.currentBackground) || backgrounds[0];

  return (
    <div style={{ padding: '16px' }}>
      {/* Persona Section */}
      <div className="field-row" style={{ marginBottom: '16px' }}>
        <fieldset>
          <legend>Persona Customizer</legend>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            padding: '8px'
          }}>
            {/* Avatar Display */}
            <div
              style={{
                width: '120px',
                height: '120px',
                border: '2px inset #c0c0c0',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...currentBackground.style
              }}
            >
              <div style={{
                fontSize: '64px',
                transform: `rotateY(${(personaState.currentAngle - 1) * 90}deg)`,
                transition: 'transform 0.3s ease'
              }}>
                👨‍💻
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={rotateLeft}>⬅️ Rotate Left</button>
                <button onClick={rotateRight}>Rotate Right ➡️</button>
              </div>
              <button onClick={changeBackground}>
                Change Background: {currentBackground.name}
              </button>
              <div style={{ fontSize: '10px', color: '#666' }}>
                Angle: {personaState.currentAngle}/4
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Tech Stack */}
      <div className="field-row" style={{ marginBottom: '16px' }}>
        <fieldset>
          <legend>Tech Stack</legend>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            gap: '8px',
            padding: '8px',
            justifyItems: 'center'
          }}>
            {techStack.map(tech => (
              <div
                key={tech.name}
                className="tech-item"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px',
                  border: '1px solid #808080',
                  background: '#f0f0f0',
                  fontSize: '10px',
                  textAlign: 'center',
                  width: '100%',
                  maxWidth: '70px',
                  minHeight: '60px',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '24px', marginBottom: '4px' }}>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* GitHub Contributions */}
      <div className="field-row" style={{ marginBottom: '16px' }}>
        <fieldset>
          <legend>GitHub Activity</legend>
          <div style={{ padding: '8px', textAlign: 'center' }}>
            <iframe
              src="https://ghchart.rshah.org/ashishpatel26"
              width="100%"
              height="150"
              style={{ border: '1px inset #c0c0c0' }}
              title="GitHub Contribution Chart"
            />
            <p style={{ margin: '8px 0 0 0', fontSize: '10px' }}>
              My GitHub contribution graph shows my coding activity
            </p>
          </div>
        </fieldset>
      </div>

      {/* Quick Links */}
      <div className="field-row">
        <fieldset>
          <legend>Quick Access</legend>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            padding: '8px'
          }}>
            <button style={{ flex: 1 }}>📁 Projects</button>
            <button style={{ flex: 1 }}>📝 Blog</button>
            <button style={{ flex: 1 }}>🎵 Media</button>
            <button style={{ flex: 1 }}>🎨 Draw</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default AshishExe;