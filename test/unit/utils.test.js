import { randomInt, randomElem, weightSelect, chance, simpleHash, randomRound, randomFloat } from '../../src/js/utils/random';
import { formatNum, formatTime, buildNum, capitalize, decapitalize } from '../../src/js/utils/format';
import { getSequence, logBase } from '../../src/js/utils/math';
import { buildArray, fallbackArray, shuffleArray } from '../../src/js/utils/array';

expect.extend({
    toBeOneOf(received, results) {
        const pass = results.includes(received);
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be in ${results.toString()}`,
                    pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be in ${results.toString()}`,
                    pass: false,
            };
        }
    },
});

test('randomInt only picks integer', () => {
    expect(randomInt(1, 10)).toBeOneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('randomFloat stays in its range', () => {
    [{min: 0, max: 1}, {min: 10, max: 20}, {min: 1, max: 10}, {min: 6, max: 44}].forEach(range => {
        const num = randomFloat(range.min, range.max);
        expect(num).toBeGreaterThanOrEqual(range.min);
        expect(num).toBeLessThan(range.max);
    });
});

test('randomElem picks an element from an array', () => {
    const arr = ['foo', 'bar', 'test', 'elem'];
    expect(randomElem(arr)).toBeOneOf(arr);
    expect(randomElem(arr, 0.4)).toBe('bar');
    expect(randomElem(arr, 0.9)).toBe('elem');
});

test('formatNum converts small numbers (< 10000) to integers', () => {
    expect(formatNum(0.2)).toBe("0");
    expect(formatNum(0.6)).toBe("1");
    expect(formatNum(5)).toBe("5");
    expect(formatNum(7.5)).toBe("8");
    expect(formatNum(45.6789)).toBe("46");
    expect(formatNum(666)).toBe("666");
    expect(formatNum(9999)).toBe("9999");
});

test('formatNum applies suffixes to large numbers (>= 10000)', () => {
    expect(formatNum(10000)).toBe("10.00K");
    expect(formatNum(34567)).toBe("34.57K");
    expect(formatNum(455555)).toBe("455.6K");
    expect(formatNum(1200000)).toBe("1.200M");
    expect(formatNum(1234567890)).toBe("1.235B");
    expect(formatNum(11223344556677)).toBe("11.22T");
    expect(formatNum(4242424242424242)).toBe("4.242Qa");
});

test('formatNum can show decimals for small numbers', () => {
    expect(formatNum(0, true)).toBe("0");
    expect(formatNum(0.0001, true)).toBe("0.100m");
    expect(formatNum(0.001, true)).toBe("1.000m");
    expect(formatNum(0.01, true)).toBe("0.01");
    expect(formatNum(0.2, true)).toBe("0.2");
    expect(formatNum(0.99, true)).toBe("0.99");
    expect(formatNum(3.2, true)).toBe("3.2");
    expect(formatNum(6.66, true)).toBe("6.66");
    expect(formatNum(10, true)).toBe("10");
    expect(formatNum(500, true)).toBe("500");
    expect(formatNum(123456, true)).toBe("123.5K");
});

test('formatTime shows time in a readable format', () => {
    expect(formatTime(0)).toBe("0s");
    expect(formatTime(3.5)).toBe("3s");
    expect(formatTime(42)).toBe("42s");
    expect(formatTime(420)).toBe("7m 00s");
    expect(formatTime(1337)).toBe("22m 17s");
    expect(formatTime(3600)).toBe("1h 00m");
    expect(formatTime(77777)).toBe("21h 36m");
    expect(formatTime(86400)).toBe("1d 00h");
    expect(formatTime(250000)).toBe("2d 21h");
    expect(formatTime(1234567)).toBe("14d 06h");
    expect(formatTime(12345678)).toBe("142d");
    expect(formatTime(1234567890)).toBe("14.29Kd");
});

test('buildNum creates numbers correctly', () => {
    expect(buildNum(10, "K")).toBeCloseTo(10000, 5);
    expect(buildNum(23.456, "K")).toBeCloseTo(23456, 5);
    expect(buildNum(33, "M")).toBeCloseTo(33000000, 5);
    expect(buildNum(0.5, "B")).toBeCloseTo(500000000, 5);
    expect(buildNum(1.357, "Qi")).toBeCloseTo(1357000000000000000, 5);
});

test('logBase gives correct values', () => {
    expect(logBase(100, 10)).toBeCloseTo(2, 5);
    expect(logBase(10000, 10)).toBeCloseTo(4, 5);
    expect(logBase(128, 2)).toBeCloseTo(7, 5);
    expect(logBase(500000, 10)).toBeCloseTo(5.698970004336018, 5);
    expect(logBase(77777, 7)).toBeCloseTo(5.7873181051584135, 5);
});

test('sequence gives correct numbers', () => {
    expect(getSequence(1, 1)).toBeCloseTo(1, 5);
    expect(getSequence(1, 2)).toBeCloseTo(3, 5);
    expect(getSequence(1, 3)).toBeCloseTo(6, 5);
    expect(getSequence(1, 4)).toBeCloseTo(10, 5);
    expect(getSequence(1, 10)).toBeCloseTo(55, 5);
    expect(getSequence(2, 3)).toBeCloseTo(9, 5);
    expect(getSequence(5, 25)).toBeCloseTo(425, 5);
    expect(getSequence(12, 4)).toBeCloseTo(54, 5);
});

test('weightSelect chooses elements based on their weight', () => {
    const arr = [3, 1, 2, 3, 1];

    expect(weightSelect(arr)).toBeOneOf([0, 1, 2, 3, 4]);
    expect(weightSelect(arr, 0.05)).toBe(0);
    expect(weightSelect(arr, 0.15)).toBe(0);
    expect(weightSelect(arr, 0.25)).toBe(0);
    expect(weightSelect(arr, 0.35)).toBe(1);
    expect(weightSelect(arr, 0.45)).toBe(2);
    expect(weightSelect(arr, 0.55)).toBe(2);
    expect(weightSelect(arr, 0.65)).toBe(3);
    expect(weightSelect(arr, 0.75)).toBe(3);
    expect(weightSelect(arr, 0.85)).toBe(3);
    expect(weightSelect(arr, 0.95)).toBe(4);
    expect(weightSelect(arr, -1)).toBe(0);
    expect(weightSelect(arr, 2)).toBe(4);
});

test('chance can return true or false to pass', () => {
    expect(chance(0.5)).toBeOneOf([true, false]);
    expect(chance(0)).toBe(false);
    expect(chance(1)).toBe(true);
    expect(chance(0.5, 0.5)).toBe(false);
    expect(chance(0.5, 0.4)).toBe(true);
    expect(chance(0.5, 0.6)).toBe(false);
});

test('simple hash is always 8 characters long', () => {
    ['Lorem ipsum, dolor sit amet...', 'hi', 'test', '', 'gooboo', 'imbored', 'whatever'].forEach(text => {
        expect(simpleHash(text).length).toBe(8);
    });
});

test('hash is the same for the same text, one character changes that', () => {
    expect(simpleHash('test')).toBe(simpleHash('test'));
    expect(simpleHash('text')).not.toBe(simpleHash('test'));
});

test('randomRound rounds to a nearby integer', () => {
    expect(randomRound(2.5)).toBeOneOf([2, 3]);
    expect(randomRound(6)).toBe(6);
    expect(randomRound(20)).toBe(20);
    expect(randomRound(4.5, 0.5)).toBe(4);
    expect(randomRound(4.5, 0.4)).toBe(5);
    expect(randomRound(4.5, 0.6)).toBe(4);
});

test('capitalization helpers work', () => {
    expect(capitalize('test')).toBe('Test');
    expect(capitalize('TEST')).toBe('TEST');
    expect(capitalize('one of THE Tests')).toBe('One of THE Tests');
    expect(capitalize('tEsT')).toBe('TEsT');
    expect(decapitalize('Test')).toBe('test');
    expect(decapitalize('TEST')).toBe('tEST');
    expect(decapitalize('test')).toBe('test');
    expect(decapitalize('TeSt')).toBe('teSt');
});

test('array can be built', () => {
    expect(buildArray(5)).toEqual([0, 1, 2, 3, 4]);
    expect(buildArray(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(buildArray(2)).toEqual([0, 1]);
});

test('array can be shuffled', () => {
    const arr = ['foo', 'bar', 'test', 'elem'];

    expect(shuffleArray(arr)[0]).toBeOneOf(arr);
});

test('array can have a fallback', () => {
    const arr = ['foo', 'bar', 'test', 'elem'];

    expect(fallbackArray(arr, 'oops', 0)).toBe('foo');
    expect(fallbackArray(arr, 'oops', 1)).toBe('bar');
    expect(fallbackArray(arr, 'oops', 2)).toBe('test');
    expect(fallbackArray(arr, 'oops', 3)).toBe('elem');
    expect(fallbackArray(arr, 'oops', 4)).toBe('oops');
    expect(fallbackArray(arr, 'oops', 500)).toBe('oops');
});
