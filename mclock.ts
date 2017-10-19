function (t, v) {
    let f = v.f, r = { r: f.call({}), o: {} }, h = (a, b) => new RegExp(b, "ig").test(a), g, x, j, k, p, n, l, u, o = {}, q, w;
    w = ['ez_21', 'ez_35', 'ez_40', 'c001', 'c002', 'c003'];
    let [a, b, c, d, e, i] = w;
    j = ['open', 'unlock', 'release'];
    k = ['red', 'purple', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange'];
    n = [3, 6, 0, 1, 2, 4, 5, 7, 8, 9];
    p = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    q = (s, n) => s.split('\n').slice(n);
    g = (k, s, l, a = {}) => {
        let r, x, o;
        for (let x of s) {
            o = Object.assign({}, a, { [k]: x });
            r = f.call(o);
            x = q(r, -3).join('\n');
            if (h(x, l) || h(x, 'rmi'))
                return { r, o };
        }
        return { r, o, f: 0 };
    };
    l = (s) => {
        for (let l of w)
            if (h(s, l))
                return l;
    };
    u = (l, o) => {
        if (l == a)
            return g(l, j, l, o);
        if (l == b)
            return g('digit', n, l, g(l, j, ['ig'], o).o);
        if (l == c)
            return g('ez_prime', p, l, g(l, j, ['_p'], o).o);
        if (l == d)
            return g('color_digit', n, l, g(l, k, ['_d'], o).o);
        if (l == e)
            return g('c002_complement', k, l, g(l, k, ['2_'], o).o);
        if (l == i)
            return g('c003_triad_2', k, l, g('c003_triad_1', k, ['d_2'], g(l, k, ['_1'], o).o).o);
    };
    do {
        r = u(l(q(r.r, -1)[0]), o);
        o = r.o;
    } while (!/rmi/gi.test(r.r));
    return { msg: r };
}