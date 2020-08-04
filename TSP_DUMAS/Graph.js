class Graph {
  constructor() {
    this.N = new Cities();
    this.A = new Arcs(this.N.getCities());
    this.currentPath = null;
    this.runButton = createButton('RUN 🏃‍♂');
    this.runButton.position(windowWidth - 80, 19);
    this.runButton.mousePressed(this.runManager);
  }

  drawGraph() {
    this.A.draw();
    this.N.draw();
    if (this.currentPath) {
      this.currentPath.draw();
    }
  }
  setCurrentPath = (path) => {
    console.log("woooo");
    this.currentPath = new Path(path);
  }

  runManager() {
    this.finalStatesList = (new StateGraphManager()).go();
    for (let i = 0; i < this.finalStatesList.length; i++) {
      const state = this.finalStatesList[i];
      let stateButton = createButton(`${i}    🦠`);
      stateButton.position(windowWidth - 80, 50 + 35 * i);
      const path = state[0];
      stateButton.mousePressed(() => {
        G.currentPath = new Path(path);
      });
    }
    console.log(this.finalStatesList);
  }


  drawGannt() {

  }


}
