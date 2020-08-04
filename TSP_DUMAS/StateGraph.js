class StateGraph {
    constructor(N, S = [], timeSoFar = 0, c = 0, arrivalTimes = []) {
        this.N = N; // all nodes Cities object
        this.S = S; // nodes visited so far, in order
        if (this.S.length == 0) {
            this.i = null;
        } else {
            this.i = this.S[this.S.length - 1]; // last visited node
        }
        this.timeSoFar = timeSoFar; // current time after visiting all nodes so far
        this.c = c; // cost visiting all nodes so far
        this.arrivalTimes = arrivalTimes;
    }

    getTravelTime(a, b) {
        return this.N.distanceMatrix[a.cityNumber - 1][b.cityNumber - 1];
    }

    getGraph() {
        // detect if visited nodes empty, then this is first time
        if (this.S.length == 0) {
            // run equation 2
            //choose first node from G, we default to node id #1
            const startNode = this.N.cities[0];
            // append this node to visited nodes list
            this.S.push(startNode);
            // filter visited nodes out from N to get next nodes to visit
            const nodesToVisit = this.N.cities.filter((n) => this.S.indexOf(n) == -1);
            // calculate minimum opening time
            const minimumOpen = this.N.cities.reduce(
                (a, b) => (a.readyTime < b.readyTime) ? a : b
            ).readyTime;
            // calculate maximum closing time
            const maximumClose = this.N.cities.reduce(
                (a, b) => (a.dueDate >= b.dueDate) ? a : b
            ).dueDate;
            //intialize a 2d state graph
            let preStatesList = new Array(nodesToVisit.length);
            // go and init each row to have (maximumClose - minimumOpen) number of columns
            for (let i = 0; i < preStatesList.length; i++) {
                preStatesList[i] = new Array(maximumClose - minimumOpen);
                const row = preStatesList[i];
                // calculate cost for each column/time in row
                for (let colNum = 0; colNum < row.length; colNum++) {
                    // get the current node associated with colNum
                    const j = nodesToVisit[i];
                    const travelTime = this.getTravelTime(startNode, j);
                    // calculate penalty of arriving early
                    const earliestPossibleArrival = startNode.readyTime + travelTime;
                    const penalty = (earliestPossibleArrival + colNum < j.readyTime) ? j.readyTime - (earliestPossibleArrival + colNum) : 0;
                    let cost = travelTime + penalty;
                    if ((colNum > j.dueDate) || (colNum < this.timeSoFar)) {
                        cost = float("Infinity");
                    }

                    row[colNum] = cost;
                }
            }

            // initiate state graph
            let statesList = new Array(nodesToVisit.length);

            for (let n = 0; n < statesList.length; n++) {
                // get associated node with n
                const j = nodesToVisit[n];
                const travelTime = this.getTravelTime(startNode, j);
                // calculate earliest arrival time at j from startNode
                const EAT = travelTime + this.timeSoFar;
                const t = Math.max(EAT, j.readyTime);
                const c = preStatesList[n][t]; // + cost of prev node if exist
                //                      [nodes visited so far, t, cost, arrivalTime]
                statesList[n] = [[...this.S, j], j, t, c + this.c, t, [...this.arrivalTimes, t]];
            }
            //filter it 
            // if any node beats another in terms of both c and t, then filter it out
            for (let i = 0; i < statesList.length; i++) {
                const currentState = statesList[i];
                otherLoop:
                for (let j = 0; j < statesList.length; j++) {
                    // if (i == j) continue;
                    const otherState = statesList[j];
                    if (currentState[2] < otherState[2] && currentState[3] < otherState[3]) {
                        // delete otherState
                        statesList.splice(j, 1);
                        j -= 1;
                    }
                    else if (currentState[2] > otherState[2] && currentState[3] > otherState[3]) {
                        // delete currentState
                        statesList.splice(i, 1);
                        i -= 1;
                        break otherLoop;
                    }
                }
            }
            // currentStateGraph = currentStateGraph.filter(state => true);
            statesList = statesList.filter(state => !(state[3] == float("Infinity") || state[4] == float("Infinity") || isNaN(state[3]) || isNaN(state[4])));

            this.statesList = statesList;
        } else {
            this.statesList = [];
            // last visited node
            const startNode = this.S[this.S.length - 1];
            const nodesToVisit = this.N.cities.filter((n) => this.S.indexOf(n) == -1);
            // TODO: make calculating times more efficient!
            // calculate minimum opening time
            const minimumOpen = this.N.cities.reduce(
                (a, b) => (a.readyTime < b.readyTime) ? a : b
            ).readyTime;
            // calculate maximum closing time
            const maximumClose = this.N.cities.reduce(
                (a, b) => (a.dueDate >= b.dueDate) ? a : b
            ).dueDate;

            // calculate pre-state graph
            let preStatesList = new Array(nodesToVisit.length);
            // go and init each row to have (maximumClose - minimumOpen) number of columns
            for (let i = 0; i < preStatesList.length; i++) {
                preStatesList[i] = new Array(maximumClose - minimumOpen);
                const row = preStatesList[i];
                // calculate cost for each column/time in row
                for (let colNum = 0; colNum < row.length; colNum++) {
                    // get the current node associated with colNum
                    const j = nodesToVisit[i];
                    const travelTime = this.getTravelTime(startNode, j);
                    // calculate penalty of arriving early
                    const earliestPossibleArrival = startNode.readyTime + travelTime;
                    const penalty = (earliestPossibleArrival + colNum < j.readyTime) ? j.readyTime - (earliestPossibleArrival + colNum) : 0;
                    let cost = travelTime + penalty;
                    if ((colNum > j.dueDate) || (colNum < this.timeSoFar)) {
                        cost = float("Infinity");
                    }

                    row[colNum] = cost;
                }
            }
            // initiate state graph
            let statesList = new Array(nodesToVisit.length);

            for (let n = 0; n < statesList.length; n++) {
                // get associated node with n
                const j = nodesToVisit[n];
                const travelTime = this.getTravelTime(startNode, j);
                // calculate earliest arrival time at j from startNode
                const EAT = travelTime + this.timeSoFar;
                const t = Math.max(EAT, j.readyTime);
                const c = preStatesList[n][t]; // + cost of prev node if exist
                //                      [nodes visited so far, t, cost, arrivalTime]
                statesList[n] = [[...this.S, j], j, t, c + this.c, t, [...this.arrivalTimes, t]];
            }
            //filter it 
            // if any node beats another in terms of both c and t, then filter it out
            for (let i = 0; i < statesList.length; i++) {
                const currentState = statesList[i];
                otherLoop:
                for (let j = 0; j < statesList.length; j++) {
                    // if (i == j) continue;
                    const otherState = statesList[j];
                    if (currentState[2] < otherState[2] && currentState[3] < otherState[3]) {
                        // delete otherState
                        statesList.splice(j, 1);
                        j -= 1;
                    }
                    else if (currentState[2] > otherState[2] && currentState[3] > otherState[3]) {
                        // delete currentState
                        statesList.splice(i, 1);
                        i -= 1;
                        break otherLoop;
                    }
                }
            }
            // currentStateGraph = currentStateGraph.filter(state => true);
            statesList = statesList.filter(state => !(state[3] == float("Infinity") || state[4] == float("Infinity") || isNaN(state[3]) || isNaN(state[4])));

            this.statesList = statesList;
        }
    }
}