import Vue from "vue";
import { capitalize } from "../js/utils/format";
import { weightSelect } from "../js/utils/random";
import { SECONDS_PER_HOUR, VILLAGE_JOY_HAPPINESS_REDUCTION, VILLAGE_JOY_MIN_HAPPINESS, VILLAGE_JOY_PER_HAPPINESS, VILLAGE_OFFERING_MULT_EFFECT, VILLAGE_OFFERING_PASSIVE_GAIN, VILLAGE_OFFERING_PRICE_INCREMENT } from "../js/constants";
import { getSequence } from "../js/utils/math";

export default {
    namespaced: true,
    state: {
        job: {},
        offering: {},
        policy: {},
        crafting: {},
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
        artisansActive: (state) => {
            let active = 0;
            for (const [, elem] of Object.entries(state.crafting)) {
                if (elem.isCrafting) {
                    active++;
                }
            }
            return active;
        },
        countersActive: (state) => {
            let active = 0;
            for (const [, elem] of Object.entries(state.crafting)) {
                if (elem.isSelling) {
                    active++;
                }
            }
            return active;
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
        offeringCount: (state) => {
            let total = 0;
            for (const [, elem] of Object.entries(state.offering)) {
                total += elem.offeringBought;
            }
            return total;
        },
        offeringScore: (state) => {
            let total = 0;
            for (const [, elem] of Object.entries(state.offering)) {
                total += elem.offeringBought * elem.amount;
            }
            return total;
        },
        offeringPerSecond: (state, getters) => {
            return getters.offeringScore * VILLAGE_OFFERING_PASSIVE_GAIN / SECONDS_PER_HOUR;
        },
        offeringBaseEffect: (state, getters, rootState, rootGetters) => (name, level) => {
            const offering = state.offering[name];
            return offering.hasMultiplier ? (level * offering.effect) : rootGetters['mult/get']('villageOfferingPower', getSequence(10, level) * offering.effect);
        },
        sharesGain: (state, getters, rootState, rootGetters) => {
            const val = rootState.currency.village_copperCoin.value / 1000;
            return val >= 10 ? rootGetters['mult/get']('currencyVillageSharesGain', val) : 0;
        }
    },
    mutations: {
        initJob(state, o) {
            Vue.set(state.job, o.name, {
                amount: 0,
                max: o.max ?? null,
                maxDefault: o.max ?? null,
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
                effect: o.effect ?? 1,
                hasMultiplier: o.hasMultiplier ?? true
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
        initCrafting(state, o) {
            Vue.set(state.crafting, o.name, {
                icon: o.icon ?? 'mdi-square',
                color: o.color ?? 'grey',
                price: o.price ?? {},
                baseValue: o.value ?? 10,
                value: o.value ?? 10,
                baseTimeNeeded: o.timeNeeded ?? 60,
                timeNeeded: o.timeNeeded ?? 60,
                milestone: o.milestone ?? {},
                prio: o.prio ?? 0,
                isSpecial: o.isSpecial ?? false,
                effect: o.effect ?? [],
                unlocked: false,
                isCrafting: false,
                isSelling: false,
                sellPrice: o.value ?? 10,
                cacheSellChance: 0,
                progress: 0,
                owned: 0,
                crafted: 0
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.key][o.name], o.subkey, o.value);
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
            for (const [key, elem] of Object.entries(state.job)) {
                commit('updateJobKey', {name: key, key: 'amount', value: 0});
                commit('updateJobKey', {name: key, key: 'max', value: elem.maxDefault});
            }
            for (const [key] of Object.entries(state.offering)) {
                commit('updateOfferingKey', {name: key, key: 'offeringBought', value: 0});
                commit('updateOfferingKey', {name: key, key: 'upgradeBought', value: 0});
            }
            for (const [key] of Object.entries(state.policy)) {
                commit('updatePolicyKey', {name: key, key: 'value', value: 0});
            }
            for (const [key, elem] of Object.entries(state.crafting)) {
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'value', value: elem.baseValue});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'timeNeeded', value: elem.baseTimeNeeded});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'unlocked', value: false});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'isCrafting', value: false});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'isSelling', value: false});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'sellPrice', value: elem.baseValue});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'cacheSellChance', value: 0});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'progress', value: 0});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'owned', value: 0});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'crafted', value: 0});
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
        prestige({ state, getters, rootState, commit, dispatch }, subfeature) {
            const currentSubfeature = rootState.system.features.village.currentSubfeature;
            const prestigeGain = [rootState.currency.village_faith.value, getters.sharesGain][currentSubfeature];
            commit('stat/increaseTo', {feature: 'village', name: 'bestPrestige' + currentSubfeature, value: prestigeGain}, {root: true});
            commit('stat/add', {feature: 'village', name: 'prestigeCount', value: 1}, {root: true});
            dispatch('currency/gain', {feature: 'village', name: ['blessing', 'shares'][currentSubfeature], amount: prestigeGain}, {root: true});

            // Unassign all workers
            for (const [key] of Object.entries(state.job)) {
                dispatch('setWorkerCount', {name: key, amount: 0});
            }

            // Reset all policies to 0
            for (const [key, elem] of Object.entries(state.policy)) {
                if (elem.value !== 0) {
                    commit('updatePolicyKey', {name: key, key: 'value', value: 0});
                    dispatch('applyPolicyEffect', key);
                }
            }

            // Reset all crafts
            for (const [key, elem] of Object.entries(state.crafting)) {
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'isCrafting', value: false});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'isSelling', value: false});
                commit('updateSubkey', {key: 'crafting', name: key, subkey: 'cacheSellChance', value: 0});
                if (!elem.isSpecial) {
                    commit('updateSubkey', {key: 'crafting', name: key, subkey: 'progress', value: 0});
                    commit('updateSubkey', {key: 'crafting', name: key, subkey: 'owned', value: 0});
                }
            }

            commit('system/updateSubfeature', {key: 'village', value: subfeature}, {root: true});
            dispatch('upgrade/reset', {feature: 'village', subfeature, type: 'regular'}, {root: true});
            dispatch('upgrade/reset', {feature: 'village', subfeature, type: 'building'}, {root: true});
            dispatch('currency/reset', {feature: 'village', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'village', type: 'regular'}, {root: true});
            commit('updateKey', {key: 'explorerProgress', value: 0});
            dispatch('school/updateBookEffects', 'village', {root: true});
            dispatch('card/activateCards', 'village', {root: true});

            dispatch('applyOfferingEffect');
            dispatch('upgrade/updateVillageStats', null, {root: true});
        },
        buyOffering({ state, rootGetters, commit, dispatch }, name) {
            const offering = state.offering[name];

            if (rootGetters['currency/value']('village_' + name) >= offering.cost(offering.offeringBought)) {
                dispatch('currency/spend', {feature: 'village', name: name, amount: offering.cost(offering.offeringBought)}, {root: true});
                dispatch('currency/gain', {feature: 'village', name: 'offering', amount: offering.amount * (offering.offeringBought + 1)}, {root: true});
                commit('updateOfferingKey', {name: name, key: 'offeringBought', value: offering.offeringBought + 1});
            }
        },
        upgradeOffering({ state, rootState, rootGetters, commit, dispatch }, name) {
            const offering = state.offering[name];
            const price = Math.round(Math.pow(offering.amount, 2) * Math.pow(VILLAGE_OFFERING_PRICE_INCREMENT, offering.upgradeBought));
            const offeringOwned = rootGetters['currency/value']('village_offering');

            if (offeringOwned >= price) {
                dispatch('currency/spend', {feature: 'village', name: 'offering', amount: price}, {root: true});
                commit('updateOfferingKey', {name, key: 'upgradeBought', value: offering.upgradeBought + 1});

                // Update effect for this currency only
                if (offering.unlock === null || rootState.unlock[offering.unlock].use) {
                    dispatch('applyOfferingEffect', name);
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
        applyOfferingEffect({ state, getters, rootState, rootGetters, dispatch }, name = null) {
            for (const [key, elem] of Object.entries(state.offering)) {
                if (name === null || key === name) {
                    const multKey = `currencyVillage${ capitalize(key) }Cap`;
                    if ((elem.unlock === null || rootState.unlock[elem.unlock].use) && elem.upgradeBought > 0) {
                        dispatch('mult/setBase', {name: multKey, key: 'villageOffering', value: getters.offeringBaseEffect(key, elem.upgradeBought)}, {root: true});
                        if (elem.hasMultiplier) {
                            dispatch('mult/setMult', {name: multKey, key: 'villageOffering', value: rootGetters['mult/get']('villageOfferingPower', Math.pow(VILLAGE_OFFERING_MULT_EFFECT, elem.upgradeBought) - 1) + 1}, {root: true});
                        }
                    } else {
                        dispatch('mult/removeKey', {name: multKey, key: 'villageOffering', type: 'base'}, {root: true});
                        if (elem.hasMultiplier) {
                            dispatch('mult/removeKey', {name: multKey, key: 'villageOffering', type: 'mult'}, {root: true});
                        }
                    }
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
        },
        applyMilestoneEffects({ state, commit, dispatch }, name) {
            const craft = state.crafting[name];
            commit('updateSubkey', {key: 'crafting', name, subkey: 'value', value: craft.baseValue});
            commit('updateSubkey', {key: 'crafting', name, subkey: 'timeNeeded', value: craft.baseTimeNeeded});
            for (const [crafts, reward] of Object.entries(craft.milestone)) {
                if (craft.crafted >= parseInt(crafts)) {
                    if (reward.type === 'changeStat') {
                        commit('updateSubkey', {key: 'crafting', name, subkey: reward.name, value: reward.value});
                    } else {
                        dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `villageMilestone_${ name }_${ crafts }`, value: reward.value, trigger: true}, {root: true});
                    }
                }
            }
            commit('updateSubkey', {key: 'crafting', name, subkey: 'cacheSellChance', value: 0.01 * Math.pow(craft.value / craft.sellPrice, 2)});
        },
        applyMilestoneGlobalLevel({ state, dispatch }) {
            let totalMilestones = 0;
            for (const [, elem] of Object.entries(state.crafting)) {
                for (const [crafts] of Object.entries(elem.milestone)) {
                    if (elem.crafted >= parseInt(crafts)) {
                        totalMilestones++;
                    }
                }
            }
            dispatch('meta/globalLevelPart', {key: 'village_1', amount: totalMilestones}, {root: true});
        },
        applySpecialCraftEffects({ state, dispatch }, name) {
            const craft = state.crafting[name];
            craft.effect.forEach(reward => {
                dispatch('system/applyEffect', {type: reward.type, name: reward.name, multKey: `villageSpecialCraft_${ name }`, value: reward.value(craft.owned), trigger: true}, {root: true});
            });
        },
        openIngredientBox({ rootGetters, commit, dispatch }) {
            if (rootGetters['consumable/canAfford']('village_ingredientBox')) {
                let rngGen = rootGetters['system/getRng']('village_ingredientBox');
                const ingredients = ['acidVial', 'snowflake', 'chiliBundle', 'gears'];
                const weights = [20, 14, 11, 9].slice(0, rootGetters['mult/get']('villageIngredientCount'));
                for (let i = 0, n = rootGetters['mult/get']('villageIngredientBoxAmount'); i < n; i++) {
                    dispatch('currency/gain', {feature: 'village', name: ingredients[weightSelect(weights, rngGen())], amount: 1}, {root: true});
                }
                commit('system/nextRng', {name: 'village_ingredientBox', amount: 1}, {root: true});
                dispatch('consumable/use', 'village_ingredientBox', {root: true});
            }
        }
    }
}
