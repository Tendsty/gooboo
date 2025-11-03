import store from "../../store"
import { buildArray } from "../utils/array";
import relic from "./achievement/relic";

export default {
    name: 'achievement',
    tickspeed: 1,
    unlockNeeded: 'achievementFeature',
    tick() {
        store.dispatch('achievement/check');
    },
    unlock: ['achievementFeature'],
    relic,
    note: buildArray(1).map(() => 'g'),
    saveGame() {
        let obj = {};

        for (const [key, elem] of Object.entries(store.state.achievement)) {
            if (elem.level > 0) {
                obj[key] = elem.level;
            }
        }

        return obj;
    },
    loadGame(data) {
        for (const [key, elem] of Object.entries(data)) {
            if (store.state.achievement[key] !== undefined) {
                store.commit('achievement/updateKey', {name: key, key: 'cacheHideNotification', value: elem});
            }
        }
        store.dispatch('achievement/check');
    }
}
