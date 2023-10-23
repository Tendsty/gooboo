export { randomInt, randomFloat, randomElem, weightSelect, chance, randomRound, simpleHash, randomHex }

/**
 * Return a random integer between two numbers
 * @param {Number} min minimum value returned
 * @param {Number} max maximum value returned
 * @param {Number} rng random seed between 0 and 1 (exclusive)
 * @returns {Number}
 */
function randomInt(min, max, rng = Math.random()) {
    return Math.floor(rng * (1 + max - min) + min);
}

/**
 * Return a random number between two numbers
 * @param {Number} min minimum value returned
 * @param {Number} max maximum value returned (never reached, only approached)
 * @param {Number} rng random seed between 0 and 1 (exclusive)
 * @returns {Number}
 */
function randomFloat(min, max, rng = Math.random()) {
    return rng * (max - min) + min;
}

/**
 * Picks a random element from an array
 * @param {Array} array array of elements
 * @param {Number} rng random seed between 0 and 1 (exclusive)
 * @returns chosen array element
 */
function randomElem(array, rng = Math.random()) {
    return array[randomInt(0, array.length - 1, rng)];
}

/**
 * Selects an option from an array based on weights
 * @param {Array} weights array with weight values
 * @param {Number} rng random seed between 0 and 1 (exclusive)
 * @returns {Number} chosen array index
 */
function weightSelect(weights, rng = Math.random()) {
    // exclude 1
    if (rng >= 1) {
        rng = 0.99999999;
    }

    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let currentWeight = 0;
    let chosenValue = rng * totalWeight;

    return weights.findIndex((elem) => {
        if (currentWeight + elem > chosenValue) {
            return true;
        }
        currentWeight += elem;
        return false;
    })
}

/**
 * Returns true or false based on a random chance
 * @param {Number} chance odds of this function passing
 * @param {Number} rng random seed between 0 and 1 (exclusive)
 * @returns {Boolean}
 */
function chance(chance, rng = Math.random()) {
    return rng < chance;
}

/**
 * Rounds a number to an adjacent integer value, the decimals
 * determine the chance to round down or up
 * @param {Number} num The number to be rounded
 * @returns {Number} Rounded number as integer value
 */
function randomRound(num, rng = Math.random()) {
    return Math.floor(num) + (chance(num - Math.floor(num), rng) ? 1 : 0);
}

/**
 * Generates a simple hash value from an input value
 * @param {String} str The input used to generate the hash
 * @returns {String} A short hash value
 */
function simpleHash(str) {
    let hash = 0, i = 0, len = str.length;
    while (i < len) {
        hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return (hash + 2147483647).toString(16);
}

/**
 * Generates a random hex string
 * @param {Number} length The amount of characters the output will have
 * @returns {String} A hex string
 */
function randomHex(length = 8) {
    let result = '';
    let chars = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomInt(0, 15));
    }
    return result;
}
