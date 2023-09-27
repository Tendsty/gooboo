import Vue from "vue";
import { SCHOOL_BOOK_BASE_GAIN, SCHOOL_EXAM_DUST_MIN } from "../js/constants";

export default {
    namespaced: true,
    state: {},
    getters: {
        subjectsBookGain: (state, getters, rootState) => {
            let amount = 0;
            for (const [, elem] of Object.entries(state)) {
                if (elem.unlock === null || rootState.unlock[elem.unlock].see) {
                    amount++;
                }
            }
            return amount * SCHOOL_BOOK_BASE_GAIN;
        },
        dustMult: (state, getters, rootState) => {
            return Math.min(1, (rootState.meta.globalLevel + 25) / 200);
        },
        examReward: (state, getters) => (score, grade) => {
            let dustBase = SCHOOL_EXAM_DUST_MIN + SCHOOL_EXAM_DUST_MIN * 0.5 * ((grade - 1) * 0.15 + score) * Math.min(score * 2, 1);
            if (dustBase > 1000) {
                dustBase = Math.pow((dustBase - 900) / 100, 0.8) * 100 + 900;
            }
            return Math.round(dustBase * getters.dustMult);
        }
    },
    mutations: {
        init(state, o) {
            Vue.set(state, o.name, {
                unlock: o.unlock ?? null,
                grade: 0,
                currentGrade: 0,
                progress: 0,
                scoreGoal: o.scoreGoal ?? 10
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'grade', value: 0});
                commit('updateKey', {name: key, key: 'currentGrade', value: 0});
                commit('updateKey', {name: key, key: 'progress', value: 0});
            }
        }
    }
}