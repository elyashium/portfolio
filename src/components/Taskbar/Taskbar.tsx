import React from 'react';
import { WindowState } from '../../types';

interface TaskbarProps {
  windows: WindowState[];
  onStartClick: () => void;
  onWindowToggle: (windowId: string) => void;
  showStartMenu: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  windows, 
  onStartClick, 
  onWindowToggle, 
  showStartMenu 
}) => {
  const openWindows = windows.filter(window => window.isOpen);
  const [windowWidth, setWindowWidth] = React.useState(typeof globalThis.window !== 'undefined' ? globalThis.window.innerWidth : 1024);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(globalThis.window.innerWidth);
    };

    if (typeof globalThis.window !== 'undefined') {
      globalThis.window.addEventListener('resize', handleResize);
      return () => globalThis.window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="taskbar" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '40px',
      background: '#c0c0c0',
      border: '2px outset #c0c0c0',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
      fontSize: '11px',
      fontFamily: 'MS Sans Serif'
    }}>
      {/* Start Button */}
      <button
        className={`start-button ${showStartMenu ? 'pressed' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
        style={{
          height: '32px',
          padding: '4px 12px',
          marginLeft: '4px',
          border: showStartMenu ? '2px inset #c0c0c0' : '2px outset #c0c0c0',
          background: '#c0c0c0',
          fontSize: '11px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <div style={{ 
          width: '16px', 
          height: '16px',
          background: 'linear-gradient(45deg, #ff0000, #ffff00)',
          borderRadius: '2px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          ⊞
        </div>
        Start
      </button>

      {/* Window Buttons */}
      <div style={{
        flex: 1,
        display: 'flex',
        marginLeft: '8px',
        gap: '2px',
        overflow: 'hidden'
      }}>
        {openWindows.map(window => {
          // Calculate dynamic button width based on number of open windows
          const windowCount = openWindows.length;
          const availableWidth = windowWidth - 200; // Subtract space for start button and system tray
          let buttonWidth = Math.max(80, Math.min(150, availableWidth / windowCount - 4)); // 4px for gap
          
          // On mobile, make buttons even more compact
          if (windowWidth <= 768) {
            buttonWidth = Math.max(60, Math.min(100, availableWidth / windowCount - 4));
          }
          
          return (
            <button
              key={window.id}
              className={`taskbar-button ${window.isMinimized ? '' : 'active'}`}
              onClick={() => onWindowToggle(window.id)}
              style={{
                height: '30px',
                padding: '4px 6px',
                border: window.isMinimized ? '2px outset #c0c0c0' : '2px inset #c0c0c0',
                background: window.isMinimized ? '#c0c0c0' : '#808080',
                fontSize: '11px',
                cursor: 'pointer',
                width: `${buttonWidth}px`,
                minWidth: `${Math.min(buttonWidth, 60)}px`,
                maxWidth: `${buttonWidth}px`,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                flexShrink: 1,
                flexGrow: 0
              }}
            >
              {window.title}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="system-tray" style={{
        height: '32px',
        padding: '0 8px',
        border: '2px inset #c0c0c0',
        marginRight: '4px',
        display: 'flex',
        alignItems: 'center',
        background: '#c0c0c0',
        minWidth: '80px'
      }}>
        {currentTime}
      </div>
    </div>
  );
};

export default Taskbar;