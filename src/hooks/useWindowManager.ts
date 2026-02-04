import { useState, useCallback, useEffect } from 'react';
import { WindowState } from '../types';

const getResponsiveSize = (desktopWidth: number, desktopHeight: number) => {
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // For mobile devices (480px and below) - Force 75% height
    if (screenWidth <= 480) {
      return {
        width: Math.min(desktopWidth, screenWidth - 20),
        height: screenHeight * 0.75 - 40 // Subtract taskbar height
      };
    }

    // For small tablets/large phones (481px to 768px) - Force 75% height
    if (screenWidth <= 768) {
      return {
        width: Math.min(desktopWidth, screenWidth * 0.95),
        height: screenHeight * 0.75 - 40 // Subtract taskbar height
      };
    }

    // For tablets (769px to 1024px) - Force 75% height
    if (screenWidth <= 1024) {
      return {
        width: Math.min(desktopWidth, screenWidth * 0.85),
        height: screenHeight * 0.75 - 40 // Subtract taskbar height
      };
    }
  }

  // Default desktop size
  return { width: desktopWidth, height: desktopHeight };
};

const getResponsivePosition = (desktopX: number, desktopY: number, windowWidth?: number, windowHeight?: number) => {
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // For mobile devices - center the window
    if (screenWidth <= 480) {
      const safeWidth = windowWidth || 300;
      const safeHeight = windowHeight || 200;
      return {
        x: Math.max(10, (screenWidth - safeWidth) / 2),
        y: Math.max(10, (screenHeight - safeHeight - 40) / 2) // 40px for taskbar
      };
    }

    // For tablets and small screens - center but with some offset
    if (screenWidth <= 1024) {
      const safeWidth = windowWidth || 300;
      const safeHeight = windowHeight || 200;
      const centerX = (screenWidth - safeWidth) / 2;
      const centerY = (screenHeight - safeHeight - 40) / 2;

      return {
        x: Math.max(10, Math.min(centerX + (desktopX - 100), screenWidth - safeWidth - 10)),
        y: Math.max(10, Math.min(centerY + (desktopY - 100), screenHeight - safeHeight - 50))
      };
    }
  }

  return { x: desktopX, y: desktopY };
};


const initialWindows: WindowState[] = [
  {
    id: 'ashish-exe',
    title: 'ashish.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(100, 100, 600, 500),
    size: getResponsiveSize(600, 500),
    zIndex: 10
  },
  {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(150, 150, 700, 600),
    size: getResponsiveSize(700, 600),
    zIndex: 10
  },
  {
    id: 'blog',
    title: 'Blog',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(200, 200, 500, 400),
    size: getResponsiveSize(500, 400),
    zIndex: 10
  },
  {
    id: 'favorite-media',
    title: 'My Favorite Media',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(250, 250, 450, 350),
    size: getResponsiveSize(450, 350),
    zIndex: 10
  },
  {
    id: 'doodle-pad',
    title: 'Draw',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(150, 100, 650, 550),
    size: getResponsiveSize(650, 550),
    zIndex: 10
  },
  {
    id: 'art-gallery',
    title: 'My Drawings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(100, 100, 600, 450),
    size: getResponsiveSize(600, 450),
    zIndex: 9
  },
  {
    id: 'image-viewer',
    title: 'Picture Viewer',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(120, 120, 500, 400),
    size: getResponsiveSize(500, 400),
    zIndex: 11
  }
];

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>(() => {
    try {
      const savedWindows = localStorage.getItem('windowsState');
      if (savedWindows) {
        const parsed: WindowState[] = JSON.parse(savedWindows);
        // Merge with initialWindows to ensure new windows are added
        const initialMap = new Map(initialWindows.map(w => [w.id, w]));
        const savedMap = new Map(parsed.map(w => [w.id, w]));

        // Update saved windows with new definitions if needed, or add missing ones
        initialWindows.forEach(initial => {
          if (!savedMap.has(initial.id)) {
            parsed.push(initial);
          }
        });
        return parsed;
      }
    } catch (error) {
      console.error("Failed to parse windows state from localStorage", error);
    }
    return initialWindows;
  });

  const [highestZIndex, setHighestZIndex] = useState(() => {
    const savedWindows = windows; // Use the already initialized state
    if (savedWindows.length > 0) {
      return Math.max(...savedWindows.map(w => w.zIndex), 20);
    }
    return 20;
  });

  useEffect(() => {
    try {
      localStorage.setItem('windowsState', JSON.stringify(windows));
    } catch (error) {
      console.error("Failed to save windows state to localStorage", error);
    }
  }, [windows]);

  const openWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window => {
      if (window.id === windowId) {
        // Recalculate position for mobile devices to ensure centering
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        let newPosition = window.position;

        if (screenWidth <= 1024) {
          // Use responsive positioning with current window size
          newPosition = getResponsivePosition(
            window.position.x,
            window.position.y,
            window.size.width,
            window.size.height
          );
        }

        return {
          ...window,
          isOpen: true,
          isMinimized: false,
          zIndex: highestZIndex + 1,
          position: newPosition
        };
      }
      return window;
    }));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);



  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, isOpen: false, isMinimized: false }
        : window
    ));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, isMinimized: true }
        : window
    ));
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, isMaximized: !window.isMaximized, zIndex: highestZIndex + 1 }
        : window
    ));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const restoreWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, isMinimized: false, zIndex: highestZIndex + 1 }
        : window
    ));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const toggleMinimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => {
      const targetWindow = prev.find(w => w.id === windowId);
      if (targetWindow && targetWindow.isMinimized) {
        setHighestZIndex(prevZIndex => prevZIndex + 1);
      }

      return prev.map(window =>
        window.id === windowId
          ? {
            ...window,
            isMinimized: !window.isMinimized,
            zIndex: window.isMinimized ? highestZIndex + 1 : window.zIndex
          }
          : window
      );
    });
  }, [highestZIndex]);

  const focusWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, zIndex: highestZIndex + 1 }
        : window
    ));
    setHighestZIndex(prev => prev + 1);
  }, [highestZIndex]);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, position }
        : window
    ));
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(window =>
      window.id === windowId
        ? { ...window, size }
        : window
    ));
  }, []);


  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    toggleMinimizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  };
};