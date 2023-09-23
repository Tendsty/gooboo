export { filterColor, filterColorObject, mergeColorObject }

const Color = require("color");

/**
 * 
 * @param {*} color a color in any form that can be parsed by the color library
 * @param {Function} filter a filter function used to modify the color
 * @returns {String} hex value of the filtered color
 */
function filterColor(color, filter) {
    return filter(Color(color)).hex();
}

/**
 * 
 * @param {Object} obj an object filled with colors in a parsable form
 * @param {Function} filter a filter function used to modify the color
 * @returns an object filled with hex values of the filtered colors
 */
function filterColorObject(obj, filter) {
    let newObj = {};
    for (const [key, elem] of Object.entries(obj)) {
        newObj[key] = typeof elem === 'object' ? filterColorObject(elem, filter) : filterColor(elem, filter);
    }
    return newObj;
}

 function mergeColorObject(obj1, obj2, weight = 0.5) {
    let newObj = {};
    for (const [key, elem] of Object.entries(obj1)) {
        newObj[key] = typeof elem === 'object' ? mergeColorObject(elem, obj2[key], weight) : Color(elem).mix(Color(obj2[key]), weight).hex();
    }
    return newObj;
}
