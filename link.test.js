const {Link} = require('./link')
const {Node} = require('./node')

describe("Link....", () => {
    test('add hops for the link', () => {
        const link = new Link(new Node(), 5);

        expect(link.addHop(0)).toBe(1)
    });

    test('add cost for the link', () => {
        const link = new Link(new Node(), 5);

        expect(link.addCost(0)).toBe(5)
    });

    test.skip('get cost for the link given a strategy', () => {
        const start = new Node();
        const localDestination = new Node();
        const nextDestination = new Node();

        const link = new Link(localDestination, 5);
        const nextLink = new Link(nextDestination, 12);

        start.linkTo(link);
        localDestination.linkTo(nextLink);

        const cost = link.costJourneyRecursive(localDestination, []);
        const hops = link.costHopsJourneyRecursive(localDestination, []);

        expect(cost).toBe(5);
        expect(hops).toBe(1);
    });
});