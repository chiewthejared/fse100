let colors = [
  { name: "Red", value: [255, 0, 0] },
  { name: "Green", value: [0, 255, 0] },
  { name: "Blue", value: [0, 0, 255] },
  { name: "Yellow", value: [255, 255, 0] },
  { name: "Orange", value: [255, 165, 0] },
  { name: "Brown", value: [165, 42, 42] },
];
function preload(){
whale = loadImage('whale.png');
giraffe = loadImage('giraffe.png')
}

let currentColor = [200, 200, 200]; 
let targetColor; 
let score = 0;
let rounds = 0; // Track the number of rounds
let message = ""; // Message to display for feedback
let gameStarted = true; // Game starts immediately when the page loads

function setup() {
  createCanvas(600, 450);
  pickNewColor(); // Pick the first color for the game
}

function draw() {
  background(200, 240, 270); // RGB values for a pale green color

  if (gameStarted) {
    drawShape();
    drawColors();
    drawScore();
    drawMessage();
  } else {
    window.open("index.html", "_blank");
    restartGame() ;
  }
}

function drawShape() {
  // Whale Image
  push();
  image(whale, 35, 120, 170, 170);
  pop(); 
  // Giraffe Image
  push(); 
  image(giraffe, 420, 135, 155, 145);
  pop(); 
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

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i].value);
    rect(startX + i * (swatchSize + 10), startY, swatchSize, swatchSize);
  }
}

function mousePressed() {
  if (gameStarted && rounds < 10) {
    let startX = 125;
    let startY = 315;
    let swatchSize = 50;

    for (let i = 0; i < colors.length; i++) {
      if (
        mouseX > startX + i * (swatchSize + 10) &&
        mouseX < startX + i * (swatchSize + 10) + swatchSize &&
        mouseY > startY &&
        mouseY < startY + swatchSize
      ) {
        if (colors[i].name.toLowerCase() === targetColor.toLowerCase()) {
          currentColor = colors[i].value; // Set the shape's color to the correct one
          score++;
          rounds++; // Increment rounds after correct choice
          pickNewColor(); // Pick a new color for the next round
          message = "Correct! Well done!";
          

          // If 10 rounds are reached, show confetti and end the game
          if (rounds === 10) {
            message = "Game Over! Your score: " + score;
            gameStarted = false; // Stop the game
            confettiActive = true; // Start the confetti effect
            // Generate confetti particles
            generateConfetti();
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
  targetColor = colors[randomIndex].name; // Set the color name the user needs to choose
}

function drawScore() {
  fill(0);
  textSize(20);
  text("Score: " + score, width - 70, 40);
}


function restartGame() {
  // Reset all the game variables to their initial values
  score = 0;
  rounds = 0;
  currentColor = [200, 200, 200];
  message = "";
  confettiParticles = [];
  confettiActive = false;
  gameStarted = true;

  // Pick a new color to start the next round
  pickNewColor();
}
