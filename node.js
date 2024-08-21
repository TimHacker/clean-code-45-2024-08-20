class Node {
    constructor(){
        this._neighbours = []
    }

    static UNREACHABLE = Number.MAX_VALUE;

    canReach(other){
        const visitedNodes = [];
        return this.#evaluateJourneyRecursive(other, visitedNodes, this.#countStrategy) !== Node.UNREACHABLE;
    }

    linkTo(destinationNode, cost = 1){
        this._neighbours.push({ destinationNode, cost });
    }

    countHopsTo(other) {
        const hopCount = this.#evaluateJourneyRecursive(other, [], this.#countStrategy());
        if (hopCount === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return hopCount;
    }

    #evaluateJourneyRecursive(other, visitedNodes, countStrategy) {
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
            const hopsFromNeighbour = neighbour.destinationNode.#evaluateJourneyRecursive(other, visitedNodes, countStrategy);

            if (hopsFromNeighbour !== Node.UNREACHABLE) {
                const route = countStrategy(neighbour) + hopsFromNeighbour;

                if (shortestHops === Node.UNREACHABLE || route < shortestHops) {
                    shortestHops = route;
                }
            }
        }

        return shortestHops;
    }

    minimumCostTo(destination) {

        const cost =  this.#evaluateJourneyRecursive(destination, [], this.#costStrategy);
        if (cost === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return cost;
    }

    #countStrategy() {
        return () => 1;
    }

    #costStrategy(destination) {
        return destination.cost;
    }
}

module.exports = {Node}