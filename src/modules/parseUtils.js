'use strict';

/**
 * selectUntil:
 *      accepts text<string>, condition<function>
 *      condition must be able to recieve a string parameter, and return true once a certain caracter (or set of characters) is met
 * 
 *          example for stopping selection once ";" is found: 
 *              selectUntil("some stuff;", (char) => {return (char === ";")})
 *              }))
 * 
 *          the slection would stop at ";", and "some stuff" will be returned
 *          if the condition function never fires, the whole string will be returned
 * 
 * removeUntil:
 *      accepts text<string>, condition<function>
 *      the opposite of selectuntil
 *      will ignore characters until the condition you provide returns true, after which, it will return the rest of the string
 *          example: removeUntil(
 *                      "1234abcd",
 *                      (char) => {return isNaN(char)}
 *                   )
 *                  returns: "abcd"
 * 
 * selectBetween:
 *      accepts text<string>, parameters<object>
 *      parameters must have two properties, start and end. these can be the same
 *          start and end must be what two things to select between, eg: properties = {start: "{", end: "}"}
 *              this will only select things in the string between { and }
 *          nesting is supported! so if you have, for example: string 1 {string 2 {string 3}}, the selectbetwen will return "string2 {string3}"
 * 
 *  presets:
 *      presets are pre-made functions you can use instead of writing out entire functions for each selector
 *      
 *      charEquals:
 *          accepts string array
 *          this will check if each individual character matches any of the caracters provided in the array, and return true if any do
 */

module.exports = {
    "selectUntil": (text, condition) => {
        let sum = [];
        let chars = text.split("");

        for(var i = 0; i < chars.length; i++) {
            let char = chars[i];

            if(condition(char)) {
                return sum.join('');
            } else {
                sum.push(char);
            }
        }

        return sum.join('');
    },

    "removeUntil": (text, condition) => {
        let sum = [];
        let chars = text.split("");
        let initiated = false;

        for(var i = 0; i < chars.length; i++) {
            let char = chars[i];

            if(condition(char)) {
                initiated = true;
            }

            if(initiated) {
                sum.push(char);
            }
        }

        return sum.join('');
    },

    "selectBetween": (text, parameters) => {
        let sum = [];
        let chars = text.split("");
        let layers = 0;
        let selectionStarted = false;

        for(var i = 0; i < chars.length; i++) {
            let char = chars[i];

            if(char === parameters.start) {
                layers ++;
                if(!selectionStarted) {
                    selectionStarted = true;
                };
            } else if(char === parameters.end) {
                layers --;
            }

            if(selectionStarted) {
                if(layers == 0) {
                    return sum.join('');
                } else {
                    sum.push(char);
                }
            }
        }
    },
    "presets": {
        "charEquals": (possibilities) => {
            return function(char) {
                return possibilities.includes(char);
            }
        }
    }
}

function noop(){};