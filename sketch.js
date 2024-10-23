let currentScreen = 0;

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

function draw() {
  if(currentScreen === 0) {
    screen1();
  } else if (currentScreen === 1) {
    screen2();
  } else if (currentScreen === 2) {
    screen3();
  }
}

function screen1() {
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
  background(0, 0, 0);
  
  fill(255);
  text('This is screen 2', 250, 250);
  
  playButton.hide();
  quitButton.hide();
}
