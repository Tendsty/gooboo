import store from "../../store";
import { RELIC_PEDESTAL_AMOUNT, SECONDS_PER_HOUR } from "../constants";
import { buildArray } from "../utils/array";
import glyph from "./relic/glyph";

export default {
    name: 'relic',
    tickspeed: 1,
    unlockNeeded: 'relicFeature',
    tick(seconds) {
        store.dispatch('currency/gain', {feature: 'relic', name: 'power', amount: store.getters['mult/get']('currencyRelicPowerGain') * seconds / SECONDS_PER_HOUR});

        for (const [key, elem] of Object.entries(store.getters['relic/glyphStats']())) {
            const glyph = store.state.relic.glyph[key];

            if (elem.max > Math.floor(glyph.progress)) {
                let amountLeft = seconds;
                const oldProgress = glyph.progress;
                let newProgress = glyph.progress;
                while (amountLeft > 0) {
                    const levelDiff = elem.max - Math.floor(newProgress);
                    if (levelDiff <= 0) {
                        break;
                    }
                    const difficulty = store.getters['relic/glyphTimeNeeded'](Math.floor(newProgress), elem.max, elem.speed - elem.max);
                    const amountUsed = Math.min((Math.floor(newProgress + 1) - newProgress) * difficulty, amountLeft);
                    newProgress += amountUsed / difficulty;
                    amountLeft -= amountUsed;
                }
                store.commit('relic/updateGlyphKey', {name: key, key: 'progress', value: newProgress});
                if (Math.floor(newProgress) > Math.floor(oldProgress)) {
                    store.dispatch('relic/applyGlyphEffect', key);
                }
            }
        }
    },
    unlock: ['relicFeature', 'relicMuseum'],
    note: buildArray(1).map(() => 'g'),
    currency: {
        power: {color: 'amber', icon: 'mdi-battery-high', overcapMult: 0.9, overcapScaling: 0.9, gainMult: {baseValue: 2, display: 'perHour'}, showGainMult: true, showGainTimer: true, capMult: {baseValue: 50}}
    },
    init() {
        for (const [key, elem] of Object.entries(glyph)) {
            store.commit('relic/initGlyph', {name: key, ...elem});
        }

        buildArray(RELIC_PEDESTAL_AMOUNT).forEach(elem => {
            store.commit('mult/init', {feature: 'relic', name: `relicPedestal${ elem }`, unlock: 'relicFeature', baseValue: elem === 0 ? 1 : 0, round: true}, {root: true});
        });
    },
    saveGame() {
        let obj = {
            owned: []
        };
        for (const [key, elem] of Object.entries(store.state.relic.item)) {
            if (elem.found) {
                obj.owned.push(key);
            }
            if (elem.level > 1) {
                if (!obj.level) {
                    obj.level = {};
                }
                obj.level[key] = elem.level;
            }
        }
        for (const [key, elem] of Object.entries(store.state.relic.glyph)) {
            if (elem.progress > 0) {
                if (!obj.glyph) {
                    obj.glyph = {};
                }
                obj.glyph[key] = elem.progress;
            }
        }
        for (const [key, elem] of Object.entries(store.state.relic.pedestal)) {
            if (elem.length > 0) {
                if (!obj.pedestal) {
                    obj.pedestal = {};
                }
                obj.pedestal[key] = elem;
            }
        }
        return obj;
    },
    loadGame(data) {
        if (data.level) {
            for (const [key, elem] of Object.entries(data.level)) {
                if (store.state.relic.item[key]) {
                    store.commit('relic/updateKey', {name: key, key: 'level', value: elem});
                }
            }
        }
        if (data.owned) {
            data.owned.forEach(elem => {
                if (store.state.relic.item[elem]) {
                    store.commit('relic/updateKey', {name: elem, key: 'found', value: true});
                    store.dispatch('relic/apply', {name: elem});
                }
            });
        }
        if (data.glyph) {
            for (const [key, elem] of Object.entries(data.glyph)) {
                if (store.state.relic.glyph[key]) {
                    store.commit('relic/updateGlyphKey', {name: key, key: 'progress', value: elem});
                    if (elem >= 1) {
                        store.dispatch('relic/applyGlyphEffect', key);
                    }
                }
            }
        }
        if (data.pedestal) {
            for (const [key, elem] of Object.entries(data.pedestal)) {
                store.commit('relic/updatePedestal', {id: key, value: elem});
            }
        }
    }
}
