let G;
let button;
let showCharts = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  button = createButton('Toggle Chart 🎛');
  button.position(19, 19);
  button.mousePressed(() => showCharts = !showCharts);
  G = new Graph();
  textSize(32);
}

function draw() {
  if (showCharts) {
    background(150, 150, 250);
    G.drawGannt();
  } else {
    background(255, 150, 150);
    G.drawGraph();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
