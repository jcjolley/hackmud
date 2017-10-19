function (ctx, args) {
    let f = args.fn;
    const h = (a, b) => a.indexOf(b) > -1;
    const gw = (l, fn) => ['open', 'release', 'unlock'].reduce((a, x) => {if(!a && h(fn.call({[l]: x}), 'digit')) a = x; return a}, null);
    const gd = (l, w, fn) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((a, x) => { if (!a && h(fn.call({ [l]: w, digit: x }), 'UNL')) a = x; return a }, null);
    const ul = l => {
        switch (l) {
            case 'EZ_35':
                let w = gw(l, f);
                let d = gd(l, w, f);
                return {w, d}
        }
    };
    let r = f.call({});
    let lo = ['EZ_21', 'EZ_35'].reduce((_, x) => { if (h(r, x)) return x; }, null);
    return { ok: true, msg: JSON.stringify(ul(lo)) };
}