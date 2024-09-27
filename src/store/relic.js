import Vue from "vue"

export default {
    namespaced: true,
    state: {
        item: {},
        glyph: {}
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
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state.item, o.name, {
                found: false,
                feature: o.feature ?? [],
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'grey',
                effect: o.effect ?? []
            });
        },
        initGlyph(state, o) {
            Vue.set(state.glyph, o.name, {
                level: 0,
                progress: 0,
                icon: o.icon ?? 'mdi-sack',
                color: o.color ?? 'grey',
                effect: o.effect ?? []
            });
        },
        updateKey(state, o) {
            Vue.set(state.item[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.item)) {
                commit('updateKey', {name: key, key: 'found', value: false});
            }
        },
        apply({ state, dispatch }, o) {
            let trigger = o.onFind ?? false;
            state.item[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `relic_${o.name}`, value: eff.value, trigger}, {root: true});
            });
        },
        find({ state, commit, dispatch }, name) {
            if (!state.item[name].found) {
                commit('updateKey', {name, key: 'found', value: true});
                dispatch('apply', {name, onFind: true});
            }
        },
        reset({ state, commit, dispatch }, feature) {
            for (const [key, elem] of Object.entries(state.item)) {
                if (elem.found && elem.feature.length === 1 && elem.feature[0] === feature) {
                    elem.effect.forEach(eff => {
                        dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `relic_${ key }`}, {root: true});
                    });
                    commit('updateKey', {name: key, key: 'found', value: false});
                }
            }
        }
    }
}
