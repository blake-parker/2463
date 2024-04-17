let player = new Player(200, 350);
let projectiles = [];
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  player.draw();
  projectiles.forEach((e) => {
    e.draw();
  });
}

function keyPressed() {
  if (keyCode === ENTER) {
    projectiles.push(
      new Projectile(player.x + 25, player.y + 25, player.facing)
    );
  } else {
    player.keyPressed();
  }
}

function keyReleased() {
  player.keyReleased();
}
