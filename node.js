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
}

module.exports = {Node}