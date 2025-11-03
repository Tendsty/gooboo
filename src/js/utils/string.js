export { setCharAt }

function setCharAt(str, index, chr) {
    return str.substring(0, index) + chr + str.substring(index + 1);
}
