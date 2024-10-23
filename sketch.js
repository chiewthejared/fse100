function setup() {
  createCanvas(600, 450);
  
}

function preload(){
  whale = loadImage('whale.png');
}

function draw() {
  background(100, 149, 237);
  
  // Game Name
  textSize(80);
  fill(255);
  stroke(0);
  strokeWeight(0);
  textStyle(BOLD);
  text('Game Name', 70, 140);
  
  // Play rectangle
  fill(194, 167, 137);
  stroke(150, 102, 2);
  strokeWeight(4);
  rect(222.5, 190, 147.5, 85, 20);
  
  // Play
  fill(255);
  textSize(50);
  strokeWeight(0);
  textStyle(NORMAL);
  text('Play', 250, 250);
  
  // Play rectangle
  fill(194, 167, 137);
  stroke(150, 102, 2);
  strokeWeight(4);
  rect(230, 290, 135, 65, 20);
  
  // Quit
  fill(255);
  textSize(50);
  strokeWeight(0);
  textStyle(NORMAL);
  text('Quit', 250, 340);
  
  image(whale, 10, 10, 900, 3600); 
  // image(nameOfImage, x, y, length, width)

}