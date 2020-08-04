class Arc {
  // where i and j are nodes
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.duration = round(dist(i.coord.x, i.coord.y, j.coord.x, j.coord.y)); // t_ij
    this.cost = round(dist(i.coord.x, i.coord.y, j.coord.x, j.coord.y)); //c_ij
    this.animate = 0;
  }

  isFeasible() {
    return (
      this.i.readyTime + this.i.serviceTime + this.duration <= this.j.dueDate
    );
  }

  draw() {
    
    stroke(255, this.animate);
    line(
      this.i.coord.x * 10 + 50,
      this.i.coord.y * 10 + 50,
      this.j.coord.x * 10 + 50,
      this.j.coord.y * 10 + 50
    );
    if(this.animate<254) this.animate+=2;
  }
}
