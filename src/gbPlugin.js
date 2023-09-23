const { formatNum, formatTime, formatRoman } = require("./js/utils/format");

export default {
    install: function(Vue) {
        Vue.prototype.$formatNum = formatNum;
        Vue.prototype.$formatTime = formatTime;
        Vue.prototype.$formatRoman = formatRoman;
    }
}
