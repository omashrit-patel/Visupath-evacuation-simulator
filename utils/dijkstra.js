import { cellKey } from './helpers.js';

export function dijkstra(start, goals, walls, rows, cols) {
  const visited = new Set();
  const dist = new Map();
  const prev = new Map();

  const key = cellKey(start.x, start.y);
  dist.set(key, 0);

  const queue = [{ ...start, key, cost: 0 }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.cost - b.cost); // Min-heap emulation
    const current = queue.shift();
    const curKey = current.key;

    if (visited.has(curKey)) continue;
    visited.add(curKey);

    if (goals.has(curKey)) {
      // Reconstruct path
      const path = [];
      let nodeKey = curKey;
      while (nodeKey) {
        const [x, y] = nodeKey.split(',').map(Number);
        path.unshift({ x, y });
        nodeKey = prev.get(nodeKey);
      }
      return path;
    }

    const neighbors = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ];

    for (const neighbor of neighbors) {
      const nKey = cellKey(neighbor.x, neighbor.y);
      if (
        neighbor.x >= 0 && neighbor.x < cols &&
        neighbor.y >= 0 && neighbor.y < rows &&
        !walls.has(nKey) &&
        !visited.has(nKey)
      ) {
        const alt = dist.get(curKey) + 1;
        if (alt < (dist.get(nKey) || Infinity)) {
          dist.set(nKey, alt);
          prev.set(nKey, curKey);
          queue.push({ ...neighbor, key: nKey, cost: alt });
        }
      }
    }
  }

  return null; // No path
}
