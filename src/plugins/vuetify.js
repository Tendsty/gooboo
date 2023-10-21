import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import '@mdi/font/css/materialdesignicons.css'

import en from '../lang/en';
import de from '../lang/de';
import { checkLocal, decodeFile } from '../js/savefile';
import themes from '../js/theme/themes';

let theme = 'default';
const localFile = checkLocal();
if (localFile) {
    const save = decodeFile(localFile, false);
    if (save?.theme) {
        theme = save.theme;
    }
}

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        options: {customProperties: true},
        themes: {
            light: {...themes.default.light, ...themes[theme].light},
            dark: {...themes.default.dark, ...themes[theme].dark}
        }
    },
    lang: {
        locales: { en, de },
        current: "en"
    }
});
