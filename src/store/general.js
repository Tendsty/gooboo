import Vue from "vue"

export default {
    namespaced: true,
    state: {},
    mutations: {
        init(state, o) {
            let quests = {};
            for (const [key, elem] of Object.entries(o.quests)) {
                quests[key] = {
                    unlock: elem.unlock ?? null,
                    reward: elem.reward ?? null,
                    stage: 0,
                    stages: elem.stages ?? []
                };
            }

            Vue.set(state, o.name, {
                unlock: o.unlock ?? null,
                quests
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateQuestKey(state, o) {
            Vue.set(state[o.general].quests[o.quest], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [gkey, general] of Object.entries(state)) {
                for (const [qkey] of Object.entries(general.quests)) {
                    commit('updateQuestKey', {general: gkey, quest: qkey, key: 'stage', value: 0});
                }
            }
        },
        completeQuest({ state, commit, dispatch }, o) {
            commit('updateQuestKey', {...o, key: 'stage', value: state[o.general].quests[o.quest].stage + 1});
            dispatch('giveReward', o);
        },
        giveReward({ state, dispatch }, o) {
            const quest = state[o.general].quests[o.quest];

            if (quest.stage >= 1) {
                // Each stage can have a note reward
                const note = quest.stages[quest.stage - 1].note;
                if (note !== null) {
                    dispatch('note/find', note, {root: true});
                }

                // Last stage gives a relic
                if (quest.stage >= quest.stages.length && quest.reward !== null) {
                    dispatch('relic/find', quest.reward, {root: true});
                }
            }
        }
    }
}
