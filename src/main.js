import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import { newGame, loadGame } from './js/init';
import { checkLocal } from './js/savefile';
import gbPlugin from './gbPlugin';
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/900.css";
import "@fontsource/caveat/400.css";
import "@fontsource/roboto-mono/400.css";
import GoobooTooltip from './components/partial/render/GoobooTooltip.vue';
import { APP_TESTING } from './js/constants';

Vue.config.productionTip = false

Vue.use(gbPlugin);

// Handle javascript errors
window.onerror = function(message, source, line, column) {
    store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
        type: 'error',
        tech: 'javascript',
        source,
        message,
        line,
        column
    }});
};

const localFile = checkLocal();

if (localFile) {
    if (!loadGame(localFile)) {
        newGame();
    }
} else {
    newGame();
}

Vue.component('gb-tooltip', GoobooTooltip);

new Vue({
    vuetify,
    store,
    render: h => h(App),

    // Handle vue.js errors
    errorCaptured: function(err) {
        store.commit('system/addNotification', {color: 'error', timeout: -1, message: {
            type: 'error',
            tech: 'vuejs',
            source: err.fileName,
            message: err.message,
            line: err.lineNumber,
            column: err.columnNumber
        }});
    }
}).$mount('#app')

// Duplicate tab check
const channel = new BroadcastChannel(APP_TESTING ? 'tabtest' : 'tab');
let isOriginal = true;
channel.postMessage('another-tab');
channel.addEventListener('message', (msg) => {
    if (msg.data === 'another-tab' && isOriginal) {
        channel.postMessage('already-open');
    }
    if (msg.data === 'already-open') {
        isOriginal = false;
        store.commit('system/updateKey', {key: 'screen', value: 'tab-duplicate'});
    }
});
