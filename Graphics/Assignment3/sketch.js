let sheets = [
  "SpelunkyGuy.png",
  "Green.png",
  "Blue.png",
  "Cyan.png",
  "Cyclops.png",
  "Viking.png",
  "Golden_Monk.png",
];
let loadedSheets = [];
let animations = [];
function preload() {
  sheets.forEach((e) => {
    loadedSheets.push(loadImage(e));
  });
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);

  loadedSheets.forEach((e) => {
    animations.push(
      new Person(e, 80, 80, random(300, 500), random(100, 400), 9)
    );
  });
}

function draw() {
  background("white");
  animations.forEach((e) => {
    e.draw();
  });
}

function keyPressed() {
  animations.forEach((e) => {
    e.keyPressed();
  });
}

function keyReleased() {
  animations.forEach((e) => {
    e.keyReleased();
  });
}

class Person {
  constructor(spriteSheet, sw, sh, dx, dy, aLen) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.aLen = aLen;
    this.curFrame = 0;
    this.move = 0;
    this.xDir = 1;
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
    pop();
    if (frameCount % 6 === 0) {
      this.curFrame++;
    }
    this.dx += this.move;
  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.move = 1;
      this.xDir = 1;
      this.curFrame = 1;
    }
    if (keyCode === LEFT_ARROW) {
      this.move = -1;
      this.xDir = -1;
      this.curFrame = 1;
    }
  }

  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      this.move = 0;
    }
  }
}
