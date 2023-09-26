import Vue from "vue";

export default {
    namespaced: true,
    state: {},
    getters: {
        dustMult: (state, getters, rootState) => {
            return Math.min(1, rootState.meta.globalLevel / 250);
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state, o.name, {
                unlock: o.unlock ?? null,
                elo: 0,
                grade: 0
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'elo', value: 0});
                commit('updateKey', {name: key, key: 'grade', value: 0});
            }
        }
    }
}
