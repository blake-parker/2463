let alien;
let osc, oscNoise;
let lfo, filt, filt2;
let ampEnv;

function preload() {
  alien = loadImage("alien.jpg");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  osc = new Tone.Oscillator(440, "sawtooth6").start();
  osc.volume.value = -20;
  filt = new Tone.Filter(500, "highpass");
  lfo = new Tone.LFO(10, 650, 700).start();
  oscNoise = new Tone.Noise().start();
  oscNoise.volume.value = 15;

  ampEnv = new Tone.AmplitudeEnvelope({
    attack: 1.5,
    decay: 1.5,
    sustain: 1.0,
    release: 1.5,
  }).toMaster();

  osc.connect(filt);
  filt.connect(ampEnv);
  lfo.connect(osc.frequency);
}

function mousePressed() {
  if (mouseX <= 400 && mouseY <= 400) {
    osc.frequency.value = "Bb4";
    ampEnv.triggerAttackRelease(1.5);
  }
}

function draw() {
  background(100, 150, 200);
  if (mouseIsPressed) {
    image(alien, 200, 200, 220, 293);
  }
  textSize(15);
  textAlign(CENTER);
  text("Alien Takeoff! Click anywhere below", 125, 35);
}
