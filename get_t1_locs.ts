function(context, args) {
    // checks if any of the chars in the string are non-ascii
    const isCharCorrupted = char => char.charCodeAt(0) > 122
    const isCorrupted = str => str.split('').some(isCharCorrupted)
    // swaps from str1 to str2 at index
    const swap = (source: [], dest: [], i: number) => {
        dest.splice(i, 3, source[i])
        return dest;
    }

    const getLength = (a, b) => Math.min(a.length, b.length);
    const getUncorruptedInput = (fn, arg) => {
        let results = [1, 2].map(x => fn.call(arg).replace(/[^\x00-\x7F]/g, "").split(''))//.split(''))
        let len = getLength(results[0], results[1]);

        for (let i = 0; i < len; i++) {
            if (results[0][i] === '`')
                results[0] = swap(results[1], results[0], i)
            if (results[1][i] === '`')
                results[1] = swap(results[0], results[1], i)

            len = getLength(results[0], results[1]);
        }
        return results[0].join('')
    }

    const getFirstCommands = (fn): string[] =>
        getUncorruptedInput(fn, undefined).split('\n')
           .slice(-1)[0]
           .split(' ')
           .filter(x => /[a-zA-Z]/.test(x))

    const getCommandKey = (fn) => /ith\s(\w+)\b/g.exec(getUncorruptedInput(fn, {}))[1]

    return getUncorruptedInput(args.f, {})
}