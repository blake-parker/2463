class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    rect(this.x, this.y, 50, 50);
    fill("red");
    this.x += this.move;
  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.move = 1;
      this.facing = 1;
    }
    if (keyCode === LEFT_ARROW) {
      this.move = -1;
      this.facing = -1;
    }
  }

  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      this.move = 0;
    }
  }
}

class Projectile {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.move = dir;
  }

  draw() {
    ellipse(this.x, this.y, 15, 15);
    fill("orange");
    while (frameCount % 60 === 0) {
      this.move += dir;
    }
  }
}
