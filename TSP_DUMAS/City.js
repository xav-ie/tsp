let CITY_NUM = 0;
let otherCustomerDrawing = -1;
class City {
  constructor(coord, demand, readyTime, dueDate, serviceTime = 0) {
    this.coord = coord;
    this.demand = demand;
    this.readyTime = readyTime;
    this.dueDate = dueDate;
    this.timeWindow = [this.readyTime, this.dueDate]; // [a_i,b_i]
    this.serviceTime = serviceTime; // s_i
    this.cityNumber = ++CITY_NUM;
    this.arrivalTime = []; // t_i
    // this.departureTime = null;
  }

  checkMouse() {
    if (
      dist(mouseX, mouseY, this.coord.x * 10 + 50, this.coord.y * 10 + 50) < 20
    ) {
      fill(255, 255, 0);
      textSize(32);
      text(
        "custNumber: " +
        this.cityNumber +
        "; readyTime: " +
        this.readyTime +
        "; \ndueDate: " +
        this.dueDate +
        "; serviceTime: " +
        this.serviceTime +
        ";\narrivalTime: " +
        this.arrivalTime,
        50,
        windowHeight - 100
      );
    } else {
      fill(255);
    }
  }

  draw() {
    this.checkMouse();
    // ellipse(this.coord.x * 10 + 50, this.coord.y * 10 + 50, 30);
    // fill(0);
    // textSize(14);
    // text(this.cityNumber, this.coord.x * 10 + 45, this.coord.y * 10 + 55);
  }
}
