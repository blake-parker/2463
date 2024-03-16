let powerup;
let lfo;
let mouseHasBeenClicked = false;
let img;
powerup = new Tone.Synth({
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

lfo = new Tone.LFO({
  frequency: 5,
  type: "sine",
  min: 200,
  max: 800,
}).start();

lfo.connect(powerup.oscillator.frequency);

function preload() {
  img = loadImage("Tractor_Cannon_Icon.jpg");
}

function setup() {
  createCanvas(600, 400);

  img.resize(img.width / 2, img.height / 2);
}

function draw() {
  background(69, 4, 20);
  if (!mouseHasBeenClicked) {
    text("Click the screen for a powerup!", 125, 50);
    textSize(25);
    fill("white");
  } else {
    text("Get Tractor Cannon'd Fella :3", 130, 50);
    textSize(25);
    fill("white");

    image(img, 225, 125);
  }
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < 600 && mouseY > 0 && mouseY < 400) {
    mouseHasBeenClicked = true;
    powerup.triggerAttackRelease("G5", "8t", "+0.2");
    powerup.triggerAttackRelease("B6", "8t", "+0.25");
  }
}
