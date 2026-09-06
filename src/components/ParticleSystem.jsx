import React, { useEffect, useRef } from 'react';

export function ParticleSystem({ type = 'stars', active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const count = type === 'fireworks' ? 70 : type === 'blossoms' ? 35 : 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: type === 'fireworks' ? Math.random() * 3.5 + 1.5 : Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * (type === 'fireworks' ? 4 : 0.6),
        vy: type === 'blossoms' ? Math.random() * 1.2 + 0.5 : type === 'fireworks' ? (Math.random() - 0.5) * 4 : Math.random() * -0.5 - 0.2,
        opacity: Math.random() * 0.7 + 0.3,
        color: type === 'blossoms'
          ? ['#f472b6', '#fb7185', '#fda4af', '#fecdd3'][Math.floor(Math.random() * 4)]
          : type === 'fireworks'
          ? ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)]
          : '#ffffff'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (type === 'blossoms') {
          p.x += Math.sin(p.y * 0.02) * 0.5;
        }

        // Wrap around borders
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (type === 'blossoms') {
          // Draw tiny heart petal particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type, active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
