import React, { useState } from 'react';
import { projects } from '../../data/projects';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const nextScreenshot = () => {
    setCurrentScreenshot(prev => 
      prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(prev => 
      prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1
    );
  };

  const handleProjectChange = (project: Project) => {
    setSelectedProject(project);
    setCurrentScreenshot(0);
  };

  return (
    <div style={{ 
      padding: '8px',
      height: '100%',
      overflow: 'auto'
    }}>
      {/* Project Selector */}
      <div className="field-row" style={{ marginBottom: '16px' }}>
        <label htmlFor="project-select">Select Project:</label>
        <select
          id="project-select"
          value={selectedProject.id}
          onChange={(e) => {
            const project = projects.find(p => p.id === e.target.value);
            if (project) handleProjectChange(project);
          }}
          style={{ width: '200px', marginLeft: '8px' }}
        >
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {/* Project Display */}
      <div className="sunken-panel" style={{ padding: '16px' }}>
        {/* Project Title */}
        <h2 style={{ 
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: 'bold',
          borderBottom: '1px solid #808080',
          paddingBottom: '4px'
        }}>
          {selectedProject.title}
        </h2>

        {/* Screenshots */}
        <div className="field-row" style={{ marginBottom: '16px' }}>
          <fieldset>
            <legend>Screenshots ({currentScreenshot + 1}/{selectedProject.screenshots.length})</legend>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px'
            }}>
              <button 
                onClick={prevScreenshot}
                disabled={selectedProject.screenshots.length <= 1}
                style={{ minWidth: '30px' }}
              >
                ◀️
              </button>
              <div style={{
                flex: 1,
                textAlign: 'center',
                border: '2px inset #c0c0c0',
                padding: '8px',
                background: '#f0f0f0',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={selectedProject.screenshots[currentScreenshot]}
                  alt={`${selectedProject.title} screenshot ${currentScreenshot + 1}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '180px',
                    border: '1px solid #808080'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '🖼️ Screenshot not available';
                  }}
                />
              </div>
              <button 
                onClick={nextScreenshot}
                disabled={selectedProject.screenshots.length <= 1}
                style={{ minWidth: '30px' }}
              >
                ▶️
              </button>
            </div>
          </fieldset>
        </div>

        {/* Description */}
        <div className="field-row" style={{ marginBottom: '16px' }}>
          <fieldset>
            <legend>Project Description</legend>
            <div style={{ 
              padding: '8px',
              background: 'white',
              border: '2px inset #c0c0c0',
              minHeight: '60px',
              fontSize: '11px',
              lineHeight: '1.4'
            }}>
              {selectedProject.description}
            </div>
          </fieldset>
        </div>

        {/* Technologies */}
        <div className="field-row" style={{ marginBottom: '16px' }}>
          <fieldset>
            <legend>Technologies Used</legend>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              padding: '8px'
            }}>
              {selectedProject.technologies.map(tech => (
                <span
                  key={tech}
                  style={{
                    padding: '2px 6px',
                    background: '#e0e0e0',
                    border: '1px solid #808080',
                    fontSize: '10px',
                    borderRadius: '2px'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Action Buttons */}
        <div className="field-row" style={{ 
          display: 'flex',
          gap: '8px',
          justifyContent: 'center'
        }}>
          {selectedProject.liveDemo && (
            <button
              onClick={() => window.open(selectedProject.liveDemo, '_blank')}
              style={{ 
                padding: '8px 16px',
                minWidth: '100px'
              }}
            >
              🌐 Live Demo
            </button>
          )}
          {selectedProject.githubRepo && (
            <button
              onClick={() => window.open(selectedProject.githubRepo, '_blank')}
              style={{ 
                padding: '8px 16px',
                minWidth: '100px'
              }}
            >
              📦 GitHub Repo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;