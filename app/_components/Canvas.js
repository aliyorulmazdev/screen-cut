"use client"
import { useState, useEffect, useRef } from 'react';

function ScissorsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  );
}

const CanvasComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const canvasWidth = 297 * 3.779527559055; // 297mm to pixels
  const canvasHeight = 210 * 3.779527559055; // 210mm to pixels

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw scissors icon
      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(((rotation % 360) + 360) % 360 * Math.PI / 180); // Ensure rotation stays within 360 degrees
      ctx.fillStyle = 'red'; // Change color if needed

      ctx.fill();
      ctx.restore();
    };

    const updateCanvas = () => {
      draw();
      requestIdRef.current = requestAnimationFrame(updateCanvas);
    };

    requestIdRef.current = requestAnimationFrame(updateCanvas);

    const handleMouseMove = (e) => {
      const canvasBounds = canvas.getBoundingClientRect();
      let x = e.clientX - canvasBounds.left;
      let y = e.clientY - canvasBounds.top;

      // Limiting icon position to stay inside canvas
      x = Math.max(0, Math.min(canvas.width, x));
      y = Math.max(0, Math.min(canvas.height, y));

      setPosition({ x, y });
    };

    const handleKeyDown = (e) => {
      if (e.key === 'r') {
        setRotation((prevRotation) => prevRotation + 90);
      } else if (e.key === ' ') {
        setShowAlert(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(requestIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rotation]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid black' }}
      />
      <div
        style={{           
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) rotate(${rotation % 360}deg)`,
        }}
      >
        <ScissorsIcon className="w-16 h-16 text-gray-800 dark:text-gray-200" />
      </div>
      {showAlert && (
        <div>
          <p>Rotation: {rotation % 360}</p>
          <p>Start Point: ({position.x}, {position.y})</p>
        </div>
      )}
    </div>
  );
};

export default CanvasComponent;
