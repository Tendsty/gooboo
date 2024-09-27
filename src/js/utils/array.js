export { buildArray, shuffleArray, fallbackArray, filterUnique }

/**
 * Create an array with a fixed length
 * @param {Number} length Length of the desired array
 * @returns {Array} Array filled with incrementing numbers, starting with 0
 */
function buildArray(length = 0) {
    return Array(length).fill().map((x, i) => i);
}

/**
 * Takes an array and returns it with its elements in a random order
 * @param {Array} array
 * @returns {Array}
 */
function shuffleArray(array, rngGen = null) {
    if (rngGen === null) {
        rngGen = () => Math.random()
    }
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rngGen() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

/**
 * Take an element from an array, or a fallback value if the array is too short
 * @param {Array} array
 * @param {*} fallback
 * @param {Number} index
 * @returns An array element or the fallback value
 */
function fallbackArray(array = [], fallback = null, index = 0) {
    return (index >= 0 && index < array.length) ? array[index] : fallback;
}

/**
 * Return the array with duplicates removed
 * @param {Array} array
 * @returns {Array}
 */
function filterUnique(array) {
    return array.filter((v, i, a) => a.indexOf(v) === i);
}
