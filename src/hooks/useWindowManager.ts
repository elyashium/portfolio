import { useState, useCallback } from 'react';
import { WindowState } from '../types';

const getResponsiveSize = (desktopWidth: number, desktopHeight: number) => {
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // For mobile devices (480px and below)
    if (screenWidth <= 480) {
      return {
        width: Math.min(desktopWidth, screenWidth - 20),
        height: Math.min(desktopHeight, screenHeight * 0.7)
      };
    }
    
    // For small tablets/large phones (481px to 768px)
    if (screenWidth <= 768) {
      return {
        width: Math.min(desktopWidth, screenWidth * 0.95),
        height: Math.min(desktopHeight, screenHeight * 0.8)
      };
    }
    
    // For tablets (769px to 1024px)
    if (screenWidth <= 1024) {
      return {
        width: Math.min(desktopWidth, screenWidth * 0.85),
        height: Math.min(desktopHeight, screenHeight * 0.75)
      };
    }
  }
  
  // Default desktop size
  return { width: desktopWidth, height: desktopHeight };
};

const getResponsivePosition = (desktopX: number, desktopY: number) => {
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth;
    
    // For mobile devices
    if (screenWidth <= 480) {
      return { x: 10, y: 10 };
    }
    
    // For tablets and small screens
    if (screenWidth <= 1024) {
      return { 
        x: Math.max(10, Math.min(desktopX, screenWidth * 0.1)), 
        y: Math.max(10, Math.min(desktopY, 60)) 
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
    position: getResponsivePosition(100, 100),
    size: getResponsiveSize(600, 500),
    zIndex: 10
  },
  {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(150, 150),
    size: getResponsiveSize(700, 600),
    zIndex: 10
  },
  {
    id: 'blog',
    title: 'Blog',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(200, 200),
    size: getResponsiveSize(500, 400),
    zIndex: 10
  },
  {
    id: 'favorite-media',
    title: 'My Favorite Media',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(250, 250),
    size: getResponsiveSize(450, 350),
    zIndex: 10
  },
  {
    id: 'doodle-pad',
    title: 'Doodle Pad',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: getResponsivePosition(300, 300),
    size: getResponsiveSize(400, 300),
    zIndex: 10
  }
];

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [highestZIndex, setHighestZIndex] = useState(20);

  const openWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(window => 
      window.id === windowId 
        ? { ...window, isOpen: true, isMinimized: false, zIndex: highestZIndex + 1 }
        : window
    ));
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