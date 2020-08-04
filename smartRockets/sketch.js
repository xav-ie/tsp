let cities = [];
let totalCities = 6;
let diameter = 8;
let radius = diameter / 2;
let bestEver;
let recordDistance;
let order = [];
let totalPermutations;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(
      random(radius, windowWidth - radius),
      random(radius, windowHeight / 2 - radius)
    );
    cities[i] = v;
    order[i] = i;
  }

  recordDistance = calcDistance(cities, order);
  bestEver = order.slice();
  totalPermutations = factorial(totalCities);
  console.log("totalPermutations: " + totalPermutations);
}

function draw() {
  //   frameRate(1);
  background(40);
  noFill();
  for (let i = 0; i < totalCities; i++) {
    ellipse(cities[i].x, cities[i].y, diameter);
  }

  stroke(255, 0, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  let d = calcDistance(cities, order);
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = order.slice();
  }

  nextOrder();

  stroke(255, 0, 255);
  textSize(24);
  let percentDone = (count / totalPermutations) * 100;
  let s = nf(percentDone, 0, 2) + "%";
  fill(255);
  text(s, 20, height / 2 - 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    let cityA = points[order[i]];
    let cityB = points[order[i + 1]];
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function nextOrder() {
  let largestI = -1;
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log("finished");
  }

  largestJ = -1;
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  //STEP 3
  swap(order, largestI, largestJ);

  //STEP 4: Reverse from largestI +1
  let endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);
  count++;
}

function factorial(n) {
  if (n == 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
