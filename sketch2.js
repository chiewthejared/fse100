let currentScreen = 0;

// For Menus
let colors = [
    [4, 55, 242], [0, 71, 171], [137, 207, 240], [65,105,225]
  ];
let song;
let circleX1 = 100, circleY1 = 400, xSpeed1 = 1.5, ySpeed1 = 1.5;
let circleX2 = 500, circleY2 = 50, xSpeed2 = -1.2, ySpeed2 = -1.2;
let circleX3 = 150, circleY3 = 350, xSpeed3 = 1.0, ySpeed3 = -1.5;
let circleX4 = 450, circleY4 = 100, xSpeed4 = 1.8, ySpeed4 = 1.2;
let circleX5 = 200, circleY5 = 300, xSpeed5 = -1.3, ySpeed5 = 1.7;
let circleX6 = 400, circleY6 = 150, xSpeed6 = 1.4, ySpeed6 = -1.4;
let circleX7 = 250, circleY7 = 250, xSpeed7 = -1.5, ySpeed7 = 1.3;
let circleX8 = 100, circleY8 = 250, xSpeed8 = 1.5, ySpeed8 = 1.3;

// For Maze Game
let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let cellSize = 50;
let playerPos = [1, 1]; 
let start = [1, 1];
let finish = [7, 10];
let message = "Move the red to the blue";

// For Color Game
let gameColors = [
  { name: "Red", value: [255, 0, 0] },
  { name: "Green", value: [0, 255, 0] },
  { name: "Blue", value: [0, 0, 255] },
  { name: "Yellow", value: [255, 255, 0] },
  { name: "Orange", value: [255, 165, 0] },
  { name: "Brown", value: [165, 42, 42] },
];
let currentColor = [200, 200, 200]; 
let targetColor; 
let colorScore = 0;
let rounds = 0; // Track the number of rounds
let colorGameMessage = ""; // Message to display for feedback
let gameStarted = true; // Game starts immediately when the page loads

// Confetti
let confetti = [];
let confettiColor = ['#ff8b00', '#ff0051', '#ff4db8', '#b5ff8b', '#8bc6ff', '#d8ff8b', '#c38bff', '#ff8b8b'];
class Confetti {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.speed = _s;
    this.time = random(0, 100);
    this.color = random(confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(10, 20);
    this.form = round(random(0, 1));
  }
  confettiDisplay() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
    rotate(this.time);
    rectMode(CENTER);
    scale(cos(this.time / 4), sin(this.time / 4));
    if (this.form === 0) {
      rect(0, 0, this.size, this.size / 2);
    } else {
      ellipse(0, 0, this.size);
    }
    pop();
    this.time += 0.1;
    this.speed += 1 / 200;
    this.y += this.speed;
  }
}

// Screen 6
let hasPlayedScreen6Sound = false;

// Color Game
let shapes = [];
let shapeNames = ["Circle", "Square", "Triangle", "Rectangle", "Oval", "Pentagon"];
let currentShape;
let gameState = "prompt"; // prompt, correct, or next
let nextButton1;
let popUpVisible = false;
let popUpTimer = 0; // Timer for showing the pop-up message
let score1 = 0;
let gameWon = false;

function setup() {
  createCanvas(600, 450);
  
  playButton = createButton('Play');
  playButton.position(240, 200);
  playButton.mousePressed(() => {
    playMenuButtonSound();
    goToScreen2();
  });
  
  quitToMenuButton = createButton('Quit');
  quitToMenuButton.position(340, 300);
  quitToMenuButton.mousePressed(() => {
    playMenuButtonSound();
    goToScreen1();
  });
  
  quitToGameSelectButton = createButton('Quit');
  quitToGameSelectButton.position(240, 300);
  quitToGameSelectButton.mousePressed(() => {
    playMenuButtonSound();
    goToScreen2();
  });

  skill1Button = createButton('Maze Game');
  skill1Button.position(150, 90);
  skill1Button.mousePressed(() => {
    playMenuButtonSound();
    goToScreen3();
  });
  skill1Button.hide();

  skill2Button = createButton('Shape Game');
  skill2Button.position(140, 180);
  skill2Button.mousePressed(() => {
    playMenuButtonSound();
    goToScreen4();
  });
  skill2Button.hide(); 

  skill3Button = createButton('Color Game');
  skill3Button.position(150, 270);
  skill3Button.mousePressed(() => {
    playMenuButtonSound();
    goToScreen5();
  });
  skill3Button.hide(); 
  
  nextButton = createButton('Next');
  nextButton.position(30,350);
  nextButton.mousePressed(() => {
    playMenuButtonSound();
    goToScreen2();
  });
  nextButton.hide();
  
  pickNewColor();
  
  generateShapes();
  pickRandomShape();
  nextButton1 = createButton('Next Shape');
  nextButton1.position(width - 120, height - 80);
  nextButton1.size(100, 60);
  nextButton1.mousePressed(nextRound);
  nextButton1.style('background-color', color(random(255), random(255), random(255)));
  nextButton1.style('color', 'white');
  nextButton1.style('font-size', '16px');
  nextButton1.hide(); // Initially hide the button
}

function preload(){
  menuMusic = loadSound('Menu Music.mp3', () => {
    menuMusic.loop();
  });
  menuButtonMusic = loadSound('Menu Button Music.mp3');
  screen6Sound = loadSound('Complete Sound Effect.mp3');
  gameMusic = loadSound('Game Music.mp3', () => {
    gameMusic.loop();
  });
  whale = loadImage('whale.png');
  giraffe = loadImage('giraffe.png')
}

function goToScreen1() {
  currentScreen = 0;
}

function goToScreen2() {
  currentScreen = 1;
}

function goToScreen3() {
  currentScreen = 2;
}

function goToScreen4() {
  currentScreen = 3;
}

function goToScreen5() {
  currentScreen = 4;
}

function goToScreen6() {
  currentScreen = 5;
}


function draw() {
  if(currentScreen === 0) {
    screen1();
  } else if (currentScreen === 1) {
    screen2();
  } else if (currentScreen === 2) {
    screen3();
  } else if (currentScreen === 3) {
    screen4();
  } else if (currentScreen === 4) {
    screen5();
  } else if (currentScreen === 5) {
    screen6();
  }
  
  if (currentScreen === 0 || currentScreen === 1 || currentScreen === 5) {
    if (!menuMusic.isPlaying()) {
      menuMusic.play();
    }
  } else {
    if (menuMusic.isPlaying()) {
      menuMusic.stop();
    } 
  }
  if (currentScreen === 2 || currentScreen === 3 || currentScreen === 4) {
    if (!gameMusic.isPlaying()) {
      gameMusic.play();
    }
  } else {
    if (gameMusic.isPlaying()) {
      gameMusic.stop();
    } 
  }
}

function playMenuButtonSound() {
  if (menuButtonMusic.isPlaying()) {
    menuButtonMusic.stop();
  }
  menuButtonMusic.play();
}

function screen1() {
  // MAIN MENU SCREEN - JARED
  background(100, 149, 237);

  // Circle1 (Working)
  fill(colors[3]);
  circle(circleX1, circleY1, 150);
  circleX1 += xSpeed1;
  circleY1 += ySpeed1;
  if(circleX1 < 25 || circleX1 > width - 25) xSpeed1 *= -1;
  if(circleY1 < 25 || circleY1 > height - 25) ySpeed1 *= -1;

  // Circle2 (Working)
  fill(colors[1]);
  circle(circleX2, circleY2, 150);
  circleX2 += xSpeed2;
  circleY2 += ySpeed2;
  if(circleX2 < 25 || circleX2 > width - 25) xSpeed2 *= -1;
  if(circleY2 < 25 || circleY2 > height - 25) ySpeed2 *= -1;
  
  // Circle3 (Working)
  fill(colors[1]);
  circle(circleX3, circleY3, 200);
  circleX3 += xSpeed3;
  circleY3 += ySpeed3;
  if(circleX3 < 25 || circleX3 > width - 25) xSpeed3 *= -1;
  if(circleY3 < 25 || circleY3 > height - 25) ySpeed3 *= -1;
  
  // Circle4 (Working)
  fill(colors[2]);
  circle(circleX4, circleY4, 150);
  circleX4 += xSpeed4;
  circleY4 += ySpeed4;
  if(circleX4 < 25 || circleX4 > width - 25) xSpeed4 *= -1;
  if(circleY4 < 25 || circleY4 > height - 25) ySpeed4 *= -1;
  
  // Circle5 (Working)
  fill(colors[2]);
  circle(circleX5, circleY5, 200);
  circleX5 += xSpeed5;
  circleY5 += ySpeed5;
  if(circleX5 < 25 || circleX5 > width - 25) xSpeed5 *= -1;
  if(circleY5 < 25 || circleY5 > height - 25) ySpeed5 *= -1;
  
  // Circle6 (Working)
  fill(colors[0]);
  circle(circleX6, circleY6, 150);
  circleX6 += xSpeed6;
  circleY6 += ySpeed6;
  if(circleX6 < 25 || circleX6 > width - 25) xSpeed6 *= -1;
  if(circleY6 < 25 || circleY6 > height - 25) ySpeed6 *= -1;
  
  // Circle7 (Working)
  fill(colors[0]);
  circle(circleX7, circleY7, 200);
  circleX7 += xSpeed7;
  circleY7 += ySpeed7;
  if(circleX7 < 25 || circleX7 > width - 25) xSpeed7 *= -1;
  if(circleY7 < 25 || circleY7 > height - 25) ySpeed7 *= -1;

  // Circle8 (Working)
  fill(colors[3]);
  circle(circleX8, circleY8, 200);
  circleX8 += xSpeed8;
  circleY8 += ySpeed8;
  if(circleX8 < 25 || circleX8 > width - 25) xSpeed8 *= -1;
  if(circleY8 < 25 || circleY8 > height - 25) ySpeed8 *= -1;
  
  // Game Name
  textSize(80);
  fill(255);
  stroke(0);
  strokeWeight(0);
  textStyle(BOLD);
  textAlign(CENTER);
  text('Tiny Tumbles', 300, 140);
  
  // Whale Image
  push();
  image(whale, 45, 170, 180, 180);
  pop(); 
  // Giraffe Image
  push(); 
  image(giraffe, 400, 190, 175, 165);
  pop(); 
  
  // Subtext(bottom of the screen)
  textSize(10);
  fill(225);
  text('FSE Final Project by Jared, Kevin, Ariana & Gray', 120, 445);
  
  playButton.show();
  quitToMenuButton.hide();
  quitToGameSelectButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.hide();
  nextButton1.hide();
}
  
function screen2() {
  // GAME SELECT SCREEN - JARED
  background(100, 149, 237);
  
  // Circle1 (Working)
  fill(colors[3]);
  circle(circleX1, circleY1, 150);
  circleX1 += xSpeed1;
  circleY1 += ySpeed1;
  if(circleX1 < 25 || circleX1 > width - 25) xSpeed1 *= -1;
  if(circleY1 < 25 || circleY1 > height - 25) ySpeed1 *= -1;

  // Circle2 (Working)
  fill(colors[1]);
  circle(circleX2, circleY2, 150);
  circleX2 += xSpeed2;
  circleY2 += ySpeed2;
  if(circleX2 < 25 || circleX2 > width - 25) xSpeed2 *= -1;
  if(circleY2 < 25 || circleY2 > height - 25) ySpeed2 *= -1;
  
  // Circle3 (Working)
  fill(colors[1]);
  circle(circleX3, circleY3, 200);
  circleX3 += xSpeed3;
  circleY3 += ySpeed3;
  if(circleX3 < 25 || circleX3 > width - 25) xSpeed3 *= -1;
  if(circleY3 < 25 || circleY3 > height - 25) ySpeed3 *= -1;
  
  // Circle4 (Working)
  fill(colors[2]);
  circle(circleX4, circleY4, 150);
  circleX4 += xSpeed4;
  circleY4 += ySpeed4;
  if(circleX4 < 25 || circleX4 > width - 25) xSpeed4 *= -1;
  if(circleY4 < 25 || circleY4 > height - 25) ySpeed4 *= -1;
  
  // Circle5 (Working)
  fill(colors[2]);
  circle(circleX5, circleY5, 200);
  circleX5 += xSpeed5;
  circleY5 += ySpeed5;
  if(circleX5 < 25 || circleX5 > width - 25) xSpeed5 *= -1;
  if(circleY5 < 25 || circleY5 > height - 25) ySpeed5 *= -1;
  
  // Circle6 (Working)
  fill(colors[0]);
  circle(circleX6, circleY6, 150);
  circleX6 += xSpeed6;
  circleY6 += ySpeed6;
  if(circleX6 < 25 || circleX6 > width - 25) xSpeed6 *= -1;
  if(circleY6 < 25 || circleY6 > height - 25) ySpeed6 *= -1;
  
  // Circle7 (Working)
  fill(colors[0]);
  circle(circleX7, circleY7, 200);
  circleX7 += xSpeed7;
  circleY7 += ySpeed7;
  if(circleX7 < 25 || circleX7 > width - 25) xSpeed7 *= -1;
  if(circleY7 < 25 || circleY7 > height - 25) ySpeed7 *= -1;

  // Circle8 (Working)
  fill(colors[3]);
  circle(circleX8, circleY8, 200);
  circleX8 += xSpeed8;
  circleY8 += ySpeed8;
  if(circleX8 < 25 || circleX8 > width - 25) xSpeed8 *= -1;
  if(circleY8 < 25 || circleY8 > height - 25) ySpeed8 *= -1;
  
  // Game Name
  textSize(70);
  fill(255);
  stroke(0);
  strokeWeight(0);
  textStyle(BOLD);
  textAlign(CENTER);
  text('Game Select', 300, 70);
  
  // Whale Image
  push();
  image(whale, 5, 170, 140, 140);
  pop(); 
  // Giraffe Image
  push(); 
  image(giraffe, 450, 190, 175, 165);
  pop(); 

  playButton.hide();
  quitToMenuButton.show();
  quitToMenuButton.position(240, 360);
  quitToGameSelectButton.hide();
  skill1Button.show();
  skill2Button.show();
  skill3Button.show();
  nextButton.hide();
  nextButton1.hide();
}

function screen3() {
  // MAZE GAME
  hasPlayedScreen6Sound = false;
  drawMaze();
  drawStartFinish();
  drawPlayer();
  drawMessage();
  playButton.hide();
  quitToGameSelectButton.hide();
  quitToMenuButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.hide();
  nextButton1.hide();
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
  textSize(18);
  text(
    "Start",
    (start[1] * cellSize + cellSize / 2) + 1.5,
    start[0] * cellSize + cellSize + 20
  );
  fill(255);
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
  fill(255);
  textSize(30);
  text(message, 300, 35);
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
    currentScreen = 5;
    playerPos = [1, 1];
  }
}

function screen4() {
  // COLOR GAME
  background(200, 240, 270);
  hasPlayedScreen6Sound = false;
  
  if (gameStarted) {
    drawShape();
    drawColors();
    drawScore();
    drawMessage();
  } else {
    currentScreen = 5;
  }
  playButton.hide();
  quitToGameSelectButton.hide();
  quitToMenuButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.hide();
  nextButton1.hide();
}

function drawShape() {
  // Draw the circle with the current color
  fill(currentColor);
  ellipse(300, 200, 100, 100); // Shape to be colored

  fill(0);
  textSize(35);
  textAlign(CENTER);
  text("Press The " + targetColor + " Box!", width / 2, 100);
}

function drawColors() {
  let startX = 125;
  let startY = 315;
  let swatchSize = 50;

  for (let i = 0; i < gameColors.length; i++) {
    fill(gameColors[i].value);
    rect(startX + i * (swatchSize + 10), startY, swatchSize, swatchSize);
  }
}

function mousePressed() {
  if (gameStarted && rounds < 10) {
    let startX = 125;
    let startY = 315;
    let swatchSize = 50;

    for (let i = 0; i < gameColors.length; i++) {
      if (
        mouseX > startX + i * (swatchSize + 10) &&
        mouseX < startX + i * (swatchSize + 10) + swatchSize &&
        mouseY > startY &&
        mouseY < startY + swatchSize
      ) {
        if (gameColors[i].name.toLowerCase() === targetColor.toLowerCase()) {
          currentColor = gameColors[i].value; // Set the shape's color to the correct one
          colorScore++;
          rounds++; // Increment rounds after correct choice
          pickNewColor(); // Pick a new color for the next round
          message = "Correct! Well done!";
          

          // If 10 rounds are reached, show confetti and end the game
          if (rounds === 10) {
            message = "Game Over! Your score: " + colorScore;
            gameStarted = false; // Stop the game
            setTimeout(restartGame, 3000); // Restart after 3 seconds (3000 milliseconds)
          }
        } else {
          currentColor = [200, 200, 200]; // Reset color to gray if incorrect
          message = "Try again! That's not the right color.";
        }
        break;
      }
    }
  }
}

function pickNewColor() {
  // Randomly select a new color for the next round
  let randomIndex = floor(random(colors.length));
  targetColor = gameColors[randomIndex].name; // Set the color name the user needs to choose
}

function drawScore() {
  fill(0);
  textSize(20);
  text("Score: " + colorScore, width - 70, 40);
}
function restartGame() {
  // Reset all the game variables to their initial values
  score = 0;
  rounds = 0;
  currentColor = [200, 200, 200];
  message = "";
  gameStarted = true;
  // Pick a new color to start the next round
  pickNewColor();
}


function screen5() {
  background(100, 105, 105);
  hasPlayedScreen6Sound = false;

  
  playButton.hide();
  quitToGameSelectButton.hide();
  quitToGameSelectButton.position(450, 350);
  quitToMenuButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.hide();
  

  background(200, 240, 270);
  
  if (gameWon) {
    currentScreen = 5;
    return; // Stop drawing further game elements
  }

  if (gameState === "prompt") {
    displayShapes();
    displayPrompt();
    displayScore();
    if (popUpVisible) {
      displayPopUpMessage();
    }
  } else if (gameState === "correct") {
    displayShapes();
    displayCorrectMessage();
    displayScore();
    nextButton1.show(); // Show the button after a correct answer
  } else if (gameState === "next") {
    displayNextShapes();
  }
}

function generateShapes() {
  shapes = []; // Reset shapes array
  let cols = 3; 
  let rows = 3; 
  let w = width / cols;
  let h = height / rows;
  
  for (let i = 0; i < shapeNames.length; i++) {
    shapes.push({
      name: shapeNames[i],
      color: color(random(255), random(255), random(255)),
      x: (i % cols) * w + w / 2,
      y: Math.floor(i / cols) * h + h / 2,
      shape: createShape(shapeNames[i])
    });
  }
}

function displayShapes() {
  for (let s of shapes) {
    fill(s.color);
    stroke('black');
    strokeWeight(2.5)
    s.shape(s.x, s.y);
  }
}

function createShape(shapeName) {
  return function(x, y) {
    switch (shapeName) {
      case "Circle":
        ellipse(x, y + 40, 100);
        break;
      case "Square":
        rect(x - 50, y - 10, 100, 100);
        break;
      case "Triangle":
        triangle(x, y - 10, x - 50, y + 80, x + 50, y + 80);
        break;
      case "Rectangle":
        rect(x - 75, y - 20, 150, 100);
        break;
      case "Oval":
        ellipse(x, y + 30, 150, 100);
        break;
      case "Pentagon":
        beginShape();
        for (let i = 0; i < 5; i++) {
          vertex(x + 70 * cos((PI / 3.5) * i), y + 80 * sin((PI / 3.5) * i));
        }
        endShape(CLOSE);
        break;
    }
  };
}

function pickRandomShape() {
  currentShape = random(shapes);
  gameState = "prompt";
  popUpVisible = false;
}

function displayPrompt() {
  noStroke();
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Click on the shape: " + currentShape.name, width / 2, height - 30);
}

function displayCorrectMessage() {
  noStroke();
  textSize(48);
  fill(0, 128, 0);
  textAlign(CENTER);
  text("Correct!", width / 2, height / 1.3);
}


function displayPopUpMessage() {
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER);
  text("Incorrect, please try again!", width / 2, height / 1.3);
}

function displayScore() {
  noStroke();
  textSize(24);
  fill(0);
  textAlign(RIGHT);
  text("Score: " + score1, 570, 40);
}

function mousePressed() {
  if (gameState === "prompt" || gameState === "next") {
    let clickedCorrect = false;
    let clickedWrong = false;
    
    // Check if the user clicked the correct shape
    for (let s of shapes) {
      if (s.name === currentShape.name && isMouseOverShape(s)) {
        clickedCorrect = true;
        gameState = "correct";
        nextButton1.show();
         score1++;
        if (score1 === 10) {
          gameWon = true;
        }
        return;
      }
      if (s.name !== currentShape.name && isMouseOverShape(s)) {
        clickedWrong = true;
      }
    }
    // If the user clicked a wrong shape, show the pop-up message
    if (clickedWrong) {
      popUpVisible = true;
    }
  }
}

function isMouseOverShape(shape) {
  switch (shape.name) {
    case "Circle":
      return dist(mouseX, mouseY, shape.x, shape.y) < 50;
    case "Square":
      return mouseX > shape.x - 50 && mouseX < shape.x + 50 && mouseY > shape.y - 50 && mouseY < shape.y + 50;
    case "Triangle":
      return mouseY > shape.y - 50 && mouseY < shape.y + 50 && mouseX > shape.x - 50 && mouseX < shape.x + 50;
    case "Rectangle":
      return mouseX > shape.x - 75 && mouseX < shape.x + 75 && mouseY > shape.y - 50 && mouseY < shape.y + 50;
    case "Oval":
      return ((pow(mouseX - shape.x, 2) / pow(75, 2)) + (pow(mouseY - shape.y, 2) / pow(50, 2))) <= 1;
    case "Pentagon":
      return mouseY > shape.y - 50 && mouseY < shape.y + 50 && mouseX > shape.x - 50 && mouseX < shape.x + 50;
  }
  return false;
}

function nextRound() {
  generateShapes();
  pickRandomShape();
  gameState = "prompt";
  nextButton1.hide();
  popUpVisible = false;

}

function screen6() {
  background('#FDE791');
  
  fill(0);
  textSize(35);
  text('Level Completed', 300, 120);
  text('Motor Skill!', 300, 200);
  fill(0);
  textSize(20);
  text('Feel Free To Learn The', 300, 280);
  text('Other Motor Skills!', 300, 320);
  
   if (confetti.length < 100) {
    confetti.push(new Confetti(random(width), 0, random(0.5, 2)));
  }
  for (let c of confetti) {
    c.confettiDisplay();
    if (c.y > height) {
      confetti.splice(confetti.indexOf(c), 1); 
    }
  }
  push(); 
  rotate(QUARTER_PI / 4);
  image(whale, 470, 60, 170, 170);
  pop();
  
  push(); 
  image(giraffe, 2, 250, 175, 165);
  pop();
  
  if (!hasPlayedScreen6Sound) {
    screen6Sound.play();
    hasPlayedScreen6Sound = true;
  }
  
  playButton.hide();
  quitToGameSelectButton.show();
  quitToGameSelectButton.position(450, 350);
  quitToMenuButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.hide();
  nextButton1.hide();
}
