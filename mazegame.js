function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let cellSize = 50;
let path = [
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
  [6, 7],
  [5, 7],
  [4, 7],
  [3, 7],
  [2, 7],
  [2, 6],
  [1, 6],
  [0, 6],
];
let animalIndex = 0;
let start = [6, 0];
let finish = [0, 6];
let message = "";

function setup() {
  createCanvas(500, 500);
  frameRate(2);
  textAlign(CENTER);
}

function draw() {
  background(255);
  drawMaze();
  drawStartFinish();
  drawAnimal();
  drawMessage();
}

function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      fill(maze[row][col] === 1 ? 0 : 255); // black for walls, white for paths
      rect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }
}

function drawStartFinish() {
  fill(0, 255, 0);
  ellipse(
    start[1] * cellSize + cellSize / 2,
    start[0] * cellSize + cellSize / 2,
    cellSize / 2
  );
  fill(0, 0, 255);
  ellipse(
    finish[1] * cellSize + cellSize / 2,
    finish[0] * cellSize + cellSize / 2,
    cellSize / 2
  );

  fill(0);
  textSize(16);
  text(
    "Start",
    start[1] * cellSize + cellSize / 2,
    start[0] * cellSize + cellSize + 20
  );
  text(
    "End",
    finish[1] * cellSize + cellSize / 2,
    finish[0] * cellSize + cellSize + 20
  );
}

function drawAnimal() {
  let [row, col] = path[animalIndex];
  fill(255, 0, 0);
  ellipse(
    col * cellSize + cellSize / 2,
    row * cellSize + cellSize / 2,
    cellSize / 2
  );
}

function drawMessage() {
  fill(0);
  textSize(16);
  text(message, width / 2, height - 20);
}

function keyPressed() {
  let newIndex = animalIndex; // Start with current index
  if (keyCode === UP_ARROW) {
    newIndex = animalIndex - 1; // Move up in the path
  } else if (keyCode === DOWN_ARROW) {
    newIndex = animalIndex + 1; // Move down in the path
  }

  // Ensure the new index is within the bounds of the path
  if (newIndex >= 0 && newIndex < path.length) {
    let [nextRow, nextCol] = path[newIndex];

    // Check if the next position is a wall (1) or a path (0)
    if (maze[nextRow][nextCol] === 0) {
      animalIndex = newIndex; // Update the animal's position
      message = ""; // Clear message
    } else {
      message = "Invalid Move!"; // Set error message
    }
  } else {
    message = "Invalid Move!"; // If out of bounds
  }
}
