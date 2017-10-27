import chai = require('chai')
import R = require('ramda')
import fs = require("fs");
const should = chai.should();

const window = {};
declare var muddled
const code = 
// Read the file you want to test
fs.readFileSync('get_t1_locs.temp.js', 'utf8').toString()

// Trim out the function declaration and the return from the function
.split('\n').slice(1, -4).join('\n') +

// Add a function at the end that returns an object containing the tests we want to test
`\nfunction muddled() {
    return {
        getFirstCommands,
        getCommandKey,
        getUncorruptedInput,
        isCorrupted
    }   
}`

// since eval only returns the last expression it evaluated, 
// our 'Table of Contents' function (muddled) gives us access to the functions we want to test.

// Eval the hackmud script, with our testing modifications
eval(code);

// Write any stubs/helpers you need to run your tests
const log_box = [];
const specCommandGen = function *generator() {
        let i = 0;
        while(true) {
            i++
            if (i % 2 === 0) {
                // "Please specify a command with shªw:"<command name>"-- access directory with show:"list"
                
                // >>weathernet.public {}
                // Please specify a command with show:"<command name>"-§ access directory with show:"list"
                yield 'Please specify a command with navigation:"<command name>"Public coªmands are "description" "happening" -- access directory with navigation:"list"'
            } else {
                yield 'Please specify a command with navigat¨ion:"<command name>"Public commands are "description" "happening" -- access directory with navigation:"list"' 
            }
        }
    }()

const welcomeGen = function *generator() {
    let i = 0;
    while (true) {
        i++;
        if (i % 2 === 0) {
            yield `
            §                                                         ¤    
##### /    ##   ###                  ¢                  /    ¤                         ##### #     ##                  
######  /  #####    ###                                  #/                            ######  /#    #### /               
/#   /  /     #####   ###                       Á   #     ##                           /#   /  / ##    ###/   §      #     
/    /  ##     # ##  ¤   ##                         ##     ##              ©           /    /  /  ##    # #          ##     
/  ###     #         ##                         ##     ##                              /  /    ##   #            ##     
##   ##     #         ##    /##       /###     ######## ##  /##      /##  ###  /###    ## ##    ##   #    /##  ª######## 
##   ##     #         ##   ¢ ### Ã   / ###  / ########  ## / ###    / ###  ###/ #### / ## ##     ##  #   / ### ########  
##   ##     #         ##  /   ###   /   ###/    ¡##     ##/   ###  /   ###  ##   ###/  ## ##     ##  #  /   ###   ##     
##   ##     #         ## ##¦¢  ### ##    ##      ##     ##     ## ##    ##¡ ##         ## ##      ## # ##    ###  ##     
##   ##     #         ## ########  ##    ##  ¨   ##     ##     ## ########  ##         ## ##      ## # ########   ##     
##  ##     #         ## #######   ##    ##      ##     ##     ## #######   ##         #  ##       ### #######    ##     
## #      #         /  ##        ## ¢  ##      ##     ##     ## ##        ##            /        ### ##         ##     
###      /¢#      /   ####    / ##    /#      ##     ##     ## ####    / ##        /##/          ## ####    /  ##     
#######/ #######/     ######/   ####/ ##     ##     ##     ##  ######/  ###      /  #####           ######/   ##     
####     ####        #####     ###   ##   Ã #¢     ##    ##   #####    ###    /     Ã#             ###¤#     ##   ¨
                 /                    #                    ©       ¨       
                /        ¢             ##                                  
               /              ¦                                            
Á                              Ã                            /                                                            
Welcome to t¤e WeatherNet public information script. Please refrain from engaging in criminal activity.
updates | strategy | `
        } else {
            yield `    Á                                  ¤                ¢                                                                  Á
            ##### /    ##   ###                                     /                              ##### #     ##                  
         ######  /  #####    ###Ã                                 #/             Ã              ######  /#    #### /               
        /#   /  /     #####   ###                ª          #    §##                Ã          /#   /  / ##    ###/          #     
       /    /  ## ¦   # ##      ##                         ##     ##            ¨    ª        /    /  ©  ##    # #          ##     
           /  ###    ¦# §       ##                         ##     ##                              /  /    ## ¤ #   Á        ##     
          ##   ##     #         ##    /##       /#ª#     ######## ##  /##      /##  ###  /###    ©# ##    #ª   #    /##   ######## 
          ##   ##     #         ##   / ###     / #Ã#  / ########  ## / ###    / ###  ###/ #### / ## ##     ##  #   / ### ########  
          ##   ##     #         ##  /   ###   /   ###/     ##     ##/   ###  /   ###  ##   ###/  ## ##     ##  #  /   ¡##   ##     
          ##   ##     #         ## ##    ### ##    ##      ##     ##     ## ##    ### ##         ## ##      ## # ##    ###  ##     
          ##   ##     #         ## ########  ##    ##      ##     ##     ## ########  ##         ## ##      ## # ########   ##     
           ##  ##     #         ## #####ª#   ##    ##      ##     ##     ## #######   ##         #  ##       ### #######    ##     
            ## #      #         /  ##  ¦¡    ##    ##      ##     ##     ## ##        ##            /        ### ##         ##     
             ###      /##      /   ####    / ##    /#      ##     ##     ## ####    / ##        /##/          ## ####    /  ##     
       ¡      #######/ #######/     ######/   ####/ ##     ##     ##     ##  ######/  ###      /  #####           ######/   ##     
                ####     ####        #####     ###   ##     ##     ##    ##   #####    ###    /     ##             #####     ##    
                    Á                                       ©            /                    #                                    
                                                                        /                      ##                                  
                                                         ¦             /                                         ¡           Á     
                                                                      /                                                            
       Welcome to the WeatherNet public information script. Please refrain from engaging in cri§inal activity.
       updates | strategy | `
        }
    }
}()

const $fs = {
    scripts: {
        lib: () => { 
            return {
                log: x => log_box.push(x),
                get_log: () => log_box
            }
        }
    }
}

function f() {
    if (R.equals(this, {}))
        return specCommandGen.next().value
    return welcomeGen.next().value;
}

const args = {
    f: f
}

const commandList = muddled().getUncorruptedInput(args.f, {});
//Then test your functions by calling muddled().<function name>(<your args>)
// describe('get_t1_locs', () => {
//     describe('#getUncorruptedInput', () => {
//         it('should remove all junk chars', () => {
//             const res =  muddled().getUncorruptedInput(args.f, {})
//             code.length.should.be.above(1)
//             muddled().isCorrupted(res).should.equal(false)
//         })
//     })
//     describe('#getFirstCommands', () => {
//         it('should get an uncorrupted command word', () => {
//             const res = muddled().getFirstCommands(args.f)
//             Object.keys(res).length.should.be.above(0)
//             Object.values(res).map(muddled().isCorrupted).reduce((a,i) => a || i).should.be.false
//         })
//     })
//     describe('#getCommandKey', () => {
//         it('should get an uncorrupted command key', () => {
//             const res = muddled().getCommandKey(commandList)
//             res.length.should.be.above(0)
//             muddled().isCorrupted(res).should.be.false
//             res.should.equal('navigation')
//         })
//     })
//})