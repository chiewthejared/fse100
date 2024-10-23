let currentScreen = 0;
let circleX = 100;
let circleY = 0;
let xSpeed = 1.5;
let ySpeed = 1.5;

function setup() {
  createCanvas(600, 450);
  
  playButton = createButton('Play');
  playButton.position(240, 200);
  playButton.mousePressed(goToScreen2);
  
  quitButton = createButton('Quit');
  quitButton.position(240, 300);
  quitButton.mousePressed(goToScreen3);
}

function preload(){
  whale = loadImage('whale.png');
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
}

function screen1() {
  // MAIN MENU SCREEN - JARED
  background(100, 149, 237);

  fill(0, 0, 250); // MAKE DARK BLUE
  circle(circleX, circleY, 200);
  circleX = circleX + xSpeed;
  circleY = circleY + ySpeed;
  if(circleX < 35 || circleX > width - 35) {
    xSpeed = xSpeed * - 1;
  }
  if(circleY < 0 || circleY > height - 35) {
    ySpeed = ySpeed * - 1;
  }
  
  // Game Name
  textSize(80);
  fill(255);
  stroke(0);
  strokeWeight(0);
  textStyle(BOLD);
  text('Game Name', 70, 140);
  
  // Whale Image
  rotate(QUARTER_PI / 4);
  image(whale, 450, 100, 144+36, 144+36); 
  // image(nameOfImage, x, y, length, width)
  
  playButton.show();
  quitButton.show();

  background(100, 149, 237);
  
  // Game Name
  textSize(80);
  fill(255);
  stroke(0);
  strokeWeight(0);
  textStyle(BOLD);
  text('Game Name', 70, 140);
  
  // Whale Image
  rotate(QUARTER_PI / 4);
  image(whale, 450, 100, 144+36, 144+36); 
  // image(nameOfImage, x, y, length, width)
  
  playButton.show();
  quitButton.show();  
}
  
function screen2() {
  // SELECT GAME SCREEN - KEVIN
  background(0, 0, 0);
  
  fill(255);
  text('This is screen 2', 250, 250);
  
  playButton.hide();
  quitButton.hide();
}

function screen3() {
  // GAME 1 - ARIANNA
}

function screen4() {
  // GAME 2 - GRAY
}

function screen5() {
  // GAME 3 - 
}

function screen6() {
  // RESULTS SCREEN - JARED
}
