import React, { useRef, useEffect, useCallback } from 'react';

interface MatrixRainProps {
    duration?: number; // Duration in milliseconds
    onComplete: () => void;
}

interface Column {
    x: number;
    y: number;
    speed: number;
    chars: string[];
    opacity: number;
}

// Characters to use in the rain (mix of katakana, numbers, and symbols)
const MATRIX_CHARS =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
    '0123456789' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '∂∆∏∑∫√∞≈≠≤≥' +
    '{}[]<>|/\\~`!@#$%^&*()';

const MatrixRain: React.FC<MatrixRainProps> = ({
    duration = 3000,
    onComplete
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const columnsRef = useRef<Column[]>([]);
    const animationRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const fadeOutRef = useRef<boolean>(false);
    const globalOpacityRef = useRef<number>(1);

    // Get random character from the character set
    const getRandomChar = useCallback(() => {
        return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    }, []);

    // Initialize columns - with higher density
    const initColumns = useCallback((width: number, fontSize: number) => {
        // Use tighter spacing (0.7x font size) for more columns/density
        const columnSpacing = fontSize * 0.7;
        const columnCount = Math.ceil(width / columnSpacing) + 10; // Extra columns for density
        const columns: Column[] = [];

        for (let i = 0; i < columnCount; i++) {
            // Create initial characters for the column trail - longer trails
            const trailLength = Math.floor(Math.random() * 25) + 15;
            const chars: string[] = [];
            for (let j = 0; j < trailLength; j++) {
                chars.push(getRandomChar());
            }

            columns.push({
                x: i * columnSpacing,
                y: Math.random() * -300 - 20, // Start closer to top for faster appearance
                speed: Math.random() * 5 + 3, // Faster speed between 3-8
                chars,
                opacity: Math.random() * 0.4 + 0.6 // Higher opacity 0.6-1
            });
        }

        return columns;
    }, [getRandomChar]);

    // Main animation loop
    const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, fontSize: number) => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTimeRef.current;

        // Start fade out in the last 500ms
        if (elapsed > duration - 500 && !fadeOutRef.current) {
            fadeOutRef.current = true;
        }

        // Update global opacity for fade out
        if (fadeOutRef.current) {
            globalOpacityRef.current = Math.max(0, 1 - (elapsed - (duration - 500)) / 500);
        }

        // Check if animation should end
        if (elapsed >= duration) {
            cancelAnimationFrame(animationRef.current);
            onComplete();
            return;
        }

        // Draw semi-transparent black rectangle to create trail effect
        ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
        ctx.fillRect(0, 0, width, height);

        // Update and draw columns
        columnsRef.current.forEach((column) => {
            // Randomly change characters
            if (Math.random() < 0.03) {
                const charIndex = Math.floor(Math.random() * column.chars.length);
                column.chars[charIndex] = getRandomChar();
            }

            // Draw each character in the column with gradient opacity
            column.chars.forEach((char, charIndex) => {
                const y = column.y - charIndex * fontSize;

                // Only draw if on screen
                if (y > -fontSize && y < height + fontSize) {
                    // Calculate opacity based on position in trail
                    const trailOpacity = 1 - (charIndex / column.chars.length);
                    const finalOpacity = column.opacity * trailOpacity * globalOpacityRef.current;

                    // First character (head) is brighter/white-ish
                    if (charIndex === 0) {
                        ctx.fillStyle = `rgba(180, 255, 180, ${finalOpacity})`;
                        ctx.shadowColor = '#00ff00';
                        ctx.shadowBlur = 10;
                    } else {
                        // Trail characters are green with varying intensity
                        const green = Math.floor(200 + (55 * trailOpacity));
                        ctx.fillStyle = `rgba(0, ${green}, 0, ${finalOpacity * 0.8})`;
                        ctx.shadowBlur = 0;
                    }

                    ctx.fillText(char, column.x, y);
                }
            });

            // Move column down
            column.y += column.speed;

            // Reset column when it goes off screen
            if (column.y - column.chars.length * fontSize > height) {
                column.y = Math.random() * -200 - 50;
                column.speed = Math.random() * 3 + 2;
                column.opacity = Math.random() * 0.5 + 0.5;

                // Regenerate characters
                for (let j = 0; j < column.chars.length; j++) {
                    column.chars[j] = getRandomChar();
                }
            }
        });

        // Continue animation
        animationRef.current = requestAnimationFrame(() =>
            animate(ctx, width, height, fontSize)
        );
    }, [duration, onComplete, getRandomChar]);

    // Setup canvas and start animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fontSize = 12; // Smaller font for higher density

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Reinitialize columns on resize
            columnsRef.current = initColumns(canvas.width, fontSize);

            // Set font
            ctx.font = `${fontSize}px monospace`;
        };

        // Initial setup
        handleResize();
        window.addEventListener('resize', handleResize);

        // Fill initial black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Start animation
        startTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(() =>
            animate(ctx, canvas.width, canvas.height, fontSize)
        );

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [animate, initColumns]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 10000,
                backgroundColor: '#000000'
            }}
        />
    );
};

export default MatrixRain;
