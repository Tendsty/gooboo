import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    getters: {
        list: (state) => (feature = null) => {
            let arr = [];

            for (const [key, elem] of Object.entries(state)) {
                if ((feature === null || elem.feature === feature) && (!elem.secret || elem.level > 0) && (elem.level > 0 || elem.value() > elem.default)) {
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
                cap: o.cap ?? 20,
                display: o.display ?? 'number',
                level: 0,
                cacheHideNotification: 0,
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
        },
        reset({ state, commit }, feature) {
            for (const [key, elem] of Object.entries(state)) {
                if (elem.feature === feature && !elem.secret) {
                    commit('updateKey', {name: key, key: 'level', value: 0});
                }
            }
        },
        check({ state, rootState, commit, dispatch }) {
            for (let [key, elem] of Object.entries(state)) {

                const oldLevel = Math.max(elem.level, elem.cacheHideNotification);
                const value = elem.value();
                let gainedRelic = false;
                while ((elem.cap === null || elem.level < elem.cap) && value >= elem.milestones(elem.level)) {

                    // Award relic if one is the reward
                    if (elem.relic[elem.level]) {
                        dispatch('relic/find', elem.relic[elem.level], {root: true});
                        gainedRelic = true;
                    }
                    commit('achievement/updateKey', {name: key, key: 'level', value: elem.level + 1}, {root: true});
                    elem = state[key];
                }

                // Create a notification if setting is on, also group multiple of the same achievement
                if (rootState.system.settings.notification.items.achievement.value && elem.level > oldLevel) {
                    commit('system/addNotification', {color: elem.secret ? 'purple' : 'success', timeout: gainedRelic ? -1 : 5000, message: {
                        type: 'achievement',
                        name: key,
                        value: elem.level,
                        oldValue: oldLevel
                    }}, {root: true});
                }
            }
        }
    }
}
