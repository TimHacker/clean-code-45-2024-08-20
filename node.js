class Node {
    constructor(){
        this._neighbours = []
    }

    static UNREACHABLE = Number.MAX_VALUE;

    canReach(other){
        const visitedNodes = [];
        return this._countHopsToRecursive(other, visitedNodes) !== Node.UNREACHABLE;
    }

    linkTo(other){
        this._neighbours.push(other);
    }

    countHopsTo(other) {
        const hopCount = this._countHopsToRecursive(other, []);
        if (hopCount === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return hopCount;
    }

    _countHopsToRecursive(other, visitedNodes) {
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
            const hopsFromNeighbour = neighbour._countHopsToRecursive(other, visitedNodes);

            if (hopsFromNeighbour !== Node.UNREACHABLE) {
                const route = 1 + hopsFromNeighbour;

                if (shortestHops === Node.UNREACHABLE || route < shortestHops) {
                    shortestHops = route;
                }
            }
        }

        return shortestHops;
    }

}

module.exports = {Node}