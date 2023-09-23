import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    mutations: {
        init(state, name) {
            Vue.set(state, name, {
                see: false,
                use: false
            });
        },
        unlock(state, name) {
            Vue.set(state[name], 'see', true);
            Vue.set(state[name], 'use', true);
        },
        reset(state, name) {
            Vue.set(state[name], 'use', false);
        },
        lock(state, name) {
            Vue.set(state[name], 'see', false);
            Vue.set(state[name], 'use', false);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('lock', key);
            }
        }
    }
}
