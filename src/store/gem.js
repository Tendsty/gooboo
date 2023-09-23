import Vue from "vue";
import { GEM_SPEED_PER_ACHIEVEMENT } from "../js/constants";

export default {
    namespaced: true,
    state: {
        progress: 0
    },
    getters: {
        genSpeed: (state, getters, rootState, rootGetters) => {
            return rootGetters['achievement/totalLevel'] * GEM_SPEED_PER_ACHIEVEMENT + 1;
        }
    },
    mutations: {
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        }
    },
    actions: {
        cleanState({ commit }) {
            commit('updateKey', {key: 'progress', value: 0});
        },
        fastPrestige({ rootState, rootGetters, dispatch }, o) {
            if (rootGetters['consumable/canAfford']('gem_prestigeStone')) {
                dispatch('currency/gain', {feature: o.currency.split('_')[0], name: o.currency.split('_')[1], amount: rootState.stat[o.stat].total}, {root: true});
                dispatch('consumable/use', 'gem_prestigeStone', {root: true});
            }
        }
    }
}
