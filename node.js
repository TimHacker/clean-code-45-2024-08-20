const {Link} = require("./link");

class Node {
    constructor(){
        this._neighbours = []
    }

    static UNREACHABLE = Number.MAX_VALUE;

    canReach(other){
        const visitedNodes = [];
        return this.#costJourneyRecursive(other, visitedNodes, this.#countStrategy) !== Node.UNREACHABLE;
    }

    linkTo(destinationNode, cost = 1){
        this._neighbours.push(new Link(destinationNode, cost));
    }

    countHopsTo(other) {
        const hopCount = this.#costJourneyRecursive(other, [], this.#countStrategy);
        if (hopCount === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return hopCount;
    }

    #costJourneyRecursive(other, visitedNodes, countStrategy) {
        if (other === this) {
            return 0;
        }
        if (visitedNodes.includes(this)) {
            return Node.UNREACHABLE;
        }
        visitedNodes.push(this);

        let shortestHops = Node.UNREACHABLE;

        for (let i = 0; i < this._neighbours.length; i++) {
            const neighbour = this._neighbours[i];
            //fixme
            const hopsFromNeighbour = neighbour.getNode().#costJourneyRecursive(other, visitedNodes, countStrategy);

            if (hopsFromNeighbour !== Node.UNREACHABLE) {
                const route = countStrategy(neighbour, hopsFromNeighbour);

                if (shortestHops === Node.UNREACHABLE || route < shortestHops) {
                    shortestHops = route;
                }
            }
        }

        return shortestHops;
    }

    minimumCostTo(destination) {
        const cost =  this.#costJourneyRecursive(destination, [], this.#costStrategy);
        if (cost === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return cost;
    }

    #countStrategy(link, runningTotal) {
        return link.addHop(runningTotal);
    }

    #costStrategy(link, runningTotal) {
        return link.addCost(runningTotal);
    }
}

module.exports = {Node}