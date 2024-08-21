class Link {
    _cost;
    _node;
    constructor(node, cost) {
        this._node = node;
        this._cost = cost;
    }

    addHop(runningTotal) {
        return runningTotal + 1;
    }

    addCost(runningTotal) {
        return runningTotal + this._cost;
    }

    getNode() {
        return this._node;
    }
}
module.exports = {Link}