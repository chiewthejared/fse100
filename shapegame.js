let shapes = [];
let shapeNames = ["Circle", "Square", "Triangle", "Rectangle", "Oval", "Pentagon"];
let currentShape;
let gameState = "prompt"; // prompt, correct, or next
let nextButton1;
let popUpVisible = false;
let confettiParticles = [];
let popUpTimer = 0; // Timer for showing the pop-up message
let score = 0;
let gameWon = false;

function setup() {
  createCanvas(600, 450);
  generateShapes();
  pickRandomShape();

  nextButton1 = createButton('Next Shape');
  nextButton1.position(width - 120, height - 60);
  nextButton1.size(100, 40);
  nextButton1.mousePressed(nextRound);
  nextButton1.style('background-color', color(random(255), random(255), random(255)));
  nextButton1.style('color', 'white');
  nextButton1.style('font-size', '16px');
  nextButton1.hide(); // Initially hide the button
}

function draw() {
  background(200, 240, 270);
  
  if (gameWon) {
    displayWinMessage();
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
    generateConfetti();
    displayConfetti();
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

function generateConfetti() {
  if (confettiParticles.length === 0) {
    for (let i = 0; i < 100; i++) {
      confettiParticles.push({
        x: random(width),
        y: random(height),
        size: random(5, 10),
        xSpeed: random(-1, 1),
        ySpeed: random(1, 3),
        color: color(random(255), random(255), random(255)),
      });
    }
  }
}

function displayConfetti() {
  for (let p of confettiParticles) {
    fill(p.color);
    noStroke();
    ellipse(p.x, p.y, p.size);
    p.x += p.xSpeed;
    p.y += p.ySpeed;

    if (p.y > height) {
      p.y = 0;
    }
  }
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
  text("Score: " + score, 570, 40);
}

function displayWinMessage() {
  noStroke();
  textSize(68);
  fill(0, 128, 0);
  textAlign(CENTER);
  text("You Win!", width / 2, height / 2);
  generateConfetti();
  displayConfetti();
  nextButton1.hide();
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
         score++;
        if (score === 10) {
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
  confettiParticles = [];
}
