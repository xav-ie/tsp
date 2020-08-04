let fruits = [
  { name: "mango", score: 5 },
  { name: "blueberry", score: 3 },
  { name: "apple", score: 1 },
  { name: "melon", score: 7 },
  { name: "cherry", score: 1 },
];

function setup() {
  createCanvas(400, 300);
  background(0);

  let sum = 0;
  for (let i = 0; i < fruits.length; i++) {
    sum += fruits[i].score;
  }

  for (let i = 0; i < fruits.length; i++) {
    fruits[i].prob = fruits[i].score / sum;
    fruits[i].count = 0;
  }

  for (let i = 0; i < 1000000; i++) {
    let fruit = pickOne(fruits);
    fruit.count++;
  }

  console.log(fruits);
}

function pickOne(list) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - list[index].prob;
    index++;
  }
  index--;
  return list[index];
}
