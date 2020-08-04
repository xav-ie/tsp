let cities = [];
let totalCities = 40;

let popSize = 500;
let population = [];
let fitness = [];
let startPoint;
let recordDistance = Infinity;
let bestEver;
let currentBest;
let r = 16;
let mutationRate = 0.01;
let timesSinceModified = 0;
let two_opt_counter = 0;

let statusP;

function setup() {
  createCanvas(1000, 1000);
  let order = [];
  let startPoint = floor(random(totalCities));

  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }
  bestEver = order.slice();
  // two_opt();
  let currBestDist = calcDistance(cities, bestEver);
  while (true) {
    two_opt();
    if (calcDistance(cities, bestEver) != currBestDist) {
      currBestDist = calcDistance(cities, bestEver);
    } else {
      break;
    }
  }

  for (let i = 0; i < popSize; i++) {
    population[i] = shuffleN(bestEver, floor(bestEver.length / 4));
  }
  statusP = createP("poop").style("font-size", "32pt");
}

function draw() {
  // noLoop();
  background(0);
  // // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    if (i == 0) stroke(0, 255, 0);
    if (i == bestEver.length - 1) stroke(255, 0, 0);
    ellipse(cities[n].x, cities[n].y, r);
    stroke(255);
  }
  let n = bestEver[0];
  vertex(cities[n].x, cities[n].y);
  endShape();
  translate(0, height / 2);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    stroke(255);
    if (i == 0) stroke(0, 255, 0);
    let n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, r);
  }
  endShape();
  if (two_opt_counter == 20) noLoop();
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityAIndex = order[i];
    let cityA = points[cityAIndex];
    let cityBIndex = order[i + 1];
    let cityB = points[cityBIndex];
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  let cityAIndex = order[0];
  let cityA = points[cityAIndex];
  let cityBIndex = order[order.length - 1];
  let cityB = points[cityBIndex];
  sum += dist(cityA.x, cityA.y, cityB.x, cityB.y);
  return sum;
}

function shuffleN(a, N) {
  a = a.slice();
  for (var i = 0; i < N; i++) {
    var indexA = floor(random(a.length));
    var indexB = floor(random(a.length));
    swap(a, indexA, indexB);
  }
  return a;
}
