let score;
let timer;

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  timer = new Timer("Time remaining:", 2, 25);
  score = new Score(700, 25);
  textSize(25);
}

function draw() {
  background("white");
  timer.draw();
  timer.start();
  score.draw();
}

class Bug {
  constructor(image, x, y, speed) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    image(this.image, this.x, this.y);
  }

  stop() {
    this.speed = 0;
  }
}

class Timer {
  constructor(text, posX, posY) {
    this.text = text;
    this.x = posX;
    this.y = posY;
    this.timer = 30;
    this.started = true;
  }

  draw() {
    text(`${this.text} ${this.timer}`, this.x, this.y);
  }

  getTimer() {
    return this.timer;
  }

  start() {
    if (frameCount % 60 === 0 && this.timer > 0 && this.started) {
      this.timer--;
    }
  }

  stop() {
    this.started = false;
  }
}

class Score {
  constructor(posX, posY) {
    this.curScore = 0;
    this.x = posX;
    this.y = posY;
  }

  draw() {
    text(`Score: ${this.curScore}`, this.x, this.y);
  }

  incScore(amt) {
    this.curScore += amt;
  }
}
