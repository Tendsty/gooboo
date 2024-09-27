import Vue from "vue";
import { logBase } from "../js/utils/math";

export default {
    namespaced: true,
    state: {},
    getters: {
        expNeeded: () => (level) => {
            return Math.pow(level + 2, 2) * Math.pow(2, level) * 25;
        },
        currentFrozen: (state) => {
            let frozen = 0;
            for (const [, elem] of Object.entries(state)) {
                if (elem.active) {
                    frozen++;
                }
            }
            return frozen;
        },
        featureIsFrozen: (state, getters, rootState) => {
            return !!state[rootState.system.screen]?.active;
        },
        expGain: (state, getters, rootState) => (feature) => {
            let gain = 0;
            const subfeature = rootState.system.features[feature].currentSubfeature;
            for (const [, stat] of Object.entries(state[feature].data[subfeature])) {
                const statValue = rootState.stat[stat].total;
                if (statValue > 0) {
                    const baseValue = stat === 'farm_bestPrestige' ? statValue : logBase(statValue, stat === 'horde_bestPrestige0' ? 9 : 3);
                    gain += baseValue * Math.pow(1.1, baseValue) * 40;
                }
            }
            return gain;
        },
        prestigeGain: (state, getters, rootState, rootGetters) => (feature) => {
            const subfeature = rootState.system.features[feature].currentSubfeature;
            let obj = {};
            state[feature].data.forEach((data, index) => {
                const gainMult = rootGetters['mult/get'](`${ feature }Cryolab${ (subfeature === index && state[feature].active) ? 'Active' : 'Passive' }${ index }`);
                if (gainMult > 0) {
                    for (const [currency, stat] of Object.entries(data)) {
                        const statValue = rootState.stat[stat].total;
                        if (statValue > 0) {
                            obj[currency] = statValue * gainMult * (stat === 'farm_bestPrestige' ? 500 : 1);
                        }
                    }
                }
            });
            return obj;
        }
    },
    mutations: {
        init(state, o) {
            const effect = o.effect ?? [[]];
            Vue.set(state, o.name, {
                unlock: o.unlock ?? null,
                active: false,
                exp: effect.map(() => 0),
                level: effect.map(() => 0),
                data: o.data ?? [{}],
                effect
            });
        },
        updateKey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        },
        updateSubfeatureKey(state, o) {
            Vue.set(state[o.name][o.key], o.subfeature, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state)) {
                commit('updateKey', {name: key, key: 'active', value: false});
            }
        },
        toggleActive({ state, getters, rootGetters, commit }, name) {
            if (state[name].active || getters.currentFrozen < rootGetters['mult/get']('cryolabMaxFeatures')) {
                commit('updateKey', {name, key: 'active', value: !state[name].active});
            }
        },
        init({ commit }, o) {
            let modifiedEffect = [];
            (o.effect ?? [[]]).forEach((effect, subfeature) => {
                const activeMultName = `${ o.name }CryolabActive${ subfeature }`;
                const passiveMultName = `${ o.name }CryolabPassive${ subfeature }`;
                const featureMult = o.name === 'village' ? 0.4 : 1;
                modifiedEffect.push([
                    {name: activeMultName, type: 'base', value: lvl => lvl * featureMult * 0.02},
                    {name: passiveMultName, type: 'base', value: lvl => lvl * featureMult * 0.01},
                    ...effect
                ]);
                commit('mult/init', {feature: 'cryolab', name: activeMultName, display: 'percent', baseValue: 0.25 * featureMult}, {root: true});
                commit('mult/init', {feature: 'cryolab', name: passiveMultName, display: 'percent'}, {root: true});
            });
            commit('init', {...o, effect: modifiedEffect});
        },
        gainExp({ state, rootState, getters, commit, dispatch }, o) {
            const subfeature = rootState.system.features[o.feature].currentSubfeature;
            let exp = state[o.feature].exp[subfeature] + o.amount;
            const oldLevel = state[o.feature].level[subfeature];
            let newLevel = oldLevel;

            while (exp >= getters.expNeeded(newLevel)) {
                exp -= getters.expNeeded(newLevel);
                newLevel++;
                dispatch('note/find', 'cryolab_1', {root: true});
            }

            commit('updateSubfeatureKey', {name: o.feature, subfeature, key: 'exp', value: exp});
            if (newLevel > oldLevel) {
                commit('updateSubfeatureKey', {name: o.feature, subfeature, key: 'level', value: newLevel});
                dispatch('applyLevelEffects', {feature: o.feature, subfeature});
            }
        },
        applyLevelEffects({ state, dispatch }, o) {
            const level = state[o.feature].level[o.subfeature];
            if (level > 0) {
                state[o.feature].effect[o.subfeature].forEach(eff => {
                    dispatch('system/applyEffect', {
                        type: eff.type,
                        name: eff.name,
                        multKey: `cryolab_${ o.feature }_${ o.subfeature }`,
                        value: eff.value(level)
                    }, {root: true});
                });
            } else {
                state[o.feature].effect[o.subfeature].forEach(eff => {
                    dispatch('system/resetEffect', {
                        type: eff.type,
                        name: eff.name,
                        multKey: `cryolab_${ o.feature }_${ o.subfeature }`
                    }, {root: true});
                });
            }
        },
    }
}
