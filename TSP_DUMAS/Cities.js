class Cities {
  constructor() {
    this.cityInfo = Utility.parseInfo();
    this.cities = null;
    // set the this.cities variable
    this.makeCities();
    this.distanceMatrix = new Array(this.cities.length);
    // sets the distanceMatrix variable
    this.calcDistanceMatrix();
    this.citiesButtons = [];
  }

  calcDistanceMatrix() {
    for (let i = 0; i < this.cities.length; i++) {
      this.distanceMatrix[i] = new Array(this.cities.length);
      const currentCity = this.cities[i];
      for (let j = 0; j < this.cities.length; j++) {
        const othercity = this.cities[j];
        if (i != j) this.distanceMatrix[i][j] = round(dist(currentCity.coord.x, currentCity.coord.y, othercity.coord.x, othercity.coord.y));
        else this.distanceMatrix[i][j] = 0;
      }
    }
  }

  makeCities() {
    const leCities = [];
    for (let i = 0; i < this.cityInfo.length - 5; i++) {
      const currentInfo = this.cityInfo[i];
      const currentCity = new City(
        createVector(float(currentInfo[1]), float(currentInfo[2])),
        float(currentInfo[3]),
        float(currentInfo[4]),
        float(currentInfo[5]),
        float(currentInfo[6])
      );
      leCities.push(currentCity);
    }
    this.cities = leCities;

    return this.cities;
  }

  draw() {
    noStroke();
    fill(250, 150);
    for (let i = 0; i < this.cities.length; i++) {
      const city = this.cities[i];
      city.draw();
    }
    if(this.citiesButtons.length == 0) {
      for (let i = 0; i < this.cities.length; i++) {
        const city = this.cities[i];
        const cityButton = createButton(`${city.cityNumber}`);

        cityButton.position(windowWidth/2, windowHeight/2);
        cityButton.elt.classList.add("specialButton");
        if (city.cityNumber.toString().length == 2) cityButton.elt.classList.add("twoDigits");
        cityButton.position(city.coord.x * 10 + 50 - (cityButton.elt.offsetWidth / 2), city.coord.y * 10 + 50 - (cityButton.elt.offsetHeight / 2));
        cityButton.mouseOver(() => console.log(city));
        this.citiesButtons.push(cityButton);
        // console.log(cityButton);
        // console.log(city);

      }
    }
  }


  

  Nprime(n) {
    return this.cities.filter((city) => city != n);
  }

  getCities() {
    return [...this.cities];
  }
}
