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

  const handleResize = (e: React.MouseEvent | TouchEvent, direction: string) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();

    // Handle both mouse and touch events
    const isTouch = 'touches' in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const startX = clientX;
    const startY = clientY;
    const startWidth = window.size.width;
    const startHeight = window.size.height;
    const startPosX = window.position.x;
    const startPosY = window.position.y;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const isTouchMove = 'touches' in moveEvent;
      const currentX = isTouchMove ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = isTouchMove ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      // Handle different resize directions
      if (direction.includes('right')) {
        newWidth = Math.max(300, startWidth + deltaX);
      }
      if (direction.includes('left')) {
        newWidth = Math.max(300, startWidth - deltaX);
        if (newWidth > 300) {
          newX = startPosX + deltaX;
        }
      }
      if (direction.includes('bottom')) {
        newHeight = Math.max(200, startHeight + deltaY);
      }
      if (direction.includes('top')) {
        newHeight = Math.max(200, startHeight - deltaY);
        if (newHeight > 200) {
          newY = startPosY + deltaY;
        }
      }

      if (onResize) {
        onResize({ width: newWidth, height: newHeight });
      }

      // Update position if resizing from left or top
      if ((direction.includes('left') && newWidth > 300) || (direction.includes('top') && newHeight > 200)) {
        onDrag({ x: newX, y: newY });
      }
    };

    const handleEnd = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);
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
              onTouchEnd={onMinimize}
              aria-label="Minimize"
              style={{
                width: isMobile ? '40px' : '24px',
                height: isMobile ? '40px' : '24px',
                fontSize: isMobile ? '18px' : '12px',
                minWidth: isMobile ? '40px' : '24px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px outset #c0c0c0',
                background: '#c0c0c0',
                cursor: 'pointer',
                touchAction: 'manipulation'
              }}
            >
              <span aria-hidden="true" style={{ userSelect: 'none' }}>_</span>
            </button>
            <button
              className="title-bar-control"
              onClick={onMaximize}
              onTouchEnd={onMaximize}
              aria-label={window.isMaximized ? "Restore" : "Maximize"}
              style={{
                width: isMobile ? '40px' : '24px',
                height: isMobile ? '40px' : '24px',
                fontSize: isMobile ? '18px' : '12px',
                minWidth: isMobile ? '40px' : '24px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px outset #c0c0c0',
                background: '#c0c0c0',
                cursor: 'pointer',
                touchAction: 'manipulation'
              }}
            >
              <span aria-hidden="true" style={{ userSelect: 'none' }}>□</span>
            </button>
            <button
              className="title-bar-control"
              onClick={onClose}
              onTouchEnd={onClose}
              aria-label="Close"
              style={{
                width: isMobile ? '40px' : '24px',
                height: isMobile ? '40px' : '24px',
                fontSize: isMobile ? '18px' : '12px',
                minWidth: isMobile ? '40px' : '24px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px outset #c0c0c0',
                background: '#c0c0c0',
                cursor: 'pointer',
                touchAction: 'manipulation'
              }}
            >
              <span aria-hidden="true" style={{ userSelect: 'none' }}>✕</span>
            </button>
          </div>
        </div>
        <div className="window-body window-content">
          {children}
        </div>

        {/* Invisible Resize Handles - Functional but hidden */}
        {!window.isMaximized && (
          <>
            {/* Bottom-right corner */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: isMobile ? '24px' : '16px',
                height: isMobile ? '24px' : '16px',
                cursor: 'nw-resize',
                background: 'transparent',
                zIndex: 1000,
                touchAction: 'none'
              }}
              onMouseDown={(e) => handleResize(e, 'bottom-right')}
              onTouchStart={(e) => handleResize(e as any, 'bottom-right')}
            />

            {/* Right edge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: 0,
                width: isMobile ? '12px' : '8px',
                height: `calc(100% - 40px)`,
                cursor: 'e-resize',
                background: 'transparent',
                zIndex: 999,
                touchAction: 'none'
              }}
              onMouseDown={(e) => handleResize(e, 'right')}
              onTouchStart={(e) => handleResize(e as any, 'right')}
            />

            {/* Bottom edge */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '20px',
                width: `calc(100% - 40px)`,
                height: isMobile ? '12px' : '8px',
                cursor: 's-resize',
                background: 'transparent',
                zIndex: 999,
                touchAction: 'none'
              }}
              onMouseDown={(e) => handleResize(e, 'bottom')}
              onTouchStart={(e) => handleResize(e as any, 'bottom')}
            />
          </>
        )}
      </div>
    </Draggable>
  );
};

export default Window;