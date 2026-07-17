import React from 'react';

// Generates a deterministic functional-looking QR code
export function QRCodeSVG() {
  const size = 21; // 21x21 modules
  
  // Deterministic random for consistent pattern
  const random = (seed: number) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const getModule = (x: number, y: number) => {
    // Finder patterns (top-left, top-right, bottom-left)
    if (x < 7 && y < 7) return true;
    if (x > size - 8 && y < 7) return true;
    if (x < 7 && y > size - 8) return true;
    
    // Timing patterns
    if (x === 6 || y === 6) return x % 2 === 0 || y % 2 === 0;

    // Pseudo-random data modules
    return random(x * 100 + y) > 0.5;
  };

  const drawFinder = (cx: number, cy: number) => {
    return (
      <g>
        <rect x={cx} y={cy} width={7} height={7} fill="black" />
        <rect x={cx + 1} y={cy + 1} width={5} height={5} fill="white" />
        <rect x={cx + 2} y={cy + 2} width={3} height={3} fill="black" />
      </g>
    );
  };

  const modules = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // skip finder pattern areas
      const isFinder = (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
      if (!isFinder && getModule(x, y)) {
        modules.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="black" />);
      }
    }
  }

  return (
    <svg 
      width="104" 
      height="104" 
      viewBox="-1 -1 23 23" 
      className="bg-white rounded"
      shapeRendering="crispEdges"
    >
      {drawFinder(0, 0)}
      {drawFinder(size - 7, 0)}
      {drawFinder(0, size - 7)}
      {modules}
    </svg>
  );
}
