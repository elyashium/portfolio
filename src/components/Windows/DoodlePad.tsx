import React, { useState, useRef, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'line' | 'rectangle' | 'ellipse';

interface DoodlePadProps {
  onSave?: (imageData: string, name: string) => void;
}

const DoodlePad: React.FC<DoodlePadProps> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [brushSize, setBrushSize] = useState(2);
  const [currentTool, setCurrentTool] = useState<Tool>('pencil');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [fileName, setFileName] = useState('untitled');
  const [canvasSnapshot, setCanvasSnapshot] = useState<ImageData | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 280, height: 200 });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Windows 98 Paint color palette - 2 rows
  const colorPalette = [
    ['#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080'],
    ['#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
  ];

  // Tool definitions with matching symbols
  const tools: { id: Tool; label: string }[] = [
    { id: 'pencil', label: '✏️' },
    { id: 'brush', label: '🖌️' },
    { id: 'eraser', label: '⬜' },
    { id: 'fill', label: '🪣' },
    { id: 'line', label: '╱' },
    { id: 'rectangle', label: '▭' },
    { id: 'ellipse', label: '◯' },
  ];

  // Win98 Button Styles
  const getButtonStyle = (isActive: boolean) => ({
    width: '24px',
    height: '24px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    background: '#c0c0c0',
    color: '#000',
    borderTop: isActive ? '1px solid #808080' : '1px solid #fff',
    borderLeft: isActive ? '1px solid #808080' : '1px solid #fff',
    borderRight: isActive ? '1px solid #fff' : '1px solid #404040',
    borderBottom: isActive ? '1px solid #fff' : '1px solid #404040',
    outline: 'none',
    cursor: 'pointer',
    fontFamily: 'sans-serif',
    boxShadow: isActive ? 'none' : '1px 1px 0 #000'
  });

  // Responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Ensure even dimensions for cleaner rendering
        const width = Math.floor((rect.width - 8) / 2) * 2;
        const height = Math.floor((rect.height - 8) / 2) * 2;
        if (width > 50 && height > 50) {
          setCanvasSize({ width, height });
        }
      }
    };

    updateSize();
    const timer = setTimeout(updateSize, 150);
    window.addEventListener('resize', updateSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Save existing
        const oldData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        // Restore/Clear
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // If we had old data, try to draw it back centered or top-left
        if (oldData.width > 0) {
          ctx.putImageData(oldData, 0, 0);
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [canvasSize]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    // Calculate scaling ratio
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setCanvasSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
    }
  };

  const restoreCanvasState = () => {
    const canvas = canvasRef.current;
    if (canvas && canvasSnapshot) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(canvasSnapshot, 0, 0);
      }
    }
  };

  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const x = Math.floor(startX);
    const y = Math.floor(startY);
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;

    const startIdx = (y * canvas.width + x) * 4;
    const startR = data[startIdx];
    const startG = data[startIdx + 1];
    const startB = data[startIdx + 2];

    // Helper to get fill color components
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillData = tempCtx.getImageData(0, 0, 1, 1).data;
    const [fillR, fillG, fillB] = [fillData[0], fillData[1], fillData[2]];

    // If color matches, nothing to do
    if (startR === fillR && startG === fillG && startB === fillB) return;

    const stack: [number, number][] = [[x, y]];
    const maxIterations = canvas.width * canvas.height; // Safety limit based on size
    let iterations = 0;

    while (stack.length > 0 && iterations < maxIterations) {
      const [px, py] = stack.pop()!;
      iterations++;

      const idx = (py * canvas.width + px) * 4;

      // Check boundaries and color match
      if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;

      // Simple exact match for similarity
      if (data[idx] === startR && data[idx + 1] === startG && data[idx + 2] === startB) {
        // Fill
        data[idx] = fillR;
        data[idx + 1] = fillG;
        data[idx + 2] = fillB;
        data[idx + 3] = 255; // Alpha

        // Add neighbors
        stack.push([px + 1, py], [px - 1, py], [px, py + 1], [px, py - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // e.preventDefault(); // Commented out to allow scrolling if needed on non-canvas areas, but usually handled by touch-action css
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'fill') {
      floodFill(coords.x, coords.y, currentColor);
      return;
    }

    setIsDrawing(true);
    setStartPos(coords);
    saveCanvasState();

    if (currentTool === 'pencil' || currentTool === 'brush' || currentTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
      ctx.lineWidth = currentTool === 'brush' ? brushSize * 3 : currentTool === 'eraser' ? brushSize * 4 : brushSize;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // e.preventDefault();
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (currentTool === 'pencil' || currentTool === 'brush' || currentTool === 'eraser') {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else {
      restoreCanvasState();
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.beginPath();

      if (currentTool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (currentTool === 'rectangle') {
        ctx.strokeRect(startPos.x, startPos.y, coords.x - startPos.x, coords.y - startPos.y);
      } else if (currentTool === 'ellipse') {
        const radiusX = Math.abs(coords.x - startPos.x) / 2;
        const radiusY = Math.abs(coords.y - startPos.y) / 2;
        const centerX = (startPos.x + coords.x) / 2;
        const centerY = (startPos.y + coords.y) / 2;
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleSave = async (toCloud: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (toCloud) {
      if (!isSupabaseConfigured()) {
        setUploadStatus('Supabase not configured! Check .env');
        return;
      }

      setIsUploading(true);
      setUploadStatus('Uploading...');

      try {
        // Convert to blob
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve));
        if (!blob) throw new Error('Canvas empty');

        const fileExt = 'png';
        const filePath = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('drawings')
          .upload(filePath, blob);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('drawings')
          .getPublicUrl(filePath);

        // Insert into table
        const { error: dbError } = await supabase
          .from('drawings')
          .insert([
            { name: fileName, image_url: publicUrl, created_at: new Date() }
          ]);

        if (dbError) throw dbError;

        setUploadStatus('Saved to Cloud!');
      } catch (error: any) {
        console.error('Upload error:', error);
        setUploadStatus(`Error: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Local download/save
      const imageData = canvas.toDataURL('image/png');
      if (onSave) {
        onSave(imageData, fileName);
      } else {
        // Default download behavior
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setShowSaveDialog(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#c0c0c0',
      overflow: 'hidden'
    }}>
      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Left Toolbar - fixed narrow width */}
        <div style={{
          width: '32px',
          background: '#c0c0c0',
          borderRight: '1px solid #808080',
          padding: '3px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          flexShrink: 0
        }}>
          {tools.map(tool => (
            <button
              key={tool.id}
              title={tool.id}
              onClick={() => setCurrentTool(tool.id)}
              style={getButtonStyle(currentTool === tool.id)}
            >
              {tool.label}
            </button>
          ))}

          <div style={{ height: '2px' }} />

          {/* Brush size */}
          {[1, 3, 5].map(size => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              style={getButtonStyle(brushSize === size)}
            >
              <div style={{
                width: `${size * 2 + 2}px`,
                height: `${size * 2 + 2}px`,
                background: brushSize === size ? '#000' : '#000',
                borderRadius: '50%'
              }} />
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflow: 'hidden',
            background: '#808080',
            padding: '4px',
            display: 'flex',
            minWidth: 0
          }}
        >
          <div style={{
            border: '2px inset #404040',
            background: 'white',
            lineHeight: 0,
            flexShrink: 0,
            margin: 'auto'
          }}>
            <canvas
              ref={canvasRef}
              style={{
                cursor: 'crosshair',
                display: 'block',
                touchAction: 'none'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>
      </div>

      {/* Bottom: Color Palette + Buttons */}
      <div style={{
        background: '#c0c0c0',
        borderTop: '1px solid #fff',
        padding: '4px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        flexShrink: 0
      }}>
        {/* Current Color */}
        <div style={{
          width: '24px',
          height: '24px',
          background: currentColor,
          border: '2px inset #808080',
          flexShrink: 0
        }} />

        {/* Color Palette */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {colorPalette.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', gap: '2px' }}>
              {row.map((color, colorIdx) => (
                <div
                  key={colorIdx}
                  style={{
                    width: '18px',
                    height: '18px',
                    background: color,
                    border: '1px solid #808080',
                    boxShadow: 'inset 1px 1px 0 #000',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                  onClick={() => setCurrentColor(color)}
                  onContextMenu={(e) => { e.preventDefault(); setSecondaryColor(color); }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
          <button onClick={clearCanvas} style={{ padding: '2px 8px', fontSize: '11px' }}>Clear</button>
          <button onClick={() => setShowSaveDialog(true)} style={{ padding: '2px 8px', fontSize: '11px' }}>Save</button>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10000
        }}>
          <div className="window" style={{ width: '280px' }}>
            <div className="title-bar">
              <div className="title-bar-text">Save Drawing</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setShowSaveDialog(false)}></button>
              </div>
            </div>
            <div className="window-body" style={{ padding: '12px' }}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>File name:</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              {uploadStatus && (
                <div style={{ marginBottom: '10px', fontSize: '11px', color: uploadStatus.includes('Error') ? 'red' : 'green' }}>
                  {uploadStatus}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  onClick={() => handleSave(true)}
                  disabled={isUploading}
                  title="Upload to Cloud"
                >
                  {isUploading ? '...' : 'Cloud Save'}
                </button>
                <button onClick={() => handleSave(false)}>Local Save</button>
                <button onClick={() => setShowSaveDialog(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoodlePad;