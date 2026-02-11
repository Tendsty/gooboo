import Vue from "vue"
import { capitalize } from "../js/utils/format";
import { chance, randomInt, randomRound, weightSelect } from "../js/utils/random";
import { FARM_BUILDING_PREMIUM_BONUS, FARM_PINWHEEL_RARE_DROP, FARM_SPRINKLER_CARE_WEIGHT, FARM_SPRINKLER_GROW, FARM_SPRINKLER_OVERGROW } from "../js/constants";
import geneLevels from "../js/modules/farm/geneLevels";

const fieldWidth = 7;
const fieldHeight = 7;
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
        building: {},
        gene: {},
        geneLevels,
        fertilizer: {},
        selectedCropName: null,
        selectedBuildingName: null,
        selectedFertilizerName: null,
        selectedColor: null,
        deleting: false,
        showColors: false,
        plantGiant: false,
        careCanMax: ['yield', 'exp', 'rareDrop'],
    },
    getters: {
        expNeeded: (state) => (name) => {
            const crop = state.crop[name];
            return crop.type !== 'special' ? Math.ceil(crop.baseExp * Math.pow(1.785, crop.level)) : Math.ceil(crop.baseExp * (crop.level * 0.25 + 1) * Math.pow(1.15, crop.level));
        },
        baseGoldChance: (state) => (name) => {
            const crop = state.crop[name];
            return (crop.grow >= 240 ? (Math.pow(crop.grow, 0.8) / Math.pow(240, 0.8)) : (Math.pow(crop.grow, 0.9) / Math.pow(240, 0.9))) * 0.08437;
        },
        cropFertilizerCost: (state) => (name, isGiant = false) => {
            const crop = state.crop[name];
            return Math.ceil(Math.pow(Math.min(crop.grow, 2880), 0.4) * Math.max(Math.pow(crop.grow / 2880, 0.9), 1) * 0.12 * (isGiant ? (crop.type === 'special' ? crop.giantMult : ((crop.giantMult - 1) * 0.75 + 1)) : 1));
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
            let plantPrice = {};
            if (selectedCell) {
                cells.push(selectedCell);
            } else {
                state.field.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell !== null && (state.selectedColor === null || cell.color === state.selectedColor) && (
                            (replace && cell.type === 'crop' && cell.grow >= 1) ||
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
                for (const [key, elem] of Object.entries(state.crop[crop].cost)) {
                    if (plantPrice[key] === undefined) {
                        plantPrice[key] = 0;
                    }
                    plantPrice[key] += elem * ((replace ? cell.giant : state.plantGiant) ? state.crop[crop].giantMult : 1);
                }
                const fertilizer = replace ? cell.fertilizer : state.selectedFertilizerName;
                if (fertilizer !== null) {
                    const fertilizerName = 'farm_' + fertilizer;
                    if (fertilizerPrice[fertilizerName] === undefined) {
                        fertilizerPrice[fertilizerName] = 0;
                    }
                    fertilizerPrice[fertilizerName] += getters.cropFertilizerCost(crop, replace ? cell.giant : state.plantGiant);
                }
            });

            let price = rootGetters['consumable/priceMultiple'](fertilizerPrice).price;
            for (const [key, elem] of Object.entries(plantPrice)) {
                if (price[key] === undefined) {
                    price[key] = 0;
                }
                price[key] += elem;
            }

            return price;
        },
        cropDnaLeft: (state) => (name) => {
            let amount = state.crop[name].level + (state.crop[name].genes.includes('mutate') ? 5 : 0);
            Object.values(state.crop[name].upgrades).forEach(val => {
                amount -= val;
            });
            return amount;
        },
        cropGeneStats: (state, getters, rootState) => (name, fertilizer = null, isGiant = false) => {
            let stats = {
                mult: {},
                rareDrop: [],
                tag: [],
                care: {
                    yield: {amount: 5, max: 0.3, weight: 2, disabled: false},
                    exp: {amount: 5, max: 0.3, weight: 2, disabled: false},
                    gold: {amount: 1, max: 3, weight: 0.12, disabled: false},
                    time: {amount: 5, max: 1, weight: 1, disabled: false},
                },
            };
            let geneUpgrades = {};
            ['farmCropGain', 'farmGoldChance', 'farmExperience', 'farmRareDropChance', 'farmGrow', 'farmOvergrow', 'farmLuckyHarvestMult', 'farmHuntChance', 'farmCareWeight'].forEach(elem => {
                stats.mult[elem] = {baseValue: 0, baseArray: [], multValue: 1, multArray: []};
                geneUpgrades[elem] = {base: 0, mult: 1};
            });
            const crop = state.crop[name];
            const allGain = ['farmCropGain', 'farmGoldChance', 'farmExperience', 'farmRareDropChance'];
            let active = {};
            let cardPower = 0;
            crop.cardEquipped.forEach(elem => {
                if (active[elem]) {
                    active[elem]++;
                } else {
                    active[elem] = 1;
                }
            });
            for (const [card, amount] of Object.entries(active)) {
                const cardItem = rootState.card.card[card];
                cardPower += cardItem.power;
                cardItem.reward.forEach(effect => {
                    let value = effect.value;
                    if (['base', 'bonus'].includes(effect.type)) {
                        value *= amount;
                    } else if (effect.type === 'mult') {
                        if (value >= 1) {
                            value = (value - 1) * amount + 1;
                        } else {
                            value = Math.pow(value, amount);
                        }
                    }
                    switch (effect.type) {
                        case 'addRareDrop': {
                            stats.rareDrop.push({name: effect.name, amount: value, chance: effect.chance, mult: effect.mult ?? 1});
                            break;
                        }
                        case 'base': {
                            if (stats.mult[effect.name]) {
                                stats.mult[effect.name].baseValue += value;
                                stats.mult[effect.name].baseArray.push({name: `card_${card}`, value: value});
                            }
                            break;
                        }
                        case 'mult': {
                            if (effect.name === 'farmAllGain') {
                                allGain.forEach(mult => {
                                    stats.mult[mult].multValue *= value;
                                    stats.mult[mult].multArray.push({name: `card_${card}`, value: value});
                                });
                            } else if (stats.mult[effect.name]) {
                                stats.mult[effect.name].multValue *= value;
                                stats.mult[effect.name].multArray.push({name: `card_${card}`, value: value});
                            }
                            break;
                        }
                        default:
                            console.warn(`Unknown card effect ${ effect.type }`);
                            break;
                    }
                });
            }
            if (cardPower > 0) {
                rootState.card.feature.farm.powerReward.forEach(effect => {
                    const value = effect.value(cardPower);
                    switch (effect.type) {
                        case 'base': {
                            if (stats.mult[effect.name]) {
                                stats.mult[effect.name].baseValue += value;
                                stats.mult[effect.name].baseArray.push({name: `cardPower_farm`, value: value});
                            }
                            break;
                        }
                        case 'mult': {
                            if (effect.name === 'farmAllGain') {
                                allGain.forEach(mult => {
                                    stats.mult[mult].multValue *= value;
                                    stats.mult[mult].multArray.push({name: `cardPower_farm`, value: value});
                                });
                            } else if (stats.mult[effect.name]) {
                                stats.mult[effect.name].multValue *= value;
                                stats.mult[effect.name].multArray.push({name: `cardPower_farm`, value: value});
                            }
                            break;
                        }
                        default:
                            console.warn(`Unknown card power effect ${ effect.type }`);
                            break;
                    }
                });
            }
            crop.genes.forEach(elem => {
                state.gene[elem].effect.forEach(effect => {
                    switch (effect.type) {
                        case 'text': {
                            stats.tag.push(effect.name);
                            if (effect.name === 'farmFertileBoost' && fertilizer !== null) {
                                const fertilizerPrice = rootState.consumable['farm_' + fertilizer].price;
                                if (fertilizerPrice !== null && fertilizerPrice.gem_sapphire > 0) {
                                    const fertilizerBoost = fertilizerPrice.gem_sapphire * 0.3 + 1;
                                    stats.mult.farmCropGain.multValue *= fertilizerBoost;
                                    stats.mult.farmCropGain.multArray.push({name: `farmGene_${ elem }`, value: fertilizerBoost});
                                }
                            }
                            break;
                        }
                        case 'addRareDrop': {
                            stats.rareDrop.push({name: effect.name, amount: effect.value, chance: effect.chance, mult: effect.mult ?? 1});
                            break;
                        }
                        case 'farmCareImprove': {
                            if (stats.care[effect.name] === undefined) {
                                stats.care[effect.name] = {amount: 0, max: 0, weight: 0, disabled: false};
                            }
                            if (effect.value.amount !== undefined) {
                                stats.care[effect.name].amount += effect.value.amount;
                            }
                            if (effect.value.max !== undefined) {
                                stats.care[effect.name].max += effect.value.max;
                            }
                            if (effect.value.weight !== undefined) {
                                stats.care[effect.name].weight += effect.value.weight;
                            }
                            break;
                        }
                        case 'farmCareAdd': {
                            stats.care[effect.name] = {amount: effect.value.amount ?? 0, max: effect.value.max ?? 0, weight: effect.value.weight ?? 0, disabled: false};
                            break;
                        }
                        case 'farmCareDisable': {
                            if (stats.care[effect.name] === undefined) {
                                stats.care[effect.name] = {amount: 0, max: 0, weight: 0, disabled: false};
                            }
                            stats.care[effect.name].disabled = true;
                            break;
                        }
                        case 'base': {
                            if (stats.mult[effect.name]) {
                                stats.mult[effect.name].baseValue += effect.value;
                                stats.mult[effect.name].baseArray.push({name: `farmGene_${ elem }`, value: effect.value});
                            }
                            break;
                        }
                        case 'mult': {
                            if (effect.name === 'farmAllGain') {
                                allGain.forEach(mult => {
                                    stats.mult[mult].multValue *= effect.value;
                                    stats.mult[mult].multArray.push({name: `farmGene_${ elem }`, value: effect.value});
                                });
                            } else if (stats.mult[effect.name]) {
                                stats.mult[effect.name].multValue *= effect.value;
                                stats.mult[effect.name].multArray.push({name: `farmGene_${ elem }`, value: effect.value});
                            }
                            break;
                        }
                        default:
                            console.warn(`Unknown gene effect ${ effect.type }`);
                            break;
                    }
                });
            });
            for (const [key, elem] of Object.entries(crop.upgrades)) {
                let geneUpgrade = state.gene[key].upgrade;
                if (key === 'dna') {
                    geneUpgrade = [];
                    state.geneLevels[1].filter(elem => crop.genes.length <= 0 || crop.genes[0] !== elem).forEach(subelem => {
                        geneUpgrade.push(...state.gene[subelem].upgrade);
                    });
                }
                geneUpgrade.forEach(effect => {
                    const value = effect.value(elem);
                    switch (effect.type) {
                        case 'addRareDropAmount': {
                            stats.rareDrop.forEach(rdrop => {
                                if (rdrop.name === effect.name) {
                                    rdrop.amount += value;
                                }
                            });
                            break;
                        }
                        case 'base': {
                            if (geneUpgrades[effect.name]) {
                                geneUpgrades[effect.name].base += value;
                            }
                            break;
                        }
                        case 'mult': {
                            if (effect.name === 'farmAllGain') {
                                allGain.forEach(mult => {
                                    geneUpgrades[mult].mult = value >= 1 ? (geneUpgrades[mult].mult + value - 1) : (1 / (1 / geneUpgrades[mult].mult + 1 / value - 1));
                                });
                            } else if (geneUpgrades[effect.name]) {
                                geneUpgrades[effect.name].mult = value >= 1 ? (geneUpgrades[effect.name].mult + value - 1) : (1 / (1 / geneUpgrades[effect.name].mult + 1 / value - 1));
                            }
                            break;
                        }
                        default:
                            console.warn(`Unknown gene effect ${ effect.type }`);
                            break;
                    }
                });
            }
            for (const [key, elem] of Object.entries(geneUpgrades)) {
                if (elem.base !== 0) {
                    stats.mult[key].baseValue += elem.base;
                    stats.mult[key].baseArray.push({name: `farmGeneUpgrade`, value: elem.base});
                }
                if (elem.mult !== 1) {
                    stats.mult[key].multValue *= elem.mult;
                    stats.mult[key].multArray.push({name: `farmGeneUpgrade`, value: elem.mult});
                }
            }
            if (isGiant) {
                allGain.forEach(mult => {
                    stats.mult[mult].multValue *= crop.giantMult;
                    stats.mult[mult].multArray.push({name: `farmGiantCrop`, value: crop.giantMult});
                });
            }
            stats.rareDrop.forEach(rdrop => {
                rdrop.mult *= Math.pow(crop.grow / 10, 0.7) * 0.025;
            });
            if (stats.tag.includes('farmPatient') && crop.patientStacks > 0) {
                const multValue = crop.patientStacks * 0.03 + 1;
                stats.mult.farmCropGain.multValue *= multValue;
                stats.mult.farmCropGain.multArray.push({name: `farmGene_patient`, value: multValue});
            }
            if (fertilizer) {
                for (const [mult, value] of Object.entries(state.fertilizer[fertilizer].effect)) {
                    if (mult === 'farmOvergrow') {
                        stats.mult[mult].baseValue += value;
                        stats.mult[mult].baseArray.push({name: `farmFertilizer_${ fertilizer }`, value});
                    } else {
                        stats.mult[mult].multValue *= value;
                        stats.mult[mult].multArray.push({name: `farmFertilizer_${ fertilizer }`, value});
                    }
                }
            }
            let careObj = {};
            if (crop.type !== 'special') {
                for (const [key, elem] of Object.entries(stats.care)) {
                    if (!elem.disabled && elem.weight > 0) {
                        careObj[key] = elem;
                    }
                }
            }
            stats.care = careObj;
            return stats;
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
            const cost = o.cost ?? {};
            const tier = o.tier ?? 0;
            const rareDrop = o.rareDrop ? o.rareDrop.map(elem => {
                return {...elem, mult: elem.mult ?? 1, found: false, hunter: 0};
            }) : [];
            const grow = o.grow ?? 60;
            const giantGrow = o.giantGrow ?? (Math.round(Math.max(Math.pow(Math.pow(20, 1 / 0.642) * (grow / 60), 0.642) * 60, grow * 10 / 3)));
            const giantMult = o.giantMult ?? (Math.pow(0.9, Math.sqrt(giantGrow / grow)) * giantGrow / grow);
            Vue.set(state.crop, o.name, {
                found: o.found ?? false,
                foundDefault: o.found ?? false,
                icon: o.icon ?? 'mdi-sprout',
                color: o.color ?? 'green',
                cost,
                grow,
                yield: o.yield ?? (o.type === 'special' ? null : ((o.grow >= 240 ? (Math.pow(o.grow, 0.75) / Math.pow(240, 0.75)) : (Math.pow(o.grow, 0.875) / Math.pow(240, 0.875))) * Math.pow(0.9, rareDrop.length) * 435 * Math.pow(1.05, tier))),
                rareDrop,
                specialEffect: o.specialEffect ?? [],
                level: 0,
                levelMax: 0,
                genes: [],
                genesBlocked: [],
                cardSelected: [],
                cardEquipped: [],
                upgrades: {},
                exp: 0,
                baseExp: o.baseExp ?? (Math.pow(1.53, tier) * 60 / Math.pow(o.grow / 10, 0.7)),
                type: o.type,
                giantGrow,
                giantMult,
                patientStacks: 0,
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
        initGene(state, o) {
            let unlockNeeded = null;
            for (const [key, elem] of Object.entries(geneLevels)) {
                if (elem.includes(o.name)) {
                    unlockNeeded = `farmGeneLevel${ key }`;
                }
            }
            Vue.set(state.gene, o.name, {
                icon: o.icon ?? 'mdi-dna',
                effect: o.effect ?? [],
                upgrade: o.upgrade ?? [],
                maxLevel: o.maxLevel ?? Infinity,
                unlockNeeded,
                lockOnField: o.lockOnField ?? false
            });
        },
        initFertilizer(state, o) {
            Vue.set(state.fertilizer, o.name, {
                type: o.type ?? 'all',
                effect: o.effect ?? {}
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
        updateFieldCache(state, o) {
            Vue.set(state.field[o.y][o.x].cache, o.key, o.value);
        },
        updateFieldCare(state, o) {
            Vue.set(state.field[o.y][o.x].care, o.key, o.value);
        },
        addFieldBuildingEffect(state, o) {
            Vue.set(state.field[o.y][o.x].buildingEffect, o.key, (state.field[o.y][o.x].buildingEffect[o.key] ?? 0) + o.value);
        },
        applyCropUpgrade(state, o) {
            const amount = o.amount ?? 1;
            Vue.set(state.crop[o.crop].upgrades, o.upgrade, (state.crop[o.crop].upgrades[o.upgrade] ?? 0) + amount);
        },
        calculateCropBuildingCaches(state) {
            for (const [buildName, building] of Object.entries(state.building)) {
                Vue.set(building, 'cacheAmount', 0);
                Vue.set(building, 'cachePremium', 0);
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
        },
        huntCropRareDrop(state, o) {
            Vue.set(state.crop[o.name].rareDrop[o.index], 'hunter', o.value);
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
            commit('updateKey', {key: 'plantGiant', value: false});

            for (const [key, elem] of Object.entries(state.crop)) {
                commit('updateCropKey', {name: key, key: 'exp', value: 0});
                commit('updateCropKey', {name: key, key: 'level', value: 0});
                commit('updateCropKey', {name: key, key: 'levelMax', value: 0});
                commit('updateCropKey', {name: key, key: 'genes', value: []});
                commit('updateCropKey', {name: key, key: 'genesBlocked', value: []});
                commit('updateCropKey', {name: key, key: 'cardSelected', value: []});
                commit('updateCropKey', {name: key, key: 'cardEquipped', value: []});
                commit('updateCropKey', {name: key, key: 'upgrades', value: {}});
                commit('updateCropKey', {name: key, key: 'found', value: elem.foundDefault});
                commit('updateCropKey', {name: key, key: 'patientStacks', value: 0});
                commit('updateCropKey', {name: key, key: 'rareDrop', value: elem.rareDrop.map(el => {
                    return {...el, found: false, hunter: 0};
                })});
            }

            for (const [key] of Object.entries(state.building)) {
                commit('updateBuildingKey', {name: key, key: 'max', value: 0});
                commit('updateBuildingKey', {name: key, key: 'maxPremium', value: 0});
                commit('updateBuildingKey', {name: key, key: 'cacheAmount', value: 0});
                commit('updateBuildingKey', {name: key, key: 'cachePremium', value: 0});
            }
        },
        plantCrop({ state, rootState, getters, rootGetters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            const crop = state.crop[o.crop];
            const geneStats = getters.cropGeneStats(o.crop, o.fertilizer, o.giant);
            let price = {};
            for (const [key, elem] of Object.entries(crop.cost)) {
                price[key] = elem * (o.giant ? crop.giantMult : 1);
            }
            let fertilizerPrice = {};
            let canAfford = true;
            if (o.fertilizer !== null) {
                fertilizerPrice['farm_' + o.fertilizer] = getters.cropFertilizerCost(o.crop, o.giant);
                for (const [key, elem] of Object.entries(rootGetters['consumable/priceMultiple'](fertilizerPrice).price)) {
                    if (price[key] === undefined) {
                        price[key] = 0;
                    }
                    price[key] += elem;
                }
            }
            for (const [key, elem] of Object.entries(price)) {
                if (rootGetters['currency/value'](key) < elem) {
                    canAfford = false;
                }
            }
            if (field !== null && field.type === null && canAfford && (
                o.fertilizer === null || (rootGetters['consumable/canAffordMultiple'](fertilizerPrice) && (state.fertilizer[o.fertilizer].type === 'all' || state.fertilizer[o.fertilizer].type === state.crop[o.crop].type))
            )) {
                if (o.fertilizer !== null) {
                    dispatch('consumable/useMultiple', fertilizerPrice, {root: true});
                }
                for (const [key, elem] of Object.entries(crop.cost)) {
                    const split = key.split('_');
                    dispatch('currency/spend', {feature: split[0], name: split[1], amount: elem * (o.giant ? crop.giantMult : 1)}, {root: true});
                }
                let careObj = {active: false};
                Object.keys(geneStats.care).forEach(key => {
                    if (key !== 'time') {
                        careObj[key] = 0;
                    }
                });
                const rngName = `farmCrop${ o.giant ? 'Giant' : '' }_${ o.crop }`;
                commit('updateField', {x: o.x, y: o.y, value: {
                    type: 'crop',
                    color: field.color,
                    crop: o.crop,
                    fertilizer: o.fertilizer,
                    giant: o.giant,
                    grow: 0,
                    time: 0,
                    rng: rootState.system.rng[rngName] ?? 0,
                    buildingEffect: {},
                    care: careObj,
                    cache: {},
                }});
                commit('system/nextRng', {name: rngName, amount: 1}, {root: true});

                if (!o.skipCache) {
                    dispatch('updateFieldCaches');
                }
            }
        },
        harvestCrop({ state, rootState, getters, rootGetters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type === 'crop' && field.grow >= 1) {
                const crop = state.crop[field.crop];
                const rngName = `farmCrop${ field.giant ? 'Giant' : '' }_${ field.crop }`;
                const rngGen = rootGetters['system/getRngById'](rngName, field.rng);
                const geneStats = getters.cropGeneStats(field.crop, field.fertilizer, field.giant);

                // Refund rainwater if care is active
                if (field.care.active) {
                    commit('currency/add', {feature: 'farm', name: 'rainwater', amount: 1}, {root: true});
                }

                const allGainBoost =
                    (0.04 * (field.buildingEffect.gnomeBoost ?? 0) / field.time + 1) *
                    ((geneStats.tag.includes('farmLuckyHarvest') && chance(0.01, rngGen())) ? rootGetters['mult/get']('farmLuckyHarvestMult', geneStats.mult.farmLuckyHarvestMult.baseValue) : 1);

                if (crop.type !== 'special') {
                    // Gain currency based on crop type
                    const gainAmount = rootGetters['mult/get'](
                        'currencyFarm' + capitalize(crop.type) + 'Gain',
                        crop.yield + geneStats.mult.farmCropGain.baseValue,
                        (((field.buildingEffect.flag ?? 0) / field.time) * 0.5 + 1) * geneStats.mult.farmCropGain.multValue
                    ) * allGainBoost * ((field.care.yield ?? 0) + 1) * field.grow;
                    dispatch('currency/gain', {feature: 'farm', name: crop.type, amount: gainAmount}, {root: true});
                    if (geneStats.tag.includes('farmYieldConversion')) {
                        ['vegetable', 'berry', 'grain', 'flower'].forEach(croptype => {
                            if (crop.type !== croptype) {
                                const conversionAmount = rootGetters['mult/get'](
                                    'currencyFarm' + capitalize(croptype) + 'Gain',
                                    crop.yield + geneStats.mult.farmCropGain.baseValue,
                                    (((field.buildingEffect.flag ?? 0) / field.time) * 0.5 + 1) * geneStats.mult.farmCropGain.multValue
                                ) * allGainBoost * ((field.care.yield ?? 0) + 1) * field.grow;
                                dispatch('currency/gain', {feature: 'farm', name: croptype, amount: conversionAmount * 0.05}, {root: true});
                            }
                        });
                    }

                    // Chance to gain gold
                    const goldAmount = randomRound(
                        rootGetters['mult/get'](
                            'farmGoldChance',
                            getters.baseGoldChance(field.crop) + geneStats.mult.farmGoldChance.baseValue,
                            ((field.buildingEffect.gardenGnome ?? 0) / field.time) * geneStats.mult.farmGoldChance.multValue
                        ) * allGainBoost * field.grow,
                        rngGen()
                    );
                    if (goldAmount) {
                        dispatch('currency/gain', {feature: 'farm', name: 'gold', amount: goldAmount}, {root: true});
                    }

                    // Chance to gain rare drops
                    let geneDrops = geneStats.rareDrop.map(elem => {
                        return {
                            name: elem.name,
                            type: 'currency',
                            chance: elem.chance,
                            mult: elem.mult,
                            value: elem.amount,
                            found: true
                        };
                    });
                    const pinwheelMult = (((field.buildingEffect.pinwheel ?? 0) / field.time) * FARM_PINWHEEL_RARE_DROP) + 1;
                    [...crop.rareDrop, ...geneDrops].forEach((elem, index) => {
                        const times = randomRound(rootGetters['mult/get'](
                            'farmRareDropChance',
                            elem.chance + geneStats.mult.farmRareDropChance.baseValue,
                            geneStats.mult.farmRareDropChance.multValue * pinwheelMult * elem.mult
                        ) * allGainBoost * ((field.care.rareDrop ?? 0) + 1) * field.grow, rngGen());
                        if (times > 0) {
                            switch (elem.type) {
                                case 'consumable':
                                    dispatch('consumable/gain', {name: elem.name, amount: elem.value * times}, {root: true});
                                    break;
                                case 'currency': {
                                    const splitName = elem.name.split('_');
                                    dispatch('currency/gain', {feature: splitName[0], name: splitName[1], amount: elem.value * times}, {root: true});
                                    dispatch('performCurrencyUnlocks', elem.name);
                                    break;
                                }
                                default:
                                    console.warn(`Rare drop type ${elem.type} not found`);
                                    break;
                            }
                            if (!elem.found) {
                                commit('findCropRareDrop', {name: field.crop, index});
                            }
                        }
                    });

                    // Chance to gain hunted rare drops
                    if (geneStats.tag.includes('farmHunter')) {
                        crop.rareDrop.forEach((elem, index) => {
                            const found = chance(rootGetters['mult/get'](
                                'farmHuntChance',
                                elem.chance + geneStats.mult.farmRareDropChance.baseValue + geneStats.mult.farmHuntChance.baseValue - elem.hunter * 0.05,
                                geneStats.mult.farmRareDropChance.multValue * geneStats.mult.farmHuntChance.multValue * pinwheelMult * elem.mult
                            ) * allGainBoost * ((field.care.rareDrop ?? 0) + 1) * field.grow, rngGen());
                            if (found) {
                                commit('huntCropRareDrop', {name: field.crop, index, value: elem.hunter + 1});
                                dispatch('applyGeneEffects');
                            }
                        });
                    }
                }

                // Add exp if unlocked
                if (rootState.unlock.farmCropExp.use) {
                    dispatch('getCropExp', {crop: field.crop, value: crop.type === 'special' ? (field.giant ? crop.giantMult : 1) : (rootGetters['mult/get'](
                        'farmExperience',
                        geneStats.mult.farmExperience.baseValue,
                        (((field.buildingEffect.lectern ?? 0) / field.time) * 2 + 1) * geneStats.mult.farmExperience.multValue
                    ) * allGainBoost * ((field.care.exp ?? 0) + 1) * field.grow)});
                }

                // Add stats
                commit('stat/add', {feature: 'farm', name: 'harvests', value: 1}, {root: true});

                // Unlock new notes
                const note = notes[field.crop];
                if (note !== undefined) {
                    dispatch('note/find', note, {root: true});
                }

                // Clear field
                const freeReplant = geneStats.tag.includes('farmUnyielding') && chance(0.4, rngGen());
                if (freeReplant) {
                    commit('updateFieldKey', {x: o.x, y: o.y, key: 'grow', value: 0});
                    commit('updateFieldKey', {x: o.x, y: o.y, key: 'rng', value: rootState.system.rng[rngName] ?? 0});
                    commit('system/nextRng', {name: rngName, amount: 1}, {root: true});
                } else {
                    commit('updateField', {x: o.x, y: o.y, value: {...emptyField, color: field.color}});
                }
                dispatch('updateGrownHint');

                if (!o.skipCache) {
                    dispatch('updateFieldCaches');
                }
            }
        },
        getCropExp({ state, rootState, getters, commit, dispatch }, o) {
            if (o.value > 0) {
                commit('updateCropKey', {name: o.crop, key: 'exp', value: state.crop[o.crop].exp + o.value});
            }
            let leveled = false;
            while (state.crop[o.crop].exp >= getters.expNeeded(o.crop)) {
                commit('updateCropKey', {name: o.crop, key: 'exp', value: state.crop[o.crop].exp - getters.expNeeded(o.crop)});
                commit('updateCropKey', {name: o.crop, key: 'level', value: state.crop[o.crop].level + 1});
                leveled = true;
            }
            if (leveled) {
                Object.keys(geneLevels).forEach(lvl => {
                    if (!rootState.unlock[`farmGeneLevel${ lvl }`].use && state.crop[o.crop].level >= parseInt(lvl)) {
                        dispatch('unlock/unlock', `farmGeneLevel${ lvl }`, {root: true});
                    }
                });
                if (state.crop[o.crop].type === 'special') {
                    dispatch('applySpecialCropEffect', {name: o.crop, trigger: true});
                } else {
                    dispatch('updateCropGlobalLevel');
                }
            }
            if (!rootState.unlock.farmPowerCardPack.use && o.crop === 'goldenRose' && state.crop[o.crop].level >= 1) {
                dispatch('unlock/unlock', 'farmPowerCardPack', {root: true});
            }
        },
        placeBuilding({ state, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type === null && state.building[o.name].cacheAmount < state.building[o.name].max) {
                const isPremium = state.building[o.name].cachePremium < state.building[o.name].maxPremium;
                commit('updateField', {x: o.x, y: o.y, value: {...field, type: 'building', building: o.name, premium: isPremium}});
                commit('updateBuildingKey', {name: o.name, key: 'cacheAmount', value: state.building[o.name].cacheAmount + 1});
                if (isPremium) {
                    commit('updateBuildingKey', {name: o.name, key: 'cachePremium', value: state.building[o.name].cachePremium + 1});
                }
                dispatch('updateFieldCaches');
            }
            if (state.building[o.name].cacheAmount >= state.building[o.name].max) {
                commit('updateKey', {key: 'selectedBuildingName', value: null});
            }
        },
        deleteTile({ state, getters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type !== null) {
                if (field.type === 'crop') {
                    const crop = state.crop[field.crop];

                    // Refund crop cost
                    for (const [key, elem] of Object.entries(crop.cost)) {
                        const split = key.split('_');
                        commit('currency/add', {feature: split[0], name: split[1], amount: elem * (field.giant ? crop.giantMult : 1)}, {root: true});
                    }

                    // Refund fertilizer
                    if (field.fertilizer) {
                        dispatch('consumable/gain', {name: `farm_${ field.fertilizer }`, amount: getters.cropFertilizerCost(field.crop, field.giant)}, {root: true});
                    }
                } else if (field.type === 'building') {
                    commit('updateBuildingKey', {name: field.building, key: 'cacheAmount', value: state.building[field.building].cacheAmount - 1});
                    if (field.premium) {
                        commit('updateBuildingKey', {name: field.building, key: 'cachePremium', value: state.building[field.building].cachePremium - 1});
                    }
                }
                commit('updateField', {x: o.x, y: o.y, value: {...emptyField, color: field.color}});
            }
            dispatch('updateFieldCaches');
            dispatch('updateGrownHint');
        },
        plantAll({ state, dispatch }, o) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === null && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        dispatch('plantCrop', {x, y, skipCache: true, giant: state.plantGiant, ...o});
                    }
                });
            });
            dispatch('updateFieldCaches');
        },
        harvestAll({ state, dispatch }) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && cell.grow >= 1 && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        dispatch('harvestCrop', {x, y, skipCache: true});
                    }
                });
            });
            dispatch('updateFieldCaches');
        },
        replantAll({ state, dispatch }) {
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop' && cell.grow >= 1 && (state.selectedColor === null || cell.color === state.selectedColor)) {
                        const fertilizer = cell.fertilizer ?? null;
                        dispatch('harvestCrop', {x, y, skipCache: true});
                        dispatch('plantCrop', {x, y, crop: cell.crop, fertilizer, giant: cell.giant, skipCache: true});
                    }
                });
            });
            dispatch('updateFieldCaches');
        },
        cropPrestige({ state, rootState, commit, dispatch }, name) {
            const crop = state.crop[name];
            if (crop.level >= 4) {
                // Set max prestige level
                if (crop.level > crop.levelMax) {
                    commit('updateCropKey', {name, key: 'levelMax', value: crop.level});
                }

                // Increase stat
                commit('stat/increaseTo', {feature: 'farm', name: 'bestPrestige', value: crop.level}, {root: true});

                let genesBlocked = [...crop.genesBlocked];
                // Clear reached genes first
                for (const [level, genes] of Object.entries(state.geneLevels)) {
                    if (crop.level >= parseInt(level)) {
                        genesBlocked = genesBlocked.filter(elem => !genes.includes(elem));
                    }
                }

                // Reset all crop upgrades and experience
                commit('updateCropKey', {name, key: 'exp', value: 0});
                commit('updateCropKey', {name, key: 'level', value: crop.genes.includes('prestige') ? Math.max(crop.level - 5, 0) : 0});

                // Then add genes used this prestige
                commit('updateCropKey', {name, key: 'genesBlocked', value: [...genesBlocked, ...crop.genes]});
                commit('updateCropKey', {name, key: 'genes', value: []});
                commit('updateCropKey', {name, key: 'upgrades', value: {}});

                // Apply card effects
                commit('updateCropKey', {name, key: 'cardEquipped', value: [...crop.cardSelected]});
                commit('updateCropKey', {name, key: 'cardSelected', value: []});
                let active = {};
                crop.cardEquipped.forEach(elem => {
                    if (active[elem]) {
                        active[elem]++;
                    } else {
                        active[elem] = 1;
                    }
                });
                let canAfford = true;
                for (const [card, amount] of Object.entries(active)) {
                    if ((rootState.card.card[card].amount - 1) < amount) {
                        canAfford = false;
                    }
                }
                if (canAfford) {
                    for (const [card, amount] of Object.entries(active)) {
                        commit('card/updateKey', {type: 'card', name: card, key: 'amount', value: rootState.card.card[card].amount - amount}, {root: true});
                    }
                } else {
                    commit('updateCropKey', {name, key: 'cardEquipped', value: []});
                }

                // Apply prestige effect
                dispatch('applyCropPrestige');
                dispatch('updateFieldCaches');
                dispatch('applyGeneEffects');
            }
        },
        applyCropPrestige({ getters, dispatch }) {
            if (getters.currentPrestigeLevel > 0) {
                dispatch('mult/setMult', {name: 'farmCropGain', key: 'prestige', value: getters.prestigeMult(getters.currentPrestigeLevel)}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'farmCropGain', key: 'prestige', type: 'mult'}, {root: true});
            }
        },
        applySpecialCropEffect({ state, dispatch }, o) {
            const crop = state.crop[o.name];
            const trigger = o.trigger ?? false;
            if (crop.level > 0) {
                crop.specialEffect.forEach(eff => {
                    dispatch('system/applyEffect', {type: eff.type, name: eff.name, multKey: `farmSpecialCrop_${ o.name }`, value: eff.value(crop.level), trigger}, {root: true});
                });
            } else {
                crop.specialEffect.forEach(eff => {
                    dispatch('system/resetEffect', {type: eff.type, name: eff.name, multKey: `farmSpecialCrop_${ o.name }`}, {root: true});
                });
            }
        },
        updateCropGlobalLevel({ state, dispatch }) {
            let totalLevel = 0;

            for (const [, elem] of Object.entries(state.crop)) {
                if (elem.type !== 'special') {
                    const lvl = Math.max(elem.level, elem.levelMax);
                    totalLevel += Math.min(Math.min(lvl, Math.floor(lvl / 2) + 5), 25);
                }
            }

            dispatch('meta/globalLevelPart', {key: 'farm_0', amount: totalLevel}, {root: true});
        },
        performCurrencyUnlocks({ rootState, dispatch }, name) {
            if (!rootState.unlock.farmAdvancedCardPack.use && name === 'farm_ladybug') {
                dispatch('unlock/unlock', 'farmAdvancedCardPack', {root: true});
            }
            if (!rootState.unlock.farmLuxuryCardPack.use && name === 'farm_bee') {
                dispatch('unlock/unlock', 'farmLuxuryCardPack', {root: true});
            }
            if (!rootState.unlock.farmSeedCardPack.use && name === 'farm_smallSeed') {
                dispatch('unlock/unlock', 'farmSeedCardPack', {root: true});
            }
        },
        updateGrownHint({ state, rootState, commit }) {
            let hasGrown = false;
            if (rootState.system.settings.notification.items.cropReady.value) {
                state.field.forEach(row => {
                    row.forEach(cell => {
                        if (cell !== null && cell.type === 'crop' && cell.grow >= 1) {
                            hasGrown = true;
                        }
                    });
                });
            }
            commit('system/updateKey', {key: 'farmHint', value: hasGrown}, {root: true});
        },
        pickGene({ state, commit, dispatch }, o) {
            commit('updateCropKey', {name: o.crop, key: 'genes', value: [...state.crop[o.crop].genes, o.gene] });
            if (o.gene === 'rareDrop') {
                state.field.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell !== null && cell.type === 'crop' && cell.crop === o.crop) {
                            let careObj = {};
                            for (const [key, elem] of Object.entries(cell.care)) {
                                if (key === 'yield') {
                                    careObj.rareDrop = elem;
                                } else {
                                    careObj[key] = elem;
                                }
                            }
                            commit('updateFieldKey', {x, y, key: 'care', value: careObj});
                        }
                    });
                });
            }
            dispatch('updateFieldCaches');
            dispatch('applyGeneEffects');
        },
        buyDnaUpgrade({ state, getters, commit, dispatch }, o) {
            if (getters.cropDnaLeft(o.crop) >= 1 && (state.crop[o.crop].upgrades[o.name] ?? 0) < state.gene[o.name].maxLevel) {
                commit('applyCropUpgrade', {crop: o.crop, upgrade: o.name});
                if (o.name === 'mystery') {
                    commit('stat/add', {feature: 'farm', name: 'totalMystery', value: 1}, {root: true});
                }
                dispatch('updateFieldCaches');
            }
        },
        applyEarlyGameBuff({ rootState, dispatch }) {
            if (rootState.unlock.farmDisableEarlyGame.use) {
                dispatch('mult/removeKey', {name: 'farmGrow', key: 'farmEarlyGame', type: 'mult'}, {root: true});
                dispatch('mult/removeKey', {name: 'farmCropGain', key: 'farmEarlyGame', type: 'mult'}, {root: true});
            } else {
                dispatch('mult/setMult', {name: 'farmGrow', key: 'farmEarlyGame', value: 1 / 10}, {root: true});
                dispatch('mult/setMult', {name: 'farmCropGain', key: 'farmEarlyGame', value: 1 / 10}, {root: true});
            }
        },
        updateFieldCaches({ state, getters, rootGetters, commit }) {
            let gnomes = [];
            let sprinklerRows = [];
            let lecternColumns = [];
            let pinwheels = [];
            let pinwheelCrops = [];
            let flags = [];
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'building') {
                        switch (cell.building) {
                            case 'gardenGnome':
                                gnomes.push({x, y, premium: cell.premium});
                                break;
                            case 'sprinkler':
                                sprinklerRows.push({y, premium: cell.premium});
                                break;
                            case 'lectern':
                                lecternColumns.push({x, premium: cell.premium});
                                break;
                            case 'pinwheel':
                                pinwheels.push({x, y, premium: cell.premium});
                                break;
                            case 'flag':
                                flags.push({x, y, premium: cell.premium});
                                break;
                            default:
                                break;
                        }
                    }
                    if (cell !== null && cell.type === 'crop') {
                        commit('updateFieldCache', {x, y, key: 'pinwheelSource', value: false});
                        commit('updateFieldCache', {x, y, key: 'gnome', value: 0});
                        commit('updateFieldCache', {x, y, key: 'lonely', value: false});
                    }
                });
            });
            if (pinwheels.length > 0) {
                state.field.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        if (cell !== null && cell.type === 'crop' && !pinwheelCrops.find(c => c.premium && c.crop === cell.crop)) {
                            // Prioritize premium pinwheels
                            let pinwheelFound = pinwheels.find(p => p.premium && Math.abs(x - p.x) <= 1 && Math.abs(y - p.y) <= 1);
                            if (!pinwheelFound) {
                                pinwheelFound = pinwheels.find(p => Math.abs(x - p.x) <= 1 && Math.abs(y - p.y) <= 1);
                            }
                            if (pinwheelFound) {
                                const pinwheelCropFound = pinwheelCrops.find(c => c.crop === cell.crop);

                                if (pinwheelFound.premium) {
                                    if (pinwheelCropFound) {
                                        pinwheelCropFound.premium = true;
                                    } else {
                                        pinwheelCrops.push({crop: cell.crop, premium: true});
                                    }
                                } else if (!pinwheelCropFound) {
                                    pinwheelCrops.push({crop: cell.crop, premium: false});
                                }

                                commit('updateFieldCache', {x, y, key: 'pinwheelSource', value: true});
                            }
                        }
                    });
                });
            }
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell !== null && cell.type === 'crop') {
                        const crop = state.crop[cell.crop];
                        const geneStats = getters.cropGeneStats(cell.crop, cell.fertilizer, cell.giant);
                        const sprinklers = (sprinklerRows.find(e => e.premium && e.y === y) ? (FARM_BUILDING_PREMIUM_BONUS + 1) : (sprinklerRows.find(e => e.y === y) ? 1 : 0));
                        let growSpeed = crop.type !== 'special' ? (sprinklers * FARM_SPRINKLER_GROW + 1) : 1;
                        let isLonely = false;
                        if (geneStats.tag.includes('farmLonelyGrow') && crop.type !== 'special') {
                            const cropCount = state.field.reduce((a, b) => a + b.reduce((c, d) => c + ((d !== null && d.crop === cell.crop) ? 1 : 0), 0), 0);
                            if (cropCount <= 1) {
                                growSpeed *= 1.3;
                                isLonely = true;
                                commit('updateFieldCache', {x, y, key: 'lonely', value: true});
                            }
                        }
                        const growTime = rootGetters['mult/get']('farmGrow', (cell.giant ? crop.giantGrow : crop.grow) + geneStats.mult.farmGrow.baseValue, geneStats.mult.farmGrow.multValue);
                        const overgrow = crop.type !== 'special' ? rootGetters['mult/get']('farmOvergrow', sprinklers * FARM_SPRINKLER_OVERGROW + (isLonely ? 1.5 : 0) + geneStats.mult.farmOvergrow.baseValue, geneStats.mult.farmOvergrow.multValue) : 0;
                        commit('updateFieldCache', {x, y, key: 'grow', value: 1 / (growTime / growSpeed)});
                        commit('updateFieldCache', {x, y, key: 'overgrow', value: overgrow > 0 ? overgrow : null});
                        commit('updateFieldCache', {x, y, key: 'overgrowMult', value: overgrow > 0 ? (1 / overgrow + 1) : null});
                        if (crop.type !== 'special') {
                            commit('updateFieldCache', {x, y, key: 'sprinkler', value: sprinklerRows.find(e => e.premium && e.y === y) ? (FARM_BUILDING_PREMIUM_BONUS + 1) : (sprinklerRows.find(e => e.y === y) ? 1 : 0)});
                            commit('updateFieldCache', {x, y, key: 'lectern', value: lecternColumns.find(e => e.x === x) ? (lecternColumns.find(e => e.premium && e.x === x) ? (FARM_BUILDING_PREMIUM_BONUS + 1) : 1) : 0});
                            commit('updateFieldCache', {x, y, key: 'pinwheel', value: pinwheelCrops.filter(e => e.premium).length * FARM_BUILDING_PREMIUM_BONUS + pinwheelCrops.length});
                            let flagMult = 0;
                            flags.forEach(flag => {
                                if (
                                    (crop.type === 'vegetable' && x < flag.x && y < flag.y) ||
                                    (crop.type === 'berry' && x > flag.x && y < flag.y) ||
                                    (crop.type === 'grain' && x < flag.x && y > flag.y) ||
                                    (crop.type === 'flower' && x > flag.x && y > flag.y)
                                ) {
                                    flagMult += flag.premium ? (FARM_BUILDING_PREMIUM_BONUS + 1) : 1;
                                }
                            });
                            commit('updateFieldCache', {x, y, key: 'flag', value: flagMult});

                            const specialCareWeightMult = state.careCanMax.findIndex(elem => geneStats.care[elem] && cell.care[elem] < geneStats.care[elem].max) === -1 ? (cell.grow >= 1 ? 0 : 0.1) : 1;
                            commit('updateFieldCache', {x, y, key: 'careWeight', value: rootGetters['mult/get']('farmCareWeight', geneStats.mult.farmCareWeight.baseValue + sprinklers * FARM_SPRINKLER_CARE_WEIGHT, geneStats.mult.farmCareWeight.multValue * specialCareWeightMult)});

                            if (geneStats.tag.includes('farmGnomeBoost')) {
                                const gnomesFound = gnomes.filter(p => Math.abs(x - p.x) <= 1 && Math.abs(y - p.y) <= 1);
                                if (gnomesFound.length > 0) {
                                    commit('updateFieldCache', {x, y, key: 'gnome', value: gnomesFound.filter(e => e.premium).length * FARM_BUILDING_PREMIUM_BONUS + gnomesFound.length});
                                }
                            }
                        }
                    }
                });
            });
        },
        applyGeneEffects({ state, rootState, dispatch }) {
            // Apply gene upgrades
            let selflessAmount = 0
            let teamworkActive = {
                vegetable: false,
                berry: false,
                grain: false,
                flower: false
            };
            for (const [, elem] of Object.entries(state.crop)) {
                if (elem.genes.includes('selfless')) {
                    selflessAmount++;
                }
                if (elem.genes.includes('teamwork')) {
                    teamworkActive[elem.type] = true;
                }
            }
            if (selflessAmount > 0) {
                dispatch('mult/setMult', {name: 'farmCropGain', key: 'farmGene_selfless', value: Math.min(selflessAmount, 10) * 0.03 + 1}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'farmCropGain', key: 'farmGene_selfless', type: 'mult'}, {root: true});
            }
            if (teamworkActive.vegetable && teamworkActive.berry && teamworkActive.grain && teamworkActive.flower) {
                dispatch('mult/setMult', {name: 'farmCropGain', key: 'farmGene_teamwork', value: 2}, {root: true});
            } else {
                dispatch('mult/removeKey', {name: 'farmCropGain', key: 'farmGene_teamwork', type: 'mult'}, {root: true});
            }
            let effect = {};
            for (const [, elem] of Object.entries(state.crop)) {
                elem.rareDrop.forEach(item => {
                    if (item.type === 'currency' && item.hunter > 0) {
                        if (effect[item.name] === undefined) {
                            effect[item.name] = 0;
                        }
                        effect[item.name] += item.hunter;
                    }
                });
            }
            for (const [key, elem] of Object.entries(effect)) {
                const split = key.split('_');
                const capName = `currency${ capitalize(split[0]) + capitalize(split[1]) }Cap`;
                dispatch('mult/setBase', {name: capName, key: 'farmGene_hunter', value: Math.round(rootState.mult.items[capName].baseValue / 10) * elem}, {root: true});
            }
        },
        applyCare({ state, rootState, getters, commit, dispatch }, o) {
            const field = state.field[o.y][o.x];
            if (field !== null && field.type === 'crop' && field.care.active) {
                commit('updateFieldCare', {x: o.x, y: o.y, key: 'active', value: false});
                const crop = state.crop[field.crop];
                const geneStats = getters.cropGeneStats(field.crop, field.fertilizer, field.giant);
                const careWasMaxed = state.careCanMax.findIndex(elem => geneStats.care[elem] && field.care[elem] < geneStats.care[elem].max) === -1;
                let care = [];
                let weights = [];
                for (const [key, elem] of Object.entries(geneStats.care)) {
                    care.push({...elem, name: key});
                    weights.push(elem.weight);
                }
                const chosenCare = care[weightSelect(weights)];
                const growDiv = Math.sqrt((field.giant ? crop.giantGrow : crop.grow) / 10) * 8;
                let validCare = false;
                switch (chosenCare.name) {
                    case 'yield':
                    case 'rareDrop':
                    case 'exp':
                        if (field.care[chosenCare.name] < geneStats.care[chosenCare.name].max) {
                            commit('updateFieldCare', {x: o.x, y: o.y, key: chosenCare.name, value: Math.min(field.care[chosenCare.name] + geneStats.care[chosenCare.name].amount / growDiv, geneStats.care[chosenCare.name].max)});
                            validCare = true;
                        }
                        break;
                    case 'gold':
                        dispatch('currency/gain', {feature: 'farm', name: 'gold', amount: randomInt(geneStats.care.gold.amount, geneStats.care.gold.max)}, {root: true});
                        validCare = true;
                        break;
                }

                // Time is fallback care
                if (!validCare && field.grow < 1) {
                    commit('updateFieldKey', {x: o.x, y: o.y, key: 'grow', value: Math.min(field.grow + field.cache.grow * geneStats.care.time.amount, 1)});
                    validCare = true;
                }

                const careIsMaxed = state.careCanMax.findIndex(elem => geneStats.care[elem] && field.care[elem] < geneStats.care[elem].max) === -1;
                if (state.field[o.y][o.x].grow >= 1 && careIsMaxed) {
                    commit('updateFieldCache', {x: o.x, y: o.y, key: 'careWeight', value: 0});
                } else if (!careWasMaxed && careIsMaxed) {
                    commit('updateFieldCache', {x: o.x, y: o.y, key: 'careWeight', value: field.cache.careWeight * 0.1});
                }

                // Apply stat if care is successful, or refund rainwater if not
                if (validCare) {
                    commit('stat/add', {feature: 'farm', name: 'care', value: 1}, {root: true});
                } else {
                    commit('currency/add', {feature: 'farm', name: 'rainwater', amount: 1}, {root: true});
                }

                // Chance for new care to appear immediately
                const filled = rootState.currency.farm_rainwater.value / rootState.currency.farm_rainwater.cap;
                if (filled > 1) {
                    let spawnChance = 0;
                        if (filled <= 3) {
                            spawnChance = (filled - 1) / 6;
                        } else if (filled <= 7) {
                            spawnChance = (filled - 3) / 12 + 1 / 3;
                        } else {
                            spawnChance = (filled - 7) / 24 + 2 / 3;
                        }
                    if (chance(spawnChance)) {
                        let careEligible = [];
                        state.field.forEach((row, y) => {
                            row.forEach((cell, x) => {
                                if (cell !== null && cell.type === 'crop' && !cell.care.active && cell.cache.careWeight > 0 && (x !== o.x || y !== o.y)) {
                                    careEligible.push({x, y, weight: cell.cache.careWeight});
                                }
                            });
                        });
                        if (careEligible.length > 0) {
                            const careCell = careEligible[weightSelect(careEligible.map(el => el.weight))];
                            commit('updateFieldCare', {x: careCell.x, y: careCell.y, key: 'active', value: true});
                            dispatch('currency/spend', {feature: 'farm', name: 'rainwater', amount: 1}, {root: true});
                        }
                    }
                }
            }
        },
        upgradeBuilding({ state, commit, dispatch }, name) {
            let found = false;
            state.field.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (!found && cell !== null && cell.type === 'building' && cell.building === name && !cell.premium) {
                        commit('updateFieldKey', {x, y, key: 'premium', value: true});
                        commit('calculateCropBuildingCaches');
                        dispatch('updateFieldCaches');
                        found = true;
                    }
                });
            });
        }
    }
}
