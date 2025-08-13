import { useState, useCallback } from 'react';
import { WindowState } from '../types';

const initialWindows: WindowState[] = [
  {
    id: 'ashish-exe',
    title: 'ashish.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 100 },
    size: { width: 600, height: 500 },
    zIndex: 10
  },
  {
    id: 'projects',
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 150 },
    size: { width: 700, height: 600 },
    zIndex: 10
  },
  {
    id: 'blog',
    title: 'Blog',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 200 },
    size: { width: 500, height: 400 },
    zIndex: 10
  },
  {
    id: 'favorite-media',
    title: 'My Favorite Media',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 250 },
    size: { width: 450, height: 350 },
    zIndex: 10
  },
  {
    id: 'doodle-pad',
    title: 'Doodle Pad',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 300 },
    size: { width: 400, height: 300 },
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