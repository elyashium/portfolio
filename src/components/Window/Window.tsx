import React from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { WindowState } from '../../types';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDrag: (position: { x: number; y: number }) => void;
  onResize?: (size: { width: number; height: number }) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDrag,
  onResize
}) => {
  if (window.isMinimized) {
    return null;
  }

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    onDrag({ x: data.x, y: data.y });
  };

  const handleMouseDown = () => {
    onFocus();
  };

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.size.width;
    const startHeight = window.size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(300, startWidth + (moveEvent.clientX - startX));
      const newHeight = Math.max(200, startHeight + (moveEvent.clientY - startY));
      
      if (onResize) {
        onResize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Check if we're on a mobile device
  const isMobile = typeof globalThis.window !== 'undefined' && globalThis.window.innerWidth <= 768;
  
  return (
    <Draggable
      handle=".title-bar"
      position={window.isMaximized ? { x: 0, y: 0 } : window.position}
      onDrag={handleDrag}
      disabled={window.isMaximized}
    >
      <div
        className={`window draggable-window ${window.isMaximized ? 'maximized' : ''} ${isMobile ? 'mobile-window' : ''}`}
        style={{
          width: window.isMaximized ? '100vw' : `${window.size.width}px`,
          height: window.isMaximized ? 'calc(100vh - 40px)' : `${window.size.height}px`,
          zIndex: window.zIndex,
          position: window.isMaximized ? 'fixed' : 'absolute',
          top: window.isMaximized ? '0' : undefined,
          left: window.isMaximized ? '0' : undefined,
          minWidth: isMobile ? '280px' : (window.isMaximized ? '100vw' : '300px'),
          minHeight: isMobile ? '200px' : (window.isMaximized ? 'calc(100vh - 40px)' : '200px'),
          maxWidth: isMobile ? '100vw' : undefined,
          maxHeight: isMobile ? '100vh' : undefined,
          overflow: isMobile ? 'hidden' : undefined
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="title-bar">
          <div className="title-bar-text">{window.title}</div>
          <div className="title-bar-controls">
            <button 
              className="title-bar-control" 
              onClick={onMinimize}
              aria-label="Minimize"
            >
              <span aria-hidden="true">_</span>
            </button>
            <button 
              className="title-bar-control" 
              onClick={onMaximize}
              aria-label={window.isMaximized ? "Restore" : "Maximize"}
            >
              <span aria-hidden="true">□</span>
            </button>
            <button 
              className="title-bar-control" 
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>
        <div className="window-body window-content">
          {children}
        </div>
        
        {/* Resize Handle - Enhanced for mobile */}
        {!window.isMaximized && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: isMobile ? '24px' : '16px',
              height: isMobile ? '24px' : '16px',
              cursor: 'nw-resize',
              background: 'linear-gradient(-45deg, transparent 30%, #808080 30%, #808080 70%, transparent 70%)',
              zIndex: 1000,
              touchAction: 'none' // Prevent default touch behavior
            }}
            onMouseDown={handleResize}
            onTouchStart={(e) => {
              // Convert touch event to mouse event for mobile
              const touch = e.touches[0];
              const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true
              });
              handleResize(mouseEvent as any);
            }}
          />
        )}
      </div>
    </Draggable>
  );
};

export default Window;