class Arcs {
  constructor(cities) {
    this.cityCount = cities.length;
    this.arcs = [];
    for (let i = 0; i < this.cityCount; i++) {
      for (let j = 0; j < this.cityCount; j++) {
        if (i != j) this.arcs.push(new Arc(cities[i], cities[j]));
      }
    }
    console.log(`${this.arcs.length} arcs`);
    this.currentTime = millis();
  }

  draw() {
    if (this.currentTime < 1500) {
      this.currentTime = millis();
    } else {
      if(this.currentTime < 2000) {
        this.currentTime = millis();
      }
      stroke(255, 200);
      strokeWeight(1);
      for (let i = 0; i < this.arcs.length; i++) {
        const arc = this.arcs[i];
        arc.draw();
      }
    }
  }
}
