import { cellKey } from './helpers.js';

export function bfs(start, goals, walls, rows, cols) {
  const queue = [[start]];
  const visited = new Set([cellKey(start.x, start.y)]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const key = cellKey(current.x, current.y);

    if (goals.has(key)) return path;

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
        visited.add(nKey);
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}
