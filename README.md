# 🏃 VisuPath: AI-Powered Evacuation Simulator

VisuPath is a real-time interactive evacuation simulation that visualizes how multiple agents escape a burning building using core **DSA pathfinding algorithms** like A*, BFS, DFS, and Dijkstra.

Built using **JavaScript**, **HTML5 Canvas**, and strong **algorithmic design**, this simulator demonstrates real-world applications of DSA in smart building systems and robotics.

---

## 🌐 Live Demo  
👉 [Launch Simulation](https://omashrit-patel.github.io/Visupath-evacuation-simulator/)

> Works on **desktop** and **mobile browsers**

---

## ✨ Features

- ✅ **Multiple Pathfinding Algorithms**: A*, BFS, DFS, Dijkstra
- 🔥 **Fire Spread** Simulation
- 🚪 **Custom Exit Placement**
- 👥 **Multiple Agent Spawning**
- 🚧 **Wall Locking Mode**
- 🔄 **Reset + Replay System**
- 📊 **Dynamic Stats Panel**
- 🎨 **Color-coded Path Visualization**
- ✅ **Toggle Path Visibility**
- 📱 Mobile-Friendly UI

---

## 🧠 Algorithms Used

Each agent uses one of the following algorithms to find the nearest exit:

| Algorithm  | Strategy                           | Time Complexity |
|------------|------------------------------------|-----------------|
| A*         | Greedy + Heuristic + Cost (Optimal) | `O(E)` with heap |
| BFS        | Uninformed search (Shortest path)  | `O(V + E)`      |
| DFS        | Depth-first, not optimal           | `O(V + E)`      |
| Dijkstra   | Cost-based optimal path            | `O(V + E log V)`|

All implementations are built from scratch without libraries to demonstrate pure DSA usage.

---

## 🧪 How to Use the Simulator

| Action | Mouse / Keyboard | Function |
|--------|------------------|----------|
| 🟦 Place Wall | Left-click | Creates a wall on grid |
| 🔥 Place Fire | Hold `Shift` + Left-click | Places lava/fire |
| 🚪 Set Exit | Hold `Ctrl` + Left-click | Sets an exit tile |
| 🔄 Reset Grid | Click `🔄 Reset Simulation` | Clears grid (respects wall lock) |
| 🎯 Run Algorithm | Press `Spacebar` | Starts evacuation |
| ✅ Lock Walls | Enable checkbox | Preserves walls after reset |
| 📍 Toggle Path Color | Use dropdown + checkbox | Changes path color or hides it |
| 👥 Set Agent Count | Dropdown before running | Changes number of agents |

---

## 📊 Stats Panel

After every simulation, you get a performance summary:

- `🟢 Survivors` – agents that reached exits
- `☠️ Dead` – agents that got caught in fire
- `🚶 Total` – total agents in simulation

---

## 📸 Screenshots

> *(Replace the link with your uploaded image later)*

![image](https://github.com/user-attachments/assets/3c5c2c63-68cf-4655-80ab-0f8b6e8fa4f0)

---

## 🧱 Project Structure

├── index.html # Main HTML page
├── style.css # Styling and layout
├── app.js # Grid setup, animation, control logic
├── utils/
│ ├── astar.js
│ ├── bfs.js
│ ├── dfs.js
│ ├── dijkstra.js
│ └── helpers.js # Utility functions (keys, heuristic, etc.)


---

## 📈 Future Ideas

- Export/Import grid state (JSON)
- Add camera/agent POV simulation
- Step-by-step debugging for algorithms
- etc.

---

## 👨‍💻 Author

**Om Ashrit Patel**  
BTech CSE (AI/ML) | Final Year  
💡 Interested in solving real-world problems with AI, automation, and DSA  
📫 [LinkedIn](https://www.linkedin.com/in/omashritpatel)

---

## 📄 License

This project is open-source and available under the MIT License.

---

> ⭐ If you found this project interesting, star it and share it. Feedback welcome!




