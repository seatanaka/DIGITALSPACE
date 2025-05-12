let modes = ["sunset", "storm", "rain", "snow"];
let currentModeIndex = 0;
let particles = [];
let flashAlpha = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
  textSize(20);
  textAlign(CENTER, CENTER);
}

function draw() {
  drawSky();
  drawLabel();
  updateParticles();
  displayParticles();
}

function mousePressed() {
  currentModeIndex = (currentModeIndex + 1) % modes.length;
}

function getMode() {
  return modes[currentModeIndex];
}

function drawSky() {
  let mode = getMode();

  if (mode === "sunset") {
    background(255, 140, 100);
    fill(255, 220, 0);
    ellipse(width - 100, 100, 80, 80); // sun
  } else if (mode === "storm") {
    background(50, 50, 70);
    if (frameCount % 120 === 0) flashAlpha = 150;
    if (flashAlpha > 0) {
      fill(255, 255, 255, flashAlpha);
      rect(0, 0, width, height);
      flashAlpha -= 10;
    }
  } else if (mode === "rain") {
    background(80, 100, 140);
  } else if (mode === "snow") {
    background(220);
  }
}

function drawLabel() {
  fill(0, 100);
  rect(width / 2 - 70, height - 60, 140, 30, 10);
  fill(255);
  text(getMode().toUpperCase(), width / 2, height - 45);
}

function updateParticles() {
  let mode = getMode();
  if (frameCount % 2 === 0) {
    for (let i = 0; i < 4; i++) {
      if (mode === "rain") {
        particles.push(new Particle(random(width), 0, "rain"));
      } else if (mode === "snow") {
        particles.push(new Particle(random(width), 0, "snow"));
      }
    }
  }
}

function displayParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].offscreen()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = type === "snow" ? random(3, 6) : 2;
    this.speed = type === "snow" ? random(0.5, 1.5) : random(4, 7);
  }

  update() {
    this.y += this.speed;
    if (this.type === "snow") {
      this.x += sin(this.y * 0.01);
    }
  }

  display() {
    if (this.type === "snow") {
      fill(255);
      ellipse(this.x, this.y, this.size);
    } else if (this.type === "rain") {
      stroke(180, 180, 255);
      line(this.x, this.y, this.x, this.y + 10);
      noStroke();
    }
  }

  offscreen() {
    return this.y > height;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
