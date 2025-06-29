// utils/helpers.js

// Exported function to create a grid key like "x,y"
export function cellKey(x, y) {
  return `${x},${y}`;
}

// Exported Manhattan heuristic (used by A*)
export function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
