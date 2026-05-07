import React, { useRef, useEffect } from 'react';

export default function LaserFlow({ color = "#FF79C6" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const lines = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 300 + 100,
      speed: Math.random() * 2 + 1,
      opacity: Math.random()
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;

      lines.forEach(line => {
        ctx.beginPath();
        ctx.globalAlpha = line.opacity;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y - line.length / 2);
        ctx.stroke();

        line.x += line.speed;
        line.y -= line.speed / 2;

        if (line.x > canvas.width || line.y < 0) {
          line.x = -line.length;
          line.y = Math.random() * canvas.height + line.length;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}