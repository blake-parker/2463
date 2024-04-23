let ball;
let floor;

function setup() {
  createCanvas(800, 500);
  world.gravity.y = 3;
  ball = new Sprite();
  ball.diameter = 50;
  ball.y = 30;
  floor = new Sprite();
  floor.y = 490;
  floor.w = 800;
  floor.h = 5;
  floor.collider = "static";
}

function draw() {
  background(220);
  inputs();
}

function inputs() {
  if (kb.pressing("left")) {
    ball.vel.x = -2;
  } else if (kb.pressing("right")) {
    ball.vel.x = 2;
  } else if (kb.pressing("space")) {
    ball.vel.y = 10;
  } else {
    ball.vel.x = 0;
  }
}
