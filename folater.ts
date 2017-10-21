function ( context , args ) {// c:#s.cracker.name, n:number_of_locs
    var index;
    var size=args.n;
    for(var i=0;i<size;i++){
        index="loc"+i;
        args[c].call({t:args[index]});
    }
    return{
        ok: true, msg: "test"
    }
}