let score;
let timer;
let state = 0;
let speed = 1;
let sheet;
let bugs = [];
let playing = false;
let fx = new Tone.Players({
  bg: "Background.mp3",
  Squish: "Squish.mp3",
  miss: "Miss.mp3",
  lose: "Lose.wav",
  win: "Win.wav",
});
fx.player("bg").volume.value = -15;
fx.toDestination();
let test;

function preload() {
  sheet = loadImage("Roach.png");
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
  angleMode(DEGREES);
  timer = new Timer("Time remaining:", 2, 25);
  score = new Score(650, 25);
  textSize(25);
  squish = new Tone.Synth().toDestination();
  for (let i = 0; i <= 10; i++) {
    let r1 = random(0, 100);
    let r2, r3;
    if (r1 <= 50) {
      r2 = random(0, -100);
      r3 = 1;
    } else {
      r2 = random(800, 900);
      r3 = -1;
    }
    bugs[i] = new Bug(sheet, 40, 40, r2, random(26, 490), 6, r3);
  }
}

function draw() {
  background("white");
  if (state === 0) {
    text("Bug Squish Game!", 325, 250);
    text('Press "Space" to start!', 300, 300);
  } else if (state === 1) {
    timer.draw();
    timer.start();
    score.draw();
    bugs.forEach((e) => {
      e.draw();
    });
    if (timer.getTimer() <= 0) {
      timer.stop(score.getScore());
      state += 1;
    }
  } else if (state === 2) {
    text("Game Over!", 350, 250);
    text(`Your score was ${score.getScore()}`, 325, 300);
  }
}

function keyPressed() {
  if (keyCode === 32 && state === 0) {
    fx.player("bg").start();
    fx.player("bg").loop = true;
    state += 1;
  }
}

function mousePressed() {
  let hitBug = false;
  bugs.forEach((e) => {
    let bugArea = 30;
    if (
      e.dx - bugArea < mouseX &&
      mouseX < e.dx + bugArea &&
      e.dy - bugArea < mouseY &&
      mouseY < e.dy + bugArea &&
      !e.dead
    ) {
      e.move = 0;
      e.dead = true;
      fx.player("Squish").start();
      score.incScore(1);
      speed++;
      let r1 = random(0, 100);
      let r2, r3;
      if (r1 <= 50) {
        r2 = random(0, -100);
        r3 = 1;
      } else {
        r2 = random(800, 900);
        r3 = -1;
      }
      bugs.push(new Bug(sheet, 40, 40, r2, random(26, 490), 6, r3));
      console.log("hit");
      hitBug = true;
    }
  });
  if (!hitBug) {
    fx.player("miss").start();
  }
}

class Bug {
  constructor(spriteSheet, sw, sh, dx, dy, aLen, move) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.aLen = aLen;
    this.curFrame = 0;
    this.move = move;
    this.xDir = 1;
    this.dead = false;
    this.counter = 0;
  }

  draw() {
    if (this.move != 0) {
      this.u = this.curFrame % this.aLen;
    } else {
      this.u = 0;
    }

    push();
    translate(this.dx, this.dy);
    scale(this.xDir, 1);
    if (this.move <= -1) rotate(-90);
    if (this.move >= 1) rotate(90);
    if (this.dead === true) {
      if (frameCount % 60 === 0) {
        this.counter++;
      }
      if (this.counter >= 3) {
        image(
          this.spriteSheet,
          0,
          0,
          this.sw,
          this.sh,
          280,
          0,
          this.sw,
          this.sh
        );
      } else {
        image(
          this.spriteSheet,
          0,
          0,
          this.sw,
          this.sh,
          240,
          0,
          this.sw,
          this.sh
        );
      }
    } else {
      image(
        this.spriteSheet,
        0,
        0,
        this.sw,
        this.sh,
        this.u * this.sw,
        this.v * this.sh,
        this.sw,
        this.sh
      );
    }

    pop();
    if (frameCount % 6 === 0) {
      this.curFrame++;
    }
    this.dx += this.move * speed;
    if (this.dx > 900) {
      this.dx = 0;
    } else if (this.dx < -100) {
      this.dx = 800;
    }
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

  stop(x) {
    fx.player("bg").stop();
    if (x <= 9) {
      fx.player("lose").start();
    } else {
      fx.player("win").start();
    }
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

  getScore() {
    return this.curScore;
  }
}
