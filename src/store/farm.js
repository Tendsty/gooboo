import Vue from "vue"
import { capitalize } from "../js/utils/format";
import { randomElem, randomRound } from "../js/utils/random";

const fieldWidth = 7;
const fieldHeight = 7;
const cropUpgrades = 3;
const tileUpgrades = [
    [4, 2], [4, 3], [4, 4], [3, 4], [2, 4], [1, 4], [1, 3], [1, 2], [1, 1],
    [2, 1], [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5],
    [3, 5], [2, 5], [1, 5], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1], [0, 0],
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 1], [6, 2], [6, 3],
    [6, 4], [6, 5], [6, 6], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6]
];

const notes = {
    carrot: 'farm_1',
    blueberry: 'farm_2',
    wheat: 'farm_3',
    tulip: 'farm_4',
    potato: 'farm_5',
    raspberry: 'farm_6',
    barley: 'farm_7',
    dandelion: 'farm_9',
    corn: 'farm_10',
    watermelon: 'farm_11',
    rice: 'farm_14',
    rose: 'farm_15',
    honeymelon: 'farm_16',
    rye: 'farm_18',
    daisy: 'farm_19',
    goldenRose: 'farm_21'
};

const emptyField = {type: null, color: null};

export default {
    namespaced: true,
    state: {
        field: [],
        crop: {},
        cropUpgrades: ['yield', 'grow', 'exp', 'gold', 'overgrow', 'cost', 'double', 'fertile', 'drops'],
        cropUpgradeIcons: {
            yield: 'mdi-sack',
            grow: 'mdi-timer',
            exp: 'mdi-star',
            gold: 'mdi-gold',
            overgrow: 'mdi-sprout',
            cost: 'mdi-sale',
            double: 'mdi-numeric-2-box-multiple',
            fertile: 'mdi-sack-percent',
            drops: 'mdi-dice-multiple'
        },
        building: {},
        fertilizer: {},
        selectedCropName: null,
        selectedBuildingName: null,
        selectedFertilizerName: null,
        selectedColor: null,
        deleting: false,
        showColors: false
    },
    getters: {
        expNeeded: (state) => (name) => {
            const baseExp = state.crop[name].baseExp;
            const level = state.crop[name].level;
            return Math.ceil(baseExp * Math.pow(1.75, level));
        },
        cropYield: (state, getters, rootState, rootGetters) => (name) => {
            const crop = state.crop[name];
            return rootGetters['mult/get']('currencyFarm' + capitalize(crop.type) + 'Gain', crop.yield * Math.pow(1.15, crop.upgrades.yield) * Math.pow(1.5, crop.upgrades.double));
        },
        cropBaseOvergrow: (state, getters, rootState, rootGetters) => (name) => {
            const crop = state.crop[name];
            const baseOvergrow = rootGetters['mult/get']('farmOvergrow', crop.upgrades.overgrow * 0.5);
            return baseOvergrow;
        },
        cropOvergrow: (state, getters) => (name) => {
            const baseOvergrow = getters.cropBaseOvergrow(name);
            return baseOvergrow > 0 ? (1 / baseOvergrow + 1) : null;
        },
        cropExp: (state, getters, rootState, rootGetters) => (name) => {
            const crop = state.crop[name];
            return rootGetters['mult/get']('farmExperience', crop.upgrades.exp * 0.5, Math.pow(1.5, crop.upgrades.double));
        },
        cropGoldChance: (state) => (name) => {
            const crop = state.crop[name];
            return 0.01 * Math.pow(1.12, crop.upgrades.gold) * Math.pow(1.5, crop.upgrades.double);
        },
        cropGrow: (state) => (name, mult = 1) => {
            const crop = state.crop[name];
            return Math.ceil(crop.grow / mult * Math.pow(2, crop.upgrades.double) * Math.pow(0.8, crop.upgrades.grow));
        },
        cropCost: (state) => (name) => {
            const crop = state.crop[name];
            return Math.round(Math.max(0, Math.min(crop.cost - crop.upgrades.cost, crop.cost * Math.pow(0.75, crop.upgrades.cost))));
        },
        cropFertilizerCost: (state) => (name) => {
            const crop = state.crop[name];
            return Math.ceil(Math.pow(crop.grow, 0.4) * 0.25 + (crop.cost > 0 ? (Math.pow(crop.cost, 0.8) * 0.5) : 0));
        },
        currentPrestigeLevel: (state) => {
            let totalPrestige = 0;

            for (const [, elem] of Object.entries(state.crop)) {
                totalPrestige += elem.levelMax;
            }

            return totalPrestige;
        },
        prestigeMult: () => (lvl) => {
            return Math.pow(1.04, lvl);
        },
        plantPrice: (state, getters, rootState, rootGetters) => (selectedCell = null, replace = false) => {
            let fertilizerPrice = {};
            let cells = [];
            let goldPrice = 0;
            if (selectedCell) {
                cells.push(selectedCell);
            } else {
                state.field.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell !== null && (state.selectedColor === null || cell.color === state.selectedColor) && (
                            (replace && cell.type === 'crop' && cell.grow >= cell.growMax) ||
                            (!replace && cell.type === null)
                        )) {
                            cells.push({x, y});
                        }
                    });
                });
            }

            cells.forEach(coords => {
                const cell = state.field[coords.y][coords.x];
                const crop = replace ? cell.crop : state.selectedCropName;
                goldPrice += getters.cropCost(crop);
                const fertilizer = replace ? cell.fertilizer : state.selectedFertilizerName;
                if (fertilizer !== null) {
                    const fertilizerName = 'farm_' + fertilizer;
                    if (fertilizerPrice[fertilizerName] === undefined) {
                        fertilizerPrice[fertilizerName] = 0;
                    }
                    fertilizerPrice[fertilizerName] += getters.cropFertilizerCost(crop);
                }
            });

            let price = rootGetters['consumable/priceMultiple'](fertilizerPrice).price;
            if (goldPrice > 0) {
                if (price.farm_gold === undefined) {
                    price.farm_gold = 0;
                }
                price.farm_gold += goldPrice;
            }

            return price;
        }
    },
    mutations: {
        initField(state) {
            Vue.set(state, 'field', []);
            for (let y = 0; y < fieldHeight; y++) {
                state.field.push([]);
                for (let x = 0; x < fieldWidth; x++) {
                    state.field[y].push((x > 1 && x < 4 && y > 1 && y < 4) ? {...emptyField} : null);
                }
            }
        },
        initCrop(state, o) {
            const cost = o.cost ?? 0;
            const tier = o.tier ?? 0;
            const rareDrop = o.rareDrop ? o.rareDrop.map(elem => {
                return {...elem, found: false};
            }) : [];
            const baseExpMult = 1 / Math.pow(cost + 1, 0.6) / Math.pow(o.grow, 0.55);
            Vue.set(state.crop, o.name, {
                found: o.found ?? false,
                foundDefault: o.found ?? false,
                icon: o.icon ?? 'mdi-sprout',
                color: o.color ?? 'green',
                cost,
                grow: o.grow ?? 60,
                yield: o.yield ?? (Math.pow(o.grow, 0.55) + Math.pow(cost, 0.55)) * Math.pow(0.95, rareDrop.length) * 4.2 * Math.pow(1.05, tier) * Math.pow(cost + 1, 0.4),
                rareDrop,
                level: 0,
                levelMax: 0,
                upgrades: {},
                nextUpgrades: [],
                cacheUpgradeCount: 0,
                exp: 0,
                baseExp: Math.pow(1.5, tier) * 60 * baseExpMult,
                baseExpMult,
                type: o.type
            });

            state.cropUpgrades.forEach(elem => {
                Vue.set(state.crop[o.name].upgrades, elem, 0);
            });
        },
        initBuilding(state, o) {
            Vue.set(state.building, o.name, {
                icon: o.icon ?? 'mdi-sprout',
                max: 0,
                maxPremium: 0,
                cacheAmount: 0,
                cachePremium: 0
            });
        },
        initFertilizer(state, o) {
            Vue.set(state.fertilizer, o.name, {
                type: o.type ?? 'all',
                effect: o.effect ?? (() => { return {}; })
            });
        },
        updateKey(state, o) {
            Vue.set(state, o.key, o.value);
        },
        updateCropKey(state, o) {
            Vue.set(state.crop[o.name], o.key, o.value);
        },
        updateBuildingKey(state, o) {
            Vue.set(state.building[o.name], o.key, o.value);
        },
        addCropUpgrade(state, o) {
            state.crop[o.name].nextUpgrades.push(o.value);
        },
        updateField(state, o) {
            Vue.set(state.field[o.y], o.x, o.value);
        },
        updateFieldKey(state, o) {
            Vue.set(state.field[o.y][o.x], o.key, o.value);
        },
        addFieldBuildingEffect(state, o) {
            Vue.set(state.field[o.y][o.x].buildingEffect, o.key, (state.field[o.y][o.x].buildingEffect[o.key] ?? 0) + o.value);
        },
        applyCropUpgrade(state, o) {
            let amount = o.amount ?? 1;
            if (o.setFixed) {
                state.crop[o.crop].upgrades[o.upgrade] = amount;
            } else {
                state.crop[o.crop].upgrades[o.upgrade] += amount;
            }
        },
        resetCropUpgrades(state, name) {
            state.cropUpgrades.forEach(elem => {
                Vue.set(state.crop[name].upgrades, elem, 0);
            });
        },
        calculateCropUpgradeCaches(state) {
            for (const [key, elem] of Object.entries(state.crop)) {
                let bought = 0;
                for (const [, subelem] of Object.entries(elem.upgrades)) {
                    bought += subelem;
                }
                Vue.set(state.crop[key], 'cacheUpgradeCount', bought);
            }
        },
        calculateCropBuildingCaches(state) {
            for (const [buildName, building] of Object.entries(state.building)) {
                Vue.set(building, 'cacheAmount', 0);
                state.field.forEach(row => {
                    row.forEach(cell => {
                        if (cell !== null && cell.type === 'building' && cell.building === buildName) {
                            Vue.set(building, 'cacheAmount', building.cacheAmount + 1);
                            if (cell.premium) {
                                Vue.set(building, 'cachePremium', building.cachePremium + 1);
                            }
                        }
                    });
                });
            }
        },
        applyTileUpgrade(state, amount) {
            tileUpgrades.slice(0, amount).forEach(elem => {
                if (state.field[elem[1]][elem[0]] === null) {
                    Vue.set(state.field[elem[1]], elem[0], {...emptyField});
                }
            });
        },
        findCropRareDrop(state, o) {
            Vue.set(state.crop[o.name].rareDrop[o.index], 'found', true);
        }
    },
    actions: {
        cleanState({ state, commit }) {
            commit('updateKey', {key: 'field', value: []});
            commit('updateKey', {key: 'selectedCropName', value: null});
            commit('updateKey', {key: 'selectedBuildingName', value: null});
            commit('updateKey', {key: 'selectedFertilizerName', value: null});
            commit('updateKey', {key: 'selectedColor', value: null});
            commit('updateKey', {key: 'deleting', value: false});
            commit('updateKey', {key: 'showColors', value: false});

            for (const [key, elem] of Object.entries(state.crop)) {
                commit('updateCropKey', {name: key, key: 'exp', value: 0});
                commit('updateCropKey', {name: key, key: 'level', value: 0});
                commit('updateCropKey', {name: key, key: 'levelMax', value: 0});
                commit('updateCropKey', {name: key, key: 'upgrades', value: {}});
                commit('updateCropKey', {name: key, key: 'nextUpgrades', value: []});
                commit('updateCropKey', {name: key, key: 'found', value: elem.foundDefault});
            }
        },
        plantCrop({ state, getters, rootGetters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            const price = getters.cropCost(o.crop);
            let fertilizerPrice = {};
            if (o.fertilizer !== null) {
                fertilizerPrice['farm_' + o.fertilizer] = getters.cropFertilizerCost(o.crop);
            }
            if (field !== null && field.type === null && (
                price <= 0 || rootGetters['currency/value']('farm_gold') >= price
            ) && (
                o.fertilizer === null || (rootGetters['consumable/canAffordMultiple'](fertilizerPrice) && (state.fertilizer[o.fertilizer].type === 'all' || state.fertilizer[o.fertilizer].type === state.crop[o.crop].type))
            )) {
                if (o.fertilizer !== null) {
                    dispatch('consumable/useMultiple', fertilizerPrice, {root: true});
                }
                if (price > 0) {
                    dispatch('currency/spend', {feature: 'farm', name: 'gold', amount: price}, {root: true});
                }

                let growMult = 1;
                let yieldMult = 1;
                let goldMult = 1;
                let dropChance = 0;

                if (o.fertilizer !== null) {
                    const cropFertility = state.crop[o.crop].upgrades.fertile;
                    for (const [key, elem] of Object.entries(state.fertilizer[o.fertilizer].effect)) {
                        const mult = cropFertility > 0 ? (elem > 1 ?
                            ((elem - 1) * 0.25 * cropFertility + elem) :
                            (elem * Math.pow(1 - (1 - elem) * 0.25, cropFertility))
                        ) : elem;
                        switch (key) {
                            case 'grow':
                                growMult *= mult;
                                break;
                            case 'yield':
                                yieldMult *= mult;
                                break;
                            case 'gold':
                                goldMult *= mult;
                                break;
                            case 'drop':
                                dropChance += elem * (cropFertility * 0.25 + 1);
                                break;
                            default:
                                console.warn(`Fertilizer effect ${key} not found`);
                        }
                    }
                }

                let rng = {
                    gold: Math.random()
                };
                state.crop[o.crop].rareDrop.forEach((drop, index) => {
                    rng[`drop_${ index }`] = Math.random();
                });

                commit('updateField', {x: o.x, y: o.y, value: {
                    type: 'crop',
                    color: field.color,
                    crop: o.crop,
                    fertilizer: o.fertilizer,
                    grow: 0,
                    rng,
                    growMax: getters.cropGrow(o.crop, growMult),
                    buildingEffect: {},
                    yieldMult,
                    goldMult,
                    dropChance
                }});
            }
        },
        harvestCrop({ state, rootState, getters, rootGetters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type === 'crop' && field.grow >= field.growMax) {
                const crop = state.crop[field.crop];
                // Overgrow stage calculation
                const overgrow = getters.cropOvergrow(field.crop);
                let stage = 1;
                if (overgrow !== null) {
                    stage = 0;
                    let max = field.growMax;
                    while (field.grow >= max) {
                        stage++;
                        max += Math.pow(overgrow, stage) * field.growMax;
                    }
                }

                // Gain currency based on crop type
                dispatch('currency/gain', {feature: 'farm', name: crop.type, amount:
                    getters.cropYield(field.crop) *
                    field.yieldMult *
                    stage *
                    (((field.buildingEffect.flag ?? 0) / field.grow) * 0.5 + 1)
                }, {root: true});

                // Chance to gain gold
                const goldAmount = randomRound(
                    Math.pow(crop.grow, 0.5) *
                    getters.cropGoldChance(field.crop) *
                    field.goldMult *
                    stage *
                    (field.buildingEffect.gardenGnome ?? 0) / field.grow,
                    field.rng.gold
                );
                if (goldAmount) {
                    dispatch('currency/gain', {feature: 'farm', name: 'gold', amount: goldAmount}, {root: true});
                }

                // Chance to gain rare drops
                crop.rareDrop.forEach((elem, index) => {
                    const dropChance = Math.min(1, rootGetters['mult/get']('farmRareDrop',
                        elem.chance *
                        Math.pow(1.2, crop.upgrades.drops) *
                        Math.pow(1.2, crop.upgrades.double) +
                        field.dropChance +
                        (((field.buildingEffect.pinwheel ?? 0) / field.grow) * 0.01)
                    ));
                    const times = randomRound(dropChance * stage, field.rng[`drop_${ index }`]);
                    if (times > 0) {
                        switch (elem.type) {
                            case 'consumable':
                                dispatch('consumable/gain', {name: elem.name, amount: elem.value * times}, {root: true});
                                break;
                            case 'currency':
                                dispatch('currency/gain', {feature: 'farm', name: elem.name, amount: elem.value * times}, {root: true});
                                dispatch('performCurrencyUnlocks', elem.name);
                                break;
                            default:
                                console.warn(`Rare drop type ${elem.type} not found`);
                                break;
                        }
                        if (!elem.found) {
                            commit('findCropRareDrop', {name: field.crop, index});
                        }
                    }
                });

                // Add exp if unlocked
                if (rootState.unlock.farmCropExp.use) {
                    dispatch('getCropExp', {crop: field.crop, value: stage * getters.cropExp(field.crop) * (((field.buildingEffect.lectern ?? 0) / field.grow) * 2 + 1)});
                }

                // Add stats
                commit('stat/add', {feature: 'farm', name: 'harvests', value: stage}, {root: true});
                commit('stat/increaseTo', {feature: 'farm', name: 'maxOvergrow', value: stage - 1}, {root: true});

                // Unlock new notes
                const note = notes[field.crop];
                if (note !== undefined) {
                    dispatch('note/find', note, {root: true});
                }

                // Clear field
                commit('updateField', {x: o.x, y: o.y, value: {...emptyField, color: field.color}});
                dispatch('updateGrownHint');
            }
        },
        getCropExp({ state, getters, commit, dispatch }, o) {
            commit('updateCropKey', {name: o.crop, key: 'exp', value: state.crop[o.crop].exp + o.value});
            let leveled = false;
            while (state.crop[o.crop].exp >= getters.expNeeded(o.crop)) {
                commit('updateCropKey', {name: o.crop, key: 'exp', value: state.crop[o.crop].exp - getters.expNeeded(o.crop)});
                commit('updateCropKey', {name: o.crop, key: 'level', value: state.crop[o.crop].level + 1});
                leveled = true;
            }
            if (leveled) {
                dispatch('updateCropGlobalLevel');
            }
        },
        placeBuilding({ state, commit }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type === null && state.building[o.name].cacheAmount < state.building[o.name].max) {
                const isPremium = state.building[o.name].cachePremium < state.building[o.name].maxPremium;
                commit('updateField', {x: o.x, y: o.y, value: {...field, type: 'building', building: o.name, premium: isPremium}});
                commit('updateBuildingKey', {name: o.name, key: 'cacheAmount', value: state.building[o.name].cacheAmount + 1});
                if (isPremium) {
                    commit('updateBuildingKey', {name: o.name, key: 'cachePremium', value: state.building[o.name].cachePremium + 1});
                }
            }
            if (state.building[o.name].cacheAmount >= state.building[o.name].max) {
                commit('updateKey', {key: 'selectedBuildingName', value: null});
            }
        },
        deleteTile({ state, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type !== null) {
                if (field.type === 'building') {
                    commit('updateBuildingKey', {name: field.building, key: 'cacheAmount', value: state.building[field.building].cacheAmount - 1});
                    if (field.premium) {
                        commit('updateBuildingKey', {name: field.building, key: 'cachePremium', value: state.building[field.building].cachePremium - 1});
                    }
                }
                commit('updateField', {x: o.x, y: o.y, value: {...emptyField, color: field.color}});
            }
            dispatch('updateGrownHint');
        },
        plantAll({ state, dispatch }, o) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === null && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        dispatch('plantCrop', {x, y, ...o});
                    }
                });
            });
        },
        harvestAll({ state, dispatch }) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && cell.grow >= cell.growMax && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        dispatch('harvestCrop', {x, y});
                    }
                });
            });
        },
        replantAll({ state, dispatch }) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && cell.grow >= cell.growMax && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        const crop = cell.crop;
                        const fertilizer = cell.fertilizer ?? null;
                        dispatch('harvestCrop', {x, y});
                        dispatch('plantCrop', {x, y, crop, fertilizer});
                    }
                });
            });
        },
        seedUpgrades({ state, rootState, getters, commit }, name) {
            while (state.crop[name].nextUpgrades.length < cropUpgrades) {
                let upg = [];
                state.cropUpgrades.forEach(elem => {
                    if (!state.crop[name].nextUpgrades.includes(elem) && (
                        !(elem === 'cost' && state.crop[name].cost <= ((state.crop[name].upgrades.cost + 1) * 2)) && // Cannot reduce cost below 50%
                        !(elem === 'grow' && getters.cropGrow(name) < 6.25) &&                                       // Minimum grow time of 5m
                        !(elem === 'double' && getters.cropGrow(name) > 1800) &&                                     // Maximum grow time of 2d 12h
                        !(elem === 'fertile' && !rootState.unlock.farmFertilizer.see) &&                             // Fertilizer needs to be unlocked
                        !(elem === 'drops' && state.crop[name].rareDrop.length <= 0)                                 // Needs at least one rare drop
                    )) {
                        upg.push(elem);
                    }
                });
                commit('addCropUpgrade', {name, value: randomElem(upg)});
            }
        },
        seedAllUpgrades({ state, dispatch }) {
            for (const [key, elem] of Object.entries(state.crop)) {
                if (elem.nextUpgrades.length < cropUpgrades) {
                    dispatch('seedUpgrades', key);
                }
            }
        },
        applyCropUpgrade({ state, commit, dispatch }, o) {
            if (state.crop[o.crop].cacheUpgradeCount < state.crop[o.crop].level) {
                commit('applyCropUpgrade', o);
                commit('updateCropKey', {name: o.crop, key: 'cacheUpgradeCount', value: state.crop[o.crop].cacheUpgradeCount + 1});
                commit('updateCropKey', {name: o.crop, key: 'nextUpgrades', value: []});
                dispatch('seedUpgrades', o.crop);
            }
        },
        cropPrestige({ state, commit, dispatch }, name) {
            const crop = state.crop[name];
            if (crop.level >= 4) {
                // Set max prestige level
                if (crop.level > crop.levelMax) {
                    commit('updateCropKey', {name, key: 'levelMax', value: crop.level});
                }

                // Increase stat
                commit('stat/increaseTo', {feature: 'farm', name: 'bestPrestige', value: crop.level}, {root: true});

                // Reset all crop upgrades and experience
                commit('resetCropUpgrades', name);
                commit('updateCropKey', {name, key: 'exp', value: 0});
                commit('updateCropKey', {name, key: 'level', value: 0});
                commit('updateCropKey', {name, key: 'cacheUpgradeCount', value: 0});

                // Apply prestige effect
                dispatch('applyCropPrestige');
            }
        },
        applyCropPrestige({ getters, dispatch }) {
            if (getters.currentPrestigeLevel > 0) {
                dispatch('mult/setMult', {name: 'farmCropGain', key: 'prestige', value: getters.prestigeMult(getters.currentPrestigeLevel)}, {root: true});
            }
        },
        updateCropGlobalLevel({ state, dispatch }) {
            let totalLevel = 0;

            for (const [, elem] of Object.entries(state.crop)) {
                totalLevel += Math.max(elem.level, elem.levelMax);
            }

            dispatch('meta/globalLevelPart', {key: 'farm_0', amount: totalLevel}, {root: true});
        },
        performCurrencyUnlocks({ rootState, commit }, name) {
            if (!rootState.unlock.farmAdvancedCardPack.use && name === 'ladybug') {
                commit('unlock/unlock', 'farmAdvancedCardPack', {root: true});
            }
            if (!rootState.unlock.farmLuxuryCardPack.use && name === 'goldenPetal') {
                commit('unlock/unlock', 'farmLuxuryCardPack', {root: true});
            }
        },
        updateGrownHint({ state, rootState, commit }) {
            let hasGrown = false;
            if (rootState.system.settings.notification.items.cropReady.value) {
                state.field.forEach(row => {
                    row.forEach(cell => {
                        if (cell !== null && cell.type === 'crop' && cell.grow >= cell.growMax) {
                            hasGrown = true;
                        }
                    });
                });
            }
            commit('system/updateKey', {key: 'farmHint', value: hasGrown}, {root: true});
        }
    }
}
