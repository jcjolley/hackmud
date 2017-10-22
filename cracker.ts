function (context, args) {
    let state = {
        results: args.f.call({}),
        argument: {},
        failed: 0
    }

    let locks = ['ez_21', 'ez_35', 'ez_40', 'c001', 'c002', 'c003', 'l0cket'];
    let ez_passwords = ['open', 'unlock', 'release'];
    let colors = ['red', 'purple', 'blue', 'cyan', 'green', 'lime', 'yellow', 'orange'];
    let k3ys = ['tvfkyq', 'vc2c7q']; //only 6 more to find! 
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

    // does string have phrase in it?
    let includes = (string, phrase) => new RegExp(phrase, "ig").test(string);

    // get the last n lines
    let getLastNLines = (str, n) => str.split('\n').slice(-n)

    // advance the argument 
    let evolveArgument = (prop, values, lock, argument = {}) => {
        let results, last3
        for (let value of values) {
            argument = {...argument, [prop]: value}
            results = args.f.call(argument);
            last3 = getLastNLines(results, 3) 
            if (includes(last3, lock) || includes(last3, 'nn'))
                return {results, argument, failed: 0}
        }
        return {results, argument, failed: 1}
    }

    // figure out which lock we're on
    let determineTheCurrentLock = (lastLine) => {
        for (let lock of locks)
            if (includes(lastLine, lock))
                return lock
    }

    // solve at the lock level.  It might be better/faster in the future to solve on the 'step' level
    let unlock = (lock, argument) => {
        if (lock == locks[0]) 
            return evolveArgument(lock, ez_passwords, lock, argument)
        if (lock == locks[1])
            return evolveArgument('digit', digits, lock, evolveArgument(lock, ez_passwords, ['ig'], argument).argument)
        if (lock == locks[2])
            return evolveArgument('ez_prime', primes, lock, evolveArgument(lock, ez_passwords, ['_p'], argument).argument)
        if (lock == locks[3])
            return evolveArgument('color_digit', digits, lock, evolveArgument(lock, colors, ['_d'], argument).argument )
        if (lock == locks[4])
            return evolveArgument('c002_complement', colors, lock, evolveArgument(lock, colors, ['2_'], argument).argument)
        if (lock == locks[5])
            return evolveArgument('c003_triad_2', colors, lock, evolveArgument('c003_triad_1', colors, ['d_2'], evolveArgument(lock, colors, ['_1'], argument).argument).argument)
        if (lock == locks[6])
            return evolveArgument(lock, k3ys, lock, argument)
        return {results: lock, argument, failed: 1}
    }

    // This occurs when the script doesn't exist
    if (typeof state.results === 'object') {
        return state.results }

    // Loop through each lock until we get 'Connection terminated.'
    while(!state.failed && state.results && !includes(state.results, 'nn')) {
         state = unlock(determineTheCurrentLock(getLastNLines(state.results, 1)[0]), state.argument)
    }

    return state;
}