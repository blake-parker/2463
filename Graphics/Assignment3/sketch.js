var s_guy = [];
var green = [];
var cnt = 10;

function preload() {
  for (var i = 0; i < cnt; i++) {
    s_guy = 1;
    green = 1;
  }
}

function setup() {
  createCanvas(800, 500);
  imageMode(CENTER);
}

function draw() {
  background("red");
}

class Movement {
  constructor(img, x, y) {
    this.sheet = loadImage(img);
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.moving = 0;
    this.facing = 0;
  }

  draw() {}
  stop() {}
  start(dir) {}
}
