import React, { useEffect, useRef } from 'react';
import { generateTreeStructure } from './treeGenerator';

export function BirthdayTree({ onGrowthComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let startTime = null;

    let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

    let treeData = generateTreeStructure(width, height);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
      treeData = generateTreeStructure(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Draw single 3D heart blossom on canvas
    function drawHeartBlossom(x, y, size, color, scale, rotation, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.globalAlpha = opacity;

      ctx.fillStyle = color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = color;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Top left curve
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      // Top right curve
      ctx.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();

      // Subtle specular highlight on top left
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(-size * 0.25, 0, size * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Main animation loop
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, width, height);

      // Stage timing breakdown (total ~ 7.5 seconds of organic growth)
      // 0 - 1.5s: Trunk
      // 1.5 - 3.2s: Branches
      // 3.2 - 4.2s: Twigs
      // 4.2 - 7.5s: Heart blossoms bloom into canopy
      const trunkProgress = Math.min(1, elapsed / 1500);
      const branchProgress = Math.min(1, Math.max(0, (elapsed - 1400) / 1800));
      const twigProgress = Math.min(1, Math.max(0, (elapsed - 3000) / 1200));
      const blossomProgress = Math.min(1, Math.max(0, (elapsed - 4000) / 3200));

      // 1. Draw Trunk
      ctx.fillStyle = '#3b1c10'; // Dark reddish brown
      ctx.strokeStyle = '#2a1209';
      ctx.lineWidth = 1;

      const visibleTrunkCount = Math.floor(treeData.trunk.length * trunkProgress);
      for (let i = 0; i < visibleTrunkCount; i++) {
        const pt = treeData.trunk[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.thickness / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Branches
      if (branchProgress > 0) {
        treeData.branches.forEach((b) => {
          const count = Math.floor(b.path.length * branchProgress);
          for (let i = 0; i < count; i++) {
            const pt = b.path[i];
            ctx.beginPath();
            ctx.fillStyle = '#4a2517';
            ctx.arc(pt.x, pt.y, pt.thickness / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // 3. Draw Twigs
      if (twigProgress > 0) {
        treeData.twigs.forEach((t) => {
          const count = Math.floor(t.path.length * twigProgress);
          for (let i = 0; i < count; i++) {
            const pt = t.path[i];
            ctx.beginPath();
            ctx.fillStyle = '#5c2d1b';
            ctx.arc(pt.x, pt.y, pt.thickness / 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // 4. Draw Heart Blossoms Canopy
      if (blossomProgress > 0) {
        const timeOffset = elapsed - 4000;
        treeData.blossoms.forEach((b) => {
          if (timeOffset >= b.delay) {
            const localProgress = Math.min(1, (timeOffset - b.delay) / 600);
            // Elastic pop ease out
            const scale = Math.sin(localProgress * Math.PI * 0.5);
            const opacity = Math.min(1, localProgress * 1.2);
            drawHeartBlossom(b.x, b.y, b.size, b.color, scale, b.rotation, opacity);
          }
        });
      }

      // Floating heart petals drift after growth completes
      if (blossomProgress >= 1) {
        const drift = Math.sin(elapsed * 0.0015) * 3;
        treeData.blossoms.slice(0, 15).forEach((b, idx) => {
          const floatY = (elapsed * 0.02 + idx * 30) % (height * 0.5);
          drawHeartBlossom(
            b.x + Math.sin(floatY * 0.05) * 10 + drift,
            b.y + floatY,
            b.size * 0.8,
            b.color,
            0.7,
            b.rotation + floatY,
            0.6
          );
        });

        if (onGrowthComplete && typeof onGrowthComplete === 'function') {
          onGrowthComplete();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [onGrowthComplete]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
