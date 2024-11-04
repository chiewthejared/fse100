let song;
let currentScreen = 0;

// For Screen 1
let circleX1 = 100, circleY1 = 400, xSpeed1 = 1.5, ySpeed1 = 1.5;
let circleX2 = 500, circleY2 = 50, xSpeed2 = -1.2, ySpeed2 = -1.2;
let circleX3 = 150, circleY3 = 350, xSpeed3 = 1.0, ySpeed3 = -1.5;
let circleX4 = 450, circleY4 = 100, xSpeed4 = 1.8, ySpeed4 = 1.2;
let circleX5 = 200, circleY5 = 300, xSpeed5 = -1.3, ySpeed5 = 1.7;
let circleX6 = 400, circleY6 = 150, xSpeed6 = 1.4, ySpeed6 = -1.4;
let circleX7 = 250, circleY7 = 250, xSpeed7 = -1.5, ySpeed7 = 1.3;
let circleX8 = 100, circleY8 = 250, xSpeed8 = 1.5, ySpeed8 = 1.3;

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
  song = loadSound('Menu Music.mp3', () => {
    song.loop();
  });
  
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

  let colors = [
    [4, 55, 242], [0, 71, 171], [137, 207, 240], [65,105,225]
  ];

  // Circle1 (Broken)
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
  nextButton.hide();
}
