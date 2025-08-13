import { useState, useCallback } from 'react';
import { WindowState } from '../types';

const getResponsiveSize = (desktopWidth: number, desktopHeight: number) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    const mobileWidth = Math.min(desktopWidth, window.innerWidth * 0.9);
    const mobileHeight = Math.min(desktopHeight, window.innerHeight * 0.8);
    return { width: mobileWidth, height: mobileHeight };
  }
  return { width: desktopWidth, height: desktopHeight };
};

const getResponsivePosition = (desktopX: number, desktopY: number) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return { x: 20, y: 20 };
    }
    return { x: desktopX, y: desktopY };
}


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
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  };
};