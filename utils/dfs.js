import { cellKey } from './helpers.js';

export function dfs(start, goals, walls, rows, cols) {
  const stack = [[start]];
  const visited = new Set([cellKey(start.x, start.y)]);

  while (stack.length > 0) {
    const path = stack.pop();
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
        stack.push([...path, neighbor]);
      }
    }
  }

  return null;
}
