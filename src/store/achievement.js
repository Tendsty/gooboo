import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    getters: {
        list: (state) => (feature = null) => {
            let arr = [];

            for (const [key, elem] of Object.entries(state)) {
                if ((feature === null || elem.feature === feature) && (!elem.secret || elem.level > 0) && elem.value() > elem.default) {
                    arr.push(key);
                }
            }

            return arr;
        },
        totalLevel: (state) => {
            let lvl = 0;

            for (const [, elem] of Object.entries(state)) {
                if (!elem.secret) {
                    lvl += elem.level;
                }
            }

            return lvl;
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state, (o.feature ?? 'meta') + '_' + o.name, {
                feature: o.feature ?? 'meta',
                cap: o.cap ?? null,
                display: o.display ?? 'number',
                level: 0,
                value: o.value ?? (() => 0),
                default: o.default ?? 0,
                milestones: o.milestones,
                relic: o.relic ?? {},
                secret: o.secret ?? false
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'level', value: 0});
            }
        }
    }
}
