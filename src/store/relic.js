import Vue from "vue"
import { RELIC_GLYPH_SPEED_BONUS, RELIC_GLYPH_SPEED_OVERCAP, RELIC_GLYPH_TIME_BASE, RELIC_GLYPH_TIME_INCREMENT, RELIC_PEDESTAL_AMOUNT } from "../js/constants";
import { buildArray } from "../js/utils/array";

export default {
    namespaced: true,
    state: {
        item: {},
        glyph: {},
        pedestal: buildArray(RELIC_PEDESTAL_AMOUNT).map(() => [])
    },
    getters: {
        owned: (state) => {
            let arr = [];

            for (const [key, elem] of Object.entries(state.item)) {
                if (elem.found) {
                    arr.push(key);
                }
            }

            return arr;
        },
        glyphStats: (state) => (pedestals = null) => {
            let allStats = {};
            if (pedestals === null) {
                pedestals = state.pedestal;
            }
            pedestals.forEach(pedestal => {
                let stats = {};
                pedestal.forEach(relic => {
                    for (const [key, elem] of Object.entries(state.item[relic].glyph(state.item[relic].level))) {
                        if (stats[key] === undefined) {
                            stats[key] = 0;
                        }
                        stats[key] += elem;
                    }
                });
                for (const [key, elem] of Object.entries(stats)) {
                    if (allStats[key] === undefined) {
                        allStats[key] = {speed: 0, max: 0};
                    }
                    allStats[key].speed += elem;
                    if (elem > allStats[key].max) {
                        allStats[key].max = elem;
                    }
                }
            });
            return allStats;
        },
        glyphTimeNeeded: () => (level, cap, bonus = 0) => {
            if (cap <= level) {
                return null;
            }
            return RELIC_GLYPH_TIME_BASE * Math.pow(RELIC_GLYPH_TIME_INCREMENT, level) * (level + 2) /
                Math.pow(RELIC_GLYPH_SPEED_OVERCAP, cap - level - 1) /
                Math.min(1 + bonus * RELIC_GLYPH_SPEED_BONUS / cap, Math.pow(RELIC_GLYPH_SPEED_OVERCAP, bonus));
        },
        glyphBonusMult: () => (cap, bonus) => {
            return Math.min(1 + bonus * RELIC_GLYPH_SPEED_BONUS / cap, Math.pow(RELIC_GLYPH_SPEED_OVERCAP, bonus));
        },
        hasMuseumHint: (state, getters) => {
            for (const [key, elem] of Object.entries(getters.glyphStats())) {
                if (elem.max > state.glyph[key].progress) {
                    return false;
                }
            }
            return true;
        },
    },
    mutations: {
        init(state, o) {
            Vue.set(state.item, o.name, {
                found: false,
                feature: o.feature ?? [],
                level: 1,
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'grey',
                effect: o.effect ?? [],
                glyph: o.glyph ?? {},
                active: o.active ?? null,
            });
        },
        initGlyph(state, o) {
            Vue.set(state.glyph, o.name, {
                progress: 0,
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'grey',
                effect: o.effect ?? [],
            });
        },
        updateKey(state, o) {
            Vue.set(state.item[o.name], o.key, o.value);
        },
        updateGlyphKey(state, o) {
            Vue.set(state.glyph[o.name], o.key, o.value);
        },
        updatePedestal(state, o) {
            Vue.set(state.pedestal, o.id, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.item)) {
                commit('updateKey', {name: key, key: 'found', value: false});
                commit('updateKey', {name: key, key: 'level', value: 1});
            }
            for (const [key] of Object.entries(state.glyph)) {
                commit('updateGlyphKey', {name: key, key: 'progress', value: 0});
            }
            for (const [id] of Object.entries(state.pedestal)) {
                commit('updatePedestal', {id, value: []});
            }
        },
        apply({ state, dispatch }, o) {
            let trigger = o.onFind ?? false;
            state.item[o.name].effect(state.item[o.name].level).forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `relic_${o.name}`, value: eff.value, trigger}, {root: true});
            });
        },
        find({ state, commit, dispatch }, name) {
            if (!state.item[name].found) {
                commit('updateKey', {name, key: 'found', value: true});
                dispatch('apply', {name, onFind: true});
            }
        },
        useActive({ state, rootGetters, commit, dispatch }, o) {
            const relic = state.item[o.name];
            if (relic.active && !relic.active.disabled(relic.active.params(), o.option) && rootGetters['currency/canAfford'](relic.active.cost)) {
                if (relic.active.feature) {
                    commit('stat/add', {feature: relic.active.feature, name: 'relicActivesUsed', value: 1}, {root: true});
                }
                for (const [key, elem] of Object.entries(relic.active.cost)) {
                    dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem}, {root: true});
                }
                relic.active.trigger(relic.active.params(), o.option);
            }
        },
        reset({ state, commit, dispatch }, feature) {
            for (const [key, elem] of Object.entries(state.item)) {
                if (elem.found && elem.feature.length === 1 && elem.feature[0] === feature) {
                    elem.effect(1).forEach(eff => {
                        dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `relic_${ key }`}, {root: true});
                    });
                    commit('updateKey', {name: key, key: 'found', value: false});
                }
            }
        },
        applyGlyphEffect({ state, dispatch }, name) {
            const glyph = state.glyph[name];
            glyph.effect.forEach(elem => {
                dispatch('system/applyEffect', {
                    type: elem.type,
                    name: elem.name,
                    multKey: `relicGlyph_${ name }`,
                    value: elem.value(Math.floor(glyph.progress))
                }, {root: true});
            });
        },
        changePedestals({ state, commit }, pedestals) {
            pedestals.forEach((elem, key) => {
                commit('updatePedestal', {id: key, value: elem});
            });

            // Also reset all progress
            for (const [key, elem] of Object.entries(state.glyph)) {
                if (elem.progress - (Math.floor(elem.progress)) > 0) {
                    commit('updateGlyphKey', {name: key, key: 'progress', value: Math.floor(elem.progress)});
                }
            }
        }
    }
}
