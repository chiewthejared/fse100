let shapes = [];
let shapeNames = ["Circle", "Square", "Triangle", "Rectangle", "Oval", "Pentagon"];
let currentShape;
let gameState = "prompt"; // prompt, correct, or next
let nextButton;
let popUpVisible = false;
let confettiParticles = [];
let popUpTimer = 0; // Timer for showing the pop-up message

function setup() {
  createCanvas(700, 600);
  generateShapes();
  pickRandomShape();

  nextButton = createButton('Next Shape');
  nextButton.position(width - 120, height - 60);
  nextButton.size(100, 40);
  nextButton.mousePressed(nextRound);
  nextButton.style('background-color', color(random(255), random(255), random(255)));
  nextButton.style('color', 'white');
  nextButton.style('font-size', '16px');
  nextButton.hide(); // Initially hide the button
}

function draw() {
  background(240);

  stroke(200);
  strokeWeight(1); 
  let stripeSpacing = 20;
  for (let i = 0; i <= height; i += stripeSpacing) {
    line(0, i, width, i);
  }

  if (gameState === "prompt") {
    displayShapes();
    displayPrompt();
    if (popUpVisible) {
      displayPopUpMessage();
    }
  } else if (gameState === "correct") {
    displayShapes();
    displayCorrectMessage();
    generateConfetti();
    displayConfetti();
    nextButton.show(); // Show the button after a correct answer
  } else if (gameState === "next") {
    displayNextShapes();
  }
}

function generateShapes() {
  shapes = []; // Reset shapes array
  let cols = 3; 
  let rows = 2; 
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
    noStroke();
    s.shape(s.x, s.y);
  }
}

function createShape(shapeName) {
  return function(x, y) {
    switch (shapeName) {
      case "Circle":
        ellipse(x, y, 100);
        break;
      case "Square":
        rect(x - 50, y - 50, 100, 100);
        break;
      case "Triangle":
        triangle(x, y - 50, x - 50, y + 50, x + 50, y + 50);
        break;
      case "Rectangle":
        rect(x - 75, y - 50, 150, 100);
        break;
      case "Oval":
        ellipse(x, y, 150, 100);
        break;
      case "Pentagon":
        beginShape();
        for (let i = 0; i < 5; i++) {
          vertex(x + 50 * cos((PI / 5) * i), y + 50 * sin((PI / 5) * i));
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
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Click on the shape: " + currentShape.name, width / 2, height - 30);
}

function displayCorrectMessage() {
  textSize(48);
  fill(0, 128, 0);
  textAlign(CENTER);
  text("Correct!", width / 2, height / 2);
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
  text("Incorrect, please try again!", width / 2, height / 2);
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
        nextButton.show();
        popUpVisible = false; // Hide pop-up on correct answer
        return; // Exit function when the correct shape is clicked
      }
      // If the user clicks any incorrect shape, show the "Incorrect" pop-up
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
  nextButton.hide();
  popUpVisible = false;
  confettiParticles = [];
}
