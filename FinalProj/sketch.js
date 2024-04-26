let player;
let playing;
let pImg;
const canvW = 1100,
  canvH = 700;
let tileset;
let tileSize = 64;
let tileMap;
let score = 0;
let coinImg;

function preload() {
  player = new Player(loadImage("Assets/Guy.png"));
  tileset = loadImage("Assets/Tiles.png");
  coinImg = loadImage("Assets/Coin.png");
}

function setup() {
  createCanvas(canvW, canvH);
  createGame();
}

function draw() {
  clear();
  background("grey");
  if (!playing) {
    textSize(20);
    text(`Score = ${score}`, 1000, 30);
    world.step();
    camera.x = player.sprite.x + 400;
    camera.y = player.sprite.y - 70;
    player.sprite.visible = true;
    walkable.visible = true;
    death.visible = true;
    coin.visible = true;
    movement();
    if (player.sprite.collides(death)) {
      player.sprite.x = 50;
      player.sprite.y = 100;
    }
  } else {
    background(0);
    fill("red");
    textSize(50);
    text("Cave Game V2", 325, 250);
    text('Press "Space" to start!', 300, 300);
    player.sprite.visible = false;
    walkable.visible = false;
    death.visible = false;
    coin.visible = false;
    if (kb.presses("space")) {
      playing = true;
    }
  }
}

function movement() {
  if (kb.pressing("a")) {
    player.sprite.vel.x = -3;
    player.sprite.ani = "run";
    player.sprite.mirror.x = true;
  } else if (kb.pressing("d")) {
    player.sprite.vel.x = 3;
    player.sprite.ani = "run";
    player.sprite.mirror.x = false;
  } else {
    player.sprite.vel.x = 0;
    player.sprite.ani = "stand";
  }
  if (kb.presses("space")) {
    player.sprite.vel.y = 30;
    player.sprite.ani = "jump";
  }
}

function createGame() {
  playing = false;
  world.gravity.y = 12;
  world.autoStep = false;
  player.sprite.w = 50;
  player.sprite.h = 60;
  walkable = new Group();
  walkable.layer = 1;

  let imgF1 = tileset.get(24 * tileSize, 10 * tileSize, tileSize, tileSize);
  f1 = new walkable.Group();
  f1.w = tileSize;
  f1.h = tileSize;
  f1.tile = "g";
  f1.collider = "static";
  f1.image = imgF1;

  let imgF2 = tileset.get(24 * tileSize, 2 * tileSize, tileSize, tileSize);
  f2 = new walkable.Group();
  f2.w = tileSize;
  f2.h = tileSize;
  f2.tile = "t";
  f2.collider = "static";
  f2.image = imgF2;

  let imgF4 = tileset.get(28 * tileSize, 8 * tileSize, tileSize, tileSize);
  f4 = new walkable.Group();
  f4.w = tileSize;
  f4.h = 0.1;
  f4.y = tileSize - 10;
  f4.tile = "p";
  f4.debug = false;
  f4.collider = "static";
  f4.image = imgF4;

  death = new Group();
  death.layer = 1;
  let imgF3 = tileset.get(28 * tileSize, 6 * tileSize, tileSize, tileSize);
  f3 = new death.Group();
  f3.w = tileSize / 2;
  f3.h = tileSize / 2;
  f3.tile = "s";
  f3.collider = "static";
  f3.image = imgF3;

  coin = new Group();
  coin.layer = 1;
  coin.w = 16;
  coin.h = 16;
  coin.spriteSheet = coinImg;
  coin.addAnis({
    spin: { row: 0, frames: 8 },
  });
  coin.tile = "o";
  coin.collider = "static";
  coin.rotationLock = true;

  player.sprite.overlaps(coin, (p, c) => {
    c.remove();
    score++;
  });
  tileMap = new Tiles(
    [
      "........................................",
      "........................................",
      "........................................",
      "........p...............................",
      "........................................",
      ".........pt.............................",
      "....ppp...t.............................",
      "...p.....ot.............................",
      "tttsssstttt.............................",
      "gggggggggggggggggggggggggggggggggggggggg",
      "ggggggg.................................",
      "ggggggg.................................",
    ],
    tileSize,
    tileSize,
    tileSize - 1,
    tileSize - 1
  );
}
class Player {
  constructor(img) {
    this.sprite = new Sprite(50, 100, 80, 80);
    let p = this.sprite;
    p.spriteSheet = img;
    p.rotationLock = true;
    p.friction = 0;
    p.addAnis({
      stand: { row: 0, frames: 1 },
      run: { row: 0, frames: 9 },
      jump: { row: 9, frames: 12 },
    });
    p.debug = true;
    p.ani = "stand";
  }
}

/*
EXAMPLE AS TO HOW TO GET TILES
  floorImg = tileset.get(24 * tileSize, 10 * tileSize, tileSize, tileSize);
  floor = new Sprite(canvW / 2, canvH / 2, tileSize, tileSize);
  floor.addImage(floorImg);
*/
