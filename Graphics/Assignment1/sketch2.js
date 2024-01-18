function setup() {
  createCanvas(300, 300);
}

function draw() {
  background("white");
  noStroke(); //turning off outlines for shapes

  //red circle
  fill(255, 0, 0, 90);
  ellipse(150, 110, 110, 110);

  //blue circle
  fill(0, 0, 255, 90);
  ellipse(110, 170, 110, 110);

  //green circle
  fill(0, 255, 0, 90);
  ellipse(190, 170, 110, 110);
}
