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
function getHeartPoint(t, scale = 10) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
}

export function generateTreeStructure(rawWidth, rawHeight) {
  const width = Math.max(320, rawWidth);
  const height = Math.max(450, rawHeight);
  const isMobile = width < 640;

  // Position tree trunk gracefully on right side to leave left side clear for text
  const trunkBaseX = isMobile ? width * 0.66 : width * 0.70;
  const trunkBaseY = height * 0.94;
  const trunkHeight = isMobile ? height * 0.42 : height * 0.48;

  // 1. Trunk segments (dense connected coordinates)
  const trunk = [];
  const trunkSteps = 30;
  for (let i = 0; i <= trunkSteps; i++) {
    const t = i / trunkSteps;
    // Gentle natural curve
    const curveOffset = Math.sin(t * Math.PI) * (isMobile ? -14 : -18);
    const x = trunkBaseX + curveOffset;
    const y = trunkBaseY - t * trunkHeight;
    const thickness = (1 - t * 0.55) * (isMobile ? 14 : 18);
    trunk.push({ x, y, thickness });
  }

  const trunkTip = trunk[trunk.length - 1];

  // 2. Main & Secondary Branches
  const branches = [];
  const twigs = [];

  function addBranch(startX, startY, length, angle, depth, maxDepth) {
    const steps = 14;
    const path = [];
    let currentX = startX;
    let currentY = startY;

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const bend = Math.sin(progress * Math.PI) * (depth % 2 === 0 ? 5 : -5);
      const rad = (angle + bend) * (Math.PI / 180);
      const stepLen = length / steps;
      currentX += Math.cos(rad) * stepLen;
      currentY += Math.sin(rad) * stepLen;
      const thick = Math.max(1.5, (1 - progress * 0.45) * (8 / depth));
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
      const angleSpread = 30 + depth * 5;

      for (let s = 0; s < numSplits; s++) {
        const splitAngle =
          angle - angleSpread / 2 + (s / (numSplits - 1 || 1)) * angleSpread + (Math.random() * 6 - 3);
        const splitLen = length * (0.68 + Math.random() * 0.12);
        addBranch(endPt.x, endPt.y, splitLen, splitAngle, depth + 1, maxDepth);
      }
    }
  }

  // Branch out from trunk tip towards canopy
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 65 : 85, -108, 1, 3);
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 55 : 75, -68, 1, 3);
  addBranch(trunkTip.x, trunkTip.y, isMobile ? 48 : 65, -138, 1, 3);

  // 3. Heart Blossoms Canopy Generation
  const blossoms = [];
  const canopyCenterX = trunkTip.x;
  const canopyCenterY = trunkTip.y - (isMobile ? 65 : 90);
  const heartScale = isMobile ? 5.2 : 7.2;

  const totalBlossoms = isMobile ? 260 : 380;

  for (let i = 0; i < totalBlossoms; i++) {
    let hx, hy;
    if (i < totalBlossoms * 0.35) {
      // Outline of the heart
      const t = (i / (totalBlossoms * 0.35)) * Math.PI * 2;
      const pt = getHeartPoint(t, heartScale);
      hx = pt.x + (Math.random() - 0.5) * 8;
      hy = pt.y + (Math.random() - 0.5) * 8;
    } else {
      // Interior fill with rejection sampling inside heart bounds
      let valid = false;
      let attempts = 0;
      while (!valid && attempts < 40) {
        attempts++;
        const rx = (Math.random() - 0.5) * 32 * heartScale;
        const ry = (Math.random() - 0.5) * 32 * heartScale;
        const normX = rx / (16 * heartScale);
        const normY = -ry / (13 * heartScale);
        if (Math.abs(normX) <= 1 && normY >= -1 && normY <= 1.2) {
          hx = rx;
          hy = ry;
          valid = true;
        }
      }
      if (!valid) {
        hx = (Math.random() - 0.5) * 16 * heartScale;
        hy = (Math.random() - 0.5) * 16 * heartScale;
      }
    }

    const color = BLOSSOM_COLORS[Math.floor(Math.random() * BLOSSOM_COLORS.length)];
    const size = (Math.random() * 4.5 + 4.5) * (isMobile ? 0.85 : 1);
    const rotation = (Math.random() - 0.5) * 60;

    // Reveal sequence based on distance from trunk connection
    const distFromCenter = Math.sqrt(hx * hx + (hy + 40) * (hy + 40));
    const delay = distFromCenter * 7 + Math.random() * 350;

    blossoms.push({
      x: canopyCenterX + hx,
      y: canopyCenterY + hy,
      size,
      rotation,
      color,
      delay
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
