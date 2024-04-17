let port;
let pVal = 225;

function setup() {
  createCanvas(400, 400);
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  button = createButton("Toggle LED");
  button.position(10, 10);
  button.mousePressed(toggleLED);

  port = createSerial();
}

function draw() {
  let str = port.readUntil("\n");
  let str2 = port.readUntil("\n");
  console.log(str);
  str = str + str2;
  background(str / 4);
}

function connect() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}

function toggleLED() {
  port.write(1);
}
