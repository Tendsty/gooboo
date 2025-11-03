import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    mutations: {
        init(state, name) {
            Vue.set(state, name, {
                see: false,
                use: false,
                triggers: [],
            });
        },
        addTrigger(state, o) {
            state[o.unlock].triggers.push(o.trigger);
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
        },
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('lock', key);
            }
        },
        unlock({ state, rootState, rootGetters, commit }, name) {
            const isNew = !state[name].see;
            commit('unlock', name);
            if (isNew) {
                state[name].triggers.forEach(trigger => {
                    const split = trigger.split('_');
                    switch (split[0]) {
                        case 'card': {
                            if (rootState.unlock.cardFeature.see) {
                                commit('system/addNotification', {color: 'info', timeout: 10000, message: {
                                    type: 'unlock',
                                    subtype: 'card',
                                    feature: split[1],
                                    pack: split[2],
                                }}, {root: true});
                            }
                            break;
                        }
                        case 'general': {
                            if (rootState.unlock.generalFeature.see) {
                                const unlock = rootState.general[split[1]].unlock;
                                if (unlock === null || rootState.unlock[unlock].see) {
                                    commit('system/addQuestlineHint', {general: split[1], questline: split[2]}, {root: true});
                                    commit('system/addNotification', {color: 'info', timeout: 10000, message: {
                                        type: 'unlock',
                                        subtype: 'general',
                                        general: split[1],
                                        questline: split[2],
                                    }}, {root: true});
                                }
                            }
                            break;
                        }
                        case 'treasure': {
                            if (rootState.unlock.treasureFeature.see && rootGetters['treasure/visibleTypes'].includes(rootState.treasure.effect[split[2]].type)) {
                                commit('system/addNotification', {color: 'info', timeout: 10000, message: {
                                    type: 'unlock',
                                    subtype: 'treasure',
                                    feature: split[1],
                                    effect: split[2],
                                }}, {root: true});
                            }
                            break;
                        }
                        default:
                            console.warn(`Unknown unlock trigger: ${ trigger }`);
                            break;
                    }
                });
            }
        },
    }
}
