const {Node} = require("./node");

describe ('Nodes....', () => {
    test('Node can reach itself', () => {
        const g = new Node();
        expect(g.canReach(g)).toBe(true);
    });

    test('Node can not reach a node it is not connected to', () => {
        const g = new Node();
        const a = new Node();
        expect(g.canReach(a)).toBe(false);
    });

    test('Node can reach connected neighbour', () => {
        const a = new Node();
        const b = new Node();
        b.linkTo(a);
        expect(b.canReach(a)).toBe(true);
    });

    test('Node connections are one directional', () => {
        const a = new Node();
        const b = new Node();
        b.linkTo(a);
        expect(a.canReach(b)).toBe(false);
    });

    test('Nodes can reach across more than one connection', () => {
        const d = new Node();
        const c = new Node();
        const b = new Node();
        b.linkTo(c);
        c.linkTo(d);
        expect(b.canReach(d)).toBe(true);
    });

    test('Circular stuff should not cause issues', () => {
        const b = new Node();
        const c = new Node();
        const d = new Node();
        const e = new Node();
        const f = new Node();
        b.linkTo(c);
        c.linkTo(d);
        d.linkTo(e);
        d.linkTo(c);
        e.linkTo(f);
        expect(b.canReach(f)).toBe(true);
    });

    test('count hops to self', () => {
        const b = new Node();

        expect(b.countHopsTo(b)).toBe(0)
    });

    test('count hops to neighbour', () => {
        const b = new Node();
        const c = new Node();

        b.linkTo(c);

        expect(b.countHopsTo(c)).toBe(1);
        expect(() => c.countHopsTo(b)).toThrowError('Unreachable node');
    });

    test('count hops to unreachable node', () => {
        const b = new Node();
        const c = new Node();

        expect(() => b.countHopsTo(c)).toThrowError('Unreachable node');
    });

    test('count hops with intermediate hop', () => {
        const b = new Node();
        const c = new Node();
        const d = new Node();

        b.linkTo(c);
        c.linkTo(d);

        expect(b.countHopsTo(d)).toBe(2);
    });

    test('count hops where unreachable', () => {
        const b = new Node();
        const c = new Node();
        const d = new Node();
        const f = new Node();

        b.linkTo(c);
        c.linkTo(d);

        expect(() => b.countHopsTo(f)).toThrowError('Unreachable node');
    });

    test('Count hops with a cycle should not cause issues', () => {
        const b = new Node();
        const c = new Node();
        const d = new Node();
        const e = new Node();
        const f = new Node();
        b.linkTo(c);
        c.linkTo(d);
        d.linkTo(e);
        e.linkTo(b);
        b.linkTo(f);

        expect(b.countHopsTo(f)).toBe(1);
    });

    test('Full problem', () => {
        const a = new Node();
        const b = new Node();
        const c = new Node();
        const d = new Node();
        const e = new Node();
        const f = new Node();
        const g = new Node();
        b.linkTo(a);
        b.linkTo(f);
        b.linkTo(c);
        c.linkTo(d);
        c.linkTo(d);
        d.linkTo(e);
        e.linkTo(b);
        c.linkTo(e);

        expect(c.countHopsTo(e)).toBe(1);
        expect(b.countHopsTo(e)).toBe(2);
        expect(c.countHopsTo(b)).toBe(3);
        expect(d.countHopsTo(a)).toBe(3);
    });

    test('Count hops with multiple routes indicates shortest route', () => {
        const c = new Node();
        const d = new Node();
        const e = new Node();
        c.linkTo(d);
        d.linkTo(e);
        c.linkTo(e);

        expect(c.countHopsTo(e)).toBe(1);
    });
})