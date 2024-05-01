let player;
let playing;
let pImg;
let heart;
const canvW = 1100,
  canvH = 700;
let tileset;
let tileSize = 64;
let tileMap;
let score = 0;
let coinImg;
const spike = new Tone.Synth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0,
    release: 0.5,
  },
}).toDestination();

const coinSound = new Tone.Synth({
  oscillator: {
    type: "square",
  },
  envelope: {
    attack: 0.015,
    decay: 0.15,
    sustain: 0.35,
    release: 2,
  },
}).toDestination();
coinSound.volume.value = -10;

let sounds = new Tone.Players({
  jump: "Assets/jump.wav",
});
sounds.toDestination();

let beginSynth3 = new Tone.DuoSynth({
  envelope: {
    sustain: 0.0,
    release: 0.0002,
    attack: 0.00009,
  },
}).toDestination();
const playSong3 = [
  { time: "0:0:0", note: "F2", duration: "32n" },
  { time: "0:0:6", note: "G2", duration: "64n" },
  { time: "0:0:16", note: "A2", duration: "32n" },
  { time: "0:0:22", note: "G2", duration: "64n" },
  { time: "0:0:32", note: "F2", duration: "32n" },
  { time: "0:0:38", note: "G2", duration: "64n" },
  { time: "0:0:48", note: "C3", duration: "32n" },
  { time: "0:0:54", note: "G2", duration: "64n" },
  { time: "0:0:60", note: "E2", duration: "32n" },
];
const playTrack3 = new Tone.Part(function (time, note) {
  beginSynth3.triggerAttackRelease(note.note, note.duration, time);
}, playSong3);
playTrack3.loop = true;
playTrack3.loopEnd = "0:0:64";
beginSynth3.volume.value = -14;

function preload() {
  player = new Player(loadImage("Assets/Guy.png"));
  tileset = loadImage("Assets/Tiles.png");
  coinImg = loadImage("Assets/Coin.png");
  heart = loadImage("Assets/Heart.png");
}

function setup() {
  createCanvas(canvW, canvH);
  createGame();
}

function draw() {
  clear();
  background("grey");
  checkPlaying();
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
  if (kb.presses("space") && player.sprite.colliding(walkable)) {
    player.sprite.vel.y = 30;
    sounds.player("jump").start();
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

  let imgF1 = getTile(24, 10);
  f1 = new walkable.Group();
  f1.w = tileSize;
  f1.h = tileSize;
  f1.tile = "g";
  f1.collider = "static";
  f1.image = imgF1;

  let imgF2 = getTile(24, 2);
  f2 = new walkable.Group();
  f2.w = tileSize;
  f2.h = tileSize;
  f2.tile = "t";
  f2.collider = "static";
  f2.image = imgF2;

  let imgF4 = getTile(28, 8);
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
  let imgF3 = getTile(28, 6);
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
    coinSound.triggerAttackRelease("G5", "8t", "+0.2");
    coinSound.triggerAttackRelease("B6", "8t", "+0.25");
    coinSound.triggerAttackRelease("G5", "8t", "+0.3");
    coinSound.triggerAttackRelease("B6", "8t", "+0.35");
  });
  tileMap = new Tiles(
    [
      "t...oo.................................t",
      "t...oo........................ooo......t",
      "t..pppp.......................ppp......t",
      "t......p................p..pp..........t",
      "t.........p............p...............t",
      "t.......p...........p...o.....o........t",
      "t................o.....ppp.s.pp........t",
      "t........pt.pp...p..p......t......p....t",
      "t...ppp...tp..ssst........stssssss.....t",
      "t..p.....ot..ottttsssssssstttttttt.....t",
      "tttssssttttttttttttttttttttttttttttttttt",
      "gggggggggggggggggggggggggggggggggggggggg",
      "gggggggggggggggggggggggggggggggggggggggg",
      "gggggggggggggggggggggggggggggggggggggggg",
    ],
    tileSize,
    tileSize,
    tileSize - 1,
    tileSize - 1
  );
}

function checkPlaying() {
  if (!playing) {
    if (player.lives > -1) {
      textSize(20);
      text(`Score = ${score}`, 1000, 30);
      for (i = 0; i < player.lives; i++) {
        image(heart, i * 30, 0, 36, 36);
      }
      world.step();
      camera.x = player.sprite.x + 400;
      camera.y = player.sprite.y - 70;
      player.sprite.visible = true;
      walkable.visible = true;
      death.visible = true;
      coin.visible = true;

      Tone.Transport.start();
      Tone.Transport.bpm.value = 210;
      playTrack3.start();
      movement();
      if (player.sprite.collides(death)) {
        player.sprite.x = 120;
        player.sprite.y = 630;
        player.lives--;
        spike.triggerAttackRelease("E3", "8n");
      }
    } else {
      background(0);
      fill("red");
      textSize(50);
      text("Game over!", 325, 250);
      text(`You collected ${score} coins`, 300, 300);
      playTrack3.stop();
      player.sprite.visible = false;
      walkable.visible = false;
      death.visible = false;
      coin.visible = false;
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

function getTile(x, y) {
  return tileset.get(x * tileSize, y * tileSize, tileSize, tileSize);
}
class Player {
  constructor(img) {
    this.sprite = new Sprite(120, 620, 80, 80);
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
    this.lives = 2;
  }
}

/*
EXAMPLE AS TO HOW TO GET TILES
  floorImg = tileset.get(24 * tileSize, 10 * tileSize, tileSize, tileSize);
  floor = new Sprite(canvW / 2, canvH / 2, tileSize, tileSize);
  floor.addImage(floorImg);
*/
