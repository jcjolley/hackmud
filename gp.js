function (t, v) {
    let b,c,d,ft,a,gb,gc,gd,gk,gp,e,i,im,jws,k,ks,p,pk,pks,ps,re,rs,tl,u,x,z
    z = (s) => typeof s === 'string' ? s.split('').some(c => c.charCodeAt(0) > 122) : 0
    re = (fn) => {
        for (x = fn(); z(x); i++) 
            x = fn()
        return x
    }
    ft = (a, i) => a.concat(i)
    gc = () => v.f.call().split('\n').slice(-1)[0].split(' ').filter(x => /[a-zA-Z]/.test(x))
    c = re(gc)
    gk = () => /ith\s(\w+)\b/g.exec(v.f.call({}))[1]
    k = re(gk)
    gb = () => v.f.call({ [k]: c[0] })
    b = gb()
    gd = () => /ith.*\:\"(\w+)/.exec(v.f.call({}).split('\n').slice(-1)[0])[1]
    d = re(gd)
    gp = () => /tegy\s(\w+)/.exec(v.f.call({ [k]: c[1] }))[1]
    p = re(gp)
    e = () => {for (let pw of ["p", "pass", "password"]) if (/Aut/.test(v.f.call({[k]: d, [pw]: p}))) return pw}
    pk = e()

    ks = ['dev', 'rev', 'proj', 'beta']
    im = (arr) => x => arr.some(y => x.toLowerCase().includes(y.toLowerCase()))
    a = x => x.length > 6 && !im(ks)(x) && !z(x)
    ps = b
        .filter(im(ks))
        .map(x => x.split(" "))
        .reduce(ft, [])
        .filter(x => a(x))
    u = Array.from(new Set(ps))
    rs = u.map(pj => v.f.call({ [k]: d, project: pj, [pk]: p }))
                 .filter(x => typeof x === 'object')
                 .reduce(ft, [])
                 .filter(x => !z(x) && !z.includes('<'))
    return rs
}
