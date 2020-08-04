class Path {
  constructor(S = []) {
    this.S = S; //S
  }

  add(city) {
    this.S.push(city);
  }

  draw() {
    fill(0, 255, 0, 0);
    stroke(0, 255, 0, 200);
    strokeWeight(5);
    for (let i = 1; i < this.S.length; i++) {
      const prevCity = this.S[i - 1];
      const city = this.S[i];
      ellipse(prevCity.coord.x * 10 + 50, prevCity.coord.y * 10 + 50, 30);
      ellipse(city.coord.x * 10 + 50, city.coord.y * 10 + 50, 30);
      let slope = createVector((city.coord.x * 10 + 50 - prevCity.coord.x), (city.coord.y * 10 + 50 - prevCity.coord.y));
      slope.normalize();

      let start = createVector(prevCity.coord.x * 10 + 50, prevCity.coord.y * 10 + 50);
      let end = createVector(city.coord.x * 10 + 50, city.coord.y * 10 + 50);
      
      this.vectorLine(start, end);
    }
    if (this.S.length == 1) {
      const city = this.S[0];
      ellipse(city.coord.x * 10 + 50, city.coord.y * 10 + 50, 30);
    }


    // this.drawArrow(createVector(0,0), createVector(mouseX,mouseY), 'blue');
  }

  vectorLine(a, b) {
    line(a.x, a.y, b.x, b.y);
  }


}
