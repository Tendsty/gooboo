import Vue from "vue";
import { GEM_SPEED_PRIMARY_PER_ACHIEVEMENT, GEM_SPEED_SECONDARY_PER_ACHIEVEMENT } from "../js/constants";

export default {
    namespaced: true,
    state: {
        progressPrimary: 0,
        progressSecondary: 0,
        progressDiamond: 0,
        forge: {},
    },
    getters: {
        genSpeedPrimary: (state, getters, rootState, rootGetters) => {
            return rootGetters['achievement/totalLevel'] * GEM_SPEED_PRIMARY_PER_ACHIEVEMENT + 1;
        },
        genSpeedSecondary: (state, getters, rootState, rootGetters) => {
            return rootGetters['achievement/totalLevel'] * GEM_SPEED_SECONDARY_PER_ACHIEVEMENT + 1;
        },
        forgeList: (state, getters, rootState) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state.forge)) {
                if (elem.condition() && (
                    elem.type === 'buy' && !rootState.relic.item[elem.relic].found ||
                    elem.type === 'upgrade' && rootState.relic.item[elem.relic].found && elem.upgradeLevel === rootState.relic.item[elem.relic].level
                )) {
                    arr.push(key);
                }
            }
            return arr;
        },
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        initForge(state, o) {
            Vue.set(state.forge, o.name, {
                type: o.type ?? 'buy',
                upgradeLevel: o.upgradeLevel ?? null,
                relic: o.relic,
                price: o.price ?? 100,
                condition: o.condition ?? (() => true),
            });
        },
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'progressPrimary', value: 0});
            commit('updateKey', {key: 'progressSecondary', value: 0});
            commit('updateKey', {key: 'progressDiamond', value: 0});
        },
        fastPrestige({ rootState, rootGetters, dispatch }, o) {
            if (rootGetters['consumable/canAfford']('gem_prestigeStone')) {
                dispatch('currency/gain', {feature: o.currency.split('_')[0], name: o.currency.split('_')[1], amount: rootState.stat[o.stat].total}, {root: true});
                dispatch('consumable/use', 'gem_prestigeStone', {root: true});
            }
        },
        buyForge({ state, rootGetters, commit, dispatch }, name) {
            const forge = state.forge[name];
            if (rootGetters['currency/canAfford']({gem_diamond: forge.price})) {
                dispatch('currency/spend', {feature: 'gem', name: 'diamond', amount: forge.price}, {root: true});
                if (forge.type === 'buy') {
                    dispatch('relic/find', forge.relic, {root: true});
                } else if (forge.type === 'upgrade') {
                    commit('relic/updateKey', {name: forge.relic, key: 'level', value: forge.upgradeLevel + 1}, {root: true});
                    dispatch('relic/apply', {name: forge.relic, onFind: true}, {root: true});
                }
            }
        },
    }
}
