import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    getters: {
        isActive: (state) => (name) => {
            return Object.keys(state[name].values).length > 0;
        },
        values: (state) => (name) => {
            let values = state[name].params.map(() => 0);
            const stacking = state[name].stacking;
            for (const [, arr] of Object.entries(state[name].values)) {
                arr.forEach((elem, index) => {
                    if (stacking === 'add') {
                        values[index] += elem;
                    } else if (stacking === 'max') {
                        if (elem > values[index]) {
                            values[index] = elem;
                        }
                    }
                });
            }
            return values;
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state, o.name, {
                params: o.params ?? [],
                stacking: o.stacking ?? 'add',
                values: {}
            });
        },
        set(state, o) {
            Vue.set(state[o.name].values, o.key, o.value);
        },
        reset(state, o) {
            let newObj = {};
            for (const [key, elem] of Object.entries(state[o.name].values)) {
                if (key !== o.key) {
                    newObj[key] = elem;
                }
            }
            Vue.set(state[o.name], 'values', newObj);
        },
        fullReset(state, name) {
            Vue.set(state[name], 'values', {});
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('fullReset', key);
            }
        }
    }
}
