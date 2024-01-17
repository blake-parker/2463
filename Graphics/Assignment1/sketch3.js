function setup() {
  createCanvas(400, 200);
}

function draw() {
  background("black");
  noStroke();

  //start pacman

  //pacman body
  fill(255, 255, 90);
  ellipse(100, 100, 150, 150);

  //pacman mouth
  fill("black");
  triangle(10, 40, 10, 150, 100, 100);

  //start ghost

  //ghost head
  fill(255, 50, 50);
  ellipse(300, 100, 150, 150);

  //ghost body
  rect(225, 100, 150, 75);

  //left eye
  fill("white");
  ellipse(265, 95, 40, 40);
  //pupil
  fill("blue");
  ellipse(265, 95, 25, 25);

  //right eye
  fill("white");
  ellipse(335, 95, 40, 40);
  //pupil
  fill("blue");
  ellipse(335, 95, 25, 25);
}
