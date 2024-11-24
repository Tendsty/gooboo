const { formatNum, formatTime, formatRoman, formatInt } = require("./js/utils/format");

export default {
    install: function(Vue) {
        Vue.prototype.$formatNum = formatNum;
        Vue.prototype.$formatTime = formatTime;
        Vue.prototype.$formatRoman = formatRoman;
        Vue.prototype.$formatInt = formatInt;
    }
}
