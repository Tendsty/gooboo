import Vue from "vue"
import { buildNum, capitalize } from "../js/utils/format";
import { logBase } from "../js/utils/math";
import { randomRound } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'deep-orange', 'amber', 'light-green', 'teal', 'light-blue', 'pink'],
        inspirationTime: 0,
        inspirationAmount: 0,
        idea: {}
    },
    getters: {
        availableColors: (state, getters, rootState) => {
            let arr = state.color.filter(color => rootState.stat[`gallery_${color}`].total > 0);

            if (rootState.unlock.galleryConversion.see && arr.length < state.color.length) {
                arr.push(state.color[arr.length]);
            }

            return arr;
        },
        conversionPrice: (state) => (toColor) => {
            const index = state.color.findIndex(c => c === toColor);
            const fromColor = index < 1 ? 'beauty' : state.color[index - 1];
            return {
                [`gallery_${fromColor}`]: Math.pow(10, index) * 1000,
                gallery_converter: 1
            };
        },
        maxAffordConversion: (state, getters, rootState, rootGetters) => (toColor) => {
            let maxAfford = Infinity;
            for (const [key, elem] of Object.entries(getters.conversionPrice(toColor))) {
                if (rootGetters['currency/value'](key) < elem) {
                    maxAfford = 0;
                } else {
                    maxAfford = Math.min(maxAfford, Math.floor(rootState.currency[key].value / elem));
                }
            }
            return maxAfford;
        },
        prestigeGain: (state, getters, rootState, rootGetters) => {
            if (rootState.stat.gallery_beauty.value < buildNum(1, 'T')) {
                return 0;
            }
            return Math.floor(rootGetters['mult/get']('currencyGalleryCashGain', Math.pow(10, Math.pow(logBase(rootState.stat.gallery_beauty.value / buildNum(100, 'B'), 10), 0.5))));
        },
        inspirationTimeNeeded: (state, getters, rootState, rootGetters) => (amount) => {
            return Math.pow(rootGetters['mult/get']('galleryInspirationIncrement') + 1, amount) * rootGetters['mult/get']('galleryInspirationBase');
        },
        inspirationTimeNeededCurrent: (state, getters) => {
            return getters.inspirationTimeNeeded(state.inspirationAmount);
        },
        canAccessIdea: (state) => (tier) => {
            if (tier === 1) {
                return true;
            }

            let previousTierCount = 0;
            let currentTierCount = 1;
            for (const [, elem] of Object.entries(state.idea)) {
                if (elem.tier === (tier - 1)) {
                    previousTierCount += elem.level;
                } else if (elem.tier === tier) {
                    currentTierCount += elem.level;
                }
            }

            return previousTierCount >= (currentTierCount * 2);
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateIdeaKey(state, o) {
            Vue.set(state.idea[o.name], o.key, o.value);
        },
        initIdea(state, o) {
            Vue.set(state.idea, o.name, {
                owned: o.owned ?? false,
                icon: o.icon ?? 'mdi-lightbulb',
                color: o.color ?? 'primary',
                tier: o.tier,
                level: 0,
                effect: o.effect ?? []
            });
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'inspirationTime', value: 0});
            commit('updateKey', {key: 'inspirationAmount', value: 0});
            for (const [key] of Object.entries(state.idea)) {
                commit('updateIdeaKey', {name: key, key: 'level', value: 0});
            }
        },
        prestige({ state, getters, rootGetters, commit, dispatch }) {
            commit('stat/increaseTo', {feature: 'gallery', name: 'bestPrestige', value: getters.prestigeGain}, {root: true});
            commit('stat/add', {feature: 'gallery', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'gallery', name: 'cash', amount: getters.prestigeGain}, {root: true});

            commit('updateKey', {key: 'inspirationTime', value: 0});
            commit('updateKey', {key: 'inspirationAmount', value: 0});
            for (const [key, elem] of Object.entries(state.idea)) {
                if (elem.level > 0) {
                    commit('updateIdeaKey', {name: key, key: 'level', value: 0});
                    dispatch('applyIdeaReset', key);
                }
            }

            dispatch('upgrade/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'gallery', type: 'regular'}, {root: true});
            dispatch('card/activateCards', 'gallery', {root: true});

            const inspirationStart = rootGetters['mult/get']('galleryInspirationStart');
            if (inspirationStart > 0) {
                dispatch('currency/gain', {feature: 'gallery', name: 'inspiration', amount: inspirationStart}, {root: true});
            }
        },
        convertColor({ getters, rootGetters, dispatch }, o) {
            const amount = o.max ? getters.maxAffordConversion(o.toColor) : 1;

            for (const [key, elem] of Object.entries(getters.conversionPrice(o.toColor))) {
                dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem * amount}, {root: true});
            }

            dispatch('currency/gain', {
                feature: 'gallery',
                name: o.toColor,
                amount: amount * rootGetters['mult/get'](`gallery${ capitalize(o.toColor) }Conversion`)
            }, {root: true});
        },
        applyIdea({ state, dispatch }, o) {
            let trigger = o.onBuy ?? false;
            state.idea[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `galleryIdea_${o.name}`, value: eff.value(state.idea[o.name].level), trigger}, {root: true});
            });
        },
        applyIdeaReset({ state, dispatch }, name) {
            state.idea[name].effect.forEach(eff => {
                dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `galleryIdea_${name}`}, {root: true});
            });
        },
        buyIdea({ state, getters, rootGetters, commit, dispatch }, name) {
            if (rootGetters['currency/value']('gallery_inspiration') >= 1 && getters.canAccessIdea(state.idea[name].tier)) {
                dispatch('currency/spend', {feature: 'gallery', name: 'inspiration', amount: 1}, {root: true});
                commit('updateIdeaKey', {name, key: 'level', value: state.idea[name].level + 1});
                commit('stat/increaseTo', {feature: 'gallery', name: 'highestTierIdea', value: state.idea[name].tier}, {root: true});
                dispatch('applyIdea', {name, onBuy: true});
            }
        },
        openPackages({ state, rootState, rootGetters, commit, dispatch }) {
            const amount = Math.floor(rootState.currency.gallery_package.value);
            if (amount > 0) {
                let rngGen = rootGetters['system/getRng']('gallery_package');
                [...state.color].reverse().forEach(color => {
                    const drumChance = rootGetters['mult/get'](`gallery${ capitalize(color) }DrumChance`);
                    if (drumChance > 0) {
                        const drums = randomRound(drumChance * amount, rngGen());
                        if (drums > 0) {
                            dispatch('currency/gain', {feature: 'gallery', name: color + 'Drum', amount: drums}, {root: true});
                        }
                    }
                });
                commit('system/nextRng', {name: 'gallery_package', amount: 1}, {root: true});
                dispatch('currency/spend', {feature: 'gallery', name: 'package', amount}, {root: true});
            }
        }
    }
}
