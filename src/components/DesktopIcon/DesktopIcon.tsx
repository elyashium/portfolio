import React from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, isSelected, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(id);
  };

  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <div style={{ fontSize: '32px', marginBottom: '4px' }}>
        {icon}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default DesktopIcon;