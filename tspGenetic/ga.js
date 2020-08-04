function calculateFitness() {
  let currentRecord = Infinity;
  let modified = false;
  for (let i = 0; i < population.length; i++) {
    let d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
      modified = true;
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    fitness[i] = 1 / (pow(d, 8) + 1);
  }

  if (modified == false) {
    timesSinceModified++;
  } else {
    timesSinceModified = 0;
    two_opt_counter = 0;
  }

  if (timesSinceModified == 20) {
    two_opt();
    for (let i = 0; i < popSize; i++) {
      population[i] = shuffleN(bestEver, floor(bestEver.length / 4));
    }
    two_opt_counter++;
    // mutationRate = 1 / (21 - two_opt_counter);
    console.log(two_opt_counter);
    timesSinceModified = 0;
  }
}

function normalizeFitness() {
  let sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    let orderA = pickOne(population, fitness);
    let orderB = pickOne(population, fitness);
    let order = crossOver(orderA, orderB);
    mutate(order, 0.03);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list, prob) {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  let start = floor(random(orderA.length));
  let end = floor(random(start + 1, orderA.length));
  let neworder = orderA.slice(start, end);
  // let left = totalCities - neworder.length;
  for (let i = 0; i < orderB.length; i++) {
    let city = orderB[i];
    if (!neworder.includes(city)) {
      neworder.push(city);
    }
  }
  return neworder;
}

function mutate(order, mutationRate) {
  for (let i = 0; i < totalCities; i++) {
    if (random(1) < mutationRate) {
      let indexA = floor(random(order.length));
      let indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}

function two_opt() {
  let n = totalCities;
  for (let i = 1; i < n - 2; i++) {
    for (let j = i + 1; j < n + 1; j++) {
      if (j - i == 1) continue;
      let testTour = bestEver
        .slice(0, i)
        .concat(bestEver.slice(i, j).reverse(), bestEver.slice(j, n));
      if (calcDistance(cities, testTour) < calcDistance(cities, bestEver))
        bestEver = testTour;
    }
  }
}
