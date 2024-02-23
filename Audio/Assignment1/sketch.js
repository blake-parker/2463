let fx;
let a, b, c;
let b1, b2;

function preload() {
  fx = new Tone.Players({
    sd: "assets/shutdown.mp3",
    stop: "assets/stop.mp3",
  }).toDestination();
  a = random(0, 255);
  b = random(0, 255);
  c = random(0, 255);
}

function setup() {
  let canv = createCanvas(1500, 700);
  let cp = canv.position();

  b1 = createButton("Shutdown");
  b1.position(cp.x + 40, cp.y + 40);
  b1.mousePressed(() => {
    fx.player("sd").start();
  });

  b2 = createButton("Stop");
  b2.position(cp.x + 160, cp.y + 40);
  b2.mousePressed(() => {
    fx.player("stop").start();
  });
}

function draw() {
  background(a, b, c);
}
