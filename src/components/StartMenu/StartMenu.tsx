import React from 'react';

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (windowId: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onOpenWindow }) => {
  const menuItems = [
    { id: 'ashish-exe', label: 'ashish.exe', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'favorite-media', label: 'My Favorite Media', icon: '🎵' },
    { id: 'doodle-pad', label: 'Doodle Pad', icon: '🎨' }
  ];

  const handleMenuItemClick = (windowId: string) => {
    onOpenWindow(windowId);
    onClose();
  };

  const handleShutDown = () => {
    window.open('https://github.com', '_blank');
    onClose();
  };

  return (
    <div 
      className="start-menu"
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '0',
        width: '200px',
        background: '#c0c0c0',
        border: '2px outset #c0c0c0',
        zIndex: 1001,
        fontSize: '11px',
        fontFamily: 'MS Sans Serif'
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Start Menu Header */}
      <div style={{
        background: 'linear-gradient(90deg, #0000ff, #8080ff)',
        color: 'white',
        padding: '8px',
        fontWeight: 'bold',
        borderBottom: '1px solid #808080'
      }}>
        Developer Portfolio
      </div>

      {/* Menu Items */}
      <div>
        {menuItems.map(item => (
          <div
            key={item.id}
            className="start-menu-item"
            onClick={() => handleMenuItemClick(item.id)}
            style={{
              padding: '4px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid #e0e0e0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0000ff';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'black';
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <hr style={{
          margin: '4px 0',
          border: 'none',
          borderTop: '1px solid #808080',
          borderBottom: '1px solid #white'
        }} />

        <div
          className="start-menu-item"
          onClick={handleShutDown}
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0000ff';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'black';
          }}
        >
          <span style={{ fontSize: '16px' }}>⏻</span>
          Shut Down...
        </div>
      </div>
    </div>
  );
};

export default StartMenu;