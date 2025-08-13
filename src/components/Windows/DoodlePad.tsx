import React, { useState, useRef, useEffect } from 'react';

const DoodlePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);

  const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#808080'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Initialize canvas with white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set drawing properties
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

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

  return (
    <div style={{ padding: '8px' }}>
      <div className="field-row" style={{ marginBottom: '8px' }}>
        <fieldset>
          <legend>Drawing Tools</legend>
          <div style={{ 
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Color Palette */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '10px' }}>Color:</span>
              {colors.map(color => (
                <div
                  key={color}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color,
                    border: currentColor === color ? '2px solid #fff' : '1px solid #808080',
                    cursor: 'pointer',
                    boxShadow: currentColor === color ? '0 0 0 2px #000' : 'none'
                  }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>

            {/* Brush Size */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <label style={{ fontSize: '10px' }}>Size:</label>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                style={{ width: '60px' }}
              />
              <span style={{ fontSize: '10px', minWidth: '20px' }}>{brushSize}px</span>
            </div>

            {/* Clear Button */}
            <button onClick={clearCanvas} style={{ padding: '4px 8px' }}>
              Clear Canvas
            </button>
          </div>
        </fieldset>
      </div>

      {/* Drawing Canvas */}
      <div className="field-row">
        <fieldset>
          <legend>Drawing Area</legend>
          <div style={{ 
            padding: '8px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              style={{
                border: '2px inset #c0c0c0',
                cursor: 'crosshair',
                background: 'white'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </fieldset>
      </div>

      <div style={{ 
        marginTop: '8px', 
        fontSize: '10px', 
        color: '#666',
        textAlign: 'center'
      }}>
        💡 Click and drag to draw! Use the color palette and brush size controls above.
      </div>
    </div>
  );
};

export default DoodlePad;