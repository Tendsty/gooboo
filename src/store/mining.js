import Vue from "vue";
import { MINING_COAL_DEPTH, MINING_CRAFTING_COMPRESSION, MINING_DEEPROCK_DEPTH, MINING_DWELLER_OVERFLOW, MINING_ENHANCEMENT_BARS, MINING_ENHANCEMENT_INCREMENT, MINING_ENHANCEMENT_MAX, MINING_GLOWSHARD_DEPTH, MINING_GRANITE_DEPTH, MINING_MOONSHARD_DEPTH, MINING_NITER_DEPTH, MINING_OBSIDIAN_DEPTH, MINING_OBSIDIAN_PENALTY_BASE, MINING_OBSIDIAN_PENALTY_INCREMENT, MINING_PHOSPHORUS_DEPTH, MINING_SALT_DEPTH, MINING_SMELTERY_TEMPERATURE_SPEED, MINING_SMELTERY_TIME_INCREMENT, MINING_SULFUR_DEPTH, SECONDS_PER_HOUR } from "../js/constants";
import { buildNum, capitalize } from "../js/utils/format";
import { digitSum, isPrime, logBase } from "../js/utils/math";
import { randomFloat } from "../js/utils/random";

export default {
    namespaced: true,
    state: {
        depth: 1,
        pickaxePower: 8,
        durability: 0,
        ingredient: {},
        smeltery: {},
        gas: {
            helium: 1,
            neon: 51,
            argon: 121,
            krypton: 221,
            xenon: 401,
            radon: 651,
        },
        breaks: [],
        ingredientList: [],
        resin: 0,
        enhancement: {},
        enhancementIngredient: null,
        enhancementsActive: true,
        glowshardLimit: 0,
        beacon: {},
        beaconPlaced: {},
        beaconCooldown: 0,
        torchDepths: [],
        smelteryNotSpent: ['mining_helium', 'mining_neon'],
    },
    getters: {
        damage: (state, getters, rootState, rootGetters) => {
            return rootGetters['mult/get']('miningDamage', state.pickaxePower);
        },
        depthDurability: (state, getters, rootState) => (depth) => {
            const incrementValue = [1.75, 1.85][rootState.system.features.mining.currentSubfeature];
            const baseValue = [10, buildNum(500, 'M')][rootState.system.features.mining.currentSubfeature];
            return Math.ceil(Math.pow(incrementValue, depth) * Math.pow(depth * 0.1 + 1, 2) * baseValue);
        },
        depthBaseToughness: (state, getters, rootState) => (depth) => {
            return Math.min(buildNum(1, 'C'), (depth < 10 || rootState.system.features.mining.currentSubfeature === 1) ? 0 : (Math.pow(1.82, depth) * (depth * 0.01 - 0.09) * 0.25 * Math.pow(depth * 0.1 + 1, 2) * (depth > 150 ? Math.pow(depth * 0.002 + 0.7, depth - 150) : 1) * ((depth >= 300 && (depth % 10 === 0) ? 100 : 1))));
        },
        depthToughness: (state, getters, rootState, rootGetters) => (depth) => {
            return rootGetters['mult/get']('miningToughness', (getters.depthBaseToughness(depth)));
        },
        depthBaseScrap: (state, getters, rootState) => (depth) => {
            const subfeature = rootState.system.features.mining.currentSubfeature;
            return Math.pow(1.2, depth) * Math.pow(depth * 0.2 + 1.2, 2) * (subfeature === 1 ? (isPrime(depth) ? 0.01 : 0.1) : 2);
        },
        depthScrap: (state, getters, rootState, rootGetters) => (depth) => {
            return rootGetters['mult/get']('currencyMiningScrapGain', getters.depthBaseScrap(depth));
        },
        depthOre: (state, getters, rootState, rootGetters) => (depth, showAll = false) => {
            if (rootState.system.features.mining.currentSubfeature !== 0) {
                return {};
            }
            let ore = {};
            const hasTorch = state.torchDepths.includes(depth);
            for (const [key, elem] of Object.entries(state.ingredient)) {
                const depthCondition = depth <= elem.maxDepth || depth % elem.modulo === 0;
                if (depth >= elem.minDepth && (showAll || depthCondition || hasTorch)) {
                    const baseAmount = Math.pow(elem.amountMult, depth - elem.minDepth - (depth > elem.maxDepth ? ((depth - elem.maxDepth) * ((elem.modulo - 1) / elem.modulo)) : 0)) * elem.baseAmount;
                    ore[key] = {...elem, baseAmount, amount: rootGetters['mult/get'](rootGetters['currency/gainMultName']('mining', key), baseAmount * (depthCondition ? 1 : 0.5))};
                }
            }
            return ore;
        },
        rareDropBase: (state) => (name) => {
            let amount = 0;
            switch (name) {
                case 'granite':
                    amount = Math.pow(1.1, state.depth - MINING_GRANITE_DEPTH);
                    break;
                case 'salt':
                    amount = Math.pow(1.05, state.depth - MINING_SALT_DEPTH) * 0.1;
                    break;
                case 'coal':
                    amount = 10 + state.depth - MINING_COAL_DEPTH;
                    break;
                case 'sulfur':
                    amount = Math.pow(1.05, state.depth - MINING_SULFUR_DEPTH);
                    break;
                case 'niter':
                    amount = 100 + (state.depth - MINING_NITER_DEPTH) * 5;
                    break;
                case 'obsidian':
                    amount = Math.pow(1.05, state.depth - MINING_OBSIDIAN_DEPTH);
                    break;
                case 'deeprock':
                    amount = Math.pow(1.05, state.depth - MINING_DEEPROCK_DEPTH) * Math.pow(1.5, digitSum(state.depth) - 14);
                    break;
                case 'glowshard':
                    amount = 10;
                    break;
                case 'limestone':
                    amount = Math.pow(1.1, state.depth) * 0.001;
                    break;
                case 'moonshard':
                    amount = Math.pow(1.35, state.depth - MINING_MOONSHARD_DEPTH) * 0.00001;
                    break;
                case 'phosphorus':
                    amount = Math.pow(5, (state.depth - MINING_PHOSPHORUS_DEPTH) / 25) * 0.000001;
                    break;
            }
            return amount;
        },
        rareDropFinal: (state, getters, rootState, rootGetters) => (name) => {
            return rootGetters['mult/get'](rootGetters['currency/gainMultName']('mining', name), getters.rareDropBase(name));
        },
        rareDrops: (state, getters, rootState) => {
            let obj = {};
            if (rootState.system.features.mining.currentSubfeature === 0) {
                if (state.depth >= MINING_GRANITE_DEPTH && getters.currentBreaks >= 1000) {
                    obj.granite = getters.rareDropFinal('granite') * getters.graniteBreaksMult;
                }
                if (state.depth >= MINING_SALT_DEPTH && (Object.keys(getters.currentOre).length === 1 || state.torchDepths.includes(state.depth))) {
                    obj.salt = getters.rareDropFinal('salt') * (Object.keys(getters.currentOre).length === 1 ? 1 : 0.5);
                }
                if (state.depth >= MINING_COAL_DEPTH && getters.currentBreaks === 0) {
                    obj.coal = getters.rareDropFinal('coal');
                }
                if (state.depth >= MINING_SULFUR_DEPTH && getters.currentBreaks === 0) {
                    obj.sulfur = getters.rareDropFinal('sulfur');
                }
                if (state.depth >= MINING_NITER_DEPTH) {
                    const breakslog10 = logBase(getters.currentBreaks + 1, 10);
                    if (Math.round(breakslog10) === breakslog10) {
                        obj.niter = getters.rareDropFinal('niter');
                    }
                }
                if (state.depth >= MINING_OBSIDIAN_DEPTH && (getters.enhancementLevel <= 0 || !state.enhancementsActive)) {
                    obj.obsidian = getters.rareDropFinal('obsidian');
                }
                if (state.depth >= MINING_DEEPROCK_DEPTH && digitSum(state.depth) >= 14) {
                    obj.deeprock = getters.rareDropFinal('deeprock');
                }
                if (state.depth >= (MINING_GLOWSHARD_DEPTH + state.glowshardLimit)) {
                    obj.glowshard = getters.rareDropFinal('glowshard');
                }
            }
            if (rootState.system.features.mining.currentSubfeature === 1) {
                if (isPrime(state.depth)) {
                    obj.limestone = getters.rareDropFinal('limestone');
                }
                if (state.depth >= MINING_MOONSHARD_DEPTH && rootState.stat.mining_depthDwellerCap1.value >= state.depth) {
                    obj.moonshard = getters.rareDropFinal('moonshard');
                }
                if (state.depth >= MINING_PHOSPHORUS_DEPTH && (state.depth % 25 === 0)) {
                    obj.phosphorus = getters.rareDropFinal('phosphorus');
                }
            }
            return obj;
        },
        graniteBreaksMult: (state, getters) => {
            return Math.pow(2, Math.max(0, Math.floor(logBase(getters.currentBreaks + 1, 10)) - 3));
        },
        depthBaseSmoke: () => (depth) => {
            return Math.pow(1.05, depth - 25) * ((depth >= MINING_PHOSPHORUS_DEPTH && (depth % 25 === 0)) ? 0 : 0.0005);
        },
        depthSmoke: (state, getters, rootState, rootGetters) => (depth) => {
            return (rootState.unlock.miningSmoke.use && depth >= 25 && rootState.system.features.mining.currentSubfeature === 1) ? rootGetters['mult/get']('currencyMiningSmokeGain', getters.depthBaseSmoke(depth)) : 0;
        },
        depthGasLimit: (state, getters, rootState, rootGetters) => (depth, gas) => {
            return Math.round((depth + 1 - state.gas[gas]) * rootGetters['mult/get'](`currencyMining${ capitalize(gas) }Limit`, 1) * Math.pow(rootGetters['mult/get'](`currencyMining${ capitalize(gas) }Increment`, 1), depth - state.gas[gas]));
        },
        depthGas: (state, getters, rootState, rootGetters) => (depth) => {
            if (rootState.system.features.mining.currentSubfeature !== 1) {
                return {};
            }
            let gasses = {};
            for (const [gas, minDepth] of Object.entries(state.gas)) {
                if (depth >= minDepth) {
                    const amount = Math.ceil(
                        Math.max(0, getters.depthGasLimit(depth, gas) - rootGetters['currency/value']('mining_' + gas)) *
                        rootGetters['mult/get'](`currencyMining${ capitalize(gas) }Gain`)
                    );
                    if (amount > 0) {
                        gasses[gas] = amount;
                    }
                }
            }
            return gasses;
        },
        currentDurability: (state, getters) => {
            return getters.depthDurability(state.depth);
        },
        currentBaseToughness: (state, getters) => {
            return getters.depthBaseToughness(state.depth);
        },
        currentToughness: (state, getters) => {
            return getters.depthToughness(state.depth);
        },
        currentBaseScrap: (state, getters) => {
            return getters.depthBaseScrap(state.depth);
        },
        currentBaseSmoke: (state, getters) => {
            return getters.depthBaseSmoke(state.depth);
        },
        currentScrap: (state, getters) => {
            return getters.depthScrap(state.depth);
        },
        currentOre: (state, getters) => {
            return getters.depthOre(state.depth);
        },
        currentSmoke: (state, getters) => {
            return getters.depthSmoke(state.depth);
        },
        currentGasLimit: (state, getters) => (gas) => {
            return getters.depthGasLimit(state.depth, gas);
        },
        currentGas: (state, getters) => {
            return getters.depthGas(state.depth);
        },
        depthHitsNeeded: (state, getters) => (depth) => {
            return getters.damage > getters.depthToughness(depth) ? Math.ceil(getters.depthDurability(depth) / (getters.damage - getters.depthToughness(depth))) : Infinity;
        },
        hitsNeeded: (state, getters) => {
            return getters.damage > getters.currentToughness ? Math.ceil(getters.currentDurability / (getters.damage - getters.currentToughness)) : Infinity;
        },
        currentHitsNeeded: (state, getters) => {
            return getters.damage > getters.currentToughness ? Math.ceil(state.durability / (getters.damage - getters.currentToughness)) : Infinity;
        },
        currentDamage: (state, getters) => {
            return Math.max(0, getters.damage - getters.currentToughness);
        },
        pickaxeStats: (state, getters, rootState, rootGetters) => {
            let quality = 0;
            let impurity = 1;
            let compress = 0;
            let unique = 0;
            let uniqueObj = {};

            const premiumSlots = rootGetters['mult/get']('miningPickaxePremiumCraftingSlots');

            state.ingredientList.forEach((elem, key) => {
                const isPremium = key < premiumSlots;
                quality += state.ingredient[elem.name].power;
                const impurityBase = Math.max(1, state.ingredient[elem.name].impurity * Math.pow(0.95, elem.compress) - elem.compress * 0.05);
                impurity *= isPremium ? ((impurityBase - 1) / 2 + 1) : impurityBase;
                compress += elem.compress * (isPremium ? 2 : 1);
                if (!uniqueObj[elem.name]) {
                    unique++;
                    uniqueObj[elem.name] = true;
                }
            });

            const alloying = unique * 0.5 + 0.5;
            const cleanseBase = compress * 0.25 + 1;
            const cleanse = rootGetters['mult/get']('miningPickaxeCraftingQuality', cleanseBase, state.resin * 0.25 + 1);

            let purity = (impurity / cleanse) > 1 ? Math.pow(0.5, impurity / cleanse) : (1 - impurity / cleanse / 2);

            return {baseQuality: quality, alloying, impurity, cleanse: cleanseBase, quality: rootGetters['mult/get']('miningPickaxeCraftingPower', quality * (state.resin * 0.3 + 1) * alloying), purity};
        },
        pickaxeCost: (state, getters, rootState, rootGetters) => {
            let price = {};

            state.ingredientList.forEach(elem => {
                if (!price[elem.name]) {
                    price[elem.name] = 0;
                }
                price[elem.name] += Math.pow(MINING_CRAFTING_COMPRESSION, elem.compress) / rootGetters['mult/get']('miningOreQuality');
            });

            if (state.resin > 0) {
                price.resin = state.resin;
            }

            return price;
        },
        pickaxeCanAfford: (state, getters, rootState, rootGetters) => {
            const price = getters.pickaxeCost;
            let canAfford = true;

            for (const [key, elem] of Object.entries(price)) {
                if (rootGetters['currency/value']('mining_' + key) < elem) {
                    canAfford = false;
                }
            }
            return canAfford;
        },
        pickaxeUpgradeChance: (state, getters) => {
            let stats = getters.pickaxeStats;

            if (stats.quality <= state.pickaxePower) {
                return 0;
            } else if (stats.quality * stats.purity >= state.pickaxePower) {
                return 1;
            } else {
                let rngNeeded = (state.pickaxePower / stats.quality - stats.purity) / (1 - stats.purity);
                return (Math.pow(2, (1 - rngNeeded) * logBase(1 / stats.purity + 1, 2)) - 1) * stats.purity;
            }
        },
        dwellerLimit: (state, getters, rootState, rootGetters) => {
            return rootState.stat[`mining_maxDepth${rootState.system.features.mining.currentSubfeature}`].value * rootGetters['mult/get']('miningDepthDwellerMax');
        },
        dwellerStats: (state, getters, rootState) => (subfeature) => {
            const baseValue = Math.floor(rootState.stat[`mining_depthDweller${ subfeature }`].value * 2);
            const capValue = Math.floor(rootState.stat[`mining_depthDwellerCap${ subfeature }`].value * 2);
            return {cap: capValue, bonus: capValue > 0 ? (baseValue / capValue) : 1};
        },
        dwellerBaseGreenCrystal: (state, getters) => {
            const stats = getters.dwellerStats(0);
            return getters.dwellerBaseGain(stats.cap) * stats.bonus;
        },
        dwellerGreenCrystal: (state, getters) => {
            const stats = getters.dwellerStats(0);
            return getters.dwellerGain(stats.cap, 0) * stats.bonus;
        },
        dwellerBaseYellowCrystal: (state, getters) => {
            const stats = getters.dwellerStats(1);
            return getters.dwellerBaseGain(stats.cap) * stats.bonus;
        },
        dwellerYellowCrystal: (state, getters) => {
            const stats = getters.dwellerStats(1);
            return getters.dwellerGain(stats.cap, 1) * stats.bonus;
        },
        crystalColor: () => (subfeature) => {
            return ['Green', 'Yellow'][subfeature];
        },
        dwellerBaseGain: () => (steps) => {
            return Math.pow(1.15, steps / 2) * steps * 7;
        },
        dwellerGain: (state, getters, rootState, rootGetters) => (steps, subfeature) => {
            return rootGetters['mult/get'](`currencyMiningCrystal${ getters.crystalColor(subfeature) }Gain`, getters.dwellerBaseGain(steps));
        },
        currentBreaks: (state) => {
            return state.breaks.length >= state.depth ? state.breaks[state.depth - 1] : 0;
        },
        smelteryTimeNeeded: (state, getters, rootState, rootGetters) => (name) => {
            const smeltery = state.smeltery[name];
            return rootGetters['mult/get']('miningSmelteryTime', smeltery.timeNeeded) * Math.pow(MINING_SMELTERY_TIME_INCREMENT, smeltery.total - smeltery.stored) / Math.max(1, (rootGetters['mult/get']('miningSmelteryTemperature') - smeltery.minTemperature) * MINING_SMELTERY_TEMPERATURE_SPEED + 1);
        },
        smelteryPrice: (state) => (name, add = 0) => {
            const smeltery = state.smeltery[name];
            return smeltery.price(smeltery.total + add);
        },
        enhancementLevel: (state) => {
            let level = 0;
            for (const [, elem] of Object.entries(state.enhancement)) {
                level += elem.level;
            }
            return level;
        },
        enhancementBarsNeeded: (state) => {
            if (state.enhancementIngredient === null) {
                return 0;
            }
            return MINING_ENHANCEMENT_BARS + MINING_ENHANCEMENT_INCREMENT * (state.enhancement[state.enhancementIngredient]?.level ?? 0);
        },
        timeUntilNext: (state, getters, rootState, rootGetters) => (amount) => {
            const dwellerLimit = getters.dwellerLimit;
            if (amount > dwellerLimit) {
                return null;
            }
            const dwellerSpeed = rootGetters['mult/get']('miningDepthDwellerSpeed') / dwellerLimit;
            return logBase((amount - MINING_DWELLER_OVERFLOW - dwellerLimit) / -(MINING_DWELLER_OVERFLOW + dwellerLimit - rootState.stat[`mining_depthDwellerCap${rootState.system.features.mining.currentSubfeature}`].value), 1 - dwellerSpeed);
        },
        depthBeacon: (state, getters, rootState) => (depth) => {
            if (rootState.system.features.mining.currentSubfeature !== 0) {
                return null;
            }
            let beacon = null;
            let beaconLevel = 0;
            for (const [key, elem] of Object.entries(state.beaconPlaced)) {
                const level = parseInt(key);
                if ((depth >= level && depth <= (level + state.beacon[elem].range - 1)) && level > beaconLevel) {
                    beacon = elem;
                    beaconLevel = level;
                }
            }
            return beacon;
        },
        currentDepthBeacon: (state, getters) => {
            return getters.depthBeacon(state.depth);
        },
        beaconOwned: (state, getters, rootState, rootGetters) => (name) => {
            let amount = rootGetters['mult/get'](state.beacon[name].ownedMult);
            for (const [, elem] of Object.entries(state.beaconPlaced)) {
                if (elem === name) {
                    amount--;
                }
            }
            return amount;
        }
    },
    mutations: {
        initOre(state, o) {
            const compressUnlock = 'miningCompress' + o.name.slice(3);
            Vue.set(state.ingredient, o.name, {
                power: o.power,
                impurity: o.impurity,
                minDepth: o.minDepth,
                maxDepth: o.maxDepth,
                modulo: o.modulo,
                compressUnlock,
                baseAmount: o.baseAmount,
                amountMult: o.amountMult
            });
        },
        initSmeltery(state, o) {
            Vue.set(state.smeltery, o.name, {
                price: o.price,
                output: o.output,
                progress: 0,
                stored: 0,
                total: 0,
                timeNeeded: o.timeNeeded,
                minTemperature: o.minTemperature
            });
        },
        initEnhancement(state, o) {
            Vue.set(state.enhancement, o.name, {
                level: 0,
                effect: o.effect ?? []
            });
        },
        initBeacon(state, o) {
            Vue.set(state.beacon, o.name, {
                ownedMult: o.ownedMult,
                range: o.range ?? 1,
                color: o.color ?? 'grey',
                level: 0,
                effect: o.effect ?? []
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateSubkey(state, o) {
            Vue.set(state[o.name], o.key, o.value);
        },
        updateSmelteryKey(state, o) {
            Vue.set(state.smeltery[o.name], o.key, o.value);
        },
        updateEnhancementKey(state, o) {
            Vue.set(state.enhancement[o.name], o.key, o.value);
        },
        updateIngredientKey(state, o) {
            Vue.set(state.ingredientList[o.index], o.key, o.value);
        },
        updateBeaconKey(state, o) {
            Vue.set(state.beacon[o.name], o.key, o.value);
        },
        addIngredient(state, o) {
            state.ingredientList.push(o);
        },
        removeIngredient(state, index) {
            state.ingredientList.splice(index, 1);
        },
        addBreaks(state, o) {
            while (state.breaks.length < o.depth) {
                state.breaks.push(0);
            }
            Vue.set(state.breaks, o.depth - 1, state.breaks[o.depth - 1] + o.amount);
        },
        addTorchDepth(state, depth) {
            state.torchDepths.push(depth);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'pickaxePower', value: 8});
            commit('updateKey', {key: 'ingredientList', value: []});
            commit('updateKey', {key: 'dweller', value: 0});
            commit('updateKey', {key: 'depth', value: 1});
            commit('updateKey', {key: 'durability', value: 0});
            commit('updateKey', {key: 'resin', value: 0});
            commit('updateKey', {key: 'breaks', value: []});
            commit('updateKey', {key: 'enhancementIngredient', value: null});
            for (const [key] of Object.entries(state.smeltery)) {
                commit('updateSmelteryKey', {name: key, key: 'progress', value: 0});
                commit('updateSmelteryKey', {name: key, key: 'stored', value: 0});
                commit('updateSmelteryKey', {name: key, key: 'total', value: 0});
            }
            for (const [key] of Object.entries(state.enhancement)) {
                commit('updateEnhancementKey', {name: key, key: 'level', value: 0});
            }
            for (const [key] of Object.entries(state.beacon)) {
                commit('updateBeaconKey', {name: key, key: 'level', value: 0});
            }
            commit('updateKey', {key: 'enhancementsActive', value: true});
            commit('updateKey', {key: 'glowshardLimit', value: 0});
            commit('updateKey', {key: 'torchDepths', value: []});
        },
        addIngredient({ state, rootState, rootGetters, commit }, name) {
            let compress = 0;
            if (rootState.unlock[state.ingredient[name].compressUnlock].use) {
                const currency = rootState.currency['mining_' + name];
                const quality = rootGetters['mult/get']('miningOreQuality');
                let limit = Math.pow(MINING_CRAFTING_COMPRESSION, compress + 1);
                while (currency.value >= (limit / quality) && currency.cap >= limit) {
                    compress++;
                    limit *= MINING_CRAFTING_COMPRESSION;
                }
            }
            commit('addIngredient', {name, compress});
        },
        craftPickaxe({ state, rootState, getters, commit, dispatch, rootGetters }, consumables = {}) {
            const subfeature = rootState.system.features.mining.currentSubfeature;
            if (
                subfeature === 0 &&
                state.ingredientList.length > 0 &&
                getters.pickaxeCanAfford &&
                rootGetters['consumable/canAffordMultiple'](consumables)
            ) {
                const stats = getters.pickaxeStats;

                const rngGroup = Math.max(0, Math.ceil(Math.log(stats.baseQuality * (consumables.mining_goldenHammer ? 1 : stats.purity) / 10) * 4));

                dispatch('consumable/useMultiple', consumables, {root: true});

                if (stats.quality < state.pickaxePower) {
                    commit('stat/increaseTo', {feature: 'mining', name: 'craftingWasted', value: 1}, {root: true});
                }

                let rval = 0;
                if (!consumables.mining_goldenHammer) {
                    let rngGen = rootGetters['system/getRng']('pickaxe_craft' + rngGroup);
                    commit('system/nextRng', {name: 'pickaxe_craft' + rngGroup, amount: 1}, {root: true});
                    rval = 1 - rngGen();
                    commit('stat/increaseTo', {feature: 'mining', name: 'craftingLuck', value: 1 / rval}, {root: true});
                }

                const rng = 1 - (logBase(randomFloat(1, 1 / stats.purity + 1, rval), 2) / logBase(1 / stats.purity + 1, 2));
                const newPick = (rng * (1 - stats.purity) + stats.purity) * stats.quality;
                if (newPick > state.pickaxePower) {
                    commit('updateKey', {key: 'pickaxePower', value: newPick});
                }
                state.ingredientList.forEach(elem => {
                    dispatch('currency/spend', {
                        feature: 'mining',
                        name: elem.name,
                        amount: Math.pow(MINING_CRAFTING_COMPRESSION, elem.compress) / rootGetters['mult/get']('miningOreQuality')
                    }, {root: true});
                });
                if (state.resin > 0) {
                    dispatch('currency/spend', {feature: 'mining', name: 'resin', amount: state.resin}, {root: true});
                }
                commit('stat/add', {feature: 'mining', name: 'craftingCount', value: 1}, {root: true});
            } else if (
                subfeature === 1 &&
                rootGetters['consumable/canAffordMultiple'](consumables)
            ) {
                const power = rootGetters['mult/get']('miningPickaxeCraftingPower', rootState.currency.mining_smoke.value);
                if (power > state.pickaxePower) {
                    commit('updateKey', {key: 'pickaxePower', value: power});
                    dispatch('currency/spendAll', {feature: 'mining', name: 'smoke'}, {root: true});
                }
                commit('stat/add', {feature: 'mining', name: 'craftingCount', value: 1}, {root: true});
            }
        },
        prestige({ state, rootState, getters, rootGetters, commit, dispatch }, subfeature) {
            const currentSubfeature = rootState.system.features.mining.currentSubfeature;
            const prestigeGain = [getters.dwellerGreenCrystal, getters.dwellerYellowCrystal][currentSubfeature];
            const emberGain = Math.floor(rootGetters['mult/get']('currencyMiningEmberGain') * rootState.stat[`mining_depthDweller${ currentSubfeature }`].value);
            if (prestigeGain > 0) {
                commit('stat/increaseTo', {feature: 'mining', name: 'bestPrestige' + currentSubfeature, value: prestigeGain}, {root: true});
                commit('stat/add', {feature: 'mining', name: 'prestigeCount', value: 1}, {root: true});
                dispatch('currency/gain', {feature: 'mining', name: ['crystalGreen', 'crystalYellow'][currentSubfeature], amount: prestigeGain}, {root: true});
            }
            if (emberGain > 0) {
                dispatch('currency/gain', {feature: 'mining', name: 'ember', amount: emberGain}, {root: true});
            }
            for (const [key] of Object.entries(state.smeltery)) {
                commit('updateSmelteryKey', {name: key, key: 'progress', value: 0});
                commit('updateSmelteryKey', {name: key, key: 'stored', value: 0});
                commit('updateSmelteryKey', {name: key, key: 'total', value: 0});
            }
            for (const [key, elem] of Object.entries(state.enhancement)) {
                if (elem.level > 0) {
                    commit('updateEnhancementKey', {name: key, key: 'level', value: 0});
                    dispatch('resetEnhancement', key);
                }
            }
            commit('updateKey', {key: 'pickaxePower', value: 8});
            commit('updateKey', {key: 'ingredientList', value: []});
            commit('updateKey', {key: 'dweller', value: 0});
            commit('updateKey', {key: 'depth', value: 1});
            commit('updateKey', {key: 'breaks', value: []});
            commit('updateKey', {key: 'enhancementIngredient', value: null});
            commit('updateKey', {key: 'enhancementsActive', value: true});
            commit('system/updateSubfeature', {key: 'mining', value: subfeature}, {root: true});
            commit('updateKey', {key: 'durability', value: getters.currentDurability});
            commit('updateKey', {key: 'torchDepths', value: []});
            dispatch('upgrade/reset', {feature: 'mining', subfeature, type: 'regular'}, {root: true});
            dispatch('currency/reset', {feature: 'mining', type: 'regular'}, {root: true});
            dispatch('stat/reset', {feature: 'mining', type: 'regular'}, {root: true});
            dispatch('school/updateBookEffects', 'mining', {root: true});
            dispatch('card/activateCards', 'mining', {root: true});
            if (state.resin > rootGetters['mult/get']('miningResinMax')) {
                commit('updateKey', {key: 'resin', value: rootGetters['mult/get']('miningResinMax')});
            }
            dispatch('applyBeaconEffects');
        },
        addToSmeltery({ state, rootGetters, commit, dispatch }, o) {
            const smeltery = state.smeltery[o.name];
            let price = {};
            let finalPrice = {};
            let amount = 0;
            while (o.max || amount < 1) {
                let maxPrice = {};
                for (const [key, elem] of Object.entries(smeltery.price(smeltery.total + amount))) {
                    price[key] = (price[key] ?? 0) + elem;
                    maxPrice[key] = elem;
                }
                if (rootGetters['currency/canAfford'](price, maxPrice)) {
                    finalPrice = {...price};
                    amount++;
                } else {
                    break;
                }
            }
            if (amount > 0) {
                for (const [key, elem] of Object.entries(finalPrice)) {
                    if (!state.smelteryNotSpent.includes(key)) {
                        dispatch('currency/spend', {feature: key.split('_')[0], name: key.split('_')[1], amount: elem}, {root: true});
                    }
                }
                commit('updateSmelteryKey', {name: o.name, key: 'stored', value: smeltery.stored + amount});
                commit('updateSmelteryKey', {name: o.name, key: 'total', value: smeltery.total + amount});
            }
        },
        enhance({ state, getters, rootGetters, commit, dispatch }) {
            if (state.enhancementIngredient !== null && state.enhancement[state.enhancementIngredient].level < MINING_ENHANCEMENT_MAX && rootGetters['currency/value']('mining_' + state.enhancementIngredient) >= getters.enhancementBarsNeeded) {
                dispatch('currency/spend', {feature: 'mining', name: state.enhancementIngredient, amount: getters.enhancementBarsNeeded}, {root: true});
                commit('updateEnhancementKey', {name: state.enhancementIngredient, key: 'level', value: state.enhancement[state.enhancementIngredient].level + 1});
                commit('stat/increaseTo', {feature: 'mining', name: 'enhancementHighest', value: state.enhancement[state.enhancementIngredient].level}, {root: true});
                dispatch('applyEnhancement', {trigger: true, name: state.enhancementIngredient});
                dispatch('updateObsidianPenalty');
            }
        },
        applyEnhancement({ state, dispatch }, o) {
            let trigger = o.trigger ?? false;
            const level = state.enhancement[o.name].level;
            state.enhancement[o.name].effect.forEach(eff => {
                dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `miningEnhancement_${ o.name }`, value: eff.value(level), trigger}, {root: true});
            });
        },
        resetEnhancement({ state, dispatch }, name) {
            state.enhancement[name].effect.forEach(eff => {
                dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `miningEnhancement_${ name }`}, {root: true});
            });
        },
        toggleEnhancements({ state, commit, dispatch }) {
            commit('updateKey', {key: 'enhancementsActive', value: !state.enhancementsActive});
            for (const [key, elem] of Object.entries(state.enhancement)) {
                if (elem.level > 0) {
                    if (state.enhancementsActive) {
                        dispatch('applyEnhancement', {trigger: false, name: key});
                    } else {
                        dispatch('resetEnhancement', key);
                    }
                }
            }
        },
        updateObsidianPenalty({ getters, dispatch }) {
            if (getters.enhancementLevel > 0) {
                dispatch('system/applyEffect', {type: 'mult', name: 'currencyMiningObsidianGain', multKey: 'miningObsidianPenalty', value: MINING_OBSIDIAN_PENALTY_BASE * Math.pow(MINING_OBSIDIAN_PENALTY_INCREMENT, getters.enhancementLevel - 1), trigger: true}, {root: true});
            } else {
                dispatch('system/resetEffect', {type: 'mult', name: 'currencyMiningObsidianGain', multKey: 'miningObsidianPenalty'}, {root: true});
            }
        },
        updateDwellerStat({ rootState, getters, commit }) {
            const subfeature = rootState.system.features.mining.currentSubfeature;
            commit('stat/increaseTo', {feature: 'mining', name: 'depthDwellerCap' + subfeature, value: Math.min(
                rootState.stat[`mining_depthDweller${ subfeature }`].value,
                getters.dwellerLimit
            )}, {root: true});
        },
        placeBeacon({ state, getters, commit, dispatch }, o) {
            if (state.beaconPlaced[o.depth] === undefined && getters.beaconOwned(o.beacon) >= 1) {
                commit('updateSubkey', {name: 'beaconPlaced', key: o.depth, value: o.beacon});
                dispatch('applyBeaconEffects');
            }
        },
        removeBeacon({ state, commit, dispatch }, depth) {
            if (state.beaconCooldown <= 0) {
                let newObj = {};
                for (const [key, elem] of Object.entries(state.beaconPlaced)) {
                    if (parseInt(key) !== depth) {
                        newObj[key] = elem;
                    }
                }
                commit('updateKey', {key: 'beaconCooldown', value: SECONDS_PER_HOUR * 20});
                commit('updateKey', {key: 'beaconPlaced', value: newObj});
                dispatch('applyBeaconEffects');
            }
        },
        applyBeaconEffects({ state, getters, dispatch }) {
            // Reset effects first
            let effects = [];
            for (const [key, elem] of Object.entries(state.beacon)) {
                effects.push(...elem.effect.map(el => {
                    return {...el, key};
                }));
            }
            effects.forEach(effect => {
                dispatch('system/resetEffect', {type: effect.type, name: effect.name, multKey: `miningBeacon_${ effect.key }`}, {root: true});
            });

            // Then apply current one (if it exists)
            const beacon = getters.currentDepthBeacon;
            if (beacon) {
                state.beacon[beacon].effect.forEach(effect => {
                    dispatch('system/applyEffect', {type: effect.type, name: effect.name, multKey: `miningBeacon_${ beacon }`, value: effect.value(state.beacon[beacon].level), trigger: false}, {root: true});
                });
            }
        }
    }
}
