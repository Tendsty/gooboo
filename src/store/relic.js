import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    getters: {
        owned: (state) => {
            let arr = [];

            for (const [key, elem] of Object.entries(state)) {
                if (elem.found) {
                    arr.push(key);
                }
            }

            return arr;
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state, o.name, {
                found: false,
                feature: o.feature ?? [],
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'amber',
                effect: o.effect ?? []
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'found', value: false});
            }
        },
        apply({ state, dispatch }, o) {
            let trigger = o.onFind ?? false;
            state[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `relic_${o.name}`, value: eff.value, trigger}, {root: true});
            });
        },
        find({ state, commit, dispatch }, name) {
            if (!state[name].found) {
                commit('updateKey', {name, key: 'found', value: true});
                dispatch('apply', {name, onFind: true});
            }
        }
    }
}
