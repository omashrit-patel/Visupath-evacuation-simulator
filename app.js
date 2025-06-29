import { aStar } from "./utils/astar.js";
import { bfs } from './utils/bfs.js';
import { dijkstra } from './utils/dijkstra.js';
import { dfs } from './utils/dfs.js';



let fires = new Set();

const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

const rows = 20;
const cols = 20;
const cellSize = canvas.width / cols;

let person = { x: 0, y: 0 };
let walls = new Set();
let exits = new Set();

function cellKey(x, y) {
  return `${x},${y}`;
}
let agents = [];

function generateAgents(count) {
  agents = [];
  while (agents.length < count) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    const key = cellKey(x, y);
    if (!walls.has(key) && !exits.has(key)) {
      agents.push({ x, y });
    }
  }
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let key = cellKey(col, row);

      if (walls.has(key)) {
  ctx.fillStyle = "black";
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
} else if (exits.has(key)) {
  ctx.fillStyle = "green";
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
} else if (fires.has(key)) {
  ctx.fillStyle = "red";
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

ctx.strokeStyle = "#ccc";
ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);

    }
  }

  drawAgents()
}

function drawAgents() {
  for (let agent of agents) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(
      agent.x * cellSize + cellSize / 2,
      agent.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
function animateAll(paths, pathColor = "blue") {
  let i = 0;
  const maxLen = Math.max(...paths.map(p => p.length));
  const alive = new Array(agents.length).fill(true);
  const deadPositions = new Array(agents.length).fill(null); // 🆕 Store death tile

  const interval = setInterval(() => {
    drawGrid();

    for (let j = 0; j < agents.length; j++) {
      if (!alive[j]) continue;

      if (i < paths[j].length) {
        const next = paths[j][i];
        const key = cellKey(next.x, next.y);

        if (fires.has(key)) {
          alive[j] = false;
          deadPositions[j] = { ...next };
          continue;
        }

        // 🆕 Color the tile as part of the path
        if (pathColor) {
  ctx.fillStyle = pathColor;
  ctx.fillRect(next.x * cellSize, next.y * cellSize, cellSize, cellSize);
}


        agents[j] = next;
      }
    }

    

    // Draw frozen death tiles
    for (let j = 0; j < deadPositions.length; j++) {
      const pos = deadPositions[j];
      if (pos) {
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pos.x * cellSize + 5, pos.y * cellSize + 5);
        ctx.lineTo((pos.x + 1) * cellSize - 5, (pos.y + 1) * cellSize - 5);
        ctx.moveTo((pos.x + 1) * cellSize - 5, pos.y * cellSize + 5);
        ctx.lineTo(pos.x * cellSize + 5, (pos.y + 1) * cellSize - 5);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    }

    i++;
    if (i >= maxLen) {
      clearInterval(interval);

      let survivors = 0;
      let dead = 0;

      for (let j = 0; j < agents.length; j++) {
        const pos = agents[j];
        const key = cellKey(pos.x, pos.y);
        if (fires.has(key)) {
          dead++;
        } else if (exits.has(key)) {
          survivors++;
        }
      }

      setTimeout(() => {
        alert(
          `Evacuation Report:\n` +
          `🟢 Survivors: ${survivors}\n` +
          `☠️ Dead: ${dead}\n` +
          `🚶 Total Agents: ${agents.length}`
        );
        // Update Stats Panel
document.getElementById("statAlgorithm").textContent = selectedAlgorithm.toUpperCase();
document.getElementById("statTotal").textContent = agents.length;
document.getElementById("statSurvivors").textContent = survivors;
document.getElementById("statDead").textContent = dead;
document.getElementById("statSteps").textContent = maxLen;

      }, 100);
    }
  }, 100);
}



function spreadFire() {
  const newFires = new Set(fires);
  for (const key of fires) {
    const [x, y] = key.split(',').map(Number);
    const neighbors = [
      [x + 1, y], [x - 1, y],
      [x, y + 1], [x, y - 1],
    ];

    for (const [nx, ny] of neighbors) {
      const nKey = cellKey(nx, ny);
      if (
        nx >= 0 && nx < cols && ny >= 0 && ny < rows &&
        !walls.has(nKey) && !exits.has(nKey) && !fires.has(nKey)
      ) {
        newFires.add(nKey);
      }
    }
  }
  fires = newFires;
  drawGrid();
}


document.addEventListener("keydown", (e) => {
  let newX = person.x;
  let newY = person.y;

  if (e.key === "ArrowUp" && person.y > 0) newY--;
  if (e.key === "ArrowDown" && person.y < rows - 1) newY++;
  if (e.key === "ArrowLeft" && person.x > 0) newX--;
  if (e.key === "ArrowRight" && person.x < cols - 1) newX++;

  if (!walls.has(cellKey(newX, newY))) {
    person.x = newX;
    person.y = newY;
  }

  drawGrid();
});

canvas.addEventListener("contextmenu", (e) => e.preventDefault());

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);
  const key = cellKey(x, y);

  if (e.shiftKey && e.button === 0) {
    // 🔥 Shift + Left click → add fire
    if (!walls.has(key) && !exits.has(key)) {
      fires.add(key);
    }
  } else if (e.button === 0) {
    // Left click → toggle wall
    if (walls.has(key)) walls.delete(key);
    else if (!(x === person?.x && y === person?.y)) walls.add(key);
  } else if (e.button === 2) {
    // Right click → toggle exit
    if (exits.has(key)) exits.delete(key);
    else if (!(x === person?.x && y === person?.y)) exits.add(key);
  }

  drawGrid();
});

generateAgents(10);
drawGrid();
document.getElementById("resetBtn").addEventListener("click", () => {
  const fixWalls = document.getElementById("fixWalls").checked;
  const agentInput = document.getElementById("agentCount");
  const agentCount = parseInt(agentInput.value) || 10;

  if (!fixWalls) {
    walls.clear();
  }

  exits.clear();
  fires.clear();

  generateAgents(agentCount);
  drawGrid();
});



setInterval(spreadFire, 1500); // Fire spreads every 1.5 seconds

function animatePath(path) {
  if (!path || path.length === 0) return;

  let i = 0;
  const interval = setInterval(() => {
    person = path[i];
    drawGrid();
    i++;
    if (i >= path.length) clearInterval(interval);
  }, 100);
}

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    const algo = document.getElementById("algorithm").value;
    window.selectedAlgorithm = algo;  // Make it globally accessible


    const allPaths = agents.map(agent => {
      if (algo === "astar") return aStar(agent, exits, walls, rows, cols) || [];
      if (algo === "bfs") return bfs(agent, exits, walls, rows, cols) || [];
      if (algo === "dijkstra") return dijkstra(agent, exits, walls, rows, cols) || [];
      if (algo === "dfs") return dfs(agent, exits, walls, rows, cols) || [];
      return [];
    });

    const pathColor = {
      astar: "blue",
      bfs: "yellow",
      dijkstra: "green",
      dfs: "red"
    }[algo];

    const showPaths = document.getElementById("showPaths").checked;

    console.log("Paths:", allPaths);
    console.log("Path Color:", pathColor);
    console.log("Show Paths:", showPaths);

    const hasAtLeastOnePath = allPaths.some(p => p.length > 0);
    if (!hasAtLeastOnePath) {
      alert("No path found for any agent!");
      return;
    }

    animateAll(allPaths, showPaths ? pathColor : null);
  }
});



