import Vue from "vue";

export default {
    namespaced: true,
    state: {},
    mutations: {
        init(state, o) {
            const feature = o.feature ?? 'meta';
            Vue.set(state, feature + '_' + o.name, {
                feature,
                type: o.type ?? 'regular',
                display: o.display ?? 'number',
                default: o.value ?? 0,
                value: o.value ?? 0,
                total: o.value ?? 0,
                showInStatistics: o.showInStatistics ?? false
            });
        },
        add(state, o) {
            const name = o.feature + '_' + o.name;
            Vue.set(state[name], 'value', state[name].value + o.value);
            Vue.set(state[name], 'total', state[name].total + o.value);
        },
        increaseTo(state, o) {
            const name = o.feature + '_' + o.name;
            if (state[name].value < o.value) {
                Vue.set(state[name], 'value', o.value);
            }
            if (state[name].total < o.value) {
                Vue.set(state[name], 'total', o.value);
            }
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key, elem] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'value', value: elem.default});
                commit('updateKey', {name: key, key: 'total', value: elem.default});
            }
        },
        reset({ state, commit }, o) {
            for (const [key, elem] of Object.entries(state)) {
                if (elem.feature === o.feature && elem.type === o.type) {
                    commit('updateKey', {name: key, key: 'value', value: elem.default});
                }
            }
        },
        resetAll({ state, commit }, feature) {
            for (const [key, elem] of Object.entries(state)) {
                if (elem.feature === feature) {
                    commit('updateKey', {name: key, key: 'value', value: elem.default});
                    commit('updateKey', {name: key, key: 'total', value: elem.default});
                }
            }
        }
    }
}
