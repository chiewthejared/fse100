let currentScreen = 0;

// For Screen 1
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

  skill1Button = createButton('Motor Skill 1');
  skill1Button.position(150, 90);
  skill1Button.mousePressed(goToScreen4);
  skill1Button.hide(); // Start hidden

  skill2Button = createButton('Motor Skill 2');
  skill2Button.position(150, 180);
  skill2Button.mousePressed(goToScreen5);
  skill2Button.hide(); 

  skill3Button = createButton('Motor Skill 3');
  skill3Button.position(150, 270);
  skill3Button.mousePressed(goToScreen6);
  skill3Button.hide(); 
  
  nextButton = createButton('Next');
  nextButton.position(30,350);
  nextButton.mousePressed(goToScreen7);
  nextButton.hide();
}

function preload(){
  whale = loadImage('whale.png');
  giraffe = loadImage('giraffe.png')
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
function goToScreen7(){
  currentScreen = 6;
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
  } else if (currentScreen === 6) {
      screen7();
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
  push(); 
  rotate(QUARTER_PI / 4);
  image(whale, 450, 100, 180, 180);
  pop(); 
  // Giraffe Image
  push(); 
  image(giraffe, 30, 190, 175, 165);
  pop(); 
  
  
  playButton.show();
  quitButton.show();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
}
  
function screen2() {
  background('pink');
  
  fill(255);
  textSize(35);
  text('Game Name', 190, 60);

 
  playButton.hide();
  quitButton.show();
  quitButton.position(240, 360);
  // Show skill buttons
  skill1Button.show();
  skill2Button.show();
  skill3Button.show();
  
  push(); 
  rotate(QUARTER_PI / 4);
  image(whale, 500, 5, 120, 120);
  pop();
  
  push(); 
  image(giraffe, 5, 190, 145, 135);
  pop();
}

//Quit Screen
function screen3() {
  background('maroon');
  
  fill(255);
  textSize(35);
  text('Bye!', 200, 200);

  // Hide all buttons
  playButton.hide();
  quitButton.hide();
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
}

function screen4() {
  background(100, 105, 105);
  
  fill(255);
  textSize(35);
  text('Motor Skill 1 Screen', 150, 50);

  
  playButton.hide();
  quitButton.show();
  quitButton.position(450, 350);
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.show();
}

function screen5() {
  background(100, 105, 105);
  
  fill(255);
  textSize(35);
  text('Motor Skill 2 Screen', 200, 200);

  
  playButton.hide();
  quitButton.show();
  quitButton.position(450, 350);
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.show();
}

function screen6() {
  background(100, 105, 105);
  
  fill(255);
  textSize(35);
  text('Motor Skill 3 Screen', 200, 200);

  
  playButton.hide();
  quitButton.show();
  quitButton.position(450, 350);
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
  nextButton.show();
}

function screen7() {
   background('#FDE791');
  
  fill(0);
  textSize(35);
  text('Congrats On Learning How To', 50, 100);
  text('Motor Skill', 200, 200)

  
  playButton.hide();
  quitButton.show();
  quitButton.position(450, 350);
  skill1Button.hide();
  skill2Button.hide();
  skill3Button.hide();
}
