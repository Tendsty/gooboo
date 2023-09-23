import Vue from "vue";
import { capitalize } from "../js/utils/format";

export default {
    namespaced: true,
    state: {
        candle: {
            tealight: {
                icon: 'mdi-light-recessed',
                cost: 15,
                duration: 30,
                soot: 5,
                lightMult: 25
                // 720 eff
                // 1/25 soot
            },
            regular: {
                icon: 'mdi-candle',
                cost: 36,
                duration: 3600,
                soot: 25,
                lightMult: 1.25
                // 900 eff
                // 1/12 soot
            },
            aroma: {
                icon: 'mdi-candle',
                cost: 48,
                duration: 14400,
                soot: 20,
                lightMult: 1.5
                // 7200 eff
                // 1/20 soot
            },
            chandelier: {
                icon: 'mdi-candelabra-fire',
                cost: 75,
                duration: 900,
                soot: 30,
                lightMult: 7
                // 5400 eff
                // ~1/21 soot
            }
        },
        activeCandle: null
    },
    getters: {
        singleProduction: (state, getters, rootState, rootGetters) => (name) => {
            return rootGetters['mult/get']('cindersProduction' + capitalize(name));
        },
        multipleProduction: (state, getters, rootState) => (name) => {
            return getters.singleProduction(name) * rootState.upgrade.item['event_' + name].level;
        },
        percentProduction: (state, getters) => (name) => {
            const total = getters.totalProduction;
            if (total <= 0) {
                return 0;
            }
            return 100 * getters.multipleProduction(name) / total;
        },
        isEnlightened: (state, getters, rootState) => (name) => {
            return rootState.upgrade.item['event_' + name + 'Enlightened'].level >= 1;
        },
        totalProduction: (state, getters) => {
            return [
                'firefly',
                'glowshroom',
                'glowfish',
                'lantern',
                'campfire',
                'coral',
                'jellyfish',
                'nightbloom',
                'neonlight',
                'sun'
            ].reduce((a, b) => a + getters.multipleProduction(b), 0);
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateCandleKey(state, o) {
            Vue.set(state.activeCandle, o.key, o.value);
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'activeCandle', value: null});
        },
        useCandle({ state, rootGetters, commit, dispatch }, name) {
            const candle = state.candle[name];
            if (state.activeCandle === null && rootGetters['currency/value']('event_wax') >= candle.cost) {
                commit('updateKey', {key: 'activeCandle', value: {name, duration: candle.duration}});
                dispatch('currency/spend', {feature: 'event', name: 'wax', amount: candle.cost}, {root: true});
                dispatch('note/find', 'event_9', {root: true});
            }
        }
    }
}
