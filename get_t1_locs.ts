function(context, args) {
    // checks if any of the chars in the string are non-ascii

    /**
     * @param {string} char 
     * @returns {boolean} 
     */
    function isCharCorrupted (char: string): boolean { return char.charCodeAt(0) > 122} 

    /**
     * @param {string} str 
     * @returns {boolean} 
     */
    function isCorrupted (str:string): boolean { return str.split('').some(isCharCorrupted)} 

    /**
     * @param {string} x 
     * @returns {string} 
     */
    function toLowerCase (x:string): string { return x.toLowerCase();} 

    /**
     * @param {string[]} source 
     * @param {string[]} dest 
     * @param {number} i 
     * @returns {string[]} 
     */
    function swap (source: string[], dest: string[], i: number): string[] { 
        dest.splice(i, 3, source[i])
        return dest;
    }

    /**
     * @param {Array} a 
     * @param {Array} i 
     * @returns 
     */
    function flatten (a: [], i: []) { return a.concat(i)} 

    /**
     * @param {(string|Array)} a 
     * @param {(string|Array)} b 
     * @returns {number} 
     */
    function getLength (a:string|any[], b:string|any[]): number { return Math.min(a.length, b.length);} 

    /**
     * @param {function(): string} fn 
     * @param {*} arg 
     * @returns {string} 
     */
    function getUncorruptedInput (fn: Function, arg: any): string { 
        let first = fn.call(arg);
        let second = fn.call(arg);
        if (typeof first == 'object') {
            first = first.join('\n')
            second = second.join('\n')
        }
        let m = [first, second];
        let results = m.map(x => x.replace(/[^\x00-\x7F]/g, '').split(''))
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

    /**
     * @param {function(): string} fn 
     * @returns {Array<string>} 
     */
    function getFirstCommands (fn: Function): {blogCommand: string, passwordCommand: string} { 
        const arr = getUncorruptedInput(fn, undefined).split('\n')
           .slice(-1)[0]
           .split(' ')
           .filter(x => /[a-zA-Z]/.test(x))
        return {blogCommand: arr[0], passwordCommand: arr[1]}
    }

    /**
     * @param {string} commandList 
     * @returns {string} 
     */
    function getCommandKey (commandList: string): string { 
        const res = /ith\s(\w+)\b/g.exec(commandList)[1]
        return res;
    }

    /**
     * @param {function(): string} fn 
     * @param {string} key 
     * @param {string} command 
     * @returns {string} 
     */
    function getBlog (fn: () => string, key: string, command: string): string { 
        return getUncorruptedInput(fn, {[key]: command})
    }

    /**
     * @param {string} commandList 
     * @returns {string} 
     */
    function getDirectory (commandList:string):string { 
        const lastLine = commandList.split('\n').slice(-1)[0];
        return /ith.*\:\"(\w+)/.exec(lastLine)[1] 
    }

    /**
     * @param {function(): string} fn 
     * @param {string} key 
     * @param {string} command 
     * @returns {string} 
     */
    function getPassword (fn: Function, key: string, command: string): string { 
        const aboutStr = getUncorruptedInput(fn, {[key]: command});
        return /tegy\s(\w+)/.exec(aboutStr)[1]
    }

    /**
     * @param {function(): string} fn 
     * @param {string} key 
     * @param {string} directory 
     * @param {string} password 
     * @returns {string} 
     */
    function getPasskey (fn: Function, key: string, directory: string, password:string): string { 
        for (let pw: string of ['p', 'pass', 'password']) {
            let res = getUncorruptedInput(fn, {[key]: directory, [pw]: password})
            if (/Aut/.test(res))
                return pw;
        }
    }

    const includes = arr => str1 => arr.some(str2 => toLowerCase(str1).includes(toLowerCase(str2)))
   
     /**
     * @param {string} blog 
     * @param {any} keys 
     * @returns {Array<string>} 
     */
    function getProjectStrings(blog: string, keys): Array<string> {
        return Array.from(new Set(blog.split('\n')
            .filter(includes(keys))
            .map(x => x.split(" "))
            .reduce(flatten, [])
            .filter(x => x.length > 6 && !includes(keys)(x))))
    }

    function getLocs(fn: Function, projectStrings: Array<string>, key, directory, passKey, password) {
        return projectStrings.map(project => getUncorruptedInput(fn, {[key]: directory, 'project': project, [passKey]: password}))
                             .map(x => x.split('\n'))
                             .reduce(flatten, [])
                             .filter(x => x.length < 50 && !includes(['|', '<'])(x))
                             
    }

    /**
     * @param {function(): string} fn 
     */
    function main (fn: Function) { 
        let locs = []
        const keys: string[] = ['dev', 'rev', 'proj', 'beta']
        const commandList = getUncorruptedInput(fn, {});
        const commands = getFirstCommands(fn);
        const key = getCommandKey(commandList);
        const blog = getUncorruptedInput(fn, {[key]: commands.blogCommand});
        const directory = getDirectory(commandList)
        const password = getPassword(fn, key, commands.passwordCommand);
        const passkey = getPasskey(fn, key, directory, password)
        const projectStrings = getProjectStrings(blog, keys)
        locs = getLocs(fn, projectStrings, key, directory, passkey, password)
        return locs
    }
    
    return main(args.f)
}