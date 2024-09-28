import store from "../../store"
import { buildArray } from "../utils/array";
import { buildNum } from "../utils/format";

export default {
    name: 'achievement',
    tickspeed: 1,
    unlockNeeded: 'achievementFeature',
    tick() {
        store.dispatch('achievement/check');
    },
    unlock: ['achievementFeature'],
    relic: {
        excavator: {icon: 'mdi-excavator', feature: ['achievement', 'mining'], color: 'orange', effect: [
            {name: 'currencyMiningScrapGain', type: 'mult', value: 2},
            {name: 'currencyMiningScrapCap', type: 'mult', value: 2}
        ]},
        redCard: {icon: 'mdi-cards', feature: ['achievement', 'horde'], color: 'red', effect: [
            {name: 'currencyHordeMonsterPartCap', type: 'bonus', value: buildNum(10, 'K')},
            {name: 'hordeCardCap', type: 'base', value: 1}
        ]},
        briefcase: {icon: 'mdi-briefcase', feature: ['achievement', 'treasure'], color: 'pale-blue', effect: [
            {name: 'treasureSlots', type: 'base', value: 8}
        ]},
        strangePlant: {icon: 'mdi-sprout', feature: ['achievement', 'village', 'farm'], color: 'pale-purple', effect: [
            {name: 'villageMaterialGain', type: 'mult', value: 2},
            {name: 'farmCropGain', type: 'mult', value: 2}
        ]},
        beneficialVirus: {icon: 'mdi-virus', feature: ['achievement', 'mining', 'horde'], color: 'pale-green', effect: [
            {name: 'miningToughness', type: 'mult', value: 0.5},
            {name: 'hordeCorruption', type: 'bonus', value: -0.5}
        ]}
    },
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
