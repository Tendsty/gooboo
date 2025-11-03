import Vue from "vue";
import { SCHOOL_BOOK_BASE_GAIN, SCHOOL_EXAM_DUST_MIN } from "../js/constants";

export default {
    namespaced: true,
    state: {
        subject: {},
        book: {},
        totalPointRequirement: [1000, 2500, 5000, 10000, 20000, 30000, 40000, 70000, 100000, 150000, 200000, 250000],
        emeraldRequirement: [10, 30, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500],
        crownRequirement: [
            {amount: 100000, color: null, size: 14},
            {amount: 250000, color: 'cherry', size: 18},
            {amount: 500000, color: 'light-grey', size: 22},
            {amount: 1000000, color: 'amber', size: 26},
            {amount: 2500000, color: 'red', size: 30},
            {amount: 5000000, color: 'cyan', size: 34},
            {amount: 10000000, color: 'deep-purple', size: 38},
        ],
        bonusDust: 0,
        multipass: 1,
    },
    getters: {
        subjectsBookGain: (state, getters, rootState) => {
            let amount = 0;
            for (const [, elem] of Object.entries(state.subject)) {
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
            let dustBase = SCHOOL_EXAM_DUST_MIN + SCHOOL_EXAM_DUST_MIN * 0.5 * ((grade - 1) * 0.35 + score) * Math.min(score * 2, 1);
            if (dustBase > 1000) {
                dustBase = Math.pow((dustBase - 900) / 100, 0.8) * 100 + 900;
            }
            if (dustBase > 2000) {
                dustBase = Math.pow((dustBase - 1900) / 100, 0.2) * 100 + 1900;
            }
            return Math.round(dustBase * getters.dustMult);
        },
        pointReward: () => (score, grade) => {
            return Math.round(100 * (grade * 0.1 + 1) * (grade * 0.25 + (score > 1 ? Math.sqrt(score) : score)) * Math.min(score * 2, 1));
        },
        booksLeft: (state, getters, rootState, rootGetters) => {
            let books = rootGetters['mult/get']('schoolBook');
            for (const [, elem] of Object.entries(state.book)) {
                if (elem.owned) {
                    books--;
                }
            }
            return books;
        }
    },
    mutations: {
        initSubject(state, o) {
            Vue.set(state.subject, o.name, {
                unlock: o.unlock ?? null,
                grade: 0,
                currentGrade: 0,
                progress: 0,
                scoreGoal: o.scoreGoal ?? 10,
                pointsTotal: 0,
                booksSkipped: 0,
            });
        },
        initBook(state, o) {
            Vue.set(state.book, o.feature + '_' + o.name, {
                feature: o.feature,
                subfeature: o.subfeature,
                scalesWithGL: o.scalesWithGL ?? false,
                minGL: o.minGL ?? 0,
                maxGL: o.maxGL ?? null,
                owned: false,
                alwaysActive: o.alwaysActive ?? false,
                raiseOtherCap: o.raiseOtherCap ?? null,
                effect: o.effect ?? [],
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubjectKey(state, o) {
            Vue.set(state.subject[o.name], o.key, o.value);
        },
        updateBookKey(state, o) {
            Vue.set(state.book[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.subject)) {
                commit('updateSubjectKey', {name: key, key: 'grade', value: 0});
                commit('updateSubjectKey', {name: key, key: 'currentGrade', value: 0});
                commit('updateSubjectKey', {name: key, key: 'progress', value: 0});
                commit('updateSubjectKey', {name: key, key: 'pointsTotal', value: 0});
                commit('updateSubjectKey', {name: key, key: 'booksSkipped', value: 0});
            }
            for (const [key] of Object.entries(state.book)) {
                commit('updateBookKey', {name: key, key: 'owned', value: false});
            }
            commit('updateKey', {key: 'bonusDust', value: 0});
            commit('updateKey', {key: 'multipass', value: 1});
        },
        convertPass({ getters, rootGetters, dispatch }) {
            if (rootGetters['currency/value']('school_examPass') >= 1) {
                dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: Math.round(SCHOOL_EXAM_DUST_MIN * getters.dustMult)}, {root: true});
                dispatch('currency/spend', {feature: 'school', name: 'examPass', amount: 1}, {root: true});
            }
        },
        readBook({ state, getters, commit, dispatch }, name) {
            if (!state.book[name].owned && getters.booksLeft > 0) {
                commit('updateBookKey', {name, key: 'owned', value: true});
                dispatch('applyBookEffect', name);
            }
        },
        applyBookEffect({ state, rootState, dispatch }, name) {
            const book = state.book[name];
            if (book.owned && (book.alwaysActive || rootState.system.features[book.feature].currentSubfeature === book.subfeature)) {
                const globalLevel = rootState.meta.globalLevelParts[book.feature + '_' + book.subfeature] ?? 0;
                const lvl = book.scalesWithGL ? Math.max((Math.min(globalLevel, book.maxGL ?? Infinity) + 1 - book.minGL), 0) : (globalLevel >= book.minGL ? 1 : 0);
                book.effect.forEach(elem => {
                    dispatch('system/applyEffect', {
                        type: elem.type,
                        name: elem.name,
                        multKey: `schoolBook_${ name }`,
                        value: elem.value(lvl)
                    }, {root: true});
                });
            } else {
                book.effect.forEach(elem => {
                    dispatch('system/resetEffect', {
                        type: elem.type,
                        name: elem.name,
                        multKey: `schoolBook_${ name }`
                    }, {root: true});
                });
            }
        },
        updateBookEffects({ state, dispatch }, feature = null) {
            for (const [key, elem] of Object.entries(state.book)) {
                if (elem.owned && (feature === null || elem.feature === feature)) {
                    dispatch('applyBookEffect', key);
                }
            }
        },
        finishSchool({ state, getters, commit, dispatch }, o) {
            const subject = state.subject[o.subject];
            const reachedBefore = Math.max(subject.grade, state.totalPointRequirement.filter(el => subject.pointsTotal >= el).length);
            const score = (o.mode === 'exam' ? 1 : 2) * o.score / subject.scoreGoal;
            const pointGain = getters.pointReward(score, subject.currentGrade) * (o.mode === 'exam' ? (2.5 + state.multipass * 7.5) : 1);
            if (pointGain > 0) {
                commit('updateSubjectKey', {name: o.subject, key: 'pointsTotal', value: subject.pointsTotal + pointGain});
                commit('stat/add', {feature: 'school', name: 'totalPoints', value: pointGain}, {root: true});
            }

            let gradeGain = 0;
            let gradePlus = false;
            let dustGain = 0;

            if (o.mode === 'study' && subject.currentGrade >= subject.grade) {
                const newProgress = Math.max((score - (subject.currentGrade <= 0 ? 0 : 1)) * 0.2 + subject.progress, 0);
                if (newProgress >= 1) {
                    gradePlus = true;
                    const newGrade = subject.grade + 1;
                    commit('stat/increaseTo', {feature: 'school', name: 'highestGrade', value: newGrade}, {root: true});
                    commit('updateSubjectKey', {name: o.subject, key: 'grade', value: newGrade});
                    commit('updateSubjectKey', {name: o.subject, key: 'currentGrade', value: newGrade});
                    commit('updateSubjectKey', {name: o.subject, key: 'progress', value: 0});
                } else {
                    gradeGain = newProgress - subject.progress;
                    commit('updateSubjectKey', {name: o.subject, key: 'progress', value: newProgress});
                }
            }
            if (o.mode === 'exam') {
                dustGain = getters.examReward(score, subject.currentGrade);
                if (state.multipass > 1) {
                    commit('updateKey', {key: 'bonusDust', value: state.bonusDust + dustGain * (state.multipass - 1)});
                }
                dispatch('currency/gain', {feature: 'school', name: 'goldenDust', amount: dustGain}, {root: true});
                dispatch('note/find', 'school_1', {root: true});

                if (o.score >= subject.scoreGoal && subject.currentGrade >= subject.grade) {
                    gradePlus = true;
                    const newGrade = subject.grade + 1;
                    commit('stat/increaseTo', {feature: 'school', name: 'highestGrade', value: newGrade}, {root: true});
                    commit('updateSubjectKey', {name: o.subject, key: 'grade', value: newGrade});
                    commit('updateSubjectKey', {name: o.subject, key: 'currentGrade', value: newGrade});
                    commit('updateSubjectKey', {name: o.subject, key: 'progress', value: 0});
                }
            }

            commit('system/addNotification', {color: 'success', timeout: 5000, message: {
                type: 'school',
                isExam: o.mode === 'exam',
                score: o.score,
                perfectScore: o.mode === 'exam' && gradePlus,
                points: pointGain,
                grade: gradeGain,
                gradePlus,
                dust: dustGain,
            }}, {root: true});

            const reachedAfter = Math.max(subject.grade, state.totalPointRequirement.filter(el => subject.pointsTotal >= el).length);
            if (reachedAfter > reachedBefore && subject.booksSkipped > 0) {
                // Refund emeralds if the book is obtained regularly
                const refundStats = state.emeraldRequirement.filter((el, index) => {
                    const reached = index + 1;
                    return reached > reachedBefore && reached <= reachedAfter;
                });
                commit('updateSubjectKey', {name: o.subject, key: 'booksSkipped', value: Math.max(subject.booksSkipped - refundStats.length, 0)});
                commit('currency/add', {feature: 'gem', name: 'emerald', amount: refundStats.reduce((a, b) => a + b)}, {root: true});
            }

            dispatch('applySubjectBooks', o.subject);
        },
        applySubjectBooks({ state, dispatch }, name) {
            const subject = state.subject[name];
            const reached = Math.max(subject.grade, state.totalPointRequirement.filter(el => subject.pointsTotal >= el).length) + subject.booksSkipped;
            if (reached > 0) {
                dispatch('mult/setBase', {name: 'schoolBook', key: `schoolSubject_${ name }`, value: reached}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'schoolBook', type: 'base', key: `schoolSubject_${ name }`}, {root: true});
            }
        },
        skipBook({ state, rootGetters, commit, dispatch }, name) {
            const subject = state.subject[name];
            const reached = Math.max(subject.grade, state.totalPointRequirement.filter(el => subject.pointsTotal >= el).length) + subject.booksSkipped;
            if (reached < state.emeraldRequirement.length) {
                const price = state.emeraldRequirement[reached];
                if (rootGetters['currency/canAfford']({gem_emerald: price})) {
                    commit('updateSubjectKey', {name, key: 'booksSkipped', value: subject.booksSkipped + 1});
                    dispatch('currency/spend', {feature: 'gem', name: 'emerald', amount: price}, {root: true});
                    dispatch('applySubjectBooks', name);
                }
            }
        }
    }
}
