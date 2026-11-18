import React, { useEffect, useRef } from 'react';
import { generateTreeStructure } from './treeGenerator';

function BirthdayTreeComponent({ onGrowthComplete }) {
  const canvasRef = useRef(null);
  const onGrowthCompleteRef = useRef(onGrowthComplete);

  // Keep latest callback reference without triggering canvas animation restart
  useEffect(() => {
    onGrowthCompleteRef.current = onGrowthComplete;
  }, [onGrowthComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let startTime = null;
    let hasNotifiedGrowth = false;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || canvas.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      return { width: w, height: h };
    };

    let { width, height } = updateDimensions();
    let treeData = generateTreeStructure(width, height);

    const handleResize = () => {
      const dims = updateDimensions();
      width = dims.width;
      height = dims.height;
      treeData = generateTreeStructure(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Draw single 3D heart blossom on canvas
    function drawHeartBlossom(x, y, size, color, scale, rotation, opacity) {
      if (scale <= 0.01 || opacity <= 0.01) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.globalAlpha = opacity;

      ctx.fillStyle = color;
      ctx.shadowBlur = 5;
      ctx.shadowColor = color;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      ctx.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();

      // Specular highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(-size * 0.22, 0, size * 0.16, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Main animation loop
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, width, height);

      // Organic growth timing
      const trunkProgress = Math.min(1, elapsed / 1200);
      const branchProgress = Math.min(1, Math.max(0, (elapsed - 900) / 1400));
      const twigProgress = Math.min(1, Math.max(0, (elapsed - 1800) / 1000));
      const blossomProgress = Math.min(1, Math.max(0, (elapsed - 2400) / 2600));

      // 1. Draw Connected Solid Wood Trunk
      const trunkLen = treeData.trunk.length;
      const visibleTrunkCount = Math.floor(trunkLen * trunkProgress);

      if (visibleTrunkCount > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#3b1c10';

        for (let i = 0; i < visibleTrunkCount - 1; i++) {
          const p1 = treeData.trunk[i];
          const p2 = treeData.trunk[i + 1];
          ctx.lineWidth = p1.thickness;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Draw trunk base footing anchor
        ctx.fillStyle = '#3b1c10';
        const base = treeData.trunk[0];
        ctx.beginPath();
        ctx.arc(base.x, base.y, base.thickness / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 2. Draw Connected Branches
      if (branchProgress > 0) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#4a2517';

        treeData.branches.forEach((b) => {
          const count = Math.floor(b.path.length * branchProgress);
          if (count > 1) {
            for (let i = 0; i < count - 1; i++) {
              const p1 = b.path[i];
              const p2 = b.path[i + 1];
              ctx.lineWidth = p1.thickness;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
        ctx.restore();
      }

      // 3. Draw Connected Twigs
      if (twigProgress > 0) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#5c2d1b';

        treeData.twigs.forEach((t) => {
          const count = Math.floor(t.path.length * twigProgress);
          if (count > 1) {
            for (let i = 0; i < count - 1; i++) {
              const p1 = t.path[i];
              const p2 = t.path[i + 1];
              ctx.lineWidth = p1.thickness;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
        ctx.restore();
      }

      // 4. Draw Heart Blossoms Canopy
      if (blossomProgress > 0) {
        const timeOffset = elapsed - 2400;
        treeData.blossoms.forEach((b) => {
          if (timeOffset >= b.delay) {
            const localProgress = Math.min(1, (timeOffset - b.delay) / 600);
            const scale = Math.sin(localProgress * Math.PI * 0.5);
            const opacity = Math.min(1, localProgress * 1.2);
            drawHeartBlossom(b.x, b.y, b.size, b.color, scale, b.rotation, opacity);
          }
        });
      }

      // 5. Floating Drifting Heart Petals after blossoming
      if (blossomProgress >= 1) {
        if (!hasNotifiedGrowth) {
          hasNotifiedGrowth = true;
          if (onGrowthCompleteRef.current) {
            onGrowthCompleteRef.current();
          }
        }

        const drift = Math.sin(elapsed * 0.0015) * 4;
        treeData.blossoms.slice(0, 16).forEach((b, idx) => {
          const floatY = (elapsed * 0.025 + idx * 28) % (height * 0.45);
          drawHeartBlossom(
            b.x + Math.sin(floatY * 0.05) * 8 + drift,
            b.y + floatY,
            b.size * 0.75,
            b.color,
            0.65,
            b.rotation + floatY,
            0.55
          );
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []); // Run animation loop ONCE on mount, NEVER reset on parent re-renders!

  return (
    <div className="relative h-full w-full pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export const BirthdayTree = React.memo(BirthdayTreeComponent);
