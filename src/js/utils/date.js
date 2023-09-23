export { getDay, getWeek }

/**
 * Get a readable string representation of the current day of a date
 * @param {Date} date The date object used to get the day string
 * @param {Boolean} includeOffset Whether to manually calculate the timezone offset or not
 * @returns {String} The date as string in YYYY-MM-DD format
 */
function getDay(date = new Date()) {
    return applyOffset(date).toISOString().substring(0, 10);
}

/**
 * Get the week number from a date
 * @param {Date} date The date object used to get the week number
 * @returns {Number} The week number starting from 1970
 */
function getWeek(date = new Date()) {
    return Math.floor((applyOffset(date).getTime() + 3 * 86400000) / 604800000);
}

function applyOffset(date = new Date()) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
}
