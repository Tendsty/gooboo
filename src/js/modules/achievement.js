import store from "../../store"
import { buildArray } from "../utils/array";

export default {
    name: 'achievement',
    tickspeed: 1,
    unlockNeeded: 'achievementFeature',
    tick() {
        for (let [key, elem] of Object.entries(store.state.achievement)) {

            let oldLevel = elem.level;
            const value = elem.value();
            while ((elem.cap === null || elem.level < elem.cap) && value >= elem.milestones(elem.level)) {

                // Award relic if one is the reward
                if (elem.relic[elem.level]) {
                    store.dispatch('relic/find', elem.relic[elem.level]);
                }
                store.commit('achievement/updateKey', {name: key, key: 'level', value: elem.level + 1});
                elem = store.state.achievement[key];
            }

            // Create a notification if setting is on, also group multiple of the same achievement
            if (store.state.system.settings.notification.items.achievement.value && elem.level > oldLevel) {
                store.commit('system/addNotification', {color: elem.secret ? 'purple' : 'success', timeout: 5000, message: {
                    type: 'achievement',
                    name: key,
                    value: elem.level,
                    oldValue: oldLevel
                }});
            }
        }
    },
    unlock: ['achievementFeature'],
    relic: {
        excavator: {icon: 'mdi-excavator', color: 'orange', effect: [
            {name: 'currencyMiningScrapGain', type: 'mult', value: 2},
            {name: 'currencyMiningScrapCap', type: 'mult', value: 2}
        ]},
        redCard: {icon: 'mdi-cards', color: 'red', effect: [
            {name: 'currencyHordeMonsterPartCap', type: 'bonus', value: 1000},
            {name: 'hordeCardCap', type: 'base', value: 1}
        ]},
        briefcase: {icon: 'mdi-briefcase', color: 'pale-blue', effect: [
            {name: 'treasureSlots', type: 'base', value: 8}
        ]},
        strangePlant: {icon: 'mdi-sprout', color: 'pale-purple', effect: [
            {name: 'villageMaterialGain', type: 'mult', value: 2},
            {name: 'farmCropGain', type: 'mult', value: 2}
        ]},
        beneficialVirus: {icon: 'mdi-virus', color: 'pale-green', effect: [
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
                store.commit('achievement/updateKey', {name: key, key: 'level', value: elem});

                // Recover "lost" relics
                for (let i = 0; i < elem; i++) {
                    let relic = store.state.achievement[key].relic[i];
                    if (relic && !store.state.relic[relic].found) {
                        store.dispatch('relic/find', relic);
                    }
                }
            }
        }
    }
}
