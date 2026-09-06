/**
 * Algorithmic generator for organic growing tree & heart-shaped blossom canopy
 */

const BLOSSOM_COLORS = [
  '#f472b6', // pink-400
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
  '#ef4444', // red-500
  '#fb7185', // rose-400
  '#fda4af', // rose-300
  '#fbcfe8', // pink-200
  '#fde047', // yellow-300
  '#fb923c', // orange-400
  '#f97316'  // orange-500
];

// Mathematical heart silhouette parametric formula
function getHeartPoint(t, scale = 12) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

export function generateTreeStructure(width, height) {
  const isMobile = width < 640;
  
  // Position tree trunk on right side (78% mobile / 80% desktop) to keep left side clear for text
  const trunkBaseX = isMobile ? width * 0.78 : width * 0.80;
  const trunkBaseY = height * 0.95;
  const trunkHeight = isMobile ? height * 0.44 : height * 0.50;
  
  // 1. Trunk segments
  const trunk = [];
  const trunkSteps = 25;
  for (let i = 0; i <= trunkSteps; i++) {
    const t = i / trunkSteps;
    const curveOffset = Math.sin(t * Math.PI) * (isMobile ? -12 : -18);
    const x = trunkBaseX + curveOffset;
    const y = trunkBaseY - t * trunkHeight;
    const thickness = (1 - t * 0.6) * (isMobile ? 12 : 16);
    trunk.push({ x, y, thickness });
  }

  const trunkTip = trunk[trunk.length - 1];

  // 2. Main & Secondary Branches
  const branches = [];
  const twigs = [];

  function addBranch(startX, startY, length, angle, depth, maxDepth) {
    const steps = 12;
    const path = [];
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const bend = Math.sin(progress * Math.PI) * (depth % 2 === 0 ? 6 : -6);
      const rad = (angle + bend) * (Math.PI / 180);
      const stepLen = (length / steps);
      currentX += Math.cos(rad) * stepLen;
      currentY += Math.sin(rad) * stepLen;
      const thick = Math.max(1.2, (1 - progress * 0.5) * (7 / depth));
      path.push({ x: currentX, y: currentY, thickness: thick });
    }

    const branchObj = { path, depth };
    if (depth <= 2) {
      branches.push(branchObj);
    } else {
      twigs.push(branchObj);
    }

    if (depth < maxDepth) {
      const endPt = path[path.length - 1];
      const numSplits = depth === 1 ? 3 : 2;
      const angleSpread = 32 + depth * 4;
      
      for (let s = 0; s < numSplits; s++) {
        const splitAngle = angle - angleSpread / 2 + (s / (numSplits - 1 || 1)) * angleSpread + (Math.random() * 8 - 4);
        const splitLen = length * (0.65 + Math.random() * 0.15);
        addBranch(endPt.x, endPt.y, splitLen, splitAngle, depth + 1, maxDepth);
      }
    }
  }

  // Branch out from trunk tip towards canopy
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 65 : 90, -110, 1, 3);
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 60 : 85, -70, 1, 3);
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 50 : 70, -135, 1, 3);

  // 3. Heart Blossoms Canopy Generation
  const blossoms = [];
  const canopyCenterX = trunkTip.x - (isMobile ? 8 : 12);
  const canopyCenterY = trunkTip.y - (isMobile ? 75 : 110);
  const heartScale = isMobile ? 6.5 : 8.8;

  const totalBlossoms = isMobile ? 280 : 400;

  for (let i = 0; i < totalBlossoms; i++) {
    // Distribute inside parametric heart
    let hx, hy;
    if (i < totalBlossoms * 0.35) {
      // Outline of the heart
      const t = (i / (totalBlossoms * 0.35)) * Math.PI * 2;
      const pt = getHeartPoint(t, heartScale);
      hx = pt.x + (Math.random() - 0.5) * 10;
      hy = pt.y + (Math.random() - 0.5) * 10;
    } else {
      // Interior fill with rejection sampling inside heart bounds
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 50) {
        attempts++;
        const rx = (Math.random() - 0.5) * 32 * heartScale;
        const ry = (Math.random() - 0.5) * 32 * heartScale;
        // Test if inside approximate heart silhouette
        const normX = rx / (16 * heartScale);
        const normY = -ry / (13 * heartScale);
        if (Math.abs(normX) <= 1 && normY >= -1 && normY <= 1.2) {
          hx = rx;
          hy = ry;
          valid = true;
        }
      }
      if (!valid) {
        hx = (Math.random() - 0.5) * 18 * heartScale;
        hy = (Math.random() - 0.5) * 18 * heartScale;
      }
    }

    const color = BLOSSOM_COLORS[Math.floor(Math.random() * BLOSSOM_COLORS.length)];
    const size = (Math.random() * 5 + 5) * (isMobile ? 0.85 : 1);
    const rotation = (Math.random() - 0.5) * 60;
    
    // Reveal sequence based on distance from center/bottom
    const distFromCenter = Math.sqrt(hx * hx + hy * hy);
    const delay = distFromCenter * 8 + Math.random() * 400;

    blossoms.push({
      x: canopyCenterX + hx,
      y: canopyCenterY + hy,
      size,
      rotation,
      color,
      delay,
      opacity: 0,
      scale: 0
    });
  }

  return {
    trunk,
    branches,
    twigs,
    blossoms,
    canopyCenter: { x: canopyCenterX, y: canopyCenterY }
  };
}
