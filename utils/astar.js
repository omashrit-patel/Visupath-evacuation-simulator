import { cellKey } from './helpers.js';

export function aStar(start, exits, walls, rows, cols) {
  const openSet = new Set([cellKey(start.x, start.y)]);
  const cameFrom = new Map();

  const gScore = {};
  const fScore = {};

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = cellKey(c, r);
      gScore[k] = Infinity;
      fScore[k] = Infinity;
    }
  }

  const startKey = cellKey(start.x, start.y);
  gScore[startKey] = 0;
  fScore[startKey] = getNearestExitHeuristic(start, exits);

  function getLowestFScore() {
    let lowest = null;
    for (let k of openSet) {
      if (lowest === null || fScore[k] < fScore[lowest]) {
        lowest = k;
      }
    }
    return lowest;
  }

  const getNeighbors = (x, y) => {
    const moves = [
      [0, -1], [0, 1], [-1, 0], [1, 0]
    ];
    return moves
      .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
      .filter(n => (
        n.x >= 0 && n.x < cols &&
        n.y >= 0 && n.y < rows &&
        !walls.has(cellKey(n.x, n.y))
      ));
  };

  while (openSet.size > 0) {
    const currentKey = getLowestFScore();
    const [cx, cy] = currentKey.split(',').map(Number);
    const current = { x: cx, y: cy };

    if (exits.has(currentKey)) {
      // Reconstruct path
      const path = [];
      let k = currentKey;
      while (k !== startKey) {
        const [px, py] = k.split(',').map(Number);
        path.unshift({ x: px, y: py });
        k = cameFrom.get(k);
      }
      return path;
    }

    openSet.delete(currentKey);

    for (const neighbor of getNeighbors(cx, cy)) {
      const neighborKey = cellKey(neighbor.x, neighbor.y);
      const tentativeG = gScore[currentKey] + 1;

      if (tentativeG < gScore[neighborKey]) {
        cameFrom.set(neighborKey, currentKey);
        gScore[neighborKey] = tentativeG;
        fScore[neighborKey] = tentativeG + getNearestExitHeuristic(neighbor, exits);
        openSet.add(neighborKey);
      }
    }
  }

  return null;
}

// Can stay here, or move to helpers.js if reused
function getNearestExitHeuristic(pos, exits) {
  let minDist = Infinity;
  for (const e of exits) {
    const [ex, ey] = e.split(',').map(Number);
    const d = Math.abs(pos.x - ex) + Math.abs(pos.y - ey);
    minDist = Math.min(minDist, d);
  }
  return minDist;
}
