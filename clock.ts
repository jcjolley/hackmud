function (ctx, args) {
    let f = args.fn, r = f.call({}), h = (a, b) => b.some(x => a.indexOf(x) > -1), gp, ls, x, ws, cs, ps, ns, gl, ul;
    ws = ['open', 'release', 'unlock'];
    cs = ['red', 'purple', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange'];
    ns = [3, 6, 0, 1, 2, 4, 5, 7, 8, 9];
    ps = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    gp = (k, s, l, a = {}) => {
        for (let x of s) {
            let o = Object.assign({}, a, { [k]: x });
            r = f.call(o);
            if (h(r, l))
                return { r, o, x };
        }
    };

    gl = () => {
        for (let l of ['EZ_21', 'EZ_35', 'EZ_40', 'c001', 'c002', 'c003'])
            if (h(r, [l]))
                return l;
    };

    ul = l => {
        if (l == 'EZ_21')
            return gp(l, ws, ['UNL']).r;
        if (l == 'EZ_35')
            return gp('digit', ns, ['UNL'], gp(l, ws, ['digit']).o).r;
        if (l == 'EZ_40')
            return gp('ez_prime', ps, ['UNL'], gp(l, ws, ['prime']).o).r;
        if (l == 'c001')
            return gp('color_digit', ns, ['UNL'], gp(l, cs, ['color_digit']).o).r;
        if (l == 'c002')
            return gp('c002_complement', cs, ['UNL'], gp(l, cs, ['c002_complement']).o).r;
        if (l == 'c003')
            return gp('c003_triad_2', cs, ['UNL'], gp('c003_triad_1', cs, ['c003_triad_2'], gp(l, cs, ['c003_triad_1']).o).o).r
    };
    r = ul(gl());
    return { ok: !!r, msg: r };
}
