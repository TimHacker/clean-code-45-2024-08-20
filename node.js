class Node {
    constructor(){
        this._neighbours = []
    }

    static UNREACHABLE = -1;

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
        for (let i = 0; i < this._neighbours.length; i++) {
            const neighbour = this._neighbours[i];
            const hopsFromNeighbour = neighbour._countHopsToRecursive(other, visitedNodes);

            if (hopsFromNeighbour !== Node.UNREACHABLE) {
                return 1 + hopsFromNeighbour;
            }
        }
        return Node.UNREACHABLE;
    }

    countMinimumHopsTo(other) {
        // outer question: get number of hops between c and e
        // inner question: get number of hops for shorter route given I've already visited another route - store hops per route
        //      exit criteria:

        // if all routes return -1 then we return -1
        //
        // keep array of all route lengths and pick shortest at the end

        const hopCount = this._countMinimumHopsToRecursive(other, []);
        if (hopCount === Node.UNREACHABLE) {
            throw new Error('Unreachable node');
        }
        return hopCount;
    }

    _countMinimumHopsToRecursive(other, visitedNodes) {
        if (other === this) {
            return 0;
        }
        if (visitedNodes.includes(this)) {
            return Node.UNREACHABLE;
        }
        visitedNodes.push(this);

        let shortestHops = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < this._neighbours.length; i++) {
            const neighbour = this._neighbours[i];
            const hopsFromNeighbour = neighbour._countHopsToRecursive(other, visitedNodes);

            if (hopsFromNeighbour !== Node.UNREACHABLE) {
                const route = 1 + hopsFromNeighbour;

                if (route < shortestHops) {
                    shortestHops = route;
                }
            }
        }

        if (shortestHops === Number.MAX_SAFE_INTEGER) {
            return Node.UNREACHABLE;
        }
        return shortestHops;
    }

}

module.exports = {Node}