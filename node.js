class Node {
    constructor(){
        this._neighbours = []
    }

    static UNREACHABLE = Number.MAX_VALUE;

    canReach(other){
        const visitedNodes = [];
        return this._countHopsToRecursive(other, visitedNodes, () => 1) !== Node.UNREACHABLE;
    }

    linkTo(destinationNode, cost = 1){
        this._neighbours.push({ destinationNode, cost });
    }

    countHopsTo(other) {
        const hopCount = this._countHopsToRecursive(other, [], () => 1);
        if (hopCount === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return hopCount;
    }

    _countHopsToRecursive(other, visitedNodes, countStrategy) {
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
            const hopsFromNeighbour = neighbour.destinationNode._countHopsToRecursive(other, visitedNodes, countStrategy);

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
        const useCost = (destination) => {
            return destination.cost;
        }

        return this._countHopsToRecursive(destination, [], useCost);
    }
}

module.exports = {Node}