let vals = [0, 1, 2, 3, 4];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//Step 1 of Alg
function draw() {
  //         red, green, blue [0-255]
  background(40);
  console.log(vals);

  let largestI = -1;
  for (let i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log("finished");
  }

  //STEP 2

  largestJ = -1;
  for (let j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j;
    }
  }

  //STEP 3
  swap(vals, largestI, largestJ);

  //STEP 4: Reverse from largestI +1
  let endArray = vals.splice(largestI + 1);
  endArray.reverse();
  vals = vals.concat(endArray);

  textSize(64);
  let s = "";
  for (let i = 0; i < vals.length; i++) {
    s += vals[i];
  }
  fill(255);
  text(s, 20, height / 2);
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
