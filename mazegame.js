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
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let cellSize = 50;
let playerPos = [1, 1];  // Player's starting position (row, col)
let start = [1, 1];  // Start position
let finish = [7, 8];  // End position
let message = "Move the red to the blue";

function setup() {
  createCanvas(500, 500);
  frameRate(10);
  textAlign(CENTER);
}

function draw() {
  background(255);
  drawMaze();
  drawStartFinish();
  drawPlayer();
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

function drawPlayer() {
  let [row, col] = playerPos;
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
  let [row, col] = playerPos;

  // Determine the new position based on the key pressed
  if (keyCode === UP_ARROW && row > 0 && maze[row - 1][col] === 0) {
    playerPos = [row - 1, col];  // Move up
  } else if (keyCode === DOWN_ARROW && row < maze.length - 1 && maze[row + 1][col] === 0) {
    playerPos = [row + 1, col];  // Move down
  } else if (keyCode === LEFT_ARROW && col > 0 && maze[row][col - 1] === 0) {
    playerPos = [row, col - 1];  // Move left
  } else if (keyCode === RIGHT_ARROW && col < maze[row].length - 1 && maze[row][col + 1] === 0) {
    playerPos = [row, col + 1];  // Move right
  }
  
  // Check if the player has reached the finish
  if (playerPos[0] === finish[0] && playerPos[1] === finish[1]) {
    message = "You win!";
  }
}

