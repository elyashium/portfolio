import React, { useState } from 'react';
import Taskbar from '../Taskbar/Taskbar';
import Window from '../Window/Window';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import StartMenu from '../StartMenu/StartMenu';

import desktop_bg from './desktop_bg.png';
import { useWindowManager } from '../../hooks/useWindowManager';

// Import window content components
import AshishExe from '../Windows/AshishExe';
import Projects from '../Windows/Projects';
import Blog from '../Windows/Blog';
import FavoriteMedia from '../Windows/FavoriteMedia';
import DoodlePad from '../Windows/DoodlePad';
import ArtGallery from '../Windows/ArtGallery';
import ImageViewer from '../Windows/ImageViewer';

const Desktop: React.FC = () => {
  const windowManager = useWindowManager();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [viewingImage, setViewingImage] = useState<{ title: string, url: string } | null>(null);

  /* Saved Drawings Logic */
  // We keep this state to update localStorage, but we don't render icons anymore
  const [savedDrawings, setSavedDrawings] = useState<{ id: string, label: string, icon: string, data: string }[]>([]);

  React.useEffect(() => {
    const loaded = localStorage.getItem('local_drawings');
    if (loaded) {
      setSavedDrawings(JSON.parse(loaded));
    }
  }, []);

  const handleSaveLocal = (imageData: string, name: string) => {
    const newDrawing = {
      id: `drawing-${Date.now()}`,
      label: `${name}.png`,
      icon: '🎨',
      data: imageData
    };

    const updatedDrawings = [...savedDrawings, newDrawing];
    setSavedDrawings(updatedDrawings);
    localStorage.setItem('local_drawings', JSON.stringify(updatedDrawings));
  };

  const desktopIcons = [
    { id: 'ashish-exe', label: 'Ashish.exe', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'blog', label: 'Blog.exe', icon: '📝' },
    { id: 'favorite-media', label: 'Ashishs fav media', icon: '🎵' },
    { id: 'art-gallery', label: 'My Drawings', icon: '📂' },
    { id: 'doodle-pad', label: 'Draw.exe', icon: '🎨' }
  ];

  const handleIconClick = (iconId: string) => {
    windowManager.openWindow(iconId);
    setSelectedIcon(iconId);
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  const handleOpenImage = (image: { title: string, url: string }) => {
    setViewingImage(image);
    windowManager.openWindow('image-viewer');
  };

  const renderWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'ashish-exe':
        return <AshishExe />;
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      case 'favorite-media':
        return <FavoriteMedia />;
      case 'doodle-pad':
        return <DoodlePad onSave={handleSaveLocal} />;
      case 'art-gallery':
        return <ArtGallery onOpenImage={handleOpenImage} />;
      case 'image-viewer':
        return <ImageViewer image={viewingImage} />;
      default:
        return <div>Window content not found</div>;
    }
  };

  return (
    <div
      className="desktop"
      onClick={handleDesktopClick}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${desktop_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Desktop Icons */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flexWrap: 'wrap',
        maxHeight: '90vh'
      }}>
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            isSelected={selectedIcon === icon.id}
            onClick={handleIconClick}
          />
        ))}
      </div>

      {/* Windows */}
      {windowManager.windows.map(window => (
        window.isOpen && (
          <Window
            key={window.id}
            window={window}
            onClose={() => windowManager.closeWindow(window.id)}
            onMinimize={() => windowManager.minimizeWindow(window.id)}
            onMaximize={() => windowManager.maximizeWindow(window.id)}
            onFocus={() => windowManager.focusWindow(window.id)}
            onDrag={(position) => windowManager.updateWindowPosition(window.id, position)}
            onResize={(size) => windowManager.updateWindowSize(window.id, size)}
          >
            {renderWindowContent(window.id)}
          </Window>
        )
      ))}

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={windowManager.openWindow}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windowManager.windows}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onWindowToggle={windowManager.toggleMinimizeWindow}
        showStartMenu={showStartMenu}
      />
    </div>
  );
};

export default Desktop;