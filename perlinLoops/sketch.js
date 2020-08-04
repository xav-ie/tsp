let noiseMax = 5;
let slider;
let incButton, decButton;
let phase = 0;
let zoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  incButton = new Clickable(80, 10);
  decButton = new Clickable(10, 10);
  incButton.resize(70, 70);
  decButton.resize(70, 70);
  incButton.text = "+";
  decButton.text = "-";
  incButton.onPress = function () {
    noiseMax = noiseMax * 2;
  };
  decButton.onPress = function () {
    noiseMax = noiseMax / 2;
  };
}

function draw() {
  background(40);
  stroke(255);
  noFill();
  push();
  translate(windowWidth / 2, windowHeight / 2);
  let t = 0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += TWO_PI / 300) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a - phase), -1, 1, 0, noiseMax);
    // let r = map(noise(xoff, yoff), 0, 1, 100, 200);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
    t += TWO_PI / 50;
  }
  endShape(CLOSE);
  pop();

  zoff += 0.01;
  // phase += 0.01;

  incButton.draw();
  decButton.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
