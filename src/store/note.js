import Vue from "vue";

export default {
    namespaced: true,
    state: {},
    getters: {
        list: (state) => (feature = null) => {
            let arr = [];
            for (const [key, elem] of Object.entries(state)) {
                if ((feature === null || elem.feature === feature) && elem.found) {
                    arr.push(key);
                }
            }
            return arr;
        }
    },
    mutations: {
        init(state, o) {
            const feature = o.feature ?? 'meta';
            Vue.set(state, `${feature}_${o.id}`, {
                feature,
                found: false,
                author: o.author
            });
        },
        find(state, name) {
            Vue.set(state[name], 'found', true);
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
        find({ state, rootState, commit }, name) {
            if (state[name] && !state[name].found) {
                commit('find', name);

                if (rootState.system.settings.notification.items.note.value) {
                    // Create notification
                    commit('system/addNotification', {color: 'info', timeout: name === 'mining_0' ? -1 : 10000, message: {
                        type: 'note',
                        name
                    }}, {root: true});
                    commit('system/addNoteHint', name, {root: true});
                }
            }
        }
    }
}
