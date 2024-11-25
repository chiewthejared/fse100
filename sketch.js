let currentScreen = 0;

// For Menus
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

function setup() {
  createCanvas(600, 450);
  
  playButton = createButton('Play');
  playButton.position(240, 200);
  playButton.mousePressed(() => {
    playMenuButtonSound();
    goToScreen2();
  });
  
  quitToMenuButton = createButton('Quit');
  quitToMenuButton.position(240, 300);
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
  
  if (currentScreen === 0 || currentScreen === 1) {
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

  let colors = [
    [4, 55, 242], [0, 71, 171], [137, 207, 240], [65,105,225]
  ];

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
}
  
function screen2() {
  // GAME SELECT SCREEN - JARED
  background(100, 149, 237);
  
    let colors = [
    [4, 55, 242], [0, 71, 171], [137, 207, 240], [65,105,225]
  ];

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
}

function screen3() {
  // MAZE GAME
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
  }
}

// Shape Game
function screen4() {
  background(100, 105, 105);
  
  fill(255);
  textSize(35);
  text('Motor Skill 2 Screen', 200, 200);
  
  playButton.hide();
  quitToGameSelectButton.hide();
  quitToMenuButton.show();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.show();
}


function screen5() {
  background(100, 105, 105);
  
  fill(255);
  textSize(35);
  text('Motor Skill 3 Screen', 200, 200);

  
  playButton.hide();
  quitToGameSelectButton.show();
  quitToGameSelectButton.position(450, 350);
  quitToMenuButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.show();
}

function screen6() {
  background('#FDE791');
  
  fill(0);
  textSize(35);
  text('Congrats On Learning How To', 300, 120);
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
}
