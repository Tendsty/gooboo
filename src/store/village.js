import Vue from "vue";
import { capitalize } from "../js/utils/format";
import { weightSelect } from "../js/utils/random";
import { SECONDS_PER_HOUR, VILLAGE_JOY_HAPPINESS_REDUCTION, VILLAGE_JOY_MIN_HAPPINESS, VILLAGE_JOY_PER_HAPPINESS } from "../js/constants";
import { deltaLinear } from "../js/utils/math";

export default {
    namespaced: true,
    state: {
        job: {},
        offering: {},
        policy: {},
        explorerProgress: 0,
        offeringGen: 0
    },
    getters: {
        employed: (state) => {
            let worker = 0;

            for (const [, elem] of Object.entries(state.job)) {
                worker += elem.amount * elem.needed;
            }

            return worker;
        },
        unemployed: (state, getters, rootState, rootGetters) => {
            return rootGetters['mult/get']('villageWorker') - getters.employed;
        },
        lootWeights: (state, getters, rootState, rootGetters) => {
            const quality = rootGetters['mult/get']('villageLootQuality');
            let arr = [quality + 100];
            if (quality > 0) {
                arr.push(quality * 0.75);
            }
            if (quality > 50) {
                arr.push((quality - 50) * Math.pow(0.75, 2));
            }
            if (quality > 100) {
                arr.push((quality - 100) * Math.pow(0.75, 3));
            }
            if (quality > 150) {
                arr.push((quality - 150) * Math.pow(0.75, 4));
            }
            if (quality > 200) {
                arr.push((quality - 200) * Math.pow(0.75, 5));
            }
            return arr;
        },
        joyGainBase: (state, getters, rootState, rootGetters) => {
            const happiness = rootGetters['mult/get']('villageHappiness');
            return happiness > VILLAGE_JOY_MIN_HAPPINESS ? ((happiness - VILLAGE_JOY_HAPPINESS_REDUCTION) * VILLAGE_JOY_PER_HAPPINESS) : 0;
        },
        offeringPerSecond: (state, getters, rootState) => {
            return rootState.stat.village_offeringAmount.value * 0.01 / SECONDS_PER_HOUR;
        }
    },
    mutations: {
        initJob(state, o) {
            Vue.set(state.job, o.name, {
                amount: 0,
                max: o.max ?? null,
                needed: o.needed ?? 1,
                rewards: o.rewards ?? []
            });
        },
        initOffering(state, o) {
            Vue.set(state.offering, o.name, {
                unlock: o.unlock ?? null,
                offeringBought: 0,
                upgradeBought: 0,
                cost: o.cost ?? (() => 1),
                amount: o.amount ?? 1,
                increment: o.increment ?? 0,
                effect: o.effect ?? 1
            });
        },
        initPolicy(state, o) {
            Vue.set(state.policy, o.name, {
                value: 0,
                mult: o.mult,
                icon: o.icon ?? 'mdi-star',
                effect: o.effect ?? []
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateJobKey(state, o) {
            Vue.set(state.job[o.name], o.key, o.value);
        },
        updateOfferingKey(state, o) {
            Vue.set(state.offering[o.name], o.key, o.value);
        },
        updatePolicyKey(state, o) {
            Vue.set(state.policy[o.name], o.key, o.value);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            for (const [key] of Object.entries(state.job)) {
                commit('updateJobKey', {name: key, key: 'amount', value: 0});
            }
            for (const [key] of Object.entries(state.offering)) {
                commit('updateOfferingKey', {name: key, key: 'offeringBought', value: 0});
                commit('updateOfferingKey', {name: key, key: 'upgradeBought', value: 0});
            }
            for (const [key] of Object.entries(state.policy)) {
                commit('updatePolicyKey', {name: key, key: 'value', value: 0});
            }
            commit('updateKey', {key: 'explorerProgress', value: 0});
            commit('updateKey', {key: 'offeringGen', value: 0});
        },
        addWorker({ state, getters, dispatch }, jobName) {
            const job = state.job[jobName];
            if (getters.unemployed >= job.needed && (job.max === null || job.amount < job.max)) {
                dispatch('setWorkerCount', {name: jobName, amount: job.amount + 1});
            }
        },
        addMaxWorker({ state, getters, dispatch }, jobName) {
            const job = state.job[jobName];
            const max = Math.min(Math.floor(getters.unemployed / job.needed), job.max === null ? Infinity : (job.max - job.amount));
            if (max > 0) {
                dispatch('setWorkerCount', {name: jobName, amount: job.amount + max});
            }
        },
        removeWorker({ state, dispatch }, jobName) {
            const job = state.job[jobName];
            if (job.amount > 0) {
                dispatch('setWorkerCount', {name: jobName, amount: job.amount - 1});
            }
        },
        removeMaxWorker({ state, dispatch }, jobName) {
            const job = state.job[jobName];
            if (job.amount > 0) {
                dispatch('setWorkerCount', {name: jobName, amount: 0});
            }
        },
        setWorkerCount({ commit, dispatch }, o) {
            commit('updateJobKey', {name: o.name, key: 'amount', value: o.amount});

            // Update mults
            dispatch('applyJobEffect', o.name);
        },
        prestige({ state, rootState, commit, dispatch }, subfeature) {
            const prestigeGain = rootState.currency.village_faith.value;
            commit('stat/increaseTo', {feature: 'village', name: 'bestPrestige', value: prestigeGain}, {root: true});
            commit('stat/add', {feature: 'village', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'village', name: 'blessing', amount: prestigeGain}, {root: true});

            // Unassign all workers
            for (const [key] of Object.entries(state.job)) {
                dispatch('setWorkerCount', {name: key, amount: 0});
            }

            // Reset sacrifice cost
            for (const [key] of Object.entries(state.offering)) {
                commit('updateOfferingKey', {name: key, key: 'offeringBought', value: 0});
            }

            // Reset all policies to 0
            for (const [key, elem] of Object.entries(state.policy)) {
                if (elem.value !== 0) {
                    commit('updatePolicyKey', {name: key, key: 'value', value: 0});
                    dispatch('applyPolicyEffect', key);
                }
            }

            commit('system/updateSubfeature', {key: 'village', value: subfeature}, {root: true});
            dispatch('upgrade/reset', {feature: 'village', subfeature, type: 'regular'}, {root: true});
            dispatch('upgrade/reset', {feature: 'village', subfeature, type: 'building'}, {root: true});
            dispatch('currency/reset', {feature: 'village', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'village', type: 'regular'}, {root: true});
            commit('updateKey', {key: 'explorerProgress', value: 0});
            dispatch('card/activateCards', 'village', {root: true});

            dispatch('applyOfferingEffect');
            dispatch('upgrade/updateVillageStats', null, {root: true});
        },
        buyOffering({ state, rootGetters, commit, dispatch }, o) {
            const offering = state.offering[o.name];
            const max = !!o.max;

            let firstRun = true;
            while (firstRun && rootGetters['currency/value']('village_' + o.name) >= offering.cost(offering.offeringBought)) {
                dispatch('currency/spend', {feature: 'village', name: o.name, amount: offering.cost(offering.offeringBought)}, {root: true});
                dispatch('currency/gain', {feature: 'village', name: 'offering', amount: offering.amount}, {root: true});
                commit('updateOfferingKey', {name: o.name, key: 'offeringBought', value: offering.offeringBought + 1});

                commit('stat/add', {feature: 'village', name: 'totalOffering', value: 1}, {root: true});
                commit('stat/add', {feature: 'village', name: 'offeringAmount', value: offering.amount}, {root: true});

                // Count total offerings for stat
                let totalOfferings = 0;
                for (const [, elem] of Object.entries(state.offering)) {
                    totalOfferings += elem.offeringBought;
                }
                commit('stat/increaseTo', {feature: 'village', name: 'bestOffering', value: totalOfferings}, {root: true});

                if (!max) {
                    firstRun = false;
                }
            }
        },
        upgradeOffering({ state, rootState, rootGetters, commit, dispatch }, o) {
            const offering = state.offering[o.name];
            const buyMax = o.buyMax ?? false;
            const baseCost = offering.amount + offering.increment * offering.upgradeBought;
            const offeringOwned = rootGetters['currency/value']('village_offering');

            if (offeringOwned >= baseCost) {
                // Buy one or all if buyMax is enabled
                let amount = buyMax ? Math.floor(offeringOwned / offering.amount) : 1;
                if (buyMax && offering.increment > 0) {
                    let step = 1;
                    while (offeringOwned >= deltaLinear(offering.amount, offering.increment, step, offering.upgradeBought)) {
                        step *= 2;
                    }
                    amount = step / 2;
                    while (step > 1) {
                        step /= 2;
                        if (offeringOwned >= deltaLinear(offering.amount, offering.increment, amount + step, offering.upgradeBought)) {
                            amount += step;
                        }
                    }
                }
                dispatch('currency/spend', {feature: 'village', name: 'offering', amount: deltaLinear(offering.amount, offering.increment, amount, offering.upgradeBought)}, {root: true});
                commit('updateOfferingKey', {name: o.name, key: 'upgradeBought', value: offering.upgradeBought + amount});

                // Update effect for this currency only
                if (offering.unlock === null || rootState.unlock[offering.unlock].use) {
                    dispatch('mult/setBase', {
                        name: `currencyVillage${ capitalize(o.name) }Cap`,
                        key: 'villageOffering',
                        value: state.offering[o.name].upgradeBought * rootGetters['mult/get']('villageOfferingPower', offering.effect)
                    }, {root: true});
                }
            }
        },
        applyJobEffect({ state, dispatch }, name) {
            state.job[name].rewards.forEach(reward => {
                if (state.job[name].amount > 0) {
                    const value = (reward.type === 'mult' ? 1 : 0) + (state.job[name].amount * reward.amount);
                    dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `villageJob_${name}`, value}, {root: true});
                } else {
                    dispatch('mult/removeKey', {type: reward.type, name: reward.name, key: `villageJob_${name}`}, {root: true});
                }
            });
        },
        applyAllJobs({ state, dispatch }) {
            for (const [key, elem] of Object.entries(state.job)) {
                if (elem.amount > 0) {
                    dispatch('applyJobEffect', key);
                }
            }
        },
        applyOfferingEffect({ state, rootState, rootGetters, dispatch }) {
            for (const [key, elem] of Object.entries(state.offering)) {
                const value = elem.upgradeBought * rootGetters['mult/get']('villageOfferingPower', elem.effect);

                const multKey = `currencyVillage${ capitalize(key) }Cap`;
                if ((elem.unlock === null || rootState.unlock[elem.unlock].use) && value > 0) {
                    dispatch('mult/setBase', {name: multKey, key: 'villageOffering', value}, {root: true});
                } else {
                    dispatch('mult/removeKey', {name: multKey, key: 'villageOffering', type: 'base'}, {root: true});
                }
            }
        },
        applyPolicyEffect({ state, dispatch }, name) {
            const policy = state.policy[name];
            policy.effect.forEach(eff => {
                if (policy.value !== 0) {
                    dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `villagePolicy_${name}`, value: eff.value(policy.value), trigger: true}, {root: true});
                } else {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `villagePolicy_${name}`}, {root: true});
                }
            });
        },
        addPolicy({ state, rootGetters, commit, dispatch }, name) {
            const policy = state.policy[name];
            if (policy.value < rootGetters['mult/get'](policy.mult)) {
                commit('updatePolicyKey', {name, key: 'value', value: policy.value + 1});
                dispatch('applyPolicyEffect', name);
            }
            if (name === 'scanning') {
                commit('updateKey', {key: 'explorerProgress', value: 0});
            }
        },
        removePolicy({ state, rootGetters, commit, dispatch }, name) {
            const policy = state.policy[name];
            if (policy.value > (0 - rootGetters['mult/get'](policy.mult))) {
                commit('updatePolicyKey', {name, key: 'value', value: policy.value - 1});
                dispatch('applyPolicyEffect', name);
            }
        },
        getLootDrops({ getters, dispatch }, amount = 1) {
            const weights = getters.lootWeights;
            for (let i = 0; i < amount; i++) {
                dispatch('currency/gain', {feature: 'village', name: 'loot' + weightSelect(weights), amount: 1}, {root: true});
            }
        }
    }
}
