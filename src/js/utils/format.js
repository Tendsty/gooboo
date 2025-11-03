import store from "../../store";
import { SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_MINUTE, SECONDS_PER_YEAR } from "../constants";

const numFormatters = [
    '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D',
    'UD', 'DD', 'TD', 'QaD', 'QiD', 'SxD', 'SpD', 'OD', 'ND', 'V',
    'UV', 'DV', 'TV', 'QaV', 'QiV', 'SxV', 'SpV', 'OV', 'NV', 'Tg',
    'UT', 'DT', 'TT', 'QaT', 'QiT', 'SxT', 'SpT', 'OT', 'NT', 'Qag',
    'UQag', 'DQag', 'TQag', 'QaQag', 'QiQag', 'SxQag', 'SpQag', 'OQag', 'NQag', 'Qig',
    'UQig', 'DQig', 'TQig', 'QaQig', 'QiQig', 'SxQig', 'SpQig', 'OQig', 'NQig', 'Sxg',
    'USxg', 'DSxg', 'TSxg', 'QaSxg', 'QiSxg', 'SxSxg', 'SpSxg', 'OSxg', 'NSxg', 'Spg',
    'USpg', 'DSpg', 'TSpg', 'QaSpg', 'QiSpg', 'SxSpg', 'SpSpg', 'OSpg', 'NSpg', 'Og',
    'UOg', 'DOg', 'TOg', 'QaOg', 'QiOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Ng',
    'UNg', 'DNg', 'TNg', 'QaNg', 'QiNg', 'SxNg', 'SpNg', 'ONg', 'NNg', 'C',
    'UC' // 179.8 UC is the largest possible number in js, no need to extend this list further
];
const numNegativeFormatters = ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'];

export { numFormatters, numNegativeFormatters, roundNear, formatNum, formatInt, formatTime, formatGrade, formatRoman, buildNum, capitalize, decapitalize }

function roundNear(num, decimals = 9) {
    if (num === 0) {
        return 0;
    }
    const numMod = Math.pow(10, decimals - Math.floor(Math.log10(num)));
    return Math.round(num * numMod) / numMod;
}

/**
 * Display a number in a nice format
 * @param {Number} amount the number to show
 * @param {Boolean} showDecimals whether to show decimals for small numbers or not
 * @returns {String}
 */
function formatNum(amount, showDecimals = false) {
    if (isNaN(amount)) {
        console.error(amount + ' is not a number');
        return 'NaN';
    }
    let negativePrefix = '';
    if (amount < 0) {
        amount = Math.abs(amount);
        negativePrefix = '-';
    }
    const numBase = Math.floor(Math.log10(amount));

    if (amount === Infinity) {
        return negativePrefix + '∞';
    }

    const formatting = store.state.system.settings.general.items.numberFormatting.value;

    if (showDecimals) {
        if (numBase === -Infinity) {
            return '0';
        } else if (numBase < -2) {
            if (formatting === 'scientific') {
                const tempVal = amount * Math.pow(10, 0 - numBase);
                const exponent = 0 - numBase;
                return negativePrefix + tempVal.toFixed(3) + 'e-' + exponent;
            }
            const tempVal = amount * Math.pow(10, Math.floor(0 - numBase / 3) * 3);
            const exponent = Math.floor((0 - numBase) / 3);
            return negativePrefix + tempVal.toFixed(3) + ((exponent <= numNegativeFormatters.length && formatting === 'standard') ? numNegativeFormatters[exponent - 1] : ('e-' + (exponent * 3)));
        } else if (numBase < 3) {
            // Round to 9 digits to fix rounding inaccuracies caused by the float type
            return negativePrefix + roundNear(amount).toString().slice(0, 5);
        }
    }

    if (numBase < 4) {
        return negativePrefix + Math.floor(amount);
    } else if (formatting === 'scientific') {
        const tempVal = amount / Math.pow(10, numBase);
        return negativePrefix + tempVal.toPrecision(4) + 'e' + numBase;
    } else if (formatting === 'engineering') {
        const tempVal = amount / Math.pow(10, Math.floor(numBase / 3) * 3);
        return negativePrefix + tempVal.toPrecision(4) + 'e' + (Math.floor(numBase / 3) * 3);
    } else if (Math.floor(numBase / 3) < numFormatters.length) {
        const tempVal = amount / Math.pow(10, Math.floor(numBase / 3) * 3);
        return negativePrefix + tempVal.toPrecision(4) + numFormatters[Math.floor(numBase / 3)];
    } else {
        return negativePrefix + amount.toPrecision(4);
    }
}

/**
 * Display a number with thousands separator
 * @param {Number} num the number to show
 * @returns {String}
 */
function formatInt(num) {
    if (num < 10000) {
        return num.toString();
    }
    let locale;
    switch (store.state.system.settings.general.items.lang.value) {
        case 'en':
            locale = 'en-US';
            break;
        case 'de':
            locale = 'de-DE';
            break;
    }
    return num.toLocaleString(locale);
}

/**
 * Display time in a nice format
 * @param {Number} seconds time in seconds
 * @returns {String}
 */
function formatTime(seconds, minimumUnit = 's') {
    let min = ['ms', 's', 'm', 'h', 'd', 'y'].indexOf(minimumUnit);
    let negativePrefix = '';
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        negativePrefix = '-';
    }
    if (seconds === Infinity) {
        return negativePrefix + '∞';
    }
    if (seconds < 1 && min < 1) {
        // display milliseconds only
        return negativePrefix + Math.floor(seconds * 1000) + 'ms';
    } else if (seconds < SECONDS_PER_MINUTE && min < 2) {
        // display seconds only
        return negativePrefix + Math.floor(seconds) + 's';
    } else if (seconds < SECONDS_PER_HOUR && min < 3) {
        // display minutes and seconds
        return negativePrefix + Math.floor(seconds / SECONDS_PER_MINUTE) + 'm' + (min < 2 ? (' ' + (Math.floor(seconds % SECONDS_PER_MINUTE) < 10 ? '0' : '') + Math.floor(seconds % SECONDS_PER_MINUTE) + 's') : '');
    } else if (seconds < SECONDS_PER_DAY && min < 4) {
        // display hours and minutes
        return negativePrefix + Math.floor(seconds / SECONDS_PER_HOUR) + 'h' + (min < 3 ? (' ' + (Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE) < 10 ? '0' : '') + Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE) + 'm') : '');
    } else if (seconds < (100 * SECONDS_PER_DAY) && min < 5) {
        // display days and hours
        return negativePrefix + Math.floor(seconds / SECONDS_PER_DAY) + 'd' + (min < 4 ? (' ' + (Math.floor((seconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR) < 10 ? '0' : '') + Math.floor((seconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR) + 'h') : '');
    } else if (seconds < SECONDS_PER_YEAR && min < 5) {
        // display days only
        return negativePrefix + formatNum(Math.floor(seconds / SECONDS_PER_DAY)) + 'd';
    } else if (seconds < (100 * SECONDS_PER_YEAR)) {
        // display years and days
        return negativePrefix + Math.floor(seconds / SECONDS_PER_YEAR) + 'y' + (min < 5 ? (' ' + Math.floor((seconds % SECONDS_PER_YEAR) / SECONDS_PER_DAY) + 'd') : '');
    } else {
        // display years only
        return negativePrefix + formatNum(Math.floor(seconds / SECONDS_PER_YEAR)) + 'y';
    }
}

/**
 * Converts a grade number to a readable grade
 * @param {Number} grade Grade to convert
 * @returns A string with the grade name
 */
function formatGrade(grade) {
    if (grade <= 0) {
        return 'F';
    }
    if (grade >= 16) {
        return 'S+' + (grade - 14);
    }
    let eloString = '';
    const newGrade = grade - 1;
    const gradeTier = Math.floor(newGrade / 3);
    const gradeModifier = newGrade % 3;
    switch (gradeTier) {
        case 0:
            eloString = 'D';
            break;
        case 1:
            eloString = 'C';
            break;
        case 2:
            eloString = 'B';
            break;
        case 3:
            eloString = 'A';
            break;
        case 4:
            eloString = 'S';
            break;
        default:
            eloString = '?';
            break;
    }
    switch (gradeModifier) {
        case 0:
            eloString += '-';
            break;
        case 1:
            break;
        case 2:
            eloString += '+';
            break;
    }
    return eloString;
}

function formatRoman(num) {
    if (isNaN(num))
        return NaN;
    let digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
}

/**
 * build a number from a decimal part and a suffix
 * @param {Number} number decimal part of the number
 * @param {String} suffix shorthand value of the desired magnitude
 * @returns {Number}
 */
function buildNum(number, suffix = '') {
    let magnitude = numFormatters.findIndex(el => el === suffix);
    if (magnitude === -1) {
        console.warn('Invalid suffix: ' + suffix);
        magnitude = 0;
    }
    const num = number * Math.pow(1000, magnitude);
    if (num < 10000) {
        console.warn(`Number ${Math.round(num)} is smaller than 10K`);
    }
    return num;
}

/**
 * Returns a string with the first character capitalized
 * @param {String} string
 * @returns {String}
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns a string with the first character decapitalized
 * @param {String} string
 * @returns {String}
 */
function decapitalize(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
