let a, b, c;
let fx = new Tone.Players({
  Shutdown: "assets/Shutdown.mp3",
  Hum: "assets/Hum.mp3",
  Over: "assets/Over.mp3",
  Whistle: "assets/Whistle.mp3",
});

let names = ["Shutdown", "Hum", "Over", "Whistle"];
let b1, b2, b3, b4;
let PingPong = new Tone.PingPongDelay(0, 0.2);

let s1, s2, s3;
fx.connect(PingPong);
PingPong.toDestination();

function preload() {
  a = random(0, 255);
}

function setup() {
  let canv = createCanvas(700, 400);
  let cp = canv.position();

  let inc = 120;
  let start = 150;
  b1 = createButton("Shutdown");
  b1.position(cp.x + start, cp.y + 40);
  b1.mousePressed(() => {
    fx.player("Shutdown").start();
  });

  b2 = createButton("Hum");
  b2.position(cp.x + start + inc, cp.y + 40);
  b2.mousePressed(() => {
    fx.player("Hum").start();
  });

  b3 = createButton("Over");
  b3.position(cp.x + start + inc * 2, cp.y + 40);
  b3.mousePressed(() => {
    fx.player("Over").start();
  });

  b4 = createButton("Whistle");
  b4.position(cp.x + start + inc * 3, cp.y + 40);
  b4.mousePressed(() => {
    fx.player("Whistle").start();
  });

  s1 = createSlider(0, 1, 0, 0.05);
  s1.position(cp.x + 150, cp.y + 200);
  s1.mouseMoved(() => {
    PingPong.delayTime.value = s1.value();
  });

  s2 = createSlider(0, 1, 0, 0.05);
  s2.position(cp.x + 150, cp.y + 250);
  s2.input(() => {
    PingPong.feedback.value = s2.value();
  });
}

function draw() {
  background(69, 4, 20);
  text(
    "Click a sound above to play, adjust the sliders as you wish.",
    100,
    125
  );
  textSize(20);
  fill("white");
  text("<--- Delay Time", 300, 215);
  text("<--- Feedback", 300, 270);
}
