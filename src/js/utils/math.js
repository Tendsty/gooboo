export { logBase, getSequence, splicedLinear, splicedPow, splicedPowLinear, deltaLinear, digitSum }

/**
 * Returns the logarithm of a number
 * @param {Number} num
 * @param {Number} base
 * @returns {Number}
 */
function logBase(num, base) {
    return Math.log(num) / Math.log(base);
}

/**
 * Returns the number of a sequence (1, 3, 6, 10, 15, 21, ...)
 * @param {Number} base
 * @param {Number} pos
 * @returns {Number}
 */
function getSequence(base = 1, pos = 1) {
    return Math.round((base + (pos - 1) / 2) * pos);
}

function splicedLinear(increase1, increase2, breakpoint, value) {
    return Math.max(0, value - breakpoint) * increase2 + Math.min(breakpoint, value) * increase1;
}

function splicedPow(exponent1, exponent2, breakpoint, value) {
    return Math.pow(exponent2, Math.max(0, value - breakpoint)) * Math.pow(exponent1, Math.min(breakpoint, value));
}

function splicedPowLinear(exponent, increase, breakpoint, value) {
    return (Math.max(0, value - breakpoint) * increase + 1) * Math.pow(exponent, Math.min(breakpoint, value));
}

function deltaLinear(base, increase, amount = 1, skip = 0) {
    const finalBase = increase * skip + base;
    return (finalBase + ((amount - 1) * increase / 2)) * amount;
}

function digitSum(num) {
    return `${num}`.split('').reduce((acc, n) => acc += parseInt(n), 0);
}
